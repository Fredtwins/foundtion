<template>
  <div class="WeatherForecast">
    <h3>天气预警</h3>
    <div class="subtitle">
      <div class="loading" v-if="loadingShow">
        <command-loading></command-loading>
      </div>
      <div class="sub1">
        <span>大沥</span>
        <div class="pice">
          <img class="defaultImg" v-if="daliList.length === 0 " src="./img/no-alerm.gif" alt>
          <img v-for="(item,index) in daliList" :src="item.src" alt>
          <!-- <img src="./img/A2.png" alt="" /> -->
        </div>
        <div class="line"></div>
      </div>
      <div class="sub1">
        <span>九江</span>
        <div class="pice">
          <img class="defaultImg" v-if="chanchengList.length === 0 " src="./img/no-alerm.gif" alt>
          <img v-for="(item,index) in chanchengList" :src="item.src" alt>
        </div>
        <div class="line"></div>
      </div>
      <div class="sub1">
        <span>狮山</span>
        <div class="pice">
          <img class="defaultImg" v-if="shishanList.length === 0 " src="./img/no-alerm.gif" alt>
          <img v-for="(item,index) in shishanList" :src="item.src" alt>
        </div>
        <div class="line"></div>
      </div>
      <div class="sub1">
        <span>桂城</span>
        <div class="pice">
          <img class="defaultImg" v-if="guichengList.length === 0 " src="./img/no-alerm.gif" alt>
          <img v-for="(item,index) in guichengList" :src="item.src" alt>
        </div>
        <div class="line"></div>
      </div>
      <div class="sub1">
        <span>西樵</span>
        <div class="pice">
          <img class="defaultImg" v-if="xiqiaoList.length === 0 " src="./img/no-alerm.gif" alt>
          <img v-for="(item,index) in xiqiaoList" :src="item.src" alt>
        </div>
        <div class="line"></div>
      </div>
      <div class="sub1">
        <span>里水</span>
        <div class="pice">
          <img class="defaultImg" v-if="lishuiList.length === 0 " src="./img/no-alerm.gif" alt>
          <img v-for="(item,index) in lishuiList" :src="item.src" alt>
        </div>
        <div class="line"></div>
      </div>
      <div class="sub1">
        <span>丹灶</span>
        <div class="pice">
          <img class="defaultImg" v-if="danzaoList.length === 0 " src="./img/no-alerm.gif" alt>
          <img v-for="(item,index) in danzaoList" :src="item.src" alt>
        </div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWarmingList } from 'api/home'
import CommandLoading from 'base/loading/command-loading'

export default {
  components: {
    CommandLoading
  },
  data () {
    return {
      loadingShow: true,
      daliList: [],
      chanchengList: [],
      shishanList: [],
      guichengList: [],
      xiqiaoList: [],
      lishuiList: [],
      danzaoList: []
    }
  },
  created () {
    this.getWarming()
  },
  methods: {
    // 各地天气预警
    getWarming () {
      this.loadingShow = true
      getWarmingList().then(res => {
        if (res.code === ERR_OK) {
          this.loadingShow = false
          let list = res.result.result
          list.map(item => {
            switch (item.address) {
              case '大沥':
                this.daliList.push({src: `${Static}img/${item.ico_id}.png`})
                break
              case '九江':
                this.chanchengList.push({src: `${Static}img/${item.ico_id}.png`})
                break
              case '狮山':
                this.shishanList.push({src: `${Static}img/${item.ico_id}.png`})
                break
              case '桂城':
                this.guichengList.push({src: `${Static}img/${item.ico_id}.png`})
                break
              case '西樵':
                this.xiqiaoList.push({src: `${Static}img/${item.ico_id}.png`})
                break
              case '里水':
                this.lishuiList.push({src: `${Static}img/${item.ico_id}.png`})
                break
              case '丹灶':
                this.danzaoList.push({src: `${Static}img/${item.ico_id}.png`})
                break
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .WeatherForecast {
    height: 100%;
    border: 1px solid #ccc;
    padding-top: 40px;
    position: relative;
    h3 {
      color: #4d4e4f;
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      background: #fff;
      width: 100%;
      top: 0;
      position: absolute;
      text-align: center;
    }
    .subtitle {
      overflow: auto;
      display: flex;
      font-size: 16px;
      height: 100%;
      position: relative;
      .loading {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .sub1:nth-child(7){
        border: none;
      }
      .sub1 {
        border-right: 1px solid #ccc;
        text-align: center;
        position: relative;
        padding-top: 40px;
        position: relative;
        width: 14.28%;
        > span {
          position: absolute;
          top: 0;
          left: 0;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #d5d5d5;
          background: #e5eff7;
          width: 100%;
        }
        .pice {
          img {
            width: 40px;
            height: 0.5rem;
          }
          .defaultImg {
            height: 45px;
            padding-top: 5px;
          }
        }
        // .line {
        //     width: 1px;
        //     height: 100%;
        //     position: absolute;
        //     right: 0;
        //     top: 0px;
        //     background: #d5d5d5;
        // }
      }
    }
  }
</style>
