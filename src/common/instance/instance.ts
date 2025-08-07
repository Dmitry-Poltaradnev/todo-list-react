import axios from "axios"
import { AUTH_TOKEN } from "../constants/constants"

const baseURL = process.env.REACT_APP_BASE_URL
const token = process.env.REACT_APP_AUTH_TOKEN
const apiKey = process.env.REACT_APP_API_KEY

export const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    // Authorization: `Bearer ${token}`,
    "API-KEY": apiKey,
  },
})

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
  return config
})
