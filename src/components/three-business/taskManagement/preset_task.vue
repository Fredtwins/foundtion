<template>
  <div class="preset_task">
    <div class="title" v-if="showTitle">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
        <BreadcrumbItem>应急响应过程</BreadcrumbItem>
        <BreadcrumbItem>预设任务</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search" v-show="toogle">
      <span class="search_title" v-if="showTitle">执行部门</span>
      <Select
        v-if="showTitle"
        clearable
        :label="searchVal.department_fullname"
        not-found-text="无匹配部门，请重新输入"
        v-model="searchVal.department_fullname"
        filterable
        remote
        :remote-method="autoSearch"
        :loading="selectLoading"
        style="width:200px;padding-left: 10px;padding-right: 20px"
        @on-change="selected"
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
        style="width:200px;padding-left: 10px;padding-right: 20px"
      >
        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span class="search_title">预案类型</span>
      <Select
        v-model="searchVal.plan_type"
        placeholder="请选择"
        :clearable="true"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      >
        <Option v-for="item in PlanTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <div class="refresh" @click="refresh">
        <Button>查看全部</Button>
      </div>
      <div class="add pull-right" @click="add" v-if="showAdd">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
      </div>
    </div>
    <div class="table" v-show="toogle">
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
    <div class="refresh" @click="refresh" v-show="toogle">
      <Button type="info" size="large" @click="exportCsv">导出数据</Button>
    </div>
    <div class="page" v-show="toogle">
      <Page show-total :total="total" @on-change="pageChange" show-elevator></Page>
    </div>
    <!-- 新增/修改 -->
    <div class="edit" v-show="disabled">
      <div class="title" v-if="showTitle">
        <span class="titleleft"></span>
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
          <BreadcrumbItem>
            <a href="javascript:;" @click="cancel">预设任务</a>
          </BreadcrumbItem>
          <BreadcrumbItem>{{moduleTitle}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="editHead">
        <span>基本信息</span>
      </div>
      <div class="editcontant disabled-color">
        <Form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="0">
          <table class="ed-table">
            <tbody>
              <tr>
                <td class="ed-label">
                  <span class="font-color">*</span>执行部门全称
                </td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input
                      disabled
                      readonly
                      placeholder="请输入"
                      style="width:80%"
                      v-model="formItem.department_fullname"
                    ></Input>
                  </FormItem>
                </td>
                <td class="ed-label">
                  <span class="font-color">*</span>执行部门简称
                </td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input
                      disabled
                      readonly
                      placeholder="请输入"
                      style="width:80%"
                      v-model="formItem.department_name"
                    ></Input>
                  </FormItem>
                </td>
                <td class="ed-label">
                  <span class="font-color">*</span>预案类型
                </td>
                <td class="ed-content">
                  <FormItem label prop="plan_type" style="margin: 0">
                    <Select
                      placeholder="请选择"
                      style="width:80%"
                      v-model="formItem.plan_type"
                      disabled
                      @on-change="planTypeSelect"
                    >
                      <Option value="防风">防风</Option>
                      <Option value="防汛">防汛</Option>
                      <Option value="防旱">防旱</Option>
                      <Option value="防暴雨">防暴雨</Option>
                    </Select>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">
                  <span class="font-color">*</span>预案名称
                </td>
                <td class="ed-content">
                  <FormItem label prop="plan_name" style="margin: 0">
                    <Input
                      disabled
                      placeholder="请输入"
                      style="width:80%"
                      v-model="formItem.plan_name"
                    ></Input>
                  </FormItem>
                </td>
                <td class="ed-label">
                  <span class="font-color">*</span>任务类型
                </td>
                <td class="ed-content">
                  <FormItem label prop="task_type" style="margin: 0">
                    <Select
                      placeholder="请选择"
                      style="width:80%"
                      v-model="formItem.task_type"
                      :disabled="formDisabled"
                      @on-change="selectType"
                    >
                      <Option value="日常任务">日常任务</Option>
                      <Option value="事前任务">事前任务</Option>
                      <Option value="事中任务">事中任务</Option>
                      <Option value="事后任务">事后任务</Option>
                    </Select>
                  </FormItem>
                </td>

                <td class="ed-label">
                  <span class="font-color">*</span>任务概要
                </td>
                <td class="ed-content" colspan="3">
                  <FormItem label prop="task_profile" style="margin: 0">
                    <Input
                      placeholder="请输入"
                      style="width:width:80%"
                      v-model="formItem.task_profile"
                      :disabled="formDisabled"
                    ></Input>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">
                  <span class="font-color">*</span>任务负责人
                </td>
                <td class="ed-content">
                  <FormItem label prop="chargeby" style="margin: 0">
                    <Input
                      placeholder="请输入"
                      style="width:width:80%"
                      v-model="formItem.chargeby"
                      :disabled="formDisabled"
                    ></Input>
                  </FormItem>
                </td>
                <td class="ed-label">
                  <span class="font-color">*</span>负责人电话
                </td>
                <td class="ed-content" colspan="3">
                  <FormItem label prop="phoneno" style="margin: 0">
                    <Input
                      placeholder="请输入"
                      style="width:width:80%"
                      v-model="formItem.phoneno"
                      :disabled="formDisabled"
                    ></Input>
                  </FormItem>
                </td>
              </tr>

              <tr style="height: 80px">
                <td class="ed-label">
                  <span class="font-color">*</span>任务描述
                </td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="task_desc" style="margin: 0">
                    <Input
                      placeholder="请输入"
                      type="textarea"
                      style="width:100%; height:100%"
                      v-model="formItem.task_desc"
                      :disabled="formDisabled"
                    ></Input>
                  </FormItem>
                </td>
              </tr>

              <tr style="height: 80px">
                <td class="ed-label">
                  <span class="font-color">*</span>启动条件(说明)
                </td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="trigger" style="margin: 0">
                    <Input
                      placeholder="请输入"
                      type="textarea"
                      v-model="formItem.trigger"
                      style="width:100%"
                      :disabled="formDisabled"
                    ></Input>
                  </FormItem>
                </td>
              </tr>

              <tr v-if="inputShow">
                <td class="ed-label">应急响应类别</td>
                <td class="ed-content" colspan="5">
                  <FormItem label style="margin: 0">
                    <RadioGroup v-model="formItem.response_type">
                      <Radio label="防风">防风</Radio>
                      <Radio label="防汛">防汛</Radio>
                      <Radio label="防暴雨">防暴雨</Radio>
                      <Radio label="防旱">防旱</Radio>
                    </RadioGroup>
                  </FormItem>
                </td>
              </tr>

              <tr v-if="inputShow">
                <td class="ed-label">应急响应级别</td>
                <td class="ed-content" colspan="5">
                  <FormItem label style="margin: 0">
                    <RadioGroup v-model="formItem.response_level">
                      <Radio label="I级">I级</Radio>
                      <Radio label="II级">II级</Radio>
                      <Radio label="III级">III级</Radio>
                      <Radio label="IV级">IV级</Radio>
                    </RadioGroup>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">计划开始时间</td>
                <td class="ed-content">
                  <FormItem label prop="plan_startdate" style="margin: 0">
                    <Input
                      :disabled="formDisabled"
                      placeholder="请输入"
                      v-model="formItem.plan_startdate"
                      style="width:width:80%"
                    ></Input>
                  </FormItem>
                </td>

                <td class="ed-label">计划结束时间</td>
                <td class="ed-content" colspan="3">
                  <FormItem label prop="plan_enddate" style="margin: 0">
                    <Input
                      :disabled="formDisabled"
                      v-model="formItem.plan_enddate"
                      style="width:200px"
                      placeholder="请输入"
                    ></Input>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">要求上报的结果</td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="result_report" style="margin: 0">
                    <CheckboxGroup v-model="formItem.result_report">
                      <Checkbox
                        v-for="item in responseResult"
                        :key="item._id"
                        :label="item.form_name"
                      ></Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
      <div class="editFooter">
        <Button type="ghost" @click="cancel" style="margin-right: 10px">关闭</Button>
        <Button v-if="saveShow" type="primary" @click="sureBtn('formItem')">保存</Button>
      </div>
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
  </div>
</template>

<script>
import { preTaskThead } from 'common/js/table'
import { filterDepartment, getUserIng, likeStrSearch } from 'common/js/util'
import { depTaskQuery } from 'common/js/query'
import { presetTask } from 'common/js/rules'
import { getpresetTaskList, addpresetTask, editpresetTask, deletepresetTask } from 'api/task_management'
import { getDepList } from 'api/bumenlist'
import { getdepList } from 'api/plan_management'
import { getuserListAll } from 'api/Employment'
import { getLocalStorage, errorNotice } from 'common/js/dom'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    model: {
      type: Object,
      default: function () {
        return {}
      }
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    code: {
      type: String,
      default: ''
    },
    planType: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['STATUS'])
  },
  watch: {
    STATUS: {
      handler: function (val, oldval) {
        if (val === false) {
          this.disabled = false
        }
      }
    }
  },
  data () {
    return {
      saveShow: true,
      showAdd: true,
      selectShow: false,
      departmentInfo: [],
      dataList: [],
      loading: false,
      endType: '天',
      responseResult: [],
      autoCompleteData: [],
      departmentList: [],
      selectLoading: false,
      num: 1,
      detObj: {},
      sure_del: false,
      delObj: {},
      formDisabled: false,
      detDisabled: true,
      formItem: {},
      ruleValidate: presetTask,
      disabled: false,
      moduleTitle: '新增',
      tableThead: preTaskThead(this),
      tableTbody: [],
      total: 0,
      searchVal: {
        department_name: '',
        task_type: '',
        plan_name: ''
      },
      depList: depTaskQuery().depList,
      typeList: depTaskQuery().typeList,
      PlanTypeList: depTaskQuery().PlanTypeList,
      postObj: {
        'page': 1,
        'pageSize': 10,
        'order': { _id: -1 },
        'searchValue': {
          department_code: likeStrSearch(getUserIng().department_code),
          department_level: getUserIng().department_level,
          plan_name: getLocalStorage('plannameage'),
          plan_no: getLocalStorage('plannoadd')
        }
      },
      postObjs: {
        'page': 1,
        'pageSize': 10,
        'order': { _id: -1 },
        'searchValue': {
          department_code: likeStrSearch(getUserIng().department_code),
          department_level: getUserIng().department_level
        }
      },
      department_code: '',
      plan_type: '',
      baseInfo: {},
      inputShow: false,
      toogle: true
    }
  },
  created () {
    if (getLocalStorage('status') === 'details' || this.showTitle) {
      this.showAdd = false
    } else {
      this.showAdd = true
    }
  },
  mounted () {
    this.getDapList()
    setTimeout(() => {
      if (this.showTitle) {
        this.getList()
        this.formDisabled = true
      } else {
        this.getType()
      }
    }, 100)
    if (getLocalStorage('info').department_code !== '0101') {
      this.selectShow = true
    } else {
      this.selectShow = false
    }
  },
  methods: {
    exportCsv () {
      this.$refs.table.exportCsv({
        filename: '预设任务列表'
      })
    },
    // 选中任务类型执行的逻辑
    selectType (value) {
      if (value) {
        if (value === '日常任务') {
          this.inputShow = false
        } else {
          this.inputShow = true
        }
        this.getRespontResult({ department_code: this.formItem.department_code, task_type: value })
      }
    },
    getType (pObj, page) {
      this.loading = true
      let id = getLocalStorage('id')
      getdepList({ searchValue: { _id: id } }).then(res => {
        if (res.code === '0000') {
          this.baseInfo = {
            department_fullname: res.result.result[0].department_fullname,
            department_name: res.result.result[0].department_name,
            department_code: res.result.result[0].department_code,
            department_level: res.result.result[0].department_level,
            plan_name: res.result.result[0].plan_name,
            plan_type: res.result.result[0].plan_type
          }
          this.plan_type = res.result.result[0].plan_type
          this.department_code = res.result.result[0].department_code
          this.getOnlyList(pObj, page)
          // this.getRespontResult({ department_code: this.department_code })
        }
      })
    },
    // 查询具体某一预案的任务
    getOnlyList (pObj, page) {
      let obj = {
        'page': page || 1,
        'pageSize': 10,
        'order': { _id: -1 },
        'searchValue': {
          'department_code': this.department_code,
          'plan_type': this.plan_type,
          'plan_name': getLocalStorage('plannameage'),
          'plan_no': getLocalStorage('plannoadd'),
          ...pObj
        }
      }
      getpresetTaskList(obj).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
          }
        }
      })
    },
    // 查看全部
    refresh () {
      if (this.showTitle) {
        this.postObj.searchValue = {}
        this.getList()
      } else {
        this.getType()
      }
    },
    // 选择预案类型
    planTypeSelect (value) {
      // this.getRespontResult()
      var arr = []
      this.responseResult.map(item => {
        if (item.plan_type === '全部' || item.play_type === value) {
          arr.push(item)
        }
      })
      this.responseResult = arr
    },
    // 选择执行部门全称
    selected (value) {
      if (value) {
        let index = this.departmentList.findIndex(item => value === item.department_fullname)
        this.formItem.department_name = this.departmentList[index].department_name
        this.formItem.department_level = this.departmentList[index].department_level
        this.formItem.department_code = this.departmentList[index].department_code
        this.getRespontResult({ department_code: this.formItem.department_code })
      }
    },
    // 获取要求上报的结果
    getRespontResult (search) {
      getuserListAll(search).then(res => {
        if (res.code === '0000') {
          this.responseResult = res.result.result
        }
      })
    },
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
    getList (searchtemp) {
      this.loading = true
      this.dataList = []
      // let department_name = getLocalStorage('info').department_name
      // let department_code = getLocalStorage('info').department_code
      // let department_level = getLocalStorage('info').department_level
      let postObjs = {
        'page': 1,
        'pageSize': 10,
        'order': { _id: -1 },
        'searchValue': {
          department_code: likeStrSearch(getUserIng().department_code),
          department_level: getUserIng().department_level,
          ...searchtemp
        }
      }
      let search = {}
      if (getLocalStorage('cebian') === '3-2') {
        search = postObjs
      } else {
        search = this.postObj
      }
      getpresetTaskList(search).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
          }
        } else {
          errorNotice('服务器未连接，')
        }
      })
    },
    // 点击取消
    cancel () {
      this.disabled = false
      this.toogle = true
    },
    // 点击新增
    add () {
      this.inputShow = false
      this.SET_STATUS(true)
      this.disabled = true
      this.toogle = false
      this.moduleTitle = '新增'
      this.formItem = {
        ...this.baseInfo
      }
    },
    ...mapMutations(['SET_STATUS']),
    // 确认保存
    sureBtn (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.formItem.plan_enddate = this.num + this.endType + '内'
          delete this.formItem['label']
          delete this.formItem['value']
          if (this.moduleTitle === '新增') {
            // this.formItem = Object.assign(this.formItem,this.baseInfo)
            // this.formItem = {
            //   plan_no: getLocalStorage('planNo')
            // }
            this.formItem['plan_no'] = getLocalStorage('planNo')
            addpresetTask(this.formItem).then(res => {
              if (res.code === '0000') {
                this.disabled = false
                this.toogle = true
                this.getType()
                this.$Notice.success({
                  title: '新增成功',
                  duration: 1
                })
              } else {
                this.$Notice.error({
                  title: '新增失败',
                  duration: 1
                })
              }
            })
          } else {
            editpresetTask(this.formItem).then(res => {
              if (res.code === '0000') {
                this.disabled = false
                this.toogle = true
                this.$Notice.success({
                  title: '修改成功',
                  duration: 1
                })
                this.getType()
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
    // 搜索
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      if (this.showTitle) {
        this.postObj.searchValue = this.searchVal
        if (this.postObj.searchValue.department_fullname) {
          this.postObj.searchValue = {
            department_name: this.searchVal.department_fullname,
            task_type: this.searchVal.task_type,
            plan_type: this.searchVal.plan_type
          }
          delete this.postObj.searchValue.department_code
          delete this.postObj.searchValue.department_level
        } else {
          this.postObj.searchValue = {
            // department_code: likeStrSearch(getUserIng().department_code),
            // department_level: getUserIng().department_level,
            // ...this.postObj.searchValue
            department_name: this.searchVal.department_fullname,
            task_type: this.searchVal.task_type,
            plan_type: this.searchVal.plan_type
          }
        }
        this.getList(this.postObj.searchValue)
      } else {
        this.getType(this.searchVal)
      }
    },
    // 点击编辑
    edit (dataObj) {
      this.SET_STATUS(true)
      this.moduleTitle = '编辑'
      this.disabled = true
      this.toogle = false
      this.formItem = dataObj
      this.saveShow = true
      // this.num = parseInt(this.formItem.plan_enddate.slice(-3, -2))
      this.getRespontResult({ department_code: this.formItem.department_code, task_type: dataObj.task_type })
      var arr = []
      this.responseResult.map(item => {
        if (item.plan_type === '全部' || item.play_type === this.formItem.plan_type) {
          arr.push(item)
        }
      })
      if (dataObj.task_type === '日常任务') {
        this.inputShow = false
      } else {
        this.inputShow = true
      }
      this.responseResult = arr
    },
    // 点击详情
    details (dataObj) {
      this.SET_STATUS(true)
      this.moduleTitle = '详情'
      this.disabled = true
      this.formItem = dataObj
      this.saveShow = false
      // this.num = parseInt(this.formItem.plan_enddate.slice(-3, -2))
      this.getRespontResult({ department_code: this.formItem.department_code, task_type: dataObj.task_type })
      var arr = []
      this.responseResult.map(item => {
        if (item.plan_type === '全部' || item.play_type === this.formItem.plan_type) {
          arr.push(item)
        }
      })
      if (dataObj.task_type === '日常任务') {
        this.inputShow = false
      } else {
        this.inputShow = true
      }
      this.responseResult = arr
    },
    // 点击删除
    delete (index, dataObj) {
      this.sure_del = true
      this.delObj = { _id: dataObj._id }
    },
    // 确认删除
    dels () {
      this.sure_del = false
      deletepresetTask(this.delObj).then(res => {
        if (res.code === '0000') {
          this.$Notice.success({
            title: '删除成功',
            duration: 1
          })
          this.getType()
        }
      })
    },
    // 分页
    pageChange (index) {
      if (this.showTitle) {
        this.postObjs.page = index
        this.getListtemp(this.postObjs)
      } else {
        this.postObj.page = index
        this.getType({}, index)
      }
    },
    getListtemp (searchtemp) {
      this.loading = true
      this.dataList = []
      let search = {}
      if (getLocalStorage('cebian') === '3-2') {
        search = searchtemp
      } else {
        search = this.postObj
      }
      getpresetTaskList(search).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
          }
        } else {
          errorNotice('服务器未连接，')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .preset_task {
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
      padding-left: 10px;
      > span {
        font-size: 14px;
        font-weight: 600;
      }
    }
    .edit {
      width: 100%;
      height: 100%;
      padding: 10px; // padding-top: 60px;
      background: #fff;
      position: absolute;
      //position: relative;
      top: 0;
      left: 0;
      z-index: 2;
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
      > .editcontant {
        margin-bottom: 20px;
        .ed-table {
          width: 100%;
          tr {
            height: 0.5rem;
            .ed-label {
              width: 150px;
              background: #edf6fa;
              text-align: center;
            }
            .ed-content {
              padding: 5px 1%;
              .more {
                width: 30px;
                height: 30px;
                border: 1px solid #ccc;
                text-align: center;
                line-height: 30px;
                color: #ccc;
                font-size: 20px;
              }
              .more:hover {
                border-color: #b6e1fc;
                color: #b6e1fc;
                cursor: pointer;
              }
            }
            td {
              border: 1px solid #ccc;
              padding: 0;
              input[type='text'] {
                width: 100%;
                height: 40px;
                border: none;
                padding: 10px;
              }
            }
          }
        }
      }
    }
    .search {
      margin-bottom: 15px;
      .searchBtn {
        display: inline-block;
      }
      .refresh {
        display: inline-block;
        button {
          border-radius: 0;
          background: #18bdff;
          color: #fff;
        }
      }
    }
  }
</style>
