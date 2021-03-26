export default function PopupWithForm(props) {
  return (
    <section
      className={`popup${props.isOpen ? ' popup_visible' : ''}`}
      data-type={props.name}
      onClick={props.onClose}
    >
      <form className="form" name={props.name} onSubmit={props.onSubmit}>
        <h2 className="form__title">{props.title}</h2>

        {props.children}

        <button className="form__button-submit" type="submit">{props.submitButtonText}</button>
        <button className="popup__button-close" type="button"></button>
      </form>
    </section>
  );
}
