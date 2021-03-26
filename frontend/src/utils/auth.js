class Auth {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _handleResponse(res) {
    return res.json()
      .then(data => {
        return res.ok
          ? Promise.resolve(data)
          : Promise.reject(`Error ${res.status}: ${res.statusText}!\n${data.error || data.message}.`);
      });
  }

  /**
   * Регистрация нового пользователя
   * @param {string} email
   * @param {string} password
   * @returns {Promise} id пользователя и email, если промис исполнен.
   */
  // {
  //   "data": {
  //     "_id": "5f5204c577488bcaa8b7bdf2",
  //     "email": "email@yandex.ru"
  //   }
  // }
  register({ email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => this._handleResponse(res));
  }

  /**
   * Авторизация
   * @param {string} email
   * @param {string} password
   * @returns {Promise} токен JWT, если промис исполнен.
   */
  // { token: }
  // 400 - не передано одно из полей
  // 401 - пользователь с email не найден
  authorize({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => this._handleResponse(res));
  }

  /**
   * Проверка валидности токена
   * @param {JsonWebToken} token
   * @returns {Promise} id пользователя и email при исполненном промисе.
   */
  //  "data": {
  //    "_id":"1f525cf06e02630312f3fed7",
  //    "email":"email@email.ru"
  //  }
  //  - Если токен не передан или передан без Bearer
  //    401 — Токен не передан или передан не в том формате
  //  - Если передан некорректный токен
  //    401 — Переданный токен некорректен
  validateToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => this._handleResponse(res));
  }
}

export default new Auth({
  baseUrl: 'https://auth.nomoreparties.co'
});
