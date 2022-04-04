import { useHTTP } from '../hooks/useAPI';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomList, HomeInfo } from '../components';

const Home = () => {
  const navigate = useNavigate();
  const [cancelHTTP, HTTP] = useHTTP();
  const [roomList, setRoomList] = useState([]); // FIXME: dummy -> []
  useEffect(() => {
    (async () => {
      try {
        const response = await HTTP('get', '/rooms');
        if (!response.isData) return console.log(`GET /rooms canceled: ${response.message}`);
        if (response.isSuccess) {
          setRoomList(response.result.rooms);
        } else {
          const message = response.message;
          navigate('/sign/in', { state: { message } });
        }
      } catch (error) {
        console.log('[GET] /rooms: rejected');
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
