import axios from "axios";

//to reduce the repetativeness of the code: saving the instance of axios into api

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function register({ username, email, password }) {
  try {
    const response = api.post(
      "/api/auth/register",
      {
        username,
        email,
        password,
      },
    );

    return (await response).data;
  } catch (error) {
    console.log(error);
  }
}

export async function login({ email, password }) {
  try {
    const response = api.post(
      "/api/auth/login",
      {
        email,
        password,
      },
    );

    return (await response).data;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  try {
    const response = api.get(
      "/api/auth/logout",
    );

    return (await response).data;
  } catch (error) {
    console.log(error);
  }
}
export async function getMe() {
  try {
    const response = api.get(
      "/api/auth/get-me",
    );

    return (await response).data;
  } catch (error) {
    console.log(error);
  }
}

