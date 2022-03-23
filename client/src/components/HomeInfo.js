import React from 'react';
import styles from './HomeInfo.module.css';

const HomeInfo = () => {
  const currentUsers = 283;
  return (
    <div className={styles.info}>
      <span>{`접속자: ${currentUsers}명`}</span>
      <button>create</button>
    </div>
  );
};

export default HomeInfo;
