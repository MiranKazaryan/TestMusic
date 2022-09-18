class Api {
  constructor({ baseUrl, headers }) {
    // тело конструктора
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status.message}`);
  }

  //получение карточек
  getInitialImages() {
    return fetch(`${this._baseUrl}/images`, {}).then(this._checkResponse);
  }
  //получение карточки
  getImage(id){
    return fetch(`${this._baseUrl}/images/${id}`,{}).then(this._checkResponse);
  }
  //добавление комментария
  addComment(comment, id) {
    return fetch(`${this._baseUrl}/images/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
      }),
    })
  }
  //добавление карточки
  addImages(arr) {
    return fetch(`${this._baseUrl}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arr
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
