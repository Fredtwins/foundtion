<template>
  <div class="article">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>部门管理</BreadcrumbItem>
        <BreadcrumbItem>微信公众服务</BreadcrumbItem>
        <BreadcrumbItem>文章管理</BreadcrumbItem>
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
      <div class="add pull-right" @click="add">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增
        </Button>
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
    <Modal v-model="showPage" class="modal" :title="titelText" @on-ok="ok" @on-cancel="cancel">
      <Form ref="formItem" :model="formItem" :rules="ruleInline" :label-width="80">
        <FormItem label="标题" prop="title">
          <Input type="text" v-model="formItem.title" placeholder="请输入"></Input>
        </FormItem>
        <!-- <FormItem label="状态" prop="status">
                    <Select type="text" v-model="formItem.status" placeholder="请选择">
                        <Option value="草稿"></Option>
                        <Option value="已发布"></Option>
                    </Select>
        </FormItem>-->
        <FormItem label="内容" prop="content">
          <Input type="textarea" :rows="7" v-model="formItem.content" placeholder="请输入"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { articleThead } from 'common/js/table'

export default {
  data () {
    return {
      formItem: {},
      ruleInline: {},
      showPage: false,
      tableThead: articleThead(this),
      tableTbody: [
        {
          author: '小白',
          title: '测试',
          content: '今天天气不错'
        }
      ],
      loading: false,
      total: 1,
      searchVal: {},
      titelText: '新增'
    }
  },
  methods: {
    pageChange (index) { },
    add () {
      this.showPage = true
      this.titelText = '新增'
      this.formItem = {}
    },
    search () { },
    ok () {
      if (this.titelText === '新增') {
        this.tableTbody.unshift(this.formItem)
      } else {
        this.tableTbody.splice(this.formItem._index, 1, this.formItem)
      }
    },
    cancel () {
      this.showPage = false
    },
    edit (obj) {
      this.showPage = true
      this.formItem = obj
      this.titelText = '修改'
    },
    delete (index) {
      this.tableTbody.splice(index, 1)
    }
  }
}
</script>
<style scoped lang="scss">
  .article {
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
