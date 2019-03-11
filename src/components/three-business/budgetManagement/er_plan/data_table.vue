<template>
  <div class="data_table">
    <div class="erp_title">数据表格</div>
    <div class="general_content table">
      <Table
        border
        :loading="loading"
        stripe
        size="small"
        highlight-row
        :columns="tableThead"
        :data="tableTbody"
      ></Table>
    </div>
    <div class="page pageStyle pull-right">
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <template slot="content">
      <Modal
        v-model="modalshow"
        class="modalv"
        title="详情">
        <!-- 下拉框 -->
        <Form :model="formItem" ref="formItem" :label-width="80" class="forms">
          <Form-item label="对应预案" prop="plan_type" style="width:350px">
            <Input
              v-model="formItem.plan_type"
              :disabled="formDisabled"
              placeholder="请输入表单名称"
              style="width:350px"
            ></Input>
          </Form-item>
          <Form-item label="任务类型" style="width:350px">
            <Input
              v-model="formItem.task_type"
              :disabled="formDisabled"
              placeholder="请输入表单名称"
              style="width:350px"
            ></Input>
          </Form-item>

          <FormItem label="表单名称" style="width:350px">
            <Input
              v-model="formItem.form_name"
              :disabled="formDisabled"
              placeholder="请输入表单名称"
              style="width:350px"
            ></Input>
          </FormItem>

          <Form-item label="部门" style="width:350px">
            <Select
              v-model="department_names"
              filterable
              multiple
              style="width:350px">
                <Option
                  v-for="(item, index) in departmentLists"
                  :value="item.department_name"
                  :key="item.index">
                  {{ item.department_name }}
                </Option>
            </Select>
          </Form-item>
        </Form>
        <!--表格  -->
        <div class="center">
          <!--<Table @on-select='selected' ref="selection" border highlight-row :data="UserData" :columns="theadArr" stripe></Table>-->
          <Table border highlight-row :data="DataTable" :columns="tableArr" stripe></Table>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import { getLocalStorage, errorNotice } from 'common/js/dom'
import { dataThead, dataTableThead } from 'common/js/table'
import { getdepList } from 'api/plan_management'
import { getuserList } from 'api/Employment'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      modalshow: false,
      loading: true,
      isshow: true,
      tableThead: dataThead(this),
      tableTbody: [],
      id: '',
      total: 0,
      code: '',
      tableArr: dataTableThead(this),
      DataTable: [],
      formItem: {
        plan_type: '',
        task_type: '',
        form_name: '',
        department_list: []
      },
      department_names: [],
      formDisabled: false,
      departmentLists: []
    }
  },
  created () {
    this.id = this.id = getLocalStorage('id')
    if (getLocalStorage('status') === 'details') {
      this.isshow = false
    }
    this._getPlanList()
    if (getLocalStorage('id') === ' ') {
      errorNotice('请先填写基本信息', true)
      let obj = getLocalStorage('active')
      obj.second = 0
      getLocalStorage('active', obj)
      this.$router.push('/home/threeBusiness/er_plan/general')
    }
  },
  methods: {
    pageChange (index) {
      this.getList(index)
    },
    _getPlanList () {
      let obj = {
        searchValue: {
          _id: getLocalStorage('id')
        }
      }
      getdepList(obj).then(res => {
        if (res.code === '0000') {
          this.code = res.result.result[0].department_code
          this.getList()
        }
      })
    },
    cancel () {
      this.$router.push('/home/threeBusiness/threeBusinessDefault')
    },
    getList (page) {
      getuserList(page, { department_code: this.code }).then(res => {
        this.loading = false
        if (res.code === '0000') {
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    dataTableDetails (dataObj) {
      this.modalshow = true
      getLocalStorage('id', 'true')
      getLocalStorage('id', dataObj._id)
      getLocalStorage('formpath', '/home/threeBusiness/er_plan/dataTable')
      this.SET_DEPARTREPORTINFO(dataObj)
      getLocalStorage('form_name', dataObj.form_name)
      // this.$router.push('/home/depManagement/deplist/addpage')
      this.DataTable = dataObj.col_info
      this.formItem = dataObj
      this.formDisabled = true
      this.departmentLists = dataObj.department_list
      for (var i = 0; i < this.departmentLists.length; i++) {
        this.department_names.push(this.departmentLists[i].department_name)
      }
    },
    // 点击详情跳转
    // dataTableDetails () {
    //   this.$router.push('/home/depManagement/deplist/addpage')
    // },
    ...mapMutations([
      'SET_DEPARTREPORTINFO'
    ])
  }
}
</script>

<style scoped lang="scss">
  .data_table {
    height: 100%;
    height: 100%;
    .erp_title {
      font-size: 20px;
      color: #303030;
      font-weight: bold;
      text-align: center;
    }
    .general_content {
      width: 100%;
      /* height: 80%; */
      border-radius: 5px;
      textarea {
        width: 100%;
        height: 100%;
        overflow: auto;
        border: none;
      }
    }
    .save {
      margin: 20px;
    }
  }
</style>
