<!-- 月度受影响人员台账统计表 -->
<template>
  <div class="emergency-person">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>日常报表统计</BreadcrumbItem>
        <BreadcrumbItem>月度受影响人员台账统计表</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div v-show="!isShowDetail" class="list">
      <Form ref="formInline" :model="formInline" inline :label-width="60" id="mar">
        <Form-item label="统计时间" prop="startTime">
          <DatePicker
            v-model="formInline.startTime"
            type="month"
            placeholder="开始时间"
            style="width:2rem"></DatePicker>
        </Form-item>
        <Form-item
          label="～"
          prop="endTime"
          :label-width="30">
          <DatePicker
            v-model="formInline.endTime"
            type="month"
            placeholder="结束时间"
            style="width:2rem"></DatePicker>
        </Form-item>
        <div class="searchBtn">
          <Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch(1)"></Button>
        </div>
        <!-- <div class="add pull-right" @click="add('formItem')">
          <Button type="primary">
            <span class="icon-xinzeng"></span>新增
          </Button>
        </div> -->
      </Form>

      <div class="table">
        <Table
          stripe
          border
          highlight-row
          :loading="loading"
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
      <InputTable :data="currentDetailData" />
    </div>

  </div>
</template>

<script>
import InputTable from 'base/InputTable/InputTable'
import { getList, getDetail } from 'api/emergency-person'
import { betweenSearchRule, yyyyMMFormat, gtSearchRule, ltSearchRule } from 'common/js/config'
import { emergencyPersonThead } from 'common/js/table'
import { errorMessage } from 'common/js/dom'
import { timeFilter } from 'common/js/util'

export default {
  components: {
    InputTable
  },
  created () {
    this._getList()
  },
  data () {
    return {
      formInline: {
        startTime: '',
        endTime: ''
      },
      formItem: {},
      ruleValidate: {},
      thead: emergencyPersonThead(this),
      tbody: [],
      total: 0,
      current: 1,
      loading: false,
      isShowDetail: false,
      currentDetailData: []
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
    async _getDetail (_id) {
      const res = await getDetail({
        _id
      })
      this.currentDetailData = res.result.data
    },
    async _getList () {
      const search = {}

      const { startTime, endTime } = this.formInline

      if (startTime || endTime) {
        const start = new Date(startTime)
        const end = new Date(endTime)

        if (startTime && endTime) {
          if (start.getTime() > end.getTime()) {
            errorMessage('统计时间格式不对')
            return
          }
          search.YYYYMM = `${timeFilter(start, yyyyMMFormat)}${betweenSearchRule}${timeFilter(end, yyyyMMFormat)}`
        } else if (startTime && !endTime) {
          search.YYYYMM = `${timeFilter(start, yyyyMMFormat)}${gtSearchRule}`
        } else if (!startTime && endTime) {
          search.YYYYMM = `${timeFilter(end, yyyyMMFormat)}${ltSearchRule}`
        }
      }

      this.loading = true

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

	.emergency-person {
    width: 100%;
    height: 100%;
    > .detail {
      width: 100%;
      height: 100%;
      // overflow: hidden;
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
