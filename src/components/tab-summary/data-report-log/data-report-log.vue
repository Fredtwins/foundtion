<template>
  <div class="datareportlog">
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
        <BreadcrumbItem>数据报表日志</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索 -->
    <Form ref="formInline" :model="formInline" inline :label-width="100">
      <Form-item label="应急响应编号" prop="response_no">
        <Input v-model="formInline.response_no" placeholder="请输入应急响应编号"></Input>
      </Form-item>
      <Form-item label="表单名称" prop="formname">
        <Input v-model="formInline.formname" placeholder="请输入表单名称"></Input>
      </Form-item>
      <Form-item label="部门名称" prop="department_name">
        <Input v-model="formInline.department_name" placeholder="请输入部门名称"></Input>
      </Form-item>
      <Form-item label="统计时间" prop="logtime">
        <DatePicker
          clearable
          @on-change="selectDate"
          v-model="formInline.logtime"
          type="datetime"
          placeholder="请选择"
        ></DatePicker>
        <!-- <Input v-model="formInline.logtime" placeholder="请输入起止时间"></Input> -->
      </Form-item>
      <div class="searchBtn">
        <Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch(1)"></Button>
      </div>
      <div style="display:inline-block">
        <Button type="info" @click="refresh" style="width:80px">查看全部</Button>
      </div>
    </Form>

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
      <Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>
    <div v-if="addPageShow" class="addPage">
      <div class="title">
        <span class="titleleft"></span>
        <span>位置 :</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>报表汇总</BreadcrumbItem>
          <BreadcrumbItem>事中报表统计</BreadcrumbItem>
          <BreadcrumbItem to="/home/tab-summary/data-report-log">数据报表日志</BreadcrumbItem>
          <BreadcrumbItem>详细信息</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <add-page @cancel="cancel" :model="formItem"></add-page>
    </div>
  </div>
</template>

<script>
import addPage from './addPage.vue'
import { rpdataApi } from 'api/tab-summary'
import { dataReportLogThead } from 'common/js/table'
import { likeStrSearch, timeFilter } from 'common/js/util'
import { mapGetters, mapMutations } from 'vuex'

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
  components: {
    addPage
  },
  data () {
    return {
      spinShow: false,
      loading: false,
      addPageShow: false,
      formInline: {
        response_no: '',
        formname: '',
        department_name: '',
        logtime: ''
      },
      postDetailObj: {
        page: 1,
        pageSize: 20,
        order: {_id: -1},
        searchValue: {
          'response_no': '',
          'formname': ''
        }
      },
      tableThead: dataReportLogThead(this),
      tableTbody: [],
      formItem: [],
      current: 1,
      total: 0
    }
  },
  methods: {
    // 搜索
    submitSearch (page) {
      let search = {}
      if (this.formInline.formname) {
        search.formname = likeStrSearch(this.formInline.formname)
      }
      if (this.formInline.response_no) {
        search.response_no = likeStrSearch(this.formInline.response_no)
      }
      if (this.formInline.department_name) {
        search.department_name = likeStrSearch(this.formInline.department_name)
      }
      if (this.formInline.logtime) {
        search.logtime = this.formInline.logtime
      }
      this._defUserList(page, search)
    },
    // 页码
    changePage: function (page) {
      this.current = page
      this.submitSearch(page)
      // this._defUserList(page)
    },
    cancel () {
      this.addPageShow = false
    },
    ...mapMutations(['SET_STATUS']),
    // 列表
    _defUserList (page, search) {
      this.loading = true
      rpdataApi(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
          this.current = res.result.page
        }
      })
    },
    details (dataObj) {
      this.SET_STATUS(true)
      this.spinShow = true

      this.addPageShow = true
      this.spinShow = false
      let dataArr = []
      dataArr.push(dataObj)
      this.formItem = dataArr
      // this.postDetailObj.searchValue.response_no = dataObj.response_no
      // this.postDetailObj.searchValue.formname = dataObj.formname
      // rpadataDetailApi(this.postDetailObj).then(res => {
      //   this.addPageShow = true
      //   this.spinShow = false
      //   if (res.code === '0000') {
      //     this.formItem = res.result.result
      //   }
      // })
    },
    selectDate (date) {
      if (date) {
        let startTime = date
        this.formInline.logtime = date
        let newTime = new Date()
        let endTime = timeFilter(newTime, 'yyyy-MM-dd HH:mm:ss')
        let datetime = startTime + '|#|' + endTime
        this.formInline.logtime = datetime
      }
    },
    // 查看全部
    refresh () {
      this._defUserList()
    }
  },
  mounted () {
    this._defUserList()
    this.rowIng = {}
  }
}
</script>

<style scoped lang="scss">
  .datareportlog {
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
      z-index: 99;
      > span {
        font-size: 14px;
        font-weight: 600;
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
