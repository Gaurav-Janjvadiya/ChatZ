import React from "react";

function ChatBox({ name, onClick }) {
  return (
    <div
      onClick={() => onClick(name)}
      className="p-4 w-1/3 cursor-pointer bg-slate-400"
    >
      {name}
    </div>
  );
}

export default ChatBox;
