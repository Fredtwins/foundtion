<template>
  <div class="notice-details">
    <div class="title">
      <h1 class="hdatatitle">{{dataObj.title}}</h1>
      <br>
    </div>
    <div class="centercontentdata">
      <div class="sub-info">
        <span>{{dataObj.createby}}</span>
        <span class="time">{{dataObj.createdt}}</span>
      </div>
      <div class="attach">
        <span>附件：</span>
        <span @click="downLoad" class="link">{{dataObj.attachment_name || '暂无'}}</span>
      </div>
       <div class="content">
        <p>{{dataObj.notice_desc}}</p>
        <p v-for="(item,index) in dataObj.picture" :key="index">
          <img :src="imgDefaultUrl + item.path" alt>
        </p>
      </div>
    </div>
    <br>
    <div class="loading" v-if="loadingShow">
      <command-loading></command-loading>
    </div>
  </div>
</template>

<script>
import { noticeApi, downLoad } from 'api/daily-office'
import CommandLoading from 'base/loading/command-loading'

export default {
  components: {
    CommandLoading
  },
  data () {
    return {
      loadingShow: true,
      dataObj: {},
      imgDefaultUrl: httpUrl
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    downLoad () {
      let url = downLoad(this.dataObj.attachment_path, this.dataObj.attachment_name)
      window.location.href = url
    },
    getInfo () {
      noticeApi('list', {
        searchValue: {
          _id: this.$route.params.id
        }
      }).then(res => {
        this.loadingShow = false
        if (res) {
          if (res.code === '0000') {
            this.dataObj = res.result.result[0]
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .notice-details {
    height: 100%;
    overflow: auto;
    > .title {
      > .hdatatitle {
        padding-top: 45px;
      }
    }
    div {
      text-align: center;
      font-size: 14px;
      img {
        display: inline-block;
        width: 50%;
      }
      p:first-child {
        margin: 0 auto;
        width: 60%;
        text-align: left;
        text-indent: 2em;
        font-size: 18px;
      }
    }
    > .centercontentdata {
      width: 100%;
      height: 50px;
      display: inline;
      .sub-info {
        .time {
          color: #999;
          padding-left: 15px;
        }
      }
      .link{
        color: blue;
        text-decoration: underline;
        cursor: pointer;
      }
      .link:hover{
        color: red;
      }
    }
  }
</style>
