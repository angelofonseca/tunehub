/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';
import './Login.css';
import { LoadType } from '../../types';

function Login({ loadProps } : { loadProps: LoadType }) {
  const { load, setLoad } = loadProps;

  const [login, setLogin] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (login.length > 2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [login]);
  /* Cria o usuário e navega para página de pesquisa */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoad(true);
    await createUser({ name: login });
    setLoad(false);

    navigate('/search');
    setLogin('');
  };

  if (load) return <Loading />;

  return (
    /* Formulário de cadastro */
    <form className="centered login-card" onSubmit={ handleSubmit }>

      <label className="form-label" htmlFor="login" />
      <input
        className="form-control form-control-lg"
        placeholder="Nome"
        type="text"
        data-testid="login-name-input"
        value={ login }
        id="login"
        name="login"
        onChange={ ({ target }) => setLogin(target.value) }
      />

      <button
        className="btn btn-primary btn-lg"
        type="submit"
        data-testid="login-submit-button"
        disabled={ isDisabled }
      >
        Entrar
      </button>

    </form>
  );
}

export default Login;
