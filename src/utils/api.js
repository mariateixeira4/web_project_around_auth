class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(url, options) {
    return fetch(url, {
      ...options,
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return res.text().then((text) => {
        console.error("ERRO DA API:", res.status, text);
        return Promise.reject(`Error: ${res.status} - ${text}`);
      });
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {});
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {});
  }

  getAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateUserInfo(data) {
    return this.updateProfile(data);
  }

  updateProfile(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  unlikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId);
  }

  updateAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "f174f37a-8299-4ab5-bccf-d4097cad9eff",
    "Content-Type": "application/json",
  },
});

export default api;
