import { ajaxPost } from 'api/axios'
import { getUserIng, likeStrSearch } from 'common/js/util'

// 部门指挥库管理列表
export function LibraryList (page = 1, search = {}) {
  let url = 'dp_instruction/listForDept'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      department_code: likeStrSearch(getUserIng().department_code),
      department_level: getUserIng().department_level,
      ...search
    },
    order: { _id: -1 }
  }
  return ajaxPost(url, data, options())
}
// 新增
export function LibraryaddList (obj) {
  let url = 'dp_instruction/new'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}
// 修改
export function LibraryeditList (obj) {
  let url = 'dp_instruction/edit'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}
// 删除
export function LibrarydelList (ids) {
  let url = 'dp_instruction/delete'
  let data = {
    _ids: ids
  }
  return ajaxPost(url, data, options())
}

// 执行部门下拉框
export function getbumenList (obj) {
  let url = 'sys/department/list'
  let data = {
    searchValue: {
      ...obj
    }
  }
  return ajaxPost(url, data, options())
}
