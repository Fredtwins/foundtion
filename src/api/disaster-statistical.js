import { ajaxPost2 } from 'api/axios'

// 列表
export function getList (page = 1, search = {}) {
  let url = 'disasterdamagereport/list'

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

// 详情查看
export function getDetail (search = {}) {
  let url = 'disasterdamagereport/stat'

  let data = {
    ...search
    // searchValue: search
  }

  return ajaxPost2(url, data, options())
}

// 查看部门详情
export function getDepartDetail (page = 1, search = {}) {
  let url = 'disasterdamagereport/detail'

  let data = {
    page,
    pageSize: 10,
    searchValue: search
  }

  return ajaxPost2(url, data, options())
}
