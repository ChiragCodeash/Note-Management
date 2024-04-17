/* eslint-disable no-restricted-globals */
// src/service-worker.js

import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
} from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

clientsClaim();

precacheAndRoute([...self.__WB_MANIFEST, "manifest.json"]);

// self.skipWaiting();

registerRoute(
  ({ request }) => request.destination === "image",
  new StaleWhileRevalidate({
    cacheName: "images-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  ({ url }) =>
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com",
  new StaleWhileRevalidate({
    cacheName: "fonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);
// registerRoute(
//   ({ request }) => {
//     console.log(request);
//     return true;
//   },
//   new StaleWhileRevalidate({
//     cacheName: "fonts1",
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxEntries: 100,
//         maxAgeSeconds: 30 * 24 * 60 * 60,
//       }),
//     ],
//   })
// );


// var deferredPrompt
// self.addEventListener('beforeinstallprompt', (event) => {
  
//   event.preventDefault();
  
//    deferredPrompt = event;
//    console.log("showInstallPrompt")
  
//   showInstallPrompt();
// });

// function showInstallPrompt() {
//   // console.log("Run")
//   deferredPrompt.prompt();
// }
// // showInstallPrompt()

// let deferredPrompt;
//     self.addEventListener('beforeinstallprompt', (e) => {
//         deferredPrompt = e;
//     });

//     const installApp = self.getElementById('installBtn');
//     installApp.addEventListener('click', async () => {
//       console.log("Run")
//         // if (deferredPrompt !== null) {
//         //     deferredPrompt.prompt();
//         //     const { outcome } = await deferredPrompt.userChoice;
//         //     if (outcome === 'accepted') {
//         //         deferredPrompt = null;
//         //     }
//         // }
//     });