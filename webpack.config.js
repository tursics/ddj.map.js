const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ddj.map.js',
	library: 'ddj',
	libraryTarget: 'umd',
	globalObject: 'this',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
	  {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
		  MiniCssExtractPlugin.loader,
		  'css-loader'
		],
      },
	  {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
  plugins: [
 	new MiniCssExtractPlugin({
	  filename: 'ddj.map.css',
	  chunkFilename: 'ddj.map.async.css'
    })
  ],
};
