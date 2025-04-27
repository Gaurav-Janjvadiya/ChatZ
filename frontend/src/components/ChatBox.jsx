import React from "react";
import { useChat } from "../context/ChatContext.jsx";

function ChatBox({ name }) {
  const { updateReceiver } = useChat();
  return (
    <>
      <div
        className="w-full p-2 bg-gray-300 rounded-xl mb-1 cursor-pointer active:bg-gray-400"
        onClick={() => updateReceiver(name)}
      >
        {name}
      </div>
      <hr />
    </>
  );
}

export default ChatBox;
