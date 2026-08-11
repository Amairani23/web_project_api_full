
export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";


export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return res.json().then((error) => {
        console.log("Error del servidor:", error);
        return Promise.reject(error);
      });
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
        email,
        password,
    }),
  })
   .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(
      res.status === 400
        ? "No se ha proporcionado uno o más campos."
        : res.status === 401
        ? "No se ha encontrado al usuario con el correo electrónico especificado."
        : "Error en la solicitud."
    );
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    if (res.status === 400) {
      return Promise.reject(
        "400 - Token no proporcionado o proporcionado en el formato incorrecto."
      );
    }

    if (res.status === 401) {
      return Promise.reject("401 - El token proporcionado es inválido.");
    }

    return Promise.reject(`Error: ${res.status}`);
  });
};