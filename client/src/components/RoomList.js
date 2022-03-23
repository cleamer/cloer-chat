import React from 'react';
import RoomRow from './RoomRow';
import styles from './RoomList.module.css';

const RoomList = () => {
  const roomList = [
    { roomId: 1, title: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오', participant: 12 },
    { roomId: 2, title: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오', participant: 15 },
    { roomId: 3, title: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오', participant: 1 },
    { roomId: 4, title: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오', participant: 29 },
  ];
  return (
    <ul className={styles.list}>
      {roomList.map((room) => (
        <RoomRow key={room.roomId} room={room} />
      ))}
    </ul>
  );
};

export default RoomList;
