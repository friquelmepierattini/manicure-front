'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
const PROFESIONAL_REGISTER_PATH = process.env.NEXT_PUBLIC_PROFESIONALES_ENDPOINT || '/api/v1/profesionales'

async function createProfesional(payload: Record<string, unknown>) {
  const path = PROFESIONAL_REGISTER_PATH.startsWith('/')
    ? PROFESIONAL_REGISTER_PATH
    : `/${PROFESIONAL_REGISTER_PATH}`

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Request failed with status ${response.status}`)
  }
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

const Sidebar = ({ onMenuClick }: { onMenuClick: (label: string) => void }) => (
  <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-[164px] bg-gradient-to-b from-[#fff7fb] via-[#ffeef6] to-[#ffffff] backdrop-blur-md flex-col items-stretch py-5 px-3.5 gap-3 border-r border-[#e9d2de] shadow-[0_18px_40px_rgba(183,50,99,0.10)] z-[200] overflow-y-auto">
    <div className="w-full px-1.5">
      <div className="rounded-[14px] border border-[#efcddb] bg-gradient-to-r from-white to-[#fff0f7] px-3.5 py-2 text-center text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#b23d6a] shadow-sm">Menú</div>
    </div>
    <ul className="list-none w-full flex flex-col gap-2.5 p-0 m-0">
      {menuItems.map((item) => (
        <li
          key={item.label}
          onClick={() => onMenuClick(item.label)}
          className="group relative flex flex-col items-center justify-center gap-1.5 h-[84px] w-full text-[12px] font-semibold text-[#5b4756] bg-gradient-to-br from-white via-[#fff8fb] to-[#fff0f6] border border-[#efd9e3] rounded-[14px] cursor-pointer shadow-[0_8px_18px_rgba(183,50,99,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(183,50,99,0.16)] hover:border-[#c9658f] hover:from-[#fff7fa] hover:via-[#ffeaf2] hover:to-[#ffdce9]"
        >
          <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b from-[#f0bfd4] via-[#d16b98] to-[#9f3c68] opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="text-[20px] leading-none transition-transform group-hover:scale-105 group-hover:drop-shadow-[0_2px_4px_rgba(183,50,99,0.12)]">{item.icon}</span>
          <span className="leading-none text-[11px] tracking-[0.04em] text-center transition-colors group-hover:text-[#a93a65]">{item.label}</span>
        </li>
      ))}
    </ul>
  </aside>
)

const popularesItems = [
  {
    e: '💅', n: 'Uñas Acrílicas',
    fotos: ['/assets/unas-acrilico-1.jpeg', '/assets/unas-francesa.jpeg', '/assets/download (1).jpeg', '/assets/download (2).jpeg', '/assets/download (3).jpeg', '/assets/download (4).jpeg', '/assets/download (5).jpeg'],
  },
  {
    e: '✨', n: 'Manicura Express',
    fotos: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90&q=80',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90&q=80',
    ],
  },
  {
    e: '💄', n: 'Diseños Premium',
    fotos: [
      'https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=800&q=90&q=80',
      'https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=800&q=90&q=80',
    ],
  },
  {
    e: '💆', n: 'Spa de Manos',
    fotos: [
      'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&q=90&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=90&q=80',
    ],
  },
  {
    e: '🪡', n: 'Extensión Pestañas',
    fotos: ['/assets/pestanas-extension.jpeg', '/assets/pestanas-volumen.jpeg'],
  },
  {
    e: '👁️', n: 'Diseño de Cejas',
    fotos: ['/assets/cejas-perfectas.jpeg'],
  },
]

const RightSidebar = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
  const [seleccionado, setSeleccionado] = React.useState<string | null>(null)
  const item = popularesItems.find(i => i.n === seleccionado)

  return (
  <aside className="hidden lg:flex fixed top-0 right-0 h-screen w-[215px] bg-gradient-to-b from-white via-rose-50/60 to-pink-50 backdrop-blur-md flex-col py-6 px-3.5 gap-4 border-l border-rose-100 shadow-[0_20px_40px_rgba(183,50,99,0.12)] z-[200] overflow-y-auto">

    {/* Stats */}
    <div className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-4 border border-rose-100 shadow-sm">
      <h3 className="text-[11px] font-extrabold text-[#b83263] uppercase tracking-widest mb-3">¿Por qué nosotros?</h3>
      {[
        { n: '500+', l: 'Profesionales', icon: '👩‍🎨' },
        { n: '4.8', l: 'Calificación', icon: '⭐' },
        { n: '10K+', l: 'Clientes felices', icon: '💖' },
      ].map(s => (
        <div key={s.l} className="flex items-center gap-2.5 py-2.5 border-b border-rose-100/70 last:border-0">
          <span className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-lg border border-rose-100">{s.icon}</span>
          <div>
            <div className="text-base font-extrabold text-[#b83263] leading-none">{s.n}</div>
            <div className="text-[10px] text-gray-500 mt-0.5 font-medium">{s.l}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Populares */}
    <div className="bg-gradient-to-br from-rose-50/80 to-fuchsia-50 rounded-2xl p-4 border border-rose-200 shadow-sm">
      <h3 className="text-[11px] font-extrabold text-[#b83263] uppercase tracking-widest mb-3">Populares</h3>
      {popularesItems.map(s => (
        <div
          key={s.n}
          onClick={() => setSeleccionado(seleccionado === s.n ? null : s.n)}
          className={`flex items-center gap-2.5 py-2 border-b border-rose-100/70 last:border-0 cursor-pointer group transition-all ${seleccionado === s.n ? 'bg-rose-100/80 -mx-2 px-2 rounded-xl' : ''}`}
        >
          <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-base border transition-colors ${seleccionado === s.n ? 'bg-[#c74372] border-rose-400 text-white' : 'bg-white border-rose-100 group-hover:bg-rose-100/70'}`}>{s.e}</span>
          <span className={`text-[12px] font-semibold transition-colors leading-tight ${seleccionado === s.n ? 'text-[#b83263]' : 'text-[#4a3b4a] group-hover:text-[#b83263]'}`}>{s.n}</span>
        </div>
      ))}

      {/* Fotos del item seleccionado */}
      {item && (
        <div className="mt-3 flex flex-col gap-2">
          <p className="text-[10px] font-bold text-[#b83263] uppercase tracking-wide">{item.n}</p>
          <div className="grid grid-cols-2 gap-2">
          {item.fotos.map((f, i) => (
            <img
              key={i}
              src={f}
              alt={item.n}
              className="w-full aspect-[4/3] object-cover object-center rounded-xl border border-rose-100 shadow-sm hover:scale-[1.02] transition-transform"
            />
          ))}
          </div>
        </div>
      )}
    </div>

    {/* CTA */}
    <div className="bg-gradient-to-br from-[#ffdce7] via-[#ffc8da] to-[#ffb3cd] rounded-2xl p-5 text-[#7a2b4c] text-center shadow-[0_10px_30px_rgba(199,67,114,0.18)] border border-[#f7b7cc]">
      <div className="text-3xl mb-2">💅</div>
      <h4 className="font-extrabold text-sm mb-1 leading-tight">¿Eres Profesional?</h4>
      <p className="text-[11px] opacity-80 mb-4 leading-snug">Únete y llega a más clientas</p>
      <button
        className="bg-white text-[#b83263] font-extrabold text-xs px-4 py-2.5 rounded-xl hover:scale-105 hover:shadow-lg transition-all cursor-pointer border-none w-full shadow-sm"
        onClick={onRegisterClick}
      >Registrarse ahora</button>
    </div>
  </aside>
  )
}

const HeroSection = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
    <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-[20px] overflow-hidden border border-rose-100 shadow-[0_14px_28px_rgba(74,59,74,0.10)] transition-transform hover:scale-[1.01]">
      <img
        src="https://images.unsplash.com/photo-1604654894610-df63bc536371"
        alt="Hero 1"
        className="w-full h-full object-cover object-center"
      />
    </div>
    <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-[20px] overflow-hidden border border-rose-100 shadow-[0_14px_28px_rgba(74,59,74,0.10)] transition-transform hover:scale-[1.01]">
      <img
        src="https://images.unsplash.com/photo-1610992015732-2449b76344bc"
        alt="Hero 2"
        className="w-full h-full object-cover object-center"
      />
    </div>
  </section>
)

interface GalleryItem {
  id: number
  category: 'unas' | 'cejas' | 'pestanas' | 'salones' | 'podologia' | 'peluqueria' | 'depilacion'
  image: string
  title: string
}

const galleryItems: GalleryItem[] = [
  { id: 1, category: 'unas', image: '/assets/unas-acrilico-1.jpeg', title: 'Uñas Acrílicas Negras' },
  { id: 2, category: 'unas', image: '/assets/unas-francesa.jpeg', title: 'Manicura Francesa' },
  { id: 11, category: 'unas', image: '/assets/download (1).jpeg', title: 'Uñas Diseño' },
  { id: 12, category: 'unas', image: '/assets/download (2).jpeg', title: 'Nail Art' },
  { id: 13, category: 'unas', image: '/assets/download (3).jpeg', title: 'Uñas Gel' },
  { id: 14, category: 'unas', image: '/assets/download (4).jpeg', title: 'Manicura Premium' },
  { id: 15, category: 'unas', image: '/assets/download (5).jpeg', title: 'Uñas Decoradas' },
  { id: 3, category: 'cejas', image: '/assets/cejas-perfectas.jpeg', title: 'Cejas Perfectas Naturales' },
  { id: 4, category: 'pestanas', image: '/assets/pestanas-extension.jpeg', title: 'Extensión de Pestañas Volumen' },
  { id: 5, category: 'pestanas', image: '/assets/pestanas-volumen.jpeg', title: 'Lash Lift Profesional' },
  { id: 6, category: 'salones', image: '/assets/salon-moderno.jpeg', title: 'Salón Moderno Blanco' },
  { id: 7, category: 'podologia', image: '/assets/podologia-pedicura.jpeg', title: 'Pedicura Francesa Clásica' },
  { id: 8, category: 'peluqueria', image: '/assets/peluqueria-corte.jpeg', title: 'Corte Profesional Moderno' },
  { id: 9, category: 'depilacion', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=90', title: 'Depilación con Cera' },
  { id: 10, category: 'depilacion', image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=90', title: 'Tratamiento Corporal' },
]

const ServiceGallery = () => {
  const [filter, setFilter] = React.useState<'todos' | 'unas' | 'cejas' | 'pestanas' | 'salones' | 'podologia' | 'peluqueria' | 'depilacion'>('todos')
  const filtered = filter === 'todos' ? galleryItems : galleryItems.filter(item => item.category === filter)

  const filters: { key: typeof filter; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'unas', label: '💅 Uñas' },
    { key: 'cejas', label: '👁️ Cejas' },
    { key: 'pestanas', label: '✨ Pestañas' },
    { key: 'salones', label: '🏢 Salones' },
    { key: 'podologia', label: '🦶 Podología' },
    { key: 'peluqueria', label: '💇 Peluquería' },
    { key: 'depilacion', label: '🪒 Depilación' },
  ]

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-[#ead3df] bg-gradient-to-br from-[#fff8fc] via-[#fffdfd] to-[#ffe9f3] px-4 md:px-6 py-6 shadow-[0_16px_34px_rgba(183,50,99,0.10)]">
      <div className="pointer-events-none absolute -top-16 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#f7c9dd]/35 to-[#ffeef6]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-14 -right-10 h-44 w-44 rounded-full bg-gradient-to-tr from-[#ebb4cf]/30 to-[#ffddea]/10 blur-3xl" />

      <div className="relative mb-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#b73f6d] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#e58bb0]" />
          Portfolio
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-[#2f2433] via-[#7a3158] to-[#b73f6d]">
          Galería de Nuestros Servicios
        </h2>
        <p className="mt-2 text-sm text-[#755d6c] max-w-2xl">Explora nuestro portafolio de trabajos profesionales, con inspiración real y resultados visibles.</p>
      </div>

      <div className="relative flex flex-wrap gap-2 mb-6">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-sm ${filter === f.key ? 'border-[#b83263] bg-gradient-to-r from-[#d96a95] to-[#b83263] text-white shadow-[0_10px_18px_rgba(183,50,99,0.18)]' : 'border-[#ecd7e1] text-[#695565] bg-white/90 hover:border-[#d98aaf] hover:text-[#b83263] hover:bg-[#fff7fb]'}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {filtered.map((item, index) => (
          <article key={item.id} className="group rounded-[22px] overflow-hidden cursor-pointer border border-[#eddbe4] bg-white shadow-[0_8px_20px_rgba(183,50,99,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(183,50,99,0.16)]" style={{ animationDelay: `${index * 0.08}s` }}>
            <div className="relative">
              <img src={item.image} alt={item.title} className="w-full aspect-[4/3] object-cover object-center transition-transform duration-500 group-hover:scale-[1.06]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-3 py-2.5">
                <span className="inline-flex max-w-full rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold leading-none text-[#412d3a] shadow-sm backdrop-blur-sm">{item.title}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const OptionCard = ({
  icon,
  title,
  description,
  onClick,
  gradient = 'from-pink-50 to-rose-50',
  iconBg = 'from-pink-400 to-rose-400',
}: {
  icon: string
  title: string
  description: string
  onClick?: () => void
  gradient?: string
  iconBg?: string
}) => (
  <div
    className={`bg-gradient-to-br ${gradient} border border-pink-100 p-6 rounded-3xl w-full sm:w-[200px] max-w-[280px] text-center shadow-[0_8px_28px_rgba(233,30,99,0.1)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(233,30,99,0.2)] hover:border-pink-200 ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    onClick={onClick}
  >
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconBg} flex items-center justify-center text-3xl mx-auto mb-4 shadow-md`}>{icon}</div>
    <h3 className="text-[#e91e63] font-extrabold text-base mb-1.5">{title}</h3>
    <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
  </div>
)

const HowItWorks = () => {
  const [active, setActive] = React.useState<number | null>(null)
  const steps = [
    {
      icon: '🔍', step: '1. Busca', desc: 'Mira las profesionales cerca tuyo',
      detail: 'Ingresa tu ubicación o activa el GPS y encontramos manicuristas, centros de uñas y salones disponibles en tu barrio al instante.',
    },
    {
      icon: '⭐', step: '2. Elige', desc: 'Lee las reseñas y compara precios',
      detail: 'Revisa el portfolio de cada profesional, lee las opiniones de otras clientas y compara precios antes de decidir. Todo en un solo lugar.',
    },
    {
      icon: '📅', step: '3. Reserva', desc: 'Agenda al tiro, sin llamar a nadie',
      detail: 'Selecciona el día y la hora que más te acomoda y confirma tu reserva en segundos. Recibes un recordatorio automático antes de tu cita.',
    },
  ]
  const current = active !== null ? steps[active] : null
  return (
  <section className="py-12 px-4 rounded-[30px] border border-rose-100 bg-gradient-to-br from-[#fff7fb] via-[#fffdfd] to-[#fff1f7] shadow-[0_14px_34px_rgba(183,50,99,0.10)]">
    <div className="text-center mb-9">
      <span className="inline-flex rounded-full border border-rose-200 bg-white/90 px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#b83263]">Proceso simple</span>
      <h2 className="text-3xl font-bold text-[#2a1f2f] mt-3">¿Cómo funciona? 🤔</h2>
      <p className="text-sm text-[#6f5a67] mt-2">Tres pasos claros para reservar en minutos</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch max-w-5xl mx-auto relative">
      {steps.map((s, i) => {
        const stepNumber = s.step.split('.')[0]
        const stepTitle = s.step.split('. ')[1]

        return (
          <div key={s.step} className="relative">
            {i < steps.length - 1 && (
              <span className="hidden md:flex absolute top-[46%] -right-5 z-10 text-[#d77ba5] text-2xl font-bold">→</span>
            )}
            <div
              onClick={() => setActive(i)}
              className="h-full flex flex-col items-center text-center gap-3.5 bg-white rounded-[24px] px-6 py-8 cursor-pointer transition-all border border-rose-100 shadow-[0_8px_20px_rgba(183,50,99,0.10)] hover:shadow-[0_16px_30px_rgba(183,50,99,0.18)] hover:-translate-y-1.5 hover:border-rose-200"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ffe6f0] to-[#ffd6e7] border border-rose-200 flex items-center justify-center text-3xl shadow-sm">{s.icon}</div>
              <div className="flex items-center gap-2">
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-gradient-to-r from-[#d25986] to-[#b83263] text-white text-xs font-bold">{stepNumber}</span>
                <h3 className="font-bold text-[#2f2433] text-2xl">{stepTitle}</h3>
              </div>
              <p className="text-lg text-[#6f5a67] leading-relaxed max-w-[22ch]">{s.desc}</p>
            </div>
          </div>
        )
      })}
    </div>

    {/* Modal popup */}
    {current && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center px-6" onClick={() => setActive(null)}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div
          className="relative bg-white rounded-3xl shadow-2xl p-7 max-w-xs w-full flex flex-col items-center gap-4 border border-rose-100"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-200 border border-rose-200 flex items-center justify-center text-3xl shadow-sm">{current.icon}</div>
          <h3 className="font-bold text-[#2f2433] text-lg text-center">{current.step}</h3>
          <p className="text-[#6f5a67] text-sm text-center leading-relaxed">{current.detail}</p>
          <button
            onClick={() => setActive(null)}
            className="mt-1 w-full bg-gradient-to-r from-[#d25986] to-[#b83263] text-white font-bold py-2.5 rounded-2xl text-sm border-none cursor-pointer hover:opacity-90 transition"
          >Entendido</button>
        </div>
      </div>
    )}
  </section>
  )
}

const Benefits = () => (
  <section className="relative py-12 px-4 md:px-7 rounded-[32px] my-8 overflow-hidden border border-[#ead3df] bg-gradient-to-br from-[#fff7fb] via-[#fffdfd] to-[#ffe9f3] shadow-[0_16px_34px_rgba(183,50,99,0.11)]">
    <div className="pointer-events-none absolute -top-14 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#f7c9dd]/40 to-[#ffedf5]/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-16 -right-8 h-44 w-44 rounded-full bg-gradient-to-tr from-[#ebb4cf]/35 to-[#ffddea]/10 blur-3xl" />

    <div className="relative text-center mb-10">
      <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#b73f6d] shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#e58bb0]" />
        Ventajas
      </span>
      <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-[#2f2433] via-[#7a3158] to-[#b73f6d]">
        ¿Por qué elegirnos?
      </h2>
      <p className="mt-3 text-sm text-[#755d6c]">Una experiencia cuidada, con confianza, claridad y reservas simples.</p>
    </div>

    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
      {[
        { icon: '✅', title: 'Profesionales de confianza', desc: 'Todas las profesionales están verificadas y con experiencia comprobada' },
        { icon: '💰', title: 'Precios sin sorpresas', desc: 'Compara precios reales y elige la opción que más te acomoda al bolsillo' },
        { icon: '🔒', title: '100% Seguro', desc: 'Tus datos están protegidos y los pagos son seguros, no hay drama' },
        { icon: '⚡', title: 'Reservas al instante', desc: 'Confirmas tu hora en tiempo real, sin esperar que te llamen de vuelta' },
      ].map((b, index) => (
        <article key={b.title} className="group relative overflow-hidden rounded-[24px] border border-[#eddbe4] bg-white/88 backdrop-blur-sm p-6 text-center shadow-[0_10px_22px_rgba(183,50,99,0.10)] hover:shadow-[0_18px_34px_rgba(183,50,99,0.16)] hover:-translate-y-1 transition-all">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f4c6d9] via-[#dc7aa1] to-[#a73f70]" />
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-200 bg-gradient-to-br from-[#ffe3ee] via-[#ffd7e7] to-[#ffc2d8] text-2xl shadow-[0_10px_18px_rgba(183,50,99,0.12)] transition-transform group-hover:scale-[1.03]">
            {b.icon}
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f0dbe4] bg-[#fff8fb] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#b14974]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e58bb0]" />
            Beneficio {index + 1}
          </div>
          <h3 className="font-extrabold text-[#2f2433] text-[1.03rem] leading-tight">{b.title}</h3>
          <p className="mt-2 text-sm text-[#6c5867] leading-relaxed">{b.desc}</p>
        </article>
      ))}
    </div>
  </section>
)

const Testimonials = () => (
  <section className="relative overflow-hidden py-12 px-4 md:px-7 rounded-[30px] border border-rose-100 bg-gradient-to-br from-[#fff5fb] via-[#fffdfd] to-[#fff2f8] shadow-[0_16px_34px_rgba(183,50,99,0.11)]">
    <div className="pointer-events-none absolute -top-16 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-rose-200/30 to-pink-200/20 blur-2xl" />
    <div className="pointer-events-none absolute -bottom-20 -right-12 h-48 w-48 rounded-full bg-gradient-to-tr from-fuchsia-200/25 to-rose-200/20 blur-3xl" />

    <div className="relative text-center mb-9">
      <span className="inline-flex rounded-full border border-rose-200 bg-white/90 px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#b83263]">Reseñas reales</span>
      <h2 className="text-3xl md:text-4xl font-bold text-[#2a1f2f] mt-3">Lo que dicen las clientas</h2>
      <p className="text-sm text-[#6f5a67] mt-2">Experiencias verificadas de nuestra comunidad</p>
    </div>

    <div className="relative grid grid-cols-1 gap-5 md:grid-cols-3 max-w-6xl mx-auto">
      {[
        { stars: '★★★★★', text: '"Quedé súper contenta, mis uñas quedaron bacanes. La chica fue muy simpática y prolija. 100 puntos po!"', name: 'María González', service: 'Uñas Acrílicas' },
        { stars: '★★★★★', text: '"Me encantó, qué buena onda la manicurista. Volvería altiro, súper recomendada para las chiquillas."', name: 'Claudia Ramírez', service: 'Manicura Premium' },
        { stars: '★★★★★', text: '"La mejor app que he encontrado en Chile. Se usa fácil y las profesionales cachan harto de su pega."', name: 'Andrea López', service: 'Spa de Manos' },
      ].map(t => (
        <article key={t.name} className="p-[1px] rounded-2xl bg-gradient-to-b from-rose-200/60 to-rose-100/30">
          <div className="h-full bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-[0_8px_20px_rgba(183,50,99,0.10)] hover:shadow-[0_16px_30px_rgba(183,50,99,0.16)] transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ffd9e9] to-[#ffc6dc] text-[#8f2c56] font-bold text-sm flex items-center justify-center border border-rose-200">
                  {t.name.split(' ').map(part => part[0]).slice(0, 2).join('')}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm text-[#2f2433] leading-tight">{t.name}</span>
                  <span className="text-xs text-[#957b8a]">{t.service}</span>
                </div>
              </div>
              <span className="text-[#d65a8c] text-3xl leading-none font-serif">“</span>
            </div>

            <div className="text-[#f2b437] text-base tracking-[0.2em]">{t.stars}</div>
            <p className="text-base text-[#5f4c58] leading-relaxed flex-1">{t.text}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
)

const CouponModal = ({ onClose }: { onClose: () => void }) => {
  const code = 'MIMA20'
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[1000] backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-[92%] max-w-sm">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 px-6 pt-8 pb-6 text-center text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 text-white font-bold flex items-center justify-center hover:bg-white/30 transition border-none cursor-pointer text-base"
            >✕</button>
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-2xl font-extrabold leading-tight mb-1">¡Tu cupón está listo!</h2>
            <p className="text-sm opacity-90">20% de descuento en tu primer servicio</p>
          </div>

          {/* Coupon body */}
          <div className="px-6 py-7 flex flex-col items-center gap-5">
            <div className="w-full border-2 border-dashed border-pink-300 rounded-2xl bg-pink-50 py-5 px-4 flex flex-col items-center gap-2">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Código de descuento</p>
              <span className="text-3xl font-extrabold text-[#e91e63] tracking-[6px]">{code}</span>
              <p className="text-[11px] text-gray-400">Válido para tu primera reserva</p>
            </div>

            <button
              onClick={handleCopy}
              className="w-full bg-gradient-to-r from-pink-400 to-[#e91e63] text-white font-extrabold py-3 rounded-2xl text-sm border-none cursor-pointer hover:opacity-90 transition-all hover:scale-[1.02] shadow-md"
            >
              {copied ? '✅ ¡Código copiado!' : '📋 Copiar código'}
            </button>

            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
              Ingresá este código al momento de reservar tu cita.<br />
              Válido por <strong>30 días</strong>. Solo para nuevas clientas.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

const PromoBanner = () => {
  const [showCoupon, setShowCoupon] = React.useState(false)

  return (
    <>
      <section className="relative overflow-hidden rounded-[32px] border border-rose-200/80 bg-gradient-to-r from-[#ffe8f1] via-[#ffddea] to-[#ffd2e4] py-10 px-6 md:px-10 text-center my-8 shadow-[0_18px_44px_rgba(183,50,99,0.18)]">
        <div className="pointer-events-none absolute -top-20 -left-14 h-44 w-44 rounded-full bg-gradient-to-br from-white/70 to-pink-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-12 h-52 w-52 rounded-full bg-gradient-to-tr from-rose-200/45 to-fuchsia-200/35 blur-2xl" />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/75 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b83263]">
            <span>Oferta exclusiva</span>
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#64253f] leading-tight">🎉 Oferta especial para nuevas clientas</h2>
          <p className="mt-4 text-lg text-[#6b4257] leading-relaxed">
            Lleva un <span className="inline-block rounded-xl bg-white/80 px-3 py-1 font-extrabold text-[#b83263] shadow-sm">20% de descuento</span> en tu primer servicio
          </p>
          <button
            onClick={() => setShowCoupon(true)}
            className="mt-7 bg-gradient-to-r from-[#d25986] to-[#b83263] text-white font-extrabold px-9 py-3.5 rounded-full text-sm hover:scale-[1.03] transition-transform cursor-pointer border border-[#a8305c] shadow-[0_12px_26px_rgba(184,50,99,0.32)]"
          >
            ¡Quiero mi descuento! 🎉
          </button>
        </div>
      </section>
      {showCoupon && <CouponModal onClose={() => setShowCoupon(false)} />}
    </>
  )
}

const HeaderBranding = () => (
  <header className="text-center py-10 px-4 mb-4 bg-gradient-to-br from-pink-50 via-rose-50/80 to-fuchsia-50 backdrop-blur-md rounded-3xl border border-pink-200 shadow-md">
    <div className="flex justify-center mb-9 relative">
      <div className="relative w-[220px] h-[220px] flex justify-center items-center">
        <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-pink-300 via-[#e91e63] to-[#ad1457] rounded-full opacity-20 blur-[60px]" />
        <img
          src="/assets/logo1.png"
          alt="Mi Manicurista Logo Principal"
          className="w-44 h-44 rounded-[30px] object-contain bg-white p-4 shadow-[0_40px_100px_rgba(233,30,99,0.35)] border-4 border-pink-100 relative z-10 transition-all hover:scale-[1.08] hover:-rotate-[8deg] cursor-pointer"
        />
      </div>
    </div>
    <h1 className="text-[2rem] font-bold text-[#e91e63] my-2">Tu belleza, a tu manera 💅</h1>
    <p className="text-[#aaa] text-[0.95rem]">Encuentra tu manicurista ideal en Chile</p>
  </header>
)

type LoginTipo = 'cliente' | 'salon' | 'profesional'

const loginTipos: { tipo: LoginTipo; emoji: string; label: string; desc: string }[] = [
  { tipo: 'cliente', emoji: '💖', label: 'Soy Cliente', desc: 'Reserva citas y gestiona tus servicios' },
  { tipo: 'salon', emoji: '🏢', label: 'Soy Salón', desc: 'Administra tu negocio y equipo' },
  { tipo: 'profesional', emoji: '💅', label: 'Soy Profesional', desc: 'Gestiona tu agenda y portfolio' },
]

const LoginModal = ({ isOpen, onClose, onOpenRegister, initialTipo }: { isOpen: boolean; onClose: () => void; onOpenRegister: () => void; initialTipo?: LoginTipo }) => {
  const router = useRouter()
  const [tipo, setTipo] = React.useState<LoginTipo | null>(initialTipo ?? null)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const reset = () => { setTipo(initialTipo ?? null); setEmail(''); setPassword(''); setError('') }
  React.useEffect(() => { if (isOpen) setTipo(initialTipo ?? null) }, [isOpen, initialTipo])
  const handleClose = () => { reset(); onClose() }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const stored = localStorage.getItem('mimanicure_user')
      if (!stored) { setError('__no_account__'); return }
      const user = JSON.parse(stored)
      const emailOk = user.email?.toLowerCase().trim() === email.toLowerCase().trim()
      const passwordOk = !user.password || user.password === password
      if (emailOk && passwordOk) {
        handleClose()
        if (user.tipo === 'salon') router.push('/perfil-salon')
        else if (user.tipo === 'profesional') router.push('/perfil-profesional')
        else router.push('/perfil')
        return
      }
      // No revelar qué campo falló ni el email registrado
      setError('Correo o contraseña incorrectos.')
    } catch {
      setError('Ocurrió un error al iniciar sesión. Intenta de nuevo.')
    }
  }

  if (!isOpen) return null
  const tipoInfo = loginTipos.find(t => t.tipo === tipo)

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[1000] backdrop-blur-sm" onClick={handleClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-[92%] max-w-[760px] overflow-hidden rounded-[30px] border border-[#edd8e3] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
        <button
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/95 text-[#b73f6d] text-xl font-light shadow-sm transition hover:bg-[#fff4f9] hover:text-[#9f3c68] border-none cursor-pointer"
          onClick={handleClose}
        >✕</button>

        {!tipo ? (
          <>
            <div className="relative overflow-hidden bg-gradient-to-br from-[#f7c8de] via-[#f15faf] to-[#d92b7f] text-white text-center px-8 pt-10 pb-9">
              <div className="pointer-events-none absolute -top-16 -left-12 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -right-8 h-44 w-44 rounded-full bg-[#ff7fc2]/20 blur-3xl" />
              <p className="relative text-[11px] font-bold uppercase tracking-[0.28em] opacity-90 mb-3">Mi Manicurista</p>
              <h2 className="relative text-[2.35rem] md:text-[2.8rem] font-extrabold tracking-[-0.03em] leading-none mb-3">Iniciar Sesión</h2>
              <p className="relative text-sm md:text-base opacity-90">Elige cómo quieres acceder a tu cuenta</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-6 md:p-7 bg-gradient-to-b from-white to-[#fff7fb]">
              {loginTipos.map(t => (
                <button
                  key={t.tipo}
                  onClick={() => setTipo(t.tipo)}
                  className="group flex flex-col items-center justify-center gap-3 rounded-[22px] border border-[#efd9e3] bg-white px-4 py-6 text-center shadow-[0_10px_24px_rgba(183,50,99,0.08)] transition-all hover:-translate-y-1 hover:border-[#cf7ea1] hover:bg-gradient-to-br hover:from-[#fff8fb] hover:to-[#ffeaf2] hover:shadow-[0_16px_30px_rgba(183,50,99,0.14)]"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffe1ed] to-[#f8b8d2] text-[2rem] shadow-[0_10px_18px_rgba(183,50,99,0.12)] transition-transform group-hover:scale-[1.03]">{t.emoji}</span>
                  <strong className="text-[1rem] font-extrabold tracking-[-0.01em] text-[#2f2433]">{t.label}</strong>
                  <p className="m-0 text-[0.82rem] leading-snug text-[#7c6875]">{t.desc}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              className="absolute left-6 top-[84px] z-10 bg-white/20 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/30 rounded-full border-none cursor-pointer"
              onClick={() => { setTipo(null); setError('') }}
            >← Volver</button>
            <div className="relative overflow-hidden bg-gradient-to-br from-[#f7c8de] via-[#f15faf] to-[#d92b7f] text-white text-center px-8 pt-10 pb-9">
              <div className="pointer-events-none absolute -top-16 -left-12 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -right-8 h-44 w-44 rounded-full bg-[#ff7fc2]/20 blur-3xl" />
              <p className="relative text-[11px] font-bold uppercase tracking-[0.28em] opacity-90 mb-3">{tipoInfo?.emoji} {tipoInfo?.label}</p>
              <h2 className="relative text-[2.15rem] md:text-[2.55rem] font-extrabold tracking-[-0.03em] leading-none mb-3">Inicia Sesión</h2>
              <p className="relative text-sm md:text-base opacity-90">Accede a tu cuenta de forma segura</p>
            </div>

            <form onSubmit={handleSubmit} className="px-7 md:px-8 py-7 flex flex-col gap-4 bg-gradient-to-b from-white to-[#fff7fb]">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#8c7282]">Correo</label>
                <input
                  type="email" placeholder="tu@correo.com" value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }} required
                  className="w-full rounded-2xl border border-[#e9d7e1] bg-white px-4 py-3.5 text-sm text-[#2f2433] placeholder:text-[#b49aa8] shadow-sm transition focus:outline-none focus:border-[#c9658f] focus:ring-4 focus:ring-[#f4cfe0]/70"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#8c7282]">Contraseña</label>
                <input
                  type="password" placeholder="Tu contraseña" value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }} required
                  className="w-full rounded-2xl border border-[#e9d7e1] bg-white px-4 py-3.5 text-sm text-[#2f2433] placeholder:text-[#b49aa8] shadow-sm transition focus:outline-none focus:border-[#c9658f] focus:ring-4 focus:ring-[#f4cfe0]/70"
                />
              </div>

              {error === '__no_account__' ? (
                <div className="rounded-2xl border border-[#f2d7e3] bg-[#fff4f9] p-4 flex flex-col gap-2 shadow-sm">
                  <p className="text-sm text-[#6f5a67]">No hay ninguna cuenta registrada aún.</p>
                  <button type="button" className="text-left text-sm font-bold text-[#b73f6d] hover:text-[#9f3c68] bg-transparent border-none cursor-pointer" onClick={() => { handleClose(); onOpenRegister() }}>
                    Crear una cuenta ahora →
                  </button>
                </div>
              ) : error ? (
                <div className="rounded-2xl border border-[#f3c8cf] bg-[#fff3f5] p-3 shadow-sm">
                  <p className="text-sm text-[#b84058]">{error}</p>
                </div>
              ) : null}

              <button type="submit" className="w-full rounded-2xl border border-[#ab3e67] bg-gradient-to-r from-[#d55b86] via-[#c74372] to-[#ab3e67] py-4 text-base font-extrabold text-white shadow-[0_14px_28px_rgba(183,50,99,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(183,50,99,0.34)] border-none cursor-pointer mt-1">
                Ingresar
              </button>
            </form>

            <div className="px-8 pb-7 text-center text-sm text-[#6f5a67] bg-gradient-to-b from-[#fff7fb] to-white">
              <p>¿No tienes cuenta? <button className="font-semibold text-[#b73f6d] hover:text-[#9f3c68] hover:underline border-none bg-transparent cursor-pointer" onClick={() => { handleClose(); onOpenRegister() }}>Regístrate aquí</button></p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

// ─── Validación RUT chileno ──────────────────────────────────────────
function formatRut(value: string): string {
  const clean = value.replace(/[^0-9kK]/g, '').toUpperCase()
  if (clean.length <= 1) return clean
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${formatted}-${dv}`
}

function validateRut(rut: string): boolean {
  const clean = rut.replace(/[.\-]/g, '').toUpperCase() // eslint-disable-line no-useless-escape
  if (clean.length < 2) return false
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  let sum = 0
  let multiplier = 2
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }
  const expected = 11 - (sum % 11)
  const expectedDv = expected === 11 ? '0' : expected === 10 ? 'K' : String(expected)
  return expectedDv === dv
}

type RegisterType = 'cliente' | 'salon' | 'profesional'

const ESPECIALIDADES = [
  'Manicura', 'Pedicura', 'Uñas Acrílicas', 'Uñas de Gel',
  'Nail Art / Diseños', 'Cejas', 'Extensión de Pestañas',
  'Lash Lift', 'Spa de Manos', 'Podología',
]

type DisponibilidadPorDia = Record<string, string[]>

const DIAS_SEMANA_CORTO = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const MESES_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const HORAS_BASE = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00']

const toDateKey = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const fromDateKey = (key: string) => new Date(`${key}T12:00:00`)

const shiftDays = (date: Date, offset: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + offset)
  return next
}

const startOfWeekMonday = (date: Date) => {
  const mondayOffset = (date.getDay() + 6) % 7
  return shiftDays(date, -mondayOffset)
}

const defaultHoursByWeekday = (weekday: number) => {
  if (weekday === 0 || weekday === 6) return []
  if (weekday === 1 || weekday === 3) return ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00']
  if (weekday === 2) return ['10:00', '11:00', '15:00', '16:00', '17:00']
  if (weekday === 4) return ['09:00', '10:00', '15:00', '16:00', '18:00']
  return ['09:00', '10:00', '11:00', '15:00']
}

const buildMonthAvailability = (monthDate: Date): DisponibilidadPorDia => {
  const start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
  const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()
  const availability: DisponibilidadPorDia = {}

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(start.getFullYear(), start.getMonth(), day)
    const slots = defaultHoursByWeekday(date.getDay())
    if (slots.length) availability[toDateKey(date)] = slots
  }

  return availability
}

const mergeMonthAvailability = (current: DisponibilidadPorDia, monthDate: Date) => {
  const defaults = buildMonthAvailability(monthDate)
  const merged = { ...current }
  Object.entries(defaults).forEach(([day, slots]) => {
    if (!merged[day]) merged[day] = slots
  })
  return merged
}

const monthLabel = (date: Date) => `${MESES_ES[date.getMonth()]} ${date.getFullYear()}`

const RegisterTypeSelector = ({ onSelect }: { onSelect: (t: RegisterType) => void }) => (
  <div>
    <div className="bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white text-center px-8 pt-8 pb-7">
      <p className="text-xs font-extrabold uppercase tracking-widest opacity-90 mb-3">Mi Manicurista</p>
      <h2 className="text-3xl font-extrabold tracking-tight leading-tight mb-1">Crear Cuenta</h2>
      <p className="text-sm opacity-90">¿Cómo quieres registrarte?</p>
    </div>
    <div className="flex gap-3 p-6">
      <button className="flex-1 relative flex flex-col items-center justify-center gap-2 py-5 px-2 bg-white border-2 border-pink-100 rounded-[20px] cursor-pointer text-center transition-all hover:border-[#e91e63] hover:shadow-lg font-sans" onClick={() => onSelect('cliente')}>
        <span className="text-[2.4rem] leading-none">💖</span>
        <strong className="text-sm font-extrabold text-gray-800">Cliente</strong>
        <p className="text-[0.7rem] text-gray-400 m-0 leading-snug">Reserva citas con los mejores profesionales</p>
      </button>
      <button className="flex-1 relative flex flex-col items-center justify-center gap-2 py-5 px-2 bg-white border-2 border-pink-100 rounded-[20px] cursor-pointer text-center transition-all hover:border-[#e91e63] hover:shadow-lg font-sans" onClick={() => onSelect('salon')}>
        <span className="text-[2.4rem] leading-none">🏢</span>
        <strong className="text-sm font-extrabold text-gray-800">Salón</strong>
        <p className="text-[0.7rem] text-gray-400 m-0 leading-snug">Administra tu negocio y llega a más clientes</p>
      </button>
      <button className="flex-1 relative flex flex-col items-center justify-center gap-2 py-5 px-2 bg-pink-50/50 border-2 border-[#e91e63] rounded-[20px] cursor-pointer text-center transition-all hover:shadow-lg font-sans" onClick={() => onSelect('profesional')}>
        <span className="absolute top-2 right-2 bg-[#e91e63] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">⭐ Destacado</span>
        <span className="text-[2.4rem] leading-none">💅</span>
        <strong className="text-sm font-extrabold text-gray-800">Profesional</strong>
        <p className="text-[0.7rem] text-gray-400 m-0 leading-snug">Publica tus servicios, portfolio y agenda</p>
      </button>
    </div>
  </div>
)

const FormCliente = ({ onSuccess }: { onSuccess: (nombre: string) => void }) => {
  const [form, setForm] = React.useState({ rut: '', nombre: '', apellido: '', email: '', telefono: '', fechaNacimiento: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = React.useState<Partial<typeof form>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: name === 'rut' ? formatRut(value) : value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const err: Partial<typeof form> = {}
    if (!form.rut) err.rut = 'Requerido'
    else if (!validateRut(form.rut)) err.rut = 'RUT inválido'
    if (!form.nombre.trim()) err.nombre = 'Requerido'
    if (!form.apellido.trim()) err.apellido = 'Requerido'
    if (!form.email) err.email = 'Requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Correo inválido'
    if (!form.telefono) err.telefono = 'Requerido'
    if (!form.fechaNacimiento) err.fechaNacimiento = 'Requerida'
    if (!form.password) err.password = 'Requerida'
    else if (form.password.length < 6) err.password = 'Mínimo 6 caracteres'
    if (form.password !== form.confirmPassword) err.confirmPassword = 'No coinciden'
    return err
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length > 0) { setErrors(err); return }
    // Nota: en producción nunca guardar contraseña en cliente — usar backend con hash
    localStorage.setItem('mimanicure_user', JSON.stringify({ tipo: 'cliente', rut: form.rut, nombre: form.nombre, apellido: form.apellido, email: form.email, telefono: form.telefono, password: form.password }))
    onSuccess(form.nombre)
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pb-6 flex flex-col gap-3" noValidate>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-600">🪦 RUT</label>
        <input name="rut" type="text" placeholder="12.345.678-9" value={form.rut} onChange={handleChange} maxLength={12} autoComplete="off" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />
        {errors.rut && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.rut}</span>}
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">👤 Nombre</label><input name="nombre" type="text" placeholder="María" value={form.nombre} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.nombre && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.nombre}</span>}</div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">👤 Apellido</label><input name="apellido" type="text" placeholder="González" value={form.apellido} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.apellido && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.apellido}</span>}</div>
      </div>
      <div className="flex flex-col gap-1"><label className="text-xs font-bold text-gray-600">📧 Correo electrónico</label><input name="email" type="email" placeholder="tu@correo.com" value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.email && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.email}</span>}</div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">📱 Teléfono</label><input name="telefono" type="tel" placeholder="+56 9 1234 5678" value={form.telefono} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.telefono && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.telefono}</span>}</div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🎂 Fecha de nacimiento</label><input name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} max={new Date().toISOString().split('T')[0]} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.fechaNacimiento && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.fechaNacimiento}</span>}</div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🔐 Contraseña</label><input name="password" type="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={handleChange} autoComplete="new-password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.password && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.password}</span>}</div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🔐 Confirmar</label><input name="confirmPassword" type="password" placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.confirmPassword && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.confirmPassword}</span>}</div>
      </div>
      <button type="submit" className="w-full bg-gradient-to-r from-pink-400 to-[#e91e63] text-white font-extrabold py-4 rounded-2xl text-sm shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all mt-1 border-none cursor-pointer">Crear mi cuenta 💖</button>
    </form>
  )
}

const FormSalon = ({ onSuccess }: { onSuccess: (nombre: string) => void }) => {
  const [form, setForm] = React.useState({ rutEmpresa: '', nombreSalon: '', nombreRepresentante: '', email: '', telefono: '', direccion: '', ciudad: '', descripcion: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = React.useState<Partial<typeof form>>({})
  const [fotoSalon, setFotoSalon] = React.useState<string | null>(null)
  const [haceDomicilio, setHaceDomicilio] = React.useState(false)
  const [comunasDomicilio, setComunasDomicilio] = React.useState('')
  const [agendaAbierta, setAgendaAbierta] = React.useState(true)
  const [mesAgenda, setMesAgenda] = React.useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [diaSeleccionado, setDiaSeleccionado] = React.useState(() => toDateKey(new Date()))
  const [disponibilidad, setDisponibilidad] = React.useState<DisponibilidadPorDia>(() => {
    const now = new Date()
    return buildMonthAvailability(new Date(now.getFullYear(), now.getMonth(), 1))
  })

  React.useEffect(() => {
    setDisponibilidad(prev => mergeMonthAvailability(prev, mesAgenda))
  }, [mesAgenda])

  const diasCalendario = React.useMemo(() => {
    const inicioMes = new Date(mesAgenda.getFullYear(), mesAgenda.getMonth(), 1)
    const inicioVista = startOfWeekMonday(inicioMes)
    return Array.from({ length: 42 }, (_, idx) => shiftDays(inicioVista, idx))
  }, [mesAgenda])

  const fechaSeleccionada = React.useMemo(() => fromDateKey(diaSeleccionado), [diaSeleccionado])
  const semanaSeleccionada = React.useMemo(() => {
    const inicio = startOfWeekMonday(fechaSeleccionada)
    return Array.from({ length: 7 }, (_, idx) => shiftDays(inicio, idx))
  }, [fechaSeleccionada])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: name === 'rutEmpresa' ? formatRut(value) : value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFotoSalon(prev => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(file) })
    }
  }

  const validate = () => {
    const err: Partial<typeof form> = {}
    if (!form.rutEmpresa) err.rutEmpresa = 'Requerido'
    else if (!validateRut(form.rutEmpresa)) err.rutEmpresa = 'RUT inválido'
    if (!form.nombreSalon.trim()) err.nombreSalon = 'Requerido'
    if (!form.nombreRepresentante.trim()) err.nombreRepresentante = 'Requerido'
    if (!form.email) err.email = 'Requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Correo inválido'
    if (!form.telefono) err.telefono = 'Requerido'
    if (!form.direccion.trim()) err.direccion = 'Requerida'
    if (!form.ciudad.trim()) err.ciudad = 'Requerida'
    if (!form.password) err.password = 'Requerida'
    else if (form.password.length < 6) err.password = 'Mínimo 6 caracteres'
    if (form.password !== form.confirmPassword) err.confirmPassword = 'No coinciden'
    return err
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length > 0) { setErrors(err); return }
    localStorage.setItem('mimanicure_user', JSON.stringify({ tipo: 'salon', rutEmpresa: form.rutEmpresa, nombreSalon: form.nombreSalon, nombreRepresentante: form.nombreRepresentante, email: form.email, telefono: form.telefono, direccion: form.direccion, ciudad: form.ciudad, descripcion: form.descripcion, fotoSalon, haceDomicilio, comunasDomicilio, disponibilidadAgenda: disponibilidad, password: form.password }))
    onSuccess(form.nombreSalon)
  }

  const cambiarMesAgenda = (delta: number) => {
    setMesAgenda(prev => {
      const next = new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
      setDiaSeleccionado(current => {
        const selected = fromDateKey(current)
        const sameMonth = selected.getMonth() === next.getMonth() && selected.getFullYear() === next.getFullYear()
        return sameMonth ? current : toDateKey(next)
      })
      return next
    })
  }

  const toggleHora = (dateKey: string, hora: string) => {
    setDisponibilidad(prev => {
      const current = prev[dateKey] ?? []
      const updated = current.includes(hora)
        ? current.filter(h => h !== hora)
        : [...current, hora].sort((a, b) => a.localeCompare(b))
      return { ...prev, [dateKey]: updated }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pb-6 flex flex-col gap-3" noValidate>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-600">📸 Foto del salón</label>
        <div className="border-2 border-dashed border-pink-200 rounded-2xl p-5 flex flex-col items-center gap-2 cursor-pointer hover:border-pink-400 hover:bg-pink-50/50 transition-all" onClick={() => document.getElementById('foto-salon')?.click()}>
          {fotoSalon
            ? <img src={fotoSalon} alt="Foto salón" className="w-full max-h-32 object-cover rounded-xl" />
            : <><span className="text-3xl">🏢</span><span className="text-sm text-gray-400">Subir foto del salón</span></>
          }
        </div>
        <input id="foto-salon" type="file" accept="image/*" onChange={handleFoto} className="hidden" />
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🪦 RUT Empresa</label><input name="rutEmpresa" type="text" placeholder="12.345.678-9" value={form.rutEmpresa} onChange={handleChange} maxLength={12} autoComplete="off" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.rutEmpresa && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.rutEmpresa}</span>}</div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🏢 Nombre del Salón</label><input name="nombreSalon" type="text" placeholder="Beauty Studio" value={form.nombreSalon} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.nombreSalon && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.nombreSalon}</span>}</div>
      </div>
      <div className="flex flex-col gap-1"><label className="text-xs font-bold text-gray-600">👤 Nombre del Representante</label><input name="nombreRepresentante" type="text" placeholder="Ana Martínez" value={form.nombreRepresentante} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.nombreRepresentante && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.nombreRepresentante}</span>}</div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">📧 Correo</label><input name="email" type="email" placeholder="salon@correo.com" value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.email && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.email}</span>}</div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">📱 Teléfono</label><input name="telefono" type="tel" placeholder="+56 9 1234 5678" value={form.telefono} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.telefono && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.telefono}</span>}</div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">📍 Dirección</label><input name="direccion" type="text" placeholder="Av. Providencia 1234" value={form.direccion} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.direccion && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.direccion}</span>}</div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🏙️ Ciudad / Comuna</label><input name="ciudad" type="text" placeholder="Providencia" value={form.ciudad} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.ciudad && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.ciudad}</span>}</div>
      </div>
      <div className="flex flex-col gap-1"><label className="text-xs font-bold text-gray-600">📝 Descripción del salón</label><textarea name="descripcion" placeholder="Cuéntanos sobre tu salón, servicios y ambiente..." value={form.descripcion} onChange={handleChange} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300 resize-none" /></div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-600">🚗 ¿El salón ofrece atención a domicilio?</label>
        <div className="flex gap-2">
          <button type="button" onClick={() => setHaceDomicilio(true)} className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${haceDomicilio ? 'border-[#e91e63] bg-[#e91e63] text-white' : 'border-pink-100 text-gray-600 bg-white hover:border-pink-300'}`}>Sí</button>
          <button type="button" onClick={() => setHaceDomicilio(false)} className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${!haceDomicilio ? 'border-[#e91e63] bg-[#e91e63] text-white' : 'border-pink-100 text-gray-600 bg-white hover:border-pink-300'}`}>No</button>
        </div>
      </div>
      {haceDomicilio && (
        <div className="flex flex-col gap-1"><label className="text-xs font-bold text-gray-600">🗺️ Comunas / Zonas que cubren</label><input type="text" placeholder="Ej: Providencia, Las Condes, Ñuñoa" value={comunasDomicilio} onChange={e => setComunasDomicilio(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" /></div>
      )}

      <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] border-b border-pink-100 pb-2 mt-2">📅 Agenda y disponibilidad</p>
      <div className="bg-gradient-to-b from-white to-pink-50/50 border border-pink-100 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-gray-800">Configura tus horarios del mes</p>
            <p className="text-xs text-gray-500">Haz clic en un día para ver la semana y marcar horas disponibles.</p>
          </div>
          <button
            type="button"
            onClick={() => setAgendaAbierta(prev => !prev)}
            className="px-3 py-2 rounded-xl text-xs font-bold border-2 border-pink-200 text-[#e91e63] bg-white hover:bg-pink-50 transition-all cursor-pointer"
          >
            {agendaAbierta ? 'Ocultar agenda' : 'Ver agenda'}
          </button>
        </div>

        {agendaAbierta && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-pink-100 p-3">
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={() => cambiarMesAgenda(-1)} className="w-8 h-8 rounded-full border border-pink-100 bg-pink-50 text-[#e91e63] font-bold cursor-pointer hover:bg-pink-100 transition-all">‹</button>
                <p className="text-sm font-extrabold text-gray-800">{monthLabel(mesAgenda)}</p>
                <button type="button" onClick={() => cambiarMesAgenda(1)} className="w-8 h-8 rounded-full border border-pink-100 bg-pink-50 text-[#e91e63] font-bold cursor-pointer hover:bg-pink-100 transition-all">›</button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase mb-2">
                {DIAS_SEMANA_CORTO.map(day => <span key={day}>{day}</span>)}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {diasCalendario.map(date => {
                  const key = toDateKey(date)
                  const inMonth = date.getMonth() === mesAgenda.getMonth()
                  const isSelected = key === diaSeleccionado
                  const totalSlots = (disponibilidad[key] ?? []).length

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setDiaSeleccionado(key)}
                      className={`relative min-h-11 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${isSelected ? 'border-[#e91e63] bg-[#e91e63] text-white shadow-sm' : inMonth ? 'border-pink-100 bg-white text-gray-700 hover:border-pink-300' : 'border-transparent bg-gray-50 text-gray-300'}`}
                    >
                      <span>{date.getDate()}</span>
                      {totalSlots > 0 && (
                        <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] ${isSelected ? 'text-white/90' : 'text-pink-500'}`}>
                          {totalSlots}h
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-pink-100 p-3">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] mb-2">Horas disponibles del día seleccionado</p>
              <p className="text-sm font-bold text-gray-800 mb-3">{DIAS_SEMANA_CORTO[(fechaSeleccionada.getDay() + 6) % 7]} {fechaSeleccionada.getDate()} de {MESES_ES[fechaSeleccionada.getMonth()]}</p>
              <div className="flex flex-wrap gap-2">
                {HORAS_BASE.map(hora => {
                  const active = (disponibilidad[diaSeleccionado] ?? []).includes(hora)
                  return (
                    <button
                      key={hora}
                      type="button"
                      onClick={() => toggleHora(diaSeleccionado, hora)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all cursor-pointer ${active ? 'border-[#e91e63] bg-[#e91e63] text-white' : 'border-pink-100 bg-white text-gray-500 hover:border-pink-300 hover:text-[#e91e63]'}`}
                    >
                      {hora}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-pink-100 p-3">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] mb-2">Vista semanal</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {semanaSeleccionada.map(date => {
                  const key = toDateKey(date)
                  const slots = disponibilidad[key] ?? []
                  return (
                    <div key={key} className={`rounded-xl border p-2.5 ${key === diaSeleccionado ? 'border-[#e91e63] bg-pink-50' : 'border-pink-100 bg-white'}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-gray-700">{DIAS_SEMANA_CORTO[(date.getDay() + 6) % 7]} {date.getDate()}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${slots.length ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{slots.length ? `${slots.length} disponibles` : 'Sin cupos'}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {slots.slice(0, 4).map(slot => (
                          <span key={slot} className="text-[10px] px-2 py-0.5 rounded-md bg-pink-100 text-pink-600 font-semibold">{slot}</span>
                        ))}
                        {slots.length > 4 && <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 font-semibold">+{slots.length - 4}</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🔐 Contraseña</label><input name="password" type="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={handleChange} autoComplete="new-password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.password && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.password}</span>}</div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🔐 Confirmar</label><input name="confirmPassword" type="password" placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.confirmPassword && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.confirmPassword}</span>}</div>
      </div>
      <button type="submit" className="w-full bg-gradient-to-r from-pink-400 to-[#e91e63] text-white font-extrabold py-4 rounded-2xl text-sm shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all mt-1 border-none cursor-pointer">Registrar mi Salón 🏢</button>
    </form>
  )
}

const FormProfesional = ({ onSuccess }: { onSuccess: (nombre: string) => void }) => {
  const [form, setForm] = React.useState({ rut: '', nombre: '', apellido: '', email: '', telefono: '', fechaNacimiento: '', direccion: '', ciudad: '', instagram: '', experiencia: '', descripcion: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = React.useState<Partial<typeof form & { especialidades: string; fotoPerfil: string }>>({})
  const [especialidades, setEspecialidades] = React.useState<string[]>([])
  const [haceDomicilio, setHaceDomicilio] = React.useState(false)
  const [comunasDomicilio, setComunasDomicilio] = React.useState('')
  const [fotoPerfil, setFotoPerfil] = React.useState<string | null>(null)
  const [fotosPortfolio, setFotosPortfolio] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)
  const [submitError, setSubmitError] = React.useState('')
  const [agendaAbierta, setAgendaAbierta] = React.useState(true)
  const [mesAgenda, setMesAgenda] = React.useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [diaSeleccionado, setDiaSeleccionado] = React.useState(() => toDateKey(new Date()))
  const [disponibilidad, setDisponibilidad] = React.useState<DisponibilidadPorDia>(() => {
    const now = new Date()
    return buildMonthAvailability(new Date(now.getFullYear(), now.getMonth(), 1))
  })

  React.useEffect(() => {
    setDisponibilidad(prev => mergeMonthAvailability(prev, mesAgenda))
  }, [mesAgenda])

  const diasCalendario = React.useMemo(() => {
    const inicioMes = new Date(mesAgenda.getFullYear(), mesAgenda.getMonth(), 1)
    const inicioVista = startOfWeekMonday(inicioMes)
    return Array.from({ length: 42 }, (_, idx) => shiftDays(inicioVista, idx))
  }, [mesAgenda])

  const fechaSeleccionada = React.useMemo(() => fromDateKey(diaSeleccionado), [diaSeleccionado])
  const semanaSeleccionada = React.useMemo(() => {
    const inicio = startOfWeekMonday(fechaSeleccionada)
    return Array.from({ length: 7 }, (_, idx) => shiftDays(inicio, idx))
  }, [fechaSeleccionada])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: name === 'rut' ? formatRut(value) : value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const toggleEspecialidad = (esp: string) => {
    setEspecialidades(prev => prev.includes(esp) ? prev.filter(e => e !== esp) : [...prev, esp])
    setErrors(prev => ({ ...prev, especialidades: '' }))
  }

  const handleFotoPerfil = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFotoPerfil(prev => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(file) })
    }
  }

  const handleFotosPortfolio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const urls = files.map(f => URL.createObjectURL(f))
    setFotosPortfolio(prev => [...prev, ...urls].slice(0, 8))
  }

  const removePortfolioPhoto = (idx: number) => {
    setFotosPortfolio(prev => {
      URL.revokeObjectURL(prev[idx])
      return prev.filter((_, i) => i !== idx)
    })
  }

  const validate = () => {
    const err: Partial<typeof form & { especialidades: string; fotoPerfil: string }> = {}
    if (!form.rut) err.rut = 'Requerido'
    else if (!validateRut(form.rut)) err.rut = 'RUT inválido'
    if (!form.nombre.trim()) err.nombre = 'Requerido'
    if (!form.apellido.trim()) err.apellido = 'Requerido'
    if (!form.email) err.email = 'Requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Correo inválido'
    if (!form.telefono) err.telefono = 'Requerido'
    if (!form.fechaNacimiento) err.fechaNacimiento = 'Requerida'
    if (especialidades.length === 0) err.especialidades = 'Selecciona al menos una especialidad'
    if (!fotoPerfil) err.fotoPerfil = 'La foto de perfil es requerida'
    if (!form.ciudad.trim()) err.ciudad = 'Requerida'
    if (!form.password) err.password = 'Requerida'
    else if (form.password.length < 6) err.password = 'Mínimo 6 caracteres'
    if (form.password !== form.confirmPassword) err.confirmPassword = 'No coinciden'
    return err
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length > 0) { setErrors(err); return }
    setLoading(true)
    setSubmitError('')
    try {
      await createProfesional({
        id: crypto.randomUUID(),
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.email,
        telefono: form.telefono,
        rut: form.rut,
        fecha_nacimiento: form.fechaNacimiento,
        especialidades: especialidades.join(', '),
        dirección: form.direccion,
        domicilio: haceDomicilio,
        experiencia: form.experiencia ? parseInt(form.experiencia) : null,
        password: form.password,
      })
      const userData = { tipo: 'profesional', rut: form.rut, nombre: form.nombre, apellido: form.apellido, email: form.email, telefono: form.telefono, fechaNacimiento: form.fechaNacimiento, ciudad: form.ciudad, direccion: form.direccion, especialidades, haceDomicilio, comunasDomicilio, disponibilidadAgenda: disponibilidad, fotoPerfil, fotosPortfolio, instagram: form.instagram, experiencia: form.experiencia, descripcion: form.descripcion }
      localStorage.setItem('mimanicure_user', JSON.stringify(userData))
      onSuccess(form.nombre)
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message ?? JSON.stringify(err)
      setSubmitError(msg)
    } finally {
      setLoading(false)
    }
  }

  const cambiarMesAgenda = (delta: number) => {
    setMesAgenda(prev => {
      const next = new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
      setDiaSeleccionado(current => {
        const selected = fromDateKey(current)
        const sameMonth = selected.getMonth() === next.getMonth() && selected.getFullYear() === next.getFullYear()
        return sameMonth ? current : toDateKey(next)
      })
      return next
    })
  }

  const toggleHora = (dateKey: string, hora: string) => {
    setDisponibilidad(prev => {
      const current = prev[dateKey] ?? []
      const updated = current.includes(hora)
        ? current.filter(h => h !== hora)
        : [...current, hora].sort((a, b) => a.localeCompare(b))
      return { ...prev, [dateKey]: updated }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pb-6 flex flex-col gap-3" noValidate>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-600">📸 Foto de perfil <span className="text-[#e91e63]">*</span></label>
        <div className="border-2 border-dashed border-pink-200 rounded-full w-24 h-24 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-pink-400 hover:bg-pink-50/50 transition-all mx-auto" onClick={() => document.getElementById('foto-perfil-pro')?.click()}>
          {fotoPerfil
            ? <img src={fotoPerfil} alt="Perfil" className="w-24 h-24 rounded-full object-cover" />
            : <><span className="text-2xl">👤</span><span className="text-[9px] text-gray-400 text-center">Subir foto</span></>
          }
        </div>
        <input id="foto-perfil-pro" type="file" accept="image/*" onChange={handleFotoPerfil} className="hidden" />
        {errors.fotoPerfil && <span className="text-xs text-red-500 font-semibold mt-0.5 text-center">{errors.fotoPerfil}</span>}
      </div>

      <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] border-b border-pink-100 pb-2 mt-2">📋 Datos Personales</p>
      <div className="flex flex-col gap-1"><label className="text-xs font-bold text-gray-600">🪦 RUT</label><input name="rut" type="text" placeholder="12.345.678-9" value={form.rut} onChange={handleChange} maxLength={12} autoComplete="off" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.rut && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.rut}</span>}</div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">👤 Nombre</label><input name="nombre" type="text" placeholder="Valentina" value={form.nombre} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.nombre && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.nombre}</span>}</div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">👤 Apellido</label><input name="apellido" type="text" placeholder="López" value={form.apellido} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.apellido && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.apellido}</span>}</div>
      </div>
      <div className="flex flex-col gap-1"><label className="text-xs font-bold text-gray-600">📧 Correo electrónico</label><input name="email" type="email" placeholder="tu@correo.com" value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.email && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.email}</span>}</div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">📱 Teléfono</label><input name="telefono" type="tel" placeholder="+56 9 1234 5678" value={form.telefono} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.telefono && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.telefono}</span>}</div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🎂 Fecha de nacimiento</label><input name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} max={new Date().toISOString().split('T')[0]} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.fechaNacimiento && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.fechaNacimiento}</span>}</div>
      </div>

      <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] border-b border-pink-100 pb-2 mt-2">💅 Especialidades <span className="text-[#e91e63]">*</span></p>
      <div className="flex flex-wrap gap-2">
        {ESPECIALIDADES.map(esp => (
          <button key={esp} type="button" onClick={() => toggleEspecialidad(esp)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${especialidades.includes(esp) ? 'border-[#e91e63] bg-[#e91e63] text-white' : 'border-pink-100 text-gray-600 bg-white hover:border-pink-400 hover:text-[#e91e63]'}`}
          >{especialidades.includes(esp) ? '✓ ' : ''}{esp}</button>
        ))}
      </div>
      {errors.especialidades && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.especialidades}</span>}

      <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] border-b border-pink-100 pb-2 mt-2">📍 Ubicación y Servicio</p>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🏙️ Ciudad / Comuna</label><input name="ciudad" type="text" placeholder="Providencia" value={form.ciudad} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.ciudad && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.ciudad}</span>}</div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">📍 Dirección (local)</label><input name="direccion" type="text" placeholder="Opcional si atiendes en local" value={form.direccion} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" /></div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-600">🚗 ¿Realizas atención a domicilio?</label>
        <div className="flex gap-2">
          <button type="button" onClick={() => setHaceDomicilio(true)} className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${haceDomicilio ? 'border-[#e91e63] bg-[#e91e63] text-white' : 'border-pink-100 text-gray-600 bg-white hover:border-pink-300'}`}>Sí</button>
          <button type="button" onClick={() => setHaceDomicilio(false)} className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${!haceDomicilio ? 'border-[#e91e63] bg-[#e91e63] text-white' : 'border-pink-100 text-gray-600 bg-white hover:border-pink-300'}`}>No</button>
        </div>
      </div>
      {haceDomicilio && (
        <div className="flex flex-col gap-1"><label className="text-xs font-bold text-gray-600">🗺️ Comunas / Zonas que cubres</label><input name="comunasDomicilio" type="text" placeholder="Ej: Providencia, Las Condes, Ñuñoa" value={comunasDomicilio} onChange={e => setComunasDomicilio(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" /></div>
      )}

      <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] border-b border-pink-100 pb-2 mt-2">📅 Agenda y disponibilidad</p>
      <div className="bg-gradient-to-b from-white to-pink-50/50 border border-pink-100 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-gray-800">Configura tus horarios del mes</p>
            <p className="text-xs text-gray-500">Haz clic en un día para ver la semana y marcar horas disponibles.</p>
          </div>
          <button
            type="button"
            onClick={() => setAgendaAbierta(prev => !prev)}
            className="px-3 py-2 rounded-xl text-xs font-bold border-2 border-pink-200 text-[#e91e63] bg-white hover:bg-pink-50 transition-all cursor-pointer"
          >
            {agendaAbierta ? 'Ocultar agenda' : 'Ver agenda'}
          </button>
        </div>

        {agendaAbierta && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-pink-100 p-3">
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={() => cambiarMesAgenda(-1)} className="w-8 h-8 rounded-full border border-pink-100 bg-pink-50 text-[#e91e63] font-bold cursor-pointer hover:bg-pink-100 transition-all">‹</button>
                <p className="text-sm font-extrabold text-gray-800">{monthLabel(mesAgenda)}</p>
                <button type="button" onClick={() => cambiarMesAgenda(1)} className="w-8 h-8 rounded-full border border-pink-100 bg-pink-50 text-[#e91e63] font-bold cursor-pointer hover:bg-pink-100 transition-all">›</button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase mb-2">
                {DIAS_SEMANA_CORTO.map(day => <span key={day}>{day}</span>)}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {diasCalendario.map(date => {
                  const key = toDateKey(date)
                  const inMonth = date.getMonth() === mesAgenda.getMonth()
                  const isSelected = key === diaSeleccionado
                  const totalSlots = (disponibilidad[key] ?? []).length

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setDiaSeleccionado(key)}
                      className={`relative min-h-11 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${isSelected ? 'border-[#e91e63] bg-[#e91e63] text-white shadow-sm' : inMonth ? 'border-pink-100 bg-white text-gray-700 hover:border-pink-300' : 'border-transparent bg-gray-50 text-gray-300'}`}
                    >
                      <span>{date.getDate()}</span>
                      {totalSlots > 0 && (
                        <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] ${isSelected ? 'text-white/90' : 'text-pink-500'}`}>
                          {totalSlots}h
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-pink-100 p-3">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] mb-2">Horas disponibles del día seleccionado</p>
              <p className="text-sm font-bold text-gray-800 mb-3">{DIAS_SEMANA_CORTO[(fechaSeleccionada.getDay() + 6) % 7]} {fechaSeleccionada.getDate()} de {MESES_ES[fechaSeleccionada.getMonth()]}</p>
              <div className="flex flex-wrap gap-2">
                {HORAS_BASE.map(hora => {
                  const active = (disponibilidad[diaSeleccionado] ?? []).includes(hora)
                  return (
                    <button
                      key={hora}
                      type="button"
                      onClick={() => toggleHora(diaSeleccionado, hora)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all cursor-pointer ${active ? 'border-[#e91e63] bg-[#e91e63] text-white' : 'border-pink-100 bg-white text-gray-500 hover:border-pink-300 hover:text-[#e91e63]'}`}
                    >
                      {hora}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-pink-100 p-3">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] mb-2">Vista semanal</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {semanaSeleccionada.map(date => {
                  const key = toDateKey(date)
                  const slots = disponibilidad[key] ?? []
                  return (
                    <div key={key} className={`rounded-xl border p-2.5 ${key === diaSeleccionado ? 'border-[#e91e63] bg-pink-50' : 'border-pink-100 bg-white'}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-gray-700">{DIAS_SEMANA_CORTO[(date.getDay() + 6) % 7]} {date.getDate()}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${slots.length ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{slots.length ? `${slots.length} disponibles` : 'Sin cupos'}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {slots.slice(0, 4).map(slot => (
                          <span key={slot} className="text-[10px] px-2 py-0.5 rounded-md bg-pink-100 text-pink-600 font-semibold">{slot}</span>
                        ))}
                        {slots.length > 4 && <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 font-semibold">+{slots.length - 4}</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] border-b border-pink-100 pb-2 mt-2">🖼️ Portfolio de Trabajos</p>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-600">Sube hasta 8 fotos de tus trabajos</label>
        <div className="grid grid-cols-4 gap-2">
          {fotosPortfolio.map((url, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden">
              <img src={url} alt={`Trabajo ${idx + 1}`} className="w-full h-full object-cover" />
              <button type="button" onClick={() => removePortfolioPhoto(idx)} className="absolute top-1 right-1 bg-white/90 text-red-500 text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-none cursor-pointer font-bold">✕</button>
            </div>
          ))}
          {fotosPortfolio.length < 8 && (
            <div onClick={() => document.getElementById('fotos-portfolio')?.click()} className="aspect-square rounded-xl border-2 border-dashed border-pink-200 flex items-center justify-center text-2xl text-pink-300 cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all">️</div>
          )}
        </div>
        <input id="fotos-portfolio" type="file" accept="image/*" multiple onChange={handleFotosPortfolio} className="hidden" />
      </div>

      <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] border-b border-pink-100 pb-2 mt-2">ℹ️ Información Profesional</p>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">⏱️ Años de experiencia</label><input name="experiencia" type="number" min="0" max="50" placeholder="Ej: 3" value={form.experiencia} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" /></div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">📸 Instagram (opcional)</label><input name="instagram" type="text" placeholder="@tu_usuario" value={form.instagram} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" /></div>
      </div>
      <div className="flex flex-col gap-1"><label className="text-xs font-bold text-gray-600">📝 Descripción / Bio</label><textarea name="descripcion" placeholder="Cuéntanos sobre ti, tu experiencia y lo que te diferencia..." value={form.descripcion} onChange={handleChange} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300 resize-none" /></div>

      <p className="text-xs font-extrabold uppercase tracking-wider text-[#e91e63] border-b border-pink-100 pb-2 mt-2">🔐 Acceso</p>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🔐 Contraseña</label><input name="password" type="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={handleChange} autoComplete="new-password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.password && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.password}</span>}</div>
        <div className="flex flex-col gap-1 flex-1"><label className="text-xs font-bold text-gray-600">🔐 Confirmar</label><input name="confirmPassword" type="password" placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white font-sans placeholder:text-gray-300" />{errors.confirmPassword && <span className="text-xs text-red-500 font-semibold mt-0.5">{errors.confirmPassword}</span>}</div>
      </div>
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-semibold">{submitError}</div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-pink-400 to-[#e91e63] text-white font-extrabold py-4 rounded-2xl text-sm shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all mt-1 border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
            Creando cuenta...
          </span>
        ) : 'Crear perfil profesional 💅'}
      </button>
    </form>
  )
}

const RegisterModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = React.useState<'select' | RegisterType>('select')
  const [successName, setSuccessName] = React.useState('')

  if (!isOpen) return null

  const handleClose = () => { setStep('select'); setSuccessName(''); onClose() }

  const typeLabels: Record<RegisterType, { emoji: string; label: string }> = {
    cliente: { emoji: '💖', label: 'Cliente' },
    salon: { emoji: '🏢', label: 'Salón' },
    profesional: { emoji: '💅', label: 'Profesional' },
  }

  const handleSuccess = (nombre: string) => { setSuccessName(nombre); setStep('select') }

  if (successName) {
    return (
      <>
        <div className="fixed inset-0 bg-black/40 z-[1000] backdrop-blur-sm" onClick={handleClose} />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-[1001] max-w-[480px] w-[90%] overflow-hidden">
          <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pink-100 text-pink-500 font-bold flex items-center justify-center hover:bg-pink-200 transition z-10 border-none cursor-pointer text-lg" onClick={handleClose}>✕</button>
          <div className="flex flex-col items-center gap-4 py-16 px-8 text-center">
            <div className="text-5xl">🎉</div>
            <h2 className="text-2xl font-extrabold text-gray-800">!¡Registro Exitoso!</h2>
            <p className="text-sm text-gray-500">Bienvenida, <strong>{successName}</strong>. Tu cuenta ha sido creada.</p>
            <button className="w-full bg-gradient-to-r from-pink-400 to-[#e91e63] text-white font-extrabold py-4 rounded-2xl text-base shadow-lg hover:opacity-90 transition-all border-none cursor-pointer" onClick={handleClose}>Continuar</button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[1000] backdrop-blur-sm" onClick={handleClose} />
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-[1001] w-[92%] overflow-hidden flex flex-col ${step === 'profesional' ? 'max-w-[600px] max-h-[90vh]' : 'max-w-[560px] max-h-[90vh]'}`}>
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pink-100 text-pink-500 font-bold flex items-center justify-center hover:bg-pink-200 transition z-10 border-none cursor-pointer text-lg" onClick={handleClose}>✕</button>

        {step !== 'select' && (
          <button className="absolute top-[72px] left-5 text-white/80 font-semibold text-sm hover:text-white transition bg-transparent border-none cursor-pointer z-10" onClick={() => setStep('select')}>← Volver</button>
        )}

        {step === 'select' && <RegisterTypeSelector onSelect={(t) => setStep(t)} />}

        {step !== 'select' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white text-center px-8 pt-8 pb-7 shrink-0">
              <p className="text-xs font-extrabold uppercase tracking-widest opacity-90 mb-3">{typeLabels[step as RegisterType].emoji} Soy {typeLabels[step as RegisterType].label}</p>
              <h2 className="text-3xl font-extrabold tracking-tight leading-tight mb-1">Crear Cuenta</h2>
              <p className="text-sm opacity-90">Completa tus datos para registrarte</p>
            </div>
            <div className="overflow-y-auto flex-1">
              {step === 'cliente' && <FormCliente onSuccess={handleSuccess} />}
              {step === 'salon' && <FormSalon onSuccess={handleSuccess} />}
              {step === 'profesional' && <FormProfesional onSuccess={handleSuccess} />}
            </div>
            <div className="px-8 py-4 text-center text-sm text-gray-500 border-t border-pink-50 shrink-0">
              <p>¿Ya tienes cuenta? <a href="#login" className="font-semibold text-[#e91e63] hover:underline">Inicia sesión aquí</a></p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const Footer = () => (
  <footer className="mt-16 px-4 pb-10 pt-0">
    <div className="max-w-6xl mx-auto overflow-hidden rounded-[32px] border border-[#e7d1de] bg-gradient-to-br from-[#fff9fc] via-[#ffeef7] to-[#ffe4f2] shadow-[0_20px_42px_rgba(156,67,115,0.18)]">
      <div className="h-2.5 bg-gradient-to-r from-[#f7c7dd] via-[#dc6f9f] to-[#a73f70]" />

      <div className="px-7 md:px-12 py-11">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_0.9fr_1fr] gap-10 md:gap-8 items-start">
          <div className="flex flex-col gap-4.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#965e7b]">Plataforma de belleza en Chile</p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e07aa8] to-[#b2477a] text-white flex items-center justify-center text-sm font-extrabold shadow-[0_8px_20px_rgba(178,71,122,0.38)]">MM</div>
              <h3 className="text-[2.1rem] font-extrabold tracking-[-0.02em] text-transparent bg-clip-text bg-gradient-to-r from-[#3a2436] via-[#8a2f61] to-[#b2477a]">Mi Manicurista</h3>
            </div>
            <p className="text-lg text-[#593f52] leading-relaxed max-w-[42ch]">Encuentra profesionales verificadas, compara servicios y agenda tu cita con una experiencia <span className="font-bold text-[#a73f70]">premium, simple y segura</span>.</p>
            <p className="text-sm text-[#876579] max-w-[50ch]">Diseñado para clientas y profesionales que buscan resultados reales y una marca con estilo.</p>
          </div>

          <div className="md:pl-6 md:border-l md:border-[#ecdce4] flex flex-col gap-4">
            <h4 className="text-sm font-bold text-[#2c1f2f] uppercase tracking-[0.14em] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#f3d4e3] text-[#9f3c68] inline-flex items-center justify-center text-[11px]">✦</span>
              Síguenos
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e8d6df] bg-gradient-to-r from-white/95 to-[#ffeef6] px-4 py-2 text-[#584656] hover:border-[#cf6a98] hover:text-[#9f3c68] hover:bg-white transition-colors">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f9d3e5] to-[#ebabc9] text-[#8d325f] text-[10px] font-bold inline-flex items-center justify-center">IG</span>
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e8d6df] bg-gradient-to-r from-white/95 to-[#ffeef6] px-4 py-2 text-[#584656] hover:border-[#cf6a98] hover:text-[#9f3c68] hover:bg-white transition-colors">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f9d3e5] to-[#ebabc9] text-[#8d325f] text-[10px] font-bold inline-flex items-center justify-center">FB</span>
                Facebook
              </a>
              <a href="https://wa.me/56" target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e8d6df] bg-gradient-to-r from-white/95 to-[#ffeef6] px-4 py-2 text-[#584656] hover:border-[#cf6a98] hover:text-[#9f3c68] hover:bg-white transition-colors">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f9d3e5] to-[#ebabc9] text-[#8d325f] text-[10px] font-bold inline-flex items-center justify-center">WA</span>
                WhatsApp
              </a>
            </div>
            <p className="text-xs text-[#956277]">Novedades, promociones y contenido diario.</p>
          </div>

          <div className="rounded-2xl border border-[#ecdce4] bg-gradient-to-br from-white/95 to-[#fff0f7] backdrop-blur-sm p-5 flex flex-col gap-3 shadow-[0_8px_20px_rgba(172,86,129,0.12)]">
            <h4 className="text-sm font-bold text-[#2c1f2f] uppercase tracking-[0.14em] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#f3d4e3] text-[#9f3c68] inline-flex items-center justify-center text-[11px]">✉</span>
              Contacto
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#927c8b] flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#f7e5ee] text-[#9f3c68] text-[9px] inline-flex items-center justify-center">@</span>
                Email
              </p>
              <a href="mailto:friquelmepierattini@gmail.com" className="text-[#584656] hover:text-[#9f3c68] transition-colors break-all font-medium">friquelmepierattini@gmail.com</a>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#927c8b] flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#f7e5ee] text-[#9f3c68] text-[8px] font-bold inline-flex items-center justify-center">WA</span>
                WhatsApp
              </p>
              <a href="https://wa.me/56972821003" className="text-[#584656] hover:text-[#9f3c68] transition-colors font-medium">+56 9 7282 1003</a>
            </div>
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#8f7888] pt-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#f7e5ee] text-[#9f3c68] text-[9px] inline-flex items-center justify-center">⏰</span>
              Lunes a domingo
            </p>
          </div>
        </div>
      </div>

      <div className="px-7 md:px-12 py-4 border-t border-[#e7d6df] bg-gradient-to-r from-white/70 to-[#fff1f8] flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-[#856f7f]">
        <p>&copy; 2026 Mi Manicurista. Todos los derechos reservados.</p>
        <p className="inline-flex items-center gap-1.5">🇨🇱 Hecho en Chile</p>
      </div>
    </div>
  </footer>
)

const salonesMock = [
  { id: 1, nombre: 'Beauty House Providencia', comuna: 'Providencia', direccion: 'Av. Providencia 1234', distancia: '0.6 km', rating: 4.9, imagen: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=90', disponible: true, servicios: ['Manicura', 'Pedicura', 'Uñas Gel'], horario: 'Hoy hasta 20:00', lat: -33.4317, lng: -70.6107 },
  { id: 2, nombre: 'Nails & Spa Las Condes', comuna: 'Las Condes', direccion: 'El Bosque Norte 500', distancia: '1.1 km', rating: 4.8, imagen: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=90', disponible: true, servicios: ['Nail Art', 'Acrílicas', 'Depilación'], horario: 'Hoy hasta 19:00', lat: -33.4180, lng: -70.5985 },
  { id: 3, nombre: 'Glamour Studio Ñuñoa', comuna: 'Ñuñoa', direccion: 'Irarrázaval 2100', distancia: '1.9 km', rating: 4.7, imagen: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=90', disponible: false, servicios: ['Cejas', 'Pestañas', 'Manicura'], horario: 'Abre mañana 10:00', lat: -33.4570, lng: -70.6050 },
  { id: 4, nombre: 'Pink Nails Ñuñoa', comuna: 'Ñuñoa', direccion: 'Av. Ossa 890', distancia: '2.3 km', rating: 4.6, imagen: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=90', disponible: true, servicios: ['Pedicura', 'Uñas Gel', 'Manicura'], horario: 'Hoy hasta 21:00', lat: -33.4620, lng: -70.5930 },
  { id: 5, nombre: 'Estilo Único Santiago', comuna: 'Santiago', direccion: 'Morandé 450', distancia: '3.1 km', rating: 4.5, imagen: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90', disponible: true, servicios: ['Uñas Gel', 'Diseño', 'Acrílicas'], horario: 'Hoy hasta 20:30', lat: -33.4500, lng: -70.6530 },
  { id: 6, nombre: 'Bella Vista Nails', comuna: 'Recoleta', direccion: 'Loreto 255', distancia: '3.5 km', rating: 4.4, imagen: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=90', disponible: false, servicios: ['Manicura', 'Pestañas'], horario: 'Abre mañana 09:00', lat: -33.4270, lng: -70.6360 },
]

const LeafletMap = ({ ubicacion, salones, salonActivo, onSalonClick }: { ubicacion: { lat: number; lng: number }; salones: typeof salonesMock; salonActivo: number | null; onSalonClick: (id: number) => void }) => {
  const mapRef = React.useRef<HTMLDivElement>(null)
  const mapInstanceRef = React.useRef<unknown>(null)

  React.useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return
    // Dynamically load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet') as typeof import('leaflet')

    const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([ubicacion.lat, ubicacion.lng], 14)
    mapInstanceRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map)

    // User marker — person emoji
    const userIcon = L.divIcon({
      html: `<div style="font-size:32px;line-height:1;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.4))">🧍‍♀️</div>`,
      className: '',
      iconAnchor: [16, 32],
    })
    L.marker([ubicacion.lat, ubicacion.lng], { icon: userIcon }).addTo(map).bindPopup('¡Tú estás aquí! 📍').openPopup()

    // Salon markers — pink dots
    salones.forEach(s => {
      const salonIcon = L.divIcon({
        html: `<div style="width:18px;height:18px;border-radius:50%;background:#e91e63;border:3px solid white;box-shadow:0 2px 8px rgba(233,30,99,0.6)"></div>`,
        className: '',
        iconAnchor: [9, 9],
      })
      L.marker([s.lat, s.lng], { icon: salonIcon }).addTo(map)
        .bindPopup(`<b style="color:#e91e63">${s.nombre}</b><br/><span style="font-size:11px">${s.direccion}</span>`)
        .on('click', () => onSalonClick(s.id))
    })

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Pan to active salon
  React.useEffect(() => {
    if (!mapInstanceRef.current || salonActivo === null) return
    const salon = salones.find(s => s.id === salonActivo)
    if (!salon) return
    ;(mapInstanceRef.current as {
      setView: (coords: [number, number], zoom: number, options?: { animate?: boolean }) => unknown
    }).setView([salon.lat, salon.lng], 15, { animate: true })
  }, [salonActivo, salones])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}

const UbicacionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [ubicacion, setUbicacion] = React.useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [comunaFiltro, setComunaFiltro] = React.useState('Todas')
  const [salonActivo, setSalonActivo] = React.useState<number | null>(null)

  const comunas = ['Todas', ...Array.from(new Set(salonesMock.map(s => s.comuna)))]

  React.useEffect(() => {
    if (!isOpen) { setUbicacion(null); setError(''); setComunaFiltro('Todas'); setSalonActivo(null) }
  }, [isOpen])

  const obtenerUbicacion = () => {
    setLoading(true); setError('')
    if (!navigator.geolocation) { setError('Tu navegador no soporta geolocalización.'); setLoading(false); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => { setUbicacion({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLoading(false) },
      () => {
        // Use Santiago center as fallback
        setUbicacion({ lat: -33.4489, lng: -70.6693 })
        setLoading(false)
      }
    )
  }

  const salonesFiltrados = comunaFiltro === 'Todas' ? salonesMock : salonesMock.filter(s => s.comuna === comunaFiltro)

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/60 z-[1000] backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.25)] z-[1001] w-full max-w-[900px] max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#e91e63] via-pink-500 to-fuchsia-500 text-white px-8 py-5 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">🏪</div>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold leading-tight">Salones cercanos</h2>
            <p className="text-xs opacity-75 mt-0.5">Encontrá el lugar perfecto cerca tuyo</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 text-white font-bold text-lg flex items-center justify-center border-none cursor-pointer transition shrink-0">×</button>
          {/* Decorative circles */}
          <div className="absolute right-16 top-2 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute right-6 top-6 w-8 h-8 rounded-full bg-white/10 pointer-events-none" />
        </div>

        {!ubicacion ? (
          /* Pantalla de bienvenida */
          <div className="flex flex-col items-center text-center gap-6 py-16 px-8 bg-gradient-to-b from-pink-50/50 to-white">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-100 to-fuchsia-100 flex items-center justify-center text-5xl shadow-inner">
                🧍‍♀️
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#e91e63] flex items-center justify-center text-white text-base shadow-lg">📍</div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-800 mb-2">¿Dónde tu estes? 📍</h3>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">Activa tu ubicación para ver en el mapa los salones cerca de ti. Tú apareces como 🧍‍♀️ y los salones como puntos rosados.</p>
            </div>
            {error && (
              <div className="bg-pink-50 border border-pink-200 rounded-2xl px-4 py-3 text-sm text-pink-600 font-semibold">{error}</div>
            )}
            <button onClick={obtenerUbicacion} disabled={loading}
              className="bg-gradient-to-r from-[#e91e63] to-fuchsia-500 text-white font-extrabold text-base px-10 py-4 rounded-2xl shadow-[0_8px_30px_rgba(233,30,99,0.35)] hover:shadow-[0_12px_40px_rgba(233,30,99,0.5)] hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed border-none cursor-pointer">
              {loading ? '📡 Buscando tu ubicación...' : '📍 Usar mi ubicación'}
            </button>
            <p className="text-xs text-gray-400 flex items-center gap-1.5"><span>🔒</span> Tu ubicación no se guarda en ningún servidor, tranqui</p>

            {/* Preview salones */}
            <div className="w-full max-w-sm mt-2">
              <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Salones disponibles</p>
              <div className="flex flex-col gap-2">
                {salonesMock.slice(0, 3).map(s => (
                  <div key={s.id} className="flex items-center gap-3 bg-white border border-pink-100 rounded-2xl px-4 py-2.5 shadow-sm">
                    <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0">
                      <img src={s.imagen} alt={s.nombre} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-extrabold text-gray-700 truncate">{s.nombre}</p>
                      <p className="text-[10px] text-gray-400">{s.comuna} · {s.distancia}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.disponible ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{s.disponible ? '● Disp.' : '○ No disp.'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Vista principal con mapa + lista */
          <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden" style={{ minHeight: '420px' }}>
            {/* Mapa */}
            <div className="w-full md:w-[55%] shrink-0 relative" style={{ minHeight: '300px' }}>
              <LeafletMap ubicacion={ubicacion} salones={salonesFiltrados} salonActivo={salonActivo} onSalonClick={(id) => { setSalonActivo(id); document.getElementById(`salon-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }} />
              {/* Leyenda flotante */}
              <div className="absolute bottom-4 left-4 bg-white rounded-2xl px-4 py-2.5 shadow-lg pointer-events-none flex items-center gap-3 text-xs font-bold text-gray-600">
                <span className="flex items-center gap-1.5">🧍‍♀️ <span className="text-gray-500">Vos</span></span>
                <span className="w-px h-4 bg-gray-200" />
                <span className="flex items-center gap-1.5">
                  <span style={{ display:'inline-block', width:10, height:10, borderRadius:'50%', background:'#e91e63', boxShadow:'0 0 0 2px white, 0 0 0 3px #e91e63' }} />
                  <span className="text-gray-500">Salones</span>
                </span>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-gray-50/50">
              {/* Filtros */}
              <div className="px-5 pt-4 pb-3 shrink-0 bg-white border-b border-gray-100">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">Filtrar por comuna</p>
                  <span className="text-xs font-bold text-[#e91e63]">{salonesFiltrados.filter(s => s.disponible).length} disponibles</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {comunas.map(c => (
                    <button key={c} onClick={() => setComunaFiltro(c)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-xl border cursor-pointer transition-all ${comunaFiltro === c ? 'bg-[#e91e63] border-[#e91e63] text-white shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:border-pink-300 hover:text-[#e91e63]'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de salones */}
              <div className="overflow-y-auto flex-1 flex flex-col gap-3 px-4 py-4">
                {salonesFiltrados.map(s => (
                  <div
                    id={`salon-${s.id}`}
                    key={s.id}
                    onClick={() => setSalonActivo(salonActivo === s.id ? null : s.id)}
                    className={`flex gap-0 bg-white rounded-2xl overflow-hidden shadow-sm transition-all cursor-pointer ${salonActivo === s.id ? 'ring-2 ring-[#e91e63] shadow-[0_4px_20px_rgba(233,30,99,0.2)]' : 'hover:shadow-md hover:-translate-y-0.5'} ${!s.disponible ? 'opacity-55' : ''}`}
                  >
                    <div className="relative w-[88px] shrink-0">
                      <img src={s.imagen} alt={s.nombre} className="w-full h-full object-cover" style={{ minHeight: '90px' }} />
                      {salonActivo === s.id && (
                        <div className="absolute inset-0 bg-[#e91e63]/10 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-[#e91e63] flex items-center justify-center text-white text-xs">✓</div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 py-3 px-3 flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-extrabold text-gray-800 leading-tight">{s.nombre}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 border ${s.disponible ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                          {s.disponible ? '● Disponible' : '○ No disp.'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">📍 {s.direccion} · <span className="font-semibold text-[#e91e63]">{s.distancia}</span></p>
                      <p className="text-[11px] text-gray-400">🕐 {s.horario}</p>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {s.servicios.map(sv => (<span key={sv} className="text-[10px] font-bold bg-pink-50 text-pink-500 border border-pink-100 px-2 py-0.5 rounded-lg">{sv}</span>))}
                      </div>
                      {s.disponible && (
                        <button onClick={e => e.stopPropagation()}
                          className="mt-1.5 self-start text-[11px] font-extrabold bg-gradient-to-r from-[#e91e63] to-fuchsia-500 text-white px-4 py-1.5 rounded-xl hover:opacity-85 hover:shadow-md transition border-none cursor-pointer shadow-sm">
                          Reservar →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const serviciosCategorias = [
  {
    titulo: '💅 Manicura',
    color: 'from-fuchsia-400 to-pink-500',
    tabColor: 'bg-gradient-to-r from-pink-400 to-pink-500 text-white border-pink-500',
    bg: 'bg-white',
    border: 'border-pink-300',
    servicios: [
      { nombre: 'Manicura Clásica', desc: 'Lima, cutículas y esmaltado tradicional', domicilio: true, salon: true },
      { nombre: 'Manicura Express', desc: 'Esmaltado rápido sin tratamiento de cutículas', domicilio: true, salon: true },
      { nombre: 'Manicura Semipermanente', desc: 'Esmaltado gel con duración de 2 a 3 semanas', domicilio: true, salon: true },
      { nombre: 'Uñas Acrílicas', desc: 'Extensión o refuerzo con acrílico de alta resistencia', domicilio: false, salon: true },
      { nombre: 'Uñas de Gel', desc: 'Extensión o relleno con gel UV/LED', domicilio: false, salon: true },
      { nombre: 'Nail Art', desc: 'Diseños personalizados, calcomanías, piedras y más', domicilio: true, salon: true },
      { nombre: 'Manicura Rusa', desc: 'Técnica de cutícula en seco con fresadora', domicilio: false, salon: true },
      { nombre: 'Spa de Manos', desc: 'Exfoliación, hidratación y masaje de manos', domicilio: true, salon: true },
    ],
  },
  {
    titulo: '🦶 Pedicura & Podología',
    color: 'from-rose-400 to-pink-500',
    tabColor: 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-rose-400',
    bg: 'bg-white',
    border: 'border-rose-300',
    servicios: [
      { nombre: 'Pedicura Clásica', desc: 'Lima, cutículas, callos y esmaltado de pies', domicilio: true, salon: true },
      { nombre: 'Pedicura Semipermanente', desc: 'Esmalte gel en pies con durabilidad máxima', domicilio: true, salon: true },
      { nombre: 'Spa de Pies', desc: 'Baño, exfoliación, hidratación y masaje podal', domicilio: true, salon: true },
      { nombre: 'Podología Médica', desc: 'Tratamiento de callos, hongos y uñas encarnadas', domicilio: false, salon: true },
      { nombre: 'Pedicura Francesa', desc: 'Diseño clásico blanco con acabado impecable', domicilio: true, salon: true },
    ],
  },
  {
    titulo: '🪡 Cejas & Pestañas',
    color: 'from-fuchsia-400 to-pink-400',
    tabColor: 'bg-gradient-to-r from-fuchsia-400 to-pink-400 text-white border-fuchsia-400',
    bg: 'bg-white',
    border: 'border-fuchsia-300',
    servicios: [
      { nombre: 'Diseño de Cejas', desc: 'Depilación y perfilado para tu forma de rostro', domicilio: true, salon: true },
      { nombre: 'Laminado de Cejas', desc: 'Fijación y peinado de cejas por semanas', domicilio: false, salon: true },
      { nombre: 'Tinte de Cejas', desc: 'Color para dar profundidad y definición', domicilio: true, salon: true },
      { nombre: 'Extensión de Pestañas Clásica', desc: 'Una extensión por pestaña natural', domicilio: false, salon: true },
      { nombre: 'Extensión Volumen', desc: 'Varios hilos por pestaña para mayor densidad', domicilio: false, salon: true },
      { nombre: 'Lash Lift', desc: 'Curvado permanente de pestañas naturales', domicilio: false, salon: true },
      { nombre: 'Tinte de Pestañas', desc: 'Color oscuro para realzar la mirada', domicilio: true, salon: true },
    ],
  },
  {
    titulo: '🪒 Depilación',
    color: 'from-pink-400 to-rose-500',
    tabColor: 'bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white border-pink-400',
    bg: 'bg-white',
    border: 'border-pink-300',
    servicios: [
      { nombre: 'Depilación con Cera Fría', desc: 'Piernas, axilas, bikini y más', domicilio: true, salon: true },
      { nombre: 'Depilación con Cera Caliente', desc: 'Mayor adherencia para vellos gruesos', domicilio: true, salon: true },
      { nombre: 'Depilación Corporal Completa', desc: 'Sesión completa de cuerpo entero', domicilio: false, salon: true },
      { nombre: 'Depilación Facial', desc: 'Labio, mentón y patillas con cera o hilo', domicilio: true, salon: true },
    ],
  },
  {
    titulo: '✂️ Peluquería',
    color: 'from-pink-400 to-fuchsia-400',
    tabColor: 'bg-gradient-to-r from-[#e91e63] to-pink-400 text-white border-pink-600',
    bg: 'bg-white',
    border: 'border-pink-200',
    servicios: [
      { nombre: 'Corte de Cabello', desc: 'Corte clásico o moderno adaptado a tu estilo', domicilio: true, salon: true },
      { nombre: 'Coloración', desc: 'Tinte completo, mechas o balayage', domicilio: false, salon: true },
      { nombre: 'Alisado', desc: 'Keratina, nanoplastia o progresivo brasileño', domicilio: false, salon: true },
      { nombre: 'Brushing', desc: 'Lavado, secado y peinado profesional', domicilio: true, salon: true },
      { nombre: 'Tratamiento Capilar', desc: 'Hidratación, nutrición y reconstrucción', domicilio: true, salon: true },
    ],
  },
]

const ServiciosModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [categoriaActiva, setCategoriaActiva] = React.useState(0)
  const [busqueda, setBusqueda] = React.useState('')
  const [modalidadFiltro, setModalidadFiltro] = React.useState<'todos' | 'domicilio' | 'salon'>('todos')
  const sectionRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const handleTabClick = (i: number) => {
    setCategoriaActiva(i)
    const el = sectionRefs.current[i]
    const container = scrollRef.current
    if (el && container) {
      const top = el.offsetTop - 120
      container.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (!isOpen) return null
  return (
    <div ref={scrollRef} className="fixed inset-0 z-[1000] bg-[#fdf2f8] overflow-y-auto">

      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-pink-200 shadow-sm flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💅</span>
          <div>
            <h1 className="text-xl font-extrabold text-gray-800 leading-none">Nuestros Servicios</h1>
            <p className="text-xs text-gray-400 mt-0.5">Profesionales verificados · A domicilio y en salón</p>
          </div>
        </div>
        <button
          className="w-10 h-10 rounded-full bg-pink-100 text-pink-500 font-bold flex items-center justify-center hover:bg-pink-200 transition border-none cursor-pointer text-lg"
          onClick={onClose}
        >✕</button>
      </div>

      {/* Barra de búsqueda */}
      <div className="sticky top-[73px] z-10 bg-[#fdf2f8]/95 backdrop-blur-md px-6 py-3 border-b border-pink-100">
        <div className="max-w-[600px] mx-auto relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-lg pointer-events-none">🔍</span>
          <input
            type="text"
            placeholder="Buscar servicio... (ej: Nail Art, Lash Lift, Pedicura)"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl border-2 border-pink-200 focus:border-[#e91e63] focus:outline-none bg-white text-sm text-gray-700 placeholder:text-gray-300 shadow-sm transition-all"
          />
          {busqueda && (
            <button onClick={() => setBusqueda('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-pink-100 text-pink-400 text-xs font-bold flex items-center justify-center hover:bg-pink-200 border-none cursor-pointer">✕</button>
          )}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-8">

        {/* Hero banner */}
        <div className="bg-gradient-to-r from-[#e91e63] via-fuchsia-500 to-rose-500 rounded-3xl p-8 text-white mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_60px_rgba(233,30,99,0.25)]">
          <div>
            <h2 className="text-3xl font-extrabold mb-2 leading-tight">Todo lo que necesitás,<br />donde tu estes</h2>
            <p className="text-sm opacity-85 max-w-md">Conectamos clientas con las mejores profesionales de belleza en Chile. Reserva a domicilio o encuentra el salón más cercano a tu casa.</p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <div className="bg-white/20 rounded-2xl px-6 py-4 text-center">
              <div className="text-3xl font-extrabold">500+</div>
              <div className="text-xs opacity-80">Profesionales</div>
            </div>
            <div className="bg-white/20 rounded-2xl px-6 py-4 text-center">
              <div className="text-3xl font-extrabold">10K+</div>
              <div className="text-xs opacity-80">Clientas felices</div>
            </div>
            <div className="bg-white/20 rounded-2xl px-6 py-4 text-center">
              <div className="text-3xl font-extrabold">4.8⭐</div>
              <div className="text-xs opacity-80">Calificación</div>
            </div>
          </div>
        </div>

        {/* Badges de modalidad */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setModalidadFiltro(modalidadFiltro === 'domicilio' ? 'todos' : 'domicilio')}
            className={`select-none flex items-center gap-2 rounded-2xl px-5 py-3 border shadow-sm cursor-pointer transition-all hover:scale-105 ${modalidadFiltro === 'domicilio' ? 'bg-fuchsia-500 border-fuchsia-500 text-white shadow-[0_6px_20px_rgba(192,38,211,0.3)]' : 'bg-white border-fuchsia-200 hover:border-fuchsia-400'}`}
          >
            <span className="text-2xl">🏠</span>
            <div className="text-left">
              <div className={`text-sm font-bold ${modalidadFiltro === 'domicilio' ? 'text-white' : 'text-fuchsia-700'}`}>A Domicilio</div>
              <div className={`text-xs ${modalidadFiltro === 'domicilio' ? 'text-white/80' : 'text-gray-400'}`}>El profesional va a tu casa</div>
            </div>
            {modalidadFiltro === 'domicilio' && <span className="ml-1 text-xs font-bold bg-white/30 text-white px-2 py-0.5 rounded-lg">activo ✓</span>}
          </button>
          <button
            onClick={() => setModalidadFiltro(modalidadFiltro === 'salon' ? 'todos' : 'salon')}
            className={`select-none flex items-center gap-2 rounded-2xl px-5 py-3 border shadow-sm cursor-pointer transition-all hover:scale-105 ${modalidadFiltro === 'salon' ? 'bg-[#e91e63] border-[#e91e63] text-white shadow-[0_6px_20px_rgba(233,30,99,0.3)]' : 'bg-white border-pink-200 hover:border-pink-400'}`}
          >
            <span className="text-2xl">🏪</span>
            <div className="text-left">
              <div className={`text-sm font-bold ${modalidadFiltro === 'salon' ? 'text-white' : 'text-pink-700'}`}>En Salón</div>
              <div className={`text-xs ${modalidadFiltro === 'salon' ? 'text-white/80' : 'text-gray-400'}`}>Visitá el local del profesional</div>
            </div>
            {modalidadFiltro === 'salon' && <span className="ml-1 text-xs font-bold bg-white/30 text-white px-2 py-0.5 rounded-lg">activo ✓</span>}
          </button>
        </div>

        {/* Tabs categorías — ocultos en búsqueda */}
        {!busqueda && (
        <div className="flex gap-2 mb-8 flex-wrap">
          {serviciosCategorias.map((_c, i) => (
            <button
              key={i}
              onClick={() => handleTabClick(i)}
              className={`text-sm font-bold px-5 py-2.5 rounded-2xl border transition-all cursor-pointer shadow-sm ${serviciosCategorias[i].tabColor} ${categoriaActiva === i ? 'scale-105 shadow-lg ring-2 ring-white ring-offset-2' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
            >{serviciosCategorias[i].titulo}</button>
          ))}
        </div>
        )}

        {/* Resultados de búsqueda o filtro de modalidad */}
        {(busqueda || modalidadFiltro !== 'todos') ? (() => {
          const q = busqueda.toLowerCase()
          const resultados = serviciosCategorias.flatMap(cat =>
            cat.servicios
              .filter(s =>
                (!busqueda || s.nombre.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)) &&
                (modalidadFiltro === 'todos' || (modalidadFiltro === 'domicilio' && s.domicilio) || (modalidadFiltro === 'salon' && s.salon))
              )
              .map(s => ({ ...s, catTitulo: cat.titulo, catColor: cat.color, catBorder: cat.border }))
          )
          const titulo = modalidadFiltro === 'domicilio'
            ? '🏠 Servicios disponibles a domicilio'
            : modalidadFiltro === 'salon'
            ? '🏪 Servicios en salón'
            : `Resultados para "${busqueda}"`
          return resultados.length > 0 ? (
            <div>
              {modalidadFiltro !== 'todos' && (
                <div className={`rounded-2xl p-4 mb-6 flex items-center justify-between ${modalidadFiltro === 'domicilio' ? 'bg-fuchsia-500' : 'bg-[#e91e63]'} text-white shadow-lg`}>
                  <div>
                    <h3 className="font-extrabold text-lg leading-tight">{titulo}</h3>
                    <p className="text-sm opacity-80 mt-0.5">{resultados.length} servicios encontrados</p>
                  </div>
                  <button onClick={() => setModalidadFiltro('todos')} className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3 py-1.5 rounded-xl border-none cursor-pointer transition-all">Ver todos ✕</button>
                </div>
              )}
              {busqueda && <p className="text-xs text-pink-400 font-bold mb-4">{resultados.length} resultado{resultados.length !== 1 ? 's' : ''} para &ldquo;{busqueda}&rdquo;</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resultados.map((s, i) => (
                  <div key={i} className={`bg-white rounded-2xl p-5 border ${s.catBorder} flex flex-col gap-3 shadow-sm hover:shadow-md transition-all`}>
                    <span className="text-xs font-bold text-pink-400">{s.catTitulo}</span>
                    <div>
                      <h4 className="text-base font-extrabold text-gray-800 leading-tight mb-1">{s.nombre}</h4>
                      <p className="text-sm text-gray-500 leading-snug">{s.desc}</p>
                    </div>
                    <div className="flex gap-2 mt-auto pt-2 border-t border-pink-50 flex-wrap">
                      {s.domicilio && <span className="text-[11px] font-bold bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-300 px-3 py-1 rounded-xl">🏠 Domicilio</span>}
                      {s.salon && <span className="text-[11px] font-bold bg-pink-100 text-[#e91e63] border border-pink-300 px-3 py-1 rounded-xl">🏪 Salón</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-bold text-gray-500">No encontramos resultados</p>
              <p className="text-sm text-gray-400 mt-1">Prueba con otro término, po, como <span className="text-[#e91e63] font-semibold">manicura</span> o <span className="text-[#e91e63] font-semibold">cejas</span></p>
            </div>
          )
        })() : (
        <>{/* Grid de servicios — todas las categorías visibles */}
        {serviciosCategorias.map((cat, ci) => (
          <div key={ci} ref={el => { sectionRefs.current[ci] = el }} className={`mb-10 transition-all duration-300 ${categoriaActiva === ci ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
            <div className={`flex items-center gap-3 mb-4 rounded-2xl px-4 py-3 transition-all duration-300 ${categoriaActiva === ci ? 'bg-gradient-to-r from-pink-100 to-fuchsia-100 border border-pink-300 shadow-md' : 'bg-transparent border border-transparent'}`}>
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl shadow-md transition-all duration-300 ${categoriaActiva === ci ? 'scale-110 shadow-[0_6px_20px_rgba(233,30,99,0.35)]' : ''}`}>
                {cat.titulo.split(' ')[0]}
              </div>
              <h3 className={`text-lg font-extrabold transition-colors duration-300 ${categoriaActiva === ci ? 'text-[#e91e63]' : 'text-gray-800'}`}>{cat.titulo.split(' ').slice(1).join(' ')}</h3>
              <span className={`text-xs font-bold transition-colors duration-300 ${categoriaActiva === ci ? 'text-pink-500' : 'text-gray-400'}`}>{cat.servicios.length} servicios</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.servicios.filter(s =>
                modalidadFiltro === 'todos' ||
                (modalidadFiltro === 'domicilio' && s.domicilio) ||
                (modalidadFiltro === 'salon' && s.salon)
              ).map((s, i) => (
                <div key={i} className={`bg-gradient-to-br ${cat.bg} rounded-2xl p-5 border ${cat.border} flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default`}>
                  <div>
                    <h4 className="text-base font-extrabold text-gray-800 leading-tight mb-1">{s.nombre}</h4>
                    <p className="text-sm text-gray-500 leading-snug">{s.desc}</p>
                  </div>
                  <div className="flex gap-2 mt-auto pt-2 border-t border-white/60 flex-wrap">
                    {s.domicilio && (
                      <span className="text-[11px] font-bold bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-300 px-3 py-1 rounded-xl">🏠 Domicilio</span>
                    )}
                    {s.salon && (
                      <span className="text-[11px] font-bold bg-pink-100 text-[#e91e63] border border-pink-300 px-3 py-1 rounded-xl">🏪 Salón</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        </>
        )}

        {/* Footer CTA */}
        <div className="mt-10 bg-gradient-to-br from-[#e91e63] to-[#c2185b] rounded-3xl p-8 text-white text-center shadow-[0_20px_60px_rgba(233,30,99,0.25)]">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="text-xl font-extrabold mb-2">¿Eres profesional o tienes un salón?</h3>
          <p className="text-sm opacity-85 mb-5">Regístrate gratis y empieza a recibir clientas hoy mismo, po.</p>
          <button
            onClick={onClose}
            className="bg-white text-[#e91e63] font-extrabold text-sm px-8 py-3 rounded-2xl hover:scale-105 hover:shadow-xl transition-all cursor-pointer border-none shadow-md"
          >Quiero registrarme →</button>
        </div>
      </div>
    </div>
  )
}

const reseñasData = {
  clientes: [
    { nombre: 'María González', avatar: '👩', estrellas: 5, servicio: 'Uñas Acrílicas', texto: 'Bacán el trabajo, mis uñas quedaron regio. La manicurista fue súper prolija y simpática. ¡100 puntos!', fecha: 'Hace 2 días' },
    { nombre: 'Claudia Ramírez', avatar: '👩‍🦱', estrellas: 5, servicio: 'Manicura Premium', texto: 'Me encantó po, súper higiénico y profesional. Quedé más que conforme, volvería altiro.', fecha: 'Hace 5 días' },
    { nombre: 'Andrea López', avatar: '👩‍🦰', estrellas: 5, servicio: 'Spa de Manos', texto: 'La mejor app que hay en Chile para encontrar profesionales de belleza. Se usa fácil y es muy confiable.', fecha: 'Hace 1 semana' },
    { nombre: 'Valentina Torres', avatar: '🧑‍🦳', estrellas: 4, servicio: 'Extensión de Pestañas', texto: 'Muy buena experiencia, qué comodidad que venga a la casa. Sin duda vuelvo a reservar.', fecha: 'Hace 2 semanas' },
    { nombre: 'Fernanda Soto', avatar: '👩‍🦲', estrellas: 5, servicio: 'Diseño de Cejas', texto: 'Tiene un talento increíble, llegó puntual y mis cejas quedaron perfectas. Muy buena onda la chica.', fecha: 'Hace 3 semanas' },
  ],
  salones: [
    { nombre: 'Beauty House Providencia', avatar: '🏪', estrellas: 5, ubicacion: 'Providencia, Santiago', texto: 'Plataforma bacán para conseguir clientas nuevas. Desde que nos sumamos, la agenda está llena todas las semanas, qué más pedir po.', fecha: 'Hace 1 semana' },
    { nombre: 'Nails & Spa Las Condes', avatar: '💅', estrellas: 5, ubicacion: 'Las Condes, Santiago', texto: 'Nos ayudó a crecer caleta. La visibilidad que nos da no tiene precio, recomendado 100% para cualquier salón.', fecha: 'Hace 2 semanas' },
    { nombre: 'Glamour Studio Ñuñoa', avatar: '✨', estrellas: 4, ubicacion: 'Ñuñoa, Santiago', texto: 'Plataforma muy fácil de usar. Las clientas llegan sabiendo qué quieren y eso agiliza harto el trabajo.', fecha: 'Hace 1 mes' },
    { nombre: 'Pink Nails Ñuñoa', avatar: '🌸', estrellas: 5, ubicacion: 'Ñuñoa, Santiago', texto: 'Súper fácil gestionar las reservas y el soporte responde altiro. Recomendado para todo salón chileno.', fecha: 'Hace 1 mes' },
  ],
  profesionales: [
    { nombre: 'Camila Vargas', avatar: '💇‍♀️', estrellas: 5, especialidad: 'Manicurista', texto: 'Gracias a Mi Manicurista partí de cero y hoy tengo pega todos los días. La plataforma me dio la visibilidad que necesitaba po.', fecha: 'Hace 3 días' },
    { nombre: 'Javiera Muñoz', avatar: '🎨', estrellas: 5, especialidad: 'Nail Artist', texto: 'Me encanta mostrar mi portfolio y que las chiquilas me contacten directo. Se usa fácil y se ve muy profesional.', fecha: 'Hace 1 semana' },
    { nombre: 'Daniela Rojas', avatar: '👁️', estrellas: 5, especialidad: 'Especialista en Cejas', texto: 'Antes solo tenía clientas por el boca a boca. Ahora llegan clientas nuevas cada semana, qué mejor po.', fecha: 'Hace 2 semanas' },
    { nombre: 'Constanza Pérez', avatar: '🦶', estrellas: 4, especialidad: 'Podóloga', texto: 'Muy buena herramienta para las que trabajamos de forma independiente. Las reseñas de mis clientas me ayudan caleta a mejorar.', fecha: 'Hace 3 semanas' },
  ],
}

const ReseñasModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [tab, setTab] = React.useState<'clientes' | 'salones' | 'profesionales'>('clientes')
  if (!isOpen) return null

  const tabs: { key: 'clientes' | 'salones' | 'profesionales'; label: string; icon: string; count: number }[] = [
    { key: 'clientes', label: 'Clientes', icon: '💖', count: reseñasData.clientes.length },
    { key: 'salones', label: 'Salones', icon: '🏪', count: reseñasData.salones.length },
    { key: 'profesionales', label: 'Profesionales', icon: '💅', count: reseñasData.profesionales.length },
  ]

  const items = reseñasData[tab]
  const avgStars = (items.reduce((a, r) => a + r.estrellas, 0) / items.length).toFixed(1)

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[1000] backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-[1001] max-w-[620px] w-[95%] overflow-hidden max-h-[90vh] flex flex-col">
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pink-100 text-pink-500 font-bold flex items-center justify-center hover:bg-pink-200 transition z-10 border-none cursor-pointer text-lg" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="bg-gradient-to-br from-[#e91e63] via-pink-500 to-fuchsia-500 text-white text-center px-8 pt-7 pb-6">
          <div className="text-4xl mb-2">⭐</div>
          <h2 className="text-2xl font-extrabold mb-1">Reseñas</h2>
          <p className="text-sm opacity-90">Lo que dicen las que ya confían en Mi Manicurista 🇨🇱</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-pink-100 bg-pink-50 flex-shrink-0">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex flex-col items-center py-3 gap-0.5 border-none cursor-pointer transition-all text-xs font-bold ${tab === t.key ? 'bg-white text-[#e91e63] border-b-2 border-[#e91e63]' : 'text-gray-500 hover:text-[#e91e63] bg-transparent'}`}
            >
              <span className="text-lg">{t.icon}</span>
              <span>{t.label}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tab === t.key ? 'bg-pink-100 text-[#e91e63]' : 'bg-gray-100 text-gray-400'}`}>{t.count} reseñas</span>
            </button>
          ))}
        </div>

        {/* Promedio */}
        <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-50 to-fuchsia-50 border-b border-pink-100 flex-shrink-0">
          <span className="text-3xl font-extrabold text-[#e91e63]">{avgStars}</span>
          <div>
            <div className="flex gap-0.5">{'⭐'.repeat(5)}</div>
            <p className="text-xs text-gray-400 mt-0.5">Promedio de {items.length} reseñas</p>
          </div>
        </div>

        {/* Lista de reseñas */}
        <div className="overflow-y-auto flex-1 px-5 py-5 flex flex-col gap-4">
          {items.map((r, i) => (
            <div key={i} className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-5 border border-pink-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-200 to-fuchsia-200 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">{r.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-gray-800 text-sm">{r.nombre}</span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{r.fecha}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs">{'⭐'.repeat(r.estrellas)}</span>
                    {'servicio' in r && <span className="text-[11px] font-bold text-[#e91e63] bg-pink-100 px-2 py-0.5 rounded-lg">{(r as {servicio: string}).servicio}</span>}
                    {'ubicacion' in r && <span className="text-[11px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-lg">📍 {(r as {ubicacion: string}).ubicacion}</span>}
                    {'especialidad' in r && <span className="text-[11px] font-bold text-fuchsia-600 bg-fuchsia-100 px-2 py-0.5 rounded-lg">{(r as {especialidad: string}).especialidad}</span>}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed italic">&ldquo;{r.texto}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const QuienesSomosModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[1000] backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-[1001] max-w-[560px] w-[92%] overflow-hidden max-h-[90vh] flex flex-col">
        <button
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pink-100 text-pink-500 font-bold flex items-center justify-center hover:bg-pink-200 transition z-10 border-none cursor-pointer text-lg"
          onClick={onClose}
        >✕</button>

        <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 text-white text-center px-8 pt-8 pb-7">
          <div className="text-4xl mb-3">💅</div>
          <h2 className="text-2xl font-extrabold tracking-tight leading-tight mb-1">Quiénes Somos</h2>
          <p className="text-sm opacity-90">Mi Manicurista</p>
        </div>

        <div className="overflow-y-auto flex-1 px-8 py-6 flex flex-col gap-5">
          <p className="text-sm text-gray-600 leading-relaxed">
            Somos un emprendimiento joven nacido desde la pasión, el esfuerzo y las ganas de hacer las cosas bien.
          </p>

          <div className="flex items-start gap-4 bg-pink-50 rounded-2xl p-4 border border-pink-100">
            <span className="text-3xl">👫</span>
            <p className="text-sm text-gray-600 leading-relaxed">
              Este proyecto fue creado por <strong className="text-[#e91e63]">Daniel Conde</strong> y <strong className="text-[#e91e63]">Francisca Pierattini </strong>, quienes no solo son pareja, sino también socios en este sueño. Daniel, con su formación en informática, y Francisca, con su experiencia en el rubro, unieron sus conocimientos para dar vida a su peluquería <strong>Emamor</strong>, que comenzó hace un par de años.
            </p>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            A partir de esta experiencia, surgió la idea de ir más allá y crear un portal pensado para conectar a personas con profesionales de confianza, priorizando la <strong>seguridad</strong>, la <strong>calidad</strong> y la <strong>cercanía</strong>.
          </p>

          <div className="flex items-start gap-4 bg-rose-50 rounded-2xl p-4 border border-pink-100">
            <span className="text-3xl">💡</span>
            <p className="text-sm text-gray-600 leading-relaxed">
              Creemos en el trabajo bien hecho, en el trato humano y en generar espacios donde tanto clientes como profesionales se sientan cómodos y seguros.
            </p>
          </div>

          <p className="text-sm text-[#e91e63] font-semibold leading-relaxed text-center">
            Hoy seguimos creciendo con la misma motivación del primer día: entregar un servicio cercano, confiable y hecho con dedicación. ✨
          </p>

          <div className="flex flex-col gap-2 mt-1">
            <a href="mailto:friquelmepierattini@gmail.com" className="flex items-center gap-3 bg-pink-50 rounded-2xl px-4 py-3 border border-pink-100 hover:border-pink-300 transition group no-underline">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-400 to-fuchsia-400 flex items-center justify-center text-white text-base flex-shrink-0">📧</span>
              <span className="text-sm text-gray-600 font-medium group-hover:text-[#e91e63] transition-colors">friquelmepierattini@gmail.com</span>
            </a>
            <a href="https://wa.me/56972821003" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-pink-50 rounded-2xl px-4 py-3 border border-pink-100 hover:border-pink-300 transition group no-underline">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white text-base flex-shrink-0">📱</span>
              <span className="text-sm text-gray-600 font-medium group-hover:text-[#e91e63] transition-colors">+56 9 7282 1003</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Page() {
  const [showLoginModal, setShowLoginModal] = React.useState(false)
  const [loginTipoInicial, setLoginTipoInicial] = React.useState<LoginTipo | undefined>(undefined)
  const [showRegisterModal, setShowRegisterModal] = React.useState(false)
  const [showUbicacionModal, setShowUbicacionModal] = React.useState(false)

  const [showQuienesSomos, setShowQuienesSomos] = React.useState(false)
  const [showServicios, setShowServicios] = React.useState(false)
  const [showReseñas, setShowReseñas] = React.useState(false)

  const openLogin = (tipo?: LoginTipo) => { setLoginTipoInicial(tipo); setShowLoginModal(true) }

  const handleMenuClick = (label: string) => {
    if (label === 'Inicio') openLogin()
    if (label === 'Ubicación') setShowUbicacionModal(true)
    if (label === 'Quiénes somos') setShowQuienesSomos(true)
    if (label === 'Servicios') setShowServicios(true)
    if (label === 'Reseñas') setShowReseñas(true)
  }

  return (
    <div className="relative max-w-[1420px] mx-auto px-3 sm:px-6 lg:pl-[165px] lg:pr-[220px] py-3 sm:py-5 flex flex-col">
      <QuienesSomosModal isOpen={showQuienesSomos} onClose={() => setShowQuienesSomos(false)} />
      <ServiciosModal isOpen={showServicios} onClose={() => setShowServicios(false)} />
      <ReseñasModal isOpen={showReseñas} onClose={() => setShowReseñas(false)} />
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onOpenRegister={() => { setShowLoginModal(false); setShowRegisterModal(true) }} initialTipo={loginTipoInicial} />
      <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
      <UbicacionModal isOpen={showUbicacionModal} onClose={() => setShowUbicacionModal(false)} />

      <HeaderBranding />
      <HeroSection />

      <div className="flex justify-center gap-4 my-6 flex-wrap">
        <OptionCard icon="💅" title="Soy Manicurista" description="Publica tus servicios" gradient="from-fuchsia-50 to-pink-100" iconBg="from-fuchsia-400 to-pink-500" onClick={() => openLogin('profesional')} />
        <OptionCard icon="💖" title="Soy Cliente" description="Encuentra profesionales" gradient="from-pink-50 to-rose-100" iconBg="from-pink-400 to-rose-500" onClick={() => openLogin('cliente')} />
        <OptionCard icon="🏢" title="Soy Salón" description="Administra tu negocio" gradient="from-rose-50 to-pink-100" iconBg="from-rose-400 to-pink-400" onClick={() => openLogin('salon')} />
      </div>

      <div className="lg:hidden grid grid-cols-2 gap-2 mb-5">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleMenuClick(item.label)}
            className="bg-white border border-pink-100 rounded-2xl px-3 py-3 text-xs font-bold text-gray-700 flex items-center justify-center gap-1.5 shadow-sm hover:border-pink-300 hover:text-[#e91e63] transition-all"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <HowItWorks />

      <div className="flex gap-4">
        <Sidebar onMenuClick={handleMenuClick} />
        <main className="flex-1 px-2 sm:px-6 py-5 bg-white/55 backdrop-blur-sm border border-rose-100/70 rounded-[28px] shadow-[0_14px_40px_rgba(199,67,114,0.10)]">
          <ServiceGallery />
        </main>
        <RightSidebar onRegisterClick={() => setShowRegisterModal(true)} />
      </div>

      <Benefits />
      <Testimonials />
      <PromoBanner />
      <Footer />
    </div>
  )
}
