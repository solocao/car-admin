const moment = require('moment')

export const timeS = (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

// 判断用户权限对应的名称
export const roleName = (role) => {
  switch (role) {
    case 4: return '超级管理员'
    case 3: return '领导'
    case 2: return '项目经理'
    case 1: return '安全生产员'
    default: return '普通用户'
  }
}

// 用户权限 对应的描述
export const roleDescription = (role) => {
  switch (role) {
    case 4: return '最高管理员，具有所有权限'
    case 3: return '领导，具有查看功能'
    case 2: return '负责管理一般事务，审核整改情况'
    case 1: return '负责现场整改'
    default: return '普通用户'
  }
}
