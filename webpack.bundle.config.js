/* eslint-env node */
const baseConfig = require('./webpack.config');

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: 'ingress-model-viewer.min.js',
    libraryTarget: 'var',
    library: "IMV"
  }
};
