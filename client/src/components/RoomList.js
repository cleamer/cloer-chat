import RoomRow from './RoomRow';
import styles from './RoomList.module.css';

const RoomList = () => {
  const roomList = [];
  for (let i = 0; i < 30; i++) {
    roomList.push({ roomId: i, title: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오', participant: i });
  }
  return (
    <ul className={styles.list}>
      {roomList.map((room) => (
        <RoomRow key={room.roomId} room={room} />
      ))}
    </ul>
  );
};

export default RoomList;
