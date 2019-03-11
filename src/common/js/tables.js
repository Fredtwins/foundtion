import { cloneObj } from 'common/js/util'

// 水网
export function shuiwanThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'rivname'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'chargevil'
  }, {
    title: '编号',
    align: 'center',
    key: 'byvilliage'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 排水口
export function paishuiThead (that) {
  return [{
    title: '编号 ',
    align: 'center',
    key: 'pntcode'
  }, {
    title: '名称',
    align: 'center',
    key: 'pntname'
  }, {
    title: '地理位置',
    align: 'center',
    key: 'pntplace'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '编辑'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          on: {
            click: () => {
              that.del(cloneObj(param.row))
            }
          }
        }, '删除')
      ])
    }
  }
  ]
}

// 构建筑物信息
export function goujianThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'building'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'town'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 水文站基本信息
export function shuiwenThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'admauth'
  }, {
    title: '地点',
    align: 'center',
    key: 'hydr_net'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 下沉隧道基本信息
export function xiachenThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: '名称'
  }, {
    title: '主管部门',
    align: 'center',
    key: '所在位置'
  }, {
    title: '编号',
    align: 'center',
    key: '管理单位'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 供水管网基本信息
export function gongshuiguanwanThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'pipe_line_name'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'town'
  }, {
    title: '类型',
    align: 'center',
    key: 'pipe_line_type'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 排水管网基本信息
export function paishuiwangThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'pipe_line_name'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'town'
  }, {
    title: '类型',
    align: 'center',
    key: 'pipe_line_type'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 自来水
export function waterThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'factory_name'
  }, {
    title: '镇街',
    align: 'center',
    key: 'district'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 污水厂
export function wuwaterThead (that) {
  return [{
    title: '地点 ',
    align: 'center',
    key: 'factory_name'
  }, {
    title: '负责人',
    align: 'center',
    key: 'chargeby'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 供水设备
export function watershebeiThead (that) {
  return [{
    title: '地点 ',
    align: 'center',
    key: 'factory_name'
  }, {
    title: '负责人',
    align: 'center',
    key: 'chargeby'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 供水设施
export function watersheshiThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'pipe_line_name'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'town'
  }, {
    title: '类型',
    align: 'center',
    key: 'pipe_line_type'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 排水设施
export function paishuisheshiThead (that) {
  return [{
    title: '类型 ',
    align: 'center',
    key: 'pipe_line_type'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'town'
  }, {
    title: '名字',
    align: 'center',
    key: 'pipe_line_name'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 救援
export function jiuyuanThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'name'
  }, {
    title: '地点',
    align: 'center',
    key: 'address'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 银行
export function yinhanThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'name'
  }, {
    title: '地点',
    align: 'center',
    key: 'address'
  }, {
    title: '类型',
    align: 'center',
    key: 'type'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 医院
export function yiyuanThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'name'
  }, {
    title: '地点',
    align: 'center',
    key: 'address'
  }, {
    title: '类型',
    align: 'center',
    key: 'type'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 客运站
export function keyunzhanThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'name'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'address'
  }, {
    title: '类型',
    align: 'center',
    key: 'type'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 商场
export function shangchangThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'name'
  }, {
    title: '类型',
    align: 'center',
    key: 'type'
  }, {
    title: '地点',
    align: 'center',
    key: 'address'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '查看')
      ])
    }
  }
  ]
}

// 警戒
export function jingjieThead (that) {
  return [{
    title: '警戒值 ',
    align: 'center',
    key: 'warning_value'
  }, {
    title: '警戒对象名称',
    align: 'center',
    key: 'object_name'
  }, {
    title: '警戒对象类型',
    align: 'center',
    key: 'object_type'
  },
  {
    title: '用户操作',
    align: 'center',
    width: 180,
    render: (h, param) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(param.row)

              delete data['_index']
              delete data['_rowKey']
              that.edit(data)
            }
          }
        }, '编辑'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          on: {
            click: () => {
              that.del(cloneObj(param.row))
            }
          }
        }, '删除')
      ])
    }
  }
  ]
}
