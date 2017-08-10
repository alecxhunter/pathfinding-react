import React, {Component} from 'react';
import Node from './node';

class Graph extends Component {
	constructor(props) {
		super(props);
        
        this._handleNodeClick = this._handleNodeClick.bind(this);
        this._findNode = this._findNode.bind(this);
        
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
            nodes.push(node);
        }        
        
		this.state = {
            nodes: nodes
        };
        
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].up = this._findNode(nodes[i].x, nodes[i].y - 1);
            nodes[i].right = this._findNode(nodes[i].x + 1, nodes[i].y);
            nodes[i].down = this._findNode(nodes[i].x, nodes[i].y + 1);
            nodes[i].left = this._findNode(nodes[i].x - 1, nodes[i].y);
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
            
            if (current.up && !current.up.opened && !current.up.obstacle) {
				current.up.opened = true;
				current.up.parent = current;
				current.up.costSoFar = current.costSoFar + 1;
				openNodes.push(current.up);
			}
			if (current.right && !current.right.searched && !current.right.obstacle) {
				current.right.opened = true;
				current.right.parent = current;
				current.right.costSoFar = current.costSoFar + 1;
				openNodes.push(current.right);
			}
			if (current.down && !current.down.opened && !current.down.obstacle) {
				current.down.opened = true;
				current.down.parent = current;
				current.down.costSoFar = current.costSoFar + 1;
				openNodes.push(current.down);
			}
			if (current.left && !current.left.opened && !current.left.obstacle) {
				current.left.opened = true;
				current.left.parent = current;
				current.left.costSoFar = current.costSoFar + 1;
				openNodes.push(current.left);
			}

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
	
	render() {
        var rows = Array.apply(null, {length: this.props.rows});
        var columns = Array.apply(null, {length: this.props.columns});
        var self = this;
        
		return (
			<table className="graph">
                <tbody>
                {
                    rows.map(function(r, y) {
                        return (
                        <tr key={y}>
                        {
                            columns.map(function(c, x) {
                                var node = self._findNode(x, y);
                            
                                return (
                                <Node key={x} click={self._handleNodeClick} attrs={node} />
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