import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Tool from "./Tool";
import io from "socket.io-client";
import "./App.css";
import axios from "axios";

const serverAddress = "http://localhost:3000";
class App extends Component {
  constructor(props) {
    super(props);
    this.display = React.createRef();
    this.socket = null;
    this.state = {
      brushColor: { r: 0, g: 0, b: 0, a: 255 },
      brushSize: 3,
      toolId: "pen",
      isPenDown: false,
      mouseX: 0,
      mouseY: 0,
      prevX: 0,
      prevY: 0,
      cursors: [],
      name: "",
      loaded: false
    };
  }
  componentDidMount() {
    this.socket = io(serverAddress);
    this.socket.on("line", data => {
      if (this.state.loaded) {
        const [x1, y1, x2, y2] = data.lineCoordinates;
        const displayCtx = this.display.current.getContext("2d");
        displayCtx.lineWidth = data.lineWidth;
        displayCtx.strokeStyle = `rgba(${data.lineColor.r},${data.lineColor.g},${data.lineColor.b},${data.lineColor.a})`;
        displayCtx.beginPath();
        displayCtx.moveTo(x1, y1);
        displayCtx.lineTo(x2, y2);
        displayCtx.stroke();
      }
    });
    this.socket.on("cursor", data => {
      if (this.state.loaded) {
        this.setState({ cursors: data });
      }
    });
    setInterval(() => {
      if (this.state.loaded) {
        this.socket.emit("cursor", {
          name: this.state.name,
          x: this.state.mouseX,
          y: this.state.mouseY,
          sessionKey: window.localStorage.getItem("sessionKey")
        });
      }
    }, 3000);
    setInterval(() => {}, Math.round(1000 / 60));
  }
  handleNameInput(e) {
    this.setState({ name: e.target.value });
  }
  handleJoin(e) {
    // fetch(serverAddress + "/create_user", {
    //   body: JSON.stringify({
    //     name: this.state.name
    //   }),
    //   method: "post",
    //   cache: "no-cache",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(json => {
    //     if (json.success) {
    //       localStorage.sessionKey = json.sessionKey;
    //       this.setState({ loaded: true });
    //     }
    //   });
    localStorage.sessionKey = "lolkek";
    this.setState({ loaded: true });
  }
  handleToolClick(toolId) {
    this.setState({ toolId });
  }
  handleColorChange(color) {
    this.setState({ brushColor: color.rgb });
  }
  handleDisplayMouseMove(e) {
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY
    });
    if (this.state.isPenDown) {
      this.display.current.getContext("2d").lineCap = "round";
      const { top, left } = this.display.current.getBoundingClientRect();
      switch (this.state.toolId) {
        case "pen":
          this.socket.emit("line", {
            lineWidth: this.state.brushSize,
            lineColor: this.state.brushColor,
            lineCoordinates: [
              this.state.prevX - left,
              this.state.prevY - top,
              this.state.mouseX - left,
              this.state.mouseY - top
            ],
            sessionKey: window.localStorage.getItem("sessionKey")
          });
          break;
        case "eraser":
          this.socket.emit("line", {
            lineWidth: this.state.brushSize,
            lineColor: { r: 255, g: 255, b: 255, a: this.state.brushColor.a },
            lineCoordinates: [
              this.state.prevX,
              this.state.prevY,
              this.state.mouseX,
              this.state.mouseY
            ],
            sessionKey: window.localStorage.getItem("sessionKey")
          });
          break;
      }
    }
    this.setState({
      prevX: this.state.mouseX,
      prevY: this.state.mouseY
    });
    if (!this.state.isPenDown) {
      this.setState({
        prevX: e.clientX,
        prevY: e.clientY
      });
    }
    this.socket.emit("cursor", {
      x: this.state.mouseX,
      y: this.state.mouseY,
      sessionKey: window.localStorage.getItem("sessionKey")
    });
  }
  handleDisplayMouseDown(e) {
    this.setState({ isPenDown: true });
  }
  handleDisplayMouseUp(e) {
    this.setState({ isPenDown: false });
  }
  handleBrushResize(e) {
    this.setState({ brushSize: e.target.value });
  }

  render() {
    return this.state.loaded ? (
      <div>
        <canvas
          className="display"
          width="640"
          height="480"
          ref={this.display}
          onMouseMove={this.handleDisplayMouseMove.bind(this)}
          onMouseDown={this.handleDisplayMouseDown.bind(this)}
          onMouseUp={this.handleDisplayMouseUp.bind(this)}
        ></canvas>
        <div className="toolbox">
          <ChromePicker
            color={this.state.brushColor}
            onChangeComplete={this.handleColorChange.bind(this)}
          ></ChromePicker>
          <Tool
            name="Eraser"
            currentTool={this.state.toolId}
            toolId="eraser"
            onSelect={this.handleToolClick.bind(this)}
          />
          <Tool
            name="Pen"
            currentTool={this.state.toolId}
            toolId="pen"
            onSelect={this.handleToolClick.bind(this)}
          />
          <code className="brush-size-label">
            Size ({String(this.state.brushSize)})
          </code>{" "}
          <input
            onChange={this.handleBrushResize.bind(this)}
            value={this.state.brushSize}
            type="range"
            min="1"
            max="50"
          />
          <span
            className="brush-size-indicator"
            style={{
              width: this.state.brushSize + "px",
              height: this.state.brushSize + "px",
              background: this.state.brushColor
            }}
          ></span>
        </div>
        {this.state.cursors.map(cursor => (
          <div
            key={cursor.key}
            className="cursor"
            style={{ left: cursor.x + 8 + "px", top: cursor.y + 8 + "px" }}
          >
            <div
              style={{
                borderRadius: "50px",
                position: "relative",
                background: "silver",
                width: "2px",
                height: "2px"
              }}
            ></div>{" "}
            {cursor.name}
          </div>
        ))}
      </div>
    ) : (
      <div className="join-container">
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameInput.bind(this)}
          className="join-input"
          placeholder="Enter a sssssname to use ..."
        />
        <br />
        <button className="join-button" onClick={this.selinTest.bind(this)}>
          Join
        </button>
      </div>
    );
  }

  selinTest() {
    const link = "lol kek";
    axios
      .put(URL, link, { headers: { "Content-Type": "text/uri-list" } })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default App;
