<template>
  <div class="deplist">
    <div class="titles">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/depManagement/deplist">部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据上报</BreadcrumbItem>
        <BreadcrumbItem>数据模版</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索  -->
    <Form ref="formInline" inline :label-width="60">
      <Form-item label="表单名称">
        <Input v-model="formInline.form_name" :maxlength="16" placeholder="请输入表单数据名称"></Input>
      </Form-item>
      <Form-item label="任务类型">
        <Select
          clearable
          v-model="formInline.task_type"
          style="width:200px"
          :maxlength="16"
          placeholder="请输入任务类型"
        >
          <Option value="日常任务"></Option>
          <Option value="事前任务"></Option>
          <Option value="事中任务"></Option>
          <Option value="事后任务"></Option>
        </Select>
      </Form-item>
      <div class="searchBtn">
        <Button type="ghost" shape="circle" icon="ios-search" @click="submitsearch(1)"></Button>
      </div>
      <div class="add pull-right" @click="addlist">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
      </div>
    </Form>

    <template slot="content">
      <Modal v-model="modal1" class="modalx modal">
        <div slot="header" ref="inter">{{updateTitle}}</div>
        <Form :model="formItem" ref="formItem" :label-width="60">
          <Form-item label="部门" prop="department_list" style="width:108px">
            <Select v-model="formItem.department_list" filterable multiple style="width:360px">
              <Option
                v-for="item in departmentLists"
                :value="item.fullname"
                :key="item.department_list"
              >{{ item.fullname }}</Option>
            </Select>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="ok">关闭</Button>
        </div>
      </Modal>

      <Modal v-model="modal2" width="360">
        <p slot="header" style="color:red;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除</span>
        </p>
        <div style="text-align:center">
          <p>确认删除？</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long :loading="modal_loading" @click="_getDelList">确认</Button>
        </div>
      </Modal>
    </template>

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
    <!--<div class="page pageStyle pull-right">
			<Page size="small" :total="total" :current="current" show-total @on-change="changePage"></Page>
    </div>-->
    <div class="page">
      <Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>
  </div>
</template>
<script>
import { getUserList, getDelList } from 'api/deplist'
import { deplistThead } from 'common/js/table'
import { getLocalStorage } from 'common/js/dom'
import { cloneObj, likeStrSearch } from 'common/js/util'

export default {
  data () {
    return {
      updateTitle: '',
      modal1: false,
      loading: false,
      modal2: false,
      modal_loading: false,
      tableThead: deplistThead(this),
      tableTbody: [],
      total: 2000,
      current: 1,
      formInline: {},
      departmentLists: [],
      formItem: {
        departmentLists: []
      }
    }
  },
  methods: {
    // 列表
    _getUserList (page, search) {
      this.loading = true
      getUserList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    // 页码
    changePage: function (page) {
      this.page = page
      this.submitsearch(page)
    },
    // 按新增跳转到另外一个页面
    addlist () {
      // 将id设置为false
      getLocalStorage('id', 'false')
      this.$router.push('/home/depManagement/deplist/addpage')
    },
    // 点击编辑时候跳转到另一个页面
    edit (dataObj) {
      // 将id存入。可以到编辑的那个页面取出来
      getLocalStorage('id', dataObj._id)
      this.$router.push('/home/depManagement/deplist/addpage')
    },
    // 查看对应的部门
    bmlist (dataObj) {
      this.updateTitle = '执行部门'
      this.modal1 = true
      this.formItem = dataObj
    },
    ok () {
      this.modal1 = false
    },
    // 删除
    del (row) {
      this.rowIng = cloneObj(row)
      this.modal2 = true
    },
    // 删除成功
    _getDelList () {
      // let data = {
      //   _ids: this.rowIng._id
      // }
      getDelList(this.rowIng._id).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '删除成功'
          })
        }
        this.submitsearch()

        this.modal2 = false
      })
    },
    // 搜索
    submitsearch (page) {
      for (var i in this.formInline) {
        if (!this.formInline[i]) {
          delete this.formInline[i]
        }
      }
      let search = cloneObj(this.formInline)
      if (search.form_name) {
        search.form_name = likeStrSearch(search.form_name)
      }
      this._getUserList(page, search)
    }
  },
  mounted () {
    this._getUserList()
    this.rowIng = {}
  }
}
</script>
<style scoped lang="scss">
	.deplist {
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
</style>
