/* eslint-disable react-hooks/exhaustive-deps */
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
      <nav className="nav-top d-flex justify-content-between">
        <Link to="/" className="h1-title-link">
          <h1 className="h1-title">TuneHub</h1>
        </Link>
        <Link
          className="icon-container d-flex"
          data-testid="header-user-name"
          to="/profile"
        >
          <FaUserCircle className="user-icon" />
        </Link>
      </nav>
      <nav className="nav-bottom navbar navbar-expand-lg navbar-dark bg-dark">
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
