import { ajaxPost } from 'api/axios'

export function getUserList (page = 1, search = {}) {
  let url = 'sys/userinfo/list'

  let data = {
    page: page,
    pageSize: 10,
    order: {_id: -1},
    searchValue: {
      ...search
    }

  }

  return ajaxPost(url, data, options())
}

// 获取所有数据
export function getAllList (code) {
  let url = 'sys/userinfo/list'

  let data = {
    searchValue: {
      system_name: '南海区人民政府三防指挥系统',
      department_code: code
    }
  }

  return ajaxPost(url, data, options())
}

// 新增
export function getOgnList (obj) {
  let url = 'sys/userinfo/new'
  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}
// 编辑
export function updateUserList (obj) {
  let url = 'sys/userinfo/edit'
  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}
// 删除
export function updateUserPsw (ids) {
  let url = 'sys/userinfo/delete'
  let data = {
    _ids: ids

  }

  return ajaxPost(url, data, options())
}

// 用户角色下拉框
export function getrolelist (page = 1, search = {}) {
  let url = 'sys/role/list'
  let data = {
    page: page,
    searchValue: {
      ...search
    }
  }
  return ajaxPost(url, data, options())
}

// 用户角色下拉框
export function getroleAlllist () {
  let url = 'sys/role/list'
  let data = {
    searchValue: {}
  }
  return ajaxPost(url, data, options())
}

// 用户部门下拉框
export function getbumenlist (page = 1, search = {}) {
  let url = 'sys/department/list'
  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    }
  }
  return ajaxPost(url, data, options())
}
