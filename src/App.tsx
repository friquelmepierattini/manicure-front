'use client'

import Image from 'next/image'
import React from 'react'
import logo1 from './assets/logo1.png'

interface Manicurist {
  id: number
  name: string
  location: string
  rating: number
  image: string
}

interface MenuItem {
  icon: string
  label: string
}

const menuItems: MenuItem[] = [
  { icon: '🏠', label: 'Inicio' },
  { icon: '📍', label: 'Ubicación' },
  { icon: '💅', label: 'Servicios' },
  { icon: '⭐', label: 'Reseñas' },
  { icon: 'ℹ️', label: 'Quiénes somos' },
]

const manicurists: Manicurist[] = [
  {
    id: 1,
    name: 'Francisca',
    location: 'Santiago',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
  },
  {
    id: 2,
    name: 'Camila',
    location: 'Providencia',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc',
  },
  {
    id: 3,
    name: 'Valentina',
    location: 'Las Condes',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1595777707802-e2e7d1b0d122',
  },
  {
    id: 4,
    name: 'Sofía',
    location: 'Ñuñoa',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1599599810694-f3f8f3201f54',
  },
]

const Sidebar = () => (
  <aside className="sidebar">
    <h4>Menú</h4>
    <ul>
      {menuItems.map((item) => (
        <li key={item.label}>
          <span>{item.icon}</span>
          {item.label}
        </li>
      ))}
    </ul>
  </aside>
)

const RightSidebar = () => (
  <aside className="right-sidebar">
    <div className="widget stats-widget">
      <h3>¿Por qué nosotros?</h3>
      <div className="stat-item">
        <div className="stat-number">500+</div>
        <div className="stat-label">Profesionales</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">4.8⭐</div>
        <div className="stat-label">Calificación</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">10K+</div>
        <div className="stat-label">Clientes felices</div>
      </div>
    </div>

    <div className="widget popular-services">
      <h3>Servicios Populares</h3>
      <div className="service-item">
        <span className="service-emoji">💅</span>
        <span className="service-name">Uñas Acrílicas</span>
      </div>
      <div className="service-item">
        <span className="service-emoji">✨</span>
        <span className="service-name">Manicura Express</span>
      </div>
      <div className="service-item">
        <span className="service-emoji">💄</span>
        <span className="service-name">Diseños Premium</span>
      </div>
      <div className="service-item">
        <span className="service-emoji">💆</span>
        <span className="service-name">Spa de Manos</span>
      </div>
    </div>

    <div className="widget cta-widget">
      <h4>¿Eres Profesional?</h4>
      <p>Únete a nuestra comunidad</p>
      <button className="cta-button">Registrarse ahora</button>
    </div>
  </aside>
)

const Card = ({ manicurist }: { manicurist: Manicurist }) => (
  <div className="card">
    <div className="card-img-wrapper">
      <Image
        src={manicurist.image}
        alt={manicurist.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="card-img"
      />
    </div>
    <div className="card-body">
      <h3>{manicurist.name}</h3>
      <p>{manicurist.location}</p>
      <span>⭐ {manicurist.rating}</span>
    </div>
  </div>
)

/* 🔥 HERO MEJORADO */
const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-img-wrapper hero-img-animated">
      <Image
        src="https://images.unsplash.com/photo-1604654894610-df63bc536371"
        alt="Hero 1"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="hero-img"
      />
    </div>
    <div className="hero-img-wrapper hero-img-animated-delay">
      <Image
        src="https://images.unsplash.com/photo-1610992015732-2449b76344bc"
        alt="Hero 2"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="hero-img"
      />
    </div>
  </section>
)

interface GalleryItem {
  id: number
  category: 'unas' | 'cejas' | 'pestanas' | 'salones'
  image: string
  title: string
}

const galleryItems: GalleryItem[] = [
  { id: 1, category: 'unas', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371', title: 'Uñas Acrílicas Diseño 1' },
  { id: 2, category: 'unas', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc', title: 'Uñas Acrílicas Diseño 2' },
  { id: 3, category: 'unas', image: 'https://images.unsplash.com/photo-1595777707802-e2e7d1b0d122', title: 'Uñas Acrílicas Diseño 3' },
  { id: 4, category: 'unas', image: 'https://images.unsplash.com/photo-1599599810694-f3f8f3201f54', title: 'Uñas Acrílicas Diseño 4' },
  { id: 5, category: 'cejas', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e', title: 'Cejas Perfectas 1' },
  { id: 6, category: 'cejas', image: 'https://images.unsplash.com/photo-1488426149381-b8e162008742', title: 'Cejas Perfectas 2' },
  { id: 7, category: 'cejas', image: 'https://images.unsplash.com/photo-1517633552241-41ec9a8aded5', title: 'Cejas Perfectas 3' },
  { id: 8, category: 'pestanas', image: 'https://images.unsplash.com/photo-1559318106-d6410713a5af', title: 'Pestañas Extensión 1' },
  { id: 9, category: 'pestanas', image: 'https://images.unsplash.com/photo-1522335671259-ce8e9a6a8ee5', title: 'Pestañas Extensión 2' },
  { id: 10, category: 'pestanas', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae', title: 'Pestañas Extensión 3' },
  { id: 11, category: 'salones', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14', title: 'Salón de Belleza 1' },
  { id: 12, category: 'salones', image: 'https://images.unsplash.com/photo-1552555092-5eac264fedfa', title: 'Salón de Belleza 2' },
]

const ServiceGallery = () => {
  const [filter, setFilter] = React.useState<'todos' | 'unas' | 'cejas' | 'pestanas' | 'salones'>('todos')

  const filtered = filter === 'todos' ? galleryItems : galleryItems.filter(item => item.category === filter)

  return (
    <section className="service-gallery">
      <h2>Galería de Nuestros Servicios</h2>
      <p className="gallery-subtitle">Explora nuestro portafolio de trabajos profesionales</p>
      
      <div className="gallery-filters">
        <button 
          className={`filter-btn ${filter === 'todos' ? 'active' : ''}`}
          onClick={() => setFilter('todos')}
        >
          Todos
        </button>
        <button 
          className={`filter-btn ${filter === 'unas' ? 'active' : ''}`}
          onClick={() => setFilter('unas')}
        >
          💅 Uñas
        </button>
        <button 
          className={`filter-btn ${filter === 'cejas' ? 'active' : ''}`}
          onClick={() => setFilter('cejas')}
        >
          👁️ Cejas
        </button>
        <button 
          className={`filter-btn ${filter === 'pestanas' ? 'active' : ''}`}
          onClick={() => setFilter('pestanas')}
        >
          ✨ Pestañas
        </button>
        <button 
          className={`filter-btn ${filter === 'salones' ? 'active' : ''}`}
          onClick={() => setFilter('salones')}
        >
          🏢 Salones
        </button>
      </div>

      <div className="gallery-grid">
        {filtered.map((item, index) => (
          <div key={item.id} className="gallery-item" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="gallery-img-wrapper">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="gallery-img"
              />
              <div className="gallery-overlay">
                <span className="gallery-title">{item.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const OptionCard = ({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) => (
  <div className="option-card">
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
)

const HowItWorks = () => (
  <section className="how-it-works">
    <h2>Cómo Funciona</h2>
    <div className="steps-container">
      <div className="step-card">
        <div className="step-icon">🔍</div>
        <h3>1. Busca</h3>
        <p>Explora profesionales en tu zona</p>
      </div>
      <div className="step-arrow">→</div>
      <div className="step-card">
        <div className="step-icon">⭐</div>
        <h3>2. Elige</h3>
        <p>Lee reseñas y compara precios</p>
      </div>
      <div className="step-arrow">→</div>
      <div className="step-card">
        <div className="step-icon">📅</div>
        <h3>3. Reserva</h3>
        <p>Agenda en segundos</p>
      </div>
    </div>
  </section>
)

const Benefits = () => (
  <section className="benefits">
    <h2>¿Por Qué Elegirnos?</h2>
    <div className="benefits-grid">
      <div className="benefit-item">
        <div className="benefit-icon">✅</div>
        <h3>Profesionales Verificados</h3>
        <p>Todos nuestros profesionales tienen certificaciones y experiencia comprobada</p>
      </div>
      <div className="benefit-item">
        <div className="benefit-icon">💰</div>
        <h3>Precios Competitivos</h3>
        <p>Compara precios reales y elige la mejor opción para tu presupuesto</p>
      </div>
      <div className="benefit-item">
        <div className="benefit-icon">🔒</div>
        <h3>100% Seguro</h3>
        <p>Tus datos están protegidos y las transacciones son seguras</p>
      </div>
      <div className="benefit-item">
        <div className="benefit-icon">⚡</div>
        <h3>Reservas Instantáneas</h3>
        <p>Confirma tu cita en tiempo real sin esperas</p>
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="testimonials">
    <h2>Lo Que Dicen Nuestras Clientas</h2>
    <div className="testimonials-grid">
      <div className="testimonial-card">
        <div className="stars">⭐⭐⭐⭐⭐</div>
        <p>"Excelente servicio, superó mis expectativas. La profesional fue muy atenta y el resultado increíble."</p>
        <div className="testimonial-author">
          <span className="author-name">María González</span>
          <span className="author-service">Uñas Acrílicas</span>
        </div>
      </div>
      <div className="testimonial-card">
        <div className="stars">⭐⭐⭐⭐⭐</div>
        <p>"Me encantó! Muy higiénico, profesional y amable. Definitivamente vuelvo. Súper recomendado."</p>
        <div className="testimonial-author">
          <span className="author-name">Claudia Ramírez</span>
          <span className="author-service">Manicura Premium</span>
        </div>
      </div>
      <div className="testimonial-card">
        <div className="stars">⭐⭐⭐⭐⭐</div>
        <p>"La mejor plataforma que he encontrado. Fácil de usar y con profesionales realmente competentes."</p>
        <div className="testimonial-author">
          <span className="author-name">Andrea López</span>
          <span className="author-service">Spa de Manos</span>
        </div>
      </div>
    </div>
  </section>
)

const PromoBanner = () => (
  <section className="promo-banner">
    <div className="promo-content">
      <h2>🎉 Oferta Especial para Nuevos Clientes</h2>
      <p>Obtén <span className="discount">20% de descuento</span> en tu primer servicio</p>
      <button className="promo-button">Reclamar Oferta</button>
    </div>
  </section>
)

const HeaderBranding = () => (
  <header className="header">
    <div className="logos-container">
      <div className="logo-wrapper main-logo-wrapper">
        <div className="logo-gradient-bg"></div>
        <Image
          src={logo1}
          alt="Mi Manicurista Logo Principal"
          className="logo logo-main"
          width={240}
          height={240}
          priority
        />
      </div>
    </div>
    <h1>Siéntete Increíble 💅</h1>
    <p className="subtitle">Encuentra tu manicurista ideal</p>
  </header>
)

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>Mi Manicurista</h3>
        <p>Conecta con los mejores profesionales de belleza en tu ciudad.</p>
        <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#999' }}>Descubre servicios de calidad con profesionales verificados y reseñas reales.</p>
      </div>
      
      <div className="footer-section social">
        <h3>Síguenos</h3>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram" title="Instagram">
            📷
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook" title="Facebook">
            👍
          </a>
          <a href="https://wa.me/56" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp" title="WhatsApp">
            💬
          </a>
        </div>
      </div>

      <div className="footer-section">
        <h3>Contacto</h3>
        <p><a href="mailto:info@mimanicurista.com">📧 info@mimanicurista.com</a></p>
        <p><a href="tel:+56912345678">📞 +56 9 1234 5678</a></p>
      </div>
    </div>

    <div className="footer-bottom">
      <p>&copy; 2026 Mi Manicurista. Todos los derechos reservados.</p>
    </div>
  </footer>
)

function App() {
  return (
    <div className="container">
      {/* HEADER CON LOGOS */}
      <HeaderBranding />

      {/* HERO */}
      <HeroSection />

      {/* OPCIONES */}
      <div className="options">
        <OptionCard icon="💅" title="Soy Manicurista" description="Publica tus servicios" />
        <OptionCard icon="💖" title="Soy Cliente" description="Encuentra profesionales" />
        <OptionCard icon="🏢" title="Soy Salón" description="Administra tu negocio" />
      </div>

      {/* GALERÍA DE SERVICIOS */}
      <ServiceGallery />

      {/* CÓMO FUNCIONA */}
      <HowItWorks />

      {/* LAYOUT */}
      <div className="main-layout">
        <Sidebar />

        <main className="content">
          <h2>Profesionales destacados</h2>

          <div className="cards">
            {manicurists.map((m) => (
              <Card key={m.id} manicurist={m} />
            ))}
          </div>
        </main>

        <RightSidebar />
      </div>

      {/* BENEFICIOS */}
      <Benefits />

      {/* TESTIMONIOS */}
      <Testimonials />

      {/* PROMOCIÓN */}
      <PromoBanner />

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default App