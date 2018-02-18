const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    darkflex: './src/index.ts'
  },

  module: {
    loaders: [
        { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },

  output: {
    filename: '[name].umd.js',
    path: path.resolve('./dist'),
    library: 'Darkflex',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],

  resolve: {
    extensions: ['.ts']
  }
};
