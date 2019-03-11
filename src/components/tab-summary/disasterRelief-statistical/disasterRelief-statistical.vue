<!-- 救灾复产情况统计表 -->
<template>
  <div class="disasterRelief-statistical">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>事中报表统计</BreadcrumbItem>
        <BreadcrumbItem>救灾复产情况统计表</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div v-show="!isShowDetail && !isShowDepartDetail" class="list">
      <Form ref="formInline" :model="formInline" inline :label-width="60" id="mar">
        <Form-item label="月份" prop="startTime">
          <DatePicker
            v-model="formInline.YYYYMM"
            type="month"
            placeholder="月份"
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

    <div v-show="isShowDetail" class="detail">
      <div class="back clear">
        <Button class="pull-right" @click="backClick">
          返回
        </Button>
      </div>
      <typhoonDetail ref="detail" @detailClick="departDetailClick" />
    </div>

    <div v-show="isShowDepartDetail" class="detail">
      <div class="back clear">
        <Button class="pull-right" @click="backDetailClick">
          返回
        </Button>
      </div>
      <typhoonDepartDetail ref="departDetail" />
    </div>

    <loading v-show="loading"></loading>

  </div>
</template>

<script>
import typhoonDetail from './detail'
import typhoonDepartDetail from './departDetail'
import { getList } from 'api/disasterRelief-statistical'
import { loadingMixin } from 'common/js/mixins'
import { yyyyMMFormat } from 'common/js/config'
import { typhoonStatisticalThead } from 'common/js/table'
// import { errorMessage } from 'common/js/dom'
import { timeFilter } from 'common/js/util'

export default {
  mixins: [loadingMixin],
  components: {
    typhoonDetail,
    typhoonDepartDetail
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
      thead: typhoonStatisticalThead(this),
      tbody: [],
      total: 0,
      current: 1,
      loading: false,
      isShowDetail: false,
      isShowDepartDetail: false
    }
  },
  methods: {
    backClick () {
      this.isShowDetail = false
    },
    backDetailClick () {
      this.isShowDetail = true
      this.isShowDepartDetail = false
    },
    departDetailClick (item) {
      // console.log(item)
      this.isShowDetail = false
      this.isShowDepartDetail = true

      setTimeout(() => {
        this.$refs['departDetail'].initData(item)
      }, 20)
    },
    submitSearch () {
      this._getList()
    },
    changePage (page) {
      this.current = page
      this._getList()
    },
    detailClick (data) {
      console.log(data)
      this.isShowDetail = true

      setTimeout(() => {
        this.$refs['detail'].initData(data)
      }, 20)
    },
    async _getList () {
      this.loading = true

      const search = {}
      const { YYYYMM } = this.formInline

      if (YYYYMM) {
        search.YYYYMM = timeFilter(new Date(YYYYMM), yyyyMMFormat)
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

	.disasterRelief-statistical {
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
