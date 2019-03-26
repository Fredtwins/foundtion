import { ajaxPost2 } from 'api/axios'

// 列表
export function Getresponseapplist (page = 1, search = {}) {
  let url = 'response_application/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost2(url, data, options())
}

// 修改
export function delresponseapplist (obj) {
  let url = 'response_application/edit'

  let data = {
    ...obj
  }

  return ajaxPost2(url, data, options())
}

// 提交
export function tijiaoresponseapplist (ids) {
  let url = 'response_application/submit'

  let data = {
    _id: ids
  }

  return ajaxPost2(url, data, options())
}

// 删除
export function getdeleteapplist (ids) {
  let url = 'response_application/delete'

  let data = {
    _id: ids
  }

  return ajaxPost2(url, data, options())
}
