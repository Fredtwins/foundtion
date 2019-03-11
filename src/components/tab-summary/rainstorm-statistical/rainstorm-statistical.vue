<template>
  <div class="rainstrom-statical">
    <Spin fix v-if="spinShow">
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div class="title">
      <span class="titleleft"></span>
      <span>位置 :</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>事中报表统计</BreadcrumbItem>
        <BreadcrumbItem>暴雨情况统计表</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="table">
      <Table
        :loading="loading"
        border
        stripe
        size="small"
        highlight-row
        :columns="tableThead"
        :data="tableTbody"
      ></Table>
    </div>
    <div class="page">
      <Page :total="total" @on-change="pageChange" show-elevator show-total shot-total></Page>
    </div>
    <div v-if="addPageShow" class="addPage">
      <div class="title">
        <span class="titleleft"></span>
        <span>位置 :</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>报表汇总</BreadcrumbItem>
          <BreadcrumbItem>事中报表统计</BreadcrumbItem>
          <BreadcrumbItem>暴雨情况统计表</BreadcrumbItem>
          <BreadcrumbItem>详细信息</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <add-page @cancel="cancel" :data="formItem" :rainstormModel="rainstormObj"></add-page>
    </div>
  </div>
</template>

<script>
import addPage from './addPage.vue'
import { rainstormThead } from 'common/js/table'
import { rainstormApi, rainstormdetailsApi } from 'api/tab-summary'
import { mapGetters, mapMutations } from 'vuex'
import { errorNotice } from 'common/js/dom'
import { cloneObj } from 'common/js/util'

export default {
  computed: {
    ...mapGetters(['STATUS'])
  },
  watch: {
    STATUS: {
      handler: function (val, oldval) {
        if (val === false) {
          this.addPageShow = false
        }
      }
    }
  },
  data () {
    return {
      spinShow: false,
      tableThead: rainstormThead(this),
      tableTbody: [],
      formItem: {},
      searchVal: {},
      total: 0,
      loading: false,
      postObj: {
        'page': 1,
        'pageSize': 10,
        'order': { _id: -1 },
        searchValue: {
          'response_no': '防暴雨|#|like'
        }
      },
      postObjdetail: {
        'page': 1,
        'pageSize': 20,
        'order': 'rainstorm',
        searchValue: {
          response_no: '',
          department_level: '2'
        }
      },
      addPageShow: false,
      rainstormObj: [],
      rainstormArr: [],
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
      rainstormEmptyStatistics: { // 空总计
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
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      rainstormApi(this.postObj).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
          }
        } else {
          errorNotice('服务器未连接')
        }
      })
    },
    add () {
      this.SET_STATUS(true)
      this.addPageShow = true
    },
    addStatistics () {
      var arr = cloneObj(this.rainstormArr)
      var max_farms = 0
      var max_fishponds = 0
      var max_roads = 0
      var max_cars = 0
      var max_patrols = 0
      var max_evacuations = 0
      var max_evacuation_devices = 0
      var max_pumps = 0
      var max_times = 0
      var max_duty_count = 0
      var max_injured = 0
      var max_death = 0
      for (var i in arr) {
        max_farms += parseInt(arr[i].farms)
        max_fishponds += parseInt(arr[i].fishponds)
        max_roads += parseInt(arr[i].roads)
        max_cars += parseInt(arr[i].cars)
        max_patrols += parseInt(arr[i].patrols)
        max_evacuations += parseInt(arr[i].evacuations)
        max_evacuation_devices += parseInt(arr[i].evacuation_devices)
        max_pumps += parseInt(arr[i].pumps)
        max_times += parseInt(arr[i].times)
        max_duty_count += parseInt(arr[i].duty_count)
        max_injured += parseInt(arr[i].injured)
        max_death += parseInt(arr[i].death)
      }
      this.rainstormStatistics.farms = max_farms
      this.rainstormStatistics.fishponds = max_fishponds
      this.rainstormStatistics.roads = max_roads
      this.rainstormStatistics.cars = max_cars
      this.rainstormStatistics.patrols = max_patrols
      this.rainstormStatistics.evacuations = max_evacuations
      this.rainstormStatistics.evacuation_devices = max_evacuation_devices
      this.rainstormStatistics.pumps = max_pumps
      this.rainstormStatistics.times = max_times
      this.rainstormStatistics.duty_count = max_duty_count
      this.rainstormStatistics.injured = max_injured
      this.rainstormStatistics.death = max_death
      this.rainstormArr.push(this.rainstormStatistics)
      this.rainstormObj = this.rainstormArr
    },
    ...mapMutations(['SET_STATUS']),
    search () {},
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    cancel () {
      this.addPageShow = false
    },
    details (obj) {
      let _this = this
      this.SET_STATUS(true)
      this.spinShow = false
      this.formItem = obj
      this.postObjdetail.searchValue.response_no = obj.response_no
      rainstormdetailsApi(this.postObjdetail).then(res => {
        this.addPageShow = true
        this.spinShow = false
        if (res.code === '0000') {
          _this.rainstormArr = cloneObj(res.result.result)
          var lg = _this.rainstormArr.length
          if (lg !== 0) {
            _this.addStatistics()
          } else {
            let emptyObj = []
            emptyObj.push(this.rainstormEmptyStatistics)
            _this.rainstormObj = emptyObj
          }
        }
      })
    }
  },
  components: {
    addPage
  }
}
</script>

<style scoped lang="scss">
  .rainstrom-statical {
    height: 100%;
    .title {
      position: absolute;
      top:0;
      left:0;
      display: flex;
      flex-direction: row;
      width: 100%;
      background: rgb(237, 246, 250);
      height: 0.5rem;
      line-height: 0.5rem;
      padding-left: 10px;
      > span {
        font-size:14px;
        font-weight:600;
      }
    }
  }
  .search {
    margin-bottom: 15px;
    .searchBtn {
      display: inline-block;
    }
  }
  .addPage {
    padding: 0 10px;
    z-index: 3;
    height: 100%;
    width: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    form {
      margin-top: 60px;
      margin-bottom: 20px;
    }
  }
</style>
