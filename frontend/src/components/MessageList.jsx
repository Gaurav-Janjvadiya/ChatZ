import React from "react";
import useAuth from "../context/AuthContext.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageBubble from "./MessageBubble.jsx";
import useMessages from "../hooks/useMessages.js";

function MessageList({ activeReciever }) {
  const { isLoading, messages } = useMessages(activeReciever);

  const {
    user: { name },
  } = useAuth();

  return activeReciever ? (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className=" h-4/5">
            {messages?.length === 0 ? (
              <i className="text-gray-600">Say Hii</i>
            ) : (
              <>
                {messages?.map((message) => (
                  <MessageBubble
                    key={message._id}
                    message={message}
                    name={name}
                  />
                ))}
              </>
            )}
          </div>
          <MessageInput receiver={activeReciever} />
        </>
      )}
    </div>
  ) : (
    <p>PLEASE SELECT A USER</p>
  );
}

export default MessageList;
