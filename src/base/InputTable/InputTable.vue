<template>
  <div class="input-table">
    <div class="input-table-title">佛山市南海区防汛防台风临灾涉险受影响人员台帐统计表</div>

    <div class="input-table-table">
      <table border cellpadding="5">
        <tbody>
          <tr>
            <td rowspan="3" style="width:50px">南海区</td>
            <td rowspan="3" style="width:80px">应急响应级别</td>
            <td colspan="2" style="width:120px">合计</td>
            <td colspan="10" style="width:600px">在建工地</td>
            <td colspan="2" style="width:120px">铁皮、石棉瓦建筑物</td>
            <td colspan="2" style="width:120px">危房</td>
            <td colspan="2" style="width:120px">削坡建房</td>
            <td colspan="2" style="width:120px">种养业棚舍</td>
            <td colspan="8" style="width:480px">渔船、船舶</td>
            <td colspan="2" style="width:120px">危化品企业</td>
            <td colspan="2" style="width:120px">地质灾害点</td>
            <td colspan="2" style="width:120px">旅游景区</td>
            <td colspan="2" style="width:120px">学校</td>
            <td colspan="2" style="width:120px">低洼易涝点（城镇内涝）</td>
            <td colspan="2" style="width:120px">山洪灾害隐患点</td>
            <td colspan="4" style="width:240px">河道行洪区（江沁洲、外滩地）</td>
            <td colspan="2" style="width:120px">五保户</td>
            <td colspan="4" style="width:240px">孤寡老人、留守儿童</td>
          </tr>
          <tr>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响人员（人）</td>
            <td colspan="2">住建（楼盘、市政、供气）</td>
            <td colspan="2">交通（铁路、地铁、公路）</td>
            <td colspan="2">水务（水利、供水）</td>
            <td colspan="2">其他（）</td>
            <td colspan="2">小计</td>
            <td rowspan="2">栋</td>
            <td rowspan="2">受影响从业人员（人）</td>
            <td rowspan="2">户</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">户</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响从业人员（人）</td>
            <td colspan="2">农业</td>
            <td colspan="2">海事</td>
            <td colspan="2">交通</td>
            <td colspan="2">小计</td>
            <td rowspan="2">个</td>
            <td rowspan="2">受影响从业人员（人）</td>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响从业人员（人）</td>
            <td rowspan="2">所</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">处</td>
            <td rowspan="2">受影响人员（人）</td>
            <td colspan="2">防汛</td>
            <td colspan="2">防台风</td>
            <td rowspan="2">户</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">户</td>
            <td rowspan="2">受影响人员（人）</td>
            <td rowspan="2">户</td>
            <td rowspan="2">受影响人员（人）</td>
          </tr>
          <tr>
            <td>处</td>
            <td>受影响从业人员（人）</td>
            <td>处</td>
            <td>受影响从业人员（人）</td>
            <td>处</td>
            <td>受影响从业人员（人）</td>
            <td>处</td>
            <td>受影响从业人员（人）</td>
            <td>处</td>
            <td>受影响从业人员（人）</td>
            <td>需回港避风船只（只）</td>
            <td>受影响从业人员（人）</td>
            <td>辖区到港船舶（只）</td>
            <td>受影响从业人员（人）</td>
            <td>需回港避风船只（只）</td>
            <td>受影响从业人员（人）</td>
            <td>需回港避风船只（只）</td>
            <td>受影响从业人员（人）</td>
            <td>处</td>
            <td>受影响人员（人）</td>
            <td>处</td>
            <td>受影响人员（人）</td>
          </tr>
          <template v-for="(item, index) in tableItem">
            <tr>
              <td rowspan="4">{{item.title}}</td>
              <td style="height: 40px">四级响应</td>
              <td v-for="childIndex in 50" style="height: 40px">
                {{cloneData[`r${item.index + 1}col${childIndex}`]}}
              </td>
            </tr>
            <tr>
              <td style="height: 40px">三级响应</td>
              <td v-for="childIndex in 50" style="height: 40px">
                {{cloneData[`r${item.index + 2}col${childIndex}`]}}
              </td>
            </tr>
            <tr>
              <td style="height: 40px">二级响应</td>
              <td v-for="childIndex in 50" style="height: 40px">
                {{cloneData[`r${item.index + 3}col${childIndex}`]}}
              </td>
            </tr>
            <tr>
              <td style="height: 40px">一级响应</td>
              <td v-for="childIndex in 50" style="height: 40px">
                {{cloneData[`r${item.index + 4}col${childIndex}`]}}
              </td>
            </tr>
          </template>
          <tr>
            <td colspan="2">责任单位</td>
            <td colspan="2"></td>
            <td colspan="2">区住建局</td>
            <td colspan="2">区交通局</td>
            <td colspan="2">区水务局</td>
            <td colspan="2">区级其他部门（其它在建工程需转移人员）</td>
            <td></td>
            <td></td>
            <td colspan="2">镇（街道）三防办</td>
            <td colspan="4">区住建局</td>
            <td colspan="2">区农业局</td>
            <td colspan="2">区农业局</td>
            <td colspan="2">海事处</td>
            <td colspan="2">区交通局</td>
            <td></td>
            <td></td>
            <td colspan="2">区安监局</td>
            <td colspan="2">区国土局</td>
            <td colspan="2">区旅游局</td>
            <td colspan="2">区教育局</td>
            <td colspan="2">镇（街道）三防办</td>
            <td colspan="2">区水务局</td>
            <td colspan="4">镇（街道）三防办</td>
            <td colspan="2">区民政局</td>
            <td colspan="4">镇（街道）三防办</td>
          </tr>
          <tr>
            <td colspan="52" style="height:65px;text-align:left;padding:0 10px;">
              填报说明：1.各填报责任单位负责对表格中对应的对象以镇街为统计单位进行统筹排查汇总填报，即区有关单位填报对应对象（整）列，镇（街道）三防办填报对应对象单元格；按启动应急响应级别分别列出该受影响区域应转移人数；
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              2.各单位须于每年1、3、4、5、6、7、8、9、10、11、12月10日前将截至上月底有关临灾涉险人数更新情况按此表格式报送区三防办。
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import tableItem from './tableItem'

export default {
  props: {
    department: {
      type: String,
      default: 'all'
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    cloneData () {
      const obj = {}

      this.data.map(item => {
        obj[item.cell_id] = item.value
      })

      return obj
    }
  },
  data () {
    return {
      tableItem: tableItem()
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-table {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    > .input-table-title {
      text-align: center;
      line-height: 40px;
      font-size: 16px;
    }
    > .input-table-table {
      width: 100%;
      height: calc(100% - 40px);
      overflow: auto;
      position: relative;
      > table {
        width: 3130px;
        table-layout: fixed;
        td {
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
</style>
