<template>
  <div class="normal">
    <div class="normal-map" ref="normal-map"></div>

    <!--警告滚动条-->
    <div class="normal-warning">
      <div class="normal-warning-title">
        <span class="iconfont icon-jinggao icon"></span>
        <!-- <span class="title">当前预警&nbsp;:</span> -->
      </div>

      <div class="normal-warning-content">
        <roll
          :config="warningInfoRollConfig"
          :content="warningInfoRollContent"
          ref="normalWarn-roll"
        ></roll>
      </div>
    </div>

    <!--中心所有内容-->
    <section class="normal-content">
      <!--三防指挥一张图标题-->
      <div class="normal-title">
        <!-- 三防指挥一张图 -->
      </div>

      <!--预警研判、应急响应、视频会商、数据一张图图标-->
      <ul class="normal-othenIcons clear">
        <li class="normal-othenIcon pull-left" @click="othenIconClick('judge')">
          <div class="box">
            <div class="iconfont icon-zhongxinkaishi"></div>
            <div>预警研判</div>
          </div>
        </li>
        <li class="normal-othenIcon pull-left" @click="othenIconClick('response')">
          <div class="box">
            <div class="iconfont icon-shipin"></div>
            <div>应急响应</div>
          </div>
        </li>
        <li class="normal-othenIcon pull-left" @click="othenIconClick('video')">
          <div class="box">
            <div class="iconfont icon-jiankongshexiangtou" style="top: 10px;"></div>
            <div>集成通信指挥</div>
          </div>
        </li>
        <li class="normal-othenIcon pull-left" @click="othenIconClick('map')">
          <div class="box">
            <div class="iconfont icon-ditu" style="top: 10px;"></div>
            <div>数据一张图</div>
          </div>
        </li>
      </ul>

      <!--指挥台图标-->
      <div class="normal-icon" @click="jumpPage">
        <div class="box">
          <img class="icon" src="../img/normalLogo.png">
          <div>指挥台</div>
        </div>
      </div>
    </section>

    <!--预警研判-->
    <normal-judge ref="normal-judge"></normal-judge>

    <!--应急响应-->
    <normal-response ref="normal-response"></normal-response>

    <!--集成通信指挥-->
    <normal-video ref="normal-video"></normal-video>
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapGetters, mapMutations } from 'vuex'
import normalJudge from './normal-judge.vue'
import normalResponse from './normal-response.vue'
import normalVideo from './normal-video.vue'
import { rollMixin } from 'common/js/mixins'
import { getNoramlMap } from 'common/js/echarts'
import { getWarnInfo, getNormalMapData } from 'api/threeCommand'

export default {
  mixins: [rollMixin],
  computed: {
    warningInfoRollContent () {
      let str = ''

      this.warningInfoMajor.map((item, index) => {
        str += `&nbsp;&nbsp;&nbsp;${index + 1}、${item.content}`
      })

      if (str === '') {
        str = '当前暂无预警'
      }

      return str
    },
    ...mapGetters([
      'ifCommand'
    ])
  },
  created () {
  // this.$bus.on('emergency_message', this.emergency_message);

    this.warningInfoRollConfig = {
      fontSize: 14,
      speed: 30,
      isRun: true,
      isHoverStop: true
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeInterval)
  },
  mounted () {
    setTimeout(() => {
      this._getWarnInfo()

      this.initNormalMap()

      this.$refs['normalWarn-roll'].refresh()

    // this.$refs['normal-judge'].showModel();
    }, 20)
  },
  data () {
    return {
      warningInfoMajor: [],
      showLoading: false
    }
  },
  methods: {
    jumpPage () {
      window.open(commonMapHttpUrl)
    },
    othenIconClick (name) {
      if (name === 'map') {
        window.open(`${webHttpUrl}PRUM/data`, '_blank')
      } else {
        if (this.ifCommand) {
          return
        }
        this.$refs[`normal-${name}`].showModel()
      }
    },
    initNormalMap () {
      let echart = echarts.init(this.$refs['normal-map'])

      getNormalMapData().then(res => {
        echarts.registerMap('nanhai', res)
        echart.setOption(getNoramlMap())
      })
    },
    _getWarnInfo () {
      getWarnInfo().then(res => {
        if (res.code === ERR_OK) {
          let arr = []
          for (let key in res.result) {
            let result = JSON.parse(res.result[key])
            arr.push({
              content: result.description,
              time: result.data_time,
              depart: result.publisher
            })
          }
          this.warningInfoMajor = arr
        }

        this.timeInterval = setTimeout(() => {
          this._getWarnInfo()
        }, 3000)
      })
    },
    ...mapMutations([
      'ADD_WARNINGINFO',
      'SET_ROBOTSAY'
    ])
  },
  components: {
    'normal-judge': normalJudge,
    'normal-response': normalResponse,
    'normal-video': normalVideo
  }
}
</script>

<style lang="scss">
	@import "~common/scss/color";

	.normal {
		width: 100%;
		height: 100%;
		background-image: url(../img/normalBackground.jpg);
		background-size: cover;
		position: relative;
		.normal-map {
			position: absolute;
			top: 0px;
			left: 0;
			right: 50%;
			bottom: 0;
		}
		.normal-warning {
			width: 89%;
			height: 50px;
			background-color: #fff5e6;
			position: fixed;
			top: 40px;
			// left: 0;
      right: 0;
			z-index: 999;
			padding: 0 10px;
			color: $color-danger;
			display: flex;
			align-items: center;
			.normal-warning-title {
				width: 95px;
				.icon {
					font-size: 20px;
				}
				.title {
					font-size: 14px;
					position: relative;
					top: -2px;
					left: -5px;
				}
			}
			.normal-warning-content {
				height: 100%;
				line-height: 32px;
				flex: 1;
				font-size: 14px;
				position: relative;
				top: -1px;
			}
		}
		.normal-content {
			width: 420px;
			height: 510px;
			position: fixed;
			top: 0px;
			bottom: 0;
			left: 40%;
			right: 0;
			margin: auto 0;
			.normal-title {
				color: #E5464D;
				font-size: 50px;
				text-align: center;
				letter-spacing: 4px;
				text-shadow: 3px 0px 0px #fff, -3px 0px 0px #fff, 0px 3px 0px #fff, 0px -3px 0px #fff;
				user-select: none;
			}
			.normal-othenIcons {
				width: 360px;
				height: 300px;
				margin: auto;
				margin-top: 156px;
				.normal-othenIcon {
					width: 180px;
					height: 180px;
					background-color: rgba(90, 112, 164, .9);
					border: 2px solid white;
					box-shadow: 0 0 10px 3px rgba(0, 0, 0, .2);
					color: white;
					font-size: 22px;
					text-align: center;
					border-radius: 30px;
					cursor: pointer;
					.box {
						height: 130px;
						margin-top: 50%;
						transform: translate3d(0, -50%, 0);
						.iconfont {
							font-size: 50px;
							position: relative;
							top: 5px;
							margin-bottom: 10px;
						}
					}
				}
				.normal-othenIcon:nth-of-type(1) {
					transform: translate3d(-15px, -15px, 0);
				}
				.normal-othenIcon:nth-of-type(2),
				.normal-othenIcon:nth-of-type(3) {
					transform: scale(.8);
				}
				.normal-othenIcon:nth-of-type(4) {
					transform: translate3d(15px, 15px, 0);
				}
			}
			.normal-icon {
				width: 120px;
				height: 120px;
				top: -35px;
				background-color: #E5464D;
				border: 2px solid white;
				box-shadow: 0 0 10px 3px lightgray;
				color: white;
				font-size: 18px;
				position: absolute;
				border-radius: 5px;
				text-align: center;
				left: 0;
				right: 0;
				top: -35px;
				bottom: 0;
				margin: auto;
				.box {
					width: 55px;
					height: 76px;
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					margin: auto;
					.icon {
						width: 54px;
						margin: auto;
						margin-bottom: 5px;
					}
				}
			}
		}
	}
</style>
