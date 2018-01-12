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
    "revision": "0bd14f99fef239c373f92acf447602a3"
  },
  {
    "url": "build/stenciljs-virtual-scroll/3dsgnxr2.js",
    "revision": "0fa1444a397c6525bd5fcdb0d59358d0"
  },
  {
    "url": "build/stenciljs-virtual-scroll/epjcf49k.js",
    "revision": "4e73f8fe8ee5c43ccd4a782c478381ba"
  },
  {
    "url": "build/stenciljs-virtual-scroll/lezc9ayl.js",
    "revision": "2c54edbcff476df9f5b834f667700876"
  },
  {
    "url": "build/stenciljs-virtual-scroll/pzpgznqs.js",
    "revision": "d5b37c9908193301b544dd5cca675b64"
  },
  {
    "url": "build/stenciljs-virtual-scroll/stenciljs-virtual-scroll.bjqpsrol.js",
    "revision": "0854c41f57b98a075e8d414c86620802"
  },
  {
    "url": "build/stenciljs-virtual-scroll/stenciljs-virtual-scroll.registry.json",
    "revision": "84eecf0f9f747ce36f2d7f5e68e7a46d"
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
    "url": "index.html",
    "revision": "a0a433b083e00ce7e768c7f307d2c8fa"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
