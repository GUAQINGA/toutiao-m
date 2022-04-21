import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

request.interceptors.request.use(function (config) {
  const {
    user
  } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  console.log(config)
  return config
}, function (error) {
  return Promise.reject(error)
})

export default request
