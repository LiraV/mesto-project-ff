function checkError (res) {
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = (config) => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
        .then(checkError);
        
}

export const getStudentsCards = (config) => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
      })
        .then(checkError);
        
}

export const uploadNewInfo = (config, name, job) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          about: job
        })
      })
        .then(checkError);
        
}

export const uploadNewCard = (config, cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      })
        .then(checkError);
}

export const removeCard = (config, id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
      })
        .then(checkError)
}

export const putLike = (config, id) => {
    return fetch(`${config.baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: config.headers
      })
        .then(checkError)
}

export const deleteLike = (config, id) => {
    return fetch(`${config.baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: config.headers
      })
        .then(checkError)
}

export const changeAvatar = (config, avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          avatar: avatarUrl
        })
      })
        .then(checkError)
}