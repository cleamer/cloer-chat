import { createContext, useState, useContext } from 'react';

const MessageContext = createContext();
const UpdateMessageContext = createContext();

export const useMessage = () => {
  return useContext(MessageContext);
};
export const useUpdateMessage = () => {
  return useContext(UpdateMessageContext);
};
export const MessageProvider = ({ value, children }) => {
  const [Message, setMessage] = useState(value);
  return (
    <MessageContext.Provider value={Message}>
      <UpdateMessageContext.Provider value={setMessage}>{children}</UpdateMessageContext.Provider>
    </MessageContext.Provider>
  );
};
export default MessageProvider;
