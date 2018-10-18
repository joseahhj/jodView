/**
 * webpack 配置
 * @author shan-er 
 * modify  hhj
 */
const merge = require('webpack-merge');
const config = require('./webpack.base');
var webpack = require('webpack');
var path = require('path');
const url = require('url');
for (let i in config.entry) {
    config.entry[i].unshift(
        "webpack-dev-server/client?http://127.0.0.1:8080/",
        "webpack/hot/only-dev-server"
    )
}
var devConfig = merge(config, {
    // entry: {
    //     index: [
    //         'webpack-dev-server/client?http://localhost:8080',
    //         'webpack/hot/only-dev-server',
    //         './site/index'
    //     ]
    // },

    devtool: 'cheap-module-inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../'),
        hot: true,
        historyApiFallback: true,
        publicPath: '/release/',
        noInfo: false,
        open: true,
        openPage: 'release/'
    },
    plugins: [

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('develop')
            }
        }),

        // 热更新插件
        new webpack.HotModuleReplacementPlugin()
    ]

});
module.exports = devConfig;