<template>
  <div class="three-business-default">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
        <BreadcrumbItem>预案管理</BreadcrumbItem>
        <BreadcrumbItem>部门预案</BreadcrumbItem>
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
        <Button type="primary">
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
      ></Table>
    </div>
    <div class="page">
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
import { getdepList, deleteDep, submit } from 'api/plan_management'
import { getUserIng, likeStrSearch, cloneObj, setAction, getAction } from 'common/js/util'
import { depPlanQuery } from 'common/js/query'
import { getLocalStorage, senActive, getSessionStorage, successNotice, errorNotice } from 'common/js/dom'
import { depPlan } from 'common/js/rules'
import { getDepList } from 'api/bumenlist'

export default {
  data () {
    return {
      current: 1,
      loading: false,
      del_obj: {},
      sub_obj: {},
      sure_del: false,
      sure_sub: false,
      tableThead: departmentThead(this),
      tableTbody: [],
      disabled: false,
      total: 0,
      moduleTitle: '新增',
      searchVal: {
        department_name: '',
        status: '',
        createby: ''
      },
      postObj: {
        page: 1,
        pageSize: 10,
        order: { _id: -1 },
        searchValue: {
          department_code: likeStrSearch(getUserIng().department_code),
          department_level: getUserIng().department_level,
          plan_category: '部门预案'
        }
      },
      ruleValidate: depPlan,
      depList: depPlanQuery().depList,
      statusList: depPlanQuery().statusList,
      departmentInfo: [],
      selectLoading: false,
      autoCompleteData: [],
      departmentList: [],
      draftsmanList: '',
      dataList: []
    }
  },
  created () {
    this.postObj.page = getLocalStorage('index')
    this.current = this.postObj.page
    if (getLocalStorage('searchValue') && getLocalStorage('searchValue').plan_category === '部门预案') {
      this.postObj.searchValue = getLocalStorage('searchValue')
    } else {
      this.postObj.searchValue = {
        department_code: likeStrSearch(getUserIng().department_code),
        department_level: getUserIng().department_level,
        plan_category: '部门预案'
      }
    }
    getSessionStorage('name', 'erp')
    this._getDepList()
  },
  mounted () { },
  methods: {
    // 查看全部
    refresh () {
      this.postObj.searchValue = { plan_category: '部门预案' }
      this._getPlanList()
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
          this._getPlanList()
        }
      })
    },
    // 删除
    dels () {
      deleteDep(this.del_obj).then(res => {
        this.sure_del = false
        if (res.code === '0000') {
          this._getPlanList()
          successNotice('删除成功')
        } else {
          errorNotice(res.message)
        }
      })
    },
    // 获取数据列表
    _getPlanList () {
      this.dataList = []
      this.loading = true
      // let department_name = getLocalStorage('info').department_name
      // let department_code = getLocalStorage('info').department_code
      // let department_level = getLocalStorage('info').department_level
      getdepList(this.postObj).then(res => {
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
    // 点击新增按钮
    add () {
      var obj = getAction()
      obj.fourth = 0
      setAction(obj)
      senActive(0)
      this.$router.push('/home/threeBusiness/erp_default')
      getLocalStorage('id', ' ')
      getLocalStorage('status', 'add')
    },
    // 查询
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.searchVal.plan_category = '部门预案'
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
      this._getPlanList()
    },
    // 分页
    pageChange (index) {
      this.current = index
      this.postObj.page = index
      this._getPlanList()
      getLocalStorage('index', index)
    },
    // 点击编辑
    edit (dataObj, index) {
      console.log(dataObj)
      var obj = getAction()
      obj.fourth = 0
      setAction(obj)
      getLocalStorage('id', dataObj._id)
      getLocalStorage('planName', dataObj.plan_name)
      senActive(0)
      this.$router.push('/home/threeBusiness/er_plan/general')
      // this.$router.push('/home/threeBusiness/erp_default')
      getLocalStorage('status', 'edit')
    },
    // 点击删除
    delete (index) {
      this.sure_del = true
      this.del_obj = { _id: this.tableTbody[index]._id }
    },
    // 点击详情
    details (dataObj) {
      getLocalStorage('status', 'details')
      var obj = getAction()
      obj.fourth = 0
      setAction(obj)
      senActive(0)
      getLocalStorage('id', dataObj._id)
      getLocalStorage('dep_name', dataObj.department_name)
      this.$router.push('/home/threeBusiness/er_plan/general')
    },
    // 确认审批
    sureSub () {
      this.sure_sub = false
      submit(this.sub_obj).then(res => {
        if (res.code === '0000') {
          this.$Notice.success({
            title: '已提交您的审批请求，我们会火速帮您处理，请静待回音',
            duration: 1
          })
          this._getPlanList()
        } else if (res.code === '0001') {
          this.$Notice.error({
            title: '请不要重复提交审批',
            duration: 1
          })
        }
      })
    },
    // 审批
    submit (dataObj) {
      this.sub_obj = { _id: dataObj._id, status: '待审批' }
      this.sure_sub = true
    }
  }
}
</script>

<style scoped lang="scss">
	.three-business-default {
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
		.table {}
	}
</style>
