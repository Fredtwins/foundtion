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
          <BreadcrumbItem to="/home/depManagement/tishan">堤上在建工程数据维护</BreadcrumbItem>
          <BreadcrumbItem>
            <a href="javascript:;" @click="cancel">堤上在建工程数据</a>
          </BreadcrumbItem>
          <!--<BreadcrumbItem>{{moduleTitle}}</BreadcrumbItem>-->
        </Breadcrumb>
      </div>
      <div class="editHead">
        <span>堤上在建工程数据信息</span>
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
                <td class="ed-label">地理位置</td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="地理位置" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.地理位置"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">填表人</td>
                <td class="ed-content">
                  <FormItem label prop="填表人" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.填表人"></Input>
                  </FormItem>
                </td>

                <td class="ed-label">填表时间</td>
                <td class="ed-content">
                  <FormItem label prop="填表时间" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.填表时间"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">复堤时间</td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="复堤时间" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.复堤时间"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">审核人</td>
                <td class="ed-content">
                  <FormItem label prop="审核人" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.审核人"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">复核人</td>
                <td class="ed-content">
                  <FormItem label prop="复核人" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.复核人"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">长度</td>
                <td class="ed-content">
                  <FormItem label prop="length" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.length"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">工程名称</td>
                <td class="ed-content">
                  <FormItem label prop="工程名称" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.工程名称"></Input>
                  </FormItem>
                </td>

                <td class="ed-label">工程性质</td>
                <td class="ed-content">
                  <FormItem label prop="工程性质" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.工程性质"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">建设单位</td>
                <td class="ed-content">
                  <FormItem label prop="建设单位" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.建设单位"></Input>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">开工日期</td>
                <td class="ed-content">
                  <FormItem label prop="开工日期" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.开工日期"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">所在堤围</td>
                <td class="ed-content">
                  <FormItem label prop="所在堤围" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.所在堤围"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">所在河道</td>
                <td class="ed-content">
                  <FormItem label prop="所在河道" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.所在河道"></Input>
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td class="ed-label">施工单位</td>
                <td class="ed-content">
                  <FormItem label prop="施工单位" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.施工单位"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">施工工期(天)</td>
                <td class="ed-content">
                  <FormItem label prop="施工工期(天)" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem['施工工期(天)']"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">施工许可证批准文号</td>
                <td class="ed-content">
                  <FormItem label prop="施工许可证批准文号" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.施工许可证批准文号"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">桩号</td>
                <td class="ed-content">
                  <FormItem label prop="桩号" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.桩号"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">监理单位</td>
                <td class="ed-content">
                  <FormItem label prop="监理单位" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.监理单位"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">破堤施工情况</td>
                <td class="ed-content">
                  <FormItem label prop="破堤施工情况" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.破堤施工情况"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">联系电话</td>
                <td class="ed-content">
                  <FormItem label prop="联系电话" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.联系电话"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">行业归口部门</td>
                <td class="ed-content">
                  <FormItem label prop="行业归口部门" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.行业归口部门"></Input>
                  </FormItem>
                </td>
              </tr>
              <!---->
              <!-- <tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">防汛责任制</td>
              </tr>-->
              <br>
              <h2 class="titlename">防汛责任制</h2>
              <tr>
                <td class="ed-label">防汛行政责任人</td>
                <td class="ed-content">
                  <FormItem label prop="防汛行政责任人.姓名" style="margin: 0">
                    <Input placeholder="请输入姓名" style="width:80%" v-model="formItem.防汛行政责任人['姓名']"></Input>
                  </FormItem>
                </td>
                <!--&nbsp;&nbsp;-->
                <td class="ed-label">防汛行政责任人单位</td>
                <td class="ed-content">
                  <FormItem label prop="防汛行政责任人.单位" style="margin: 0">
                    <Input placeholder="请输入单位" style="width:80%" v-model="formItem.防汛行政责任人['单位']"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">防汛行政责任人职务</td>
                <td class="ed-content">
                  <FormItem label prop="防汛行政责任人.职务" style="margin: 0">
                    <Input placeholder="请输入职务" style="width:80%" v-model="formItem.防汛行政责任人['职务']"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">防汛行政责任人电话</td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="防汛行政责任人.电话" style="margin: 0">
                    <Input placeholder="请输入电话" style="width:80%" v-model="formItem.防汛行政责任人['电话']"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">防汛技术责任人</td>
                <td class="ed-content">
                  <FormItem label prop="防汛技术责任人.姓名" style="margin: 0">
                    <Input placeholder="请输入姓名" style="width:80%" v-model="formItem.防汛技术责任人['姓名']"></Input>
                  </FormItem>
                </td>
                <!--&nbsp;&nbsp;-->
                <td class="ed-label">防汛技术责任人单位</td>
                <td class="ed-content">
                  <FormItem label prop="防汛技术责任人.单位" style="margin: 0">
                    <Input placeholder="请输入单位" style="width:80%" v-model="formItem.防汛技术责任人['单位']"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">防汛技术责任人职务</td>
                <td class="ed-content">
                  <FormItem label prop="防汛技术责任人.职务" style="margin: 0">
                    <Input placeholder="请输入职务" style="width:80%" v-model="formItem.防汛技术责任人['职务']"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">防汛技术责任人电话</td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="防汛技术责任人.电话" style="margin: 0">
                    <Input placeholder="请输入电话" style="width:80%" v-model="formItem.防汛技术责任人['电话']"></Input>
                  </FormItem>
                </td>
              </tr>
              <!--管理员-->
              <tr>
                <td class="ed-label">管理单位负责人</td>
                <td class="ed-content">
                  <FormItem label prop="管理单位负责人.姓名" style="margin: 0">
                    <Input placeholder="请输入姓名" style="width:80%" v-model="formItem.管理单位负责人['姓名']"></Input>
                  </FormItem>
                </td>
                <!--&nbsp;&nbsp;-->
                <td class="ed-label">管理单位负责人单位</td>
                <td class="ed-content">
                  <FormItem label prop="管理单位负责人.单位" style="margin: 0">
                    <Input placeholder="请输入单位" style="width:80%" v-model="formItem.管理单位负责人['单位']"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">管理单位负责人职务</td>
                <td class="ed-content">
                  <FormItem label prop="管理单位负责人.职务" style="margin: 0">
                    <Input placeholder="请输入职务" style="width:80%" v-model="formItem.管理单位负责人['职务']"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">管理单位负责人电话</td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="管理单位负责人.电话" style="margin: 0">
                    <Input placeholder="请输入电话" style="width:80%" v-model="formItem.管理单位负责人['电话']"></Input>
                  </FormItem>
                </td>
              </tr>
              <!--应急预警-->
              <!-- <tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">应急预警</td>
              </tr>-->
              <br>
              <h2 class="titlename">应急预警</h2>
              <tr>
                <td class="ed-label">防洪预案是否编辑</td>
                <td class="ed-content">
                  <FormItem label prop="防洪预案是否编制" style="margin: 0">
                    <RadioGroup v-model="formItem.防洪预案是否编制">
                      <Radio label="是都">是</Radio>
                      <Radio label="否">否</Radio>
                    </RadioGroup>
                  </FormItem>
                </td>
                <td class="ed-label">群众转移方案是否编辑</td>
                <td class="ed-content">
                  <FormItem label prop="群众转移方案是否编制" style="margin: 0">
                    <RadioGroup v-model="formItem.群众转移方案是否编制">
                      <Radio label="是的">是</Radio>
                      <Radio label="否">否</Radio>
                    </RadioGroup>
                  </FormItem>
                </td>
              </tr>
              <!---->
              <tr>
                <td class="ed-label">其他相关预案(名称)</td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="其他相关预案(名称)" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem['其他相关预案(名称)']"></Input>
                  </FormItem>
                </td>
              </tr>
              <!--应急抢救-->
              <!-- <tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">应急抢救</td>
              </tr>-->
              <br>
              <h2 class="titlename">应急抢救</h2>
              <tr>
                <td class="ed-label">抢险队伍人数（人）</td>
                <td class="ed-content">
                  <FormItem label prop="抢险队伍.人数（人）" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.抢险队伍['人数（人）']"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">负责人姓名</td>
                <td class="ed-content">
                  <FormItem label prop="抢险队伍.负责人姓名" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.抢险队伍['负责人姓名']"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">负责人电话</td>
                <td class="ed-content">
                  <FormItem label prop="抢险队伍.负责人电话" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.抢险队伍['负责人电话']"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">联系人姓名</td>
                <td class="ed-content">
                  <FormItem label prop="抢险队伍.联系人姓名" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.抢险队伍['联系人姓名']"></Input>
                  </FormItem>
                </td>
                <td class="ed-label">联系人电话</td>
                <td class="ed-content">
                  <FormItem label prop="抢险队伍.联系人电话" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.抢险队伍['联系人电话']"></Input>
                  </FormItem>
                </td>
              </tr>
              <!--防汛抢险物资储备现状情况-->
              <!-- <tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">防汛抢险物资储备现状情况</td>
              </tr>-->
              <br>
              <h2 class="titlename">物资储备现状情况</h2>
              <tr>
                <td class="ed-label">袋类（条）</td>
                <td class="ed-content">
                  <FormItem label prop="防汛抢险物资储备现状情况.袋类（条）" style="margin: 0">
                    <Input
                      placeholder="请输入"
                      style="width:80%"
                      v-model="formItem.防汛抢险物资储备现状情况['袋类（条）']"
                    ></Input>
                  </FormItem>
                </td>
                <td class="ed-label">土工布（m²）</td>
                <td class="ed-content">
                  <FormItem label prop="防汛抢险物资储备现状情况.土工布（m²）" style="margin: 0">
                    <Input
                      placeholder="请输入"
                      style="width:80%"
                      v-model="formItem.防汛抢险物资储备现状情况['土工布（m²）']"
                    ></Input>
                  </FormItem>
                </td>
                <td class="ed-label">砂石(m³)</td>
                <td class="ed-content">
                  <FormItem label prop="防汛抢险物资储备现状情况.砂石(m³)" style="margin: 0">
                    <Input
                      placeholder="请输入"
                      style="width:80%"
                      v-model="formItem.防汛抢险物资储备现状情况['砂石(m³)']"
                    ></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">块石（m³）</td>
                <td class="ed-content">
                  <FormItem label prop="防汛抢险物资储备现状情况.块石（m³）" style="margin: 0">
                    <Input
                      placeholder="请输入"
                      style="width:80%"
                      v-model="formItem.防汛抢险物资储备现状情况['块石（m³）']"
                    ></Input>
                  </FormItem>
                </td>
                <td class="ed-label">救生衣(件)</td>
                <td class="ed-content">
                  <FormItem label prop="防汛抢险物资储备现状情况.救生衣(件)" style="margin: 0">
                    <Input
                      placeholder="请输入"
                      style="width:80%"
                      v-model="formItem.防汛抢险物资储备现状情况['救生衣(件)']"
                    ></Input>
                  </FormItem>
                </td>
                <td class="ed-label">存放点与水库(山塘)距离（m）</td>
                <td class="ed-content">
                  <FormItem label prop="防汛抢险物资储备现状情况.存放点与工程距离（m）" style="margin: 0">
                    <Input
                      placeholder="请输入"
                      style="width:80%"
                      v-model="formItem.防汛抢险物资储备现状情况['存放点与工程距离（m）']"
                    ></Input>
                  </FormItem>
                </td>
              </tr>
              <!-- <tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">防洪评价</td>
              </tr>-->
              <br>
              <h2 class="titlename">防洪评价</h2>
              <tr>
                <td class="ed-label">是否进行过防洪评价</td>
                <td class="ed-content">
                  <FormItem label prop="防洪评价.是否进行过防洪评价" style="margin: 0">
                    <RadioGroup v-model="formItem.防洪评价['是否进行过防洪评价']">
                      <Radio label="有d">有</Radio>
                      <Radio label="否">否</Radio>
                    </RadioGroup>
                  </FormItem>
                </td>
                <td class="ed-label">时间</td>
                <td class="ed-content">
                  <FormItem label prop="防洪评价.时间" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.防洪评价['时间']"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">补救措施落实情况</td>
                <td class="ed-content">
                  <FormItem label prop="防洪评价.补救措施落实情况" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.防洪评价['补救措施落实情况']"></Input>
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td class="ed-label">主要结论</td>
                <td class="ed-content" colspan="5">
                  <FormItem label prop="防洪评价.主要结论" style="margin: 0">
                    <Input placeholder="请输入" style="width:80%" v-model="formItem.防洪评价['主要结论']"></Input>
                  </FormItem>
                </td>
              </tr>
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
            </tbody>
          </table>
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
      <div class="editFooter"></div>
    </div>
  </div>
</template>

<script>
import { getUserList, getaddlist, geteditlist } from 'api/tishan'
import { getLocalStorage } from 'common/js/dom'
import vueAMap from 'vue-amap'
import { getLayer, createMap } from 'api/map'
let layers = {}
let amapManager = new vueAMap.AMapManager()

export default {
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
        name: '社区'
      }, {
        name: '需要转移人数'
      }, {
        name: '已转移人数'
      }, {
        name: '时间'
      }],
      tdthead: new Array(1),
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
        抢险队伍: {},
        管理单位负责人: {},
        防汛技术责任人: {},
        防汛抢险物资储备现状情况: {},
        防汛行政责任人: {},
        防洪评价: {}
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
    // 点击新增就多一行tr
    addbtns () {
      this.tdthead.length++
      this.tdthead.push()
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
      this.$router.push('/home/depManagement/tishan')
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
          this.$router.push('/home/depManagement/tishan')
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
          this.$router.push('/home/depManagement/tishan')
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
	.buto {
		float: right;
		width: 80px;
		height: 40px;
		margin-left: 5px;
		margin-bottom: 10px;
	}
</style>
