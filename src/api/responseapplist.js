import { ajaxPost } from 'api/axios'

// 列表
export function Getresponseapplist (page = 1, search = {}) {
  let url = ''

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

// 修改
export function delresponseapplist (obj) {
  let url = ''

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 提交
export function tijiaoresponseapplist (obj) {
  let url = ''

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}
