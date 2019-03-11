<template>
  <div class="tiweiweihu">
    <div class="title">
      <BreadcrumbItem>新增</BreadcrumbItem>
      <!-- </Breadcrumb> -->
    </div>
    <div class="edit">
      <div class="title">
        <span class="titleleft"></span>
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>部门管理</BreadcrumbItem>
          <BreadcrumbItem>部门数据维护</BreadcrumbItem>
          <BreadcrumbItem to="/home/depManagement/cangku">物资仓库信息数据维护</BreadcrumbItem>
          <BreadcrumbItem>
            <a href="javascript:;" @click="cancel">物资仓库信息数据</a>
          </BreadcrumbItem>
          <!--<BreadcrumbItem>{{moduleTitle}}</BreadcrumbItem>-->
        </Breadcrumb>
      </div>
      <div class="editHead">
        <span>物资仓库信息数据信息</span>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <div class="ddto">
          <Button class="buto clear" type="ghost" @click="cancel" style="margin-right: 10px">关闭</Button>
          <Button class="buto clear" type="success" @click="_sureBtn" v-if="btns">保存</Button>
          <Button class="buto clear" type="warning" @click="_gettiaoeditList" v-if="btn">修改保存</Button>
        </div>
      </div>
      <div class="editcontant">
        <!--<Form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="0">-->
        <Form ref="formItem" :model="formItem" :label-width="0">
          <table class="ed-table">
            <tbody>
              <!-- <tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">基本情况</td>
              </tr>-->
              <h2 class="titlename">基本情况</h2>
              <tr>
                <td class="ed-label">地址</td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="address" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.address"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">名称</td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="name" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.name"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">管理单位</td>
                <td class="ed-content">
                  <FormItem label prop="institution" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.institution"></Input>
                  </FormItem>
                </td>

                <td class="ed-label">负责人</td>
                <td class="ed-content">
                  <FormItem label prop="manager" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.manager"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">电话</td>
                <td class="ed-content">
                  <FormItem label prop="telephone" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.telephone"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">主管部门</td>
                <td class="ed-content">
                  <FormItem label prop="town" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.town"></Input>
                  </FormItem>
                </td>
                <!--<td class="ed-label">时间</td>-->
                <!--<td class="ed-content">
									<FormItem label="" prop="transferdt" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.transferdt"></Input>
									</FormItem>
                </td>-->
              </tr>
              <!--<tr>
								<td class="ed-label">createdt</td>
								<td class="ed-content">
									<FormItem label="" prop="createdt" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.createdt"></Input>
									</FormItem>
								</td>
              </tr>-->
              <!--仓库-->
              <!--<tr v-if="formItem.datas" v-for="(item,index) in formItem.datas" :key="index">
								<td class="ed-label">物品</td>
								<td class="ed-content">
									<FormItem label="" prop="datas.name" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.datas[index].name"></Input>
									</FormItem>
								</td>
								<td class="ed-label">单位</td>
								<td class="ed-content">
									<FormItem label="" prop="datas.spec" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.datas[index].spec"></Input>
									</FormItem>
								</td>
								<td class="ed-label">数量</td>
								<td class="ed-content">
									<FormItem label="" prop="datas.qty" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.datas[index].qty"></Input>
									</FormItem>
								</td>
              </tr>-->
              <!--<tr>
								<th v-for="item in atheads">{{item.name}}</th>
							</tr>
							<tr v-for="(item,index) in tdtheads" :value="item" :key="index">
								<td contenteditable=true v-model="formItem.datas[index].name" placeholder="物品">
									<input type="text" />
								</td>
								<td contenteditable=true v-model="formItem.datas[index].spec" placeholder="单位"></td>
								<td contenteditable=true v-model="formItem.datas[index].qty" placeholder="数量"></td>
              </tr>-->
            </tbody>
          </table>
          <div class="patrolRouter">
            <br>
            <h2 class="titlename">仓库资源</h2>
            <Button class="addbtn" @click="addbtnx">
              <Icon type="plus-round"></Icon>添加
            </Button>
            <table class="routerTable">
              <!-- <tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">仓库资源</td>
              </tr>-->
              <tr>
                <td>物品</td>
                <td>单位</td>
                <td>数量</td>
              </tr>
              <tr v-for="(item,index) in formItem.datas" :key="index">
                <td>
                  <Input placeholder="物品" v-model="item.name" style="width:90%"></Input>
                </td>
                <td>
                  <Input placeholder="单位" v-model="item.spec" style="width:90%"></Input>
                </td>
                <td>
                  <Input placeholder="数量" v-model="item.qty" style="width:90%"></Input>
                </td>
              </tr>
            </table>

            <table class="ed-table">
              <!-- <tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">地图经纬度</td>
              </tr>-->
              <br>
              <h2 class="titlename">地图经纬度</h2>
              <tr>
                <td class="ed-label">经度</td>
                <td class="ed-content">
                  <FormItem label prop="lng" style="margin: 0">
                    <Input placeholder="经度" style="width:80%" v-model="formItem.lng"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">纬度</td>
                <td class="ed-content">
                  <FormItem label prop="lat" style="margin: 0">
                    <Input placeholder="纬度" style="width:80%" v-model="formItem.lat"></Input>
                  </FormItem>
                </td>
              </tr>
            </table>
          </div>
          <!--地图-->
          <!--<i-col span="24">
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
          </i-col>-->
          <div id="aPicture-map" class="aPicture-map" ref="aPicture-map"></div>
        </Form>
      </div>
      <div class="editFooter clear"></div>
    </div>
  </div>
</template>

<script>
import { getUserList, getaddlist, geteditlist } from 'api/cangku'
import { getLocalStorage } from 'common/js/dom'
import vueAMap from 'vue-amap'
import { getLayer, createMap } from 'api/map'
let layers = {}
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
      overlay: [],
      olinit: true,
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
        lng: 0,
        lat: 0,
        datas: []
      },
      disabled: false,
      tableTbody: [],
      total: 0,
      searchVal: {
        department_name: '',
        task_type: ''
      },
      // amp markets
      markers: []
    }
  },
  mounted () {
    this._getuserlist()
    setTimeout(() => {
      // 初始化 地图
      if (this.olinit) {
        // 判断是否初始化，如果没初始化就执行，如果有就不需要执行
        this.initMap()
      }
    }, 300)
  },
  created () {
    this.id = getLocalStorage('id')
    this.formItemd = getLocalStorage('formItemd')
  },
  methods: {
    // 初始化地图
    initMap () {
      var base = new ol.layer.Tile({ // eslint-disable-line
        source: new ol.source.TileArcGISRest({
          url: 'http://202.105.25.138:20462/arcgis/rest/services/data_visualization/basemap_backgroud_normal/MapServer'
        })
      })
      // 定义
      var iconFeatures = []
      // 根据经纬度显示指定图标出现的位置
      var iconFeature = new ol.Feature(new ol.geom.Point(this.overlay))
      // 加载卫星图
      layers.GdPanoramaLayer = getLayer('GdPanoramaLayer')
      layers.FsPanoramaLayer = getLayer('FsPanoramaLayer')
      layers.FsNhLayer = getLayer('FsNhLayer')
      layers.notionLayer = getLayer('notionLayer')
      layers.warnLineLayer = getLayer('warnLineLayer')

      layers.Map = createMap(this.$refs['aPicture-map'], [
        layers.GdPanoramaLayer,
        layers.FsPanoramaLayer,
        layers.FsNhLayer,
        layers.notionLayer,
        layers.warnLineLayer
      ])
      // 监听singleclick事件，点击获取经纬度
      layers.Map.on('singleclick', (event) => {
        this.formItem.lng = event.coordinate[0]
        this.formItem.lat = event.coordinate[1]
        // 将经纬度赋值
        this.overlay = [this.formItem.lng, this.formItem.lat]
        // 利用setGeometry来设置
        iconFeature.setGeometry(new ol.geom.Point(this.overlay))
      })

      // 显示图标的图片
      iconFeature.set('style', new ol.style.Style({
        // 设置标注的图片
        image: new ol.style.Icon(({
          anchor: [0, 0],
          src: 'static/img/biaozhu.png'
        }))
      }))
      iconFeature.set('name', 'icon')
      // 设置好的东西在往iconFeatures里面添加，经纬度在哪里时候，标注图片就在哪里
      iconFeatures.push(iconFeature)

      var iconLayer = new ol.layer.Vector({
        style: function (feature) {
          return feature.get('style')
        },
        source: new ol.source.Vector({
          features: iconFeatures
        }),
        name: 'iconLayer',
        zIndex: 102
      })
      // 最后渲染出来
      layers.Map.addLayer(iconLayer)
    },
    addbtnx () {
      this.formItem.datas.push({})
    },
    // 点击新增就多一行tr
    addbtns () {
      this.athead.push()
    },
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
      this.$router.push('/home/depManagement/cangku')
    },
    // 表格显示
    _getuserlist (search) {
      search = {
        id: this.id
      }
      if (getLocalStorage('id') !== 'false') {
        getUserList(search).then(res => {
          if (res.code === ERR_OK) {
            this.formItem = this.formItemd
            this.overlay = [this.formItem.lng, this.formItem.lat]
            this.btn = true
            this.btns = false
          }
        })
      }
    },
    // 保存按钮时新增
    _sureBtn () {
      getaddlist(this.formItem).then(res => {
        if (res.code === ERR_OK) {
          this.$router.push('/home/depManagement/cangku')
          this.$Notice.success({
            title: '新增成功'
          })
        } else {
          this.$Notice.warning({
            title: '新增失败'
          })
        }
      })
    },
    // 页面点击修改按钮
    _gettiaoeditList () {
      geteditlist(this.formItem).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '修改成功'
          })
          this.$router.push('/home/depManagement/cangku')
        }
      })
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
