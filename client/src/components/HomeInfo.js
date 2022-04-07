import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { socketConnector, EVENTS } from '../lib/webSocket';
import styles from './HomeInfo.module.css';

const usersSocket = socketConnector('/users');
const roomsSocket = socketConnector('/rooms');

const HomeInfo = () => {
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    usersSocket.connect();
    roomsSocket.connect();

    usersSocket.emit(EVENTS.CLIENT__HOME);
    usersSocket.on(EVENTS.SERVER__HOME, (count) => setUserCount(count));
    //TODO: socket get signed in users

    return () => {
      setUserCount(0);
      usersSocket.disconnect();
      roomsSocket.disconnect();
    };
  }, []);

  return (
    <div className={styles.info}>
      <span>{`접속자: ${userCount}명`}</span>
      <Link to='/room/new'>
        <button className={styles.newBtn}>new</button>
      </Link>
    </div>
  );
};

export default HomeInfo;
