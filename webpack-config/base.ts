/**
 * @name base.ts
 * @description webpack 基础配置
 */
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');


const config: webpack.Configuration = {
    entry: {
        index: './src/js/index.tsx'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json']
    },
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                exclude: /[\\/]node_modules[\\/]/,
                use: [
                    {
                        loader: 'babel-loader', 
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: 'defaults' 
                                    }
                                ],
                                [
                                    '@babel/preset-react'
                                ],
                                [
                                    '@babel/preset-typescript',
                                    {
                                        isTSX: true,
                                        allExtensions: true
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/i,
                exclude: /[\\/]node_modules[\\/]/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10
                        }
                    }
                ]
            },
            {
                test: /\.styl$/i,
                exclude: /[\\/]node_modules[\\/]/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'stylus-loader'
                    }
                ]
            },
            {
                test: /\.css$/i,
                exclude: /[\\/]node_modules[\\/]/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new HtmlMinimizerPlugin()
        ],
        splitChunks: {
            minSize: 1,
            minChunks: 1,
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'all'
                },
                commons: {
                    name: 'commons',
                    test: /[\\/]src[\\/]js[\\/]commons[\\/]/,
                    priority: 5,
                    chunks: 'all'
                }
            }
        }
    }
};

export default config;