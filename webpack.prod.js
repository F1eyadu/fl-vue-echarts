const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = merge(config, {
    mode: 'production',
    optimization: {

    },  
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
}) 