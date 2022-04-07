import EVENTS from '../lib/socketEventes.js';

const roomId2Name = (roomId) => `room-${roomId}`;

export default (io, socket) => {
  console.log('\n--- rooms namespace connected: ', socket.id);
  console.log(Object.keys(io.engine.clients));

  socket.on('disconnect', (reason) => {
    console.log('-- users namespace disconnected: ', socket.id);
    io.of('/users').emit(EVENTS.SERVER__HOME, io.engine.clientsCount);
  });

  socket.on(EVENTS.CLIENT__ENTER_ROOM, (roomId, user) => {
    const roomName = roomId2Name(roomId);
    socket.join(roomName);
    socket.to(roomName).emit(EVENTS.SERVER__ENTER_ROOM, user?.nickname);
  });

  socket.on(EVENTS.CLIENT__SEND_MESSAGE, (roomId, message) => {
    const roomName = roomId2Name(roomId);
    socket.to(roomName).emit(EVENTS.SERVER__SEND_MESSAGE, message);
  });
};
