/* eslint-env node */
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'ingress-model-viewer.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ingress-model-viewer.js',
    libraryTarget: 'var',
    library: "IMV"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "eslint-loader",
        options: {}
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname),
    port: 8080,
    publicPath: '/dist/'
  }
};
