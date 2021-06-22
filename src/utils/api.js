class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getInitialData() {
        return Promise.all([this.getDataCard(), this.getUserInfo()])
    }

    getDataCard() {
        return fetch(this._url+`cards`, {
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    addCard(data) {
        return fetch(this._url+`cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse);
    }

    changeLikeCardStatus(id, status) {
        if (status) {
            this._methodCard = 'PUT'
        }
        else {
            this._methodCard = 'DELETE'
        }
        return fetch(this._url+`cards/likes/${id}`, {
            method: this._methodCard,
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(this._url+`users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    editProfile(data) {
        return fetch(this._url+`users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse);
    }

    udateAvatar(data) {
        return fetch(this._url+`users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch(this._url+`cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse);
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
    headers: {
        authorization: '67508a95-3c83-40de-953a-884e486cfdce',
        "content-type": "application/json"
    }
})

export default api;