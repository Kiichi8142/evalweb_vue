import api from "./api"

export const csrfCookie = () => api.get('/sanctum/csrf-cookie')

export const login = (credentials) => api.post('/auth/login', credentials)

export const logout = () => api.post('/auth/logout')

export const getUser = () => api.get('/api/user')

export const changePassword = (credentials) => api.post('/auth/password', credentials)