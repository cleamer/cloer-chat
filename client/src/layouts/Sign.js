import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SignWarningMessage } from '../components';
import styles from './Sign.module.css';

const Sign = () => {
  console.log('Sign');
  const [errorMessage, setErrorMessage] = useState('');
  const submitHandler = async (e) => e.preventDefault();

  return (
    <form className={styles.signBox} onSubmit={submitHandler}>
      {errorMessage ? <SignWarningMessage errorMessage={errorMessage} /> : null}
      <Outlet context={setErrorMessage} />
    </form>
  );
};

export default Sign;
