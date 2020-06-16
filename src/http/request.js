import Axios from 'axios'

// console.log('request.js中添加的:', process.env.BUILD_ENV)

// 针对npm run来自动读取不同环境变量
// const config = require(`../build/${process.env.BUILD_ENV}.js`)

// 创建axios实例
const service = Axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1',
  // baseURL: 'https://elm.cangdu.org/v2',
  timeout: 3000
})

// const token=localStorage.getItem('token')
// token?config.headers.Authorization="Bearer" + token:null;
// 请求拦截
service.interceptors.request.use(config => {
  if(config.url!=='login'){
    const token=localStorage.getItem('token')
    config.headers['Authorization'] = token
  }

  // console.log('请求拦截', config)
  return config
}, _error => {
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject('请求出错，请检查',_error)
})

// 响应拦截
service.interceptors.response.use(res => {
  // console.log('响应拦截',res)
  return res
}, error => {
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject('出错啦', error)
})

export default service
