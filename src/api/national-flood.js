import { ajaxPost } from 'api/axios'
// import { getUserIng } from 'common/js/util'

// 列表
export function getList (page = 1, search = {}) {
  let url = 'another_guoxun_result/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: { response_createdt: -1 }
    // order: { YYYYMM: -1 }
  }

  return ajaxPost(url, data, options())
}

// 详情查看
export function getDetail (search = {}) {
  let url = 'another_guoxun_result/detail'

  let data = {
    ...search
  }

  return ajaxPost(url, data, options())
}
