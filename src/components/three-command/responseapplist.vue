<template>
  <div class="responseapplist">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeCommand/responseapplist">应急响应</BreadcrumbItem>
        <BreadcrumbItem>应急响应申请列表</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索  -->
    <Form ref="formInline" :model="formInline" inline :label-width="60">
      <Form-item label="申请人">
        <Input v-model="formInline.username" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="审批人">
        <Input v-model="formInline.approveby" placeholder="请输入"></Input>
      </Form-item>
      <div class="searchBtn">
        <Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch"></Button>
      </div>
      <!-- <div class="add pull-right" @click="add">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
      </div> -->
    </Form>
    <template slot="content">
      <!--新增，修改  -->
      <Modal v-model="modal1" class="modala modal">
        <div slot="header">{{updateTitle}}</div>
        <Form :model="formItem" :label-width="80">
          <div class="table">
            <Table
              :loading="loading"
              border
              stripe
              size="small"
              highlight-row
              :columns="curthead"
              :data="curTbody"
            ></Table>
          </div>
        </Form>
        <div slot="footer">
          <Button v-if="btnSave" type="primary" @click="_defaddList">保存</Button>
          <Button v-if="btnChange" type="primary" @click="_defeditList">修改</Button>
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
          <Button type="error" size="large" long :loading="modal_loading" @click="_defdelList">确认</Button>
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
    <div class="page">
      <Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>
    <!--<div class="page pageStyle pull-right">
			<Page :total="total" :current="current" size="small" show-total @on-change="changePage"></Page>
    </div>-->
  </div>
</template>
<script>
	import { Getresponseapplist, delresponseapplist } from 'api/responseapplist'
	import { responseapplistthead, curapplistThead } from 'common/js/table'
	import { cloneObj, likeStrSearch } from 'common/js/util'
	import { loadingMixin, interactModelMixin } from 'common/js/mixins'
	import { getDepList } from 'api/bumenlist'

	export default {
	  mixins: [loadingMixin, interactModelMixin],
	  data () {
	    return {
	      loading: false,
	      formInline: {
	        username: '',
	        approveby: ''
	      },
	      tableThead: responseapplistthead(this),
	      tableTbody: [],
	      current: 1,
	      total: 0,
	      formItem: {},
	      modal2: false,
	      modal_loading: false,
	      modal1: false,
	      btnChange: false,
	      btnSave: false,
	      updateTitle: '',
	      depList: {},
	      autoCompleteData: [],
        selectLoading: false,
        curthead: curapplistThead(this),
        curTbody: []
	    }
	  },
	  methods: {
	    // 选择部门名称
	    selected (value) {
	      if (this.depList.length > 0) {
	        let index = this.depList.findIndex(item => value === item.department_fullname)
	        this.formItem.department_fullname = this.depList[index].department_fullname
	        this.formItem.department_name = this.depList[index].department_name
	        this.formItem.department_level = this.depList[index].department_level
	        this.formItem.department_code = this.depList[index].department_code
	      }
	    }, // 提示部门名称
	    autoSearch (query) {
	      if (query !== '') {
	        this.selectLoading = true
	        setTimeout(() => {
	          this.selectLoading = false
	          this.autoCompleteData = this.depList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
	        }, 200)
	      } else {
	        this.autoCompleteData = []
	      }
	    },
	    // 获取部门
	    // _getDepList () {
	    //   getDepList().then(res => {
	    //     this.depList = res.result.result.map(item => {
	    //       return {
	    //         value: item.fullname,
	    //         label: item.fullname,
	    //         department_name: item.name,
	    //         department_fullname: item.fullname,
	    //         department_code: item.code,
	    //         department_level: item.level,
	    //         name: item.name,
	    //         code: item.code
	    //       }
	    //     })
	    //   })
	    // },
	    // 列表
	    _Getresponseapplist (page, search) {
	      this.loading = true
	      Getresponseapplist(page, search).then(res => {
          console.log(res)
	        if (res.code === ERR_OK) {
	          this.loading = false
	          this.tableTbody = res.result.result
	          this.total = res.result.totalSize
	          this.current = res.result.page
	        }
	      })
	    },
	    // 页码
	    changePage: function (page) {
	      this.Getresponseapplist(page)
	    },
	    // 新增
	    add () {
	      this.formItem = {
	        department_name: '',
	        department_code: '',
	        department_level: '',
	        system_name: '',
	        system_access: ''
	      }
      this.updateTitle = '新增部门系统'
      this.btnChange = false
	      this.btnSave = true
	      this.modal1 = true
	    },
	    // 保存按钮
	    _defaddList () {
	      defaddList(this.formItem).then(res => {
	        this.modal1 = false
	        if (res.code === ERR_OK) {
	          this.$Notice.success({
	            title: '新增成功'
	          })
	          this._defUserList()
	        } else {
	          this.$Notice.warning({
	            title: '系统已存在'
	          })
	        }
	      })
	    },
	    // 编辑
	    edit (dataObj) {
        console.log(dataObj)
	      this.updateTitle = '编辑部门系统'
	      this.btnSave = false
	      this.btnChange = true
	      this.modal1 = true
	      this.formItem = dataObj
	    },
	    // 修改成功
	    _defeditList () {
	      delresponseapplist(this.formItem).then(res => {
	        if (res.code === ERR_OK) {
	          this.$Notice.success({
	            title: '修改成功'
	          })
	          this.submitSearch(this.current)
	          this.modal1 = false
	        }
	      })
	    },
	    // 删除
	    del (row) {
	      this.rowIng = cloneObj(row)
	      this.modal2 = true
	    },
	    _defdelList () {
	      defdelList(this.rowIng._id).then(res => {
	        if (res.code === ERR_OK) {
	          this.$Notice.success({
	            title: '删除成功'
	          })
	        }
	        this.submitSearch()
	        this.modal2 = false
	      })
      },
      // 提交
      getrespon (row) {

      },
	    // 搜索
	    submitSearch (page) {
	      let search = {}
	      if (this.formInline.username) {
	        search.username = likeStrSearch(this.formInline.username)
	      }
	      if (this.formInline.approveby) {
	        search.approveby = likeStrSearch(this.formInline.approveby)
	      }
	      this._Getresponseapplist(page, search)
	    }
	  },
	  mounted () {
	    this._Getresponseapplist()
	    this.rowIng = {}
	    // this._getDepList()
	  }
	}
</script>
<style scoped lang="scss">
	.responseapplist {
    padding-top: 50px;
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
		.addBtn {
			background-color: #40b0ff;
			color: #fff;
			margin: 5px;
			height: 30px;
		}
	}
	.modal {
    .ivu-modal {
      .ivu-modal-content {
        border-radius: 5px;
        .ivu-modal-header {
          background: #008cee;
          color: #fff;
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          .ivu-modal-header-inner {
            color: #fff;
            text-align: center;
          }
        }
        .ivu-modal-close {
          i {
            color: #fff;
          }
        }
        .ivu-modal-body {
          padding-top: 0;
          height: 400px !important;
          overflow: auto;
          li {
            margin: 5px 0;
            position: relative;
            padding-left: 40px;
            .departmentName {
              position: absolute;
              left: 0;
              color: #303030;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
