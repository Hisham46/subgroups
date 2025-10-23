# Create the service worker file
cat > static/sw.js << 'EOF'
const CACHE_NAME = 'sbg-app-v1.0';
const urlsToCache = [
  '/',
  '/static/style.css',
  '/static/script.js',
  '/static/logo.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
EOF