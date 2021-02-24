import Koa from 'koa';
import koaLogger from 'koa-logger';
import apiRouter from './routers/api';
import webpackConfig from '../webpack.config';
import projectConfig from '../config/project';
const webpackDev = require('webpack-dev-middleware-for-koa');
import webpackHot from 'webpack-hot-middleware';
import c2k from 'koa-connect';
import webpack from 'webpack';
import singleHtmlRouter from './routers/single-html';

(async () => {
    const app: Koa = new Koa();

    const compiler = webpack(webpackConfig);

    app.use(koaLogger());

    const webpackDevMiddleware = webpackDev(compiler, {
        writeToDisk: true,
        publicPath: projectConfig.dev.publicPath
    });

    app.use(webpackDevMiddleware);

    app.use(c2k(webpackHot(compiler)));

    // API Router
    app.use(apiRouter.routes());

    // 单 HTML 文件 Router
    app.use(singleHtmlRouter.routes());

    app.listen(4000, 'localhost', undefined, () => {
        console.log('服务器运行在 http://localhost:4000');
    });
})();