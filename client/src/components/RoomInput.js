import { EVENTS } from '../lib/webSocket';
import { useRef } from 'react';
import styles from './RoomInput.module.css';
import { useAuth } from '../contexts/auth/authContext';

const RoomInput = ({ roomId, messageDispatch, actionTypes, socket }) => {
  console.log('RoomInput');
  const { auth } = useAuth();
  const { userId, nickname } = auth.user;
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const sendHandler = () => {
    console.log('send the message');
    const message = { nickname, message: inputRef.current.value, updatedAt: Date.now() };
    messageDispatch({ type: actionTypes.ADD, payload: { message } });
    socket.emit(EVENTS.CLIENT__SEND_MESSAGE, roomId, message);
    inputRef.current.value = '';
  };

  const inputHandler = (e) => e.key === 'Enter' && buttonRef.current.click();

  return (
    <div className={styles.container}>
      <div className={styles.roomInputBox}>
        <input className={styles.roomInput} type='text' ref={inputRef} onKeyDown={inputHandler} />
        <button className={styles.roomButton} ref={buttonRef} onClick={sendHandler}>
          send
        </button>
      </div>
    </div>
  );
};

export default RoomInput;
