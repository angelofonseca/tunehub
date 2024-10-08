/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';
import './Login.css';
import { LoadType } from '../../types';

function Login({ loadProps } : { loadProps: LoadType }) {
  const { load, setLoad } = loadProps;

  const [login, setLogin] = useState('');
  const navigate = useNavigate();

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
    <main className="d-flex justify-content-center mt-5 p-5">
      <h1 className="h1-title">TuneHub</h1>
      <form className="centered login-card" onSubmit={ handleSubmit }>
        <label className="form-label" htmlFor="login">
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
        </label>
        <button
          className="btn btn-primary btn-lg"
          type="submit"
          data-testid="login-submit-button"
          disabled={ login.length < 3 }
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
