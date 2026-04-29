import React, { useMemo, useState } from 'react';
import '@fontsource/anton';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/700.css';
import './index.css';
import { CATEGORIES, PRODUCTS, STORE_INFO } from './mock';
import { CartProvider, useCart } from './context/CartContext';

function Header({ page, setPage }) {
  const { count, setOpen } = useCart();
  const tabs = [
    ['home', 'Accueil'],
    ['shop', 'Boutique'],
    ['about', 'A propos'],
    ['contact', 'Contact'],
  ];
  return (
    <header className="topbar">
      <div className="brand" onClick={() => setPage('home')}>Street Sport</div>
      <nav>{tabs.map(([id, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => setPage(id)}>{label}</button>)}</nav>
      <button className="cart-btn" onClick={() => setOpen(true)}>Panier ({count})</button>
    </header>
  );
}

function Home({ setPage }) {
  return (
    <section className="hero fadein">
      <p className="kicker">PARIS 18</p>
      <h1>L'UNIFORME DE LA RUE</h1>
      <p>{STORE_INFO.tagline}</p>
      <div className="row"><button onClick={() => setPage('shop')}>Shopper</button><button className="ghost" onClick={() => setPage('about')}>Le shop</button></div>
    </section>
  );
}

function Shop({ onOpen }) {
  const [cat, setCat] = useState('all');
  const list = useMemo(() => (cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)), [cat]);
  return (
    <section className="page fadein">
      <h2>Boutique</h2>
      <div className="chips">{CATEGORIES.map((c) => <button key={c.id} className={cat === c.id ? 'active' : ''} onClick={() => setCat(c.id)}>{c.label}</button>)}</div>
      <div className="grid">{list.map((p) => <article className="card" key={p.id} onClick={() => onOpen(p)}><img src={p.image} alt={p.name} /><div><strong>{p.name}</strong><p>{p.brand}</p><span>{p.price} EUR</span></div></article>)}</div>
    </section>
  );
}

function ProductModal({ product, onClose }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product?.sizes?.[0] || 'Unique');
  if (!product) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={product.image} alt={product.name} />
        <div>
          <h3>{product.name}</h3>
          <p>{product.desc}</p>
          <label>Taille</label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>{product.sizes.map((s) => <option key={s}>{s}</option>)}</select>
          <div className="row"><strong>{product.price} EUR</strong><button onClick={() => addItem(product, size)}>Ajouter</button></div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer() {
  const { open, setOpen, items, setQty, removeItem, subtotal } = useCart();
  return (
    <aside className={`drawer ${open ? 'show' : ''}`}>
      <div className="drawer-head"><h3>Panier</h3><button onClick={() => setOpen(false)}>Fermer</button></div>
      <div className="drawer-body">{items.length === 0 ? <p>Ton panier est vide.</p> : items.map((it) => <div className="line" key={it.key}><img src={it.image} alt={it.name} /><div><strong>{it.name}</strong><p>{it.size} - {it.price} EUR</p><div className="row"><button onClick={() => setQty(it.key, it.qty - 1)}>-</button><span>{it.qty}</span><button onClick={() => setQty(it.key, it.qty + 1)}>+</button><button className="ghost" onClick={() => removeItem(it.key)}>Suppr.</button></div></div></div>)}</div>
      <div className="drawer-foot"><strong>Total: {subtotal} EUR</strong><button>Payer</button></div>
    </aside>
  );
}

function About() {
  return <section className="page fadein"><h2>A propos</h2><p>Street Sport propose sneakers, vetements et accessoires selectionnes pour le style urbain. Adresse: {STORE_INFO.address}</p></section>;
}

function Contact() {
  return (
    <section className="page fadein">
      <h2>Contact</h2>
      <p>Tel: {STORE_INFO.phone}</p>
      <p>Email: {STORE_INFO.email}</p>
      <p>{STORE_INFO.address}</p>
      <form className="newsletter" onSubmit={(e) => e.preventDefault()}><label>Newsletter</label><div className="row"><input type="email" placeholder="ton@email.com" /><button>S'inscrire</button></div></form>
    </section>
  );
}

function AppContent() {
  const [page, setPage] = useState('home');
  const [selected, setSelected] = useState(null);
  return (
    <>
      <Header page={page} setPage={setPage} />
      {page === 'home' && <Home setPage={setPage} />}
      {page === 'shop' && <Shop onOpen={setSelected} />}
      {page === 'about' && <About />}
      {page === 'contact' && <Contact />}
      <CartDrawer />
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export default function App() {
  return <CartProvider><AppContent /></CartProvider>;
}
