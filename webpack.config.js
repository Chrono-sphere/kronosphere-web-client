const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        './src/index.js'
    ],
    resolve: {
        modules: [path.resolve(__dirname), "node_modules"],
        alias: {
            Components: path.resolve(__dirname, 'src/components/'),
            Mutations: path.resolve(__dirname, 'src/mutations'),
            Queries: path.resolve(__dirname, 'src/queries'),
            Assets: path.resolve(__dirname, 'src/assets'),
        },
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: "style-loader"
                }),
                test: /\.css$/
            },
            {
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                }),
                test: /\.scss$/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin('style.css')
    ]
}
