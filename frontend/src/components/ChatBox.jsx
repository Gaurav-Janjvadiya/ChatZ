import React, { useEffect } from "react";
import { useChat } from "../context/ChatContext.jsx";

function ChatBox({ name }) {
  const { updateReceiver, receiver } = useChat();
  useEffect(() => {
    console.log({ name, receiver });
  }, [updateReceiver]);
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
