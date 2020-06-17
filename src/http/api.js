import request from './request'

// 封装项目中常用的业务接口
/**
 * 封装登录接口
 */
export function login(username, password) {
  return request({
    url: "/login",
    method: 'post',
    data: {
      username,
      password
    }
  })
}
//添加用户功能
export function addUser(userInfo) {
  return request({
    url: "/users",
    method: 'post',
    data: userInfo
  })
}
//获取用户
export function userList(pageInfo) {
  return request({
    url: "/users",
    method: 'get',
    params: pageInfo
  })
}
//删除用户
export function deleteUser(id) {
  console.log(id)
  return request({
    url: `/users/${id}`,
    method: 'delete',
  })
}
//修改用户状态
export function editUserState(id, state) {
  console.log(id, state)
  return request({
    url: `/users/${Number(id)}/state/${state}`,
    method: 'put',
  })
}
//根据ID查询用户信息
export function findUser(id) {
  // console.log(id)
  return request({
    url: `/users/${id}`,
    method: 'get',
  })
}
//编辑用户
export function editUser(id, mobile, email) {
  console.log(id)
  return request({
    url: `/users/${Number(id)}`,
    method: 'put',
    data: {
      mobile,
      email
    }
  })
}
//获取用户角色
export function getRoleList() {

  return request({
    url: `roles`,
    method: 'get',
  })
}
//通过角色ID查询到角色名
export function getUserRoleInfo(roleId) {

  return request({
    url: `roles/${roleId}`,
    method: 'get',
  })
}
//分配用户角色
export function setUserRole(userId, data) {
  console.log(userId)
  return request({
    url: `users/${userId}/role`,
    method: 'put',
    data
  })
}
//获取用户权限列表
export function getRightList() {
  return request({
    url: `rights/list`,
    method: 'get',
  })
}
//获取树形结构
export function getRightTree() {
  return request({
    url: `rights/tree`,
    method: 'get',
  })
}
//分配权限给某个角色
export function setRightsRole(roleId, data) {
  return request({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data
  })
}