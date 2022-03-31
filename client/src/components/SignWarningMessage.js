import { useMessage } from '../contexts/messageContext';
import styles from './SignWarningMessage.module.css';

const SignWarningMessage = () => {
  const message = useMessage();
  return <p className={styles.message}>{message}</p>;
};

export default SignWarningMessage;
