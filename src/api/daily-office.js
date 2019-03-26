import { ajaxPost } from 'api/axios'

// 通讯录管理
export function addressBookApi (type, obj) {
  let url = `oa/dp_contact_list/list/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 通讯录人员管理
export function getaddress (search = {}) {
  let url = 'oa/dp_contact_list/list/list'

  let data = {
    searchValue: {
      ...search
    }
  }

  return ajaxPost(url, data, options())
}

// 通知公告
export function noticeApi (type, obj) {
  let url = `sf/sf_notice/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 通知公告-发布
export function releaseApi (obj) {
  let url = 'oa/sf_notice/publish'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 上传
export function uploadApi (obj) {
  let url = 'common/upload'
  return ajaxPost(url, obj, options())
}

let token = options().headers.token

export function url () {
  let url = `${httpUrl}/common/upload?token=${token}&systemId=1000010`
  return url
}

// 公文收发
export function addresseeApi (type, obj) {
  let url = `oa/dp_document/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

export function addresseeGetApi (obj) {
  let url = `oa/dp_document/receivelist`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 短信管理
export function noteApi (type, obj) {
  let url = `oa/dp_send_message/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 资料管理
export function dataApi (type, obj) {
  let url = `oa/dp_material_refer/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 资料管理上传
export function getUrl () {
  let url = `${httpUrl}/oa/dp_material_refer/upload?token=${token}&systemId=1000010`
  return url
}

// 资料管理下载
export function downLoad (path, fileName) {
  return `${httpUrl}/common/download?token=${token}&path=${path}&fileName=${fileName}`
}

// 专题信息订阅
export function topicInfo (type, obj) {
  let url = `dp/dp_user_subscription/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 三防业务安排
export function officApi (type, obj) {
  let url = `oa/dp_working_arrange/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 三防业务安排
export function faxApi (type, obj) {
  let url = `oa/dp_fax/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 值班人员管理
export function personnelApi (type, obj) {
  let url = `oa/dp_duty_person/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 三防业务安排
export function journalApi (type, obj) {
  let url = `oa/dp_duty_log/${type}`
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}
