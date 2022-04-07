import EVENTS from '../lib/socketEventes.js';

export default (io, socket) => {
  console.log('-- users namespace connected: ', socket.id);
  socket.on('disconnect', (reason) => {
    console.log('-- users namespace disconnected: ', socket.id);
    io.of('/users').emit(EVENTS.SERVER__HOME, 0);
  });
  // const {
  //   query: { _nsp },
  // } = socket.handshake;

  console.log(Object.keys(io.engine.clients));
  socket.on(EVENTS.CLIENT__HOME, () => {
    io.of('users').emit(EVENTS.SERVER__HOME, Object.keys(io.engine.clients).length);
  });
};
