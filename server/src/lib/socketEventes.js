const message2key = (message) => message.toUpperCase().replace(/ /g, '_');
const server = (message) => ({ [`SERVER__${message2key(message)}`]: `SERVER: ${message}` });
const client = (message) => ({ [`CLIENT__${message2key(message)}`]: `CLIENT: ${message}` });
const server_client = (message) => ({
  ...server(message),
  ...client(message),
});

const EVENTS = {
  ...server_client('enter room'),
  ...server_client('send message'),
};

export default EVENTS;
