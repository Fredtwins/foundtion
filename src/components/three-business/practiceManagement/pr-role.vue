<template>
  <div class="pr-role">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>三防业务</BreadcrumbItem>
        <BreadcrumbItem>演练管理</BreadcrumbItem>
        <BreadcrumbItem>演练角色</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">角色名称</span>
      <Input
        placeholder="请输入"
        v-model="searchVal.role_name"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      ></Input>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <div class="add pull-right" @click="add">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
      </div>
    </div>
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
    <div class="page pageStyle pull-right">
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <Modal v-model="addPageShow" class="modala">
      <div slot="header" ref="inter">{{updateTitle}}</div>
      <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="100">
        <Form-item label="角色名称" prop="role_name">
          <Input v-model="formItem.role_name" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="用户部门" prop="department_fullname">
          <Select
            :label="formItem.department_fullname"
            not-found-text="无匹配部门，请重新输入"
            v-model="formItem.department_fullname"
            filterable
            remote
            :remote-method="autoSearch"
            :loading="selectLoading"
            @on-change="selected"
          >
            <Option
              v-for="(option, index) in autoCompleteData"
              :value="option.value"
              :key="index"
            >{{option.label}}</Option>
          </Select>
        </Form-item>
        <Form-item v-if="userShow" label="用户" prop="user_list">
          <Select v-model="formItem.user_list" multiple style="width:260px">
            <Option
              v-for="item in userList"
              :value="JSON.stringify(item)"
              :key="item.user_name"
            >{{ item.user_name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="角色职责描述" prop="role_duty">
          <Input v-model="formItem.role_duty" type="textarea" :rows="5" placeholder="请输入"></Input>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="save('formItem')">保存</Button>
        <!-- <Button v-if="btnChange" type="primary" @click="changeNotice">修改</Button> -->
      </div>
    </Modal>
    <!--确认删除  -->
    <Modal v-model="sure_del" width="360">
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
  </div>
</template>

<script>
import { prRoleThead } from 'common/js/table'
import { prRoleRules } from 'common/js/rules'
import { successNotice, errorNotice } from 'common/js/dom'
import { mapGetters, mapMutations } from 'vuex'
import { getDepList } from 'api/bumenlist'
import { getAllList } from 'api/usermanage'
import { prRoleApi } from 'api/practice-management'
import { likeStrSearch } from 'common/js/util'
export default {
  computed: {
    ...mapGetters(['STATUS'])
  },
  watch: {
    STATUS: {
      handler: function (val, oldval) {
        if (val === false) {
          this.addPageShow = false
        }
      }
    }
  },
  data () {
    return {
      userShow: false,
      updateTitle: '新增',
      apiType: 'list',
      operationText: '新增',
      sure_del: false,
      addPageShow: false,
      searchVal: {},
      tableThead: prRoleThead(this),
      tableTbody: [],
      departmentList: [],
      autoCompleteData: [],
      selectLoading: false,
      total: 0,
      loading: false,
      id: '',
      postObj: {
        order: { _id: -1 },
        page: 1,
        pageSize: 10,
        searchValue: {}
      },
      formItem: {
        user_list: []
      },
      ruleValidate: prRoleRules,
      userList: []
    }
  },
  created () {
    this._getDepList()
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      prRoleApi('list', this.postObj).then(res => {
        this.loading = false
        if (res.code === '0000') {
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    // 点击新增
    add () {
      this.$refs['formItem'].resetFields()
      this.SET_STATUS(true)
      this.addPageShow = true
      this.apiType = 'new'
      this.operationText = '新增'
      this.formItem = {}
    },
    edit (dataObj) {
      this.apiType = 'edit'
      this.operationText = '修改'
      this.formItem = dataObj
      this.addPageShow = true
      if (this.formItem.user_list && this.formItem.user_list.length) {
        this.formItem.user_list = this.formItem.user_list.map(item => {
          return JSON.stringify(item)
        })
      }
    },
    // 点击删除
    delete (dateObj) {
      this.sure_del = true
      this.id = dateObj._id
    },
    // 确认删除
    dels () {
      this.sure_del = false
      prRoleApi('delete', { _id: this.id }).then(res => {
        if (res.code === '0000') {
          successNotice(res.message)
          this.getList()
        }
      })
    },
    ...mapMutations(['SET_STATUS']),
    // 点击搜索
    search () {
      this.postObj.searchValue.role_name = likeStrSearch(this.searchVal.role_name)
      this.getList()
    },
    // 分页
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    selected (value) {
      if (value) {
        this.userShow = true
        let index = this.departmentList.findIndex(item => value === item.department_fullname)
        this.formItem.department_fullname = this.departmentList[index].department_fullname
        this.formItem.department_name = this.departmentList[index].department_name
        this.formItem.department_code = this.departmentList[index].department_code
        getAllList(this.formItem.department_code).then(res => {
          if (res.code === '0000') {
            this.userList = []
            res.result.result.map(item => {
              this.userList.push({
                user_id: item.userid,
                user_name: item.username
              })
            })
          }
        })
      } else {
        this.userShow = false
      }
    },
    autoSearch (query) {
      if (query !== '') {
        this.selectLoading = true
        setTimeout(() => {
          this.selectLoading = false
          this.autoCompleteData = this.departmentList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        this.autoCompleteData = []
      }
    },
    // 获取全部部门信息
    _getDepList () {
      getDepList().then(res => {
        if (res.code === '0000') {
          this.departmentInfo = res.result.result
          this.departmentList = res.result.result.map(item => {
            return {
              value: item.fullname,
              label: item.fullname,
              department_fullname: item.fullname,
              department_name: item.name,
              department_code: item.code,
              department_level: item.level
            }
          })
        }
      })
    },
    // 点击保存
    save (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formItem.user_list) {
            this.formItem.user_list = this.formItem.user_list.map(item => {
              return JSON.parse(item)
            })
          }
          prRoleApi(this.apiType, this.formItem).then(res => {
            if (res.code === '0000') {
              this.addPageShow = false
              successNotice(res.message)
              this.getList()
            } else {
              errorNotice(res.message, true)
            }
          })
        }
      })
    },
    // 点击取消
    cancel () {
      this.addPageShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
	.pr-role {
		height: 100%;
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
		.search {
			margin-bottom: 15px;
			.searchBtn {
				display: inline-block;
			}
		}
		.addPage {
			padding: 0 10px;
			z-index: 3;
			height: 100%;
			width: 100%;
			background: #fff;
			position: absolute;
			top: 0;
			left: 0;
			form {
				margin-top: 60px;
				margin-bottom: 20px;
			}
		}
	}
</style>
