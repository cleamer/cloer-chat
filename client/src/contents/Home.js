import { useHTTP } from '../hooks/useRequset';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomList, HomeInfo } from '../components';

const Home = () => {
  const navigate = useNavigate();
  const HTTP = useHTTP();
  const [roomList, setRoomList] = useState([]); // FIXME: dummy -> []
  const fetchRooms = async () => {
    try {
      const data = await HTTP('get', '/rooms');
      console.log(data);
      if (data.isSuccess) {
        setRoomList(data.result.rooms);
      } else {
        const message = data.message;
        navigate('/sign/in', { state: { message } });
      }
    } catch (error) {}
  }; //TODO: fetchRooms(url, setState)

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <HomeInfo />
      <RoomList roomList={roomList} />
    </>
  );
};

export default Home;
