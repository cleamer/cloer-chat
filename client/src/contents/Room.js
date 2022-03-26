import React from 'react';
import { Header, MessageList, RoomHeader, RoomInput } from '../components';
import styles from './Room.module.css';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { roomId } = useParams();

  return (
    <div className={styles.room}>
      <Header>
        <RoomHeader title={roomId} />
      </Header>
      <MessageList />
      <RoomInput />
    </div>
  );
};

export default Chat;
