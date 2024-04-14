/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';
import './login.css';

function Login() {
  const [login, setLogin] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (login.length > 2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [login]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await createUser({ name: login });
    setLoading(false);
    navigate('/search');
    setLogin('');
  };

  if (loading) return <Loading />;

  return (
    <form className="centered card" onSubmit={ handleSubmit }>

      <label className="form-label" htmlFor="login" />
      <input
        className="form-control form-control-lg"
        placeholder="Nome"
        type="text"
        data-testid="login-name-input"
        value={ login }
        id="Login"
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
