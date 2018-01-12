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
    "revision": "05937c83780017174846844f38e224b8"
  },
  {
    "url": "build/stenciljs-virtual-scroll/aw3ck9c6.js",
    "revision": "ee3146e4c9e60a206192b572764636b6"
  },
  {
    "url": "build/stenciljs-virtual-scroll/b7yav49s.js",
    "revision": "d4b52f61f51b4345dac985437e04f69f"
  },
  {
    "url": "build/stenciljs-virtual-scroll/li2jcedb.js",
    "revision": "697a89ef2b1b54cf1f99110d126d3f51"
  },
  {
    "url": "build/stenciljs-virtual-scroll/nhucaj7p.js",
    "revision": "05d3e6d0c4c773b38da9c3a2a38770b1"
  },
  {
    "url": "build/stenciljs-virtual-scroll/stenciljs-virtual-scroll.bjqpsrol.js",
    "revision": "0854c41f57b98a075e8d414c86620802"
  },
  {
    "url": "build/stenciljs-virtual-scroll/stenciljs-virtual-scroll.registry.json",
    "revision": "1b514f151fa18d06d85b39d057bfce0a"
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
