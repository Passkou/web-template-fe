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
            filename: 'html/[name].html',
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