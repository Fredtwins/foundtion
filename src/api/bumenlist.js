import { ajaxPost } from 'api/axios'
// import { getUserIng, likeStrSearch } from 'common/js/util'

// 部门列表
export function getUserList (page = 1, search = {}) {
  let url = 'sys/department/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    }
  }

  return ajaxPost(url, data, options())
}

export function getbumensList (page = 1, search = {}) {
  let url = 'sys/department/list'

  let data = {
    page: page,
    searchValue: {
      ...search,
      level: '4|#|ne'
    }
  }

  return ajaxPost(url, data, options())
}

// 获取部门级联第一级
export function getbumensListOne (page = 1) {
  let url = 'sys/department/list'
  let data = {
    page: page,
    searchValue: {
      level: '2'
    }
  }

  return ajaxPost(url, data, options())
}

// 获取部门级联第二级
export function getbumensListTwo (search) {
  let url = 'sys/department/list'
  let data = {
    page: 1,
    searchValue: {
      level2: search
    }
  }

  return ajaxPost(url, data, options())
}

export function getDepList () {
  let url = 'sys/department/list'

  let data = {
    searchValue: {}
  }

  return ajaxPost(url, data, options())
}

// 部门新增
export function getAddList (obj) {
  let url = 'sys/department/new'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 部门删除
export function getdelete (ids) {
  let url = 'sys/department/delete'
  let data = {
    _ids: ids
  }
  return ajaxPost(url, data, options())
}

// 部门修改
export function getedit (obj) {
  let url = 'sys/department/edit'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}
