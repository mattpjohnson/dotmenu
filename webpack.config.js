const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    darkflex: ['./src/index.ts', './src/styles/styles.scss']
  },

  module: {
    rules: [
      // TypeScript
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader'
        }]
      },

      // Sass
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },

  output: {
    filename: '[name].umd.min.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].min.css'
    })
  ],

  resolve: {
    extensions: ['.ts', '.js']
  }
};
