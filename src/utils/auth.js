const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return res.text().then((text) => {
      console.log("Resposta da API:", text);
      return Promise.reject(`Error: ${res.status} - ${text}`);
    });
  });
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return res.text().then((text) => {
      console.log("Resposta da API:", text);
      return Promise.reject(`Error: ${res.status} - ${text}`);
    });
  });
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return res.text().then((text) => {
      console.log("Resposta da API:", text);
      return Promise.reject(`Error: ${res.status} - ${text}`);
    });
  });
}
