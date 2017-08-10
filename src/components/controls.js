import React, {Component} from 'react';

class Controls extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
        <div className="controls">
            
            <select onChange={this.props.change} value={this.props.paintOption}>
                <option value="start">Start Position</option>
                <option value="end">End Position</option>
                <option value="obstacle">Obstacle Position</option>
                <option value="erase">Erase</option>
            </select>
        </div>
        );
    }
}

module.exports = Controls;