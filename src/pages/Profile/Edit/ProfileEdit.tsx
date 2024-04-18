/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const isDisabled = !user.name
  || !user.description
  || !user.image
  || !emailRegex.test(user.email);

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
    <form onSubmit={ handleSubmit }>
      <label htmlFor="name">Nome</label>
      <input
        data-testid="edit-input-name"
        type="text"
        name="name"
        id="name"
        value={ user.name }
        onChange={ handleChange }
      />

      <label htmlFor="email">Email</label>
      <input
        data-testid="edit-input-email"
        type="email"
        name="email"
        id="email"
        value={ user.email }
        onChange={ handleChange }
      />
      <label htmlFor="description">Descrição</label>
      <input
        data-testid="edit-input-description"
        type="text"
        name="description"
        id="description"
        value={ user.description }
        onChange={ handleChange }
      />
      <label htmlFor="image">Foto</label>
      <input
        data-testid="edit-input-image"
        type="text"
        name="image"
        id="image"
        value={ user.image }
        onChange={ handleChange }
      />

      <button
        data-testid="edit-button-save"
        type="submit"
        disabled={ isDisabled }
      >
        Salvar
      </button>
    </form>
  );
}

export default ProfileEdit;
