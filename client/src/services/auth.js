import API from './api';

/**
 * POST /auth/login
 * @param {{username: string, password: string}}
 * @returns {Promise<{ access_token: string, user: Object }>}
 */
export function loginService(credentials) {
  return API
    .post('/auth/login', credentials)
    .then((res) => res.data);
}