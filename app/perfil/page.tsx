'use client'

import React from 'react'
import { useRouter } from 'next/navigation'


// ─── Tipos ────────────────────────────────────────────────────────────────────
interface UserData {
  nombre: string
  apellido: string
  email: string
  telefono: string
  rut: string
  fotoPerfil?: string
}

interface Manicurista {
  id: number
  nombre: string
  especialidad: string
  rating: number
  imagen: string
  ubicacion: string
  distancia: string
}

interface Servicio {
  id: number
  profesional: string
  servicio: string
  fecha: string
  precio: string
  imagen: string
  rating: number
}

interface Salon {
  id: number
  nombre: string
  direccion: string
  distancia: string
  rating: number
  imagen: string
  disponible: boolean
  servicios: string[]
  horario: string
}

// ─── Datos mock ───────────────────────────────────────────────────────────────
const manicuristasCercanas: Manicurista[] = [
  { id: 1, nombre: 'Francisca Morales', especialidad: 'Uñas Acrílicas & Gel', rating: 4.9, imagen: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90', ubicacion: 'Providencia', distancia: '0.8 km' },
  { id: 2, nombre: 'Camila Vega', especialidad: 'Nail Art & Diseños', rating: 4.8, imagen: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=90', ubicacion: 'Las Condes', distancia: '1.2 km' },
  { id: 3, nombre: 'Valentina Rivas', especialidad: 'Manicura & Pedicura', rating: 4.9, imagen: 'https://images.unsplash.com/photo-1595777707802-e2e7d1b0d122?w=800&q=90', ubicacion: 'Ñuñoa', distancia: '2.1 km' },
  { id: 4, nombre: 'Sofía Castillo', especialidad: 'Cejas & Pestañas', rating: 4.7, imagen: 'https://images.unsplash.com/photo-1599599810694-f3f8f3201f54?w=800&q=90', ubicacion: 'Santiago Centro', distancia: '2.8 km' },
]

const salonesCercanos: Salon[] = [
  { id: 1, nombre: 'Beauty House Providencia', direccion: 'Av. Providencia 1234', distancia: '0.6 km', rating: 4.9, imagen: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=90', disponible: true, servicios: ['Manicura', 'Pedicura', 'Uñas Gel'], horario: 'Hoy hasta 20:00' },
  { id: 2, nombre: 'Nails & Spa Las Condes', direccion: 'El Bosque Norte 500', distancia: '1.1 km', rating: 4.8, imagen: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=90', disponible: true, servicios: ['Nail Art', 'Acrílicas', 'Depilación'], horario: 'Hoy hasta 19:00' },
  { id: 3, nombre: 'Glamour Studio Ñuñoa', direccion: 'Irarrázaval 2100', distancia: '1.9 km', rating: 4.7, imagen: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=90', disponible: false, servicios: ['Cejas', 'Pestañas', 'Manicura'], horario: 'Abre mañana 10:00' },
  { id: 4, nombre: 'Pink Nails Ñuñoa', direccion: 'Av. Ossa 890', distancia: '2.3 km', rating: 4.6, imagen: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=90', disponible: true, servicios: ['Pedicura', 'Uñas Gel', 'Manicura'], horario: 'Hoy hasta 21:00' },
]

const historialServicios: Servicio[] = [
  { id: 1, profesional: 'Francisca Morales', servicio: 'Uñas Acrílicas con Diseño', fecha: '12 Abr 2026', precio: '$18.000', imagen: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90', rating: 5 },
  { id: 2, profesional: 'Camila Vega', servicio: 'Manicura Francesa', fecha: '28 Mar 2026', precio: '$12.000', imagen: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=90', rating: 4 },
  { id: 3, profesional: 'Valentina Rivas', servicio: 'Pedicura Spa', fecha: '10 Mar 2026', precio: '$15.000', imagen: 'https://images.unsplash.com/photo-1595777707802-e2e7d1b0d122?w=800&q=90', rating: 5 },
]

// ─── Componentes ──────────────────────────────────────────────────────────────
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5 mt-1">
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} className={i <= rating ? 'text-sm text-yellow-400' : 'text-sm text-gray-300'}>★</span>
    ))}
    <span className="text-xs font-bold text-gray-500 ml-1">{rating.toFixed(1)}</span>
  </div>
)

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser] = React.useState<UserData | null>(null)
  const [ubicacion, setUbicacion] = React.useState<{ lat: number; lng: number; ciudad: string } | null>(null)
  const [loadingUbicacion, setLoadingUbicacion] = React.useState(false)
  const [errorUbicacion, setErrorUbicacion] = React.useState('')
  const [fotoPreview, setFotoPreview] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState<'inicio' | 'historial' | 'info'>('inicio')
  const [editando, setEditando] = React.useState(false)
  const [editForm, setEditForm] = React.useState({ nombre: '', apellido: '', telefono: '' })

  // Cargar usuario desde localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem('mimanicure_user')
    if (!stored) {
      router.push('/')
      return
    }
    const data: UserData = JSON.parse(stored)
    setUser(data)
    setEditForm({ nombre: data.nombre, apellido: data.apellido, telefono: data.telefono || '' })
    if (data.fotoPerfil) setFotoPreview(data.fotoPerfil)
  }, [router])

  const handleObtenerUbicacion = () => {
    setLoadingUbicacion(true)
    setErrorUbicacion('')
    if (!navigator.geolocation) {
      setErrorUbicacion('Tu navegador no soporta geolocalización.')
      setLoadingUbicacion(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setUbicacion({ lat: latitude, lng: longitude, ciudad: 'Tu ubicación actual' })
        setLoadingUbicacion(false)
      },
      () => {
        setErrorUbicacion('No se pudo obtener tu ubicación. Verifica los permisos.')
        setLoadingUbicacion(false)
      }
    )
  }

  const handleFotoPerfil = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    const url = URL.createObjectURL(file)
    setFotoPreview(url)
    const updated = { ...user, fotoPerfil: url }
    setUser(updated)
    localStorage.setItem('mimanicure_user', JSON.stringify(updated))
  }

  const handleGuardarEdicion = () => {
    if (!user) return
    const updated = { ...user, ...editForm }
    setUser(updated)
    localStorage.setItem('mimanicure_user', JSON.stringify(updated))
    setEditando(false)
  }

  const handleCerrarSesion = () => {
    localStorage.removeItem('mimanicure_user')
    router.push('/')
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 text-[#e91e63] font-semibold">
        <div className="w-10 h-10 border-4 border-pink-100 border-t-[#e91e63] rounded-full animate-spin"></div>
        <p>Cargando perfil...</p>
      </div>
    )
  }

  const iniciales = `${user.nombre?.[0] ?? ''}${user.apellido?.[0] ?? ''}`.toUpperCase()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#f5f7fa] to-[#f0f3f8]">
      {/* ─── TOP BAR ─── */}
      <header className="sticky top-0 z-[100] flex items-center justify-between px-5 py-3.5 bg-white/90 backdrop-blur-md border-b border-pink-100/50 shadow-sm">
        <button className="bg-pink-50 text-[#e91e63] font-bold text-sm px-3 py-1.5 rounded-2xl border-none cursor-pointer hover:bg-pink-100 transition" onClick={() => router.push('/')}>
          ← Inicio
        </button>
        <span className="font-bold text-gray-800 text-[1.05rem]">Mi Perfil</span>
        <button className="text-gray-400 bg-black/5 font-bold text-sm px-3 py-1.5 rounded-2xl border-none cursor-pointer hover:text-[#e91e63] hover:bg-pink-50 transition" onClick={handleCerrarSesion}>
          Salir
        </button>
      </header>

      <div className="max-w-[680px] mx-auto px-4 pb-20">

        {/* ─── HERO CARD ─── */}
        <div className="relative bg-white rounded-[28px] pt-16 px-6 pb-7 text-center mt-5 shadow-[0_12px_40px_rgba(0,0,0,0.07)] border border-pink-100/30 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[90px] bg-gradient-to-br from-pink-300 via-pink-400 to-[#e91e63]"></div>
          <div className="relative inline-block mb-3.5">
            <div className="group relative w-24 h-24 rounded-full border-4 border-white overflow-hidden cursor-pointer bg-gradient-to-br from-pink-300 to-[#e91e63] flex items-center justify-center shadow-[0_8px_24px_rgba(233,30,99,0.3)] hover:scale-[1.04] transition-transform" onClick={() => document.getElementById('avatar-input')?.click()}>
              {fotoPreview
                ? <img src={fotoPreview} alt="Foto perfil" className="w-full h-full object-cover" />
                : <span className="text-3xl font-extrabold text-white">{iniciales}</span>
              }
              <div className="absolute inset-0 bg-black/45 flex items-center justify-center text-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full">📷</div>
            </div>
            <input id="avatar-input" type="file" accept="image/*" onChange={handleFotoPerfil} className="hidden" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.nombre} {user.apellido}</h1>
          <p className="text-gray-400 text-sm mb-3.5">{user.email}</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <span className="bg-pink-50 text-[#e91e63] border border-pink-100 rounded-full px-3.5 py-1 text-xs font-bold">💖 Cliente</span>
            <span className="bg-yellow-50 text-yellow-500 border border-yellow-100 rounded-full px-3.5 py-1 text-xs font-bold">⭐ Verificada</span>
          </div>
        </div>

        {/* ─── STATS ─── */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white rounded-[18px] p-4 text-center shadow-sm border border-pink-100/30">
            <span className="block text-2xl font-extrabold text-[#e91e63]">3</span>
            <span className="block text-[0.7rem] text-gray-400 uppercase tracking-[0.8px] mt-0.5 font-semibold">Servicios</span>
          </div>
          <div className="bg-white rounded-[18px] p-4 text-center shadow-sm border border-pink-100/30">
            <span className="block text-2xl font-extrabold text-[#e91e63]">4.9</span>
            <span className="block text-[0.7rem] text-gray-400 uppercase tracking-[0.8px] mt-0.5 font-semibold">Mi rating</span>
          </div>
          <div className="bg-white rounded-[18px] p-4 text-center shadow-sm border border-pink-100/30">
            <span className="block text-2xl font-extrabold text-[#e91e63]">2</span>
            <span className="block text-[0.7rem] text-gray-400 uppercase tracking-[0.8px] mt-0.5 font-semibold">Favoritas</span>
          </div>
        </div>

        {/* ─── TABS ─── */}
        <div className="flex gap-2 mt-5 bg-white rounded-[18px] p-1.5 shadow-sm">
          <button className={`flex-1 py-2.5 px-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border-none ${activeTab === 'inicio' ? 'bg-gradient-to-r from-[#e91e63] to-pink-400 text-white shadow-md' : 'bg-transparent text-gray-400 hover:text-gray-600'}`} onClick={() => setActiveTab('inicio')}>🏠 Inicio</button>
          <button className={`flex-1 py-2.5 px-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border-none ${activeTab === 'historial' ? 'bg-gradient-to-r from-[#e91e63] to-pink-400 text-white shadow-md' : 'bg-transparent text-gray-400 hover:text-gray-600'}`} onClick={() => setActiveTab('historial')}>📋 Historial</button>
          <button className={`flex-1 py-2.5 px-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border-none ${activeTab === 'info' ? 'bg-gradient-to-r from-[#e91e63] to-pink-400 text-white shadow-md' : 'bg-transparent text-gray-400 hover:text-gray-600'}`} onClick={() => setActiveTab('info')}>👤 Mis datos</button>
        </div>

        {/* ══════════════════════════════════════════ */}
        {/* TAB: INICIO                                 */}
        {/* ══════════════════════════════════════════ */}
        {activeTab === 'inicio' && (
          <div className="mt-5 flex flex-col gap-5">

            {/* Último servicio */}
            <section className="bg-white rounded-[22px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-pink-100/25">
              <h2 className="text-[1.05rem] text-gray-800 mb-4 font-bold">✨ Último servicio</h2>
              <div className="flex gap-4 items-start">
                <img src={historialServicios[0].imagen} alt={historialServicios[0].servicio} className="w-[90px] h-[90px] rounded-2xl object-cover shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-800 mb-1.5">{historialServicios[0].servicio}</h3>
                  <p className="text-xs text-gray-500 my-0.5">👩 {historialServicios[0].profesional}</p>
                  <p className="text-xs text-gray-500 my-0.5">📅 {historialServicios[0].fecha}</p>
                  <p className="text-xs text-[#e91e63] font-bold my-0.5">💰 {historialServicios[0].precio}</p>
                  <StarRating rating={historialServicios[0].rating} />
                </div>
              </div>
            </section>

            {/* Ubicación */}
            <section className="bg-white rounded-[22px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-pink-100/25">
              <h2 className="text-[1.05rem] text-gray-800 mb-4 font-bold">📍 Mi Ubicación</h2>
              {!ubicacion ? (
                <div className="flex flex-col items-center gap-2.5 py-5 text-center">
                  <span className="text-4xl">🗺️</span>
                  <p>Activa tu ubicación para encontrar profesionales cercanas</p>
                  {errorUbicacion && <p className="text-[#e91e63] text-xs font-semibold">{errorUbicacion}</p>}
                  <button className="mt-2 px-6 py-3 bg-gradient-to-r from-[#e91e63] to-pink-400 text-white font-bold text-sm rounded-full border-none cursor-pointer shadow-[0_6px_20px_rgba(233,30,99,0.28)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed" onClick={handleObtenerUbicacion} disabled={loadingUbicacion}>
                    {loadingUbicacion ? '📡 Obteniendo...' : '📍 Obtener mi ubicación'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="rounded-2xl overflow-hidden">
                    <iframe
                      title="Mi ubicación"
                      width="100%"
                      height="220"
                      className="border-0 rounded-2xl"
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${ubicacion.lng - 0.01},${ubicacion.lat - 0.01},${ubicacion.lng + 0.01},${ubicacion.lat + 0.01}&layer=mapnik&marker=${ubicacion.lat},${ubicacion.lng}`}
                    ></iframe>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                    <span>📍 {ubicacion.ciudad}</span>
                    <span className="text-[10px] text-gray-400">Lat: {ubicacion.lat.toFixed(4)}, Lng: {ubicacion.lng.toFixed(4)}</span>
                  </div>
                  <button className="self-start mt-1 px-4 py-2 bg-gradient-to-r from-[#e91e63] to-pink-400 text-white font-bold text-xs rounded-full border-none cursor-pointer hover:-translate-y-0.5 transition-all" onClick={handleObtenerUbicacion}>
                    🔄 Actualizar
                  </button>
                </div>
              )}
            </section>

            {/* Salones cercanos */}
            {ubicacion && (
              <section className="bg-white rounded-[22px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-pink-100/25">
                <h2 className="text-[1.05rem] text-gray-800 mb-4 font-bold">🏪 Salones cercanos</h2>
                <p className="text-xs text-gray-400 mb-4 -mt-3">Disponibles ahora cerca tuyo</p>
                <div className="flex flex-col gap-3">
                  {salonesCercanos.map(s => (
                    <div key={s.id} className={`border border-pink-100 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md ${!s.disponible ? 'opacity-60' : ''}`}>
                      <div className="relative">
                        <img src={s.imagen} alt={s.nombre} className="w-full h-40 object-cover" />
                        <span className={`absolute top-2 left-2 text-[10px] font-bold px-2.5 py-1 rounded-full ${s.disponible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {s.disponible ? '✅ Disponible' : '⏸ No disponible'}
                        </span>
                        <span className="absolute top-2 right-2 bg-white/90 text-gray-700 text-[10px] font-bold px-2 py-1 rounded-full">{s.distancia}</span>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-extrabold text-gray-800 mb-1">{s.nombre}</h3>
                        <p className="text-xs text-gray-500 mb-0.5">📍 {s.direccion}</p>
                        <p className="text-xs text-gray-500 mb-0.5">🕐 {s.horario}</p>
                        <div className="flex flex-wrap gap-1 my-2">
                          {s.servicios.map(sv => (
                            <span key={sv} className="text-[10px] font-bold bg-pink-50 text-pink-500 px-2 py-0.5 rounded-lg">{sv}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <StarRating rating={s.rating} />
                          {s.disponible && (
                            <button className="text-xs font-bold bg-gradient-to-r from-pink-300 to-[#e91e63] text-white px-3 py-1.5 rounded-xl border-none cursor-pointer hover:opacity-85 transition">Reservar</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Profesionales cercanas */}
            <section className="bg-white rounded-[22px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-pink-100/25">
              <h2 className="text-[1.05rem] text-gray-800 mb-4 font-bold">💅 Profesionales cercanas</h2>
              <div className="grid grid-cols-2 gap-3">
                {manicuristasCercanas.map(m => (
                  <div key={m.id} className="border border-pink-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                    <div className="relative">
                      <img src={m.imagen} alt={m.nombre} className="w-full h-36 object-cover" />
                      <span className="absolute bottom-2 right-2 bg-white/90 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{m.distancia}</span>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-extrabold text-gray-800 mb-0.5">{m.nombre}</h3>
                      <p className="text-[10px] text-gray-400 mb-1.5">{m.especialidad}</p>
                      <div className="flex items-center justify-between">
                        <StarRating rating={m.rating} />
                        <button className="text-[10px] font-bold bg-gradient-to-r from-pink-300 to-[#e91e63] text-white px-2.5 py-1 rounded-lg border-none cursor-pointer">Reservar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ══════════════════════════════════════════ */}
        {/* TAB: HISTORIAL                             */}
        {/* ══════════════════════════════════════════ */}
        {activeTab === 'historial' && (
          <div className="mt-5 flex flex-col gap-5">
            <section className="bg-white rounded-[22px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-pink-100/25">
              <h2 className="text-[1.05rem] text-gray-800 mb-4 font-bold">📋 Historial de Servicios</h2>
              <div className="flex flex-col gap-3">
                {historialServicios.map(s => (
                  <div key={s.id} className="flex gap-3 items-start border border-pink-50 rounded-2xl p-3">
                    <img src={s.imagen} alt={s.servicio} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-800 mb-1">{s.servicio}</h3>
                      <p className="text-xs text-gray-400 my-0.5">👩 {s.profesional}</p>
                      <p className="text-xs text-gray-400 my-0.5">📅 {s.fecha}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-bold text-[#e91e63]">{s.precio}</span>
                        <StarRating rating={s.rating} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ══════════════════════════════════════════ */}
        {/* TAB: MIS DATOS                             */}
        {/* ══════════════════════════════════════════ */}
        {activeTab === 'info' && (
          <div className="mt-5 flex flex-col gap-5">
            <section className="bg-white rounded-[22px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-pink-100/25">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[1.05rem] text-gray-800 mb-4 font-bold">👤 Información Personal</h2>
                {!editando && (
                  <button className="text-xs font-bold text-[#e91e63] bg-pink-50 border border-pink-100 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-pink-100 transition" onClick={() => setEditando(true)}>✏️ Editar</button>
                )}
              </div>

              {editando ? (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500">Nombre</label>
                    <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white" value={editForm.nombre} onChange={e => setEditForm(f => ({ ...f, nombre: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500">Apellido</label>
                    <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white" value={editForm.apellido} onChange={e => setEditForm(f => ({ ...f, apellido: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500">Teléfono</label>
                    <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white" value={editForm.telefono} onChange={e => setEditForm(f => ({ ...f, telefono: e.target.value }))} />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button className="flex-1 bg-gradient-to-r from-pink-400 to-[#e91e63] text-white font-bold py-3 rounded-xl text-sm border-none cursor-pointer hover:opacity-90 transition" onClick={handleGuardarEdicion}>Guardar</button>
                    <button className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl text-sm border-none cursor-pointer hover:bg-gray-200 transition" onClick={() => setEditando(false)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-3 bg-pink-50/40 rounded-xl">
                    <span className="text-xl w-8 text-center shrink-0">🪪</span>
                    <div>
                      <span className="block text-xs text-gray-400 font-semibold">RUT</span>
                      <span className="block text-sm font-bold text-gray-800">{user.rut}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50/40 rounded-xl">
                    <span className="text-xl w-8 text-center shrink-0">👤</span>
                    <div>
                      <span className="block text-xs text-gray-400 font-semibold">Nombre completo</span>
                      <span className="block text-sm font-bold text-gray-800">{user.nombre} {user.apellido}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50/40 rounded-xl">
                    <span className="text-xl w-8 text-center shrink-0">📧</span>
                    <div>
                      <span className="block text-xs text-gray-400 font-semibold">Correo electrónico</span>
                      <span className="block text-sm font-bold text-gray-800">{user.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50/40 rounded-xl">
                    <span className="text-xl w-8 text-center shrink-0">📱</span>
                    <div>
                      <span className="block text-xs text-gray-400 font-semibold">Teléfono</span>
                      <span className="block text-sm font-bold text-gray-800">{user.telefono || '—'}</span>
                    </div>
                  </div>
                  {ubicacion && (
                    <div className="flex items-center gap-3 p-3 bg-pink-50/40 rounded-xl">
                      <span className="text-xl w-8 text-center shrink-0">📍</span>
                      <div>
                        <span className="block text-xs text-gray-400 font-semibold">Ubicación actual</span>
                        <span className="block text-sm font-bold text-gray-800">{ubicacion.ciudad} ({ubicacion.lat.toFixed(3)}, {ubicacion.lng.toFixed(3)})</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            <button className="w-full mt-4 border-2 border-red-100 text-red-400 font-bold py-3 rounded-xl text-sm cursor-pointer hover:bg-red-50 transition bg-transparent" onClick={handleCerrarSesion}>
              🚪 Cerrar sesión
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
