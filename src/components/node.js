
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
    }
    
    _handleClick() {
        this.props.click(this.props.attrs.x, this.props.attrs.y);
    }
    
    render() {
        var classes = classNames({
            "node-start": this.props.attrs.start,
            "node-end": this.props.attrs.end,
            "node-obstacle": this.props.attrs.obstacle,
            "node-opened": this.props.attrs.opened && !this.props.attrs.start && !this.props.attrs.end,
            "node-searched": this.props.attrs.searched && !this.props.attrs.start && !this.props.attrs.end,
            "node-shortest": this.props.attrs.shortestPath && !this.props.attrs.start && !this.props.attrs.end
        });
        
        return (
            <td onClick={this._handleClick} className={classes}>
                <span>{this.props.attrs.f}</span>
            </td>
        );
    }
}

module.exports = Node;