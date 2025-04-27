import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "../api/message.js";

const useMessages = (activeReceiver) => {
  const { isLoading, data } = useQuery({
    queryKey: ["fetchMessages", activeReceiver],
    queryFn: () => fetchMessages(activeReceiver && activeReceiver),
    refetchOnWindowFocus: false,
    enabled: Boolean(activeReceiver),
  });
  data ? console.log(data.messages[0]) : "";
  return { isLoading, messages: data?.messages };
};

export default useMessages;
