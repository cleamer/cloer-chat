import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Lobby, Sign } from './layouts';
import { Home, SignIn, SignUp } from './contents';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.frame}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Lobby />}>
              <Route index element={<Home />} />
              <Route path='profile' element={<>profile</>} />
              <Route path='chats' element={<>chats</>} />
              <Route path='*' element={<Navigate to='/' />} />
            </Route>
            <Route path='/chat'>
              <Route index element={<Navigate to='/chats' />} />
              <Route path=':roomid' element={<>chat!!</>} />
            </Route>
            <Route element={<Sign />}>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
