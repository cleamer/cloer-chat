import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Nav } from '../components';

import styles from './Lobby.module.css';

const Lobby = () => {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Nav />
    </div>
  );
};

export default Lobby;
