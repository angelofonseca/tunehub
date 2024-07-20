/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { UserType } from '../../../types';
import { getUser, updateUser } from '../../../services/userAPI';

function ProfileEdit() {
  const [load, setLoad] = useState(true);
  const userInfo = {
    name: '',
    email: '',
    image: '',
    description: '',
  };

  const [user, setUser] = useState<UserType>(userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoad(true);
      const userData = await getUser();
      setUser(userData);
      setLoad(false);
    };
    getData();
  }, []);

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isDisabled = !user.name || !user.description || !emailRegex.test(user.email);

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoad(true);
    await updateUser(user);
    setLoad(false);
    navigate('/profile');
  };

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevData) => (
      {
        ...prevData,
        [event.target.name]: event.target.value,
      }
    ));
  };

  if (load) return <Loading />;

  return (
    <form onSubmit={ handleSubmit } className="mt-5 pt-5">
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label" htmlFor="name">Nome</label>
        <div className="col-sm-10">
          <input
            data-testid="edit-input-name"
            type="text"
            name="name"
            id="name"
            className="form-control search-input"
            value={ user.name }
            onChange={ handleChange }
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input
            data-testid="edit-input-email"
            className="form-control search-input"
            type="email"
            name="email"
            id="email"
            value={ user.email }
            onChange={ handleChange }
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="description" className="col-sm-2 col-form-label">Descrição</label>
        <div className="col-sm-10">
          <input
            data-testid="edit-input-description"
            type="text"
            name="description"
            className="form-control search-input"
            id="description"
            value={ user.description }
            onChange={ handleChange }
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="image" className="col-sm-2 col-form-label">Foto</label>
        <div className="col-sm-10">
          <input
            data-testid="edit-input-image"
            type="text"
            name="image"
            id="image"
            className="form-control search-input"
            value={ user.image }
            onChange={ handleChange }
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-baseline ">
        <Link className="btn btn-primary" to="/profile">
          Voltar
        </Link>
        <button
          data-testid="edit-button-save"
          type="submit"
          className="btn btn-primary"
          disabled={ isDisabled }
        >
          Salvar
        </button>
      </div>
    </form>
  );
}

export default ProfileEdit;
