import React, { useState, useEffect, useRef } from "react";
import { socket } from "../api";
import "./chat.css";
import ChatInput from "./chat-input";
import ChatHistory from "./chat-history";
import { ListGroup, Container, Row, Col, Table } from "reactstrap";

const Chat = () => {
  // initialize
  const [initialize, setInitialize] = useState({
    name: "",
    room: ""
  });

  // chat
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ block: "end" });
  };

  const onChange = e => {
    setVal(e.target.value);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      socket.emit("newMsg", val);
      setVal("");
    }
  };
  const onKeyUp = e => {
    // if (e.keyCode === 13) {
    //   socket.emit("newMsg", val);
    //   setVal("");
    // }
  };

  socket.on("global-joinMsg", data => alert(data));
  socket.on("receiveMsg", data => {
    setMsg(data);
    scrollToBottom();
  });

  useEffect(() => {
    socket.on("getMsg", data => {
      setMsg(data);
      scrollToBottom();
    });

    socket.on("initialize", data => {
      setInitialize({
        ...data
      });
      scrollToBottom();
    });
  }, []);

  return (
    <div className="chat">
      <Table striped>
        <ChatHistory msg={msg} />
        <div ref={messagesEndRef} />
      </Table>

      <div className="chat-input" style={{ position: "absolute", bottom: "0px" }}>
        <ChatInput value={val} onKeyUp={onKeyUp} onKeyDown={onKeyDown} onChange={onChange} />
      </div>
    </div>
  );
};

export default Chat;
