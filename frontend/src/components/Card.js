import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <figure className="photo-card">
      <img className="photo-card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <figcaption className="photo-card__caption">
        <h2 className="photo-card__title" title={card.name}>{card.name}</h2>
        <button className={
            `photo-card__like-button${(card.likes.some(i => i._id === currentUser._id) ?
            ' photo-card__like-button_liked' : '')}`
          }
          type="button"
          onClick={handleLike}
        >
          {card.likes.length}
        </button>
        {
          (card.owner._id === currentUser._id) &&
          <button className="photo-card__del-button" type="button" onClick={handleDelete}></button>
        }
      </figcaption>
    </figure>
  );
}
