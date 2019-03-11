<template>
  <div class="default">

    <div class="default-top">
      <div class="top-left clear">
        <div class="response pull-left">
          <div class="img">
            <div class="img-wrapper">
              <img src="./img/topleft.png" alt="">
              <!-- <img src="./img/topone.png" alt="">
              <div>应急响应信息</div> -->
            </div>
          </div>
          <div class="info">
            <div class="info-wrapper">
              {{responseText || '暂无'}}
            </div>
          </div>
        </div>

        <div class="remind pull-left">
          <div class="img">
            <div class="img-wrapper">
              <img src="./img/bottomright.png" alt="">
              <!-- <img src="./img/topright.png" alt=""> -->
              <!-- <img src="./img/toptwo.png" alt="">
              <div>任务执行提醒</div> -->
            </div>
          </div>
          <div class="info">
            <div class="info-wrapper">
              <div class="remind-list">
                <div class="remind-list-wrapper">
                  <div
                    v-for="(item, index) in taskInfo"
                    class="remind-detail"
                    :key="index"
                    @click="taskMsgJump(item)" >
                    <span>{{item.department_name}}</span>
                    <span>[{{item.task_type}}]</span>
                    <span>： </span>
                    <span>{{item.task_profile}}</span>
                    <br/>
                    <span> 应急响应编号： </span>
                    <span>{{item.response_no}}</span>
                  </div>
                </div>
              </div>

              <div
                v-if="taskMoreShow"
                class="remind-more"
                @click='more("task")'>
                更多 >>
              </div>
            </div>
          </div>
        </div>

        <div class="instructions pull-left">
          <div class="img">
            <div class="img-wrapper">
              <img src="./img/topright.png" alt="">
              <!-- <img src="./img/bottomleft.png" alt=""> -->
              <!-- <img src="./img/topthree.png" alt="">
              <div>指令执行情况提醒</div> -->
            </div>
          </div>
          <div class="info">
            <div class="info-wrapper">
              <div class="instructions-list">
                <div class="instructions-list-wrapper">
                  <div
                    v-if="messageQueueInfo.length"
                    v-for="(item, index) in messageQueueInfo"
                    class="instructions-detail"
                    :key="index">
                    <span>{{item.department_name}}</span>
                    <span>： </span>
                    <span>{{item.text}}</span>
                  </div>
                </div>
              </div>

              <div
                v-if="instructMoreShow"
                class="instructions-more"
                @click='more("instruct")'>
                更多 >>
              </div>
            </div>

          </div>
        </div>

        <div class="data pull-left">
          <div class="img">
            <div class="img-wrapper">
              <img src="./img/bottomleft.png" alt="">
              <!-- <img src="./img/bottomright.png" alt=""> -->
              <!-- <img src="./img/topfour.png" alt="">
              <div>数据上报日志</div> -->
            </div>
          </div>
          <div class="info">
            <div class="info-wrapper">
              <div class="data-list">
                <div class="data-list-wrapper">
                  <div
                    v-for="(item, index) in rpdataArray"
                    class="data-detail"
                    :key="index">
                    <span>{{item.response_no}}</span>
                    <span>上报时间: </span>
                    <span>{{item.logtime}}</span>
                  </div>
                </div>
              </div>

              <div class="data-more" @click="jumpmorepath">
                更多 >>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="top-right">
        <div class="top-rightTitle">
          <div class="titleBlock"></div>
					<div class="title">通知公告</div>
				</div>

				<div class="top-rightContent">
					<div class="notice-content">
						<div class="notice-loading" v-if="loadingShow">
							<command-loading></command-loading>
						</div>
						<ul class="notice-list">
							<li
                v-for="(item,index) in noticeInfo"
                class="notice-detail"
                :key="index">
								<span class="round"></span>
								<a a
                  class="clear"
                  href="javascript:;"
                  @click="jump(item)">
									<span>{{item.title}}</span>
									<span class="pull-right time">{{item.releasedt}}</span>
								</a>
							</li>
						</ul>
            <div class="notice-page">
              <Page :total="total" @on-change="pageChange" show-total></Page>
            </div>
					</div>
				</div>
      </div>
    </div>

    <div class="default-bottom">
      <div class="bottom-title">
        <div class="titleBlock"></div>
        <div class="title">我的订阅</div>
      </div>
      <div class="bottom-content">
        <ul class="subscribe-list clear">
          <li v-if="weatherWarningShow" class="subscribe-detail pull-left">
            <weather-warning></weather-warning>
          </li>
          <li v-if="weatherForecastShow" class="subscribe-detail pull-left">
            <weather-forecast></weather-forecast>
          </li>
          <li v-if="currentWaterShow" class="subscribe-detail pull-left">
            <current-water></current-water>
          </li>
          <li v-if="typhoonPathShow" class="subscribe-detail pull-left">
            <typhoon-path></typhoon-path>
          </li>
          <li v-if="addresseeRemindShow" class="subscribe-detail pull-left">
            <adressee-remind></adressee-remind>
          </li>
          <li v-if="precipitationStationShow" class="subscribe-detail pull-left">
            <precipitation-station></precipitation-station>
          </li>
          <li v-if="warningRemindShow" class="subscribe-detail pull-left">
            <warning-remind></warning-remind>
          </li>
        </ul>
      </div>
    </div>

		<!-- 点击更多 -->
		<Modal
      v-model="visible"
      class-name="modal more defaultModal"
      :title="modalTitle"
      @on-ok="ok"
      @on-cancel="cancel">
			<li class="msgActive" v-if="task" v-for='(item,index) in taskInfoList' :key="index" @click="taskMsgJump(item)">
				<span class="">{{item.department_name}}</span>
				<span>[{{item.task_type}}]</span>
				<span> ：</span>
				<span>{{item.task_profile}}</span>
				<span>， 应急响应编号： </span>
				<span>{{item.response_no}}</span>
			</li>
			<li v-if="instruct" v-for='(item,index) in messageQueueInfoList' :key="index">
				<span class="departmentName">{{item.department_name}} ：</span>
				<span>{{item.text}}</span>
			</li>
			<div class="tableBox">
				<table class="tableDefaule" v-if="disaster">
					<tr class="fiexd">
						<td class="label">部门</td>
						<td class="label">应急响应编号</td>
						<td class="label">上报损失事项</td>
						<td class="label">死亡人数</td>
						<td class="label">受伤人数</td>
						<td class="label">损失（元）</td>
					</tr>
					<tr v-for='(item,index) in disasterInfoList' :key="index">
						<td>{{item.department_name}}</td>
						<td>{{item.response_no}}</td>
						<td>{{item.disaster_type}}</td>
						<td>{{item.death}}</td>
						<td>{{item.injury}}</td>
						<td>{{item.disaster_loss}}</td>
					</tr>
				</table>
			</div>
		</Modal>

	</div>

</template>

<script>
import { getUserIng } from 'common/js/util'
import { getLocalStorage, errorNotice } from 'common/js/dom'
import { response, taskRemind, warningNotice, messageQueue, disasterStatistics } from 'api/home'
import { noticeApi, topicInfo } from 'api/daily-office'
import { rpdataApi } from 'api/tab-summary'
import { mapMutations } from 'vuex'
import WeatherWarning from './WeatherWarning.vue'
import CurrentWater from './CurrentWater.vue'
import WeatherForecast from './WeatherForecast.vue'
import TyphoonPath from './TyphoonPath.vue'
import AdresseeRemind from './adresseeRemind.vue'
import PrecipitationStation from './precipitationStation.vue'
import WarningRemind from './warningRemind.vue'
import CommandLoading from 'base/loading/command-loading'

export default {
  components: {
    WeatherWarning,
    CurrentWater,
    WeatherForecast,
    TyphoonPath,
    AdresseeRemind,
    PrecipitationStation,
    WarningRemind,
    CommandLoading
  },
  data () {
    return {
      rpdataArray: [],
      taskReportNo: '',
      disReportNo: '',
      instructReportNo: '',
      responseLoadingShow: true,
      warningLoadingShow: true,
      taskLoadingShow: true,
      messageLoadingShow: true,
      disasterLoadingShow: true,
      topicList: [],
      loadingShow: true,
      taskMoreShow: true,
      disasterMoreShow: true,
      instructMoreShow: true,
      pageSize: 1,
      total: 0,
      task: false,
      instruct: false,
      disaster: false,
      visible: false,
      taskInfo: [],
      taskInfoList: [],
      responseText: '',
      modalTitle: '',
      warningNoticeInfo: '',
      noticeInfo: [],
      messageQueueInfo: [],
      messageQueueInfoList: [],
      disasterInfo: [],
      disasterInfoList: [],
      postObj: {
        page: 1,
        pageSize: 10,
        searchValue: {
          status: '发布'
        },
        order: {
          _id: -1
        }
      },
      affectedList: {},
      weatherForecastShow: false,
      weatherWarningShow: false,
      currentWaterShow: false,
      typhoonPathShow: false,
      addresseeRemindShow: false,
      precipitationStationShow: false,
      warningRemindShow: false
    }
  },
  created () {
    this.getTopICInfo()
    this.getResponseInfo()
    this.getWarningNotice()
    this.getNotice(1)
    this.getTaskRemind()
    this.getMessageQueue()
    this.getDisaster()
    this._rpdataApi()
  },
  methods: {
    // 数据日志上报
    _rpdataApi (page, search) {
      rpdataApi(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.rpdataArray = res.result.result[0]
          var arr = []
          arr.push(this.rpdataArray)
          this.rpdataArray = arr
        }
      })
    },
    // 页面跳转
    jumpmorepath () {
      this.$router.push('/home/tab-summary/data-report-log')
    },
    // 任务执行提醒跳转
    taskMsgJump (value) {
      this.SET_MESSAGEID(value)
      getLocalStorage('formPath', '/home/default')
      this.$router.push('/home/threeBusiness/magTask')
      this.SET_STATUS(true)
      let activeObj = getLocalStorage('active')
      activeObj.first = '1-3'
      activeObj.third = '3-1'
      getLocalStorage('active', activeObj)
    },
    // 获得订阅信息
    getTopICInfo () {
      let obj = {
        searchValue: {
          userid: getLocalStorage('info').userid
        }
      }
      topicInfo('list', obj).then(res => {
        if (res.code === '0000') {
          if (res.result.result && res.result.result.length) {
            this.topicList = res.result.result[0].subscriptions
            this.topicList.map(item => {
              switch (item) {
                case '天气预报':
                  this.weatherWarningShow = true
                  break
                case '天气预警':
                  this.weatherForecastShow = true
                  break
                case '当前水位':
                  this.currentWaterShow = true
                  break
                case '台风路径':
                  this.typhoonPathShow = true
                  break
                case '收文提醒':
                  this.addresseeRemindShow = true
                  break
                case '雨量站':
                  this.precipitationStationShow = true
                  break
                case '系统警告信息':
                  this.warningRemindShow = true
                  break

                default:
                  break
              }
            })
          }
        }
      })
    },
    pageChange (index) {
      this.postObj.page = index
      this.getNotice()
    },
    jump (obj) {
      // this.$router.push(`/notice-details/${obj._id}`)
      window.open(`${window.location.pathname}#/notice-details/${obj._id}`)
      // this.SET_STATUS(true)
      // this.SET_NOTICEID(obj)
      // let activeObj = getLocalStorage('active')
      // activeObj.first = 4
      // activeObj.third = '2'
      // getLocalStorage('active', activeObj)
    },
    ...mapMutations([
      'SET_NOTICEID',
      'SET_STATUS',
      'SET_MESSAGEID'
    ]),
    ok () {},
    cancel () { },
    // 点击更多
    more (value) {
      this.visible = true
      if (value === 'task') {
        this.task = true
        this.instruct = false
        this.disaster = false
        this.modalTitle = '任务执行提醒'
      } else if (value === 'instruct') {
        this.modalTitle = '指令执行情况提醒'
        this.instruct = true
        this.task = false
        this.disaster = false
      } else if (value === 'disaster') {
        this.disaster = true
        this.task = false
        this.instruct = false
        this.modalTitle = '灾情统计上报'
      }
    },
    // 应急响应信息
    getResponseInfo () {
      this.responseLoadingShow = true
      response().then(res => {
        this.responseLoadingShow = false
        if (res.code === ERR_OK) {
          if (res.result && res.result.length) {
            let arr = []
            res.result.map(item => {
              arr.push(item.response_type + item.response_level)
            })
            this.responseText = arr.join(',')
          } else {
            this.responseText = '暂无信息'
          }
        }
      })
    },
    // 预警公告
    getWarningNotice () {
      this.warningLoadingShow = true
      warningNotice().then(res => {
        this.warningLoadingShow = false
        if (res.code === ERR_OK) {
          // let currentInfo = res.result.result.map(item => {
          //   let arr = []
          //   arr.push(item.description)
          //   return arr
          // })
        // this.warningNoticeInfo = currentInfo.join(',')
          if (res.result.result.length) {
            this.warningNoticeInfo = res.result.result[0].headline
          }
        }
      })
    },
    // 通知公告
    getNotice () {
      this.loadingShow = true
      noticeApi('list', this.postObj).then(res => {
        this.loadingShow = false
        if (res) {
          if (res.code === '0000') {
            this.noticeInfo = res.result.result
            this.total = res.result.totalSize
            this.pageSize = Math.ceil(this.total / 10)
          } else {
            errorNotice('服务器未连接，')
          }
        }
      })
    },
    // 任务执行提醒
    getTaskRemind () {
      this.taskLoadingShow = true
      taskRemind().then(res => {
        this.taskLoadingShow = false
        if (res.code === ERR_OK) {
          this.taskInfoList = res.result.result
          if (this.taskInfoList && this.taskInfoList.length) {
            this.taskReportNo = res.result.result[0].response_no
          }
          if (this.taskInfoList.length !== 0 && this.taskInfoList.length > 1) {
            this.taskInfo.push(this.taskInfoList[0])
            this.taskInfo.push(this.taskInfoList[1])
          } else if (this.taskInfoList.length === 1) {
            this.taskInfo = this.taskInfoList
            this.taskMoreShow = false
          }
        }
      })
    },
    // 指令执行情况提醒
    getMessageQueue () {
      this.messageLoadingShow = true
      let obj = {}
      if (getUserIng().department_code !== '0101') {
        obj = {
          'department_code': getUserIng().department_code,
          'messagecategory': '下发指令'
        }
      } else {
        obj = {
          'messagecategory': '下发指令'
        }
      }
      messageQueue(obj).then(res => {
        this.messageLoadingShow = false
        if (res.code === ERR_OK) {
          this.messageQueueInfoList = res.result.result.map(item => {
            item.content = JSON.parse(item.content)
            item.text = item.content['指令内容'].map(i => {
              let arr = []
              arr.push(i['指令详情'])
              return arr
            })
            item.text = item.text.join(',')
            return item
          })
          if (this.messageQueueInfoList.length !== 0 && this.messageQueueInfoList.length > 1) {
            this.instructReportNo = res.result.result[0].response_no
            this.messageQueueInfo.push(this.messageQueueInfoList[0])
            this.messageQueueInfo.push(this.messageQueueInfoList[1])
          } else if (this.messageQueueInfoList.length === 1) {
            this.messageQueueInfo = this.messageQueueInfoList
            this.instructMoreShow = false
          }
        }
      })
    },
    // 灾情统计上报
    getDisaster () {
      this.disasterLoadingShow = true
      disasterStatistics().then(res => {
        this.disasterLoadingShow = false
        if (res.code === ERR_OK) {
          if (getUserIng().department_code === '0101') {
            this.disasterInfoList = res.result.result
          } else {
            res.result.result.map(item => {
              if (item.department_name === getUserIng().department_name) {
                this.disasterInfoList.push(item)
              }
            })
          }
        }
        if (this.disasterInfoList.length !== 0 && this.disasterInfoList.length > 1) {
          this.disReportNo = res.result.result[0].response_no
          this.disasterInfo.push(this.disasterInfoList[0])
          this.disasterInfo.push(this.disasterInfoList[1])
        } else if (this.disasterInfoList.length === 1) {
          this.disasterInfo = this.disasterInfoList
          this.disasterMoreShow = false
        }
      })
    },
    // 点击跳转
    footerrouter () {
      this.$router.push('/home/dailyOffice/thematicInformation')
    }
  }
}
</script>

<style scoped lang="scss">
	.default {
		width: 100%;
    height: 100%;
		padding: 10px;
    overflow: hidden;

    .default-top {
      width: 100%;
      height: calc(55% - 10px);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      .top-left {
        width: calc(70% - 10px);
        height: 100%;
        margin-right: 10px;
        .response,
        .remind,
        .instructions,
        .data {
          width: calc(50% - 5px);
          height: calc(50% - 5px);
          margin-right: 10px;
          margin-bottom: 10px;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          position: relative;
          > .img {
            width: 46%;
            height: 100%;
            position: relative;
            > .img-wrapper {
              width: 100%;
              text-align: center;
              height: 100%;
              position: relative;
              top: 50%;
              transform: translate3d(0, -50%, 0);
              > img {
                width: 100%;
                height: 100%;
              }
              // > div {
              //   margin-top: 8px;
              //   color: white;
              //   font-size: 14px;
              // }
            }
          }
          > .info {
            width: 65%;
            height: 100%;
            background-color: white;
            color: #666;
            position: relative;
          }
        }
        .remind,
        .data {
          margin-right: 0;
        }
        .instructions,
        .data {
          margin-bottom: 0;
        }
        .response {
          > .img {
            background-color: #f0454e;
          }
          > .info {
            > .info-wrapper {
              width: 100%;
              font-size: 18px;
              text-align: center;
              position: relative;
              top: 50%;
              transform: translate3d(0, -50%, 0);
              // cursor: pointer;
            }
          }
        }
        .remind {
          > .img {
            // background-color: #64d8e5;
            // width: 60%;
          }
          > .info {
            > .info-wrapper {
              width: 100%;
              height: 100%;
              position: relative;
              cursor: pointer;
              > .remind-list {
                position: absolute;
                top: 10px;
                bottom: 10px;
                left: 10px;
                right: 10px;
                > .remind-list-wrapper {
                  position: relative;
                  top: calc(50% - 10px);
                  transform: translate3d(0, -50%, 0);
                  > .remind-detail {
                    margin-bottom: 20px;
                    font-size: 12px;
                    &:nth-last-of-type(1) {
                      margin-bottom: 0
                    }
                  }
                }
              }
              > .remind-more {
                height: 20px;
                line-height: 20px;
                cursor: pointer;
                position: absolute;
                bottom: 10px;
                right: 10px;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
        .instructions {
          > .img {
            background-color: #3b8dde;
          }
          > .info {
            > .info-wrapper {
              width: 100%;
              height: 100%;
              position: relative;
              cursor: pointer;
              > .instructions-list {
                position: absolute;
                top: 10px;
                bottom: 10px;
                left: 10px;
                right: 10px;
                > .instructions-list-wrapper {
                  position: relative;
                  top: calc(50% - 10px);
                  transform: translate3d(0, -50%, 0);
                  > .instructions-detail {
                    margin-bottom: 20px;
                    font-size: 12px;
                    &:nth-last-of-type(1) {
                      margin-bottom: 0
                    }
                  }
                }
              }
              > .instructions-more {
                height: 20px;
                line-height: 20px;
                cursor: pointer;
                position: absolute;
                bottom: 10px;
                right: 10px;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
        .data {
          > .img {
            background-color: #febb3f;
          }
          > .info {
            > .info-wrapper {
              width: 100%;
              height: 100%;
              position: relative;
              // cursor: pointer;
              > .data-list {
                position: absolute;
                top: 10px;
                bottom: 10px;
                left: 10px;
                right: 10px;
                > .data-list-wrapper {
                  position: relative;
                  top: calc(50% - 10px);
                  transform: translate3d(0, -50%, 0);
                  > .data-detail {
                    margin-bottom: 20px;
                    font-size: 12px;
                    &:nth-last-of-type(1) {
                      margin-bottom: 0
                    }
                  }
                }
              }
              > .data-more {
                height: 20px;
                line-height: 20px;
                cursor: pointer;
                position: absolute;
                bottom: 10px;
                right: 10px;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
      .top-right {
        width: 30%;
        height: 100%;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        .top-rightTitle {
          height: 35px;
          color: #224ca5;
          font-size: 16px;
          font-weight: 700;
          padding-left: 10px;
          display: flex;
          > .titleBlock {
            width: 5px;
            height: 27px;
            background-color: rgb(34, 76, 165);
            margin-right: 5px;
          }
          > .title {
            flex: 1;
            height: 100%;
            line-height: 35px;
          }
        }
        .top-rightContent {
          width: 100%;
          height: calc(100% - 35px);
          overflow: hidden;
          .notice-content {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
            .notice-loading {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
            .notice-list {
              width: 100%;
              max-height: calc(100% - 50px);
              overflow: auto;
              margin-bottom: 9px;
              .notice-detail {
                padding: 0 10px;
                height: 35px;
                line-height: 35px;
                font-size: 14px;
                border-bottom: 1px solid #d5d5d5;
                .time {
                  font-size: 12px;
                  color: #959595;
                }
                .round {
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: #000;
                }
              }
            }
            .notice-page {
              display: inline-block;
              position: relative;
              left: 50%;
              transform: translate3d(-50%, 0, 0);
            }
          }
        }
      }
    }

    .default-bottom {
      width: 100%;
      height: 45%;
      background-color: white;
      border-radius: 8px;
      .bottom-title {
        height: 35px;
        color: #224ca5;
        font-size: 16px;
        font-weight: 700;
        padding-left: 10px;
        display: flex;
        > .titleBlock {
          width: 5px;
          height: 27px;
          background-color: rgb(34, 76, 165);
          margin-right: 5px;
        }
        > .title {
          flex: 1;
          height: 100%;
          line-height: 35px;
        }
      }
      .bottom-content {
        width: 100%;
        height: calc(100% - 35px);
        overflow: hidden;
        position: relative;
        .subscribe-list {
          width: 100%;
          height: 100%;
          padding: 10px;
          padding-top: 0;
          padding-right: 0;
          overflow: hidden;
          .subscribe-detail {
            width: calc(33.333333% - 10px);
            height: 100%;
            margin-right: 10px;
          }
        }
      }
    }

  }
</style>
