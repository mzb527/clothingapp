import API from "./api";

export function fetchCategories() {
  return API.get("/categories").then(res => res.data);
}