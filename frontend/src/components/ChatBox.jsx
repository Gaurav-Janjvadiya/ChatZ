import React from "react";

function ChatBox({ name, onClick }) {
  return (
    <>
      <div
        onClick={() => onClick(name)}
        className={`bg-gray-600 p-4 rounded-s cursor-pointer`}
      >
        {name}
      </div>
    </>
  );
}

export default ChatBox;
