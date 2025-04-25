import { useForm } from "react-hook-form";
import useSendMessages from "../hooks/useSendMessages";
import socket from "../socket.js";
import { useEffect } from "react";

function MessageInput({ receiver }) {
  const { register, handleSubmit } = useForm();
  const { isPending, mutate } = useSendMessages();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });

    
  }, []);

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
        <button
          type="submit"
          className={`${isPending ? "bg-gray-600" : "bg-white"}`}
          disabled={isPending}
        >
          {isPending ? "wait" : "Send"}
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
