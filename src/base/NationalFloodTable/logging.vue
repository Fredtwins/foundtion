<template>
  <div class="nationalFlood-wrapper">
    <div class="nationalFlood-title">城市受淹情况统计表</div>

    <div class="nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="3" style="width:80px;">城市名称</td>
            <td colspan="2" style="width:160px;">淹没范围</td>
            <td rowspan="2" style="width:80px;">受灾人口</td>
            <td rowspan="2" style="width:80px;">死亡人口</td>
            <td colspan="5" style="width:400px;">受淹过程</td>
            <td rowspan="2" style="width:80px;">主要街道最大水深</td>
            <td colspan="4" style="width:320px;">生命线工程中断历时</td>
            <td colspan="2" style="width:160px;">建筑物受淹</td>
            <td rowspan="2" style="width:80px;">城区直接经济损失</td>
          </tr>
          <tr>
            <td>面积</td>
            <td>比例</td>
            <td>进水时间</td>
            <td>淹没历时</td>
            <td>累积降雨量</td>
            <td>洪水围困人口</td>
            <td>紧急转移人口</td>
            <td>供水</td>
            <td>供电</td>
            <td>供气</td>
            <td>交通</td>
            <td>房屋</td>
            <td>地下设施</td>
          </tr>
          <tr>
            <td>(平方公里)</td>
            <td>(%)</td>
            <td>(万人)</td>
            <td>(人)</td>
            <td>(月日时)</td>
            <td>(小时)</td>
            <td>(毫米)</td>
            <td>(万人)</td>
            <td>(万人)</td>
            <td>(米)</td>
            <td>(小时)</td>
            <td>(小时)</td>
            <td>(小时)</td>
            <td>(小时)</td>
            <td>(万户)</td>
            <td>(平方米)</td>
            <td>(亿元)</td>
          </tr>
          <tr v-for="(item, index) in towns">
            <td>{{item.title}}</td>
            <td v-for="childIndex in 17" style="padding: 5px;">
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
