import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import { UserType } from '../../types';
import './header.css';
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const [data, setData] = useState<UserType>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const effect = async () => {
      const user = await getUser();
      setLoading(false);
      setData(user);
    };
    effect();
  }, []);

  if (loading) return <Loading />;

  return (
    <header data-testid="header-component">
      <nav className="nav-top">
        <button
          className="btn btn-primary btn-user" 
          data-testid="header-user-name">
            <span><FaUserCircle className='user-icon' /></span>
            <p>
            {data?.name}
            </p>
          </button>
      </nav>
      <nav className="nav-bottom navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="link" to="/search" data-testid="link-to-search">Pesquisar</NavLink>
        <NavLink className="link" to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
        <NavLink className="link" to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      </nav>
    </header>
  );
}

export default Header;
