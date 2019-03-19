<template>
  <div class="notice-details">
    <!-- <div class="title">
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
    <br> -->
    <div class="content">
      <div class="bodybg">
        <div class="bodycontent">
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
            <br>
            <div class="contenttext">
              <p>{{dataObj.notice_desc}}</p>
              <p v-for="(item,index) in dataObj.picture" :key="index" class="imgdatatext">
                <img :src="imgDefaultUrl + item.path" alt>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    > .content {
      width: 976px;
      margin: 0 auto;
      height: 100%;
      > .bodybg {
        padding-top: 30px;
        border-bottom: 1px solid #cdcdcd;
        > .bodycontent {
          width: 840px;
          margin: 0 auto;
          min-height: 524px;
          height: auto;
          padding: 20px 30px;
          background-color: #fff;
          box-shadow: 0px 0px 1px 2px;
          margin-bottom: 5px;
          > .title {
            text-align: center;
            > .hdatatitle {
              color: #3355a2;
            }
          }
          > .centercontentdata {
            > .sub-info {
              text-align: center;
              font-size: 14px;
            }
            > .attach {
              text-align: center;
              font-size: 14px;
            }
            > .contenttext {
              > p {
                font-size: 18px;
              }
              > .imgdatatext{
                text-align: center;
                > img {
                  width: 500px;
                  height: 300px;
                  margin-bottom: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
