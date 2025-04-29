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
        className={`w-fit p-2 font-semibold  ${
          name === message.sender.name ? "bg-[#2C2C2C]" : "bg-[#1F1F1F]"
        } rounded-xl flex items-start flex-col justify-center break-all`}
      >
        {message.content}
      </p>
      <br />
    </div>
  );
}

export default React.memo(MessageBubble);
