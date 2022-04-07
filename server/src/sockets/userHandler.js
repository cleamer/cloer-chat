export default (io, socket) => {
  console.log('-- users namespace connected: ', socket.id);
  socket.on('disconnect', (reason) => console.log('-- users namespace disconnected: ', socket.id));
};
