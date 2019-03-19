<template>
  <div class="general clear">
    <div class="loading" v-if="loadingShow">
      <command-loading></command-loading>
    </div>
    <!-- 基础信息 -->
    <div class="insertInfo">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate">
        <table class="ed-table disabled-color">
          <tbody>
            <tr>
              <td class="ed-label">
                <span class="font-color">*</span>预案名称
              </td>
              <td class="ed-content">
                <FormItem style="margin:0" prop="plan_name">
                  <Input
                    v-model="formItem.plan_name"
                    placeholder="请输入"
                    :disabled="formDisabled"
                    style="width:80%"
                  ></Input>
                </FormItem>
              </td>
              <td class="ed-label">
                <span class="font-color">*</span>预案类型
              </td>
              <td class="ed-content" colspan="5">
                <FormItem style="margin: 0" prop="plan_type">
                  <Select
                    v-model="formItem.plan_type"
                    :disabled="formDisabled"
                    placeholder="请选择"
                    style="width:200px"
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
                <span class="font-color">*</span>执行部门（全称）
              </td>
              <td class="ed-content">
                <FormItem style="margin:0" prop="department_fullname">
                  <Select
                    v-if="!selectShow"
                    :disabled="formDisabled"
                    :label="formItem.department_fullname"
                    not-found-text="无匹配部门，请重新输入"
                    v-model="formItem.department_fullname"
                    filterable
                    remote
                    :remote-method="autoSearch"
                    :loading="selectLoading"
                    style="width:200px"
                    @on-change="selected"
                  >
                    <Option
                      v-for="(option, index) in autoCompleteData"
                      :value="option.value"
                      :key="index"
                    >{{option.label}}</Option>
                  </Select>
                  <Select
                    v-if="selectShow"
                    clearable
                    :label="formItem.department_fullname"
                    @on-change="selected"
                    v-model="formItem.department_fullname"
                    style="width:80%"
                  >
                    <Option
                      v-for="(option, index) in depList"
                      :value="option.value"
                      :key="index"
                    >{{option.label}}</Option>
                  </Select>
                </FormItem>
              </td>
              <td class="ed-label">执行部门（简称）</td>
              <td class="ed-content" colspan="5">
                <FormItem style="margin:0">
                  <Input
                    readonly
                    v-model="formItem.department_name"
                    placeholder="请输入"
                    :disabled="formDisabled"
                    style="width:200px"
                  ></Input>
                </FormItem>
              </td>
            </tr>
            <tr v-if="name==='erp'">
              <td class="ed-label">总则</td>
              <td class="ed-content" colspan="5">
                <FormItem style="margin:0;padding-top:5px" v-if="name==='erp'">
                  <Input
                    v-model="formItem.principle"
                    type="textarea"
                    :rows="10"
                    placeholder="请输入"
                    :disabled="formDisabled"
                  ></Input>
                  <!-- <textarea placeholder="请输入" v-model='formItem.principle' name="" id="" autofocus></textarea> -->
                </FormItem>
              </td>
            </tr>
            <tr v-if="name==='comp' || name === 'top'">
              <td class="ed-label">基本情况</td>
              <td class="ed-content" colspan="5">
                <FormItem style="margin:0;padding-top:5px">
                  <Input
                    v-model="formItem.general_situation"
                    type="textarea"
                    :rows="10"
                    placeholder="请输入"
                    :disabled="formDisabled"
                  ></Input>
                  <!-- <textarea v-model='formItem.general_situation' name="" id="" autofocus></textarea> -->
                </FormItem>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </div>
    <div class="save pull-right">
      <Button
        type="primary"
        size="large"
        @click="saveBtn('formItem')"
        style="margin-right:15px"
        v-if="isshow"
      >保存</Button>
      <Button type="ghost" size="large" @click="cancel">关闭</Button>
    </div>
    <!--确认保存  -->
    <Modal v-model="sure_save" width="360">
      <p slot="header" style="font-size:18px;text-align:center">
        <Icon type="help-circled"></Icon>
        <span>保存</span>
      </p>
      <div style="text-align:center">
        <p>
          保存并返回部门预案请选择
          <span style="color: blue">保存并返回</span>,继续向下操作请点击
          <span style="color: red">完善信息</span>
        </p>
      </div>
      <div slot="footer">
        <Button type="ghost" size="small" @click="save">保存并返回</Button>
        <Button type="primary" size="small" @click="goOn">完善信息</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getLocalStorage, senActive, getSessionStorage, successNotice, errorNotice, warningNotice } from 'common/js/dom'
import { getdepList, addDep, updateDep } from 'api/plan_management'
import { filterDepartment, initTime } from 'common/js/util'
import { depPlan } from 'common/js/rules'
import { getDepList } from 'api/bumenlist'
import CommandLoading from 'base/loading/command-loading'

export default {
  components: {
    CommandLoading
  },
  data () {
    return {
      loadingShow: true,
      selectShow: false,
      selectLoading: false,
      name: '',
      isshow: true,
      readOnly: false,
      sure_save: false,
      formItem: {},
      ruleValidate: depPlan,
      formDisabled: false,
      id: '',
      depList: [],
      autoCompleteData: [],
      postObj: {
        'page': 1,
        'pageSize': 10,
        'searchValue': {},
        'order': {
          _id: -1
        }
      }
    }
  },
  created () {
    this.id = getLocalStorage('id')
    var pObj = { _id: this.id }
    this.postObj.searchValue = pObj
    this._getPlanList()
    if (getLocalStorage('status') === 'details') {
      this.formDisabled = true
      this.isshow = false
    }
    if (getSessionStorage('name') === 'erp') {
      this.name = 'erp'
    } else if (getSessionStorage('name') === 'comp') {
      this.name = 'comp'
    } else if (getSessionStorage('name') === 'top') {
      this.name = 'top'
    }
    this._getDepList()
    if (getLocalStorage('info').department_code !== '0101') {
      this.selectShow = true
    } else {
      this.selectShow = false
    }
  },
  methods: {
    // 选择执行部门
    selected (value) {
      if (this.depList.length > 0) {
        let index = this.depList.findIndex(item => value === item.department_fullname)
        this.formItem.department_name = this.depList[index].department_name
        this.formItem.department_level = this.depList[index].department_level
        this.formItem.department_code = this.depList[index].department_code
      }
    },
    autoSearch (query) {
      if (query !== '') {
        this.selectLoading = true
        setTimeout(() => {
          this.selectLoading = false
          this.autoCompleteData = this.depList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        this.autoCompleteData = []
      }
    },
    _getDepList () {
      let departmentName = getLocalStorage('info').department_name
      let DepartmentCode = getLocalStorage('info').department_code
      let departmentLevel = getLocalStorage('info').department_level
      getDepList().then(res => {
        this.departmentInfo = res.result.result
        if (DepartmentCode !== '0101') {
          this.depList = filterDepartment(this.departmentInfo, departmentName, departmentLevel, DepartmentCode)
          this.depList = this.depList.map(item => {
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
          this.depList = res.result.result.map(item => {
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
    cancel () {
      // let path = getLocalStorage('formPath')
      if (getSessionStorage('name') === 'erp') {
        this.$router.push('/home/threeBusiness/threeBusinessDefault')
      } else if (getSessionStorage('name') === 'comp') {
        this.$router.push('/home/threeBusiness/threeBusinessCommunity')
        this.formItem.plan_category = '社区预案'
      } else if (getSessionStorage('name') === 'top') {
        this.$router.push('/home/threeBusiness/threeBusinessTopic')
        this.formItem.plan_category = '专题预案'
      }
      if (getLocalStorage('cebian') === '1-4') {
        this.$router.push('/home/threeBusiness/threeBusinessApproval')
      }
    },
    _getPlanList () {
      getdepList(this.postObj).then(res => {
        this.loadingShow = false
        if (res.code === '0000') {
          this.formItem = res.result.result[0]
        }
      })
    },
    goOn () {
      senActive(1)
      if (getLocalStorage('status') === 'edit') {
        updateDep(this.formItem).then(res => {
          if (res.code === '0000') {
            this.$router.push('/home/threeBusiness/er_plan/organization')
          } else if (res.code === '0001') {
            this.sure_save = false
            warningNotice(res.message, true)
          } else {
            errorNotice(res.message, true)
          }
        })
      } else {
        this.formItem.status = '草稿'
        let year = new Date()
        this.formItem.plan_year = year.getFullYear()
        this.formItem.createdt = initTime()
        addDep(this.formItem).then(res => {
          console.log(this.formItem)
          if (res.code === '0000') {
            getLocalStorage('id', res.result._id)
            getLocalStorage('plannoadd', res.result.plan_no)
            getLocalStorage('plannameage', res.result.plan_name)
            this.$router.push('/home/threeBusiness/er_plan/organization')
          } else if (res.code === '0001') {
            this.sure_save = false
            warningNotice(res.message)
          } else {
            errorNotice(res.message, true)
          }
        })
      }
    },
    saveBtn (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.formItem.createby = getLocalStorage('info').username
          if (getSessionStorage('name') === 'erp') {
            this.formItem.plan_category = '部门预案'
          } else if (getSessionStorage('name') === 'comp') {
            this.formItem.plan_category = '社区预案'
          } else if (getSessionStorage('name') === 'top') {
            this.formItem.plan_category = '专题预案'
          }
          this.sure_save = true
        }
      })
    },
    save () {
      if (getSessionStorage('name') === 'erp') {
        this.name = 'erp'
        if (getLocalStorage('status') === 'edit') {
          updateDep(this.formItem).then(res => {
            if (res.code === '0000') {
              this.$router.push('/home/threeBusiness/threeBusinessDefault')
              successNotice(res.message)
            } else if (res.code === '0001') {
              this.sure_save = false
              warningNotice(res.message, true)
            } else {
              errorNotice(res.message, true)
            }
          })
        } else {
          this.formItem.status = '草稿'
          let year = new Date()
          this.formItem.plan_year = year.getFullYear()
          this.formItem.createdt = initTime()
          addDep(this.formItem).then(res => {
            if (res.code === '0000') {
              this.$router.push('/home/threeBusiness/threeBusinessDefault')
              successNotice(res.message)
            } else if (res.code === '0001') {
              this.sure_save = false
              warningNotice(res.message, true)
            } else {
              errorNotice(res.message, true)
            }
          })
        }
      } else if (getSessionStorage('name') === 'comp') {
        this.name = 'comp'
        if (getLocalStorage('status') === 'edit') {
          updateDep(this.formItem).then(res => {
            if (res.code === '0000') {
              this.$router.push('/home/threeBusiness/threeBusinessCommunity')
              successNotice(res.message)
            } else if (res.code === '0001') {
              this.sure_save = false
              warningNotice(res.message, true)
            } else {
              errorNotice(res.message, true)
            }
          })
        } else {
          this.formItem.status = '草稿'
          let year = new Date()
          this.formItem.plan_year = year.getFullYear()
          this.formItem.createdt = initTime()
          addDep(this.formItem).then(res => {
            if (res.code === '0000') {
              this.$router.push('/home/threeBusiness/threeBusinessCommunity')
              successNotice(res.message)
            } else if (res.code === '0001') {
              this.sure_save = false
              warningNotice(res.message, true)
            } else {
              errorNotice(res.message, true)
            }
          })
        }
      } else if (getSessionStorage('name') === 'top') {
        this.name = 'top'
        if (getLocalStorage('status') === 'edit') {
          updateDep(this.formItem).then(res => {
            if (res.code === '0000') {
              this.$router.push('/home/threeBusiness/threeBusinessTopic')
              successNotice(res.message)
            } else if (res.code === '0001') {
              this.sure_save = false
              warningNotice(res.message, true)
            } else {
              errorNotice(res.message, true)
            }
          })
        } else {
          this.formItem.status = '草稿'
          let year = new Date()
          this.formItem.plan_year = year.getFullYear()
          this.formItem.createdt = initTime()
          addDep(this.formItem).then(res => {
            if (res.code === '0000') {
              this.$router.push('/home/threeBusiness/threeBusinessTopic')
              successNotice(res.message)
            } else if (res.code === '0001') {
              this.sure_save = false
              warningNotice(res.message, true)
            } else {
              errorNotice(res.message, true)
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .general {
    // height: 100%;
    .erp_title {
        font-size: 20px;
        color: #303030;
        font-weight: bold;
        text-align: center;
    }
    textarea {
        width: 100%;
        height: 300px;
        line-height: 20px;
        padding-top: 5;
        padding-left: 5px;
        overflow: auto;
        border: 1px solid #dddee1;
    }
    .general_content {
        width: 95%;
        height: 290px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 0 auto;

    }
    .insertInfo {
      width: 100%;
      .ed-table {
        width: 100%;
        tr {
          height: 0.5rem;
          .ed-label {
            width: 150px;
            background: #f6f6f6;
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
    }
    .save {
      margin: 20px;
      margin-right: 0;
    }
  }
</style>
