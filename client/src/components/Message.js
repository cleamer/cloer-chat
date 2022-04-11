import React from 'react';
import { useAuth } from '../contexts/auth/authContext';
import styles from './Message.module.css';

const Message = ({ data: { nickname, message, updatedAt }, consecutive }) => {
  const { auth } = useAuth();
  const myNickname = auth.user.nickname;
  const fromMe = nickname === myNickname;
  return (
    <div className={`${styles.chatBox} ${fromMe ? styles.fromMe : ''}`}>
      {consecutive || fromMe ? '' : <span className={styles.nickname}>{nickname}</span>}

      <div className={`${styles.messageBox} ${fromMe ? styles.fromMe : ''}`}>
        <div className={styles.message}>{message}</div>
        <div className={styles.space} />
        <span className={styles.time}>{updatedAt}</span>
      </div>
    </div>
  );
};

export default Message;
