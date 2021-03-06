import React, { Component } from 'react';
import './Canvas.css';
import canvasUtil from '../util/canvasUtil';
import CanvasNav from './canvasNav/canvasNav';

/**
 * Canvas component
 */
class Canvas extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.socket = null;
        // TODO: need to organize the state better into groups
        this.state = {
            brushColor: { r: 0, g: 0, b: 0, a: 255 },
            brushSize: 3,
            toolId: 'pen',
            isPenDown: false,
            currX: 0,
            currY: 0,
            prevX: 0,
            prevY: 0,
            cursors: [],
            name: '',
            loaded: false,
        };
    }

    // Initialization goes here
    componentDidMount() {
        canvasUtil.init();
    }

    redraw() {
        const ta = document.getElementById('ta');
        const strFakeResponse = ta.value;
        const drawArr = JSON.parse(strFakeResponse);
        drawArr.forEach(function(i) {
            canvasUtil.redraw(i);
        });
    }

    clear() {
        canvasUtil.clear();
    }

    // Rendering of the component
    render() {
        return (
            <div>
                <canvas id='can' width='800' height='600' ref={this.canvas}>
                    Your browser does not support canvas
                </canvas>

                <CanvasNav></CanvasNav>
            </div>
        );
    }
}
export default Canvas;
