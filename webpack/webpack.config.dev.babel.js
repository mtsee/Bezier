import { dist, host, port, resolve, src } from './conf';

import baseConfig from './webpack.config.base';
import { theme } from './theme';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

export default webpackMerge(baseConfig, {
    entry: {
        index: resolve(src + '/index.js') // 主网站入口
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                include: [resolve('../node_modules'), resolve(src)],
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'less-loader', options: { sourceMap: true, javascriptEnabled: true, modifyVars: theme } }
                ]
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        // 出错不终止插件
        new webpack.NoEmitOnErrorsPlugin(),
        // 配置全局变量
        new webpack.DefinePlugin({
            __DEV__: true
        }),
        new webpack.HotModuleReplacementPlugin() //热加载插件
    ],
    devServer: {
        // 服务器
        host,
        port,
        inline: true,
        hot: true, // 热更新模式
        historyApiFallback: true, // using html5 router.
        contentBase: resolve('../web') // 网站目录
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:8080/api',
        //         changeOrigin: true
        //     }
        // }
    }
});
