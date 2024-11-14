"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((request, response) => {
    console.log(`${new Date()} Request for ${request.url}`);
    response.end("Hi there");
});
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", (ws, client) => {
    ws.on("error", console.error);
    console.log("User connected------------------------------->", client);
    ws.on("message", (data, isBinary) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send("Hello! message from server");
});
server.listen(8080, () => {
    console.log("Websocket server listening on port 8080 ");
});
