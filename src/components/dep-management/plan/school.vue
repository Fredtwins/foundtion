<template>
  <div class="tiwei">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/depManagement/school">部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据维护</BreadcrumbItem>
        <BreadcrumbItem>学校数据维护</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索-->
    <Form ref="formInline" inline :label-width="40">
      <Form-item label="名称">
        <Input v-model="formInline.name" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="地址">
        <Input v-model="formInline.address" :maxlength="18" placeholder="请输入"></Input>
      </Form-item>
      <Button type="ghost" shape="circle" icon="ios-search" class="ziti" @click="submitsearch(1)"></Button>
      <Button class="iconbtn" size="large" @click="exportData(1)">
        <Icon type="ios-download-outline"></Icon>导出数据
      </Button>
      <div class="add pull-right" @click="add">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
      </div>
    </Form>
    <!--表格-->
    <div class="table">
      <Table
        ref="table"
        :loading="loading"
        border
        stripe
        size="small"
        highlight-row
        :columns="tableThead"
        :data="tableTbody"
      ></Table>
      <!--<Page class="pull-right" :total="total" :current="current" size="small" show-total @on-change="changePage"></Page>-->
    </div>
    <div class="page">
      <Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>
    <template slot="content">
      <!--确认删除  -->
      <Modal v-model="modal2" width="360">
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
    </template>
  </div>
</template>

<script>
import { schoolThead } from 'common/js/table'
import { getUserList, getdellist, getuserList } from 'api/school'
import { getLocalStorage } from 'common/js/dom'
import { cloneObj, likeStrSearch, getUserIng } from 'common/js/util'

export default {
  data () {
    return {
      loading: false,
      tableThead: schoolThead(this),
      tableTbody: [],
      current: 1,
      total: 1,
      formInline: {
        name: '',
        address: ''
      },
      modal2: false,
      postObj: {
        page: 1,
        pageSize: 10,
        order: { _id: -1 },
        searchValue: {
          address: likeStrSearch(getUserIng().department_name)
        }
      }
    }
  },
  methods: {
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: '学校数据'
        })
      }
    },
    // 页码
    changePage (page) {
      this.postObj.page = page
      this.submitsearch(page)
    },
    // 列表展示
    _getuserlist () {
      this.loading = true
      let departmentLevel = getLocalStorage('info').department_level
      if (departmentLevel < 2 || departmentLevel === 2) {
        this.postObj.searchValue = ''
      } else {
        this.postObj.searchValue = ''
      }
      getUserList(this.postObj).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    getuserlist (page, search) {
      this.loading = true
      getuserList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    // 搜索
    submitsearch (page) {
      let search = {}
      if (this.formInline.name) {
        search.name = likeStrSearch(this.formInline.name)
      }
      if (this.formInline.address) {
        search.address = likeStrSearch(this.formInline.address)
      }
      this.getuserlist(page, search)
    },
    // 新增按钮时候传值
    add () {
      this.formItem = {
        address: '',
        area: '',
        build_year: '',
        chage_dept: '',
        charge_company: '',
        checkby: '',
        contacts: '',
        doublecheckby: '',
        fillby: '',
        filltime: '',
        flag: '',
        level: '',
        lift_limit: '',
        migrateby: {
          name: '',
          company: '',
          duty: '',
          phonenumber: ''
        },
        name: '',
        settle_principal: {
          location: '',
          address: '',
          name: '',
          company: '',
          duty: '',
          phonenumber: ''
        },
        structure_type: '',
        type: '',
        warnner: {
          management: '',
          supervisor: '',
          phonenumber: '',
          chargeby: ''
        }
      }
      getLocalStorage('id', 'false')
      this.$router.push('/home/depManagement/school/schoolweihu')
    },
    // 编辑
    edit (dataObj) {
      getLocalStorage('formItemd', dataObj)
      getLocalStorage('id', dataObj._id)
      this.$router.push('/home/depManagement/school/schoolweihu')
    },
    // 删除
    del (row) {
      this.rowIng = cloneObj(row)
      this.modal2 = true
    },
    // 模态框确认删除按钮
    dels () {
      // let data = {
      //   _ids: this.rowIng._id
      // }
      getdellist(this.rowIng._id).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '删除成功'
          })
        }
        this.submitsearch()
        this.modal2 = false
      })
    }
  },
  mounted () {
    this._getuserlist()
    this.rowIng = {}
  }
}
</script>

<style scoped lang="scss">
.title {
	position: absolute;
	top: 0px;
	left: 0px;
	display: flex;
	flex-direction: row;
	width: 100%;
	background: rgb(237, 246, 250);
	height: 0.5rem;
	line-height: 0.5rem;
	padding-left: 10px;
	>span {
		font-size: 16px;
		font-weight: 600;
	}
}

.addBtn {
	background-color: #008cee !important;
	color: #fff;
	margin: 5px;
	height: 40px;
}

.ziti {
	display: inline-block;
	background: #18bdff;
	font-size: 20px;
	color: #FFFFFF;
	border-radius: 0;
}
</style>
