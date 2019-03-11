<template>
  <div class="data-contentRain">
    <div class="map" ref="rain-map"></div>
    <div class="axis">
      <time-axis
        ref="rainAxis"
        title="雨"
        layerName="rainLayer"
        :datas="rainLayerArr"
        @timelineClick="timelineClick"
      ></time-axis>
    </div>
    <Spin fix v-show="showLoading">
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
import { createMap, getLayer, createdImageStaticSource } from 'api/map'
import { timeAxisMixin } from 'common/js/mixins'

export default {
  mixins: [timeAxisMixin],
  created () {
    this.layers = {}
  },
  mounted () {
    setTimeout(() => {
      this.initMap()
    }, 20)
  },
  data () {
    return {
      rainLayerArr: [],
      showLoading: true
    }
  },
  methods: {
    timelineClick (obj) {
      this.layers[obj.layerName].layer.setSource(createdImageStaticSource({
        url: obj.item.serviceResult,
        extent: [112.729, 22.751, 113.439, 23.322]
      }))
    },
    initMap () {
      this.layers.baseLayer = getLayer({
        layer: 'baseLayer'
      })
      this.layers.FsNhLayer = getLayer({
        layer: 'FsNhLayer'
      })
      this.layers.notionLayer = getLayer({
        layer: 'notionLayer'
      })
      const el = this.$refs['rain-map']
      const laysers = [
        this.layers.baseLayer,
        this.layers.FsNhLayer,
        this.layers.notionLayer
      ]
      const Map = createMap(el, laysers, {
        zoom: 10
      })
      this.layers['Map'] = Map
      /* eslint-disable */
      const rainLayer = getLayer({
        layer: 'rainLayer'
      }).then(res => {
        if (res.code === ERR_OK && res.result.length) {
          this.layers['rainLayer'] = res
          this.layers['Map'].addLayer(this.layers['rainLayer'].layer)
          this.rainLayerArr = res.result
        }
        this.showLoading = false
      })
    }
    /* eslint-enable */
  }
}
</script>

<style lang="scss" scoped>
  .data-contentRain {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    >.map {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    >.axis {
      width: 90%;
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
</style>

