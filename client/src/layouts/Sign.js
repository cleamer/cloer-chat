import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { WarningMessage } from '../components';
import styles from './Sign.module.css';

const Sign = () => {
  console.log('Sign');
  const [warningMessage, setWarningMessage] = useState();
  const submitHandler = async (e) => e.preventDefault();

  return (
    <form className={styles.signBox} onSubmit={submitHandler}>
      {warningMessage ? <WarningMessage warningMessage={warningMessage} /> : null}
      <Outlet context={setWarningMessage} />
    </form>
  );
};

export default Sign;
