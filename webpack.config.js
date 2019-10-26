const path = require('path');
const BrotliPlugin = require('brotli-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const prodPlugins = [
  new CompressionPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.7
    }),
	new BrotliPlugin({
		asset: '[path].br[query]',
		test: /\.(js|css|html|svg)$/,
		threshold: 10240,
		minRatio: 0.8
	}),
	new UglifyJsPlugin({
		cache: true,
		parallel: true,
		sourceMap: true
	})
];
/**
 * Merging plugins on the basis of env
 */
const pluginList = prodPlugins;

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
  mode: 'production', // change to production for optimized package
  plugins: pluginList,
};