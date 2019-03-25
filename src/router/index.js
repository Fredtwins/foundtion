/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import store from 'src/store'
import { permissionsApi } from 'api/home'
import { routesRelyonId } from 'common/js/module'
Vue.use(Router)

// 登录
const Login = () => import(/* webpackChunkName: 'login' */ 'components/login/login')

// 首页
const Home = () => import('components/home/home')

// 首页内容
const HomeDefault = () => import('components/default/default')

// 三防业务
const ThreeBusiness = () => import('components/three-business/three-business')

// 部门预案
const ThreeBusinessDefault = () => import('components/three-business/budgetManagement/three-business-default')

// 应急预案
const erpDefault = () => import('components/three-business/budgetManagement/er_plan/erp_default')

// 总则
const general = () => import('components/three-business/budgetManagement/er_plan/general')

// 组织机构
const organization = () => import('components/three-business/budgetManagement/er_plan/organization')

// 预警预防
const warning = () => import('components/three-business/budgetManagement/er_plan/warning')

// 保障措施
const security = () => import('components/three-business/budgetManagement/er_plan/security')

// 应急响应行动
const erAction = () => import('components/three-business/budgetManagement/er_plan/er_action')

// 善后工作
const aftermath = () => import('components/three-business/budgetManagement/er_plan/aftermath')

// 任务执行
const taskActive = () => import('components/three-business/budgetManagement/er_plan/taskActive')

// 培训与演练
const training = () => import('components/three-business/budgetManagement/er_plan/training')

// 人员转移安置
const transfer = () => import('components/three-business/budgetManagement/er_plan/transfer')

// 数据表格
const dataTable = () => import('components/three-business/budgetManagement/er_plan/data_table')

// 事件建议行动
const eventManagement = () => import('components/three-business/budgetManagement/er_plan/event-management')

// 社区预案
const ThreeBusinessCommunity = () => import('components/three-business/budgetManagement/three-business-community')

// 专题预案
const ThreeBusinessTopic = () => import('components/three-business/budgetManagement/three-business-topic')

// 预案审批
const ThreeBusinessApproval = () => import('components/three-business/budgetManagement/three-business-approval')

// 演练计划
const prPlan = () => import('components/three-business/practiceManagement/pr-plan/pr-plan')

// 演练任务
const prTask = () => import('components/three-business/practiceManagement/pr-task')

// 演练角色
const prRole = () => import('components/three-business/practiceManagement/pr-role')

// 初始化数据
const prData = () => import('components/three-business/practiceManagement/pr-data')

// 演练报告
const prReport = () => import('components/three-business/practiceManagement/pr-report')

// 数据模型管理
const dataModel = () => import('components/three-business/intelligence-analysis/data-model')

// 历史数据分析
const historyData = () => import('components/three-business/intelligence-analysis/history-data')

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

// 月度受影响人员台账统计表
const EmergencyPerson = () => import('components/tab-summary/emergency-person/emergency-person')

// 人员转移统计
const Transfer = () => import('components/tab-summary/transfer-statistical/transfer-statistical')

// 受灾情况统计
const Affected = () => import('components/tab-summary/affected-statistical/affected-statistical')

// 防御工作情况统计
const Defense = () => import('components/tab-summary/defense-statistical/defense-statistical')

// 国汛统表
const NationalFlood = () => import('components/tab-summary/national-flood/national-flood')

// 应急响应总结
const Summary = () => import('components/tab-summary/summary/summary')

// 应急响应措施统计
const Measure = () => import('components/tab-summary/emergency-measure/emergency-measure')

// 防御当前台风应急措施统计表
const Typhoon = () => import('components/tab-summary/typhoon-statistical/typhoon-statistical')

// 防汛防台风已转移人员统计表
const TyphoonFlood = () => import('components/tab-summary/typhoonFlood-statistical/typhoonFlood-statistical')

// 暴雨台风防御工作开展情况统计表
const RainDefense = () => import('components/tab-summary/rainDefense-statistical/rainDefense-statistical')

// 受灾情况统计表
const Disaster = () => import('components/tab-summary/disaster-statistical/disaster-statistical')

// 救灾复产情况统计表
const DisasterRelief = () => import('components/tab-summary/disasterRelief-statistical/disasterRelief-statistical')

// 暴雨情况统计表
const Rainstorm = () => import('components/tab-summary/rainstorm-statistical/rainstorm-statistical')

// 数据上报日志
const Datareportlog = () => import('components/tab-summary/data-report-log/data-report-log')

// 临时报表统计
const TemporaryReport = () => import('components/tab-summary/temporary-report-statistical/temporary-report-statistical')

// 调度指令完成情况统计
const Message = () => import('components/tab-summary/message-statistical/message-statistical')

// 预警信息发布情况
const WarningTable = () => import('components/tab-summary/warning-statistical/warning-statistical')

// 气象数据查询与统计
const weather = () => import('components/tab-summary/weather-statistical/weather-statistical')

// 气象产品查询
const product = () => import('components/tab-summary/product-statistical/product-statistical')

// 水情查询与统计
const water = () => import('components/tab-summary/water-statistical/water-statistical')

// 工情查询与统计
const work = () => import('components/tab-summary/work-statistical/work-statistical')

// 环境监测查询
const environment = () => import('components/tab-summary/environment-statistical/environment-statistical')

// 预测数据查询
const predict = () => import('components/tab-summary/predict-statistical/predict-statistical')

// 三防信息查询
const info = () => import('components/tab-summary/info-statistical/info-statistical')

// 汇报报告模板
const reportTemplate = () => import('components/tab-summary/report/report-template')

// 水雨情信息
const reportWeather = () => import('components/tab-summary/report/report-weather')

// 洪水内涝报告
const reportFlood = () => import('components/tab-summary/report/report-flood')

// 台风暴潮报告
const reportTyphoon = () => import('components/tab-summary/report/report-typhoon')

// 历史报告
const reportHistory = () => import('components/tab-summary/report/report-history')

// 系统管理
const SystemManagement = () => import('components/system-management/system-management')

// 用户管理
const Usermanage = () => import('components/system-management/Usermanage')

// 角色管理
const RoleManage = () => import('components/system-management/RoleManage')

// 部门列表
const bumenlist = () => import('components/system-management/bumenlist')

// 模块管理
const mokuaiguanli = () => import('components/system-management/mokuaiguanli')

// 日志管理进程
const rizhi = () => import('components/system-management/rizhi')

// 月度数据上报
const dataReport = () => import('components/dep-management/dep/dataReport')

// 事后数据上报
const dataAfterReport = () => import('components/dep-management/dep/dataAfterReport')

// 部门管理数据上传
const deplist = () => import('components/dep-management/dep/deplist')

// 上传的新增页面
const addpage = () => import('components/dep-management/pagemodel/addpage')

// 上传的临时新增页面
const temporarypage = () => import('components/dep-management/pagemodel/temporarypagemodel')

// 部门录用
const Employment = () => import('components/dep-management/dep/Employment')

// 部门录用
const TaslEmployment = () => import('components/dep-management/pagemodel/Report')

// 录用新增
const lypage = () => import('components/dep-management/pagemodel/lypage')

// 录入页面
const Report = () => import('components/dep-management/pagemodel/Report')

// 上报查看
const Listsean = () => import('components/dep-management/dep/Listsean')

// 临时数据
const temporary = () => import('components/dep-management/dep/temporary')

// 明细
const seans = () => import('components/dep-management/pagemodel/seans')

// 部门管理1-2
const relist = () => import('components/dep-management/dep/relist')

// 部门系统定义
const definition = () => import('components/dep-management/definition')

// 部门指令库管理
const Library = () => import('components/dep-management/Library')

// 部门人员管理
const address = () => import('components/dep-management/address')

// 内涝数据维护
const neilao = () => import('components/dep-management/plan/neilao')

// 内涝新增
const neilaoweihu = () => import('components/dep-management/weihu/neilaoweihu')

// 学校数据维护
const school = () => import('components/dep-management/plan/school')

// 学校新增
const schoolweihu = () => import('components/dep-management/weihu/schoolweihu')

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
// const xianduan = () => import('components/dep-management/plan/xianduan')

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
const shuiwang = () => import('components/dep-management/plan/shuiwang')

// 水网维护
const shuiwangweihu = () => import('components/dep-management/weihu/menhuweihu/shuiwangweihu')

// 商场数据
const shangchang = () => import('components/dep-management/plan/shangchang')

// 客运站数据
const keyunzhan = () => import('components/dep-management/plan/keyunzhan')

// 医院数据
const yiyuan = () => import('components/dep-management/plan/yiyuan')

// 救援数据
const jiuyuan = () => import('components/dep-management/plan/jiuyuan')

// 救援新增
const jiuyuanweihu = () => import('components/dep-management/weihu/menhuweihu/jiuyuanweihu')

// 排水设施数据
const paishuisheshi = () => import('components/dep-management/plan/paishuisheshi')

// 排水设施维护
const paishuisheshiweihu = () => import('components/dep-management/weihu/menhuweihu/paishuisheshiweihu')

// 供水设施数据
const gongshuisheshi = () => import('components/dep-management/plan/gongshuisheshi')

// 供水设施维护
const gongshuisheshiweihu = () => import('components/dep-management/weihu/menhuweihu/gongshuisheshiweihu')

// 供水设备数据
const gongshuishebei = () => import('components/dep-management/plan/gongshuishebei')

// 供水设备维护
const gongshuishebeiweihu = () => import('components/dep-management/weihu/menhuweihu/gongshuishebeiweihu')

// 污水厂设备数据
const wushuichang = () => import('components/dep-management/plan/wushuichang')

// 污水厂维护
const wushuichangweihu = () => import('components/dep-management/weihu/menhuweihu/wushuichangweihu')

// 自来水数据
const zilaishui = () => import('components/dep-management/plan/zilaishui')

// 自来水
const zilaishuiweihu = () => import('components/dep-management/weihu/menhuweihu/zilaishuiweihu')

// 排水管网数据
const paishuiguanwang = () => import('components/dep-management/plan/paishuiguanwang')

// 排水管网维护
const paishuiguanwangweihu = () => import('components/dep-management/weihu/menhuweihu/paishuiguanwangweihu')

// 供水管网数据
const gongshuiguanwang = () => import('components/dep-management/plan/gongshuiguanwang')

// 供水管网维护
const gongshuiguanwangweihu = () => import('components/dep-management/weihu/menhuweihu/gongshuiguanwangweihu')

// 下沉隧道数据
const xiachensuidao = () => import('components/dep-management/plan/xiachensuidao')

// 水文站
const shuiwen = () => import('components/dep-management/plan/shuiwen')

// 水文新增
const shuiwenweihu = () => import('components/dep-management/weihu/menhuweihu/shuiwenweihu')

// 构建
const goujian = () => import('components/dep-management/plan/goujian')

// 构建新增
const goujianweihu = () => import('components/dep-management/weihu/menhuweihu/goujianweihu')

// 排水口
const paishuikou = () => import('components/dep-management/plan/paishuikou')

// 排水口维护
const paishuikouweihu = () => import('components/dep-management/weihu/menhuweihu/paishuikouweihu')

// 警戒
const jingjie = () => import('components/dep-management/plan/jingjie')

// 商场新增
const shangchangweihu = () => import('components/dep-management/weihu/menhuweihu/shangchangweihu')

// 客运站新增
const keyunzhanweihu = () => import('components/dep-management/weihu/menhuweihu/keyunzhanweihu')

// 医院新增
const yiyuanweihu = () => import('components/dep-management/weihu/menhuweihu/yiyuanweihu')

// 银行
const yinhan = () => import('components/dep-management/plan/yinhan')

// 银行新增
const yinhanweihu = () => import('components/dep-management/weihu/menhuweihu/yinhanweihu')

// 下沉隧道weihu
const xiachensuidaoweihu = () => import('components/dep-management/weihu/menhuweihu/xiachensuidaoweihu')

// 通讯录管理
const AddressBook = () => import('components/daily-office/address-book')

// 通知公告
const Notice = () => import('components/daily-office/notice')

// 通知公告-详情
const NoticeDetails = () => import('components/daily-office/notice-details')

// 短信管理
const NoteMgr = () => import('components/daily-office/note-management')

// 资料管理
const DataMgr = () => import('components/daily-office/data-management')

// 专题订阅管理
const ThematicInformation = () => import('components/daily-office/thematic-information')

// 系统应用资料
const SystemApplicationData = () => import('components/daily-office/system-application-data')

// 传真管理
const FaxManagement = () => import('components/daily-office/fax-management')

// 三防工作安排
const OfficeManagement = () => import('components/daily-office/office-management')

// 值班人员管理
const Personnel = () => import('components/daily-office/duty-management/personnel')

// 值班日志
const Journal = () => import('components/daily-office/duty-management/journal')

// 收文处理
const Addressee = () => import('components/daily-office/official-document/addressee')

// 发文处理
const Post = () => import('components/daily-office/official-document/post')

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
const release = () => import('components/system-management/release')

// 内容编辑
const editage = () => import('components/system-management/editage')

// 审批
const shenpi = () => import('components/system-management/shenpi')

// 三防快报管理
const latter = () => import('components/system-management/latter')

// 现场上报管理
const sceneReported = () => import('components/system-management/scene-reported')

// 文章管理
const article = () => import('components/system-management/article')

// 文件管理
const file = () => import('components/system-management/file')

// 模板管理
const template = () => import('components/system-management/template')

// 报表日志
const rptlog = () => import('components/tab-summary/rptlog/rptlog')

// 应急响应申请
const normalhome = () => import('components/three-command/normal/normal-home')

// 应急响应列表
const responseapplist = () => import('components/three-command/responseapplist')

const router = new Router({
  routes: [{
    path: '*',
    redirect: '/'
  }, {
    path: '/',
    component: Login,
    meta: {
      nologin: true
    },
    name: 'login'
  }, {
    path: '/notice-details/:id',
    component: NoticeDetails
  }, {
    path: '/home',
    redirect: '/home/default',
    component: Home,
    children: [
      {
        path: '/home/default',
        component: HomeDefault
      }, {
        path: '/home/threeBusiness',
        redirect: '/home/threeBusiness/threeBusinessDefault',
        component: ThreeBusiness,
        children: [
        // 预案管理
          {
            path: '/home/threeBusiness/threeBusinessDefault',
            component: ThreeBusinessDefault
          }, {
            path: '/home/threeBusiness/threeBusinessCommunity',
            component: ThreeBusinessCommunity
          }, {
            path: '/home/threeBusiness/threeBusinessTopic',
            component: ThreeBusinessTopic
          }, {
            path: '/home/threeBusiness/threeBusinessApproval',
            component: ThreeBusinessApproval
          }, {
            path: '/home/threeBusiness/erp_default',
            redirect: '/home/threeBusiness/er_plan/general',
            component: erpDefault,
            children: [
              {
                path: '/home/threeBusiness/er_plan/general',
                component: general
              }, {
                path: '/home/threeBusiness/er_plan/organization',
                component: organization
              }, {
                path: '/home/threeBusiness/er_plan/warning',
                component: warning
              }, {
                path: '/home/threeBusiness/er_plan/security',
                component: security
              }, {
                path: '/home/threeBusiness/er_plan/er_action',
                component: erAction
              }, {
                path: '/home/threeBusiness/er_plan/aftermath',
                component: aftermath
              }, {
                path: '/home/threeBusiness/er_plan/taskActive',
                component: taskActive
              }, {
                path: '/home/threeBusiness/er_plan/training',
                component: training
              }, {
                path: '/home/threeBusiness/er_plan/transfer',
                component: transfer
              }, {
                path: '/home/threeBusiness/er_plan/dataTable',
                component: dataTable
              }, {
                path: '/home/threeBusiness/er_plan/eventManagement',
                component: eventManagement
              }, {
                path: '/home/threeBusiness/er_plan/seans',
                component: seans
              }
            ]
          }, // 演练管理
          {
            path: '/home/threeBusiness/prPlan',
            component: prPlan
          }, {
            path: '/home/threeBusiness/prTask',
            component: prTask
          }, {
            path: '/home/threeBusiness/prRole',
            component: prRole
          }, {
            path: '/home/threeBusiness/prData',
            component: prData
          }, {
            path: '/home/threeBusiness/prReport',
            component: prReport
          }, // 智慧分析管理
          {
            path: '/home/threeBusiness/dataModel',
            component: dataModel
          }, {
            path: '/home/threeBusiness/historyData',
            component: historyData
          }, // 应急响应
          {
            path: '/home/threeBusiness/erManagement',
            component: erManagement
          }, {
            path: '/home/threeBusiness/erLevel',
            component: erLevel
          }, {
            path: '/home/threeBusiness/erCard',
            component: erCard
          }, {
            path: '/home/threeBusiness/participants',
            component: participants
          }, {
            path: '/home/threeBusiness/daily-record',
            component: dailyRecord
          }, // 任务管理
          {
            path: '/home/threeBusiness/psTask',
            component: psTask
          },
          {
            path: '/home/threeBusiness/magTask',
            component: magTask
          },
          {
            path: '/home/threeBusiness/employment/:name/:code/:depName/:level',
            component: TaslEmployment
          }
        ]
      }, // 部门管理
      {
        path: '/home/depManagement',
        component: depManagement,
        redirect: '/home/depManagement/definition',
        children: [
          {
            path: '/home/depManagement/dataReport',
            component: dataReport
          },
          {
            path: '/home/depManagement/dataAfterReport',
            component: dataAfterReport
          },
          {
            path: '/home/depManagement/deplist',
            component: deplist
          }, {
            path: '/home/depManagement/Employment',
            component: Employment
          }, {
            path: '/home/depManagement/Listsean',
            component: Listsean
          },
          {
            path: '/home/depManagement/temporary',
            component: temporary
          },
          {
            path: '/home/depManagement/deplist/addpage',
            component: addpage
          },
          {
            path: '/home/depManagement/deplist/temporarypage',
            component: temporarypage
          },
          {
            path: '/home/depManagement/Employment/lypage',
            component: lypage
          },
          {
            path: '/home/depManagement/Employment/Report',
            component: Report
          },
          {
            path: '/home/depManagement/Listsean/seans',
            component: seans
          },
          {
            path: '/home/depManagement/relist',
            component: relist
          }, {
            path: '/home/depManagement/definition',
            component: definition
          }, {
            path: '/home/depManagement/Library',
            component: Library
          }, {
            path: '/home/depManagement/address',
            component: address
          },
          {
            path: '/home/depManagement/school',
            component: school
          },
          {
            path: '/home/depManagement/school/schoolweihu',
            component: schoolweihu
          },
          {
            path: '/home/depManagement/dizhizaihai',
            component: dizhizaihai
          },
          {
            path: '/home/depManagement/dizhizaihai/dizhizaihaiweihu',
            component: dizhizaihaiweihu
          },
          {
            path: '/home/depManagement/shuiku',
            component: shuiku
          }, {
            path: '/home/depManagement/shuiku/shuikuweihu',
            component: shuikuweihu
          }, {
            path: '/home/depManagement/hillpool',
            component: hillpool
          },
          {
            path: '/home/depManagement/hillpool/shantangweihu',
            component: shantangweihu
          },
          {
            path: '/home/depManagement/derstam',
            component: derstam
          },
          {
            path: '/home/depManagement/derstam/derstamadd',
            component: derstamadd
          },
          {
            path: '/home/depManagement/tiwei',
            component: tiwei
          }, {
            path: '/home/depManagement/tiwei/tiweiweihu',
            component: tiweiweihu
          }, {
            path: '/home/depManagement/jiangxin',
            component: jiangxin
          }, {
            path: '/home/depManagement/jiangxin/jiangxinweihu',
            component: jiangxinweihu
          }, {
            path: '/home/depManagement/waitandi',
            component: waitandi
          }, {
            path: '/home/depManagement/waitandi/waitandiweihu',
            component: waitandiweihu
          }, {
            path: '/home/depManagement/tishan',
            component: tishan
          }, {
            path: '/home/depManagement/tishan/tishanweihu',
            component: tishanweihu
          }, {
            path: '/home/depManagement/ctgd',
            component: ctgd
          }, {
            path: '/home/depManagement/ctgd/chuantiguandaoweihu',
            component: chuantiguandaoweihu
          }, {
            path: '/home/depManagement/matou',
            component: matou
          }, {
            path: '/home/depManagement/matou/matouweihu',
            component: matouweihu
          }, {
            path: '/home/depManagement/qiaoliang',
            component: qiaoliang
          }, {
            path: '/home/depManagement/qiaoliang/qiaoliangweihu',
            component: qiaoliangweihu
          }, {
            path: '/home/depManagement/jingdian',
            component: jingdian
          }, {
            path: '/home/depManagement/jingdian/jingdianweihu',
            component: jingdianweihu
          }, {
            path: '/home/depManagement/sanpeng',
            component: sanpeng
          }, {
            path: '/home/depManagement/sanpeng/sanpengweihu',
            component: sanpengweihu
          }, {
            path: '/home/depManagement/dl',
            component: dl
          }, {
            path: '/home/depManagement/dl/diweihu',
            component: diweihu
          }, {
            path: '/home/depManagement/gongdi',
            component: gongdi
          }, {
            path: '/home/depManagement/gongdi/gongdiweihu',
            component: gongdiweihu
          }, {
            path: '/home/depManagement/weixians',
            component: weixians
          }, {
            path: '/home/depManagement/weixians/weixianweihu',
            component: weixianweihu
          }, {
            path: '/home/depManagement/zhongysb',
            component: zhongysb
          }, {
            path: '/home/depManagement/zhongysb/zhongysbweihu',
            component: zhongysbweihu
          }, {
            path: '/home/depManagement/weifang',
            component: weifang
          }, {
            path: '/home/depManagement/weifang/weifangweihu',
            component: weifangweihu
          }, {
            path: '/home/depManagement/cangku',
            component: cangku
          }, {
            path: '/home/depManagement/cangku/cangkuweihu',
            component: cangkuweihu
          }, {
            path: '/home/depManagement/qixiang',
            component: qixiang
          }, {
            path: '/home/depManagement/qixiang/qixiangweihu',
            component: qixiangweihu
          }, {
            path: '/home/depManagement/neilao',
            component: neilao
          }, {
            path: '/home/depManagement/neilao/neilaoweihu',
            component: neilaoweihu
          }, {
            path: '/home/depManagement/changsuo',
            component: changsuo
          }, {
            path: '/home/depManagement/changsuo/changsuoweihu',
            component: changsuoweihu
          }, {
            path: '/home/depManagement/hanza',
            component: hanza
          }, {
            path: '/home/depManagement/hanza/hanzaweihu',
            component: hanzaweihu
          }, {
            path: '/home/depManagement/benzhan',
            component: benzhan
          }, {
            path: '/home/depManagement/benzhan/benzhanweihu',
            component: benzhanweihu
          }, {
            path: '/home/depManagement/fish',
            component: fish
          }, {
            path: '/home/depManagement/fish/fishweihu',
            component: fishweihu
          }, {
            path: '/home/depManagement/shuiwang',
            component: shuiwang
          }, {
            path: '/home/depManagement/shangchang',
            component: shangchang
          }, {
            path: '/home/depManagement/keyunzhan',
            component: keyunzhan
          }, {
            path: '/home/depManagement/yiyuan',
            component: yiyuan
          }, {
            path: '/home/depManagement/yinhan',
            component: yinhan
          }, {
            path: '/home/depManagement/jiuyuan',
            component: jiuyuan
          }, {
            path: '/home/depManagement/paishuisheshi',
            component: paishuisheshi
          }, {
            path: '/home/depManagement/gongshuisheshi',
            component: gongshuisheshi
          }, {
            path: '/home/depManagement/gongshuishebei',
            component: gongshuishebei
          }, {
            path: '/home/depManagement/wushuichang',
            component: wushuichang
          }, {
            path: '/home/depManagement/zilaishui',
            component: zilaishui
          }, {
            path: '/home/depManagement/paishuiguanwang',
            component: paishuiguanwang
          }, {
            path: '/home/depManagement/gongshuiguanwang',
            component: gongshuiguanwang
          }, {
            path: '/home/depManagement/xiachensuidao',
            component: xiachensuidao
          }, {
            path: '/home/depManagement/shuiwen',
            component: shuiwen
          }, {
            path: '/home/depManagement/goujian',
            component: goujian
          }, {
            path: '/home/depManagement/paishuikou',
            component: paishuikou
          }, {
            path: '/home/depManagement/jingjie',
            component: jingjie
          }, {
            path: '/home/depManagement/shangchang/shangchangweihu',
            component: shangchangweihu
          }, {
            path: '/home/depManagement/keyunzhan/keyunzhanweihu',
            component: keyunzhanweihu
          }, {
            path: '/home/depManagement/yiyuan/yiyuanweihu',
            component: yiyuanweihu
          }, {
            path: '/home/depManagement/yinhan/yinhanweihu',
            component: yinhanweihu
          }, {
            path: '/home/depManagement/xiachensuidao/xiachensuidaoweihu',
            component: xiachensuidaoweihu
          }, {
            path: '/home/depManagement/shuiwen/shuiwenweihu',
            component: shuiwenweihu
          }, {
            path: '/home/depManagement/goujian/goujianweihu',
            component: goujianweihu
          }, {
            path: '/home/depManagement/paishuikou/paishuikouweihu',
            component: paishuikouweihu
          }, {
            path: '/home/depManagement/jiuyuan/jiuyuanweihu',
            component: jiuyuanweihu
          }, {
            path: '/home/depManagement/paishuisheshi/paishuisheshiweihu',
            component: paishuisheshiweihu
          }, {
            path: '/home/depManagement/gongshuisheshi/gongshuisheshiweihu',
            component: gongshuisheshiweihu
          }, {
            path: '/home/depManagement/gongshuishebei/gongshuishebeiweihu',
            component: gongshuishebeiweihu
          }, {
            path: '/home/depManagement/wushuichang/wushuichangweihu',
            component: wushuichangweihu
          }, {
            path: '/home/depManagement/zilaishui/zilaishuiweihu',
            component: zilaishuiweihu
          }, {
            path: '/home/depManagement/paishuiguanwang/paishuiguanwangweihu',
            component: paishuiguanwangweihu
          }, {
            path: '/home/depManagement/gongshuiguanwang/gongshuiguanwangweihu',
            component: gongshuiguanwangweihu
          }, {
            path: '/home/depManagement/shuiwang/shuiwangweihu',
            component: shuiwangweihu
          }
        ]
      }, // 日常办公
      {
        path: '/home/dailyOffice',
        redirect: '/home/dailyOffice/addressBook',
        component: DailyOffice,
        children: [
          {
            path: '/home/dailyOffice/addressBook',
            component: AddressBook
          },
          {
            path: '/home/dailyOffice/notice',
            component: Notice
          },
          {
            path: '/home/dailyOffice/dataManagement',
            component: DataMgr
          },
          {
            path: '/home/dailyOffice/noteManagement',
            component: NoteMgr
          },
          {
            path: '/home/dailyOffice/thematicInformation',
            component: ThematicInformation
          },
          {
            path: '/home/dailyOffice/systemApplicationData',
            component: SystemApplicationData
          },
          {
            path: '/home/dailyOffice/addressee',
            component: Addressee
          },
          {
            path: '/home/dailyOffice/post',
            component: Post
          },
          {
            path: '/home/dailyOffice/faxManagement',
            component: FaxManagement
          },
          {
            path: '/home/dailyOffice/personnel',
            component: Personnel
          },
          {
            path: '/home/dailyOffice/journal',
            component: Journal
          },
          {
            path: '/home/dailyOffice/officeManagement',
            component: OfficeManagement
          }
        ]
      },
      // 报表汇总
      {
        path: '/home/tab-summary',
        component: TabSummary,
        redirect: '/home/tab-summary/emergency-person',
        children: [{
          path: '/home/tab-summary/transfer-statistical',
          component: Transfer
        }, {
          path: '/home/tab-summary/affected-statistical',
          component: Affected
        }, {
          path: '/home/tab-summary/defense-statistical',
          component: Defense
        }, {
          path: '/home/tab-summary/national-flood',
          component: NationalFlood
        }, {
          path: '/home/tab-summary/summary',
          component: Summary
        }, {
          path: '/home/tab-summary/emergency-measure',
          component: Measure
        }, {
          path: '/home/tab-summary/emergency-person',
          component: EmergencyPerson
        }, {
          path: '/home/tab-summary/typhoon-statistical',
          component: Typhoon
        }, {
          path: '/home/tab-summary/typhoonFlood-statistical',
          component: TyphoonFlood
        }, {
          path: '/home/tab-summary/rainDefense-statistical',
          component: RainDefense
        }, {
          path: '/home/tab-summary/disaster-statistical',
          component: Disaster
        }, {
          path: '/home/tab-summary/disasterRelief-statistical',
          component: DisasterRelief
        }, {
          path: '/home/tab-summary/rainstorm-statistical',
          component: Rainstorm
        }, {
          path: '/home/tab-summary/data-report-log',
          component: Datareportlog
        }, {
          path: '/home/tab-summary/temporary-report-statistical',
          component: TemporaryReport
        },
        {
          path: '/home/tab-summary/message-statistical',
          component: Message
        }, {
          path: '/home/tab-summary/warning-statistical',
          component: WarningTable
        }, {
          path: '/home/tab-summary/weather-statistical',
          component: weather
        }, {
          path: '/home/tab-summary/product-statistical',
          component: product
        }, {
          path: '/home/tab-summary/water-statistical',
          component: water
        }, {
          path: '/home/tab-summary/work-statistical',
          component: work
        }, {
          path: '/home/tab-summary/environment-statistical',
          component: environment
        }, {
          path: '/home/tab-summary/predict-statistical',
          component: predict
        }, {
          path: '/home/tab-summary/info-statistical',
          component: info
        }, {
          path: '/home/tab-summary/report-template',
          component: reportTemplate
        }, {
          path: '/home/tab-summary/report-weather',
          component: reportWeather
        }, {
          path: '/home/tab-summary/report-flood',
          component: reportFlood
        }, {
          path: '/home/tab-summary/report-typhoon',
          component: reportTyphoon
        }, {
          path: '/home/tab-summary/report-history',
          component: reportHistory
        }, {
          path: '/home/tab-summary/rptlog',
          component: rptlog
        }]
      }, // 移动管理
      {
        path: '/home/moveManagement',
        component: MoveManagement,
        redirect: '/home/moveManagement/patrol-plan',
        children: [{
          path: '/home/moveManagement/alerts-management',
          component: AlertsMag
        },
        {
          path: '/home/moveManagement/patrol-plan',
          component: PatrolPlan
        }, {
          path: '/home/moveManagement/patrol-record',
          component: PatrolRecord
        }]
      }, // 系统管理
      {
        path: '/home/systemManagement',
        component: SystemManagement,
        redirect: '/home/systemManagement/usermanage',
        children: [{
          path: '/home/systemManagement/usermanage',
          component: Usermanage
        },
        {
          path: '/home/systemManagement/roleManage',
          component: RoleManage
        },
        {
          path: '/home/systemManagement/mokuaiguanli',
          component: mokuaiguanli
        },
        {
          path: '/home/systemManagement/bumenlist',
          component: bumenlist
        }, {
          path: '/home/systemManagement/rizhi',
          component: rizhi
        }, {
          path: '/home/systemManagement/release',
          component: release
        }, {
          path: '/home/systemManagement/editage',
          component: editage
        }, {
          path: '/home/systemManagement/shenpi',
          component: shenpi
        }, {
          path: '/home/systemManagement/latter',
          component: latter
        }, {
          path: '/home/systemManagement/sceneReported',
          component: sceneReported
        }, {
          path: '/home/systemManagement/article',
          component: article
        }, {
          path: '/home/systemManagement/file',
          component: file
        }, {
          path: '/home/systemManagement/template',
          component: template
        }

        ]
      },
      // 指挥一张图
      {
        path: '/home/threeCommand',
        component: ThreeCommand,
        children: [{
          path: '/home/threeCommand/responseapply',
          component: normalhome
        }, {
          path: '/home/threeCommand/responseapplist',
          component: responseapplist
        }]
      }
    ]
  }
  ]
})

const isRole = (path) => {
  let isBreak = false
  let id = ''

  for (let i = 0; i < routesRelyonId.length; i++) {
    const item = routesRelyonId[i].paths

    for (let index = 0; index < item.length; index++) {
      if (item[index] === path) {
        isBreak = true
        break
      }
      if (item[index].indexOf('_custom_path') >= 0) {
        const arr = item[index].split('_custom_path')
        if (path.indexOf(arr[0]) >= 0) {
          isBreak = true
          break
        }
      }
    }
    if (isBreak) {
      id = routesRelyonId[i].id
      break
    }
  }

  if (store.getters.Role[id]) {
    return true
  } else {
    return false
  }
}
// console.log(isRole)
router.beforeEach((from, to, next) => {
  // next()
  if (from.path === '/') {
    next()
  } else {
    if (options().headers.token) {
      if (store.getters.Role === null) {
        permissionsApi().then(res => {
          if (res.code === ERR_OK) {
            store.commit('SET_ROLE', res.result.result)
            if (!isRole(from.path)) {
              next('/')
            } else {
              next()
            }
          } else {
            next('/')
          }
        })
      } else {
        if (!isRole(from.path)) {
          next('/')
        } else {
          next()
        }
      }
    } else {
      next('/')
    }
  }
})

export default router
