// src/utils/auth.js
export const AUTH_KEY = 'auth_token';

export const isAuthenticated = () => !!localStorage.getItem(AUTH_KEY);

export const setAuth = (token) => localStorage.setItem(AUTH_KEY, token);

// opcional si algún día quieres limpiar sesión:
// export const clearAuth = () => localStorage.removeItem(AUTH_KEY);