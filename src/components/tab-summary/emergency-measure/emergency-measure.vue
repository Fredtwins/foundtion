<template>
    <div class="measure-statical">
        <Spin fix v-if="spinShow">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <div class="title">
          <span class="titleleft"></span>
          <span>位置 :  </span>
          <Breadcrumb separator=">">
            <BreadcrumbItem>报表汇总</BreadcrumbItem>
            <BreadcrumbItem>事中报表统计</BreadcrumbItem>
            <BreadcrumbItem>应急措施统计</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <!-- <div class="search">
            <span class="search_title">应急措施编号</span>
            <Input placeholder="请输入" v-model="searchVal.stn_name" style="width:200px;padding-left:10px;padding-right:20px"></Input>
            <div class="searchBtn" @click="search">
                <Button type="ghost" shape="circle" icon="ios-search"></Button>
            </div>
        </div> -->
        <div class="table">
            <Table :loading="loading" border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody">
            </Table>
        </div>
        <div class="page">
            <Page :total="total" @on-change="pageChange" show-elevator show-total shot-total></Page>
        </div>
        <div v-if="addPageShow" class="addPage">
            <div class="title">
              <span class="titleleft"></span>
                <span>位置 ： </span>
                <Breadcrumb separator=">">
                    <BreadcrumbItem>报表汇报</BreadcrumbItem>
                    <BreadcrumbItem to="/home/tab-summary/emergency-measure">事中报表统计</BreadcrumbItem>
                    <BreadcrumbItem @click="goBack">应急措施统计</BreadcrumbItem>
                    <BreadcrumbItem>详细信息</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <add-page @cancel="cancel" :data="formItem" :measureModel="measureObj"></add-page>
        </div>
    </div>
</template>

<script>
import addPage from './addPage.vue'
import { measureThead } from 'common/js/table'
import { measureApi, measuredetailsApi } from 'api/tab-summary'
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
      tableThead: measureThead(this),
      tableTbody: [],
      formItem: {},
      searchVal: {},
      total: 0,
      loading: false,
      postObj: {
        'page': 1,
        'pageSize': 10,
        'order': { _id: -1 },
        searchValue: {}
      },
      postObjdetail: {
        'page': 1,
        'pageSize': 10,
        'order': 'measure',
        searchValue: {
          response_no: ''
        }
      },
      addPageShow: false,
      measureObj: [],
      measureArr: [],
      measureStatistics: { // 统计
        accommodate_num: 0,
        ashore_num: 0,
        closed_num: 0,
        createdt: '--',
        department_code: '0101',
        department_level: '2',
        department_name: '总计',
        fishing_row_num: 0,
        hasChildren: false,
        measure: '--',
        need_return_num: 0,
        notAshore_num: 0,
        notReturned_num: 0,
        parent: '01',
        response_no: '应-2018001-防风',
        returned_num: 0,
        scenic_spot_num: 0,
        shelter_num: 0,
        threaten_num: 0,
        transferred_num: 0
      },
      measureEmptyStatistics: { // 统计
        accommodate_num: 0,
        ashore_num: 0,
        closed_num: 0,
        createdt: '--',
        department_code: '0101',
        department_level: '2',
        department_name: '总计',
        fishing_row_num: 0,
        hasChildren: false,
        measure: '--',
        need_return_num: 0,
        notAshore_num: 0,
        notReturned_num: 0,
        parent: '01',
        response_no: '应-2018001-防风',
        returned_num: 0,
        scenic_spot_num: 0,
        shelter_num: 0,
        threaten_num: 0,
        transferred_num: 0
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      measureApi(this.postObj).then(res => {
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
      var arr = cloneObj(this.measureArr)
      var accommodate_max_num = 0
      var ashore_max_num = 0
      var closed_max_num = 0
      var fishing_row_max_num = 0
      var need_return_max_num = 0
      var notAshore_max_num = 0
      var notReturned_max_num = 0
      var returned_max_num = 0
      var scenic_spot_max_num = 0
      var shelter_max_num = 0
      var threaten_max_num = 0
      var transferred_max_num = 0

      for (var i in arr) {
        accommodate_max_num += parseInt(arr[i].accommodate_num)
        ashore_max_num += parseInt(arr[i].ashore_num)
        closed_max_num += parseInt(arr[i].closed_num)
        fishing_row_max_num += parseInt(arr[i].fishing_row_num)
        need_return_max_num += parseInt(arr[i].need_return_num)
        notAshore_max_num += parseInt(arr[i].notAshore_num)
        notReturned_max_num += parseInt(arr[i].notReturned_num)
        returned_max_num += parseInt(arr[i].returned_num)
        scenic_spot_max_num += parseInt(arr[i].scenic_spot_num)
        shelter_max_num += parseInt(arr[i].shelter_num)
        threaten_max_num += parseInt(arr[i].threaten_num)
        transferred_max_num += parseInt(arr[i].transferred_num)
      }
      this.measureStatistics.accommodate_num = accommodate_max_num
      this.measureStatistics.ashore_num = ashore_max_num
      this.measureStatistics.closed_num = closed_max_num
      this.measureStatistics.fishing_row_num = fishing_row_max_num
      this.measureStatistics.need_return_num = need_return_max_num
      this.measureStatistics.notAshore_num = notAshore_max_num
      this.measureStatistics.notReturned_num = notReturned_max_num
      this.measureStatistics.returned_num = returned_max_num
      this.measureStatistics.scenic_spot_num = scenic_spot_max_num
      this.measureStatistics.shelter_num = shelter_max_num
      this.measureStatistics.threaten_num = threaten_max_num
      this.measureStatistics.transferred_num = transferred_max_num
      this.measureArr.push(this.measureStatistics)
      this.measureObj = this.measureArr
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
      this.SET_STATUS(true)
      this.spinShow = false
      this.formItem = obj
      this.postObjdetail.searchValue.response_no = obj.response_no
      measuredetailsApi(this.postObjdetail).then(res => {
        this.addPageShow = true
        this.spinShow = false
        if (res.code === '0000') {
          this.measureArr = cloneObj(res.result.result)
          var lg = this.measureArr.length
          if (lg !== 0) {
            // this.addStatistics()
            this.measureObj = this.measureArr
          } else {
            let emptyObj = []
            // emptyObj.push(this.measureEmptyStatistics)
            this.measureObj = emptyObj
          }
          console.log(this.measureObj)
        }
      })
    },
    goBack () {
      this.addPageShow = false
    }
  },
  components: {
    addPage
  }
}
</script>

<style scoped lang="scss">
    .measure-statical {
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
    }
</style>
