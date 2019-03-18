<template>
  <div class="nationalFlood-wrapper">
    <div class="nationalFlood-title">抗洪抢险综合情况统计表二</div>

    <div class="nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="4" style="width:80px;">地区</td>
            <td colspan="5" style="width:400px;">资金投入</td>
            <td colspan="11" style="width:880px;">防洪减灾效益</td>
          </tr>
          <tr>
            <td rowspan="2">小计</td>
            <td rowspan="2">中央</td>
            <td rowspan="2">省级</td>
            <td rowspan="2">省级以下</td>
            <td rowspan="2">群众投劳折算资金</td>
            <td rowspan="2">减淹耕地</td>
            <td>避免</td>
            <td>减少</td>
            <td rowspan="2">解救洪水围困群众</td>
            <td colspan="2">避免人员伤亡</td>
            <td colspan="3">转移人员</td>
            <td rowspan="2">避免县级以上城区受淹</td>
            <td rowspan="2">减灾经济效益</td>
          </tr>
          <tr>
            <td>粮食减收</td>
            <td>受灾人口</td>
            <td>次数</td>
            <td>人数</td>
            <td>山洪灾害</td>
            <td>台风灾害</td>
            <td>粮其他食减收</td>
          </tr>
          <tr>
            <td>（万元）</td>
            <td>（万元）</td>
            <td>（万元）</td>
            <td>（万元）</td>
            <td>（万元）</td>
            <td>（千公顷）</td>
            <td>（万吨）</td>
            <td>（万人）</td>
            <td>（万人）</td>
            <td>（起）</td>
            <td>（人）</td>
            <td>（万人）</td>
            <td>（万人）</td>
            <td>（万人）</td>
            <td>（座）</td>
            <td>（亿元）</td>
          </tr>
          <tr v-for="(item, index) in towns">
            <td>{{item.title}}</td>
            <td v-for="childIndex in 16" style="padding: 5px;">
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
