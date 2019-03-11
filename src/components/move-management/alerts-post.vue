<template>
  <div class="post">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>移动管理</BreadcrumbItem>
        <BreadcrumbItem>快讯管理</BreadcrumbItem>
        <BreadcrumbItem>快讯编辑</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="top">
      <!-- <Button type="primary" v-if="criType==='new'" @click="send">
                <Icon type="paper-airplane"></Icon>
                发布
      </Button>-->
      <Button @click="draft" type="success">{{text}}</Button>
      <Button @click="cancel">取消</Button>
    </div>
    <div class="center">
      <div class="divStyle">
        <span style="color:rgb(30, 107, 223)">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：</span>
        <input type="text" v-model="model.title" placeholder="请输入...">
      </div>
      <div class="fujian divStyle">
        <Upload
          :format="['jpg','jpeg','png']"
          :on-format-error="handleFormatError"
          :on-success="handleSuccess"
          :show-upload-list="false"
          :action="action"
        >
          <Icon style="color: #999" type="android-image"></Icon>
          <span class="addDocument">上传图片</span>
        </Upload>
        <input v-if="filename" v-model="filename">
        <input v-else="filename" v-model="model.picture">
      </div>
      <textarea
        v-model="model.news_content"
        class="textarea"
        name
        id
        cols="30"
        rows="30"
        placeholder="请输入快讯内容..."
      ></textarea>
    </div>
    <div class="bottom">
      <!-- <Button v-if="criType==='new'" type="primary" @click="send">
                <Icon type="paper-airplane"></Icon>
                发布
      </Button>-->
      <Button @click="cancel">取消</Button>
    </div>
  </div>
</template>

<script>
import { url } from 'api/daily-office'
import { getLocalStorage } from 'common/js/dom'
import { initTime } from 'common/js/util'

export default {
  props: {
    model: {
      type: Object,
      default: function () {
        return {}
      }
    },
    criType: {
      type: String,
      default: 'new'
    }
  },
  data () {
    return {
      text: '',
      action: '',
      filename: '',
      visible: false,
      uploadList: [],
      file: {},
      apiType: 'list'
    }
  },
  created () {
    this.action = url()
  },
  mounted () {
    if (this.criType === 'edit') {
      this.text = '确认修改'
    } else {
      this.text = '存草稿'
    }
  },
  methods: {
    // 选择的文件格式不正确
    handleFormatError (file) {
      this.$Notice.warning({
        title: '警告！',
        desc:
                    `文件${file.name}格式不正确，请上传 jpg 、 jpeg 或 png 格式的图片`
      })
    },
    handleSuccess (res, file) {
      this.filename = res.result[0].filename
      this.model.picture = this.filename
      this.model.picture_path = res.result[0].path
    },
    handleUpload (file) {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    },

    // 发布
    send () {
      this.model.status = '已发布'
      this.model.createby = getLocalStorage('info').username
      this.model.createdt = initTime()
      this.model.releasedt = initTime()
      this.model.releaseby = getLocalStorage('info').username
      this.$emit('send', this.model)
    },
    // 存为草稿
    draft () {
      this.model.status = '草稿'
      this.model.createby = getLocalStorage('info').username
      this.model.createdt = initTime()
      this.model.releasedt = ''
      this.model.releaseby = ''
      this.$emit('draft', this.model)
    },
    // 取消
    cancel () {
      this.$emit('cancel', 'false')
    }
  }
}
</script>
<style scoped lang="scss">
  .post {
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
    .top {
      margin-top: 60px;
    }
    .center {
      margin: 10px 0;
      .fujian {
          div {
              display: inline-block;
          }
          .addDocument:hover {
              color: blue;
          }
          .addDocument {
              color: rgb(30, 107, 223);
              cursor: pointer;
          }
          i {
              position: relative;
              top: 2px;
              font-size: 20px;
          }
      }
      .bottom {
        margin-top: 30px;
      }
      .divStyle {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        input {
          height: 30px;
          width: 70%;
          border: none;
        }
      }
      .post-dep {
        position: relative;
        padding: 10px 0 10px 60px;
        border-bottom: 1px solid #ccc;
        .label {
          width: 60px;
          padding-top: 10px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .textarea {
        width: 100%;
        padding: 5px;
        margin-top: 10px;
      }
    }
  }
</style>
