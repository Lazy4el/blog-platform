import Cookies from 'js-cookie';

class API {
  _baseUrl = 'https://blog.kata.academy/api/';

  _getResponse = async (url, option = {}) => {
    const request = await fetch(url, option);
    if (!request.ok) {
      return request.text().then((text) => {
        text = JSON.parse(text);
        text = JSON.stringify(text.errors);
        throw new Error(text);
      });
    }

    return request.json();
  };

  // Получаем посты/статьи
  getArticles = async (limit = 5, offset = 0) => {
    const url = `${this._baseUrl}/articles?limit=${limit}&offset=${offset}`;
    const response = await this._getResponse(url);
    return response;
  };

  // Авторизация
  loginUser = async ({ email, password }) => {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    };
    const url = `${this._baseUrl}users/login`;
    const response = await this._getResponse(url, option);
    return response;
  };

  // Проверка авторизации
  currentUser = async () => {
    const token = Cookies.get('tokenUser');
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    const url = `${this._baseUrl}user`;
    const response = await this._getResponse(url, option);
    return response;
  };

  // Обновить профиль
  updateUser = async ({ username, email, image, password }) => {
    const token = Cookies.get('tokenUser');
    let userBody = {
      email: email,
      username: username,
      image: image,
    };

    if (password) {
      userBody = { password: password };
    }

    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: {
          ...userBody,
        },
      }),
    };
    const url = `${this._baseUrl}user`;
    const response = await this._getResponse(url, option);
    return response;
  };

  // Регистрация
  setRegistration = async ({ username, email, password }) => {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
        },
      }),
    };
    const url = `${this._baseUrl}users`;
    const response = await this._getResponse(url, option);
    return response;
  };

  // Получить статью
  getSlug = async (slug) => {
    const token = Cookies.get('tokenUser');
    const option = token && {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    const url = `${this._baseUrl}articles/${slug}`;
    const response = await this._getResponse(url, option);
    return response;
  };
}

export default new API();
