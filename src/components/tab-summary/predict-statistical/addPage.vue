<template>
  <div class="add-page">
    <div class="table">
      <Table border :columns="tableThead" :data="model" ref="table"></Table>
    </div>
    <div class="save pull-left" style="marginBottom:20px">
      <Button type="error" size="large" @click="cancel">关闭</Button>
      <!-- <Button type="primary" size="large" @click="print">打印</Button> -->
      <Button type="info" size="large" @click="exportCsv">导出</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: Array,
    default: function () {
      return []
    }
  },
  data () {
    return {
      tableThead: [
        {
          title: '部门',
          key: 'department_name'
        },
        {
          title: '上报事项',
          key: 'type'
        },
        {
          title: '数量',
          key: 'count'
        }
      ]
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel', 'false')
    },
    print () {},
    exportCsv () {
      this.$refs.table.exportCsv({
        filename: '防御工作情况统计表'
      })
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
</style>
