import React from "react";
import Divider from "@mui/material/Divider";
import { Chip } from "@mui/material";
import { useChat } from "../context/ChatContext.jsx";

function ChatBox({ name }) {
  const { updateReceiver } = useChat();
  return (
    <>
      <Chip
        sx={{
          width: "100%",
          margin: "10px 0",
          textAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          padding: "1.5rem 0",
          fontSize: "large",
        }}
        label={name}
        onClick={() => updateReceiver(name)}
      />
      <Divider />
    </>
  );
}

export default ChatBox;
