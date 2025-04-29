import React from "react";
import { useChat } from "../context/ChatContext.jsx";

function ChatBox({ name, lastMessage }) {
  const { updateReceiver } = useChat();
  return (
    <>
      <div
        className="w-full flex items-start justify-start space-x-2 p-2 bg-[#222222] rounded-xl mb-1 cursor-pointer"
        onClick={() => updateReceiver(name)}
      >
        <div className="rounded-full capitalize h-14 w-14 bg-[#121212] flex items-center justify-center text-3xl ">
          {name[0]}
        </div>
        <div className="w-auto h-full flex items-start  flex-col justify-start ">
          <p className="text-xl capitalize">{name}</p>
          {lastMessage && (
            <p className="text-sm text-[#a1a09f]">
              Last Message : {lastMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatBox;
