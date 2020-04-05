const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
module.exports = merge(config, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.resolve(__dirname + 'dist'),
        port: 8080,
        hot: true,
        proxy: {
            "api": {
                target: "https://www.bilibili.com/v/douga/"
              }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new VueLoaderPlugin()
    ]
})