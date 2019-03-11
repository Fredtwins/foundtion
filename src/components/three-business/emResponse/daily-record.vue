<template>
  <div class="participants">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
        <BreadcrumbItem>应急响应过程</BreadcrumbItem>
        <BreadcrumbItem>警告事件日志</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">警告时间</span>
      <DatePicker
        clearable
        @on-change="selectDate"
        v-model="searchVal.reporttime"
        type="date"
        placeholder="请选择"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      ></DatePicker>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
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
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
  </div>
</template>

<script>
import { warninDailyThead } from 'common/js/table'
import { warningDailApi } from 'api/er-card'
import { erCardQuery } from 'common/js/query'
import { likeStrSearch } from 'common/js/util'
import { errorNotice } from 'common/js/dom'

export default {
  data () {
    return {
      loading: false,
      formItem: {
        response_type: '',
        response_level: '',
        desc: '',
        criteria: ''
      },
      total: 0,
      postObj: {
        'page': 1,
        'pageSize': 10,
        'searchValue': {},
        'order': { _id: -1 }
      },
      tableThead: warninDailyThead(this),
      tableTbody: [],
      searchVal: {
        response_type: ''
      },
      typeList: erCardQuery().typeList,
      selectLoading: false,
      autoCompleteData: [],
      departmentList: [],
      name: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    selectDate (date) {
      if (date) {
        this.searchVal.reporttime = likeStrSearch(date)
      }
    },
    getList () {
      this.loading = true
      warningDailApi(this.postObj).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
          }
        } else {
          errorNotice('服务器未连接，')
        }
      })
    },
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.postObj.searchValue = this.searchVal
      this.getList()
    },
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
  .participants {
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
      > span {
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
  }
</style>
