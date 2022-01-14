import { configApi } from '../components/constants.js';

export function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export function getUserData() {
  return fetch(`${configApi.baseURL}/users/me`, {
    headers: configApi.headers
  })
    .then(checkResponse)
}

export function getCards() {
  return fetch(`${configApi.baseURL}/cards`, {
    headers: configApi.headers
  })
    .then(checkResponse)
}


export function patchProfileData(name, about) {
  return fetch(`${configApi.baseURL}/users/me`, {
    method: 'PATCH',
    headers: configApi.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse)
}

export function patchAvatar(avatarLink) {
  return fetch(`${configApi.baseURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: configApi.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(checkResponse)
}

export function postNewCard(name, link) {
  return fetch(`${configApi.baseURL}/cards`, {
    method: 'POST',
    headers: configApi.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse)
}

export function deleteCard(cardID) {
  return fetch(`${configApi.baseURL}/cards/${cardID}`, {
    method: 'DELETE',
    headers: configApi.headers
  })
  .then(checkResponse)
}

export function putLike(cardID) {
  return fetch(`${configApi.baseURL}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: configApi.headers
  })
  .then(checkResponse)
}

export function deleteLike(cardID) {
  return fetch(`${configApi.baseURL}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: configApi.headers
  })
  .then(checkResponse)
}
