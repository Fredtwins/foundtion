<template>
  <div class="add-page">
    <div class="table">
      <Table border :columns="tableThead" :data="model" ref="firsttable"></Table>
    </div>
    <div class="save pull-left" style="marginBottom:20px">
      <Button type="error" size="large" @click="cancel('first')">关闭</Button>
      <Button type="info" size="large" @click="exportCsv('first')">导出</Button>
    </div>
    <!-- <div class="details" v-if="showPage">
            <div class="table">
                <Table border :columns="columnsData" :data="tableTbody" ref="secondtable"></Table>
            </div>
            <div class="save pull-left" style="marginBottom:20px">
                <Button type="error" size="large" @click="cancel('second')">关闭</Button>
                <Button type="info" size="large" @click="exportCsv('second')">导出</Button>
            </div>
    </div>-->
  </div>
</template>

<script>
import { unique, truncate, isChinese } from 'common/js/util'

export default {
  props: {
    model: Array,
    default: function () {
      return []
    }
  },
  data () {
    return {
      showPage: false,
      tableTbody: [],
      tableThead: [
        {
          title: '应急响应编号',
          key: 'response_no'
        },
        {
          title: '部门',
          key: 'department_name',
          sortable: true
        },
        {
          title: '开始时间',
          key: 'createdt'
        },
        // {
        //     title:'上报时间',
        //     key:'input_time'
        // },
        {
          title: '日志时间',
          key: 'logtime'
        },
        {
          title: '安全受威胁人数',
          key: '安全受威胁人数'
        },
        {
          title: '已转移人数',
          key: '已转移人数'
        }
      ]
    }
  },
  methods: {
    cancel (value) {
      if (value === 'first') {
        this.$emit('cancel', 'false')
      } else {
        this.showPage = false
      }
    },
    exportCsv (value) {
      if (value === 'first') {
        this.$refs.firsttable.exportCsv({
          filename: '数据上报日志'
        })
      } else {
        this.$refs.secondtable.exportCsv({
          filename: '数据上报日志'
        })
      }
    },
    gethead (model) {
      let dynamicArry = []
      for (let x in model) {
        for (let j in model[x]) {
          dynamicArry.push(j)
        }
      }
      dynamicArry = unique(dynamicArry)

      Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i
        }
        return -1
      }

      Array.prototype.remove = function (val) {
        var index = this.indexOf(val)
        if (index > -1) {
          this.splice(index, 1)
        }
      }
      dynamicArry.remove('department_code')
      dynamicArry.remove('task_no')
      dynamicArry.remove('task_id')
      dynamicArry.remove('_id')
      dynamicArry.remove('department_level')
      dynamicArry.remove('input_time')
      var tableH = []

      for (let i in dynamicArry) {
        let table = { key: dynamicArry[i], title: '', sortable: '' }
        if (isChinese(dynamicArry[i]) == true) {
          table.title = dynamicArry[i]
        } else {
          if (dynamicArry[i] == 'response_no') {
            table.title = '应急响应编号'
          } else if (dynamicArry[i] == 'formname') {
            table.title = '表单名称'
            table.sortable = true
          } else if (dynamicArry[i] == 'createdt') {
            table.title = '开始时间'
          } else if (dynamicArry[i] == 'logtime') {
            table.title = '统计时间'
            table.sortable = true
          } else if (dynamicArry[i] == 'updatedt') {
            table.title = '更新时间'
          } else if (dynamicArry[i] == 'department_name') {
            table.title = '部门'
            table.sortable = true
          }
        }
        tableH.push(table)
      }
      tableH = truncate(tableH)
      this.tableThead = tableH
    }
  },
  created () {
    this.gethead(this.model)
  }
}
</script>

<style scoped lang="scss">
  .changeColor {
    color: #ff7013;
  }

  .add-page {
    padding-top: 60px;
    width: 100%;
    height: 100%;
    position: relative;
    .table {
      width: 100%;
      max-height: 80% !important;
      border-bottom: 1px solid #ccc;
      overflow: auto;
    }
  }

  .save {
    margin-top: 10px;
  }

  .details {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: absolute;
    top: 0;
    z-index: 9;
    padding-top: 60px;
  }
</style>
