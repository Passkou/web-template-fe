/**
 * @name index.tsx
 * @description 主页
 */

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.styl';
import App from './App';

const app: HTMLElement = document.getElementById('app') as HTMLElement;

ReactDOM.render(<App/>, app);