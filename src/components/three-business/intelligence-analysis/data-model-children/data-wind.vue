<template>
  <div class="data-contentWind">
    <div class="map" ref="wind-map"></div>
    <div class="axis">
      <time-axis
        ref="windAxis"
        title="风力风向"
        layerName="windLayer"
        :datas="windLayerArr"
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
import { createMap, getLayer, createdWindFeatures } from 'api/map'
import { timeAxisMixin } from 'common/js/mixins'

export default {
  mixins: [timeAxisMixin],
  created () {
    this.zoom = 10
    this.layers = {}
  },
  mounted () {
    setTimeout(() => {
      this.initMap()
    }, 20)
  },
  data () {
    return {
      windLayerArr: [],
      showLoading: true
    }
  },
  methods: {
    /* eslint-disable */
    // 用data风力风向图标scale
    changeWindScale () {
      this.layers['windLayer']['features'].map(item => {
        item.get('style').getImage().setScale(this.windScaleList[this.zoom])
      })
    },
    timelineClick (obj) {
      let features = createdWindFeatures({
        result: obj.item.data,
        windScaleList: this.windScaleList,
        zoom: this.zoom
      })

      this.layers['windLayer']['features'] = features
      this.layers['windLayer'].layer.setSource(new ol.source.Vector({
        features: features
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
      const el = this.$refs['wind-map']
      const laysers = [
        this.layers.baseLayer,
        this.layers.FsNhLayer,
        this.layers.notionLayer
      ]
      const Map = createMap(el, laysers, {
        zoom: this.zoom
      })
      this.layers['Map'] = Map

      this.layers.Map.getView().on('propertychange', (e) => {
        let zoom = this.layers.Map.getView().getZoom()

        zoom = parseInt(zoom)

        if (this.zoom !== zoom) {
          this.zoom = zoom
          this.changeWindScale()
        }
      })
      const windLayer = getLayer({
        layer: 'windLayer'
      }, {
        zoom: this.zoom
      }).then(res => {
        if (res.code === ERR_OK && res.result.length) {
          this.layers['windLayer'] = res
          this.layers['Map'].addLayer(this.layers['windLayer'].layer)
          this.windLayerArr = res.result
          this.windScaleList = res.windScaleList
        }
        this.showLoading = false
      })
    }
    /* eslint-enable */
  }
}
</script>

<style lang="scss" scoped>
  .data-contentWind {
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

