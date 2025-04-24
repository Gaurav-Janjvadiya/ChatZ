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
    <div>
      <ChatList setActiveReciever={setActiveReciever} chatList={data?.chats} />
      <MessageList activeReciever={activeReciever} />
    </div>
  );
}

export default NameBar;
