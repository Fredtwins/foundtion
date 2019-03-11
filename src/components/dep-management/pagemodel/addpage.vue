<template>
  <div class="addPage">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据上报</BreadcrumbItem>
        <BreadcrumbItem>数据模板</BreadcrumbItem>
        <BreadcrumbItem>上报数据表单定义</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="addPagetitle">
      <!--<BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">部门管理</BreadcrumbItem>-->
      <BreadcrumbItem>上报数据表单定义</BreadcrumbItem>
      <div class="buttons pull-right" style="width:300px">
        <Button type="ghost" @click="btna">返回</Button>
        <Button class="addBtn" @click="add">
          <Icon type="plus-round"></Icon>添加栏位
        </Button>

        <Button type="primary" @click="_gettiaoList('formItem')" v-if="btns">新增保存</Button>
        <Button type="warning" @click="_gettiaoeditList" v-if="btn">修改保存</Button>
      </div>
    </div>

    <!--输入框-->
    <div class="cont">
      <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="80" class="forms">
        <Form-item label="对应预案" prop="plan_type" style="width:600px">
          <Select v-model="formItem.plan_type" style="width:600px">
            <Option
              v-for="item in deparList"
              :value="item.plan_type"
              :key="item.plan_type"
            >{{item.plan_type}}</Option>
          </Select>
        </Form-item>
        <Form-item label="任务类型" prop="task_type" style="width:600px">
          <Select placeholder="请选择" style="width:600px" v-model="formItem.task_type">
            <Option
              v-for="item in deparLists"
              :value="item.task_type"
              :key="item.task_type"
            >{{item.task_type}}</Option>
          </Select>
        </Form-item>

        <FormItem label="表单名称" prop="form_name" style="width:600px">
          <Input
            v-model="formItem.form_name"
            :disabled="formDisabled"
            placeholder="请输入表单名称"
            style="width:600px"
          ></Input>
        </FormItem>

        <Form-item label="选择部门" style="width:600px">
          <Select
            v-model="department_names"
            @on-change="depcoed"
            filterable
            multiple
            style="width:600px"
          >
            <Option
              v-for="item in departmentLists"
              :value="item.fullname"
              :key="item.department_code"
            >{{ item.fullname }}</Option>
          </Select>
        </Form-item>
      </Form>
    </div>

    <!--模态框  -->
    <template slot="content">
      <Modal v-model="modal1">
        <div slot="header">{{updateTitle}}</div>
        <Form :model="formItem" :label-width="80">
          <Form-item label="栏位名称">
            <Input v-model="formItem.col_info[0]['栏位名称']" placeholder="请输入栏位名称"></Input>
          </Form-item>
          <FormItem label="栏位类型">
            <Select v-model="formItem.col_info[0]['栏位类型']">
              <Option value="文字">文字</Option>
              <Option value="数字">数字</Option>
            </Select>
          </FormItem>
          <Form-item label="栏位说明">
            <Input v-model="formItem.col_info[0]['栏位说明']" placeholder="请输入栏位说明"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="_getaddList">保存</Button>
        </div>
      </Modal>
      <!--确认删除  -->
      <Modal v-model="modal2" width="360">
        <p slot="header" style="color:red;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除</span>
        </p>
        <div style="text-align:center">
          <p>确认删除此栏位？</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long :loading="modal_loading" @click="_getDelList">确认</Button>
        </div>
      </Modal>
    </template>
    <!--表格  -->
    <div class="center tablex">
      <!--<Table @on-select='selected' ref="selection" border highlight-row :data="UserData" :columns="theadArr" stripe></Table>-->
      <Table border highlight-row :data="UserData" :columns="theadArr" stripe></Table>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
  </div>
</template>

<script>
import { addThaed } from 'common/js/table'
import { getLocalStorage } from 'common/js/dom'
import { getUserList, getaddList, geteditList } from 'api/addpage'
import { getbumensList } from 'api/bumenlist'
import { addpageRules } from 'common/js/rules'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      ruleValidate: addpageRules,
      // loading:false,
      spinShow: false,
      autoCompleteData: [],
      selectLoading: false,
      modal_loading: false,
      index: 0,
      modal2: false,
      updateTitle: '',
      modal1: false,
      formDisabled: false,
      btns: true,
      btn: false,
      departmentLists: [],
      department_names: [],
      formItem: {
        // department_name: "",
        // department_code: "",
        // department_level: "",
        plan_type: [],
        form_name: '',
        col_info: [{}],
        department_list: [],
        task_type: ''
      },
      departmentNameList: [{
        name: '文字'
      }, {
        name: '数字'
      }],
      UserData: [],
      theadArr: addThaed(this),
      deparList: [{
        plan_type: '全部'
      },
      {
        plan_type: '防风'
      },
      {
        plan_type: '防汛'
      },
      {
        plan_type: '防旱'
      },
      {
        plan_type: '防暴雨'
      }
      ],
      deparLists: [{
        task_type: '日常任务'
      }, {
        task_type: '事前任务'
      }, {
        task_type: '事中任务'
      }, {
        task_type: '事后任务'
      }]
    }
  },
  computed: {
    ...mapGetters(['DepartReportInfo'])
  },
  methods: {
    btna () {
      if (getLocalStorage('formpath') === '/home/threeBusiness/er_plan/dataTable') {
        this.$router.push('/home/threeBusiness/er_plan/dataTable')
      } else {
        this.$router.push('/home/depManagement/deplist')
      }
    },
    depcoed (names) {
      this.formItem.department_list = []
      for (var i = 0; i < names.length; i++) {
        for (var j = 0; j < this.departmentLists.length; j++) {
          if (this.departmentLists[j].fullname === names[i]) {
            var str = {}
            str.department_name = this.departmentLists[j].fullname
            str.department_level = this.departmentLists[j].level
            str.department_code = this.departmentLists[j].code
            this.formItem.department_list.push(str)
          }
        }
      }
    },
    // 表格列表
    _getUserList (search) {
    // 判断是否是预案那边点击过来的，如果是就传个form_name过来，如果不是就直接传id
      if (getLocalStorage('FormNamePath') === '/home/threeBusiness/er_plan/dataTable') {
        search = {
          form_name: this.DepartReportInfo.form_name
        }
      }
      search = {
        _id: this.id
        // form_name: "三防责任网格联络员名单"
      }
      // this.loading = true
      // 判断这个id是否是新增还是编辑，如果是新增表格内容那些就为空
      if (getLocalStorage('id') !== 'false') {
        getUserList(search).then(res => {
          if (res.code === ERR_OK) {
            // this.loading = false;
            this.formDisabled = true
            this.btn = true
            this.btns = false
            this.formItem = res.result.result[0]
            this.UserData = res.result.result[0].col_info
            this.formItem.department_list.map(item => {
              this.departmentLists.map(items => {
                if (item.department_code === items.code) {
                  this.department_names.push(items.fullname)
                }
              })
              // this.department_names.push(item.department_name)
            })
          }
        })
      }
    },
    // 部门列表
    getDepartmentNameList (page, search) {
      getbumensList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.departmentLists = res.result.result
          this._getUserList()
        }
      })
    },
    // 点击新增按钮
    add () {
      // this.formItem = {}
      // 模态框显示
      this.modal1 = true
      this.updateTitle = '新增'
      // 将要新增的东西列出来
      this.formItem.col_info = [{
        栏位名称: '',
        栏位类型: '',
        栏位说明: ''
      }]
    },
    // 模态框点击保存按钮
    _getaddList () {
      this.modal1 = false
      this.UserData.push(this.formItem.col_info[0])
    },
    // 页面点击新增按钮
    _gettiaoList (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.formItem.col_info = this.UserData
          this.spinShow = true
          // 新增保存时候调用新增的接口
          getaddList(this.formItem).then(res => {
            if (res.code === ERR_OK) {
              this.$Notice.success({
                title: '新增成功'
              })
              this.$router.push('/home/depManagement/deplist')
            } else {
              this.$Notice.warning({
                title: '请添加栏位'
              })
            }
            if (res.code === '0001') {
              this.$Notice.warning({
                title: '已存在此表'
              })
            }
            this.spinShow = false
          })
        }
      })
    },
    // 页面点击修改按钮
    _gettiaoeditList () {
      this.formItem.col_info = this.UserData
      geteditList(this.formItem).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '修改成功'
          })
          this.$router.push('/home/depManagement/deplist')
        }
      })
    },
    // 页面点击删除按钮
    _getDelList () {
      this.UserData.splice(this.index._index, 1)
      this.modal2 = false
    },
    // 删除
    del (index) {
      this.modal2 = true
      this.index = index
    }
  },
  mounted () {
    this.rowIng = {}
    this.getDepartmentNameList()
  },
  created () {
    this.id = getLocalStorage('id')
    // this._getUserList();
  }
}
</script>

<style scoped lang="scss">
	.addPagetitle {
		font-size: 20px;
		margin-bottom: 40px;
	}

	.cont {
		/* text-align: center; */
		margin: 0 auto;
		width: 200rem;
	}

	.addPage {
		text-align: center;
		/* width: 30rem; */
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
	}

	.mangerment section {
		overflow: hidden;
	}
	/* .mangerment section .title{
    left:20rem;
  } */
</style>
