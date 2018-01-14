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
    "revision": "d8590d3cf9365e26af7c13030912907d"
  },
  {
    "url": "build/stenciljs-virtual-scroll/3ijwecof.js",
    "revision": "34f863c6a298fa0a2985d4102c811702"
  },
  {
    "url": "build/stenciljs-virtual-scroll/haz9flny.js",
    "revision": "5a093fe908cd1bb9a6cc2ad78c473ae4"
  },
  {
    "url": "build/stenciljs-virtual-scroll/irjs6jos.js",
    "revision": "5879ff4e7a9b921aae5428c5654e7928"
  },
  {
    "url": "build/stenciljs-virtual-scroll/stenciljs-virtual-scroll.bjqpsrol.js",
    "revision": "0854c41f57b98a075e8d414c86620802"
  },
  {
    "url": "build/stenciljs-virtual-scroll/stenciljs-virtual-scroll.registry.json",
    "revision": "5a1daa49d9287a5f1e503b031892b3c5"
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
    "url": "build/stenciljs-virtual-scroll/vxuarj8x.js",
    "revision": "e96660aef668f2e23d3fe12b99c86998"
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
