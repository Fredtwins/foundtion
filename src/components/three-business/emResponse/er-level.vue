<template>
  <div class="er-level">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
        <BreadcrumbItem>预案管理</BreadcrumbItem>
        <BreadcrumbItem>应急响应级别</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">应急响应类型</span>
      <Select
        v-model="searchVal.response_type"
        placeholder="请选择"
        :clearable="true"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      >
        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span class="search_title">级别</span>
      <Select
        v-model="searchVal.response_level"
        placeholder="请选择"
        :clearable="true"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      >
        <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <!-- <div class="add pull-right" @click="add">
                <Button type="primary">新增</Button>
      </div>-->
    </div>
    <div class="table">
      <Table
        :loading="loading"
        border
        stripe
        size="small"
        highlight-row
        :columns="tableThead"
        :data="tableTbody"
      ></Table>
    </div>
    <div class="page">
      <Page :total="total" @on-change="pageChange" show-elevator show-total :page-size="pageSize"></Page>
    </div>
    <!-- 明细 -->
    <Modal v-model="disabled" width="600">
      <p slot="header" style="font-size:20px;text-align:center">
        <span>详细信息</span>
      </p>
      <div style="text-align:center" class="disabled-color">
        <Form :model="formItem" :label-width="100">
          <FormItem label="应急响应类型" prop="response_type">
            <Select v-model="formItem.response_type" :disabled="formDisabled">
              <Option value="防风">防风</Option>
              <Option value="防汛">防汛</Option>
              <Option value="防旱">防旱</Option>
              <Option value="防旱">防暴雨</Option>
            </Select>
          </FormItem>
          <FormItem label="级别" prop="response_level">
            <Select v-model="formItem.response_level" :disabled="formDisabled">
              <Option value="I级">I级</Option>
              <Option value="II级">II级</Option>
              <Option value="III级">III级</Option>
              <Option value="VI级">VI级</Option>
            </Select>
          </FormItem>
          <FormItem label="描述" prop="desc">
            <Input
              :disabled="formDisabled"
              v-model="formItem.desc"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder
            ></Input>
          </FormItem>
          <FormItem label="标准" prop="criteria">
            <Input
              :disabled="formDisabled"
              v-model="formItem.criteria"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder
            ></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="sureBtn">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { erLevelThead } from 'common/js/table'
import { getErlList } from 'api/er-level'
import { erLevelQuery } from 'common/js/query'
import { errorNotice } from 'common/js/dom'

export default {
  data () {
    return {
      pageSize: 10,
      loading: false,
      formDisabled: false,
      moduleTitle: '新增',
      disabled: false,
      formItem: {
        response_type: '',
        response_level: '',
        desc: '',
        criteria: ''
      },
      total: 0,
      postObj: {
        'page': 1,
        'pageSize': 10,
        'searchValue': {},
        'order': {_id: -1}
      },
      tableThead: erLevelThead(this),
      tableTbody: [],
      searchVal: {
        response_type: '',
        response_level: ''
      },
      typeList: erLevelQuery().typeList,
      levelList: erLevelQuery().levelList
    }
  },
  created () {
    this._getErlList()
  },
  methods: {
    add () {
      this.disabled = true
      this.formDisabled = false
      this.moduleTitle = '新增'
      this.formItem = {}
    },
    sureBtn () {
      this.disabled = false
    },
    eidt (dataObj) {
      this.formDisabled = true
      this.disabled = true
      this.moduleTitle = '修改'
      this.formItem = dataObj
    },
    _getErlList () {
      this.loading = true
      getErlList(this.postObj).then(res => {
        this.loading = false
        if (res) {
          if (res.code === '0000') {
            this.tableTbody = res.result.result
            this.total = res.result.totalSize
          }
        } else {
          errorNotice('服务器未连接，')
        }
      })
    },
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.postObj.searchValue = this.searchVal
      this._getErlList()
    },
    pageChange (index) {
      this.postObj.page = index
      this._getErlList()
    }
  }
}
</script>

<style scoped lang="scss">
  .er-level {
    height: 100%;
    .title{
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
			> span{
				font-size: 14px;
				font-weight: 600;
			}
		}
    .search {
      margin-bottom: 15px;
      .searchBtn {
        display: inline-block;
      }
    }
  }
</style>
