// Service Worker para Mi Manicurista PWA
const CACHE_NAME = 'mi-manicurista-v2'
const urlsToCache = [
  '/',
]

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  const requestUrl = new URL(event.request.url)

  // Never cache cross-origin requests or Next build assets.
  if (
    requestUrl.origin !== self.location.origin ||
    requestUrl.pathname.startsWith('/_next/') ||
    requestUrl.pathname === '/manifest.json'
  ) {
    return
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache hit - return response
      if (response) {
        return response
      }

      return fetch(event.request).then(response => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        // Clone the response
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })

        return response
      }).catch(() => {
        // Return a offline page if needed
        return caches.match('/')
      })
    })
  )
})

// Background sync for future use
self.addEventListener('sync', event => {
  if (event.tag === 'sync-reservations') {
    event.waitUntil(syncReservations())
  }
})

async function syncReservations() {
  // Future implementation for background sync
  console.log('Syncing reservations...')
}
