<template>
	<div class="tiweiweihu">
		<div class="title">
			<BreadcrumbItem>数据</BreadcrumbItem>
			<!-- </Breadcrumb> -->
		</div>
		<div class="edit">
			<div class="title">
        <span class="titleleft"></span>
				<span>位置： </span>
				<Breadcrumb separator=">">
					<BreadcrumbItem>部门管理</BreadcrumbItem>
					<BreadcrumbItem>部门数据维护</BreadcrumbItem>
					<BreadcrumbItem to="/home/depManagement/gongshuishebei">供水设备数据维护</BreadcrumbItem>
					<BreadcrumbItem>
						<a href="javascript:;" @click='cancel'>供水设备数据</a>
					</BreadcrumbItem>
					<!--<BreadcrumbItem>{{moduleTitle}}</BreadcrumbItem>-->
				</Breadcrumb>
			</div>
			<div class="editHead">
				<span>供水设备数据信息</span>
				 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
				<div class="ddto">
					<Button class="buto clear" type="ghost" @click='cancel' style="margin-right: 10px">关闭</Button>
				</div>
			</div>
			<div class="editcontant">
				<!--<Form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="0">-->
				<Form ref="formItem" :model="formItem" :label-width="0">
					<table class="ed-table">
						<tbody>
							<!-- <tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">基本情况</td>
							</tr> -->
              <h2 class="titlename">基本情况</h2>
							<tr>
								<td class="ed-label">供水区域</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.district"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">水厂名称</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.factory_name"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">地址</td>
								<td class="ed-content">
									<FormItem label="" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.location"></Input>
									</FormItem>
								</td>
								<td class="ed-label">圆形编号</td>
								<td class="ed-content">
									<FormItem label="" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.picture_no"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">设计供水能力</td>
								<td class="ed-content">
									<FormItem label="" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.design_capacity"></Input>
									</FormItem>
								</td>
								<td class="ed-label">负责人</td>
								<td class="ed-content">
									<FormItem label="" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.chargeby"></Input>
									</FormItem>
								</td>
								<td class="ed-label">联系电话</td>
								<td class="ed-content">
									<FormItem label="" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.phone_no"></Input>
									</FormItem>
								</td>
							</tr>


						</tbody>

					</table>
					<div class="patrolRouter">
						<table class="ed-table">
							<!-- <tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">地图经纬度</td>
							</tr> -->
              <br>
              <h2 class="titlename">地图经纬度</h2>
							<tr>
								<td class="ed-label">纬度</td>
								<td class="ed-content">
									<FormItem label="" prop="lat" style="margin: 0">
										<Input placeholder="经度" style="width:80%" v-model="formItem.lat"></Input>
									</FormItem>
								</td>
								<td class="ed-label">经度</td>
								<td class="ed-content">
									<FormItem label="" prop="lng" style="margin: 0">
										<Input placeholder="纬度" style="width:80%" v-model="formItem.lnt"></Input>
									</FormItem>
								</td>
							</tr>
						</table>
					</div>
					<!--地图-->
					<i-col span="24">
						<div id="myMap1">
							<div class="amap-page-container">
								<el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
									<el-amap-marker v-for="(marker, index) in markers"
										 :position="marker.position"
										 :title="marker.title"
										 :vid="index"
										 :key="index"
										 >
									</el-amap-marker>
								</el-amap>
							</div>
						</div>
					</i-col>
				</Form>
			</div>
			<div class="editFooter clear">

			</div>
		</div>
	</div>
</template>

<script>
import { getshebeiList } from 'api/shujuage'
import { getLocalStorage } from 'common/js/dom'
import vueAMap from 'vue-amap'
let amapManager = new vueAMap.AMapManager()

export default {
  props: {
    model: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      amapManager,
      zoom: 12,
      center: [113.17213016912342, 23.02122420436683],
      events: {
        init: (o) => {
          o.getCity(result => {
          })
        },
        'moveend': () => {},
        'zoomchange': () => {},
        'click': (e) => {
          this.formItem.lat = e.lnglat.lat
          this.formItem.lng = e.lnglat.lng
          this.markers = [
            {
              position: [e.lnglat.lng, e.lnglat.lat]
            }]
        }

      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init (o) {
          }
        }
      }],
      athead: [{
        names: '社区'
      }, {
        names: '需要转移人数'
      }, {
        names: '已转移人数'
      }, {
        names: '时间'
      }],
      atheads: [],
      tdthead: new Array(1),
      tdtheads: new Array(1),
      btns: true,
      btn: false,
      endType: '天',
      responseResult: [],
      autoCompleteData: [],
      departmentList: [],
      selectLoading: false,
      num: 1,
      detObj: {},
      sure_del: false,
      delObj: {},
      formDisabled: false,
      detDisabled: true,
      formItem: {
        lat: 0,
        lng: 0
      },
      disabled: false,
      tableTbody: [],
      total: 0,
      searchVal: {
        department_name: '',
        task_type: ''
      },
      markers: []
    }
  },
  mounted () {
    this._getuserlist()
  },
  created () {
    this.id = getLocalStorage('id')
    this.formItemd = getLocalStorage('formItemd')
  },
  methods: {
    // 选择预案类型
    planTypeSelect (value) {
      // this.getRespontResult()
      var arr = []
      this.responseResult.map(item => {
        if (item.plan_type === '全部' || item.play_type === value) {
          arr.push(item)
        }
      })
      this.responseResult = arr
    },

    cancel () {
      this.$router.push('/home/depManagement/gongshuishebei')
    },
    // 表格显示
    _getuserlist (search) {
      search = {
        id: this.id
      }
      if (getLocalStorage('id') !== 'false') {
        getshebeiList(search).then(res => {
          if (res.code === ERR_OK) {
            this.formItem = this.formItemd
            this.markers = [
              {
                position: [this.formItem.lng, this.formItem.lat],
                title: '666'
              }]
            this.center = [this.formItem.lng, this.formItem.lat]
            this.btn = true
            this.btns = false
          }
        })
      }
    }

  }
}
</script>

<style scoped lang="scss">
	.amap-demo {
		padding-top: 20px;
		height: 400px;
	}

	.tiweiweihu {
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
			>span {
				font-size: 14px;
				font-weight: 600;
			}
		}
		.edit {
			width: 100%;
			height: 100%;
			padding: 10px;
			padding-top: 60px;
			background: #fff;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
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
				>span {
					font-size: 14px;
					font-weight: 600;
				}
			}
			>.editHead {
				border-bottom: 1px solid #ccc;
				margin-bottom: 20px;
				padding-top: 20px;
				>span {
					display: inline-block;
					height: 30px;
					line-height: 30px;
					font-size: 14px;
					font-weight: 500;
					border-bottom: 2px solid rgb(12, 102, 204);
				}
			}
			>.editcontant {
				margin-bottom: 20px;
				.ed-table {
					width: 100%;
					tr {
						height: 0.5rem;
						.ed-label {
							width: 150px;
							background: #edf6fa;
							text-align: center;
						}
						.ta-label {
							margin: 0 auto;
						}
						.ed-content {
							padding: 5px 1%;
							.more {
								width: 30px;
								height: 30px;
								border: 1px solid #ccc;
								text-align: center;
								line-height: 30px;
								color: #ccc;
								font-size: 20px;
							}
							.more:hover {
								border-color: #b6e1fc;
								color: #b6e1fc;
								cursor: pointer;
							}
						}
						td {
							border: 1px solid #ccc;
							padding: 0;
							input[type='text'] {
								width: 100%;
								height: 40px;
								border: none;
								padding: 10px;
							}
						}
					}
				}
			}
		}
		.search {
			margin-bottom: 15px;
			.searchBtn {
				display: inline-block;
			}
		}
	}

	#myMap1 {
		width: 100%;
		height: 450px;
	}

	.addbtn {
		width: 70px;
		height: 40px;
		color: #FFF5E6;
		background-color: #41B0FF;
		border-radius: 10px;
		margin-top: 10px;
	}

	.routerTable {
		width: 100%;
		margin-top: 10px;
		tr:nth-child(1) {
			td {
				font-weight: bold;
				font-size: 14px;
				background: #f6f6f6;
			}
		}
		td {
			border: 1px solid #ccc;
			height: 0.5rem;
			line-height: 0.5rem;
			text-align: center;
		}
	}

	.buto {
		float: right;
		width: 80px;
		height: 40px;
		margin-left: 5px;
		margin-bottom: 10px;
	}
</style>
