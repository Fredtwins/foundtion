<template>
  <div class="addreessRemind">
    <h3>当前水位</h3>
    <div class="table">
      <!-- <div class="loading" v-if="loadingShow">
                <command-loading></command-loading>
      </div>-->
      <!-- <table stripe>
                <tr class="trtitle">
                    <td>名称</td>
                    <td style="width:40%">时间</td>
                    <td>水位</td>
                    <td>警戒水位</td>
                </tr>
                <tr v-for="(item,index) in dataList" :key="index">
                    <td>
                        {{item.stn_name}}
                    </td>
                    <td>
                        {{item.data_time}}
                    </td>
                    <td>
                        {{item.waterlevel}}
                    </td>
                    <td>
                        {{item.alarm_l3}}
                    </td>
                </tr>
                <tr v-if="dataList.length === 0">
                    <td colspan="3">暂无数据</td>
                </tr>
      </table>-->
      <Table :loading="loading" stripe :data="thearArr" :columns="datathearArr"></Table>
    </div>
  </div>
</template>

<script>
import { getWaterList } from 'api/home'
import CommandLoading from 'base/loading/command-loading'
import { rainthear } from 'common/js/table'

export default {
  components: {
    CommandLoading
  },
  data () {
    return {
      loading: false,
      dataList: {},
      total: 5,
      postObj: {
        order: {_id: -1},
        page: 1,
        pageSize: 5,
        searchValue: {}
      },
      thearArr: [],
      datathearArr: rainthear(this)
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      getWaterList(this.postObj).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.thearArr = res.result
        }
      })
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
    border-bottom: none;
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
        width: 100.0009%;
        height: 99.99999%;
        td {
          border: 1px solid #ccc;
          text-align: center;
          width: 20%;
        }
        td:nth-child(4n+0){
          border-right: none;
        }
      }
    }
  }
</style>
