import styles from './SignInUp.module.css';

const SignIn = () => {
  return (
    <>
      <input className={`${styles.input} ${styles.text}`} type='email' name='email' placeholder='E-mail' autoComplete='off' />
      <input className={`${styles.input} ${styles.text} ${styles.lastText}`} type='password' name='password' placeholder='Password' autoComplete='new-password' />
      <input className={`${styles.input} ${styles.button}`} type='submit' value='Sign In' />
      <input className={`${styles.input} ${styles.button}`} type='submit' value='Sign Up' />
    </>
  );
};

export default SignIn;
