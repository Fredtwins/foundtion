<!-- 人员管理 -->
<template>
  <div class="bumenlist">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>部门管理</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <Form ref="formInline" :model="formInline" inline :label-width="60" id="mar">
      <Form-item label="部门名称" prop="name">
        <Input v-model="formInline.name" placeholder="请输入名称"></Input>
      </Form-item>
      <Form-item label="全称" prop="fullname">
        <Input v-model="formInline.fullname" placeholder="请输入全称"></Input>
      </Form-item>

      <div class="searchBtn">
        <Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch(1)"></Button>
      </div>
      <div class="add pull-right" @click="add('formItem')">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
      </div>
    </Form>
    <template slot="content">
      <!--模态框  -->
      <Modal v-model="modal1" class="modalk modal">
        <div slot="header">{{updateTitle}}</div>
        <Form :model="formItem" ref="formItem" :label-width="80" :rules="ruleValidate">
          <Form-item label="部门" prop="name">
            <Input v-model="formItem.name" placeholder="请输入名称"></Input>
          </Form-item>
          <Form-item label="全称" prop="fullname">
            <Input v-model="formItem.fullname" placeholder="请输入全称"></Input>
          </Form-item>
          <Form-item label="部门上层" prop="parent_code">
            <Select v-model="formItem.parent_code" style="width:260px">
              <Option
                v-for="item in departmentLists"
                :value="item.code"
                :key="item.parent_code"
              >{{ item.fullname }}</Option>
            </Select>
          </Form-item>
          <!-- <Form-item label="所在部门" prop="system_name">
                <Input v-model="formItem.system_name" placeholder="请输入所在部门"></Input>
          </Form-item>-->
          <!--<Form-item label="部门编号" prop="code">
						<Input v-model="formItem.code" placeholder="请输入编号"></Input>
          </Form-item>-->
          <!--<Form-item label="部门层级" prop="level">
						<Input v-model="formItem.level" placeholder="请输入层级"></Input>
          </Form-item>-->
          <!--<Form-item label="部门层级1" prop="level1">
						<Input v-model="formItem.level1" placeholder="请输入"></Input>
					</Form-item>
					<Form-item label="部门层级2" prop="level2">
						<Input v-model="formItem.level2" placeholder="请输入"></Input>
					</Form-item>
					<Form-item label="部门层级3" prop="level3">
						<Input v-model="formItem.level3" placeholder="请输入"></Input>
					</Form-item>
					<Form-item label="部门层级4" prop="level4">
						<Input v-model="formItem.level4" placeholder="请输入"></Input>
					</Form-item>
					<Form-item label="部门层级5" prop="level5">
						<Input v-model="formItem.level5" placeholder="请输入"></Input>
          </Form-item>-->
          <!--<Input v-model="formItem.index" v-if="bucunzai"></Input>-->
        </Form>
        <div slot="footer">
          <Button v-if="btnSave" type="primary" @click="ok('formItem')">保存</Button>
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
          <Button type="error" size="large" long :loading="modal_loading" @click="dels">确认</Button>
        </div>
      </Modal>
    </template>
    <div class="center table">
      <Table :loading="loading" border highlight-row :columns="theadArr" :data="tableTbody"></Table>
    </div>
    <div class="page">
      <Page :total="total" :current="current" @on-change="pageChange" show-elevator show-total></Page>
    </div>
  </div>
</template>

<script>
import { bumenlistThead } from 'common/js/table'
import { bumenRules } from 'common/js/rules'
import { loadingMixin, interactModelMixin } from 'common/js/mixins'
import { cloneObj, likeStrSearch } from 'common/js/util'
import { getUserList, getAddList, getdelete, getedit, getbumensList } from 'api/bumenlist'
import bumenform from 'base/bumenlist/bumenform'

export default {
  mixins: [loadingMixin, interactModelMixin],
  components: {
    'bumenform': bumenform
  },
  data () {
    return {
      loading: false,
      modal2: false,
      modal_loading: false,
      modal1: false,
      btnChange: false,
      btnSave: false,
      updateTitle: '',
      formInline: {
        name: '',
        fullname: ''
      },
      waterRecordPage: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      ruleValidate: bumenRules,
      departmentLists: [],
      departmentNameList: [],
      bucunzai: '',
      formItem: {},
      // 加载和模态框
      tableTbody: [],
      total: 0,
      current: 1,
      isReadonlyUserNmae: false,
      showLoading: false,
      actionTitle: '',
      postObj: {
        'page': 1,
        'pageSize': 10,
        'searchValue': {}
      },
      theadArr: bumenlistThead(this),
      searchvalue: ''

    }
  },
  methods: {
    // 列表
    _getUserList (page, search) {
      this.loading = true
      this.$Loading.start()
      getUserList(page, search).then(res => {
        this.$Loading.finish()
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
          this.current = res.result.page
        }
      })
    },
    // 部门层级
    getDepartmentNameList (page, search) {
      getbumensList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.departmentLists = res.result.result
        }
      })
    },
    // 新增按钮
    add (name) {
      this.$refs[name].resetFields()
      this.formItem = {
        name: '',
        fullname: '',
        parent_code: ''
      }
      this.updateTitle = '添加部门'
      this.btnChange = false
      this.btnSave = true
      this.modal1 = true
    },
    ok (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          delete this.formItem['label']
          delete this.formItem['value']
          getAddList(this.formItem).then(res => {
            this.modal1 = false
            if (res.code === ERR_OK) {
              this.$Notice.success({
                title: '新增成功'
              })
              this._getUserList()
            } else {
              this.$Notice.warning({
                title: '添加失败'
              })
            }
            if (res.code === '0022') {
              this.$Notice.warning({
                title: '部门已存在'
              })
            }
          })
        }
      })
    },
    // 分页
    pageChange: function (page) {
      this.page = page
      this.submitSearch(page)
    },
    // 删除
    del (row) {
      this.rowIng = cloneObj(row)
      this.modal2 = true
    },
    dels () {
      // let data = {
      //   _ids: this.rowIng._id
      // }
      getdelete(this.rowIng._id).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '删除成功'
          })
        }
        this.submitSearch()
        this.modal2 = false
      })
    },
    // 编辑
    edit (dataObj) {
      this.updateTitle = '编辑部门'
      this.btnSave = false
      this.btnChange = true
      this.modal1 = true
      this.formItem = dataObj
      // let arr = this.formItem.map(item => {
      // if(this.formItem.fullname === dataObj.fullname) {
      // this.formItem.parent_code = dataObj.parent_code;
      // this.formItem.name = dataObj.name;
      // delete dataObj['level']
      // delete dataObj['level1']
      // delete dataObj['level2']
      // delete dataObj['level3']
      // delete dataObj['level4']
      // delete dataObj['level5']
      // delete dataObj['order_num']
      // delete dataObj['contacts']
      // delete dataObj['code']
      // delete dataObj['leader']
      // delete dataObj['flag']
      // }
      // })
      // this.formItem.push(arr);
    },
    changeNotice () {
      getedit(this.formItem).then(res => {
        this.modal1 = false
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '修改成功'
          })
          this._getUserList()
        }
      })
    },

    // 搜索
    submitSearch (page) {
      let search = {}
      if (this.formInline.name) {
        search.name = likeStrSearch(this.formInline.name)
      }
      if (this.formInline.fullname) {
        search.fullname = likeStrSearch(this.formInline.fullname)
      }
      this._getUserList(page, search)
    }
  },
  mounted: function () {
    this._getUserList()
    this.rowIng = {}
    this.getDepartmentNameList()
    // this.submitseach();
  }
}
</script>

<style lang="scss" scoped>
	.addBtn {
		background-color: #40b0ff;
		color: #fff;
		margin: 5px;
		height: 30px;
	}

	.blue {
		font-size: 2em;
	}

  .searchBtn {
    display: inline-block;
    >button {
        background: #224ca5;
        color: #fff;
        font-weight: bold;
        font-size: 0.18rem !important;
        border-radius: 0 !important;
        height: 0.37rem !important;
        width: 0.37rem !important;
        line-height: 0.37rem;
        .ivu-icon-ios-search:before {
            font-size: 0.2rem;
            font-weight: bold;
        }
    }
  }
	.ivu-modal-header {
		background-color: #41b0ff;
		border-radius: 5px;
		color: #fff;
	}

	.bumenlist {
		height: 100%;
	}

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

	#mar {
		margin-top: 42px;
	}

	.action-model {
		width: 480px;
		height: 350px;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		.action-content {
			width: 300px;
			padding-top: 20px;
			margin: auto;
			.action-warpper {
				width: 100%;
				.action-formItems {
					width: 100%;
					.formItems-warpper {
						width: 100%;
						position: relative;
					}
					.formItems-commit {
						position: absolute;
						bottom: 10px;
						right: 10px;
					}
				}
			}
		}
	}
</style>
