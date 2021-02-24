import Router from '@koa/router';
import Mock from 'mockjs';
import koaBody from 'koa-body';

const router = new Router({
    prefix: '/api'
});

router.use(koaBody());

router.get('/test', async (ctx, next) => {
    const data = Mock.mock({
        'randInt|1-100': 100
    });
    ctx.body = {code: 'OK', msg: '', data};
});

export default router;