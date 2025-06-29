// central app configuration & constants
export const API_URL =
  process.env.REACT_APP_API_URL?.trim() || '/api';

export const ROLES = {
  MANAGER: 'manager',
  CLERK:   'clerk',
};