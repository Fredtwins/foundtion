<template>
  <div class="addressee">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置 ：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>日常办公</BreadcrumbItem>
        <BreadcrumbItem>公文收发</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="button-default">
      <div class="button">
        <Button @click="deleteBtn" style="padding-left:18px">
          <Icon type="android-delete" style="fontSize:18px;position: absolute;left: 5px;top: 5px;"></Icon>删除
        </Button>
        <Button @click="addressee" :class="{'active':addresseeClass}">收文</Button>
        <Button @click="hasSend" :class="{'active':hasSendClass}">已发送</Button>
        <Button @click="drafBox" :class="{'active':drafClass}">草稿</Button>
      </div>
      <div class="post-document">
        <Button type="info" @click="postBtn">发公文</Button>
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
    <div class="page">
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <div class="postPage" v-if="postPageShow">
      <post-document
        :status="status"
        :model="formItem"
        @circulated="circulated"
        @send="send"
        @cancel="cancel"
        @draft="draft"
      ></post-document>
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
  </div>
</template>

<script>
import { addresseeThead, draftThead } from 'common/js/table'
import { addresseeApi, addresseeGetApi } from 'api/daily-office'
import { successNotice, errorNotice, getLocalStorage } from 'common/js/dom'
import postDocument from './post'
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['STATUS', 'ID'])
  },
  watch: {
    STATUS: {
      handler: function (val, oldval) {
        if (val === false) {
          this.postPageShow = false
        }
      }
    }
  },
  components: {
    postDocument
  },
  data () {
    return {
      addresseeClass: true,
      hasSendClass: false,
      drafClass: false,
      sureDelete: false,
      postObj: {
        page: 1,
        pageSize: 10,
        searchValue: {},
        order: {
          _id: -1
        }
      },
      formItem: {},
      postPageShow: false,
      total: 0,
      tableThead: addresseeThead(this),
      tableTbody: [],
      loading: false,
      postDocument: false,
      _ids: [],
      status: '收文',
      currentStatus: '收文',
      apiType: 'list'

    }
  },
  created () {
    this.getReceiveList()
    if (this.ID) {
      this.postPageShow = true
      this.formItem = this.ID
    }
  },
  methods: {
    // 收文列表
    getReceiveList () {
      this.loading = true
      this.postObj.searchValue = {
        status: '发布',
        department_code: getLocalStorage('info').department_code
      }
      addresseeGetApi(this.postObj).then(res => {
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
    // 点击新增页传阅
    circulated () {
      this.apiType = 'edit'
    },
    // 点击草稿
    drafBox () {
      this.drafClass = true
      this.hasSendClass = false
      this.addresseeClass = false
      this.status = '草稿'
      this.currentStatus = '草稿'
      this.tableThead = draftThead(this)
      this.getDraftList()
    },
    // 点击收文
    addressee () {
      this.drafClass = false
      this.hasSendClass = false
      this.addresseeClass = true
      this.status = '收文'
      this.currentStatus = '收文'
      this.tableThead = addresseeThead(this)
      this.getReceiveList()
    },
    // 点击已发送
    hasSend () {
      this.drafClass = false
      this.hasSendClass = true
      this.addresseeClass = false
      this.status = '已发送'
      this.currentStatus = '已发送'
      this.tableThead = draftThead(this)
      this.getList()
    },
    // 获取所有草稿状态的数据
    getDraftList () {
      this.loading = true
      this.postObj.searchValue = {
        status: '草稿'
      }
      addresseeApi('list', this.postObj).then(res => {
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
    // 获取所有发送出去的数据
    getList () {
      this.loading = true
      this.postObj.searchValue = {
        status: '发布',
        releaseby: getLocalStorage('info').username
      }
      addresseeApi('list', this.postObj).then(res => {
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
    // 点击删除按钮
    deleteBtn () {
      this.sureDelete = true
    },
    selectedChange (selection) {
      this._ids = []
      selection.map(item => {
        this._ids.push(item._id)
      })
    },
    pageChange () { },
    // 确认删除
    sureDdels () {
      this.sureDelete = false
      addresseeApi('delete', { _ids: this._ids.join(',') }).then(res => {
        if (res.code === '0000') {
          successNotice('删除成功')
          this.getList()
        } else {
          successNotice('删除失败')
        }
      })
      if (this.status === '草稿') {
        this.getDraftList()
      } else if (this.status === '已发送') {
        this.getList()
      } else {
        this.getReceiveList()
      }
    },
    // 点击发公文
    postBtn () {
      this.SET_STATUS(true)
      this.status = '草稿'
      this.apiType = 'new'
      this.formItem = {}
      this.postPageShow = true
    },
    ...mapMutations(['SET_STATUS', 'SET_ID']),
    details (obj) {
      let name = getLocalStorage('info').username
      // 判断状态
      if (this.currentStatus === '草稿') {
        this.status = '草稿'
      } else if (this.currentStatus === '已发送') {
        this.status = '已发送'
      } else {
        this.status = '收文'
      }
      this.SET_STATUS(true)
      this.postPageShow = true
      this.formItem = obj
      let index = obj.receiveby.findIndex(items => items === name)
      if (index === -1) {
        obj.receiveby.push(name)
        addresseeApi('edit', obj).then(res => {
          if (res.code === '0000') {
          }
        })
      }
    },
    // 确定发送
    send (obj) {
      addresseeApi(this.apiType, obj).then(res => {
        if (res.code === '0000') {
          this.postPageShow = false
          successNotice('发布成功')
          this.getList()
        }
      })
    },
    // 点击取消
    cancel () {
      this.postPageShow = false
      this.SET_ID(false)
    },
    // 存为草稿
    draft (obj) {
      addresseeApi('new', obj).then(res => {
        if (res.code === '0000') {
          this.postPageShow = false
          successNotice('已成功存为草稿')
          this.getList()
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
    .addressee {
        .active{
            background: #224ca5 !important;
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
            margin-bottom: 10px;
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
        .postPage {
            padding: 0 10px;
            z-index: 999;
            height: 100%;
            width: 100%;
            background: #fff;
            position: absolute;
            top: 0;
            left: 0;
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
