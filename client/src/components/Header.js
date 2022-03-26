import styles from './Header.module.css';

const Header = ({ title, children }) => {
  return <header className={styles.header}>{children ?? <h1>{title}</h1>}</header>;
};

export default Header;
