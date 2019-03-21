import { dist, resolve, src } from './conf';

import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.config.base';
import { theme } from './theme.js';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

const extractStyle = new ExtractTextPlugin(`assets/css/[name].[hash:8].css`);

export default webpackMerge(baseConfig, {
    devtool: 'source-map',
    entry: {
        index: resolve(src + '/index.js') // 主网站入口
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: resolve(src),
                use: ['babel-loader']
            },
            {
                test: /\.(css|less)$/,
                include: resolve(src),
                use: extractStyle.extract([
                    'css-loader',
                    'postcss-loader',
                    `less-loader?{javascriptEnabled: true, modifyVars: ${JSON.stringify(theme)}}`
                ])
            }
        ]
    },
    plugins: [
        extractStyle,
        new CleanWebpackPlugin([dist.replace('../', '') + '/assets'], {
            root: __dirname.replace(/\\webpack$/, '')
        }),
        // 提取主页面和魔盒页面共享的公共模块
        // new webpack.optimize.CommonsChunkPlugin('common'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    ]
});
