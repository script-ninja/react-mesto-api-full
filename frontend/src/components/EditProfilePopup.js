
import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeAbout(event) {
    setAbout(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({ name, about });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field" htmlFor="profile-name">
        <input
          id="profile-name"
          className="form__text"
          type="text"
          name="user-name"
          placeholder="Ваше имя"
          minLength="2" maxLength="40" required
          value={name}
          onChange={handleChangeName}
        />
        <span id="profile-name-error" className="form__text-error"></span>
      </label>
      <label className="form__field" htmlFor="profile-hobby">
        <input
          id="profile-hobby"
          className="form__text"
          type="text"
          name="user-hobby"
          placeholder="Ваше хобби"
          minLength="2" maxLength="200" required
          value={about}
          onChange={handleChangeAbout}
        />
        <span id="profile-hobby-error" className="form__text-error"></span>
      </label>
    </PopupWithForm>
  );
}
