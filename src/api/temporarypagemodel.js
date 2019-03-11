import { ajaxPost } from 'api/axios'

// 网页保存按钮
export function getaddList (obj) {
  let url = '/dynamic_form/new'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 表格列表
export function getUserList (search = {}) {
  let url = 'dynamic_form/list'

  let data = {
    searchValue: {
      ...search
    }
  }

  return ajaxPost(url, data, options())
}

// 网页修改按钮
export function geteditList (obj) {
  let url = 'dynamic_form/edit'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 删除
export function getDelList (ids) {
  let url = 'dynamic_form/delete'
  let data = {
    _ids: ids
  }
  return ajaxPost(url, data, options())
}
