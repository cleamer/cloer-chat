import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { WarningMessage } from '../components';
import { useAuth } from '../contexts/auth/authContext';
import { SignOutSuccess } from '../contexts/auth/authStates';
import styles from './Sign.module.css';

const WarningMessageMemo = React.memo(({ warningMessage }) => <WarningMessage warningMessage={warningMessage} />);

const Sign = () => {
  console.log('--- Sign');
  const { auth, setAuth } = useAuth();
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    if (auth.isError) {
      setWarningMessage(auth.message);
      setAuth(SignOutSuccess());
    }
  }, [auth]);

  const submitHandler = async (e) => e.preventDefault();

  return (
    <form className={styles.signBox} onSubmit={submitHandler}>
      <WarningMessageMemo warningMessage={warningMessage} />
      <Outlet context={setWarningMessage} />
    </form>
  );
};

export default Sign;
