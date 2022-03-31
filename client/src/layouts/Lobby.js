import { Outlet, useLocation } from 'react-router-dom';
import { Header, Nav } from '../components';

import styles from './Lobby.module.css';

const Lobby = () => {
  const { pathname } = useLocation();
  const pageName = pathname.split('/')[1];
  const headerTitle = pageName ? pageName.charAt(0).toUpperCase() + pageName.slice(1) : 'Home';

  return (
    <>
      <Header title={headerTitle} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Nav />
    </>
  );
};

export default Lobby;
