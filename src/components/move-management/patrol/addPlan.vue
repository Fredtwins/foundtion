<template>
    <div class="addPlan disable_class">
        <!-- 巡查任务安排-新增/修改 -->
        <Form ref="formItem" :model="model" :rules="ruleValidate">
            <div class="tableTitle">
                基本情况
            </div>
            <table class="ed-table">
                <tbody>
                    <tr>
                        <td class="ed-label">
                            <span class="font-color">* </span>任务标题</td>
                        <td class="ed-content">
                            <FormItem style="margin:0" prop="title">
                                <Input v-model="model.title" placeholder="请输入" style="width:95%"></Input>
                            </FormItem>
                        </td>
                        <td class="ed-label">
                            <span class="font-color">* </span>执行部门</td>
                        <td class="ed-content">
                            <FormItem style="margin: 0" prop="department_name">
                                <Select :label='model.department_name' not-found-text='无匹配部门，请重新输入' v-model="model.department_name" filterable remote :remote-method="autoSearch"
                                    :loading="selectLoading" style="width:95%" @on-change='selected'>
                                    <Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
                                </Select>
                            </FormItem>
                        </td>
                        <td class="ed-label">部门级别</td>
                        <td class="ed-content">
                            <FormItem style="margin:0">
                                <Input readonly v-model="model.department_level" placeholder="请输入" style="width:95%"></Input>
                            </FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td class="ed-label">部门编号</td>
                        <td class="ed-content">
                            <FormItem style="margin:0">
                                <Input readonly v-model="model.department_code" placeholder="请输入" style="width:95%"></Input>
                            </FormItem>
                        </td>
                        <td class="ed-label">
                            任务开始时间</td>
                        <td class="ed-content">
                            <FormItem style="margin:0">
                                <Input v-model="model.plan_startdt" placeholder="请输入" style="width:95%"></Input>
                            </FormItem>
                        </td>
                        <td class="ed-label">
                            任务结束时间</td>
                        <td class="ed-content">
                            <FormItem style="margin:0">
                                <Input v-model="model.plan_enddt" placeholder="请输入" style="width:95%"></Input>
                            </FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td class="ed-label">巡查人员</td>
                        <td class="ed-content" colspan="3">
                            <FormItem style="margin:0">
                                <Select v-model="patrolmanList" multiple style="width:95%" @on-change="patrolmanSelect">
                                    <Option v-for="item in patrolmanSelectList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </td>
                        <td class="ed-label">状态</td>
                        <td class="ed-content">
                            <FormItem style="margin:0">
                                <Select v-model="model.status" :disabled="formDisabled" placeholder="请选择" style="width:80%" disabled>
                                    <Option value="草稿">草稿</Option>
                                    <Option value="发布">发布</Option>
                                </Select>
                            </FormItem>
                        </td>
                    </tr>
                    <tr style="height:80px">
                        <td class="ed-label">
                            <span class="font-color">* </span>任务描述</td>
                        <td class="ed-content" colspan="5">
                            <FormItem style="margin:0" prop="task_desc">
                                <Input type="textarea" v-model="model.task_desc" placeholder="请输入" style="width:95%"></Input>
                            </FormItem>
                        </td>
                    </tr>
                    <!-- <tr>
                        <td class="ed-label">巡查路径</td>
                        <td class="ed-content patrol-router" colspan="5">
                            <div class="amap-page-container">
                                <el-amap-search-box class="search-box search-box-one" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
                                <div class="center-line">
                                    <Icon type="minus"></Icon>
                                </div>
                                <el-amap-search-box class="search-box search-box-tow" :search-option="searchOption" :on-search-result="onSearchEndResult"></el-amap-search-box>
                                <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
                                    <el-amap-marker :position="marker"></el-amap-marker>
                                    <el-amap-marker :position="markerEnd"></el-amap-marker>
                                </el-amap>
                            </div>
                        </td>
                    </tr> -->
                </tbody>
            </table>
            <div class="tableTitle">
                巡查路径
            </div>
            <div class="patrolRouter">
                <Button type="primary" icon="plus" @click="addRecord">添加</Button>
                <table class="routerTable">
                    <tr>
                        <td>经度</td>
                        <td>纬度</td>
                        <td>地址</td>
                        <td>描述</td>
                        <td>操作</td>
                    </tr>
                    <tr v-for="(item,index) in model.task_route" :key="item.lng" class="edit">
                        <td>
                            <Input placeholder="请在下面的地图上选择地点" readonly v-model="item.lng" style="width:90%"></Input>
                        </td>
                        <td>
                            <Input placeholder="请在下面的地图上选择地点" readonly v-model="item.lat" style="width:90%"></Input>
                        </td>
                        <td>
                            <Input placeholder="请输入地址" v-model="item.address" style="width:90%"></Input>
                        </td>
                        <td>
                            <Input v-model="item.check_desc" type="textarea" style="width:100%" placeholder="请输入"></Input>
                        </td>
                        <td>
                            <Button type="primary" @click="loctionEdit(index)">编辑</Button>
                            <Button type="error" @click="loctionDelete(index)">删除</Button>
                        </td>
                    </tr>
                </table>
                <div class="map">
                    <div class="amap-page-container">
                        <el-amap-search-box class="search-box search-box-one" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
                        <!-- <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo" :events="events"> -->
                        <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo" :events="events">
                            <el-amap-marker :position="marker"></el-amap-marker>
                        </el-amap>
                    </div>
                </div>
            </div>
            <!--地图-->
            <!-- <i-col span="24">
                <div id="myMap1">
                    <div class="amap-page-container">
                        <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
                        </el-amap>
                    </div>
                </div>
            </i-col> -->
        </Form>
        <div class="save pull-right" style="marginBottom:20px">
            <Button type="primary" size="large" @click="save" style="margin-right:15px">保存</Button>
            <Button type="ghost" size="large" @click="cancel">关闭</Button>
        </div>
    </div>
</template>

<script>
    // 她的父组件是哪个
    import { getDepList } from 'api/bumenlist'
    import { initTime, unique } from 'common/js/util'
    import { warningNotice } from 'common/js/dom'
    import { patrolPlanBookRules } from 'common/js/rules'
    import { addressBookApi } from 'api/daily-office'
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
          editSure: false,
          trIndex: null,
          marker: [121.59996, 31.197646],
          searchOption: {
            city: '佛山',
            citylimit: true
          },
          mapCenter: [113.17213016912342, 23.02122420436683],
          amapManager,
          center: [113.17213016912342, 23.02122420436683],
          zoom: 12,
          events: {
            init: (o) => {
              o.getCity(result => {
              })
            },
            'moveend': () => { },
            'zoomchange': () => { },
            'click': (e) => {
              if (this.model.task_route.length) {
                this.model.task_route[this.trIndex] = {
                  // address: pois[0].name,
                  lat: e.lnglat.lat,
                  lng: e.lnglat.lng
                }
              }
              this.$forceUpdate()
            }

          },
          formItem: {
            patrolman: [],
            status: '草稿',
            task_route: []
          },
          ruleValidate: patrolPlanBookRules,
          formDisabled: false,
          selectLoading: false,
          autoCompleteData: [],
          departmentList: [],
          patrolmanList: [],
          patrolmanSelectList: []
        }
      },
      created () {
        this.getDepartment()
        if (this.model.patrolman && this.model.patrolman.length) {
          this.patrolmanList = []
          this.model.patrolman.map(item => {
            this.patrolmanList.push(item.name)
          })
        }
        if (this.model.department_code) {
          this.getAddressBookList(this.model.department_code)
        }
      },
      mounted () {
        let startInput = document.querySelector('.search-box .search-box-wrapper input')
        startInput.setAttribute('placeholder', '请输入起始位置')
      },
      methods: {
        // 点击修改经纬度
        loctionEdit (index) {
          this.editSure = true
          this.trIndex = index
          let arr = document.querySelectorAll('.edit')
          for (let index = 0; index < arr.length; index++) {
            arr[index].style.background = '#fff'
          }
          arr[index].style.background = '#f8f8f9'
        },
        // 点击删除经纬度
        loctionDelete (index) {
          this.model.task_route.splice(index, 1)
        },
        addRecord () {
          this.editSure = false
          this.trIndex = this.model.task_route.length
          let index = this.model.task_route.length - 1
          let obj = this.model.task_route[index - 1]
          if (JSON.stringify(obj) !== '{}') {
            this.model.task_route.push({})
          } else {
            warningNotice('请选在地图上选择位置')
          }
        },
        addMarker: function (e) {
          if (this.model.task_route.length) {
            this.model.task_route[this.model.task_route.length - 1] = {
              lat: e.lnglat.lat,
              lng: e.lnglat.lng
            }
          }
          // let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
          // let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
          // this.markers.push([lng, lat]);
        },
        onSearchResult (pois) {
          let latSum = 0
          let lngSum = 0
          if (pois.length > 0) {
            this.model.task_route[this.trIndex] = {
              address: pois[0].name,
              lat: pois[0].lat,
              lng: pois[0].lng
            }
            pois.forEach(poi => {
              let { lng, lat } = poi
              lngSum += lng
              latSum += lat
            })
            this.marker = [pois[0].lng, pois[0].lat]
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            }
            this.mapCenter = [center.lng, center.lat]
          }
        },
        save () {
          this.model.task_route = this.model.task_route
          this.model.task_no = '巡' + '-' + initTime('seconds', 'task') + '-' + this.model.department_code
          this.$emit('save', { obj: this.model, refs: this.$refs.formItem })
        },
        cancel () {
          this.$emit('cencel', 'false')
        },
        patrolmanSelect (value) {
          this.model.patrolman = []
          value.map(item => {
            // let arr = []
            this.patrolmanSelectList.map(i => {
              if (i.name === item) {
                this.model.patrolman.push(i)
              }
            })
          })
        },
        selected (value) {
          let index = this.departmentList.findIndex(item => value === item.department_fullname)
          this.model.department_name = this.departmentList[index].department_fullname
          this.model.department_level = this.departmentList[index].department_level
          this.model.department_code = this.departmentList[index].department_code
          this.getAddressBookList(this.model.department_code)
        },
        autoSearch (query) {
          if (query !== '') {
            this.selectLoading = true
            setTimeout(() => {
              this.selectLoading = false
              this.autoCompleteData = this.departmentList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
            }, 200)
          } else {
            this.autoCompleteData = []
          }
        },
        // 获取通讯录信息
        getAddressBookList (code) {
          let obj = {
            searchValue: {
              department_code: code
            }
          }
          addressBookApi('list', obj).then(res => {
            if (res.code === '0000') {
              let arr = []
              arr = res.result.result.map(item => {
                return {
                  name: item.name,
                  telephone: item.telephoe
                }
              })
              this.patrolmanSelectList = unique(arr)
            }
          })
        },
        // 获取全部部门信息
        getDepartment () {
          getDepList().then(res => {
            if (res.code === '0000') {
              this.departmentList = res.result.result.map(item => {
                return {
                  value: item.fullname,
                  label: item.fullname,
                  department_fullname: item.fullname,
                  department_name: item.name,
                  department_code: item.code,
                  department_level: item.level
                }
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

    .amap-demo {
        height: 300px;
    }

    .search-box {
        position: absolute;
        top: 25px;
        left: 20px;
        width: 240px;
        height: 40px;
    }

    .search-box-tow {
        left: 240px;
    }

    .center-line {
        position: absolute;
        top: 30px;
        left: 225px;
        z-index: 999;
    }

    .amap-page-container {
        position: relative;
    }

    .addPlan {
        padding-top: 60px;
        width: 100%;
        .tableTitle {
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
            color: #fff;
            background: #40b0ff;
        }
        .patrolRouter {
            margin-top: 10px;
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
        }
        .ed-table {
            margin-bottom: 20px;
            width: 100%;
            tr {
                height: 0.5rem;
                .patrol-router {
                    input {
                        display: inline-block;
                    }
                }
                .ed-label {
                    width: 150px;
                    background: #f6f6f6;
                    text-align: center;
                    color: #303030;
                    font-size: 14px;
                    font-weight: bold;
                }
                .ed-content {
                    padding: 5px 1%;
                    background: #fff;
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
        #myMap1 {
            width: 100%;
            height: 450px;
        }
    }

    .save {
        margin-top: 10px;
    }
</style>
