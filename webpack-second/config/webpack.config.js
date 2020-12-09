const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	mode: 'production',
	entry: {
		index: './src/index.js',
		product: './src/product.js'
	},
	output: {
		path: path.resolve(__dirname, '../dist/'),
		// filename:'bundle.js'
		filename: '[name].js' //[name][hash]hash码 入口文件如果被
	},
	devServer:{
		contentBase:path.join(__dirname,"dist"),
		compress:true,
		port:9000,
		open:true
	},
	module: {
		rules: [{
				//匹配规则
				test: /\.css$/,
				//使用loader
				use: [
					// {loader: 'style-loader'},
					{loader: MiniCssExtractPlugin.loader},
					{loader:'css-loader'}
				]
			},
			{
				test: /\.less$/,
				use: [
					{loader: MiniCssExtractPlugin.loader},
					{loader:'css-loader'},
					{loader:'less-loader'}
				]
			},
			// {
			// 	test:/\.(png|jpg|gif|jpeg)$/,
			// 	use:[
			// 		{loader:'file-loader'}
			// 	]
			// },
			{
				test: /\.(png|jpg|gif|jpeg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 90000
					}
				}]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "网页标题",
			template: './src/tpl.html',
			inject: true,
			minify: {
				removeComments: true,
				removeAttributeQuotes: true,
				collapseWhitespace: true
			},
			filename: 'index_1.html' //输出模板名称
		}),
		new MiniCssExtractPlugin({
		     //输出文件名称
		     filename: "[name].[hash].css"
		    })
	]
}
