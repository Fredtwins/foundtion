<template>
  <div class="er-management">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
        <BreadcrumbItem>应急响应过程</BreadcrumbItem>
        <BreadcrumbItem>应急响应历史</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">应急响应类型</span>
      <Select
        v-model="searchVal.response_type"
        placeholder="请选择"
        :clearable="true"
        style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
      >
        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span class="search_title">级别</span>
      <Select
        v-model="searchVal.response_level"
        placeholder="请选择"
        :clearable="true"
        style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
      >
        <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span class="search_title">状态</span>
      <Select
        v-model="searchVal.status"
        placeholder="请选择"
        :clearable="true"
        style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
      >
        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span class="search_title">生成时间</span>
      <!-- <Select v-model="searchVal.createdt" placeholder="请选择" :clearable="true" style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem">
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>-->
      <DatePicker
        clearable
        @on-change="selectDate"
        v-model="searchVal.createdt"
        type="date"
        placeholder="请选择"
        style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
      ></DatePicker>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <!-- <div class="add pull-right" @click="add">
                <Button type="primary">
                    <span class="icon-xinzeng"></span>新增</Button>
      </div>-->
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
    <div class="page">
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <!-- 新增/修改 -->
    <Modal v-model="disabled" width="600">
      <p slot="header" style="font-size:20px;text-align:center">
        <span>{{moduleTitle}}</span>
      </p>
      <div style="text-align:center">
        <Form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="100">
          <FormItem label="应急响应类型" prop="response_type">
            <Select v-model="formItem.response_type" :disabled="formDisabled">
              <Option value="防风">防风</Option>
              <Option value="防汛">防汛</Option>
              <Option value="防旱">防旱</Option>
              <Option value="防旱">防暴雨</Option>
            </Select>
          </FormItem>
          <FormItem label="级别" prop="response_level">
            <Select v-model="formItem.response_level" :disabled="formDisabled">
              <Option value="I级">I级</Option>
              <Option value="II级">II级</Option>
              <Option value="III级">III级</Option>
              <Option value="VI级">VI级</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="sureBtn('formItem')">确认</Button>
      </div>
    </Modal>
    <!--确认关闭  -->
    <Modal v-model="sure_del" width="360">
      <p slot="header" style="color:red;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>关闭</span>
      </p>
      <div style="text-align:center">
        <p>确认关闭？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="dels">确认</Button>
      </div>
    </Modal>
    <!--确认调整 -->
    <Modal v-model="sure_edit" width="360">
      <!-- <p slot="header" style="color:red;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>调整</span>
      </p> -->
      <div style="text-align:center">
        <span>级别</span>
        <Select
          v-model="formItem.response_level"
          placeholder="请选择"
          :clearable="true"
          style="width:200px;padding-left: 10px;padding-right: 20px"
        >
          <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="sureEdit">确认</Button>
      </div>
    </Modal>
    <!-- 查看历史 -->
    <Modal v-model="sure_showsearch">
      <div slot="header" ref="inter">{{updateTitle}}</div>
      <!-- 表格 -->
      <div class="center">
        <Table border highlight-row :data="DataTable" :columns="tableArr" stripe></Table>
      </div>
    </Modal>
  </div>
</template>

<script>
import { erManagementThead, codethead } from 'common/js/table'
import { getErmList, addErm, updateErm, closeErm } from 'api/er-management'
import { initTime, likeStrSearch } from 'common/js/util'
import { erManagementQuery } from 'common/js/query'
import { ErManagement } from 'common/js/rules'
import { errorNotice } from 'common/js/dom'

export default {
  data () {
    return {
      sure_edit: false,
      loading: false,
      ruleValidate: ErManagement,
      sure_del: false,
      delObj: {},
      formDisabled: false,
      moduleTitle: '新增',
      disabled: false,
      sure_showsearch: false,
      updateTitle: '查看历史',
      formItem: {
        response_no: '',
        response_name: '',
        response_level: '',
        createdt: '',
        modifydt: '',
        status: '',
        closedt: '',
        response_type: ''
      },
      isShow: false,
      total: 0,
      postObj: {
        'page': 1,
        'pageSize': 10,
        'order': { _id: -1 },
        'searchValue': {}
      },
      tableThead: erManagementThead(this),
      tableTbody: [],
      searchVal: {},
      typeList: erManagementQuery().typeList,
      levelList: erManagementQuery().levelList,
      statusList: erManagementQuery().statusList,
      DataTable: [],
      tableArr: codethead(this)
    }
  },
  created () {
    this._getErmList()
  },
  methods: {
    selectDate (date) {
      if (date) {
        this.searchVal.createdt = likeStrSearch(date)
      }
    },
    sureEdit () {
      this.formItem.closedt = initTime()
      // this.formItem.status = '调整'
      updateErm(this.formItem).then(res => {
        this.sure_edit = false
        if (res.code === '0000') {
          this._getErmList()
        }
      })
    },
    add () {
      this.disabled = true
      this.formDisabled = false
      this.moduleTitle = '新增'
      this.formItem = {}
    },
    sureBtn (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.disabled = false
          if (this.moduleTitle === '新增') {
            this.formItem.response_name = this.formItem.response_type
            this.formItem.createdt = this.formItem.modifydt = this.formItem.closedt = initTime()
            this.formItem.response_no = '应-' + initTime('yyyy') + '-' + this.formItem.response_type
            this.formItem.status = '启动'
            addErm(this.formItem).then(res => {
              if (res.code === '0000') {
                this._getErmList()
              }
            })
          } else {
            this.formItem.closedt = initTime()
            updateErm(this.formItem).then(res => {
              if (res.code === '0000') {
                this._getErmList()
              }
            })
          }
          this.$Message.success('Success!')
        }
      })
    },
    searchBtns (dataObj) {
      console.log(dataObj)
      this.sure_showsearch = true
      this.DataTable = dataObj.response_history
    },
    eidt (dataObj) {
      console.log(dataObj)
      this.formItem = dataObj
      this.sure_edit = true
    },
    dels () {
      this.sure_del = false
      closeErm(this.delObj).then(res => {
        if (res.code === '0000') {
          this._getErmList()
        }
      })
    },
    close (index, data) {
      this.delObj = { status: '关闭', _id: data._id, closedt: initTime() }
      this.sure_del = true
    },
    _getErmList () {
      this.loading = true
      getErmList(this.postObj).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.$Loading.finish()
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
          }
        } else {
          errorNotice('服务器未连接，')
        }
      })
    },
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.postObj.searchValue = this.searchVal
      this._getErmList()
    },
    pageChange (index) {
      this.postObj.page = index
      this._getErmList()
    }
  }
}
</script>

<style scoped lang="scss">
  .er-management {
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
  }
</style>
