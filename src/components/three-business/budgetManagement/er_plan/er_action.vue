<template>
  <div class="er_action">
    <div class="loading" v-if="loadingShow">
      <command-loading></command-loading>
    </div>
    <div class="erp_title">应急响应行动</div>
    <div class="general_content">
      <!-- <textarea v-model='textareaVaule' name="" id="" autofocus></textarea> -->
      <div class="textarea">
        <quill-editor v-model="textareaVaule" :options="{placeholder: '请输入'}"></quill-editor>
      </div>
    </div>
    <div class="save pull-right">
      <Button
        type="primary"
        size="large"
        @click="saveBtn"
        v-if="isshow"
        style="margin-right:15px"
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
import { getLocalStorage, senActive, getSessionStorage, errorNotice, warningNotice, successNotice } from 'common/js/dom'
import { getdepList, updateDep } from 'api/plan_management'
import CommandLoading from 'base/loading/command-loading'

export default {
  components: {
    CommandLoading
  },
  data () {
    return {
      loadingShow: true,
      isshow: true,
      sure_save: false,
      textareaVaule: '',
      id: '',
      postObj: {
        'page': 1,
        'pageSize': 10,
        'searchValue': {}
      },
      datalink: ''
    }
  },
  created () {
    this.id = this.id = getLocalStorage('id')
    var pObj = { _id: this.id }
    this.postObj.searchValue = pObj
    this._getPlanList()
    if (getLocalStorage('status') === 'details') {
      this.isshow = false
    }
  },
  methods: {
    cancel () {
      this.$router.push('/home/threeBusiness/threeBusinessDefault')
    },
    saveBtn () {
      this.sure_save = true
    },
    _getPlanList () {
      getdepList(this.postObj).then(res => {
        this.loadingShow = false
        if (getLocalStorage('id') === ' ') {
          errorNotice('请先填写基本信息', true)
          let obj = getLocalStorage('active')
          obj.second = 0
          getLocalStorage('active', obj)
          this.$router.push('/home/threeBusiness/er_plan/general')
        }
        if (res.code === '0000') {
          this.textareaVaule = res.result.result[0].response
          this.datalink = res.result.result[0].plan_category
        }
      })
    },
    goOn () {
      senActive(5)
      var pObj = {
        _id: this.id,
        response: this.textareaVaule
      }
      updateDep(pObj).then(res => {
        if (res.code === '0000') {
          if (this.datalink === '专题预案') {
            this.$router.push('/home/threeBusiness/er_plan/transfer')
          } else {
            this.$router.push('/home/threeBusiness/er_plan/aftermath')
          }
        } else if (res.code === '0001') {
          warningNotice(res.message)
          this.sure_save = false
        } else {
          errorNotice(res.message, true)
        }
      })
    },
    save () {
      var pObj = {
        _id: this.id,
        response: this.textareaVaule
      }
      if (getSessionStorage('name') === 'erp') {
        updateDep(pObj).then(res => {
          if (res.code === '0000') {
            this.$router.push('/home/threeBusiness/threeBusinessDefault')
            successNotice(res.message)
          } else if (res.code === '0001') {
            warningNotice(res.message)
            this.sure_save = false
          } else {
            errorNotice(res.message, true)
          }
        })
      } else if (getSessionStorage('name') === 'comp') {
        updateDep(pObj).then(res => {
          if (res.code === '0000') {
            this.$router.push('/home/threeBusiness/threeBusinessCommunity')
            successNotice(res.message)
          } else if (res.code === '0001') {
            warningNotice(res.message)
            this.sure_save = false
          } else {
            errorNotice(res.message, true)
          }
        })
      } else if (getSessionStorage('name') === 'top') {
        updateDep(pObj).then(res => {
          if (res.code === '0000') {
            this.$router.push('/home/threeBusiness/threeBusinessTopic')
            successNotice(res.message)
          } else if (res.code === '0001') {
            warningNotice(res.message)
            this.sure_save = false
          } else {
            errorNotice(res.message, true)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .er_action {
    height: 100%;
    .erp_title {
      font-size: 20px;
      color: #303030;
      font-weight: bold;
      text-align: center;
    }
    .general_content {
      width: 100%;
      height: 80%;
      border: 1px solid #ccc;
      border-radius: 5px;
      .textarea {
        height: 100%;
        background: #fff;
        .quill-editor {
          height: 90%;
        }
      }
    }
    .save {
      margin: 20px;
      margin-right: 0;
    }
  }
</style>
