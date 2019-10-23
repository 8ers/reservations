const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client','dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, // m?js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(css|less)$/,
        use: [{ loader: 'style-loader' }, {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[sha1:hash:hex:4]',
          }
        }],
      },
    ],
  },
  mode: 'development', // change to production for optimized package
};