<template>
  <div class="nationalFlood-wrapper">
    <div class="nationalFlood-title">抗洪抢险综合情况统计表一</div>

    <div class="nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="4" style="width:80px;">地区</td>
            <td colspan="11" style="width:880px;">防汛物资消耗</td>
            <td colspan="7" style="width:560px;">出动情况</td>
          </tr>
          <tr>
            <td rowspan="2">编织袋</td>
            <td rowspan="2">编织布</td>
            <td rowspan="2">挡水设施</td>
            <td rowspan="2">砂石料</td>
            <td rowspan="2">木材</td>
            <td rowspan="2">钢材</td>
            <td rowspan="2">救生衣</td>
            <td rowspan="2">抗灾用油</td>
            <td rowspan="2">抗灾用电</td>
            <td rowspan="2">其它物资消耗折算资金</td>
            <td rowspan="2">总物资消耗折算资金</td>
            <td colspan="4">投入抢险人数</td>
            <td colspan="3">抢险设备情况</td>
          </tr>
          <tr>
            <td>合计</td>
            <td>部队官兵</td>
            <td>地方人员</td>
            <td>防汛机动抢险队员</td>
            <td>抢险舟（船）</td>
            <td>运输设备</td>
            <td>机械设备</td>
          </tr>
          <tr>
            <td>（万条）</td>
            <td>（万平方米）</td>
            <td>（米）</td>
            <td>（万立方米）</td>
            <td>（万立方米）</td>
            <td>（吨）</td>
            <td>（件）</td>
            <td>（吨）</td>
            <td>（万度）</td>
            <td>（万元）</td>
            <td>（万元）</td>
            <td>（人次）</td>
            <td>（人次）</td>
            <td>（人次）</td>
            <td>（人次）</td>
            <td>（舟次）</td>
            <td>（班次）</td>
            <td>（台班）</td>
          </tr>
          <tr v-for="(item, index) in towns">
            <td>{{item.title}}</td>
            <td v-for="childIndex in 18" style="padding: 5px;">
              <template v-if="isNeedEdit && cloneData[`r${index + 1}col${childIndex}`] !== undefined">
                <Input v-model="cloneData[`r${index + 1}col${childIndex}`]" />
              </template>
              <template v-else>
                {{cloneData[`r${index + 1}col${childIndex}`]}}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { dataMixin } from './modules'

export default {
  mixins: [dataMixin]
}
</script>

<style lang="scss" scoped>

</style>
