import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "../api/message.js";
import useAuth from "../context/AuthContext.jsx";
import MessageInput from "./MessageInput.jsx";
import { io } from "socket.io-client";

function MessageList({ activeReciever }) {
  const { data } = useQuery({
    queryKey: ["fetchMessages", activeReciever],
    queryFn: () => fetchMessages(activeReciever && activeReciever),
  });
  const {
    user: { name },
  } = useAuth();

  return activeReciever ? (
    <div>
      {data?.messages.map((message) => (
        <div
          className={`flex items-end ${
            !(name == message.sender.name) ? "justify-end" : "justify-start"
          } m-1`}
          key={message._id}
        >
          <p className="border border-black p-2 rounded-xl">
            {message.content}
          </p>
        </div>
      ))}
      <MessageInput receiver={activeReciever} />
    </div>
  ) : (
    <p>PLEASE SELECT A USER</p>
  );
}

export default MessageList;
