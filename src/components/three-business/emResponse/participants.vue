<template>
  <div class="participants">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
        <BreadcrumbItem>应急响应过程</BreadcrumbItem>
        <BreadcrumbItem>参与人员表</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">人员名称</span>
      <Input
        v-model="searchVal.name"
        placeholder="请输入"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      ></Input>
      <span class="search_title">部门名称</span>
      <Select
        clearable
        :label="searchVal.department_fullname"
        not-found-text="无匹配部门，请重新输入"
        v-model="searchVal.department_fullname"
        filterable
        remote
        :remote-method="autoSearch"
        :loading="selectLoading"
        style="width:200px;padding-left: 10px;padding-right: 20px"
        @on-change="selected"
      >
        <Option
          v-for="(option, index) in autoCompleteData"
          :value="option.value"
          :key="index"
        >{{option.label}}</Option>
      </Select>
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
import { participantsThead } from 'common/js/table'
import { participantsApi } from 'api/er-card'
import { erCardQuery } from 'common/js/query'
import { getDepList } from 'api/bumenlist'
import { cloneObj, likeStrSearch } from 'common/js/util'
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
      tableThead: participantsThead(this),
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
    this._getDepList()
    this.getList()
  },
  methods: {
    selected (value) {
      if (value) {
        let index = this.departmentList.findIndex(item => value === item.department_fullname)
        this.searchVal.department_fullname = this.departmentList[index].department_fullname
        this.name = this.departmentList[index].department_code
      }
    },
    autoSearch (query) {
      if (query !== '') {
        this.selectLoading = true
        setTimeout(() => {
          this.selectLoading = false
          this.autoCompleteData = this.departmentList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        this.autoCompleteData = []
      }
    },
    // 获取全部部门信息
    _getDepList () {
      getDepList().then(res => {
        if (res.code === '0000') {
          this.departmentInfo = res.result.result
          this.departmentList = res.result.result.map(item => {
            return {
              value: item.fullname,
              label: item.fullname,
              department_fullname: item.fullname,
              department_name: item.name,
              department_code: item.code,
              department_level: item.level
            }
          })
        }
      })
    },
    getList () {
      this.loading = true
      participantsApi(this.postObj).then(res => {
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
      this.postObj.searchValue = cloneObj(this.searchVal)
      if (this.searchVal.department_fullname) {
        this.postObj.searchValue.department_code = this.name
        delete this.postObj.searchValue.department_fullname
      }
      if (this.postObj.searchValue.name) {
        this.postObj.searchValue.name = likeStrSearch(this.postObj.searchValue.name)
      }
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
