import { ajaxPost } from 'api/axios'

export function getuserList (page = 1, search = {}) {
  let url = 'sys/sys_log/list'

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
