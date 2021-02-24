/**
 * @name common.ts
 * @description 通用配置
 */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ejsConfig from '../config/ejs';
import projectConfig from '../config/project';

export function getHtmlWebpackPlugins(): HtmlWebpackPlugin[] {
    const htmlWebpackPlugins: HtmlWebpackPlugin[] = [];
    for (const {path: path_, chunks, data} of ejsConfig) {
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            filename: '[name].html',
            template: path_,
            templateParameters: {
                _projectConfig: projectConfig,
                ...data
            },
            chunks,
            scriptLoading: 'blocking'
        }));
    }
    return htmlWebpackPlugins;
}

export function getEntry(): Record<string, string[]> {
    const entry: Record<string, string[]> = {};
    for (const [name, p] of Object.entries(projectConfig.entry)) {
        entry[name] = ['@babel/polyfill'];
        if (process.env.NODE_ENV === 'development') {
            entry[name].push('webpack-hot-middleware/client', 'react-hot-loader/patch');
        }
        entry[name].push(p);
    }
    return entry;
}