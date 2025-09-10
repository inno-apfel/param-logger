import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const isProd = process.env.NODE_ENV === 'production';

const api = axios.create({
    baseURL: isProd 
        ? 'https://api.nousdb.com'
        : 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api