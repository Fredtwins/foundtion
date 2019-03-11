<template>
  <div class="Report">
    <div class="titles">
      <!--<div class="btns" v-if="sanfang" @click="jump" style="cursor:pointer;">
				<Icon type="arrow-left-c"></Icon>
			</div>
      <BreadcrumbItem v-if="sanfang">部门上报数据录入</BreadcrumbItem>-->
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>数据查看</BreadcrumbItem>
        <BreadcrumbItem>{{formName}}</BreadcrumbItem>
        <BreadcrumbItem>
          <a href="javascript:;" @click="jump">返回</a>
        </BreadcrumbItem>
      </Breadcrumb>
      <!--<Button type="primary" v-else="sanfang" style="margin:auto 0" @click="saveAndReturn">返回</Button>-->
    </div>
    <!--输入框-->
    <div class="cont">
      <Form :model="formItem" :label-width="80">
        <h1 class="biaoming" v-model="formItem.form_name">表单名称：{{formItem.form_name}}</h1>
      </Form>
    </div>
    <div class="titl">
      <Button class="addBtn" @click="_getaddList">保存</Button>
    </div>
    <!--表格,可填写-->
    <div class="center table">
      <Table border highlight-row :data="UserData" :columns="theadArr" stripe></Table>
    </div>
    <br>
    <div class="titl">
      <h2>数据列表</h2>
      <Button class="addBtn" @click="_getdeleteList">清除所选中</Button>
    </div>
    <!--数据列表:根据上个数据来显示。动态表单-->
    <div class="table">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Table
        border
        highlight-row
        :data="UserDatas"
        :columns="theadArrs"
        stripe
        @on-select="selected"
      ></Table>
      <!--<Page class="pull-right" :total="total" :pageSize="pageSize" :current="current" show-elevator show-total @on-change="changePage"></Page>-->
    </div>
    <div class="page pageStyle pull-right">
      <Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getUserList, getList, getinputList, getdeleteList } from 'api/Report'
import { getLocalStorage } from 'common/js/dom'
import { ReportThead } from 'common/js/table'

export default {
  props: {
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
      spinShow: false,
      sanfang: true,
      modal3: false,
      modal_loading: false,
      UserData: [],
      theadArr: ReportThead(this),
      formItem: {},
      UserDatas: [],
      theadArrs: [],
      idsArr: [],
      total: 2000,
      current: 1,
      departmentNameList: [],
      temp: true,
      pageSize: 20
    }
  },
  methods: {
    // 保存并返回
    saveAndReturn () {
      this.$emit('saveAndReturn', false)
    },
    /* eslint-disable */
    /* 表格列表 */
    _getUserList (page) {
      var form_name = getLocalStorage('form_name')
      var department_name = getLocalStorage('info').department_name
      var department_code = getLocalStorage('info').department_code
      var department_level = getLocalStorage('info').department_level

      if (this.departInfo !== undefined) {
        this.sanfang = false
        this.DepartReportInfo.department_code = this.departInfo.department_code
        this.DepartReportInfo.department_name = this.departInfo.department_name
        this.DepartReportInfo.department_level = this.departInfo.department_level

        form_name = this.departInfo.name
      }
      let searchValue = {
        'form_name': form_name
      }
      this.formName = form_name
      if (getLocalStorage('id') != 'false') {
        getUserList(searchValue).then(res => {
          //						if(res.code === ERR_OK && res.result.length) {
          if (res.code === ERR_OK) {
            this.formItem.form_name = res.result.result[0].form_name
            this.UserData = res.result.result[0].col_info
            this.total = res.result.totalSize
            this._initList()
          }
        })
      }
    },
    /* 点击保存表格,数据显示下面的表格 */
    _getaddList () {
      let obj = {
        'form_name': this.formItem.form_name,
        response_no: this.departInfo.response_no,
        department_name: getLocalStorage('info').department_name,
        department_code: getLocalStorage('info').department_code,
        department_level: getLocalStorage('info').department_level,
        department_fullname: getLocalStorage('info').department_fullname
      }
      this.UserData.map(item => {
        obj[item['栏位名称']] = item['custom_inputValue']
      })
      this.spinShow = true
      getinputList(obj).then(res => {
        if (res.code === ERR_OK) {
          this._getList(1, {
            department_name: getLocalStorage('info').department_name,
            department_code: getLocalStorage('info').department_code,
            department_level: getLocalStorage('info').department_level,
            department_fullname: getLocalStorage('info').department_fullname
          }, {
            form_name: this.formItem.form_name,
            response_no: this.departInfo.response_no
          })

          this.UserData.map(item => item.custom_inputValue = '')
          this.temp = false
          this.theadArrs = []
          this._getUserList()
          this.temp = true
          this.$Notice.success({
            title: '添加成功'
          })
        } else {
          this.$Notice.warning({
            title: '请检查是否输入数字'
          })
        }
        this.spinShow = false
      })
    },
    /* 分页 */
    changePage: function (page) {
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
      this.theadArrs.push({
        title: '选项(一个)',
        align: 'center',
        width: 120,
        type: 'selection'
      }, {
        title: '应急响应编号',
        align: 'center',
        key: 'response_no'
      }, {
        title: '上报时间',
        align: 'center',
        key: 'input_time'
      }, {
        title: '上报部门',
        align: 'center',
        key: 'department_name'
      }, {
        title: '部门编号',
        align: 'center',
        key: 'department_code'
      })
      // 通过循环来push上去这个栏位名称
      this.UserData.map(item => {
        this.theadArrs.push({
          title: item['栏位名称'],
          align: 'center',
          key: item['栏位名称']
        })
      })
      // 参数调用
      this._getList(1, {
        //					department_name: this.DepartReportInfo.department_name,
        //					department_code: this.DepartReportInfo.department_code,
        //					department_level: this.DepartReportInfo.department_level
        department_name: getLocalStorage('info').department_name,
        department_code: getLocalStorage('info').department_code,
        department_level: getLocalStorage('info').department_level
      }, {
        form_name: this.formItem.form_name
        //
      })
    },
    // 数据列表展示
    _getList (page, search, addSearch) {
      getList(page, search, addSearch).then(res => {
        if (res.code === ERR_OK) {
          this.UserDatas = res.result.result
          this.total = res.result.totalSize
          this.pageSize = res.result.pageSize
        }
      })
    },
    // 点击清除按钮清除,每勾选一个获取对应的id，点击清空时候清空对应的id
    _getdeleteList (id) {
      let ids = this.idsArr.join(',')
      getdeleteList({
        form_name: this.formItem.form_name
      }, ids).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '清空成功'
          })
        } else {
          this.$Notice.warning({
            title: '不对应部门'
          })
        }
        this.temp = false
        this.theadArrs = []
        this._getUserList()
        this.temp = true
      })
    },
    // 点击跳转
    jump () {
      if (this.departInfo) {
        this.$emit('jump', 'false')
      } else {
        this.$router.push('/home/depManagement/Employment')
      }
    },
    // 选项框
    selected (selection, row) {
      this.idsArr.push(row._id)
      // this.formItem = Object.assign(row, this.formItem)
    },
    submitvalue (page) {
      let search = {}
      this._getList(page, search)
    },
    ...mapMutations(['SET_STATUS']),
    getStatus () {
      this.SET_STATUS(true)
    }
  },
  mounted () {
    this.rowIng = {}
    this._getUserList()
},
  created () {
    this.getStatus()
    this.id = getLocalStorage('id')
    this.ids = getLocalStorage('ids')
  }
  /* eslint-enable */
}
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

	.biaoming {
		/*display: inline-block;*/
		text-align: center;
		margin: 0 auto;
	}
</style>
