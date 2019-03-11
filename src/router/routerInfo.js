// 首页
// const Home = () => import('components/home/home')

// 首页内容
const HomeDefault = () => import('components/default/default')

// 三防业务
const ThreeBusiness = () => import('components/three-business/three-business')

// 部门预案
const ThreeBusinessDefault = () => import('components/three-business/budgetManagement/three-business-default')

// 应急预案
// const erpDefault = () => import('components/three-business/budgetManagement/er_plan/erp_default')

// 总则
// const general = () => import('components/three-business/budgetManagement/er_plan/general')

// 组织机构
// const organization = () => import('components/three-business/budgetManagement/er_plan/organization')

// 预警预防
// const warning = () => import('components/three-business/budgetManagement/er_plan/warning')

// 保障措施
// const security = () => import('components/three-business/budgetManagement/er_plan/security')

// 应急响应行动
// const erAction = () => import('components/three-business/budgetManagement/er_plan/er_action')

// 善后工作
// const aftermath = () => import('components/three-business/budgetManagement/er_plan/aftermath')

// 任务执行
// const taskActive = () => import('components/three-business/budgetManagement/er_plan/taskActive')

// 培训与演练
// const training = () => import('components/three-business/budgetManagement/er_plan/training')

// 人员转移安置
// const transfer = () => import('components/three-business/budgetManagement/er_plan/transfer')

// 数据表格
// const dataTable = () => import('components/three-business/budgetManagement/er_plan/data_table')

// 事件建议行动
// const eventManagement = () => import('components/three-business/budgetManagement/er_plan/event-management')

// 社区预案
const ThreeBusinessCommunity = () => import('components/three-business/budgetManagement/three-business-community')

// 专题预案
const ThreeBusinessTopic = () => import('components/three-business/budgetManagement/three-business-topic')

// 预案审批
const ThreeBusinessApproval = () => import('components/three-business/budgetManagement/three-business-approval')

// 演练计划
// const prPlan = () => import('components/three-business/practiceManagement/pr-plan/pr-plan')

// 演练任务
// const prTask = () => import('components/three-business/practiceManagement/pr-task')

// 演练角色
// const prRole = () => import('components/three-business/practiceManagement/pr-role')

// 初始化数据
// const prData = () => import('components/three-business/practiceManagement/pr-data')

// 演练报告
// const prReport = () => import('components/three-business/practiceManagement/pr-report')

// 数据模型管理
// const dataModel = () => import('components/three-business/intelligence-analysis/data-model')

// 历史数据分析
// const historyData = () => import('components/three-business/intelligence-analysis/history-data')

// 预设任务
const psTask = () => import('components/three-business/taskManagement/preset_task')

// 任务管理
const magTask = () => import('components/three-business/taskManagement/task_manag')

// 应急响应管理
const erManagement = () => import('components/three-business/emResponse/er-management')

// 应急响应级别
const erLevel = () => import('components/three-business/emResponse/er-level')

// 联合值守看板
const erCard = () => import('components/three-business/emResponse/er-card')

// 参与人员列表
const participants = () => import('components/three-business/emResponse/participants')

// 警告事件日志
const dailyRecord = () => import('components/three-business/emResponse/daily-record')

// 部门管理
const depManagement = () => import('components/dep-management/dep-management')

// 日常办公
const DailyOffice = () => import('components/daily-office/daily-office')

// 报表汇总
const TabSummary = () => import('components/tab-summary/tab-summary')

// 人员转移统计
// const Transfer = () => import('components/tab-summary/transfer-statistical/transfer-statistical')

// 受灾情况统计
const Affected = () => import('components/tab-summary/affected-statistical/affected-statistical')

// 防御工作情况统计
const Defense = () => import('components/tab-summary/defense-statistical/defense-statistical')

// 应急响应总结
// const Summary = () => import('components/tab-summary/summary/summary')

// 应急响应措施
// const Measure = () => import('components/tab-summary/emergency-measure/emergency-measure')

// 防台风已转移人数统计表
// const Typhoon = () => import('components/tab-summary/typhoon-statistical/typhoon-statistical')

// 暴雨情况统计表
// const Rainstorm = () => import('components/tab-summary/rainstorm-statistical/rainstorm-statistical')

// 调度指令完成情况统计
// const Message = () => import('components/tab-summary/message-statistical/message-statistical')

// 预警信息发布情况
// const WarningTable = () => import('components/tab-summary/warning-statistical/warning-statistical')

// 气象数据查询与统计
// const weather = () => import('components/tab-summary/weather-statistical/weather-statistical')

// 气象产品查询
// const product = () => import('components/tab-summary/product-statistical/product-statistical')

// 水情查询与统计
// const water = () => import('components/tab-summary/water-statistical/water-statistical')

// 工情查询与统计
// const work = () => import('components/tab-summary/work-statistical/work-statistical')

// 环境监测查询
// const environment = () => import('components/tab-summary/environment-statistical/environment-statistical')

// 预测数据查询
// const predict = () => import('components/tab-summary/predict-statistical/predict-statistical')

// 三防信息查询
// const info = () => import('components/tab-summary/info-statistical/info-statistical')

// 汇报报告模板
// const reportTemplate = () => import('components/tab-summary/report/report-template')

// 水雨情信息
// const reportWeather = () => import('components/tab-summary/report/report-weather')

// 洪水内涝报告
// const reportFlood = () => import('components/tab-summary/report/report-flood')

// 台风暴潮报告
// const reportTyphoon = () => import('components/tab-summary/report/report-typhoon')

// 历史报告
// const reportHistory = () => import('components/tab-summary/report/report-history')

// 系统管理
const SystemManagement = () => import('components/system-management/system-management')

// 用户管理
const Usermanage = () => import('components/system-management/Usermanage')
// import usermanage from '../components/system-management/Usermanage.vue'

// 角色管理
const RoleManage = () => import('components/system-management/RoleManage')
// import roleManage from '../components/system-management/RoleManage.vue'

// 部门列表
const bumenlist = () => import('components/system-management/bumenlist')
// import bumenlist from '../components/system-management/bumenlist.vue'

// 模块管理
const mokuaiguanli = () => import('components/system-management/mokuaiguanli')
// import mokuaiguanli from '../components/system-management/mokuaiguanli.vue'

// 日志管理进程
const rizhi = () => import('components/system-management/rizhi')

// 部门管理数据上传
// const deplist = () => import('components/dep-management/dep/deplist')

// 上传的新增页面
// const addpage = () => import('components/dep-management/pagemodel/addpage')

// 上传的临时新增页面
// const temporarypage = () => import('components/dep-management/pagemodel/temporarypagemodel')

// 部门录用
// const Employment = () => import('components/dep-management/dep/Employment')

// 部门录用
// const TaslEmployment = () => import('components/dep-management/pagemodel/Report')

// 录用新增
// const lypage = () => import('components/dep-management/pagemodel/lypage')

// 录入页面
// const Report = () => import('components/dep-management/pagemodel/Report')

// 上报查看
// const Listsean = () => import('components/dep-management/dep/Listsean')

// 临时数据
// const temporary = () => import('components/dep-management/dep/temporary')

// 明细
// const seans = () => import('components/dep-management/pagemodel/seans')

// 部门管理1-2
// const relist = () => import('components/dep-management/dep/relist')

// 部门系统定义
// const definition = () => import('components/dep-management/definition')

// 部门指令库管理
const Library = () => import('components/dep-management/Library')

// 部门人员管理
const address = () => import('components/dep-management/address')

// 内涝数据维护
const neilao = () => import('components/dep-management/plan/neilao')

// 内涝新增
const neilaoweihu = () => import('components/dep-management/weihu/neilaoweihu')

// 学校数据维护
// const school = () => import('components/dep-management/plan/school')

// 学校新增
// const schoolweihu = () => import('components/dep-management/weihu/schoolweihu')

// 地质灾害数据维护
const dizhizaihai = () => import('components/dep-management/plan/dizhizaihai')

// 地址灾害新增
const dizhizaihaiweihu = () => import('components/dep-management/weihu/dizhizaihaiweihu')

// 渔船停泊点数据维护
const fish = () => import('components/dep-management/plan/fish')

// 渔船停泊点新增
const fishweihu = () => import('components/dep-management/weihu/fishweihu')

// 涵闸数据维护
const hanza = () => import('components/dep-management/plan/hanza')

// 涵闸新增
const hanzaweihu = () => import('components/dep-management/weihu/hanzaweihu')

// 泵站数据维护
const benzhan = () => import('components/dep-management/plan/benzhan')

// 泵站新增
const benzhanweihu = () => import('components/dep-management/weihu/benzhanweihu')

// 避难场所数据维护
const changsuo = () => import('components/dep-management/plan/changsuo')

// 避难场所灾害新增
const changsuoweihu = () => import('components/dep-management/weihu/changsuoweihu')

// 水库数据维护
const shuiku = () => import('components/dep-management/plan/shuiku')

// 水库数据维护新增
const shuikuweihu = () => import('components/dep-management/weihu/shuikuweihu')

// 山塘数据维护
const hillpool = () => import('components/dep-management/plan/hillpool')

// 山塘数据维护新增
const shantangweihu = () => import('components/dep-management/weihu/shantangweihu')

// 水库险段数据维护
// const xianduan = () =>
// import('components/dep-management/plan/xianduan')

// 险段数据维护
const derstam = () => import('components/dep-management/plan/derstam')

// 险段数据维护新增
const derstamadd = () => import('components/dep-management/weihu/derstamadd')

// 堤围基础数据维护
const tiwei = () => import('components/dep-management/plan/tiwei')

// 堤围基础数据维护新增
const tiweiweihu = () => import('components/dep-management/weihu/tiweiweihu')

// 江心洲数据维护
const jiangxin = () => import('components/dep-management/plan/jiangxin')

// 江心洲数据新增
const jiangxinweihu = () => import('components/dep-management/weihu/jiangxinweihu')

// 外滩地
const waitandi = () => import('components/dep-management/plan/waitandi')

// 外滩地新增
const waitandiweihu = () => import('components/dep-management/weihu/waitandiweihu')

// 堤上在建工程
const tishan = () => import('components/dep-management/plan/tishan')

// 堤上在建工程
const tishanweihu = () => import('components/dep-management/weihu/tishanweihu')

// 穿堤管道
const ctgd = () => import('components/dep-management/plan/ctgd')

// 穿堤管道新增
const chuantiguandaoweihu = () => import('components/dep-management/weihu/chuantiguandaoweihu')

// 码头数据维护
const matou = () => import('components/dep-management/plan/matou')

// 码头数据新增
const matouweihu = () => import('components/dep-management/weihu/matouweihu')

// 桥梁数据维护
const qiaoliang = () => import('components/dep-management/plan/qiaoliang')

// 桥梁新增
const qiaoliangweihu = () => import('components/dep-management/weihu/qiaoliangweihu')

// 景点数据维护
const jingdian = () => import('components/dep-management/plan/jingdian')

// 景点新增
const jingdianweihu = () => import('components/dep-management/weihu/jingdianweihu')

// 三棚数据维护
const sanpeng = () => import('components/dep-management/plan/sanpeng')

// 三棚新增
const sanpengweihu = () => import('components/dep-management/weihu/sanpengweihu')

// 电力数据维护
const dl = () => import('components/dep-management/plan/dl')

// 电力新增
const diweihu = () => import('components/dep-management/weihu/diweihu')

// 工地数据维护
const gongdi = () => import('components/dep-management/plan/gongdi')

// 工地新增
const gongdiweihu = () => import('components/dep-management/weihu/gongdiweihu')

// 危险化学品
const weixians = () => import('components/dep-management/plan/weixians')

// 危险化学品新增
const weixianweihu = () => import('components/dep-management/weihu/weixianweihu')

// 重要通信设备信息维护
const zhongysb = () => import('components/dep-management/plan/zhongysb')

// 重要通信设备信息维护新增
const zhongysbweihu = () => import('components/dep-management/weihu/zhongysbweihu')

// 危房基本信息维护
const weifang = () => import('components/dep-management/plan/weifang')

// 危房基本信息维护新增
const weifangweihu = () => import('components/dep-management/weihu/weifangweihu')

// 物资仓库维护
const cangku = () => import('components/dep-management/plan/cangku')

// 物资仓库新增
const cangkuweihu = () => import('components/dep-management/weihu/cangkuweihu')

// 气象站基本信息维护
const qixiang = () => import('components/dep-management/plan/qixiang')

// 气象站基本信息维护新增
const qixiangweihu = () => import('components/dep-management/weihu/qixiangweihu')

// 水网数据
// const shuiwang = () => import('components/dep-management/plan/shuiwang')

// 水网维护
// const shuiwangweihu = () => import('components/dep-management/weihu/menhuweihu/shuiwangweihu')

// 商场数据
// const shangchang = () => import('components/dep-management/plan/shangchang')

// 客运站数据
// const keyunzhan = () => import('components/dep-management/plan/keyunzhan')

// 医院数据
// const yiyuan = () => import('components/dep-management/plan/yiyuan')

// 银行数据
// const yinhan = () => import('components/dep-management/plan/yinhan')

// 救援数据
// const jiuyuan = () => import('components/dep-management/plan/jiuyuan')

// 救援新增
// const jiuyuanweihu = () => import('components/dep-management/weihu/menhuweihu/jiuyuanweihu')

// 排水设施数据
// const paishuisheshi = () => import('components/dep-management/plan/paishuisheshi')

// 排水设施维护
// const paishuisheshiweihu = () => import('components/dep-management/weihu/menhuweihu/paishuisheshiweihu')

// 供水设施数据
// const gongshuisheshi = () => import('components/dep-management/plan/gongshuisheshi')

// 供水设施维护
// const gongshuisheshiweihu = () => import('components/dep-management/weihu/menhuweihu/gongshuisheshiweihu')

// 供水设备数据
// const gongshuishebei = () => import('components/dep-management/plan/gongshuishebei')

// 供水设备维护
// const gongshuishebeiweihu = () => import('components/dep-management/weihu/menhuweihu/gongshuishebeiweihu')

// 污水厂设备数据
// const wushuichang = () => import('components/dep-management/plan/wushuichang')

// 污水厂维护
// const wushuichangweihu = () => import('components/dep-management/weihu/menhuweihu/wushuichangweihu')

// 自来水数据
// const zilaishui = () => import('components/dep-management/plan/zilaishui')

// 自来水
// const zilaishuiweihu = () => import('components/dep-management/weihu/menhuweihu/zilaishuiweihu')

// 排水管网数据
// const paishuiguanwang = () => import('components/dep-management/plan/paishuiguanwang')

// 排水管网维护
// const paishuiguanwangweihu = () => import('components/dep-management/weihu/menhuweihu/paishuiguanwangweihu')

// 供水管网数据
// const gongshuiguanwang = () => import('components/dep-management/plan/gongshuiguanwang')

// 供水管网维护
// const gongshuiguanwangweihu = () => import('components/dep-management/weihu/menhuweihu/gongshuiguanwangweihu')

// 下沉隧道数据
// const xiachensuidao = () => import('components/dep-management/plan/xiachensuidao')

// 水文站
// const shuiwen = () => import('components/dep-management/plan/shuiwen')

// 水文新增
// const shuiwenweihu = () => import('components/dep-management/weihu/menhuweihu/shuiwenweihu')

// 构建
// const goujian = () => import('components/dep-management/plan/goujian')

// 构建新增
// const goujianweihu = () => import('components/dep-management/weihu/menhuweihu/goujianweihu')

// 排水口
// const paishuikou = () => import('components/dep-management/plan/paishuikou')

// 排水口维护
// const paishuikouweihu = () => import('components/dep-management/weihu/menhuweihu/paishuikouweihu')

// 警戒
// const jingjie = () => import('components/dep-management/plan/jingjie')

// 商场新增
// const shangchangweihu = () => import('components/dep-management/weihu/menhuweihu/shangchangweihu')

// 客运站新增
// const keyunzhanweihu = () => import('components/dep-management/weihu/menhuweihu/keyunzhanweihu')

// 医院新增
// const yiyuanweihu = () => import('components/dep-management/weihu/menhuweihu/yiyuanweihu')

// 银行新增
// const yinhanweihu = () => import('components/dep-management/weihu/menhuweihu/yinhanweihu')

// 下沉隧道weihu
// const xiachensuidaoweihu = () => import('components/dep-management/weihu/menhuweihu/xiachensuidaoweihu')

// 通讯录管理
const AddressBook = () => import('components/daily-office/address-book')

// 通知公告
const Notice = () => import('components/daily-office/notice')

// 通知公告-详情
// const NoticeDetails = () => import('components/daily-office/notice-details')

// 短信管理
const NoteMgr = () => import('components/daily-office/note-management')

// 资料管理
const DataMgr = () => import('components/daily-office/data-management')

// 专题订阅管理
const ThematicInformation = () => import('components/daily-office/thematic-information')

// 传真管理
// const FaxManagement = () => import('components/daily-office/fax-management')

// 三防工作安排
// const OfficeManagement = () => import('components/daily-office/office-management')

// 值班人员管理
// const Personnel = () => import('components/daily-office/duty-management/personnel')

// 值班日志
// const Journal = () => import('components/daily-office/duty-management/journal')

// 收文处理
const Addressee = () => import('components/daily-office/official-document/addressee')

// 发文处理
// const Post = () => import('components/daily-office/official-document/post')

// 指挥一张图
const ThreeCommand = () => import('components/three-command/three-command')

// 移动管理
const MoveManagement = () => import('components/move-management/move-management')

// 快讯管理
const AlertsMag = () => import('components/move-management/alerts-management')

// 巡查任务安排
const PatrolPlan = () => import('components/move-management/patrol/patrol-plan')

// 巡查任务记录
const PatrolRecord = () => import('components/move-management/patrol/patrol-record')

// 内容发布
// const release = () => import('components/system-management/release')

// 内容编辑
// const editage = () => import('components/system-management/editage')

// 审批
// const shenpi = () => import('components/system-management/shenpi')

// 三防快报管理
// const latter = () => import('components/system-management/latter')

// 现场上报管理
// const sceneReported = () => import('components/system-management/scene-reported')

// 文章管理
// const article = () => import('components/system-management/article')

// 文件管理
// const file = () => import('components/system-management/file')

// 模板管理
// const template = () => import('components/system-management/template')

const routerInfo = {
  // 'mdl.firstpage': {
  //     path: '/home/default',
  //     component: HomeDefault
  // },
  // 'mdl.threeCommand': {
  //     path: '/home/threeCommand',
  //     component: ThreeCommand
  // },
  // 'mdl.sanfanapplication': {
  //     path: '/home/threeBusiness',
  //     component: ThreeBusiness
  // },
  // 'mdl.sanfanapplication.emergenceplan': {
  //     path: '/home/threeBusiness',
  //     component: ThreeBusiness
  // },
  // 'mdl.departmentmanage': {
  //     path: '/home/depManagement',
  //     component: depManagement
  // },
  // 'mdl.OAfunction': {
  //     path: '/home/dailyOffice',
  //     component: DailyOffice
  // },
  // 'mdl.reportlist': {
  //     path: '/home/tabSummary',
  //     component: TabSummary
  // },
  // 'mdl.systemmanage': {
  //     path: '/home/systemManagement',
  //     component: SystemManagement
  // },
  // 'mdl.moveManagement': {
  //     path: '/home/moveManagement',
  //     component: MoveManagement
  // },
  'mdl.firstpage': {
    path: '/home/default',
    component: HomeDefault
  },
  'mdl.sanfanapplication': {
    path: '/home/threeBusiness',
    redirect: '/home/threeBusiness/threeBusinessDefault',
    component: ThreeBusiness
  },
  'mdl.sanfanapplication.emergenceplan': {
    path: '/home/threeBusiness/threeBusinessDefault',
    component: ThreeBusinessDefault
  },
  'mdl.sanfanapplication.emergenceplan.departmentplan': {
    path: '/home/threeBusiness/threeBusinessDefault',
    component: ThreeBusinessDefault
  },
  'mdl.sanfanapplication.emergenceplan.communityplan': {
    path: '/home/threeBusiness/threeBusinessCommunity',
    component: ThreeBusinessCommunity
  },
  'mdl.sanfanapplication.emergenceplan.specialplan': {
    path: '/home/threeBusiness/threeBusinessTopic',
    component: ThreeBusinessTopic
  },
  'mdl.sanfanapplication.emergenceplan.planapproval': {
    path: '/home/threeBusiness/threeBusinessApproval',
    component: ThreeBusinessApproval
  },
  'mdl.sanfanapplication.emergenceplan.responselevel': {
    path: '/home/threeBusiness/erLevel',
    component: erLevel
  },
  'mdl.sanfanapplication.response': {
    path: '/home/threeBusiness/magTask',
    component: magTask
  },
  'mdl.sanfanapplication.response.taskmanage': {
    path: '/home/threeBusiness/magTask',
    component: magTask
  },
  'mdl.sanfanapplication.response.taskpreplan': {
    path: '/home/threeBusiness/psTask',
    component: psTask
  },
  'mdl.sanfanapplication.response.responsemanage': {
    path: '/home/threeBusiness/erManagement',
    component: erManagement
  },
  'mdl.sanfanapplication.response.ondutykanban': {
    path: '/home/threeBusiness/erCard',
    component: erCard
  },
  'mdl.sanfanapplication.response.participants': {
    path: '/home/threeBusiness/participants',
    component: participants
  },
  'mdl.sanfanapplication.response.daily-record': {
    path: '/home/threeBusiness/daily-record',
    component: dailyRecord
  },
  'mdl.sanfanapplication.drilling': {
    path: '/home/threeBusiness/daily-record',
    component: dailyRecord
  },
  'mdl.departmentmanage': {
    path: '/home/depManagement',
    component: depManagement,
    redirect: '/home/depManagement/definition'
  },
  'mdl.departmentmanage.sysdef': {
    path: '/home/depManagement',
    component: depManagement
  },
  'mdl.departmentmanage.instructions': {
    path: '/home/depManagement/Library',
    component: Library
  },
  'mdl.departmentmanage.datamaintenance': {
    path: '/home/threeBusiness/daily-record',
    component: dailyRecord
  },
  'mdl.departmentmanage.datamaintenance.reservoir': {
    path: '/home/depManagement/shuiku',
    component: shuiku,
    needAdd: [
      {
        path: 'home/depManagement/shuiku/shuikuweihu',
        component: shuikuweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.pool': {
    path: '/home/depManagement/hillpool',
    component: hillpool,
    needAdd: [
      {
        path: 'home/depManagement/shantangweihu/shantangweihu',
        component: shantangweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.dikedangerous': {
    path: 'home/depManagement/derstam',
    component: derstam,
    needAdd: [
      {
        path: 'home/depManagement/derstam/derstamadd',
        component: derstamadd
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.dike': {
    path: '/home/depManagement/tiwei',
    component: tiwei,
    needAdd: [
      {
        path: 'home/depManagement/tiwei/tiweiweihu',
        component: tiweiweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.rivermiddle': {
    path: '/home/depManagement/jiangxin',
    component: jiangxin,
    needAdd: [
      {
        path: 'home/depManagement/jiangxin/jiangxinweihu',
        component: jiangxinweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.advertisement': {
    path: '/home/depManagement/waitandi',
    component: waitandi,
    needAdd: [
      {
        path: 'home/depManagement/waitandi/waitandiweihu',
        component: waitandiweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.dikeconstruction': {
    path: '/home/depManagement/tishan',
    component: tishan,
    needAdd: [
      {
        path: 'home/depManagement/tishan/tishanweihu',
        component: tishanweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.dikepipe': {
    path: '/home/depManagement/ctgd',
    component: ctgd,
    needAdd: [
      {
        path: 'home/depManagement/ctgd/chuantiguandaoweihu',
        component: chuantiguandaoweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.dock': {
    path: '/home/depManagement/matou',
    component: matou,
    needAdd: [
      {
        path: 'home/depManagement/matou/matouweihu',
        component: matouweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.bridge': {
    path: '/home/depManagement/qiaoliang',
    component: qiaoliang,
    needAdd: [
      {
        path: 'home/depManagement/qiaoliang/qiaoliangweihu',
        component: qiaoliangweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.scenerysport': {
    path: '/home/depManagement/jingdian',
    component: jingdian,
    needAdd: [
      {
        path: 'home/depManagement/jingdian/jingdianweihu',
        component: jingdianweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.threeshed': {
    path: '/home/depManagement/sanpeng',
    component: sanpeng,
    needAdd: [
      {
        path: 'home/depManagement/sanpeng/sanpengweihu',
        component: sanpengweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.powerfacility': {
    path: '/home/depManagement/dl',
    component: dl,
    needAdd: [
      {
        path: 'home/depManagement/dl/diweihu',
        component: diweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.buildingsite': {
    path: '/home/depManagement/gongdi',
    component: gongdi,
    needAdd: [
      {
        path: 'home/depManagement/gongdi/gongdiweihu',
        component: gongdiweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.hazardouschemicals': {
    path: '/home/depManagement/weixians',
    component: weixians,
    needAdd: [
      {
        path: 'home/depManagement/weixians/weixianweihu',
        component: weixianweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.communicationsequipment': {
    path: '/home/depManagement/zhongysb',
    component: zhongysb,
    needAdd: [
      {
        path: 'home/depManagement/zhongysb/zhongysbweihu',
        component: zhongysbweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.dangerousbuilding': {
    path: '/home/depManagement/weifang',
    component: weifang,
    needAdd: [
      {
        path: 'home/depManagement/weifang/weifangweihu',
        component: weifangweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.materialwarehouse': {
    path: '/home/depManagement/cangku',
    component: cangku,
    needAdd: [
      {
        path: 'home/depManagement/cangku/cangkuweihu',
        component: cangkuweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.weatherstation': {
    path: '/home/depManagement/qixiang',
    component: qixiang,
    needAdd: [
      {
        path: 'home/depManagement/qixiang/qixiangweihu',
        component: qixiangweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.waterlogging': {
    path: '/home/depManagement/neilao',
    component: neilao,
    needAdd: [
      {
        path: 'home/depManagement/neilao/neilaoweihu',
        component: neilaoweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.geologichazard': {
    path: '/home/depManagement/dizhizaihai',
    component: dizhizaihai,
    needAdd: [
      {
        path: 'home/depManagement/dizhizaihai/dizhizaihaiweihu',
        component: dizhizaihaiweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.refuge': {
    path: '/home/depManagement/changsuo',
    component: changsuo,
    needAdd: [
      {
        path: 'home/depManagement/changsuo/changsuoweihu',
        component: changsuoweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.sluicegate': {
    path: '/home/depManagement/hanza',
    component: hanza,
    needAdd: [
      {
        path: 'home/depManagement/hanza/hanzaweihu',
        component: hanzaweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.pumpstation': {
    path: '/home/depManagement/benzhan',
    component: benzhan,
    needAdd: [
      {
        path: 'home/depManagement/benzhan/benzhanweihu',
        component: benzhanweihu
      }
    ]
  },
  'mdl.departmentmanage.datamaintenance.fishingport': {
    path: '/home/depManagement/fish',
    component: fish,
    needAdd: [
      {
        path: 'home/depManagement/fish/fishweihu',
        component: fishweihu
      }
    ]
  },
  'mdl.departmentmanage.datasubmit': {
    path: '/home/depManagement/address',
    component: address
  },
  'mdl.departmentmanage.staff': {
    path: '/home/depManagement/address',
    component: address
  },
  'mdl.OAfunction': {
    path: '/home/dailyOffice',
    redirect: '/home/dailyOffice/addressBook',
    component: DailyOffice
  },
  'mdl.OAfunction.addressBook': {
    path: '/home/dailyOffice/addressBook',
    component: AddressBook
  },
  'mdl.OAfunction.notice': {
    path: '/home/dailyOffice/notice',
    component: Notice
  },
  'mdl.OAfunction.dataManagement': {
    path: '/home/dailyOffice/dataManagement',
    component: DataMgr
  },
  'mdl.OAfunction.noteManagement': {
    path: '/home/dailyOffice/noteManagement',
    component: NoteMgr
  },
  'mdl.OAfunction.addressee': {
    path: '/home/dailyOffice/addressee',
    component: Addressee
  },
  'mdl.OAfunction.thematicInformation': {
    path: '/home/dailyOffice/thematicInformation',
    component: ThematicInformation
  },
  'mdl.reportlist': {
    path: '/home/tabSummary',
    component: TabSummary,
    redirect: '/home/tab-summary/transfer-statistical'
  },
  'mdl.reportlist.beforeReport': {
    path: '/home/tab-summary/defense-statistical',
    component: Defense
  },
  'mdl.reportlist.centerReport': {
    path: '/home/tab-summary/defense-statistical',
    component: Defense
  },
  'mdl.reportlist.afterReport': {
    path: '/home/tab-summary/defense-statistical',
    component: Defense
  },
  'mdl.reportlist.afterReport.transfer-statistical': {
    path: '/home/tabSummary',
    component: TabSummary,
    redirect: '/home/tab-summary/transfer-statistical'
  },
  'mdl.reportlist.afterReport.affected-statistical': {
    path: '/home/tab-summary/affected-statistical',
    component: Affected
  },
  'mdl.reportlist.afterReport.defense-statistical': {
    path: '/home/tab-summary/defense-statistical',
    component: Defense
  },
  'mdl.systemmanage': {
    path: '/home/systemManagement',
    component: SystemManagement,
    redirect: '/home/systemManagement/usermanage'
  },
  'mdl.systemmanage.usermanage': {
    path: '/home/systemManagement/usermanage',
    component: Usermanage
  },
  'mdl.systemmanage.rolemanage': {
    path: '/home/systemManagement/roleManage',
    component: RoleManage
  },
  'mdl.systemmanage.mokuaimanage': {
    path: '/home/systemManagement/mokuaiguanli',
    component: mokuaiguanli
  },
  'mdl.systemmanage.bumenmanage': {
    path: '/home/systemManagement/bumenlist',
    component: bumenlist
  },
  'mdl.systemmanage.xitongmanage': {
    path: '/home/systemManagement/rizhi',
    component: rizhi
  },
  'mdl.systemmanage.dingyimanage': {
    path: '/home/depManagement',
    component: depManagement,
    redirect: '/home/depManagement/definition'
  },
  'mdl.moveManagement': {
    path: '/home/moveManagement',
    component: MoveManagement,
    redirect: '/home/moveManagement/alerts-management'
  },
  'mdl.moveManagement.alerts-management': {
    path: '/home/moveManagement/alerts-management',
    component: AlertsMag
  },
  'mdl.moveManagement.patrolManagement': {
    path: '/home/moveManagement/patrol-plan',
    component: PatrolPlan
  },
  'mdl.moveManagement.patrolManagement.patrol-plan': {
    path: '/home/moveManagement/patrol-plan',
    component: PatrolPlan
  },
  'mdl.moveManagement.patrolManagement.patrol-record': {
    path: '/home/moveManagement/patrol-record',
    component: PatrolRecord
  },
  'mdl.threeCommand': {
    path: '/home/threeCommand',
    component: ThreeCommand
  }
}

export default routerInfo
