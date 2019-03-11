<template>
  <div class="hillpool">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/depManagement/hanza">部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据维护</BreadcrumbItem>
        <BreadcrumbItem>涵闸数据维护</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索-->
    <Form ref="formInline" inline :label-width="60">
      <Form-item label="所在堤围">
        <Input v-model="formInline.dick_name" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="镇街">
        <Input v-model="formInline.town" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="闸名">
        <Input v-model="formInline.sluicegate_name" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <!--<Form-item label="闸名">
				<Input v-model="formInline.sluicegate_name" :maxlength="16" placeholder="请输入"></Input>
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
          <Button type="error" size="large" long :loading="modal_loading" @click="dels">确认</Button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import { hanzaThead } from 'common/js/table'
import { getUserList, getdellist } from 'api/hanza'
import { getLocalStorage } from 'common/js/dom'
import { cloneObj, likeStrSearch } from 'common/js/util'

export default {
  data () {
    return {
      loading: false,
      tableThead: hanzaThead(this),
      tableTbody: [],
      total: 1,
      current: 1,
      modal2: false,
      modal_loading: false,
      formInline: {
        dick_name: '',
        town: '',
        sluicegate_name: ''
      }
    }
  },
  methods: {
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: '涵闸数据维护'
        })
      }
    },
    // 页码
    changePage (page) {
      this.page = page
      this.submitsearch(page)
    },
    // 新增
    add () {
      this.formItem = {
        lat: '',
        lng: '',
        board_height: '',
        dateroom_length: '',
        defence_area: '',
        dick_name: '',
        flag: '',
        flow: '',
        gate_fom: '',
        gate_material: '',
        hightest_depth: '',
        hightest_time: '',
        hole_height: '',
        hole_width: '',
        holes: '',
        note: '',
        rebuild_time: '',
        river: '',
        shiproom_length: '',
        shiproom_width: '',
        sluicegate_name: '',
        sluicegate_type: '',
        stake_no: '',
        town: '',
        waterhead: '',
        gatenum: '',
        mutation: '',
        pumpnum: '',
        stainfoid: '',
        stastatus: '',
        normal_alarm_level_in: '',
        drain_alarm_level_in: '',
        normal_over_level_in: '',
        drain_over_level_in: '',
        normal_alarm_level_out: '',
        drain_alarm_level_out: '',
        normal_over_level_out: '',
        drain_over_level_out: '',
        governor: '',
        durable_years: '',
        information_equipment: '',
        other_plan: '',
        affected_population: '',
        location: '',
        safety_evaluation: {
          be_checked: '',
          check_date: '',
          result: '',
          safety_type: ''
        },
        checkby: '',
        project_level: '',
        build: '',
        emergency_team: {
          headcount: '',
          director: '',
          director_telephone: '',
          contacts: '',
          contact_number: ''
        },
        project_type: '',
        design_flood: '',
        design_flow: '',
        check_flood: '',
        check_flow: '',
        history_flow: '',
        drain_area: '',
        drain_region: '',
        manager: '',
        operator: {
          name: '',
          department: '',
          duty: '',
          telephone: ''
        },
        have_tranfer_plan: '',
        contact: '',
        navigation_capacity: '',
        design_gatebefore_level: '',
        design_gateafter_level: '',
        check_gatebefore_level: '',
        check_gateafter_level: '',
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
      this.$router.push('/home/depManagement/hanza/hanzaweihu')
    },
    // 搜索
    submitsearch (page) {
      let search = {}
      if (this.formInline.dick_name) {
        search.dick_name = likeStrSearch(this.formInline.dick_name)
      }
      if (this.formInline.town) {
        search.town = likeStrSearch(this.formInline.town)
      }
      if (this.formInline.sluicegate_name) {
        search.sluicegate_name = likeStrSearch(this.formInline.sluicegate_name)
      }
      this._getuserList(page, search)
    },
    // 列表
    _getuserList (page, search) {
      this.loading = true
      getUserList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    // 点击编辑
    edit (dataObj) {
      getLocalStorage('formItemd', dataObj)
      getLocalStorage('id', dataObj._id)
      this.$router.push('/home/depManagement/hanza/hanzaweihu')
    },
    // 删除
    del (row) {
      this.rowIng = cloneObj(row)
      this.modal2 = true
    },
    // 删除成功
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
    this._getuserList()
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
