import React, { useEffect, useMemo, useState } from 'react';
import '@fontsource/anton';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/700.css';
import './index.css';

const STORAGE_KEY = 'streetsport_nike_visual_bo_v1';

const BRANDS = [
  { name: 'NIKE', logo: 'https://logo.clearbit.com/nike.com' },
  { name: 'MIZUNO', logo: 'https://logo.clearbit.com/mizuno.com' },
  { name: 'ASICS', logo: 'https://logo.clearbit.com/asics.com' },
  { name: 'UNDER ARMOUR', logo: 'https://logo.clearbit.com/underarmour.com' },
  { name: 'RALPH LAUREN', logo: 'https://logo.clearbit.com/ralphlauren.com' },
  { name: 'NIKE ACG', logo: 'https://logo.clearbit.com/nike.com' },
  { name: 'SCOTT', logo: 'https://logo.clearbit.com/scott-sports.com' },
  { name: 'HELLY HANSEN', logo: 'https://logo.clearbit.com/hellyhansen.com' },
];
const ADMIN_SESSION_KEY = 'streetsport_admin_session_v1';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'StreetSport2026!';

const seedProducts = [
  { id: 'p1', name: 'Velocity Air One', brand: 'Street Sport', price: 129, oldPrice: 149, category: 'sneakers', gender: 'homme', sport: 'running', isNew: true, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', sizes: ['40', '41', '42', '43', '44'], desc: 'Amorti réactif et empeigne respirante.' },
  { id: 'p2', name: 'Court Legacy Mid', brand: 'Street Sport', price: 119, oldPrice: null, category: 'sneakers', gender: 'femme', sport: 'lifestyle', isNew: true, image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=900&q=80', sizes: ['37', '38', '39', '40', '41'], desc: 'Silhouette montante inspirée des classiques urbains.' },
  { id: 'p3', name: 'Urban Sprint X', brand: 'Street Sport', price: 139, oldPrice: 169, category: 'sneakers', gender: 'homme', sport: 'basket', isNew: false, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80', sizes: ['40', '41', '42', '43', '44'], desc: 'Stabilité latérale pour les entraînements intenses.' },
  { id: 'p4', name: 'Metro Runner Lite', brand: 'Street Sport', price: 99, oldPrice: null, category: 'sneakers', gender: 'femme', sport: 'running', isNew: false, image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80', sizes: ['36', '37', '38', '39', '40'], desc: 'Légèreté et dynamisme pour les runs quotidiens.' },
  { id: 'p5', name: 'Hoodie Core Oversize', brand: 'Street Sport', price: 79, oldPrice: 99, category: 'vetements', gender: 'homme', sport: 'lifestyle', isNew: true, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80', sizes: ['S', 'M', 'L', 'XL'], desc: 'Coton épais, coupe ample, confort maximal.' },
  { id: 'p6', name: 'Tee Performance Dry', brand: 'Street Sport', price: 35, oldPrice: null, category: 'vetements', gender: 'femme', sport: 'training', isNew: true, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80', sizes: ['XS', 'S', 'M', 'L'], desc: 'Tissu léger anti-transpiration.' },
  { id: 'p7', name: 'Pantalon Cargo Move', brand: 'Street Sport', price: 89, oldPrice: null, category: 'vetements', gender: 'homme', sport: 'lifestyle', isNew: false, image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=80', sizes: ['30', '32', '34', '36'], desc: 'Coupe droite et poches utilitaires.' },
  { id: 'p8', name: 'Legging Studio Fit', brand: 'Street Sport', price: 59, oldPrice: null, category: 'vetements', gender: 'femme', sport: 'training', isNew: false, image: 'https://images.unsplash.com/photo-1506629905607-d9b1f073f201?auto=format&fit=crop&w=900&q=80', sizes: ['XS', 'S', 'M', 'L'], desc: 'Maintien ciblé et liberté de mouvement.' },
  { id: 'p9', name: 'Veste Wind Urban', brand: 'Street Sport', price: 109, oldPrice: 129, category: 'vetements', gender: 'femme', sport: 'running', isNew: true, image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=900&q=80', sizes: ['S', 'M', 'L', 'XL'], desc: 'Protection légère contre le vent.' },
  { id: 'p10', name: 'Casquette Snap 75018', brand: 'Street Sport', price: 29, oldPrice: null, category: 'accessoires', gender: 'unisex', sport: 'lifestyle', isNew: false, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80', sizes: ['Unique'], desc: 'Broderie premium, ajustable.' },
  { id: 'p11', name: 'Sac Banane Tech', brand: 'Street Sport', price: 39, oldPrice: null, category: 'accessoires', gender: 'unisex', sport: 'lifestyle', isNew: true, image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80', sizes: ['Unique'], desc: 'Format compact avec poche zippée.' },
  { id: 'p12', name: 'Backpack Sport Daily', brand: 'Street Sport', price: 69, oldPrice: 79, category: 'accessoires', gender: 'unisex', sport: 'training', isNew: true, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80', sizes: ['Unique'], desc: 'Compartiments laptop et chaussures.' },
];

const defaultData = {
  brand: { name: 'Street Sport', tagline: 'Sport urbain et streetwear', address: '30 Bd Ornano, 75018 Paris' },
  hero: {
    title: 'Nouveautés performance & street',
    subtitle: 'Des drops sneakers, vêtements et accessoires. Livraison rapide en France.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1900&q=80',
  },
  nav: {
    nouveautes: ['Nouveaux produits', 'Best-sellers', 'Drops exclusifs', 'Collections saison'],
    homme: ['Chaussures', 'Vêtements', 'Accessoires', 'Running', 'Training', 'Basket'],
    femme: ['Chaussures', 'Vêtements', 'Accessoires', 'Lifestyle', 'Running', 'Yoga'],
    enfants: ['Chaussures', 'Vêtements', 'Accessoires', 'Sport', 'École'],
    sport: ['Running', 'Football', 'Basketball', 'Training', 'Tennis'],
  },
  categories: [
    { id: 'homme', name: 'Homme', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80' },
    { id: 'femme', name: 'Femme', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80' },
    { id: 'sneakers', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80' },
  ],
  products: seedProducts,
};

function useData() {
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

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function updatePath(setData, path, value) {
  setData((prev) => {
    const next = structuredClone(prev);
    let cursor = next;
    for (let i = 0; i < path.length - 1; i += 1) cursor = cursor[path[i]];
    cursor[path[path.length - 1]] = value;
    return next;
  });
}


function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.16 });
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}


function BrandStrip() {
  const doubled = BRANDS.concat(BRANDS);
  return (
    <div className="brand-strip" aria-label="Marques disponibles">
      <div className="brand-track">
        {doubled.map((b, i) => (
          <span key={`${b.name}-${i}`}>{b.name}</span>
        ))}
      </div>
    </div>
  );
}


function useDeviceClass() {
  useEffect(() => {
    const apply = () => {
      const isMobile = window.matchMedia('(max-width: 900px)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      document.body.classList.toggle('is-mobile', isMobile);
      document.body.classList.toggle('is-desktop', !isMobile);
    };
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);
}

function Header({ data, cartCount, onOpenCart }) {
  return (
    <header className="topbar">
      <div className="topline">Livraison offerte dès 100 EUR • DERNIÈRES COLLECTIONS</div>
      <BrandStrip />
      <div className="navline">
        <div className="brand-block">
          <p className="brand">New Sport</p>
          <div className="brand-sub">
            <a href="#nouveautes">Homme</a>
            <a href="#nouveautes">Femme</a>
          </div>
        </div>
        <div className="quick-links">
          <a href="#nouveautes">Sneakers</a>
          <a href="#catalogue">Catalogue</a>
        </div>
        <input className="search" id="search" placeholder="Rechercher chaussures, vêtements, accessoires" />
        <button className="cart-chip" onClick={onOpenCart}>Panier ({cartCount})</button>
      </div>
    </header>
  );
}

function CategoryExplorer({ data }) {
  return (
    <section id="nouveautes" className="section reveal compact-section">
      <div className="mini-highlight logo-highlight" aria-label="Logo Street Sport Paris 18">
        <div className="ss-logo-box">
          <div className="ss-logo-line">
            <span>STREETSP</span><span className="o-red">O</span><span>RT</span>
          </div>
          <div className="ss-logo-sub">PARIS</div>
        </div>
      </div>

      <div className="photo-marquee" aria-label="Banderole logos marques">
        <div className="photo-track logo-track">
          {BRANDS.concat(BRANDS).map((b, i) => (
            <div key={`${b.name}-${i}`} className="logo-tile">
              <img src={b.logo} alt={b.name} />
            </div>
          ))}
        </div>
      </div>

      <div className="marquee" aria-label="Banderole nouveautés">
        <div className="marquee-track">
          <span>NOUVEAUTÉS</span>
          <span>•</span>
          <span>LIVRAISON 24/48H</span>
          <span>•</span>
          <span>RETOURS 30 JOURS</span>
          <span>•</span>
          <span>DROP STREET SPORT</span>
          <span>•</span>
          <span>NOUVEAUTÉS</span>
          <span>•</span>
          <span>LIVRAISON 24/48H</span>
          <span>•</span>
          <span>RETOURS 30 JOURS</span>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, onOpen, onQuickAdd }) {
  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
  return (
    <article className="product-card">
      <button className="img-btn" onClick={() => onOpen(p)}><img src={p.image} alt={p.name} /></button>
      <div>
        <small>{p.brand} • {p.gender}</small>
        <h3>{p.name}</h3>
        <p><strong>{p.price} EUR</strong>{p.oldPrice ? <span className="old">{p.oldPrice} EUR</span> : null}{discount > 0 ? <span className="sale">-{discount}%</span> : null}</p>
        <div className="card-actions"><button onClick={() => onOpen(p)}>Voir</button><button onClick={() => onQuickAdd(p)}>Ajout rapide</button></div>
      </div>
    </article>
  );
}

function SmartRecommendations({ viewed, all, onOpen, onQuickAdd }) {
  const recos = useMemo(() => {
    if (!viewed.length) return all.filter((x) => x.isNew).slice(0, 6);
    const last = viewed[viewed.length - 1];
    return all.filter((x) => x.id !== last.id && (x.category === last.category || x.brand === last.brand || x.sport === last.sport)).slice(0, 6);
  }, [viewed, all]);
  return (
    <section className="section reveal"><h2>Recommandé pour toi</h2><div className="cards-3">{recos.map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} onQuickAdd={onQuickAdd} />)}</div></section>
  );
}

function Catalog({ products, onOpen, onQuickAdd }) {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');
  const [gender, setGender] = useState('all');
  const [sport, setSport] = useState('all');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    const input = document.getElementById('search');
    if (!input) return;
    const onInput = (e) => setQ(e.target.value);
    input.addEventListener('input', onInput);
    return () => input.removeEventListener('input', onInput);
  }, []);

  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    const t = q.toLowerCase();
    return products.filter((p) => [p.name, p.brand, p.category, p.sport].join(' ').toLowerCase().includes(t)).slice(0, 5).map((p) => p.name);
  }, [q, products]);

  const list = useMemo(() => {
    let r = products;
    if (category !== 'all') r = r.filter((x) => x.category === category);
    if (gender !== 'all') r = r.filter((x) => x.gender === gender || x.gender === 'unisex');
    if (sport !== 'all') r = r.filter((x) => x.sport === sport);
    if (q.trim()) {
      const t = q.toLowerCase();
      r = r.filter((x) => [x.name, x.brand, x.category, x.desc].join(' ').toLowerCase().includes(t));
    }
    if (sort === 'price-asc') r = [...r].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') r = [...r].sort((a, b) => b.price - a.price);
    if (sort === 'new') r = [...r].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return r;
  }, [products, q, category, gender, sport, sort]);

  return (
    <section id="catalogue" className="section reveal">
      <div className="shop-head reveal">
        <h2>Tous les articles</h2>
        <div className="shop-controls">
          <select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">Catégorie</option><option value="sneakers">Sneakers</option><option value="vetements">Vêtements</option><option value="accessoires">Accessoires</option></select>
          <select value={gender} onChange={(e) => setGender(e.target.value)}><option value="all">Genre</option><option value="homme">Homme</option><option value="femme">Femme</option><option value="enfant">Enfant</option></select>
          <select value={sport} onChange={(e) => setSport(e.target.value)}><option value="all">Sport</option><option value="running">Running</option><option value="basket">Basket</option><option value="training">Training</option><option value="lifestyle">Lifestyle</option></select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Sélection</option><option value="new">Nouveautés</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option></select>
        </div>
      </div>
      {suggestions.length ? <div className="suggestions">Suggestions: {suggestions.join(' • ')}</div> : null}
      <div className="cards-3">{list.map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} onQuickAdd={onQuickAdd} />)}</div>
    </section>
  );
}

function ProductModal({ product, onClose, onAdd }) {
  const [size, setSize] = useState(product?.sizes?.[0] || 'Unique');
  if (!product) return null;
  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={product.image} alt={product.name} />
        <div>
          <small>{product.brand}</small>
          <h3>{product.name}</h3>
          <p>{product.desc}</p>
          <label>Taille</label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>{product.sizes.map((s) => <option key={s}>{s}</option>)}</select>
          <div className="hero-actions"><button onClick={() => onAdd(product, size)}>Ajouter au panier</button><button className="btn ghost" onClick={onClose}>Fermer</button></div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, cart, setCart }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 6.9;
  const total = subtotal + shipping;
  return (
    <aside className={`drawer ${open ? 'show' : ''}`}>
      <div className="drawer-head"><h3>Panier</h3><button onClick={onClose}>Fermer</button></div>
      <div className="drawer-body">{cart.length === 0 ? <p>Ton panier est vide.</p> : cart.map((i) => <div className="line" key={i.key}><img src={i.image} alt={i.name} /><div><strong>{i.name}</strong><p>{i.size} - {i.price} EUR</p><div className="hero-actions"><button onClick={() => setCart((p) => p.map((x) => x.key === i.key ? { ...x, qty: Math.max(1, x.qty - 1) } : x))}>-</button><span>{i.qty}</span><button onClick={() => setCart((p) => p.map((x) => x.key === i.key ? { ...x, qty: x.qty + 1 } : x))}>+</button><button onClick={() => setCart((p) => p.filter((x) => x.key !== i.key))}>Suppr.</button></div></div></div>)}</div>
      <div className="drawer-foot"><p>Sous-total: <strong>{subtotal.toFixed(2)} EUR</strong></p><p>Livraison: <strong>{shipping === 0 ? 'Offerte' : `${shipping.toFixed(2)} EUR`}</strong></p><p>Total: <strong>{total.toFixed(2)} EUR</strong></p><button>Payer</button></div>
    </aside>
  );
}


function AdminLogin({ onSuccess, onClose }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem(ADMIN_SESSION_KEY, '1');
      onSuccess();
      return;
    }
    setError('Identifiants invalides');
  };

  return (
    <div className="admin-overlay" onClick={onClose}>
      <form className="admin-login" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h3>Connexion Back Office</h3>
        <input placeholder="Identifiant" value={user} onChange={(e) => setUser(e.target.value)} />
        <input placeholder="Mot de passe" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        {error ? <p className="error">{error}</p> : null}
        <div className="hero-actions">
          <button type="submit">Se connecter</button>
          <button type="button" className="btn ghost" onClick={onClose}>Annuler</button>
        </div>
      </form>
    </div>
  );
}

function BackOffice({ open, onClose, data, setData }) {
  const [tab, setTab] = useState('produits');
  if (!open) return null;
  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin" onClick={(e) => e.stopPropagation()}>
        <div className="admin-head"><h3>Back Office Catalogue</h3><div className="hero-actions"><button onClick={() => { localStorage.removeItem(ADMIN_SESSION_KEY); onClose(); }}>Déconnexion</button><button onClick={onClose}>Fermer</button></div></div>
        <div className="admin-tabs">{['hero', 'categories', 'produits'].map((t) => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>

        {tab === 'hero' && (
          <section className="admin-section">
            <input value={data.hero.title} onChange={(e) => updatePath(setData, ['hero', 'title'], e.target.value)} placeholder="Titre hero" />
            <textarea rows={3} value={data.hero.subtitle} onChange={(e) => updatePath(setData, ['hero', 'subtitle'], e.target.value)} />
            <input value={data.hero.image} onChange={(e) => updatePath(setData, ['hero', 'image'], e.target.value)} placeholder="URL image hero" />
            <label className="import-btn">Importer image hero<input type="file" accept="image/*" onChange={async (e) => {
              const f = e.target.files?.[0]; if (!f) return;
              const url = await fileToDataUrl(f); updatePath(setData, ['hero', 'image'], url);
            }} /></label>
          </section>
        )}

        {tab === 'categories' && (
          <section className="admin-section">
            {data.categories.map((c, i) => (
              <div className="admin-card" key={c.id}>
                <input value={c.name} onChange={(e) => updatePath(setData, ['categories', i, 'name'], e.target.value)} />
                <input value={c.image} onChange={(e) => updatePath(setData, ['categories', i, 'image'], e.target.value)} placeholder="URL image catégorie" />
                <label>Importer image<input type="file" accept="image/*" onChange={async (e) => {
                  const f = e.target.files?.[0]; if (!f) return;
                  const url = await fileToDataUrl(f); updatePath(setData, ['categories', i, 'image'], url);
                }} /></label>
              </div>
            ))}
          </section>
        )}

        {tab === 'produits' && (
          <section className="admin-section">
            {data.products.map((p, i) => (
              <div className="admin-card" key={p.id}>
                <input value={p.name} onChange={(e) => updatePath(setData, ['products', i, 'name'], e.target.value)} placeholder="Nom produit" />
                <input value={p.brand} onChange={(e) => updatePath(setData, ['products', i, 'brand'], e.target.value)} placeholder="Marque" />
                <input type="number" value={p.price} onChange={(e) => updatePath(setData, ['products', i, 'price'], Number(e.target.value || 0))} placeholder="Prix" />
                <input type="number" value={p.oldPrice || 0} onChange={(e) => updatePath(setData, ['products', i, 'oldPrice'], Number(e.target.value || 0) || null)} placeholder="Ancien prix" />
                <input value={p.category} onChange={(e) => updatePath(setData, ['products', i, 'category'], e.target.value)} placeholder="Catégorie" />
                <input value={p.gender} onChange={(e) => updatePath(setData, ['products', i, 'gender'], e.target.value)} placeholder="Genre" />
                <input value={p.sport} onChange={(e) => updatePath(setData, ['products', i, 'sport'], e.target.value)} placeholder="Sport" />
                <textarea rows={2} value={p.desc} onChange={(e) => updatePath(setData, ['products', i, 'desc'], e.target.value)} placeholder="Description" />
                <input value={p.image} onChange={(e) => updatePath(setData, ['products', i, 'image'], e.target.value)} placeholder="URL image" />
                <input value={p.sizes.join(',')} onChange={(e) => updatePath(setData, ['products', i, 'sizes'], e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} placeholder="Tailles: 40,41,42" />
                <label>Importer image<input type="file" accept="image/*" onChange={async (e) => {
                  const f = e.target.files?.[0]; if (!f) return;
                  const url = await fileToDataUrl(f); updatePath(setData, ['products', i, 'image'], url);
                }} /></label>
                <button onClick={() => setData((prev) => ({ ...prev, products: prev.products.filter((x) => x.id !== p.id) }))}>Supprimer</button>
              </div>
            ))}
            <button onClick={() => setData((prev) => ({
              ...prev,
              products: [...prev.products, { id: `p${Date.now()}`, name: 'Nouveau produit', brand: 'Street Sport', price: 0, oldPrice: null, category: 'sneakers', gender: 'unisex', sport: 'lifestyle', isNew: true, image: '', sizes: ['Unique'], desc: 'Description' }],
            }))}>Ajouter un produit</button>
          </section>
        )}
      </div>
    </div>
  );
}

function Footer({ data }) {
  return <footer className="footer reveal revealed"><p>{data.brand.name} • {data.brand.tagline}</p><p>{data.brand.address}</p></footer>;
}

export default function App() {
  useReveal();
  useDeviceClass();
  const [data, setData] = useData();
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [viewed, setViewed] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    if (localStorage.getItem(ADMIN_SESSION_KEY) === '1') setAdminAuth(true);
  }, []);

  const openProduct = (p) => {
    setSelected(p);
    setViewed((prev) => [...prev.filter((x) => x.id !== p.id), p].slice(-10));
  };

  const addToCart = (p, size = p.sizes?.[0] || 'Unique') => {
    const key = `${p.id}-${size}`;
    setCart((prev) => {
      const ex = prev.find((x) => x.key === key);
      if (ex) return prev.map((x) => x.key === key ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { key, id: p.id, name: p.name, image: p.image, price: p.price, size, qty: 1 }];
    });
    setCartOpen(true);
  };

  return (
    <main id="home">
      <Header data={data} cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <CategoryExplorer data={data} />
      <Catalog products={data.products} onOpen={openProduct} onQuickAdd={addToCart} />
      <SmartRecommendations viewed={viewed} all={data.products} onOpen={openProduct} onQuickAdd={addToCart} />
      <Footer data={data} />

      <div className="admin-end-wrap"><button className="admin-fab" onClick={() => { if (adminAuth) setAdminOpen(true); else setLoginOpen(true); }}>Back Office</button></div>

      <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={addToCart} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} />
      <BackOffice open={adminOpen} onClose={() => setAdminOpen(false)} data={data} setData={setData} />
      {loginOpen ? <AdminLogin onSuccess={() => { setAdminAuth(true); setLoginOpen(false); setAdminOpen(true); }} onClose={() => setLoginOpen(false)} /> : null}
    </main>
  );
}
