import React, { useEffect, useMemo, useState } from 'react';
import '@fontsource/anton';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/700.css';
import './index.css';

const STORAGE_KEY = 'streetsport_nike_visual_bo_v1';
const CART_KEY = 'streetsport_cart_v2';

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
const FALLBACK_IMG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%' height='100%' fill='%23121212'/><text x='50%' y='50%' fill='%23d9d9d9' font-family='Arial, sans-serif' font-size='36' text-anchor='middle' dominant-baseline='middle'>Image indisponible</text></svg>";

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
  content: {
    topline: 'Livraison offerte dès 100 EUR • DERNIÈRES COLLECTIONS',
    siteTitle: 'Street Sport Paris',
    logoMain: 'STREETSPORT',
    logoSub: 'PARIS',
    catalogTitle: 'Tous les articles',
    marquee: ['NOUVEAUTÉS', 'LIVRAISON 24/48H', 'RETOURS 30 JOURS', 'DROP STREET SPORT'],
  },
  hero: {
    title: 'Nouveautés performance & street',
    subtitle: 'Des drops sneakers, vêtements et accessoires. Livraison rapide en France.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1900&q=80',
  },
  heroSlides: [
    {
      id: 'h1',
      title: 'Nouveautés performance & street',
      subtitle: 'Des drops sneakers, vêtements et accessoires. Livraison rapide en France.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1900&q=80',
    },
  ],
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
  const [saveError, setSaveError] = useState('');
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...defaultData, ...JSON.parse(raw) };
        if (!parsed.heroSlides || !parsed.heroSlides.length) {
          parsed.heroSlides = [{ id: `h${Date.now()}`, ...parsed.hero }];
        }
        parsed.hero = parsed.heroSlides[0] || parsed.hero;
        setData(parsed);
      }
    } catch (_) {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaveError('');
    } catch (_) {
      setSaveError("Stockage saturé: réduis le nombre/taille des images.");
    }
  }, [data]);
  return [data, setData, saveError];
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const maxW = 1400;
        const ratio = Math.min(1, maxW / img.width);
        const w = Math.max(1, Math.round(img.width * ratio));
        const h = Math.max(1, Math.round(img.height * ratio));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        // WebP compressé pour limiter le poids dans localStorage
        resolve(canvas.toDataURL('image/webp', 0.76));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
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

function SafeImg({ src, alt, className, eager = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? FALLBACK_IMG : src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function BrandLogoTile({ brand }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="logo-tile">
      {!failed ? (
        <img
          src={brand.logo}
          alt={brand.name}
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="logo-fallback">{brand.name}</span>
      )}
    </div>
  );
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
      <div className="topline">{data.content?.topline || 'Livraison offerte dès 100 EUR • DERNIÈRES COLLECTIONS'}</div>
      <BrandStrip />
      <div className="navline">
        <div className="brand-block">
          <p className="brand">{data.content?.siteTitle || 'Street Sport Paris'}</p>
        </div>
        <input className="search" id="search" placeholder="Rechercher chaussures, vêtements, accessoires" />
        <button className="cart-chip" onClick={onOpenCart}>Panier ({cartCount})</button>
      </div>
    </header>
  );
}

function CategoryExplorer({ data }) {
  const logoMain = data.content?.logoMain || 'STREETSPORT';
  const logoSub = data.content?.logoSub || 'PARIS';
  const mainLeft = logoMain.includes('O') ? logoMain.split('O')[0] : logoMain;
  const mainRight = logoMain.includes('O') ? logoMain.split('O').slice(1).join('O') : '';
  const marqueeItems = (data.content?.marquee && data.content.marquee.length ? data.content.marquee : ['NOUVEAUTÉS', 'LIVRAISON 24/48H', 'RETOURS 30 JOURS', 'DROP STREET SPORT']);
  const marqueeSequence = [...marqueeItems, ...marqueeItems];
  return (
    <section id="nouveautes" className="section reveal compact-section">
      <div className="mini-highlight logo-highlight" aria-label="Logo Street Sport Paris 18">
        <div className="ss-logo-box">
          <div className="ss-logo-line">
            {logoMain.includes('O') ? (
              <>
                <span>{mainLeft}</span><span className="o-red">O</span><span>{mainRight}</span>
              </>
            ) : (
              <span>{logoMain}</span>
            )}
          </div>
          <div className="ss-logo-sub">{logoSub}</div>
        </div>
      </div>

      <div className="photo-marquee" aria-label="Banderole logos marques">
        <div className="photo-track logo-track">
          {BRANDS.concat(BRANDS).map((b, i) => (
            <BrandLogoTile key={`${b.name}-${i}`} brand={b} />
          ))}
        </div>
      </div>

      <div className="marquee" aria-label="Banderole nouveautés">
        <div className="marquee-track">
          {marqueeSequence.map((item, idx) => (
            <React.Fragment key={`${item}-${idx}`}>
              <span>{item}</span>
              {idx < marqueeSequence.length - 1 ? <span>•</span> : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, onOpen, onQuickAdd }) {
  const toAmount = (v) => {
    const m = String(v ?? '').replace(',', '.').match(/-?\d+(\.\d+)?/);
    return m ? Number.parseFloat(m[0]) : Number.NaN;
  };
  const priceNum = toAmount(p.price);
  const oldPriceNum = toAmount(p.oldPrice);
  const discount = Number.isFinite(priceNum) && Number.isFinite(oldPriceNum) && oldPriceNum > priceNum ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100) : 0;
  const mainImage = (p.images && p.images.length ? p.images[0] : p.image) || '';
  const pretty = (v) => String(v || '').replaceAll('-', ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  const meta = [p.brand, pretty(p.gender), pretty(p.category), p.subcategory ? pretty(p.subcategory) : null].filter(Boolean).join(' • ');
  return (
    <article className="product-card">
      <button className="img-btn" onClick={() => onOpen(p)}>
        <SafeImg src={mainImage} alt={p.name} eager />
        {discount > 0 ? <span className="promo-ribbon">PROMO - {discount}%</span> : null}
      </button>
      <div>
        <small>{meta}</small>
        <h3>{p.name}</h3>
        <p><strong>{String(p.price)}</strong>{p.oldPrice ? <span className="old">{String(p.oldPrice)}</span> : null}</p>
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

function Catalog({ data, products, onOpen, onQuickAdd }) {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');

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

  const categoryOptions = useMemo(() => {
    const seen = new Set();
    return products
      .map((p) => p.category)
      .filter(Boolean)
      .filter((c) => {
        if (seen.has(c)) return false;
        seen.add(c);
        return true;
      });
  }, [products]);

  const list = useMemo(() => {
    let r = products;
    if (category !== 'all') r = r.filter((x) => x.category === category);
    if (q.trim()) {
      const t = q.toLowerCase();
      r = r.filter((x) => [x.name, x.brand, x.category, x.subcategory || '', x.desc].join(' ').toLowerCase().includes(t));
    }
    return r;
  }, [products, q, category]);

  return (
    <section id="catalogue" className="section reveal">
      <div className="shop-head reveal">
        <h2>{data.content?.catalogTitle || 'Tous les articles'}</h2>
        <div className="shop-controls">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">Catégorie</option>
            {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      {suggestions.length ? <div className="suggestions">Suggestions: {suggestions.join(' • ')}</div> : null}
      <div className="cards-3">{list.map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} onQuickAdd={onQuickAdd} />)}</div>
    </section>
  );
}

function ProductModal({ product, onClose, onAdd }) {
  const [size, setSize] = useState(product?.sizes?.[0] || 'Unique');
  const [active, setActive] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  useEffect(() => { setActive(0); }, [product?.id]);
  if (!product) return null;
  const gallery = (product.images && product.images.length ? product.images : [product.image]).filter(Boolean);
  const next = () => setActive((cur) => (cur + 1) % gallery.length);
  const prev = () => setActive((cur) => (cur - 1 + gallery.length) % gallery.length);
  const onTouchStart = (e) => setTouchStartX(e.changedTouches?.[0]?.clientX ?? null);
  const onTouchEnd = (e) => {
    if (touchStartX == null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? touchStartX;
    const delta = endX - touchStartX;
    if (Math.abs(delta) > 32) {
      if (delta < 0) next();
      else prev();
    }
    setTouchStartX(null);
  };
  const pretty = (v) => String(v || '').replaceAll('-', ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="product-gallery" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <SafeImg src={gallery[active] || ''} alt={product.name} eager />
          {gallery.length > 1 ? (
            <div className="gallery-dots" aria-label="Galerie photos">
              {gallery.map((img, i) => <span key={`${product.id}-img-${i}`} className={`dot ${i === active ? 'active' : ''}`} />)}
            </div>
          ) : null}
        </div>
        <div>
          <small>{[product.brand, pretty(product.gender), pretty(product.category), product.subcategory ? pretty(product.subcategory) : null].filter(Boolean).join(' • ')}</small>
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
  const [step, setStep] = useState('cart');
  const [promo, setPromo] = useState('');
  const [promoOk, setPromoOk] = useState('');
  const [shippingMode, setShippingMode] = useState('standard');
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [errors, setErrors] = useState({});
  const [orderRef, setOrderRef] = useState('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingBase = shippingMode === 'express' ? 9.9 : subtotal >= 100 || subtotal === 0 ? 0 : 6.9;
  const discount = promoOk === 'SAVE10' ? subtotal * 0.1 : promoOk === 'SAVE20' ? subtotal * 0.2 : 0;
  const total = Math.max(0, subtotal - discount + shippingBase);

  const clearCheckout = () => {
    setStep('cart');
    setPromo('');
    setPromoOk('');
    setShippingMode('standard');
    setCustomer({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
    setErrors({});
  };

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (code === 'SAVE10' || code === 'SAVE20') {
      setPromoOk(code);
    } else {
      setPromoOk('');
    }
  };

  const validateCustomer = () => {
    const e = {};
    if (!customer.name.trim()) e.name = 'Nom requis';
    if (!customer.email.includes('@')) e.email = 'Email invalide';
    if (!customer.address.trim()) e.address = 'Adresse requise';
    if (!customer.city.trim()) e.city = 'Ville requise';
    if (!customer.zip.trim()) e.zip = 'Code postal requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const confirmOrder = () => {
    if (!validateCustomer()) return;
    const ref = `SS-${Date.now().toString().slice(-8)}`;
    setOrderRef(ref);
    setStep('done');
    setCart([]);
  };

  return (
    <aside className={`drawer ${open ? 'show' : ''}`}>
      <div className="drawer-head"><h3>Panier</h3><button onClick={() => { onClose(); clearCheckout(); }}>Continuer mes achats</button></div>

      {step === 'cart' && (
        <>
          <div className="drawer-body">
            {cart.length === 0 ? <p>Ton panier est vide.</p> : cart.map((i) => (
              <div className="line" key={i.key}>
                <SafeImg src={i.image} alt={i.name} />
                <div>
                  <strong>{i.name}</strong>
                  <p>{i.size} - {i.price} EUR</p>
                  <div className="hero-actions">
                    <button onClick={() => setCart((p) => p.map((x) => x.key === i.key ? { ...x, qty: Math.max(1, x.qty - 1) } : x))}>-</button>
                    <span>{i.qty}</span>
                    <button onClick={() => setCart((p) => p.map((x) => x.key === i.key ? { ...x, qty: x.qty + 1 } : x))}>+</button>
                    <button onClick={() => setCart((p) => p.filter((x) => x.key !== i.key))}>Suppr.</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="drawer-foot">
            <div className="promo-row">
              <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Code promo (SAVE10 / SAVE20)" />
              <button onClick={applyPromo}>Appliquer</button>
            </div>
            {promo && <small>{promoOk ? `Code appliqué: ${promoOk}` : 'Code invalide'}</small>}
            <p>Sous-total: <strong>{subtotal.toFixed(2)} EUR</strong></p>
            {discount > 0 ? <p>Réduction: <strong>-{discount.toFixed(2)} EUR</strong></p> : null}
            <div className="ship-mode">
              <label><input type="radio" checked={shippingMode === 'standard'} onChange={() => setShippingMode('standard')} /> Standard</label>
              <label><input type="radio" checked={shippingMode === 'express'} onChange={() => setShippingMode('express')} /> Express</label>
            </div>
            <p>Livraison: <strong>{shippingBase === 0 ? 'Offerte' : `${shippingBase.toFixed(2)} EUR`}</strong></p>
            <p>Total: <strong>{total.toFixed(2)} EUR</strong></p>
            <button disabled={!cart.length} onClick={() => setStep('checkout')}>Passer au paiement</button>
          </div>
        </>
      )}

      {step === 'checkout' && (
        <div className="drawer-body checkout-form">
          <h4>Informations de livraison</h4>
          <input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Nom complet" />
          {errors.name ? <small className="error">{errors.name}</small> : null}
          <input value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="Email" />
          {errors.email ? <small className="error">{errors.email}</small> : null}
          <input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="Téléphone" />
          <input value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} placeholder="Adresse" />
          {errors.address ? <small className="error">{errors.address}</small> : null}
          <div className="split">
            <div>
              <input value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} placeholder="Ville" />
              {errors.city ? <small className="error">{errors.city}</small> : null}
            </div>
            <div>
              <input value={customer.zip} onChange={(e) => setCustomer({ ...customer, zip: e.target.value })} placeholder="Code postal" />
              {errors.zip ? <small className="error">{errors.zip}</small> : null}
            </div>
          </div>
          <p>Total à payer: <strong>{total.toFixed(2)} EUR</strong></p>
          <div className="hero-actions">
            <button onClick={confirmOrder}>Confirmer la commande</button>
            <button className="btn ghost" onClick={() => setStep('cart')}>Retour panier</button>
          </div>
        </div>
      )}

      {step === 'done' && (
        <div className="drawer-body checkout-form">
          <h4>Commande confirmée</h4>
          <p>Merci {customer.name}, ta commande est validée.</p>
          <p>Référence: <strong>{orderRef}</strong></p>
          <p>Un email de confirmation a été envoyé à {customer.email}.</p>
          <button onClick={() => { clearCheckout(); onClose(); }}>Terminer</button>
        </div>
      )}
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

function BackOffice({ open, onClose, data, setData, saveError }) {
  const [tab, setTab] = useState('produits');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [savedProductId, setSavedProductId] = useState('');
  const [savedHeroId, setSavedHeroId] = useState('');
  const [savedCategoryId, setSavedCategoryId] = useState('');
  const [sizeDrafts, setSizeDrafts] = useState({});
  const slugify = (v) => String(v || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const productCategoryOptions = useMemo(() => {
    return (data.categories || []).map((c) => ({ value: c.id, label: c.name }));
  }, [data.categories]);
  const productGenderOptions = useMemo(() => ([
    { value: 'homme', label: 'Homme' },
    { value: 'femme', label: 'Femme' },
    { value: 'enfant', label: 'Enfant' },
    { value: 'unisex', label: 'Unisex' },
  ]), []);
  const productSportOptions = useMemo(() => ([
    { value: 'running', label: 'Running' },
    { value: 'basket', label: 'Basket' },
    { value: 'training', label: 'Training' },
    { value: 'lifestyle', label: 'Lifestyle' },
  ]), []);
  const productSubcategoryOptions = useMemo(() => {
    const list = Object.values(data.nav || {}).flatMap((arr) => arr || []);
    const seen = new Set();
    return list
      .map((x) => ({ value: slugify(x), label: x }))
      .filter((o) => {
        if (!o.value || seen.has(o.value)) return false;
        seen.add(o.value);
        return true;
      });
  }, [data.nav]);
  if (!open) return null;
  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin" onClick={(e) => e.stopPropagation()}>
        <div className="admin-head"><h3>Back Office Catalogue</h3><div className="hero-actions"><button onClick={() => { localStorage.removeItem(ADMIN_SESSION_KEY); onClose(); }}>Déconnexion</button><button onClick={onClose}>Fermer</button></div></div>
        <div className="admin-actions"><small>Le bouton Enregistrer valide visuellement la mise à jour immédiate sur le site.</small></div>
        {saveError ? <div className="admin-actions"><small className="error">{saveError}</small></div> : null}
        <div className="admin-tabs">{['hero', 'categories', 'produits'].map((t) => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>

        {tab === 'hero' && (
          <section className="admin-section">
            {(data.heroSlides || []).map((h, i) => (
              <div className="admin-card" key={h.id || i}>
                <input value={h.title} onChange={(e) => setData((prev) => {
                  const heroSlides = [...(prev.heroSlides || [])];
                  heroSlides[i] = { ...heroSlides[i], title: e.target.value };
                  return { ...prev, heroSlides, hero: heroSlides[0] || prev.hero };
                })} placeholder="Titre hero" />
                <textarea rows={3} value={h.subtitle} onChange={(e) => setData((prev) => {
                  const heroSlides = [...(prev.heroSlides || [])];
                  heroSlides[i] = { ...heroSlides[i], subtitle: e.target.value };
                  return { ...prev, heroSlides, hero: heroSlides[0] || prev.hero };
                })} />
                <input value={h.image} onChange={(e) => setData((prev) => {
                  const heroSlides = [...(prev.heroSlides || [])];
                  heroSlides[i] = { ...heroSlides[i], image: e.target.value };
                  return { ...prev, heroSlides, hero: heroSlides[0] || prev.hero };
                })} placeholder="URL image hero" />
                <label className="import-btn">Importer image hero<input type="file" accept="image/*" onChange={async (e) => {
                  const f = e.target.files?.[0]; if (!f) return;
                  const url = await fileToDataUrl(f);
                  setData((prev) => {
                    const heroSlides = [...(prev.heroSlides || [])];
                    heroSlides[i] = { ...heroSlides[i], image: url };
                    return { ...prev, heroSlides, hero: heroSlides[0] || prev.hero };
                  });
                }} /></label>
                <button onClick={() => {
                  setData((prev) => ({ ...prev }));
                  setSavedHeroId(h.id || String(i));
                  setTimeout(() => setSavedHeroId((cur) => (cur === (h.id || String(i)) ? '' : cur)), 1200);
                }}>{savedHeroId === (h.id || String(i)) ? 'Enregistré' : 'Enregistrer'}</button>
                <button onClick={() => setData((prev) => {
                  const heroSlides = (prev.heroSlides || []).filter((_, idx) => idx !== i);
                  if (!heroSlides.length) heroSlides.push({ id: `h${Date.now()}`, title: 'Nouveau hero', subtitle: 'Sous-titre', image: prev.hero?.image || '' });
                  return { ...prev, heroSlides, hero: heroSlides[0] };
                })}>Supprimer slide hero</button>
              </div>
            ))}
            <button onClick={() => setData((prev) => {
              const heroSlides = [...(prev.heroSlides || []), { id: `h${Date.now()}`, title: 'Nouveau hero', subtitle: 'Sous-titre', image: prev.hero?.image || '' }];
              return { ...prev, heroSlides, hero: heroSlides[0] || prev.hero };
            })}>Ajouter un hero</button>

            <div className="admin-card">
              <h4>Contenu global (hors Produits/Catégories)</h4>
              <input value={data.content?.topline || ''} onChange={(e) => updatePath(setData, ['content', 'topline'], e.target.value)} placeholder="Bandeau haut" />
              <input value={data.content?.siteTitle || ''} onChange={(e) => updatePath(setData, ['content', 'siteTitle'], e.target.value)} placeholder="Titre site" />
              <input value={data.content?.logoMain || ''} onChange={(e) => updatePath(setData, ['content', 'logoMain'], e.target.value)} placeholder="Texte logo principal" />
              <input value={data.content?.logoSub || ''} onChange={(e) => updatePath(setData, ['content', 'logoSub'], e.target.value)} placeholder="Texte logo secondaire" />
              <input value={data.content?.catalogTitle || ''} onChange={(e) => updatePath(setData, ['content', 'catalogTitle'], e.target.value)} placeholder="Titre section catalogue" />
              <textarea rows={3} value={(data.content?.marquee || []).join('\n')} onChange={(e) => updatePath(setData, ['content', 'marquee'], e.target.value.split('\n').map((x) => x.trim()).filter(Boolean))} placeholder="Banderole (une ligne par élément)" />
              <input value={data.brand?.name || ''} onChange={(e) => updatePath(setData, ['brand', 'name'], e.target.value)} placeholder="Nom marque/footer" />
              <input value={data.brand?.tagline || ''} onChange={(e) => updatePath(setData, ['brand', 'tagline'], e.target.value)} placeholder="Slogan/footer" />
              <input value={data.brand?.address || ''} onChange={(e) => updatePath(setData, ['brand', 'address'], e.target.value)} placeholder="Adresse/footer" />
              <button onClick={() => {
                setData((prev) => ({ ...prev }));
                setSavedHeroId('content');
                setTimeout(() => setSavedHeroId((cur) => (cur === 'content' ? '' : cur)), 1200);
              }}>{savedHeroId === 'content' ? 'Enregistré' : 'Enregistrer'}</button>
            </div>
          </section>
        )}

        {tab === 'categories' && (
          <section className="admin-section">
            <div className="admin-card">
              <h4>Ajouter une catégorie</h4>
              <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Nom catégorie (ex: Running)" />
              <input value={newCategoryImage} onChange={(e) => setNewCategoryImage(e.target.value)} placeholder="URL image catégorie" />
              <label>Importer image<input type="file" accept="image/*" onChange={async (e) => {
                const f = e.target.files?.[0]; if (!f) return;
                const url = await fileToDataUrl(f); setNewCategoryImage(url);
              }} /></label>
              <button onClick={() => {
                const name = newCategoryName.trim();
                const id = slugify(name);
                if (!name || !id) return;
                setData((prev) => {
                  if (prev.categories.some((x) => x.id === id)) return prev;
                  return { ...prev, categories: [...prev.categories, { id, name, image: newCategoryImage || prev.heroSlides?.[0]?.image || prev.hero.image }] };
                });
                setNewCategoryName('');
                setNewCategoryImage('');
              }}>Ajouter catégorie</button>
            </div>

            {data.categories.map((c, i) => (
              <div className="admin-card" key={c.id}>
                <input value={c.name} onChange={(e) => updatePath(setData, ['categories', i, 'name'], e.target.value)} />
                <input value={c.image} onChange={(e) => updatePath(setData, ['categories', i, 'image'], e.target.value)} placeholder="URL image catégorie" />
                <label>Importer image<input type="file" accept="image/*" onChange={async (e) => {
                  const f = e.target.files?.[0]; if (!f) return;
                  const url = await fileToDataUrl(f); updatePath(setData, ['categories', i, 'image'], url);
                }} /></label>
                <small>ID: {c.id}</small>
                <button onClick={() => {
                  setData((prev) => ({ ...prev }));
                  setSavedCategoryId(c.id);
                  setTimeout(() => setSavedCategoryId((cur) => (cur === c.id ? '' : cur)), 1200);
                }}>{savedCategoryId === c.id ? 'Enregistré' : 'Enregistrer'}</button>
                <button onClick={() => setData((prev) => {
                  const fallback = prev.categories.find((x) => x.id !== c.id)?.id || 'sneakers';
                  return {
                    ...prev,
                    categories: prev.categories.filter((x) => x.id !== c.id),
                    products: prev.products.map((p) => p.category === c.id ? { ...p, category: fallback } : p),
                  };
                })}>Supprimer catégorie</button>
              </div>
            ))}
          </section>
        )}

        {tab === 'produits' && (
          <section className="admin-section">
            <div className="admin-card">
              <h4>Filtrer par catégorie</h4>
              <select value={productCategoryFilter} onChange={(e) => setProductCategoryFilter(e.target.value)}>
                <option value="all">Toutes</option>
                {data.categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            {data.products.filter((p) => productCategoryFilter === 'all' ? true : p.category === productCategoryFilter).map((p) => {
              const i = data.products.findIndex((x) => x.id === p.id);
              return (
              <div className="admin-card" key={p.id}>
                <input value={p.name} onChange={(e) => updatePath(setData, ['products', i, 'name'], e.target.value)} placeholder="Nom produit" />
                <input value={p.brand} onChange={(e) => updatePath(setData, ['products', i, 'brand'], e.target.value)} placeholder="Marque" />
                <input value={String(p.price ?? '')} onChange={(e) => updatePath(setData, ['products', i, 'price'], e.target.value)} placeholder="Prix (texte libre: 99 EUR, Promo, Sur devis...)" />
                <input value={String(p.oldPrice ?? '')} onChange={(e) => updatePath(setData, ['products', i, 'oldPrice'], e.target.value)} placeholder="Ancien prix (texte libre)" />
                <select value={p.category} onChange={(e) => updatePath(setData, ['products', i, 'category'], e.target.value)}>
                  {!productCategoryOptions.some((o) => o.value === p.category) ? <option value={p.category}>{p.category}</option> : null}
                  {productCategoryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <select value={p.gender} onChange={(e) => updatePath(setData, ['products', i, 'gender'], e.target.value)}>
                  {!productGenderOptions.some((o) => o.value === p.gender) ? <option value={p.gender}>{p.gender}</option> : null}
                  {productGenderOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <select value={p.sport} onChange={(e) => updatePath(setData, ['products', i, 'sport'], e.target.value)}>
                  {!productSportOptions.some((o) => o.value === p.sport) ? <option value={p.sport}>{p.sport}</option> : null}
                  {productSportOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <select value={p.subcategory || ''} onChange={(e) => updatePath(setData, ['products', i, 'subcategory'], e.target.value)}>
                  <option value="">Sous-catégorie</option>
                  {!p.subcategory ? null : !productSubcategoryOptions.some((o) => o.value === p.subcategory) ? <option value={p.subcategory}>{p.subcategory}</option> : null}
                  {productSubcategoryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <textarea rows={2} value={p.desc} onChange={(e) => updatePath(setData, ['products', i, 'desc'], e.target.value)} placeholder="Description" />
                <input value={p.image} onChange={(e) => updatePath(setData, ['products', i, 'image'], e.target.value)} placeholder="URL image" />
                <textarea rows={2} value={(p.images || []).join('\n')} onChange={(e) => {
                  const imgs = e.target.value.split(/\n|,/).map((x) => x.trim()).filter(Boolean);
                  updatePath(setData, ['products', i, 'images'], imgs);
                  if (imgs[0]) updatePath(setData, ['products', i, 'image'], imgs[0]);
                }} placeholder="URLs images (une par ligne)" />
                <div className="sizes-editor">
                  <small>Tailles</small>
                  <div className="sizes-list">
                    {(p.sizes || []).map((s) => (
                      <button key={`${p.id}-${s}`} type="button" className="size-chip" onClick={() => updatePath(setData, ['products', i, 'sizes'], (p.sizes || []).filter((x) => x !== s))}>
                        {s} ×
                      </button>
                    ))}
                  </div>
                  <div className="sizes-add">
                    <input value={sizeDrafts[p.id] || ''} onChange={(e) => setSizeDrafts((prev) => ({ ...prev, [p.id]: e.target.value }))} placeholder="Nouvelle taille (ex: 45)" />
                    <button type="button" onClick={() => {
                      const value = (sizeDrafts[p.id] || '').trim();
                      if (!value) return;
                      const next = [...new Set([...(p.sizes || []), value])];
                      updatePath(setData, ['products', i, 'sizes'], next);
                      setSizeDrafts((prev) => ({ ...prev, [p.id]: '' }));
                    }}>Ajouter taille</button>
                  </div>
                </div>
                <label>Importer image(s)<input type="file" accept="image/*" multiple onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  if (!files.length) return;
                  const urls = await Promise.all(files.slice(0, 6).map((f) => fileToDataUrl(f)));
                  setData((prev) => {
                    const products = [...prev.products];
                    const existing = products[i]?.images || (products[i]?.image ? [products[i].image] : []);
                    const merged = [...existing, ...urls].filter(Boolean).slice(0, 8);
                    products[i] = { ...products[i], images: merged, image: merged[0] || products[i].image };
                    return { ...prev, products };
                  });
                }} /></label>
                <button onClick={() => {
                  setData((prev) => ({ ...prev }));
                  setSavedProductId(p.id);
                  setTimeout(() => setSavedProductId((cur) => (cur === p.id ? '' : cur)), 1200);
                }}>{savedProductId === p.id ? 'Enregistré' : 'Enregistrer'}</button>
                <button onClick={() => setData((prev) => ({ ...prev, products: prev.products.filter((x) => x.id !== p.id) }))}>Supprimer</button>
              </div>
              );
            })}
            <button onClick={() => setData((prev) => ({
              ...prev,
              products: [...prev.products, {
                id: `p${Date.now()}`,
                name: 'Nouveau produit',
                brand: 'Street Sport',
                price: 0,
                oldPrice: '',
                category: productCategoryFilter !== 'all' ? productCategoryFilter : (prev.categories[0]?.id || 'sneakers'),
                gender: 'unisex',
                sport: 'lifestyle',
                subcategory: '',
                isNew: true,
                image: '',
                images: [],
                sizes: ['Unique'],
                desc: 'Description',
              }],
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
  const [data, setData, saveError] = useData();
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [viewed, setViewed] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch (_) {}
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (localStorage.getItem(ADMIN_SESSION_KEY) === '1') setAdminAuth(true);
  }, []);

  const openProduct = (p) => {
    setSelected(p);
    setViewed((prev) => [...prev.filter((x) => x.id !== p.id), p].slice(-10));
  };

  const addToCart = (p, size = p.sizes?.[0] || 'Unique') => {
    const key = `${p.id}-${size}`;
    const mainImage = (p.images && p.images.length ? p.images[0] : p.image) || '';
    const priceNum = Number.parseFloat(String(p.price).replace(',', '.'));
    setCart((prev) => {
      const ex = prev.find((x) => x.key === key);
      if (ex) return prev.map((x) => x.key === key ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { key, id: p.id, name: p.name, image: mainImage, price: Number.isFinite(priceNum) ? priceNum : 0, size, qty: 1 }];
    });
    setCartOpen(true);
  };

  return (
    <main id="home">
      <Header data={data} cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <CategoryExplorer data={data} />
      <Catalog data={data} products={data.products} onOpen={openProduct} onQuickAdd={addToCart} />
      <SmartRecommendations viewed={viewed} all={data.products} onOpen={openProduct} onQuickAdd={addToCart} />
      <Footer data={data} />

      <div className="admin-end-wrap"><button className="admin-fab" onClick={() => { if (adminAuth) setAdminOpen(true); else setLoginOpen(true); }}>Back Office</button></div>

      <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={addToCart} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} />
      <BackOffice open={adminOpen} onClose={() => setAdminOpen(false)} data={data} setData={setData} saveError={saveError} />
      {loginOpen ? <AdminLogin onSuccess={() => { setAdminAuth(true); setLoginOpen(false); setAdminOpen(true); }} onClose={() => setLoginOpen(false)} /> : null}
    </main>
  );
}
