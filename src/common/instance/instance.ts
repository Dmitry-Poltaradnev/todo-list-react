import axios from "axios"

const token = "48641b81-cc23-4c36-bc64-22b8910abddf"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    "API-KEY": "0570d7e8-028b-4976-ac64-ded2181cd92b",
  },
})
