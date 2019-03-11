/* global options */

import { ajaxPost } from 'api/axios'

// 转移人员统计
export function transferApi (obj) {
  let url = `transferreport/list`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 转移人员统计-详情
export function detailsApi (obj) {
  let url = `transferreport/stat`
  let data = {
    searchValue: {
      ...obj
    }
  }
  return ajaxPost(url, data, options())
}

// 受灾情况统计
export function affectedApi (obj) {
  let url = `disasterreport/list`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 受灾情况统计-详情
export function affecteddetailsApi (obj) {
  let url = `disasterreport/stat`
  let data = {
    'order': { 'department_name': 1 },
    'searchValue': {
      ...obj
    }
  }
  return ajaxPost(url, data, options())
}

// 防御工作情况统计
export function defenseApi (obj) {
  let url = `defensereport/list`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 防御工作情况统计-详情
export function defensedetailsApi (obj) {
  let url = `defensereport/stat`
  let data = {
    'order': { 'department_name': 1 },
    'searchValue': {
      ...obj
    }
  }
  return ajaxPost(url, data, options())
}

// 调度指令完成情况统计
export function message (obj) {
  let url = 'oa/sf_channel_message/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 预警信息发布情况
export function warning (obj) {
  let url = 'oa/sf_realtime_warning/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 气象数据查询与统计
export function weather (obj) {
  let url = 'oa/rld_temperature/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 时雨量
export function rainApi (obj) {
  let url = 'oa/rld_rain_hour/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 气象产品查询
export function product (obj) {
  let url = 'oa/rld_typhoon_info/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 水情查询与统计
export function water (obj) {
  let url = 'oa/rld_waterlevel/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 工情查询与统计
export function work (obj) {
  let url = 'oa/rld_device_run_rec_realtime/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 环境监测查询
export function environment (obj) {
  let url = 'oa/pollution_abnormality/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 预测数据查询
export function predict (obj) {
  let url = 'oa/nh_folo_10d_share/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 三防信息查询
export function info (obj) {
  let url = 'oa/sf_channel_message/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 应急措施列表
export function measureApi (obj) {
  let url = 'emergencyreport/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 应急措施统计
export function measuredetailsApi (obj) {
  let url = 'emergencyreport/detail'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 应急措施统计详情
export function measureadddetailsApi (obj) {
  let url = 'emergencyreport/detail'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 防台风转移人数列表
export function typhoonApi (obj) {
  let url = 'typhoonreport/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 防台风转移人数统计
export function typhoondetailsApi (obj) {
  let url = 'typhoonreport/stat'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 防台风转移人数详情
export function typhoonadddetailsApi (obj) {
  let url = 'typhoonreport/detail'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 暴雨情况列表
export function rainstormApi (obj) {
  let url = 'rainstormreport/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 暴雨情况统计表
export function rainstormdetailsApi (obj) {
  let url = 'rainstormreport/stat'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 暴雨情况数据统计详情
export function rainstormadddetailsApi (obj) {
  let url = 'rainstormreport/detail'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 数据上报日志
// export function rpdataApi (obj) {
//   let url = '/rpdata_log/list'
//   let data = {
//     page: obj.page,
//     pageSize: obj.pageSize,
//     order: {_id: -1 || obj.order},
//     searchValue: {
//       ...obj.searchValue
//     }
//   }
//   return ajaxPost(url, data, options())
// }

export function rpdataApi (page = 1, search = {}) {
  let url = 'rpdata_log/list'
  let data = {
    page: page,
    pageSize: 10,
    order: {_id: -1},
    searchValue: {
      ...search
    }
  }
  return ajaxPost(url, data, options())
}

// 数据上报日志详情
export function rpadataDetailApi (obj) {
  let url = 'rpdata_log/detail'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 临时报表统计
// export function temporaryReportApi (page = 1, search = {}) {
//   let url = 'sf_task/list'
//   let data = {
//     page: page,
//     pageSize: 10,
//     order:{_id:-1},
//     searchValue: {
//       task_no:'任临|#|like',
//       ...search
//     }
//   }
//   return ajaxPost(url, data, options())
// }

// 临时报表的接口
export function temporaryReportApi (page = 1, search = {}) {
  let url = 'dynamic_form/tempList'
  let data = {
    page: page,
    pageSize: 10,
    order: {_id: -1},
    searchValue: {
      // task_no:'任临|#|like',
      ...search
    }
  }
  return ajaxPost(url, data, options())
}

// 临时报表统计详情
export function temporaryReportDetailApi (obj) {
  let url = 'dynamic_form/detail'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}
