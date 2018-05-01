


var staticCacheName = 'wittr-static-v2';
self.addEventListener('fetch', function(event){
  // if (event.request.url.indexOf('https://maps.googleapi.com/map/api/js') == 0) {
  //   event.respondWith(
  //      fetch(event.request)
  //     // Handle Maps API requests in a generic fashion,
  //     // by returning a Promise that resolves to a Response.
  //   );
  // }else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  // }


});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
        '/data/restaurants.json',
        '/css/styles.css',
        'restaurant.html',
        'index.html',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
            cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
