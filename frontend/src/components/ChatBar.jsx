import React from "react";
import { fetchChats } from "../api/chat.js";
import { useQuery } from "@tanstack/react-query";
import ChatList from "./ChatList.jsx";
// import useAuth from "../context/AuthContext.jsx";

function NameBar() {
  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });
  // const { user } = useAuth();
  // console.log(user);
  !isLoading ? console.log(data && data) : "";
  return (
    <div>
      <ChatList chatList={data?.chats} />
    </div>
  );
}

export default NameBar;
