const path = require('path')

module.exports = {
  entry: __dirname + "/src",
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          { loader: path.resolve('./loader.js') }
        ]
      }
    ]
  },
  optimization: {     emitOnErrors: true }
};