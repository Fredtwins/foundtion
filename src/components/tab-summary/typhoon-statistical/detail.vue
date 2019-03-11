<template>
  <div class="typhoon-statistical-detail nationalFlood-wrapper">
    <div class="nationalFlood-title">佛山市南海区防御当前台风应急措施统计表</div>

    <div class="typhoon-statistical-table nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="2" style="width:80px;">南海区</td>
            <td colspan="5" style="width:300px;">危险区域人员转移安置</td>
            <td colspan="3" style="width:180px;">景区关停</td>
            <td colspan="3" style="width:180px;">在建工地关停</td>
            <td colspan="3" style="width:180px;">渡口关停</td>
            <td colspan="3" style="width:180px;">渔船回港</td>
            <td colspan="3" style="width:180px;">渔排人员上岸</td>
            <td colspan="3" style="width:180px;">停课</td>
            <td colspan="2" style="width:120px;">停工</td>
            <td colspan="2" style="width:120px;">停业</td>
            <td colspan="2" style="width:120px;">停运</td>
            <td style="width:60px;">停航</td>
            <td rowspan="2" style="width:80px;">操作</td>
          </tr>
          <tr>
            <td>安全受威胁人数（人）</td>
            <td>人员转移计划完成时间（小时）</td>
            <td>已转移人数（人）</td>
            <td>已安置人数（人）</td>
            <td>避护场所启用数（间）</td>
            <td>应关停景区数（个）</td>
            <td>已关停景区数（个）</td>
            <td>已撤离人数（人）</td>
            <td>应关停工地数（个）</td>
            <td>已关停工地数（个）</td>
            <td>已撤离人数（人）</td>
            <td>应关停渡口数（个）</td>
            <td>已关停渡口数（个）</td>
            <td>未关停渡口数（个）</td>
            <td>渔船应回港数（艘）</td>
            <td>已回港数（艘）</td>
            <td>未回港数（艘）</td>
            <td>渔排作业人数（人）</td>
            <td>已上岸人数（人）</td>
            <td>未上岸人数（人）</td>
            <td>中小学、幼儿园（所）</td>
            <td>中介培训机构（所）</td>
            <td>技工学校（所）</td>
            <td>厂企（间）</td>
            <td>港口码头（个）</td>
            <td>市场（个）</td>
            <td>商场（家）</td>
            <td>客运车站（个）</td>
            <td>道路危运企业（家）</td>
            <td>水运企业（航次）</td>
          </tr>
          <template v-if="dataResult.length">
            <tr v-for="(item, index) in dataResult">
              <td>{{item.town}}</td>
              <td v-for="childIndex in 30">{{item[`col${childIndex}`]}}</td>
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
              <td colspan="32">暂无数据</td>
            </tr>
          </template>
          <!-- <tr>
            <td>责任单位</td>
            <td colspan="2">镇街三防办及区三防成员单位</td>
            <td colspan="3">镇街三防办及区三防成员单位（说明：根据《防汛防台风临灾涉险受影响人员台帐统计表》对应类别统计、填报）</td>
            <td colspan="2">区民政局</td>
            <td colspan="3">区旅游局（即文化）</td>
            <td colspan="3">区住建局、区交通、区水务局及其他部门</td>
            <td colspan="3">区交通局</td>
            <td colspan="3">区农业局</td>
            <td colspan="3">区农业局</td>
            <td>区教育局</td>
            <td>区工商局（即经贸）</td>
            <td>区人社局</td>
            <td>镇（街道）三防办</td>
            <td>区交通局</td>
            <td colspan="2">区交镇（街道）三防办通局</td>
            <td colspan="3">区交通局</td>
          </tr> -->
        </tbody>
      </table>
    </div>

    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import { loadingMixin } from 'common/js/mixins'
import { getDetail } from 'api/typhoon-statistical'

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
  .typhoon-statistical-detail {
    width: 100%;
    height: calc(100% - 42px);
    overflow: hidden;
    position: relative;
    .typhoon-statistical-table {
      height: calc(100% - 45px);
    }
  }
</style>
