<template>
  <div class="school">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/depManagement/shuiwang">部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据维护</BreadcrumbItem>
        <BreadcrumbItem>水网数据维护</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索-->
    <Form ref="formInline" inline :label-width="60">
      <Form-item label="名称">
        <Input v-model="formInline.rivname" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="编号">
        <Input v-model="formInline.byvilliage" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="主管部门">
        <Input v-model="formInline.chargevil" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Button type="ghost" shape="circle" icon="ios-search" class="ziti" @click="submitsearch(1)"></Button>
      <Button class="iconbtn" size="large" @click="exportData(1)">
        <Icon type="ios-download-outline"></Icon>导出数据
      </Button>
      <!--<div class="add pull-right" @click="add">
				<Button type="primary">
          <span class="icon-xinzeng"></span>新增</Button>
      </div>-->
    </Form>
    <!--表格-->
    <div class="table">
      <Table
        ref="table"
        :loading="loading"
        border
        stripe
        size="small"
        highlight-row
        :columns="tableThead"
        :data="tableTbody"
      ></Table>
      <!--<Page class="pull-right" :total="total" :current="current" size="small" show-total @on-change="changePage"></Page>-->
    </div>
    <div class="page">
      <Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
import { shuiwanThead } from 'common/js/tables'
import { getUserList } from 'api/shujuage'
import { mapMutations } from 'vuex'
import { getLocalStorage } from 'common/js/dom'
import { cloneObj, likeStrSearch } from 'common/js/util'

export default {
  data () {
    return {
      loading: false,
      tableThead: shuiwanThead(this),
      tableTbody: [],
      total: 1,
      current: 1,
      modal2: false,
      modal_loading: false,
      formInline: {
        rivname: '',
        chargevil: '',
        byvilliage: ''
      }
    }
  },
  methods: {
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: '水网数据'
        })
      }
    },
    // 页码
    changePage (page) {
      this.page = page
      this.submitsearch(page)
    },
    // 新增
    add () {
      this.formItem = {
        strivid: '',
        rivcode: '',
        rivname: '',
        byvilliage: '',
        rivprop: '',
        rivlength: '',
        treecode: '',
        parentcode: '',
        endtreecode: '',
        chargevil: '',
        remark: '',
        startplace: '',
        endplace: '',
        ourcharge: '',
        beencol: '',
        sibleorder: '',
        unitcode: '',
        mstartlng: '',
        mstartlat: '',
        gstartlng: '',
        gstartlat: '',
        mendlng: '',
        mendlat: '',
        gendlng: '',
        gendlat: '',
        builded: '',
        startstriv: '',
        endstriv: '',
        ctlarea: '',
        geodesc: '',
        startlng: '',
        startlat: '',
        endlng: '',
        endlat: '',
        rivdesc: '',
        startstrivname: '',
        endstrivname: '',
        startsegcode: '',
        endsegcode: '',
        startsegname: '',
        endsegname: '',
        startsegid: '',
        endsegid: '',
        invalidated: '',
        lockedriv: ''

      }
    },
    // 搜索
    submitsearch (page) {
      let search = {}
      if (this.formInline.rivname) {
        search.rivname = likeStrSearch(this.formInline.rivname)
      }
      if (this.formInline.chargevil) {
        search.chargevil = likeStrSearch(this.formInline.chargevil)
      }
      if (this.formInline.byvilliage) {
        search.byvilliage = likeStrSearch(this.formInline.byvilliage)
      }
      this._getuserList(page, search)
    },
    // 列表
    _getuserList (page, search) {
      this.loading = true
      getUserList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    // 点击编辑
    edit (dataObj) {
      getLocalStorage('formItemd', dataObj)
      getLocalStorage('id', dataObj._id)
      this.SET_SHUIKU(dataObj)
      this.$router.push('/home/depManagement/shuiwang/shuiwangweihu')
    },
    // 删除
    del (row) {
      this.rowIng = cloneObj(row)
      this.modal2 = true
    },
    ...mapMutations([
      'SET_SHUIKU'
    ])
  },
  mounted () {
    this._getuserList()
    this.rowIng = {}
  }
}
</script>

<style scoped lang="scss">
	.title {
		position: absolute;
		top: 0px;
		left: 0px;
		display: flex;
		flex-direction: row;
		width: 100%;
		 background: rgb(237, 246, 250);
		height: 0.5rem;
		line-height: 0.5rem;
		padding-left: 10px;
		>span {
			font-size: 16px;
			font-weight: 600;
		}

	}
	.addBtn {
			background-color: #008cee !important;
			color: #fff;
			margin: 0px;
			height: 40px;
		}
	.ziti {
		display: inline-block;
		background: #18bdff;
		font-size: 20px;
		color: #FFFFFF;
		border-radius: 0;
	}
</style>
