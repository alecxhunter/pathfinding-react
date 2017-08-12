
import React, {Component} from 'react';
import classNames from 'classnames';

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false,
            end: false,
            obstacle: false
        };
        this._handleClick = this._handleClick.bind(this);
        this._mouseMove = this._mouseMove.bind(this);
        this._mouseDown = this._mouseDown.bind(this);
    }
    
    _handleClick() {
        this.props.click(this.props.attrs.x, this.props.attrs.y);
    }
    
    _mouseMove(e) {
        this.props.mouseMove(this.props.attrs.x, this.props.attrs.y);
    }
    
    _mouseDown(e) {
        this.props.mouseDown(this.props.attrs.x, this.props.attrs.y);
    }
    
    render() {
        var classes = classNames({
            'node-start': this.props.attrs.start,
            'node-end': this.props.attrs.end,
            'node-obstacle': this.props.attrs.obstacle,
            'node-opened': this.props.attrs.opened && !this.props.attrs.start && !this.props.attrs.end && !this.props.attrs.searched,
            'node-searched': this.props.attrs.searched && !this.props.attrs.start && !this.props.attrs.end,
            'node-shortest': this.props.attrs.shortestPath && !this.props.attrs.start && !this.props.attrs.end
        });
        
        return (
            <td className={classes} onMouseUp={this.props.mouseUp} onMouseDown={this._mouseDown} onMouseMove={this._mouseMove}>
                <span>{!this.props.attrs.obstacle ? this.props.attrs.f : ''}</span>
            </td>
        );
    }
}

module.exports = Node;