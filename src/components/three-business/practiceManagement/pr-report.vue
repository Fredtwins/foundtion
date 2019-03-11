<template>
  <div class="pr-report">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>三防业务</BreadcrumbItem>
        <BreadcrumbItem>演练管理</BreadcrumbItem>
        <BreadcrumbItem>演练报告</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">计划开始时间</span>
      <DatePicker
        v-model="searchVal.plan_start"
        format="yyyy-MM-dd"
        type="date"
        placeholder="请选择日期"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      ></DatePicker>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <!-- <div class="add pull-right" @click="add">
				<Button type="primary">
					<span class="icon-xinzeng"></span>新增</Button>
      </div>-->
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
    <div class="page pageStyle pull-right">
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <div class="addPage" v-if="addPageShow"></div>
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
  </div>
</template>

<script>
import { prReportThead } from 'common/js/table'
import { successNotice, errorNotice } from 'common/js/dom'
import { mapGetters, mapMutations } from 'vuex'
import { getDepList } from 'api/bumenlist'
import { prReportApi, prDataApi } from 'api/practice-management'
import { cloneObj, timeFilter } from 'common/js/util'
import { dateFormat } from 'common/js/config'

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
  data () {
    return {
      apiType: 'list',
      operationText: '新增',
      sure_del: false,
      addPageShow: false,
      searchVal: {},
      tableThead: prReportThead(this),
      tableTbody: [],
      total: 0,
      loading: false,
      departmentList: [],
      autoCompleteData: [],
      selectLoading: false,
      id: '',
      postObj: {
        order: {_id: -1},
        page: 1,
        pageSize: 10,
        searchValue: {}
      },
      formItem: {}
    }
  },
  created () {
    // this._getDepList()
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      prReportApi(this.postObj).then(res => {
        this.loading = false
        if (res.code === '0000') {
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    // 点击新增
    add () {
      this.SET_STATUS(true)
      this.addPageShow = true
      this.apiType = 'new'
      this.operationText = '新增'
    },
    edit (dataObj) {
      this.apiType = 'edit'
      this.operationText = '修改'
    },
    // 点击删除
    delete (dateObj) {
      this.sure_del = true
      this.id = dateObj._id
    },
    // 确认删除
    dels () {
      this.sure_del = false
      prDataApi('delete').then(res => {
        if (res.code === '0000') {
          successNotice(res.message)
          this.getList()
        }
      })
    },
    ...mapMutations(['SET_STATUS']),
    // 点击搜索
    search () {
      this.postObj.searchValue = cloneObj(this.searchVal)
      if (this.searchVal.plan_start) {
        this.postObj.searchValue.plan_start = timeFilter(this.searchVal.plan_start, dateFormat)
      }
      this.getList()
    },
    // 分页
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    selected (value) {
      if (value) {
        let index = this.departmentList.findIndex(item => value === item.department_fullname)
        this.searchVal.department_fullname = this.departmentList[index].department_fullname
        this.name = this.departmentList[index].department_name
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
    // 点击保存
    save () {
      prReportApi(this.apiType, this.formItem).then(res => {
        if (res.code === '0000') {
          successNotice(res.message)
          this.getList()
        } else {
          errorNotice(res.message, true)
        }
      })
    },
    // 点击取消
    cancel () {
      this.addPageShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
	.pr-report {
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
