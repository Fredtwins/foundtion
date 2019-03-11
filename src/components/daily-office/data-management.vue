<template>
  <div class="data-mgr">
    <div class="title" v-if="show || titleShow">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>日常办公</BreadcrumbItem>
        <BreadcrumbItem>资料管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="title" v-if="!titleShow">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>微信公众服务</BreadcrumbItem>
        <BreadcrumbItem>文件管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="view">
      <div :class="{left:show, p20:!show}">
        <div class="left-top">
          <div class="button-default" v-if="show">
            <Upload :action="uploadUrl" :show-upload-list="false" :on-success="uploadBtn">
              <!-- <Button type="ghost" icon="ios-cloud-upload-outline" style="color:#fff;background:#2d8cf0;padding-left:15px">上传</Button> -->
              <Button type="primary" v-if="uploadSure" class="ivubtn">
                <Icon
                  type="android-upload"
                  style="fontSize:18px;position: absolute;left: 5px;top: 5px;"
                ></Icon>上传
              </Button>
            </Upload>
            <Button @click="newBtn">
              <Icon
                type="ios-folder-outline"
                style="fontSize:18px;position: absolute;left: 5px;top: 5px;"
              ></Icon>新建文件夹
            </Button>
            <!-- <Button @click="downloadBtn">
            <Icon type="android-download" style="fontSize:18px;position: absolute;left: 5px;top: 5px;"></Icon> 离线下载</Button>-->
            <div class="operation" v-if="showOperation">
              <Button @click="downloadBtn" v-if="showDownload">
                <Icon
                  type="android-download"
                  style="fontSize:18px;position: absolute;left: 5px;top: 5px;"
                ></Icon>下载
              </Button>
              <div class="line"></div>
              <Button @click="deleteBtn">
                <Icon
                  type="android-delete"
                  style="fontSize:18px;position: absolute;left: 5px;top: 5px;"
                ></Icon>删除
              </Button>
              <div class="line"></div>
              <Button @click="rename" v-if="!showRename">重命名</Button>
            </div>
          </div>
          <div class="file-router">
            <span v-if="!showNav">全部文件</span>
            <div v-if="showNav" style="display:inline-block">
              <!-- <span class="blue cursor" @click="upLevel">返回上一级</span>
              <span>|</span>-->
              <a class="blue" href="javascript:;" @click="allFile">全部文件</a>
              <span class="arrow">></span>
              <span
                v-if="breadcrumbArr.length && index !== breadcrumbArr.length-1"
                v-for="(item,index) in breadcrumbArr"
                ref="daohang"
                :key="index"
                @click="jump(item)"
              >
                <span class="blue cursor">{{item.name}}</span>
                <span class="arrow">></span>
              </span>
              <span>{{lastNav}}</span>
            </div>
            <Button
              v-if="!show && showDownload"
              type="primary"
              class="pull-right t10"
              @click="downloadBtn"
            >
              <Icon type="android-download"></Icon>下载
            </Button>
          </div>
        </div>
        <div class="mask" v-if="showAaaFolder"></div>
        <div class="addFolder" v-if="showAaaFolder">
          <div class="addFolder-content">
            <input class="input" v-model="formItem.refer_name" type="text">
            <span class="box" @click="sureAddFolder">
              <Icon
                type="checkmark-round"
                style="position: absolute;left: 5px;top: 3px;font-size: 14px;"
              ></Icon>
            </span>
            <span class="box" @click="closeAddFolder">
              <Icon
                type="close-round"
                style="position: absolute;left: 5px;top: 3px;font-size: 14px;"
              ></Icon>
            </span>
          </div>
        </div>
        <div class="directory">
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
      </div>
      <div v-show="showNoFile" class="no-file">
        <div class="content">
          <div ref="bgDiv">
            <p>您还没有上传过文件哦，请点击上传按钮~</p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="sureRename" width="360">
      <p slot="header">
        <span>请输入文件名称</span>
      </p>
      <div style="text-align:center">
        <Input placeholder="请输入" v-model="renameArr.refer_name"></Input>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="cancelRename">取消</Button>
        <Button type="info" @click="sureRenameBtn">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { dataMagThead } from 'common/js/table'
import { dataApi, getUrl, downLoad } from 'api/daily-office'
import { getUserIng } from 'common/js/util'
import { successNotice, errorNotice } from 'common/js/dom'

export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    titleShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      uploadSure: true,
      downLoadUrl: '',
      downLoadType: '',
      showDownload: false,
      renameArr: [],
      sureRename: false,
      showNav: false,
      uploadUrl: getUrl(),
      showRename: false,
      lastNav: '',
      breadcrumbArr: [],
      showNoFile: false,
      formItem: {
        refer_name: '',
        department_code: getUserIng().department_code,
        department_name: getUserIng().department_name,
        department_level: getUserIng().department_level,
        parent: '',
        refer_path: '',
        createby: getUserIng().username
      },
      showAaaFolder: false,
      tableTbody: [],
      tableThead: dataMagThead(this),
      loading: false,
      showOperation: false,
      interrupt: false,
      folderLevel: 1,
      parentLevel: 0,
      postObj: {
        order: { _id: -1 },
        searchValue: {
          parent: ''
          // department_code: getUserIng().department_code
        }
      },
      arr: [],
      _ids: [],
      path: []
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    this.$refs.bgDiv.style.backgroundImage = `URL(${Static}img/noFile.png)`
  },
  methods: {
    sureRenameBtn () {
      dataApi('edit', this.renameArr).then(res => {
        if (res.code === '0000') {
          successNotice('修改成功')
          this.sureRename = false
          this.postObj.searchValue.parent = this.renameArr.parent
          this.getList()
        } else {
          errorNotice('修改失败', true)
        }
      })
    },
    cancelRename () {
      this.sureRename = false
    },
    jump (obj) {
      let index = this.breadcrumbArr.findIndex(item => item === obj)
      this.breadcrumbArr = this.breadcrumbArr.slice(0, index + 1)
      this.showNoFile = false
      if (obj.level === 1) {
        this.breadcrumbArr = []
        this.arr = []
        this.showNav = false
        this.postObj.searchValue.parent = ''
      } else {
        this.postObj.searchValue.parent = obj.no
      }
      this.getList()
    },
    // 点击全部文件
    allFile () {
      this.showNoFile = false
      this.showNav = false
      this.postObj.searchValue.parent = ''
      this.getList()
      this.arr = []
      this.breadcrumbArr = []
    },
    // 获取所有文件
    getList () {
      this.loading = true
      if (getUserIng().department_code !== '0101') {
        this.postObj.searchValue.department_code = getUserIng().department_code
      }
      dataApi('list', this.postObj).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            if (!this.tableTbody.length) {
              this.showNoFile = true
            }
          }
        } else {
          errorNotice('服务器未连接，')
        }
      })
    },
    newBtn () {
      this.showAaaFolder = true
      this.showNoFile = false
      this.tableTbody.map(item => {
        if (item.received === '-') {
          this.interrupt = true
        }
      })
      if (this.interrupt) {

      } else {
        this.tableTbody.unshift({
          refer_name: '新建文件夹',
          createdt: '-',
          createby: '-'
        })
      }
    },
    // 上传
    uploadBtn (res) {
      if (res.code === '0000') {
        this.formItem.refer_level = this.parentLevel + 1
        if (!this.formItem.parent) {
          this.formItem.parent = ''
        }
        this.formItem.refer_path = res.result[0].path
        this.formItem.refer_name = res.result[0].filename
        this.formItem.isFolder = false
        dataApi('new', this.formItem).then(res => {
          if (res.code === '0000') {
            this.formItem.refer_name = ''
            this.showAaaFolder = false
            this.interrupt = false
            this.postObj.searchValue.parent = this.formItem.parent
            this.getList()
            successNotice('上传成功')
            this.showNoFile = false
          } else {
            errorNotice('上传失败', true)
          }
        })
      }
    },
    // 删除
    deleteBtn () {
      dataApi('delete', {
        _ids: this._ids.join(',')
      }).then(res => {
        if (res.code === '0000') {
          this.getList()
          successNotice('删除成功')
        } else {
          errorNotice('删除失败')
        }
      })
    },
    // 下载
    downloadBtn () {
      let url = downLoad(this.renameArr.refer_path, this.renameArr.refer_name)
      // let url = `http://192.168.1.138:8080/sanfangstruts/common/download?token=20482667&path=${this.renameArr.refer_path}&fileName=${this.renameArr.refer_name}`
      window.location.href = url
    },
    // 重命名
    rename () {
      this.sureRename = true
    },
    selectedChange (section) {
      if (section.length === 1) {
        this.downLoadUrl = 'http://192.168.1.138:8080/sanfangstruts' + section[0].refer_path
        this.showRename = false
        if (!section[0].isFolder) {
          this.showDownload = true
        } else {
          this.showDownload = false
        }
      } else {
        this.showRename = true
        this.showDownload = false
      }
      this._ids = []
      if (section.length) {
        this.showOperation = true
        this.renameArr = section[0]
      } else {
        this.showOperation = false
      }
      section.map(item => {
        this._ids.push(item._id)
      })
    },
    closeAddFolder () {
      this.formItem.isFolder = false
      this.formItem.refer_name = ''
      this.showAaaFolder = false
      this.interrupt = false
      this.tableTbody.shift()
    },
    sureAddFolder () {
      if (!this.formItem.refer_name.length) {
        this.formItem.refer_name = '新建文件夹'
      }
      this.formItem.refer_level = this.parentLevel + 1
      if (!this.formItem.parent) {
        this.formItem.parent = ''
      }
      this.formItem.isFolder = true
      dataApi('new', this.formItem).then(res => {
        if (res.code === '0000') {
          this.formItem.refer_name = ''
          this.showAaaFolder = false
          this.interrupt = false
          this.getList()
        }
      })
    },
    details (dataObj) {
      if (dataObj.department_code !== getUserIng().department_code) {
        this.uploadSure = false
      } else {
        this.uploadSure = true
      }
      this.showNav = true
      this.breadcrumbArr.push({
        name: dataObj.refer_name,
        level: dataObj.refer_level,
        no: dataObj.refer_no
      })
      this.lastNav = dataObj.refer_name
      this.parentLevel = dataObj.refer_level
      this.formItem.parent = dataObj.refer_no
      this.postObj.searchValue.parent = dataObj.refer_no
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
  .t10 {
    position: relative;
    top: -10px;
  }
  .blue {
    color: #4287ed;
  }

  .cursor {
    cursor: pointer;
  }

  .arrow {
    padding: 0 5px;
    color: #c5d8f3;
  }

  .changeColor {
    color: rgba(59, 140, 255, .5);
  }

  .data-mgr {
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
    .view {
      height: 100%;
      position: relative;
      .left {
        padding-top: 60px;
        height: 100%;
      }
      .p20 {
        padding-top: 20px;
        height: 100%;
      }
      .left-top {
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 999;
      }
      .button-default {
        position: relative;
        right: 0;
        display: flex;
        height: 32px;
        margin-bottom: 10px;
        button {
          margin-right: 10px;
          position: relative;
          padding-left: 23px;
        }
        >.pull-right {
          position: absolute;
          right: 0;
        }
        .operation {
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          border: 1px solid #224ca5;
          .line {
            width: 1px;
            height: 100%;
            background: #224ca5;
          }
          a {
            background-color: #fff;
            margin: 0;
            border-radius: 0;
            color: #2d8cf0;
            border: none;
            width: 62px;
            position: relative;
            line-height: 30px;
            padding-left: 24px;
          }
          button {
            background-color: #fff;
            margin: 0;
            border-radius: 0;
            color: #224ca5;
            border: none;
          }
          button:hover,
          a:hover {
            color: rgba(59, 140, 255, .5);
          }
        }
      }
      .button-default>button:not(:first-child) {
          color: #224ca5;
          border: 1px solid #224ca5;
      }
      .file-router {
          color: #666666;
      }
      .mask {
          height: 36px;
          position: absolute;
          z-index: 4;
          width: 100%;
          padding-left: 60px;
          top: 67px;
      }
      .addFolder {
          height: 40px;
          position: absolute;
          z-index: 4;
          width: 100%;
          padding-left: 60px;
          top: 102px;
          .addFolder-content {
              width: 300px;
              height: 100%;
              line-height: 40px;
              position: absolute;
              left: 60px;
              background: #fff;
              .input {
                  margin: 9px 0;
                  _margin: 7px 0;
                  padding: 0 0 0 5px;
                  width: 200px;
                  height: 24px;
                  vertical-align: middle;
                  border: 1px solid #224ca5;
                  border: 1px solid rgba(58, 140, 255, .3);
                  background: #fff;
                  border-radius: 2px;
              }
              .box {
                  display: inline-block;
                  width: 22px;
                  height: 22px;
                  border: 1px solid rgba(58, 140, 255, 0.3);
                  position: absolute;
                  top: 10px;
                  left: 210px;
                  color: #224ca5;
                  cursor: pointer;
              }
              .box:nth-of-type(2) {
                  left: 240px;
              }
          }
      }
      .directory {
          margin-top: 8px;
          max-height: 500px;
          overflow: auto;
      }
      .no-file {
          height: 100%;
          width: 100%;
          padding-top: 68px;
          position: absolute;
          top: 0;
          /* background: #fff; */
          z-index: 333;
          .content {
              height: 100%;
              background-color: #fff;
              div {
                  width: 280px;
                  height: 200px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%); // background-image: url(../../../static/img/noFile.png);
                  background-repeat: no-repeat;
                  background-position: center top;
                  p {
                      font-size: 14px;
                      color: #666;
                      position: absolute;
                      bottom: 20px;
                      width: 100%;
                      text-align: center;
                  }
              }
          }
      }
    }
  }
  .ivubtn {
    background: #224ca5;
    color: #fff;
  }
</style>
