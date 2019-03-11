<template>
  <div class="add-page">
    <div class="table">
      <Table id="firsttable" border :columns="tableThead" :data="tableTbody" ref="firsttable"></Table>
    </div>
    <div class="save pull-left" style="marginBottom:20px">
      <Button type="error" size="large" @click="cancel()">关闭</Button>
      <Button type="info" size="large" @click="exportCsv()">导出</Button>
    </div>
  </div>
</template>

<script>
import { cloneObj } from 'common/js/util'

export default {
  props: {
    model: Object,
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
          key: 'response_no',
          align: 'center'
        },
        {
          title: '上报时间',
          key: 'input_time',
          align: 'center'
        },
        {
          title: '部门',
          key: 'department_name',
          align: 'center',
          render: (h, params) => {
            if (params.row.hasOwnProperty('department_name') === false) {
              return h('div', {}, '--')
            } else if (params.row.department_name === '总计') {
              return h('div', {
                style: {
                  color: 'red'
                }
              }, '总计')
            } else {
              return h('div', {}, params.row.department_name)
            }
          }
        }
      ],
      statistics: {}, // 总计
      theadCol: []
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel', 'false')
    },
    exportCsv () {
      this.$refs.firsttable.exportCsv({
        filename: '临时报表统计'
      })
    },
    gethead () {
      var col = this.model.col_info
      for (let i = 0; i < col.length; i++) {
        let json = { title: col[i], key: col[i], align: 'center' }
        this.tableThead.push(json)
      }

      var data = this.model.data
      var tableDep = []
      for (let index in data) {
        // if(data[index].hasOwnProperty('_id') === false){
        //   data[index].department_name = index
        // }
        data[index].department_name = index
        tableDep.push(data[index])
      }
      if (tableDep.length !== 0) {
        this.statistics = cloneObj(tableDep[0])
      }
      var o = this.statistics

      for (let i = 0; i < col.length; i++) {
        if (isNaN(o[col[i]]) === false) {
          o[col[i]] = 0
        } else if (o[col[i]] === null || o[col[i]] === undefined || o[col[i]] === '') {
          o[col[i]] = 0
        } else {
          o[col[i]] = '--'
        }
      }

      for (let j = 0; j < tableDep.length; j++) {
        for (let i = 0; i < col.length; i++) {
          if (isNaN(tableDep[j][col[i]]) === false) {
            o[col[i]] += parseInt(tableDep[j][col[i]])
          } else {

          }
        }
      }
      o.department_name = '总计'
      o.input_time = '--'
      this.tableTbody = tableDep
      this.tableTbody.push(o)
    }
  },
  created () {
    this.gethead()
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
