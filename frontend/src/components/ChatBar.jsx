import React, { useState } from "react";
import ChatList from "./ChatList.jsx";
import MessageList from "./MessageList.jsx";
import useChats from "../hooks/useChats.js";

function NameBar() {
  const [activeReciever, setActiveReciever] = useState(null);
  const { isLoading, chats } = useChats();

  return (
    <div className="grid grid-cols-2">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ChatList
            activeReciever={activeReciever}
            setActiveReciever={setActiveReciever}
            chatList={chats}
          />
        </>
      )}
      <MessageList activeReciever={activeReciever} />
    </div>
  );
}

export default NameBar;
