<template>
  <div class="tiweiweihu">
    <div class="title">
      <BreadcrumbItem>数据</BreadcrumbItem>
      <!-- </Breadcrumb> -->
    </div>
    <div class="edit">
      <div class="title">
        <span class="titleleft"></span>
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>部门管理</BreadcrumbItem>
          <BreadcrumbItem>部门数据维护</BreadcrumbItem>
          <BreadcrumbItem to="/home/depManagement/paishuikou">排水口数据维护</BreadcrumbItem>
          <BreadcrumbItem>
            <a href="javascript:;" @click="cancel">排水口数据</a>
          </BreadcrumbItem>
          <!--<BreadcrumbItem>{{moduleTitle}}</BreadcrumbItem>-->
        </Breadcrumb>
      </div>
      <div class="editHead">
        <span>排水口数据信息</span>
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
                <td class="ed-label">主键ID</td>
                <td class="ed-content" colspan="5">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.strivkeypntid"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">河流关联ID</td>
                <td class="ed-content" colspan="5">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.strivid"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">编号</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.pntcode"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">名称</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.pntname"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">点类型</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.pnttype"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">真实经度</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.orilng"></Input>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">真实纬度</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.orilat"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">备注</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.pntcomment"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">建档日期</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.builddate"></Input>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">建档人</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.buildman"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">原图路径</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.oriimgpath"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">缩略图路径</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.zoomimgpath"></Input>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">显示顺序</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.showorder"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">地理位置</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.pntplace"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">丢弃</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.unused"></Input>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">排水口尺寸</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.trnsieze"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">排水扣管底高程</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.trnheight"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">排水类别</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.trntype"></Input>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">排水来源</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.trnsource"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">排水量</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.tonnage"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">整治方式</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.trnhandleway"></Input>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">整治年份</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.trnhandleyear"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">缩略到微型的图片</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.zoomicon"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">岸别</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.pntdir"></Input>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">采集人</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.colman"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">采集日期</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.coldate"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">更多图片</td>
                <td class="ed-content">
                  <FormItem label style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.haspics"></Input>
                  </FormItem>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="patrolRouter">
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
          <i-col span="24">
            <div id="myMap1">
              <div class="amap-page-container">
                <el-amap
                  ref="map"
                  vid="amapDemo"
                  :amap-manager="amapManager"
                  :center="center"
                  :zoom="zoom"
                  :events="events"
                  class="amap-demo"
                >
                  <el-amap-marker
                    v-for="(marker, index) in markers"
                    :position="marker.position"
                    :title="marker.title"
                    :vid="index"
                    :key="index"
                  ></el-amap-marker>
                </el-amap>
              </div>
            </div>
          </i-col>
        </Form>
      </div>
      <div class="editFooter clear"></div>
    </div>
  </div>
</template>

<script>
import { getpaishuikoulist, getpaishuikouedit, getpaishuikouadd } from 'api/shujuage'
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
      this.$router.push('/home/depManagement/paishuikou')
    },
    // 表格显示
    _getuserlist (search) {
      search = {
        id: this.id
      }
      if (getLocalStorage('id') !== 'false') {
        getpaishuikoulist(search).then(res => {
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
    },
    // 页面点击修改按钮
    _gettiaoeditList () {
      getpaishuikouedit(this.formItem).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '修改成功'
          })
          this.$router.push('/home/depManagement/paishuikou')
        }
      })
    },
    // 保存按钮时新增
    _sureBtn () {
      getpaishuikouadd(this.formItem).then(res => {
        if (res.code === ERR_OK) {
          this.$router.push('/home/depManagement/paishuikou')
          this.$Notice.success({
            title: '新增成功'
          })
        } else {
          this.$Notice.warning({
            title: '新增失败'
          })
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
