import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Graph from './components/graph';
import Controls from './components/controls';

class App extends Component {
    constructor() {
        super();
        this.state = {
            paintOption: "start"
        };
        this._changePaintOption = this._changePaintOption.bind(this);
    }
    
    _changePaintOption(e) {
        console.log(e.target.value);
        this.setState({paintOption: e.target.value});
    }
    
    render() {
        return (
          <div>
            <h1>Pathfinding</h1>
            <Graph rows={25} columns={30} paintOption={this.state.paintOption} />
            <Controls change={this._changePaintOption} paintOption={this.state.paintOption} />
          </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);