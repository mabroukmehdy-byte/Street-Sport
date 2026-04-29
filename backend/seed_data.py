"""Seed data for Street Sport."""

PRODUCTS_SEED = [
    {"slug": "air-force-1-blanche", "name": 'Air Force 1 "Triple White"', "brand": "Nike", "category": "sneakers", "price": 119, "oldPrice": 139, "isNew": True, "discount": 14, "image": "https://images.unsplash.com/photo-1602078019624-f4355d0687fd", "images": ["https://images.unsplash.com/photo-1602078019624-f4355d0687fd", "https://images.unsplash.com/photo-1603326312953-c2881ee5b400"], "sizes": ["38", "39", "40", "41", "42", "43", "44", "45"], "colors": ["Blanc"], "description": "L'icone absolue. Une silhouette intemporelle qui traverse les epoques."},
    {"slug": "jordan-1-rouge", "name": 'Jordan 1 Mid "Chicago"', "brand": "Jordan", "category": "sneakers", "price": 149, "oldPrice": None, "isNew": True, "discount": 0, "image": "https://images.pexels.com/photos/10047329/pexels-photo-10047329.jpeg", "images": ["https://images.pexels.com/photos/10047329/pexels-photo-10047329.jpeg"], "sizes": ["39", "40", "41", "42", "43", "44"], "colors": ["Rouge", "Noir"], "description": "Un classique repense."},
    {"slug": "tee-paris", "name": 'Tee "Ornano 75018"', "brand": "Street Sport", "category": "tshirts", "price": 35, "oldPrice": None, "isNew": True, "discount": 0, "image": "https://images.pexels.com/photos/33884624/pexels-photo-33884624.jpeg", "images": ["https://images.pexels.com/photos/33884624/pexels-photo-33884624.jpeg"], "sizes": ["S", "M", "L", "XL"], "colors": ["Blanc", "Noir"], "description": "Edition exclusive du shop."},
    {"slug": "casquette-paris", "name": 'Casquette "75018" Snapback', "brand": "Street Sport", "category": "accessoires", "price": 29, "oldPrice": None, "isNew": True, "discount": 0, "image": "https://images.unsplash.com/photo-1523398002811-999ca8dec234", "images": ["https://images.unsplash.com/photo-1523398002811-999ca8dec234"], "sizes": ["Unique"], "colors": ["Noir"], "description": "Edition shop."}
]

CATEGORIES_SEED = [
    {"id": "sneakers", "label": "Sneakers"},
    {"id": "hoodies", "label": "Hoodies & Sweats"},
    {"id": "tshirts", "label": "T-Shirts"},
    {"id": "pants", "label": "Pantalons"},
    {"id": "jackets", "label": "Vestes"},
    {"id": "accessoires", "label": "Accessoires"},
]
