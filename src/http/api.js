import request from './request'

// 封装项目中常用的业务接口
/**
 * 封装登录接口
 */
export function login(username,password) {
  return request({
    url: "/login",
    method: 'post',
    data:{
      username,
      password
    }
  })
}
export function addUser(token) {
  return request({
    url: "/users",
    method: 'post',
    data:{
     token
    }
  })
}
export function userList(pageInfo) {
  return request({
    url: "/users",
    method: 'get',
    params:{
      query:pageInfo.query,
      pagenum:pageInfo.pagenum,
      pagesize:pageInfo.pagesize,
    }
  })
}

