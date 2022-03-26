import { IoIosArrowBack } from 'react-icons/io';
import { HiMenu } from 'react-icons/hi';
import styles from './RoomHeader.module.css';
import { Link } from 'react-router-dom';

const RoomHeader = ({ title }) => {
  // TODO: ArrowBack Link to the page before useing history
  // TODO: Menu Link to Menu contain way out
  return (
    <div className={styles.roomHeader}>
      <Link to='/'>
        <IoIosArrowBack size='2rem' />
      </Link>
      <h1> {title}</h1>
      <Link to='/'>
        <HiMenu size='2rem' />
      </Link>
    </div>
  );
};

export default RoomHeader;
