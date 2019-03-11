<template>
  <div class="template">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>部门管理</BreadcrumbItem>
        <BreadcrumbItem>微信公众服务</BreadcrumbItem>
        <BreadcrumbItem>模板管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">作者</span>
      <Input
        v-model="searchVal.author"
        placeholder="禁用"
        readonly
        style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
      ></Input>
      <div class="pull-right" @click="add">
        <Button type="info">定义模板</Button>
      </div>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
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
    <div class="page pageStyle pull-right">
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <div class="addPage" v-if="showPage">
      <div class="title">
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>部门管理</BreadcrumbItem>
          <BreadcrumbItem>微信公众服务</BreadcrumbItem>
          <BreadcrumbItem>模板管理</BreadcrumbItem>
          <BreadcrumbItem>定义模板</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="addPagetitle">
        <BreadcrumbItem>模板定义</BreadcrumbItem>
        <div class="buttons pull-right">
          <Button class="addBtn" @click="addLine">
            <Icon type="plus-round"></Icon>添加栏位
          </Button>
          <Button type="primary" @click="save">保存</Button>
        </div>
      </div>
      <div class="inputModule">
        <Form :model="formItem" :label-width="80" class="forms">
          <Form-item label="类型" prop="department_name" style="width:300px">
            <Input v-model="formItem.type" placeholder="请输入类型" style="width:300px"></Input>
          </Form-item>
          <Form-item label="部门" prop="department_name" style="width:300px">
            <Input v-model="formItem.type" placeholder="请输入类型" style="width:300px"></Input>
          </Form-item>
          <FormItem label="表单名称" style="width:600px">
            <Input v-model="formItem.form_name" placeholder="请输入表单名称" style="width:600px"></Input>
          </FormItem>
        </Form>
      </div>
      <div class="table">
        <Table
          :loading="loading"
          border
          stripe
          size="small"
          highlight-row
          :columns="theadArr"
          :data="addTableData"
        ></Table>
      </div>
      <!--模态框  -->
      <template slot="content">
        <Modal v-model="sureShow">
          <div slot="header">{{updateTitle}}</div>
          <Form :model="formItem" :label-width="80">
            <Form-item label="栏位名称">
              <Input v-model="info['栏位名称']" placeholder="请输入栏位名称"></Input>
            </Form-item>
            <FormItem label="栏位类型">
              <Select v-model="info['栏位类型']">
                <Option value="文字">文字</Option>
                <Option value="数字">数字</Option>
              </Select>
            </FormItem>
            <Form-item label="栏位说明">
              <Input v-model="info['栏位说明']" placeholder="请输入栏位说明"></Input>
            </Form-item>
          </Form>
          <div slot="footer">
            <Button type="primary" @click="ok">保存</Button>
          </div>
        </Modal>
        <!--确认删除  -->
        <Modal v-model="sureDel" width="360">
          <p slot="header" style="color:red;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除</span>
          </p>
          <div style="text-align:center">
            <p>确认删除此栏位？</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="sureDelete">确认</Button>
          </div>
        </Modal>
      </template>
    </div>
  </div>
</template>

<script>
import { modalThead, addThaed } from 'common/js/table'
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['STATUS'])
  },
  watch: {
    STATUS: {
      handler: function (val, oldval) {
        if (val === false) {
          this.disabled = false
          this.showPage = false
        }
      }
    }
  },
  data () {
    return {
      modal_loading: false,
      sureDel: false,
      sureShow: false,
      updateTitle: '添加栏位',
      formItem: {
        col_info: []
      },
      ruleInline: {},
      showPage: false,
      tableThead: modalThead(this),
      tableTbody: [
        {
          form_name: '表单名称',
          type: '类型',
          content: '今天天气不错',
          department_name: '三防办'
        }
      ],
      loading: false,
      total: 1,
      searchVal: {},
      titelText: '新增',
      info: {},
      addTableData: [],
      theadArr: addThaed(this)
    }
  },
  methods: {
    del (obj) {
      this.addTableData.splice(obj._index, 1)
    },
    sureDelete () { },
    addLine () {
      this.sureShow = true
    },
    save () {
      this.formItem.col_info = this.addTableData
      if (this.titelText === '新增') {
        this.tableTbody.unshift(this.formItem)
      } else {
        this.tableTbody.splice(this.formItem._index, 1, this.formItem)
      }
      this.showPage = false
    },
    ...mapMutations(['SET_STATUS']),
    pageChange (index) { },
    add () {
      this.showPage = true
      this.titelText = '新增'
      this.formItem = {
        col_info: []
      }
      this.SET_STATUS(true)
    },
    search () { },
    ok () {
      this.sureShow = false
      this.addTableData.unshift(this.info)
    },
    cancel () {
      this.showPage = false
    },
    edit (obj) {
      this.showPage = true
      this.formItem = obj
      this.titelText = '修改'
      this.SET_STATUS(true)
      if (this.formItem.col_info) {
        this.addTableData = this.formItem.col_info
      } else {
        this.addTableData = []
      }
    }
  }
}
</script>
<style scoped lang="scss">
    .template {
        height: 100%;
        padding-top: 45px;
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
        .search {
            margin-bottom: 15px;
            .searchBtn {
                display: inline-block;
            }
        }
        .addPage {
            padding: 0 10px;
            z-index: 3;
            height: 100%;
            width: 100%;
            background: #fff;
            position: absolute;
            top: 0;
            left: 0;
            .addPagetitle {
                padding-top: 70px;
                text-align: center;
                font-size: 20px;
                margin-bottom: 25px;
            }
            .inputModule {
                margin: 0 auto;
                width: 200rem;
            }
            form {
                /* margin-top: 60px; */
                margin-bottom: 20px;
            }
        }
    }
</style>
