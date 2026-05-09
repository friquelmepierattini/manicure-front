'use client'

import React from 'react'
import { useRouter } from 'next/navigation'


interface SalonData {
  tipo: 'salon'
  rutEmpresa: string
  nombreSalon: string
  nombreRepresentante: string
  email: string
  telefono: string
  direccion: string
  ciudad: string
  descripcion: string
  fotoSalon: string | null
  haceDomicilio: boolean
  comunasDomicilio: string
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5 mt-1">
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} className={i <= rating ? 'text-sm text-yellow-400' : 'text-sm text-gray-300'}>★</span>
    ))}
    <span className="text-xs font-bold text-gray-500 ml-1">{rating.toFixed(1)}</span>
  </div>
)

const mockEquipo = [
  { id: 1, nombre: 'Valentina Rivas', especialidad: 'Uñas & Nail Art', rating: 4.9, imagen: 'https://images.unsplash.com/photo-1595777707802-e2e7d1b0d122?w=800&q=90' },
  { id: 2, nombre: 'Camila Ortega', especialidad: 'Cejas & Pestañas', rating: 4.8, imagen: 'https://images.unsplash.com/photo-1599599810694-f3f8f3201f54?w=800&q=90' },
  { id: 3, nombre: 'Sofía Pérez', especialidad: 'Manicura & Pedicura', rating: 4.7, imagen: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=90' },
]

const mockServicios = [
  { nombre: 'Manicura Francesa', duracion: '45 min', precio: '$12.000' },
  { nombre: 'Uñas Acrílicas', duracion: '90 min', precio: '$25.000' },
  { nombre: 'Nail Art', duracion: '60 min', precio: '$18.000' },
  { nombre: 'Pedicura Spa', duracion: '60 min', precio: '$15.000' },
  { nombre: 'Diseño de Cejas', duracion: '30 min', precio: '$8.000' },
]

const mockReseñas = [
  { id: 1, cliente: 'María González', fecha: '14 Abr 2026', rating: 5, comentario: 'Excelente atención, ambiente muy agradable y prolijo. ¡Volveré!' },
  { id: 2, cliente: 'Francisca Torres', fecha: '5 Abr 2026', rating: 5, comentario: 'El mejor salón de la zona, muy profesionales todas.' },
  { id: 3, cliente: 'Ana Ramírez', fecha: '28 Mar 2026', rating: 4, comentario: 'Muy buena atención y precio justo. Recomendado.' },
]

export default function PerfilSalonPage() {
  const router = useRouter()
  const [salon, setSalon] = React.useState<SalonData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState<'inicio' | 'servicios' | 'equipo' | 'info'>('inicio')
  const [editando, setEditando] = React.useState(false)
  const [editForm, setEditForm] = React.useState({ nombreSalon: '', nombreRepresentante: '', telefono: '', direccion: '', ciudad: '', descripcion: '' })

  React.useEffect(() => {
    const stored = localStorage.getItem('mimanicure_user')
    if (!stored) { router.push('/'); return }
    const data = JSON.parse(stored)
    if (data.tipo !== 'salon') { router.push('/'); return }
    setSalon(data as SalonData)
    setEditForm({
      nombreSalon: data.nombreSalon || '',
      nombreRepresentante: data.nombreRepresentante || '',
      telefono: data.telefono || '',
      direccion: data.direccion || '',
      ciudad: data.ciudad || '',
      descripcion: data.descripcion || '',
    })
    setLoading(false)
  }, [router])

  const handleGuardar = () => {
    if (!salon) return
    const updated = { ...salon, ...editForm }
    localStorage.setItem('mimanicure_user', JSON.stringify(updated))
    setSalon(updated)
    setEditando(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('mimanicure_user')
    router.push('/')
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-[#e91e63] font-semibold">
      <div className="w-10 h-10 border-4 border-pink-100 border-t-[#e91e63] rounded-full animate-spin" />
      <p>Cargando tu perfil...</p>
    </div>
  )
  if (!salon) return null

  const inicial = salon.nombreSalon?.[0]?.toUpperCase() || 'S'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#f5f7fa] to-[#f0f3f8]">
      <div className="sticky top-0 z-[100] flex items-center justify-between px-5 py-3.5 bg-white/90 backdrop-blur-md border-b border-pink-100/50 shadow-sm">
        <button className="bg-pink-50 text-[#e91e63] font-bold text-sm px-3 py-1.5 rounded-2xl border-none cursor-pointer hover:bg-pink-100 transition" onClick={() => router.push('/')}>← Inicio</button>
        <span className="font-bold text-gray-800 text-[1.05rem]">Mi Salón</span>
        <button className="text-gray-400 bg-black/5 font-bold text-sm px-3 py-1.5 rounded-2xl border-none cursor-pointer hover:text-[#e91e63] hover:bg-pink-50 transition" onClick={handleLogout}>Salir</button>
      </div>

      <div className="max-w-[680px] mx-auto px-4 pb-20">
        {/* Hero */}
        <div className="relative bg-white rounded-[28px] pt-16 px-6 pb-7 text-center mt-5 shadow-[0_12px_40px_rgba(0,0,0,0.07)] border border-pink-100/30 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[90px] bg-gradient-to-br from-pink-300 via-pink-400 to-[#e91e63]" />
          <div className="relative inline-block mb-3.5">
            <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gradient-to-br from-pink-300 to-[#e91e63] flex items-center justify-center shadow-[0_8px_24px_rgba(233,30,99,0.3)]">
              {salon.fotoSalon
                ? <img src={salon.fotoSalon} alt="Salón" className="w-full h-full object-cover" />
                : <span className="text-3xl font-extrabold text-white">{inicial}</span>
              }
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{salon.nombreSalon}</h1>
          <p className="text-sm text-gray-500 mb-0.5">👤 {salon.nombreRepresentante}</p>
          <p className="text-gray-400 text-sm mb-3">{salon.email}</p>

          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {salon.ciudad && <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-semibold">📍 {salon.ciudad}</span>}
            {salon.direccion && <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-semibold">🏠 {salon.direccion}</span>}
            {salon.telefono && <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-semibold">📱 {salon.telefono}</span>}
          </div>

          <div className="flex flex-wrap gap-2 justify-center mt-2">
            <span className={`text-xs border rounded-full px-3 py-1 font-bold ${!salon.haceDomicilio ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-green-50 text-green-700 border-green-100'}`}>
              🚗 {salon.haceDomicilio ? 'Servicio a domicilio disponible' : 'Solo atención en local'}
            </span>
            {salon.haceDomicilio && salon.comunasDomicilio && (
              <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">🗺️ {salon.comunasDomicilio}</span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white rounded-[18px] p-4 text-center shadow-sm border border-pink-100/30"><span className="block text-2xl font-extrabold text-[#e91e63]">4.9</span><span className="block text-[0.7rem] text-gray-400 uppercase tracking-[0.8px] mt-0.5 font-semibold">Rating</span></div>
          <div className="bg-white rounded-[18px] p-4 text-center shadow-sm border border-pink-100/30"><span className="block text-2xl font-extrabold text-[#e91e63]">{mockServicios.length}</span><span className="block text-[0.7rem] text-gray-400 uppercase tracking-[0.8px] mt-0.5 font-semibold">Servicios</span></div>
          <div className="bg-white rounded-[18px] p-4 text-center shadow-sm border border-pink-100/30"><span className="block text-2xl font-extrabold text-[#e91e63]">{mockEquipo.length}</span><span className="block text-[0.7rem] text-gray-400 uppercase tracking-[0.8px] mt-0.5 font-semibold">Equipo</span></div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-5 bg-white rounded-[18px] p-1.5 shadow-sm">
          {(['inicio', 'servicios', 'equipo', 'info'] as const).map(tab => (
            <button key={tab} className={`flex-1 py-2.5 px-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border-none ${activeTab === tab ? 'bg-gradient-to-r from-[#e91e63] to-pink-400 text-white shadow-md' : 'bg-transparent text-gray-400 hover:text-gray-600'}`} onClick={() => setActiveTab(tab)}>
              {tab === 'inicio' && '🏠'}
              {tab === 'servicios' && '💅'}
              {tab === 'equipo' && '👥'}
              {tab === 'info' && '🏢'}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-5">

          {/* ── INICIO ── */}
          {activeTab === 'inicio' && (
            <>
              {salon.descripcion && (
                <div className="bg-white rounded-[22px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-pink-100/25">
                  <h2 className="text-[1.05rem] text-gray-800 mb-4 font-bold">Sobre el salón</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{salon.descripcion}</p>
                </div>
              )}
              <div className="bg-white rounded-[22px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-pink-100/25">
                <h2 className="text-[1.05rem] text-gray-800 mb-4 font-bold">Reseñas recientes</h2>
                <div className="flex flex-col gap-3">
                  {mockReseñas.map(r => (
                    <div key={r.id} className="border border-pink-50 rounded-2xl p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-300 to-[#e91e63] text-white font-bold text-sm flex items-center justify-center shrink-0">{r.cliente[0]}</div>
                        <div className="flex flex-col flex-1">
                          <strong className="text-sm font-bold text-gray-800">{r.cliente}</strong>
                          <span className="text-xs text-gray-400">{r.fecha}</span>
                        </div>
                        <StarRating rating={r.rating} />
                      </div>
                      <p className="text-sm text-gray-600 italic">{r.comentario}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── SERVICIOS ── */}
          {activeTab === 'servicios' && (
            <div className="bg-white rounded-[22px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-pink-100/25">
              <h2 className="text-[1.05rem] text-gray-800 mb-4 font-bold">Servicios disponibles</h2>
              <div className="flex flex-col gap-2">
                {mockServicios.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border border-pink-50 rounded-xl">
                    <div className="text-xl w-8 text-center shrink-0">💅</div>
                    <div className="flex flex-col flex-1">
                      <strong className="text-sm font-bold text-gray-800">{s.nombre}</strong>
                      <span className="text-xs text-gray-400">⏱️ {s.duracion}</span>
                    </div>
                    <span className="font-bold text-[#e91e63] text-sm ml-auto">{s.precio}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-3 p-4 bg-pink-50/40 rounded-2xl border border-pink-100">
                <div className="text-2xl shrink-0">{salon.haceDomicilio ? '🚗' : '📍'}</div>
                <div>
                  <strong>{salon.haceDomicilio ? 'Servicio a domicilio: Disponible' : 'Solo atención en local'}</strong>
                  {salon.haceDomicilio && salon.comunasDomicilio && <p>Zonas: {salon.comunasDomicilio}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── EQUIPO ── */}
          {activeTab === 'equipo' && (
            <div className="bg-white rounded-[22px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-pink-100/25">
              <h2 className="text-[1.05rem] text-gray-800 mb-4 font-bold">Nuestro equipo</h2>
              <div className="grid grid-cols-3 gap-3">
                {mockEquipo.map(m => (
                  <div key={m.id} className="flex flex-col items-center text-center border border-pink-50 rounded-2xl overflow-hidden">
                    <img src={m.imagen} alt={m.nombre} className="w-full h-28 object-cover" />
                    <div className="p-3 flex flex-col gap-1">
                      <strong className="text-xs font-extrabold text-gray-800">{m.nombre}</strong>
                      <span className="text-[10px] text-gray-400">{m.especialidad}</span>
                      <StarRating rating={m.rating} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── INFO ── */}
          {activeTab === 'info' && (
            <div className="bg-white rounded-[22px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-pink-100/25">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[1.05rem] text-gray-800 mb-4 font-bold">Datos del salón</h2>
                {!editando && <button className="text-xs font-bold text-[#e91e63] bg-pink-50 border border-pink-100 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-pink-100 transition" onClick={() => setEditando(true)}>✏️ Editar</button>}
              </div>

              {editando ? (
                <div className="flex flex-col gap-3">
                  {[
                    { key: 'nombreSalon', label: 'Nombre del Salón', placeholder: 'Beauty Studio' },
                    { key: 'nombreRepresentante', label: 'Representante', placeholder: 'Ana Martínez' },
                    { key: 'telefono', label: 'Teléfono', placeholder: '+56 9 1234 5678' },
                    { key: 'direccion', label: 'Dirección', placeholder: 'Av. Providencia 1234' },
                    { key: 'ciudad', label: 'Ciudad / Comuna', placeholder: 'Providencia' },
                  ].map(f => (
                    <div key={f.key} className="flex flex-col gap-1">
                      <label>{f.label}</label>
                      <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white" value={editForm[f.key as keyof typeof editForm]}
                        placeholder={f.placeholder}
                        onChange={e => setEditForm(ef => ({ ...ef, [f.key]: e.target.value }))}
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1">
                    <label>Descripción</label>
                    <textarea
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition bg-white resize-none"
                      value={editForm.descripcion}
                      placeholder="Cuéntanos sobre tu salón..."
                      onChange={e => setEditForm(ef => ({ ...ef, descripcion: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button className="flex-1 bg-gradient-to-r from-pink-400 to-[#e91e63] text-white font-bold py-3 rounded-xl text-sm border-none cursor-pointer hover:opacity-90 transition" onClick={handleGuardar}>Guardar cambios</button>
                    <button className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl text-sm border-none cursor-pointer hover:bg-gray-200 transition" onClick={() => setEditando(false)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {[
                    { icon: '🏢', label: 'Salón', value: salon.nombreSalon },
                    { icon: '🪪', label: 'RUT Empresa', value: salon.rutEmpresa },
                    { icon: '👤', label: 'Representante', value: salon.nombreRepresentante },
                    { icon: '📧', label: 'Correo', value: salon.email },
                    { icon: '📱', label: 'Teléfono', value: salon.telefono || '—' },
                    { icon: '📍', label: 'Dirección', value: salon.direccion || '—' },
                    { icon: '🏙️', label: 'Ciudad', value: salon.ciudad || '—' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 p-3 bg-pink-50/40 rounded-xl">
                      <div className="text-xl w-8 text-center shrink-0">{item.icon}</div>
                      <div>
                        <span className="block text-xs text-gray-400 font-semibold">{item.label}</span>
                        <span className="block text-sm font-bold text-gray-800">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button className="w-full mt-4 border-2 border-red-100 text-red-400 font-bold py-3 rounded-xl text-sm cursor-pointer hover:bg-red-50 transition bg-transparent" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
