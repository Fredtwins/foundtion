import { ajaxPost } from 'api/axios'

export function getUserList (page = 1, search = {}) {
  let url = 'dynamic_form/list'
  let data = {
    page: page,
    pageSize: 10,
    order: { '_id': -1 },
    searchValue: {
      ...search
    }
  }
  return ajaxPost(url, data, options())
}

export function getUserLists (search = {}) {
  let url = 'dynamic_form/list'
  let data = {
    page: 1,
    pageSize: 10,
    order: { '_id': -1 },
    searchValue: {
      ...search
    }
  }
  return ajaxPost(url, data, options())
}

// 删除
export function getDelList (ids) {
  let url = 'dynamic_form/delete'
  let data = {
    _ids: ids
  }
  return ajaxPost(url, data, options())
}
