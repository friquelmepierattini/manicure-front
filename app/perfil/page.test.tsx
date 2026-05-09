import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import PerfilPage from './page'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('PerfilPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockPush.mockClear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('shows loading state and redirects when no user in localStorage', () => {
    render(<PerfilPage />)
    expect(screen.getByText('Cargando perfil...')).toBeInTheDocument()
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('renders user name and email when user data is stored', () => {
    const user = {
      nombre: 'Valentina',
      apellido: 'Rivas',
      email: 'valentina@test.com',
      telefono: '+56912345678',
      rut: '12.345.678-9',
    }
    localStorage.setItem('mimanicure_user', JSON.stringify(user))

    render(<PerfilPage />)

    expect(screen.getByText('Valentina Rivas')).toBeInTheDocument()
    expect(screen.getByText('valentina@test.com')).toBeInTheDocument()
  })

  it('shows "Mi Perfil" header when user is loaded', () => {
    const user = {
      nombre: 'Camila',
      apellido: 'Vega',
      email: 'camila@test.com',
      telefono: '',
      rut: '11.111.111-1',
    }
    localStorage.setItem('mimanicure_user', JSON.stringify(user))

    render(<PerfilPage />)

    expect(screen.getByText('Mi Perfil')).toBeInTheDocument()
  })

  it('clears local session and redirects when logging out', async () => {
    const user = {
      nombre: 'Sara',
      apellido: 'Lagos',
      email: 'sara@test.com',
      telefono: '+56912345678',
      rut: '10.123.456-7',
    }
    localStorage.setItem('mimanicure_user', JSON.stringify(user))

    render(<PerfilPage />)
    fireEvent.click(screen.getByText('Salir'))

    await waitFor(() => {
      expect(localStorage.getItem('mimanicure_user')).toBeNull()
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })
})
