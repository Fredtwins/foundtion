<template>
  <div class="data-model">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
        <BreadcrumbItem>智慧分析管理</BreadcrumbItem>
        <BreadcrumbItem>数据模型管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="data-content">
      <Tabs :animated="false" type="card" v-model="tabValue">
        <TabPane name="rain" label="短临降雨预报模型">
          <data-rain v-if="tabValue==='rain'"></data-rain>
        </TabPane>
        <TabPane name="wind" label="大风预报模型">
          <data-wind v-if="tabValue==='wind'"></data-wind>
        </TabPane>
        <TabPane name="water" label="水资源调到模型">
          <iframe v-if="tabValue==='water'" src="static/link-data/sk/index.html" frameborder="0"></iframe>
        </TabPane>
        <TabPane name="submerged" label="崩堤淹没模型">
          <iframe
            v-if="tabValue==='submerged'"
            src="static/link-data/nanhai/nanhai.htm"
            frameborder="0"
          ></iframe>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import dataRain from './data-model-children/data-rain.vue'
import dataWind from './data-model-children/data-wind.vue'

export default {
  components: {
    'data-rain': dataRain,
    'data-wind': dataWind
  },
  data () {
    return {
      tabValue: 'rain'
      // rain: true,
      // wind: false,
      // water: false,
      // submerged: false
    }
  },
  methods: {
    // jump(name) {

    //   if (name === '1') {
    //     this.rain = true
    //   } else {
    //     this.rain = false
    //   }
    //   if (name === '2') {
    //     this.wind = true
    //   } else {
    //     this.wind = false
    //   }
    //   if (name === '3') {
    //     this.water = true
    //   } else {
    //     this.water = false
    //   }
    //   if (name === '4') {
    //     this.submerged = true
    //   } else {
    //     this.submerged = false
    //   }
    // }
  }
}
</script>

<style scoped lang="scss">
  .data-model {
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
  }
</style>
