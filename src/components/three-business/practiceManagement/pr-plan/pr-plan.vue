<template>
  <div class="pr-plan">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>三防业务</BreadcrumbItem>
        <BreadcrumbItem>演练管理</BreadcrumbItem>
        <BreadcrumbItem>演练计划</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">演练标题</span>
      <Input
        placeholder="请输入"
        v-model="searchVal.healine"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      ></Input>
      <span class="search_title">状态</span>
      <Select
        clearable
        placeholder="请选择"
        v-model="searchVal.status"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      >
        <Option value="草稿"></Option>
        <Option value="启动"></Option>
        <Option value="关闭"></Option>
      </Select>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <div class="add pull-right" @click="add">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
      </div>
      <div class="add green pull-right" style="marginRight:5px" @click="release">
        <Button type="primary" icon="checkmark-circled">
          <span>启动</span>
        </Button>
      </div>
    </div>
    <div class="table">
      <Table
        @on-selection-change="selectedChange"
        ref="selection"
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
    <div class="addPage" v-if="addPageShow">
      <add-page :apiType="apiType" @save="save" @cancel="cancel" :dataObj="formItem"></add-page>
    </div>
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
import { prPlanThead } from 'common/js/table'
import { successNotice, errorNotice, warningNotice } from 'common/js/dom'
import { mapGetters, mapMutations } from 'vuex'
import { prPlanApi, changeStatus } from 'api/practice-management'
import addPage from './addPage.vue'
import { likeStrSearch, cloneObj } from 'common/js/util'
export default {
  components: {
    addPage
  },
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
      apiType: 'list',
      operationText: '新增',
      sure_del: false,
      addPageShow: false,
      searchVal: {},
      tableThead: prPlanThead(this),
      tableTbody: [],
      total: 0,
      loading: false,
      departmentList: [],
      autoCompleteData: [],
      selectLoading: false,
      id: '',
      postObj: {
        order: { _id: -1 },
        page: 1,
        pageSize: 10,
        searchValue: {}
      },
      formItem: {},
      _ids: []
    }
  },
  created () {
    // this._getDepList()
    this.getList()
  },
  methods: {
    release () {
      if (this._ids && this._ids.length) {
        changeStatus({
          status: '启动',
          _ids: this._ids
        }).then(res => {
          if (res.code === '0000') {
            successNotice('已成功启动计划')
            this.getList()
          } else {
            errorNotice(res.message, true)
          }
        })
      } else {
        warningNotice('请选择一条数据')
      }
    },
    selectedChange (selection) {
      this._ids = selection.map(item => {
        return item._id
      })
    },
    getList () {
      this.loading = true
      prPlanApi('list', this.postObj).then(res => {
        this.loading = false
        if (res.code === '0000') {
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    // 点击新增
    add () {
      this.formItem = {
        status: '草稿'
      }
      this.SET_STATUS(true)
      this.addPageShow = true
      this.apiType = 'new'
      this.operationText = '新增'
    },
    edit (dataObj) {
      this.SET_STATUS(true)
      this.formItem = dataObj
      this.apiType = 'edit'
      this.addPageShow = true
      this.operationText = '修改'
    },
    // 点击删除
    delete (dateObj) {
      this.sure_del = true
      this.id = dateObj._id
    },
    // 确认删除
    dels () {
      this.sure_del = false
      prPlanApi('delete', { _id: this.id }).then(res => {
        if (res.code === '0000') {
          successNotice(res.message)
          this.getList()
        }
      })
    },
    ...mapMutations(['SET_STATUS']),
    // 点击搜索
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.postObj.searchValue = cloneObj(this.searchVal)
      if (this.postObj.searchValue.healine) {
        this.postObj.searchValue.healine = likeStrSearch(this.searchVal.healine)
      }
      this.getList()
    },
    // 分页
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    save () {
      this.getList()
    },
    // 点击取消
    cancel () {
      this.addPageShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
	.pr-plan {
		height: 100%;
		.green {
			button {
				background: #19be6b !important;
				padding-left: 10px;
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
