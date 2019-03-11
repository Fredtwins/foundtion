<template>
  <div class="defense-statical">
    <Spin fix v-if="spinShow">
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>预测数据查询</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!-- <div class="search">
            <span class="search_title">站点名称</span>
            <Input placeholder="请输入" v-model="searchVal.stn_name" style="width:200px;padding-left: 10px;padding-right: 20px"></Input>
            <div class="searchBtn" @click="search">
                <Button type="ghost" shape="circle" icon="ios-search"></Button>
            </div>
    </div>-->
    <div class="table">
      <!-- <Table :loading="loading" border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody">
      </Table>-->
      <table>
        <thead>
          <th></th>
          <th>最高温度/℃</th>
          <th>最底温度/℃</th>
          <th>天气情况</th>
        </thead>
        <tr>
          <td>第一天</td>
          <td>{{ tableTbody.tmax1 }}</td>
          <td>{{ tableTbody.tmin1 }}</td>
          <td>{{ tableTbody.wa1 }}</td>
        </tr>
        <tr>
          <td>第二天</td>
          <td>{{ tableTbody.tmax2 }}</td>
          <td>{{ tableTbody.tmin2 }}</td>
          <td>{{ tableTbody.wa2 }}</td>
        </tr>
        <tr>
          <td>第三天</td>
          <td>{{ tableTbody.tmax3 }}</td>
          <td>{{ tableTbody.tmin3 }}</td>
          <td>{{ tableTbody.wa3 }}</td>
        </tr>
        <tr>
          <td>第四天</td>
          <td>{{ tableTbody.tmax4 }}</td>
          <td>{{ tableTbody.tmin4 }}</td>
          <td>{{ tableTbody.wa4 }}</td>
        </tr>
        <tr>
          <td>第五天</td>
          <td>{{ tableTbody.tmax5 }}</td>
          <td>{{ tableTbody.tmin5 }}</td>
          <td>{{ tableTbody.wa5 }}</td>
        </tr>
        <tr>
          <td>第六天</td>
          <td>{{ tableTbody.tmax6 }}</td>
          <td>{{ tableTbody.tmin6 }}</td>
          <td>{{ tableTbody.wa6 }}</td>
        </tr>
        <tr>
          <td>第七天</td>
          <td>{{ tableTbody.tmax7 }}</td>
          <td>{{ tableTbody.tmin7 }}</td>
          <td>{{ tableTbody.wa7 }}</td>
        </tr>
        <tr>
          <td>第八天</td>
          <td>{{ tableTbody.tmax8 }}</td>
          <td>{{ tableTbody.tmin8 }}</td>
          <td>{{ tableTbody.wa8 }}</td>
        </tr>
        <tr>
          <td>第九天</td>
          <td>{{ tableTbody.tmax9 }}</td>
          <td>{{ tableTbody.tmin9 }}</td>
          <td>{{ tableTbody.wa9 }}</td>
        </tr>
        <tr>
          <td>第十天</td>
          <td>{{ tableTbody.tmax10 }}</td>
          <td>{{ tableTbody.tmin10 }}</td>
          <td>{{ tableTbody.wa10 }}</td>
        </tr>
      </table>
    </div>
    <!-- <div class="page pageStyle pull-right">
            <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>-->
    <div v-if="addPageShow" class="addPage">
      <div class="title">
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>报表汇总</BreadcrumbItem>
          <BreadcrumbItem>预测数据查询</BreadcrumbItem>
          <BreadcrumbItem>详细信息</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <operation-table
        :data="addModuleData"
        :model="formItem"
        labelWidth="150px"
        labelBackgroundColor="#f6f6f6"
        bordercolor="#999999"
      ></operation-table>
      <Button @click="cancel">取消</Button>
    </div>
  </div>
</template>

<script>
import { defenseThead } from 'common/js/table'
import { predict } from 'api/tab-summary'
import { mapGetters, mapMutations } from 'vuex'
import { errorNotice } from 'common/js/dom'
import { predictModule } from 'common/js/module'
import OperationTable from 'base/operation-table/operation-table'
import { likeStrSearch, cloneObj } from 'common/js/util'

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
    OperationTable
  },
  data () {
    return {
      addModuleData: predictModule,
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
      predict(this.postObj).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result[0]
            this.total = res.result.totalSize
          }
        } else {
          errorNotice('服务器未连接，')
        }
      })
    },
    ...mapMutations(['SET_STATUS']),
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.postObj.searchValue = cloneObj(this.searchVal)
      if (this.searchVal.stn_name) {
        this.postObj.searchValue.stn_name = likeStrSearch(this.searchVal.stn_name)
      }
      this.getList()
    },
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    cancel () {
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
    .table{
      table{
        width: 100%;
        text-align: center;
        td, th{
          border: 1px solid #e9eaec;
          height: 50px;
          line-height: 5px;
        }
        th{
          background: #19bcff;
        }
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
