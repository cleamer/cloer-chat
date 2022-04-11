import { useHTTP } from '../hooks/useAPI';
import { useEffect, useState } from 'react';
import { RoomList, HomeInfo } from '../components';
import { useAuth } from '../contexts/auth/authContext';
import { SignInFailure } from '../contexts/auth/authStates';

const Home = () => {
  const { setAuth } = useAuth();
  const [cancelHTTP, HTTP] = useHTTP();
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await HTTP('get', '/rooms');
        if (response.isError) return setAuth(SignInFailure(response.message));
        if (response.isSuccess) return setRoomList(response.result.rooms);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => cancelHTTP.cancel('unmount');
  }, []);

  return (
    <>
      <HomeInfo />
      <RoomList roomList={roomList} />
    </>
  );
};

export default Home;
