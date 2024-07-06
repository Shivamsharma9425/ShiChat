import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "http://localhost:4500/";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState("");
  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      setId(socket.id);
      //   alert('connected')
    });
    socket.emit("joined", { user });
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    // socket.emit("disconnect");
    // socket.off();

    return () => {
      //    socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [messages]);
  console.log(messages);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
            <h2>Shi-Chat</h2>
            <a href="/">X</a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message key={i}
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(e)=>e.key==='Enter'? send(): null} type="text" id="chatInput" />
          <button onClick={send} className="sendBtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
