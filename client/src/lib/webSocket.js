import { io } from 'socket.io-client';

const message2key = (message) => message.toUpperCase().replace(/ /g, '_');
const server = (message) => ({ [`SERVER__${message2key(message)}`]: `SERVER: ${message}` });
const client = (message) => ({ [`CLIENT__${message2key(message)}`]: `CLIENT: ${message}` });
const server_client = (message) => ({
  ...server(message),
  ...client(message),
});

export const EVENTS = {
  ...server_client('enter room'),
  ...server_client('send message'),
};

export const socketConnector = (namespace, options = {}) => {
  const socket = io(`${process.env.REACT_APP_API_URL}${namespace}`, {
    path: '/ws',
    transports: ['websocket'],
    autoConnect: false,
    ...options,
  });
  socket.on('connect', () => {
    console.log(`--- connected: [${namespace}] ${socket.id}`);
  });
  socket.on('disconnect', (reason) => {
    console.log(`--- disconnected: [${namespace}] ${reason}`);
  });
  return socket;
};
