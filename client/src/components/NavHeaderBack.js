import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const NavHeaderBack = () => {
  const navigate = useNavigate();
  return <IoIosArrowBack size='2rem' onClick={() => navigate(-1)} />;
};

export default NavHeaderBack;
