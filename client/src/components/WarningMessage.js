import styles from './WarningMessage.module.css';

const WarningMessage = ({ warningMessage }) => {
  return <p className={styles.message}>{warningMessage}</p>;
};

export default WarningMessage;
