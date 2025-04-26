import React from "react";
import ChatBox from "./ChatBox";
import useAuth from "../context/AuthContext.jsx";
import { Box } from "@mui/material";

function ChatList({ chatList, setActiveReciever }) {
  const {
    user: { name },
  } = useAuth();

  const onClick = (name) => {
    setActiveReciever(name);
  };

  return (
    <Box
      sx={{
        height: "100%",
        border: "1px solid gray",
        borderRadius: "1rem",
        padding: "1rem 0.5rem",
        gap: "10px",
        width: "30em",
      }}
    >
      {chatList?.map((chat) => (
        <ChatBox
          key={chat._id}
          name={chat.users.find((user) => user.name !== name).name}
          onClick={onClick}
        />
      ))}
    </Box>
  );
}

export default ChatList;
