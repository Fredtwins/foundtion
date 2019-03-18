<template>
  <div class="data-afterReport">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据上报</BreadcrumbItem>
        <BreadcrumbItem>事后数据上报</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div v-show="!isShowDetail" class="list">
      <Form ref="formInline" :model="formInline" inline :label-width="60" id="mar">
        <Form-item label="应急响应启动时间" prop="startTime">
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
        <Form-item label="报表名称" prop="name">
          <Input
            v-model="formInline.title"
            placeholder="报表名称"
            style="width:2rem"></Input>
        </Form-item>
        <div class="searchBtn">
          <Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch(1)"></Button>
        </div>
        <div class="add pull-right">
          <Button type="primary" v-if="Btnshow" @click="addshowClick">
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
        <Button
          v-if="actionKey !== 'read'"
          class="pull-right"
          type="primary"
          @click="saveDeatil">保存</Button>
          <Button
          v-if="actionsBtn"
          class="pull-right"
          type="primary"
          @click="addguoxun">新增保存</Button>
          <Button
          v-if="actionsBtnedit"
          class="pull-right"
          type="primary"
          @click="editguoxun">修改保存</Button>
        <Button class="pull-right" @click="backTable">返回</Button>
      </div>
      <div class="detail-form">

        <div class="add pull-left">
          <Poptip
            v-model="addPoptipShow"
            class="dataAfterReport-addPoptip"
            placement="left-start"
            width="200">
            <Button type="primary" class="addClickshow">
              <span class="icon-xinzeng"></span>请先选择统计表类型
            </Button>
            <div class="dataAfterReport-addContent" slot="content">
              <div class="add-title">请先选择统计表类型</div>
              <div class="add-list">
                <div
                  v-for="item in tableNames"
                  class="add-detail"
                  @click="addClick(item)">{{item.title}}</div>
              </div>
            </div>
          </Poptip>
        </div>


        <div class="form-item">
          <Select
            v-model="currentDetailData.response_no"
            placeholder="请再选择应急响应编号"
            :disabled="actionKey === 'edit'">
            <Option
              v-for="item in responseNoList"
              :value="item.response_no"
              :key="item.response_no">{{ item.response_no }}</Option>
          </Select>
        </div>
        <Button
          type="primary"
          class="addClickshow"
          v-if="dieShow"
          @click="adddieBtn">添加人员</Button>
      </div>

      <component
        ref="detail"
        :isNeedEdit="actionKey !== 'read'"
        :data="currentDetailValue"
        :is="currentDetail.key"
        :dataArr="dataArr"></component>
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
import flood from 'base/NationalFloodTabledata/flood'
import forestry from 'base/NationalFloodTabledata/forestry'
import industry from 'base/NationalFloodTabledata/industry'
import water from 'base/NationalFloodTabledata/water'
import die from 'base/NationalFloodTabledata/die'
import logging from 'base/NationalFloodTabledata/logging'
import material from 'base/NationalFloodTabledata/material'
import money from 'base/NationalFloodTabledata/money'
import realdata from 'base/NationalFloodTabledata/realdata'
import { getList, getDetail, changeDetail, getResponseNo, Getaddguoxun, Geteditguoxun } from 'api/data-afterReport'
import { loadingMixin } from 'common/js/mixins'
import { dataAfterReportThead } from 'common/js/table'
import { betweenSearchRule, monthFormat, gtSearchRule, ltSearchRule } from 'common/js/config'
import { timeFilter } from 'common/js/util'
import { errorMessage, successMessage, getLocalStorage } from 'common/js/dom'
import { dataAfterReportTableName } from 'common/js/module'

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
      // console.log(this.currentDetailData.data)
      if (!this.currentDetailData.data) {
        return {}
      }

      const data = {}

      this.currentDetailData.data.map(item => {
        // console.log(item)
        data[item.cell_id] = item.value
        // data.row_name1 = item.row_name1
      })

      return data
    }
  },
  created () {
    this._getList()
    this._getResponseNo()
    this._getDetail()
  },
  data () {
    return {
      formInline: {
        startTime: '',
        endTime: '',
        title: ''
      },
      Btnshow: true,
      tableNames: dataAfterReportTableName,
      thead: dataAfterReportThead(this),
      tbody: [],
      total: 0,
      current: 1,
      loading: false,
      actionKey: 'new',
      addPoptipShow: false,
      currentDetail: {
        key: 'flood'
      },
      currentDetailData: {
        response_no: '',
        title: '',
        data: []
      },
      isShowDetail: false,
      responseNoList: [],
      isShowSureModal: false,
      dieShow: false,
      actionsBtn: false,
      dataresponguoxun: [],
      actionsBtnedit: false,
      dataArr: []
    }
  },
  methods: {
    addguoxun () {
      let search = {
        response_no: this.currentDetailData.response_no,
        department_code: getLocalStorage('info').department_code,
        title: '死亡人员基本情况统计表',
        data: getLocalStorage('tempArrres')
      }
      Getaddguoxun(search).then(res => {
        if (res.code === '0001') {
          errorMessage(res.message)
        } else if (res.code === '0000') {
          successMessage('操作成功')
          this.isShowDetail = false
          this._getList()
        }
      })
    },
    // 添加多一行
    adddieBtn () {
      this.$refs.detail.adddataArr()
    },
    editguoxun () {
      let editsearch = {
        response_no: this.currentDetailData.response_no,
        department_code: getLocalStorage('info').department_code,
        title: '死亡人员基本情况统计表',
        data: this.currentDetailData.data,
        _id: this.currentDetailData._id
      }
      Geteditguoxun(editsearch).then(res => {
        // console.log(res)
        if (res.code === '0000') {
          successMessage(res.message)
          this.isShowDetail = false
          this._getList()
        }
      })
    },
    saveDeatil () {
      if (!this.currentDetailData.response_no) {
        errorMessage('请先选择应急响应编号')
        return
      }

      const cloneData = JSON.parse(JSON.stringify(this.currentDetailData.data))
      const value = this.$refs['detail'].getData()
      // 打印保存后的value
      cloneData.map(item => {
        console.log(item)
        console.log('---------')
        item.value = value[item.cell_id]
        // item.row_name1 = value.row_name1
      })

      const data = JSON.parse(JSON.stringify(this.currentDetailData))
      data['data'] = cloneData

      if (this.actionKey === 'new') {
        data['response_no'] = this.currentDetailData.response_no
        data['title'] = this.currentDetail.title
      }

      this._changeDetail(data)
    },
    backTable () {
      this.isShowDetail = false
      this.currentDetailData = {
        response_no: '',
        title: '',
        data: []
      }
    },
    changePage (page) {
      this.current = page
      this._getList()
    },
    addshowClick () {
      this.isShowDetail = true
      this.actionKey = 'new'
    },
    // 选择下拉框
    addClick (item) {
      // console.log(this.actionKey)
      if (item.key === 'die' || item.title === '死亡人员基本情况统计表') {
        this.actionKey = 'new'
        this.dieShow = true
        this.actionsBtn = true
      } else {
        this.dieShow = false
        this.actionsBtn = false
      }
      // console.log(this.actionKey)
      // if (this.actionKey === 'new') {
      //   this.actionKey = 'read'
      // } else {
      //   this.actionKey = 'new'
      // }
      this.currentDetail = item
      this.addPoptipShow = false
      this._getDetail()
    },
    // 点击详情
    readClick (row) {
      // console.log(row)
      this.actionKey = 'read'
      this.actionsBtn = false
      this.currentDetail = this.tableNames.find(item => item.title === row.title)
      this.currentDetailData = row
      this.dataArr = row.data
      getLocalStorage('rowreadname', row.data)
      this.isShowDetail = true
    },
    // 点击编辑
    editClick (row) {
      this.actionKey = 'edit'
      if (row.title === '死亡人员基本情况统计表') {
        this.actionKey = 'read'
      } else {
        this.actionKey = 'edit'
      }
      this.actionsBtnedit = true
      this.actionsBtn = false
      this.currentDetail = this.tableNames.find(item => item.title === row.title)
      this.currentDetailData = row
      this.dataArr = row.data
      this.isShowDetail = true
    },
    actionClick (type, data) {
      this.actionKey = type
      this.currentActionData = data
      this.isShowSureModal = true
    },
    actionSure () {
      this._changeDetail({ _id: this.currentActionData._id })
    },
    submitSearch () {
      this._getList()
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
    async _getResponseNo () {
      const res = await getResponseNo()

      if (res && res.code === ERR_OK) {
        this.responseNoList = res.result.result
      }
    },
    async _getDetail () {
      this.loading = true

      const res = await getDetail(this.currentDetail.title)
      this.loading = false

      if (res && res.code === ERR_OK) {
        this.currentDetailData.data = res.result
        console.log(this.currentDetailData.data)
      }
    },
    async _getList () {
      const search = {}

      const { startTime, endTime, title } = this.formInline

      if (startTime || endTime) {
        const start = new Date(startTime)
        const end = new Date(endTime)

        if (startTime && endTime) {
          if (start.getTime() > end.getTime()) {
            errorMessage('统计时间格式不对')
            return
          }
          search.response_createdt = `${timeFilter(start, monthFormat)}${betweenSearchRule}${timeFilter(end, monthFormat)}`
        } else if (startTime && !endTime) {
          search.response_createdt = `${timeFilter(start, monthFormat)}${gtSearchRule}`
        } else if (!startTime && endTime) {
          search.response_createdt = `${timeFilter(end, monthFormat)}${ltSearchRule}`
        }
      }

      if (title) {
        search.title = title
      }

      this.loading = true
      if (getLocalStorage('info').role === '系统管理员') {
        this.Btnshow = false
      } else {
        this.Btnshow = true
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

<style lang="scss">
  .dataAfterReport-addPoptip {
    width: 100%;
    height: 100%;
    .ivu-poptip-rel {
      width: 100% !important;
      height: 100% !important;
    }
    .ivu-poptip-body {
      padding: 0;
    }
    .dataAfterReport-addContent {
      > .add-title {
        font-size: 14px;
        line-height: 35px;
        border-bottom: 1px solid lightgray;
        padding-left: 5px;
      }
      > .add-list {
        > .add-detail {
          line-height: 30px;
          padding-left: 10px;
          color: #515a6e;
          &:hover {
            background-color: #f3f3f3;
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .addBtn {
		background-color: #40b0ff;
		color: #fff;
		margin: 5px;
		height: 30px;
	}

	.data-afterReport {
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
      > .detail-form {
        width: 200px;
        margin: 0 auto;
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
  .addClickshow {
    width: 200px;
  }
</style>
