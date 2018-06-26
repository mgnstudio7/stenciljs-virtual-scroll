const sass = require('@stencil/sass');

exports.config = {
  namespace: 'virtualscroll',
  bundles: [
      {components: ['virtual-scroll'] },
      {components: ['fetch-helper'] }
  ],  
  outputTargets:[
    { 
      type: 'dist' 
    },
    { 
      type: 'www',
      serviceWorker: false
    }
  ],
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
