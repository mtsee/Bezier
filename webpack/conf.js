import path from 'path';

export default {
    dist: '../dist', // 打包目录
    src: '../src',
    port: 4000,
    HOST: '127.0.0.1',
    resolve: url => path.resolve(__dirname, url)
};
