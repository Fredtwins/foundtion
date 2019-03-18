import { ajaxPost2 } from 'api/axios'

// 列表
export function getList (page = 1, search = {}) {
  let url = 'statlog/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: { createdt: -1 }
  }

  return ajaxPost2(url, data, options())
}

// 点击详情
export function geteditLists (obj) {
  let url = 'statlog/detail'

  let data = {
    ...obj
  }

  return ajaxPost2(url, data, options())
}
