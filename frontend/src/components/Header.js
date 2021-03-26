import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';
import './Header.css';

export default function Header({ email, loggedIn, onLogout }) {
  return (
    <header className="header page__header">
      <a className="header__logo-link" href="https://script-ninja.github.io/mesto">
        <img className="header__logo" src={logo} alt="Логотип Mesto" />
      </a>
      {
        loggedIn
          ? (
            <p className="header__email">
              {email}
              <button className="header__button" type="button"
                onClick={onLogout}>Выйти</button>
            </p>
          )
          : (
            <Switch>
              <Route path="/signin">
                <Link className="header__link" to="/signup">Зарегистрироваться</Link>
              </Route>
              <Route path="/signup">
                <Link className="header__link" to="/signin">Войти</Link>
              </Route>
            </Switch>
          )
      }

    </header>
  );
}
