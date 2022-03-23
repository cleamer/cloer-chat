import styles from './RoomRow.module.css';

const RoomRow = ({ room: { roomId, title, participant } }) => {
  const onClick = () => {
    console.log(roomId);
  };
  return (
    <li className={styles.row} onClick={() => onClick()}>
      <span>{title}</span>
      <span>{`${participant}/50`}</span>
    </li>
  );
};

export default RoomRow;
