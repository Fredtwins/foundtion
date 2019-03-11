<template>
  <div class="alerts-mag">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>日常办公</BreadcrumbItem>
        <BreadcrumbItem>快讯管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="button-default">
      <div class="button">
        <Button @click="drafBox" :class="{'active':activeClass}">草稿</Button>
        <Button @click="addressee" :class="{'active':!activeClass}">已发布</Button>
        <Button @click="deleteBtn" style="padding-left:18px">
          <Icon type="android-delete" style="fontSize:18px;position: relative;top: 0.01rem;"></Icon>删除
        </Button>
      </div>
      <div class="post-document">
        <Button type="info" @click="postBtn">发布</Button>
        <Button type="info" @click="editBtn">新建快讯</Button>
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
        border
        :data="tableTbody"
      ></Table>
    </div>
    <div class="page pageStyle pull-right">
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <!-- 编辑快讯 -->
    <div class="postPage" v-if="postPageShow">
      <post-document
        :criType="criType"
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
import { alertsThead } from 'common/js/table'
import postDocument from './alerts-post'
import { alertsApi, alertsAllApi } from 'api/move-management'
import { successNotice, errorNotice } from 'common/js/dom'
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['STATUS'])
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
      activeClass: true,
      postPageShow: false,
      formItem: {},
      sureDelete: false,
      total: 0,
      tableThead: alertsThead(this),
      tableTbody: [],
      loading: false,
      postObj: {
        page: 1,
        pageSize: 10,
        searchValue: {},
        order: {
          _id: -1
        }
      },
      _ids: [],
      status: '草稿',
      criType: 'new'
    }
  },
  created () {
    this.getList('草稿')
  },
  methods: {
    getList (status) {
      this.loading = true
      this.postObj.searchValue = {
        status: status
      }
      alertsApi('list', this.postObj).then(res => {
        this.loading = false
        if (res.code === '0000') {
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    editBtn () {
      this.SET_STATUS(true)
      this.criType = 'new'
      this.postPageShow = true
      this.formItem = {}
    },
    // 点击发布
    postBtn () {
      if (!this._ids) {
        errorNotice('发布失败，请至少选择一条快讯', true)
      } else {
        alertsAllApi(this._ids).then(res => {
          if (res.code === '0000') {
            successNotice('已成功发布')
            this.getList('已发布')
            this.activeClass = false
          } else {
            errorNotice('发布失败')
          }
        })
      }
    },
    // 点击删除
    deleteBtn () {
      if (this._ids && this._ids.length) {
        this.sureDelete = true
      }
    },
    // 点击草稿
    drafBox () {
      this.activeClass = true
      this.status = '草稿'
      this.getList('草稿')
    },
    // 点击已发布
    addressee () {
      this.activeClass = false
      this.status = '已发布'
      this.getList('已发布')
    },
    // 分页
    pageChange (index) {
      this.postObj.pageSize = index
      this.getList(this.status)
    },
    // 确认删除
    sureDdels () {
      let obj = {}
      if (typeof this._ids === 'string') {
        obj = {
          _id: this._ids
        }
      } else {
        obj = {
          _ids: this._ids.join(',')
        }
      }
      alertsApi('delete', obj).then(res => {
        if (res.code === '0000') {
          successNotice('删除成功')
          this.getList(this.status)
          this.sureDelete = false
          this._ids = []
        } else {
          errorNotice(res.message)
        }
      })
    },
    selectedChange (section) {
      this._ids = []
      section.map(item => {
        this._ids.push(item._id)
      })
    },
    details (dataObj) {
      this.SET_STATUS(true)
      this._ids = dataObj._id
      this.sureDelete = true
    },
    ...mapMutations(['SET_STATUS']),
    edit (dataObj) {
      this.SET_STATUS(true)
      this.criType = 'edit'
      this.postPageShow = true
      this.formItem = dataObj
    },
    circulated () { },
    send (obj) {
      alertsApi(this.criType, obj).then(res => {
        if (res.code === '0000') {
          successNotice('发布成功')
          this.getList('已发布')
          this.postPageShow = false
        } else {
          errorNotice(res.message)
        }
      })
    },
    cancel () {
      this.postPageShow = false
      this.formItem = {}
    },
    draft (obj) {
      alertsApi(this.criType, obj).then(res => {
        if (res.code === '0000') {
          if (this.criType === 'edit') {
            successNotice('修改成功')
          } else {
            successNotice('成功存为草稿')
          }
          this.getList('草稿')
          this.postPageShow = false
        } else {
          errorNotice(res.message)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .alerts-mag {
    height: 100%;
    .active{
      background: #57c5f7 !important;
      color: #fff !important;
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
    .button-default {
      position: relative;
      display: flex;
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
        > button:last-child {
          border: none;
        }
        button:hover {
          color: rgba(59, 140, 255, .5);
        }
      }
      > button {
        margin-right: 10px;
      }
      .post-document {
        position: absolute;
        right: 0;
      }
    }
    .postPage {
      padding: 0 10px;
      z-index: 3;
      height: 100%;
      width: 100%;
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
