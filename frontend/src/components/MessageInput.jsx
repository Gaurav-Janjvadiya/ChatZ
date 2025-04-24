import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../api/message.js";

function MessageInput({ receiver }) {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: sendMessage,
    onSuccess: (data) => {
      queryClient.invalidateQueries("fetchMessages");
      console.log(data);
    },
  });
  const onSubmit = (content) => {
    mutate({ content, receiver });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("content")} />
        <button>Send</button>
      </form>
    </div>
  );
}

export default MessageInput;
