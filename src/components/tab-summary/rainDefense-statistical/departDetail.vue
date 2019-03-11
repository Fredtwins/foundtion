<template>
  <div class="rainDefense-statistical-detail nationalFlood-wrapper">
    <div class="nationalFlood-title">暴雨台风防御工作开展情况统计表</div>

    <div class="rainDefense-statistical-table nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="3" style="width:80px;">南海区</td>
            <td rowspan="3" style="width:80px;">上报部门</td>
            <td rowspan="3" style="width:60px;">出动检查工作组（个）</td>
            <td rowspan="3" style="width:60px;">出动检查工作组人数（人）</td>
            <td colspan="11" style="width:660px;">重点检查对象</td>
            <td rowspan="3" style="width:60px;">开启排涝泵站（座/台）</td>
            <td rowspan="3" style="width:60px;">开启排涝泵站台时（小时）</td>
            <td rowspan="3" style="width:60px;">排水量（立方米）</td>
            <td rowspan="3" style="width:60px;">接到及处理投诉（宗）</td>
            <td colspan="8" style="width:480px;">出动抢险力量</td>
            <td colspan="14" style="width:840px;">向公众和企事业单位发布预警或防御信息</td>
          </tr>
          <tr>
            <td rowspan="2">易涝点（处）</td>
            <td rowspan="2">简易厂房（栋）</td>
            <td rowspan="2">山塘水库（宗）</td>
            <td colspan="3">在建工地（宗）</td>
            <td rowspan="2">地质灾害点（处）</td>
            <td rowspan="2">危化品企业（间）</td>
            <td rowspan="2">关停旅游景区（处）</td>
            <td colspan="2">广告牌</td>
            <td rowspan="2">市政（人）</td>
            <td rowspan="2">供电（人）</td>
            <td rowspan="2">通讯（人）</td>
            <td rowspan="2">公安干警（人）</td>
            <td rowspan="2">消防（人）</td>
            <td rowspan="2">预备役（人）</td>
            <td rowspan="2">抢险设备（台）</td>
            <td rowspan="2">值班人数（人）</td>
            <td colspan="2">气象部门</td>
            <td colspan="2">海事部门</td>
            <td colspan="2">三防部门</td>
            <td colspan="2">安监部门</td>
            <td colspan="2">住建部门</td>
            <td colspan="2">交通部门</td>
            <td colspan="2">农业部门</td>
          </tr>
          <tr>
            <td>水务</td>
            <td>住建</td>
            <td>交通</td>
            <td>加固（个）</td>
            <td>拆除（个）</td>
            <td>发布预警或信息（条）</td>
            <td>接收信息（人）</td>
            <td>发布预警或信息（条）</td>
            <td>接收信息（人）</td>
            <td>发布预警或信息（条）</td>
            <td>接收信息（人）</td>
            <td>发布预警或信息（条）</td>
            <td>接收信息（人）</td>
            <td>发布预警或信息（条）</td>
            <td>接收信息（人）</td>
            <td>发布预警或信息（条）</td>
            <td>接收信息（人）</td>
            <td>发布预警或信息（条）</td>
            <td>接收信息（人）</td>
          </tr>
          <template v-if="dataResult.length">
            <tr v-for="item in dataResult">
              <td>{{item.town}}</td>
              <td>{{item.department_name}}</td>
              <td v-for="childIndex in 39">{{item[`col${childIndex}`]}}</td>
            </tr>
          </template>
          <template v-else-if="dataResult.length === 0">
            <tr>
              <td colspan="41">暂无数据</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="rainDefense-statistical-page">
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
import { getDepartDetail } from 'api/rainDefense-statistical'

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
  .rainDefense-statistical-detail {
    width: 100%;
    height: calc(100% - 42px);
    overflow: hidden;
    position: relative;
    .rainDefense-statistical-table {
      height: calc(100% - 85px);
    }
    .rainDefense-statistical-page {
      display: flex;
      justify-content: center;
    }
  }
</style>
