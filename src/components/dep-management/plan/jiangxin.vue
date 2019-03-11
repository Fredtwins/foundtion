	<template>
  <div class="tiwei">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/depManagement/derstam">部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据维护</BreadcrumbItem>
        <BreadcrumbItem>江心洲数据维护</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索-->
    <Form ref="formInline" inline :label-width="60">
      <Form-item label="地理位置">
        <Input v-model="formInline.地理位置" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="名称">
        <Input v-model="formInline.名称" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="主管部门">
        <Input v-model="formInline.主管部门" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="类型">
        <Select placeholder="请选择" style="width:100%" :maxlength="16" v-model="formInline.类型">
          <Option value="江心洲">江心洲</Option>
          <Option value="外滩地">外滩地</Option>
        </Select>
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
import { jiangxinThead } from 'common/js/table'
import { getUserList, getdellist, getuserList } from 'api/jiangxin'
import { getLocalStorage } from 'common/js/dom'
import { cloneObj, likeStrSearch, getUserIng } from 'common/js/util'

export default {
  data () {
    return {
      loading: false,
      tableThead: jiangxinThead(this),
      tableTbody: [],
      current: 1,
      total: 1,
      formInline: {
        名称: '',
        主管部门: '',
        地理位置: '',
        类型: ''
      },
      modal2: false,
      postObj: {
        page: 1,
        pageSize: 10,
        order: { _id: -1 },
        searchValue: {
          '地理位置': likeStrSearch(getUserIng().department_name)
        }
      }
    }
  },
  methods: {
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: '江心洲数据'
        })
      }
    },
    changePage (page) {
      this.postObj.page = page
      this.submitsearch(page)
    },
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
    submitsearch (page) {
      let search = {}
      if (this.formInline.名称) {
        search.名称 = likeStrSearch(this.formInline.名称)
      }
      if (this.formInline.地理位置) {
        search.地理位置 = likeStrSearch(this.formInline.地理位置)
      }
      if (this.formInline.主管部门) {
        search.主管部门 = likeStrSearch(this.formInline.主管部门)
      }
      if (this.formInline.类型) {
        search.类型 = likeStrSearch(this.formInline.类型)
      }
      this.getuserlist(page, search)
    },
    add () {
      this.formItem = {
        类型: '',
        名称: '',
        地理位置: '',
        lat: '',
        lng: '',
        所在河道: '',
        所在堤围: '',
        起点桩号: '',
        终点桩号: '',
        '面积(km²)': '',
        '高程范围（m）': '',
        '受影响人员数（人）': '',
        管理单位: '',
        主管部门: '',
        主要设施: '',
        预警负责人: {
          主管部门: '',
          管理单位: '',
          巡查员姓名: '',
          电话: ''
        },
        转移负责人: {
          姓名: '',
          单位: '',
          职务: '',
          电话: ''
        },
        安置负责人: {
          安置点名称: '',
          安置点地址: '',
          姓名: '',
          单位: '',
          职务: '',
          电话: ''
        },
        填表人: '',
        联系电话: '',
        填表时间: '',
        审核人: '',
        复核人: ''
      }
      getLocalStorage('id', 'false')
      this.$router.push('/home/depManagement/jiangxin/jiangxinweihu')
    },
    edit (dataObj) {
      getLocalStorage('formItemd', dataObj)
      getLocalStorage('id', dataObj._id)
      this.$router.push('/home/depManagement/jiangxin/jiangxinweihu')
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
