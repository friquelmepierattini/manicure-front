import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Page from './page'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

// Leaflet is required dynamically inside a useEffect — stub to avoid DOM errors in jsdom
vi.mock('leaflet', () => {
  const addTo = vi.fn()
  const map = vi.fn(() => ({
    setView: vi.fn().mockReturnThis(),
    remove: vi.fn(),
  }))
  const tileLayer = vi.fn(() => ({ addTo }))
  const divIcon = vi.fn()
  const marker = vi.fn(() => ({
    addTo: vi.fn().mockReturnThis(),
    bindPopup: vi.fn().mockReturnThis(),
    openPopup: vi.fn().mockReturnThis(),
    on: vi.fn().mockReturnThis(),
  }))
  return { default: { map, tileLayer, divIcon, marker } }
})

describe('Page (Home)', () => {
  beforeEach(() => {
    localStorage.clear()
    mockPush.mockClear()
  })

  it('renders branding header and tagline', () => {
    render(<Page />)
    expect(screen.getByText('Tu belleza, a tu manera 💅')).toBeInTheDocument()
    expect(screen.getByText('Encuentra tu manicurista ideal en Chile')).toBeInTheDocument()
  })

  it('redirects salon users to profile route after successful login', async () => {
    localStorage.setItem('mimanicure_user', JSON.stringify({
      tipo: 'salon',
      email: 'salon@test.com',
      password: 'clave123',
    }))

    render(<Page />)

    fireEvent.click(screen.getByText('Soy Salón'))
    fireEvent.change(screen.getByPlaceholderText('tu@correo.com'), {
      target: { value: 'salon@test.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Tu contraseña'), {
      target: { value: 'clave123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/perfil-salon')
    })
  })

  it('renders the three role option cards', () => {
    render(<Page />)
    expect(screen.getByText('Soy Manicurista')).toBeInTheDocument()
    expect(screen.getAllByText('Soy Cliente').length).toBeGreaterThan(0)
    expect(screen.getByText('Soy Salón')).toBeInTheDocument()
  })

  it('opens login modal with email form when clicking "Soy Cliente" card', () => {
    render(<Page />)
    // The option cards are rendered before any modal. Click the first match.
    fireEvent.click(screen.getAllByText('Soy Cliente')[0])
    expect(screen.getByPlaceholderText('tu@correo.com')).toBeInTheDocument()
  })

  it('shows login tipo selector when clicking "Soy Manicurista" card', () => {
    render(<Page />)
    fireEvent.click(screen.getByText('Soy Manicurista'))
    // When initialTipo is set the form renders directly; verify with the header label
    expect(screen.getByText('Inicia Sesión')).toBeInTheDocument()
  })
})
