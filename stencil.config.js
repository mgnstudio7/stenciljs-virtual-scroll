exports.config = {
  namespace: 'stenciljs-virtual-scroll',
  generateDistribution: true,
  bundles: [
    {
      components: ['virtual-scroll'],
      components: ['fetch-helper']
    }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
