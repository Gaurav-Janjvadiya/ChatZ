import { useForm } from "react-hook-form";
import useSendMessages from "../hooks/useSendMessages";

function MessageInput({ sendMessageHandler, receiver }) {
  const { register, handleSubmit } = useForm();
  const { isPending, mutate } = useSendMessages();

  const onSubmit = (content) => {
    mutate({ content, receiver });
    sendMessageHandler(content, receiver);
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
            autoComplete="off"
          {...register("content")}
        />
        <button
          type="submit"
          className={`${isPending ? "bg-gray-600" : "bg-white"}`}
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
