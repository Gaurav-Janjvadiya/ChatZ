import React from "react";
import { Chip } from "@mui/material";

function MessageBubble({ name, message }) {
  return (
    <div
      className={`flex items-center ${
        name !== message.sender.name ? "justify-end" : "justify-start"
      } m-1`}
      key={message._id}
    >
      <Chip
        label={message.content}
        variant="outlined"
        sx={{
          borderRadius: "16px",
          padding: "10px",
          maxWidth: "60%",
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      />
    </div>
  );
}

export default React.memo(MessageBubble);
