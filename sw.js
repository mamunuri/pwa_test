const cacheVariableName = 'my-cache'

// SW life cycle register -> activate -> install
// Install event
self.addEventListener('install', function(event) {
  console.log('service worker: installed');
  event.waitUntil(
    caches.open(cacheVariableName)
    .then(function(cache) {
      cache.addAll([
        'index.html',
        'google_search.html',
        'main.js'
      ]);
    })
    .then(function(){
      self.skipWaiting()
    })
  );
});

// Activate sw
self.addEventListener('activate', function(event) {
  console.log('service worker: Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map( cache => {
          if(cache != cacheVariableName){
            return caches.delete(cache)
          }
        })
      )
    })
  )
});

self.addEventListener('fetch', function(event) {
  console.log('service Worker: Fetching')
  // event.respondWith(caches.match(event.request)
  // .then(function(response) {
  //     if (response) {
  //       return response;
  //     }
  //     return fetch(event.request);
  //   })
  // );
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});


// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       return response || fetch(event.request).then(function(response) {
//         cache.put(event.request, response.clone());
//         return response;
//       });;
//     })
//   );
// });


// var element = ocument.querySelector('.search_link');
// element.addEventListener('click', function(event) {
//   event.preventDefault();
//         alert(urls);

//   caches.open('my-cache').then(function(cache) {
//     fetch('/google_search.html').then(function(response) {
//       return response;
//     }).then(function(urls) {
//       cache.addAll(urls);
//     });
//   });
// });