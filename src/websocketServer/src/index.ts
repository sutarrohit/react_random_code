/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Websocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer((request: any, response: any) => {
  console.log(`${new Date()} Request for ${request.url}`);
  response.end("Hi there");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  console.log("User connected------------------------------->");

  ws.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === Websocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("Hello! message from server");
});

server.listen(8080, () => {
  console.log("Websocket server listening on port 8080");
});
