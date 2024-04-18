/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { LoadType, UserType } from '../../types';
import Loading from '../../components/Loading/Loading';

function Profile({ loadProps }: { loadProps: LoadType }) {
  const { load, setLoad } = loadProps;
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const getData = async () => {
      setLoad(true);
      const userData = await getUser();
      setUser(userData);
      setLoad(false);
    };
    getData();
  }, []);

  if (load) return <Loading />;

  return (
    <main>
      <img data-testid="profile-image" src={ user?.image } alt="Foto de Perfil" />
      <Link to="/profile/edit">Editar perfil</Link>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.description}</p>
    </main>
  );
}

export default Profile;
