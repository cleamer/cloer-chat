export default (io, socket) => {
  console.log('-- chats namespace connected: ', socket.id);
  socket.on('disconnect', (reason) => console.log('-- chats namespace disconnected: ', socket.id));
};
