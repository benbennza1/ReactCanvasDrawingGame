import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Tool from "./Tool";
import io from "socket.io-client";
import "./Canvas.css";
import canvasUtil from "./util/canvasUtil";
import axios from "axios";
import { findByText } from "@testing-library/react";

const serverAddress = "http://localhost:3000";
class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.socket = null;
    // TODO: need to organize the state better into groups
    this.state = {
      brushColor: { r: 0, g: 0, b: 0, a: 255 },
      brushSize: 3,
      toolId: "pen",
      isPenDown: false,
      currX: 0,
      currY: 0,
      prevX: 0,
      prevY: 0,
      cursors: [],
      name: "",
      loaded: false
    };
  }

  // Initialization goes here
  componentDidMount() {
    const cvs = this.canvas.current;
    canvasUtil.init();
  }

  componentDidUpdate() {
    alert("wololo");
  }

  redraw() {
    var ta = document.getElementById("ta");
    var strFakeResponse = ta.value;
    var drawArr = JSON.parse(strFakeResponse);
    drawArr.forEach(function(i){
        canvasUtil.redraw(i);
    });
  }

  clear(){
    canvasUtil.clear();
  }

  // Rendering of the component
  render() {
    return (
      <div>
        <canvas id="can" width="800" height="600" ref={this.canvas}>
          Your browser does not support canvas
        </canvas>

        <textarea id="ta" width="700" height="100"></textarea>
        <button onClick={this.clear}>clear</button>
        <button onClick={this.redraw}>draw</button>
      </div>
    );
  }
}
export default Canvas;
