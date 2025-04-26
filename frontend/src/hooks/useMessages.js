import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "../api/message.js";

const useMessages = (activeReceiver) => {
  const { isLoading, data } = useQuery({
    queryKey: ["fetchMessages", activeReceiver],
    queryFn: () => fetchMessages(activeReceiver && activeReceiver),
    refetchOnWindowFocus: false,
    enabled: Boolean(activeReceiver),
  });
  return { isLoading, messages: data?.messages };
};

export default useMessages;
