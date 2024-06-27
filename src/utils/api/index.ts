import axios from "axios";
import { parseCookies } from 'nookies'
import { user } from "@/entities/Users";


export const api = axios.create({
    baseURL: process.env.BACKEND_URL
})

const { "PDZ_HUB_TOKEN": token } = parseCookies()
if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`
}

export function createUser(name: string | any, profilePicture: string | any): user {
    return {
      name: name,
      profilePicture: profilePicture
    } as user
  }


