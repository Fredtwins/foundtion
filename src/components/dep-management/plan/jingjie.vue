<template>
  <div class="tiwei">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/depManagement/jingjie">部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据维护</BreadcrumbItem>
        <BreadcrumbItem>警戒值管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索-->
    <Form ref="formInline" inline :label-width="70">
      <Form-item label="警戒值" width="50px">
        <Input v-model="formInline.warning_value" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="警戒类型" width="80px">
        <Input v-model="formInline.object_type" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="警戒名称" width="80px">
        <Input v-model="formInline.object_name" :maxlength="16" placeholder="请输入"></Input>
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
      <Modal v-model="modal1" width="400">
        <div slot="header" ref="inter">{{updateTitle}}</div>
        <Form :model="formItem" ref="formItem" :label-width="102">
          <Form-item label="警戒值">
            <Input v-model="formItem.warning_value" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="警戒对象类型">
            <Input v-model="formItem.object_type" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="警戒对象名称">
            <Input v-model="formItem.object_name" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="警戒测量指标">
            <Input v-model="formItem.object_index" placeholder="请输入"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <!--<Button type="error" size="large" long  @click="dels">确认</Button>-->
          <Button v-if="btnSave" type="primary" @click="ok">保存</Button>
          <Button v-if="btnChange" type="primary" @click="changeNotice">修改</Button>
        </div>
      </Modal>

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
import { jingjieThead } from 'common/js/tables'
import { getjinjieList, getjinjieadd, getjinjiedelete, getjinjieedit } from 'api/shujuage'
import { cloneObj, likeStrSearch } from 'common/js/util'

export default {
  data () {
    return {
      formItem: {},
      btnSave: false,
      btnChange: false,
      updateTitle: '',
      modal1: false,
      loading: false,
      tableThead: jingjieThead(this),
      tableTbody: [],
      current: 1,
      total: 1,
      formInline: {
        warning_value: '',
        object_name: '',
        object_type: ''
      },
      modal2: false
    }
  },
  methods: {
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: '警戒值数据'
        })
      }
    },
    changePage (page) {
      this.page = page
      this.submitsearch(page)
    },
    _getuserlist (page, search) {
      this.loading = true
      getjinjieList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    submitsearch (page) {
      let search = {}
      if (this.formInline.warning_value) {
        search.warning_value = likeStrSearch(this.formInline.warning_value)
      }
      if (this.formInline.object_name) {
        search.object_name = likeStrSearch(this.formInline.object_name)
      }
      if (this.formInline.object_type) {
        search.object_type = likeStrSearch(this.formInline.object_type)
      }
      this._getuserlist(page, search)
    },
    add () {
      this.formItem = {
        warning_value: '',
        object_type: '',
        object_name: '',
        object_index: ''
      }
      this.modal1 = true
      this.btnSave = true
      this.btnChange = false
      this.updateTitle = '新增'
    },
    edit (dataObj) {
      this.formItem = dataObj
      this.modal1 = true
      this.btnChange = true
      this.updateTitle = '修改'
    },
    ok () {
      getjinjieadd(this.formItem).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '新增成功'
          })
          this.modal1 = false
          this._getuserlist()
        } else {
          this.$Notice.warning({
            title: '新增失败'
          })
        }
      })
    },
    changeNotice () {
      getjinjieedit(this.formItem).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '修改成功'
          })
          this.modal1 = false
          this._getuserlist()
        }
      })
    },
    del (row) {
      this.rowIng = cloneObj(row)
      this.modal2 = true
    },

    dels () {
      // let data = {
      //   _ids: this.rowIng._id
      // }
      getjinjiedelete(this.rowIng._id).then(res => {
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
