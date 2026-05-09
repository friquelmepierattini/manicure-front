import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    fill,
    priority,
    sizes,
    ...props
  }: {
    src: string | { src: string }
    alt: string
    fill?: boolean
    priority?: boolean
    sizes?: string
  }) => {
    const normalizedSrc = typeof src === 'string' ? src : src.src

    return <img src={normalizedSrc} alt={alt} data-fill={fill} data-priority={priority} data-sizes={sizes} {...props} />
  },
}))

describe('App UI', () => {
  it('renders main sections and featured professionals', () => {
    render(<App />)

    expect(screen.getByText('Siéntete Increíble 💅')).toBeInTheDocument()
    expect(screen.getByText('Profesionales destacados')).toBeInTheDocument()
    expect(screen.getByText('Cómo Funciona')).toBeInTheDocument()

    expect(screen.getByText('Francisca')).toBeInTheDocument()
    expect(screen.getByText('Camila')).toBeInTheDocument()
    expect(screen.getByText('Valentina')).toBeInTheDocument()
    expect(screen.getByText('Sofía')).toBeInTheDocument()
  })

  it('filters gallery items when selecting Uñas', () => {
    const { container } = render(<App />)

    const allItems = container.querySelectorAll('.gallery-item')
    expect(allItems.length).toBe(12)

    fireEvent.click(screen.getByRole('button', { name: /Uñas/i }))

    const filteredItems = container.querySelectorAll('.gallery-item')
    expect(filteredItems.length).toBe(4)

    expect(screen.getByText('Uñas Acrílicas Diseño 1')).toBeInTheDocument()
    expect(screen.queryByText('Cejas Perfectas 1')).not.toBeInTheDocument()
  })

  it('filters gallery items when selecting Cejas', () => {
    const { container } = render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Cejas/i }))

    const filteredItems = container.querySelectorAll('.gallery-item')
    expect(filteredItems.length).toBe(3)

    expect(screen.getByText('Cejas Perfectas 1')).toBeInTheDocument()
    expect(screen.queryByText('Uñas Acrílicas Diseño 1')).not.toBeInTheDocument()
  })
})
