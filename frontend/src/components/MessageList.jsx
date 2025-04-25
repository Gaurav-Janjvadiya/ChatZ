import React, { useMemo, useState } from "react";
import useAuth from "../context/AuthContext.jsx";
import MessageBubble from "./MessageBubble.jsx";
import useMessages from "../hooks/useMessages.js";
import socket from "../socket.js";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSendMessages from "../hooks/useSendMessages";

function MessageList({ activeReciever }) {
  const { isLoading, messages } = useMessages(activeReciever);
  const [currentMessages, setCurrentMessages] = useState([]);
  const {
    user: { name },
  } = useAuth();

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
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const { register, handleSubmit, reset } = useForm();
  const { isPending, mutate } = useSendMessages();

  const onSubmit = (content) => {
    mutate({ content, receiver: activeReciever });
    socket.emit("send_message", room, content.content, activeReciever);
    reset();
  };

  return activeReciever ? (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className=" h-4/5">
            {messages?.length === 0 && currentMessages.length === 0 ? (
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
                {currentMessages.map((message, index) => (
                  <div
                    className={`flex items-center ${
                      message.sender == activeReciever
                        ? "justify-end"
                        : "justify-start"
                    } m-1`}
                    key={index}
                  >
                    <p className="border border-black p-2 rounded-xl">
                      {message.message}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
          <div>
            <form
              className="flex items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="border border-black p-2 rounded-xl m-1 outline-none"
                type="text"
                autoComplete="off"
                {...register("content")}
              />
              <button
                type="submit"
                className={`${isPending ? "bg-gray-600" : "bg-white"}`}
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  ) : (
    <p>PLEASE SELECT A USER</p>
  );
}

export default MessageList;
