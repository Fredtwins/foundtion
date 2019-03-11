import { ajaxPost } from 'api/axios'

// 查询全部列表
export function getErcList (obj) {
  let url = 'sf_response_kanban/list'

  return ajaxPost(url, obj, options())
}

// 参与人员列表
export function participantsApi (obj) {
  let url = 'sf/sf_contact/list'

  return ajaxPost(url, obj, options())
}

// 警告事件日志
export function warningDailApi (obj) {
  let url = 'sf/sf_realtimewarning_log/list'

  return ajaxPost(url, obj, options())
}
