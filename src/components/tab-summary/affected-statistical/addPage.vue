<template>
  <div class="add-page">
    <div class="table">
      <Table border :columns="tableThead" :data="model" ref="firsttable"></Table>
    </div>
    <div class="save pull-left" style="marginBottom:20px">
      <Button type="error" size="large" @click="cancel('first')">关闭</Button>
      <!-- <Button type="primary" size="large" @click="print">打印</Button> -->
      <Button type="info" size="large" @click="exportCsv('first')">导出</Button>
    </div>
    <div class="details" v-if="showPage">
      <div class="table">
        <Table border :columns="columnsData" :data="tableTbody" ref="secondtable"></Table>
      </div>
      <div class="save pull-left" style="marginBottom:20px">
        <Button type="error" size="large" @click="cancel('second')">关闭</Button>
        <Button type="info" size="large" @click="exportCsv('second')">导出</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneObj } from 'common/js/util'
import { affecteddetailsApi } from 'api/tab-summary'

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
      columnsData: [
        {
          title: '部门',
          key: 'department_name'
        },
        {
          title: '上报损失事项',
          key: 'disaster_type'
        },
        {
          title: '死亡人数',
          key: 'death'
        },
        {
          title: '受伤人数',
          key: 'injury'
        },
        {
          title: '损失（元）',
          key: 'disaster_loss'
        }
      ],
      tableThead: [
        {
          title: '部门',
          key: 'department_name'
        },
        {
          title: '上报损失事项',
          key: 'disaster_type'
        },
        {
          title: '死亡人数',
          key: 'death'
        },
        {
          title: '受伤人数',
          key: 'injury'
        },
        {
          title: '损失（元）',
          key: 'disaster_loss'
        },
        {
          title: '操作',
          key: 'edit',
          align: 'center',
          width: 130,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: !params.row.hasChildren
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    let data = cloneObj(params.row)
                    delete data._index
                    delete data._rowKey
                    this.details(data)
                  }
                }
              }, '详情')
            ])
          }
        }
      ]
    }
  },
  methods: {
    details (obj) {
      this.showPage = true
      affecteddetailsApi({
        department_level: '3',
        response_no: obj.response_no,
        parent: obj.department_code
      }).then(res => {
        this.tableTbody = res.result.result
      })
    },
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
          filename: '受灾情况统计'
        })
      } else {
        this.$refs.secondtable.exportCsv({
          filename: '受灾情况统计'
        })
      }
    }
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
