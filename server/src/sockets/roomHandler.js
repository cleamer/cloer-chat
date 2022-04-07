import EVENTS from '../lib/socketEventes.js';

const roomId2Name = (roomId) => `room-${roomId}`;

export default (io, socket) => {
  console.log('\n--- rooms namespace connected: ', socket.id);
  const roomsAdapter = io.of('/rooms').adapter;

  socket.on(EVENTS.CLIENT__ENTER_ROOM, (roomId, user) => {
    const roomName = roomId2Name(roomId);
    socket.join(roomName);
    socket.to(roomName).emit(EVENTS.SERVER__ENTER_ROOM, user?.nickname, socket.id);
    console.log(roomsAdapter.rooms);
  });

  socket.on(EVENTS.CLIENT__SEND_MESSAGE, (roomId, message) => {
    const roomName = roomId2Name(roomId);
    // socket.to(roomName).emit('server: broadcast client message', socket.id);
    // console.log(roomsAdapter.rooms);

    socket.to(roomName).emit(EVENTS.SERVER__SEND_MESSAGE, message);
    // console.log(roomsAdapter.rooms.get(roomName));
  });
};
