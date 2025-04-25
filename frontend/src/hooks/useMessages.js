import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "../api/message.js";

const useMessages = (activeReciever) => {
  const { isLoading, data } = useQuery({
    queryKey: ["fetchMessages", activeReciever],
    queryFn: () => fetchMessages(activeReciever && activeReciever),
    refetchOnWindowFocus: false,
    enabled: Boolean(activeReciever),
  });
  return { isLoading, messages: data?.messages };
};

export default useMessages;
