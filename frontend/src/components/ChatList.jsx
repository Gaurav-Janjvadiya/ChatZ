import React from "react";
import ChatBox from "./ChatBox";
import useAuth from "../context/AuthContext.jsx";

function ChatList({ chatList, setActiveReciever }) {
  const {
    user: { name },
  } = useAuth();

  const onClick = (name) => {
    setActiveReciever(name);
  };

  return (
    <div className="divide-y devide-gray-300 h-screen border border-black">
      {chatList?.map((chat) => (
        <ChatBox
          key={chat._id}
          name={chat.users.find((user) => user.name !== name).name}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

export default ChatList;
