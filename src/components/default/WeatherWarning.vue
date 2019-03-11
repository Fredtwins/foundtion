<template>
  <div class="WeatherWarning">
    <h3>天气预报</h3>
    <div class="WeatherWarning-warpper" v-if="infoData.length">
      <ul class="WeatherWarning-top">
        <li class="WeatherWarning-topInfo">
          <div class="time">
            {{filterTime(0).time}}
            &nbsp;&nbsp;&nbsp;
            {{filterTime(0).day}}
          </div>
          <div class="name">今天</div>
          <div class="content-today">
            <div class="weatherIng">
              <div>{{weatherIng.t}}</div>
              <!-- <div>{{weatherIng.V12004}}</div> -->
              <div class="weather-flag">°C</div>
              <img class="weather-img" :src="filterIcon(descIng.W)">
            </div>
            <div class="weather-desc">
              {{descIng.WS}}
              {{descIng.WIND}}
            </div>
          </div>
        </li>
        <li class="WeatherWarning-topInfo">
          <div class="time">
            {{filterTime(1).time}}
            &nbsp;&nbsp;&nbsp;
            {{filterTime(1).day}}
          </div>
          <div class="name">明天</div>
          <div class="content-tomorrow">
            <div class="weather-distance">
              <div>{{infoData[0].MINTEMP}}</div>
              <div>~</div>
              <div>{{infoData[0].MAXTEMP}}</div>
              <div class="weather-flag">°C</div>
              <img class="weather-img" :src="filterIcon(infoData[0].WEATHERCODE)">
            </div>
            <div class="weather-desc">{{infoData[0].WEATHER}}</div>
          </div>
        </li>
      </ul>
      <ul class="WeatherWarning-bottom">
        <li class="WeatherWarning-bottomInfo" v-for="index in 4">
          <div class="name">{{filterTime(index + 1).day}}</div>
          <div class="time">{{filterTime(index + 1).time}}</div>
          <img class="weather-img" :src="filterIcon(infoData[index].WEATHERCODE)">
          <div class="weather-distance">
            <div>{{infoData[index].MINTEMP}}</div>
            <div>~</div>
            <div>{{infoData[index].MAXTEMP}}</div>
            <div class="weather-flag">°C</div>
          </div>
          <div class="weather-desc">{{infoData[index].WEATHER}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { BoxMixin } from 'common/js/mixins';
import { weatherIcon } from 'common/js/module'
import { getTiming } from 'common/js/dom'
import { timeFilter } from 'common/js/util'
import { getWeather } from 'api/weatherWarning'

export default {
  // mixins: [BoxMixin],
  created () {
    this._getWeather()
  },
  data () {
    return {
      infoData: [],
      weatherIng: {},
      descIng: {}
    }
  },
  methods: {
    filterDay (day) {
      let arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

      return arr[day]
    },
    filterTime (index) {
      let time = getTiming()

      time.setDate(time.getDate() + index)

      let timing = timeFilter(time, 'yyyy-MM-dd')

      let daying = this.filterDay(time.getDay())

      return {
        time: timing,
        day: daying
      }
    },
    filterIcon (code) {
      return `${Static}img/weatherWarning/${weatherIcon[code].IMGNAME}`
    },
    _getWeather () {
      getWeather().then(res => {
        if (res.res1) {
          let time = getTiming(res.res1.rows[0].STARTTIME)
          var timeArray = []
          for (var i in res.res1.rows) {
            time.setDate(time.getDate() + 1)

            var currentTime = getTiming()
            if (currentTime.getTime() < time.getTime()) {
              res.res1.rows[i].datatime = timeFilter(time, 'yyyy-MM-dd')
              timeArray.push(res.res1.rows[i])
            }
          }

          this.infoData = timeArray
        }

        if (res.res2) {
          this.weatherIng = res.res2[res.res2.length - 1]
          // this.weatherIng = res.res2.rows[0];
        }

        if (res.res3) {
          this.descIng = res.res3.rows[0]
        }

        setTimeout(() => {
          this._getWeather()
        }, 3600000)
      })
    }
  }
}
</script>

<style scoped lang="scss">
	.WeatherWarning {
		width: 100%;
		height: 100%;
		overflow: hidden;
		font-family: "微软雅黑";
		padding-top: 0.4rem;
		position: relative;
		border: 0.01rem solid #ccc;
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
		.WeatherWarning-warpper {
			width: 100%;
			height: 100%;
			/* background-image: url(./img/weatherBG.jpg); */
			background: #67aad8;
			background-size: 100% 100%;
			padding: 0.05rem;
			flex-direction: column;
			box-sizing: border-box;
			> ul {
				flex: 1;
			}
			.WeatherWarning-top {
				width: 100%;
				height: 45%;
				margin-bottom: 0.05rem;
				display: flex;
				.WeatherWarning-topInfo {
					flex: 1;
					color: white;
					position: relative;
					.time {
						font-size: 0.16rem;
						padding-left: 0.05rem;
					}
					.name {
						font-size: 0.18rem;
						padding-left: 0.05rem;
					}
					.content-today {
						.weatherIng {
							font-size: 0.22rem;
							text-align: center;
							display: flex;
							justify-content: center;
							.weather-flag {
								font-size: 0.18rem;
							}
							.weather-img {
								height: 0.35rem;
							}
						}
						.weather-distance {
							font-size: 0.16rem;
							text-align: center;
							> div {
								display: inline-block;
							}
							.weather-flag {
								font-size: 0.16rem;
								vertical-align: top;
							}
						}
						.weather-desc {
							font-size: 0.18rem;
							text-align: center;
						}
					}
					.content-tomorrow {
						.weather-distance {
							font-size: 0.22rem;
							text-align: center;
							display: flex;
							justify-content: center;
							.weather-flag {
								font-size: 0.18rem;
							}
							.weather-img {
								height: 0.35rem;
							}
						}
						.weather-desc {
							font-size: 0.16rem;
							text-align: center;
						}
					}
				}
				.WeatherWarning-topInfo:nth-of-type(1) {
					border-right: 0.01rem solid lightgray;
				}
			}
			.WeatherWarning-bottom {
				height: 1.4rem;
				display: flex;
				color: white;
				.WeatherWarning-bottomInfo {
					flex: 1;
					background-color: rgba(0, 0, 0, 0.6);
					margin: 0 0.01rem;
					padding: 0.05rem;
					text-align: center;
					.name {
						font-size: 0.12rem;
						text-align: left;
					}
					.time {
						font-size: 0.12rem;
						margin-top: 0.01rem;
					}
					.weather-img {
						height: 0.25rem;
						margin-top: 0.05rem;
					}
					.weather-distance {
						font-size: 0.12rem;
						text-align: center;
						margin-top: 0.05rem;
						> div {
							display: inline-block;
						}
						.weather-flag {
							font-size: 0.12rem;
							vertical-align: top;
						}
					}
					.weather-desc {
						margin-top: 0.05rem;
						font-size: 0.12rem;
					}
				}
			}
		}
	}
</style>
