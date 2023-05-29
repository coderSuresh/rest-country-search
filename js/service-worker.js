const cacheName = "cache-v1";

const assetsToCache = [
    "/",
    "/index.html",
    "/details.html",
    "/data.json",
    "/templates/template-country-list.html",
    "/templates/template-region-list.html",
    "/templates/template-country-details.html",
    "/styles/style.css",
    "/js/app.js",
    "/images/ic_globe.png"
];

// Install event: Cache assets
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(assetsToCache);
        })
    );
});

// Activate event: Clean up old caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => { //dependent to above cache name
            return Promise.all(
                cacheNames.filter(name => {
                    // Remove outdated caches
                    return name !== cacheName;
                }).map(name => {
                    return caches.delete(name);
                })
            );
        })
    );
});

// Fetch event: Serve cached assets when offline
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
