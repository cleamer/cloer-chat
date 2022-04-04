import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHTTP } from '../hooks/useAPI';
import styles from './HomeInfo.module.css';

const HomeInfo = () => {
  const [cancelHTTP, HTTP] = useHTTP();
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const response = await HTTP('get', '/users');
        if (!response.isData) return console.log(`get /users canceled: ${response.message}`);
        if (response.isSuccess) setUserCount(response.result.count);
        else setUserCount(0);
      } catch (error) {
        //TODO: error, fail
        console.log('[GET] /users: rejected');
        console.error(error);
      }
    })();

    return () => cancelHTTP.cancel('unmount');
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
