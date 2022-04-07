import React, { useState, useReducer, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Header, MessageList, NavHeader, NavHeaderBack, NavHeaderMenu, RoomInput } from '../components';
import { socketConnector, EVENTS } from '../lib/webSocket';

import styles from './Room.module.css';

const socket = socketConnector('/rooms');

const MESSAGES_ACTION_TYPES = {
  LOAD: 'load',
  ADD: 'add',
};

const messageReducer = (messages, action) => {
  switch (action.type) {
    case MESSAGES_ACTION_TYPES.LOAD:
      const loadedMessages = [];
      const messageNum = 100;
      for (let i = 0; i < messageNum; i++) {
        loadedMessages.push({
          nickname: `cloer${i % 7}`,
          message:
            i % 3
              ? '짧은 문장'
              : '장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문장문',
          updatedAt: `${Math.floor((messageNum - i) / 60)}:${(messageNum - i) % 60}`,
        });
      }
      return loadedMessages;

    case MESSAGES_ACTION_TYPES.ADD:
      const newMassage = action.payload.message;
      return [newMassage, ...messages];

    default:
      return messages;
  }
};

const MemoHeader = React.memo(({ title }) => (
  <Header>
    <NavHeader title={title} back={<NavHeaderBack to='/chats' />} menu={<NavHeaderMenu to='/' />} />
  </Header>
));
const MemoRoomInput = React.memo(({ roomId, messageDispatch }) => (
  <RoomInput roomId={roomId} messageDispatch={messageDispatch} actionTypes={MESSAGES_ACTION_TYPES} socket={socket} />
));

const Room = () => {
  console.log('Room');
  const { roomId } = useParams();
  const location = useLocation();
  const titleInit = location.state?.title || 'get title from server by http'; //TODO: useCallback
  const [title, setTitle] = useState(titleInit);
  const [messages, messageDispatch] = useReducer(messageReducer, []);

  const user = { userId: 1, nickname: 'cloer' }; //FIXME:

  //TODO: if change title, get title using WS and call setTitle function

  useEffect(() => {
    console.log('-- useEffect');
    socket.connect();
    socket.emit(EVENTS.CLIENT__ENTER_ROOM, roomId, user);

    socket.on(EVENTS.SERVER__ENTER_ROOM, (socketId) => {
      console.log(`This user just entered room-${roomId}!: ${socketId}`);
    });
    socket.on(EVENTS.SERVER__SEND_MESSAGE, (message) => {
      console.log(EVENTS.SERVER__SEND_MESSAGE);
      console.log(message);
      messageDispatch({ type: MESSAGES_ACTION_TYPES.ADD, payload: { message } });
    });

    messageDispatch({ type: MESSAGES_ACTION_TYPES.LOAD });
    return () => {
      // TODO: disconnect -> leave namespace
      socket.disconnect();
    };
  }, []);

  return (
    <div className={styles.room}>
      <MemoHeader title={title} />
      <MessageList messages={messages} />
      <MemoRoomInput roomId={roomId} messageDispatch={messageDispatch} />
    </div>
  );
};

export default Room;
