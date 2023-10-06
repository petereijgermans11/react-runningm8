//caches
const oldStaticCache = 'STATIC';
const newStaticCache = 'STATIC-v1';
const dynamicCache = 'DYNAMIC';

const staticFiles = [
    './index.html',
    './favicon.ico',
    './logo192.png',
    './logo513.png',
    './manifest.json',
    './offline.html',
    './.htaccess',
    './app.serviceworker.js',
    './static/js/bundle.js'
]
const self = this;

self.addEventListener('install', (installEvent) => {
    console.log('[Service Worker] Installing Service Worker ...', installEvent);
    installEvent.waitUntil(
        caches.open(newStaticCache)
            .then((cache) => {
                cache.addAll(staticFiles);
            })
    );
});

self.addEventListener('activate', (activateEvent) => {
    console.log('[Service Worker] Activating Service Worker ...', activateEvent);
    activateEvent.waitUntil(
        caches.delete(oldStaticCache)
    )
    return self.clients.claim();
});

self.addEventListener('fetch', (fetchEvent) => {
    console.debug(`[Service Worker] Fetching...`, fetchEvent.request);
    const defaultResponseValue = './offline.html';

    const defaultResponse = () => caches.match(defaultResponseValue)
    const resolveUsingCache = () => caches.match(fetchEvent.request)
        .then((cacheResponse) => cacheResponse);
    const addToDynamicCache = (key, value) => caches.open(dynamicCache).then(cache => {
        cache.put(key, value.clone());
        return value.clone();
    });

    // this caching strategu is network first.
    // if the network fails, it will check the static cache.
    // if the static cache fails, the dynamic cache will be tried.
    // if the cache fails, a standard reply will be given.
    fetchEvent.respondWith(
        fetch(fetchEvent.request)
            .then((networkResponse) =>
                addToDynamicCache(fetchEvent.request.url, networkResponse.clone())
            )
            .catch(() => {
                resolveUsingCache()
                    .catch(() =>
                        defaultResponse()
                    )
            })
    )
});
