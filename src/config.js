
export const apiKey = import.meta.env.VITE_API_TOKEN
export const QUERY_LIMIT = 3
export const HOST = 'http://127.0.0.1:8000'
export const API_URL = '/core/api'
export const USERS_URL = `${API_URL}/users`
export const HEADERS = {Authorization: `Token ${apiKey}`}