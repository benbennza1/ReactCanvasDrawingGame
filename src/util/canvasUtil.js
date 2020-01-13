import FakeServer from "./FakeServer"
import { socket } from "../api"

let canvas
let strokeArray
let ctx
let flag = false
let prevX = 0
let currX = 0
let prevY = 0
let currY = 0
let dot_flag = false

let x = "black"
let y = 2

// TODO: There is a bug where u go outside of the box and
const canvasUtil = {
	init: function() {
		canvas = document.getElementById("can")
		ctx = canvas.getContext("2d")
		// w = canvas.width;
		// h = canvas.height;

		canvas.addEventListener(
			"mousemove",
			function(e) {
				canvasUtil.findxy("move", e)
			},
			false
		)
		canvas.addEventListener(
			"mousedown",
			function(e) {
				canvasUtil.findxy("down", e)
			},
			false
		)
		canvas.addEventListener(
			"mouseup",
			function(e) {
				canvasUtil.findxy("up", e)
			},
			false
		)
		canvas.addEventListener(
			"mouseout",
			function(e) {
				canvasUtil.findxy("out", e)
			},
			false
		)
	},

	clear: function() {
		strokeArray = false
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	},

	color: function(obj) {
		switch (obj.id) {
			case "green":
				x = "green"
				break
			case "blue":
				x = "blue"
				break
			case "red":
				x = "red"
				break
			case "yellow":
				x = "yellow"
				break
			case "orange":
				x = "orange"
				break
			case "black":
				x = "black"
				break
			case "white":
				x = "white"
				break
			default:
				break
		}
		if (x === "white") y = 14
		else y = 2
	},

	draw: function(coords) {
		ctx.beginPath()
		ctx.moveTo(coords.prevX, coords.prevY)
		ctx.lineTo(coords.currX, coords.currY)
		ctx.strokeStyle = x
		ctx.lineWidth = y
		ctx.stroke()
		ctx.closePath()
	},

	save: function() {
		document.getElementById("canvasimg").style.border = "2px solid"
		const dataURL = canvas.toDataURL()
		document.getElementById("canvasimg").src = dataURL
		document.getElementById("canvasimg").style.display = "inline"
	},

	findxy: function(res, e) {
		if (res === "down") {
			prevX = currX
			prevY = currY
			currX = e.clientX - canvas.offsetLeft
			currY = e.clientY - canvas.offsetTop

			const coord = {
				prevX: prevX,
				prevY: prevY,
				currX: currX,
				currY: currY,
			}
			flag = true
			dot_flag = true

			socket.emit("dotCoord", coord)
			socket.on("getDotCoord", data => {
				if (dot_flag) {
					ctx.beginPath()
					ctx.fillStyle = x
					ctx.fillRect(data.currX, data.currY, 2, 2)
					ctx.closePath()
					dot_flag = false
				}
			})
		}
		//
		if (res === "up" || res === "out") {
			if (flag) FakeServer.post(null, strokeArray)
			flag = false
			// When user lift up the pen, post to server
		}
		if (res === "move") {
			if (flag) {
				prevX = currX
				prevY = currY
				currX = e.clientX - canvas.offsetLeft
				currY = e.clientY - canvas.offsetTop

				const coord = {
					prevX: prevX,
					prevY: prevY,
					currX: currX,
					currY: currY,
				}
				socket.emit("coord", coord)
				socket.on("getCoord", data => canvasUtil.draw(data))
			}
		}
	},
}
export default canvasUtil
