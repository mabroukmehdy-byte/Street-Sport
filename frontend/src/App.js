import React, { useEffect } from 'react';
import '@fontsource/anton';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/700.css';
import './index.css';

const LOOKS = [
  {
    title: 'Concrete Silence',
    mood: 'Monochrome tactical layers',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Neon Discipline',
    mood: 'Technical sport pieces with red signal accents',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Midnight Motion',
    mood: 'Performance cuts for Paris night runs',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1600&q=80',
  },
];

const MANIFESTO = [
  'No fake luxury.',
  'No trend-chasing.',
  'Only silhouette, function, and impact.',
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.18 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Header() {
  return (
    <header className="topbar">
      <p className="brand">STREET SPORT / PARIS XVIII</p>
      <a href="#contact" className="cta-link">BOOK A STYLE SESSION</a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero reveal">
      <div className="noise" aria-hidden="true" />
      <p className="eyebrow">URBAN PERFORMANCE ATELIER</p>
      <h1>
        WE DON'T SELL CLOTHES.
        <br />
        WE BUILD PRESENCE.
      </h1>
      <p className="lead">
        Street Sport is now a creative studio for image, silhouette, and street attitude.
        We design how people are seen before they are heard.
      </p>
      <a href="#manifesto" className="hero-btn">ENTER THE MANIFESTO</a>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="manifesto reveal">
      <div className="section-title">
        <p>Manifesto</p>
        <h2>Cut to essentials</h2>
      </div>
      <div className="manifesto-grid">
        {MANIFESTO.map((line, idx) => (
          <article key={line} style={{ transitionDelay: `${idx * 120}ms` }}>
            <span>0{idx + 1}</span>
            <p>{line}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Lookbook() {
  return (
    <section className="lookbook reveal">
      <div className="section-title">
        <p>Lookbook</p>
        <h2>Visual direction, not catalog</h2>
      </div>
      <div className="look-grid">
        {LOOKS.map((look, idx) => (
          <article key={look.title} className={`look-card look-${idx + 1}`} style={{ transitionDelay: `${idx * 120}ms` }}>
            <img src={look.image} alt={look.title} />
            <div>
              <h3>{look.title}</h3>
              <p>{look.mood}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Signature() {
  return (
    <section className="signature reveal">
      <div>
        <p className="eyebrow">SIGNATURE EXPERIENCE</p>
        <h2>One-on-one styling and visual identity for athletes, artists, and founders.</h2>
      </div>
      <ul>
        <li>Style diagnostics by silhouette and movement</li>
        <li>Outfit architecture for shoots and daily wear</li>
        <li>Personal color and material direction</li>
        <li>Quarterly wardrobe reset</li>
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact reveal">
      <div className="section-title">
        <p>Contact</p>
        <h2>Request your private session</h2>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input placeholder="Full name" />
        <input placeholder="Email" type="email" />
        <textarea placeholder="What image are you trying to project?" rows={5} />
        <button>APPLY NOW</button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer reveal revealed">
      <p>30 Bd Ornano, 75018 Paris</p>
      <p>Street Sport Creative Studio</p>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <main>
      <Header />
      <Hero />
      <Manifesto />
      <Lookbook />
      <Signature />
      <Contact />
      <Footer />
    </main>
  );
}
