const path = require('path');

module.exports = {
	output: {
		path: path.resolve(__dirname, '../'),
		filename: 'iWeb.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env'],
						plugins: [
							require('babel-plugin-transform-object-rest-spread'),
							require('babel-plugin-transform-class-properties'),
						],
					},
				},
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'html-es6-template-loader',
					options: {
						transpile: true,
					},
				},
			},
		],
	},
};