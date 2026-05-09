'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface ProData {
  tipo: 'profesional'
  rut: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  fechaNacimiento: string
  ciudad: string
  direccion: string
  especialidades: string[]
  haceDomicilio: boolean
  comunasDomicilio: string
  fotoPerfil: string | null
  fotosPortfolio: string[]
  instagram: string
  experiencia: string
  descripcion: string
  disponibilidadAgenda?: Record<string, string[]>
}

type DisponibilidadPorDia = Record<string, string[]>

const TODAS_ESPECIALIDADES = [
  'Manicura', 'Pedicura', 'Uñas Acrílicas', 'Uñas de Gel',
  'Nail Art / Diseños', 'Cejas', 'Extensión de Pestañas',
  'Lash Lift', 'Spa de Manos', 'Podología',
]
const DIAS_SEMANA_CORTO = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const MESES_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const HORAS_BASE = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

const toDateKey = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
const fromDateKey = (key: string) => new Date(`${key}T12:00:00`)
const shiftDays = (date: Date, offset: number) => { const next = new Date(date); next.setDate(next.getDate() + offset); return next }
const startOfWeekMonday = (date: Date) => { const off = (date.getDay() + 6) % 7; return shiftDays(date, -off) }
const monthLabel = (date: Date) => `${MESES_ES[date.getMonth()]} ${date.getFullYear()}`

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} className={i <= rating ? 'text-yellow-400 text-sm' : 'text-gray-200 text-sm'}>★</span>
    ))}
    <span className="text-xs font-bold text-gray-500 ml-1">{rating.toFixed(1)}</span>
  </div>
)

const mockReseñas = [
  { id: 1, cliente: 'María González', servicio: 'Uñas acrílicas', fecha: '12 Abr 2026', rating: 5, comentario: '¡Excelente trabajo! Quedé encantada con el diseño.' },
  { id: 2, cliente: 'Camila Torres', servicio: 'Manicura francesa', fecha: '3 Abr 2026', rating: 5, comentario: 'Muy prolija y rápida. Volvería sin dudarlo.' },
  { id: 3, cliente: 'Ana Vargas', servicio: 'Nail art', fecha: '25 Mar 2026', rating: 4, comentario: 'Muy buen resultado, el diseño quedó tal como lo pedí.' },
]

export default function PerfilProfesionalPage() {
  const router = useRouter()
  const [pro, setPro] = React.useState<ProData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState<'inicio' | 'portfolio' | 'servicios' | 'agenda' | 'info'>('inicio')
  const [detalleHero, setDetalleHero] = React.useState<{ tipo: 'servicio' | 'ubicacion' | 'whatsapp', valor: string } | null>(null)

  // ── Sobre mí editable
  const [editandoDesc, setEditandoDesc] = React.useState(false)
  const [descDraft, setDescDraft] = React.useState('')

  // ── Datos personales editables
  const [editandoInfo, setEditandoInfo] = React.useState(false)
  const [editForm, setEditForm] = React.useState({ nombre: '', apellido: '', telefono: '', ciudad: '', instagram: '', experiencia: '', haceDomicilio: false, comunasDomicilio: '' })

  // ── Servicios editables
  const [editandoServicios, setEditandoServicios] = React.useState(false)
  const [serviciosDraft, setServiciosDraft] = React.useState<string[]>([])
  const [preciosServicios, setPreciosServicios] = React.useState<Record<string, string>>({})  
  const [preciosDraft, setPreciosDraft] = React.useState<Record<string, string>>({})
  const [descripcionesServicios, setDescripcionesServicios] = React.useState<Record<string, string>>({})
  const [descripcionesDraft, setDescripcionesDraft] = React.useState<Record<string, string>>({})
  const [fotosServicios, setFotosServicios] = React.useState<Record<string, string>>({})
  const [fotoServicioInputRef] = React.useState<Record<string, React.RefObject<HTMLInputElement | null>>>({}) // populated lazily

  // ── Portfolio editable
  const [editandoPortfolio, setEditandoPortfolio] = React.useState(false)

  // ── Foto de perfil
  const fotoInputRef = React.useRef<HTMLInputElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  const cambiarTab = (key: typeof activeTab) => {
    setActiveTab(key)
    setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  // ── Agenda
  const [mesAgenda, setMesAgenda] = React.useState(() => { const now = new Date(); return new Date(now.getFullYear(), now.getMonth(), 1) })
  const [diaSeleccionado, setDiaSeleccionado] = React.useState(() => toDateKey(new Date()))
  const [disponibilidad, setDisponibilidad] = React.useState<DisponibilidadPorDia>({})

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
  const whatsappHref = React.useMemo(() => {
    if (!pro?.telefono) return ''
    const digits = pro.telefono.replace(/\D/g, '')
    if (!digits) return ''
    const phone = digits.startsWith('56') ? digits : `56${digits}`
    const text = encodeURIComponent(`Hola ${pro.nombre}, vi tu perfil en Mi Manicure y quiero consultar por una hora.`)
    return `https://wa.me/${phone}?text=${text}`
  }, [pro])
  const servicioHeroActivo = React.useMemo(() => {
    if (!detalleHero || detalleHero.tipo !== 'servicio') return null
    return detalleHero.valor
  }, [detalleHero])

  const cambiarMes = (delta: number) => {
    setMesAgenda(prev => {
      const next = new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
      setDiaSeleccionado(cur => {
        const sel = fromDateKey(cur)
        return sel.getMonth() === next.getMonth() && sel.getFullYear() === next.getFullYear() ? cur : toDateKey(next)
      })
      return next
    })
  }

  const toggleHora = (dateKey: string, hora: string) => {
    setDisponibilidad(prev => {
      const current = prev[dateKey] ?? []
      const updated = current.includes(hora) ? current.filter(h => h !== hora) : [...current, hora].sort()
      const saved = { ...prev, [dateKey]: updated }
      setPro(p => {
        if (!p) return p
        const updated2 = { ...p, disponibilidadAgenda: saved }
        localStorage.setItem('mimanicure_user', JSON.stringify(updated2))
        return updated2
      })
      return saved
    })
  }

  React.useEffect(() => {
    const stored = localStorage.getItem('mimanicure_user')
    if (!stored) { router.push('/'); return }
    const data = JSON.parse(stored)
    if (data.tipo !== 'profesional') { router.push('/'); return }
    setPro(data as ProData)
    setDescDraft(data.descripcion || '')
    setServiciosDraft(data.especialidades || [])
    const savedPrecios = localStorage.getItem(`mimanicure_precios_${data.email}`)
    if (savedPrecios) { const p = JSON.parse(savedPrecios); setPreciosServicios(p); setPreciosDraft(p) }
    const savedDescs = localStorage.getItem(`mimanicure_descs_${data.email}`)
    if (savedDescs) { const d = JSON.parse(savedDescs); setDescripcionesServicios(d); setDescripcionesDraft(d) }
    const savedFotos = localStorage.getItem(`mimanicure_fotos_srv_${data.email}`)
    if (savedFotos) setFotosServicios(JSON.parse(savedFotos))
    setDisponibilidad(data.disponibilidadAgenda || {})
    setEditForm({
      nombre: data.nombre || '',
      apellido: data.apellido || '',
      telefono: data.telefono || '',
      ciudad: data.ciudad || '',
      instagram: data.instagram || '',
      experiencia: data.experiencia || '',
      haceDomicilio: data.haceDomicilio || false,
      comunasDomicilio: data.comunasDomicilio || '',
    })
    setLoading(false)
  }, [router])

  const save = (updated: ProData) => {
    localStorage.setItem('mimanicure_user', JSON.stringify(updated))
    setPro(updated)
  }

  const handleGuardarDesc = () => {
    if (!pro) return
    save({ ...pro, descripcion: descDraft })
    setEditandoDesc(false)
  }

  const handleGuardarInfo = () => {
    if (!pro) return
    save({ ...pro, ...editForm })
    setEditandoInfo(false)
  }

  const handleGuardarServicios = () => {
    if (!pro) return
    save({ ...pro, especialidades: serviciosDraft })
    localStorage.setItem(`mimanicure_precios_${pro.email}`, JSON.stringify(preciosDraft))
    localStorage.setItem(`mimanicure_descs_${pro.email}`, JSON.stringify(descripcionesDraft))
    setPreciosServicios(preciosDraft)
    setDescripcionesServicios(descripcionesDraft)
    setEditandoServicios(false)
  }

  const handleFotoPerfil = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !pro) return
    const url = URL.createObjectURL(file)
    save({ ...pro, fotoPerfil: url })
  }

  const handleAgregarFotoPortfolio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!pro) return
    const urls = files.map(f => URL.createObjectURL(f))
    save({ ...pro, fotosPortfolio: [...(pro.fotosPortfolio || []), ...urls].slice(0, 12) })
  }

  const handleEliminarFotoPortfolio = (idx: number) => {
    if (!pro) return
    save({ ...pro, fotosPortfolio: pro.fotosPortfolio.filter((_, i) => i !== idx) })
  }

  const handleLogout = () => {
    localStorage.removeItem('mimanicure_user')
    router.push('/')
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#e91e63] to-pink-400 flex items-center justify-center shadow-lg shadow-pink-200">
        <div className="w-8 h-8 border-3 border-white/40 border-t-white rounded-full animate-spin" style={{borderWidth:'3px'}} />
      </div>
      <p className="font-bold text-[#e91e63] text-sm tracking-wide">Cargando tu perfil...</p>
    </div>
  )
  if (!pro) return null

  const iniciales = `${pro.nombre?.[0] || ''}${pro.apellido?.[0] || ''}`.toUpperCase()
  const nombreCompleto = `${pro.nombre} ${pro.apellido}`

  const tabs: { key: typeof activeTab; icon: string; label: string }[] = [
    { key: 'inicio', icon: '🏠', label: 'Inicio' },
    { key: 'portfolio', icon: '🖼️', label: 'Portfolio' },
    { key: 'servicios', icon: '💅', label: 'Servicios' },
    { key: 'agenda', icon: '📅', label: 'Agenda' },
    { key: 'info', icon: '👤', label: 'Datos' },
  ]

  return (
    <div className="min-h-screen" style={{background:'linear-gradient(135deg, #fff5f8 0%, #ffeef4 50%, #fff5fb 100%)'}}>
      {/* Top bar – glassmorphism */}
      <div className="sticky top-0 z-[100] flex items-center justify-between px-4 py-3" style={{background:'rgba(255,255,255,0.72)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderBottom:'1px solid rgba(233,30,99,0.10)',boxShadow:'0 2px 24px rgba(233,30,99,0.07)'}}>
        <button className="text-[#e91e63] font-bold text-sm px-3 py-1.5 rounded-full border-none cursor-pointer transition" style={{background:'rgba(233,30,99,0.08)'}} onClick={() => router.push('/')}>← Volver</button>
        <span className="font-extrabold text-gray-800 tracking-tight">Mi Perfil ✨</span>
        <button className="text-gray-400 text-sm px-3 py-1.5 rounded-full border-none cursor-pointer font-semibold transition hover:text-red-400" style={{background:'rgba(0,0,0,0.04)'}} onClick={handleLogout}>Salir</button>
      </div>

      <div className="max-w-[600px] mx-auto px-4 pb-36">

        {/* ── HERO ── */}
        <div className="relative rounded-[28px] overflow-hidden mt-4" style={{boxShadow:'0 20px 60px rgba(233,30,99,0.22)'}}>
          {/* Banner con formas decorativas */}
          <div className="h-36 relative overflow-hidden" style={{background:'linear-gradient(135deg, #f8bbd9 0%, #f48fb1 45%, #e91e63 100%)'}}>
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{background:'rgba(255,255,255,0.12)'}} />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full" style={{background:'rgba(255,255,255,0.09)'}} />
            <div className="absolute top-5 right-20 w-12 h-12 rounded-full" style={{background:'rgba(255,255,255,0.15)'}} />
            <div className="absolute bottom-3 right-6 w-6 h-6 rounded-full" style={{background:'rgba(255,255,255,0.20)'}} />
            {/* Etiqueta PRO */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              <span className="text-white text-[10px] font-bold tracking-widest uppercase">Profesional</span>
            </div>
          </div>

          <div className="bg-white flex flex-col items-center -mt-14 pb-6 px-5">
            {/* Avatar con glow */}
            <div className="relative group cursor-pointer" onClick={() => fotoInputRef.current?.click()}>
              <div className="absolute inset-0 rounded-full scale-125 blur-lg opacity-40" style={{background:'radial-gradient(circle, #e91e63, transparent)'}} />
              <div className="relative w-28 h-28 rounded-full border-[5px] border-white overflow-hidden flex items-center justify-center" style={{boxShadow:'0 8px 30px rgba(233,30,99,0.35)',background:'linear-gradient(135deg,#f48fb1,#e91e63)'}}>
                {pro.fotoPerfil
                  ? <img src={pro.fotoPerfil} alt="Perfil" className="w-full h-full object-cover" />
                  : <span className="text-4xl font-black text-white">{iniciales}</span>
                }
              </div>
              <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" style={{background:'rgba(0,0,0,0.45)'}}>
                <span className="text-white text-2xl">📷</span>
              </div>
              {/* Badge cámara */}
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm" style={{background:'linear-gradient(135deg,#e91e63,#c2185b)',boxShadow:'0 2px 8px rgba(233,30,99,0.4)'}}>
                📷
              </div>
            </div>
            <input ref={fotoInputRef} type="file" accept="image/*" onChange={handleFotoPerfil} className="hidden" />

            <h1 className="text-xl font-black text-gray-900 mt-3 text-center tracking-tight">{nombreCompleto}</h1>
            <p className="text-gray-400 text-xs mt-0.5 font-medium">{pro.email}</p>

            {pro.especialidades?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                {pro.especialidades.map(e => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setDetalleHero({ tipo: 'servicio', valor: e })}
                    className="text-[11px] font-bold px-3 py-1 rounded-full border-none cursor-pointer transition"
                    style={servicioHeroActivo === e
                      ? {background:'linear-gradient(135deg,#e91e63,#c2185b)',color:'#fff',boxShadow:'0 4px 12px rgba(233,30,99,0.22)'}
                      : {background:'linear-gradient(135deg,#fce4ec,#f8bbd9)',color:'#c2185b',border:'1px solid rgba(233,30,99,0.15)'}}
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 justify-center mt-3">
              {pro.ciudad && (
                <button
                  type="button"
                  onClick={() => setDetalleHero({ tipo: 'ubicacion', valor: 'ubicacion' })}
                  className="text-xs px-3 py-1 rounded-full font-semibold border-none cursor-pointer transition"
                  style={{background:'#f5f5f5',color:'#555'}}
                >
                  📍 {pro.ciudad}
                </button>
              )}
              {pro.experiencia && <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{background:'#fce4ec',color:'#e91e63'}}>✨ {pro.experiencia} años</span>}
              {pro.instagram && <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{background:'#fce4ec',color:'#e91e63'}}>📸 {pro.instagram}</span>}
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3 py-1 rounded-full font-bold no-underline transition"
                  style={{background:'#e8f5e9',color:'#1b8755',border:'1px solid #c8e6c9'}}
                >
                  💬 WhatsApp
                </a>
              )}
              <button
                type="button"
                onClick={() => setDetalleHero({ tipo: 'ubicacion', valor: 'atencion' })}
                className="text-xs px-3 py-1 rounded-full font-bold border-none cursor-pointer transition"
                style={pro.haceDomicilio ? {background:'#e8f5e9',color:'#2e7d32',border:'1px solid #c8e6c9'} : {background:'#f5f5f5',color:'#9e9e9e'}}
              >
                🏠 {pro.haceDomicilio ? 'A domicilio' : 'Solo local'}
              </button>
            </div>

            {detalleHero && (
              <div className="w-full mt-4 rounded-2xl p-4" style={{background:'linear-gradient(135deg,#fff7fb,#fce4ec)',border:'1px solid rgba(233,30,99,0.12)'}}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {detalleHero.tipo === 'servicio' && (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0" style={{background:'linear-gradient(135deg,#f8bbd9,#e91e63)'}}>
                            {fotosServicios[detalleHero.valor]
                              ? <img src={fotosServicios[detalleHero.valor]} alt={detalleHero.valor} className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center text-white text-xl">💅</div>
                            }
                          </div>
                          <div>
                            <h3 className="text-sm font-black text-gray-900">{detalleHero.valor}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{descripcionesServicios[detalleHero.valor] || 'Servicio disponible para reserva y cotización directa.'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{background:'#fff',color:'#e91e63',border:'1px solid rgba(233,30,99,0.12)'}}>
                            {preciosServicios[detalleHero.valor] ? `$ ${preciosServicios[detalleHero.valor]}` : 'Precio a consultar'}
                          </span>
                          <button
                            type="button"
                            onClick={() => cambiarTab('servicios')}
                            className="text-[11px] font-bold px-3 py-1.5 rounded-full border-none cursor-pointer"
                            style={{background:'linear-gradient(135deg,#e91e63,#c2185b)',color:'#fff'}}
                          >
                            Ver servicio
                          </button>
                        </div>
                      </>
                    )}
                    {detalleHero.tipo === 'ubicacion' && (
                      <>
                        <h3 className="text-sm font-black text-gray-900">Dónde atiende</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {pro.haceDomicilio
                            ? `Atiende en local establecido${pro.direccion ? ` en ${pro.direccion}` : ''} y también realiza visitas a domicilio${pro.comunasDomicilio ? ` en ${pro.comunasDomicilio}` : ''}.`
                            : `Atiende en local establecido${pro.direccion ? ` en ${pro.direccion}` : pro.ciudad ? ` en ${pro.ciudad}` : ''}.`}
                        </p>
                        <div className="flex gap-2 flex-wrap mt-3">
                          {pro.direccion && <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{background:'#fff',color:'#666',border:'1px solid rgba(0,0,0,0.06)'}}>📍 {pro.direccion}</span>}
                          {pro.comunasDomicilio && <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{background:'#fff',color:'#2e7d32',border:'1px solid #c8e6c9'}}>🏠 {pro.comunasDomicilio}</span>}
                        </div>
                      </>
                    )}
                    {detalleHero.tipo === 'whatsapp' && whatsappHref && (
                      <>
                        <h3 className="text-sm font-black text-gray-900">Contacto directo</h3>
                        <p className="text-xs text-gray-600 mt-1">Si necesitas coordinar rápido, puedes escribirle directo por WhatsApp.</p>
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-3 text-[11px] font-bold px-3 py-1.5 rounded-full no-underline"
                          style={{background:'#25D366',color:'#fff'}}
                        >
                          Abrir WhatsApp
                        </a>
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setDetalleHero(null)}
                    className="w-7 h-7 rounded-full border-none cursor-pointer text-sm shrink-0"
                    style={{background:'rgba(233,30,99,0.08)',color:'#e91e63'}}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { value: '4.9', label: 'Rating', emoji: '⭐', bg: 'linear-gradient(135deg,#fff0f5,#fce4ec)', color: '#e91e63', border: '#f8bbd9', tab: 'inicio' },
            { value: String(pro.fotosPortfolio?.length || 0), label: 'Portfolio', emoji: '🖼️', bg: 'linear-gradient(135deg,#fce4ec,#f8bbd9)', color: '#c2185b', border: '#f48fb1', tab: 'portfolio' },
            { value: String(mockReseñas.length), label: 'Reseñas', emoji: '💬', bg: 'linear-gradient(135deg,#fdf2f8,#fce4ec)', color: '#ad1457', border: '#f48fb1', tab: 'inicio' },
          ].map(s => (
            <button key={s.label} onClick={() => cambiarTab(s.tab as typeof activeTab)} className="rounded-2xl p-4 text-center border-none cursor-pointer transition-all hover:scale-105 active:scale-95" style={{background:s.bg,border:`1px solid ${s.border}`,boxShadow:'0 4px 16px rgba(0,0,0,0.06)'}}>
              <span className="block text-lg mb-0.5">{s.emoji}</span>
              <span className="block text-2xl font-black" style={{color:s.color}}>{s.value}</span>
              <span className="block text-[0.62rem] uppercase tracking-widest mt-0.5 font-bold" style={{color:s.color,opacity:0.7}}>{s.label}</span>
            </button>
          ))}
        </div>

        {/* ── TABS inline (desktop helper) – el real es el bottom nav fijo ── */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" style={{scrollbarWidth:'none'}}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => cambiarTab(tab.key as typeof activeTab)}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border-none cursor-pointer font-bold text-sm transition-all"
              style={activeTab === tab.key
                ? {background:'linear-gradient(135deg,#e91e63,#c2185b)',color:'white',boxShadow:'0 4px 14px rgba(233,30,99,0.35)'}
                : {background:'rgba(233,30,99,0.07)',color:'#c2185b'}}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        <div ref={contentRef} className="mt-5 flex flex-col gap-4">

          {/* ════════════════════════════════
              TAB: INICIO
          ════════════════════════════════ */}
          {activeTab === 'inicio' && (
            <>
              {/* Sobre mí editable */}
              <div className="bg-white rounded-2xl p-5" style={{boxShadow:'0 4px 24px rgba(233,30,99,0.09)',border:'1px solid rgba(233,30,99,0.08)'}}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 rounded-full" style={{background:'linear-gradient(to bottom,#e91e63,#f48fb1)'}} />
                    <h2 className="font-black text-gray-900 tracking-tight">Sobre mí</h2>
                  </div>
                  {!editandoDesc
                    ? <button onClick={() => setEditandoDesc(true)} className="text-sm font-bold text-[#e91e63] bg-pink-50 border border-pink-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-pink-100 transition border-solid">✏️ Editar</button>
                    : <div className="flex gap-2">
                        <button onClick={handleGuardarDesc} className="text-sm font-bold text-white bg-[#e91e63] px-4 py-2 rounded-xl cursor-pointer hover:opacity-90 transition border-none">Guardar</button>
                        <button onClick={() => { setEditandoDesc(false); setDescDraft(pro.descripcion || '') }} className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-200 transition border-none">Cancelar</button>
                      </div>
                  }
                </div>
                {editandoDesc
                  ? <textarea
                      className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white resize-none"
                      value={descDraft}
                      onChange={e => setDescDraft(e.target.value)}
                      rows={4}
                      placeholder="Cuéntanos sobre ti, tu experiencia y lo que te diferencia..."
                    />
                  : <p className="text-sm text-gray-600 leading-relaxed">{pro.descripcion || <span className="text-gray-400 italic">Sin descripción aún. ¡Toca Editar para contarles a tus clientes sobre ti!</span>}</p>
                }
              </div>

              {/* Reseñas */}
              <div className="bg-white rounded-2xl p-5" style={{boxShadow:'0 4px 24px rgba(233,30,99,0.09)',border:'1px solid rgba(233,30,99,0.08)'}}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{background:'linear-gradient(to bottom,#e91e63,#f48fb1)'}} />
                  <h2 className="font-black text-gray-900 tracking-tight">Reseñas recientes</h2>
                </div>
                <div className="flex flex-col gap-3">
                  {mockReseñas.map(r => (
                    <div key={r.id} className="rounded-2xl p-4 flex flex-col gap-2" style={{background:'linear-gradient(135deg,#fff9fb,#fce4ec)',border:'1px solid rgba(233,30,99,0.12)'}}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-[#e91e63] text-white font-bold text-sm flex items-center justify-center shrink-0">{r.cliente[0]}</div>
                        <div className="flex-1">
                          <strong className="text-sm font-bold text-gray-800 block">{r.cliente}</strong>
                          <span className="text-xs text-gray-400">{r.servicio} · {r.fecha}</span>
                        </div>
                        <StarRating rating={r.rating} />
                      </div>
                      <p className="text-sm text-gray-600 italic leading-relaxed">"{r.comentario}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════
              TAB: PORTFOLIO
          ════════════════════════════════ */}
          {activeTab === 'portfolio' && (
            <div className="bg-white rounded-2xl p-5" style={{boxShadow:'0 4px 24px rgba(233,30,99,0.09)',border:'1px solid rgba(233,30,99,0.08)'}}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full" style={{background:'linear-gradient(to bottom,#7b1fa2,#ba68c8)'}} />
                  <h2 className="font-black text-gray-900 tracking-tight">Portfolio</h2>
                </div>
                <button
                  onClick={() => setEditandoPortfolio(p => !p)}
                  className="text-sm font-bold text-[#e91e63] bg-pink-50 border border-pink-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-pink-100 transition border-solid"
                >
                  {editandoPortfolio ? '✓ Listo' : '✏️ Editar'}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(pro.fotosPortfolio || []).map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                    <img src={url} alt={`Trabajo ${i + 1}`} className="w-full h-full object-cover" />
                    {editandoPortfolio && (
                      <button
                        onClick={() => handleEliminarFotoPortfolio(i)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-none cursor-pointer shadow-md hover:bg-red-600 transition"
                      >✕</button>
                    )}
                  </div>
                ))}
                {editandoPortfolio && (pro.fotosPortfolio?.length || 0) < 12 && (
                  <div
                    onClick={() => document.getElementById('portfolio-add')?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-pink-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#e91e63] hover:bg-pink-50 transition-all"
                  >
                    <span className="text-2xl text-pink-300">+</span>
                    <span className="text-[10px] text-pink-400 font-semibold">Agregar</span>
                  </div>
                )}
              </div>
              <input id="portfolio-add" type="file" accept="image/*" multiple onChange={handleAgregarFotoPortfolio} className="hidden" />

              {(pro.fotosPortfolio?.length || 0) === 0 && !editandoPortfolio && (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <span className="text-5xl">🖼️</span>
                  <p className="text-sm text-gray-500">Aún no tienes fotos en tu portfolio.</p>
                  <button onClick={() => setEditandoPortfolio(true)} className="px-6 py-3 bg-gradient-to-r from-pink-400 to-[#e91e63] text-white font-bold text-sm rounded-xl border-none cursor-pointer hover:opacity-90 transition">
                    + Agregar fotos
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════
              TAB: SERVICIOS
          ════════════════════════════════ */}
          {activeTab === 'servicios' && (
            <div className="bg-white rounded-2xl p-5" style={{boxShadow:'0 4px 24px rgba(233,30,99,0.09)',border:'1px solid rgba(233,30,99,0.08)'}}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full" style={{background:'linear-gradient(to bottom,#e91e63,#f48fb1)'}} />
                  <h2 className="font-black text-gray-900 tracking-tight">Mis servicios</h2>
                </div>
                {!editandoServicios
                  ? <button onClick={() => { setServiciosDraft(pro.especialidades || []); setPreciosDraft({...preciosServicios}); setDescripcionesDraft({...descripcionesServicios}); setEditandoServicios(true) }} className="text-sm font-bold text-[#e91e63] bg-pink-50 border border-pink-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-pink-100 transition border-solid">✏️ Editar</button>
                  : <div className="flex gap-2">
                      <button onClick={handleGuardarServicios} className="text-sm font-bold text-white bg-[#e91e63] px-4 py-2 rounded-xl cursor-pointer hover:opacity-90 transition border-none">Guardar</button>
                      <button onClick={() => setEditandoServicios(false)} className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-200 transition border-none">Cancelar</button>
                    </div>
                }
              </div>

              {editandoServicios ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Selecciona los servicios que ofreces:</p>
                    <div className="flex flex-wrap gap-2">
                      {TODAS_ESPECIALIDADES.map(esp => {
                        const activo = serviciosDraft.includes(esp)
                        return (
                          <button
                            key={esp}
                            type="button"
                            onClick={() => setServiciosDraft(prev => activo ? prev.filter(e => e !== esp) : [...prev, esp])}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${activo ? 'border-[#e91e63] bg-[#e91e63] text-white' : 'border-pink-100 text-gray-600 bg-white hover:border-pink-400'}`}
                          >
                            {activo ? '✓ ' : ''}{esp}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  {serviciosDraft.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Precio y descripción por servicio:</p>
                      <div className="flex flex-col gap-2">
                        {serviciosDraft.map(esp => (
                          <div key={esp} className="flex flex-col gap-1.5 bg-pink-50/60 rounded-xl px-3 py-2.5 border border-pink-100/50">
                            <div className="flex items-center gap-2">
                              {/* Foto miniatura + botón cambiar */}
                              <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-pink-400 to-[#e91e63] flex items-center justify-center cursor-pointer group"
                                onClick={() => { if (!fotoServicioInputRef[esp]) { (fotoServicioInputRef as Record<string,React.RefObject<HTMLInputElement | null>>)[esp] = React.createRef() } document.getElementById(`foto-srv-${esp}`)?.click() }}>
                                {fotosServicios[esp]
                                  ? <img src={fotosServicios[esp]} alt={esp} className="w-full h-full object-cover" />
                                  : <span className="text-xl">💅</span>
                                }
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                  <span className="text-white text-sm">📷</span>
                                </div>
                              </div>
                              <input id={`foto-srv-${esp}`} type="file" accept="image/*" className="hidden" onChange={e => {
                                const file = e.target.files?.[0]
                                if (!file || !pro) return
                                const reader = new FileReader()
                                reader.onload = ev => {
                                  const updated = { ...fotosServicios, [esp]: ev.target?.result as string }
                                  setFotosServicios(updated)
                                  localStorage.setItem(`mimanicure_fotos_srv_${pro.email}`, JSON.stringify(updated))
                                }
                                reader.readAsDataURL(file)
                                e.target.value = ''
                              }} />
                              <span className="text-xs font-bold text-gray-700">{esp}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 shrink-0">$</span>
                              <input
                                type="text"
                                placeholder="ej: 12.990"
                                value={preciosDraft[esp] || ''}
                                onChange={e => setPreciosDraft(prev => ({ ...prev, [esp]: e.target.value }))}
                                className="w-28 text-xs px-2.5 py-1.5 rounded-lg border border-pink-200 bg-white text-gray-700 font-semibold outline-none focus:border-[#e91e63] transition"
                              />
                              <input
                                type="text"
                                placeholder="ej: sin diseño"
                                value={descripcionesDraft[esp] || ''}
                                onChange={e => setDescripcionesDraft(prev => ({ ...prev, [esp]: e.target.value }))}
                                className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-pink-200 bg-white text-gray-500 outline-none focus:border-[#e91e63] transition"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {(pro.especialidades || []).length > 0 ? (
                    pro.especialidades.map(esp => (
                      <div key={esp} className="flex items-center gap-3 p-3.5 bg-pink-50/60 rounded-xl border border-pink-100/50">
                        {/* Thumbnail pequeño — clic para subir */}
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-pink-300 to-[#e91e63] cursor-pointer group"
                          onClick={() => document.getElementById(`foto-view-${esp}`)?.click()}>
                          {fotosServicios[esp]
                            ? <img src={fotosServicios[esp]} alt={esp} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center"><span className="text-2xl">📷</span></div>
                          }
                          <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-xl">
                            <span className="text-white text-lg">📷</span>
                          </div>
                        </div>
                        <input id={`foto-view-${esp}`} type="file" accept="image/*" className="hidden" onChange={e => {
                          const file = e.target.files?.[0]
                          if (!file || !pro) return
                          const reader = new FileReader()
                          reader.onload = ev => {
                            const updated = { ...fotosServicios, [esp]: ev.target?.result as string }
                            setFotosServicios(updated)
                            localStorage.setItem(`mimanicure_fotos_srv_${pro.email}`, JSON.stringify(updated))
                          }
                          reader.readAsDataURL(file)
                          e.target.value = ''
                        }} />
                        <div className="flex-1 min-w-0">
                          <strong className="text-sm font-bold text-gray-800">{esp}</strong>
                          <p className="text-xs text-gray-400 mt-0.5">{pro.haceDomicilio ? '🏠 A domicilio y local' : '📍 Solo en local'}</p>
                          {descripcionesServicios[esp] && (
                            <p className="text-[11px] text-gray-400 italic mt-0.5">{descripcionesServicios[esp]}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-1 rounded-lg">Activo</span>
                          {preciosServicios[esp] ? (
                            <span className="text-xs font-black text-[#e91e63]">$ {preciosServicios[esp]}</span>
                          ) : (
                            <span className="text-[10px] text-gray-400">sin precio</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-10 text-center">
                      <span className="text-5xl">💅</span>
                      <p className="text-sm text-gray-500">No tienes servicios registrados.</p>
                      <button onClick={() => setEditandoServicios(true)} className="px-6 py-3 bg-gradient-to-r from-pink-400 to-[#e91e63] text-white font-bold text-sm rounded-xl border-none cursor-pointer hover:opacity-90 transition">+ Agregar servicios</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════
              TAB: AGENDA
          ════════════════════════════════ */}
          {activeTab === 'agenda' && (
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-5" style={{boxShadow:'0 4px 24px rgba(233,30,99,0.09)',border:'1px solid rgba(233,30,99,0.08)'}}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 rounded-full" style={{background:'linear-gradient(to bottom,#0288d1,#4fc3f7)'}} />
                  <h2 className="font-black text-gray-900 tracking-tight">Mi Agenda</h2>
                </div>
                <p className="text-xs text-gray-500 mb-4">Toca un día y activa o desactiva las horas disponibles.</p>

                <div className="flex items-center justify-between mb-3">
                  <button type="button" onClick={() => cambiarMes(-1)} className="w-8 h-8 rounded-full border border-pink-100 bg-pink-50 text-[#e91e63] font-bold text-lg cursor-pointer hover:bg-pink-100 transition border-solid">‹</button>
                  <span className="text-sm font-extrabold text-gray-800">{monthLabel(mesAgenda)}</span>
                  <button type="button" onClick={() => cambiarMes(1)} className="w-8 h-8 rounded-full border border-pink-100 bg-pink-50 text-[#e91e63] font-bold text-lg cursor-pointer hover:bg-pink-100 transition border-solid">›</button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase mb-2">
                  {DIAS_SEMANA_CORTO.map(d => <span key={d}>{d}</span>)}
                </div>

                <div className="grid grid-cols-7 gap-1 mb-5">
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
                        className={`relative flex flex-col items-center justify-center min-h-[42px] rounded-xl border text-xs font-semibold transition-all cursor-pointer
                          ${isSelected ? 'border-[#e91e63] bg-[#e91e63] text-white shadow-md' : inMonth ? 'border-pink-100 bg-white text-gray-700 hover:border-pink-300 hover:bg-pink-50' : 'border-transparent bg-transparent text-gray-300'}`}
                      >
                        <span className="leading-none">{date.getDate()}</span>
                        {totalSlots > 0 && (
                          <span className={`text-[8px] font-bold leading-none mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#e91e63]'}`}>{totalSlots}h</span>
                        )}
                      </button>
                    )
                  })}
                </div>

                <div className="border-t border-pink-100 pt-4">
                  <p className="text-xs font-extrabold text-[#e91e63] uppercase tracking-wider mb-1">
                    {DIAS_SEMANA_CORTO[(fechaSeleccionada.getDay() + 6) % 7]} {fechaSeleccionada.getDate()} de {MESES_ES[fechaSeleccionada.getMonth()]}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">Toca para activar/desactivar horas disponibles</p>
                  <div className="flex flex-wrap gap-2">
                    {HORAS_BASE.map(hora => {
                      const active = (disponibilidad[diaSeleccionado] ?? []).includes(hora)
                      return (
                        <button
                          key={hora}
                          type="button"
                          onClick={() => toggleHora(diaSeleccionado, hora)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${active ? 'border-[#e91e63] bg-[#e91e63] text-white shadow-sm' : 'border-pink-100 bg-white text-gray-500 hover:border-pink-300 hover:text-[#e91e63]'}`}
                        >
                          {hora}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Vista semanal */}
              <div className="bg-white rounded-2xl p-5" style={{boxShadow:'0 4px 24px rgba(233,30,99,0.09)',border:'1px solid rgba(233,30,99,0.08)'}}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full" style={{background:'linear-gradient(to bottom,#00897b,#4db6ac)'}} />
                  <h2 className="font-black text-gray-900 tracking-tight">Vista semanal</h2>
                </div>
                <div className="flex flex-col gap-2">
                  {semanaSeleccionada.map(date => {
                    const key = toDateKey(date)
                    const slots = disponibilidad[key] ?? []
                    const isSelected = key === diaSeleccionado
                    return (
                      <div
                        key={key}
                        onClick={() => setDiaSeleccionado(key)}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-[#e91e63] bg-pink-50' : 'border-pink-100 bg-white hover:bg-pink-50/50'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 ${isSelected ? 'bg-[#e91e63] text-white' : 'bg-pink-50 text-gray-600'}`}>
                          <span className="text-[9px] font-bold uppercase leading-none">{DIAS_SEMANA_CORTO[(date.getDay() + 6) % 7]}</span>
                          <span className="text-sm font-extrabold leading-none mt-0.5">{date.getDate()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          {slots.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {slots.slice(0, 5).map(s => (
                                <span key={s} className="text-[10px] px-2 py-0.5 rounded-lg bg-pink-100 text-pink-600 font-semibold">{s}</span>
                              ))}
                              {slots.length > 5 && <span className="text-[10px] px-2 py-0.5 rounded-lg bg-gray-100 text-gray-500 font-semibold">+{slots.length - 5}</span>}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">Sin horarios</span>
                          )}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0 ${slots.length > 0 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                          {slots.length > 0 ? `${slots.length} hrs` : 'Libre'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════
              TAB: INFO / DATOS PERSONALES
          ════════════════════════════════ */}
          {activeTab === 'info' && (
            <div className="bg-white rounded-2xl p-5" style={{boxShadow:'0 4px 24px rgba(233,30,99,0.09)',border:'1px solid rgba(233,30,99,0.08)'}}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full" style={{background:'linear-gradient(to bottom,#455a64,#90a4ae)'}} />
                  <h2 className="font-black text-gray-900 tracking-tight">Mis datos</h2>
                </div>
                {!editandoInfo
                  ? <button onClick={() => setEditandoInfo(true)} className="text-sm font-bold text-[#e91e63] bg-pink-50 border border-pink-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-pink-100 transition border-solid">✏️ Editar</button>
                  : <div className="flex gap-2">
                      <button onClick={handleGuardarInfo} className="text-sm font-bold text-white bg-[#e91e63] px-4 py-2 rounded-xl cursor-pointer hover:opacity-90 transition border-none">Guardar</button>
                      <button onClick={() => setEditandoInfo(false)} className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-200 transition border-none">Cancelar</button>
                    </div>
                }
              </div>

              {editandoInfo ? (
                <div className="flex flex-col gap-3">
                  {[
                    { key: 'nombre', label: 'Nombre', placeholder: 'Tu nombre', type: 'text' },
                    { key: 'apellido', label: 'Apellido', placeholder: 'Tu apellido', type: 'text' },
                    { key: 'telefono', label: 'Teléfono', placeholder: '+56 9 1234 5678', type: 'tel' },
                    { key: 'ciudad', label: 'Ciudad / Comuna', placeholder: 'Providencia', type: 'text' },
                    { key: 'instagram', label: 'Instagram', placeholder: '@tu_usuario', type: 'text' },
                    { key: 'experiencia', label: 'Años de experiencia', placeholder: 'Ej: 3', type: 'number' },
                  ].map(field => (
                    <div key={field.key} className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-500">{field.label}</label>
                      <input
                        type={field.type}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white"
                        value={editForm[field.key as keyof typeof editForm] as string}
                        placeholder={field.placeholder}
                        onChange={e => setEditForm(f => ({ ...f, [field.key]: e.target.value }))}
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500">¿Atiendes a domicilio?</label>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setEditForm(f => ({ ...f, haceDomicilio: true }))} className={`px-4 py-2 rounded-xl border-2 text-sm font-bold cursor-pointer transition-all ${editForm.haceDomicilio ? 'border-[#e91e63] bg-[#e91e63] text-white' : 'border-pink-100 text-gray-600 bg-white hover:border-pink-300'}`}>Sí</button>
                      <button type="button" onClick={() => setEditForm(f => ({ ...f, haceDomicilio: false }))} className={`px-4 py-2 rounded-xl border-2 text-sm font-bold cursor-pointer transition-all ${!editForm.haceDomicilio ? 'border-[#e91e63] bg-[#e91e63] text-white' : 'border-pink-100 text-gray-600 bg-white hover:border-pink-300'}`}>No</button>
                    </div>
                  </div>
                  {editForm.haceDomicilio && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-500">Comunas que cubres</label>
                      <input
                        type="text"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white"
                        value={editForm.comunasDomicilio}
                        placeholder="Ej: Providencia, Las Condes"
                        onChange={e => setEditForm(f => ({ ...f, comunasDomicilio: e.target.value }))}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {[
                    { icon: '🪪', label: 'RUT', value: pro.rut },
                    { icon: '👤', label: 'Nombre completo', value: nombreCompleto },
                    { icon: '📧', label: 'Correo', value: pro.email },
                    { icon: '📱', label: 'Teléfono', value: pro.telefono || '—' },
                    { icon: '📍', label: 'Ciudad', value: pro.ciudad || '—' },
                    { icon: '⏱️', label: 'Experiencia', value: pro.experiencia ? `${pro.experiencia} años` : '—' },
                    { icon: '📸', label: 'Instagram', value: pro.instagram || '—' },
                    { icon: '🏠', label: 'Domicilio', value: pro.haceDomicilio ? `Sí${pro.comunasDomicilio ? ` — ${pro.comunasDomicilio}` : ''}` : 'No' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <span className="text-lg w-8 text-center shrink-0">{item.icon}</span>
                      <div className="min-w-0">
                        <span className="block text-[11px] text-gray-400 font-semibold">{item.label}</span>
                        <span className="block text-sm font-bold text-gray-800 truncate">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleLogout}
                className="w-full mt-5 border-2 border-red-100 text-red-400 font-bold py-3 rounded-xl text-sm cursor-pointer hover:bg-red-50 transition bg-transparent"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM NAV flotante ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{background:'rgba(255,255,255,0.85)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',borderTop:'1px solid rgba(233,30,99,0.10)',boxShadow:'0 -8px 32px rgba(233,30,99,0.12)'}}
      >
        <div className="max-w-[600px] mx-auto flex px-3 py-2 gap-1">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => cambiarTab(tab.key as typeof activeTab)}
              className="flex-1 flex flex-col items-center py-2 rounded-2xl border-none cursor-pointer transition-all"
              style={activeTab === tab.key
                ? {background:'linear-gradient(135deg,rgba(233,30,99,0.12),rgba(194,24,91,0.08))'}
                : {background:'transparent'}}
            >
              <span className="text-xl leading-none" style={{transform: activeTab === tab.key ? 'scale(1.2)' : 'scale(1)',transition:'transform 0.15s'}}>{tab.icon}</span>
              <span className="text-[9px] font-black mt-0.5 tracking-wide" style={{color: activeTab === tab.key ? '#e91e63' : '#bdbdbd'}}>{tab.label.toUpperCase()}</span>
              {activeTab === tab.key && <div className="w-5 h-0.5 rounded-full mt-1" style={{background:'linear-gradient(to right,#e91e63,#f48fb1)'}} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
