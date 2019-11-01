const path = require('path')

module.exports = {
  entry: {
    dotmenu: ['./src/index.ts'],
  },

  module: {
    rules: [
      // TypeScript
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },

  output: {
    filename: 'dotmenu.umd.min.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },
}
