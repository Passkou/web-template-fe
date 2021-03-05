import webpack from 'webpack';
import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

const isDebug: boolean = process.env.NODE_ENV === 'development';
console.log('当前环境：', process.env.NODE_ENV);

// HtmlWebpackPlugins
const htmlFileName: string = isDebug ? '[name].html' : 'html/[name].html';
const htmlWebpackPlugins: HtmlWebpackPlugin[] = [
  new HtmlWebpackPlugin({
    template: './src/html/index.ejs',
    title: '测试网站',
    chunks: ['index'],
    filename: htmlFileName,
    scriptLoading: 'blocking',
    inject: 'body',
    templateParameters: {

    }
  })
];

const plugins: any[] = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${process.env.NODE_ENV}"`
    }
  }),
  new webpack.CleanPlugin(),
  ...htmlWebpackPlugins
];

if (isDebug) {
  plugins.push(
    new ReactRefreshPlugin()
  );
} else {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css'
    }),
    new ESLintPlugin({
      fix: true
    }),
    new WebpackManifestPlugin({
      useEntryKeys: true,
      generate(seed, files, entries) {
        const manifest: any = {
          builtAt: new Date().toISOString(),
          entries
        };
        return manifest;
      }
    })
  );
}

// 入口配置
const entry: Record<string, string[]> = {
  'index': [
    './src/js/index/index.tsx'
  ]
};

// polyfill
for (const k of Object.keys(entry)) {
  entry[k].unshift('@babel/polyfill');
}

const config: webpack.Configuration = {
  entry,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: isDebug ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    publicPath: isDebug ? '/' : 'https://public.example.com/',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
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
                  name: 'img/[name].[contenthash][ext]'
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
              name: 'media/[name].[contenthash][ext]'
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
                  name: 'fonts/[name].[contenthash][ext]'
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
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          minSize: 1,
          minChunks: 1,
          chunks: 'all',
          reuseExistingChunk: true,
          priority: -10
        },
        common: {
          name: 'common',
          test: /[\\/]src[\\/](js|css)[\\/]common/,
          priority: -20,
          chunks: 'all',
          reuseExistingChunk: true,
          minSize: 1024 * 10
        }
      }
    },
    minimize: !isDebug,
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

// HMR 启用该选项会导致失效，故仅在生产环境启用
if (!isDebug) {
  config.target = ['web', 'es5'];
}

export default config;
