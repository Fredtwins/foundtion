<template>
  <div class="nationalFlood-wrapper">
    <div class="nationalFlood-title">死亡人员基本情况统计表</div>

    <div class="nationalFlood-table">
      <table border>
        <tbody>
          <tr>
            <td rowspan="2" style="width:80px;">地区</td>
            <td colspan="6" style="width:480px;">死亡人员基本信息</td>
            <td colspan="9" style="width:720px;">死亡原因</td>
            <td rowspan="2" style="width:80px;">备注</td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>性别</td>
            <td>年龄</td>
            <td>户籍所在地（落实<br />到县）</td>
            <td>死亡时间</td>
            <td>死亡地点</td>
            <td>台风灾害</td>
            <td>江河洪水冲淹</td>
            <td>山洪冲淹</td>
            <td>滑坡</td>
            <td>泥石流</td>
            <td>房屋倒塌</td>
            <td>落水</td>
            <td>高空坠物</td>
            <td>其它</td>
          </tr>
          <!-- <tr v-for="(item, index) in towns">
            <td>{{item.title}}</td>
            <td v-for="childIndex in 16" style="padding: 5px;">
              <template v-if="isNeedEdit && cloneData[`r${index + 1}col${childIndex}`] !== undefined">
                <Input v-model="cloneData[`r${index + 1}col${childIndex}`]" />
              </template>
              <template v-else>
                {{cloneData[`r${index + 1}col${childIndex}`]}}
              </template>
            </td>
          </tr> -->
          <tr v-for="(item, index) in dataArray" :key="item.index" >
            <td>{{dieTitle}}</td>
            <td style="padding:5px;" v-for="(items, i) in temp" :key="i">
              <template>
                <Input
                  v-model="item[items]"
                  @input="logValue">{{items}}</Input>
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
import { getLocalStorage } from 'common/js/dom'

export default {
  mixins: [dataMixin],
  props: ['dataArr'],
  data () {
    return {
      dieTitle: '',
      dataresarr: '',
      dataArray: [{
        name: '',
        sex: '',
        age: '',
        domicile: '',
        death_time: '',
        death_place: '',
        typhoon: '',
        flood: '',
        mount_flood: '',
        landslide: '',
        debris_flow: '',
        house_collapse: '',
        drown: '',
        falling_object: '',
        others: '',
        remark: ''
      }],
      temp: ['name', 'sex', 'age', 'domicile', 'death_time', 'death_place', 'typhoon', 'flood', 'mount_flood', 'landslide', 'debris_flow', 'house_collapse', 'drown', 'falling_object', 'others', 'remark']
    }
  },
  methods: {
    logValue (val) {
      let tempArr = this.dataArray
      getLocalStorage('tempArrres', tempArr)
      // console.log(this.dataArray)
    },
    // 获取列表信息
    GetdieList () {
      this.dataArray = this.dataArr
    },
    // 增加一行行
    adddataArr () {
      this.dataArray.push({
        name: '',
        sex: '',
        age: '',
        domicile: '',
        death_time: '',
        death_place: '',
        typhoon: '',
        flood: '',
        mount_flood: '',
        landslide: '',
        debris_flow: '',
        house_collapse: '',
        drown: '',
        falling_object: '',
        others: '',
        remark: ''
      })
    }
  },
  created () {
    this.dieTitle = getLocalStorage('info').department_name
    this.GetdieList()
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>

</style>
