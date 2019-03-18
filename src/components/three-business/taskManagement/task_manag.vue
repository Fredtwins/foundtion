<template>
  <div class="task_manag">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
        <BreadcrumbItem>应急响应过程</BreadcrumbItem>
        <BreadcrumbItem>任务列表</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search clear">
      <span class="search_title">执行部门</span>
      <Select
        clearable
        :label="searchVal.department_fullname"
        not-found-text="无匹配部门，请重新输入"
        v-model="searchVal.department_fullname"
        filterable
        remote
        :remote-method="autoSearch"
        @on-change="selected"
        :loading="selectLoading"
        style="width:1.65rem;padding-left: 0.1rem;padding-right: 0.1rem"
      >
        <Option
          v-for="(option, index) in autoCompleteData"
          :value="option.value"
          :key="index"
        >{{option.label}}</Option>
      </Select>
      <span class="search_title">任务类型</span>
      <Select
        v-model="searchVal.task_type"
        placeholder="请选择"
        :clearable="true"
        style="width:1.65rem;padding-left: 0.1rem;padding-right: 0.1rem"
      >
        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span class="search_title">任务状态</span>
      <Select
        v-model="searchVal.status"
        placeholder="请选择"
        :clearable="true"
        style="width:1.65rem;padding-left: 0.1rem;padding-right: 0.1rem"
      >
        <Option value="进行中">进行中</Option>
        <Option value="已完成">已完成</Option>
        <Option value="已关闭">已关闭</Option>
      </Select>
      <span class="search_title">时间</span>
      <DatePicker
        clearable
        @on-change="selectDate"
        v-model="searchVal.task_no"
        type="date"
        placeholder="请选择"
        style="width:1.65rem;padding-left: 0.1rem;padding-right: 0.1rem"
      ></DatePicker>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <div class="refresh" @click="refresh">
        <Button>查看全部</Button>
      </div>
      <!-- <div class="task_manag_add pull-right" @click="addBeforeTask" style='margin-left:15px'>
                <Button type="success">事前任务生成</Button>
            </div>
            <div class="task_manag_add pull-right" @click="add">
                <Button type="primary">添加日常任务</Button>
      </div>-->
      <div class="addButton pull-right">
        <div class="button">
          <Button type="success" @click="addBeforeTask">事前任务生成</Button>
          <Button type="primary" @click="add('formItem')">添加日常任务</Button>
          <Button type="primary" @click="append('taskForm')">事中任务追加</Button>
        </div>
      </div>
    </div>
    <div class="table">
      <Table
        ref="table"
        :loading="loading"
        border
        stripe
        size="small"
        highlight-row
        :columns="tableThead"
        :data="tableTbody"
      ></Table>
    </div>
    <div class="refresh" @click="refresh">
      <Button type="info" size="large" @click="exportCsv">导出数据</Button>
    </div>
    <div class="page">
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <!--确认删除  -->
    <Modal v-model="sure_del" width="360">
      <p slot="header" style="color:red;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除</span>
      </p>
      <div style="text-align:center">
        <p>确认删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="dels">确认</Button>
      </div>
    </Modal>
    <!-- 详情 -->
    <div class="edit" v-if="detDisabled">
      <div class="title">
        <span class="titleleft"></span>
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
          <BreadcrumbItem>
            <a href="javascript:;" @click="cancel">任务列表</a>
          </BreadcrumbItem>
          <BreadcrumbItem>详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="editHead">
        <span>基本信息</span>
      </div>
      <div class="editcontant">
        <table class="ta-table">
          <tbody>
            <tr>
              <td class="ta-label">任务编号</td>
              <td class="ta-content">{{detObj.task_no}}</td>
              <td class="ta-label">执行部门名称</td>
              <td class="ta-content">{{detObj.department_name}}</td>
              <td class="ta-label">部门编号</td>
              <td class="ta-content">{{detObj.department_code}}</td>
            </tr>
            <tr>
              <td class="ta-label">部门级别</td>
              <td class="ta-content">{{detObj.department_level}}</td>
              <td class="ta-label">应急响应类型</td>
              <td class="ta-content">{{detObj.response_type}}</td>
              <td class="ta-label">应急响应级别</td>
              <td class="ta-content">{{detObj.response_level}}</td>
            </tr>
            <tr>
              <td class="ta-label">任务负责人</td>
              <td class="ta-content">{{detObj.chargeby}}</td>
              <td class="ta-label">任务负责人联系电话</td>
              <td class="ta-content">{{detObj.phoneno}}</td>
              <td class="ta-label">任务类型</td>
              <td class="ta-content">{{detObj.task_type}}</td>
            </tr>
            <tr>
              <td class="ta-label">任务概要</td>
              <td class="ta-content">{{detObj.task_profile}}</td>
              <td class="ta-label">计划开始时间</td>
              <td class="ta-content">{{detObj.plan_startdate}}</td>
              <td class="ta-label">计划结束时间</td>
              <td class="ta-content">{{detObj.plan_enddate}}</td>
            </tr>
            <tr>
              <td class="ta-label">任务描述</td>
              <td class="ta-content" colspan="5">{{detObj.task_desc}}</td>
            </tr>
            <tr v-if="saveShow">
              <td class="ta-label">执行状态</td>
              <td class="ta-content" colspan="5">
                <RadioGroup v-model="detObj.status">
                  <Radio label="进行中">进行中</Radio>
                  <Radio label="已完成">已完成</Radio>
                  <Radio label="已关闭">已关闭</Radio>
                </RadioGroup>
              </td>
            </tr>
            <tr>
              <td class="ta-label">任务实际开始时间</td>
              <td class="ta-content">
                <Input
                  v-if="saveShow"
                  v-model="detObj.startdate"
                  style="margin:5px;width:90%"
                  placeholder="请输入"
                ></Input>
                <span v-if="!saveShow">{{detObj.startdate}}</span>
              </td>
              <td class="ta-label">任务实际结束时间</td>
              <td class="ta-content" colspan="3">
                <Input
                  v-if="saveShow"
                  v-model="detObj.enddate"
                  style="margin:5px;width:90%"
                  placeholder="请输入"
                ></Input>
                <span v-if="!saveShow">{{detObj.enddate}}</span>
              </td>
            </tr>
            <tr>
              <td class="ta-label">要求上报的结果(单击录入)</td>
              <td class="ta-content" colspan="5">
                <a
                  v-model="detObj.result_report"
                  href="javascript:;"
                  @click="saveFormObj(item)"
                  v-for="(item,index) in formArr"
                  :key="index"
                >
                  {{item}}
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </a>
              </td>
            </tr>
            <tr>
              <td class="ta-label">任务完成情况描述</td>
              <td class="ta-content" colspan="5">
                <Input
                  v-if="saveShow"
                  v-model="detObj.complete_desc"
                  type="textarea"
                  style="margin:5px;width:90%"
                  placeholder="请输入"
                ></Input>
                <span v-if="!saveShow">{{detObj.complete}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="editFooter">
        <Button type="ghost" @click="cancel" style="marginRight:20px">关闭</Button>
        <Button v-if="saveShow" type="primary" @click="save">保存</Button>
      </div>
    </div>
    <!-- 事中任务追加 -->
    <div class="edit" v-if="appendDisabled">
      <div class="title">
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
          <BreadcrumbItem>
            <a href="javascript:;" @click="cancel">任务列表</a>
          </BreadcrumbItem>
          <BreadcrumbItem>事中任务追加</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="editHead">
        <span>基本信息</span>
      </div>
      <div class="editcontant pl0">
        <Form ref="taskForm" :rules="taskFormRuleValidate" :model="taskForm">
          <table class="ta-table">
            <tbody>
              <tr>
                <td class="ta-label">
                  <span class="font-color">*</span>应急响应编号
                </td>
                <td class="ta-content">
                  <FormItem style="margin: 0" prop="response_no">
                    <Select
                      style="margin:0 5px;width:2rem"
                      v-model="taskForm.response_no"
                      :label="taskForm.response_no"
                      :disabled="taskFormResDisabled"
                    >
                      <Option
                        v-for="(option, index) in responseDepartmentList"
                        :value="option.response_no"
                        :key="index"
                      >{{option.response_no}}</Option>
                    </Select>
                  </FormItem>
                </td>
                <td class="ta-label">
                  <span class="font-color">*</span>任务表单名称
                </td>
                <td class="ta-content">
                  <FormItem style="margin: 0">
                    <Select
                      style="margin:0 5px;width:3.5rem"
                      clearable
                      :label="taskForm.result_report"
                      multiple
                      not-found-text="无匹配任务表单，请重新输入"
                      v-model="taskForm.result_report"
                      filterable
                      remote
                      :remote-method="taskAutoSearch"
                      :loading="taskFormelectLoading"
                      @on-change="selectedTask"
                      placeholder="请输入任务表单名称"
                    >
                      <Option
                        v-for="(option, index) in taskAutoCompleteData"
                        :value="option.formname"
                        :key="index"
                      >{{option.formname}}</Option>
                    </Select>
                    <!-- <Input style="margin:0 5px;width:5rem" type="textarea" :rows="2" v-model="taskForm.result_report" placeholder="请选择任务表单"  @on-focus="selectTaskForm"></Input> -->
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ta-label">
                  <span class="font-color">*</span>计划开始时间
                </td>
                <td class="ta-content">
                  <FormItem style="margin: 0" prop="startdate">
                    <DatePicker
                      v-model="taskForm.startdate"
                      @on-change="selectStartDate"
                      type="datetime"
                      :editable="false"
                      placeholder="请选择日期"
                      style="margin:0 5px;width:2rem"
                    ></DatePicker>
                  </FormItem>
                </td>
                <td class="ta-label">
                  <span class="font-color">*</span>计划结束时间
                </td>
                <td class="ta-content" colspan="3">
                  <FormItem style="margin: 0" prop="enddate">
                    <DatePicker
                      v-model="taskForm.enddate"
                      @on-change="selectEndDate"
                      type="datetime"
                      :editable="false"
                      placeholder="请选择日期"
                      style="margin:0 5px;width:2rem"
                    ></DatePicker>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ta-label">
                  <span class="font-color">*</span>任务概要
                </td>
                <td class="ta-content" colspan="5">
                  <FormItem style="margin: 0" prop="task_desc">
                    <Input
                      style="margin:0 5px;width:95%"
                      :rows="5"
                      type="textarea"
                      v-model="taskForm.task_desc"
                    ></Input>
                  </FormItem>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
      <div class="editFooter">
        <Button type="ghost" @click="cancel" style="marginRight:20px">关闭</Button>
        <Button type="primary" @click="sureTaskBtn('taskForm')">生成任务</Button>
      </div>
    </div>
    <!--选择任务表单名称-->
    <!-- <Modal v-model="taskFormDisabled">
            <div slot="header">选择任务表单名称</div>
            <Form :model="taskFormSelect" :label-width="80">
                <FormItem label="任务表单">
                    <Select style="margin:0 5px;width:3.5rem" clearable :label="taskFormSelect.result_report" multiple not-found-text='无匹配任务表单，请重新输入' v-model="taskFormSelect.result_report"
                        filterable remote :remote-method="taskAutoSearch" :loading="taskFormelectLoading" @on-change='selectedTask' placeholder="请输入任务表单名称">
                        <Option v-for="(option, index) in taskAutoCompleteData" :value="option.formname" :key="index">{{option.formname}}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
				<Button type="primary" @click="_getaddTaskForm">保存</Button>
			</div>
    </Modal>-->
    <!-- 日常任务新增修改 -->
    <div class="edit" v-if="disabled">
      <div class="title">
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
          <BreadcrumbItem>
            <a href="javascript:;" @click="cancel">任务列表</a>
          </BreadcrumbItem>
          <BreadcrumbItem>详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="editHead">
        <span>基本信息</span>
      </div>
      <div class="editcontant pl0">
        <Form ref="formItem" :rules="ruleValidate" :model="formItem">
          <table class="ta-table">
            <tbody>
              <tr>
                <td class="ta-label">
                  <span class="font-color">*</span>任务概要
                </td>
                <td class="ta-content">
                  <FormItem style="margin: 0" prop="task_profile">
                    <Input style="margin:0 5px;width:2rem" v-model="formItem.task_profile"></Input>
                  </FormItem>
                </td>
                <td class="ta-label">
                  <span class="font-color">*</span>执行部门（全称）
                </td>
                <td class="ta-content">
                  <FormItem style="margin: 0" prop="department_name">
                    <Select
                      style="margin:0 5px;width:2rem"
                      v-if="!selectShow"
                      clearable
                      :label="formItem.department_fullname"
                      not-found-text="无匹配部门，请重新输入"
                      v-model="formItem.department_fullname"
                      filterable
                      remote
                      :remote-method="autoSearch"
                      @on-change="selected"
                      :loading="selectLoading"
                    >
                      <Option
                        v-for="(option, index) in autoCompleteData"
                        :value="option.value"
                        :key="index"
                      >{{option.label}}</Option>
                    </Select>
                    <Select
                      style="margin:0 5px;width:2rem"
                      v-if="selectShow"
                      clearable
                      :label="formItem.department_fullname"
                      @on-change="selected"
                      v-model="formItem.department_fullname"
                    >
                      <Option
                        v-for="(option, index) in departmentList"
                        :value="option.value"
                        :key="index"
                      >{{option.label}}</Option>
                    </Select>
                  </FormItem>
                </td>
                <td class="ta-label">
                  <span class="font-color">*</span>任务状态
                </td>
                <td class="ta-content">
                  <FormItem style="margin: 0" prop="status">
                    <Select
                      style="margin:0 5px;width:2rem"
                      v-model="formItem.status"
                      :disabled="formDisabled"
                    >
                      <Option value="进行中">进行中</Option>
                      <Option value="已完成">已完成</Option>
                      <Option value="已关闭">已关闭</Option>
                    </Select>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ta-label">
                  <span class="font-color">*</span>任务负责人
                </td>
                <td class="ta-content">
                  <FormItem style="margin: 0" prop="chargeby">
                    <Input style="margin:0 5px;width:2rem" v-model="formItem.chargeby"></Input>
                  </FormItem>
                </td>
                <td class="ta-label">
                  <span class="font-color">*</span>任务负责人联系电话
                </td>
                <td class="ta-content" colspan="3">
                  <FormItem style="margin: 0" prop="phoneno">
                    <Input style="margin:0 5px;width:2rem" v-model="formItem.phoneno"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ta-label">
                  <span class="font-color">*</span>任务描述
                </td>
                <td class="ta-content" colspan="5">
                  <FormItem style="margin: 0" prop="task_desc">
                    <Input
                      style="margin:0 5px;width:95%"
                      :rows="5"
                      type="textarea"
                      v-model="formItem.task_desc"
                    ></Input>
                  </FormItem>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
      <div class="editFooter">
        <Button type="ghost" @click="cancel" style="marginRight:20px">关闭</Button>
        <Button type="primary" @click="sureBtn('formItem')">保存</Button>
      </div>
    </div>

    <!-- 录入 -->
    <div class="report" v-if="showReport">
      <Seans :departInfo="departInfo" @saveAndReturn="saveAndReturn" @jump="jump"></Seans>
    </div>
    <div class="report" v-if="showPage">
      <Report :departInfo="departInfo" @saveAndReturn="saveAndReturn" @jump="jump"></Report>
    </div>
    <!-- 确认模态框 -->
    <template slot="content">
      <Modal v-model="modal2" width="360">
        <p slot="header" style="color:#204599;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>生成事前任务</span>
        </p>
        <div style="text-align:center">
          <p>确认生成？</p>
        </div>
        <div slot="footer">
          <Button type="primary" size="large" long @click="_getDelList">确认</Button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { taskManaThead } from 'common/js/table'
import { depTaskQuery } from 'common/js/query'
import { getTaskCryList, addTaskCry, editTaskCry, deleteTaskCry, addBeforeTask } from 'api/task_management'
import { taskManager, taskMust } from 'common/js/rules'
import { getLocalStorage, removeLocalStorage, successNotice, errorNotice } from 'common/js/dom'
import { initTime, filterDepartment, cloneObj, likeStrSearch, getUserIng } from 'common/js/util'
import { getDepList } from 'api/bumenlist'
import { getErmList, appendApi } from 'api/er-management'
import { getUserList } from 'api/temporary'
import Seans from '../../dep-management/pagemodel/seans.vue'
import Report from '../../dep-management/pagemodel/Report.vue'

export default {
  components: {
    Seans,
    Report
  },
  computed: {
    ...mapGetters(['IsShow', 'STATUS', 'MESSAGEID'])
  },
  watch: {
    STATUS: {
      handler: function (val, oldval) {
        if (val === false) {
          this.detDisabled = false
          this.appendDisabled = false
          this.disabled = false
          this.showReport = false
          this.showPage = false
        }
      }
    }
  },
  data () {
    return {
      modal2: false,
      showPage: false,
      saveShow: false,
      selectShow: false,
      departmentInfo: [],
      dataList: [],
      loading: false,
      departInfo: {},
      showReport: false,
      detObj: {},
      detDisabled: false,
      appendDisabled: false, // 事中任务追加
      autoCompleteData: [],
      departmentList: [],
      selectLoading: false,
      sure_del: false,
      delObj: {},
      disabled: false,
      formItem: {},
      formDisabled: false,
      moduleTitle: '新增',
      ruleValidate: taskManager,
      tableThead: taskManaThead(this),
      tableTbody: [],
      total: 0,
      searchVal: {
        task_type: ''
      },
      depList: depTaskQuery().depList,
      typeList: depTaskQuery().typeList,
      postObj: {
        'page': 1,
        'pageSize': 10,
        'order': { status: -1, _id: -1 },
        'searchValue': {
          department_code: likeStrSearch(getUserIng().department_code),
          department_level: getUserIng().department_level,
          plan_no: getLocalStorage('plannoadd')
        }
      },
      postObjs: {
        'page': 1,
        'pageSize': 10,
        'order': { status: -1, _id: -1 },
        'searchValue': {
          department_code: likeStrSearch(getUserIng().department_code),
          department_level: getUserIng().department_level
        }
      },
      formArr: [],
      code: '',
      taskForm: {
        response_no: '',
        result_report: [],
        startdate: '',
        enddate: '',
        task_desc: ''
      },
      taskFormSelect: {
        result_report: []
      },
      taskFormResDisabled: false,
      taskFormRuleValidate: taskMust,
      responseAutoCompleteData: [],
      responseDepartmentList: [],
      taskDepartmentList: [],
      taskAutoCompleteData: [],
      taskFormelectLoading: false,
      resPostObj: {
        'page': 1,
        'pageSize': 20,
        'order': { _id: -1 },
        'searchValue': {
          status: '启动'
        }
      },
      taskSearch: {},
      taskTime: {
        startdate: 0,
        enddate: 0
      }
    }
  },
  created () {
    this.getDapList()
    this._getResponseList()
    this._getTaskList()
    setTimeout(() => {
      this.getList()
    }, 100)
    if (getLocalStorage('info').department_code !== '0101') {
      this.selectShow = true
    } else {
      this.selectShow = false
    }
    if (getLocalStorage('formPath') === '/home/default') {
      if (this.MESSAGEID) {
        if (this.MESSAGEID.task_type === '事后任务') {
          this.saveShow = true
        }
        this.detDisabled = true
        this.detObj = this.MESSAGEID
        this.formArr = this.detObj.result_report
      } else {
        this.detDisabled = false
      }
    }
  },
  destroyed () {
    if (getLocalStorage('formPath')) {
      removeLocalStorage('formPath')
    }
  },
  methods: {
    exportCsv () {
      this.$refs.table.exportCsv({
        filename: '任务列表'
      })
    },
    show (dataObj) {
    },
    jump (value) {
      this.showReport = false
      this.showPage = false
    },
    selectDate (date) {
      if (date) {
        let str = date.replace(/-/g, '')
        this.searchVal.task_no = likeStrSearch(str)
      }
    },
    // 查看全部
    refresh () {
      this.postObj.searchValue = {}
      this.getList()
    },
    saveAndReturn (value) {
      this.showPage = value
      // this.showReport = value
    },
    saveFormObj (name) {
      this.departInfo = {
        name: name,
        department_code: this.detObj.department_code,
        department_name: this.detObj.department_name,
        department_level: this.detObj.department_code,
        response_no: this.detObj.response_no
      }
      if (this.detObj.task_type === '事中任务' || this.detObj.status !== '进行中') {
        this.showReport = true
        this.showPage = false
      } else {
        this.showPage = true
        this.showReport = false
      }
    },
    // 事前任务生成
    addBeforeTask () {
      this.modal2 = true
    },
    // 确认任务生成
    _getDelList () {
      addBeforeTask().then(res => {
        if (res.code === '0000') {
          this.getList()
          successNotice(res.message)
        } else if (res.code === '0022') {
          // errorNotice(res.message, true)
          this.$Notice.error({
            title: '错误提示',
            desc: res.message
          })
        } else {
          this.$Notice.error({
            title: '错误提示',
            desc: res.message
          })
        }
        this.modal2 = false
      })
    },
    // 选择执行部门全称
    selected (value) {
      if (value) {
        let index = this.departmentList.findIndex(item => value === item.department_fullname)
        this.formItem.department_name = this.departmentList[index].department_name
        this.formItem.department_level = this.departmentList[index].department_level
        this.formItem.department_code = this.departmentList[index].department_code
        this.code = this.departmentList[index].department_code
        // this.getRespontResult({ department_code: this.formItem.department_code })
      }
    },
    // 部门自动搜索
    autoSearch (query) {
      if (query !== '') {
        this.selectLoading = true
        setTimeout(() => {
          this.selectLoading = false
          this.autoCompleteData = this.departmentList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        this.autoCompleteData = []
      }
    },
    // 任务表单自动搜索
    taskAutoSearch (query) {
      if (query !== '') {
        this.taskFormelectLoading = true
        setTimeout(() => {
          this.taskFormelectLoading = false
          this.taskAutoCompleteData = this.taskDepartmentList.filter(item => item.formname.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        this.taskAutoCompleteData = []
      }
    },
    // 事中任务选择应急响应编号
    // 选择表单名称
    selectedTask (names) {
      let resultx = []
      if (names) {
        for (var i = 0; i < names.length; i++) {
          resultx.push(names[i])
        }
        // this.taskFormSelect.result_report = resultx
        this.taskForm.result_report = resultx
      }
    },

    // 获取全部应急响应信息
    _getResponseList () {
      getErmList(this.resPostObj).then(res => {
        this.responseDepartmentList = res.result.result
      })
    },
    // 获取全部表单名称信息
    _getTaskList () {
      getUserList().then(res => {
        this.taskDepartmentList = res.result.result
      })
    },
    // 获取全部部门信息
    getDapList () {
      let departmentName = getLocalStorage('info').department_name
      let departmentCode = getLocalStorage('info').department_code
      let departmentLevel = getLocalStorage('info').department_level
      getDepList().then(res => {
        this.departmentInfo = res.result.result
        if (departmentCode !== '0101') {
          this.departmentList = filterDepartment(this.departmentInfo, departmentName, departmentLevel, departmentCode)
          this.departmentList = this.departmentList.map(item => {
            return {
              value: item.fullname,
              label: item.fullname,
              department_fullname: item.fullname,
              department_name: item.name,
              department_code: item.code,
              department_level: item.level
            }
          })
        } else {
          this.departmentList = res.result.result.map(item => {
            return {
              value: item.fullname,
              label: item.fullname,
              department_fullname: item.fullname,
              department_name: item.name,
              department_code: item.code,
              department_level: item.level
            }
          })
        }
      })
    },
    // // 选择任务呢表单名称
    // selectTaskForm () {
    //   this.taskFormDisabled = true
    // },
    // // 模态框点击保存按钮
    // _getaddTaskForm () {
    //   this.taskForm.result_report = this.taskFormSelect.result_report
    //   this.taskFormDisabled = false
    // },
    // 获取任务管理列表
    getList () {
      this.dataList = []
      this.loading = true
      // let department_name = getLocalStorage('info').department_name
      // let department_code = getLocalStorage('info').department_code
      // let department_level = getLocalStorage('info').department_level
      getTaskCryList(this.postObjs).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
          } else {
            errorNotice('服务器未连接')
          }
        }
      })
    },
    // 点击新增
    add (name) {
      this.SET_STATUS(true)
      this.disabled = true
      this.moduleTitle = '添加日常任务'
      this.formItem = {}
    },
    // 点击新增（修改）确定按钮
    sureBtn (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let index = this.departmentList.findIndex(
            item => this.formItem.department_name === item.value
          )
          this.formItem = Object.assign(
            this.formItem,
            this.departmentList[index]
          )
          delete this.formItem['label']
          delete this.formItem['value']
          if (this.moduleTitle === '添加日常任务') {
            this.formItem.task_no = '任-' + initTime('yyyy', 'task')
            this.formItem.task_type = '日常任务'
            addTaskCry(this.formItem).then(res => {
              if (res.code === '0000') {
                this.disabled = false
                successNotice(res.message)
                this.getList()
              }
            })
          } else {
            delete this.formItem._index
            delete this.formItem._rowKey
            editTaskCry(this.formItem).then(res => {
              if (res.code === '0000') {
                this.disabled = false
                this.$Notice.success({
                  title: '修改成功',
                  duration: 1
                })
                this.getList()
              } else {
                this.$Notice.error({
                  title: '修改失败',
                  duration: 1
                })
              }
            })
          }
        }
      })
    },
    // 事中任务选择计划开始时间
    selectStartDate (date) {
      if (date) {
        // let str = date.replace(/-/g, '')
        this.taskForm.startdate = date
        let startdate = this.taskForm.startdate
        startdate = startdate.replace(/:/g, '')
        startdate = startdate.replace(/-/g, '')
        startdate = startdate.replace(/ /g, '')
        this.taskTime.startdate = startdate
      }
    },
    // 事中任务选择计划结束时间
    selectEndDate (date) {
      if (date) {
        this.taskForm.enddate = date
        let enddate = this.taskForm.enddate
        enddate = enddate.replace(/:/g, '')
        enddate = enddate.replace(/-/g, '')
        enddate = enddate.replace(/ /g, '')
        this.taskTime.enddate = enddate
      }
    },
    // 事中任务保存按钮
    sureTaskBtn (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.taskTime.enddate <= this.taskTime.startdate) {
            this.$Message.error('结束时间必须比开始时间大')
          } else {
            appendApi(this.taskForm).then(res => {
              if (res.code === '0000') {
                this.$Notice.success({
                  title: '保存成功',
                  duration: 1
                })
                this.appendDisabled = false
                this.taskForm = {}
                this.getList()
              } else if (res.code === '0001') {
                this.$Notice.warning({
                  title: '系统异常'
                })
              }
            })
          }
        }
      })
    },
    // 点击事中任务追加
    append (name) {
      this.SET_STATUS(true)
      this.appendDisabled = true
      this.moduleTitle = '事中任务追加'
      this.formItem = {}
    },
    // 点击搜索按钮
    search () {
      this.searchVal.department_code = this.code
      this.searchVal.plan_no = getLocalStorage('plannoadd')
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.postObj.searchValue = cloneObj(this.searchVal)
      if (this.postObj.searchValue.department_fullname) {
        delete this.postObj.searchValue.department_level
      } else {
        this.postObj.searchValue = {
          ...this.postObj.searchValue,
          department_code: likeStrSearch(getUserIng().department_code),
          department_level: getUserIng().department_level,
          plan_no: getLocalStorage('plannoadd')
        }
      }
      delete this.postObj.searchValue.department_fullname
      this.getList()
    },
    // 点击保存
    save () {
      editTaskCry(this.detObj).then(res => {
        if (res.code === '0000') {
          this.detDisabled = false
          this.$Notice.success({
            title: '修改成功',
            duration: 1
          })
          this.getList()
        } else {
          this.$Notice.error({
            title: res.message,
            duration: 1
          })
        }
      })
    },
    // 点击编辑按钮
    edit (dataObj) {
      this.SET_STATUS(true)
      this.formArr = dataObj.result_report
      this.saveShow = true
      this.moduleTitle = '编辑'
      if (dataObj.task_type === '事前任务' || dataObj.task_type === '事后任务') {
        this.detDisabled = true
        this.detObj = dataObj
      } else if (dataObj.task_type === '日常任务') {
        this.disabled = true
      }
      this.formItem = dataObj
    },
    ...mapMutations(['SET_STATUS']),
    // 点击删除按钮
    delete (dataObj) {
      this.sure_del = true
      this.delObj = { _id: dataObj._id }
    },
    // 点击删除确定
    dels () {
      this.sure_del = false
      deleteTaskCry(this.delObj).then(res => {
        if (res.code === '0000') {
          this.getList()
          this.$Notice.success({
            title: '删除成功',
            duration: 1
          })
        } else {
          this.$Notice.error({
            title: '删除失败',
            duration: 1
          })
        }
      })
    },
    // 分页
    pageChange (index) {
      this.postObj.page = index
      this.getList()
      // this.tableTbody = divisionArr(this.dataList)[index - 1]
    },
    // 点击详情按钮
    details (dataObj) {
      this.saveShow = false
      this.SET_STATUS(true)
      this.detDisabled = true
      this.detObj = dataObj
      this.formArr = dataObj.result_report
    },
    cancel () {
      this.detDisabled = false
      this.disabled = false
      this.appendDisabled = false
    }
  }
}
</script>

<style scoped lang="scss">
  .task_manag {
    height: 100%;
    .title {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      width: 100%;
      background: rgb(237, 246, 250);
      height: 0.5rem;
      line-height: 0.5rem;
      padding-left: 0.1rem;
      > span {
        font-size: 0.14rem;
        font-weight: 600;
      }
    }
    .search {
      margin-bottom: 0.15rem;
      .searchBtn {
        display: inline-block;
      }
      .refresh {
        width: 0.8rem;
        display: inline-block;
        button {
          border-radius: 0;
          background: #18bdff;
          color: #fff;
          z-index: 8;
        }
      }
    }
    .addButton {
      /* margin: 10px 0; */
      width: 3rem;
      .button {
        display: flex;
        border-radius: 0.05rem;
        overflow: hidden;
        // border: 0.01rem solid #2d8cf0;
        > button {
          width: 50%;
          padding: 0;
          height: 32px;
          line-height: 32px;
          border-radius: 0;
          background-color: #fff;
          color: #224ca5;
          border: none;
          background: #224ca5;
          color: #fff;
          border-right: 0.01rem solid #fff;
          > span {
            font-size: 0.12rem !important;
          }
        }
        > button:last-child {
          border: none;
        }
        button:hover {
          background: #2d8cf0;
        }
      }
    }
    .edit {
      width: 100%;
      height: 100%;
      padding: 10px;
      padding-top: 60px;
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
      .title {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        width: 100%;
        background: rgb(237, 246, 250);
        height: 0.5rem;
        line-height: 0.5rem;
        padding-left: 10px;
        > span {
          font-size: 14px;
          font-weight: 600;
        }
      }
      > .editHead {
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        > span {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          font-weight: 500;
          border-bottom: 2px solid rgb(12, 102, 204);
        }
      }
      >.editcontant {
        margin-bottom: 20px;
        .ta-table {
          width: 100%;
          tr {
            height: 40px;
            .ta-label {
              width: 150px;
              background: #edf6fa;
              text-align: center;
            }
            .ta-content {
              padding-left: 10px;
            }
            td {
              border: 1px solid #ccc;
            }
          }
        }
      }
      >.pl0 {
        .ta-table {
          tr {
            .ta-content {
              padding-left: 0;
              padding: 7px 0;
            }
          }
        }
      }
    }
    .report {
      width: 100%;
      height: 100%;
      padding: 10px;
      padding-top: 60px;
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }
  }
</style>
