import { BASE_URL } from '../utils/utils';

class Auth {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _handleResponse(res) {
    return res.json()
      .then(data => {
        return res.ok
          ? Promise.resolve(data)
          : Promise.reject(`${data.validation ? data.validation.body.message : data.message}.`);
      });
  }

  /**
   * Регистрация нового пользователя
   * @param {string} email
   * @param {string} password
   * @returns {Promise} объект пользователя, если промис исполнен.
   */
  //  {
  //    "name": "Жак-Ив Кусто",
  //    "about": "Исследователь океана",
  //    "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  //    "_id": "605f07d952512520e0881d15",
  //    "email": "user@test.mail",
  //  }
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
   * @returns {Promise} объект пользователя при исполненном промисе.
   */
  //  {
  //    "name": "Жак-Ив Кусто",
  //    "about": "Исследователь океана",
  //    "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  //    "_id": "605f07d952512520e0881d15",
  //    "email": "user@test.mail",
  //  }
  //  401 — Токен не передан или передан не в том формате
  //  401 — Переданный токен некорректен
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
  baseUrl: BASE_URL
});
