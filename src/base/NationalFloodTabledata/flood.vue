<template>
  <div class="nationalFlood-wrapper">
    <div class="nationalFlood-title">洪涝灾害基本情况统计表</div>
    <!-- <div class="nationalFlood-remake clear">
      <div class="pull-left">
        <div>
          <span>填报单位：</span>
          <span>填报单位：</span>
        </div>
        <div>
          <span>起止日期：</span>
          <span>起止日期：</span>
        </div>
      </div>
      <div class="pull-right">
        <div>表号：国汛统1表</div>
        <div>制表机关：国家防汛抗旱总指挥部</div>
        <div>批准机关：国家统计局</div>
        <div>批准文号：国统制[2009]6号</div>
      </div>
    </div> -->
    <div class="nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="3" style="width:80px;">地区s</td>
            <td colspan="2" style="width:160px;">受灾范围</td>
            <td rowspan="2" style="width:80px;">受灾人口</td>
            <td rowspan="2" style="width:80px;">受淹城市</td>
            <td rowspan="2" style="width:80px;">倒塌房屋</td>
            <td rowspan="2" style="width:80px;">死亡人口</td>
            <td rowspan="2" style="width:80px;">失踪人口</td>
            <td rowspan="2" style="width:80px;">转移人口</td>
            <td rowspan="2" style="width:80px;">直接经济<br />总损失</td>
          </tr>
          <tr>
            <td>县（市、区）</td>
            <td>乡（镇）</td>
          </tr>
          <tr>
            <td>（个）</td>
            <td>（个）</td><td>（万人）</td>
            <td>（个）</td>
            <td>（万间）</td>
            <td>（人）</td>
            <td>（人）</td>
            <td>（万人）</td>
            <td>（亿元）</td>
          </tr>
          <tr v-for="(item, index) in towns">
            <td>{{item.title}}</td>
            <td v-for="childIndex in 9" style="padding: 5px;">
              <!-- <template v-if="isNeedEdit"> -->
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
