import { ajaxPost } from 'api/axios'
// import { getUserIng, likeStrSearch } from 'common/js/util'

// 表格列表
export function getuserList (page = 1, search = {}) {
  let url = 'dp_rpdata_template/listForDept'
  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
      // department_code:""
    }
  }
  return ajaxPost(url, data, options())
}

export function getuserListAll (search = {}) {
  let url = 'dp_rpdata_template/listForDept'

  let data = {
    searchValue: {
      // department_code: getUserIng().department_code
      ...search
    }
  }
  return ajaxPost(url, data, options())
}

// 删除
export function getdelList (ids) {
  let url = 'dp_rpdata_list/delete'
  let data = {
    _ids: ids
  }
  return ajaxPost(url, data, options())
}

// 上报
export function getshangbao (obj) {
  let url = 'dp_rpdata_list/edit'
  let data = {
    // _id:id,
    // status:"生效"
    ...obj
  }
  return ajaxPost(url, data, options())
}
