import React, {Component} from 'react';

class Controls extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
        <div className="controls">
            <label className="radio-inline">
                <input type="radio" checked={this.props.paintOption === "start"} name="paintOptions" value="start" onClick={this.props.click} />Start Position
            </label>
            <label className="radio-inline">
                <input type="radio" checked={this.props.paintOption === "end"} name="paintOptions" value="end" onClick={this.props.click} />End Position
            </label>
            <label className="radio-inline">
                <input type="radio" checked={this.props.paintOption === "obstacle"} name="paintOptions" value="obstacle" onClick={this.props.click} />Obstacle Position
            </label>
            <label className="radio-inline">
                <input type="radio" checked={this.props.paintOption === "erase"} name="paintOptions" value="erase" onClick={this.props.click} />Erase
            </label>
        </div>
        );
    }
}

module.exports = Controls;