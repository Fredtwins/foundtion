// 首页 MenuItem
export const homeMenu = [{
  id: 'mdl.firstpage',
  text: '首页',
  name: '1-1',
  path: '/home/default',
  icon: 'icon-home'
},
{
  id: 'mdl.threeCommand',
  text: '应急响应',
  name: '1-2',
  path: '/home/threeCommand',
  icon: 'iconfont icon-fangxunyingjizhihui'
},
{
  id: 'mdl.sanfanapplication',
  text: '三防业务',
  name: '1-3',
  path: '/home/threeBusiness',
  icon: 'icon-sanfangyewu'
},
{
  id: 'mdl.departmentmanage',
  text: '部门管理',
  name: '1-4',
  path: '/home/depManagement',
  icon: 'icon-department'
},
{
  id: 'mdl.OAfunction',
  text: '日常办公',
  name: '1-5',
  path: '/home/dailyOffice',
  icon: 'icon-richangbangong'
},
{
  id: 'mdl.reportlist',
  text: '报表汇总',
  name: '1-6',
  path: '/home/tab-summary',
  icon: 'icon-table'
},
{
  id: 'mdl.systemmanage',
  text: '系统管理',
  name: '1-7',
  path: '/home/systemManagement',
  icon: 'icon-guanli'
},
{
  id: 'mdl.moveManagement',
  text: '移动管理',
  name: '1-8',
  path: '/home/moveManagement',
  icon: 'iconfont icon-yidongyingyong'
}
]

// 三防业务 MenuItem
export const threeBusinessMenu = [
  {
    id: 'mdl.sanfanapplication.emergenceplan',
    text: '预案管理',
    name: '1',
    icon: 'iconfont icon-yingjiyuan',
    children: [{
      id: 'mdl.sanfanapplication.emergenceplan.departmentplan',
      text: '部门预案',
      name: '1-1',
      path: '/home/threeBusiness/threeBusinessDefault'
    }, {
      id: 'mdl.sanfanapplication.emergenceplan.communityplan',
      text: '社区预案',
      name: '1-2',
      path: '/home/threeBusiness/threeBusinessCommunity'
    }, {
      id: 'mdl.sanfanapplication.emergenceplan.specialplan',
      text: '专题预案',
      name: '1-3',
      path: '/home/threeBusiness/threeBusinessTopic'
    }, {
      id: 'mdl.sanfanapplication.emergenceplan.planapproval',
      text: '预案审批',
      name: '1-4',
      path: '/home/threeBusiness/threeBusinessApproval'
    }, {
      id: 'mdl.sanfanapplication.emergenceplan.responselevel',
      text: '应急响应级别',
      name: '1-5',
      path: '/home/threeBusiness/erLevel'
    }]
  },
  {
    id: 'mdl.sanfanapplication.response',
    text: '应急响应过程',
    name: '3',
    icon: 'iconfont icon-renwuguanli',
    children: [{
      id: 'mdl.sanfanapplication.response.taskmanage',
      text: '任务列表',
      name: '3-1',
      path: '/home/threeBusiness/magTask'
    }, {
      id: 'mdl.sanfanapplication.response.taskpreplan',
      text: '预设任务列表',
      name: '3-2',
      path: '/home/threeBusiness/psTask'
    }, {
      id: 'mdl.sanfanapplication.response.responsemanage',
      text: '应急响应历史',
      name: '3-3',
      path: '/home/threeBusiness/erManagement'
    }, {
      id: 'mdl.sanfanapplication.response.ondutykanban',
      text: '联合值守看板',
      name: '3-4',
      path: '/home/threeBusiness/erCard'
    }, {
      id: 'mdl.sanfanapplication.response.participants',
      text: '参与人员列表',
      name: '3-5',
      path: '/home/threeBusiness/participants'
    }, {
      id: 'mdl.sanfanapplication.response.daily-record',
      text: '警告事件日志',
      name: '3-6',
      path: '/home/threeBusiness/daily-record'
    }]
  },
  {
    text: '演练管理',
    name: '2',
    icon: 'iconfont icon-fuwurenwuguanli',
    children: [{
      text: '演练计划',
      name: '2-1',
      path: '/home/threeBusiness/prPlan'
    }, {
      text: '演练任务',
      name: '2-2',
      path: '/home/threeBusiness/prTask'
    }, {
      text: '演练角色',
      name: '2-3',
      path: '/home/threeBusiness/prRole'
    }, {
      text: '初始化数据',
      name: '2-4',
      path: '/home/threeBusiness/prData'
    }, {
      text: '演练报告',
      name: '2-5',
      path: '/home/threeBusiness/prReport'
    }]
  },
  {
    text: '智慧分析管理',
    name: '4',
    icon: 'iconfont icon-fuwurenwuguanli',
    children: [{
      text: '数据模型管理',
      name: '4-1',
      path: '/home/threeBusiness/dataModel'
    }, {
      text: '历史分析管理',
      name: '4-2',
      path: '/home/threeBusiness/historyData'
    }]
  }
]

// 部门管理 上面MenuItem
export const depManagementTopMenu = [
  {
    id: 'mdl.departmentmanage.sysdef',
    text: '部门系统定义',
    // path: '/home/depManagement/definition',
    link: 'definition',
    name: '1',
    icon: 'iconfont icon-xitongcaidan'
  }, {
    id: 'mdl.departmentmanage.instructions',
    text: '部门指令库管理',
    // path: '/home/depManagement/Library',
    link: 'Library',
    name: '2',
    icon: 'iconfont icon-zhilingmobanguanli'
  }, {
    id: 'mdl.departmentmanage.staff',
    text: '部门人员管理',
    // path: '/home/depManagement/address',
    link: 'address',
    name: '3',
    icon: 'iconfont icon-tongxunlu'
  }
]

// 部门管理 下面MenuItem
export const depManagementBotMenu = [
  {
    id: 'mdl.departmentmanage.datamaintenance',
    text: '部门数据维护',
    name: '4',
    icon: 'iconfont icon-iconset0357',
    children: [{
      id: 'mdl.departmentmanage.datamaintenance.reservoir',
      text: '水库数据维护',
      name: '4-2',
      // path: '/home/depManagement/shuiku'
      link: 'shuiku'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.pool',
      text: '山塘数据维护',
      name: '4-3',
      link: 'hillpool'
      // path: '/home/depManagement/hillpool',
    }, {
      id: 'mdl.departmentmanage.datamaintenance.dikedangerous',
      text: '险段数据维护',
      name: '4-4',
      link: 'derstam'
      // path: '/home/depManagement/derstam'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.dike',
      text: '堤围数据维护',
      name: '4-5',
      link: 'tiwei'
      // path: '/home/depManagement/tiwei',
    }, {
      id: 'mdl.departmentmanage.datamaintenance.rivermiddle',
      text: '江心洲数据维护',
      name: '4-6',
      link: 'jiangxin'
      // path: '/home/depManagement/jiangxin'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.advertisement',
      text: '户外立式广告牌',
      name: '4-7',
      link: 'waitandi'
      // path: '/home/depManagement/waitandi',
    }, {
      id: 'mdl.departmentmanage.datamaintenance.dikeconstruction',
      text: '堤上在建工程',
      name: '4-8',
      link: 'tishan'
      // path: '/home/depManagement/tishan'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.dikepipe',
      text: '穿堤管道数据维护',
      name: '4-9',
      link: 'ctgd'
      // path: '/home/depManagement/ctgd',
    }, {
      id: 'mdl.departmentmanage.datamaintenance.dock',
      text: '码头数据维护',
      name: '4-10',
      link: 'matou'
      // path: '/home/depManagement/matou'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.bridge',
      text: '桥梁数据维护',
      name: '4-11',
      link: 'qiaoliang'
      // path: '/home/depManagement/qiaoliang',
    }, {
      id: 'mdl.departmentmanage.datamaintenance.scenerysport',
      text: '景点数据维护',
      name: '4-12',
      link: 'jingdian'
      // path: '/home/depManagement/jingdian'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.threeshed',
      text: '三棚数据维护',
      name: '4-13',
      link: 'sanpeng'
      // path: '/home/depManagement/sanpeng',
    }, {
      id: 'mdl.departmentmanage.datamaintenance.powerfacility',
      text: '电力设施数据维护',
      name: '4-14',
      link: 'dl'
      // path: '/home/depManagement/dl'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.buildingsite',
      text: '建筑工地数据维护',
      name: '4-15',
      link: 'gongdi'
      // path: '/home/depManagement/gongdi',
    }, {
      id: 'mdl.departmentmanage.datamaintenance.hazardouschemicals',
      text: '危险化学品',
      name: '4-16',
      link: 'weixians'
      // path: '/home/depManagement/weixians'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.communicationsequipment',
      text: '重要通讯设备',
      name: '4-17',
      link: 'zhongysb'
      // path: '/home/depManagement/zhongysb',
    }, {
      id: 'mdl.departmentmanage.datamaintenance.dangerousbuilding',
      text: '危房基本信息维护',
      name: '4-18',
      link: 'weifang'
      // path: '/home/depManagement/weifang'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.materialwarehouse',
      text: '物资仓库维护',
      name: '4-19',
      link: 'cangku'
      // path: '/home/depManagement/cangku'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.weatherstation',
      text: '气象站数据维护',
      name: '4-20',
      link: 'qixiang'
      // path: '/home/depManagement/qixiang',
    }, {
      id: 'mdl.departmentmanage.datamaintenance.waterlogging',
      text: '内涝数据维护',
      name: '4-21',
      link: 'neilao'
      // path: '/home/depManagement/neilao'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.geologichazard',
      text: '地质灾害维护',
      name: '4-22',
      link: 'dizhizaihai'
      // path:'/home/depManagement/dizhizaihai'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.refuge',
      text: '避难场所维护',
      name: '4-23',
      link: 'changsuo'
      // path:'/home/depManagement/changsuo'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.sluicegate',
      text: '涵闸数据维护',
      name: '4-24',
      link: 'hanza'
      // path:'/home/depManagement/hanza'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.pumpstation',
      text: '泵站数据维护',
      name: '4-25',
      link: 'benzhan'
      // path:'/home/depManagement/benzhan'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.fishingport',
      text: '渔船停泊点',
      name: '4-26',
      link: 'fish'
      // path:'/home/depManagement/fish'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.school',
      text: '学校数据维护',
      name: '4-27',
      link: 'school'
      // path:'/home/depManagement/school'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.rivernetwork',
      text: '水网数据维护',
      name: '4-28',
      link: 'shuiwang'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.shoppingdata',
      text: '商场数据维护',
      name: '4-29',
      link: 'shangchang'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.passengerstation',
      text: '客运站数据',
      name: '4-30',
      link: 'keyunzhan'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.hospital',
      text: '医院数据维护',
      name: '4-31',
      link: 'yiyuan'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.bank',
      text: '银行数据维护',
      name: '4-32',
      link: 'yinhan'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.rescue',
      text: '救援数据维护',
      name: '4-33',
      link: 'jiuyuan'
    }, {
      // id: 'mdl.departmentmanage.datamaintenance.watersupplyplant',
      text: '排水设施信息',
      name: '4-34',
      link: 'paishuisheshi',
      show: false
    }, {
      id: 'mdl.departmentmanage.datamaintenance.watersupplyplant',
      text: '供水设备信息',
      name: '4-36',
      link: 'gongshuishebei'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.sewageplant',
      text: '污水厂信息',
      name: '4-37',
      link: 'wushuichang'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.waterworks',
      text: '自来水信息',
      name: '4-38',
      link: 'zilaishui'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.drainpipe',
      text: '排水管网信息',
      name: '4-39',
      link: 'paishuiguanwang'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.supplypipe',
      text: '供水管网信息',
      name: '4-40',
      link: 'gongshuiguanwang'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.sinkingtunnel',
      text: '下沉隧道信息',
      name: '4-41',
      link: 'xiachensuidao'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.hydrometric',
      text: '水文站信息',
      name: '4-42',
      link: 'shuiwen'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.constructionbuilding',
      text: '构建筑物信息',
      name: '4-43',
      link: 'goujian'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.outfall',
      text: '排水口信息',
      name: '4-44',
      link: 'paishuikou'
    }, {
      id: 'mdl.departmentmanage.datamaintenance.warningmanage',
      text: '警戒值管理',
      name: '4-45',
      link: 'jingjie'
    }]
  }, {
    id: 'mdl.departmentmanage.datasubmit',
    text: '部门数据上报',
    name: '5',
    icon: 'iconfont icon-tianjiashangbao',
    children: [{
      id: 'mdl.departmentmanage.datasubmit.monthsubmit',
      text: '月度数据上报',
      name: '5-1',
      link: 'dataReport'
      // path: '/home/depManagement/deplist'
    }, {
      id: 'mdl.departmentmanage.datasubmit.afterreportsubmit',
      text: '事后数据上报',
      name: '5-2',
      link: 'dataAfterReport'
      // path: '/home/depManagement/deplist'
    }, {
      id: 'mdl.departmentmanage.datasubmit.datatemplate',
      text: '数据模版',
      name: '5-3',
      link: 'deplist'
      // path: '/home/depManagement/deplist'
    },
      // {
      // text: '数据上报',
      // name: '5-2',
      // link: 'Employment',
      // show: false
      // //path: '/home/depManagement/Employment'
      // },
    {
      id: 'mdl.departmentmanage.datasubmit.dataquery',
      text: '表单查看',
      name: '5-4',
      link: 'Listsean'
      // path: '/home/depManagement/Listsean'
    }, {
      id: 'mdl.departmentmanage.datasubmit.temporarytemplet',
      text: '临时数据模板',
      name: '5-5',
      link: 'temporary',
      path: '/home/depManagement/temporary'
    }
    ]
  }
]
// {
//   id: 'mdl.departmentmanage.datamaintenance.watersupplyplant',
//   text: '供水设施信息',
//   name: '4-35',
//   link: 'gongshuisheshi',
//   show: false
// }

// 日常办公 上面的MenuItem
export const dailyOfficeTopMenu = [
  {
    id: 'mdl.OAfunction.addressBook',
    text: '通讯录管理',
    name: '1',
    path: '/home/dailyOffice/addressBook',
    icon: 'iconfont icon-tongxunlu'
  },
  {
    id: 'mdl.OAfunction.notice',
    text: '通知公告',
    name: '2',
    path: '/home/dailyOffice/notice',
    icon: 'iconfont icon-tongzhigonggao1'
  },
  {
    id: 'mdl.OAfunction.dataManagement',
    text: '资料管理',
    name: '3',
    path: '/home/dailyOffice/dataManagement',
    icon: 'iconfont icon-tiaochaziliaoguanli'
  },
  {
    id: 'mdl.OAfunction.noteManagement',
    text: '短信管理',
    name: '4',
    path: '/home/dailyOffice/noteManagement',
    icon: 'iconfont icon-duanxin'
  },
  {
    id: 'mdl.OAfunction.addressee',
    text: '公文收发',
    name: '5',
    path: '/home/dailyOffice/addressee',
    icon: 'iconfont icon-ai-briefcase'
  },
  {
    id: 'mdl.OAfunction.thematicInformation',
    text: '专题信息订阅',
    name: '6',
    path: '/home/dailyOffice/thematicInformation',
    icon: 'iconfont icon-dingyue1'
  },
  {
    text: '传真管理',
    name: '7',
    path: '/home/dailyOffice/faxManagement',
    icon: 'iconfont icon-dingyue1',
    show: false
  },
  {
    text: '三防工作安排',
    name: '8',
    path: '/home/dailyOffice/officeManagement',
    icon: 'iconfont icon-dingyue1',
    show: false
  },
  // {
  // text: '值班管理',
  // name: '9',
  // path: '/home/dailyOffice/dutyMangement',
  // icon: 'iconfont icon-dingyue1',
  // show: false
  // }
  {
    id: 'mdl.OAfunction.operatingmaterial',
    text: '系统应用资料',
    name: '9',
    path: '/home/dailyOffice/systemApplicationData',
    icon: 'iconfont icon-tiaochaziliaoguanli'
  }
]

// 日常办公 下面的MenuItem
export const dailyOfficeBotMenu = [
  {
    text: '值班管理',
    name: '9',
    icon: 'iconfont icon-ai-briefcase',
    show: false,
    children: [{
      text: '值班人员管理',
      name: '9-1',
      path: '/home/dailyOffice/personnel',
      show: false
    }, {
      text: '值班日志',
      name: '9-2',
      path: '/home/dailyOffice/journal',
      show: false
    }]
  }
]

// 报表汇总 MenuItem
export const tabSummaryMenu = [
  {
    id: 'mdl.reportlist.beforeReport',
    text: '日常报表统计',
    name: '1',
    icon: 'arrow-swap',
    children: [
      // {
      //   id: 'mdl.departmentmanage.datasubmit.monthsubmit',
      //   text: '月度数据上报',
      //   name: '1',
      //   icon: 'arrow-swap',
      //   path: '/home/tab-summary/emergency-measure'
      // },
      {
        // id: 'mdl.reportlist.beforeReport',
        id: 'mdl.reportlist.centerReport.monthaffectedpeoplerpt',
        text: '月度受影响人员台账统计表',
        name: '2',
        icon: 'arrow-swap',
        path: '/home/tab-summary/emergency-person'
      }
    ]
  }, {
    id: 'mdl.reportlist.centerReport',
    text: '事中报表统计',
    name: '2',
    icon: 'document-text',
    show: false,
    children: [ {
      id: 'mdl.reportlist.centerReport.responsemeasure',
      text: '应急响应措施统计',
      name: '2-1',
      path: '/home/tab-summary/emergency-measure',
      icon: 'android-hand',
      show: false
    }, {
      id: 'mdl.reportlist.centerReport.typhoonreport',
      text: '防御当前台风应急措施统计表',
      name: '2-2',
      path: '/home/tab-summary/typhoon-statistical',
      icon: 'android-hand',
      show: false
    }, {
      id: 'mdl.reportlist.centerReport.floodtyphoontransferreport',
      text: '防汛防台风已转移人员统计表',
      name: '2-3',
      path: '/home/tab-summary/typhoonFlood-statistical',
      icon: 'android-hand',
      show: false
    }, {
      id: 'mdl.reportlist.centerReport.rainstormtyphoonreport',
      text: '暴雨台风防御工作开展情况统计表',
      name: '2-4',
      path: '/home/tab-summary/rainDefense-statistical',
      icon: 'android-hand',
      show: false
    }, {
      id: 'mdl.reportlist.centerReport.disasterdamagereport',
      text: '受灾情况统计表',
      name: '2-5',
      path: '/home/tab-summary/disaster-statistical',
      icon: 'android-hand',
      show: false
    }, {
      id: 'mdl.reportlist.centerReport.disasterreliefreport',
      text: '救灾复产情况统计表',
      name: '2-6',
      path: '/home/tab-summary/disasterRelief-statistical',
      icon: 'android-hand',
      show: false
    }, {
      id: 'mdl.reportlist.centerReport.rainstormreport',
      text: '暴雨情况统计表',
      name: '2-7',
      path: '/home/tab-summary/rainstorm-statistical',
      icon: 'android-hand',
      show: false
    }, {
      id: 'mdl.reportlist.centerReport.datainputlog',
      text: '数据上报日志',
      name: '2-8',
      path: '/home/tab-summary/data-report-log',
      icon: 'arrow-swap'
    },
    {
      id: 'mdl.reportlist.centerReport.tempstatistic',
      text: '临时报表统计',
      name: '2-9',
      path: '/home/tab-summary/temporary-report-statistical',
      icon: 'arrow-swap'
    }
    ]
  }, {
    id: 'mdl.reportlist.afterReport',
    text: '事后报表统计',
    name: '3',
    icon: 'android-hand',
    show: false,
    children: [{
      id: 'mdl.reportlist.afterReport.transfer-statistical',
      text: '转移人员统计',
      name: '3-1',
      path: '/home/tab-summary/transfer-statistical',
      icon: 'arrow-swap',
      show: false
    }, {
      id: 'mdl.reportlist.afterReport.affected-statistical',
      text: '受灾情况统计',
      name: '3-2',
      path: '/home/tab-summary/affected-statistical',
      icon: 'document-text',
      show: false
    }, {
      id: 'mdl.reportlist.afterReport.defense-statistical',
      text: '防御工作情况统计',
      name: '3-3',
      path: '/home/tab-summary/defense-statistical',
      icon: 'android-hand',
      show: false
    }, {
      id: 'mdl.reportlist.afterReport.guoxunrpt',
      text: '国汛统表',
      name: '3-4',
      path: '/home/tab-summary/national-flood',
      icon: 'android-hand',
      show: false
    }, {
      text: '应急响应总结统计',
      name: '3-5',
      path: '/home/tab-summary/summary',
      icon: 'android-hand',
      show: false
    }]
  }, {
    text: '报表汇总',
    name: '4',
    icon: 'android-hand',
    show: false,
    children: [{
      text: '调度指令完成情况统计',
      name: '4-1',
      path: '/home/tab-summary/message-statistical',
      icon: 'arrow-swap',
      show: false
    }, {
      text: '预警信息发布情况',
      name: '4-2',
      path: '/home/tab-summary/warning-statistical',
      icon: 'document-text',
      show: false
    }, {
      text: '气象数据查询与统计',
      name: '4-3',
      path: '/home/tab-summary/weather-statistical',
      icon: 'android-hand',
      show: false
    }, {
      text: '气象产品查询',
      name: '4-4',
      path: '/home/tab-summary/product-statistical',
      icon: 'android-hand',
      show: false
    }, {
      text: '水情查询与统计',
      name: '4-5',
      path: '/home/tab-summary/water-statistical',
      icon: 'android-hand',
      show: false
    }, {
      text: '工情查询与统计',
      name: '4-6',
      path: '/home/tab-summary/work-statistical',
      icon: 'android-hand',
      show: false
    }, {
      text: '环境监测查询',
      name: '4-7',
      path: '/home/tab-summary/environment-statistical',
      icon: 'android-hand',
      show: false
    }, {
      text: '预测数据查询',
      name: '4-8',
      path: '/home/tab-summary/predict-statistical',
      icon: 'android-hand',
      show: false
    }, {
      text: '三防信息查询',
      name: '4-9',
      path: '/home/tab-summary/info-statistical',
      icon: 'android-hand',
      show: false
    }]
  }, {
    text: '报告汇报系统',
    name: '5',
    icon: 'clipboard',
    show: false,
    children: [{
      text: '汇报报告模板',
      name: '5-1',
      path: '/home/tab-summary/report-template',
      icon: 'clipboard',
      show: false
    }, {
      text: '水雨情信息',
      name: '5-2',
      path: '/home/tab-summary/report-weather',
      icon: 'cloud',
      show: false
    }, {
      text: '洪水内涝报告',
      name: '5-3',
      path: '/home/tab-summary/report-flood',
      icon: 'arrow-graph-up-left',
      show: false
    }, {
      text: '台风暴潮报告',
      name: '5-4',
      path: '/home/tab-summary/report-typhoon',
      icon: 'arrow-graph-down-left',
      show: false
    }, {
      text: '历史报告',
      name: '5-5',
      path: '/home/tab-summary/report-history',
      icon: 'stats-bars',
      show: false
    }]
  }
]
// 报表汇总下面的MenuItem
export const baobiaomentbotMenu = [
  {
    id: 'mdl.reportlist.report.rptlog',
    text: '报表日志',
    name: '6',
    icon: 'arrow-swap',
    path: '/home/tab-summary/rptlog'
  }
]

// 系统管理 上面的MenuItem
export const systemManagementTopMenu = [
  {
    id: 'mdl.systemmanage.usermanage',
    text: '用户管理',
    name: '1',
    link: 'usermanage',
    icon: 'iconfont icon-yonghuguanli'
    // path: '/home/systemManagement/usermanage',
  }, {
    id: 'mdl.systemmanage.rolemanage',
    text: '角色管理',
    name: '2',
    link: 'rolemanage',
    icon: 'iconfont icon-jiaoseguanli'
    // path: '/home/systemManagement/rolemanage',
  }, {
    id: 'mdl.systemmanage.mokuaimanage',
    text: '模块管理',
    name: '3',
    link: 'mokuaiguanli',
    icon: 'iconfont icon-mokuaiguanli'
    // path: '/home/systemManagement/mokuaiguanli',
  }, {
    id: 'mdl.systemmanage.bumenmanage',
    text: '部门列表',
    name: '4',
    link: 'bumenlist',
    icon: 'iconfont icon-bumen'
    // path: '/home/systemManagement/bumenlist',
  }, {
    id: 'mdl.systemmanage.xitongmanage',
    text: '系统日志',
    name: '5',
    link: 'rizhi',
    icon: 'iconfont icon-yingjiyuan'
    // path: '/home/systemManagement/rizhi',
  }
]

// 系统管理 下面的MenuItem
export const systemManagementBotMenu = [
  {
    text: '门户后台管理',
    name: '6',
    icon: 'iconfont icon-ai-briefcase',
    show: false,
    // show: false,
    children: [{
      text: '内容发布',
      name: '6-1',
      show: false,
      link: 'release'
    }, {
      text: '内容编辑',
      name: '6-2',
      show: false,
      link: 'editage'
    }, {
      text: '公众留言审批',
      name: '6-3',
      show: false,
      link: 'shenpi'
    }]
  }, {
    text: '微信公众服务',
    name: '7',
    show: false,
    icon: 'iconfont icon-ai-briefcase',
    // show: false,
    children: [{
      text: '三防快报管理',
      name: '7-1',
      show: false,
      link: 'latter'
    }, {
      text: '现场上报管理',
      name: '7-2',
      show: false,
      link: 'sceneReported'
    }, {
      text: '文章管理',
      name: '7-3',
      show: false,
      link: 'article'
    }, {
      text: '文件管理',
      name: '7-4',
      show: false,
      link: 'file'
    }, {
      text: '模板管理',
      name: '7-5',
      show: false,
      link: 'template'
    }]
  }
]

// 移动管理 上面的MenuItem
export const moveManagementTopMenu = [
  {
    id: 'mdl.moveManagement.alerts-management',
    text: '快讯管理',
    name: '1',
    path: '/home/moveManagement/alerts-management',
    icon: 'iconfont icon-tongxunlu'
  }
]

// 移动管理 下面的MenuItem
export const moveManagementBotMenu = [
  {
    id: 'mdl.moveManagement.patrolManagement',
    text: '巡查管理',
    name: '2',
    icon: 'iconfont icon-tongxunlu',
    children: [
      {
        id: 'mdl.moveManagement.patrolManagement.patrol-plan',
        text: '巡查任务安排',
        name: '2-1',
        path: '/home/moveManagement/patrol-plan'
      }, {
        id: 'mdl.moveManagement.patrolManagement.patrol-record',
        text: '巡查上报数据',
        name: '2-2',
        path: '/home/moveManagement/patrol-record'
      }
    ]
  }
]

// 应急相应
export const normalManagementBotMenu = [
  {
    id: 'mdl.threeCommand.responseapply',
    text: '应急响应申请',
    name: '1',
    link: 'responseapply',
    icon: 'iconfont icon-yingjiyuan'
  }, {
    id: 'mdl.threeCommand.responseapplist',
    text: '应急响应申请列表',
    name: '2',
    link: 'responseapplist',
    icon: 'iconfont icon-yingjiyuan'
  }, {
    id: 'mdl.threeCommand.responseappapproval',
    text: '应急响应审批',
    name: '3',
    link: 'responseappapproval',
    icon: 'iconfont icon-yingjiyuan'
  }
]

// routes依赖 id
export const routesRelyonId = [
  {
    id: 'mdl.firstpage',
    paths: [
      '/home/default',
      '/notice-details_custom_path'
    ]
  }, {
    id: 'mdl.threeCommand',
    paths: ['/home/threeCommand']
  }, {
    id: 'mdl.threeCommand.responseapply',
    paths: ['/home/threeCommand/responseapply']
  }, {
    id: 'mdl.threeCommand.responseapplist',
    paths: ['/home/threeCommand/responseapplist']
  }, {
    id: 'mdl.threeCommand.responseappapproval',
    paths: ['/home/threeCommand/responseappapproval']
  }, {
    id: 'mdl.sanfanapplication',
    paths: ['/home/threeBusiness']
  }, {
    id: 'mdl.sanfanapplication.emergenceplan',
    paths: [
      '/home/threeBusiness/threeBusinessDefault',
      '/home/threeBusiness/erp_default',
      '/home/threeBusiness/er_plan/general',
      '/home/threeBusiness/er_plan/organization',
      '/home/threeBusiness/er_plan/warning',
      '/home/threeBusiness/er_plan/security',
      '/home/threeBusiness/er_plan/er_action',
      '/home/threeBusiness/er_plan/aftermath',
      '/home/threeBusiness/er_plan/training',
      '/home/threeBusiness/er_plan/dataTable',
      '/home/threeBusiness/er_plan/taskActive',
      '/home/threeBusiness/er_plan/eventManagement'
    ]
  }, {
    id: 'mdl.sanfanapplication.emergenceplan.communityplan',
    paths: [
      '/home/threeBusiness/threeBusinessCommunity',
      '/home/threeBusiness/er_plan/general',
      '/home/threeBusiness/er_plan/organization',
      '/home/threeBusiness/er_plan/warning',
      '/home/threeBusiness/er_plan/security',
      '/home/threeBusiness/er_plan/er_action',
      '/home/threeBusiness/er_plan/transfer',
      '/home/threeBusiness/er_plan/dataTable',
      '/home/threeBusiness/er_plan/taskActive',
      '/home/threeBusiness/er_plan/eventManagement'
    ]
  }, {
    id: 'mdl.sanfanapplication.emergenceplan.specialplan',
    paths: [
      '/home/threeBusiness/threeBusinessTopic',
      '/home/threeBusiness/er_plan/general',
      '/home/threeBusiness/er_plan/organization',
      '/home/threeBusiness/er_plan/warning',
      '/home/threeBusiness/er_plan/security',
      '/home/threeBusiness/er_plan/er_action',
      '/home/threeBusiness/er_plan/transfer',
      '/home/threeBusiness/er_plan/dataTable',
      '/home/threeBusiness/er_plan/taskActive',
      '/home/threeBusiness/er_plan/eventManagement'
    ]
  }, {
    id: 'mdl.sanfanapplication.emergenceplan.planapproval',
    paths: [
      '/home/threeBusiness/threeBusinessApproval',
      '/home/threeBusiness/er_plan/general',
      '/home/threeBusiness/er_plan/organization',
      '/home/threeBusiness/er_plan/warning',
      '/home/threeBusiness/er_plan/security',
      '/home/threeBusiness/er_plan/er_action',
      '/home/threeBusiness/er_plan/transfer',
      '/home/threeBusiness/er_plan/dataTable',
      '/home/threeBusiness/er_plan/taskActive',
      '/home/threeBusiness/er_plan/eventManagement'
    ]
  }, {
    id: 'mdl.sanfanapplication.emergenceplan.responselevel',
    paths: ['/home/threeBusiness/erLevel']
  }, {
    id: 'mdl.sanfanapplication.response.taskmanage',
    paths: ['/home/threeBusiness/magTask']
  }, {
    id: 'mdl.sanfanapplication.response.taskpreplan',
    paths: ['/home/threeBusiness/psTask']
  }, {
    id: 'mdl.sanfanapplication.response.responsemanage',
    paths: ['/home/threeBusiness/erManagement']
  }, {
    id: 'mdl.sanfanapplication.response.ondutykanban',
    paths: ['/home/threeBusiness/erCard']
  }, {
    id: 'mdl.sanfanapplication.response.participants',
    paths: ['/home/threeBusiness/participants']
  }, {
    id: 'mdl.sanfanapplication.response.daily-record',
    paths: ['/home/threeBusiness/daily-record']
  }, {
    id: 'mdl.departmentmanage',
    paths: ['/home/depManagement']
  }, {
    id: 'mdl.departmentmanage.sysdef',
    paths: ['/home/depManagement/definition']
  }, {
    id: 'mdl.departmentmanage.instructions',
    paths: ['/home/depManagement/Library']
  }, {
    id: 'mdl.departmentmanage.staff',
    paths: ['/home/depManagement/address']
  }, {
    id: 'mdl.departmentmanage.datamaintenance.reservoir',
    paths: [
      '/home/depManagement/shuiku',
      '/home/depManagement/shuiku/shuikuweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.pool',
    paths: [
      '/home/depManagement/hillpool',
      '/home/depManagement/hillpool/shantangweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.dikedangerous',
    paths: [
      '/home/depManagement/derstam',
      '/home/depManagement/derstam/derstamadd'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.dike',
    paths: [
      '/home/depManagement/tiwei',
      '/home/depManagement/tiwei/tiweiweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.rivermiddle',
    paths: [
      '/home/depManagement/jiangxin',
      '/home/depManagement/jiangxin/jiangxinweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.advertisement',
    paths: [
      '/home/depManagement/waitandi',
      '/home/depManagement/waitandi/waitandiweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.dikeconstruction',
    paths: [
      '/home/depManagement/tishan',
      '/home/depManagement/tishan/tishanweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.dikepipe',
    paths: [
      '/home/depManagement/ctgd',
      '/home/depManagement/ctgd/chuantiguandaoweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.dock',
    paths: [
      '/home/depManagement/matou',
      '/home/depManagement/matou/matouweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.bridge',
    paths: [
      '/home/depManagement/qiaoliang',
      '/home/depManagement/qiaoliang/qiaoliangweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.scenerysport',
    paths: [
      '/home/depManagement/jingdian',
      '/home/depManagement/jingdian/jingdianweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.threeshed',
    paths: [
      '/home/depManagement/sanpeng',
      '/home/depManagement/sanpeng/sanpengweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.powerfacility',
    paths: [
      '/home/depManagement/dl',
      '/home/depManagement/dl/diweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.buildingsite',
    paths: [
      '/home/depManagement/gongdi',
      '/home/depManagement/gongdi/gongdiweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.hazardouschemicals',
    paths: [
      '/home/depManagement/weixians',
      '/home/depManagement/weixians/weixianweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.communicationsequipment',
    paths: [
      '/home/depManagement/zhongysb',
      '/home/depManagement/zhongysb/zhongysbweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datasubmit.monthsubmit',
    paths: [
      '/home/depManagement/dataReport'
    ]
  }, {
    id: 'mdl.departmentmanage.datasubmit.afterreportsubmit',
    paths: [
      '/home/depManagement/dataAfterReport'
    ]
  }, {
    id: 'mdl.departmentmanage.datasubmit.datatemplate',
    paths: [
      '/home/depManagement/deplist',
      '/home/depManagement/deplist/addpage'
    ]
  }, {
    id: 'mdl.departmentmanage.datasubmit.dataquery',
    paths: [
      '/home/depManagement/Listsean',
      '/home/depManagement/Listsean/seans'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.dangerousbuilding',
    paths: [
      '/home/depManagement/weifang',
      '/home/depManagement/weifang/weifangweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.materialwarehouse',
    paths: [
      '/home/depManagement/cangku',
      '/home/depManagement/cangku/cangkuweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.weatherstation',
    paths: [
      '/home/depManagement/qixiang',
      '/home/depManagement/qixiang/qixiangweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.waterlogging',
    paths: [
      '/home/depManagement/neilao',
      '/home/depManagement/neilao/neilaoweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.geologichazard',
    paths: [
      '/home/depManagement/dizhizaihai',
      '/home/depManagement/dizhizaihai/dizhizaihaiweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.refuge',
    paths: [
      '/home/depManagement/changsuo',
      '/home/depManagement/changsuo/changsuoweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.sluicegate',
    paths: [
      '/home/depManagement/hanza',
      '/home/depManagement/hanza/hanzaweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.pumpstation',
    paths: [
      '/home/depManagement/benzhan',
      '/home/depManagement/benzhan/benzhanweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.fishingport',
    paths: [
      '/home/depManagement/fish',
      '/home/depManagement/fish/fishweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.school',
    paths: [
      '/home/depManagement/school',
      '/home/depManagement/school/schoolweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.rivernetwork',
    paths: [
      '/home/depManagement/shuiwang',
      '/home/depManagement/shuiwang/shuiwangweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.shoppingdata',
    paths: [
      '/home/depManagement/shangchang',
      '/home/depManagement/shangchang/shangchangweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.passengerstation',
    paths: [
      '/home/depManagement/keyunzhan',
      '/home/depManagement/keyunzhan/keyunzhanweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.hospital',
    paths: [
      '/home/depManagement/yiyuan',
      '/home/depManagement/yiyuan/yiyuanweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.bank',
    paths: [
      '/home/depManagement/yinhan',
      '/home/depManagement/yinhan/yinhanweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.rescue',
    paths: [
      '/home/depManagement/jiuyuan',
      '/home/depManagement/jiuyuan/jiuyuanweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.watersupplyplant',
    paths: [
      '/home/depManagement/gongshuishebei',
      '/home/depManagement/gongshuishebei/gongshuishebeiweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.sewageplant',
    paths: [
      '/home/depManagement/wushuichang',
      '/home/depManagement/wushuichang/wushuichangweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.waterworks',
    paths: [
      '/home/depManagement/zilaishui',
      '/home/depManagement/zilaishui/zilaishuiweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.drainpipe',
    paths: [
      '/home/depManagement/paishuiguanwang',
      '/home/depManagement/paishuiguanwang/paishuiguanwangweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.supplypipe',
    paths: [
      '/home/depManagement/gongshuiguanwang',
      '/home/depManagement/gongshuiguanwang/gongshuiguanwangweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.sinkingtunnel',
    paths: [
      '/home/depManagement/xiachensuidao',
      '/home/depManagement/xiachensuidao/xiachensuidaoweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.hydrometric',
    paths: [
      '/home/depManagement/shuiwen',
      '/home/depManagement/shuiwen/shuiwenweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.constructionbuilding',
    paths: [
      '/home/depManagement/goujian',
      '/home/depManagement/goujian/goujianweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.outfall',
    paths: [
      '/home/depManagement/paishuikou',
      '/home/depManagement/paishuikou/paishuikouweihu'
    ]
  }, {
    id: 'mdl.departmentmanage.datamaintenance.warningmanage',
    paths: [
      '/home/depManagement/jingjie'
    ]
  }, {
    id: 'mdl.departmentmanage.datasubmit.temporarytemplet',
    paths: [
      '/home/depManagement/temporary',
      '/home/depManagement/deplist/temporarypage'
    ]
  }, {
    id: 'mdl.OAfunction',
    paths: ['/home/dailyOffice']
  }, {
    id: 'mdl.OAfunction.addressBook',
    paths: ['/home/dailyOffice/addressBook']
  }, {
    id: 'mdl.OAfunction.notice',
    paths: [
      '/home/dailyOffice/notice',
      '/notice-details_custom_path'
    ]
  }, {
    id: 'mdl.OAfunction.dataManagement',
    paths: ['/home/dailyOffice/dataManagement']
  }, {
    id: 'mdl.OAfunction.noteManagement',
    paths: ['/home/dailyOffice/noteManagement']
  }, {
    id: 'mdl.OAfunction.addressee',
    paths: ['/home/dailyOffice/addressee']
  }, {
    id: 'mdl.OAfunction.thematicInformation',
    paths: ['/home/dailyOffice/thematicInformation']
  }, {
    id: 'mdl.OAfunction.operatingmaterial',
    paths: ['/home/dailyOffice/systemApplicationData']
  }, {
    id: 'mdl.reportlist',
    paths: ['/home/tab-summary']
  }, {
    id: 'mdl.departmentmanage.datasubmit.monthsubmit',
    paths: ['/home/tab-summary/emergency-measure']
  }, {
    id: 'mdl.reportlist.centerReport.monthaffectedpeoplerpt',
    paths: ['/home/tab-summary/emergency-person']
  }, {
    id: 'mdl.reportlist.centerReport.responsemeasure',
    paths: ['/home/tab-summary/emergency-measure']
  }, {
    id: 'mdl.reportlist.centerReport.typhoonreport',
    paths: [
      '/home/tab-summary/typhoon-statistical'
    ]
  }, {
    id: 'mdl.reportlist.centerReport.floodtyphoontransferreport',
    paths: [
      '/home/tab-summary/typhoonFlood-statistical'
    ]
  }, {
    id: 'mdl.reportlist.centerReport.rainstormtyphoonreport',
    paths: [
      '/home/tab-summary/rainDefense-statistical'
    ]
  }, {
    id: 'mdl.reportlist.centerReport.disasterdamagereport',
    paths: [
      '/home/tab-summary/disaster-statistical'
    ]
  }, {
    id: 'mdl.reportlist.centerReport.disasterreliefreport',
    paths: [
      '/home/tab-summary/disasterRelief-statistical'
    ]
  }, {
    id: 'mdl.reportlist.centerReport.rainstormreport',
    paths: ['/home/tab-summary/rainstorm-statistical']
  }, {
    id: 'mdl.reportlist.centerReport.datainputlog',
    paths: ['/home/tab-summary/data-report-log']
  }, {
    id: 'mdl.reportlist.centerReport.tempstatistic',
    paths: ['/home/tab-summary/temporary-report-statistical']
  },
  {
    id: 'mdl.reportlist.afterReport.transfer-statistical',
    paths: ['/home/tab-summary/transfer-statistical']
  }, {
    id: 'mdl.reportlist.afterReport.affected-statistical',
    paths: ['/home/tab-summary/affected-statistical']
  }, {
    id: 'mdl.reportlist.afterReport.defense-statistical',
    paths: [
      '/home/tab-summary/defense-statistical'
    ]
  }, {
    id: 'mdl.reportlist.afterReport.guoxunrpt',
    paths: [
      '/home/tab-summary/national-flood'
    ]
  }, {
    id: 'mdl.reportlist.report.rptlog',
    paths: ['/home/tab-summary/rptlog']
  }, {
    id: 'mdl.systemmanage',
    paths: ['/home/systemManagement']
  }, {
    id: 'mdl.systemmanage.usermanage',
    paths: ['/home/systemManagement/usermanage']
  }, {
    id: 'mdl.systemmanage.rolemanage',
    paths: ['/home/systemManagement/rolemanage']
  }, {
    id: 'mdl.systemmanage.mokuaimanage',
    paths: ['/home/systemManagement/mokuaiguanli']
  }, {
    id: 'mdl.systemmanage.bumenmanage',
    paths: ['/home/systemManagement/bumenlist']
  }, {
    id: 'mdl.systemmanage.xitongmanage',
    paths: ['/home/systemManagement/rizhi']
  }, {
    id: 'mdl.moveManagement',
    paths: ['/home/moveManagement']
  }, {
    id: 'mdl.moveManagement.alerts-management',
    paths: ['/home/moveManagement/alerts-management']
  }, {
    id: 'mdl.moveManagement.patrolManagement.patrol-plan',
    paths: ['/home/moveManagement/patrol-plan']
  }, {
    id: 'mdl.moveManagement.patrolManagement.patrol-record',
    paths: ['/home/moveManagement/patrol-record']
  }
]

// 台风路径 强度 图例
export const typhoonStrongLegend = [{
  img: `${Static}img/threeCommand/typhoonCenterGreen.png`,
  name: '热带低压(TD)',
  imgPosition: '0 0',
  color: '#00ff03'
}, {
  img: `${Static}img/threeCommand/typhoonCenterBlue.png`,
  name: '热带风暴(TS)',
  imgPosition: '-35px 0',
  color: '#0062fe'
}, {
  img: `${Static}img/threeCommand/typhoonCenterYellow.png`,
  name: '强热带风暴(STS)',
  imgPosition: '-70px 0',
  color: '#fdfa00'
}, {
  img: `${Static}img/threeCommand/typhoonCenterOrange.png`,
  name: '台风(TY)',
  imgPosition: '-105px 0',
  color: '#fdac03'
}, {
  img: `${Static}img/threeCommand/typhoonCenterPink.png`,
  name: '强台风(STY)',
  imgPosition: '-140px 0',
  color: '#f072f6'
}, {
  img: `${Static}img/threeCommand/typhoonCenterRed.png`,
  name: '超强台风(Super TY)',
  imgPosition: '-175px 0',
  color: '#fd0002'
}]

// 台风路径 预测台 图例
export const typhoonForecastLegend = [{
  color: 'rgb(255, 64, 80)',
  pointColor: 'rgb(253, 172, 3)',
  name: '中国'
}, {
  color: 'rgb(67, 255, 75)',
  pointColor: 'rgb(238, 238, 238)',
  name: '日本'
}, {
  color: 'rgb(64, 221, 255)',
  pointColor: 'rgb(253, 250, 0)',
  name: '美国'
}, {
  color: 'rgb(102, 153, 153)',
  pointColor: 'rgb(255, 64, 80)',
  name: '韩国'
}, {
  color: 'rgb(24, 92, 186)',
  pointColor: 'rgb(240, 114, 1)',
  name: '欧洲'
}, {
  color: 'rgb(255, 102, 255)',
  pointColor: 'rgb(7, 81, 10)',
  name: '中国香港'
}, {
  color: 'rgb(255, 160, 64)',
  pointColor: 'rgb(0, 98, 254)',
  name: '中国台湾'
}]

// 应急响应 级别和类型
export const responseModule = [
  [{
    'info': '防汛I级',
    'isChecked': false,
    'group': 1,
    'level': 'I',
    'name': '防汛'
  }, {
    'info': '防汛II级',
    'isChecked': false,
    'group': 1,
    'level': 'II',
    'name': '防汛'
  }, {
    'info': '防汛III级',
    'isChecked': false,
    'group': 1,
    'level': 'III',
    'name': '防汛'
  }, {
    'info': '防汛IV级',
    'isChecked': false,
    'group': 1,
    'level': 'IV',
    'name': '防汛'
  }],
  [{
    'info': '防旱I级',
    'isChecked': false,
    'group': 2,
    'level': 'I',
    'name': '防旱'
  }, {
    'info': '防旱II级',
    'isChecked': false,
    'group': 2,
    'level': 'II',
    'name': '防旱'
  }, {
    'info': '防旱III级',
    'isChecked': false,
    'group': 2,
    'level': 'III',
    'name': '防旱'
  }, {
    'info': '防旱IV级',
    'isChecked': false,
    'group': 2,
    'level': 'IV',
    'name': '防旱'
  }],
  [{
    'info': '防风I级',
    'isChecked': false,
    'group': 3,
    'level': 'I',
    'name': '防风'
  }, {
    'info': '防风II级',
    'isChecked': false,
    'group': 3,
    'level': 'II',
    'name': '防风'
  }, {
    'info': '防风III级',
    'isChecked': false,
    'group': 3,
    'level': 'III',
    'name': '防风'
  }, {
    'info': '防风IV级',
    'isChecked': false,
    'group': 3,
    'level': 'IV',
    'name': '防风'
  }],
  [{
    'info': '防暴雨I级',
    'isChecked': false,
    'group': 4,
    'level': 'I',
    'name': '防暴雨'

  }, {
    'info': '防暴雨II级',
    'isChecked': false,
    'group': 4,
    'level': 'II',
    'name': '防暴雨'
  }, {
    'info': '防暴雨III级',
    'isChecked': false,
    'group': 4,
    'level': 'III',
    'name': '防暴雨'
  }, {
    'info': '防暴雨IV级',
    'isChecked': false,
    'group': 4,
    'level': 'IV',
    'name': '防暴雨'
  }]
]

export const commandChoseMapList = [{
  name: '实时预警',
  layer: 'weatherLayer',
  img: `${Static}img/mapIcon/radar.png`,
  selected: false
}, {
  name: '台风路径',
  layer: 'typhoonLayer',
  img: `${Static}img/mapIcon/typhoon.png`,
  selected: false
}, {
  name: '实时云图',
  layer: 'cloudLayer',
  img: `${Static}img/mapIcon/cloud.png`,
  selected: false
}, {
  name: '实时雷达',
  layer: 'radarLayer',
  img: `${Static}img/mapIcon/radar.png`,
  selected: false
}, {
  name: '避难所',
  layer: 'refugeLayer',
  img: `${Static}img/mapIcon/refuge.png`,
  selected: false
}, {
  name: '物资仓库',
  layer: 'emergencyLayer',
  img: `${Static}img/mapIcon/emergency.png`,
  selected: false
}, {
  name: '抢险队',
  layer: 'emergencySquadLayer',
  img: `${Static}img/mapIcon/emergencySquad.png`,
  selected: false
}, {
  name: '救援队',
  layer: 'rescueTeamLayer',
  img: `${Static}img/mapIcon/rescueTeam.png`,
  selected: false
}, {
  name: '重点人员',
  layer: 'liabilityPersonLayer',
  img: `${Static}img/mapIcon/liabilityPerson.png`,
  selected: false
}, {
  name: '三防人员',
  layer: 'defenseExpertLayer',
  img: `${Static}img/mapIcon/defenseExpert.png`,
  selected: false
}, {
  name: '群众分布',
  layer: 'massHeatLayer',
  img: `${Static}img/mapIcon/massHeat.png`,
  selected: false
}]

export function commandLayerNeedKeys (layerName) {
  let arr
  let localArr
  let arrs = []
  let obj = {}
  let title = ''

  switch (layerName) {
    case 'refugeLayer':
      arr = [
        'name|名称',
        'address|地址',
        'capacity|可容纳人数',
        'telephone|联系电话'
      ]
      localArr = ['longitude', 'latitude']
      title = '避难所'
      break
    case 'emergencyLayer':
      arr = [
        'name|名称',
        'address|地址',
        'institution|物资库存',
        'manager|管理员',
        'telephone|联系电话'
      ]
      localArr = ['lng', 'lat']
      title = '物资仓库'
      break
    case 'emergencySquadLayer':
      arr = [
        'name|名称',
        'address|地址',
        'people|负责人',
        'phone|联系电话'
      ]
      localArr = ['lng', 'lat']
      title = '抢险队'
      break
    case 'rescueTeamLayer':
      arr = [
        'name|名称',
        'address|地址',
        'people|负责人',
        'phone|联系电话'
      ]
      localArr = ['lng', 'lat']
      title = '救援队'
      break
    case 'liabilityPersonLayer':
      arr = [
        'name|名称',
        'address|地址',
        'phone|联系电话'
      ]
      localArr = ['lng', 'lat']
      title = '重点人员'
      break
    case 'defenseExpertLayer':
      arr = [
        'name|名称',
        'address|地址',
        'phone|联系电话'
      ]
      localArr = ['lng', 'lat']
      title = '三防专家'
      break
  }

  arr.map(item => {
    let content = item.split('|')
    let key = content[0]
    let val = content[1]
    arrs.push({
      key,
      val
    })
  })

  obj['info'] = arrs
  obj['lng'] = localArr[0]
  obj['lat'] = localArr[1]
  obj['title'] = title

  return obj
}

export const weatherIcon = [
  {
    'ID': 0,
    'WEATHERDESC': '晴',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'qing.png',
    'RN': 1
  }, {
    'ID': 1,
    'WEATHERDESC': '多云',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'duoyun.png',
    'RN': 2
  }, {
    'ID': 2,
    'WEATHERDESC': '阴',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'yin.png',
    'RN': 3
  }, {
    'ID': 3,
    'WEATHERDESC': '阵雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'zhenyu.png',
    'RN': 4
  }, {
    'ID': 4,
    'WEATHERDESC': '雷阵雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'leizhenyu.png',
    'RN': 5
  }, {
    'ID': 5,
    'WEATHERDESC': '雷阵雨并伴有冰雹',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'lzybinbao.png',
    'RN': 6
  }, {
    'ID': 6,
    'WEATHERDESC': '雨夹雪',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'yuxue.png',
    'RN': 7
  }, {
    'ID': 7,
    'WEATHERDESC': '小雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'xiaoyu.png',
    'RN': 8
  }, {
    'ID': 8,
    'WEATHERDESC': '中雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'zhongyu.png',
    'RN': 9
  }, {
    'ID': 9,
    'WEATHERDESC': '大雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'dayu.png',
    'RN': 10
  }, {
    'ID': 10,
    'WEATHERDESC': '暴雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'baoyu.png',
    'RN': 11
  }, {
    'ID': 11,
    'WEATHERDESC': '大暴雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'dabaoyu.png',
    'RN': 12
  }, {
    'ID': 12,
    'WEATHERDESC': '特大暴雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'tedabaoyu.png',
    'RN': 13
  }, {
    'ID': 13,
    'WEATHERDESC': '阵雪',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'zhenxue.png',
    'RN': 14
  }, {
    'ID': 14,
    'WEATHERDESC': '小雪',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'xiaoxue.png',
    'RN': 15
  }, {
    'ID': 15,
    'WEATHERDESC': '中雪',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'zhongxue.png',
    'RN': 16
  }, {
    'ID': 16,
    'WEATHERDESC': '大雪',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'daxue.png',
    'RN': 17
  }, {
    'ID': 17,
    'WEATHERDESC': '暴雪',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'baoxue.png',
    'RN': 18
  }, {
    'ID': 18,
    'WEATHERDESC': '雾',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'wu.png',
    'RN': 19
  }, {
    'ID': 19,
    'WEATHERDESC': '冻雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'dongyu.png',
    'RN': 20
  }, {
    'ID': 20,
    'WEATHERDESC': '沙尘暴',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'shachenbao.png',
    'RN': 21
  }, {
    'ID': 21,
    'WEATHERDESC': '小到中雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'xiaozhongyu.png',
    'RN': 22
  }, {
    'ID': 22,
    'WEATHERDESC': '中到大雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'zhongdayu.png',
    'RN': 23
  }, {
    'ID': 23,
    'WEATHERDESC': '大到暴雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'datobaoyu.png',
    'RN': 24
  }, {
    'ID': 24,
    'WEATHERDESC': '暴雨到大暴雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'baodabaoyu.png',
    'RN': 25
  }, {
    'ID': 25,
    'WEATHERDESC': '大暴雨到特大暴雨',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'datedayu.png',
    'RN': 26
  }, {
    'ID': 26,
    'WEATHERDESC': '小到中雪',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'xiaozhengxue.png',
    'RN': 27
  }, {
    'ID': 27,
    'WEATHERDESC': '中到大雪',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'zhongdaxue.png',
    'RN': 28
  }, {
    'ID': 28,
    'WEATHERDESC': '大到暴雪',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'datobaoxue.png',
    'RN': 29
  }, {
    'ID': 29,
    'WEATHERDESC': '浮尘',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'fuchen.png',
    'RN': 30
  }, {
    'ID': 30,
    'WEATHERDESC': '扬沙',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'yangsha.png',
    'RN': 31
  }, {
    'ID': 31,
    'WEATHERDESC': '强沙尘暴',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'qiangshachen.png',
    'RN': 32
  }, {
    'ID': 53,
    'WEATHERDESC': '霾',
    'IMGPATH': 'weatherIcons',
    'IMGNAME': 'mai.png',
    'RN': 33
  }
]

// 通讯录管理
export const addressBookModule = [
  [{
    label: '姓名',
    key: 'name',
    colspan: '1',
    props: 'name'
  }, {
    label: '所属部门',
    type: 'autoSelect',
    key: 'department_name',
    props: 'department_name',
    filterable: true,
    remote: true,
    colspan: '1',
    notFoundText: '无匹配数据',
    selectLoading: false,
    data: []
  }, {
    label: '部门级别',
    key: 'department_level',
    props: 'department_level',
    colspan: '1',
    readonly: true
  }],
  [{
    label: '手机号码',
    key: 'telephoe',
    props: 'telephoe',
    colspan: '1'
  }, {
    label: '办公室电话',
    key: 'office_phone',
    props: 'office_phone',
    colspan: '1'
  }, {
    label: '家庭电话',
    key: 'home_phone',
    props: 'home_phone',
    colspan: '1'
  }],
  [{
    label: '职责',
    // type:'text',
    type: 'select',
    key: 'duty',
    props: 'duty',
    colspan: '1',
    data: [{
      label: '三防工作人员',
      value: '三防工作人员'
    }, {
      label: '三防责任人',
      value: '三防责任人'
    }]
  }, {
    label: '职责描述',
    type: 'textarea',
    key: 'duty_desc',
    props: 'duty_desc',
    colspan: '5'
  }]
]

export const waterModule = [
  ['坪石', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['4', '乐昌', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['11.9', '7.9', '曲江', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['27.1', '23.1', '15.2', '英德', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['30.2', '26.2', '18.3', '3.1', '连江口', ' ', ' ', ' ', ' ', ' ', ' '],
  ['46', '42', '34.1', '16.9', '15.8', '清远', ' ', ' ', ' ', ' ', ' '],
  ['54.3', '50.6', '42.7', '27.5', '24.4', '8.6', '石角', ' ', ' ', ' ', ' '],
  ['62.1', '58.1', '50.2', '35', '31.9', '16.1', '7.5', '芦苞', ' ', ' ', ' '],
  ['69.1', '65.1', '57.2', '42', '38.9', '23.1', '14.5', '7', '河口', ' ', ' '],
  ['75.6', '71.6', '63.7', '48.5', '45.4', '29.6', '21', '13.5', '6.5', '子洞', ' '],
  ['78.1', '74.1', '66.2', '51', '47.4', '32.1', '23.5', '16', '9', '2.5', '沙口']
]

// 气象数据查询与统计
export const weatherModule = [
  [{
    label: '站点名称',
    key: 'stn_name',
    colspan: '1'
  }, {
    label: '站点编号',
    key: 'stn_no',
    colspan: '1'
  }, {
    label: '站点类型',
    key: 'stn_type',
    colspan: '1'
  }],
  [{
    label: '站点地址',
    key: 'address',
    colspan: '1'
  }, {
    label: '一小时内最高温度',
    key: 'temp_max',
    colspan: '1'
  }, {
    label: '一小时内最低温度',
    key: 'temp_min',
    colspan: '1'
  }],
  [{
    label: '监测时间',
    key: 'data_time',
    colspan: '1'
  }, {
    label: '最高温度出现时间',
    key: 'tmaxtime',
    colspan: '1'
  }, {
    label: '最低温度出现时间',
    key: 'tmintime',
    colspan: '1'
  }],
  [{
    label: '数据来源',
    key: 'data_source',
    colspan: '1'
  }, {
    label: '数据上报时间',
    key: 'data_time',
    colspan: '1'
  }, {
    label: '时间间隔',
    key: 'data_interval',
    colspan: '1'
  }]
]

// 水情查询与统计
export const waterSearchModule = [
  [{
    label: '站点名称',
    key: 'stn_name',
    colspan: '1'
  }, {
    label: '站点编号',
    key: 'stn_no',
    colspan: '1'
  }, {
    label: '站点类型',
    key: 'stn_type',
    colspan: '1'
  }],
  [{
    label: '行政区域',
    key: 'region',
    colspan: '1'
  }, {
    label: '警戒水位1',
    key: 'alarm_l1',
    colspan: '1'
  }, {
    label: '警戒水位2',
    key: 'alarm_l2',
    colspan: '1'
  }],
  [{
    label: '警戒水位3',
    key: 'alarm_l3',
    colspan: '1'
  }, {
    label: '数据来源',
    key: 'data_source',
    colspan: '1'
  }, {
    label: '监测时间',
    key: 'data_time',
    colspan: '1'
  }],
  [{
    label: '流域',
    key: 'basin',
    colspan: '1'
  }, {
    label: '历史最高水位',
    key: 'his_level',
    colspan: '1'
  }, {
    label: '水系',
    key: 'hydr_net',
    colspan: '1'
  }],
  [{
    label: '备注',
    key: 'remark',
    colspan: '5'
  }]
]

// 工情查询与统计
export const workModule = [
  [{
    label: '站点名称',
    key: 'stn_name',
    colspan: '1'
  }, {
    label: '站点编号',
    key: 'stn_no',
    colspan: '1'
  }, {
    label: '站点类型',
    key: 'stn_type',
    colspan: '1'
  }],
  [{
    label: '监测时间',
    key: 'data_time',
    colspan: '1'
  }, {
    label: '闸门数',
    type: 'gate_count',
    key: 'temp_max',
    colspan: '1'
  }, {
    label: '总泵数',
    key: 'gate_count',
    colspan: '1'
  }],
  [{
    label: '内江水位',
    key: 'water_river_in',
    colspan: '1'
  }, {
    label: '外江水位',
    key: 'water_river_out',
    colspan: '1'
  }, {
    label: '闸中水位',
    key: 'water_indoor',
    colspan: '1'
  }],
  [{
    label: '#1闸门开度',
    key: 'gate1_kaidu',
    colspan: '1'
  }, {
    label: '#2闸门开度',
    key: 'gate2_kaidu',
    colspan: '1'
  }, {
    label: '#3闸门开度',
    key: 'gate3_kaidu',
    colspan: '1'
  }],
  [{
    label: '#4闸门开度',
    key: 'gate4_kaidu',
    colspan: '1'
  }, {
    label: '#5闸门开度',
    key: 'gate5_kaidu',
    colspan: '1'
  }, {
    label: '#6闸门开度',
    key: 'gate6_kaidu',
    colspan: '1'
  }],
  [{
    label: '#7闸门开度',
    key: 'gate7_kaidu',
    colspan: '1'
  }, {
    label: '#8闸门开度',
    key: 'gate8_kaidu',
    colspan: '1'
  }, {
    label: '#9闸门开度',
    key: 'gate9_kaidu',
    colspan: '1'
  }],
  [{
    label: '#10闸门开度',
    key: 'gate10_kaidu',
    colspan: '1'
  }, {
    label: '#11闸门开度',
    key: 'gate11_kaidu',
    colspan: '1'
  }, {
    label: '#12闸门开度',
    key: 'gate12_kaidu',
    colspan: '1'
  }],
  [{
    label: '#1泵工作电流',
    key: 'pump1_current',
    colspan: '1'
  }, {
    label: '#2泵工作电流',
    key: 'pump2_current',
    colspan: '1'
  }, {
    label: '#3泵工作电流',
    key: 'pump3_current',
    colspan: '1'
  }],
  [{
    label: '#4泵工作电流',
    key: 'pump4_current',
    colspan: '1'
  }, {
    label: '#5泵工作电流',
    key: 'pump5_current',
    colspan: '1'
  }, {
    label: '#6泵工作电流',
    key: 'pump6_current',
    colspan: '1'
  }],
  [{
    label: '#7泵工作电流',
    key: 'pump7_current',
    colspan: '1'
  }, {
    label: '#8泵工作电流',
    key: 'pump8_current',
    colspan: '1'
  }, {
    label: '#9泵工作电流',
    key: 'pump9_current',
    colspan: '1'
  }],
  [{
    label: '#10泵工作电流',
    key: 'pump10_current',
    colspan: '1'
  }, {
    label: '#11泵工作电流',
    key: 'pump11_current',
    colspan: '1'
  }, {
    label: '#12泵工作电流',
    key: 'pump12_current',
    colspan: '1'
  }],
  [{
    label: '泵站入口水位',
    key: 'water_out',
    colspan: '1'
  }, {
    label: '泵站出口水位',
    key: 'water_in',
    colspan: '1'
  }, {
    label: '镇街',
    key: 'town',
    colspan: '1'
  }],
  [{
    label: '内江超限水位',
    key: 'inner_limit',
    colspan: '1'
  }, {
    label: '外江超限水位',
    key: 'outer_limit',
    colspan: '1'
  }, {
    label: '外江水位趋势',
    key: 'outertrend',
    colspan: '1'
  }],
  [{
    label: '泵状态',
    key: 'pumpstatus',
    colspan: '1'
  }, {
    label: '闸门状态',
    key: 'gatestatus',
    colspan: '1'
  }, {
    label: '监测时间',
    key: 'data_time',
    colspan: '1'
  }]
]

// 环境监测查询
export const environmentModule = [
  [{
    label: '站点名称',
    key: 'stn_name',
    colspan: '1'
  }, {
    label: '站点编号',
    key: 'stn_no',
    colspan: '1'
  }, {
    label: '站点类型',
    key: 'stn_type',
    colspan: '1'
  }],
  [{
    label: '地址',
    key: 'address',
    colspan: '1'
  }, {
    label: '最大临界值',
    key: 'temp_max',
    colspan: '1'
  }, {
    label: '最小临界值',
    key: 'stn_type',
    colspan: '1'
  }],
  [{
    label: '数据来源',
    key: 'data_source',
    colspan: '1'
  }, {
    label: '数据来源时间',
    key: 'data_time',
    colspan: '1'
  }, {
    label: '站点类型',
    key: 'stn_type',
    colspan: '1'
  }]
]

// 预测数据查询
export const predictModule = [
  [{
    label: '站点名称',
    key: 'stn_name',
    colspan: '1'
  }, {
    label: '站点编号',
    key: 'stn_no',
    colspan: '1'
  }, {
    label: '站点类型',
    key: 'stn_type',
    colspan: '1'
  }],
  [{
    label: '地址',
    key: 'address',
    colspan: '1'
  }, {
    label: '最大临界值',
    key: 'temp_max',
    colspan: '1'
  }, {
    label: '最小临界值',
    key: 'stn_type',
    colspan: '1'
  }],
  [{
    label: '数据来源',
    key: 'data_source',
    colspan: '1'
  }, {
    label: '数据来源时间',
    key: 'data_time',
    colspan: '1'
  }, {
    label: '站点类型',
    key: 'stn_type',
    colspan: '1'
  }]
]

// 预测数据查询
export const planModule = [
  [{
    label: '预案编号',
    key: 'plan_no',
    colspan: '1'
  }, {
    label: '预案名称',
    key: 'plan_name',
    colspan: '1'
  }, {
    label: '预案类型',
    key: 'plan_type',
    colspan: '1'
  }],
  [{
    label: '执行部门',
    key: 'department_name',
    colspan: '1'
  }, {
    label: '部门编号',
    key: 'department_code',
    colspan: '1'
  }, {
    label: '状态',
    key: 'status',
    colspan: '1'
  }],
  [{
    label: '总则',
    readonly: true,
    key: 'principle',
    colspan: '5'
  }],
  [{
    label: '基本情况',
    readonly: true,
    key: 'situation',
    colspan: '5'
  }],
  [{
    label: '组织机构',
    readonly: true,
    key: 'organization',
    colspan: '5'
  }],
  [{
    label: '预警与预防',
    readonly: true,
    key: 'precaution',
    colspan: '5'
  }],
  [{
    label: '保障措施',
    readonly: true,
    key: 'precaution',
    colspan: '5'
  }],
  [{
    label: '应急响应行动',
    readonly: true,
    key: 'response',
    colspan: '5'
  }],
  [{
    label: '善后工作',
    readonly: true,
    key: 'settledown',
    colspan: '5'
  }],
  [{
    label: '培训与演练',
    readonly: true,
    key: 'practice',
    colspan: '5'
  }],
  [{
    label: '审批人',
    key: 'approveby',
    colspan: '1'
  }, {
    label: '审批时间',
    key: 'approvedt',
    colspan: '1'
  }, {
    label: '预案年份',
    key: 'plan_time',
    colspan: '1'
  }]
]

// 月度数据上报列表分类
export const dataReport = {
  // 1: 'total',
  // 2: 'total',
  // 3: 'houseConstruction'
}

export const dataAfterReportTableName = [
  { title: '洪涝灾害基本情况统计表', key: 'flood' },
  { title: '农林牧渔业洪涝灾害统计表', key: 'forestry' },
  { title: '工业交通运输业洪涝灾害统计表', key: 'industry' },
  { title: '水利设施洪涝灾害统计表', key: 'water' },
  { title: '死亡人员基本情况统计表', key: 'die' },
  { title: '城市受淹情况统计表', key: 'logging' },
  { title: '抗洪抢险综合情况统计表一', key: 'material' },
  { title: '抗洪抢险综合情况统计表二', key: 'money' },
  { title: '洪涝灾害实时统计表', key: 'realdata' }
]
