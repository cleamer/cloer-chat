import { Outlet } from 'react-router-dom';
import { SignWarningMessage } from '../components';
import { MessageProvider } from '../contexts/messageContext';
import styles from './Sign.module.css';

const Sign = () => {
  const submitHandler = async (e) => e.preventDefault();

  return (
    <form className={styles.signBox} onSubmit={submitHandler}>
      <MessageProvider value=''>
        <SignWarningMessage />
        <Outlet />
      </MessageProvider>
    </form>
  );
};

export default Sign;
