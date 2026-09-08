const BASE_PATH = new URL(self.registration.scope).pathname
const CACHE_PREFIX = `doctor-profile:${BASE_PATH}:`
const CACHE = `${CACHE_PREFIX}v1`
const ASSETS = [BASE_PATH]

self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
))

self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
      .map(key => caches.delete(key))
  )).then(() => self.clients.claim())
))

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url)
  if (e.request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(BASE_PATH)) return
  // Live responses keep content current; cached responses support offline visits.
  e.respondWith(fetch(e.request).then(res => {
    if (res.status === 200 && res.type !== 'opaque') {
      const clone = res.clone()
      e.waitUntil(caches.open(CACHE).then(c => c.put(e.request, clone)))
    }
    return res
  }).catch(async () => {
    const cached = await caches.open(CACHE).then(c => c.match(e.request))
    return cached || Response.error()
  }))
})
