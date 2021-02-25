import React from 'react';
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
    state: any
    props: any
    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.state = {
            text: 'Hello World'
        };
    }
    render() {
        return (
            <div>
                <h1>{this.state.text}</h1>
                <button onClick={this.change.bind(this)}>Change</button>
            </div>
        );
    }
    change() {
        this.setState({
            text: 'Changed!'
        });
    }
}

export default hot(App);