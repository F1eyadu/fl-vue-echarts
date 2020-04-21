const webpack = require('webpack')
const path = require('path')
const mincss = require('mini-css-extract-plugin')
const htmlwebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'mian.js'
    },
    module: {
        rules: [
            {
                test: /\.vue/,
                loader: 'vue-loader'
            },
            {
                test: /\.js?$/,
                loader: devMode ? 'happypack/loader?id=happyBabel' : 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(sa|le|c)ss$/,
                use: [
                    {
                        loader: devMode ? 'vue-style-loader': mincss.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: "assert/images",
                            publicPath: "assert/images",
                            limit: 60000,
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(woff|svg|eot|ttf)$/,
                loader: 'file-loader'
            }
        ],
    },
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.jsx', '.css', '.less', '.ts', '.vue']
    },
    plugins: [
        new mincss({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new HappyPack({
          id: 'happyBabel',
          loaders: [{
            loader: 'babel-loader?cacheDirectory=true',
          }],
          threadPool: happyThreadPool,
          verbose: true,
        }),
        new htmlwebpackPlugin({
            template: 'index.html',
            filename:'index.html',
            chunks: ['app']
        }),
        new webpack.ProvidePlugin({
            jquery: "jquery",
            $: "jquery"
        })
    ]
}