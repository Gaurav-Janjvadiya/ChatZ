import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "../api/message.js";
import useAuth from "../context/AuthContext.jsx";
import MessageInput from "./MessageInput.jsx";

function MessageList({ activeReciever }) {
  const { data } = useQuery({
    queryKey: ["fetchMessages", activeReciever],
    queryFn: () => fetchMessages(activeReciever && activeReciever),
  });
  const {
    user: { name },
  } = useAuth();
  console.log(data);
  return activeReciever ? (
    <div>
      {data?.messages.map((message) => (
        <div
          className={`${
            name == message.sender.name ? "bg-slate-500" : "bg-red-400"
          }`}
          key={message._id}
        >
          {message.content}
        </div>
      ))}
      <MessageInput receiver={activeReciever} />
    </div>
  ) : (
    <p>PLEASE SELECT A USER</p>
  );
}

export default MessageList;
