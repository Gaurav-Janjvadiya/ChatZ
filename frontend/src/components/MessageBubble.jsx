import React from "react";
import RelativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

function MessageBubble({ name, message }) {
  dayjs.extend(RelativeTime);
  // console.log(message.createdAt);
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
