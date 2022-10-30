/* eslint-env node */
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ingress-model-viewer.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: "IMV"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [new ESLintPlugin()],
  devServer: {
    port: 8000,
    static: [
      {}, // will this work?
      {
        directory: path.join(__dirname, 'assets'),
        publicPath: '/assets',
        serveIndex: false,
      },
      {
        directory: path.join(__dirname, 'static'),
        publicPath: '/static',
        serveIndex: false,
      },
      {
        directory: path.join(__dirname, 'manifest'),
        publicPath: '/manifest',
        serveIndex: false,
      }
    ]
  }
};
