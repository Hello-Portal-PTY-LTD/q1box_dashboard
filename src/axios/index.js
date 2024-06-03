import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://www.q1box.com.au/v1'
})

axiosInstance.interceptors.request.use(
  (config) => {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    let token = user.token

    if (token) {
      config.headers.Authorization = 'Bearer ' + token
      config.headers.Accept = 'application/json'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error.response)
  }
)
