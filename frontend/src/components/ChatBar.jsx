import React, { useState } from "react";
import ChatList from "./ChatList.jsx";
import MessageList from "./MessageList.jsx";
import useChats from "../hooks/useChats.js";
import { Box } from "@mui/material";

function NameBar() {
  const [activeReciever, setActiveReciever] = useState(null);
  const { isLoading, chats } = useChats();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ChatList
            activeReciever={activeReciever}
            setActiveReciever={setActiveReciever}
            chatList={chats}
          />
        </>
      )}
      <MessageList activeReciever={activeReciever} />
    </Box>
  );
}

export default NameBar;
