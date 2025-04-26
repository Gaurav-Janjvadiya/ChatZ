import React, { useMemo, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Container,
  Skeleton,
  CircularProgress,
  TextField,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import useAuth from "../context/AuthContext.jsx";
import MessageBubble from "./MessageBubble.jsx";
import useMessages from "../hooks/useMessages.js";
import socket from "../socket.js";
import useSendMessages from "../hooks/useSendMessages";

function MessageList({ activeReciever }) {
  const { isLoading, messages } = useMessages(activeReciever);
  const [currentMessages, setCurrentMessages] = useState([]);
  const containerRef = useRef(null);
  const {
    user: { name },
  } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const { isPending, mutate } = useSendMessages();

  let room = useMemo(() => {
    let roomname;
    if (activeReciever && name) {
      roomname = [activeReciever, name].sort().join("_");
      socket.emit("join_room", roomname);
    }
    return roomname;
  }, [activeReciever, name]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("new_message", (data) => {
      setCurrentMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSubmit = (content) => {
    mutate({ content, receiver: activeReciever });
    socket.emit("send_message", room, content.content, activeReciever);
    containerRef.current.scrollIntoView({ behavior: "smooth" });
    reset();
  };

  return activeReciever ? (
    <Container
      maxWidth={false}
      sx={{
        border: "1px solid gray",
        borderRadius: "1rem",
        padding: "0.5rem",
        height: "100%",
        width: "45em",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: ".5rem",
      }}
    >
      {isLoading ? (
        <div className="w-full h-full flex flex-col gap-4 p-3">
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width="80%"
              height={40}
              animation="wave"
              sx={{ alignSelf: index % 2 === 0 ? "flex-start" : "flex-end" }}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="h-[88%] p-3 w-full overflow-y-scroll">
            {messages?.length === 0 && currentMessages.length === 0 ? (
              <i className="text-gray-600">Say Hii</i>
            ) : (
              <>
                {messages?.map((message) => (
                  <MessageBubble
                    key={message._id}
                    message={message}
                    name={name}
                  />
                ))}
                {currentMessages.map((message, index) => (
                  <div
                    className={`flex items-center ${
                      message.sender === activeReciever
                        ? "justify-end"
                        : "justify-start"
                    } m-1`}
                    key={index}
                  >
                    <Chip
                      label={message.message}
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
                ))}
              </>
            )}
            <div ref={containerRef}></div>
          </div>

          <div className="w-full h-[12%]">
            <form
              className="flex w-full items-center justify-center space-x-1 p-1 rounded-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                sx={{
                  width: "90%",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                id="filled-multiline-flexible"
                label="Message"
                multiline
                maxRows={1}
                variant="filled"
                {...register("content")}
              />
              <Button
                type="submit"
                disabled={isPending}
                sx={{
                  height: "100%",
                  width: "10%",
                  backgroundColor: "lightgray",
                  "&:hover": {
                    opacity: "0.7",
                  },
                }}
              >
                {isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <SendRoundedIcon fontSize="large" />
                )}
              </Button>
            </form>
          </div>
        </>
      )}
    </Container>
  ) : (
    <p>PLEASE SELECT A USER</p>
  );
}

export default MessageList;
