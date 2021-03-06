import { ajaxPost } from 'api/axios'

// 列表
export function getUserList (page = 1, search = {}) {
  let url = 'dp/threeshed_info/list'

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

// 列表
export function getUserAllList (page = 1, search = {}) {
  let url = 'dp/threeshed_info/list'

  let data = {
    searchValue: {},
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 新增
export function getaddlist (obj) {
  let url = 'dp/threeshed_info/new'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 编辑
export function geteditlist (obj) {
  let url = 'dp/threeshed_info/edit'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 删除
export function getdellist (ids) {
  let url = 'dp/threeshed_info/delete'

  let data = {
    _ids: ids
  }

  return ajaxPost(url, data, options())
}
