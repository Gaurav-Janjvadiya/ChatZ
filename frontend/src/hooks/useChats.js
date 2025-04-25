import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "../api/chat.js";

const useChats = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
    refetchOnWindowFocus: false,
  });

  return { isLoading, chats: data?.chats };
};

export default useChats;
