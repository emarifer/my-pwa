
workbox.core.setCacheNameDetails({prefix: "my-pwa"});

workbox.routing.registerRoute(
  new RegExp('.*\/api\/notes'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'cache-notes'
  })
); // StaleWhileRevalidate

const queue = new workbox.backgroundSync.Queue('myQueueName');

self.addEventListener('fetch', (event) => {
  if (!self.navigator.onLine) {    
    // Clone the request to ensure it's save to read when
    // adding to the Queue.
    if (['POST', 'PUT', 'DELETE'].some(el => event.request.clone().method.includes(el))) {    
      const promiseChain = fetch(event.request.clone())
        .catch((err) => {
            return queue.pushRequest({request: event.request});
        });
    
      event.waitUntil(promiseChain);
    }
  }
});

workbox.core.skipWaiting();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("index.html"));
