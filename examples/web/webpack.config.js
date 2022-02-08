const path = require('path')

module.exports = {
  entry: __dirname + "/src",
  mode: 'development',
  output: {
    path: path.join(__dirname, './public/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          { loader: path.resolve('../../index.js') }
        ]
      }
    ]
  },
  optimization: { 
    emitOnErrors: true,
    minimize: false
  },
  cache: false
};