import { ajaxPost } from 'api/axios'

// 列表
export function getUserList (page = 1, search = {}) {
  let url = 'dp/bsi_sluicegate/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: { _id: -1 }
  }

  return ajaxPost(url, data, options())
}

// 新增
export function getaddlist (obj) {
  let url = 'dp/bsi_sluicegate/new'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 编辑
export function geteditlist (obj) {
  let url = 'dp/bsi_sluicegate/edit'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 删除
export function getdellist (ids) {
  let url = 'dp/bsi_sluicegate/delete'

  let data = {
    _ids: ids
  }

  return ajaxPost(url, data, options())
}
