import React from "react";
import ChatBox from "./ChatBox";
import useAuth from "../context/AuthContext.jsx";
import { Link } from "react-router";

function ChatList({ chatList, setActiveReciever }) {
  const {
    user: { name },
  } = useAuth();

  const handleClick = (name) => {
    setActiveReciever(name);
  };
  return (
    <div>
      {chatList?.map((chat) => (
        <ChatBox
          key={chat._id}
          name={chat.users.find((user) => user.name !== name).name}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}

export default ChatList;
