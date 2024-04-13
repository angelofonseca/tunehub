import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { UserType } from '../types';

function Header() {
  const [data, setData] = useState<UserType>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const effect = async () => {
      setLoading(true);
      const user = await getUser();
      setLoading(false);
      setData(user);
    };
    effect();
  }, []);

  if (loading) return <Loading />;

  return (
    <header data-testid="header-component">
      <p data-testid="header-user-name">{data?.name}</p>
      <nav>
        <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      </nav>
    </header>
  );
}

export default Header;
