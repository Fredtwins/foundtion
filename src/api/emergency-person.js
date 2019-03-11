import { ajaxPost } from 'api/axios'

// 列表
export function getList (page = 1, search = {}) {
  let url = 'another_monthrp_result/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: { YYYYMM: -1 }
  }

  return ajaxPost(url, data, options())
}

// 详情查看
export function getDetail (search = {}) {
  let url = 'another_monthrp_result/detail'

  let data = {
    ...search
  }

  return ajaxPost(url, data, options())
}
