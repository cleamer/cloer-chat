import styles from './SignWarningMessage.module.css';

const SignWarningMessage = ({ errorMessage }) => {
  return <p className={styles.message}>{errorMessage}</p>;
};

export default SignWarningMessage;
