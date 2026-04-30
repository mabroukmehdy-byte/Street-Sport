import React, { useEffect, useMemo, useState } from 'react';
import '@fontsource/anton';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/700.css';
import './index.css';

const STORAGE_KEY = 'streetsport_site_content_v1';

const defaultData = {
  marque: {
    nom: 'Street Sport',
    baseline: 'Studio creatif streetwear et performance urbaine',
    adresse: '30 Bd Ornano, 75018 Paris',
    telephone: '+33 7 53 19 69 73',
    email: 'contact@streetsport-paris.fr',
  },
  hero: {
    accroche: 'Nous ne vendons pas des vetements. Nous construisons une presence.',
    sousTexte:
      'Street Sport est un studio de direction visuelle pour athlètes, artistes et entrepreneurs. Silhouette, image et impact: tout est pensé comme une campagne.',
    boutonPrincipal: 'Demander une session privee',
    boutonSecondaire: 'Voir nos looks',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=80',
  },
  stats: [
    { label: 'Clients accompagnes', value: '340+' },
    { label: 'Looks produits', value: '1 200+' },
    { label: 'Campagnes locales', value: '48' },
    { label: 'Satisfaction', value: '98%' },
  ],
  services: [
    {
      titre: 'Direction de style',
      texte: 'Audit complet de ton image, construction de silhouettes et lignes fortes selon tes objectifs.',
    },
    {
      titre: 'Shooting editorial',
      texte: 'Conception visuelle, moodboard, casting tenues et coordination terrain pour contenus premium.',
    },
    {
      titre: 'Uniforme de marque',
      texte: 'Creation d une identite textile coherente pour equipes, artistes et structures sportives.',
    },
    {
      titre: 'Coaching dressing',
      texte: 'Session privee pour structurer une garde-robe percutante et durable dans le temps.',
    },
  ],
  process: [
    { titre: '01. Diagnostic', texte: 'On analyse ton univers, ton corps, ton rythme et tes references.' },
    { titre: '02. Strategie', texte: 'On construit une ligne visuelle claire avec palette, volumes et pieces cibles.' },
    { titre: '03. Activation', texte: 'On produit les looks, contenus et usages terrain avec suivi concret.' },
  ],
  looks: [
    {
      titre: 'Concrete Silence',
      texte: 'Monochrome technique et structures nettes.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
    },
    {
      titre: 'Neon Discipline',
      texte: 'Performance urbaine et accent rouge signal.',
      image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1600&q=80',
    },
    {
      titre: 'Paris Nocturne',
      texte: 'Volumes sport-chic pour la ville de nuit.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
    },
  ],
  temoignages: [
    {
      auteur: 'Karim B., artiste',
      texte: 'J ai enfin une identite visuelle cohérente. Chaque tenue sert mon image sans surjouer.',
    },
    {
      auteur: 'Ines M., entrepreneure',
      texte: 'Niveau agence luxe. Process clair, execution rapide, resultat ultra fort.',
    },
    {
      auteur: 'Theo D., athlete',
      texte: 'Des looks performants que je peux porter en tournage, en event et au quotidien.',
    },
  ],
  faq: [
    {
      q: 'Combien dure un accompagnement?',
      r: 'Selon le besoin: de 1 session privee a 3 mois de suivi avec production complete.',
    },
    {
      q: 'Est-ce uniquement pour les influenceurs?',
      r: 'Non. Nous travaillons avec particuliers, athletes, entrepreneurs et equipes.',
    },
    {
      q: 'Pouvez-vous travailler a distance?',
      r: 'Oui, avec sessions visio, plan d achats et validation looks a distance.',
    },
  ],
  cta: {
    titre: 'Pret a redefinir ton image?',
    texte: 'Reserve un appel de cadrage et on construit une direction visuelle a ton niveau.',
    bouton: 'Prendre rendez-vous',
  },
};

function useSiteData() {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setData({ ...defaultData, ...JSON.parse(raw) });
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  return [data, setData];
}

function Header({ data }) {
  return (
    <header className="topbar">
      <p className="brand">{data.marque.nom.toUpperCase()} / PARIS XVIII</p>
      <nav>
        <a href="#services">Services</a>
        <a href="#looks">Looks</a>
        <a href="#process">Methode</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Hero({ data }) {
  return (
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.76), rgba(0,0,0,.28)), url(${data.hero.image})` }}>
      <div className="hero-inner">
        <p className="eyebrow">STUDIO CREATIF STREET</p>
        <h1>{data.hero.accroche}</h1>
        <p>{data.hero.sousTexte}</p>
        <div className="hero-actions">
          <a href="#contact" className="btn primary">{data.hero.boutonPrincipal}</a>
          <a href="#looks" className="btn ghost">{data.hero.boutonSecondaire}</a>
        </div>
      </div>
    </section>
  );
}

function Stats({ data }) {
  return (
    <section className="stats">
      {data.stats.map((s) => (
        <article key={s.label}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </article>
      ))}
    </section>
  );
}

function Services({ data }) {
  return (
    <section id="services" className="section">
      <h2>Services premium</h2>
      <div className="cards-4">
        {data.services.map((s) => (
          <article key={s.titre}>
            <h3>{s.titre}</h3>
            <p>{s.texte}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Looks({ data }) {
  return (
    <section id="looks" className="section">
      <h2>Direction visuelle</h2>
      <div className="looks-grid">
        {data.looks.map((l) => (
          <article key={l.titre}>
            <img src={l.image} alt={l.titre} />
            <div>
              <h3>{l.titre}</h3>
              <p>{l.texte}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process({ data }) {
  return (
    <section id="process" className="section section-dark">
      <h2>Notre methode</h2>
      <div className="cards-3">
        {data.process.map((p) => (
          <article key={p.titre}>
            <h3>{p.titre}</h3>
            <p>{p.texte}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ data }) {
  return (
    <section className="section">
      <h2>Ce qu ils disent</h2>
      <div className="cards-3">
        {data.temoignages.map((t) => (
          <article key={t.auteur}>
            <p>"{t.texte}"</p>
            <small>{t.auteur}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function Faq({ data }) {
  return (
    <section className="section">
      <h2>FAQ</h2>
      <div className="faq">
        {data.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.r}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Contact({ data }) {
  return (
    <section id="contact" className="section contact">
      <div>
        <h2>{data.cta.titre}</h2>
        <p>{data.cta.texte}</p>
        <p><strong>Adresse:</strong> {data.marque.adresse}</p>
        <p><strong>Tel:</strong> {data.marque.telephone}</p>
        <p><strong>Email:</strong> {data.marque.email}</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input placeholder="Nom complet" />
        <input placeholder="Email" type="email" />
        <textarea rows={5} placeholder="Explique ton besoin" />
        <button>{data.cta.bouton}</button>
      </form>
    </section>
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

function fieldUpdate(setData, path, value) {
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
  const [tab, setTab] = useState('general');

  const importJson = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const parsed = JSON.parse(text);
    setData(parsed);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'street-sport-contenu.json';
    a.click();
  };

  if (!open) return null;

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin" onClick={(e) => e.stopPropagation()}>
        <div className="admin-head">
          <h3>Back Office Street Sport</h3>
          <button onClick={onClose}>Fermer</button>
        </div>

        <div className="admin-tabs">
          {['general', 'hero', 'services', 'looks', 'temoignages', 'faq'].map((t) => (
            <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        <div className="admin-actions">
          <button onClick={exportJson}>Exporter JSON</button>
          <label className="import-btn">
            Importer JSON
            <input type="file" accept="application/json" onChange={importJson} />
          </label>
        </div>

        {tab === 'general' && (
          <section className="admin-section">
            <h4>Infos marque</h4>
            <input value={data.marque.nom} onChange={(e) => fieldUpdate(setData, ['marque', 'nom'], e.target.value)} placeholder="Nom" />
            <input value={data.marque.baseline} onChange={(e) => fieldUpdate(setData, ['marque', 'baseline'], e.target.value)} placeholder="Baseline" />
            <input value={data.marque.adresse} onChange={(e) => fieldUpdate(setData, ['marque', 'adresse'], e.target.value)} placeholder="Adresse" />
            <input value={data.marque.telephone} onChange={(e) => fieldUpdate(setData, ['marque', 'telephone'], e.target.value)} placeholder="Telephone" />
            <input value={data.marque.email} onChange={(e) => fieldUpdate(setData, ['marque', 'email'], e.target.value)} placeholder="Email" />
          </section>
        )}

        {tab === 'hero' && (
          <section className="admin-section">
            <h4>Hero</h4>
            <textarea rows={3} value={data.hero.accroche} onChange={(e) => fieldUpdate(setData, ['hero', 'accroche'], e.target.value)} placeholder="Accroche" />
            <textarea rows={4} value={data.hero.sousTexte} onChange={(e) => fieldUpdate(setData, ['hero', 'sousTexte'], e.target.value)} placeholder="Sous texte" />
            <input value={data.hero.boutonPrincipal} onChange={(e) => fieldUpdate(setData, ['hero', 'boutonPrincipal'], e.target.value)} placeholder="Bouton principal" />
            <input value={data.hero.boutonSecondaire} onChange={(e) => fieldUpdate(setData, ['hero', 'boutonSecondaire'], e.target.value)} placeholder="Bouton secondaire" />
            <input value={data.hero.image} onChange={(e) => fieldUpdate(setData, ['hero', 'image'], e.target.value)} placeholder="URL image" />
            <label>
              Importer image hero
              <input type="file" accept="image/*" onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const url = await fileToDataUrl(f);
                fieldUpdate(setData, ['hero', 'image'], url);
              }} />
            </label>
          </section>
        )}

        {tab === 'services' && (
          <section className="admin-section">
            <h4>Services</h4>
            {data.services.map((s, i) => (
              <div key={i} className="admin-card">
                <input value={s.titre} onChange={(e) => fieldUpdate(setData, ['services', i, 'titre'], e.target.value)} placeholder="Titre" />
                <textarea rows={3} value={s.texte} onChange={(e) => fieldUpdate(setData, ['services', i, 'texte'], e.target.value)} placeholder="Texte" />
                <button onClick={() => setData((prev) => ({ ...prev, services: prev.services.filter((_, idx) => idx !== i) }))}>Supprimer</button>
              </div>
            ))}
            <button onClick={() => setData((prev) => ({ ...prev, services: [...prev.services, { titre: 'Nouveau service', texte: 'Description' }] }))}>Ajouter service</button>
          </section>
        )}

        {tab === 'looks' && (
          <section className="admin-section">
            <h4>Looks</h4>
            {data.looks.map((l, i) => (
              <div key={i} className="admin-card">
                <input value={l.titre} onChange={(e) => fieldUpdate(setData, ['looks', i, 'titre'], e.target.value)} placeholder="Titre" />
                <input value={l.texte} onChange={(e) => fieldUpdate(setData, ['looks', i, 'texte'], e.target.value)} placeholder="Texte" />
                <input value={l.image} onChange={(e) => fieldUpdate(setData, ['looks', i, 'image'], e.target.value)} placeholder="URL image" />
                <label>
                  Importer image
                  <input type="file" accept="image/*" onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const url = await fileToDataUrl(f);
                    fieldUpdate(setData, ['looks', i, 'image'], url);
                  }} />
                </label>
                <button onClick={() => setData((prev) => ({ ...prev, looks: prev.looks.filter((_, idx) => idx !== i) }))}>Supprimer</button>
              </div>
            ))}
            <button onClick={() => setData((prev) => ({ ...prev, looks: [...prev.looks, { titre: 'Nouveau look', texte: 'Description', image: '' }] }))}>Ajouter look</button>
          </section>
        )}

        {tab === 'temoignages' && (
          <section className="admin-section">
            <h4>Temoignages</h4>
            {data.temoignages.map((t, i) => (
              <div key={i} className="admin-card">
                <input value={t.auteur} onChange={(e) => fieldUpdate(setData, ['temoignages', i, 'auteur'], e.target.value)} placeholder="Auteur" />
                <textarea rows={3} value={t.texte} onChange={(e) => fieldUpdate(setData, ['temoignages', i, 'texte'], e.target.value)} placeholder="Texte" />
                <button onClick={() => setData((prev) => ({ ...prev, temoignages: prev.temoignages.filter((_, idx) => idx !== i) }))}>Supprimer</button>
              </div>
            ))}
            <button onClick={() => setData((prev) => ({ ...prev, temoignages: [...prev.temoignages, { auteur: 'Nouveau client', texte: 'Nouveau temoignage' }] }))}>Ajouter temoignage</button>
          </section>
        )}

        {tab === 'faq' && (
          <section className="admin-section">
            <h4>FAQ</h4>
            {data.faq.map((f, i) => (
              <div key={i} className="admin-card">
                <input value={f.q} onChange={(e) => fieldUpdate(setData, ['faq', i, 'q'], e.target.value)} placeholder="Question" />
                <textarea rows={3} value={f.r} onChange={(e) => fieldUpdate(setData, ['faq', i, 'r'], e.target.value)} placeholder="Reponse" />
                <button onClick={() => setData((prev) => ({ ...prev, faq: prev.faq.filter((_, idx) => idx !== i) }))}>Supprimer</button>
              </div>
            ))}
            <button onClick={() => setData((prev) => ({ ...prev, faq: [...prev.faq, { q: 'Nouvelle question', r: 'Nouvelle reponse' }] }))}>Ajouter FAQ</button>
          </section>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useSiteData();
  const [adminOpen, setAdminOpen] = useState(false);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main>
      <Header data={data} />
      <Hero data={data} />
      <Stats data={data} />
      <Services data={data} />
      <Looks data={data} />
      <Process data={data} />
      <Testimonials data={data} />
      <Faq data={data} />
      <Contact data={data} />
      <Footer data={data} />

      <button className="admin-fab" onClick={() => setAdminOpen(true)}>
        Back Office
      </button>

      <BackOffice open={adminOpen} onClose={() => setAdminOpen(false)} data={data} setData={setData} />

      <div className="copyright">{year} - {data.marque.nom}</div>
    </main>
  );
}
