import axios from 'axios'
import configs from './config'
// import type { AxiosResponse } from 'axios'

axios.defaults.baseURL = configs.url

// http request 拦截器
axios.interceptors.request.use(
  async (config) => {
    const session = configs.session
    if (session && config.headers) {
      config.headers.cookie = 'cloudreve-session=' + session
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  (config) => {
    // 身份认证失败，跳转登录
    // if (config.data.status == 401) {
    // }


    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Response<T = any> = { status: number; msg: string; data: T }

export default axios
