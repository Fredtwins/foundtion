<template>
  <div class="nationalFlood-wrapper">
    <div class="nationalFlood-title">工业交通运输业洪涝灾害统计表</div>

    <div class="nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="2" style="width:80px;">地区</td>
            <td style="width:90px;">停产工矿企业</td>
            <td style="width:90px;">铁路中断</td>
            <td style="width:90px;">公路中断</td>
            <td style="width:100px;">机场、港口关停</td>
            <td style="width:90px;">供电中断</td>
            <td style="width:90px;">通讯中断</td>
            <td style="width:120px;">工业交通运输业直接经济损失</td>
          </tr>
          <tr>
            <td>（个）</td>
            <td>（条次）</td>
            <td>（条次）</td>
            <td>（个次）</td>
            <td>（条次）</td>
            <td>（条次）</td>
            <td>（亿元）</td>
          </tr>
          <tr v-for="(item, index) in towns">
            <td>{{item.title}}</td>
            <td v-for="childIndex in 7" style="padding: 5px;">
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
