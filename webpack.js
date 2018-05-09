var path = require('path')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('index.js'), resolve('node_modules/es6-emitter')]
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ]
};
