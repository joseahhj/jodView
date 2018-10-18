/**
 * webpack 配置
 * @author shan-er
 */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vendorConfig = require('../release/dll/vendorConfig.json');
const vendorManifest = require('../release/dll/vendor-manifest.json');
const autoPrefix = require('autoprefixer');
const extractSass = new ExtractTextPlugin({
    filename: 'assets/common-[hash].css',
    
});
// const resolve = dir => join(__dirname, '..', dir);
var config = {
    entry: {
        index: ['./site/index']
    },
    output: {
        path: path.resolve(__dirname, '../release'),
        publicPath: '/release/',
        filename: 'js/[name]-[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude:path.resolve(__dirname, "../node_modules")
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        },{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins:[autoPrefix({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] })]
                    }
                },
                "sass-loader"
                ],
                fallback: "style-loader"
            })
        },{
            test: /\.css/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: 'file-loader?name=[name].[ext]&publicPath=./imgs/'
        }, {
            test: /\.(woff|eot|svg|ttf)(\?(\w|#)+)?$/,
            loader: 'file-loader?limit=20480&name=[name].[ext]&outputPath=assets/fonts/'
        },{
            test: /\.md$/,
            use: [
              { loader: 'json-loader'},
              { loader: 'meta-marked'}
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
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
            bundleName: process.env.NODE_ENV == 'production' ? 'dll/' + vendorConfig.vendor.js : '/release/dll/' + vendorConfig.vendor.js
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: vendorManifest
        })
    ]

};

module.exports = config;
