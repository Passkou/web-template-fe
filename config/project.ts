/**
 * @name project.ts
 * @description 工程配置文件
 */

export default {
    // 开发环境
    dev: {
        // 公共资源地址
        publicPath: '/public',
        // 输出文件路径
        distPath: './dist'
    },
    // 生产环境
    prod: {
        publicPath: '//public.passkou.com',
        distPath: './dist'
    }
};