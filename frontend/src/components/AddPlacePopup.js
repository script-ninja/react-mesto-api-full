import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({ name, link });
  }


  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      submitButtonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field" htmlFor="place-name">
        <input
          id="place-name"
          className="form__text"
          type="text"
          name="place-name"
          placeholder="Название"
          minLength="2" maxLength="30" required
          value={name}
          onChange={handleChangeName}
        />
        <span id="place-name-error" className="form__text-error"></span>
      </label>
      <label className="form__field" htmlFor="place-link">
        <input
          id="place-link"
          className="form__text"
          type="url"
          name="place-link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span id="place-link-error" className="form__text-error"></span>
      </label>
    </PopupWithForm>
  );
}
