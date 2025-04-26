import React from "react";
import ChatBox from "./ChatBox";
import useAuth from "../context/AuthContext.jsx";
import { Box, Skeleton } from "@mui/material";
import useChats from "../hooks/useChats.js";

function ChatList() {
  const { isLoading, chats } = useChats();

  const {
    user: { name },
  } = useAuth();

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
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton
            sx={{ bgcolor: "grey.400", borderRadius: "1rem" }}
            variant="rectangular"
            width={"100%"}
            height={70}
          />{" "}
          <Skeleton
            sx={{ bgcolor: "grey.400", borderRadius: "1rem" }}
            variant="rectangular"
            width={"100%"}
            height={70}
          />{" "}
          <Skeleton
            sx={{ bgcolor: "grey.400", borderRadius: "1rem" }}
            variant="rectangular"
            width={"100%"}
            height={70}
          />{" "}
          <Skeleton
            sx={{ bgcolor: "grey.400", borderRadius: "1rem" }}
            variant="rectangular"
            width={"100%"}
            height={70}
          />
        </div>
      ) : (
        <>
          {chats?.map((chat) => (
            <ChatBox
              key={chat._id}
              name={chat.users.find((user) => user.name !== name).name}
            />
          ))}
        </>
      )}
    </Box>
  );
}

export default ChatList;
