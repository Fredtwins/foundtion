<template>
  <div class="event-management">
    <div class="search">
      <!-- <span class="search_title">执行部门</span>
            <Select clearable :label='searchVal.department_fullname' not-found-text='无匹配部门，请重新输入' v-model="searchVal.department_fullname"
                filterable remote :remote-method="autoSearch" :loading="selectLoading" style="width:200px;padding-left: 10px;padding-right: 20px"
                @on-change='selected'>
                <Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>-->
      <span class="search_title">事件类型</span>
      <Select
        v-model="searchVal.event"
        placeholder="请选择"
        :clearable="true"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      >
        <Option value="闸站水位预警">闸站水位预警</Option>
        <Option value="水库水位预警">水库水位预警</Option>
        <Option value="地质灾害预警">地质灾害预警</Option>
      </Select>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <div class="add pull-right" @click="add('formItem')" v-if="isshow">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
      </div>
    </div>
    <div class="general_content table">
      <Table
        border
        :loading="loading"
        stripe
        size="small"
        highlight-row
        :columns="tableThead"
        :data="tableTbody"
      ></Table>
    </div>
    <div class="page pageStyle pull-right">
      <Page :total="total" @on-change="pageChange" show-elevator show-total :page-size="pageSize"></Page>
    </div>
    <!-- 新增 -->
    <Modal v-model="addPageShow" width="650" class="modal modal-event disabled-color">
      <p slot="header" style="font-size:20px;text-align:center">
        <span>{{titleText}}</span>
      </p>
      <div>
        <Form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="80">
          <FormItem label="事件类型" prop="event">
            <Select
              :disabled="formDisabled"
              v-model="formItem.event"
              placeholder="请选择"
              :clearable="true"
              style="width:200px;padding-right: 20px"
            >
              <Option value="闸站水位预警">闸站水位预警</Option>
              <Option value="水库水位预警">水库水位预警</Option>
              <Option value="地质灾害预警">地质灾害预警</Option>
            </Select>
          </FormItem>
          <FormItem label="站点名称" prop="station_name">
            <Select
              style="width:200px"
              :disabled="formDisabled"
              clearable
              :label="formItem.station_name"
              not-found-text="无匹配站点，请重新输入"
              v-model="formItem.station_name"
              filterable
              remote
              :remote-method="autoSearch"
              @on-change="selected"
              :loading="selectLoading"
            >
              <Option
                v-for="(option, index) in autoCompleteData"
                :value="option.station_name"
                :key="index"
              >{{option.station_name}}</Option>
            </Select>
          </FormItem>
          <!-- <FormItem label="站点名称" prop="station_name">
                      <Select
                        style="width:200px"
                        v-model="formItem.station_name"
                        filterable
                        :disabled="formDisabled"
                        clearable
                        not-found-text='无匹配站点，请重新输入'
                        @on-change='selected'>
                        <Option v-for="(item, index) in autoCompleteData"
                          :value="item.staion_name"
                          :key="index">{{item.station_name}}</Option>
                      </Select>
          </FormItem>-->
          <FormItem label="警戒标准" prop="event_critieria">
            <!-- <InputNumber :disabled="formDisabled" v-model="formItem.event_critieria" style="width:200px"></InputNumber> -->
            <Input
              placeholder="请输入"
              :disabled="formDisabled"
              v-model="formItem.event_critieria"
              style="width:200px"
            ></Input>
          </FormItem>
          <FormItem label="建议" prop="advise">
            <Input
              :disabled="formDisabled"
              placeholder="请输入"
              type="textarea"
              :rows="8"
              v-model="formItem.advise"
            ></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="sureBtn('formItem')">确认</Button>
      </div>
    </Modal>
    <!--确认删除  -->
    <Modal v-model="sure_del" width="360">
      <p slot="header" style="color:red;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除</span>
      </p>
      <div style="text-align:center">
        <p>确认删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="sureDelete">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getLocalStorage, errorNotice, successNotice } from 'common/js/dom'
import { eventThead } from 'common/js/table'
import { EventManagement } from 'common/js/rules'
import { getAllList, getAllWaterList, eventApi, getdepList } from 'api/plan_management'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      titleText: '',
      pageSize: 5,
      sure_del: false,
      selectLoading: false,
      autoCompleteData: [],
      searchVal: {},
      loading: false,
      isshow: true,
      tableThead: eventThead(this),
      tableTbody: [],
      id: '',
      addPageShow: false,
      ruleValidate: EventManagement,
      formItem: {},
      moduleTitle: '新增',
      formDisabled: false,
      total: 0,
      sluiceList: [],
      waterList: [],
      plan_no: '',
      postObj: {
        page: 1,
        pageSize: 5,
        searchValue: {},
        order: {
          _id: -1
        }
      },
      apiType: 'list',
      deleteId: ''
    }
  },
  created () {
    // this.id = this.id = getLocalStorage("id")
    // this.getList()
    if (getLocalStorage('status') === 'details') {
      this.isshow = false
    }
    this.getSlluicegateList()
    this.getWaterList()
    this.getPlanNo()
  },
  methods: {
    StaionnameArr () {
      // if (!this.formItem.station_name) {
      //   return this.autoCompleteData
      // }
      let arr = []
      this.autoCompleteData.map(item => {
        if (item.station_name === this.formItem.station_name) {
          arr.push(item)
        }
      })
      return arr
    },
    autoSearch (query) {
      if (query && query !== '') {
        this.selectLoading = true
        setTimeout(() => {
          this.selectLoading = false
          if (this.formItem.event === '闸站水位预警') {
            this.autoCompleteData = this.sluiceList.filter(item => item.station_name.toLowerCase().indexOf(query.toLowerCase()) > -1)
          } else if (this.formItem.event === '水库水位预警') {
            this.autoCompleteData = this.waterList.filter(item => item.station_name.toLowerCase().indexOf(query.toLowerCase()) > -1)
          } else if (this.formItem.event === '地质灾害预警') {
            this.autoCompleteData = [{station_id: 'disasters01', station_name: '大沥'},
              {station_id: 'disasters02', station_name: '丹灶'},
              {station_id: 'disasters03', station_name: '桂城'},
              {station_id: 'disasters04', station_name: '西樵'},
              {station_id: 'disasters05', station_name: '九江'},
              {station_id: 'disasters06', station_name: '狮山'},
              {station_id: 'disasters07', station_name: '里水'}]
          }
        }, 200)
      } else {
        this.autoCompleteData = []
      }
    },
    selected (section) {
      this.autoCompleteData = this.autoSearch(section)
    },
    sureBtn (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.addPageShow = false
          let index = this.autoCompleteData.findIndex(item => item.station_name === this.formItem.station_name)
          this.formItem.station_id = this.autoCompleteData[index].station_id
          eventApi(this.apiType, this.formItem).then(res => {
            if (res.code === '0000') {
              successNotice(res.message)
              this.getPlanNo()
            } else {
              errorNotice(res.message)
            }
          })
        }
      })
    },
    add (name) {
      // this.autoCompleteData = []
      this.titleText = '新增'
      this.$refs[name].resetFields()
      this.addPageShow = true
      this.apiType = 'new'
      this.formItem = {}
      this.formItem.plan_no = this.plan_no
      // this.formItem.event_critieria = 0
    },
    managementEdit (dataObj) {
      this.titleText = '编辑'
      this.addPageShow = true
      this.apiType = 'edit'
      this.$nextTick(() => {
        this.formItem = dataObj
        this.selected(dataObj.station_name)
      })
    },
    managementDelete (dataObj) {
      this.sure_del = true
      this.apiType = 'delete'
      this.deleteId = dataObj._id
    },
    sureDelete () {
      eventApi('delete', { _id: this.deleteId }).then(res => {
        this.sure_del = false
        if (res.code === '0000') {
          successNotice('删除成功')
          this.getPlanNo()
        } else {
          errorNotice(res.message)
        }
      })
    },
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.searchVal.plan_no = this.plan_no
      this.postObj.searchValue = this.searchVal
      this.getPlanNo()
    },
    pageChange (index) {
      this.postObj.page = index
      this.getPlanNo()
    },
    getList () {
      this.loading = true
      this.postObj.searchValue.plan_no = this.plan_no
      eventApi('list', this.postObj).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
          } else {
            errorNotice(res.message, true)
          }
        } else {
          errorNotice('服务器未连接，')
        }
      })
    },
    managementDetails (dataObj) {
      this.addPageShow = true
      this.titleText = '详情'
      this.formItem = dataObj
      this.formDisabled = true
    },
    // 获取预案编号
    getPlanNo () {
      getdepList({
        searchValue: { _id: getLocalStorage('id') }
      }).then(res => {
        if (getLocalStorage('id') === ' ') {
          errorNotice('请先填写基本信息', true)
          let obj = getLocalStorage('active')
          obj.second = 0
          getLocalStorage('active', obj)
          this.$router.push('/home/threeBusiness/er_plan/general')
        }
        if (res.code === '0000') {
          this.formItem.plan_no = res.result.result[0].plan_no
          this.plan_no = res.result.result[0].plan_no
          this.getList()
        }
      })
    },
    // 获取所有闸站站点
    getSlluicegateList () {
      getAllList().then(res => {
        if (res.code === '0000') {
          res.result.result.map(item => {
            this.sluiceList.push({
              station_name: item.sluicegate_name,
              station_id: item.stainfoid
            })
          })
        }
      })
    },
    // 获取所有水库站点
    getWaterList () {
      getAllWaterList().then(res => {
        if (res.code === '0000') {
          res.result.result.map(item => {
            this.waterList.push({
              station_name: item.pool_name,
              station_id: item.stn_no
            })
          })
        }
      })
    },
    ...mapMutations([
      'SET_DEPARTREPORTINFO'
    ])
  }
}
</script>

<style scoped lang="scss">
  .event-management {
    height: 100%;
    .search {
      margin-bottom: 15px;
      .searchBtn {
        display: inline-block;
      }
      .refresh {
        display: inline-block;
        button {
          border-radius: 0;
          background: #18bdff;
          color: #fff;
        }
      }
    }
    .save {
      margin: 20px;
    }
  }
</style>
