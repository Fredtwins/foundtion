<template>
  <div class="disaster-statistical-detail nationalFlood-wrapper">
    <div class="nationalFlood-title">受灾情况统计表</div>

    <div class="disaster-statistical-table nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="2" style="width:80px;">南海区</td>
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
            <!-- <td rowspan="2" style="width:80px;">操作</td> -->
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
            <tr v-for="(item, index) in dataResult">
              <td>{{item.town}}</td>
              <td v-for="childIndex in 21">{{item[`col${childIndex}`]}}</td>
              <!-- <td>
                <Button
                  size="small"
                  type="primary"
                  :disabled="index === 0"
                  @click="detailClick(item)">详情</Button>
              </td> -->
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

    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import { loadingMixin } from 'common/js/mixins'
import { getLocalStorage } from 'common/js/dom'

export default {
  mixins: [loadingMixin],
  data () {
    return {
      dataResult: [],
      loading: false
    }
  },
  methods: {
    // detailClick (item) {
    //   this.$emit('detailClick', item)
    // },
    initData () {
      this.dataResult = []

      this._getDetail()
    },
    _getDetail () {
      this.dataResult = getLocalStorage('searchResult')
      console.log(this.dataResult)
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
      height: calc(100% - 45px);
    }
  }
</style>
