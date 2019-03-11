<template>
  <div class="add-page">
    <div class="table">
      <table id="ta">
        <tr>
          <td colspan="6">应急响应总结统计</td>
        </tr>
        <tr>
          <td>应急响应编号：</td>
          <td>{{data.response_no}}</td>
          <td>启动时间：</td>
          <td>{{data.createdt}}</td>
          <td>结束时间：</td>
          <td>{{data.closedt}}</td>
        </tr>
        <tr>
          <td :rowspan="defenseSize">防御工作情况统计：</td>
          <td>部门</td>
          <td>上报事项</td>
          <td colspan="3">数量</td>
        </tr>
        <tr v-for="item in defenseModel">
          <td>{{item.department_name}}</td>
          <td>{{item.type}}</td>
          <td colspan="3">{{item.count}}</td>
        </tr>
        <tr>
          <td :rowspan="transferdSize">转移人员统计：</td>
          <td>部门</td>
          <td>上报事项</td>
          <td>处</td>
          <td>安全受威胁</td>
          <td>已转移人员（人）</td>
        </tr>
        <tr v-for="item in transferdModel">
          <td>{{item.department_name}}</td>
          <td>{{item.stattype}}</td>
          <td>{{item.count}}</td>
          <td>{{item.threatened}}</td>
          <td>{{item.transfer}}</td>
        </tr>
        <tr>
          <td :rowspan="affectedSize">受灾情况统计：</td>
          <td>部门</td>
          <td>上报损失事项</td>
          <td>死亡人数</td>
          <td>受伤人数</td>
          <td>损失（元）</td>
        </tr>
        <tr v-for="item in affectedModel">
          <td>{{item.department_name}}</td>
          <td>{{item.disaster_type}}</td>
          <td>{{item.death}}</td>
          <td>{{item.injury}}</td>
          <td>{{item.disaster_loss}}</td>
        </tr>
      </table>
      <!-- <Table border :columns="defenseThead" :data="defenseModel" ref="table"></Table>
            <Table border :columns="affectedThead" :data="affectedModel" ref="table"></Table>
      <Table border :columns="transferdThead" :data="transferdModel" ref="table"></Table>-->
    </div>
    <div class="save pull-left" style="marginBottom:20px">
      <Button type="error" size="large" @click="cancel">关闭</Button>
      <!-- <Button type="primary" size="large" @click="print">打印</Button> -->
      <Button type="info" size="large" @click="method1('ta')">导出</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    defenseModel: {
      type: Array,
      default: function () {
        return []
      }
    },
    affectedModel: {
      type: Array,
      default: function () {
        return []
      }
    },
    transferdModel: {
      type: Array,
      default: function () {
        return []
      }
    },
    defenseSize: {
      type: Number,
      default: 1
    },
    affectedSize: {
      type: Number,
      default: 1
    },
    transferdSize: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      idTmr: 1
    }
  },
  /* eslint-disable */
  created () {
    this.tableToExcel = (function () {
      var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
          return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function (s, c) {
          return s.replace(/{(\w+)}/g,
            function (m, p) {
              return c[p]
            })
        }
      return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {
          worksheet: name || 'Worksheet',
          table: table.innerHTML
        }

        const link = document.createElement('a')
        link.download = this.data.response_no
        link.href = uri + base64(format(template, ctx))
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // window.location.href = uri + base64(format(template, ctx))
      }
    })()
  },
  methods: {
    cancel () {
      this.$emit('cancel', 'false')
    },
    print () { },
    exportCsv () {
    },
    getExplorer () {
      var explorer = window.navigator.userAgent
      // ie
      if (explorer.indexOf('MSIE') >= 0) {
        return 'ie'
      }
      // firefox
      else if (explorer.indexOf('Firefox') >= 0) {
        return 'Firefox'
      }
      // Chrome
      else if (explorer.indexOf('Chrome') >= 0) {
        return 'Chrome'
      }
      // Opera
      else if (explorer.indexOf('Opera') >= 0) {
        return 'Opera'
      }
      // Safari
      else if (explorer.indexOf('Safari') >= 0) {
        return 'Safari'
      }
    },
    method1 (tableid) { // 整个表格拷贝到EXCEL中
      if (this.getExplorer() == 'ie') {
        var curTbl = document.getElementById(tableid)
        var oXL = new ActiveXObject('Excel.Application')

        // 创建AX对象excel
        var oWB = oXL.Workbooks.Add()
        // 获取workbook对象
        var xlsheet = oWB.Worksheets(1)
        // 激活当前sheet
        var sel = document.body.createTextRange()
        sel.moveToElementText(curTbl)
        // 把表格中的内容移到TextRange中
        sel.select
        // 全选TextRange中内容
        sel.execCommand('Copy')
        // 复制TextRange中内容
        xlsheet.Paste()
        // 粘贴到活动的EXCEL中
        oXL.Visible = true
        // 设置excel可见属性

        try {
          var fname = oXL.Application.GetSaveAsFilename('Excel.xls', 'Excel Spreadsheets (*.xls), *.xls')
        } catch (e) {
          print('Nested catch caught ' + e)
        } finally {
          oWB.SaveAs(fname)
          oWB.Close(savechanges = false)
          // xls.visible = false;
          oXL.Quit()
          oXL = null
          // 结束excel进程，退出完成
          // window.setInterval("Cleanup();",1);
          idTmr = window.setInterval('Cleanup();', 1)
        }
      } else {
        this.tableToExcel('ta')
      }
    },
    Cleanup () {
      window.clearInterval(this.idTmr)
      CollectGarbage()
    }
  }
  /* eslint-enable */
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
      /* border-bottom: 1px solid #ccc; */
      overflow: auto;
      table {
        width: 100%;
        td {
          border: 1px solid #000;
          text-align: center;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }

  .save {
    margin-top: 10px;
  }
</style>
