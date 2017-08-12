import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Graph from './components/graph';
import Controls from './components/controls';

class App extends Component {
    constructor() {
        super();
        this.state = {
            paintOption: 'start'
        };
        this._clickPaintOption = this._clickPaintOption.bind(this);
    }
    
    _clickPaintOption(e) {
        this.setState({paintOption: e.target.value});
    }
    
    render() {
        return (
          <div>
            <h1>A* Pathfinding</h1>
            <Controls 
                click={this._clickPaintOption} 
                paintOption={this.state.paintOption} />
            <Graph 
                rows={25} 
                columns={30} 
                paintOption={this.state.paintOption} />
          </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);