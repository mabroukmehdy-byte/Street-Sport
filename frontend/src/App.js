import React, { useEffect, useMemo, useState } from 'react';
import '@fontsource/anton';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/700.css';
import './index.css';

const STORAGE_KEY = 'streetsport_shop_v2';

const defaultData = {
  marque: {
    nom: 'Street Sport',
    baseline: 'Sneakers, textile, accessoires',
    adresse: '30 Bd Ornano, 75018 Paris',
    telephone: '+33 7 53 19 69 73',
    email: 'contact@streetsport-paris.fr',
  },
  hero: {
    accroche: 'NOUVELLE COLLECTION STREET & SPORT',
    sousTexte: 'Decouvre les derniers drops sneakers, vetements et accessoires. Livraison rapide en France.',
    boutonPrincipal: 'Acheter maintenant',
    boutonSecondaire: 'Voir les nouveautes',
    image: 'https://images.unsplash.com/photo-1602078019624-f4355d0687fd?auto=format&fit=crop&w=1800&q=80',
  },
  categories: [
    { nom: 'Homme', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80' },
    { nom: 'Femme', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80' },
    { nom: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80' },
  ],
  produits: [
    { id: 'p1', nom: 'Air Force 1 Triple White', marque: 'Nike', prix: 119, categorie: 'Sneakers', image: 'https://images.unsplash.com/photo-1602078019624-f4355d0687fd?auto=format&fit=crop&w=900&q=80', description: 'Silhouette iconique et confort quotidien.', tailles: ['40', '41', '42', '43', '44'] },
    { id: 'p2', nom: 'Jordan 1 Mid Chicago', marque: 'Jordan', prix: 149, categorie: 'Sneakers', image: 'https://images.pexels.com/photos/10047329/pexels-photo-10047329.jpeg?auto=compress&cs=tinysrgb&w=1200', description: 'Un classique basket en coloris rouge/noir.', tailles: ['40', '41', '42', '43', '44'] },
    { id: 'p3', nom: 'Hoodie Heavy Rooftop', marque: 'Carhartt', prix: 89, categorie: 'Vetements', image: 'https://images.unsplash.com/photo-1554925051-f668ed70d520?auto=format&fit=crop&w=1200&q=80', description: 'Hoodie coton lourd coupe oversize.', tailles: ['S', 'M', 'L', 'XL'] },
    { id: 'p4', nom: 'Tee Ornano 75018', marque: 'Street Sport', prix: 35, categorie: 'Vetements', image: 'https://images.pexels.com/photos/33884624/pexels-photo-33884624.jpeg?auto=compress&cs=tinysrgb&w=1200', description: 'Edition locale du shop.', tailles: ['S', 'M', 'L', 'XL'] },
    { id: 'p5', nom: 'Cargo Heavy', marque: 'Carhartt', prix: 109, categorie: 'Vetements', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80', description: 'Pantalon robuste multi-poches.', tailles: ['30', '32', '34', '36'] },
    { id: 'p6', nom: 'Sac Banane Tech', marque: 'Nike', prix: 35, categorie: 'Accessoires', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80', description: 'Compact et fonctionnel.', tailles: ['Unique'] },
  ],
};

function useSiteData() {
  const [data, setData] = useState(defaultData);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...defaultData, ...JSON.parse(raw) });
    } catch (_) {}
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);
  return [data, setData];
}

function Header({ data, count, onCartOpen }) {
  return (
    <header className="topbar">
      <p className="brand">{data.marque.nom.toUpperCase()}</p>
      <nav>
        <a href="#nouveautes">Nouveautes</a>
        <a href="#homme">Homme</a>
        <a href="#femme">Femme</a>
        <a href="#sneakers">Sneakers</a>
      </nav>
      <button className="cart-chip" onClick={onCartOpen}>Panier ({count})</button>
    </header>
  );
}

function Hero({ data }) {
  return (
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.68), rgba(0,0,0,.26)), url(${data.hero.image})` }}>
      <div className="hero-inner">
        <p className="eyebrow">NOUVEAU DROP</p>
        <h1>{data.hero.accroche}</h1>
        <p>{data.hero.sousTexte}</p>
        <div className="hero-actions">
          <a href="#produits" className="btn primary">{data.hero.boutonPrincipal}</a>
          <a href="#nouveautes" className="btn ghost">{data.hero.boutonSecondaire}</a>
        </div>
      </div>
    </section>
  );
}

function CategoryTiles({ data }) {
  return (
    <section id="nouveautes" className="section">
      <h2>Acheter par categorie</h2>
      <div className="looks-grid">
        {data.categories.map((c) => (
          <article key={c.nom}>
            <img src={c.image} alt={c.nom} />
            <div>
              <h3>{c.nom}</h3>
              <p>Voir la collection</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductGrid({ data, onOpen }) {
  const [cat, setCat] = useState('Tous');
  const [sort, setSort] = useState('featured');

  const list = useMemo(() => {
    let p = cat === 'Tous' ? data.produits : data.produits.filter((x) => x.categorie === cat);
    if (sort === 'price-asc') p = [...p].sort((a, b) => a.prix - b.prix);
    if (sort === 'price-desc') p = [...p].sort((a, b) => b.prix - a.prix);
    return p;
  }, [data.produits, cat, sort]);

  return (
    <section id="produits" className="section">
      <div className="shop-head">
        <h2>Articles a la une</h2>
        <div className="shop-controls">
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option>Tous</option>
            <option>Sneakers</option>
            <option>Vetements</option>
            <option>Accessoires</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Selection</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix decroissant</option>
          </select>
        </div>
      </div>
      <div className="cards-3">
        {list.map((p) => (
          <article key={p.id} className="product-card" onClick={() => onOpen(p)}>
            <img src={p.image} alt={p.nom} />
            <div>
              <small>{p.marque}</small>
              <h3>{p.nom}</h3>
              <p>{p.prix} EUR</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductModal({ product, onClose, onAdd }) {
  const [taille, setTaille] = useState(product?.tailles?.[0] || 'Unique');
  if (!product) return null;
  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={product.image} alt={product.nom} />
        <div>
          <small>{product.marque}</small>
          <h3>{product.nom}</h3>
          <p>{product.description}</p>
          <label>Taille</label>
          <select value={taille} onChange={(e) => setTaille(e.target.value)}>
            {product.tailles.map((t) => <option key={t}>{t}</option>)}
          </select>
          <div className="hero-actions">
            <button onClick={() => onAdd(product, taille)}>Ajouter au panier</button>
            <button className="btn ghost" onClick={onClose}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, cart, setCart }) {
  const subtotal = cart.reduce((s, i) => s + i.prix * i.qty, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 6.9;
  const total = subtotal + shipping;

  return (
    <aside className={`drawer ${open ? 'show' : ''}`}>
      <div className="drawer-head"><h3>Panier</h3><button onClick={onClose}>Fermer</button></div>
      <div className="drawer-body">
        {cart.length === 0 ? <p>Ton panier est vide.</p> : cart.map((i) => (
          <div className="line" key={i.key}>
            <img src={i.image} alt={i.nom} />
            <div>
              <strong>{i.nom}</strong>
              <p>{i.taille} - {i.prix} EUR</p>
              <div className="hero-actions">
                <button onClick={() => setCart((prev) => prev.map((x) => x.key === i.key ? { ...x, qty: Math.max(1, x.qty - 1) } : x))}>-</button>
                <span>{i.qty}</span>
                <button onClick={() => setCart((prev) => prev.map((x) => x.key === i.key ? { ...x, qty: x.qty + 1 } : x))}>+</button>
                <button onClick={() => setCart((prev) => prev.filter((x) => x.key !== i.key))}>Suppr.</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="drawer-foot">
        <p>Sous-total: <strong>{subtotal.toFixed(2)} EUR</strong></p>
        <p>Livraison: <strong>{shipping === 0 ? 'Offerte' : `${shipping.toFixed(2)} EUR`}</strong></p>
        <p>Total: <strong>{total.toFixed(2)} EUR</strong></p>
        <button>Payer</button>
      </div>
    </aside>
  );
}

function Footer({ data }) {
  return (
    <footer className="footer">
      <p>{data.marque.nom} - {data.marque.baseline}</p>
      <p>{data.marque.adresse}</p>
    </footer>
  );
}

function updatePath(setData, path, value) {
  setData((prev) => {
    const next = structuredClone(prev);
    let cur = next;
    for (let i = 0; i < path.length - 1; i += 1) cur = cur[path[i]];
    cur[path[path.length - 1]] = value;
    return next;
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function BackOffice({ open, onClose, data, setData }) {
  const [tab, setTab] = useState('hero');
  if (!open) return null;

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin" onClick={(e) => e.stopPropagation()}>
        <div className="admin-head"><h3>Back Office - Vente</h3><button onClick={onClose}>Fermer</button></div>
        <div className="admin-tabs">
          {['hero', 'categories', 'produits', 'marque'].map((t) => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>)}
        </div>

        {tab === 'hero' && (
          <section className="admin-section">
            <input value={data.hero.accroche} onChange={(e) => updatePath(setData, ['hero', 'accroche'], e.target.value)} placeholder="Accroche" />
            <textarea rows={4} value={data.hero.sousTexte} onChange={(e) => updatePath(setData, ['hero', 'sousTexte'], e.target.value)} />
            <input value={data.hero.boutonPrincipal} onChange={(e) => updatePath(setData, ['hero', 'boutonPrincipal'], e.target.value)} />
            <input value={data.hero.boutonSecondaire} onChange={(e) => updatePath(setData, ['hero', 'boutonSecondaire'], e.target.value)} />
            <input value={data.hero.image} onChange={(e) => updatePath(setData, ['hero', 'image'], e.target.value)} placeholder="URL image" />
            <label className="import-btn">Importer image hero<input type="file" accept="image/*" onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const url = await fileToDataUrl(f);
              updatePath(setData, ['hero', 'image'], url);
            }} /></label>
          </section>
        )}

        {tab === 'categories' && (
          <section className="admin-section">
            {data.categories.map((c, i) => (
              <div className="admin-card" key={i}>
                <input value={c.nom} onChange={(e) => updatePath(setData, ['categories', i, 'nom'], e.target.value)} />
                <input value={c.image} onChange={(e) => updatePath(setData, ['categories', i, 'image'], e.target.value)} placeholder="URL image" />
                <label>Importer image<input type="file" accept="image/*" onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const url = await fileToDataUrl(f);
                  updatePath(setData, ['categories', i, 'image'], url);
                }} /></label>
              </div>
            ))}
          </section>
        )}

        {tab === 'produits' && (
          <section className="admin-section">
            {data.produits.map((p, i) => (
              <div className="admin-card" key={p.id}>
                <input value={p.nom} onChange={(e) => updatePath(setData, ['produits', i, 'nom'], e.target.value)} placeholder="Nom produit" />
                <input value={p.marque} onChange={(e) => updatePath(setData, ['produits', i, 'marque'], e.target.value)} placeholder="Marque" />
                <input type="number" value={p.prix} onChange={(e) => updatePath(setData, ['produits', i, 'prix'], Number(e.target.value || 0))} placeholder="Prix" />
                <input value={p.categorie} onChange={(e) => updatePath(setData, ['produits', i, 'categorie'], e.target.value)} placeholder="Categorie" />
                <textarea rows={3} value={p.description} onChange={(e) => updatePath(setData, ['produits', i, 'description'], e.target.value)} placeholder="Description" />
                <input value={p.image} onChange={(e) => updatePath(setData, ['produits', i, 'image'], e.target.value)} placeholder="URL image" />
                <label>Importer image<input type="file" accept="image/*" onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const url = await fileToDataUrl(f);
                  updatePath(setData, ['produits', i, 'image'], url);
                }} /></label>
              </div>
            ))}
            <button onClick={() => setData((prev) => ({
              ...prev,
              produits: [...prev.produits, {
                id: `p${Date.now()}`,
                nom: 'Nouveau produit',
                marque: 'Marque',
                prix: 0,
                categorie: 'Sneakers',
                image: '',
                description: 'Description',
                tailles: ['Unique'],
              }],
            }))}>Ajouter produit</button>
          </section>
        )}

        {tab === 'marque' && (
          <section className="admin-section">
            <input value={data.marque.nom} onChange={(e) => updatePath(setData, ['marque', 'nom'], e.target.value)} />
            <input value={data.marque.baseline} onChange={(e) => updatePath(setData, ['marque', 'baseline'], e.target.value)} />
            <input value={data.marque.adresse} onChange={(e) => updatePath(setData, ['marque', 'adresse'], e.target.value)} />
            <input value={data.marque.telephone} onChange={(e) => updatePath(setData, ['marque', 'telephone'], e.target.value)} />
            <input value={data.marque.email} onChange={(e) => updatePath(setData, ['marque', 'email'], e.target.value)} />
          </section>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useSiteData();
  const [selected, setSelected] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const count = cart.reduce((s, x) => s + x.qty, 0);

  const addToCart = (p, taille) => {
    const key = `${p.id}-${taille}`;
    setCart((prev) => {
      const ex = prev.find((x) => x.key === key);
      if (ex) return prev.map((x) => (x.key === key ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { key, id: p.id, nom: p.nom, image: p.image, prix: p.prix, taille, qty: 1 }];
    });
    setSelected(null);
    setCartOpen(true);
  };

  return (
    <main>
      <Header data={data} count={count} onCartOpen={() => setCartOpen(true)} />
      <Hero data={data} />
      <CategoryTiles data={data} />
      <ProductGrid data={data} onOpen={setSelected} />
      <Footer data={data} />

      <button className="admin-fab" onClick={() => setAdminOpen(true)}>Back Office</button>

      <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={addToCart} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} />
      <BackOffice open={adminOpen} onClose={() => setAdminOpen(false)} data={data} setData={setData} />
    </main>
  );
}
