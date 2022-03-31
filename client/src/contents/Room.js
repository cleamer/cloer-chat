import React from 'react';
import { Header, MessageList, NavHeader, NavHeaderBack, NavHeaderMenu, RoomInput } from '../components';
import styles from './Room.module.css';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { roomId } = useParams();

  return (
    <div className={styles.room}>
      <Header>
        <NavHeader title={roomId} back={<NavHeaderBack to='/chats' />} menu={<NavHeaderMenu to='/' />} />
      </Header>
      <MessageList />
      <RoomInput />
    </div>
  );
};

export default Chat;
