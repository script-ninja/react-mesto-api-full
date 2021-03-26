export default function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_photo${props.card ? ' popup_visible' : ''}`}
      data-type="photo"
      onClick={props.onClose}
    >
      {props.card && <figure className="photo">
        <img className="photo__image" src={props.card.link} alt={props.card.name} />
        <figcaption className="photo__caption">
          <h2 className="photo__title">{props.card.name}</h2>
          <button className="popup__button-close popup__button-close_type_photo" type="button"></button>
        </figcaption>
      </figure>}
    </section>
  );
}
