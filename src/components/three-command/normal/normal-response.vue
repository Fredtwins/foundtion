<template>
	<div>
		<normal-mask-model ref="mask-model" class="normal-response" title="应急响应" :isScale="false">
			<div class="normal-response-warpper">
				<div class="normal-response-list">
					<div class="normal-response-item" v-for="items in responseModule" :key="items.info">
						<Checkbox v-for="item in items" v-model="item.isChecked" :key="item.info" @on-change="isChecked(items, item)">
							{{item.info}}
						</Checkbox>
					</div>
				</div>
				<div class="normal-response-sure" @click="goWarn">
					<Button type="primary" long>启动应急响应</Button>
				</div>
			</div>
		</normal-mask-model>

		<comfim-model
			ref="comfim-model"
			class="normal-response-warn"
			title="提示"
			type="question"
			@sure="commitStart">
			<div class="normal-response-question">确认启动以下应急响应？</div>
			<Row>
				<Col span="12" :key="item.info" v-for="item in responseIng">
					{{item.info}}
				</Col>
			</Row>
		</comfim-model>
    <normal-pagemodel v-if="showmodel"/>
	</div>

</template>

<script>
import NormalPagemodel from './normal-pagemodel'
import { mapGetters, mapMutations } from 'vuex'
import { getstategency } from 'api/threeCommand'
// import { ACTION_KEYS } from 'api/socket';
// import { startEmergency } from 'api/socketAPI';
import { normalMaskModelMixin, comfimModelMixin } from 'common/js/mixins'
import { responseModule } from 'common/js/module' // eslint-disable-line
import { errorMessage, successMessage } from 'common/js/dom'

export default {
  mixins: [normalMaskModelMixin, comfimModelMixin],
  computed: {
    ...mapGetters([
      'responseModule',
      'responseIng'
    ])
  },
  components: {
    NormalPagemodel
  },
  created () {
    // this.$bus.on(ACTION_KEYS['start_emergency'], this._start_emergency);
  },
  beforeDestroy () {
    // this.$bus.off(ACTION_KEYS['start_emergency'], this._start_emergency);
  },
  data () {
    return {
      showLoading: false,
      showmodel: false
    }
  },
  methods: {
    commitStart () {
      if (this.$refs['comfim-model'].showLoading) {
        errorMessage('我已经在努力启动中...')
        return
      }

      this.$refs['comfim-model'].controlLoading(true)

      let resp = []

      this.responseIng.map(item => {
        resp.push({
          'response_type': item.name,
          'response_level': `${item.level}级`
        })
      })
      this._startEmergency({
        'response_list': resp
      })
      // startEmergency({
      // 'response_list': resp
      // })
    },
    goWarn () {
      // this.showmodel = true
      console.log(111)
      this.$refs['comfim-model'].showModel()
      // if (this.showLoading) {
      //   errorMessage('已经在努力启动应急响应了')
      //   return
      // }

      // if (this.responseIng.length === 0) {
      //   errorMessage('请选择应急响应类型')
      //   return
      // }
    },
    isChecked (items, item) {
      if (!item.isChecked) {
        item.isChecked = false
        return
      }
      items.forEach(obj => {
        obj.isChecked = false
      })
      item.isChecked = true
    },
    showModel () {
      this.$refs['mask-model'].showModel()
    },
    // _start_emergency(data) {
    // if (data.code === ERR_OK) {
    // this.SET_IFCOMMAND(true);
    // successNotice('启动应急响应成功');
    // }else {
    // errorNotice('启动应急响应失败', data.message);
    // }
    // this.showLoading = false;
    // },
    _startEmergency (obj = {}) {
      getstategency(obj).then(res => {
        if (res.code === ERR_OK) {
          this.$router.push('/home/threeCommand/responseapplist')
        //   successMessage('启动应急响应成功')
        // } else {
        //   errorMessage(res.message)
        } else {
          errorMessage(res.message)
        }

        this.$refs['comfim-model'].controlLoading(false)
        this.$refs['comfim-model'].hideModel()
        this.$refs['mask-model'].cancel()
      })
    },
    ...mapMutations([
      'SET_IFCOMMAND'
    ])
  }
}
</script>

<style lang="scss">
	@import '~common/scss/color.scss';
	.normal-response {
		.normal-response-warpper {
			width: 100%;
			height: 100%;
			overflow: hidden;
			user-select: none;
			position: relative;
			.normal-response-list {
				width: 100%;
				height: 220px;
				user-select: none;
				display: flex;
				padding: 20px 0;
				.normal-response-item {
					flex: 1;
					.ivu-checkbox-wrapper {
						width: 80%;
						padding: 12px 0;
						text-align: center;
						margin: auto;
						font-size: 14px;
					}
				}
			}
			.normal-response-sure {
				width: 250px;
				margin: auto;
			}
		}
		.ivu-modal {
			width: 600px !important;
			height: 330px;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
      position: absolute;
      background-color: #224ca5 !important;
			.ivu-modal-body {
				padding: 0;
				position: relative;
				overflow: hidden;
				background-color: white;
			}
		}
	}

	.normal-response-warn {
		.comfim-model-content {
			font-size: 14px;
			color: $color-blue;
			.normal-response-question {
				font-size: 14px;
				font-weight: 700;
				font-family: "微软雅黑";
				color: black;
				margin-bottom: 5px;
			}
		}
		.ivu-modal-mask {
			z-index: 1001;
		}
		.ivu-modal-wrap {
			z-index: 1001;
			.ivu-modal-body {
				height: auto;
			}
		}
  }
   .normal-mask-model .ivu-modal .ivu-modal-header .model-header {
     background-color: #224ca5;
   }
   .ivu-btn-primary.active, .ivu-btn-primary:active {
     background-color: #224ca5;
   }
   .ivu-btn-primary {
     background-color: #224ca5;
   }
</style>
