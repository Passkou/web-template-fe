/**
 * @name dev.ts
 * @description webpack 开发环境配置
 */
import webpack from 'webpack';
import path from 'path';
import projectConfig from '../config/project';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as common from './common';

const config: webpack.Configuration = {
    mode: 'development',
    output: {
        path: path.resolve(projectConfig.dev.distPath),
        filename: '[name].dev.js',
        publicPath: projectConfig.dev.publicPath
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].dev.css',
        }) as any,
        new webpack.HotModuleReplacementPlugin(),
        ...common.getHtmlWebpackPlugins()
    ]
};

export default config;