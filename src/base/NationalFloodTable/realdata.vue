<template>
  <div class="nationalFlood-wrapper">
    <div class="nationalFlood-title">洪涝灾害实时统计表</div>

    <div class="nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="3" style="width:80px;">地区</td>
            <td colspan="2" style="width:180px;">受灾范围</td>
            <td style="width:80px;">农作物受灾面积</td>
            <td style="width:80px;">受灾人口</td>
            <td style="width:80px;">倒塌房屋</td>
            <td style="width:80px;">死亡人口</td>
            <td style="width:80px;">失踪人口</td>
            <td style="width:80px;">转移人口</td>
            <td style="width:80px;">直接经济总损失</td>
            <td style="width:80px;">其中水利设施直接经济损失</td>
          </tr>
          <tr>
            <td>县（市、区）</td>
            <td>乡（镇）</td>
            <td rowspan="2">（千公顷）</td>
            <td rowspan="2">（万人）</td>
            <td rowspan="2">（万间）</td>
            <td rowspan="2">（人）</td>
            <td rowspan="2">（人）</td>
            <td rowspan="2">（万人）</td>
            <td rowspan="2">（亿元）</td>
            <td rowspan="2">（亿元）</td>
          </tr>
          <tr>
            <td>（个）</td>
            <td>（个）</td>
          </tr>
          <tr v-for="(item, index) in towns">
            <td>{{item.title}}</td>
            <td v-for="childIndex in 10" style="padding: 5px;">
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
