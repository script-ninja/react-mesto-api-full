import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

export default function Register(props) {
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
    <form className="register" onSubmit={handleSubmit}>
      <h2 className="register__header">Регистрация</h2>
      <input name="email" className="register__input" type="email" placeholder="Email"
        autoComplete="email" required onChange={handleChange}
      />
      <input name="password" className="register__input" type="password" placeholder="Пароль"
        autoComplete="current-password" required onChange={handleChange}
      />
      <button className="register__button" type="submit">Зарегистрироваться</button>
      <p className="register__paragraph">Уже зарегистрированы? <Link className="register__link" to="/signin">Войти</Link></p>
    </form>
  );
}
