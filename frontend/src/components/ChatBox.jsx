import React from "react";
import Divider from "@mui/material/Divider";
import { Chip } from "@mui/material";

function ChatBox({ name, onClick }) {
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
        onClick={() => onClick(name)}
      />
      <Divider />
    </>
  );
}

export default ChatBox;
