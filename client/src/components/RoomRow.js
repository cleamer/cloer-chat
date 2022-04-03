import { useNavigate } from 'react-router-dom';
import styles from './RoomRow.module.css';

const RoomRow = ({ room: { roomId, title, currentMemberCount = 10, maxMemberCount = 50 } }) => {
  //TODO: total member count
  const navigate = useNavigate();
  const onClick = () => navigate(`/room/${roomId}`, { state: { title } });
  return (
    <li className={styles.row} onClick={() => onClick()}>
      <span>{title}</span>
      <span>{`${currentMemberCount}/${maxMemberCount}`}</span>
    </li>
  );
};

export default RoomRow;
