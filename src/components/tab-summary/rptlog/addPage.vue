<template>
  <div class="add-page">
    <div class="table">
      <!-- <Table
        id="ta"
        height="650"
        :loading="loading"
        border
        stripe
        size="small"
        heightlight-row
        :columns="tableThead"
        :data="measureModel"
        ref="firsttable"
      ></Table> -->
      <Table
        :loading="loading"
        border
        stripe
        size="small"
        highlight-row
        :columns="tableaddThead"
        :data="measureModel">
      </Table>
    </div>
    <!-- <div class="save pull-left" style="marginBottom:20px">
      <Button type="error" size="large" @click="cancel('first')">关闭</Button>
      <Button type="info" size="large" @click="exportCsv('first')">导出</Button>
      <Button type="info" size="large" @click="method1('ta')">导出</Button>
    </div> -->
    <!-- <div class="details" v-if="showPage">
      <div class="table">
        <Table border :columns="columnsData" :data="tableTbody" ref="secondtable"></Table>
        <Table
          :loading="loading"
          border
          stripe
          size="small"
          highlight-row
          :columns="tableaddThead"
          :data="tableTbody">
        </Table>
      </div>
      <div class="save pull-left" style="marginBottom:20px">
        <Button type="error" size="large" @click="cancel('second')">关闭</Button>
        <Button type="info" size="large" @click="exportCsv('second')">导出</Button>
      </div>
    </div> -->
  </div>
</template>

<script>
import { measureAddThead, measureAddDetailThead, measuraddThead } from 'common/js/table'
import { measureadddetailsApi } from 'api/tab-summary'

export default {
  props: {
    measureModel: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      multiple: '',
      idTmr: 1,
      showPage: false,
      tableThead: measureAddThead(this),
      tableTbody: [],
      measureModelLength: [],
      measureLevelStatistics: { // 三级统计
        accommodate_num: 0,
        ashore_num: 0,
        closed_num: 0,
        createdt: '--',
        department_code: '0101',
        department_level: '2',
        department_name: '总计',
        fishing_row_num: 0,
        hasChildren: false,
        measure: '--',
        need_return_num: 0,
        notAshore_num: 0,
        notReturned_num: 0,
        parent: '01',
        response_no: '应-2018001-防风',
        returned_num: 0,
        scenic_spot_num: 0,
        shelter_num: 0,
        threaten_num: 2410,
        transferred_num: 2385
      },
      measureDifference: { // 与上级差值
        accommodate_num: 0,
        ashore_num: 0,
        closed_num: 0,
        createdt: '--',
        department_code: '0101',
        department_level: '2',
        department_name: '与上级差值',
        fishing_row_num: 0,
        hasChildren: false,
        measure: '--',
        need_return_num: 0,
        notAshore_num: 0,
        notReturned_num: 0,
        parent: '01',
        response_no: '应-2018001-防风',
        returned_num: 0,
        scenic_spot_num: 0,
        shelter_num: 0,
        threaten_num: 2410,
        transferred_num: 2385
      },
      superData: {},
      postobj: {
        'page': 1,
        'pageSize': 10,
        searchValue: {
          department_level: '3',
          response_no: '',
          parent: ''
        }
      },
      columnsData: measureAddDetailThead(this),
      loading: false,
      tableaddThead: measuraddThead(this),
      tableaddTbody: []
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
        // link.download = this.data.response_no;
        link.download = '应急响应措施统计'
        link.href = uri + base64(format(template, ctx))
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // window.location.href = uri + base64(format(template, ctx))
      }
    })()
  },
  methods: {
    levelAdd () { // 三级总计
      var arr2 = this.tableTbody
      var accommodate_max_num = 0
      var ashore_max_num = 0
      var closed_max_num = 0
      var fishing_row_max_num = 0
      var need_return_max_num = 0
      var notAshore_max_num = 0
      var notReturned_max_num = 0
      var returned_max_num = 0
      var scenic_spot_max_num = 0
      var shelter_max_num = 0
      var threaten_max_num = 0
      var transferred_max_num = 0
      for (var i in arr2) {
        accommodate_max_num += arr2[i].accommodate_num
        ashore_max_num += arr2[i].ashore_num
        closed_max_num += arr2[i].closed_num
        fishing_row_max_num += arr2[i].fishing_row_num
        need_return_max_num += arr2[i].need_return_num
        notAshore_max_num += arr2[i].notAshore_num
        notReturned_max_num += arr2[i].notReturned_num
        returned_max_num += arr2[i].returned_num
        scenic_spot_max_num += arr2[i].scenic_spot_num
        shelter_max_num += arr2[i].shelter_num
        threaten_max_num += arr2[i].threaten_num
        transferred_max_num += arr2[i].transferred_num
      }
      this.measureLevelStatistics.accommodate_num = accommodate_max_num
      this.measureLevelStatistics.ashore_num = ashore_max_num
      this.measureLevelStatistics.closed_num = closed_max_num
      this.measureLevelStatistics.fishing_row_num = fishing_row_max_num
      this.measureLevelStatistics.need_return_num = need_return_max_num
      this.measureLevelStatistics.notAshore_num = notAshore_max_num
      this.measureLevelStatistics.notReturned_num = notReturned_max_num
      this.measureLevelStatistics.returned_num = returned_max_num
      this.measureLevelStatistics.scenic_spot_num = scenic_spot_max_num
      this.measureLevelStatistics.shelter_num = shelter_max_num
      this.measureLevelStatistics.threaten_num = threaten_max_num
      this.measureLevelStatistics.transferred_num = transferred_max_num
    },
    differ () {
      var accommodate_diff_num = 0
      var ashore_diff_num = 0
      var closed_diff_num = 0
      var fishing_row_diff_num = 0
      var need_return_diff_num = 0
      var notAshore_diff_num = 0
      var notReturned_diff_num = 0
      var returned_diff_num = 0
      var scenic_spot_diff_num = 0
      var shelter_diff_num = 0
      var threaten_diff_num = 0
      var transferred_diff_num = 0
      accommodate_diff_num = this.measureLevelStatistics.accommodate_num - this.superData.accommodate_num
      ashore_diff_num = this.measureLevelStatistics.ashore_num - this.superData.ashore_num
      closed_diff_num = this.measureLevelStatistics.closed_num - this.superData.closed_num
      fishing_row_diff_num = this.measureLevelStatistics.fishing_row_num - this.superData.fishing_row_num
      need_return_diff_num = this.measureLevelStatistics.need_return_num - this.superData.need_return_num
      notAshore_diff_num = this.measureLevelStatistics.notAshore_num - this.superData.notAshore_num
      notReturned_diff_num = this.measureLevelStatistics.notReturned_num - this.superData.notReturned_num
      returned_diff_num = this.measureLevelStatistics.returned_num - this.superData.returned_num
      scenic_spot_diff_num = this.measureLevelStatistics.scenic_spot_num - this.superData.scenic_spot_num
      shelter_diff_num = this.measureLevelStatistics.shelter_num - this.superData.shelter_num
      threaten_diff_num = this.measureLevelStatistics.threaten_num - this.superData.threaten_num
      transferred_diff_num = this.measureLevelStatistics.transferred_num - this.superData.transferred_num

      this.measureDifference.accommodate_num = accommodate_diff_num
      this.measureDifference.ashore_num = ashore_diff_num
      this.measureDifference.closed_num = closed_diff_num
      this.measureDifference.fishing_row_num = fishing_row_diff_num
      this.measureDifference.need_return_num = need_return_diff_num
      this.measureDifference.notAshore_num = notAshore_diff_num
      this.measureDifference.notReturned_num = notReturned_diff_num
      this.measureDifference.returned_num = returned_diff_num
      this.measureDifference.scenic_spot_num = scenic_spot_diff_num
      this.measureDifference.shelter_num = shelter_diff_num
      this.measureDifference.threaten_num = threaten_diff_num
      this.measureDifference.transferred_num = transferred_diff_num
    },
    details (obj) {
      this.superData = obj // 获取上级数据
      this.showPage = true
      this.postobj.searchValue.response_no = obj.response_no
      this.postobj.searchValue.parent = obj.department_code
      measureadddetailsApi(this.postobj).then(res => {
        if (res.code === '0000') {
          this.tableTbody = res.result.result
          this.levelAdd()
          this.tableTbody.push(this.measureLevelStatistics)
          this.differ()
          this.tableTbody.push(this.measureDifference)
        }
      })
    },
    cancel (value) {
      if (value === 'first') {
        this.$emit('cancel', 'false')
      } else {
        this.showPage = false
      }
    },
    print () {
      return print()
    },
    exportCsv (value) {
      if (value === 'first') {
        this.$refs.firsttable.exportCsv({
          filename: '应急响应措施统计表'
        })
      } else {
        this.$refs.secondtable.exportCsv({
          filename: '应急响应措施统计表'
        })
      }
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
  .add-page {
    padding-top:60px;
    width: 100%;
    height: 100%;
    position: relative;
    h2 {
      text-align: center;
      font-size: 16px;
    }
    .table {
      width: 100%;
      max-height: 90% !important;
      border-bottom: 1px solid #ccc;
      overflow: auto;
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
  }
</style>
