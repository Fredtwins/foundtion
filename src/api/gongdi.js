import { ajaxPost } from 'api/axios'
// import { getUserIng, likeStrSearch } from 'common/js/util'

// 列表
export function getuserList (page = 1, search = {}) {
  let url = 'dp/buildingsite_info/list'

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

export function getUserList (obj) {
  let url = 'dp/buildingsite_info/list'

  let data = {
    page: obj.page,
    pageSize: obj.pageSize,
    order: { _id: -1 } || obj.order,
    searchValue: {
      ...obj.searchValue
    }
  }

  return ajaxPost(url, data, options())
}

// 新增
export function getaddlist (obj) {
  let url = 'dp/buildingsite_info/new'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 编辑
export function geteditlist (obj) {
  let url = 'dp/buildingsite_info/edit'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 删除
export function getdellist (ids) {
  let url = 'dp/buildingsite_info/delete'

  let data = {
    _ids: ids
  }

  return ajaxPost(url, data, options())
}
