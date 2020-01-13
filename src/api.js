const socket = require("socket.io-client")("ws://localhost:5001")

socket.on("connect", () => console.log("Connected to server"))
socket.on("disconnect", () => console.log("Disconnected from server"))

export { socket }
