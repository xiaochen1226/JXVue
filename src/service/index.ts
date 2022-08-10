// service统一出口
import JXRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import LocalCache from '@/utils/cache'

const jxRequest = new JXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = LocalCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('实例请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('实例请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('实例响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('实例响应成功的拦截')
      return err
    }
  }
})

export default jxRequest
