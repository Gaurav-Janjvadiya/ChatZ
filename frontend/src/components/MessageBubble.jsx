import React from "react";

function MessageBubble({ name, message }) {
  return (
    <div
      className={`w-full flex items-center  ${
        name === message.sender.name ? "justify-start" : "justify-end"
      }`}
      key={message._id}
    >
      <p className="w-fit p-2 border border-gray-800 rounded-lg flex items-center justify-start break-all">
        {message.content}
      </p>
    </div>
  );
}

export default React.memo(MessageBubble);
