import React, {Component} from 'react';
import Node from './node';

class Graph extends Component {
    
	constructor(props) {
		super(props);
        
        this._handleNodeClick = this._handleNodeClick.bind(this);
        this._findNode = this._findNode.bind(this);
        this._mouseUp = this._mouseUp.bind(this);
        this._mouseDown = this._mouseDown.bind(this);
        this._mouseMove = this._mouseMove.bind(this);
        
        var nodes = [];
        for (var i = 0; i < props.rows * props.columns; i++) {
            var node = {};
            node.x = i % props.columns;
            node.y = Math.floor(i / props.columns);
            node.start = false;
            node.end = false;
            node.obstacle = false;
            node.opened = false;
            node.searched = false;
            node.g = 0;
            node.h = 0;
            node.f = node.g + node.h;
            node.neighbors = [];
            nodes.push(node);
        }        
        
		this.state = {
            nodes: nodes,
            mouseDragFlag: false,
            mouseDragLastX: -1,
            mouseDragLastY: -1
        };
        
        // Add all neighbors 
        for (var i = 0; i < nodes.length; i++) {
            // UP
            nodes[i].neighbors.push(this._findNode(nodes[i].x, nodes[i].y - 1));
            // RIGHT
            nodes[i].neighbors.push(this._findNode(nodes[i].x + 1, nodes[i].y));
            // DOWN
            nodes[i].neighbors.push(this._findNode(nodes[i].x, nodes[i].y + 1));
            // LEFT
            nodes[i].neighbors.push(this._findNode(nodes[i].x - 1, nodes[i].y));
            
            nodes[i].neighbors = nodes[i].neighbors.filter(function(node) {
                return node !== null;
            });

        }
	}
    
    _handleNodeClick(x, y) {
        var props = this.props;
        var nodes = this.state.nodes.slice();
        console.log("Clicked (", x, ", ", y, ")");
        
        nodes.forEach(function(node, idx) {
            switch(props.paintOption) {
                case "start":
                    if (node.x === x && node.y === y)
                        node.start = true;
                    else
                        node.start = false;
                    break;
                case "end":
                    if (node.x === x && node.y === y)
                        node.end = true;
                    else
                        node.end = false;
                    break;
                case "obstacle":
                    if (node.x === x && node.y === y) {
                        node.obstacle = true;
                        node.start = false;
                        node.end = false;
                    }
                    break;
                case "erase":
                    if (node.x === x && node.y === y) {
                        node.start = false;
                        node.end = false;
                        node.obstacle = false;
                    }
                    break;
            }
        });
        
        if (nodes.filter(function(node) { return node.start || node.end; }).length === 2) {
            this._executeSearch();
        }
        this.setState({
            nodes: nodes
        });
    }
    
    _findNode(x, y) {
		if (x < 0 || y < 0 || x >= this.props.columns || y >= this.props.rows)
			return null;
		return this.state.nodes[(y * this.props.columns) + x];
    }
    
    _executeSearch() {
        var start = this.state.nodes.filter(function(node) { 
            return node.start; 
        })[0];
        var end = this.state.nodes.filter(function(node) { 
            return node.end; 
        })[0];
        var current;
        var openNodes = [];
        var nodes = this.state.nodes.slice();
        
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].g = Math.abs(nodes[i].x - start.x) + Math.abs(nodes[i].y - start.y);
			nodes[i].h = Math.abs(nodes[i].x - end.x) + Math.abs(nodes[i].y - end.y);
			nodes[i].f = nodes[i].g + nodes[i].h;
            nodes[i].opened = false;
            nodes[i].searched = false;
            nodes[i].costSoFar = 0;
            nodes[i].parent = null;
            nodes[i].shortestPath = false;
        }
        
        start.opened = true;
        openNodes.push(start);
        
        while (openNodes.length != 0) {
            current = openNodes.shift();
            if (current.end) {
                console.log("Reached the end!");
                break;
            }
            
            current.searched = true;
            current.neighbors.forEach(function(node) {
                if (!node.opened && !node.obstacle) {
                    node.opened = true;
                    node.parent = current;
                    node.costSoFar = current.costSoFar + 1;
                    openNodes.push(node);
                }
            });
            
			openNodes.sort(function(a, b) {
				return (a.f + a.costSoFar) - (b.f + b.costSoFar);
			});
        }
        
        while (current.parent) {
			current = current.parent;
			current.shortestPath = true;
		}
        
        this.setState({
            nodes: nodes
        });
    }
    
    _mouseUp() {
        this.state.mouseDragFlag = false;
    }
    
    _mouseDown(x, y) {
        this.state.mouseDragFlag = true;
        this._handleNodeClick(x, y);
    }
    
    _mouseMove(x, y) {
        if (this.state.mouseDragFlag) {
            if (this.state.mouseDragLastX !== x || this.state.mouseDragLastY !== y)
                this._handleNodeClick(x, y);
        }
        this.setState({
            mouseDragLastX: x,
            mouseDragLastY: y,
        });
    }

	render() {
        var rows = Array.apply(null, {length: this.props.rows});
        var columns = Array.apply(null, {length: this.props.columns});
        var self = this;
        
		return (
			<table className="graph" onMouseLeave={this._mouseUp}>
                <tbody>
                {
                    rows.map(function(r, y) {
                        return (
                        <tr key={y}>
                        {
                            columns.map(function(c, x) {
                                var node = self._findNode(x, y);
                            
                                return (
                                <Node key={x} attrs={node} mouseUp={self._mouseUp} mouseDown={self._mouseDown} mouseMove={self._mouseMove} />
                                );
                            })
                        }
                        </tr>);
                    })
                }
                </tbody>
            </table>
		);
	}
}

module.exports = Graph;