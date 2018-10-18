/**
 * webpack 配置
 * @modify hhj-er
 */
const merge = require('webpack-merge');
const config = require('./webpack.base');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoPrefix = require('autoprefixer');

const extractSass = new ExtractTextPlugin({
    filename: 'jad.css',
    disable: process.env.NODE_ENV === "develop"
});
var prodConf = {
    devtool: '#nosources-source-map',
    entry: {
        jad: ['./src/index.js'],
        style: ['./src/style.js']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: 'Jad',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, "../node_modules")
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoPrefix({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] })]
                        }
                    },
                    "sass-loader"
                ],
                fallback: "style-loader"
            })
        }, {
            test: /\.css/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: 'file-loader?name=[name].[ext]&outputPath=imgs/'
        }, {
            test: /\.(woff|eot|svg|ttf)(\?(\w|#)+)?$/,
            loader: 'file-loader?limit=20480&name=[name].[ext]&outputPath=fonts/'
        }, {
            test: /\.md$/,
            use: [
                { loader: 'json-loader' },
                { loader: 'meta-marked' }
            ]
        }]
    },
    resolve: {
        // 配置路径别名
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            '~pages': '../src/component/',
            
        },
        // 该项配置能够在加载资源的时候省略后缀名
        extensions: ['.js', '.vue', '.json', '.css', '.scss'],
        modules: ['../src', 'node_modules'],
    },
    externals: {
        vue: {
          commonjs2: 'vue',
          commonjs: 'vue',
          amd: 'vue',
          root: 'Vue'

        }
    },
    plugins: [
        extractSass,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false
            }
        }),

        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false,
            //exclude: ['dll']
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../release/dll'),
            to: path.resolve(__dirname, '../dist/dll'),
        }]),
    ]
};
module.exports = prodConf;