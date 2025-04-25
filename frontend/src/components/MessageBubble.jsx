import React from "react";

function MessageBubble({ name, message }) {
  return (
    <div
      className={`flex items-center ${
        !(name == message.sender.name) ? "justify-end" : "justify-start"
      } m-1`}
      key={message._id}
    >
      <p className="border border-black p-2 rounded-xl">{message.content}</p>
    </div>
  );
}

export default React.memo(MessageBubble);
