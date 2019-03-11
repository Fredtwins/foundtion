<template>
  <div class="thematic-information">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置： </span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>日常办公</BreadcrumbItem>
        <BreadcrumbItem>专题信息订阅管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="top">
        <div class="dingyue">我的订阅：</div>
        <div>
            <CheckboxGroup v-model="dataList">
                <Checkbox label="天气预报"></Checkbox>
                <Checkbox label="天气预警"></Checkbox>
                <Checkbox label="当前水位"></Checkbox>
                <Checkbox label="台风路径"></Checkbox>
                <Checkbox label="收文提醒"></Checkbox>
                <Checkbox label="雨量站"></Checkbox>
                <Checkbox label="系统警告信息"></Checkbox>
            </CheckboxGroup>
        </div>
        <div>
            <!-- <Button type="primary" @click="save">确定</Button> -->
            <Button type="primary" :loading="loading" @click="save">
                <span v-if="!loading">确定</span>
                <span v-else>{{btnText}}</span>
            </Button>
        </div>
    </div>
    <hr>
    <div class="thematic-content">
        <li>
            <weather-warning></weather-warning>
        </li>
        <li>
            <weather-forecast></weather-forecast>
        </li>
        <li>
            <current-water></current-water>
        </li>
        <li>
            <typhoon-path></typhoon-path>
        </li>
        <li>
            <adressee-remind></adressee-remind>
        </li>
        <li>
            <precipitation-station></precipitation-station>
        </li>
        <li>
            <warning-remind></warning-remind>
        </li>
    </div>
  </div>
</template>

<script>
import { cloneObj } from 'common/js/util'
import WeatherWarning from '../default/WeatherWarning.vue'
import CurrentWater from '../default/CurrentWater.vue'
import WeatherForecast from '../default/WeatherForecast.vue'
import TyphoonPath from '../default/TyphoonPath.vue'
import AdresseeRemind from '../default/adresseeRemind.vue'
import PrecipitationStation from '../default/precipitationStation.vue'
import WarningRemind from '../default/warningRemind.vue'
import { topicInfo } from 'api/daily-office'
import { getLocalStorage, successNotice, errorNotice, warningNotice } from 'common/js/dom'
export default {
  components: {
    WeatherWarning,
    CurrentWater,
    WeatherForecast,
    TyphoonPath,
    AdresseeRemind,
    PrecipitationStation,
    WarningRemind
  },
  data () {
    return {
      btnText: '提交中',
      loading: false,
      dataList: [],
      initDataList: [],
      _id: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      let obj = {
        searchValue: {
          userid: getLocalStorage('info').userid
        }
      }
      topicInfo('list', obj).then(res => {
        if (res) {
          if (res.code === '0000') {
            if (res.result.result && res.result.result.length) {
              this.dataList = res.result.result[0].subscriptions
              this._id = res.result.result[0]._id
              this.initDataList = cloneObj(this.dataList)
            }
          }
        } else {
          errorNotice('服务器未连接，')
        }
      })
    },
    save () {
      if (!this.dataList.length) {
        warningNotice('请选择您要订阅的模块')
      } else if (this.dataList.length > 3) {
        warningNotice('抱歉，订阅的模块不能超过3个，请重新选择')
      } else {
        this.loading = true
        let apiType = ''
        let obj = {}
        if (this.initDataList && this.initDataList.length) {
          this.btnText = '修改中'
          apiType = 'edit'
          obj = {
            'subscriptions': this.dataList,
            'userid': getLocalStorage('info').userid,
            '_id': this._id
          }
        } else {
          this.btnText = '提交中'
          apiType = 'new'
          obj = {
            'subscriptions': this.dataList,
            'userid': getLocalStorage('info').userid
          }
        }
        topicInfo(apiType, obj).then(res => {
          this.loading = false
          if (res.code === '0000') {
            successNotice(res.message)
          } else {
            errorNotice(res.message)
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
    .thematic-information {
        height: 100%;
        .title {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: row;
            width: 100%;
            background: rgb(237, 246, 250);
            height: 0.5rem;
            line-height: 0.5rem;
            padding-left: 10px;
            >span {
                font-size: 14px;
                font-weight: 600;
            }
        }
        .top {
            padding-left: 10px;
            display: flex;
            font-size: 16px;
            .dingyue {
                line-height: 32px;
            }
            div:nth-child(2) {
                div {
                    font-size: 18px;
                }
            }
            button {
                border-radius: 0;
            }
        }
        .thematic-content {
            li {
                float: left;
                width: 33.3333%;
                height: 350px;
                padding: 10px;
            }
        }
        hr {
            margin-top: 5px;
            margin-left: 10px;
        }
    }
</style>
