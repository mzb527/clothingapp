import axios from "axios";
const API = axios.create({ baseURL: "/api" });

export function loginService({ username, password }) {
  return API.post("/auth/login", { username, password }).then(r => r.data);
}