// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'development', // 环境模式
    entry: path.resolve(__dirname, './src/index.js'), // 打包入口
    output: {
        path: path.resolve(__dirname, 'output'), // 打包出口
        filename: 'js/[name].js', // 打包完的静态资源文件名
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'), // 我们要使用的 html 模板地址
            filename: 'index.html', // 打包后输出的文件名
            title: '手搭开发环境', // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
            collapseWhitespace: true,
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'json',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new OptimizeCSSAssetsPlugin(),
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'img'),
        },
        compress: true,
        port: 9000,
    },
};