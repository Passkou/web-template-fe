/**
 * @name ejs.ts
 * @description EJS 模板数据配置
 */

interface EjsConfig {
    path: string
    chunks: string[]
    data: Record<string, any>
}

const config: EjsConfig[] = [
    {
        path: './src/html/index.ejs',
        chunks: ['index'],
        data: {
            title: "A Test Website"
        }
    }
];

export default config;