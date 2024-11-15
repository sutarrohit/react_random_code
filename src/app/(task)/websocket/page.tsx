"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

const Websocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const getRandomNumber = () => {
    // Use `ws://` for local development
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      alert("WebSocket Connected");
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      const data = event.data;
      console.log("Received message:", data);
      setMessages(data);
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onclose = () => {
      alert("WebSocket Disconnected");
      setIsConnected(false);
    };

    setSocket(newSocket);
  };

  const stopWS = () => {
    if (socket) {
      socket.close();
      setSocket(null);
      setIsConnected(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      <p className="absolute font-light right-4 top-[-25px] text-[17px] text-orange-800">
        Start websocket server to connect
      </p>

      <div className="w-full mt-10 text-center text-4xl font-bold text-slate-800">
        WebSocket
      </div>

      <div className="w-full min-h-[calc(100vh-100px)] flex flex-col justify-center items-center gap-4">
        <p className="mb-10">Click to get random number from WebSocket</p>

        <div className="mb-4 text-xl">
          {messages ? (
            <p className="">
              <span>Random Number : </span>{" "}
              <span className="font-medium text-orange-400 text-4xl">
                {JSON.parse(messages).value}
              </span>
            </p>
          ) : (
            "No data yet"
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4 w-full justify-center items-center">
            <button
              className="border border-gray-800 px-4 py-2 rounded-lg w-[150px]"
              onClick={getRandomNumber}
              disabled={isConnected}
            >
              Connect
            </button>
            <button
              className="border border-gray-800 px-4 py-2 rounded-lg w-[150px]"
              onClick={stopWS}
              disabled={!isConnected}
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Websocket;
