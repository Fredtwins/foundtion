import { cloneObj } from 'common/js/util'
import { getLocalStorage } from 'common/js/dom'

// 首页
export function homeThead (that) {
  return [{
    title: '名称',
    align: 'center',
    key: 'stn_name'
  }, {
    title: '时间',
    align: 'center',
    key: 'data_time'
  }, {
    title: '水位（m）',
    align: 'center',
    key: 'waterlevel'
  }, {
    title: '警戒水位（m）',
    align: 'center',
    key: 'alarm_l3',
    width: 120
  }]
}

// 部门预案
export function departmentThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '预案编号',
    key: 'plan_no',
    align: 'center',
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.plan_no
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.plan_no)
    }
  }, {
    title: '预案名称',
    key: 'plan_name',
    align: 'center',
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.plan_name
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.plan_name)
    }
  }, {
    title: '执行部门',
    key: 'department_name',
    align: 'center',
    width: 100
  }, {
    title: '预案状态',
    key: 'status',
    align: 'center',
    width: 85
  }, {
    title: '起草人',
    key: 'createby',
    align: 'center',
    width: 80
  }, {
    title: '提交时间',
    key: 'createdt',
    align: 'center',
    ellipsis: true
  }, {
    title: '审批人',
    key: 'approveby',
    align: 'center',
    width: 80
  }, {
    title: '审批时间',
    key: 'approvedt',
    align: 'center',
    ellipsis: true
  }, {
    title: '操作',
    key: 'edit',
    align: 'left',
    width: 200,
    render: (h, params) => {
      if (params.row.status === '生效') {
        return h('div', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            class: {
              // 'show': true
            },
            style: {
              marginRight: '5px'
              // textDecoration: 'underline',
              // color: 'rgb(14, 91, 212)'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data['_index']
                delete data['_rowKey']
                that.details(data)
              }
            }
          }, '明细')
          // h('Button', {
          // props: {
          // href: 'javascript:;'
          // },
          // class: {
          // 'show': true
          // },
          // style: {
          // textDecoration: 'underline',
          // color: 'rgb(14, 91, 212)'
          // },
          // on: {
          // click: () => {
          // let data = cloneObj(params.row);
          // delete data['_index']
          // delete data['_rowKey']
          // that.submit(data, params.index)
          // }
          // }
          // }, '申请审批')
        ])
      } else if (params.row.status === '草稿') {
        return h('div', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            class: {
              // 'show': true
            },
            style: {
              marginRight: '5px'
              // textDecoration: 'underline',
              // color: 'rgb(14, 91, 212)'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data['_index']
                delete data['_rowKey']
                that.edit(data, params.index)
              }
            }
          }, '修改'),
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            class: {
              // 'show': true
            },
            style: {
              marginRight: '5px'
              // textDecoration: 'underline',
              // color: 'rgb(14, 91, 212)'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data['_index']
                delete data['_rowKey']
                that.delete(params.index, data)
              }
            }
          }, '删除'),
          h('Button', {
            props: {
              type: 'success',
              size: 'small'
            },
            class: {
              // 'show': true
            },
            style: {
              // textDecoration: 'underline',
              // color: 'rgb(14, 91, 212)'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data['_index']
                delete data['_rowKey']
                that.submit(data, params.index)
              }
            }
          }, '申请审批')
        ])
      } else if (params.row.status === '待审批') {
        return h('div', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            class: {
              // 'show': true
            },
            style: {
              marginRight: '5px'
              // textDecoration: 'underline',
              // color: 'rgb(14, 91, 212)'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data['_index']
                delete data['_rowKey']
                that.details(data)
              }
            }
          }, '明细')
        ])
      } else if (params.row.status === '失效') {
        return h('div', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            class: {
              // 'show': true
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data['_index']
                delete data['_rowKey']
                that.delete(params.index, data)
              }
            }
          }, '删除')
        ])
      };
    }
  }]
}

// 预案审批
export function approvalThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '预案编号',
    key: 'plan_no',
    align: 'center',
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.plan_no
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.plan_no)
    }
  }, {
    title: '预案名称',
    key: 'plan_name',
    align: 'center',
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.plan_name
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.plan_name)
    }
  }, {
    title: '预案类型',
    key: 'plan_category',
    align: 'center',
    ellipsis: true
  }, {
    title: '执行部门',
    key: 'department_name',
    align: 'center',
    ellipsis: true
  }, {
    title: '预案状态',
    key: 'status',
    align: 'center',
    ellipsis: true
  }, {
    title: '起草人',
    key: 'createby',
    align: 'center',
    ellipsis: true
  }, {
    title: '提交时间',
    key: 'createdt',
    align: 'center',
    ellipsis: true
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 200,
    render: (h, params) => {
      let value = ''
      if (params.row.status === '生效') {
        value = '失效'
      } else {
        value = '生效'
      }
      return h('div', [
        h('Button', {
          props: {
            type: 'success',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data['_index']
              delete data['_rowKey']
              that.details(data)
            }
          }
        }, '明细'),
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
              let data = cloneObj(params.row)
              delete data['_index']
              delete data['_rowKey']
              that.approval(data, params.index)
            }
          }
        }, value),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data['_index']
              delete data['_rowKey']
              that.back(data)
            }
          }
        }, '回退草稿')
      ])
    }
  }]
}

// 任务预设
export function preTaskThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '执行部门',
    key: 'department_name',
    align: 'center',
    width: 90
  }, {
    title: '预案名称',
    key: 'plan_name',
    align: 'center',
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.plan_name
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.plan_name)
    }
  }, {
    title: '预案类型',
    key: 'plan_type',
    align: 'center',
    width: 90,
    ellipsis: true
  }, {
    title: '应急响应级别',
    key: 'response_level',
    align: 'center',
    width: 110
  }, {
    title: '任务类型',
    key: 'task_type',
    align: 'center',
    width: 90,
    ellipsis: true
  }, {
    title: '任务概要',
    key: 'task_profile',
    align: 'center',
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.task_profile
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.task_profile)
    }
  }, {
    title: '计划开始时间',
    key: 'plan_startdate',
    align: 'center',
    width: 125
  }, {
    title: '计划结束时间',
    key: 'plan_enddate',
    align: 'center',
    width: 125
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 125,
    render: (h, params) => {
      let isDsabled = true
      if (params.row.status === '关闭') {
        isDsabled = true
      } else {
        isDsabled = false
      }
      if (that.showTitle || getLocalStorage('status') === 'details') {
        return h('div', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small',
              disabled: isDsabled
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data['_index']
                delete data['_rowKey']
                that.details(data)
              }
            }
          }, '详情')
        ])
      } else {
        return h('div', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small',
              disabled: isDsabled
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data['_index']
                delete data['_rowKey']
                that.edit(data)
              }
            }
          }, '编辑'),
          h('Button', {
            props: {
              type: 'error',
              size: 'small',
              disabled: isDsabled
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data['_index']
                delete data['_rowKey']
                that.delete(params.index, data)
              }
            }
          }, '删除')
        ])
      }
    }
  }]
}

// 任务执行
export function taskManaThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '任务编号',
    key: 'task_no',
    align: 'center',
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.task_no
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.task_no)
    }
    // width: 275
  }, {
    title: '任务类型',
    key: 'task_type',
    align: 'center'
    // width: 148
  }, {
    title: '任务状态',
    key: 'status',
    align: 'center'
    // width: 148
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center',
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.response_no
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.response_no)
    }
    // width: 148
  }, {
    title: '应急响应级别',
    key: 'response_level',
    align: 'center'
    // width: 148
  },
  {
    title: '执行部门',
    key: 'department_name',
    align: 'center'
    // width: 148
  }, {
    title: '任务概要',
    key: 'task_profile',
    align: 'center',
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.task_profile
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.task_profile)
    }
    // width: 273
  }, {
    title: '任务开始时间',
    key: 'startdate',
    align: 'center',
    width: 120
  }, {
    title: '任务结束时间',
    key: 'enddate',
    align: 'center',
    width: 120
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 80,
    render: (h, params) => {
      let isDsabled = true // eslint-disable-line
      if (params.row.status === '关闭') {
        isDsabled = true
      } else {
        isDsabled = false
      }
      if (params.row.task_type === '事中任务' || params.row.status === '已关闭' || params.row.status === '已完成') {
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
                let data = cloneObj(params.row)
                delete data['_index']
                delete data['_rowKey']
                that.details(data)
              }
            }
          }, '详情')
        ])
      } else {
        return h('div', [
          h('Button', {
            props: {
              type: 'success',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data['_index']
                delete data['_rowKey']
                that.edit(data)
              }
            }
          }, '编辑')
        ])
      }
    }
  }
  ]
}

// 应急响应管理
export function erManagementThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center',
    width: 140
  }, {
    title: '应急响应类型',
    key: 'response_type',
    align: 'center',
    width: 110
  }, {
    title: '级别',
    key: 'response_level',
    align: 'center',
    ellipsis: true
  }, {
    title: '状态',
    key: 'status',
    align: 'center',
    ellipsis: true
  }, {
    title: '生成时间',
    key: 'createdt',
    align: 'center',
    ellipsis: true
  }, {
    title: '最后调整时间',
    key: 'modifydt',
    align: 'center',
    ellipsis: true
  }, {
    title: '结束时间',
    key: 'closedt',
    align: 'center',
    ellipsis: true
  }, {
    title: '查看历史',
    key: '',
    align: 'center',
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data['_index']
              delete data['_rowKey']
              that.searchBtns(data)
            }
          }
        }, '查看')
      ])
    }
  }]
}

// 应急响应历史查看
export function codethead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '级别',
    key: 'response_level',
    align: 'center'
  }, {
    title: '响应类型',
    key: 'response_type',
    align: 'center'
  }, {
    title: '状态',
    key: 'status',
    align: 'center'
  }, {
    title: '调整时间',
    key: 'createdt',
    align: 'center'
  }]
}

// 应急响应级别
export function erLevelThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  },
  {
    title: '应急响应类型',
    key: 'response_type',
    align: 'center',
    width: 110
  }, {
    title: '级别',
    key: 'response_level',
    align: 'center',
    width: 65
  }, {
    title: '描述',
    key: 'desc',
    align: 'center',
    width: 195
  }, {
    title: '标准',
    key: 'criteria',
    align: 'center',
    render (h, params) {
      return h('div', {
        style: {
          textAlign: 'left',
          padding: '5px 0'
        }
      }, params.row.criteria)
    }
    // ellipsis: true
  }]
}

// 部门数据上传新增页面
export function addThaed (that) {
  return [

    {
      title: '序号',
      type: 'index',
      align: 'center',
      width: 60
    }, {
      title: '栏位名称',
      align: 'center',
      key: '栏位名称',
      width: 130
    }, {
      title: '栏位类型',
      align: 'center',
      key: '栏位类型',
      width: 130
    }, {
      title: '栏位说明',
      align: 'center',
      key: '栏位说明'
      // width:200
    },
    {
      title: '操作',
      align: 'center',
      width: 100,
      render: (h, params) => {
        return h('div', [
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                that.del(cloneObj(params.row))
              }
            }
          }, '删除')
        ])
      }
    }
  ]
}

// 专题预案数据表格
export function dataTableThead (that) {
  return [
    {
      title: '序号',
      type: 'index',
      align: 'center',
      width: 60
    }, {
      title: '栏位名称',
      align: 'center',
      key: '栏位名称',
      width: 130
    }, {
      title: '栏位类型',
      align: 'center',
      key: '栏位类型',
      width: 130
    }, {
      title: '栏位说明',
      align: 'center',
      key: '栏位说明'
      // width:200
    }
  ]
}

// 部门数据上传临时新增页面
export function temporaryThead (that) {
  return [
    {
      title: '序号',
      type: 'index',
      align: 'center',
      width: 60
    }, {
      title: '栏位名称',
      align: 'center',
      key: '栏位名称',
      width: 200,
      render: (h, params) => {
        return h('div', params.row.栏位名称)
      }
    }, {
      title: '栏位类型',
      align: 'center',
      key: '栏位类型',
      width: 200,
      render: (h, params) => {
        return h('Select', {
          props: {
            value: params.row.栏位类型
          },
          on: {
            'on-change': (event) => {
              that.changeType(params.row, event)
            }
          }
        },
        [
          h('Option', {
            props: {
              value: '文字'
            }
          }, '文字'),
          h('Option', {
            props: {
              value: '数字'
            }
          }, '数字')
        ]
        )
      }
    }, {
      title: '栏位说明',
      align: 'center',
      key: '栏位说明',
      render: (h, params) => {
        return h('Input', {
          props: {
            placeholder: '请输入栏位说明',
            value: params.row.栏位说明
          },
          on: {
            'on-blur': (event) => {
              that.inputExplain(params.row, event)
            }
          }
        }
        )
      }
    },
    {
      title: '涉及部门',
      align: 'center',
      key: '涉及部门',
      render: (h, params) => {
        return h('Input', {
          props: {
            // type:Array,
            value: params.row.涉及部门,
            // multiple:true,
            placeholder: '请选择部门'
          },
          on: {
            'on-focus': (event) => {
              that.selectDepartment(params.row, event)
            }
          }

        })
      }
    },
    {
      title: '操作',
      align: 'center',
      width: 100,
      render: (h, params) => {
        return h('div', [
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                that.del(cloneObj(params.row))
              }
            }
          }, '删除')
        ])
      }
    }
  ]
}

// 联合值守看板
export function erCardThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '部门名称',
    key: 'department_name',
    align: 'center',
    width: 125
  }, {
    title: '部门编号',
    key: 'department_code',
    align: 'center',
    width: 150
  }, {
    title: '操作人员',
    key: 'operator',
    align: 'center',
    width: 100
  }, {
    title: '操作内容',
    key: 'headline',
    align: 'center',
    ellipsis: true
  }, {
    title: '时间',
    key: 'logtime',
    align: 'center',
    ellipsis: true
  }]
}

// 参与人员表
export function participantsThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '人员名称',
    key: 'name',
    align: 'center',
    width: 125
  }, {
    title: '所属部门',
    key: 'department_name',
    align: 'center',
    width: 125
  }, {
    title: '电话号码',
    key: 'telephoe',
    align: 'center',
    width: 125
  }, {
    title: '职责',
    key: 'duty',
    align: 'center',
    width: 150
  }, {
    title: '职责描述',
    key: 'duty_desc',
    align: 'center',
    ellipsis: true
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center',
    ellipsis: true
  }]
}

// 警告事件日志
export function warninDailyThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '警告类型',
    key: 'type_zh',
    align: 'center'
  }, {
    title: '警告渠道',
    key: 'reporter',
    align: 'center'
  }, {
    title: '警告时间',
    key: 'reporttime',
    align: 'center'
  }, {
    title: '警告描述',
    key: 'desc',
    align: 'center'
  }]
}

// 部门管理
// 月度数据上报
export function dataReportThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 70
  }, {
    title: '提交部门',
    key: 'department_name',
    align: 'center',
    width: 100
  }, {
    title: '报表名称',
    key: 'title',
    align: 'center'
  }, {
    title: '统计年月',
    key: 'YYYYMM',
    align: 'center',
    width: 140
  }, {
    title: '上报时间',
    key: 'reportdt',
    align: 'center',
    width: 150
  }, {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 80
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 240,
    render: (h, params) => {
      let isDsabled = true
      if (getLocalStorage('info').role === '系统管理员') {
        isDsabled = true
      } else {
        isDsabled = false
      }
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.detailsClick('details', data)
            }
          }
        }, '详情'),
        h('Button', {
          props: {
            type: 'primary',
            size: 'small',
            disabled: params.row.status === '已上报' || isDsabled
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.detailClick('edit', data)
            }
          }
        }, '编辑'),
        h('Button', {
          props: {
            type: 'success',
            size: 'small',
            disabled: params.row.status === '已上报' || isDsabled
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.actionClick('submit', data)
            }
          }
        }, '提交'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small',
            disabled: params.row.status === '已上报' || isDsabled
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.actionClick('delete', data)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 事后数据上报
export function dataAfterReportThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 70
  }, {
    title: '提交部门',
    key: 'department_name',
    align: 'center',
    width: 100
  }, {
    title: '报表名称',
    key: 'title',
    align: 'center'
  }, {
    title: '应急响应启动时间',
    key: 'response_createdt',
    align: 'center',
    width: 150
  }, {
    title: '上报时间',
    key: 'reportdt',
    align: 'center',
    width: 150
  }, {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 80
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 220,
    render: (h, params) => {
      let isDsabled = true
      if (getLocalStorage('info').role === '系统管理员') {
        isDsabled = true
      } else {
        isDsabled = false
      }
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.readClick(data)
            }
          }
        }, '查看'),
        h('Button', {
          props: {
            type: 'primary',
            size: 'small',
            disabled: params.row.status === '已上报' || isDsabled
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.editClick(data)
            }
          }
        }, '编辑'),
        h('Button', {
          props: {
            type: 'success',
            size: 'small',
            disabled: params.row.status === '已上报' || isDsabled
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.actionClick('submit', data)
            }
          }
        }, '提交'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small',
            disabled: params.row.status === '已上报' || isDsabled
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.actionClick('delete', data)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 部门上传数据
export function deplistThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '部门',
    align: 'center',
    key: 'departmentLists',
    // width: 300,
    ellipsis: true,
    tooltip: true,
    render: (h, param) => {
      var arr = []
      if (param.row.department_list !== undefined) {
        param.row.department_list.map((item) => {
          arr.push(item.department_name)
        })
      }

      return h('div', {
        style: {
          'text-overflow': 'ellipsis',
          'overflow': 'hidden'
        }
      }, arr.join('、'))
    }
  }, {
    title: '任务类型',
    align: 'center',
    key: 'task_type'
  },
  {
    title: '数据表单名称',
    align: 'center',
    key: 'form_name'
  }, {
    title: '对应预案类型',
    align: 'center',
    key: 'plan_type'
    // render: (h, params) => {
    // var arr = [];
    // if(params.row.plan_type !== undefined) {
    // params.row.plan_type.map((item) => {
    // arr.push(item.plan_type);
    // })
    // }
    // return h('div', {}, arr.join('、'));
    // }
  },
  {
    title: '操作',
    align: 'center',
    render: (h, params) => {
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
              let data = cloneObj(params.row, params.index)
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
              that.del(cloneObj(params.row))
            }
          }
        }, '删除')
      ])
    }
  }
  ]
}

// 部门录用
export function employThead (that) {
  return [{
    title: '序号',
    width: 60,
    align: 'center',
    type: 'index'
  },
  {
    title: '数据表单名称',
    align: 'center',
    key: 'form_name'
  }, {
    title: '对应预案类型',
    align: 'center',
    key: 'plan_type'
  },
  {
    title: '操作',
    align: 'center',
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'info',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data['_index']
              delete data['_rowKey']
              that.luyong(data)
            }
          }
        }, '录入'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          on: {
            click: () => {
              that.del(cloneObj(params.row))
            }
          }
        }, '删除')
      ])
    }
  }
  ]
}
// 录用新增页面
export function lyThead (that) {
  return [{
    title: '序号',
    align: 'center',
    width: 60,
    type: 'index'
  }, {
    title: '选项(一个)',
    align: 'center',
    width: 120,
    type: 'selection'
  }, {
    title: '表单名称',
    align: 'center',
    key: 'form_name'
  }, {
    title: '对应预案类型',
    align: 'center',
    key: 'plan_type'
  }]
}

// 录入页面
export function ReportThead (that) {
  return [{
    title: '序号',
    align: 'center',
    width: 60,
    type: 'index'
  }, {
    title: '栏位名称',
    align: 'center',
    key: '栏位名称',
    width: 150
  },
  {
    title: '栏位类型',
    align: 'center',
    key: '栏位类型',
    width: 120
  },
  {
    title: '栏位说明',
    align: 'center',
    key: '栏位说明'
  },
  {
    title: '栏位值填入',
    align: 'center',
    render: (h, params) => {
      return h('div', [
        h('Input', {
          props: {
            type: 'textarea',
            size: 'small'
          },
          on: {
            'input': (e) => {
              that.UserData[params.index]['custom_inputValue'] = e
            }
          }
        })
      ])
    }
  }
  ]
}

// 录入数据列表动态显示
export function shujuThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center'
  }, {
    title: '部门名称',
    align: 'center',
    key: 'department_name'
  }]
}

// 查看列表
export function ListseanThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '数据表单名称',
    align: 'center',
    key: 'form_name'
  }, {
    title: '对应预案类型',
    align: 'center',
    key: 'plan_type'
  }, {
    title: '操作',
    align: 'center',
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'info',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data['_index']
              delete data['_rowKey']
              that.details(data)
            }
          }
        }, '明细')
      ])
    }
  }]
}
// 跳转明细后的
export function seansThead (that) {
  return [{
    title: '序号',
    align: 'center',
    width: 60,
    type: 'index'
  }, {
    title: '栏位名称',
    align: 'center',
    key: '栏位名称'
  }, {
    title: '栏位类型',
    align: 'center',
    key: '栏位类型'
  }, {
    title: '栏位说明',
    align: 'center',
    key: '栏位说明'
  }]
}

// 部门系统定义
export function depmanageThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  },
  {
    title: '部门名称',
    align: 'center',
    key: 'department_name'
  }, {
    title: '部门编号',
    align: 'center',
    key: 'department_code'
  }, {
    title: '部门级别',
    align: 'center',
    key: 'department_level'
  }, {
    title: '系统名称',
    align: 'center',
    key: 'system_name'
  }, {
    title: '系统访问地址',
    align: 'center',
    key: 'system_access'
  },
  {
    title: '操作',
    align: 'center',
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
// 部门指令库管理
export function LiraryThead (that) {
  return [{
    type: 'index',
    title: '序号',
    width: 90,
    align: 'center'
  }, {
    title: '部门名称',
    align: 'center',
    key: 'department_name'
  }, {
    title: '部门编号',
    align: 'center',
    key: 'department_code'
  }, {
    title: '部门级别',
    align: 'center',
    key: 'department_level'
  },
  {
    title: '指令名称',
    align: 'center',
    key: 'instruction_name'
  }, {
    title: '用户操作',
    align: 'center',
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

// 水库数据维护
export function shuikuThead (that) {
  return [{
    title: '名称',
    align: 'center',
    key: 'pool_name'
  }, {
    title: '镇(街)',
    align: 'center',
    key: 'governor'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'town'
  }, {
    title: '地址',
    align: 'center',
    key: 'address'
  }, {
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
  }]
}

// 山塘数据维护
export function hillpool (that) {
  return [{
    title: '名称',
    align: 'center',
    key: '名称'
  }, {
    title: '主管部门',
    align: 'center',
    key: '主管部门'
  }, {
    title: '工程所在地',
    align: 'center',
    key: '工程所在地'
  }, {
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
  }]
}

// 堤围数据
export function tiweiThead (that) {
  return [{
    title: '名称',
    align: 'center',
    key: 'dike_name'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'governor'
  }, {
    title: '所在镇(街)',
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

// 险段数据维护
export function derstamthead (that) {
  return [{
    title: '险段名称 ',
    align: 'center',
    key: 'danger_name'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'governor'
  },
  {
    title: '所在镇(街)',
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

// 江心洲数据维护
export function jiangxinThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: '名称'
  }, {
    title: '主管部门',
    align: 'center',
    key: '主管部门'
  },
  {
    title: '地理位置',
    align: 'center',
    key: '地理位置'
  },
  {
    title: '类型',
    align: 'center',
    key: '类型'
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

// 外滩地
export function waitanThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: '名称'
  }, {
    title: '主管部门',
    align: 'center',
    key: '主管部门'
  },
  {
    title: '地址',
    align: 'center',
    key: '地址'
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

// 堤上
export function tishanThead (that) {
  return [{
    title: '工程名称 ',
    align: 'center',
    key: '工程名称'
  }, {
    title: '地理位置',
    align: 'center',
    key: '地理位置'
  },
  {
    title: '所在河道',
    align: 'center',
    key: '所在河道'
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

// 电力
export function dianlThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: '名称'
  }, {
    title: '地址',
    align: 'center',
    key: '地址'
  },
  {
    title: '主管部门',
    align: 'center',
    key: '主管部门'
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

// 地质灾害
export function dizhizaihaiThead (that) {
  return [{
    title: '灾点名称 ',
    align: 'center',
    key: 'name'
  }, {
    title: '隐患点位置',
    align: 'center',
    key: 'address'
  },
  {
    title: '所属镇街',
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

// 穿堤管道
export function ctgdThead (that) {
  return [{
    title: '穿堤管道名称 ',
    align: 'center',
    key: '穿堤管道名称'
  }, {
    title: '主管部门',
    align: 'center',
    key: '主管部门'
  },
  {
    title: '所在河道',
    align: 'center',
    key: '所在河道'
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

// 避难场所
export function changsuoThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'name'
  }, {
    title: '地址',
    align: 'center',
    key: 'address'
  },
  {
    title: '镇街',
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

// 码头
export function matouThead (that) {
  return [{
    title: '码头名称 ',
    align: 'center',
    key: '码头名称'
  }, {
    title: '主管部门',
    align: 'center',
    key: '主管部门'
  },
  {
    title: '所在河道',
    align: 'center',
    key: '所在河道'
  }, {
    title: '地理位置',
    align: 'center',
    key: '地理位置'
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

// 内涝
export function neilaoThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'stn_name'
  }, {
    title: '局部性',
    align: 'center',
    key: 'locality'
  },
  {
    title: '区域',
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

// 桥梁
export function qiaoliangThead (that) {
  return [{
    title: '桥梁名称 ',
    align: 'center',
    key: '桥梁名称'
  }, {
    title: '主管部门',
    align: 'center',
    key: '主管部门'
  },
  {
    title: '所在河道',
    align: 'center',
    key: '所在河道'
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

// 景点
export function jingdianThead (that) {
  return [{
    title: '景点名称 ',
    align: 'center',
    key: 'name'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'governor'
  },
  {
    title: '地址',
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

// 涵闸
export function hanzaThead (that) {
  return [{
    title: '闸名',
    align: 'center',
    key: 'sluicegate_name'
  }, {
    title: '所在堤围 ',
    align: 'center',
    key: 'dick_name'
  }, {
    title: '镇街',
    align: 'center',
    key: 'town'
  },
  {
    title: '主管部门',
    align: 'center',
    key: 'governor'
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

// 三棚
export function sanpengThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: '名称'
  }, {
    title: '建筑地址',
    align: 'center',
    key: '建筑地址'
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
// 仓库
export function cangkuThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'name'
  }, {
    title: '地址',
    align: 'center',
    key: 'address'
  },
  {
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

// 重要设备
export function zhongtsbThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'name'
  }, {
    title: '地址',
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

// 危房
export function weifangThead (that) {
  return [{
    title: '建筑地址',
    align: 'center',
    key: '建筑地址'
  }, {
    title: '主管部门',
    align: 'center',
    key: '主管部门'
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

// 危险化学品重点企业维护
export function weixianThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: '名称'
  }, {
    title: '地址',
    align: 'center',
    key: '地址'
  },
  {
    title: '主管部门',
    align: 'center',
    key: '主管部门'
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

// 学校
export function schoolThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'name'
  }, {
    title: '地址',
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

// 泵站
export function benzhanThead (that) {
  return [{
    title: '泵站名称 ',
    align: 'center',
    key: 'station_name'
  }, {
    title: '所在镇街',
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

// 气象
export function qixiangThead (that) {
  return [{
    title: '名称 ',
    align: 'center',
    key: 'stn_name'
  }, {
    title: '主管部门',
    align: 'center',
    key: 'town'
  }, {
    title: '编号',
    align: 'center',
    key: 'stn_no'
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

// gongdi
export function gongdiThead (that) {
  return [{
    title: '工程名称 ',
    align: 'center',
    key: '工程名称'
  }, {
    title: '地址',
    align: 'center',
    key: '地址'
  },
  {
    title: '主管部门',
    align: 'center',
    key: '主管部门'
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

// fish
export function fishThead (that) {
  return [{
    title: '渔港名称 ',
    align: 'center',
    key: 'point_name'
  }, {
    title: '所在镇街',
    align: 'center',
    key: 'town'
  },
  {
    title: '主管部门',
    align: 'center',
    key: 'governor'
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

// 涉及社区
export function shequThead (that) {
  return [{
    title: '社区',
    align: 'center'
  }, {
    title: '需要转移人数',
    align: 'center'
  }, {
    title: '已转移人数',
    align: 'center'
  }, {
    title: '时间',
    align: 'center'
  }]
}

// 部门列表
export function bumenlistThead (that) {
  return [{
    title: '部门',
    key: 'name',
    align: 'center',

    render: (h, param) => {
      let str = param.row.name
      return h('div', {
        'class': {
          'table-warpper': true
        },
        attrs: {
          title: str
        }

      }, str)
    }
  }, {
    title: '全称',
    key: 'fullname',
    align: 'center',

    render: (h, param) => {
      let str = param.row.fullname
      return h('div', {
        'class': {
          'table-warpper': true
        },
        attrs: {
          title: str
        }
      }, str)
    }
  },
  {
    title: '部门编号',
    key: 'code',
    align: 'center'
  },
  {
    title: '当前部门层级',
    key: 'level',
    align: 'center',
    render: (h, param) => {
      let str = param.row.level
      return h('div', {
        'class': {
          'table-warpper': true
        },
        attrs: {
          title: str
        }
      }, str)
    }
  }, {
    title: '层级1',
    key: 'level1',
    align: 'center',

    render: (h, param) => {
      let str = param.row.level1
      return h('div', {
        'class': {
          'table-warpper': true
        },
        attrs: {
          title: str
        }
      }, str)
    }
  }, {
    title: '层级2',
    key: 'level2',
    align: 'center',

    render: (h, param) => {
      let str = param.row.level2
      return h('div', {
        'class': {
          'table-warpper': true
        },
        attrs: {
          title: str
        }
      }, str)
    }
  }, {
    title: '层级3',
    key: 'level3',
    align: 'center',

    render: (h, param) => {
      let str = param.row.level3
      return h('div', {
        'class': {
          'table-warpper': true
        },
        attrs: {
          title: str
        }
      }, str)
    }
  }, {
    title: '层级4',
    key: 'level4',
    align: 'center',

    render: (h, param) => {
      let str = param.row.level4
      return h('div', {
        'class': {
          'table-warpper': true
        },
        attrs: {
          title: str
        }
      }, str)
    }
  }, {
    title: '层级5',
    key: 'level5',
    align: 'center',

    render: (h, param) => {
      let str = param.row.level5
      return h('div', {
        'class': {
          'table-warpper': true
        },
        attrs: {
          title: str
        }
      }, str)
    }
  }
  ]
}

// 用户管理
export function usermanageThead (that) {
  return [{
    title: '系统',
    key: 'system_name',
    align: 'center'

  },
  {
    title: '用户账号',
    key: 'username',
    align: 'center'

  }, {
    title: '用户名称',
    key: 'realname',
    align: 'center'

  }, {
    title: '用户角色',
    key: 'role',
    align: 'center'

  }, {
    title: '用户操作',
    align: 'center',
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

// 角色管理
export function rolemanageThaed (that) {
  return [{
    title: '角色名称',
    key: 'rolename',
    align: 'center'

  }, {
    title: '角色描述',
    key: 'description',
    align: 'center'

  }, {
    title: '用户操作',
    align: 'center',

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
  }]
}

// 模块管理
export function mokuaiThead () {
  return [{
    title: '功能模块名称',
    key: 'name',
    align: 'center'
  }, {
    title: '所属层级',
    key: 'level',
    align: 'center'
  }, {
    title: '层级1',
    key: 'level1',
    align: 'center'
  }, {
    title: '层级2',
    key: 'level2',
    align: 'center'
  }, {
    title: '层级3',
    key: 'level3',
    align: 'center'
  }, {
    title: '系统名称',
    key: 'system_name',
    align: 'center'
  }]
}

// 日志进程
export function searThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center'
  },
  {
    title: '部门名称',
    key: 'department_name',
    align: 'center'
  }, {
    title: '用户名称',
    key: 'username',
    align: 'center'
  }, {
    title: '系统权限',
    key: 'system_name',
    align: 'center'
  }, {
    title: '时间',
    key: 'logdt',
    align: 'center'
  },
  {
    title: '访问路径',
    key: 'operation_info.url',
    align: 'center'

  }, {
    title: '请求参数',
    key: 'operation_info.param',
    align: 'center'
  }, {
    title: '请求ip地址',
    key: 'ip',
    align: 'center'
  }
  ]
}

// 任务
export function taskThead (that) {
  return [{
    title: ' ',
    type: 'index',
    align: 'center',
    width: 50
  }, {
    title: '成员部门',
    key: 'department_name',
    align: 'center',
    width: 150
  }, {
    title: '应急响应级别',
    key: 'response_level',
    align: 'center',
    width: 120
  }, {
    title: '任务类型',
    key: 'task_type',
    align: 'center',
    width: 150
  }, {
    title: '任务概要',
    key: 'task_profile',
    align: 'center'
  }, {
    title: '任务计划开始时间',
    key: 'plan_startdate',
    align: 'center',
    width: 135
  }, {
    title: '任务计划结束时间',
    key: 'plan_enddate',
    align: 'center',
    width: 135
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 125,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '编辑')
      ])
    }
  }]
}

// 数据表格
export function dataThead (that) {
  return [{
    title: '序号',
    width: 60,
    align: 'center',

    type: 'index'
  }, {
    title: '部门名称',
    align: 'center',
    key: 'department_name',
    tooltip: true,
    ellipsis: true,
    render: (h, params) => {
      let arr = []
      params.row.department_list.map(item => {
        arr.push(item.department_name)
      })

      return h('div', {
        style: {
          'text-overflow': 'ellipsis',
          'overflow': 'hidden'
        }
      }, arr.join('、'))
    }
  }, {
    title: '数据表单名称',
    align: 'center',
    key: 'form_name'
  }, {
    title: '对应预案类型',
    align: 'center',
    key: 'plan_type'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 125,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              // that.details(data)
              that.dataTableDetails(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 事件建议行动
export function eventThead (that) {
  return [{
    title: '序号',
    width: 60,
    align: 'center',
    type: 'index'
  }, {
    title: '预案编号',
    align: 'center',
    key: 'plan_no',
    width: 120
  }, {
    title: '事件类型',
    align: 'center',
    key: 'event',
    width: 120
  }, {
    title: '站点名称',
    align: 'center',
    key: 'station_name',
    width: 100
  }, {
    title: '警戒标准',
    align: 'center',
    key: 'event_critieria',
    width: 100
  }, {
    title: '建议',
    align: 'center',
    key: 'advise',
    render (h, params) {
      return h('div', {
        style: {
          textAlign: 'left'
        }
      }, params.row.advise)
    }
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 150,
    render: (h, params) => {
      if (getLocalStorage('status') === 'details') {
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
                let data = cloneObj(params.row)
                delete data._index
                delete data._rowKey
                that.managementDetails(data)
              }
            }
          }, '明细')
        ])
      } else {
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
                let data = cloneObj(params.row)
                delete data._index
                delete data._rowKey
                that.managementEdit(data)
              }
            }
          }, '编辑'),
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data._index
                delete data._rowKey
                that.managementDelete(data)
              }
            }
          }, '删除')
        ])
      }
    }
  }]
}

// 通讯录管理
export function addressBookThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '姓名',
    key: 'name',
    align: 'center',
    width: 150
  }, {
    title: '手机号码',
    key: 'telephoe',
    align: 'center',
    width: 150
  }, {
    title: '所属部门',
    key: 'department_name',
    align: 'center'
  }, {
    title: '部门级别',
    key: 'department_level',
    align: 'center',
    width: 135
  }, {
    title: '职责',
    key: 'duty',
    align: 'center',
    width: 135
  }, {
    title: '职责描述',
    key: 'duty_desc',
    align: 'center'
  }
  ]
}

// 部门人员管理
export function addressThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '所属部门',
    key: 'department_name',
    align: 'center'
  }, {
    title: '姓名',
    key: 'name',
    align: 'center',
    width: 150
  }, {
    title: '手机号码',
    key: 'telephoe',
    align: 'center',
    width: 150
  }, {
    title: '部门级别',
    key: 'department_level',
    align: 'center',
    width: 135
  }, {
    title: '职责',
    key: 'duty',
    align: 'center',
    width: 135
  }, {
    title: '职责描述',
    key: 'duty_desc',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 125,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '修改'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.delete(data)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 巡查任务记录
export function patrolRecordThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '任务编号',
    key: 'task_no',
    align: 'center',
    width: 150
  }, {
    title: '标题',
    key: 'title',
    align: 'center',
    width: 120
  }, {
    title: '所属部门',
    key: 'department_name',
    align: 'center'
  }, {
    title: '部门级别',
    key: 'department_level',
    align: 'center',
    width: 135
  }, {
    title: '巡查地点',
    key: 'address',
    align: 'center',
    width: 135
  }, {
    title: '任务描述',
    key: 'description',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 巡查任务安排
export function patrolPlanThead (that) {
  return [{
    type: 'selection',
    width: 60,
    align: 'center'
  }, {
    title: '任务编号',
    key: 'task_no',
    align: 'center',
    width: 140
  }, {
    title: '标题',
    key: 'title',
    align: 'center'
    // width: 120
  }, {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 70
  }, {
    title: '执行部门',
    key: 'department_name',
    align: 'center',
    width: 85
  }, {
    title: '巡查人员',
    align: 'center',
    render: (h, params) => {
      let arr = []
      params.row.patrolman.map(item => {
        arr.push(item.name)
      })
      let str = arr.join(',')
      return h('div', [
        h('span', {

        }, str)
      ])
    }
  }, {
    title: '部门级别',
    key: 'department_level',
    align: 'center',
    width: 85
  }, {
    title: '开始时间',
    key: 'plan_startdt',
    align: 'center'
    // width: 135
  }, {
    title: '结束时间',
    key: 'plan_enddt',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 170,
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'success',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情'),
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '修改'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.delete(data)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 收文处理
export function addresseeThead (that) {
  return [{
    type: 'selection',
    width: 60,
    align: 'center'
  }, {
    title: '发件人',
    key: 'releaseby',
    width: 150,
    render: (h, params) => {
      return h('div', [
        h('a', {
          props: {},
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, params.row.releaseby)
      ])
    }
  }, {
    title: '标题',
    key: 'title',
    render: (h, params) => {
      return h('div', [
        h('a', {
          props: {},
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, params.row.title)
      ])
    }
  }]
}

// 收文处理
export function draftThead (that) {
  return [{
    type: 'selection',
    width: 60,
    align: 'center'
  }, {
    title: '标题',
    key: 'title',
    width: 200,
    ellipsis: true,
    render: (h, params) => {
      return h('div', [
        h('a', {
          props: {},
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, params.row.title)
      ])
    }
  }, {
    title: '收件部门',
    key: 'department_code',
    render: (h, params) => {
      let arr = []
      if (params.row.receive_department) {
        params.row.receive_department.map(item => {
          arr.push(item.department_name)
        })
      }
      return h('div', [
        h('a', {
          props: {},
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, arr.join(',') || '未填写')
      ])
    }
  }]
}

// 快讯管理
export function alertsThead (that) {
  return [{
    type: 'selection',
    width: 60,
    align: 'center'
  }, {
    title: '状态',
    key: 'status',
    width: 150,
    align: 'center'
  }, {
    title: '标题',
    key: 'title',
    width: 300,
    align: 'center'
  }, {
    title: '内容',
    key: 'news_content',
    align: 'center'
    // ellipsis: true
  }, {
    title: '图片',
    key: 'picture',
    align: 'center'
  },
  {
    title: '操作',
    key: 'edit',
    width: 130,
    align: 'center',
    render: (h, params) => {
      return h('div', [
        (function () {
          if (params.row.status === '已发布') {
            return
          }
          return h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data._index
                delete data._rowKey
                that.edit(data)
              }
            }
          }, '修改')
        }()),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          style: {
            marginLeft: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 通知公告
export function noticeThead (that) {
  return [{
    type: 'selection',
    width: 60,
    align: 'center'
  }, {
    title: '标题',
    key: 'title',
    align: 'center',
    width: 150
  }, {
    title: '内容',
    key: 'notice_desc',
    align: 'center',
    ellipsis: true
  }, {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 150
  }, {
    title: '起草人',
    key: 'createby',
    align: 'center',
    width: 80
  }, {
    title: '起草时间',
    key: 'createdt',
    align: 'center',
    width: 135
  }, {
    title: '操作',
    key: 'edit',
    width: 180,
    render: (h, params) => {
      if (params.row.status === '发布') {
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
                let data = cloneObj(params.row)
                delete data._index
                delete data._rowKey
                that.details(data)
              }
            }
          }, '详情')
        ])
      }
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情'),
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '修改'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.delete(data)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 短信管理 发信
export function noteSendThead (that) {
  return [{
    type: 'selection',
    width: 60
  }, {
    title: '状态',
    key: 'status',
    width: 150
  }, {
    title: '标题',
    key: 'title',
    width: 150
  }, {
    title: '短信内容',
    key: 'message_content'
  }, {
    title: '发送时间',
    key: 'senddt'
  }, {
    title: '操作',
    width: 80,
    render: (h, params) => {
      return h('div', [
        (function () {
          if (params.row.status === '已发送') {
            return h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  let data = cloneObj(params.row)
                  delete data._index
                  delete data._rowKey
                  that.details(data)
                }
              }
            }, '详情')
          }
        }()),
        (function () {
          if (params.row.status === '草稿') {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  let data = cloneObj(params.row)
                  delete data._index
                  delete data._rowKey
                  that.edit(data)
                }
              }
            }, '修改')
          }
        }())
      ])
    }
  }]
}

// 资料管理
export function dataMagThead (that) {
  return [{
    type: 'selection',
    width: 60
  }, {
    title: '文件名',
    key: 'refer_name',
    render: (h, params) => {
      let icon = ''
      let color = ''
      if (params.row.refer_name.indexOf('.') > -1) {
        icon = 'document-text'
        color = '#b9c9d6'
      } else {
        icon = 'folder'
        color = '#ffd659'
      }
      return h('div', [
        h('Icon', {
          props: {
            type: icon
          },
          style: {
            color: color,
            fontSize: '30px'
          }
        }),
        (function () {
          if (params.row.isFolder) {
            return h('a', {
              style: {
                position: 'relative',
                top: '-6px',
                left: '5px'
              },
              on: {
                click: () => {
                  let data = cloneObj(params.row)
                  delete data._index
                  delete data._rowKey
                  that.details(data)
                }
              }
            }, params.row.refer_name)
          } else {
            return h('span', {
              style: {
                position: 'relative',
                top: '-6px',
                left: '5px'
              }
            }, params.row.refer_name)
          }
        }())
      ])
    }
  }, {
    title: '创建人',
    key: 'createby',
    width: 150
  }, {
    title: '创建日期',
    key: 'createdt',
    width: 200
  }]
}

//  系统应用资料
export function systemApplicationData (that) {
  return [{
    title: '文件名',
    key: 'refer_name',
    render: (h, params) => {
      let icon = ''
      let color = ''
      if (params.row.refer_name.indexOf('.') > -1) {
        icon = 'document-text'
        color = '#b9c9d6'
      } else {
        icon = 'folder'
        color = '#ffd659'
      }
      return h('div', [
        h('Icon', {
          props: {
            type: icon
          },
          style: {
            color: color,
            fontSize: '30px'
          }
        }),
        (function () {
          if (params.row.isFolder) {
            return h('a', {
              style: {
                position: 'relative',
                top: '-6px',
                left: '5px'
              },
              on: {
                click: () => {
                  let data = cloneObj(params.row)
                  delete data._index
                  delete data._rowKey
                  that.details(data)
                }
              }
            }, params.row.refer_name)
          } else {
            return h('span', {
              style: {
                position: 'relative',
                top: '-6px',
                left: '5px'
              }
            }, params.row.refer_name)
          }
        }())
      ])
    }
  }, {
    title: '操作',
    key: 'edit',
    width: 150,
    render: (h, params) => {
      if (params.row.isFolder === true) {
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
                let data = cloneObj(params.row)
                delete data._index
                delete data._rowKey
                that.details(data)
              }
            }
          }, '详情')
        ])
      } else {
        return h('div', [
          h('Button', {
            props: {
              type: 'success',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data._index
                delete data._rowKey
                that.downloadBtn(data)
              }
            }
          }, '下载')
        ])
      }
    }
  }]
}

// 数据一张图-台风路径列表
export function typhoonListThead (that) {
  return [{
    type: 'checkbox',
    width: 60,
    align: 'center',
    render: (h, params) => {
      return h('Checkbox', {
        props: {
          value: params.row.is_current === 1
        },
        on: {
          'on-change': (bol) => {
            that.choseTyphoon(bol, params)
          }
        }
      })
    }
  }, {
    title: '编号',
    key: 'tfbh',
    align: 'center'
  }, {
    title: '中文名',
    key: 'name',
    align: 'center'
  }, {
    title: '英文名',
    key: 'ename',
    align: 'center'
  }]
}

// 转移人员统计
export function transferThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center',
    width: 200
  }, {
    title: '处',
    key: 'count',
    align: 'center'
  }, {
    title: '安全受威胁人',
    key: 'threatened',
    align: 'center'
  }, {
    title: '已转移人员',
    key: 'transfer',
    align: 'center'
  }, {
    title: '统计时间',
    key: 'createdt',
    align: 'center',
    width: 180
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 受灾情况统计
export function affectedThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center',
    width: 150,
    ellipsis: true
  }, {
    title: '死亡人数',
    key: 'death',
    align: 'center'
  }, {
    title: '受伤人数',
    key: 'injury',
    align: 'center'
  }, {
    title: '损失(元)',
    key: 'disaster_loss',
    align: 'center'
  }, {
    title: '统计时间',
    key: 'createdt',
    align: 'center',
    width: 180
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 防御工作情况统计
export function defenseThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center',
    width: 200
  }, {
    title: '上报总数',
    key: 'count',
    align: 'center'
  }, {
    title: '统计时间',
    key: 'createdt',
    align: 'center',
    width: 180
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 事后报表统计
export function nationalFloodThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '报表名称',
    key: 'title',
    align: 'center'
  }, {
    title: '应急响应启动时间',
    key: 'response_createdt',
    align: 'center',
    width: 180
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.detailClick(data)
            }
          }
        }, '查看')
      ])
    }
  }]
}

// 应急响应总结统计
export function summaryThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center',
    width: 200
  }, {
    title: '启动时间',
    key: 'createdt',
    align: 'center'
  }, {
    title: '结束时间',
    key: 'closedt',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 调度指令完成情况统计
export function messageThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center',
    width: 130
  }, {
    title: '标题',
    key: 'headline',
    align: 'center'
  }, {
    title: '部门',
    key: 'sender',
    align: 'center'
  }, {
    title: '发送人',
    key: 'name',
    align: 'center'
  }, {
    title: '指令内容',
    key: 'contant',
    align: 'center'
  }, {
    title: '电话号码',
    key: 'phone',
    align: 'center'
  }, {
    title: '发送方式',
    key: 'channel',
    align: 'center'
  }, {
    title: '短信内容',
    key: 'message',
    align: 'center',
    width: 180,
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.message
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.message)
    }
  }]
}

// 预警信息发布情况
export function warningThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '预警状态',
    key: 'status',
    align: 'center'
  }, {
    title: '预警类型',
    key: 'type_zh',
    align: 'center'
  }, {
    title: '上报人员',
    key: 'reporter',
    align: 'center'
  }, {
    title: '上报时间',
    key: 'reporttime',
    align: 'center'
  }, {
    title: '描述',
    key: 'desc',
    align: 'center',
    // width: 180,
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.desc
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.desc)
    }
  }]
}

// 气象数据查询与统计-温度
export function weatherThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '站点名称',
    key: 'stn_name',
    align: 'center'
  }, {
    title: '站点编号',
    key: 'stn_no',
    align: 'center'
  }, {
    title: '时间间隔',
    key: 'data_interval',
    align: 'center'
  }, {
    title: '数据来源',
    key: 'data_source',
    align: 'center'
  }, {
    title: '地址',
    key: 'address',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 85,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 气象数据查询与统计-时雨量
export function rainThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '站点名称',
    key: 'stn_name',
    align: 'center'
  }, {
    title: '站点编号',
    key: 'stn_no',
    align: 'center'
  }, {
    title: '监测时间',
    key: 'data_time',
    align: 'center'
  }, {
    title: '时雨量',
    key: 'rainfull',
    align: 'center'
  }]
}

// 气象产品查询
export function productThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '台风名称',
    key: 'name',
    align: 'center'
  }, {
    title: '英文名称',
    key: 'ename',
    align: 'center'
  }, {
    title: '台风编号',
    key: 'tfbh',
    align: 'center'
  }, {
    title: '开始时间',
    key: 'begin_time',
    align: 'center'
  }, {
    title: '结束时间',
    key: 'end_time',
    align: 'center'
  }, {
    title: '是否当前生效',
    key: 'is_current',
    align: 'center'
  }]
}

// 水情查询与统计
export function waterThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '站点名称',
    key: 'stn_name',
    align: 'center'
  }, {
    title: '站点类型',
    key: 'stn_type',
    align: 'center'
  }, {
    title: '所属河流',
    key: 'river',
    align: 'center'
  }, {
    title: '行政区域',
    key: 'region',
    align: 'center'
  }, {
    title: '数据来源',
    key: 'data_source',
    align: 'center'
  }, {
    title: '上报时间',
    key: 'data_time',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 85,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 工情查询与统计
export function workThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '站点名称',
    key: 'stn_name',
    align: 'center'
  }, {
    title: '站点类型',
    key: 'stn_type',
    align: 'center'
  }, {
    title: '泵状态',
    key: 'pumpstatus',
    align: 'center'
  }, {
    title: '闸门状态',
    key: 'gatestatus',
    align: 'center'
  }, {
    title: '监测时间',
    key: 'data_time',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 85,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 环境监测查询
export function environmentThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center'
  }, {
    title: '污染源名称',
    key: '污染源名称',
    align: 'center'
  }, {
    title: '所属镇街',
    key: '所属镇街',
    align: 'center'
  }, {
    title: '异常描述',
    key: '异常描述',
    align: 'center'
  }, {
    title: '部门',
    key: 'department_name',
    align: 'center'
  }, {
    title: '任务编号',
    key: 'task_no',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 85,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 三防信息查询-三防资料
export function sanfangDaatThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center'
  }, {
    title: '污染源名称',
    key: '污染源名称',
    align: 'center'
  }, {
    title: '所属镇街',
    key: '所属镇街',
    align: 'center'
  }, {
    title: '异常描述',
    key: '异常描述',
    align: 'center'
  }, {
    title: '部门',
    key: 'department_name',
    align: 'center'
  }, {
    title: '任务编号',
    key: 'task_no',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 85,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 应急响应措施统计详情表
export function measuraddThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '部门名称',
    key: 'department_name',
    align: 'center'
  }, {
    title: '应急措施编号',
    key: 'response_no',
    align: 'center',
    width: 200
  }, {
    title: '启动时间',
    key: 'response_createdt',
    align: 'center'
  }, {
    title: '结束时间',
    key: 'response_closedt',
    align: 'center'
  }, {
    title: '应急措施',
    key: 'measure',
    align: 'center'
  }]
}

// 应急措施统计
export function measureThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急措施编号',
    key: 'response_no',
    align: 'center',
    width: 200
  }, {
    title: '启动时间',
    key: 'createdt',
    align: 'center'
  }, {
    title: '结束时间',
    key: 'closedt',
    align: 'center'
  }, {
    title: '级别',
    key: 'response_level',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 应急措施统计
export function emergencyPersonThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 70
  }, {
    title: '报名名称',
    key: 'title',
    align: 'center'
  }, {
    title: '统计时间',
    key: 'YYYYMM',
    align: 'center',
    width: 140
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.detailClick(data)
            }
          }
        }, '查看')
      ])
    }
  }]
}

// 应急措施统计表(二级目录)
export function measureAddThead (that) {
  return [{
    title: '应急响应措施统计表',
    align: 'center',
    children: [
      {
        title: '应急响应启动及关停措施',
        align: 'center',
        children: [
          {
            title: '部门',
            key: 'department_name',
            align: 'center',
            render: (h, params) => {
              if (params.row.department_name === '总计') {
                return h('div', {
                  style: {
                    color: 'red'
                  }
                }, '总计')
              } else {
                return h('div', {}, params.row.department_name)
              }
            }
          },
          {
            title: '停课、停业、停工、停市、停运、停航',
            key: 'measure',
            align: 'center',
            width: 120,
            render: (h, params) => {
              if (params.row.hasOwnProperty('measure') === true) {
                if (params.row.measure.indexOf('停课') !== -1) {
                  return h('div', {}, '停课')
                } if (params.row.measure.indexOf('停业') !== -1) {
                  return h('div', {}, '停业')
                } if (params.row.measure.indexOf('停工') !== -1) {
                  return h('div', {}, '停工')
                } if (params.row.measure.indexOf('停市') !== -1) {
                  return h('div', {}, '停市')
                } if (params.row.measure.indexOf('停运') !== -1) {
                  return h('div', {}, '停运')
                } if (params.row.measure.indexOf('停航') !== -1) {
                  return h('div', {}, '停航')
                } else {
                  return h('div', {}, params.row.measure)
                }
              } if (params.row.department_name === '总计') {
                return h('div', {}, '--')
              } else {
                return h('div', {}, params.row.measure)
              }
            }
          }
        ]
      },
      {
        title: '危险区域人员转移安置',
        align: 'center',
        children: [
          {
            title: '安全受威胁人数',
            key: 'threaten_num',
            align: 'center'
          },
          {
            title: '统计时间',
            key: 'createdt',
            align: 'center',
            width: 160
          },
          {
            title: '已转移人数',
            key: 'transferred_num',
            align: 'center'

          },
          {
            title: '已安置人数',
            key: 'accommodate_num',
            align: 'center'
          },
          {
            title: '避护场所启用数',
            key: 'shelter_num',
            align: 'center'
          }
        ]
      },
      {
        title: '景区关停',
        align: 'center',
        children: [
          {
            title: '应关停景区数',
            key: 'scenic_spot_num',
            align: 'center'

          },
          {
            title: '已关停景区数',
            key: 'closed_num',
            align: 'center'
          }
        ]
      },
      {
        title: '渔船回港',
        align: 'center',
        children: [
          {
            title: '渔船应回港数',
            key: 'need_return_num',
            align: 'center'

          },
          {
            title: '已回港数',
            key: 'returned_num',
            align: 'center'
          },
          {
            title: '未回港数',
            key: 'notReturned_num',
            align: 'center'
          }
        ]
      },
      {
        title: '渔排人员上岸',
        align: 'center',
        children: [
          {
            title: '渔排作业人数',
            key: 'fishing_row_num',
            align: 'center'
          }, {
            title: '已上岸人数',
            key: 'ashore_num',
            align: 'center'
          }, {
            title: '未上岸人数',
            key: 'notAshore_num',
            align: 'center'
          }
        ]
      },
      {
        title: '操作',
        key: 'edit',
        align: 'center',
        width: 80,
        render: (h, params) => {
          if (params.row.department_name !== '总计') {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: !params.row.hasChildren
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    let data = cloneObj(params.row)
                    delete data._index
                    delete data._rowKey
                    that.details(data)
                  }
                }
              }, '详情')
            ])
          }
        }

      }
    ]
  }]
}

// 应急措施统计表(三级目录)
export function measureAddDetailThead (that) {
  return [{
    title: '应急响应措施统计表',
    align: 'center',
    children: [
      {
        title: '应急响应启动及关停措施',
        align: 'center',
        children: [
          {
            title: '部门',
            key: 'department_name',
            align: 'center',
            width: 120,
            render: (h, params) => {
              if (params.row.department_name === '总计') {
                return h('div', {
                  style: {
                    color: 'red'
                  }
                }, '总计')
              }
              if (params.row.department_name === '与上级差值') {
                return h('div', {
                  style: {
                    color: 'red'
                  }
                }, '与上级差值')
              } else {
                return h('div', {}, params.row.department_name)
              }
            }
          },
          {
            title: '停课、停业、停工、停市、停运、停航',
            key: 'measure',
            align: 'center',
            width: 120,
            render: (h, params) => {
              if (params.row.hasOwnProperty('measure') === false) {
                return h('div', {}, '--')
              } else {
                return h('div', {}, params.row.measure)
              }
            }
          }
        ]
      },
      {
        title: '危险区域人员转移安置',
        align: 'center',
        children: [
          {
            title: '安全受威胁人数',
            key: 'threaten_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('threaten_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.threaten_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.threaten_num)
              }
            }
          },
          {
            title: '人员转移计划完成时间',
            key: 'createdt',
            align: 'center',
            width: 160,
            render: (h, params) => {
              if (params.row.hasOwnProperty('createdt') === false) {
                return h('div', {}, '--')
              } else {
                return h('div', {}, params.row.createdt)
              }
            }
          },
          {
            title: '已转移人数',
            key: 'transferred_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('transferred_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.transferred_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.transferred_num)
              }
            }

          },
          {
            title: '已安置人数',
            key: 'accommodate_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('accommodate_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.accommodate_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.accommodate_num)
              }
            }
          },
          {
            title: '避护场所启用数',
            key: 'shelter_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('shelter_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.shelter_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.shelter_num)
              }
            }
          }
        ]
      },
      {
        title: '景区关停',
        align: 'center',
        children: [
          {
            title: '应关停景区数',
            key: 'scenic_spot_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('scenic_spot_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.scenic_spot_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.scenic_spot_num)
              }
            }
          },
          {
            title: '已关停景区数',
            key: 'closed_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('closed_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.closed_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.closed_num)
              }
            }
          }
        ]
      },
      {
        title: '渔船回港',
        align: 'center',
        children: [
          {
            title: '渔船应回港数',
            key: 'need_return_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('need_return_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.need_return_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.need_return_num)
              }
            }

          },
          {
            title: '已回港数',
            key: 'returned_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('returned_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.returned_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.returned_num)
              }
            }
          },
          {
            title: '未回港数',
            key: 'notReturned_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('notReturned_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.notReturned_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.notReturned_num)
              }
            }
          }
        ]
      },
      {
        title: '渔排人员上岸',
        align: 'center',
        children: [
          {
            title: '渔排作业人数',
            key: 'fishing_row_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('fishing_row_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.fishing_row_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.fishing_row_num)
              }
            }
          },
          {
            title: '已上岸人数',
            key: 'ashore_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('ashore_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.ashore_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.ashore_num)
              }
            }
          },
          {
            title: '未上岸人数',
            key: 'notAshore_num',
            align: 'center',
            render: (h, params) => {
              if (params.row.hasOwnProperty('notAshore_num') === false) {
                return h('div', {}, 0)
              } else if (isNaN(params.row.notAshore_num) === true) {
                return h('div', {}, 0)
              } else {
                return h('div', {}, params.row.notAshore_num)
              }
            }
          }
        ]
      }]
  }]
}

// 防台风已转移人员统计表（每2小时一报）
export function typhoonStatisticalThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center',
    width: 200
  }, {
    title: '级别',
    key: 'response_level',
    align: 'center'
  }, {
    title: '启动时间',
    key: 'createdt',
    align: 'center'
  }, {
    title: '结束时间',
    key: 'closedt',
    align: 'center'
  }, {
    title: '状态',
    key: 'status',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.detailClick(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 防台风已转移人员统计表（每2小时一报）
export function rptlogThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center',
    width: 200
  }, {
    title: '表名',
    key: 'title',
    align: 'center'
  }, {
    title: '启动时间',
    key: 'response_createdt',
    align: 'center'
  }, {
    title: '日志时间',
    key: 'createdt',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.detailClick(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 防台风转移表(二级目录)
export function typhoonAddThead (that) {
  return [
    {
      title: '防台风统计表',
      align: 'center',
      children: [
        {
          title: '部门',
          align: 'center',
          key: 'department_name',
          render: (h, params) => {
            if (params.row.department_name === '总计') {
              return h('div', {
                style: {
                  color: 'red'
                }
              }, '总计')
            } else {
              return h('div', {}, params.row.department_name)
            }
          }
        },
        {
          title: '在建工地',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'building_count'
            },
            {
              title: '已转移(人)',
              align: 'center',
              key: 'building_transfered'
            }
          ]
        },
        {
          title: '铁皮、石棉瓦建筑物',
          align: 'center',
          children: [
            {
              title: '栋',
              align: 'center',
              key: 'poor_architecture_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'poor_architecture_transfered'
            }
          ]
        },
        {
          title: '危房',
          align: 'center',
          children: [
            {
              title: '户',
              align: 'center',
              key: 'dilapidated_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'dilapidated_transfered'
            }
          ]
        },
        {
          title: '削坡建房',
          align: 'center',
          children: [
            {
              title: '户',
              align: 'center',
              key: 'chipping_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'chipping_transfered'
            }
          ]
        },
        {
          title: '养殖业棚舍',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'shed_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'shed_transfered'
            }
          ]
        },
        {
          title: '渔船、船舶',
          align: 'center',
          children: [
            {
              title: '需要回港避风船（只）',
              align: 'center',
              key: 'fisher_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'fisher_transfered'
            }
          ]
        },
        {
          title: '危化品企业',
          align: 'center',
          children: [
            {
              title: '个',
              align: 'center',
              key: 'dangerous_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'dangerous_transfered'
            }
          ]
        },
        {
          title: '地质灾害点',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'geologic_hazard_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'geologic_hazard_transfered'
            }
          ]
        },
        {
          title: '学校',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'school_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'school_transfered'
            }
          ]
        },
        {
          title: '旅游景区',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'tourism_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'tourism_transfered'
            }
          ]
        },
        {
          title: '低洼易涝点（城镇内涝）',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'low_lying_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'low_lying_transfered'
            }
          ]
        },
        {
          title: '河道行洪区（江沁洲、外滩地）',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'river_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'river_transfered'
            }
          ]
        },
        {
          title: '五保户（区民政、镇街填写）',
          align: 'center',
          children: [
            {
              title: '户',
              align: 'center',
              key: 'five_insured_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'five_insured_transfered'
            }]
        },
        {
          title: '孤寡老已转移(人)留守儿童',
          align: 'center',
          children: [
            {
              title: '户',
              align: 'center',
              key: 'old_children_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'old_children_transfered'
            }
          ]
        },
        {
          title: '合计',
          align: 'center',
          children: [
            {
              title: '户',
              align: 'center',
              key: 'total_count'
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'total_transfered'
            }
          ]
        },
        {
          title: '操作',
          key: 'edit',
          align: 'center',
          width: 80,
          render: (h, params) => {
            if (params.row.department_name !== '总计') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: !params.row.hasChildren
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      let data = cloneObj(params.row)
                      // delete data._index
                      // delete data_rowKey
                      that.details(data)
                    }
                  }
                }, '详情')
              ])
            }
          }
        }
      ]
    }
  ]
}

// 防台风转移表(三级目录)
export function typhoonAddDetailThead (that) {
  return [
    {
      title: '防台风统计表',
      align: 'center',
      children: [
        {
          title: '部门',
          align: 'center',
          key: 'department_name',
          render: (h, params) => {
            if (params.row.department_name === '总计') {
              return h('div', {
                style: {
                  color: 'red'
                }
              }, '总计')
            }
            if (params.row.department_name === '与上级差值') {
              return h('div', {
                style: {
                  color: 'red'
                }
              }, '与上级差值')
            } else {
              return h('div', {}, params.row.department_name)
            }
          }
        },
        {
          title: '在建工地',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'building_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('building_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.building_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.building_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'building_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('building_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.building_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.building_transfered)
                }
              }
            }
          ]
        },
        {
          title: '铁皮、石棉瓦建筑物',
          align: 'center',
          children: [
            {
              title: '栋',
              align: 'center',
              key: 'poor_architecture_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('poor_architecture_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.poor_architecture_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.poor_architecture_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'poor_architecture_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('poor_architecture_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.poor_architecture_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.poor_architecture_transfered)
                }
              }
            }
          ]
        },
        {
          title: '危房',
          align: 'center',
          children: [
            {
              title: '户',
              align: 'center',
              key: 'dilapidated_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('dilapidated_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.dilapidated_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.dilapidated_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'dilapidated_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('dilapidated_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.dilapidated_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.dilapidated_transfered)
                }
              }
            }
          ]
        },
        {
          title: '削坡建房',
          align: 'center',
          children: [
            {
              title: '户',
              align: 'center',
              key: 'chipping_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('chipping_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.chipping_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.chipping_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'chipping_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('chipping_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.chipping_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.chipping_transfered)
                }
              }
            }]
        },
        {
          title: '养殖业棚舍',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'shed_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('shed_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.shed_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.shed_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'shed_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('shed_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.shed_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.shed_transfered)
                }
              }
            }
          ]
        },
        {
          title: '渔船、船舶',
          align: 'center',
          children: [
            {
              title: '需要回港避风船（只）',
              align: 'center',
              key: 'fisher_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('fisher_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.fisher_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.fisher_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'fisher_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('fisher_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.fisher_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.fisher_transfered)
                }
              }
            }
          ]
        },
        {
          title: '危化品企业',
          align: 'center',
          children: [
            {
              title: '个',
              align: 'center',
              key: 'dangerous_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('dangerous_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.dangerous_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.dangerous_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'dangerous_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('dangerous_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.dangerous_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.dangerous_transfered)
                }
              }
            }
          ]
        },
        {
          title: '地质灾害点',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'geologic_hazard_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('geologic_hazard_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.geologic_hazard_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.geologic_hazard_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'geologic_hazard_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('geologic_hazard_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.geologic_hazard_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.geologic_hazard_transfered)
                }
              }
            }
          ]
        },
        {
          title: '学校',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'school_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('school_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.school_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.school_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'school_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('school_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.school_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.school_transfered)
                }
              }
            }
          ]
        },
        {
          title: '旅游景区',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'tourism_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('tourism_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.tourism_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.tourism_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'tourism_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('tourism_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.tourism_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.tourism_transfered)
                }
              }
            }
          ]
        },
        {
          title: '低洼易涝点（城镇内涝）',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'low_lying_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('low_lying_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.low_lying_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.low_lying_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'low_lying_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('low_lying_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.low_lying_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.low_lying_transfered)
                }
              }
            }]
        },
        {
          title: '河道行洪区（江沁洲、外滩地）',
          align: 'center',
          children: [
            {
              title: '处',
              align: 'center',
              key: 'river_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('river_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.river_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.river_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'river_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('river_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.river_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.river_transfered)
                }
              }
            }]
        },
        {
          title: '五保户（区民政、镇街填写）',
          align: 'center',
          children: [
            {
              title: '户',
              align: 'center',
              key: 'five_insured_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('five_insured_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.five_insured_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.five_insured_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'five_insured_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('five_insured_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.five_insured_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.five_insured_transfered)
                }
              }
            }]
        },
        {
          title: '孤寡老已转移(人)留守儿童',
          align: 'center',
          children: [
            {
              title: '户',
              align: 'center',
              key: 'old_children_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('old_children_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.old_children_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.old_children_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'old_children_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('old_children_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.old_children_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.old_children_transfered)
                }
              }
            }]
        },
        {
          title: '合计',
          align: 'center',
          children: [
            {
              title: '户',
              align: 'center',
              key: 'total_count',
              render: (h, params) => {
                if (params.row.hasOwnProperty('total_count') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.total_count) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.total_count)
                }
              }
            }, {
              title: '已转移(人)',
              align: 'center',
              key: 'total_transfered',
              render: (h, params) => {
                if (params.row.hasOwnProperty('total_transfered') === false) {
                  return h('div', {}, 0)
                } else if (isNaN(params.row.total_transfered) === true) {
                  return h('div', {}, 0)
                } else {
                  return h('div', {}, params.row.total_transfered)
                }
              }
            }]
        }
      ]
    }
  ]
}

// 暴雨情况统计表
export function rainstormThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '暴雨情况统计表编号',
    key: 'response_no',
    align: 'center',
    width: 200
  }, {
    title: '级别',
    key: 'response_level',
    align: 'center'
  }, {
    title: '类型',
    key: 'response_type',
    align: 'center'
  }, {
    title: '启动时间',
    key: 'createdt',
    align: 'center'
  }, {
    title: '结束时间',
    key: 'closedt',
    align: 'center'
  }, {
    title: '状态',
    key: 'status',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 暴雨情况统计表（二级）
export function rainstormAddThead (that) {
  return [{
    title: '暴雨情况统计表',
    align: 'center',
    children: [
      {
        title: '部门',
        key: 'department_name',
        align: 'center',
        render: (h, params) => {
          if (params.row.department_name === '总计') {
            return h('div', {
              style: {
                color: 'red'
              }
            }, '总计')
          } else {
            return h('div', {}, params.row.department_name)
          }
        }
      }, {
        title: '受淹农田',
        key: 'farms',
        align: 'center'
      },
      {
        title: '受淹鱼塘',
        key: 'fishponds',
        align: 'center'
      },
      {
        title: '道路水浸处数',
        key: 'roads',
        align: 'center'
      },
      {
        title: '车辆受浸数',
        key: 'cars',
        align: 'center'
      },
      {
        title: '出动巡查人数',
        key: 'patrols',
        align: 'center'
      },
      {
        title: '抢排险人数',
        key: 'evacuations',
        align: 'center'
      },
      {
        title: '出动抢排险设备数',
        key: 'evacuation_devices',
        align: 'center'
      },
      {
        title: '开启泵站台数/台',
        key: 'pumps',
        align: 'center'
      },
      {
        title: '开机台时/时',
        key: 'times',
        align: 'center'
      },
      {
        title: '值班人数',
        key: 'duty_count',
        align: 'center'
      },
      {
        title: '受伤人数',
        key: 'injured',
        align: 'center'
      },
      {
        title: '人员伤亡',
        key: 'death',
        align: 'center'
      },
      {
        title: '操作',
        key: 'edit',
        align: 'center',
        width: 130,
        render: (h, params) => {
          if (params.row.department_name !== '总计') {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: !params.row.hasChildren
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    let data = cloneObj(params.row)
                    delete data._index
                    delete data._rowKey
                    that.details(data)
                  }
                }
              }, '详情')
            ])
          }
        }
      }
    ]
  }]
}

// 暴雨详情统计表（三级）
export function rainstormAddDetailThead (that) {
  return [{
    title: '暴雨情况统计表',
    align: 'center',
    children: [
      {
        title: '部门',
        key: 'department_name',
        align: 'center',
        render: (h, params) => {
          if (params.row.department_name === '总计') {
            return h('div', {
              style: {
                color: 'red'
              }
            }, '总计')
          }
          if (params.row.department_name === '与上级差值') {
            return h('div', {
              style: {
                color: 'red'
              }
            }, '与上级差值')
          } else {
            return h('div', {}, params.row.department_name)
          }
        }
      }, {
        title: '受淹农田',
        key: 'farms',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('farms') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.farms) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.farms)
          }
        }
      },
      {
        title: '受淹鱼塘',
        key: 'fishponds',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('fishponds') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.fishponds) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.fishponds)
          }
        }
      },
      {
        title: '道路水浸处数',
        key: 'roads',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('roads') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.roads) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.roads)
          }
        }
      },
      {
        title: '车辆受浸数',
        key: 'cars',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('cars') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.cars) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.cars)
          }
        }
      },
      {
        title: '出动巡查人数',
        key: 'patrols',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('patrols') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.patrols) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.patrols)
          }
        }
      },
      {
        title: '抢排险人数',
        key: 'evacuations',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('evacuations') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.evacuations) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.evacuations)
          }
        }
      },
      {
        title: '出动抢排险设备数',
        key: 'evacuation_devices',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('evacuation_devices') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.evacuation_devices) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.evacuation_devices)
          }
        }
      },
      {
        title: '开启泵站台数/台',
        key: 'pumps',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('pumps') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.pumps) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.pumps)
          }
        }
      },
      {
        title: '开机台时/时',
        key: 'times',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('times') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.times) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.times)
          }
        }
      },
      {
        title: '值班人数',
        key: 'duty_count',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('duty_count') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.duty_count) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.duty_count)
          }
        }
      },
      {
        title: '受伤人数',
        key: 'injured',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('injured') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.injured) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.injured)
          }
        }
      },
      {
        title: '人员伤亡',
        key: 'death',
        align: 'center',
        render: (h, params) => {
          if (params.row.hasOwnProperty('death') === false) {
            return h('div', {}, 0)
          } else if (isNaN(params.row.death) === true) {
            return h('div', {}, 0)
          } else {
            return h('div', {}, params.row.death)
          }
        }
      }
    ]
  }]
}

// 数据上报日志
export function dataReportLogThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center'
  }, {
    title: '表单名称',
    key: 'formname',
    align: 'center'
  }, {
    title: '部门',
    key: 'department_name',
    align: 'center'
  }, {
    title: '统计时间',
    key: 'logtime',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 临时报表统计
export function temporaryReportThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '应急响应编号',
    key: 'response_no',
    align: 'center'
  }, {
    title: '表单名称',
    key: 'form_name',
    align: 'center'
  }, {
    title: '任务概要',
    key: 'task_desc',
    align: 'center'
  }, {
    title: '任务开始时间',
    key: 'startdate',
    align: 'center'
  }, {
    title: '任务结束时间',
    key: 'enddate',
    align: 'center'
  },
  {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 三防信息查询-预案查询
export function planSearchThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '预案编号',
    key: 'plan_no',
    align: 'center',
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.plan_no
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.plan_no)
    }
  }, {
    title: '预案名称',
    key: 'plan_name',
    align: 'center',
    ellipsis: true,
    render: (h, params) => {
      return h('div', {
        attrs: {
          title: params.row.plan_name
        },
        style: {
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }, params.row.plan_name)
    }
  }, {
    title: '执行部门',
    key: 'department_name',
    align: 'center',
    width: 100
  }, {
    title: '预案状态',
    key: 'status',
    align: 'center',
    width: 85
  }, {
    title: '起草人',
    key: 'createby',
    align: 'center',
    width: 80
  }, {
    title: '提交时间',
    key: 'createdt',
    align: 'center',
    ellipsis: true
  }, {
    title: '审批人',
    key: 'approveby',
    align: 'center',
    width: 80
  }, {
    title: '审批时间',
    key: 'approvedt',
    align: 'center',
    ellipsis: true
  }, {
    title: '操作',
    key: 'edit',
    align: 'left',
    width: 80,
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data['_index']
              delete data['_rowKey']
              that.details(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 演练管理
// 演练计划
export function prPlanThead (that) {
  return [{
    type: 'selection',
    align: 'center',
    width: 60
  }, {
    title: '计划号',
    key: 'plan_no',
    align: 'center',
    width: 135
  }, {
    title: '演练标题',
    key: 'healine',
    align: 'center'
  }, {
    title: '状态',
    key: 'status',
    align: 'center'
  }, {
    title: '详细说明',
    key: 'main_objective',
    align: 'center'
  }, {
    title: '计划开始时间',
    key: 'plan_start',
    align: 'center'
  }, {
    title: '计划结束时间',
    key: 'plan_end',
    align: 'center'
  }, {
    title: '实际开始时间',
    key: 'actual_start',
    align: 'center'
  }, {
    title: '实际结束时间',
    key: 'actual_end',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 130,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '编辑'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.delete(data)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 初始化数据
export function prDataThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '台风编号',
    key: 'tfbh',
    align: 'center'
  }, {
    title: '移动方向',
    key: 'move_dir',
    align: 'center'
  }, {
    title: '移动速度',
    key: 'move_speed',
    align: 'center'
  }, {
    title: '力度',
    key: 'power',
    align: 'center'
  }, {
    title: '速度',
    key: 'speed',
    align: 'center'
  }, {
    title: '强度',
    key: 'strong',
    align: 'center'
  }, {
    title: '七级风圈半径',
    key: 'radius7',
    align: 'center'
  }, {
    title: '十级风圈半径',
    key: 'radius10',
    align: 'center'
  }, {
    title: '十二级风圈半径',
    key: 'radius12',
    align: 'center'
  }, {
    title: '时间',
    key: 'time',
    align: 'center'
  }]
}

// 演练报告
export function prReportThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '计划编号',
    key: 'plan_no',
    align: 'center',
    width: 135
  }, {
    title: '计划开始时间',
    key: 'plan_start',
    align: 'center'
  }, {
    title: '计划结束时间',
    key: 'plan_end',
    align: 'center'
  }, {
    title: '计划总数',
    key: 'sum',
    align: 'center',
    width: 135
  }, {
    title: '已完成计划（条）',
    key: 'complete',
    align: 'center'
  }, {
    title: '完成度',
    key: 'percent',
    align: 'center'
  }]
}

// 演练角色
export function prRoleThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '角色名称',
    key: 'role_name',
    align: 'center',
    width: 200
  }, {
    title: '职责说明',
    key: 'role_duty',
    align: 'center'
  }, {
    title: '用户',
    key: 'user_list',
    align: 'center',
    render: (h, params) => {
      let arr = []
      params.row.user_list.map(item => {
        arr.push(item.user_name)
      })
      let text = arr.join(',')
      return h('div', {}, text)
    }
  },
  {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 135,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '修改'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.delete(data)
            }
          }
        }, '删除')
      ])
    }
  }
  ]
}

// 演练任务
export function prTaskThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '任务编号',
    key: 'task_no',
    align: 'center',
    width: 135
  }, {
    title: '任务简述',
    key: 'task_profile',
    align: 'center'
  }, {
    title: '状态',
    key: 'status',
    align: 'center'
  }, {
    title: '计划编号',
    key: 'plan_no',
    align: 'center'
  }, {
    title: '角色',
    key: 'task_role',
    align: 'center'
  }, {
    title: '计划开始时间',
    key: 'plan_start',
    align: 'center'
  }, {
    title: '计划结束时间',
    key: 'plan_end',
    align: 'center'
  }, {
    title: '实际开始时间',
    key: 'actual_start',
    align: 'center'
  }, {
    title: '实际开始时间',
    key: 'actual_end',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 190,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.details(data)
            }
          }
        }, '详情'),
        h('Button', {
          props: {
            type: 'success',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '编辑'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.delete(data)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 三防任务安排
export function officeThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '工作标题',
    key: 'title',
    align: 'center',
    width: 135
  }, {
    title: '部门名称',
    key: 'department_name',
    align: 'center'
  }, {
    title: '工作内容',
    key: 'content',
    align: 'center'
  }, {
    title: '负责人',
    key: 'chargeby',
    align: 'center'
  }, {
    title: '完成情况说明',
    key: 'execution_desc',
    align: 'center'
  }, {
    title: '状态',
    key: 'status',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 150,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '编辑'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.delete(data)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 传真管理
export function faxThead (that) {
  return [{
    type: 'selection',
    align: 'center',
    width: 60
  }, {
    title: '发送人',
    key: 'sender',
    align: 'center',
    width: 100
  }, {
    title: '传真内容',
    key: 'content',
    align: 'center'
  }, {
    title: '状态',
    key: 'status',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 135,
    render: (h, params) => {
      if (params.row.status === '待发') {
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
                let data = cloneObj(params.row)
                delete data._index
                delete data._rowKey
                that.edit(data)
              }
            }
          }, '编辑'),
          h('Button', {
            props: {
              type: 'success',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data._index
                delete data._rowKey
                that.post(data)
              }
            }
          }, '发送')
        ])
      }
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '编辑')
      ])
    }
  }]
}

// 值班人员管理
export function personnelThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '部门名称',
    key: 'department_name',
    align: 'center',
    width: 100
  }, {
    title: '值班人',
    key: 'name',
    align: 'center'
  }, {
    title: '电话号码',
    key: 'telephone',
    align: 'center'
  }, {
    title: '职责名称',
    key: 'duty',
    align: 'center'
  }, {
    title: '职责描述',
    key: 'duty_desc',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 135,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '编辑'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.delete(data)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 值班日志
export function journalThead (that) {
  return [{
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  }, {
    title: '部门名称',
    key: 'department_name',
    align: 'center',
    width: 100
  }, {
    title: '值班人员',
    key: 'name_list',
    align: 'center',
    render: (h, params) => {
      let arr = []
      let newArr = params.row.name_list.map(item => {
        return JSON.parse(item)
      })
      newArr.map(item => {
        arr.push(item.name)
      })
      let str = arr.join(',')
      return h('div', [
        h('span', {

        }, str)
      ])
    }
  }, {
    title: '值班时段',
    key: 'duty_period',
    align: 'center'
  }, {
    title: '操作',
    key: 'edit',
    align: 'center',
    width: 135,
    render: (h, params) => {
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
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '编辑'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.delete(data)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 三防快报管理
export function latterThead (that) {
  return [{
    type: 'selection',
    width: 60,
    align: 'center'
  }, {
    title: '状态',
    key: 'status',
    width: 150
  }, {
    title: '标题',
    key: 'title',
    width: 300
  }, {
    title: '内容',
    key: 'content'
    // ellipsis: true
  }, {
    title: '操作',
    key: 'edit',
    width: 130,
    render: (h, params) => {
      return h('div', [
        (function () {
          if (params.row.status === '已发布') {
            return
          }
          return h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data._index
                delete data._rowKey
                that.edit(params.row)
              }
            }
          }, '修改')
        }()),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          style: {
            marginLeft: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.delete(params.row._index)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 文章管理
export function articleThead (that) {
  return [{
    title: '序号',
    type: 'index',
    width: 60,
    align: 'center'
  }, {
    title: '作者',
    key: 'author',
    width: 150
  }, {
    title: '标题',
    key: 'title',
    width: 300
  }, {
    title: '内容',
    key: 'content'
    // ellipsis: true
  }, {
    title: '操作',
    key: 'edit',
    width: 130,
    render: (h, params) => {
      return h('div', [
        (function () {
          if (params.row.status === '已发布') {
            return
          }
          return h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row)
                delete data._index
                delete data._rowKey
                that.edit(data)
              }
            }
          }, '详情')
        }()),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          style: {
            marginLeft: '5px'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.delete(params.row._index)
            }
          }
        }, '删除')
      ])
    }
  }]
}

// 现场上报管理
export function reportedThead (that) {
  return [{
    title: '序号',
    type: 'index',
    width: 60,
    align: 'center'
  }, {
    title: '上报人员',
    key: 'reporter',
    width: 100
  }, {
    title: '上报时间',
    key: 'reporttime',
    width: 150
  }, {
    title: '上报类型',
    key: 'type',
    width: 150
  }, {
    title: '上报内容',
    key: 'content',
    ellipsis: true
  }, {
    title: '操作',
    key: 'edit',
    width: 80,
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(data)
            }
          }
        }, '详情')
      ])
    }
  }]
}

// 模板管理
export function modalThead (that) {
  return [{
    title: '序号',
    type: 'index',
    width: 60,
    align: 'center'
  }, {
    title: '类型',
    key: 'type'
  }, {
    title: '表单名称',
    key: 'form_name'
  }, {
    title: '部门',
    key: 'department_name'
  }, {
    title: '操作',
    key: 'edit',
    width: 80,
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          on: {
            click: () => {
              let data = cloneObj(params.row)
              delete data._index
              delete data._rowKey
              that.edit(params.row)
            }
          }
        }, '编辑')
      ])
    }
  }]
}

// 当前雨量
export function rainthear (that) {
  return [
    {
      title: '名称',
      key: 'stn_name',
      align: 'center'
    }, {
      title: '时间',
      key: 'data_time',
      align: 'center',
      width: 160
    }, {
      title: '水位',
      key: 'waterlevel',
      align: 'center'
    }, {
      title: '警戒水位',
      key: 'alarm_l3',
      align: 'center'
    }
  ]
}
