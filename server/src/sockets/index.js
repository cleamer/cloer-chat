import { Server } from 'socket.io';
import userHandler from './userHandler.js';
import roomHandler from './roomHandler.js';
import chatHandler from './chatHandler.js';

export default (httpServer, app) => {
  const io = new Server(httpServer, {
    path: '/ws',
    serveClient: false,
    cors: { origin: process.env.CLIENT_URL },
  });

  app.set('io', io);
  const handlerWrapper = (handler) => (socket) => handler(io, socket);

  const userNsp = io.of('/users');
  const chatNsp = io.of('/chats');
  const roomNsp = io.of('/rooms');

  userNsp.on('connect', handlerWrapper(userHandler));
  chatNsp.on('connect', handlerWrapper(chatHandler));
  roomNsp.on('connect', handlerWrapper(roomHandler));
};
