# Street Sport - API Contracts

## Goals
Backend pour l'e-commerce Street Sport : produits, categories, marques, panier/commande, newsletter, contact.
MongoDB persistance + auto-seed des produits depuis mock au demarrage.

## Mock data to be replaced (frontend `src/mock.js`)
- `PRODUCTS` -> fetched via `GET /api/products` (et `/api/products/:slug`)
- `CATEGORIES` -> `GET /api/categories`
- `BRANDS` -> `GET /api/brands`
- `STORE_INFO`, `TESTIMONIALS`, `HERO_SLIDES`, `STORE_GALLERY` -> restent cote front (statiques).
- Cart state -> reste localStorage (UX). Le checkout envoie `POST /api/orders`.
- Newsletter footer -> `POST /api/newsletter`
- Contact form -> `POST /api/contact`

## Models (MongoDB collections)

### product (collection: products)
- `id: str (uuid)`
- `slug: str (unique)`
- `name: str, brand: str, category: str`
- `price: float, oldPrice: float|null, isNew: bool, discount: int`
- `image: str, images: [str]`
- `sizes: [str], colors: [str]`
- `description: str`
- `stock: int (default 50)`
- `createdAt: datetime`

### order (collection: orders)
- `id: str (uuid), createdAt: datetime, status: pending|confirmed`
- `customer: { name, email, phone, address, city, zip }`
- `items: [{ productId, name, brand, image, price, size, color, qty }]`
- `subtotal: float, shipping: float, total: float`

### newsletter (collection: newsletter)
- `{ id, email (unique), createdAt }`

### contact_message (collection: contact_messages)
- `{ id, name, email, subject, message, createdAt }`

## REST API (all under `/api`)
- `GET /products` query: `category`, `brand`, `q`, `max_price`, `sort`(featured/new/price-asc/price-desc), `limit` -> `[Product]`
- `GET /products/{slug}` -> `Product`
- `GET /categories` -> `[{id,label,count}]` (count computed from products)
- `GET /brands` -> `[str]`
- `POST /orders` body: `{ customer, items, subtotal, shipping, total }` -> `Order`
- `POST /newsletter` body: `{ email }` -> `{ ok: true }`
- `POST /contact` body: `{ name, email, subject?, message }` -> `{ ok: true }`

## Frontend Integration
- `src/api.js` (NEW) — axios client with helpers
- `src/pages/HomePage.jsx` — fetch products on mount
- `src/pages/ShopPage.jsx` — fetch products with query params
- `src/pages/ProductPage.jsx` — fetch by slug
- `src/components/Footer.jsx` — call `POST /newsletter`
- `src/pages/StaticPages.jsx` (Contact) — call `POST /contact`
- `src/components/CartDrawer.jsx` — call `POST /orders` on checkout
- `src/mock.js` — KEEP `STORE_INFO`, `TESTIMONIALS`, `HERO_SLIDES`, `STORE_GALLERY`. REMOVE imports of PRODUCTS/CATEGORIES/BRANDS where API is used.

## Auto-seed
On startup, if `products` collection is empty -> insert initial products from seed data.
