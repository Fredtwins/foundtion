<template>
  <div class="derstam">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/depManagement/derstam">部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据维护</BreadcrumbItem>
        <BreadcrumbItem>险段数据维护</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <Form ref="formInline" inline :label-width="60">
      <Form-item label="险段名称">
        <Input v-model="formInline.danger_name" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="主管部门">
        <Input v-model="formInline.governor" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="所在镇(街)">
        <Input v-model="formInline.town" :maxlength="16" placeholder="请输入"></Input>
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
import { derstamthead } from 'common/js/table'
import { getLocalStorage } from 'common/js/dom'
import { cloneObj, likeStrSearch, getUserIng } from 'common/js/util'
import { getUserList, getdellist } from 'api/derstam'

export default {
  data () {
    return {
      loading: false,
      tableThead: derstamthead(this),
      tableTbody: [],
      total: 1,
      current: 1,
      modal2: false,
      formInline: {
        danger_name: '',
        governor: '',
        town: ''
      },
      postObj: {
        page: 1,
        pageSize: 10,
        order: { _id: -1 },
        searchValue: {
          town: likeStrSearch(getUserIng().department_name)
        }
      }
    }
  },
  methods: {
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: '险段数据'
        })
      }
    },
    // 页码
    changePage (page) {
      this.postObj.page = page
      this.submitsearch(page)
    },
    // 新增
    add () {
      this.formItem = {
        danger_length: '',
        danger_name: '',
        danger_type: '',
        lat: '',
        max_depth: '',
        renovate_year: '',
        stake_no: '',
        town: '',
        lng: '',
        dike_name: '',
        governor: '',
        information_equipment: '',
        other_plan: '',
        location: '',
        dike_high: '',
        fillby: '',
        createdt: '',
        doublecheckby: '',
        checkby: '',
        river_name: '',
        emergency_team: {
          headcount: '',
          director: '',
          director_telephone: '',
          contacts: '',
          contact_number: ''
        },
        manager: '',
        operator: {
          name: '',
          department: '',
          duty: '',
          telephone: ''
        },
        have_tranfer_plan: '',
        contact_number: '',
        start_stakeno: '',
        technical_director: {
          name: '',
          department: '',
          duty: '',
          telephone: ''
        },
        warehouse_statistics: {
          bag: '',
          cloth: '',
          sand: '',
          block_stone: '',
          life_jacket: '',
          distance: ''
        },
        administrator: {
          name: '',
          department: '',
          duty: '',
          telephone: ''
        },
        have_emergency_plan: ''
      }
      getLocalStorage('id', 'false')
      this.$router.push('/home/depManagement/derstam/derstamadd')
    },
    // 搜索
    submitsearch (page) {
      let search = {}
      if (this.formInline.danger_name) {
        search.danger_name = likeStrSearch(this.formInline.danger_name)
      }
      if (this.formInline.governor) {
        search.governor = likeStrSearch(this.formInline.governor)
      }
      if (this.formInline.town) {
        search.town = likeStrSearch(this.formInline.town)
      }
      this._getuserlist(page, search)
    },
    // 编辑
    edit (dataObj) {
      getLocalStorage('formItemd', dataObj)
      getLocalStorage('id', dataObj._id)
      this.$router.push('/home/depManagement/derstam/derstamadd')
    },
    // 刪除
    del (row) {
      this.rowIng = cloneObj(row)
      this.modal2 = true
    },
    // 确认删除
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
    },
    // 列表显示
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
