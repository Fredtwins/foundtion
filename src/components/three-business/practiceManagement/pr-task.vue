<template>
  <div class="pr-task">
    <div class="title" v-if="titleShow">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>三防业务</BreadcrumbItem>
        <BreadcrumbItem>演练管理</BreadcrumbItem>
        <BreadcrumbItem>演练任务</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">任务简述</span>
      <Input
        placeholder="请输入"
        v-model="searchVal.task_profile"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      ></Input>
      <span class="search_title">角色</span>
      <Input
        placeholder="请输入"
        v-model="searchVal.task_role"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      ></Input>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <div class="add pull-right" @click="add" v-if="!titleShow">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
      </div>
    </div>
    <div class="table">
      <Table
        :loading="loading"
        border
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
    <div class="addPage" v-if="addPageShow">
      <!-- <div class="title" v-if="titleShow">
				<span>位置： </span>
				<Breadcrumb separator=">">
					<BreadcrumbItem>三防业务</BreadcrumbItem>
					<BreadcrumbItem>演练管理</BreadcrumbItem>
					<BreadcrumbItem>演练任务</BreadcrumbItem>
				</Breadcrumb>
      </div>-->
      <Form ref="formItem" :model="formItem" :rules="ruleValidate">
        <table class="ed-table disabled-color">
          <tbody>
            <tr>
              <td class="ed-label">
                <span class="font-color">*</span>计划编号
              </td>
              <td class="ed-content">
                <FormItem style="margin:0" prop="plan_no">
                  <Input
                    readonly
                    v-model="formItem.plan_no"
                    placeholder="请输入"
                    :disabled="formDisabled"
                    style="width:80%"
                  ></Input>
                </FormItem>
              </td>
              <td class="ed-label">
                <span class="font-color">*</span>任务简述
              </td>
              <td class="ed-content" colspan="3">
                <FormItem style="margin:0" prop="task_profile">
                  <Input
                    v-model="formItem.task_profile"
                    placeholder="请输入"
                    :disabled="formDisabled"
                    style="width:80%"
                  ></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td class="ed-label">
                <span class="font-color">*</span>状态
              </td>
              <td class="ed-content">
                <FormItem style="margin: 0" prop="status">
                  <Select
                    :disabled="formDisabled"
                    type="date"
                    v-model="formItem.status"
                    placeholder="请选择"
                    style="width: 200px"
                  >
                    <Option value="未启动">未启动</Option>
                    <Option value="已开启">已开启</Option>
                    <Option value="已关闭">已关闭</Option>
                  </Select>
                </FormItem>
              </td>
              <td class="ed-label">
                <span class="font-color">*</span>计划开始时间
              </td>
              <td class="ed-content">
                <FormItem style="margin:0" prop="plan_start">
                  <DatePicker
                    :disabled="formDisabled"
                    v-model="formItem.plan_start"
                    format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择日期"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </td>
              <td class="ed-label">
                <span class="font-color">*</span>计划结束时间
              </td>
              <td class="ed-content" colspan="5">
                <FormItem style="margin: 0" prop="plan_end">
                  <DatePicker
                    :disabled="formDisabled"
                    v-model="formItem.plan_end"
                    type="date"
                    placeholder="请选择日期"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td class="ed-label">
                <span class="font-color">*</span>实际开始时间
              </td>
              <td class="ed-content">
                <FormItem style="margin:0" prop="actual_start">
                  <DatePicker
                    :disabled="formDisabled"
                    v-model="formItem.actual_start"
                    type="date"
                    placeholder="请选择日期"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </td>
              <td class="ed-label">
                <span class="font-color">*</span>实际结束时间
              </td>
              <td class="ed-content">
                <FormItem style="margin: 0" prop="actual_end">
                  <DatePicker
                    :disabled="formDisabled"
                    v-model="formItem.actual_end"
                    type="date"
                    placeholder="请选择日期"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </td>
              <td class="ed-label">
                <span class="font-color">*</span>执行任务的角色
              </td>
              <td class="ed-content">
                <FormItem style="margin:0" prop="task_role">
                  <Input
                    v-model="formItem.task_role"
                    placeholder="请输入"
                    :disabled="formDisabled"
                    style="width:80%"
                  ></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td class="ed-label">
                <span class="font-color">*</span>任务详细描述
              </td>
              <td class="ed-content" colspan="5">
                <FormItem style="margin: 0" prop="task_desc">
                  <Input
                    v-model="formItem.task_desc"
                    type="textarea"
                    :rows="5"
                    placeholder="请输入"
                    :disabled="formDisabled"
                  ></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td class="ed-label">未完成原因</td>
              <td class="ed-content" colspan="5">
                <FormItem style="margin: 0" prop="incompelete_reason">
                  <Input
                    v-model="formItem.incomplete_reason"
                    type="textarea"
                    :rows="5"
                    placeholder="请输入"
                    :disabled="formDisabled"
                  ></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td class="ed-label">遇到的问题</td>
              <td class="ed-content" colspan="5">
                <FormItem style="margin:0" prop="problem_list">
                  <Input
                    :disabled="formDisabled"
                    v-for="(item,index) in inputArr"
                    :key="index"
                    v-model="item.value"
                    placeholder="请输入"
                    style="width: 80%"
                  ></Input>
                  <span class="more" @click="addInput">
                    <Icon type="plus-round"></Icon>
                  </span>
                  <span class="more" v-if="inputArr.length!==0" @click="deleteInput">
                    <Icon type="minus-round"></Icon>
                  </span>
                </FormItem>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      <div class="save pull-right">
        <Button
          type="primary"
          size="large"
          @click="save('formItem')"
          style="margin-right:15px"
          v-if="isshow"
        >保存</Button>
        <Button type="ghost" size="large" @click="cancel">关闭</Button>
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
import { prTaskThead } from 'common/js/table'
import { prTaskRules } from 'common/js/rules'
import { successNotice, errorNotice } from 'common/js/dom'
import { mapGetters, mapMutations } from 'vuex'
import { prTaskApi } from 'api/practice-management'
import { dateFormat } from 'common/js/config'
import { timeFilter, likeStrSearch, cloneObj } from 'common/js/util'

export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    planId: {
      type: String,
      default: 'undefined'
    }
  },
  computed: {
    ...mapGetters(['STATUS'])
  },
  watch: {
    STATUS: {
      handler: function (val, oldval) {
        if (val === false) {
          this.addPageShow = false
        }
      }
    }
  },
  data () {
    return {
      apiType: 'list',
      operationText: '新增',
      sure_del: false,
      addPageShow: false,
      searchVal: {},
      tableThead: prTaskThead(this),
      tableTbody: [],
      total: 0,
      loading: false,
      departmentList: [],
      autoCompleteData: [],
      selectLoading: false,
      id: '',
      postObj: {
        order: { _id: -1 },
        page: 1,
        pageSize: 10,
        searchValue: {}
      },
      formItem: {},
      ruleValidate: prTaskRules,
      formDisabled: false,
      isshow: true,
      titleShow: true,
      inputArr: []
    }
  },
  created () {
    if (this.show === false) {
      this.titleShow = false
    } else {
      this.titleShow = true
    }
    this.getList()
    if (this.planId !== 'undefined') {
      this.postObj.searchValue.plan_no = this.planId
    }
  },
  methods: {
    deleteInput () {
      this.inputArr.pop()
    },
    addInput () {
      this.inputArr.push({ value: this.inputArr.length + 1 + '、' })
    },
    getList () {
      this.loading = true
      prTaskApi('list', this.postObj).then(res => {
        this.loading = false
        if (res.code === '0000') {
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    // 点击新增
    add () {
      this.SET_STATUS(true)
      this.addPageShow = true
      this.apiType = 'new'
      this.operationText = '新增'
      this.formDisabled = false
      this.isshow = true
      this.formItem = {
        plan_no: this.planId,
        status: '未启动'
      }
    },
    edit (dataObj) {
      this.SET_STATUS(true)
      this.addPageShow = true
      this.apiType = 'edit'
      this.operationText = '修改'
      this.formItem = dataObj
      this.formDisabled = false
      this.isshow = true
    },
    // 点击删除
    delete (dateObj) {
      this.sure_del = true
      this.id = dateObj._id
    },
    // 点击详情
    details (dateObj) {
      this.SET_STATUS(true)
      this.addPageShow = true
      this.isshow = false
      this.formItem = dateObj
      this.formDisabled = true
    },
    // 确认删除
    dels () {
      this.sure_del = false
      prTaskApi('delete', { _id: this.id }).then(res => {
        if (res.code === '0000') {
          successNotice(res.message)
          this.getList()
        }
      })
    },
    ...mapMutations(['SET_STATUS']),
    // 点击搜索
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.postObj.searchValue = cloneObj(this.searchVal)
      if (this.postObj.searchValue.task_profile) {
        this.postObj.searchValue.task_profile = likeStrSearch(this.postObj.searchValue.task_profile)
      }
      if (this.postObj.searchValue.task_role) {
        this.postObj.searchValue.task_role = likeStrSearch(this.postObj.searchValue.task_role)
      }
      this.getList()
    },
    // 分页
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    // 点击保存
    save (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.inputArr && this.inputArr.length) {
            this.formItem.problem_list = []
            this.inputArr.map(item => {
              this.formItem.problem_list.push(item.value)
            })
          }
          this.formItem.plan_end = timeFilter(this.formItem.plan_end, dateFormat)
          this.formItem.plan_start = timeFilter(this.formItem.plan_start, dateFormat)
          this.formItem.actual_end = timeFilter(this.formItem.actual_end, dateFormat)
          this.formItem.actual_start = timeFilter(this.formItem.actual_start, dateFormat)
          prTaskApi(this.apiType, this.formItem).then(res => {
            if (res.code === '0000') {
              this.addPageShow = false
              successNotice(res.message)
              this.getList()
            } else {
              errorNotice(res.message, true)
            }
          })
        }
      })
    },
    // 点击取消
    cancel () {
      this.addPageShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
	.pr-task {
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
			>span {
				font-size: 14px;
				font-weight: 600;
			}
		}
		.search {
			margin-bottom: 15px;
			.searchBtn {
				display: inline-block;
			}
		}
		.addPage {
			padding: 0 10px;
			padding-top: 10px;
			z-index: 3;
			height: 100%;
			width: 100%;
			background: #fff;
			position: absolute;
			top: 47px;
			left: 0;
			/* form {
				margin-top: 60px;
				margin-bottom: 20px;
			} */
			.ed-table {
				width: 100%;
				tr {
					height: 0.5rem;
					.ed-label {
						width: 150px;
						background: #edf6fa;
						text-align: center;
						color: #303030;
						font-size: 14px;
						font-weight: bold;
					}
					.ed-content {
						padding: 6px 1%;
						background: #fff;
						.more {
							display: inline-block;
							/* float: left; */
							width: 32px;
							height: 32px;
							border: 1px solid #ccc;
							text-align: center;
							line-height: 32px;
							color: #0094ff;
							font-size: 20px;
							margin-left: 5px;
							position: relative;
							top: 5px;
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
			.save {
				margin-top: 10px;
			}
		}
	}
</style>
