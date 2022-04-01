import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHTTP } from '../hooks/useAPI';
import styles from './HomeInfo.module.css';

const HomeInfo = () => {
  const HTTP = useHTTP();
  const [userCount, setUserCount] = useState(0);
  const fetchUserCount = async () => {
    try {
      const data = await HTTP('get', '/users');
      if (data.isSuccess) setUserCount(data.result.count);
      else setUserCount(0);
    } catch (error) {}
  }; //TODO: error, fail

  useEffect(() => {
    fetchUserCount();
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
