<template>
  <div class="temporary-report-statistical">
    <Spin fix v-if="spinShow">
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div class="title">
      <span class="titleleft"></span>
      <span>位置 :</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>事中报表统计</BreadcrumbItem>
        <BreadcrumbItem>临时报表统计</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索 -->
    <Form ref="formInline" :model="formInline" inline :label-width="100">
      <Form-item label="应急响应编号" prop="response_no">
        <Input v-model="formInline.response_no" placeholder="请输入应急响应编号"></Input>
      </Form-item>
      <Form-item label="表单名称">
        <Input v-model="formInline.form_name" placeholder="请输入表单名称"></Input>
      </Form-item>
      <div class="searchBtn">
        <Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch(1)"></Button>
      </div>
    </Form>

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
    <div v-if="addPageShow" class="addPage">
      <div class="title">
        <span class="titleleft"></span>
        <span>位置:</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>报表汇总</BreadcrumbItem>
          <BreadcrumbItem>事中报表统计</BreadcrumbItem>
          <BreadcrumbItem to="/home/tab-summary/temporary-report-statistical">临时报表统计</BreadcrumbItem>
          <BreadcrumbItem>详细信息</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <add-page @cancel="cancel" :model="formItem"></add-page>
    </div>
  </div>
</template>

<script>
import addPage from './addPage.vue'
import { temporaryReportThead } from 'common/js/table'
import { temporaryReportApi, temporaryReportDetailApi } from 'api/tab-summary'
import { errorNotice } from 'common/js/dom'
import { likeStrSearch } from 'common/js/util'
import { mapGetters, mapMutations } from 'vuex'

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
  components: {
    addPage
  },
  data () {
    return {
      spinShow: false,
      loading: false,
      addPageShow: false,
      formInline: {
        response_no: '',
        form_name: ''
      },
      postDetailObj: {
        page: 1,
        pageSize: 20,
        response_no: '',
        form_name: ''
      },
      tableThead: temporaryReportThead(this),
      tableTbody: [],
      formItem: [],
      current: 1,
      total: 0
    }
  },
  methods: {
    // 搜索
    submitSearch (page) {
      let search = {}
      if (this.formInline.response_no) {
        search.response_no = likeStrSearch(this.formInline.response_no)
      }
      if (this.formInline.form_name) {
        search.form_name = likeStrSearch(this.formInline.form_name)
      }
      this._defUserList(page, search)
    },
    // 页码
    changePage: function (page) {
      this._defUserList(page)
    },
    cancel () {
      this.addPageShow = false
    },
    // 列表
    _defUserList (page, search) {
      this.loading = true
      temporaryReportApi(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
          this.current = res.result.page
        }
      })
    },
    details (dataObj) {
      this.SET_STATUS(true)
      this.spinShow = true
      this.postDetailObj.response_no = dataObj.response_no
      this.postDetailObj.form_name = dataObj.form_name
      temporaryReportDetailApi(this.postDetailObj).then(res => {
        this.spinShow = false
        if (res.code === '0000') {
          this.formItem = res.result
          this.addPageShow = true
        }
        if (res.code === '0001') {
          errorNotice('该表已删除', true)
        }
      })
    },
    ...mapMutations(['SET_STATUS'])
  },
  mounted () {
    this._defUserList()
    this.rowIng = {}
  }
}
</script>

<style scoped lang="scss">
    .temporary-report-statistical {
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
            z-index: 99;
			>span {
				font-size: 14px;
				font-weight: 600;
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
