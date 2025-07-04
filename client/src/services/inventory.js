import API from "./api";

/**
 * GET /skus
 * @param {Object} params may include q, page, per_page, sort_by, order, category_id, vendor_id
 */
export function fetchSkus(params) {
  return API.get("/skus", { params }).then(res => res.data);
}

export function createSku(data) {
  return API.post("/skus", data).then(res => res.data);
}

export function updateSku(id, data) {
  return API.put(`/skus/${id}`, data).then(res => res.data);
}

export function deleteSku(id) {
  return API.delete(`/skus/${id}`).then(res => res.status === 204);
}