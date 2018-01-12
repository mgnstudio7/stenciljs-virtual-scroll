/*! Built with http://stenciljs.com */
(function(win, doc, appNamespace, publicPath, appCore, appCoreSsr, appCorePolyfilled, components) {

function init(win, doc, appNamespace, publicPath, appCore, appCoreSsr, appCorePolyfilled, components, x, y) {
    // create global namespace if it doesn't already exist
    (win[appNamespace] = win[appNamespace] || {}).components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}';
        x.setAttribute('data-visibility', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    // get this current script
    // script tag cannot use "async" attribute
    appNamespace = appNamespace.toLowerCase();
    x = doc.scripts[doc.scripts.length - 1];
    if (x && x.src) {
        y = x.src.split('/').slice(0, -1);
        publicPath = (y.join('/')) + (y.length ? '/' : '') + appNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    x.src = publicPath + ((supportsCustomElements(x) && supportsEsModules(win) && supportsFetch(win) && supportsCssVariables(win)) ? (requiresSsrClient(doc) ? appCoreSsr : appCore) : appCorePolyfilled);
    x.setAttribute('data-path', publicPath);
    x.setAttribute('data-namespace', appNamespace);
    doc.head.appendChild(x);
}
function supportsCustomElements(scriptElm) {
    return 'noModule' in scriptElm;
}
function supportsEsModules(win) {
    return win.customElements;
}
function supportsFetch(win) {
    return win.fetch;
}
function supportsCssVariables(win) {
    return (win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'));
}
function requiresSsrClient(doc) {
    return doc.documentElement.hasAttribute('data-ssr');
}


init(win, doc, appNamespace, publicPath, appCore, appCoreSsr, appCorePolyfilled, components);

})(window, document, "stenciljs-virtual-scroll","/build/stenciljs-virtual-scroll/","stenciljs-virtual-scroll.core.js","stenciljs-virtual-scroll.core.ssr.js","es5-build-disabled.js",[["fetch-helper",["fetch-helper",null],1,[["changed",5],["el",7],["list",5],["selector",1,1,2]]],["virtual-scroll",["virtual-scroll",null],1,[["bottomOffset",1,1,4],["changed",5],["clear",6],["el",7],["list",1,1,1],["selector",1,1,2],["setInfinateFinally",6],["setInfinateOn",6]],0,2]]);