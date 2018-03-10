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
    filename: '[name].umd.js',
    path: path.resolve('./dist'),
    library: 'Darkflex',
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
