import styles from './NavHeader.module.css';

const PlaceHolder = () => <div className={styles.placeholderBox}></div>;

const NavHeader = ({ back, title, menu }) => {
  console.log('NavHeader');
  // TODO: ArrowBack Link to the page before useing history
  // TODO: Menu Link to Menu contain way out
  return (
    <div className={styles.navHeader}>
      {back ?? <PlaceHolder />}
      <h1> {title}</h1>
      {menu ?? <PlaceHolder />}
    </div>
  );
};

export default NavHeader;
