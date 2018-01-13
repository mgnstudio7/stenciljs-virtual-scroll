importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "build/stenciljs-virtual-scroll.js",
    "revision": "1a4fdab864239680bcdbe02c471dc745"
  },
  {
    "url": "build/stenciljs-virtual-scroll/4t3xd1zx.js",
    "revision": "a92abc428b3fed02b4eedc3ebc0e1864"
  },
  {
    "url": "build/stenciljs-virtual-scroll/f3hcuaru.js",
    "revision": "67e1eb63e01dc600041fe4fdf63c5af2"
  },
  {
    "url": "build/stenciljs-virtual-scroll/njqhnrkj.js",
    "revision": "b71c4f83cf43933e7544a25bd75f41c2"
  },
  {
    "url": "build/stenciljs-virtual-scroll/stenciljs-virtual-scroll.bjqpsrol.js",
    "revision": "0854c41f57b98a075e8d414c86620802"
  },
  {
    "url": "build/stenciljs-virtual-scroll/stenciljs-virtual-scroll.registry.json",
    "revision": "a6ed0eed5143ddaae6eece76c82091de"
  },
  {
    "url": "build/stenciljs-virtual-scroll/stenciljs-virtual-scroll.sacmdr8j.js",
    "revision": "5f971ec91da4848c1a184d890fa46b43"
  },
  {
    "url": "build/stenciljs-virtual-scroll/stenciljs-virtual-scroll.x1oygtuo.js",
    "revision": "da6395206d70089b4de616a3ed5fe3b6"
  },
  {
    "url": "build/stenciljs-virtual-scroll/t9uwjdky.js",
    "revision": "530454f78371803fe4d29c0c5bf23187"
  },
  {
    "url": "index.html",
    "revision": "a0a433b083e00ce7e768c7f307d2c8fa"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
