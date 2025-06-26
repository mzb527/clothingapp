import axios from "axios";

const API = axios.create({ baseURL: "/api" });

export const fetchSkus = ({ page, per_page, q, sort_by, order, filters }) =>
  API.get("/skus", { params: { page, per_page, q, sort_by, order, ...filters } })
     .then(r => r.data);

export const createSku = data =>
  API.post("/skus", data).then(r => r.data);

export const updateSku = (id, data) =>
  API.put(`/skus/${id}`, data).then(r => r.data);

export const deleteSku = id =>
  API.delete(`/skus/${id}`);