import React, { useState, useEffect } from "react";
import { fetchChats } from "../api/chat.js";
import { useQuery } from "@tanstack/react-query";
import ChatList from "./ChatList.jsx";
import MessageList from "./MessageList.jsx";

function NameBar() {
  const [activeReciever, setActiveReciever] = useState(null);
  const { data } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });
  useEffect(() => {
    console.log(activeReciever);
  }, [activeReciever]);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2">
      <ChatList
        activeReciever={activeReciever}
        setActiveReciever={setActiveReciever}
        chatList={data?.chats}
      />
      <MessageList activeReciever={activeReciever} />
    </div>
  );
}

export default NameBar;
