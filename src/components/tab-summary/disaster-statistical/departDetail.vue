<template>
  <div class="disaster-statistical-detail nationalFlood-wrapper">
    <div class="nationalFlood-title">受灾情况统计表</div>

    <div class="disaster-statistical-table nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="2" style="width:80px;">南海区</td>
            <td rowspan="2" style="width:80px;">上报部门</td>
            <td colspan="2" style="width:120px;">人员伤亡</td>
            <td style="width:60px;">道路水浸</td>
            <td style="width:60px;">农田受浸</td>
            <td style="width:60px;">鱼塘受浸</td>
            <td style="width:60px;">农作物受浸</td>
            <td colspan="2" style="width:120px;">房屋、商铺及厂房</td>
            <td style="width:60px;">房屋倒塌</td>
            <td style="width:60px;">车辆受损</td>
            <td style="width:60px;">树木倒伏或折断</td>
            <td style="width:60px;">广告牌受损</td>
            <td style="width:60px;">发生地质灾害</td>
            <td colspan="2" style="width:120px;">道路中断</td>
            <td colspan="2" style="width:120px;">供电</td>
            <td colspan="3" style="width:180px;">通讯（移动、电信、联通、铁塔）</td>
            <td style="width:60px;">直接经济损失</td>
          </tr>
          <tr>
            <td>死（人）</td>
            <td>伤（人）</td>
            <td>（处）</td>
            <td>（亩）</td>
            <td>（亩）</td>
            <td>（亩）</td>
            <td>受浸（间）</td>
            <td>受浸（间）</td>
            <td>（间）</td>
            <td>（辆）</td>
            <td>（棵）</td>
            <td>（块）</td>
            <td>（处）</td>
            <td>公路（处）</td>
            <td>镇村道路（处）</td>
            <td>受灾停电用户（户）</td>
            <td>供电中断（处）</td>
            <td>传输中断（处）</td>
            <td>基站通信中断（个）</td>
            <td>影响用户数（户）</td>
            <td>元</td>
          </tr>
          <template v-if="dataResult.length">
            <tr v-for="item in dataResult">
              <td>{{item.town}}</td>
              <td v-for="childIndex in 22">{{item[`col${childIndex}`]}}</td>
            </tr>
          </template>
          <template v-else-if="dataResult.length === 0">
            <tr>
              <td colspan="23">暂无数据</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="disaster-statistical-page">
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
import { getDepartDetail } from 'api/disaster-statistical'

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
  .disaster-statistical-detail {
    width: 100%;
    height: calc(100% - 42px);
    overflow: hidden;
    position: relative;
    .disaster-statistical-table {
      height: calc(100% - 85px);
    }
    .disaster-statistical-page {
      display: flex;
      justify-content: center;
    }
  }
</style>
