<!-- 人员管理 -->
<template>
  <div class="data-report">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据上报</BreadcrumbItem>
        <BreadcrumbItem>月度数据上报</BreadcrumbItem>
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
        <div class="add pull-right" @click="detailClick('new')">
          <Button type="primary" v-if="Btnshow">
            <span class="icon-xinzeng"></span>新增
          </Button>
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
      <div class="detail-action clear">
        <Button v-if="detabtn" class="pull-right" type="primary" @click="saveDeatil">保存</Button>
        <Button class="pull-right" @click="backTable">返回</Button>
      </div>

      <div class="detail-table">
        <InputDataTable
          ref="detail-table"
          :isAdd="actionKey === 'new'"
          :data="currentDetailData"
          :isdisabled="disabledShow" />
      </div>
    </div>

    <loading v-show="loading"></loading>

    <Modal v-model="isShowSureModal" width="360">
      <p slot="header" style="color:red;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <p>确认{{actionKey === 'delete' ? '删除' : '提交'}}？</p>
      </div>
      <div slot="footer">
        <Button
          long
          type="error"
          size="large"
          @click="actionSure">确认</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import InputDataTable from 'base/InputDataTable/InputDataTable'
import { loadingMixin } from 'common/js/mixins'
import { getList, getDetail, changeDetail } from 'api/data-report'
import { betweenSearchRule, yyyyMMFormat, gtSearchRule, ltSearchRule } from 'common/js/config'
import { dataReportThead } from 'common/js/table'
import { timeFilter } from 'common/js/util'
import { errorMessage, successMessage, getLocalStorage } from 'common/js/dom'

export default {
  mixins: [loadingMixin],
  components: {
    InputDataTable
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
      disabledShow: false,
      Btnshow: true,
      detabtn: true,
      formItem: {},
      ruleValidate: {},
      thead: dataReportThead(this),
      tbody: [],
      total: 0,
      current: 1,
      loading: false,
      isShowDetail: false,
      currentDetailData: {},
      actionKey: 'new',
      isShowSureModal: false
    }
  },
  methods: {
    saveDeatil () {
      if (this.actionKey === 'new') {
        this.$refs['detail-table'].checkData().then(res => {
          if (res) {
            this.disabledShow = false
            const data = this.$refs['detail-table'].getData()

            this._changeDetail(data)
          }
        })
      } else {
        const data = this.$refs['detail-table'].getData()

        this._changeDetail(data)
      }
    },
    backTable () {
      this.$refs['detail-table'].clearData()
      this.isShowDetail = false
    },
    submitSearch () {
      this._getList()
    },
    changePage (page) {
      this.current = page
      this._getList()
    },
    detailClick (type, data) {
      this.isShowDetail = true
      this.actionKey = type
      if (type === 'edit') {
        this.$refs['detail-table'].initdisabledshow()
        this.disabledShow = false
        this.currentDetailData = data
        this.detabtn = true
      } else if (type === 'new') {
        this.$refs['detail-table'].initdisabledshow()
        this._getDetail()
      }
    },
    actionClick (type, data) {
      this.actionKey = type
      this.currentActionData = data
      this.isShowSureModal = true
    },
    actionSure () {
      this._changeDetail({ _id: this.currentActionData._id })
    },
    // 详情
    detailsClick (type, data) {
      console.log(type)
      this.isShowDetail = true
      this.actionKey = type
      if (type === 'details') {
        this.$refs['detail-table'].initdisabled()
        this.disabledShow = true
        this.currentDetailData = data
        this.detabtn = false
      } else if (type === 'new') {
        this.$refs['detail-table'].initdisabledshow()
        this._getDetail()
      }
    },
    async _changeDetail (data) {
      this.loading = true

      const res = await changeDetail(this.actionKey, data)

      this.loading = false

      if (res && res.code === ERR_OK) {
        if (this.actionKey === 'new' || this.actionKey === 'edit') {
          this.backTable()
        }
        successMessage('操作成功')
        this._getList()
      } else {
        errorMessage(res.message || '操作失败')
      }
      this.isShowSureModal = false
    },
    async _getDetail () {
      this.loading = true

      const res = await getDetail()

      this.loading = false

      if (res && res.code === ERR_OK) {
        this.currentDetailData = {
          YYYYMM: '2019-03',
          title: '',
          data: res.result
        }
      }
      console.log(this.currentDetailData)
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
        console.log(getLocalStorage('info').role)
        if (getLocalStorage('info').role === '系统管理员') {
          this.Btnshow = false
        } else {
          this.Btnshow = true
        }
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

	.data-report {
    width: 100%;
    height: 100%;
    > .detail {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      > .detail-action {
        > .ivu-btn {
          width: 100px;
          height: 30px;
          margin-right: 5px;
        }
      }
      > .detail-table {
        width: 100%;
        height: calc(100% - 30px);
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
