/**
 * @name webpack.ts
 * @description 对 Webpack 进行改造使能输出入口信息
 */
import webpack from 'webpack';
import fs from 'fs';
import chalk from 'chalk';
import webpackConfig from '../webpack.config';
import projectConfig from '../config/project';
import path from 'path';

const compiler = webpack(webpackConfig);

function handler(err: Error | undefined, stats: webpack.Stats | undefined) {
    console.log(chalk.yellow("\n\n" + new Date().toLocaleString()));
    console.log(stats?.toString({
        chunks: false,
        colors: true
    }));
    if (err) {
        console.error(err);
        return;
    }
    if (stats!.hasErrors()) {
        console.error(stats?.compilation.errors);
    }
    if (stats!.hasWarnings()) {
        console.warn(stats?.compilation.warnings);
    }
    const outputPath = process.env.NODE_ENV === 'development' ? projectConfig.dev.distPath : projectConfig.prod.distPath;
    const f = fs.createWriteStream(path.join(outputPath, 'chunks-info.json'), {encoding: 'utf-8'});
    const s = stats?.toJson() as any
    const entrypoints: any = {};
    Object.entries(s.entrypoints).forEach(([k, v]: any) => {
        entrypoints[k] = v.assets;
    })
    f.write(JSON.stringify({publicPath: s.publicPath, entrypoints: entrypoints}, undefined, 2));
    f.end();
}

if (process.env.NODE_ENV === 'development') {
    compiler.watch({}, (err, stats) => {
        handler(err, stats);
    });
} else {
    compiler.run((err, stats) => {
        handler(err, stats);
    });
}