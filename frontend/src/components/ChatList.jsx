import React from "react";
import ChatBox from "./ChatBox";
import useAuth from "../context/AuthContext.jsx";
import useChats from "../hooks/useChats.js";
import useUsers from "../hooks/useUsers.js";
import { useForm } from "react-hook-form";
import useCreateChat from "../hooks/useCreateChat.js";

function ChatList() {
  const { isLoading, chats } = useChats();
  const { isLoading: usersLoading, users } = useUsers();

  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useCreateChat();

  const {
    user: { name },
  } = useAuth();

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="bg-[#121212] space-y-4 rounded-xl p-2 h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="grid sm:w-1/2 gap-2">
        <select
          className="capitalize bg-[#222222] outline-none px-2 py-3 rounded-xl"
          {...register("name")}
        >
          {usersLoading ? (
            "Loading.."
          ) : (
            <>
              {users?.map((user) => (
                <option className="" key={user._id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </>
          )}
        </select>
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#1A66FF] text-white py-1 rounded-xl hover:bg-blue-700 transition"
        >
          {isPending ? "Creating..." : "Create Chat"}
        </button>
      </form>
      <div className="h-full">
        {isLoading ? (
          <div className="space-y-3">Loading...</div>
        ) : (
          <>
            {chats?.map((chat) => (
              <ChatBox
                key={chat._id}
                name={chat.users.find((user) => user.name !== name).name}
                lastMessage={chat?.lastMessage?.content}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ChatList;
