import { Outlet } from 'react-router-dom';
import { SignWarningMessage } from '../components';
import styles from './Sign.module.css';

const SignIn = () => {
  return (
    <form className={styles.signBox}>
      <SignWarningMessage />
      <Outlet />
    </form>
  );
};

export default SignIn;
