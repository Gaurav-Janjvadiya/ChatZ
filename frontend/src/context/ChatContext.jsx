import { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);

const useChat = () => {
  return useContext(ChatContext);
};

const ChatProvider = ({ children }) => {
  const [activeReceiver, setActiveReceiver] = useState(null);
  const updateReceiver = (receiver) => {
    setActiveReceiver(receiver);
  };
  return (
    <ChatContext.Provider value={{ activeReceiver, updateReceiver }}>
      {children}
    </ChatContext.Provider>
  );
};

export { useChat, ChatProvider };
