import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { API_BASE_URL, apiFetch } from './api'

describe('apiFetch', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('builds URL correctly when path has no leading slash', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    )
    global.fetch = fetchMock as unknown as typeof fetch

    await apiFetch('health')

    expect(fetchMock).toHaveBeenCalledOnce()
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/health`,
      expect.objectContaining({ method: 'GET' }),
    )
  })

  it('sends JSON body and merges headers', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 1 }), { status: 200 }),
    )
    global.fetch = fetchMock as unknown as typeof fetch

    await apiFetch('/users', {
      method: 'POST',
      body: { name: 'Fran' },
      headers: {
        Authorization: 'Bearer token',
      },
    })

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/users`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Fran' }),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        }),
      }),
    )
  })

  it('throws API error text when response is not ok', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response('Invalid data', { status: 400 }))
    global.fetch = fetchMock as unknown as typeof fetch

    await expect(apiFetch('/users')).rejects.toThrow('Invalid data')
  })

  it('falls back to status message when error response has no body', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('', { status: 500 }))
    global.fetch = fetchMock as unknown as typeof fetch

    await expect(apiFetch('/users')).rejects.toThrow('Request failed with status 500')
  })

  it('forwards RequestInit options and omits body when undefined', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    )
    global.fetch = fetchMock as unknown as typeof fetch

    await apiFetch('/profile', {
      credentials: 'include',
    })

    const [, requestOptions] = fetchMock.mock.calls[0]
    expect(requestOptions).toEqual(
      expect.objectContaining({
        method: 'GET',
        credentials: 'include',
      }),
    )
    expect(requestOptions.body).toBeUndefined()
  })
})
