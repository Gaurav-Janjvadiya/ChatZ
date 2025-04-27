import React from "react";

function MessageBubble({ name, message }) {
  return (
    <div
      className={`w-full flex items-center  ${
        name === message.sender.name ? "justify-start" : "justify-end"
      }`}
      key={message._id}
    >
      <p
        className={`w-fit p-2  ${
          name === message.sender.name ? "bg-[#2C2C2C]" : "bg-[#1F1F1F]"
        } -700-400800 rounded-lg flex items-center justify-start break-all`}
      >
        {message.content}
      </p>
    </div>
  );
}

export default React.memo(MessageBubble);
