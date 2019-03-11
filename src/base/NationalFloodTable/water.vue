<template>
  <div class="nationalFlood-wrapper">
    <div class="nationalFlood-title">水利设施洪涝灾害统计表</div>

    <div class="nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="3" style="width:80px;">地区</td>
            <td colspan="2" style="width:180px;">损坏水库</td>
            <td colspan="3" style="width:270px;">水库垮坝</td>
            <td colspan="2" style="width:180px;">损坏堤防</td>
            <td colspan="2" style="width:180px;">堤防决口</td>
            <td rowspan="2" style="width:90px;">损坏护岸</td>
            <td rowspan="2" style="width:90px;">损坏水闸</td>
            <td rowspan="2" style="width:120px;">冲毁塘坝</td>
            <td rowspan="2" style="width:120px;">损坏灌溉设施</td>
            <td rowspan="2" style="width:120px;">损坏水文测站</td>
            <td rowspan="2" style="width:120px;">损坏机电井</td>
            <td rowspan="2" style="width:120px;">损坏机电泵站</td>
            <td rowspan="2" style="width:120px;">损坏水电站</td>
            <td rowspan="2" style="width:120px;">水利设施直接经济损失</td>
          </tr>
          <tr>
            <td>大中型</td>
            <td>小型</td>
            <td>大中型</td>
            <td>小一</td>
            <td>小二</td>
            <td>处数</td>
            <td>长度</td>
            <td>处数</td>
            <td>长度</td>
          </tr>
          <tr>
            <td>（座）</td>
            <td>（座）</td>
            <td>（座）</td>
            <td>（座）</td>
            <td>（座）</td>
            <td>（处）</td>
            <td>（千米）</td>
            <td>（处）</td>
            <td>（千米）</td>
            <td>（处）</td>
            <td>（座）</td>
            <td>（座）</td>
            <td>（处）</td>
            <td>（个）</td>
            <td>（眼）</td>
            <td>（座）</td>
            <td>（座）</td>
            <td>（亿元）</td>
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
