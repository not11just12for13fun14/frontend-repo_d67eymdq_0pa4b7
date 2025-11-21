export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export async function api(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || `Request failed: ${res.status}`)
  }
  return res.json()
}

export function getToken() {
  return localStorage.getItem('token')
}

export function setAuth(token, user) {
  localStorage.setItem('token', token)
  localStorage.setItem('email', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function getUser() {
  const raw = localStorage.getItem('user')
  return raw ? JSON.parse(raw) : null
}

export function clearAuth() {
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('user')
}
