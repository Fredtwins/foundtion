<template>
  <div class="scene-reported">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>部门管理</BreadcrumbItem>
        <BreadcrumbItem>微信公众服务</BreadcrumbItem>
        <BreadcrumbItem>现场上报管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">上报人员</span>
      <Input
        v-model="searchVal.reporter"
        placeholder="请输入"
        style="width:2rem;padding-left: 0.1rem;padding-right: 0.2rem"
      ></Input>
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
    <Modal v-model="showPage" class="modal" title="详情" @on-cancel="cancel" @on-ok="ok">
      <Form ref="formItem" :model="formItem" :label-width="60">
        <FormItem label="上报人员">
          <Input type="text" v-model="formItem.reporter" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="上报时间">
          <Input type="text" v-model="formItem.reporttime" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="上报类型">
          <Input type="text" v-model="formItem.type" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="上报内容">
          <Input type="textarea" :rows="7" v-model="formItem.content" placeholder="请输入"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { reportedThead } from 'common/js/table'

export default {
  data () {
    return {
      tableThead: reportedThead(this),
      tableTbody: [
        {
          reporter: '某某某',
          reporttime: '2018-04-25',
          type: '测试类型',
          content: '测试'
        }
      ],
      total: 0,
      loading: false,
      showPage: false,
      formItem: {},
      searchVal: {}
    }
  },
  methods: {
    pageChange (index) {},
    edit (obj) {
      this.showPage = true
      this.formItem = obj
    },
    cancel () {
      this.showPage = false
    },
    ok () {
      this.showPage = false
    },
    search () {}
  }
}
</script>
<style scoped lang="scss">
  .scene-reported {
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
      > span {
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
      form {
        margin-top: 60px;
        margin-bottom: 20px;
      }
    }
  }
</style>
