import React from "react";
import useAuth from "../context/AuthContext";

function ChatPage() {
  const data = useAuth();
  console.log(data);
  return <div>ChatPage</div>;
}

export default ChatPage;