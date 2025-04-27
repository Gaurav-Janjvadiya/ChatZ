import React from "react";
import ChatBox from "./ChatBox";
import useAuth from "../context/AuthContext.jsx";
import useChats from "../hooks/useChats.js";

function ChatList() {
  const { isLoading, chats } = useChats();

  const {
    user: { name },
  } = useAuth();

  return (
    <div className="bg-[#121212] rounded-xl p-2 h-full">
      <div className="h-full">
        {isLoading ? (
          <div className="space-y-3">Loading...</div>
        ) : (
          <>
            {chats?.map((chat) => (
              <ChatBox
                key={chat._id}
                name={chat.users.find((user) => user.name !== name).name}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ChatList;
