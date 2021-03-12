export function setToken(value) {
  localStorage.setItem('token', value);
}

export function setUser(value) {
  localStorage.setItem('user', value);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  return localStorage.getItem('user');
}

export function clearStorages() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
