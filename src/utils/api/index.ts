import axios from "axios";
import {parseCookies} from 'nookies'


export const api = axios.create({
    baseURL: process.env.BACKEND_URL 
})

const { "PDZ_HUB_TOKEN": token } = parseCookies()
if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`
}
