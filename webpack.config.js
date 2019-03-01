const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
	},
	module: {
		rules: [
		{
			test: /\.js$/,
			loader: 'babel-loader'
		}, 
		{
			test: /\.scss$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: "css-loader",
					options: {sourceMap: true}
				},
				{
					loader: "postcss-loader",
					options: {sourceMap: true, config: { path: 'src/js/postcss.config.js'}}
				},
				{
					loader: "sass-loader",
					options: {sourceMap: true}
				}
			]
		},
		{
			test: /\.css$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: "css-loader",
					options: {sourceMap: true}
				},
				{
					loader: "postcss-loader",
					options: {sourceMap: true, config: { path: 'src/js/postcss.config.js'}}
				}
			]
		},
		{
	    test: /\.(jpg|png)$/,
      loader: 'file-loader',
      options: {
        name: 'images/[name].[ext]'
      }
		},
		{
	    test: /\.(eot|svg|ttf|woff|woff2)$/,
	    use: [
				{
				  loader: 'file-loader?name=/fonts/[name].[ext]'
				}
    	]
  	},
		{
			test: /\.pug$/,
			loaders: [
				{
					loader: "html-loader"
				},
				{
					loader: "pug-html-loader",
					options: {
						"pretty":true
					}
				}
			]
		}]
	},
	devServer: {
		overlay: true
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css"
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: './src/page/index.pug'
		})
	]
}