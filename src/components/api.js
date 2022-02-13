export default class Api {
  constructor({ baseURL, headers }) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserData() {
    return fetch(`${this.baseURL}/users/me`, {
      headers: this.headers
    })
    .then(res => this._checkResponse(res));
  }

  getCards() {
    return fetch(`${this.baseURL}/cards`, {
      headers: this.headers
    })
    .then(res => this._checkResponse(res));
  }

  patchProfileData(name, activity) {
    return fetch(`${this.baseURL}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: activity
      })
    })
    .then(res => this._checkResponse(res));
  }

  patchAvatar(avatarLink) {
    return fetch(`${this.baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then(res => this._checkResponse(res));
  }

  postNewCard(name, link) {
    return fetch(`${this.baseURL}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this._checkResponse(res));
  }

  deleteCard(cardID) {
    return fetch(`${this.baseURL}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => this._checkResponse(res));
  }

  putLike(cardID) {
    return fetch(`${this.baseURL}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(res => this._checkResponse(res));
  }

  deleteLike(cardID) {
    return fetch(`${this.baseURL}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => this._checkResponse(res));
  }
}

// export function checkResponse(res) {
//   if (res.ok) {
//     return res.json()
//   }
//   return Promise.reject(`Ошибка: ${res.status}`)
// }

// export function getUserData() {
//   return fetch(`${configApi.baseURL}/users/me`, {
//     headers: configApi.headers
//   })
//     .then(checkResponse)
// }

// export function getCards() {
//   return fetch(`${configApi.baseURL}/cards`, {
//     headers: configApi.headers
//   })
//     .then(checkResponse)
// }

// export function patchProfileData(name, about) {
//   return fetch(`${configApi.baseURL}/users/me`, {
//     method: 'PATCH',
//     headers: configApi.headers,
//     body: JSON.stringify({
//       name: name,
//       about: about
//     })
//   })
//   .then(checkResponse)
// }

// export function patchAvatar(avatarLink) {
//   return fetch(`${configApi.baseURL}/users/me/avatar`, {
//     method: 'PATCH',
//     headers: configApi.headers,
//     body: JSON.stringify({
//       avatar: avatarLink
//     })
//   })
//   .then(checkResponse)
// }

// export function postNewCard(name, link) {
//   return fetch(`${configApi.baseURL}/cards`, {
//     method: 'POST',
//     headers: configApi.headers,
//     body: JSON.stringify({
//       name: name,
//       link: link
//     })
//   })
//   .then(checkResponse)
// }

// export function deleteCard(cardID) {
//   return fetch(`${configApi.baseURL}/cards/${cardID}`, {
//     method: 'DELETE',
//     headers: configApi.headers
//   })
//   .then(checkResponse)
// }

// export function putLike(cardID) {
//   return fetch(`${configApi.baseURL}/cards/likes/${cardID}`, {
//     method: 'PUT',
//     headers: configApi.headers
//   })
//   .then(checkResponse)
// }

// export function deleteLike(cardID) {
//   return fetch(`${configApi.baseURL}/cards/likes/${cardID}`, {
//     method: 'DELETE',
//     headers: configApi.headers
//   })
//   .then(checkResponse)
// }
