<template>
  <div class="page">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>三防业务</BreadcrumbItem>
        <BreadcrumbItem>演练管理</BreadcrumbItem>
        <BreadcrumbItem>演练计划</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="addPageContent">
      <Tabs @on-click="changeTable" :value="openName" type="card" :animated="false">
        <TabPane label="基本信息" name="1">
          <div class="info">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate">
              <table class="ed-table disabled-color">
                <tbody>
                  <tr>
                    <td class="ed-label">
                      <span class="font-color">*</span>演练标题
                    </td>
                    <td class="ed-content">
                      <FormItem style="margin:0" prop="healine">
                        <Input
                          v-model="formItem.healine"
                          placeholder="请输入"
                          :disabled="formDisabled"
                          style="width:80%"
                        ></Input>
                      </FormItem>
                    </td>
                    <td class="ed-label">
                      <span class="font-color">*</span>计划开始时间
                    </td>
                    <td class="ed-content">
                      <FormItem style="margin:0" prop="plan_start">
                        <DatePicker
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
                          v-model="formItem.actual_end"
                          type="date"
                          placeholder="请选择日期"
                          style="width: 200px"
                        ></DatePicker>
                      </FormItem>
                    </td>
                    <td class="ed-label">
                      <span class="font-color">*</span>状态
                    </td>
                    <td class="ed-content">
                      <FormItem style="margin: 0" prop="status">
                        <Select
                          type="date"
                          v-model="formItem.status"
                          placeholder="请选择"
                          style="width: 200px"
                        >
                          <Option value="草稿">草稿</Option>
                          <Option value="启动">启动</Option>
                          <Option value="关闭">关闭</Option>
                        </Select>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <td class="ed-label">
                      <span class="font-color">*</span>演练参与者
                    </td>
                    <td class="ed-content" colspan="5">
                      <FormItem style="margin:0" prop="participant">
                        <Input v-model="formItem.participant" placeholder="请输入" style="width: 80%"></Input>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <td class="ed-label">
                      <span class="font-color">*</span>详细说明
                    </td>
                    <td class="ed-content" colspan="5">
                      <FormItem style="margin: 0" prop="main_objective">
                        <Input
                          v-model="formItem.main_objective"
                          type="textarea"
                          :rows="10"
                          placeholder="请输入"
                          :disabled="formDisabled"
                        ></Input>
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
        </TabPane>
        <TabPane label="任务行动" name="2">
          <taskActive v-if="show" :planId="planId" :show="false"></taskActive>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import taskActive from '../pr-task.vue'
import { dateFormat } from 'common/js/config'
import { timeFilter } from 'common/js/util'
import { prPlanApi } from 'api/practice-management'
import { prPlanRules } from 'common/js/rules'
import { successNotice, errorNotice } from 'common/js/dom'

export default {
  components: {
    taskActive
  },
  props: {
    dataObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    apiType: {
      type: String,
      default: 'new'
    }
  },
  data () {
    return {
      show: false,
      formItem: {},
      formDisabled: false,
      ruleValidate: prPlanRules,
      isshow: true,
      planId: '',
      openName: '1'
    }
  },
  created () {
    if (this.dataObj) {
      this.formItem = this.dataObj
      this.planId = this.dataObj.plan_no
    }
    if (this.planId === undefined) {
      this.show = false
    } else {
      this.show = true
    }
  },
  methods: {
    changeTable (name) {
      if (name === '2') {
        if (this.planId === undefined) {
          errorNotice('请先填写基本信息', true)
        }
      }
    },
    save (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.formItem.plan_end = timeFilter(this.formItem.plan_end, dateFormat)
          this.formItem.plan_start = timeFilter(this.formItem.plan_start, dateFormat)
          this.formItem.actual_end = timeFilter(this.formItem.actual_end, dateFormat)
          this.formItem.actual_start = timeFilter(this.formItem.actual_start, dateFormat)
          prPlanApi(this.apiType, this.formItem).then(res => {
            this.$emit('save', 'true')
            if (res.code === '0000') {
              this.show = true
              successNotice(res.message)
              this.openName = '2'
              this.planId = res.result.plan_no
            } else {
              errorNotice(res.message, true)
            }
          })
        }
      })
    },
    cancel () {
      this.$emit('cancel', 'false')
    }
  }
}
</script>

<style scoped lang="scss">
  .page {
    height: 100%;
    padding-top: 0.7rem;
    .addPageContent {
      height: 100%;
      .ivu-tabs {
        height: 100% !important;
      }
    }
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
    .info {
      height: 100%;
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
            padding: 5px 1%;
            background: #fff;
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
      .save {
        margin-top: 10px;
      }
    }
  }
</style>
