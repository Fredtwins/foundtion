<template>
  <div class="rptlog">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>报表日志</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div v-show="!isShowDetail && !isShowDepartDetail && !isShowdearclick && !isShowrainlist && !isShowfooldlist && !isShowaddDetail && !isShowfangyulist" class="list">
      <Form ref="formInline" :model="formInline" inline :label-width="60" id="mar">
        <!-- <Form-item label="月份" prop="startTime">
          <DatePicker
            v-model="formInline.YYYYMM"
            type="month"
            placeholder="月份"
            style="width:2rem"></DatePicker>
        </Form-item> -->

        <Form-item label="统计时间" prop="startTime">
          <DatePicker
            v-model="formInline.startTime"
            type="date"
            placeholder="开始时间"
            @on-change="starttimechange"
            style="width:2rem"></DatePicker>
        </Form-item>
        <Form-item
          label="～"
          :label-width="30"
          prop="endTime">
          <DatePicker
            v-model="formInline.endTime"
            type="date"
            placeholder="结束时间"
            @on-change="endtimechange"
            style="width:2rem"></DatePicker>
        </Form-item>
        <div class="searchBtn">
          <Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch(1)"></Button>
        </div>
      </Form>

      <div class="table">
        <Table
          stripe
          border
          highlight-row
          :columns="thead"
          :data="tbody"></Table>
      </div>

      <div class="page">
        <Page
          show-total
          show-elevator
          :total="total"
          :current="current"
          @on-change="changePage"></Page>
      </div>
    </div>

    <div v-show="isShowaddDetail" class="detail">
      <div class="back clear">
        <Button class="pull-right" @click="backDetailClick">
          返回
        </Button>
      </div>
      <add-page @cancel="cancel" :data="formItem" :measureModel="measureObj"></add-page>
    </div>

    <div v-show="isShowDepartDetail" class="detail">
      <div class="back clear">
        <Button class="pull-right" @click="backDetailClick">
          返回
        </Button>
      </div>
      <typhoonDetail ref="detail" />
    </div>

    <div v-show="isShowdearclick" class="detail">
      <div class="back clear">
        <Button class="pull-right" @click="backDetailClick">
          返回
        </Button>
      </div>
      <jiu-zai ref="jiuzai"/>
    </div>

    <div v-show="isShowrainlist" class="detail">
      <div class="back clear">
        <Button class="pull-right" @click="backDetailClick">
          返回
        </Button>
      </div>
      <rain-list ref="rainList"/>
    </div>

    <div v-show="isShowfooldlist" class="detail">
      <div class="back clear">
        <Button class="pull-right" @click="backDetailClick">
          返回
        </Button>
      </div>
      <zhuan-yi ref="zhuanyiList"/>
    </div>

    <div v-show="isShowfangyulist" class="detail">
      <div class="back clear">
        <Button class="pull-right" @click="backDetailClick">
          返回
        </Button>
      </div>
      <fang-yu ref="fangyuList"/>
    </div>
  </div>
</template>

<script>
import addPage from './addPage.vue'
import typhoonDetail from './detail'
import jiuZai from './jiuzai'
import rainList from './rainlist'
import zhuanYi from './zhuanyi'
import fangYu from './fangyu'
import { getList, geteditLists } from 'api/rptlog'
import { loadingMixin } from 'common/js/mixins'
// import { yyyyMMFormat } from 'common/js/config'
import { rptlogThead } from 'common/js/table'
// import { errorMessage } from 'common/js/dom'
import { cloneObj } from 'common/js/util'
import { getLocalStorage } from 'common/js/dom'

export default {
  mixins: [loadingMixin],
  components: {
    addPage,
    typhoonDetail,
    jiuZai,
    rainList,
    zhuanYi,
    fangYu
  },
  created () {
    this._getList()
  },
  data () {
    return {
      formInline: {
        YYYYMM: '',
        title: '',
        startTime: '',
        endTime: ''
      },
      formItem: {},
      ruleValidate: {},
      thead: rptlogThead(this),
      tbody: [],
      total: 0,
      current: 1,
      loading: false,
      isShowDetail: false,
      isShowDepartDetail: false,
      isShowdearclick: false,
      isShowrainlist: false,
      isShowfooldlist: false,
      isShowaddDetail: false,
      isShowfangyulist: false,
      measureObj: [],
      addPageShow: false,
      measureArr: [],
      deitform: ''
    }
  },
  methods: {
    backDetailClick () {
      this.isShowDetail = false
      this.isShowaddDetail = false
      this.isShowDepartDetail = false
      this.isShowrainlist = false
      this.isShowdearclick = false
      this.isShowfooldlist = false
      this.isShowfangyulist = false
    },
    submitSearch (page) {
      const search = {}
      if (this.formInline.startTime || this.formInline.endTime) {
        search.createdt = `${this.formInline.startTime}|#|${this.formInline.endTime}`
      }

      this._getList(page, search)
    },
    changePage (page) {
      this.current = page
      this._getList(page)
    },
    detailClick (data) {
      this.deitform = data._id
      if (data.title === '应急措施统计表') {
        this.addPageShow = true
        this.isShowaddDetail = true
      } else if (data.title === '佛山市南海区救灾复产情况统计表') {
        this.isShowDepartDetail = true
      } else if (data.title === '受灾情况统计表') {
        this.isShowdearclick = true
      } else if (data.title === '暴雨台风防御工作开展情况统计表') {
        this.isShowrainlist = true
      } else if (data.title === '佛山市南海区防汛防台风已转移人员统计表') {
        this.isShowfooldlist = true
      } else if (data.title === '佛山市南海区防御当前台风应急措施统计表') {
        this.isShowfangyulist = true
      }

      let searchedit = {
        _id: this.deitform
      }

      geteditLists(searchedit).then(res => {
        if (res.code === '0000') {
          if (res.result.title === '应急措施统计表') {
            this.measureArr = cloneObj(res.result.data)
            var lg = this.measureArr.length
            if (lg !== 0) {
              this.measureObj = this.measureArr
            } else {
              let emptyObj = []
              this.measureObj = emptyObj
            }
          } else if (res.result.title === '佛山市南海区救灾复产情况统计表') {
            getLocalStorage('searchRes', res.result.data)
            this.$refs['detail'].initData()
          } else if (res.result.title === '受灾情况统计表') {
            getLocalStorage('searchResult', res.result.data)
            this.$refs['jiuzai'].initData()
          } else if (res.result.title === '暴雨台风防御工作开展情况统计表') {
            getLocalStorage('searchResultrian', res.result.data)
            this.$refs['rainList'].initData()
          } else if (res.result.title === '佛山市南海区防汛防台风已转移人员统计表') {
            getLocalStorage('searchResultfoold', res.result.data)
            this.$refs['zhuanyiList'].initData()
          } else if (res.result.title === '佛山市南海区防御当前台风应急措施统计表') {
            getLocalStorage('searchResultfy', res.result.data)
            this.$refs['fangyuList'].initData()
          }
        }
      })
    },
    // async _getList () {
    //   this.loading = true

    //   const search = {}

    //   search.createdt = `${this.formInline.startTime}|#|${this.formInline.endTime}`

    //   const res = await getList(this.current, search)
    //   this.loading = false

    //   if (res && res.code === ERR_OK) {
    //     this.tbody = res.result.result
    //     this.total = res.result.totalSize
    //     this.current = res.result.page
    //   }
    // },
    _getList (page, search) {
      this.loading = true
      getList(page, search).then(res => {
        this.loading = false
        if (res && res.code === ERR_OK) {
          this.tbody = res.result.result
          this.total = res.result.totalSize
          this.current = res.result.page
        }
      })
    },
    // 应急响应措施表 ->
    goBack () {

    },
    cancel () {
      this.addPageShow = false
      this.isShowaddDetail = false
    },
    starttimechange (time) {
      // console.log(time)
      this.formInline.startTime = time
    },
    endtimechange (time) {
      this.formInline.endTime = time
      console.log(this.formInline.endTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.rptlog {
  width: 100%;
  height: 100%;
  .title {
    position: absolute;
		top: 0;
		left: 0;
    right: 10px;
		display: flex;
		flex-direction: row;
		// width: 100%;
		background: rgb(237, 246, 250);
		height: 0.5rem;
		line-height: 0.5rem;
		padding-left: 10px;
		>span {
			font-size: 14px;
			font-weight: 600;
		}
  }
  > .detail {
    position: relative;
    > .back {
      > button {
        position: absolute;
        z-index: 999;
      }
    }
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
.detailaa {
  display: inline !important;
  position: absolute;
  top: 58px;
  z-index: 999;
}
</style>
