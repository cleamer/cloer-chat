import RoomRow from './RoomRow';
import styles from './RoomList.module.css';

const RoomList = ({ roomList }) => {
  return (
    <ul className={styles.list}>
      {roomList.map((room) => (
        <RoomRow key={room.roomId} room={room} />
      ))}
    </ul>
  );
};

export default RoomList;
