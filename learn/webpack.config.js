const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader"
				/* options: {
						  loaders: {
							// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
							// the "scss" and "sass" values for the lang attribute to the right configs here.
							// other preprocessors should work out of the box, no loader config like this necessary.
							'scss': 'vue-style-loader!css-loader!sass-loader!postcss-loader',
							'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax!postcss-loader'
						  }
						  // other vue-loader options go here
						} */
			  },
			{
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				},

				test: /\.js$/
			},
			{
				test: /\.(less|css)$/,

				use: [
					{
						loader: 'css-loader',

						options: {
							sourceMap: true
						}
					},
					{
						loader: 'less-loader',

						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	entry: {
		app: './src/index'
	},

	output: {
		filename: '[name].[chunkhash].js'
	},


	mode: 'development',
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		overlay: true,
		port: 9858,
		
	},
	plugins:[
		new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html',
        })
    ],

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	}
};
