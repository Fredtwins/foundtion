<template>
  <div v-if="cloneData" class="input-dataTable">
    <div class="input-dataTable-title">
      <div
        v-if="!isEditTitle"
        class="input-dataTable-titleText">
        {{cloneData.YYYYMM}} - {{cloneData.title}}

        <!-- <span
          class="input-dataTable-titleEdit"
          @click="editTitleClick">修改信息</span> -->
      </div>
      <div
        v-if="isEditTitle"
        class="input-dataTable-titleInput">
        <div class="form">
          <Form ref="form" :model="cloneData" :rules="rules">
            <div>
              <FormItem prop="YYYYMM">
                <DatePicker
                  transfer
                  type="month"
                  style="width: 216px"
                  placeholder="上报数据月份"
                  v-model="clonedatayear"
                  :value="cloneData.YYYYMM"
                  @on-change="dateChange"></DatePicker>
              </FormItem>
            </div>
            <!-- <div>
              <FormItem prop="title">
                <Input v-model="cloneData.title" placeholder="上报数据表名"></Input>
              </FormItem>
            </div> -->
          </Form>
        </div>

        <div class="title">
          佛山市南海区防汛防台风临灾涉险受影响人员月度统计表
        </div>
      </div>
    </div>

    <div class="input-dataTable-table" :class="{ isEditTitle }">
      <table
        border
        class="input-dataTable-table-wrapper"
        cellpadding="5">
        <tbody>
          <tr>
            <td rowspan="2" style="width:60px">南海区</td>
            <td rowspan="2" style="width:90px">应急响应级别</td>
            <td
              v-for="item in theadData.level1"
              :colspan="item.data.length"
              :style="{
                width: `${90 * item.data.length}px`
              }">{{item.col_name1}}</td>
          </tr>
          <tr>
            <td v-for="item in theadData.level2">{{item.col_name2}}</td>
          </tr>
          <template v-for="item in tbodyData.level1" v-if="isNeedEdit">
            <tr>
              <td
                :rowspan="item.data.length + 1"
                :style="{
                  height: `${50 * item.data.length}px`
                }">{{item.row_name1}}</td>
            </tr>
            <tr v-for="child in item.data">
              <td>{{child.row_name2}}</td>
              <td
                v-for="child1 in child.data"
                style="padding: 0 5px;">
                <Input v-model="child1.value"></Input>
                <!-- <Input v-model="child1.value" :disabled="isdisabledshow"></Input> -->
              </td>
            </tr>
          </template>
          <template v-for="item in tbodyData.level1" v-else>
            <tr>
              <td
                :rowspan="item.data.length + 1"
                :style="{
                  height: `${50 * item.data.length}px`
                }">{{item.row_name1}}</td>
            </tr>
            <tr v-for="child in item.data">
              <td>{{child.row_name2}}</td>
              <td
                v-for="child1 in child.data"
                style="padding: 0 5px;">
                {{child1.value}}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { dataReportRule } from 'common/js/rules'
import { timeFilter } from 'common/js/util'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    isAdd: {
      type: Boolean,
      default: false
    },
    isdisabled: {
      type: Boolean,
      default: true
    },
    isNeedEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isAdd () {
      this.initTemplate()
    },
    data (newData) {
      this.initData()
    }
  },
  created () {
    this.initTemplate()
    this.initData()
    this._getTimeyear()
  },
  data () {
    return {
      clonedatayear: '',
      theadData: {
        level1: [],
        level2: []
      },
      tbodyData: {
        level1: []
      },
      cloneData: null,
      isEditTitle: false,
      rules: dataReportRule,
      isdisableds: true,
      isdisabledshow: false
    }
  },
  methods: {
    initdisabled () {
      this.isdisabledshow = true
    },
    initdisabledshow () {
      this.isdisabledshow = false
    },
    initTemplate () {
      if (this.isAdd) {
        this.isEditTitle = true
      } else {
        this.isEditTitle = false
      }
    },
    initData () {
      if (!this.data.data) {
        return
      }
      this.cloneData = JSON.parse(JSON.stringify(this.data))

      const theadLevel1 = this.filterData(this.cloneData.data, 'col_name1')
      const theadLevel2 = []

      theadLevel1.map(item => {
        item.data = this.filterData(item.data, 'col_name2')
        item.data.map(child => {
          theadLevel2.push(child)
        })
      })

      this.theadData.level1 = theadLevel1
      this.theadData.level2 = theadLevel2

      const tbodyLevel1 = this.filterData(this.cloneData.data, 'row_name1')

      tbodyLevel1.map(item => {
        item.data = this.filterData(item.data, 'row_name2')
      })

      this.tbodyData.level1 = tbodyLevel1
    },
    filterData (arr, key) {
      const result = arr
      const data = []

      result.map(item => {
        const obj = data.find(child => child[key] === item[key])

        if (obj === undefined) {
          const newObj = {}

          newObj[key] = item[key]
          newObj['data'] = [item]

          data.push(newObj)
        } else {
          obj.data.push(item)
        }
      })

      return data
    },
    // editTitleClick () {
    //   this.isEditTitle = true
    // },
    dateChange (time) {
      this.cloneData.YYYYMM = time
      console.log(this.cloneData)
    },
    clearData () {
      this.cloneData = null
    },
    getData () {
      const data = JSON.parse(JSON.stringify(this.cloneData))

      data.YYYYMM = this.cloneData.YYYYMM.split('-').join('')

      return data
    },
    checkData () {
      return this.$refs['form'].validate((valid) => {
        return valid
      })
    },
    // 获取默认时间
    _getTimeyear () {
      let time = timeFilter(new Date(), 'yyyy-MM')
      console.log(time)
      console.log('--------------')
      this.clonedatayear = time
      // this.cloneData.YYYYMM = time
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-dataTable {
    width: 100%;
    height: 100%;
    > .input-dataTable-title {
      text-align: center;
      line-height: 45px;
      font-size: 16px;
      > .input-dataTable-titleInput {
        width: 100%;
        > .form {
          width: 216px;
          margin: 0 auto;
        }
      }
      > .input-dataTable-titleText {
        > .input-dataTable-titleEdit {
          margin-left: 20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
    > .input-dataTable-table {
      width: 100%;
      height: calc(100% - 45px);
      overflow: auto;
      position: relative;
      &.isEditTitle {
        height: calc(100% - 114px);
      }
      > .input-dataTable-table-wrapper {
        width: 10px;
        table-layout: fixed;
        border-spacing: 0;
        margin: 0 auto;
        td {
          height: 50px;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
</style>
