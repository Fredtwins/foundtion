<template>
  <div class="defense-statical">
    <Spin fix v-if="spinShow">
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div class="title">
      <span class="titleleft"></span>
      <span>位置 ：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>事后报表统计</BreadcrumbItem>
        <BreadcrumbItem>防御工作情况统计</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!-- <div class="search">
            <span class="search_title">所属部门</span>
            <Select :label='searchVal.department_name' not-found-text='无匹配部门，请重新输入' v-model="searchVal.department_name" filterable remote
                :remote-method="autoSearch" :loading="selectLoading" style="width:200px;padding-left: 10px;padding-right: 20px"
                @on-change='selected'>
                <Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
            <div class="searchBtn" @click="search">
                <Button type="ghost" shape="circle" icon="ios-search"></Button>
            </div>
            <div class="add pull-right" @click="add">
                <Button type="primary">
                    <span class="icon-xinzeng"></span>新增</Button>
            </div>
    </div>-->
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
    <div v-if="addPageShow" class="addPage">
      <div class="title">
        <span class="titleleft"></span>
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>报表汇总</BreadcrumbItem>
          <BreadcrumbItem>事后报表统计</BreadcrumbItem>
          <BreadcrumbItem>防御工作情况统计</BreadcrumbItem>
          <BreadcrumbItem>详细信息</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <add-page @cancel="cancel" :model="formItem"></add-page>
    </div>
  </div>
</template>

<script>
import addPage from './addPage.vue'
import { defenseThead } from 'common/js/table'
import { defenseApi, defensedetailsApi } from 'api/tab-summary'
import { mapGetters, mapMutations } from 'vuex'
import { errorNotice } from 'common/js/dom'

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
      tableThead: defenseThead(this),
      tableTbody: [],
      formItem: {},
      searchVal: {},
      total: 0,
      loading: false,
      postObj: {
        'page': 1,
        'pageSize': 10,
        'searchValue': {}
      },
      addPageShow: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      defenseApi(this.postObj).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
          }
        } else {
          errorNotice('服务器未连接，')
        }
      })
    },
    add () {
      this.SET_STATUS(true)
      this.addPageShow = true
    },
    ...mapMutations(['SET_STATUS']),
    search () { },
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    cancel () {
      this.addPageShow = false
    },
    details (obj) {
      this.SET_STATUS(true)
      this.spinShow = true
      defensedetailsApi({
        response_no: obj.response_no,
        department_level: '2'
      }).then(res => {
        this.addPageShow = true
        this.spinShow = false
        if (res.code === '0000') {
          this.formItem = res.result.result
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .defense-statical {
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
