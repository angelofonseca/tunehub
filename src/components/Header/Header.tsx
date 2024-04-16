/* eslint-disable react-hooks/exhaustive-deps */
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { LoadType, UserType } from '../../types';
import Loading from '../Loading/Loading';
import './Header.css';

function Header({ loadProps } : { loadProps: LoadType }) {
  const { load, setLoad } = loadProps;

  const [data, setData] = useState<UserType>();

  useEffect(() => {
    const effect = async () => {
      setLoad(true);
      const user = await getUser();
      setLoad(false);
      setData(user);
    };

    effect();
  }, []);

  if (load) return <Loading />;

  return (
    <header data-testid="header-component">
      <nav className="nav-top">
        <button
          className="btn btn-primary btn-success btn-user"
          data-testid="header-user-name"
        >
          <span><FaUserCircle className="user-icon" /></span>
          <p>
            {data?.name}
          </p>
        </button>
      </nav>
      <nav className="nav-bottom navbar navbar-expand-lg navbar-light bg-light">
        <NavLink
          className="link"
          to="/search"
          data-testid="link-to-search"
        >
          Pesquisar
        </NavLink>
        <NavLink
          className="link"
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favoritos
        </NavLink>
        <NavLink
          className="link"
          to="/profile"
          data-testid="link-to-profile"
        >
          Perfil
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
