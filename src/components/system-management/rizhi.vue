<!-- 人员管理 -->
<template>
  <div class="rizhi">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>系统日志</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <Form ref="formInline" :model="formInline" inline :label-width="60" id="mar">
      <Form-item label="部门名称">
        <Input v-model="formInline.department_name" style="width:2rem" placeholder="请输入模块"></Input>
      </Form-item>
      <Form-item label="系统权限">
        <Select
          clearable
          v-model="formInline.system_name"
          :maxlength="16"
          style="width:2rem"
          placeholder="请选择系统"
        >
          <Option value="南海区人民政府三防指挥系统"></Option>
          <Option value="南海区三防综合业务管理系统"></Option>
          <Option value="南海区三防指挥移动应用系统"></Option>
        </Select>
      </Form-item>
      <Form-item label="用户名称">
        <Input v-model="formInline.realname" style="width:2rem" placeholder="请输入"></Input>
      </Form-item>
      <div class="searchBtn">
        <Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch(1)"></Button>
      </div>
    </Form>
    <div class="center table" v-if="userlist">
      <Table :loading="loading" :data="UserData" :columns="theadArr" border stripe></Table>
    </div>
    <div class="page">
      <Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
import { searThead } from 'common/js/table'
import { getuserList } from 'api/rizhi'
import { cloneObj, likeStrSearch } from 'common/js/util'

export default {
  data () {
    return {
      userlist: true,
      loading: false,
      btnChange: false,
      formInline: {
        department_name: '',
        system_name: '',
        realname: ''
      },
      total: 0,
      current: 1,
      UserData: [],
      rolenameList: [],
      departmentNameList: [],
      formItem: {},
      theadArr: searThead(this)
    }
  },
  methods: {

    changePage: function (page) {
      this.page = page
      this.submitSearch(page)
    },

    cancel () {
      this.modal1 = false
    },

    _getUserList: function (page, search) {
      this.loading = true
      getuserList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.UserData = []

          res.result.result.map((item) => {
            this.UserData.push({
              ...item,
              'operation_info.url': item.operation_info.url,
              'operation_info.param': item.operation_info.param
            })
          })
          this.total = res.result.totalSize
          this.current = res.result.page
          this.loading = false
        }
      })
    },
    submitSearch (page) {
      for (var i in this.formInline) {
        if (!this.formInline[i]) {
          delete this.formInline[i]
        }
      }
      let search = cloneObj(this.formInline)
      if (this.formInline.department_name) {
        search.department_name = likeStrSearch(this.formInline.department_name)
      }
      if (this.formInline.system_name) {
        search.system_name = this.formInline.system_name
      }
      if (this.formInline.realname) {
        search.realname = likeStrSearch(this.formInline.realname)
      }
      this._getUserList(page, search)
    }
  },
  mounted: function () {
    this._getUserList()
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

	.rizhi {
		height: 100%;
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

	#mar {
		margin-top: 42px;
	}
</style>
