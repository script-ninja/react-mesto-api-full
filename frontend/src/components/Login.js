import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login(props) {
  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(userData);
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="login__header">Вход</h2>
      <input name="email" className="login__input" type="email" placeholder="Email"
        autoComplete="email" required onChange={handleChange}
      />
      <input name="password" className="login__input" type="password" placeholder="Пароль"
        autoComplete="current-password" required onChange={handleChange}
      />
      <button className="login__button" type="submit">Войти</button>
      <p className="login__paragraph">Нет аккаунта? <Link className="login__link" to="/signup">Зарегистрироваться</Link></p>
    </form>
  );
}
