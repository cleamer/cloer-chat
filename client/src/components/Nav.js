import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { BsFillChatFill } from 'react-icons/bs';

import styles from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to='/'>
            <AiFillHome size='1.6rem' />
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            <FaUserAlt size='1.5rem' />
          </Link>
        </li>
        <li>
          <Link to='/chats'>
            <BsFillChatFill size='1.5rem' />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
