import axios from 'axios'

const api = axios.create({
    baseURL: 'https://nousdb.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api