from datetime import datetime
import logging
import os
from pathlib import Path
from typing import List, Optional
import uuid

from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

from seed_data import CATEGORIES_SEED, PRODUCTS_SEED

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'street_sport')]

app = FastAPI(title='Street Sport API')
api_router = APIRouter(prefix='/api')


def now():
    return datetime.utcnow()


class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    name: str
    brand: str
    category: str
    price: float
    oldPrice: Optional[float] = None
    isNew: bool = False
    discount: int = 0
    image: str
    images: List[str] = []
    sizes: List[str] = []
    colors: List[str] = []
    description: str
    stock: int = 50
    createdAt: datetime = Field(default_factory=now)


class CategoryOut(BaseModel):
    id: str
    label: str
    count: int


class CartItem(BaseModel):
    productId: str
    name: str
    brand: str
    image: str
    price: float
    size: str
    color: str
    qty: int


class Customer(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ''
    address: Optional[str] = ''
    city: Optional[str] = ''
    zip: Optional[str] = ''


class OrderCreate(BaseModel):
    customer: Customer
    items: List[CartItem]
    subtotal: float
    shipping: float
    total: float


class Order(OrderCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = 'pending'
    createdAt: datetime = Field(default_factory=now)


class NewsletterCreate(BaseModel):
    email: EmailStr


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = ''
    message: str


@api_router.get('/')
async def root():
    return {'message': 'Street Sport API', 'version': '1.0'}


@api_router.get('/products')
async def list_products(
    category: Optional[str] = None,
    brand: Optional[str] = None,
    q: Optional[str] = None,
    max_price: Optional[float] = None,
    sort: str = 'featured',
    limit: int = 100,
):
    query = {}
    if category and category != 'all':
        query['category'] = category
    if brand:
        query['brand'] = {'$in': brand.split(',')}
    if max_price is not None:
        query['price'] = {'$lte': max_price}
    if q:
        query['$or'] = [
            {'name': {'$regex': q, '$options': 'i'}},
            {'brand': {'$regex': q, '$options': 'i'}},
            {'description': {'$regex': q, '$options': 'i'}},
        ]

    if sort == 'price-asc':
        sort_spec = [('price', 1)]
    elif sort == 'price-desc':
        sort_spec = [('price', -1)]
    elif sort == 'new':
        sort_spec = [('isNew', -1), ('createdAt', -1)]
    else:
        sort_spec = [('createdAt', -1)]

    cursor = db.products.find(query, {'_id': 0}).sort(sort_spec).limit(limit)
    return await cursor.to_list(length=limit)


@api_router.get('/products/{slug}')
async def get_product(slug: str):
    doc = await db.products.find_one({'slug': slug}, {'_id': 0})
    if not doc:
        raise HTTPException(status_code=404, detail='Product not found')
    return doc


@api_router.get('/categories', response_model=List[CategoryOut])
async def list_categories():
    out = []
    for c in CATEGORIES_SEED:
        count = await db.products.count_documents({'category': c['id']})
        out.append(CategoryOut(id=c['id'], label=c['label'], count=count))
    return out


@api_router.get('/brands')
async def list_brands():
    return sorted(await db.products.distinct('brand'))


@api_router.post('/orders', response_model=Order)
async def create_order(payload: OrderCreate):
    if not payload.items:
        raise HTTPException(status_code=400, detail='Empty cart')
    order = Order(**payload.model_dump(), status='confirmed')
    await db.orders.insert_one(jsonable_encoder(order))
    return order


@api_router.post('/newsletter')
async def subscribe_newsletter(payload: NewsletterCreate):
    email = payload.email.lower()
    if await db.newsletter.find_one({'email': email}):
        return {'ok': True, 'alreadySubscribed': True}
    await db.newsletter.insert_one({'id': str(uuid.uuid4()), 'email': email, 'createdAt': now().isoformat()})
    return {'ok': True}


@api_router.post('/contact')
async def contact(payload: ContactCreate):
    await db.contact_messages.insert_one(
        {
            'id': str(uuid.uuid4()),
            'name': payload.name,
            'email': payload.email,
            'subject': payload.subject or '',
            'message': payload.message,
            'createdAt': now().isoformat(),
        }
    )
    return {'ok': True}


@app.on_event('startup')
async def startup():
    await db.products.create_index('slug', unique=True)
    await db.newsletter.create_index('email', unique=True)

    if await db.products.count_documents({}) == 0:
        docs = [jsonable_encoder(Product(**p)) for p in PRODUCTS_SEED]
        if docs:
            await db.products.insert_many(docs)
            logger.info('Seeded %d products', len(docs))


@app.on_event('shutdown')
async def shutdown_db_client():
    client.close()


app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
