<template>
  <div class="tiwei">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/depManagement/neilao">部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据维护</BreadcrumbItem>
        <BreadcrumbItem>内涝数据维护</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索-->
    <Form ref="formInline" inline :label-width="40">
      <Form-item label="名称">
        <Input v-model="formInline.stn_name" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <!--<Form-item label="locality">
				<Input v-model="formInline.locality" :maxlength="16" placeholder="请输入"></Input>
			</Form-item>
			<Form-item label="hydr_net">
				<Input v-model="formInline.hydr_net" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>-->
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
import { neilaoThead } from 'common/js/table'
import { getUserList, getdellist } from 'api/neilao'
import { getLocalStorage } from 'common/js/dom'
import { cloneObj, likeStrSearch } from 'common/js/util'
export default {
  data () {
    return {
      loading: false,
      tableThead: neilaoThead(this),
      tableTbody: [],
      current: 1,
      total: 1,
      formInline: {
        stn_name: '',
        locality: '',
        hydr_net: ''
      },
      modal2: false
    }
  },
  methods: {
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: '内涝数据'
        })
      }
    },
    changePage (page) {
      this.page = page
      this.submitsearch(page)
    },
    _getuserlist (page, search) {
      this.loading = true
      getUserList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    submitsearch (page) {
      let search = {}
      if (this.formInline.stn_name) {
        search.stn_name = likeStrSearch(this.formInline.stn_name)
      }
      if (this.formInline.locality) {
        search.locality = likeStrSearch(this.formInline.locality)
      }
      if (this.formInline.hydr_net) {
        search.hydr_net = likeStrSearch(this.formInline.hydr_net)
      }
      this._getuserlist(page, search)
    },
    add () {
      this.formItem = {
        flag: '',
        his_level: '',
        hydr_net: '',
        lat: '',
        lng: '',
        locality: '',
        location: '',
        region: '',
        region_code: '',
        remark: '',
        stn_name: '',
        stn_no: '',
        stn_status: '',
        governor: '',
        other_plan: '',
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
        technical_director: {
          name: '',
          department: '',
          duty: '',
          telephone: ''
        },
        warehouse_statistics: {
          bag: '',
          pump: '',
          pipe: '',
          light: '',
          powersupply: ''
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
      this.$router.push('/home/depManagement/neilao/neilaoweihu')
    },
    edit (dataObj) {
      getLocalStorage('formItemd', dataObj)
      getLocalStorage('id', dataObj._id)
      this.$router.push('/home/depManagement/neilao/neilaoweihu')
    },
    del (row) {
      this.rowIng = cloneObj(row)
      this.modal2 = true
    },
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
			margin: 0px;
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
