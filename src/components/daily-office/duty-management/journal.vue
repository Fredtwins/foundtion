<template>
  <div class="journal">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>日常办公</BreadcrumbItem>
        <BreadcrumbItem>值班管理</BreadcrumbItem>
        <BreadcrumbItem>值班日志</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">部门名称</span>
      <Input
        placeholder="请输入"
        v-model="searchVal.department_fullname"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      ></Input>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <div class="add pull-right" @click="add">
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
      <Form ref="formItem" :model="formItem" :rules="ruleValidate">
        <table class="ed-table disabled-color">
          <tbody>
            <tr>
              <td class="ed-label">
                <span class="font-color">*</span>部门名称
              </td>
              <td class="ed-content">
                <FormItem style="margin:0" prop="department_fullname">
                  <Select
                    :label="formItem.department_fullname"
                    not-found-text="无匹配部门，请重新输入"
                    v-model="formItem.department_fullname"
                    filterable
                    remote
                    :remote-method="autoSearch"
                    :loading="selectLoading"
                    @on-change="selected"
                  >
                    <Option
                      v-for="(option, index) in autoCompleteData"
                      :value="option.value"
                      :key="index"
                    >{{option.label}}</Option>
                  </Select>
                </FormItem>
              </td>
              <td class="ed-label">
                <span class="font-color">*</span>部门简称
              </td>
              <td class="ed-content">
                <FormItem style="margin:0" prop="department_name">
                  <Input
                    readonly
                    v-model="formItem.department_name"
                    placeholder="请输入"
                    :disabled="formDisabled"
                    style="width:80%"
                  ></Input>
                </FormItem>
              </td>
              <td class="ed-label">
                <span class="font-color">*</span>部门编号
              </td>
              <td class="ed-content">
                <FormItem style="margin:0" prop="department_code">
                  <Input
                    readonly
                    v-model="formItem.department_code"
                    placeholder="请输入"
                    :disabled="formDisabled"
                    style="width:80%"
                  ></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td class="ed-label">
                <span class="font-color">*</span>值班时段
              </td>
              <td class="ed-content">
                <FormItem style="margin: 0" prop="duty_period">
                  <Input
                    v-model="formItem.duty_period"
                    placeholder="请输入"
                    :disabled="formDisabled"
                    style="width:80%"
                  ></Input>
                </FormItem>
              </td>
              <td class="ed-label">
                <span class="font-color">*</span>值班人员
              </td>
              <td class="ed-content" colspan="3">
                <FormItem style="margin: 0" prop="name_list">
                  <Select v-model="formItem.name_list" multiple style="width:80%">
                    <Option
                      v-for="item in nameList"
                      :value="JSON.stringify(item)"
                      :key="item.name"
                    >{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td class="ed-label">记录事件</td>
              <td class="ed-content" colspan="5">
                <FormItem style="margin:0" prop="problem_list">
                  <Input
                    :disabled="formDisabled"
                    v-for="(item,index) in formItem.duty_log"
                    :key="index"
                    v-model="item.log"
                    placeholder="请输入"
                    style="width: 80%"
                  ></Input>
                  <span class="more" @click="addInput">
                    <Icon type="plus-round"></Icon>
                  </span>
                  <span class="more" v-if="formItem.duty_log.length!==0" @click="deleteInput">
                    <Icon type="minus-round"></Icon>
                  </span>
                </FormItem>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      <div class="save pull-right">
        <Button type="primary" size="large" @click="save('formItem')" style="margin-right:15px">保存</Button>
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
import { journalThead } from 'common/js/table'
import { mapGetters, mapMutations } from 'vuex'
import { journalRules } from 'common/js/rules'
import { successNotice, errorNotice } from 'common/js/dom'
import { getDepList } from 'api/bumenlist'
import { journalApi, addressBookApi } from 'api/daily-office'
import { getUserIng, likeStrSearch, cloneObj, initTime } from 'common/js/util'

export default {
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
      formItem: {},
      postObj: {
        order: { _id: -1 },
        page: 1,
        pageSize: 10,
        searchValue: {}
      },
      formDisabled: false,
      tableThead: journalThead(this),
      ruleValidate: journalRules,
      tableTbody: [],
      total: 0,
      searchVal: {},
      loading: false,
      sure_del: false,
      addPageShow: false,
      departmentList: [],
      autoCompleteData: [],
      selectLoading: false,
      apiType: 'list',
      id: '',
      nameList: []
    }
  },
  created () {
    this._getDepList()
    this.getList()
    this.getAddressBook()
  },
  methods: {
    deleteInput () {
      this.formItem.duty_log.pop()
    },
    addInput () {
      this.formItem.duty_log.push({ log: '' })
    },
    getList () {
      this.loading = true
      journalApi('list', this.postObj).then(res => {
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
            this.loading = false
          } else {
            errorNotice(res.message, true)
          }
        } else {
          errorNotice(res.message, true)
        }
      })
    },
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.postObj.searchValue = cloneObj(this.searchVal)
      if (this.searchVal.department_fullname) {
        this.postObj.searchValue.department_fullname = likeStrSearch(this.searchVal.department_fullname)
      }
      this.getList()
    },
    add () {
      this.SET_STATUS(true)
      this.addPageShow = true
      this.formItem = {
        duty_log: [],
        name_list: []
      }
      this.apiType = 'new'
    },
    edit (obj) {
      this.SET_STATUS(true)
      this.apiType = 'edit'
      this.addPageShow = true
      this.formItem = obj
    },
    delete (obj) {
      this.sure_del = true
      this.id = obj._id
    },
    dels () {
      journalApi('delete', { _id: this.id }).then(res => {
        if (res.code === '0000') {
          successNotice(res.message)
          this.getList()
          this.sure_del = false
        } else {
          errorNotice(res.message)
        }
      })
    },
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    save (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.apiType === 'new') {
            this.formItem.creatdt = initTime()
          }
          journalApi(this.apiType, this.formItem).then(res => {
            if (res.code === '0000') {
              successNotice(res.message)
              this.addPageShow = false
              this.getList()
            } else {
              errorNotice(res.message, true)
            }
          })
        }
      })
    },
    ...mapMutations(['SET_STATUS']),
    cancel () {
      this.addPageShow = false
    },
    selected (value) {
      if (value) {
        let index = this.departmentList.findIndex(item => value === item.department_fullname)
        this.formItem.department_name = this.departmentList[index].department_name
        this.formItem.department_fullname = this.departmentList[index].department_fullname
        this.formItem.department_code = this.departmentList[index].department_code
        this.formItem.department_level = this.departmentList[index].department_level
        // this.name = this.departmentList[index].department_name
      }
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
    // 获取全部部门信息
    _getDepList () {
      getDepList().then(res => {
        if (res.code === '0000') {
          this.departmentInfo = res.result.result
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
    // 获取所有通讯录数据
    getAddressBook () {
      this.loading = true
      let obj = {
        searchValue: {
          department_code: getUserIng().department_code
        }
      }
      addressBookApi('list', obj).then(res => {
        if (res.code === '0000') {
          this.nameList = []
          res.result.result.map(item => {
            this.nameList.push({
              name: item.name,
              telephone: item.telephoe
            })
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .journal {
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
