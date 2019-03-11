<template>
  <div class="note-mgr">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置 ：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>日常办公</BreadcrumbItem>
        <BreadcrumbItem>短信管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="button-default">
      <div>
        <div class="button">
          <Button @click="draft" :class="{'active': draftClass}">草稿箱</Button>
          <Button @click="closed" :class="{'active': hasSendClass}">已发送</Button>
        </div>
      </div>
      <div class="pull-right">
        <Button type="primary" @click="addNote">新建短信</Button>
        <Button type="info" @click="noteMass">发送短信</Button>
        <Button v-if="showDelete" type="error" @click="deleteNote">删除短信</Button>
      </div>
    </div>
    <div class="table">
      <Table
        border
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
    <div class="page">
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <Modal v-model="addPageShow" class="modal h300">
      <div slot="header">编辑短信</div>
      <Form :model="formItem" :label-width="70">
        <Form-item label="标题:" prop="title">
          <Input v-model="formItem.title" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="内容：" prop="message_content">
          <textarea
            v-model="formItem.message_content"
            placeholder="请输入短信内容..."
            style="width:80%"
            name
            id
            cols="30"
            rows="5"
          ></textarea>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button @click="cancel">关闭</Button>
        <Button type="primary" @click="ok">保存</Button>
      </div>
    </Modal>
    <!-- 选择收信人 -->
    <Modal class-name="modal h300" v-model="modelShow" title="请选择收信人" @on-ok="send">
      <Tree :data="treeData" show-checkbox @on-check-change="selectAddressBook"></Tree>
    </Modal>
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
    <!-- 详情 -->
    <Modal v-model="detailsShow" class="modal disabled-color">
      <div slot="header">短信详情</div>
      <Form :model="formItem" :label-width="70">
        <Form-item label="标题:" prop="title">
          <Input v-model="formItem.title" placeholder="请输入" disabled></Input>
        </Form-item>
        <Form-item label="内容：" prop="message_content">
          <!-- <textarea  v-model="formItem.message_content" placeholder="请输入短信内容..." style="width:80%" name="" id="" cols="30" rows="5"></textarea> -->
          <!-- <Input v-model="formItem.title" placeholder="请输入"></Input> -->
          <span
            style="display:inline-block;width:100%;height:200px;border:1px solid #ccc"
          >{{formItem.title}}</span>
        </Form-item>
        <Form-item label="收信人" prop="message_content">
          <span
            v-if="formItem.receiver"
            v-for="(item,index) in formItem.receiver"
            :key="index"
          >{{item.name}}</span>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button @click="cancel">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { noteSendThead } from 'common/js/table'
import { initTime } from 'common/js/util'
import { getLocalStorage, successNotice, errorNotice } from 'common/js/dom'
import { getDepList } from 'api/bumenlist'
import { addressBookApi, noteApi } from 'api/daily-office'

export default {
  data () {
    return {
      draftClass: true,
      hasSendClass: false,
      detailsShow: false,
      showDelete: true,
      sureDelete: false,
      treeData: [],
      modelShow: false,
      loading: false,
      tableThead: noteSendThead(this),
      tableTbody: [],
      addPageShow: false,
      total: 0,
      formItem: {},
      departmentList: [],
      addressBookList: [],
      telephoneList: [],
      postObj: {
        order: { _id: -1 },
        page: 1,
        pageSize: 10,
        searchValue: {
          sendby: getLocalStorage('info').username
        }
      },
      apiType: 'list',
      _ids: [],
      status: '草稿',
      noteList: []
    }
  },
  created () {
    this._getDepList()
    this.status = '草稿'
    this.apiType = 'new'
    this.postObj.searchValue = {
      status: '草稿'
    }
    this.getList()
  },
  methods: {
    cancel () {
      this.addPageShow = false
      this.detailsShow = false
    },
    closed () {
      this.hasSendClass = true
      this.draftClass = false
      this.status = '已发送'
      this.showDelete = false
      this.postObj.searchValue = {
        status: '已发送'
      }
      this.getList()
    },
    draft () {
      this.draftClass = true
      this.hasSendClass = false
      this.showDelete = true
      this.status = '草稿'
      this.postObj.searchValue = {
        status: '草稿'
      }
      this.getList()
    },
    getList () {
      this.loading = true
      noteApi('list', this.postObj).then(res => {
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
    selectAddressBook (arr) {
      this.formItem.receiver = []
      this.telephoneList = []
      arr.map(item => {
        if (item.telephone) {
          this.telephoneList.push(item.telephone)
          this.formItem.receiver.push({
            department_name: item.department_name,
            name: item.name,
            telephone: item.telephone
          })
        }
      })
      this.formItem.send_phones = this.telephoneList
    },
    // 获取所有部门信息
    _getDepList () {
      // let code = getLocalStorage('info').department_code
      // let level = getLocalStorage('info').department_level
      getDepList().then(res => {
        if (res.code === '0000') {
          // this.departmentList = this.filterDepartment(res.result.result, code, level)
          let arr = []
          res.result.result.map(item => {
            if (item.code !== '01') {
              arr.push({
                title: item.fullname,
                code: item.code,
                children: [],
                disabled: false
              })
            }
          })
          this.departmentList = arr
          addressBookApi('list').then(res => {
            if (res.code === '0000') {
              this.addressBookList = this.filterAddressBook(res.result.result)
              this.treeData = this.getTreeData(this.departmentList, this.addressBookList)
              this.treeData.map(item => {
                if (!item.children.length) {
                  item.disabled = true
                }
              })
            }
          })
        }
      })
    },
    // 筛选所有下级部门
    filterDepartment (arr, code, level) {
      let newArr = []
      let str = 'level' + level
      arr.map(item => {
        if (item.level === parseInt(level) + 1 && item[str] === code) {
          newArr.push({
            title: item.fullname,
            code: item.code,
            children: [],
            disabled: false
          })
        } else if (item.level === level && item.code === code) {
          newArr.push({
            title: item.fullname,
            code: item.code,
            children: [],
            disabled: false
          })
        }
      })
      return newArr
    },
    // 格式化通讯录格式
    filterAddressBook (arr) {
      let newArr = []
      arr.map(item => {
        newArr.push({
          department_name: item.department_name,
          department_code: item.department_code,
          name: item.name,
          telephone: item.telephoe,
          title: item.name
        })
      })
      return newArr
    },
    // 得到树形控件的数据
    getTreeData (arr1, arr2) {
      arr1.map(item => {
        arr2.map(_item => {
          if (item.code === _item.department_code) {
            item.children.push(_item)
          }
        })
      })
      return arr1
    },
    addNote () {
      this.apiType = 'new'
      this.addPageShow = true
      this.formItem = {}
    },
    // 短信发送
    noteMass () {
      if (this.noteList.length === 1) {
        this.modelShow = true
        this.formItem = this.noteList[0]
      } else if (this.noteList.length === 0) {
        errorNotice('请选择一条短信', true)
      } else {
        errorNotice('抱歉，本系统不支持多条短信群发', true)
      }
    },
    deleteNote () {
      this.sureDelete = true
    },
    selectedChange (section) {
      this._ids = []
      section.map(item => {
        this._ids.push(item._id)
      })
      this.noteList = section
    },
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    // 点击保存
    ok () {
      this.addPageShow = false
      if (this.apiType === 'new') {
        this.formItem.status = '草稿'
        this.formItem.createby = getLocalStorage('info').username
        this.formItem.createdt = initTime()
      }
      noteApi(this.apiType, this.formItem).then(res => {
        if (res.code === '0000') {
          successNotice(res.message)
          if (this.status === '草稿') {
            this.postObj.searchValue = {
              status: '草稿'
            }
          } else {
            this.postObj.searchValue = {
              status: '已发送'
            }
          }
          this.getList()
        } else {
          errorNotice(res.message)
        }
      })
    },
    // 确认发送
    send () {
      this.formItem.status = '已发送'
      this.formItem.sendby = getLocalStorage('info').username
      this.formItem.senddt = initTime()
      noteApi('send', this.formItem).then(res => {
        if (res.code === '0000') {
          this.postObj.searchValue = {
            status: '已发送'
          }
          this.getList()
          successNotice('发送成功')
        } else {
          errorNotice('发送失败')
        }
      })
    },
    sureDdels () {
      let obj = { _ids: this._ids.join(',') }
      noteApi('delete', obj).then(res => {
        this.sureDelete = false
        if (res.code === '0000') {
          successNotice('删除成功')
          this.postObj.searchValue = {
            status: this.status
          }
          this.getList()
        } else {
          errorNotice('删除失败', true)
        }
      })
    },
    edit (dataObj) {
      this.apiType = 'edit'
      this.addPageShow = true
      this.formItem = dataObj
    },
    details (dataObj) {
      this.formItem = dataObj
      this.detailsShow = true
    }
  }
}
</script>
<style scoped lang="scss">
    .note-mgr {
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
            right: 0;
            display: flex;
            height: 32px;
            margin-bottom: 10px;
            .active {
                background: #224ca5 !important;
                color: #fff !important;
            }
            .button {
                display: flex;
                border-radius: 5px;
                overflow: hidden;
                border: 1px solid #224ca5;
                >button {
                    border-radius: 0;
                    background-color: #fff;
                    color: #2d8cf0;
                    border: none;
                    border-right: 1px solid #224ca5
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
            >.pull-right {
                position: absolute;
                right: 0;
            }
        }
    }
</style>
