import React, { useMemo, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../context/AuthContext.jsx";
import MessageBubble from "./MessageBubble.jsx";
import useMessages from "../hooks/useMessages.js";
import socket from "../socket.js";
import useSendMessages from "../hooks/useSendMessages";
import { useChat } from "../context/ChatContext.jsx";

function MessageList() {
  const { activeReceiver } = useChat();
  const { isLoading, messages } = useMessages(activeReceiver);
  const [currentMessages, setCurrentMessages] = useState([]);
  const endRef = useRef(null);
  const {
    user: { name },
  } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const { isPending, mutate } = useSendMessages();

  let room = useMemo(() => {
    let roomname;
    if (activeReceiver && name) {
      roomname = [activeReceiver, name].sort().join("_");
      socket.emit("join_room", roomname);
    }
    return roomname;
  }, [activeReceiver, name]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("User Connected");
    });

    socket.on("new_message", (data) => {
      setCurrentMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSubmit = (content) => {
    mutate({ content, receiver: activeReceiver });
    socket.emit("send_message", room, content.content, activeReceiver);
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    reset();
  };

  if (!activeReceiver) {
    return (
      <div className="p-2 h-full max-h-screen">
        <div className="flex h-full border border-gray-500 p-3 rounded-xl items-center justify-center">
          <p className="text-lg text-gray-600 font-medium">
            Please select a user to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 h-full max-h-screen">
      <div className="h-full border border-gray-500 p-3 rounded-xl flex flex-col items-center justify-between">
        <div className="w-full h-[90%] space-y-1 overflow-y-scroll">
          {messages?.map((message) => (
            <MessageBubble key={message._id} message={message} name={name} />
          ))}
          {currentMessages.map((message, index) => (
            <div
              className={`w-full flex items-center  ${
                name === message.sender ? "justify-start" : "justify-end"
              }`}
              key={index}
            >
              <p className="w-fit p-2 border border-gray-800 rounded-lg flex items-center justify-start break-all">
                {message.message}
              </p>
            </div>
          ))}
          <span ref={endRef}></span>
        </div>
        <div className="w-full">
          <form
            className="flex p-1 w-full space-x-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="outline-none w-full border border-gray-500 rounded-xl px-2 py-3"
              type="text"
              {...register("content", { required: true })}
              placeholder="Type a message"
            />
            <button
              type="submit"
              className="border px-3 bg-gray-300 active:bg-slate-100 rounded-xl w-fit border-gray-500"
              disabled={isPending}
            >
              {isPending ? (
                <span className="spinner">Sending...</span>
              ) : (
                <span className="material-symbols-outlined text-gray-600 text-3xl">
                  send
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageList;
