import Router from '@koa/router';
import send from 'koa-send';

const router = new Router();

router.get('/', async (ctx, next) => {
    await send(ctx, './dist/index.html');
});

export default router;