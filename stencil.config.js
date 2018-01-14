exports.config = {
  namespace: 'virtualscroll',
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
