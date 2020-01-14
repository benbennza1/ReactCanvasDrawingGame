import { DevServerConfig } from "./config/config";

const socket = require("socket.io-client")(
    "ws://" + DevServerConfig.server + ":" + DevServerConfig.server_port
);

socket.on("connect", () => console.log("Connected to server"));
socket.on("disconnect", () => console.log("Disconnected from server"));

export { socket };
