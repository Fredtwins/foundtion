import { ajaxPost2, ajaxPost3 } from 'api/axios'

// 列表
export function Getapprovallist (obj) {
  let url = 'response_application/submitlist'

  let data = {
    page: obj.page,
    pageSize: obj.pageSize,
    order: {_id: -1} || obj.order,
    searchValue: {
      ...obj.searchValue
    }
  }

  return ajaxPost2(url, data, options())
}

// 回退应急响应申请对象
export function Regressionlist (ids) {
  let url = 'response_application/withdraw'

  let data = {
    _id: ids
  }

  return ajaxPost2(url, data, options())
}

// 失效应急响应申请对象
export function Invalidlist (ids) {
  let url = 'response_application/close'

  let data = {
    _id: ids
  }

  return ajaxPost2(url, data, options())
}

// 审批通过应急响应申请对象
export function passidlist (ids) {
  let url = 'sf-websocket/emergency/start_emergency'

  let data = {
    _id: ids
  }

  return ajaxPost3(url, data, options())
}
