import React from "react";
import { useChat } from "../context/ChatContext.jsx";

function ChatBox({ name }) {
  const { updateReceiver } = useChat();
  return (
    <>
      <div
        className="w-full p-2 bg-[#222222] rounded-xl mb-1 cursor-pointer"
        onClick={() => updateReceiver(name)}
      >
        {name}
      </div>
    </>
  );
}

export default ChatBox;
