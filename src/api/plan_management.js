import { ajaxPost } from 'api/axios'
import { getUserIng } from 'common/js/util'

// 部门预案
// 查询全部列表
export function getdepList (obj) {
  let url = 'sf_emergence_plan/listForDept'
  let data = {
    page: obj.page,
    pageSize: obj.pageSize,
    order: {_id: -1} || obj.order,
    searchValue: {
      ...obj.searchValue
    }
  }
  return ajaxPost(url, data, options())
}
// 增加
export function addDep (obj) {
  let url = 'sf_emergence_plan/new'

  return ajaxPost(url, obj, options())
}

// 修改
export function updateDep (obj) {
  let url = 'sf_emergence_plan/edit'
  return ajaxPost(url, obj, options())
}

export function getUpdateDep (obj) {
  let url = 'sf_emergence_plan/edit'
  return ajaxPost(url, obj, options())
}

// 删除
export function deleteDep (obj) {
  let url = 'sf_emergence_plan/delete'
  return ajaxPost(url, obj, options())
}

// 预案审批
// 查询全部列表
export function getAprList (obj) {
  let url = 'sf_emergence_plan/submitlist'
  let data = {
    page: obj.page,
    pageSize: obj.pageSize,
    order: {_id: -1} || obj.order,
    searchValue: {
      ...obj.searchValue
    }
  }
  if (getUserIng().department_code === '0101') {
    data.searchValue = {
      ...obj.searchValue
    }
  } else {
    data.searchValue = {
      department_code: getUserIng().department_code,
      ...obj.searchValue
    }
  }

  return ajaxPost(url, data, options())
}
// 提交审批申请
export function submit (obj) {
  let url = 'sf_emergence_plan/submit'

  return ajaxPost(url, obj, options())
}

// 预案回退
export function withdraw (obj) {
  let url = 'sf_emergence_plan/withdraw'
  return ajaxPost(url, obj, options())
}

// 预案审批
export function approve (obj) {
  let url = 'sf_emergence_plan/approve'
  return ajaxPost(url, obj, options())
}

// 社区预案
// 查询全部列表
export function getcotList (obj) {
  let url = 'sf_emergence_plan/listForDept'
  let data = {
    page: obj.page,
    pageSize: obj.pageSize,
    order: {_id: -1} || obj.order,
    searchValue: {
      ...obj.searchValue
    }
  }
  return ajaxPost(url, data, options())
}
// 增加
export function addCot (obj) {
  let url = 'sf_emergence_plan/new'

  return ajaxPost(url, obj, options())
}

// 修改
export function updateCot (obj) {
  let url = 'sf_emergence_plan/edit'
  return ajaxPost(url, obj, options())
}

// 删除
export function deleteCot (obj) {
  let url = 'sf_emergence_plan/delete'
  return ajaxPost(url, obj, options())
}

// 专题预案
// 查询全部列表
export function getopicList (obj) {
  let url = 'sf_emergence_plan/list'

  return ajaxPost(url, obj, options())
}
// 增加
export function addTopic (obj) {
  let url = 'sf_emergence_plan/new'

  return ajaxPost(url, obj, options())
}

// 修改
export function updateTopic (obj) {
  let url = 'sf_emergence_plan/edit'
  return ajaxPost(url, obj, options())
}

// 删除
export function deleteTopic (obj) {
  let url = 'sf_emergence_plan/delete'
  return ajaxPost(url, obj, options())
}

// 获取闸站所有数据
export function getAllList () {
  let url = 'dp/bsi_sluicegate/list'

  let data = {
    searchValue: {},
    order: { _id: -1 }
  }

  return ajaxPost(url, data, options())
}

// 获取所有水库数据
export function getAllWaterList () {
  let url = 'dp/bsi_reservoir_major/list'

  let data = {
    searchValue: {},
    order: { _id: -1 }
  }

  return ajaxPost(url, data, options())
}

// 事件建议行动
export function eventApi (type, obj) {
  let url = `sf/sf_event_advise/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}
