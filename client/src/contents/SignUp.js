import styles from './SignInUp.module.css';

const SignIn = () => {
  return (
    <>
      <input className={`${styles.input} ${styles.text}`} type='email' name='email' placeholder='E-mail' autoComplete='off' maxLength='64' />
      <input className={`${styles.input} ${styles.text}`} type='nickname' name='nickname' placeholder='Nickname' autoComplete='off' />
      <input className={`${styles.input} ${styles.text}`} type='password' name='password' placeholder='Password' autoComplete='new-password' />
      <input className={`${styles.input} ${styles.text} ${styles.lastText}`} type='password' name='confirmPassword' placeholder='Confirm Password' autoComplete='off' />
      <input className={`${styles.input} ${styles.button}`} type='submit' value='Sign Up' />
      <input className={`${styles.input} ${styles.button}`} type='submit' value='Sign In' />
    </>
  );
};

export default SignIn;
