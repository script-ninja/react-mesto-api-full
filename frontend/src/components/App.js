import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from './Header';
import Main   from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import auth from '../utils/auth';

import defaultAvatar from '../images/profile__avatar.jpg'

import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProtectedRoute';


export default function App() {
  const browserHistory = useHistory();


  // User ====
  const defaultUser = {
    _id: null,
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: defaultAvatar
  }
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  const [registeredUser, setRegisteredUser] = React.useState({
    _id: null,
    email: 'placeholder@email.com',
    loggedIn: false
  });

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      openInfoToolTip({ ...infoToolTipState, isLoading: true, message: 'Проверка данных...' });
      auth.validateToken(token)
      .then(res => {
        setRegisteredUser({ ...res.data, loggedIn: true });
        browserHistory.push('/');
      })
      .catch(err => console.log(err))
      .finally(() => closeAllPopups());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    api.getUserData()
    .then(res => setCurrentUser(res))
    .catch(err => console.log(err));
  }, []);

  function handleUpdateUser({ name, about }) {
    api.setUserData({ name, about })
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(error => { console.log(error); });
  }

  function handleUpdateAvatar(url) {
    api.setUserAvatar(url)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(error => { console.log(error); });
  }

  function onRegister(userData) {
    auth.register(userData)
    .then(res => {
      openInfoToolTip({ isLoading: false, success: true,
        message: 'Вы успешно зарегистрировались!'});
      browserHistory.push('/signin');
    })
    .catch(err => {
      console.log(err);
      openInfoToolTip({ isLoading: false, success: false, message: err });
    });
  }

  function onLogin({ email, password }) {
    auth.authorize({ email, password })
    .then(res => {
      localStorage.setItem('token', res.token);
      setRegisteredUser({ ...registeredUser, email, loggedIn: true });
      browserHistory.push('/');
    })
    .catch(err => {
      console.log(err);
      openInfoToolTip({ isLoading: false, success: false, message: err });
    });
  }

  function onLogout() {
    setRegisteredUser({ ...registeredUser, loggedIn: false })
    localStorage.removeItem('token');
    browserHistory.push('/signin');
  }


  // Cards ====
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getCards()
    .then(cards => { setCards(cards); })
    .catch(error => { console.log(error); });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch(error => { console.log(error); });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      const newCards = [];
      cards.forEach((c) => {
        if (c !== card) newCards.push(c);
      });
      setCards(newCards);
    })
    .catch(error => { console.log(error); });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(error => { console.log(error); });
  }

  // Popups ====
  const [isEditAvatarPopupOpen, openAvatarPopup] = React.useState(false);
  function handleEditAvatarClick() {
    openAvatarPopup(true);
  }

  const [isEditProfilePopupOpen, openProfilePopup] = React.useState(false);
  function handleEditProfileClick() {
    openProfilePopup(true);
  }

  const [isAddPlacePopupOpen, openPlacePopup] = React.useState(false);
  function handleAddPlaceClick() {
    openPlacePopup(true);
  }

  const [selectedCard, setSelectedCard] = React.useState(null);
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const [infoToolTipState, setInfoToolTipState] = React.useState({
    isLoading: true,
    isOpen: false,
    success: false,
    message: ''
  });
  function openInfoToolTip({ isLoading, success, message}) {
    setInfoToolTipState({ isOpen: true, isLoading, success, message });
  }

  function handlePopupClose(event) {
    if (
      event.target.classList.contains('popup__button-close') ||
      event.target === event.currentTarget
    ) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    openAvatarPopup(false);
    openProfilePopup(false);
    openPlacePopup(false);
    setSelectedCard(null);
    setInfoToolTipState({ ...infoToolTipState, isOpen: false });
  }


  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={registeredUser.email}
          loggedIn={registeredUser.loggedIn}
          onLogout={onLogout}
        />

        <Switch>
          <ProtectedRoute exact path="/" condition={registeredUser.loggedIn} redirectPath="/signin">
            <Main
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />

            <EditAvatarPopup
              onUpdateAvatar={handleUpdateAvatar}
              isOpen={isEditAvatarPopupOpen}
              onClose={handlePopupClose}
            />
            <EditProfilePopup
              onUpdateUser={handleUpdateUser}
              isOpen={isEditProfilePopupOpen}
              onClose={handlePopupClose}
            />
            <AddPlacePopup
              onAddPlace={handleAddPlaceSubmit}
              isOpen={isAddPlacePopupOpen}
              onClose={handlePopupClose}
            />
            <PopupWithForm
              name="confirmation"
              title="Вы уверены?"
              submitButtonText="Да"
            >
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={handlePopupClose} />
          </ProtectedRoute>

          <Route path="/signin">
            <Login onSubmit={onLogin} />
          </Route>

          <Route path="/signup">
            <Register onSubmit={onRegister} />
          </Route>

          <Route path="*">
            <p>Error 404: Not Found.</p>
          </Route>
        </Switch>

        <InfoToolTip
          success={infoToolTipState.success}
          message={infoToolTipState.message}
          isLoading={infoToolTipState.isLoading}
          isOpen={infoToolTipState.isOpen}
          onClose={handlePopupClose}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
