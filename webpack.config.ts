import webpack from 'webpack';
import baseConfig from './webpack-config/base';
import prodConfig from './webpack-config/prod';
import devConfig from './webpack-config/dev';
import fs from 'fs';
import projectConfig from './config/project';

let config: webpack.Configuration;

// 清空 dist 文件夹
fs.rmdirSync(projectConfig.prod.distPath, {recursive: true});
fs.mkdirSync(projectConfig.prod.distPath);

if (process.env.NODE_ENV === 'development') {
    config = {...baseConfig, ...devConfig};
} else {
    config = {...baseConfig, ...prodConfig};
}

export default config;