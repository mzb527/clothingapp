import API from './api';

/**
 * GET /skus
 * @param {Object} params
 * @returns {Promise<{ items: Array, total: number, page: number, per_page: number }>}
 */
export function fetchSkus(params) {
  return API
    .get('/skus', { params })
    .then((res) => res.data);
}

export function createSku(data) {
  return API
    .post('/skus', data)
    .then((res) => res.data);
}

export function updateSku(id, data) {
  return API
    .put(`/skus/${id}`, data)
    .then((res) => res.data);
}

export function deleteSku(id) {
  return API
    .delete(`/skus/${id}`)
    .then((res) => res.status === 204);
}