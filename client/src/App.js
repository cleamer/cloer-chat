import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Lobby } from './layouts';

function App() {
  return (
    <div className='App flex-center'>
      <div className='frame'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Lobby />}>
              <Route index element={<>Home</>} />
              <Route path='profile' element={<>profile</>} />
              <Route path='chats' element={<>chats</>} />
              <Route path='*' element={<Navigate to='/' />} />
            </Route>
            <Route path='/chat'>
              <Route index element={<Navigate to='/chats' />} />
              <Route path=':roomid' element={<>chat!!</>} />
            </Route>
            <Route path='/signin' element={<>sign in</>} />
            <Route path='/signup' element={<>sign up</>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
