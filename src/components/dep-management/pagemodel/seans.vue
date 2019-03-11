<template>
  <div class="Report">
    <div class="titles">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>数据查看</BreadcrumbItem>
        <BreadcrumbItem>{{formName}}</BreadcrumbItem>
        <BreadcrumbItem>
          <a href="javascript:;" @click="jump">返回</a>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索条件-->
    <Form ref="formInline" inline :label-width="60">
      <Form-item label="上报时间">
        <DatePicker
          v-model="formInline.input_time"
          format="yyyy-MM-dd"
          @on-change="dateChange1"
          type="date"
          confirm
          placeholder="请选择时间"
          style="width: 200px"
        ></DatePicker>
      </Form-item>
      <!--<Form-item label="部门">
				<Input v-model="formInline.department_name" :maxlength="16" placeholder="请输入部门"></Input>
      </Form-item>-->
      <Form-item label="选择部门" style="width:100px">
        <Select v-model="formInline.department_name" @on-change="depcoed" style="width:200px">
          <Option
            v-for="item in departmentLists"
            :value="item.name"
            :key="item.department_code"
          >{{ item.name }}</Option>
        </Select>
      </Form-item>
      <div class="searchBtn">
        <Button
          class="pull-right"
          type="ghost"
          shape="circle"
          icon="ios-search"
          @click="submitsearch(1)"
        ></Button>
      </div>
    </Form>

    <div class="table">
      <Table :loading="loading" border highlight-row :data="UserDatas" :columns="theadArrs" stripe></Table>
      <!--<Page class="pull-right" :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>-->
    </div>
    <div class="page pageStyle pull-right">
      <Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getUserList, getList } from 'api/Report'
import { getLocalStorage } from 'common/js/dom'
import { likeStrSearch, timeFilter } from 'common/js/util'
import { ReportThead } from 'common/js/table'
import { getbumensList } from 'api/bumenlist'

/* eslint-disable */
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    departmentName: {
      type: String,
      default: ''
    },
    departInfo: {
      type: Object
    }

  },
  computed: {
    ...mapGetters([
      'DepartReportInfo'
    ])
  },
  data () {
    return {
      formName: '',
      formInline: {
        input_time: '',
        department_name: ''
      },
      loading: false,
      modal3: false,
      modal_loading: false,
      UserData: [],
      theadArr: ReportThead(this),
      formItem: {},
      UserDatas: [],
      theadArrs: [],
      total: 2000,
      current: 1,
      departmentNameList: [],
      titleType: '',
      timeAgos: '',
      departmentLists: []
    }
  },
  methods: {
    jump () {
      if (this.departInfo) {
        this.$emit('jump', 'false')
      } else {
        let path = getLocalStorage('formPath')
        this.$router.push(path)
      }
    },
    // 部门列表
    getDepartmentNameList (page, search) {
      getbumensList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.departmentLists = res.result.result
        }
      })
    },
    depcoed (names) {
      this.department_name = names
    },
    dateChange1 (date) {
      this.formInline.input_time = date
    },
    // 搜索
    submitsearch (page) {
      let search = {}
      if (this.formInline.input_time) {
        let atr = timeFilter(new Date(this.formInline.input_time), 'yyyy-MM-dd')
        search.input_time = likeStrSearch(atr)
      }
      if (this.formInline.department_name) {
        search.department_name = this.formInline.department_name
      }

      this._getList(page, search, {
        form_name: this.formItem.form_name
      })
    },
    // 表格列表
    _getUserList (page) {
      let form_name = ''
      if (this.departInfo) {
        form_name = this.departInfo.name
      } else {
        form_name = getLocalStorage('form_name')
      }
      let searchValue = {
        'form_name': form_name
      }
      this.formName = form_name
      this.loading = true

      if (getLocalStorage('form_name') != 'false') {
        getUserList(searchValue).then(res => {
          if (res.code === ERR_OK) {
            this.loading = false
            this.formItem.form_name = res.result.result[0].form_name
            this.UserData = res.result.result[0].col_info
            this.total = res.result.totalSize
            this._initList()
          }
        })
      }
    },
    changePage (page) {
      this.page = page
      this._getList(page, {
        department_name: getLocalStorage('info').department_name,
        department_code: getLocalStorage('info').department_code,
        department_level: getLocalStorage('info').department_level
      }, {
        form_name: this.formItem.form_name
      })
    },
    _initList () {
      // let arr = false
      this.theadArrs.push({
        title: '序号',
        type: 'index',
        align: 'center',
        width: 60
      }, {
        title: '应急响应编号',
        key: 'response_no',
        align: 'center'
      }, {
        title: '上报时间',
        key: 'input_time',
        align: 'center'
      }, {
        title: '部门',
        key: 'department_name',
        align: 'center'
      })
      this.UserData.map(item => {
        this.theadArrs.push({
          title: item['栏位名称'],
          align: 'center',
          key: item['栏位名称']
        })
      })
      this._getList(1, {
        department_name: getLocalStorage('info').department_name,
        department_code: getLocalStorage('info').department_code,
        department_level: getLocalStorage('info').department_level
      }, {
        form_name: this.formItem.form_name
      })
    },
    // 数据列表展示
    _getList (page, search, addSearch) {
      getList(page, search, addSearch).then(res => {
        if (res.code === ERR_OK) {
          this.UserDatas = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    // 点击保存跳转
    _getedgList () {
      let path = ''
      if (this.name) {
        path = '/home/threeBusiness/magTask'
      } else {
        path = getLocalStorage('formPath')
      }
      this.$router.push(path)
    },
    ...mapMutations(['SET_STATUS']),
    getStatus () {
      this.SET_STATUS(true)
    }
  },
  mounted () {
    this._getUserList()
    this.getDepartmentNameList()
  },
  created () {
    this.getStatus()
    this.id = getLocalStorage('id')
    this.ids = getLocalStorage('ids')
  }
}
/* eslint-enable */
</script>

<style scoped lang="scss">
	.Report {
		.titles {
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
			.btns {
				font-size: 26px;
				width: 30px;
				height: 30px;
			}
			>span {
				font-size: 14px;
				font-weight: 600;
			}
		}
		.addBtn {
			background-color: #40b0ff;
			color: #fff;
			margin: 5px;
			height: 30px;
		}
	}

	.searchBtn {
		position: relative;
		left: 200px;
	}
</style>
