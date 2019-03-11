<!-- 人员管理 -->
<template>
  <div class="rolemanage">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>角色管理</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <Form ref="formInline" :model="formInline" inline :label-width="60" id="mar">
      <Form-item label="角色名称" prop="rolename">
        <Input v-model="formInline.rolename" placeholder="请输入名称"></Input>
      </Form-item>
      <Form-item label="角色描述" prop="description">
        <Input v-model="formInline.description" placeholder="请输入描述"></Input>
      </Form-item>
      <div class="searchBtn">
        <Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch(1)"></Button>
      </div>
      <div class="add pull-right" @click="add('formItem')">
        <Button class="footerbtn" type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
      </div>
    </Form>
    <!-- 条件筛选 -->
    <template slot="content">
      <!--模态框  -->
      <Modal v-model="modal1" @on-cancel="modalCancel" class="modalz modal" style="width:660px">
        <div slot="header">{{updateTitle}}</div>
        <Form :model="formItem" ref="formItem" :label-width="120" :rules="ruleValidate">
          <Form-item label="角色名称" prop="rolename">
            <Input v-model="formItem.rolename" placeholder="请输入名称"></Input>
          </Form-item>
          <Form-item label="角色描述" prop="description">
            <Input v-model="formItem.description" placeholder="请输入描述"></Input>
          </Form-item>
          <Form-item label="系统选择" prop="system_name">
            <!--<Input v-model="formItem.system_name"></Input>-->
            <Select
              @on-change="_getrouletreelist"
              @on-open-change="selectOpen"
              clearable
              v-model="formItem.systemId"
              style="width:260px"
              placeholder="请选择系统"
            >
              <!--<Option value="南海区人民政府三防指挥系统"></Option>-->
              <Option
                v-for="item in rolenameLists"
                :value="item.systemId"
                :key="item.systemId"
              >{{ item.system_name }}</Option>
              <!--<Option value="南海区三防综合业务管理系统"></Option>
              <Option value="南海区三防指挥移动应用系统"></Option>-->
            </Select>
          </Form-item>
          <Form-item label="功能模块授权" prop="modules">
            <!-- <Tree v-if="treeShow" :data="formItem.modules" show-checkbox></Tree> -->
            <role-tree :data="formItem.modules" keyStr="title" checkedStr="checked"></role-tree>
            <!-- <role-trees :data="formItem.modules" @checkChange="selected"></role-trees> -->
            <!-- <Table border ref="selection" :columns="columns4" :data="data1"></Table> -->
          </Form-item>
        </Form>
        <div slot="footer">
          <Button class="footerbtn" v-if="btnSave" type="primary" @click="ok('formItem')">保存</Button>
          <Button class="footerbtn" v-if="btnChange" type="primary" @click="changeNotice">修改</Button>
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
      <Table :loading="loading" border highlight-row :data="UserData" :columns="theadArr" stripe></Table>
    </div>
    <div class="page">
      <Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
import { getUserList, getAddlist, deletelist, editlist, edittreelist, getroletreelist } from 'api/rolemanage'
import { rolemanageThaed } from 'common/js/table'
import { loadingMixin } from 'common/js/mixins'
import { cloneObj, likeStrSearch } from 'common/js/util'
import RoleTree from './RoleTree.vue'
import { roleRules } from 'common/js/rules'

export default {
  mixins: [loadingMixin],
  components: {
    'role-tree': RoleTree
  },
  created () {
    this.isChangeSystem = true
  },
  data () {
    return {
      loading: false,
      modal2: false,
      modal_loading: false,
      treeShow: false,
      modal1: false,
      btnChange: false,
      btnSave: false,
      updateTitle: '',
      formInline: {
        rolename: '',
        description: ''
      },
      waterRecordPage: {
        current: 1,
        // pageSize: 10,
        total: 0
      },
      ruleValidate: roleRules,
      roname: [],
      current: 1,
      total: 0,
      UserData: [],
      rolenameList: [],
      departmentNameList: [],
      bucunzai: '',
      formItem: {
        modules: []
      },
      theadArr: rolemanageThaed(this),
      rolenameLists: [
        {
          system_name: '南海区三防综合业务管理系统',
          systemId: '1000010'
        },
        {
          system_name: '南海区三防指挥移动应用系统',
          systemId: '1000020'
        }]
    }
  },
  methods: {
    selectOpen () {
      this.isChangeSystem = true
    },
    modalCancel () {
      this.isChangeSystem = true
    },
    _getroletree () {
    },

    // 选择系统下拉框时候树形图自动加载对应的
    _getrouletreelist (id) {
      if (!this.isChangeSystem) {
        return
      }
      let searchValue = {
        system_id: id
      }
      getroletreelist(searchValue).then(res => {
        if (res.code === ERR_OK) {
          this.formItem.modules = res.result.result.modules
        }
      })
    },
    selected (arr) {},
    changePage (page) {
      this.page = page
      this.submitSearch(page)
    },
    _getUserList: function (page) {
      this.loading = true
      let search = {}

      if (this.formInline.rolename) {
        search.rolename = likeStrSearch(this.formInline.rolename)
      }

      if (this.formInline.description) {
        search.description = likeStrSearch(this.formInline.description)
      }
      getUserList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.UserData = res.result.result
          this.total = res.result.totalSize
          this.current = res.result.page
        }
      })
    },
    add (name) {
      this.$refs[name].resetFields()
      this.isChangeSystem = false
      this.formItem = {
        rolename: '',
        description: '',
        modules: [],
        roname: []
      }
      this.updateTitle = '新增角色'
      this.btnChange = false
      this.btnSave = true
      this.modal1 = true
    },
    ok (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          delete this.formItem['label']
          delete this.formItem['value']
          getAddlist(this.formItem).then(res => {
            this.modal1 = false
            this.isChangeSystem = true
            if (res.code === ERR_OK) {
              this.$Notice.success({
                title: '新增成功'
              })
              this._getUserList()
            }
          })
        }
      })
    },
    // 编辑
    edit (dataObj) {
      this.updateTitle = '编辑角色'
      this.btnSave = false
      this.btnChange = true
      this.modal1 = true
      this.isChangeSystem = false
      this.formItem = dataObj
      edittreelist(this.formItem).then(res => {
        if (res.code === ERR_OK) {
          this.formItem.modules = res.result.result.modules
        }
      })
    },
    // 修改成功的时候
    changeNotice () {
      editlist(this.formItem).then(res => {
        this.modal1 = false
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '修改成功'
          })
        }
        this.submitSearch(this.current)
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
      deletelist(this.rowIng._id).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '删除成功'
          })

          this.submitSearch()

          this.modal2 = false
        }
      })
    },
    submitSearch (page) {
      let search = {}

      if (this.formInline.rolename) {
        search.rolename = likeStrSearch(this.formInline.rolename)
      }

      if (this.formInline.description) {
        search.description = likeStrSearch(this.formInline.description)
      }

      this._getUserList(page, search)
    }
  },
  mounted: function () {
    this._getUserList()
    this.rowIng = {}
  }
}
</script>

<style lang="scss" scoped>
	.addBtn {
    // background-color: #40b0ff;
    background: linear-gradient(#1554cd,#1137a0);
		color: #fff;
		margin: 5px;
		height: 30px;
	}

	.ivu-modal-content .ivu-modal-header {
		background-color: #41b0ff!important;
		border-radius: 6px!important;
		color: #FFFFFF;
  }
  .searchBtn {
    display: inline-block;
    > button {
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

	.rolemanage {
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
		> span {
			font-size: 14px;
			font-weight: 600;
		}
	}

	.jto {
		transform: rotate(90deg);
		width: 23px;
		height: 20px;
		vertical-align: middle;
		margin-right: 10px;
	}

	.jto2 {
		font-size: 23px;
	}

	#mar {
		margin-top: 44px;
  }
  .add {
    // background: linear-gradient(#1554cd,#1137a0);
    background: #224ca5;
  }
  .footerbtn {
    // background: linear-gradient(#1554cd,#1137a0);
    background: #224ca5;
  }
</style>
