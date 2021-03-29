import { BASE_URL } from '../utils/utils';

class API {
  constructor(options) {
    this._baseURL = options.url;
  }

  _handleResponse(res) {
    return res.json()
      .then(data => {
        return res.ok
          ? Promise.resolve(data)
          : Promise.reject(`${data.validation ? data.validation.body.message : data.message}.`);
      });
  }

  getUserData() {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }

  setUserData({ name, about }) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }

  setUserAvatar(url) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(response => {
      return this._handleResponse(response);
    })
  }

  getCards() {
    return fetch(`${this._baseURL}/cards`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }

  addCard(card) {
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }

  deleteCard(cardID) {
    return fetch(`${this._baseURL}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }

  toggleLike(cardID, isLiked) {
    return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }
}

export default new API({
  url: BASE_URL
});
