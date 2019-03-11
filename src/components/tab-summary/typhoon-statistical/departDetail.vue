<template>
  <div class="typhoon-statistical-detail nationalFlood-wrapper">
    <div class="nationalFlood-title">佛山市南海区防御当前台风应急措施统计表</div>

    <div class="typhoon-statistical-table nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="2" style="width:80px;">南海区</td>
            <td rowspan="2" style="width:80px;">上报部门</td>
            <td colspan="5" style="width:300px;">危险区域人员转移安置</td>
            <td colspan="3" style="width:180px;">景区关停</td>
            <td colspan="3" style="width:180px;">在建工地关停</td>
            <td colspan="3" style="width:180px;">渡口关停</td>
            <td colspan="3" style="width:180px;">渔船回港</td>
            <td colspan="3" style="width:180px;">渔排人员上岸</td>
            <td colspan="3" style="width:180px;">停课</td>
            <td colspan="2" style="width:120px;">停工</td>
            <td colspan="2" style="width:120px;">停业</td>
            <td colspan="2" style="width:120px;">停运</td>
            <td style="width:60px;">停航</td>
          </tr>
          <tr>
            <td>安全受威胁人数（人）</td>
            <td>人员转移计划完成时间（小时）</td>
            <td>已转移人数（人）</td>
            <td>已安置人数（人）</td>
            <td>避护场所启用数（间）</td>
            <td>应关停景区数（个）</td>
            <td>已关停景区数（个）</td>
            <td>已撤离人数（人）</td>
            <td>应关停工地数（个）</td>
            <td>已关停工地数（个）</td>
            <td>已撤离人数（人）</td>
            <td>应关停渡口数（个）</td>
            <td>已关停渡口数（个）</td>
            <td>未关停渡口数（个）</td>
            <td>渔船应回港数（艘）</td>
            <td>已回港数（艘）</td>
            <td>未回港数（艘）</td>
            <td>渔排作业人数（人）</td>
            <td>已上岸人数（人）</td>
            <td>未上岸人数（人）</td>
            <td>中小学、幼儿园（所）</td>
            <td>中介培训机构（所）</td>
            <td>技工学校（所）</td>
            <td>厂企（间）</td>
            <td>港口码头（个）</td>
            <td>市场（个）</td>
            <td>商场（家）</td>
            <td>客运车站（个）</td>
            <td>道路危运企业（家）</td>
            <td>水运企业（航次）</td>
          </tr>
          <template v-if="dataResult.length">
            <tr v-for="item in dataResult">
              <td>{{item.town}}</td>
              <td>{{item.department_name}}</td>
              <td v-for="childIndex in 30">{{item[`col${childIndex}`]}}</td>
            </tr>
          </template>
          <template v-else-if="dataResult.length === 0">
            <tr>
              <td colspan="32">暂无数据</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="typhoon-statistical-page">
      <Page
        show-total
        show-elevator
        :total="total"
        :current="current"
        @on-change="changePage"></Page>
    </div>

    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import { loadingMixin } from 'common/js/mixins'
import { getDepartDetail } from 'api/typhoon-statistical'

export default {
  mixins: [loadingMixin],
  data () {
    return {
      dataResult: [],
      total: 0,
      current: 1,
      loading: false
    }
  },
  methods: {
    changePage (page) {
      this.current = page
      this._getDetail(page)
    },
    initData (item) {
      this.dataResult = []
      this.currentItem = item

      this._getDetail(1)
    },
    async _getDetail (page) {
      this.loading = true

      const res = await getDepartDetail(page, {
        response_no: this.currentItem.response_no,
        town: this.currentItem.town
        // response_no: '应-2018003-防风',
        // town: '桂城'
      })

      this.loading = false

      if (res.code === ERR_OK) {
        this.dataResult = res.result.result
        this.total = res.result.totalSize
        this.current = res.result.page
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .typhoon-statistical-detail {
    width: 100%;
    height: calc(100% - 42px);
    overflow: hidden;
    position: relative;
    .typhoon-statistical-table {
      height: calc(100% - 85px);
    }
    .typhoon-statistical-page {
      display: flex;
      justify-content: center;
    }
  }
</style>
