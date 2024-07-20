/* eslint-disable react/jsx-max-depth */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { LoadType, UserType } from '../../types';
import Loading from '../../components/Loading/Loading';
import './Profile.css';

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
    <main className="mt-5">
      <div className="row gutters-sm">
        <div className="col-md-6 d-flex justify-content-center">
          <div className="card profile-card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                {user?.image
                  ? (
                    <img
                      data-testid="profile-image"
                      src={ user?.image }
                      alt="Foto de Perfil"
                    />
                  )
                  : (
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                  )}
                <div className="mt-3">
                  <h4>{user?.name}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <div className="card profile-card mb-3">
            <div className="card-body profile-card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Nome</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {user?.name}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {user?.email ? user.email : 'None'}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Descrição</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {user?.description ? user.description : 'None'}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-12">
                  <Link to="/profile/edit" className="btn btn-info">Editar perfil</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
