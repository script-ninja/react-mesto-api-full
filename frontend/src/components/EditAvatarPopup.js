import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const input = React.useRef();


  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar(input.current.value);
  }


  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitButtonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field" htmlFor="avatar-link">
        <input
          id="avatar-link"
          className="form__text"
          type="url"
          name="avatar-link"
          placeholder="Ссылка на картинку"
          required
          ref={input}
        />
        <span id="avatar-link-error" className="form__text-error"></span>
      </label>
    </PopupWithForm>
  );
}
