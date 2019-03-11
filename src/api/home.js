import { ajaxPost } from 'api/axios'
import { getUserIng, likeStrSearch } from 'common/js/util'

// 权限
export function permissionsApi () {
  let data = {
    searchValue: {
      roleid: getUserIng().role_id
    }
  }
  let url = 'sys/role/modulelist'
  return ajaxPost(url, data, options())
}

// 重要提示
export function getPromptList () {
  let url = ''
  let data = {
    searchValue: {}
  }
  return ajaxPost(url, data, options())
}

// 预警
export function getWarmingList () {
  let url = 'town/inforce_warning'
  let data = {
    searchValue: {
      status: '生效'
    }
  }
  return ajaxPost(url, data, options())
}

// 天气预报
export function getWeatherList () {
  let url = 'forecast/folo_10d'
  let data = {
    searchValue: {}
  }
  return ajaxPost(url, data, options())
}

// 当前水情
export function getWaterList () {
  let url = 'water/waterlevel'
  let data = {
    searchValue: {
      'status': '启动'
    }
  }
  return ajaxPost(url, data, options())
}

// 应急响应提醒
export function response () {
  let url = 'sf_response/notice'
  return ajaxPost(url, {}, options())
}

// 预警公告
export function warningNotice () {
  let url = 'sf/sf_emergency_warning/list'
  let data = {
    searchValue: {
      'status': '生效'
    }
  }
  return ajaxPost(url, data, options())
}

// 通知公告
export function notice (page) {
  let url = 'sf/sf_notice/list'
  let data = {
    page: 1 || page,
    pageSize: 10,
    searchValue: {
      'status': '发布'
    }
  }
  return ajaxPost(url, data, options())
}

// 任务执行提醒
export function taskRemind () {
  let url = 'sf_task/listForDept'
  let data = {
    order: { _id: -1 },
    searchValue: {
      'department_code': likeStrSearch(getUserIng().department_code),
      'status': '进行中',
      'department_level': getUserIng().department_level
    }
  }
  return ajaxPost(url, data, options())
}

// 指令执行
export function messageQueue (obj) {
  let url = 'sf/message_queue/list'
  let data = {
    order: { _id: -1 },
    searchValue: {
      // 'department_code': code,
      // "messagecategory":"指令执行"
      ...obj
    }
  }
  return ajaxPost(url, data, options())
}

// 灾情统计
export function disasterStatistics (obj) {
  let url = 'disasterreport/stat'
  let data = {
    order: { _id: -1 },
    searchValue: {
      'department_code': likeStrSearch(getUserIng().department_code),
      'department_level': getUserIng().department_level,
      ...obj
    }
  }
  return ajaxPost(url, data, options())
}

// 雨量站
export function precipitationStation (obj) {
  let url = 'sf/rld_rain_hour/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 系统预警提醒
export function warningRemind (obj) {
  let url = 'sf/sf_realtime_warning/list'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 修改密码
export function newpasword (obj) {
  let url = 'sys/userinfo/changepsw'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}
