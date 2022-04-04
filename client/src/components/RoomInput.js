import { useRef, useState } from 'react';
import styles from './RoomInput.module.css';

const RoomInput = ({ messageDispatch, actions }) => {
  console.log('RoomInput');
  const userNickname = 'cloer1'; // TODO: JWT / localStorage / session storage /user context
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const sendHandler = () => {
    console.log('send the message');
    const message = { nickname: userNickname, message: inputRef.current.value, updatedAt: Date.now() };
    messageDispatch({ type: actions.ADD, payload: { message } });
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
