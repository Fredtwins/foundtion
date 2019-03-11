<template>
  <div class="addreessRemind">
    <h3>收文提醒</h3>
    <div class="content">
      <div class="loading" v-if="loadingShow">
        <command-loading></command-loading>
      </div>
      <table>
        <tr>
          <td>发布者</td>
          <td>标题</td>
          <td>时间</td>
        </tr>
        <tr v-for="(item,index) in dataList" :key="index">
          <td>
            <a href="javascript:;" @click="jump(item)">{{item.releaseby}}</a>
          </td>
          <td>
            <a href="javascript:;" @click="jump(item)">{{item.title}}</a>
          </td>
          <td>
            <a href="javascript:;" @click="jump(item)">{{item.releasedt}}</a>
          </td>
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
import { getLocalStorage } from 'common/js/dom'
import { initTime } from 'common/js/util'
import { mapMutations } from 'vuex'
import { addresseeApi, addresseeGetApi } from 'api/daily-office'
import CommandLoading from 'base/loading/command-loading'

export default {
  components: {
    CommandLoading
  },
  data () {
    return {
      pageSize: 5,
      loadingShow: true,
      dataList: {},
      total: 0,
      postObj: {
        order: { _id: -1 },
        page: 1,
        pageSize: 5,
        searchValue: {
          status: '发布',
          department_code: getLocalStorage('info').department_code,
          releasedt: initTime('ymr') + ' 00:00:00|#|gte'
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
      addresseeGetApi(this.postObj).then(res => {
        if (res.code === '0000') {
          this.loadingShow = false
          this.dataList = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    jump (obj) {
      /* eslint-disable */
      let index = obj.receiveby.findIndex(items => items === name)
      if (index === -1) {
        obj.receiveby.push(name)
        addresseeApi('edit', obj).then(res => {
          if (res.code === '0000') {
          }
        })
      }
      this.SET_ID(obj)
      this.$router.push('/home/dailyOffice/addressee')
      /* eslint-enable */
    },
    ...mapMutations(['SET_ID', 'SET_STATUS']),

    pageChange (index) {
      this.postObj.page = index
      this.getList()
    }
  }
}
</script>
<style scoped lang="scss">
  .addreessRemind {
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
