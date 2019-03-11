import { ajaxPost } from 'api/axios'
import { getUserIng } from 'common/js/util'

// 列表
export function getList (page = 1, search = {}) {
  let url = 'dp_monthrp_main/listForDept'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      // department_code: '0116',
      department_code: getUserIng().department_code,
      ...search
    },
    order: { YYYYMM: -1 }
  }

  return ajaxPost(url, data, options())
}

// 新增获取表格模版
export function getDetail (search = {}) {
  let url = 'dp_monthrpdata_def/listForDept'

  let data = {
    // department_code: '0116',
    department_code: getUserIng().department_code,
    ...search
  }

  return ajaxPost(url, data, options())
}

// 增删改
export function changeDetail (key = 'new', search = {}) {
  let url = `dp_monthrp_main/${key}`

  let data = {
    department_code: getUserIng().department_code,
    ...search
  }

  return ajaxPost(url, data, options())
}
