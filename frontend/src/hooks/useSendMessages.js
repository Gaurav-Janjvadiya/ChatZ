import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../api/message.js";

const useSendMessages = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: sendMessage,
    onSuccess: (data) => {
      queryClient.invalidateQueries("fetchMessages");
    },
  });

  return { isPending, mutate };
};

export default useSendMessages;
