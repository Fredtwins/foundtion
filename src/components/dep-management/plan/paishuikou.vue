<template>
  <div class="school">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/depManagement/paishuikou">部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据维护</BreadcrumbItem>
        <BreadcrumbItem>排水口数据</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索-->
    <Form ref="formInline" inline :label-width="60">
      <Form-item label="编号">
        <Input v-model="formInline.pntcode" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="名称">
        <Input v-model="formInline.pntname" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="地理位置">
        <Input v-model="formInline.pntplace" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Button type="ghost" shape="circle" icon="ios-search" class="ziti" @click="submitsearch(1)"></Button>
      <Button class="iconbtn" size="large" @click="exportData(1)">
        <Icon type="ios-download-outline"></Icon>导出数据
      </Button>
      <div class="add pull-right" @click="add">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
      </div>
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
    <template slot="content">
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
  </div>
</template>

<script>
import { paishuiThead } from 'common/js/tables'
import { getpaishuikoulist, getpaishuikoudel } from 'api/shujuage'
import { mapMutations } from 'vuex'
import { getLocalStorage } from 'common/js/dom'
import { cloneObj, likeStrSearch } from 'common/js/util'

export default {
  data () {
    return {
      loading: false,
      tableThead: paishuiThead(this),
      tableTbody: [],
      total: 1,
      current: 1,
      modal2: false,
      modal_loading: false,
      formInline: {
        pntcode: '',
        pntname: '',
        pntplace: ''
      }
    }
  },
  methods: {
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: '排水口数据'
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
        strivkeypntid: '',
        strivid: '',
        pntcode: '',
        pntname: '',
        pnttype: '',
        lng: '',
        lat: '',
        orilng: '',
        orilat: '',
        pntcomment: '',
        builddate: '',
        buildman: '',
        oriimagepath: '',
        zoomimgpath: '',
        showorder: '',
        pntplace: '',
        unused: '',
        routeid: '',
        glng: '',
        glat: '',
        mlng: '',
        mlat: '',
        noused: '',
        trnsieze: '',
        trnheight: '',
        trntype: '',
        trnsource: '',
        trntonnage: '',
        trnhandleway: '',
        trnhandleyear: '',
        zoomicon: '',
        pntdir: '',
        colman: '',
        coldate: '',
        haspics: ''
      }
      getLocalStorage('id', 'false')
      this.$router.push('/home/depManagement/paishuikou/paishuikouweihu')
    },
    // 搜索
    submitsearch (page) {
      let search = {}
      if (this.formInline.pntcode) {
        search.pntcode = likeStrSearch(this.formInline.pntcode)
      }
      if (this.formInline.pntname) {
        search.pntname = likeStrSearch(this.formInline.pntname)
      }
      if (this.formInline.pntplace) {
        search.pntplace = likeStrSearch(this.formInline.pntplace)
      }
      this._getuserList(page, search)
    },
    // 列表
    _getuserList (page, search) {
      this.loading = true
      getpaishuikoulist(page, search).then(res => {
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
      this.$router.push('/home/depManagement/paishuikou/paishuikouweihu')
    },
    // 删除
    del (row) {
      this.rowIng = cloneObj(row)
      this.modal2 = true
    },
    // 删除成功
    dels () {
      // let data = {
      //   _ids: this.rowIng._id
      // }
      getpaishuikoudel(this.rowIng._id).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '删除成功'
          })
        }
        this.submitsearch()
        this.modal2 = false
      })
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
