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
      <form
        className="flex items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="border border-black p-2 rounded-xl m-1 outline-none"
          type="text"
          {...register("content")}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default MessageInput;
