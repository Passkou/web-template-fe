/**
 * 部署项目
 */

import projectConfig from '../config/project';
import fs from 'fs';
import path from 'path';

const publicFiles: string[] = fs.readdirSync(projectConfig.prod.distPath)
    .map(f => path.resolve(projectConfig.prod.distPath, f))
    .filter(f => fs.statSync(f).isFile());

const htmlFiles: string[] = fs.readdirSync(path.join(projectConfig.prod.distPath, 'html'))
    .map(f => path.resolve(projectConfig.prod.distPath, 'html', f));

/**
 * 部署静态文件
 */
async function deployPublic(files: string[]): Promise<void> {
    // 在这写代码...
}

/**
 * 部署 HTML
 */
async function deployHtml(files: string[]): Promise<void> {
    // 在这写代码...
}

deployHtml(htmlFiles);
deployPublic(publicFiles);