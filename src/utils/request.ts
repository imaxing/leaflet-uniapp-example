import axios from 'uni-axios-ts'
import config from '@/config'
const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 100000
})

instance.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: any) => {
    const { statusCode, data } = response
    if (statusCode !== 200) {
      uni.showToast({ title: 'fail', icon: 'error' })
      return Promise.reject(data)
    }

    if (data.code !== 200) {
      uni.showToast({ title: data.msg, icon: 'error' })
      return Promise.reject(data)
    }
    return data
  },
  error => {
    return Promise.reject(error)
  }
)
export default instance
