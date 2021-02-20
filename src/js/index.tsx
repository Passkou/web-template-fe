/**
 * @name index.tsx
 * @description 主页
 */

import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.styl';

class App extends React.Component {
    render() {
        return (
            <h1>Hello World!</h1>
        );
    }
}


const app: HTMLElement = document.getElementById('app') as HTMLElement;

ReactDOM.render(<App/>, app);