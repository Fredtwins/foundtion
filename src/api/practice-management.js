import { ajaxPost } from 'api/axios'

// 演练计划
export function prPlanApi (type, obj) {
  let url = `sf/sf_rehearsal_plan/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 批量改变状态
export function changeStatus (obj) {
  let url = 'sf/sf_rehearsal_plan/batchEdit'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 演练任务
export function prTaskApi (type, obj) {
  let url = `sf/sf_rehearsal_task/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 演练角色
export function prRoleApi (type, obj) {
  let url = `sf/sf_rehearsal_role/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 演练报告
export function prReportApi (obj) {
  let url = `sf/sf_rehearsal_plan/totalreport`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 初始化数据
export function prDataApi (obj) {
  let url = `sf/rld_typhoon_path/list`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}
