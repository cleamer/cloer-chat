import { Link } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';

const NavHeaderMenu = ({ to }) => {
  return (
    <Link to={to}>
      <HiMenu size='2rem' />
    </Link>
  );
};

export default NavHeaderMenu;
