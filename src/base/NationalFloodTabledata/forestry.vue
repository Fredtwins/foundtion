<template>
  <div class="nationalFlood-wrapper">
    <div class="nationalFlood-title">农林牧渔业洪涝灾害统计表</div>

    <div class="nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="3" style="width:80px;">地区</td>
            <td colspan="2" style="width:180px;">农作物受灾面积</td>
            <td colspan="2" style="width:180px;">农作物成灾面积</td>
            <td colspan="2" style="width:180px;">农作物绝收面积</td>
            <td rowspan="2" style="width:80px;">因灾减产<br />粮食</td>
            <td rowspan="2" style="width:80px;">经济作物<br />损失</td>
            <td rowspan="2" style="width:80px;">死亡大牲畜</td>
            <td colspan="2" style="width:160px;">水产养殖损失</td>
            <td rowspan="2" style="width:80px;">农林牧渔业直接经济损失</td>
          </tr>
          <tr>
            <td>小计</td>
            <td>其中粮食作物</td>
            <td>小计</td>
            <td>其中粮食作物</td>
            <td>小计</td>
            <td>其中粮食作物</td>
            <td>面积</td>
            <td>数量</td>
          </tr>
          <tr>
            <td>（千公顷）</td>
            <td>（千公顷）</td>
            <td>（千公顷）</td>
            <td>（千公顷）</td>
            <td>（千公顷）</td>
            <td>（千公顷）</td>
            <td>（万吨）</td>
            <td>（万元）</td>
            <td>（万头）</td>
            <td>（千公顷）</td>
            <td>（万吨）</td>
            <td>（亿元）</td>
          </tr>
          <tr v-for="(item, index) in towns">
            <td>{{item.title}}</td>
            <td v-for="childIndex in 12" style="padding: 5px;">
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
