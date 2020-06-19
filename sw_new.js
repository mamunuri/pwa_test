const cacheVariableName = 'my-cache-new'

// SW life cycle register -> activate -> install
// Install event
self.addEventListener('install', function(event) {
  console.log('service worker: installed');
});

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
    event.respondWith(
				fetch(event.request)
				  .then(res => {
						const resClone = res.clone();
						caches
							.open(cacheVariableName)
							.then(cache =>{
								caches.put(e.request, resClone)
							});
						return res;          
					}).catch(err => caches.match(event.request).then(res => res))
    );
  });