<template>
  <div class="hillpool">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/depManagement/hillpool">部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据维护</BreadcrumbItem>
        <BreadcrumbItem>山塘数据维护</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--搜索-->
    <Form ref="formInline" inline :label-width="60">
      <Form-item label="主管部门">
        <Input v-model="formInline.主管部门" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="名称">
        <Input v-model="formInline.名称" :maxlength="16" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="工程所在地">
        <Input v-model="formInline.工程所在地" :maxlength="16" placeholder="请输入"></Input>
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
import { hillpool } from 'common/js/table'
import { getUserList, getdellist, getuserList } from 'api/hillpool'
import { getLocalStorage } from 'common/js/dom'
import { cloneObj, likeStrSearch, getUserIng } from 'common/js/util'

export default {
  data () {
    return {
      loading: false,
      tableThead: hillpool(this),
      tableTbody: [],
      total: 1,
      current: 1,
      modal2: false,
      modal_loading: false,
      formInline: {
        名称: '',
        主管部门: '',
        工程所在地: ''
      },
      postObj: {
        page: 1,
        pageSize: 10,
        order: { _id: -1 },
        searchValue: {
          '工程所在地': likeStrSearch(getUserIng().department_name)
        }
      }
    }
  },
  methods: {
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: '山塘数据维护'
        })
      }
    },
    // 页码
    changePage (page) {
      this.postObj.page = page
      this.submitsearch(page)
    },
    // 新增
    add () {
      this.formItem = {
        lat: '',
        lng: '',
        主管部门: '',
        信息化设备: '',
        '其他相关预案(名称)': '',
        '受影响人员数(万人)': '',
        名称: '',
        填表人: '',
        填表时间: '',
        复核人: '',
        大坝安全管理应急预案: '',
        安全综合评价: {
          是否进行过安全综合评价: '',
          时间: '',
          主要结论: '',
          安全类别: ''
        },
        审核人: '',
        工程任务: '',
        工程所在地: '',
        工程等级: '',
        '建设时间(年)': '',
        '总库容（万m³）': '',
        抢险队伍: {
          '人数（人）': '',
          负责人姓名: '',
          负责人电话: '',
          联系人姓名: '',
          联系人电话: ''
        },
        '校核洪峰流量（m³/s）': '',
        '校核洪水位（m）': '',
        '校核洪水标准(重现期)': '',
        管理单位: '',
        管理单位负责人: {
          姓名: '',
          单位: '',
          职务: '',
          电话: ''
        },
        类型: '',
        群众转移方案是否编制: '',
        联系电话: '',
        '设计洪峰流量（m³/s）': '',
        '设计洪水位（m）': '',
        '设计洪水标准(重现期)': '',
        '调节库容（万m³）': '',
        重要保护对象: '',
        防汛技术责任人: {
          姓名: '',
          单位: '',
          职务: '',
          电话: ''
        },
        防汛抢险物资储备现状情况: {
          '袋类（条）': '',
          '土工布（m²）': '',
          '砂石(m³)': '',
          '块石（m³）': '',
          '救生衣(件)': '',
          '存放点与水库(山塘)距离（m）': ''
        },
        防汛行政责任人: {
          姓名: '',
          单位: '',
          职务: '',
          电话: ''
        },
        防洪预案是否编制: ''
      }
      getLocalStorage('id', 'false')
      this.$router.push('/home/depManagement/hillpool/shantangweihu')
    },
    // 搜索
    submitsearch (page) {
      let search = {}
      if (this.formInline.名称) {
        search.名称 = likeStrSearch(this.formInline.名称)
      }
      if (this.formInline.主管部门) {
        search.主管部门 = likeStrSearch(this.formInline.主管部门)
      }
      if (this.formInline.工程所在地) {
        search.工程所在地 = likeStrSearch(this.formInline.工程所在地)
      }
      this.getuserList(page, search)
    },
    // 列表
    _getuserList () {
      this.loading = true
      let departmentLevel = getLocalStorage('info').department_level
      if (departmentLevel < 2 || departmentLevel === 2) {
        this.postObj.searchValue = ''
      } else {
        this.postObj.searchValue = ''
      }
      getUserList(this.postObj).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    getuserList (page, search) {
      this.loading = true
      getuserList(page, search).then(res => {
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
      this.$router.push('/home/depManagement/hillpool/shantangweihu')
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
      getdellist(this.rowIng._id).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '删除成功'
          })
        }
        this.submitsearch()
        this.modal2 = false
      })
    }
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
			margin: 5px;
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
