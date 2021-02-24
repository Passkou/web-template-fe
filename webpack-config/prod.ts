/**
 * @name prod.ts
 * @description webpack 生产环境配置
 */
import webpack from 'webpack';
import path from 'path';
import projectConfig from '../config/project';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as common from './common';

const config: webpack.Configuration = {
    mode: 'production',
    output: {
        path: path.resolve(projectConfig.prod.distPath),
        filename: '[name].[chunkhash].js',
        publicPath: projectConfig.prod.publicPath
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
        }) as any,
        ...common.getHtmlWebpackPlugins()
    ]
};

export default config;