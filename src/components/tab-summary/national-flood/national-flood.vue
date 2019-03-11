<!-- 国汛统表 -->
<template>
  <div class="national-flood">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>事后报表统计</BreadcrumbItem>
        <BreadcrumbItem>国汛统表</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div v-show="!isShowDetail" class="list">
      <Form ref="formInline" :model="formInline" inline :label-width="60" id="mar">
        <Form-item label="月份" prop="startTime">
          <DatePicker
            v-model="formInline.YYYYMM"
            type="month"
            placeholder="月份"
            style="width:2rem"></DatePicker>
        </Form-item>
        <Form-item label="统计名称" prop="name">
          <Input
            v-model="formInline.title"
            placeholder="统计名称"
            style="width:2rem"></Input>
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

    <div v-show="isShowDetail" class="detail">
      <div class="back clear">
        <Button class="pull-right" @click="backClick">
          返回
        </Button>
      </div>
      <component :data="currentDetailValue" :is="detailComponent"></component>
    </div>

    <loading v-show="loading"></loading>

  </div>
</template>

<script>
import flood from 'base/NationalFloodTable/flood'
import forestry from 'base/NationalFloodTable/forestry'
import industry from 'base/NationalFloodTable/industry'
import water from 'base/NationalFloodTable/water'
import die from 'base/NationalFloodTable/die'
import logging from 'base/NationalFloodTable/logging'
import material from 'base/NationalFloodTable/material'
import money from 'base/NationalFloodTable/money'
import realdata from 'base/NationalFloodTable/realdata'
import { getList, getDetail } from 'api/national-flood'
import { loadingMixin } from 'common/js/mixins'
import { yyyyMMFormat } from 'common/js/config'
import { nationalFloodThead } from 'common/js/table'
// import { errorMessage } from 'common/js/dom'
import { timeFilter } from 'common/js/util'

export default {
  mixins: [loadingMixin],
  components: {
    flood,
    forestry,
    industry,
    water,
    die,
    logging,
    material,
    money,
    realdata
  },
  computed: {
    currentDetailValue () {
      if (!this.currentDetailData.data) {
        return {}
      }

      const data = {}

      this.currentDetailData.data.map(item => {
        data[item.cell_id] = item.value
      })

      return data
    }
  },
  created () {
    this._getList()
  },
  data () {
    return {
      formInline: {
        YYYYMM: '',
        title: ''
      },
      formItem: {},
      ruleValidate: {},
      thead: nationalFloodThead(this),
      tbody: [],
      total: 0,
      current: 1,
      loading: false,
      isShowDetail: false,
      currentDetailData: {},
      detailComponent: ''
    }
  },
  methods: {
    backClick () {
      this.isShowDetail = false
    },
    submitSearch () {
      this._getList()
    },
    changePage (page) {
      this.current = page
      this._getList()
    },
    detailClick (data) {
      this.isShowDetail = true

      this._getDetail(data._id)
    },
    initDetailTable () {
      if (this.currentDetailData.title === this.detailComponent) {
        return
      }

      switch (this.currentDetailData.title) {
        case '洪涝灾害基本情况统计表':
          this.detailComponent = 'flood'
          break
        case '农林牧渔业洪涝灾害统计表':
          this.detailComponent = 'forestry'
          break
        case '工业交通运输业洪涝灾害统计表':
          this.detailComponent = 'industry'
          break
        case '水利设施洪涝灾害统计表':
          this.detailComponent = 'water'
          break
        case '死亡人员基本情况统计表':
          this.detailComponent = 'die'
          break
        case '城市受淹情况统计表':
          this.detailComponent = 'logging'
          break
        case '抗洪抢险综合情况统计表一':
          this.detailComponent = 'material'
          break
        case '抗洪抢险综合情况统计表二':
          this.detailComponent = 'money'
          break
        case '洪涝灾害实时统计表':
          this.detailComponent = 'realdata'
          break
      }
    },
    async _getDetail (_id) {
      this.loading = true

      const res = await getDetail({
        _id
      })

      this.currentDetailData = res.result

      this.initDetailTable()

      this.loading = false
    },
    async _getList () {
      this.loading = true

      const search = {}
      const { YYYYMM, title } = this.formInline

      if (YYYYMM) {
        search.YYYYMM = timeFilter(new Date(YYYYMM), yyyyMMFormat)
      }

      if (title) {
        search.title = `${title}|#|like`
      }

      const res = await getList(this.current, search)
      this.loading = false

      if (res && res.code === ERR_OK) {
        this.tbody = res.result.result
        this.total = res.result.totalSize
        this.current = res.result.page
      }
    }
  }
}
</script>

<style lang="scss" scoped>
	.addBtn {
		background-color: #40b0ff;
		color: #fff;
		margin: 5px;
		height: 30px;
	}

	.national-flood {
    width: 100%;
    height: 100%;
    > .detail {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      > .back {
        margin-top: 10px;
      }
    }
  }
  .searchBtn {
    display: inline-block;
    > button {
      background: #224ca5;
      color: #fff;
      font-weight: bold;
      font-size: 0.18rem !important;
      border-radius: 0 !important;
      height: 0.37rem !important;
      width: 0.37rem !important;
      line-height: 0.37rem;
      .ivu-icon-ios-search:before {
          font-size: 0.2rem;
          font-weight: bold;
      }
    }
}

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

	#mar {
		margin-top: 42px;
  }
  .footerbtn {
    // background: linear-gradient(#1554cd,#1137a0);
    background: #224ca5;
  }
</style>
