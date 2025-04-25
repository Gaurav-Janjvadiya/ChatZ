import React, { useMemo, useState } from "react";
import useAuth from "../context/AuthContext.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageBubble from "./MessageBubble.jsx";
import useMessages from "../hooks/useMessages.js";
import socket from "../socket.js";
import { useEffect } from "react";

function MessageList({ activeReciever }) {
  const { isLoading, messages } = useMessages(activeReciever);
  const [currentMessages, setCurrentMessages] = useState([
    { sender: "", content: "" },
  ]);
  const {
    user: { name },
  } = useAuth();

  const sendMessageHandler = (message, room, activeReciever) => {
    // console.log(message, room, sender);
    socket.emit("send_message", room, message, activeReciever);
  };
  let room = useMemo(() => {
    let roomname;

    if (activeReciever && name) {
      roomname = [activeReciever, name].sort().join("_");
      socket.emit("join_room", roomname);
    }
    return roomname;
  }, [activeReciever, name]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("new_message", (data) => {
      setCurrentMessages((prev) => [...prev, data]);
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [sendMessageHandler]);

  useEffect(() => {
    console.log("Updated currentMessages", currentMessages);
  }, [currentMessages]);

  return activeReciever ? (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className=" h-4/5">
            {messages?.length === 0 ? (
              <i className="text-gray-600">Say Hii</i>
            ) : (
              <>
                {messages?.map((message) => (
                  <MessageBubble
                    key={message._id}
                    message={message}
                    name={name}
                  />
                ))}
                {currentMessages?.map((message, index) => (
                  <div
                    className={`flex items-center ${
                      !(message?.sender == activeReciever)
                        ? "justify-end"
                        : "justify-start"
                    } m-1`}
                    key={index}
                  >
                    <p className="border border-black p-2 rounded-xl">
                      {message.content}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
          <MessageInput
            sendMessageHandler={(data) => {
              sendMessageHandler({ data, room, activeReciever });
            }}
            receiver={activeReciever}
          />
        </>
      )}
    </div>
  ) : (
    <p>PLEASE SELECT A USER</p>
  );
}

export default MessageList;
