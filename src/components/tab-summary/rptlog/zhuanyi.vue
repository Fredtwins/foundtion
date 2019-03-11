<template>
  <div class="typhoonFlood-statistical-detail nationalFlood-wrapper">
    <div class="nationalFlood-title">佛山市南海区防汛防台风已转移人员统计表</div>

    <div class="typhoonFlood-statistical-table nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="3" style="width:50px">区域</td>
            <td colspan="3" style="width:180px">合计</td>
            <td colspan="15" style="width:900px">在建工地</td>
            <td colspan="3" style="width:180px">铁皮、石棉瓦建筑物</td>
            <td colspan="3" style="width:180px">危房</td>
            <td colspan="3" style="width:180px">削坡建房</td>
            <td colspan="3" style="width:180px">种养业棚舍</td>
            <td colspan="12" style="width:720px">渔船、船舶</td>
            <td colspan="3" style="width:180px">危化品企业</td>
            <td colspan="3" style="width:180px">地质灾害点</td>
            <td colspan="3" style="width:180px">旅游景区</td>
            <td colspan="3" style="width:180px">学校</td>
            <td colspan="3" style="width:180px">低洼易涝点（城镇内涝）</td>
            <td colspan="3" style="width:180px">山洪灾害隐患点</td>
            <td colspan="6" style="width:360px">河道行洪区（江沁洲、外滩地）</td>
            <td colspan="3" style="width:180px">五保户</td>
            <td colspan="6" style="width:360px">孤寡老人、留守儿童</td>
            <!-- <td rowspan="3" style="width:80px;">操作</td> -->
          </tr>
          <tr>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td colspan="3">住建（楼盘、市政、供气）</td>
            <td colspan="3">交通（铁路、地铁、公路）</td>
            <td colspan="3">水务（水利、供水）</td>
            <td colspan="3">其他（）</td>
            <td colspan="3">小计</td>
            <td rowspan="2">栋</td>
            <td rowspan="2">受影响从业人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td rowspan="2">户</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td rowspan="2">户</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响从业人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td colspan="3">农业</td>
            <td colspan="3">海事</td>
            <td colspan="3">交通</td>
            <td colspan="3">小计</td>
            <td rowspan="2">个</td>
            <td rowspan="2">受影响从业人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响从业人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td rowspan="2">所</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td colspan="3">防汛</td>
            <td colspan="3">防台风</td>
            <td rowspan="2">户</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td rowspan="2">户</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
            <td rowspan="2">户</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">已转移人数（人）</td>
          </tr>
          <tr>
            <td>处</td>
            <td>受影响从业人员（人）</td>
            <td>已转移人数（人）</td>
            <td>处</td>
            <td>受影响从业人员（人）</td>
            <td>已转移人数（人）</td>
            <td>处</td>
            <td>受影响从业人员（人）</td>
            <td>已转移人数（人）</td>
            <td>处</td>
            <td>受影响从业人员（人）</td>
            <td>已转移人数（人）</td>
            <td>处</td>
            <td>受影响从业人员（人）</td>
            <td>已转移人数（人）</td>
            <td>需回港避风船只（只）</td>
            <td>受影响从业人员（人）</td>
            <td>已转移人数（人）</td>
            <td>辖区到港船舶（只）</td>
            <td>受影响从业人员（人）</td>
            <td>已转移人数（人）</td>
            <td>需回港避风船只（只）</td>
            <td>受影响从业人员（人）</td>
            <td>已转移人数（人）</td>
            <td>需回港避风船只（只）</td>
            <td>受影响从业人员（人）</td>
            <td>已转移人数（人）</td>
            <td>处</td>
            <td>受影响人员（人）</td>
            <td>已转移人数（人）</td>
            <td>处</td>
            <td>受影响人员（人）</td>
            <td>已转移人数（人）</td>
          </tr>
          <template v-if="dataResult.length">
            <tr v-for="(item, index) in dataResult">
              <td>{{item.town}}</td>
              <td v-for="childIndex in 75">{{item[`col${childIndex}`]}}</td>
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
              <td colspan="77">暂无数据</td>
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
    initData () {
      this.dataResult = []

      this._getDetail()
    },
    _getDetail () {
      this.dataResult = getLocalStorage('searchResultfoold')
    }
  }
}
</script>

<style lang="scss" scoped>
  .typhoonFlood-statistical-detail {
    width: 100%;
    height: calc(100% - 42px);
    overflow: hidden;
    position: relative;
    .typhoonFlood-statistical-table {
      height: calc(100% - 45px);
    }
  }
</style>
