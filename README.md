# Street Sport

Projet e-commerce Street Sport (Paris 18):
- `frontend/`: React app (catalogue, filtres, fiche produit, panier, checkout)
- `backend/`: FastAPI + MongoDB (products, categories, brands, orders, newsletter, contact)
- `contracts.md`: API contracts

## Run backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

## Run frontend

```bash
cd frontend
npm install
npm start
```
