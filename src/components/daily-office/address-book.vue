<template>
  <div class="address-book">
    <div class="title">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>日常办公</BreadcrumbItem>
        <BreadcrumbItem>通讯录管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">姓名</span>
      <Input
        v-model="searchVal.name"
        placeholder="请输入"
        style="width:200px;padding-left: 10px;padding-right: 20px"
      ></Input>
      <span class="search_title">所属部门</span>
      <Select
        clearable
        :label="searchVal.department_fullname"
        not-found-text="无匹配部门，请重新输入"
        v-model="searchVal.department_fullname"
        filterable
        remote
        :remote-method="autoSearch"
        :loading="selectLoading"
        style="width:200px;padding-left: 10px;padding-right: 20px"
        @on-change="selectChange"
      >
        <Option
          v-for="(option, index) in autoCompleteData"
          :value="option.value"
          :key="index"
        >{{option.label}}</Option>
      </Select>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <!-- <div class="add pull-right" @click="add">
                <Button type="primary">
                    <span class="icon-xinzeng"></span>新增</Button>
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
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <!-- 新增/修改 -->
    <div class="addPage" v-if="addPageShow">
      <div class="title">
        <span>位置：</span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>日常办公</BreadcrumbItem>
          <BreadcrumbItem>通讯录管理</BreadcrumbItem>
          <BreadcrumbItem>{{moduleTitel}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <operation-table
        @getRefs="getRefs"
        @autoSelectChange="selectChange"
        @autoSearch="autoSearch"
        :data="addModuleData"
        :model="formItem"
        labelWidth="150px"
        labelBackgroundColor="#f6f6f6"
        bordercolor="#999999"
      ></operation-table>
      <div class="save pull-right">
        <Button type="primary" size="large" @click="save" style="margin-right:15px">保存</Button>
        <Button type="ghost" size="large" @click="cancel">关闭</Button>
      </div>
    </div>
    <!--确认删除  -->
    <Modal v-model="sureDelete" width="360">
      <p slot="header" style="color:red;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除</span>
      </p>
      <div style="text-align:center">
        <p>确认删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="sureDdels">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { addressBookThead } from 'common/js/table'
import { addressBookModule } from 'common/js/module'
import { successNotice, errorNotice } from 'common/js/dom'
import { addressBookApi } from 'api/daily-office'
import OperationTable from 'base/operation-table/operation-table'
import { getDepList } from 'api/bumenlist'
import { cloneObj, likeStrSearch, getUserIng } from 'common/js/util'
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['STATUS'])
  },
  watch: {
    STATUS: {
      handler: function (val, oldval) {
        if (val === false) {
          this.addPageShow = false
        }
      }
    }
  },
  components: {
    OperationTable
  },
  data () {
    return {
      sureDelete: false,
      addPageShow: false,
      moduleTitel: '新增',
      apiType: 'list',
      addModuleData: addressBookModule,
      formItem: {},
      searchVal: {},
      tableThead: addressBookThead(this),
      tableTbody: [],
      loading: false,
      total: 0,
      deleteObj: {},
      departmentList: {},
      selectLoading: false,
      autoCompleteData: [],
      name: '',
      postObj: {
        page: 1,
        pageSize: 10,
        searchValue: {},
        order: {
          _id: -1
        }
      }
    }
  },
  created () {
    this.getList()
    this.getDepartment()
  },
  mounted () {
  },
  methods: {
    getRefs (obj) {
    },
    selectChange (value) {
      if (value) {
        let index = this.departmentList.findIndex(item => value === item.department_fullname)
        this.formItem.department_name = this.departmentList[index].department_fullname
        this.formItem.department_level = this.departmentList[index].department_level
        this.formItem.department_code = this.departmentList[index].department_code
        this.name = this.departmentList[index].department_code
      }
    },
    autoSearch (query) {
      if (query !== '') {
        this.selectLoading = true
        addressBookModule[0][1].selectLoading = true
        setTimeout(() => {
          this.selectLoading = false
          this.autoCompleteData = this.departmentList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
          addressBookModule[0][1].selectLoading = false
          addressBookModule[0][1].data = this.departmentList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        addressBookModule[0][1].data = []
        this.autoCompleteData = []
      }
    },
    // 获取所以通讯录数据
    getList () {
      this.loading = true
      if (getUserIng().department_code !== '0101') {
        let obj = {
          department_code: likeStrSearch(getUserIng().department_code),
          department_level: getUserIng().department_level
        }
        this.postObj.searchValue = Object.assign(obj, this.postObj.searchValue)
      }
      addressBookApi('list', this.postObj).then(res => {
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
    },
    // 点击搜索
    search () {
      for (var i in this.searchVal) {
        if (!this.searchVal[i]) {
          delete this.searchVal[i]
        }
      }
      this.postObj.searchValue = cloneObj(this.searchVal)
      if (this.searchVal.department_fullname) {
        this.postObj.searchValue.department_code = this.name
        delete this.postObj.searchValue.department_fullname
      }
      if (this.postObj.searchValue.name) {
        this.postObj.searchValue.name = likeStrSearch(this.postObj.searchValue.name)
      }
      this.getList()
    },
    // 点击新增
    add () {
      this.SET_STATUS(true)
      this.addPageShow = true
      this.moduleTitel = '新增'
      this.apiType = 'new'
    },
    ...mapMutations(['SET_STATUS']),
    // 分页
    pageChange (index) {
      this.postObj.page = index
      this.getList()
    },
    // 新增/修改保存
    save () {
      addressBookApi(this.apiType, this.formItem).then(res => {
        this.addPageShow = false
        if (res.code === '0000') {
          successNotice(res.message)
          this.getList()
        } else if (res.code === '0001') {
          if (this.apiType === 'edit') {
            successNotice('修改成功')
            this.getList()
          }
        } else {
          errorNotice(res.message)
          this.getList()
        }
      })
    },
    // 新增/修改关闭
    cancel () {
      this.addPageShow = false
    },
    // 点击修改
    edit (dataObj) {
      this.SET_STATUS(true)
      this.moduleTitel = '修改'
      this.apiType = 'edit'
      this.addPageShow = true
      this.formItem = dataObj
    },
    // 点击删除
    delete (dataObj) {
      this.sureDelete = true
      this.apiType = 'delete'
      this.deleteObj = {
        _id: dataObj._id
      }
    },
    // 确认删除
    sureDdels () {
      this.sureDelete = false
      addressBookApi(this.apiType, this.deleteObj).then(res => {
        if (res.code === '0000') {
          successNotice(res.message)
          this.getList()
        } else {
          errorNotice(res.message)
          this.getList()
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
    .address-book {
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
        }
    }
</style>
