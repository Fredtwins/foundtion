import { ajaxPost, ajaxPost2 } from 'api/axios'
import { betweenSearchRule } from 'common/js/config'
import { getUserIng, timeFilter, getPreMonth, getNextMonth } from 'common/js/util'

// 列表
export function getList (page = 1, search = {}) {
  let url = 'dp_guoxun_main/listForDept'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      // department_code: '010103',
      department_code: getUserIng().department_code,
      ...search
    },
    order: { response_createdt: -1 }
  }

  return ajaxPost(url, data, options())
}

// 新增获取表格模版
export function getDetail (title) {
  let url = 'dp_guoxundata_def/listForDept'

  let data = {
    // department_code: '010103',
    department_code: getUserIng().department_code,
    title
  }

  return ajaxPost(url, data, options())
}

// 修改
export function changeDetail (key = 'new', search = {}) {
  let url = `dp_guoxun_main/${key}`

  let data = {
    // department_code: '010103',
    department_code: getUserIng().department_code,
    ...search
  }

  return ajaxPost(url, data, options())
}

// 获取应急响应编号
export function getResponseNo () {
  let url = 'sf_response/list'

  let now = timeFilter(new Date(), 'yyyy-MM-dd')
  let lastMonth = getPreMonth(now)
  let nextMonth = getNextMonth(now)

  let data = {
    page: 0,
    searchValue: {
      closedt: `${lastMonth}${betweenSearchRule}${nextMonth}`
    },
    order: { _id: -1 }
  }

  return ajaxPost(url, data, options())
}

// 添加死亡人员统计表
export function Getaddguoxun (obj) {
  let url = 'dp_guoxun_main/new'

  let data = {
    ...obj
  }
  return ajaxPost2(url, data, options())
}

// 修改死亡人员统计表
export function Geteditguoxun (obj) {
  let url = 'dp_guoxun_main/edit'

  let data = {
    ...obj
  }
  return ajaxPost2(url, data, options())
}
