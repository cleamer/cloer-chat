import styles from './RoomInput.module.css';

const RoomInput = () => {
  return (
    <div className={styles.container}>
      <div className={styles.roomInputBox}>
        <input className={styles.roomInput} type='text' />
        <button className={styles.roomButton}>send</button>
      </div>
    </div>
  );
};

export default RoomInput;
