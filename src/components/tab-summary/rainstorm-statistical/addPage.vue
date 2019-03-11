<template>
  <div class="add-page">
    <div class="table">
      <Table
        height="650"
        :loading="loading"
        border
        stripe
        size="small"
        heightlight-row
        :columns="tableThead"
        :data="rainstormModel"
        ref="firsttable"
      ></Table>
    </div>
    <div class="save pull-left" style="marginBottom:20px">
      <Button type="error" size="large" @click="cancel('first')">关闭</Button>
      <Button type="info" size="large" @click="exportCsv('first')">导出</Button>
    </div>
    <div class="details" v-if="showPage">
      <div class="table">
        <Table border :columns="columnsData" :data="tableTbody" ref="secondtable"></Table>
      </div>
      <div class="save pull-left" style="marginBottom:20px">
        <Button type="error" size="large" @click="cancel('second')">关闭</Button>
        <Button type="info" size="large" @click="exportCsv('second')">导出</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { rainstormadddetailsApi } from 'api/tab-summary'
import { rainstormAddThead, typhoonAddDetailThead } from 'common/js/table'

export default {
  props: {
    rainstormModel: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      showPage: false,
      tableThead: rainstormAddThead(this),
      tableTbody: [],
      postobj: {
        'page': 1,
        'pageSize': 10,
        searchValue: {
          department_level: '3',
          response_no: '',
          parent: ''
        }
      },
      columnsData: typhoonAddDetailThead(this),
      loading: false,
      rainstormStatistics: { // 总计
        cars: 0,
        createdt: '--',
        death: 0,
        department_code: '0114',
        department_level: '2',
        department_name: '总计',
        duty_count: 0,
        evacuation_devices: 0,
        evacuations: 0,
        farms: 0,
        fishponds: 0,
        hasChildren: false,
        injured: 0,
        parent: '01',
        patrols: 0,
        pumps: 0,
        response_no: '应-2018001-防风',
        roads: 0,
        times: 0
      },
      rainstormLevelStatistics: { // 三级总计
        cars: 0,
        createdt: '--',
        death: 0,
        department_code: '0114',
        department_level: '2',
        department_name: '总计',
        duty_count: 0,
        evacuation_devices: 0,
        evacuations: 0,
        farms: 0,
        fishponds: 0,
        hasChildren: false,
        injured: 0,
        parent: '01',
        patrols: 0,
        pumps: 0,
        response_no: '应-2018001-防风',
        roads: 0,
        times: 0
      },
      rainstormDifference: { // 与上级差值
        cars: 0,
        createdt: '--',
        death: 0,
        department_code: '0114',
        department_level: '2',
        department_name: '总计',
        duty_count: 0,
        evacuation_devices: 0,
        evacuations: 0,
        farms: 0,
        fishponds: 0,
        hasChildren: false,
        injured: 0,
        parent: '01',
        patrols: 0,
        pumps: 0,
        response_no: '应-2018001-防风',
        roads: 0,
        times: 0
      },
      superData: {}
    }
  },
  methods: {
    levelAdd () { // 三级总计
      var arr2 = this.tableTbody
      var max_farms = 0
      var max_fishponds = 0
      var max_roads = 0
      var max_cars = 0
      var max_patrols
      var max_evacuations = 0
      var max_evacuation_devices = 0
      var max_pumps = 0
      var max_times = 0
      var max_duty_count = 0
      var max_injured = 0
      var max_death = 0
      for (var i in arr2) {
        max_farms += arr2[i].farms
        max_fishponds += arr2[i].fishponds
        max_roads += arr2[i].roads
        max_cars += arr2[i].cars
        max_patrols += arr2[i].patrols
        max_evacuations += arr2[i].evacuations
        max_evacuation_devices += arr2[i].evacuation_devices
        max_pumps += arr2[i].pumps
        max_times += arr2[i].times
        max_duty_count += arr2[i].duty_count
        max_injured += arr2[i].injured
        max_death += arr2[i].death
      }
      this.rainstormLevelStatistics.farms = max_farms
      this.rainstormLevelStatistics.fishponds = max_fishponds
      this.rainstormLevelStatistics.roads = max_roads
      this.rainstormLevelStatistics.cars = max_cars
      this.rainstormLevelStatistics.patrols = max_patrols
      this.rainstormLevelStatistics.evacuations = max_evacuations
      this.rainstormLevelStatistics.evacuation_devices = max_evacuation_devices
      this.rainstormLevelStatistics.pumps = max_pumps
      this.rainstormLevelStatistics.times = max_times
      this.rainstormLevelStatistics.duty_count = max_duty_count
      this.rainstormLevelStatistics.injured = max_injured
      this.rainstormLevelStatistics.death = max_death
    },
    differ () {
      var diff_farms = 0
      var diff_fishponds = 0
      var diff_roads = 0
      var diff_cars = 0
      var diff_patrols = 0
      var diff_evacuations = 0
      var diff_evacuation_devices = 0
      var diff_pumps = 0
      var diff_times = 0
      var diff_duty_count = 0
      var diff_injured = 0
      var diff_death = 0
      diff_farms = this.rainstormLevelStatistics.farms - this.superData.farms
      diff_fishponds = this.rainstormLevelStatistics.fishponds - this.superData.fishponds
      diff_roads = this.rainstormLevelStatistics.roads - this.superData.roads
      diff_cars = this.rainstormLevelStatistics.cars - this.superData.cars
      diff_patrols = this.rainstormLevelStatistics.patrols - this.superData.patrols
      diff_evacuations = this.rainstormLevelStatistics.evacuations - this.superData.evacuations
      diff_evacuation_devices = this.rainstormLevelStatistics.evacuation_devices - this.superData.evacuation_devices
      diff_pumps = this.rainstormLevelStatistics.pumps - this.superData.pumps
      diff_times = this.rainstormLevelStatistics.times - this.superData.times
      diff_duty_count = this.rainstormLevelStatistics.duty_count - this.superData.duty_count
      diff_injured = this.rainstormLevelStatistics.injured - this.superData.injured
      diff_death = this.rainstormLevelStatistics.death - this.superData.death

      this.rainstormDifference.farms = diff_farms
      this.rainstormDifference.fishponds = diff_fishponds
      this.rainstormDifference.roads = diff_roads
      this.rainstormDifference.cars = diff_cars
      this.rainstormDifference.patrols = diff_patrols
      this.rainstormDifference.evacuations = diff_evacuations
      this.rainstormDifference.evacuation_devices = diff_evacuation_devices
      this.rainstormDifference.pumps = diff_pumps
      this.rainstormDifference.times = diff_times
      this.rainstormDifference.duty_count = diff_duty_count
      this.rainstormDifference.injured = diff_injured
      this.rainstormDifference.death = diff_death
    },
    details (obj) {
      this.superData = obj // 获取上级数据
      this.showPage = true
      this.postobj.searchValue.response_no = obj.response_no
      this.postobj.searchValue.parent = obj.department_code
      rainstormadddetailsApi(this.postobj).then(res => {
        if (res.code === '0000') {
          this.tableTbody = res.result.result
          this.levelAdd()
          this.tableTbody.push(this.rainstormLevelStatistics)
          this.differ()
          this.tableTbody.push(this.rainstormDifference)
        }
      })
    },
    cancel (value) {
      if (value === 'first') {
        this.$emit('cancel', 'false')
      } else {
        this.showPage = false
      }
    },
    exportCsv (value) {
      if (value === 'first') {
        this.$refs.firsttable.exportCsv({
          filename: '暴雨情况统计表'
        })
      } else {
        this.$refs.secondtable.exportCsv({
          filename: '暴雨情况统计表'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .add-page {
    padding-top:60px;
    width: 100%;
    height: 100%;
    position: relative;
    h2 {
      text-align: center;
      font-size: 16px;
    }
    .table {
      width: 100%;
      max-height: 90% !important;
      border-bottom: 1px solid #ccc;
      overflow: auto;
    }

    .save {
      margin-top: 10px;
    }

    .details {
      width: 100%;
      height: 100%;
      background-color: #fff;
      position: absolute;
      top: 0;
      z-index: 9;
      padding-top: 60px;
    }
  }
</style>
