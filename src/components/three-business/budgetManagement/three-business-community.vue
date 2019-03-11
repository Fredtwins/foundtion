<template>
  <div class="three-business-community">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
        <BreadcrumbItem>预案管理</BreadcrumbItem>
        <BreadcrumbItem>社区预案</BreadcrumbItem>
      </Breadcrumb>
    </div>
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
      <span class="search_title">预案状态</span>
      <Select
        v-model="searchVal.status"
        placeholder="请选择"
        :clearable="true"
        style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
      >
        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span class="search_title">起草人</span>
      <Input
        v-model="searchVal.createby"
        placeholder="请选择"
        style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
      ></Input>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <div class="refresh" @click="refresh">
        <Button>查看全部</Button>
      </div>
      <div class="add pull-right" @click="add">
        <Button>
          <span class="icon-xinzeng"></span>新增
        </Button>
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
      >
        <!-- <table-loading slot="loading"></table-loading> -->
      </Table>
    </div>
    <div class="page" style="text-align:center">
      <Page :current="current" :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <!--确认删除  -->
    <Modal v-model="sure_del" width="360">
      <p slot="header" style="color:red;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除</span>
      </p>
      <div style="text-align:center">
        <p>确认删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="dels">确认</Button>
      </div>
    </Modal>
    <!--确认提交申请  -->
    <Modal v-model="sure_sub" width="360">
      <p slot="header" style="color:red;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>提交</span>
      </p>
      <div style="text-align:center">
        <p>确认提交？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="sureSub">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { departmentThead } from 'common/js/table'
import { deleteDep, getcotList, submit } from 'api/plan_management'
import { getUserIng, likeStrSearch, cloneObj, setAction, getAction } from 'common/js/util'
import { depPlanQuery } from 'common/js/query'
import { getLocalStorage, senActive, getSessionStorage, successNotice, errorNotice } from 'common/js/dom'
import { getDepList } from 'api/bumenlist'
import tableLoading from 'base/loading/loading'

export default {
  components: {
    tableLoading
  },
  data () {
    return {
      loading: false,
      tableThead: departmentThead(this),
      tableTbody: [],
      sure_del: false,
      sure_sub: false,
      disabled: false,
      total: 0,
      searchVal: {
        department_name: '',
        status: '',
        createby: ''
      },
      dataList: [],
      depList: depPlanQuery().depList,
      statusList: depPlanQuery().statusList,
      draftsmanList: '',
      postObj: {
        'page': 1,
        'pageSize': 10,
        'order': { _id: -1 },
        'searchValue': {
          department_code: likeStrSearch(getUserIng().department_code),
          department_level: getUserIng().department_level,
          plan_category: '社区预案'
        }
      },
      departmentInfo: [],
      selectLoading: false,
      autoCompleteData: [],
      departmentList: [],
      current: 1
    }
  },
  created () {
    getSessionStorage('name', 'comp')
    this.postObj.page = getLocalStorage('index')
    this.current = this.postObj.page
    if (getLocalStorage('searchValue') && getLocalStorage('searchValue').plan_category === '社区预案') {
      this.postObj.searchValue = getLocalStorage('searchValue')
    } else {
      this.postObj.searchValue = {
        department_code: likeStrSearch(getUserIng().department_code),
        department_level: getUserIng().department_level,
        plan_category: '社区预案'
      }
    }
    this._getDepList()
  },
  mounted () {
    // this.getList()
  },
  methods: {
    // 查看全部
    refresh () {
      this.postObj.searchValue = { plan_category: '社区预案' }
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
          this.getList()
        }
      })
    },
    getList () {
      this.dataList = []
      this.loading = true
      // let department_name = getLocalStorage('info').department_name
      // let department_code = getLocalStorage('info').department_code
      // let department_level = getLocalStorage('info').department_level
      getcotList(this.postObj).then(res => {
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
    dels () {
      deleteDep(this.del_obj).then(res => {
        this.sure_del = false
        if (res.code === '0000') {
          this.getList()
          successNotice('删除成功')
        } else {
          errorNotice(res.message)
        }
      })
    },
    sureSub () {
      this.sure_sub = false
      submit(this.sub_obj).then(res => {
        if (res.code === '0000') {
          this.$Notice.success({
            title: '已提交您的审批请求，我们会火速帮您处理，请静待回音',
            duration: 1
          })
          this.getList()
        } else if (res.code === '0001') {
          this.$Notice.error({
            title: '请不要重复提交审批',
            duration: 1
          })
        }
      })
    },
    add () {
      var obj = getAction()
      obj.fourth = 0
      setAction(obj)
      senActive(0)
      this.$router.push('/home/threeBusiness/er_plan/general')
      // this.$router.push('/home/threeBusiness/erp_default')
      getLocalStorage('id', ' ')
      getLocalStorage('status', 'add')
    },
    edit (dataObj, index) {
      var obj = getAction()
      obj.fourth = 0
      setAction(obj)
      getLocalStorage('id', dataObj._id)
      senActive(0)
      this.$router.push('/home/threeBusiness/er_plan/general')
      // this.$router.push('/home/threeBusiness/erp_default')
      getLocalStorage('status', 'edit')
    },
    delete (index) {
      this.sure_del = true
      this.del_obj = { _id: this.tableTbody[index]._id }
    },
    details (dataObj) {
      getLocalStorage('status', 'details')
      var obj = getAction()
      obj.fourth = 0
      setAction(obj)
      senActive(0)
      getLocalStorage('id', dataObj._id)
      getLocalStorage('dep_name', dataObj.department_name)
      this.$router.push({ path: '/home/threeBusiness/erp_default' })
    },
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.searchVal.plan_category = '社区预案'
      this.postObj.searchValue = cloneObj(this.searchVal)
      if (this.postObj.searchValue.createby) {
        this.postObj.searchValue.createby = likeStrSearch(this.postObj.searchValue.createby)
      }
      if (this.postObj.searchValue.department_fullname) {
        delete this.postObj.searchValue.department_code
        delete this.postObj.searchValue.department_level
      } else {
        this.postObj.searchValue = {
          department_code: likeStrSearch(getUserIng().department_code),
          department_level: getUserIng().department_level,
          ...this.postObj.searchValue
        }
      }
      getLocalStorage('searchValue', this.postObj.searchValue)
      this.getList()
    },
    pageChange (index) {
      this.current = index
      getLocalStorage('index', index)
      this.postObj.page = index
      this.getList()
      // this.tableTbody = divisionArr(this.dataList)[index - 1]
    },
    submit (dataObj) {
      this.sub_obj = { '_id': dataObj._id, 'status': '待审批' }
      this.sure_sub = true
    }
  }
}
</script>

<style scoped lang="scss">
	.three-business-community {
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
      .titleleft {
        height: 29px;
        width: 9px;
        display: inline-block;
        margin-top: 7px;
        margin-right: 20px;
        background-color: #224ca5;
      }
			>span {
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
					background: #224ca5;
					color: #fff;
				}
      }
      .add {
        background-color: #224ca5;
        color: #fff;
        button {
          background-color: #224ca5;
          color: #fff;
        }
      }
		}
  }
  .icon-xinzeng {
    background-color: #224ca5;
    color: #fff;
  }
</style>
