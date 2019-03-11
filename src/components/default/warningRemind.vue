<template>
  <div class="warningRemind">
    <h3>系统警告信息</h3>
    <div class="content">
      <div class="loading" v-if="loadingShow">
        <command-loading></command-loading>
      </div>
      <table>
        <tr>
          <td>类型</td>
          <td>描述</td>
          <td>上报时间</td>
        </tr>
        <tr v-for="(item,index) in dataList" :key="index">
          <td>{{item.type_zh}}</td>
          <td>{{item.desc}}</td>
          <td>{{item.reporttime}}</td>
        </tr>
        <tr v-if="dataList.length === 0">
          <td colspan="3">暂无数据</td>
        </tr>
      </table>
      <div class="page pageStyle pull-right">
        <Page :total="total" @on-change="pageChange" :page-size="pageSize"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { warningRemind } from 'api/home'
import CommandLoading from 'base/loading/command-loading'

export default {
  components: {
    CommandLoading
  },
  data () {
    return {
      loadingShow: true,
      dataList: {},
      total: 0,
      pageSize: 5,
      postObj: {
        order: {'reporttime': -1},
        page: 1,
        pageSize: 5,
        searchValue: {
          status: '生效'
        }
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loadingShow = true
      warningRemind(this.postObj).then(res => {
        if (res.code === '0000') {
          this.loadingShow = false
          this.dataList = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
  .warningRemind {
    height: 100%;
    overflow: hidden;
    padding-top: 40px;
    position: relative;
    border: 1px solid #ccc;
    h3 {
      color: #4d4e4f;
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      background: #fff;
      width: 100%;
      top: 0;
      position: absolute;
      text-align: center;
    }
    .content {
      width: 100%;
      height: 100%;
      padding: 10px;
      padding-bottom: 42px;
      overflow: auto;
      position: relative;
      .loading {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      table {
        width: 100%;
        td {
          border: 1px solid #ccc;
          text-align: center;
          height: 38px;
          width: 33.3333%;
        }
      }
      .page {
        position: absolute;
        bottom: 3px;
        right: 10px;
      }
    }
  }
</style>
