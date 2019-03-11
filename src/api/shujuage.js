import { ajaxPost } from 'api/axios'

// 水网列表
export function getUserList (page = 1, search = {}) {
  let url = 'dp/ztwater_striv/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 水网列表
export function getUserAllList () {
  let url = 'dp/ztwater_striv/list'

  let data = {
    searchValue: {},
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 排水口列表
export function getpaishuikoulist (page = 1, search = {}) {
  let url = 'dp/bsi_outfall/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 排水口修改
export function getpaishuikouedit (obj) {
  let url = 'dp/bsi_outfall/edit'

  let data = {
    ...obj

  }

  return ajaxPost(url, data, options())
}

// 排水口新增
export function getpaishuikouadd (obj) {
  let url = 'dp/bsi_outfall/new'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 排水口删除
export function getpaishuikoudel (ids) {
  let url = 'dp/bsi_outfall/delete'

  let data = {
    _ids: ids
  }

  return ajaxPost(url, data, options())
}

// 水文站基本信息
export function getshuiwenList (page = 1) {
  let url = 'dp/hdr_station_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      stn_type: '水位站, 水文站|#|in'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 水文站基本信息
export function getshuiwenAllList () {
  let url = 'dp/hdr_station_info/list'

  let data = {
    searchValue: {
      stn_type: '水位站, 水文站|#|in'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}
// 构建
export function getbulidList (page = 1, search = {}) {
  let url = 'dp/river_building/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}
// 构建
export function getbulidAllList () {
  let url = 'dp/river_building/list'

  let data = {
    searchValue: {},
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 下沉隧道基本信息
export function getsuidaoList (page = 1, search = {}) {
  let url = 'dp/channel_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 下沉隧道基本信息
export function getsuidaoAllList () {
  let url = 'dp/channel_info/list'

  let data = {
    searchValue: {},
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 供水管网基本信息
export function getgongshuiList (page = 1, search = {}) {
  let url = 'dp/pipe_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      pipe_line_type: '供水管网'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 供水管网基本信息
export function getgongshuiAllList (page = 1, search = {}) {
  let url = 'dp/pipe_info/list'

  let data = {
    searchValue: {
      pipe_line_type: '供水管网'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 排水管网基本信息
export function getpaishuiList (page = 1) {
  let url = 'dp/pipe_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      pipe_line_type: '排水管网'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 排水管网基本信息
export function getpaishuiAllList (page = 1) {
  let url = 'dp/pipe_info/list'

  let data = {
    searchValue: {
      pipe_line_type: '排水管网'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 自来水厂基本信息
export function getshuichangList (page = 1, search = {}) {
  let url = 'dp/water_factory_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 自来水厂基本信息
export function getshuichangAllList () {
  let url = 'dp/water_factory_info/list'

  let data = {
    searchValue: {},
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 污水厂基本信息
export function getwushuichangList (page = 1, search = {}) {
  let url = 'dp/water_factory_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 污水厂基本信息
export function getwushuichangAllList (page = 1, search = {}) {
  let url = 'dp/water_factory_info/list'

  let data = {
    searchValue: {},
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 供水设备基本信息
export function getshebeiList (page = 1, search = {}) {
  let url = 'dp/drainage_factory_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 供水设备基本信息
export function getshebeiAllList (page = 1, search = {}) {
  let url = 'dp/drainage_factory_info/list'

  let data = {
    searchValue: {},
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 供水设施基本信息
export function getpaisheshiList (page = 1) {
  let url = 'dp/pipe_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      pipe_line_type: '供水设施'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 供水设施基本信息
export function getpaisheshiAllList (page = 1) {
  let url = 'dp/pipe_info/list'

  let data = {
    searchValue: {
      pipe_line_type: '供水设施'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 排水设施基本信息
export function getsheshiList (page = 1, search = {}) {
  let url = 'dp/pipe_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      pipe_line_type: '排水设施'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 排水设施基本信息
export function getsheshiAllList (page = 1, search = {}) {
  let url = 'dp/pipe_info/list'

  let data = {
    searchValue: {
      pipe_line_type: '排水设施'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 救援队基本信息列表
export function getjiuyuanList (page = 1, search = {}) {
  let url = 'dp/rescueteam_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 救援队基本信息列表
export function getjiuyuanAllList (page = 1, search = {}) {
  let url = 'dp/rescueteam_info/list'

  let data = {
    searchValue: {},
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 银行基本信息列表
export function getyinhanList (page = 1) {
  let url = 'dp/bank_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      type: '银行'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 银行基本信息列表
export function getyinhanAllList (page = 1) {
  let url = 'dp/bank_info/list'

  let data = {
    searchValue: {
      type: '银行'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 医院基本信息
export function getyiyuanList (page = 1) {
  let url = 'dp/hospital_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      type: '医院'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 医院基本信息
export function getyiyuanAllList () {
  let url = 'dp/hospital_info/list'

  let data = {
    searchValue: {
      type: '医院'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 客运站基本信息
export function getkeyunzhanList (page = 1) {
  let url = 'dp/busstation_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      type: '客运站'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 商场站基本信息
export function getshangchangList (page = 1) {
  let url = 'dp/market_info/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      type: '商场'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 商场站基本信息
export function getshangchangAllList (page = 1) {
  let url = 'dp/market_info/list'

  let data = {
    searchValue: {
      type: '商场'
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 警戒值管理列表
export function getjinjieList (page = 1, search = {}) {
  let url = 'dp/bsi_warning_object/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 警戒值管理列表
export function getjinjieAllList (page = 1, search = {}) {
  let url = 'dp/bsi_warning_object/list'

  let data = {
    searchValue: {},
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}

// 新增
export function getjinjieadd (obj) {
  let url = 'dp/bsi_warning_object/new'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 编辑
export function getjinjieedit (obj) {
  let url = 'dp/bsi_warning_object/edit'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}

// 删除
export function getjinjiedelete (ids) {
  let url = 'dp/bsi_warning_object/delete'

  let data = {
    _ids: ids
  }

  return ajaxPost(url, data, options())
}
