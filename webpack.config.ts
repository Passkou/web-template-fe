import webpack from 'webpack';
import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export default async function(env: any, argv: any) {
  const isDebug: boolean = argv.mode === 'development';

  // HtmlWebpackPlugins
  const htmlFileName: string = isDebug ? '[name].html' : 'html/[name].html'
  const htmlWebpackPlugins: HtmlWebpackPlugin[] = [
    new HtmlWebpackPlugin({
      template: './src/html/index.ejs',
      title: '测试网站',
      chunks: ['index'],
      filename: htmlFileName,
      scriptLoading: 'blocking',
      inject: 'body'
    })
  ];

  const plugins: webpack.WebpackPluginInstance[] = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${argv.mode}"`
      }
    }),
    new webpack.CleanPlugin(),
    ...htmlWebpackPlugins
  ];

  if (isDebug) {
    plugins.push(new ReactRefreshPlugin());
  } else {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css'
    }))
  }

  // 根据环境不同的别名
  const alias: any = {
    '@': path.resolve('./src')
  };

  const entry: Record<string, string[]> = {
    'index': [
      './src/js/index/index.tsx'
    ]
  }

  // polyfill
  for (const k of Object.keys(entry)) {
    entry[k].unshift('@babel/polyfill');
  }

  let config: webpack.Configuration = {
    entry,
    output: {
      path: path.resolve('./dist'),
      filename: isDebug ? 'js/[name].js' : 'js/[name].[chunkhash:8].js',
      publicPath: isDebug ? '/' : '/',
    },
    resolve: {
      alias,
      extensions: [
        '.tsx',
        '.jsx',
        '.ts',
        '.js',
        '.json',
        '.jsx'
      ],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|webp)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'img/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(mp4|mp3|ogg|wav|flac|acc|webm)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'fonts/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: isDebug ? 'style-loader' : MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ]
        },
        {
          test: /\.styl(us)?$/i,
          use: [
            {
              loader: isDebug ? 'style-loader' : MiniCssExtractPlugin.loader
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
          test: /\.tsx?$/i,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          common: {
            name: 'common',
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      },
      minimizer: [
        new TerserPlugin()
      ]
    },
    // @ts-ignore
    devServer: {
      contentBase: './dist'
    },
    plugins
  };
  return config;
};
