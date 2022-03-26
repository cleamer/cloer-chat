import { Link } from 'react-router-dom';
import styles from './SignInUp.module.css';

const SignIn = () => {
  return (
    <>
      <input className={`${styles.input} ${styles.text}`} type='email' name='email' placeholder='E-mail' autoComplete='off' />
      <input className={`${styles.input} ${styles.text} ${styles.lastText}`} type='password' name='password' placeholder='Password' autoComplete='new-password' />
      <button className={`${styles.input} ${styles.button}`}>Sign In</button>
      <Link to='/signup'>
        <button className={`${styles.input} ${styles.button}`}>Sign Up</button>
      </Link>
    </>
  );
};

export default SignIn;
