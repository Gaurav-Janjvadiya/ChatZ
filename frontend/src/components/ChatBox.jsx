import React from "react";
import { useChat } from "../context/ChatContext.jsx";

function ChatBox({ name, lastMessage }) {
  const { updateReceiver } = useChat();
  console.log(lastMessage);
  return (
    <>
      <div
        className="w-full p-2 bg-[#222222] rounded-xl mb-1 cursor-pointer"
        onClick={() => updateReceiver(name)}
      >
        <p className="text-xl capitalize">{name}</p>
        {lastMessage && (
          <p className="text-sm text-[#a1a09f]">Last Message : {lastMessage}</p>
        )}
      </div>
    </>
  );
}

export default ChatBox;
