<template>
  <div class="transfet-statical">
    <Spin fix v-if="spinShow">
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>三防信息查询</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <Tabs type="card" :animated="false" @on-click="jump">
      <TabPane label="预案查询" name="1">
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
        <div class="page pageStyle pull-right">
          <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
        </div>
      </TabPane>
      <TabPane label="三防资料" name="2">
        <sanfang-data :show="false"></sanfang-data>
      </TabPane>
    </Tabs>
    <div v-if="addPageShow" class="addPage">
      <div class="title">
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>报表汇总</BreadcrumbItem>
          <BreadcrumbItem>三防信息查询</BreadcrumbItem>
          <BreadcrumbItem>详细信息</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <operation-table
        :data="addModuleData"
        :model="formItem"
        labelWidth="150px"
        labelBackgroundColor="#edf6fa"
        bordercolor="#999999"
      ></operation-table>
      <Button @click="cancel" type="info">取消</Button>
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
    </div>-->
  </div>
</template>

<script>
import { planSearchThead } from 'common/js/table'
import { getdepList } from 'api/plan_management'
import { mapGetters, mapMutations } from 'vuex'
import { errorNotice } from 'common/js/dom'
import { planModule } from 'common/js/module'
import OperationTable from 'base/operation-table/operation-table'
import sanfangData from '../../daily-office/data-management.vue'

export default {
  computed: {
    ...mapGetters(['STATUS'])
  },
  components: {
    OperationTable,
    sanfangData
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
      addModuleData: planModule,
      addPageShow: false,
      tableThead: planSearchThead(this),
      tableTbody: [],
      formItem: [],
      searchVal: {},
      total: 0,
      loading: false,
      postObj: {
        'page': 1,
        'pageSize': 10,
        'searchValue': {}
      },
      spinShow: false,
      tabChange: '1'
    }
  },
  created () {
    this.getPlanList()
  },
  methods: {
    jump (name) {
      if (name === '1') {
        this.tabChange = '1'
      } else {
        this.tabChange = '2'
      }
    },
    getPlanList () {
      this.loading = true
      getdepList(this.postObj).then(res => {
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
    ...mapMutations(['SET_STATUS']),
    search () { },
    pageChange (index) {
      if (this.tabChange === '1') {
        this.postObj.page = index
        this.getPlanList()
      }
    },
    cancel (name) {
      this.addPageShow = false
    },
    details (obj) {
      this.SET_STATUS(true)
      this.addPageShow = true
      this.formItem = obj
    }
  }
}
</script>
<style scoped lang="scss">
  .transfet-statical {
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
