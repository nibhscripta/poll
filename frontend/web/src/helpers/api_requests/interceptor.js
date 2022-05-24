import axios from './axios'

axios.interceptors.response.use(res => res, error => {
    if (error.response.status === 401) {
        const refreshToken = JSON.parse(localStorage.getItem('refresh_token'))
        const response = await axios.post('refresh_token', {refresh_token: refreshToken}, { "content-type": "application/json" })

        if (response.status === 200) {
            
        }
    }
})