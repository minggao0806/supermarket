import axios from 'axios'
// 创建axios请求实例
const request = axios.create({
  baseURL: '/api', // 设置接口统一的
  timeout: 10000
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
// 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

const get = (url, data) => request.get(url, {
  params: data
})
const put = (url, data) => request.put(url, data)

const post = (url, data) => request.post(url, data)

const deletes = (url, datas) => request.delete(url, {
  data: datas
})

export {
  get, put, post, deletes
}
