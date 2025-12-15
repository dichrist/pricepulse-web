export function setToken(token: string) {
  localStorage.setItem("pp_token", token);
}

export function clearToken() {
  localStorage.removeItem("pp_token");
}

export function getToken() {
  return localStorage.getItem("pp_token");
}

export function isAuthed() {
  return !!getToken();
}
