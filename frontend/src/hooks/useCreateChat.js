import { createChat } from "../api/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateChat = () => {
  const queyClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["createChat"],
    mutationFn: createChat,
    onSuccess: () => {
      queyClient.invalidateQueries("Chats");
    },
  });
  return { mutate, isPending };
};

export default useCreateChat;
