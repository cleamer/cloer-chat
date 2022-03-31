import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const NavHeaderBack = ({ to }) => {
  return (
    <Link to={to}>
      <IoIosArrowBack size='2rem' />
    </Link>
  );
};

export default NavHeaderBack;
