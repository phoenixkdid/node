import axios from 'axios'

const API_URL = 'http://localhost:3000' // ganti URL dan port dengan URL dan port server API Anda

export const apiRequest = axios.create({
    baseURL: API_URL,
})

export const setAuthToken = (token) => {
    if (token) {
        apiRequest.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
        delete apiRequest.defaults.headers.common.Authorization
    }
}
