/**
 * 部署项目
 */

import projectConfig from '../config/project';
import fs from 'fs';
import path from 'path';

const publicFiles: string[] = fs.readdirSync(projectConfig.prod.distPath)
    .map(f => path.resolve(projectConfig.prod.distPath, f))
    .filter(f => !['.html', '.txt'].includes(path.extname(f)) && path.basename(f) !== 'chunks-info.json');

const htmlFiles: string[] = fs.readdirSync(projectConfig.prod.distPath)
    .map(f => path.resolve(projectConfig.prod.distPath, f))
    .filter(f => f.endsWith('.html'));

const ejsFiles: string[] = fs.readdirSync(projectConfig.prod.distPath)
.map(f => path.resolve(projectConfig.prod.distPath, f))
.filter(f => f.endsWith('.ejs'));

const chunksInfoFile: string = path.join(projectConfig.prod.distPath, 'chunks-info.json');

/**
 * 部署静态文件
 */
async function deployPublic(files: string[]): Promise<void> {
    console.log('Public files----------------------------\n');
    console.log(files.join('\n'));
    // 在这写代码...
}

/**
 * 部署 HTML
 */
async function deployHTML(files: string[]): Promise<void> {
    console.log('HTML files----------------------------\n');
    console.log(files.join('\n'));
    // 在这写代码...
}

/**
 * 部署 EJS 文件
 */
async function deployEJS(files: string[]): Promise<void> {
    console.log('EJS files----------------------------\n');
    console.log(files.join('\n'));
    // 在这写代码...
}

/**
 * 部署入口信息
 */

async function deployEntry(file: string): Promise<void> {
    // 在这写代码...
}

deployHTML(htmlFiles);
deployEJS(ejsFiles);
deployPublic(publicFiles);
deployEntry(chunksInfoFile);