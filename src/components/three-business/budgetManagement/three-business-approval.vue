<template>
  <div class="three-business-approval">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
        <BreadcrumbItem>预案管理</BreadcrumbItem>
        <BreadcrumbItem>预案审批</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <Tabs type="card" :animated="false" @on-click="tabChange" :value="tabName">
      <TabPane label="生效审批" name="生效审批">
        <div class="search">
          <span class="search_title">执行部门</span>
          <Select
            clearable
            :label="searchVal.department_fullname"
            not-found-text="无匹配部门，请重新输入"
            v-model="searchVal.department_fullname"
            filterable
            remote
            :remote-method="autoSearch"
            :loading="selectLoading"
            style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
            @on-change="selected"
          >
            <Option
              v-for="(option, index) in autoCompleteData"
              :value="option.value"
              :key="index"
            >{{option.label}}</Option>
          </Select>
          <span class="search_title">预案类型</span>
          <Select
            v-model="searchVal.plan_category"
            placeholder="请选择"
            :clearable="true"
            style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
          >
            <Option
              v-for="item in draftsmanList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <div class="searchBtn" @click="search">
            <Button type="ghost" shape="circle" icon="ios-search"></Button>
          </div>
          <div class="refresh" @click="refresh">
            <Button>查看全部</Button>
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
      </TabPane>
      <TabPane label="失效审批" name="失效审批">
        <div class="search">
          <span class="search_title">执行部门</span>
          <Select
            clearable
            :label="searchVal.department_fullname"
            not-found-text="无匹配部门，请重新输入"
            v-model="searchVal.department_fullname"
            filterable
            remote
            :remote-method="autoSearch"
            :loading="selectLoading"
            style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
            @on-change="selected"
          >
            <Option
              v-for="(option, index) in autoCompleteData"
              :value="option.value"
              :key="index"
            >{{option.label}}</Option>
          </Select>
          <span class="search_title">预案类型</span>
          <Select
            v-model="searchVal.plan_category"
            placeholder="请选择"
            :clearable="true"
            style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
          >
            <Option
              v-for="item in draftsmanList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <div class="searchBtn" @click="search">
            <Button type="ghost" shape="circle" icon="ios-search"></Button>
          </div>
          <div class="refresh" @click="refresh">
            <Button>查看全部</Button>
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
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getAprList, approve, withdraw } from 'api/plan_management'
import { getUserIng, initTime } from 'common/js/util'
import { approvalThead } from 'common/js/table'
import { depPlanQuery } from 'common/js/query'
import { getLocalStorage, successNotice, errorNotice } from 'common/js/dom'
import { getDepList } from 'api/bumenlist'
export default {
  data () {
    return {
      tabName: '生效审批',
      loading: false,
      tableThead: approvalThead(this),
      tableTbody: [],
      total: 0,
      searchVal: {
        department_fullname: '',
        status: '',
        createby: ''
      },
      depList: depPlanQuery().depList,
      statusList: depPlanQuery().statusList,
      draftsmanList: depPlanQuery().draftsmanList,
      postObj: {
        'order': { _id: -1 },
        'page': 1,
        'pageSize': 10,
        'searchValue': { 'status': '待审批' }
      },
      selectLoading: false,
      autoCompleteData: [],
      departmentList: [],
      currentstatus: '待审批'
    }
  },
  created () {
    window.sessionStorage.setItem('tabName', '生效审批')
    this._getDepList()
    setTimeout(() => {
      let name = window.sessionStorage.getItem('tabName')
      if (name) {
        if (name === '生效审批') {
          this.tabName = '生效审批'
          this.postObj.searchValue = {status: '待审批'}
        } else if (name === '失效审批') {
          this.tabName = '失效审批'
          this.postObj.searchValue = {status: '生效'}
        }
      }
      this.getList()
    }, 100)
  },
  methods: {
    // 切换tab栏
    tabChange (name) {
      switch (name) {
        case '生效审批':
          window.sessionStorage.setItem('tabName', '生效审批')
          this.searchVal = {}
          this.postObj.searchValue = {status: '待审批'}
          this.currentstatus = '待审批'
          this.getList()
          break
        case '失效审批':
          window.sessionStorage.setItem('tabName', '失效审批')
          this.searchVal = {}
          this.postObj.searchValue = {status: '生效'}
          this.currentstatus = '生效'
          this.getList()
          break
        default:
          break
      }
    },
    // 查看全部
    refresh () {
      this.postObj.searchValue = { 'status': this.currentstatus }
      this.getList()
    },
    selected (value) {
      if (value) {
        let index = this.departmentList.findIndex(item => value === item.department_fullname)
        this.searchVal.department_fullname = this.departmentList[index].department_fullname
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
      getAprList(this.postObj).then(res => {
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
      this.postObj.searchValue.status = this.currentstatus
      this.getList()
    },
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    details (dataObj) {
      getLocalStorage('id', dataObj._id)
      this.$router.push({ path: '/home/threeBusiness/erp_default' })
    },
    approval (dataObj) {
      var username = getUserIng().username
      let pObj = {}
      if (dataObj.status === '生效') {
        pObj = { '_id': dataObj._id, 'status': '失效', 'approveby': username, 'approvedt': initTime() }
      } else if (dataObj.status === '待审批') {
        pObj = { '_id': dataObj._id, 'status': '生效', 'approveby': username, 'approvedt': initTime() }
      }
      approve(pObj).then(res => {
        if (res.code === '0000') {
          this.postObj.searchValue.status = this.currentstatus
          this.getList()
          successNotice('审批成功')
        }
      })
    },
    back (dataObj) {
      var username = getUserIng().username
      var pObj = { '_id': dataObj._id, 'status': '草稿', 'approveby': username, 'approvedt': initTime() }
      withdraw(pObj).then(res => {
        if (res.code === '0000') {
          this.getList()
          successNotice('已回退为草稿')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .three-business-approval {
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
      .refresh {
        display: inline-block;
        button {
          border-radius: 0;
          background: #18bdff;
          color: #fff;
        }
      }
    }
  }
</style>
