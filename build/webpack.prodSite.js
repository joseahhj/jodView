/**
 * Created by yangbing on 2017/11/7.
 */
const merge = require('webpack-merge');
const baseConf = require('./webpack.base');
const clean = require('clean-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var prodConf = merge(baseConf,{
    devtool:'#nosources-source-map',
    output:{
        publicPath:''
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new clean(['release/'],{
            root: path.resolve(__dirname,'../'),
            verbose: true,
            dry: false,
            exclude:['dll']
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false,
                drop_console:true
            }
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname,'../site/assets/imgs'),
            to: path.resolve(__dirname,'../release/assets/imgs')
        }]),
    ]
});

module.exports = prodConf;