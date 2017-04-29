const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  devtool: 'source-map',

  entry: './src/app.tsx',
  output: {
    // filename: 'dist/bundle.js',
    // path: __dirname
    filename: '../api/wwwroot/scripts/bundle.js',
    path: __dirname
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
      new CheckerPlugin()
  ]
};