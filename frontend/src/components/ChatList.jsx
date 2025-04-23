import React from "react";
import ChatBox from "./ChatBox";
import useAuth from "../context/AuthContext.jsx";

function ChatList({ chatList }) {
  const {
    user: { name },
  } = useAuth();
  return (
    <div>
      {chatList?.map((chat) => (
        <ChatBox name={chat.users.find((user) => user.name !== name).name} />
      ))}
    </div>
  );
}

export default ChatList;
