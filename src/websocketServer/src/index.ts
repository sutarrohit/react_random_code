import Websocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer((request, response) => {
  console.log(`${new Date()} Request for ${request.url}`);
  response.end("Hi there");
});

const wss = new WebSocketServer({ server });

// Function to generate a random number
const generateRandomNumber = () => {
  return Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 99
};

// Broadcast random number to all connected clients every 2 seconds
const broadcastRandomNumber = () => {
  const randomNumber = generateRandomNumber();
  wss.clients.forEach((client) => {
    if (client.readyState === Websocket.OPEN) {
      client.send(
        JSON.stringify({ type: "randomNumber", value: randomNumber })
      );
    }
  });
};

wss.on("connection", (ws) => {
  console.log("User connected. Total clients:", wss.clients.size);

  ws.on("error", console.error);

  ws.on("message", (data) => {
    console.log("Received message:", data);
  });

  ws.on("close", () => {
    console.log("User disconnected. Total clients:", wss.clients.size);
  });

  // Send a welcome message to the newly connected client
  // ws.send("Hello! You are connected to the random number server.");
});

// Start broadcasting random numbers every 2 seconds
setInterval(broadcastRandomNumber, 2000);

server.listen(8080, () => {
  console.log("WebSocket server listening on port 8080");
});
