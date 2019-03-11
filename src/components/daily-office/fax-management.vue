<template>
  <div class="fax-managemnet">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>日常办公</BreadcrumbItem>
        <BreadcrumbItem>传真管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="button-default">
      <div class="button">
        <Button @click="deleteBtn" style="padding-left:18px">
          <Icon type="android-delete" style="fontSize:18px;position: absolute;left: 5px;top: 5px;"></Icon>删除
        </Button>
        <Button @click="hasSend" :class="{'active':hasSendClass}">待发送</Button>
        <Button @click="addressee" :class="{'active':addresseeClass}">已接收</Button>
        <Button @click="drafBox" :class="{'active':drafClass}">已发送</Button>
      </div>
      <div class="post-document">
        <!-- <Button type="success" @click="post" v-if="postShow">发送</Button> -->
        <Button type="info" @click="add">添加传真</Button>
      </div>
    </div>
    <div class="table">
      <Table
        @on-selection-change="selectedChange"
        :loading="loading"
        ref="selection"
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
      <div class="title">
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>日常办公</BreadcrumbItem>
          <BreadcrumbItem>传真管理</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Form ref="formItem" :model="formItem" :rules="ruleValidate">
        <table class="ed-table disabled-color">
          <tbody>
            <tr>
              <td class="ed-label">
                <span class="font-color">*</span>类型
              </td>
              <td class="ed-content">
                <FormItem style="margin:0" prop="type">
                  <Input
                    v-model="formItem.type"
                    placeholder="请输入"
                    :disabled="formDisabled"
                    style="width:80%"
                  ></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td class="ed-label">
                <span class="font-color">*</span>内容
              </td>
              <td class="ed-content" colspan="5">
                <FormItem style="margin: 0" prop="content">
                  <Input
                    v-model="formItem.content"
                    type="textarea"
                    :rows="8"
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
        <Button type="primary" size="large" @click="save('formItem')" style="margin-right:15px">存为草稿</Button>
        <Button type="ghost" size="large" @click="cancel">关闭</Button>
      </div>
    </div>
    <!--确认删除  -->
    <Modal v-model="sureDelete" width="360">
      <p slot="header" style="color:red;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除</span>
      </p>
      <div style="text-align:center">
        <p>确认删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="sureDdels">确认</Button>
      </div>
    </Modal>
    <Modal v-model="sureSend" width="360">
      <p>请选择发送人</p>
      <div style="margin-top:10px">
        <p>
          <RadioGroup v-model="formItem.receive_phonenumber">
            <Radio
              v-for="item in userList"
              :label="JSON.stringify(item)"
              :key="item.realname"
            >{{item.realname}}</Radio>
          </RadioGroup>
        </p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="sendOk">确认发送</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { faxThead } from 'common/js/table'
import { faxRules } from 'common/js/rules'
import { successNotice, errorNotice } from 'common/js/dom'
import { mapGetters, mapMutations } from 'vuex'
import { faxApi } from 'api/daily-office'
import { getUserIng, initTime } from 'common/js/util'
import { getAllList } from 'api/usermanage'

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
      sureSend: false,
      postShow: true,
      addresseeClass: false,
      hasSendClass: true,
      drafClass: false,
      formItem: {},
      ruleValidate: faxRules,
      formDisabled: false,
      sureDelete: false,
      loading: false,
      tableThead: faxThead(this),
      tableTbody: [],
      total: 0,
      addPageShow: false,
      postObj: {
        order: { _id: -1 },
        page: 1,
        pageSize: 10,
        searchValue: {
          status: '待发'
        }
      },
      apiType: 'list',
      id: '',
      ids: [],
      userList: []
    }
  },
  created () {
    this.getList()
    this.getReceive()
  },
  methods: {
    // 确认发送
    sendOk () {
      if (this.formItem.receive_phonenumber) {
        this.formItem.receive_phonenumber = JSON.parse(this.formItem.receive_phonenumber).mobile
        faxApi('edit', { status: '已发', receive_phonenumber: this.formItem.receive_phonenumber, _id: this.id }).then(res => {
          if (res.code === '0000') {
            successNotice('发送成功')
            this.getList()
          } else {
            errorNotice(res.message, true)
          }
        })
      } else {
        errorNotice('请选择一人进行发送', true)
      }
    },
    getList () {
      this.loading = true
      faxApi('list', this.postObj).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
          }
        } else {
          errorNotice('服务器未连接， ')
        }
      })
    },
    // 发送
    post (dataObj) {
      this.sureSend = true
      this.id = dataObj._id
    },
    add () {
      this.SET_STATUS(true)
      this.addPageShow = true
      this.formItem = {
        status: '待发'
      }
      this.apiType = 'new'
    },
    edit (obj) {
      this.SET_STATUS(true)
      this.addPageShow = true
      this.formItem = obj
      this.apiType = 'edit'
    },
    delete (obj) {
      this.sureDelete = true
      this.id = obj._id
    },
    selectedChange (section) {
      if (section && section.length) {
        this.ids = []
        section.map(item => {
          this.ids.push(item._id)
        })
      }
    },
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    sureDdels () {
      this.sureDelete = false
      let obj = {}
      if (this.ids && this.ids.length) {
        obj = { _ids: this.ids.join() }
      } else {
        obj = { _id: this.id }
      }
      faxApi('delete', obj).then(res => {
        if (res.code === '0000') {
          successNotice(res.message)
          this.getList()
        } else {
          errorNotice(res.message, true)
        }
      })
    },
    ...mapMutations(['SET_STATUS']),
    deleteBtn () {
      this.sureDelete = true
    },
    addressee () {
      this.postShow = false
      this.addresseeClass = true
      this.hasSendClass = false
      this.drafClass = false
      this.postObj.searchValue = {
        receive_phonenumber: getUserIng().mobile
      }
      this.getList()
    },
    hasSend () {
      this.postShow = true
      this.hasSendClass = true
      this.addresseeClass = false
      this.drafClass = false
      this.postObj.searchValue = {
        status: '待发'
      }
      this.getList()
    },
    drafBox () {
      this.postShow = false
      this.drafClass = true
      this.addresseeClass = false
      this.hasSendClass = false
      this.postObj.searchValue = {
        status: '已发'
      }
      this.getList()
    },
    save (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.apiType === 'new') {
            this.formItem.status = '待发'
            this.formItem.send_phonenumber = getUserIng().mobile
            this.formItem.sender = getUserIng().username
            this.formItem.senddt = initTime()
          }
          faxApi(this.apiType, this.formItem).then(res => {
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
    cancel () {
      this.addPageShow = false
    },
    getReceive () {
      getAllList(getUserIng().department_code).then(res => {
        if (res.code === '0000') {
          this.userList = []
          res.result.result.map(item => {
            this.userList.push({
              realname: item.realname,
              mobile: item.mobile
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .fax-managemnet {
      .active {
        background: #57c5f7 !important;
        color: #fff !important;
      }
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
      .button-default {
          position: relative;
          display: flex;
          height: 32px;
          margin-bottom: 10px;
          .button {
              display: flex;
              border-radius: 5px;
              overflow: hidden;
              border: 1px solid #2d8cf0;
              >button {
                  border-radius: 0;
                  background-color: #fff;
                  color: #2d8cf0;
                  border: none;
                  border-right: 1px solid #2d8cf0
              }
              >button:last-child {
                  border: none;
              }
              button:hover {
                  color: rgba(59, 140, 255, .5);
              }
          }
          >button {
              margin-right: 10px;
          }
          .post-document {
              position: absolute;
              right: 0;
          }
      }
      .addPage {
          padding: 0 10px;
          padding-top: 60px;
          z-index: 3;
          height: 100%;
          width: 100%;
          background: #fff;
          position: absolute;
          top: 0;
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
      .buttons {
          display: flex;
          margin-bottom: 10px;
          >div:nth-child(2) {
              display: flex;
              margin: 0 10px;
              border-radius: 5px;
              overflow: hidden;
              button {
                  border-radius: 0;
              }
          }
      }
  }
</style>
