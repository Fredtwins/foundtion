<template>
  <div class="disasterRelief-statistical-detail nationalFlood-wrapper">
    <div class="nationalFlood-title">救灾复产情况统计表</div>

    <div class="disasterRelief-statistical-table nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="4" style="width:80px;">南海区</td>
            <td colspan="4" style="width:240px;">民政</td>
            <td colspan="5" style="width:300px;">水利</td>
            <td colspan="3" style="width:180px;">农业</td>
            <td colspan="12" style="width:720px;">交通公路</td>
            <td colspan="4" style="width:240px;">教育</td>
            <td colspan="3" style="width:180px;">公安</td>
            <td colspan="6" style="width:360px;">卫生</td>
            <td colspan="4" style="width:240px;">供电</td>
            <td colspan="3" style="width:180px;">供水</td>
            <td colspan="4" style="width:240px;">通讯</td>
            <td rowspan="4" style="width:80px;">操作</td>
          </tr>
          <tr>
            <td rowspan="2">紧急转移安置人口</td>
            <td rowspan="2">已救助人口</td>
            <td rowspan="2">投入救助款物</td>
            <td rowspan="2">开放避难场所</td>
            <td rowspan="2">修复水库</td>
            <td rowspan="2">修复堤防</td>
            <td rowspan="2">修护护岸</td>
            <td rowspan="2">修复其它设施</td>
            <td rowspan="2">修复完成资金</td>
            <td rowspan="2">抢收蔬菜面积</td>
            <td rowspan="2">改种补种面积</td>
            <td rowspan="2">灾后田间管理面积</td>
            <td colspan="6">国省道公路水毁修复</td>
            <td colspan="6">农村公路水毁修复</td>
            <td rowspan="2" colspan="2">重修倒塌校舍面积</td>
            <td rowspan="2" colspan="2">修复危房面积</td>
            <td rowspan="2">接处警数</td>
            <td rowspan="2">出动警力</td>
            <td rowspan="2">出动车辆</td>
            <td rowspan="2" colspan="2">派出医疗防疫队</td>
            <td colspan="2">发放医疗消杀药械</td>
            <td colspan="2">消毒地域</td>
            <td rowspan="2" colspan="2">出动抢险队</td>
            <td rowspan="2">受灾用户复电</td>
            <td rowspan="2">恢复线路供电</td>
            <td rowspan="2" colspan="2">出动抢险队</td>
            <td rowspan="2">恢复供水</td>
            <td rowspan="2" colspan="2">出动抢险队</td>
            <td rowspan="2">恢复传输</td>
            <td rowspan="2">恢复基站通信</td>
          </tr>
          <tr>
            <td>修复路基</td>
            <td>修复路面</td>
            <td>修复桥梁</td>
            <td>修复坍塌方</td>
            <td>修复公路中断</td>
            <td>修复资金</td>
            <td>修复路基</td>
            <td>修复路面</td>
            <td>修复桥梁</td>
            <td>修复坍塌方</td>
            <td>修复公路中断</td>
            <td>修复资金</td>
            <td>药品</td>
            <td>器械</td>
            <td>乡镇</td>
            <td>面积</td>
          </tr>
          <tr>
            <td>人</td>
            <td>人</td>
            <td>元</td>
            <td>个</td>
            <td>宗</td>
            <td>处</td>
            <td>处</td>
            <td>宗</td>
            <td>元</td>
            <td>亩</td>
            <td>亩</td>
            <td>亩</td>
            <td>公里</td>
            <td>公里</td>
            <td>座</td>
            <td>处</td>
            <td>处</td>
            <td>元</td>
            <td>公里</td>
            <td>公里</td>
            <td>座</td>
            <td>处</td>
            <td>处</td>
            <td>元</td>
            <td>间</td>
            <td>平方米</td>
            <td>间</td>
            <td>平方米</td>
            <td>宗</td>
            <td>人次</td>
            <td>辆</td>
            <td>支</td>
            <td>人次</td>
            <td>元</td>
            <td>元</td>
            <td>个</td>
            <td>平方米</td>
            <td>支</td>
            <td>人数</td>
            <td>户</td>
            <td>处</td>
            <td>支</td>
            <td>人数</td>
            <td>处</td>
            <td>支</td>
            <td>人数</td>
            <td>处</td>
            <td>个</td>
          </tr>
          <template v-if="dataResult.length">
            <tr v-for="(item, index) in dataResult">
              <td>{{item.town}}</td>
              <td v-for="childIndex in 48">{{item[`col${childIndex}`]}}</td>
              <td>
                <Button
                  size="small"
                  type="primary"
                  :disabled="index === 0"
                  @click="detailClick(item)">详情</Button>
              </td>
            </tr>
          </template>
          <template v-else-if="dataResult.length === 0">
            <tr>
              <td colspan="50">暂无数据</td>
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
import { getDetail } from 'api/disasterRelief-statistical'

export default {
  mixins: [loadingMixin],
  data () {
    return {
      dataResult: [],
      loading: false
    }
  },
  methods: {
    detailClick (item) {
      this.$emit('detailClick', item)
    },
    initData (item) {
      this.dataResult = []
      this.currentItem = item

      this._getDetail()
    },
    async _getDetail () {
      this.loading = true

      const res = await getDetail({
        response_no: this.currentItem.response_no
        // response_no: '应-2018003-防风'
        // this.currentItem.response_no
      })

      this.loading = false

      if (res.code === ERR_OK) {
        this.dataResult = res.result
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .disasterRelief-statistical-detail {
    width: 100%;
    height: calc(100% - 42px);
    overflow: hidden;
    position: relative;
    .disasterRelief-statistical-table {
      height: calc(100% - 45px);
    }
  }
</style>
