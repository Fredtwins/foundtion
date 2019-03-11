<!-- 人员管理 -->
<template>
  <div class="mokuaiguanli">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>模块管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <Form ref="formInline" :model="formInline" inline :label-width="60" id="mar">
      <Form-item label="模块名称" prop="name">
        <Input v-model="formInline.name" placeholder="请输入模块"></Input>
      </Form-item>
      <Form-item label="层级1" prop="level1">
        <Input v-model="formInline.level1" placeholder="请输入"></Input>
      </Form-item>
      <div class="searchBtn">
        <Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch(1)"></Button>
      </div>
    </Form>

    <!-- <Button class="addBtn" @click="addUser"><Icon type="plus-round"></Icon> 新增</Button> -->
    <!-- <Collapse class="aa"> -->
    <!-- <Panel name="1">
    条件筛选-->
    <template slot="content"></template>
    <!-- </Panel> -->
    <!-- </Collapse> -->
    <div class="center table">
      <Table :loading="loading" :data="UserData" :columns="theadArr" border stripe></Table>
    </div>
    <div class="page">
      <Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
import { mokuaiThead } from 'common/js/table'
import { loadingMixin } from 'common/js/mixins'
import { getUserList } from 'api/mokuaiguanli'
import { likeStrSearch } from 'common/js/util'

export default {
  mixins: [loadingMixin],
  data () {
    return {
      loading: false,
      modal1: false,
      btnChange: false,
      btnSave: false,
      updateTitle: '',
      formInline: {
        name: '',
        level1: ''
      },
      waterRecordPage: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      total: 0,
      current: 1,
      UserData: [],
      rolenameList: [],
      departmentNameList: [],
      bucunzai: '',
      formItem: {},
      theadArr: mokuaiThead(this)
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
      getUserList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.UserData = res.result.result
          this.total = res.result.totalSize
          this.current = res.result.page
        }
      })
    },
    submitSearch (page) {
      let search = {}
      if (this.formInline.name) {
        search.name = likeStrSearch(this.formInline.name)
      }
      if (this.formInline.level1) {
        search.level1 = likeStrSearch(this.formInline.level1)
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

	.mokuaiguanli {
		// height: 100%;
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
</style>
