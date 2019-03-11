import { ajaxPost } from 'api/axios'

// 列表
export function getuserList (page = 1, search = {}) {
  let url = 'dp/chemical_company/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

export function getUserList (obj) {
  let url = 'dp/chemical_company/list'

  let data = {
    page: obj.page,
    pageSize: obj.pageSize,
    order: {_id: -1} || obj.order,
    searchValue: {
      ...obj.searchValue
    }
  }

  return ajaxPost(url, data, options())
}

// 列表
export function getUserAllList (page = 1, search = {}) {
  let url = 'dp/chemical_company/list'

  let data = {
    searchValue: {},
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 新增
export function getaddlist (obj) {
  let url = 'dp/chemical_company/new'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 编辑
export function geteditlist (obj) {
  let url = 'dp/chemical_company/edit'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 删除
export function getdellist (ids) {
  let url = 'dp/chemical_company/delete'

  let data = {
    _ids: ids
  }

  return ajaxPost(url, data, options())
}
