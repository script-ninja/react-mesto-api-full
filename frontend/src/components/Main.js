import React from 'react';
import Card from '../components/Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__avatar-overlay"
          onClick={props.onEditAvatar}
        >
          <img className="profile__avatar" src={currentUser.avatar} alt="Картинка профиля" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__career">{currentUser.about}</p>
          <button className="profile__edit-button" type="button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button className="profile__add-button" type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        {
          props.cards.length <= 0 &&
          <h2 className="gallery__message gallery__message_visible">Нет добавленных фотографий</h2>
        }
        {
          props.cards.map(card => (
	          <Card key={card._id}
	            card={card}
	            onCardClick={props.onCardClick}
	            onCardLike={props.onCardLike}
	            onCardDelete={props.onCardDelete}
	          />
            )
          )
        }
      </section>
    </main>
  );
}
