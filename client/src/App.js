import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Lobby, Sign } from './layouts';
import { Home, Room, SignIn, SignUp } from './contents';
import { RequireSigIn, RequireSignOut, NewRoom } from './components';
import UserProvider from './contexts/userContext';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.screen}>
      <div className={styles.frame}>
        <BrowserRouter>
          <UserProvider value={null}>
            <Routes>
              <Route path='/'>
                <Route element={<RequireSigIn />}>
                  <Route element={<Lobby />}>
                    <Route index element={<Home />} />
                    <Route path='profile' element={<>profile</>} />
                    <Route path='chats' element={<>chats</>} />
                    <Route path='*' element={<>Not Found</>} />
                  </Route>
                  <Route path='room'>
                    <Route index element={<Navigate to='/chats' />} />
                    <Route path='new' element={<NewRoom />} />
                    <Route path=':roomId' element={<Room />} />
                  </Route>
                  <Route path='sign/out' element={<>Sign Out</>} />
                </Route>
                <Route element={<RequireSignOut />}>
                  <Route path='sign' element={<Sign />}>
                    <Route path='up' element={<SignUp />} />
                    <Route path='in' element={<SignIn />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
