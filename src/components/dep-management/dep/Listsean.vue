<template>
  <div class="Listsean">
    <div class="titles">
      <span class="titleleft"></span>
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/depManagement/definitiont">部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据上报</BreadcrumbItem>
        <BreadcrumbItem>表单查看</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <Form ref="formInline" inline :label-width="60">
      <Form-item label="表单名称">
        <Input v-model="formInline.form_name" :maxlength="16" placeholder="请输入表单数据名称"></Input>
      </Form-item>
      <div class="searchBtn">
        <Button type="ghost" shape="circle" icon="ios-search" @click="submitsearch(1)"></Button>
      </div>
      <!--<Form-item label="部门名称(全称)" prop="department_fullname" style="width:180px">
				<Select :label='formInline.department_fullname'
					not-found-text='无匹配部门，请重新输入'
					v-model="formItem.department_fullname"
					filterable remote
					:remote-method="autoSearch"
					:loading="selectLoading" style="width:180px" @on-change='selecteds'>
					<Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
				</Select>
      </Form-item>-->
      <!--<!--<Form-item label="(简称)">
				<Input v-model="formInline.department_name" :maxlength="16" placeholder="请输入部门名称"></Input>
      </Form-item>-->
      <!--
			<Form-item label="预案类型">
				<Input v-model="formInline.plan_type" :maxlength="16" placeholder="请输入对应预案类型"></Input>
			</Form-item>
      -->
    </Form>
    <!--表格-->
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
      <Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>
    <!--<div class="page pageStyle pull-right">
			<Page :total="total" :current="current" size="small" show-total @on-change="changePage"></Page>
    </div>-->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getuserList } from 'api/Listsean'
import { ListseanThead } from 'common/js/table'
import { getLocalStorage } from 'common/js/dom'
import { likeStrSearch } from 'common/js/util'

export default {
  data () {
    return {
      loading: false,
      tableThead: ListseanThead(this),
      tableTbody: [],
      total: 2000,
      current: 1,
      formInline: {
        form_name: '',
        plan_type: ''
      }
    }
  },
  methods: {
    _getuserList (page) {
      this.loading = true
      let departmentCode = getLocalStorage('info').department_code
      let searchvalue = {
        department_code: departmentCode
      }
      if (this.formInline.form_name) {
        searchvalue.form_name = likeStrSearch(this.formInline.form_name)
      }
      if (this.formInline.plan_type) {
        searchvalue.plan_type = likeStrSearch(this.formInline.plan_type)
      }
      getuserList(page, searchvalue).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.tableTbody = res.result.result
          this.total = res.result.totalSize
        }
      })
    },
    changePage (page) {
      this.page = page
      this.submitsearch(page)
    },
    submitsearch (page) {
      let search = {}
      if (this.formInline.form_name) {
        search.form_name = likeStrSearch(this.formInline.form_name)
      }
      if (this.formInline.plan_type) {
        search.plan_type = likeStrSearch(this.formInline.plan_type)
      }
      this._getuserList(page, search)
    },
    details (dataObj) {
      getLocalStorage('id', 'true')
      getLocalStorage('id', dataObj._id)
      this.SET_DEPARTREPORTINFO(dataObj)
      getLocalStorage('form_name', dataObj.form_name)
      this.$router.push('/home/depManagement/Listsean/seans')
    },
    ...mapMutations([
      'SET_DEPARTREPORTINFO'
    ])
  },
  mounted () {
    this._getuserList()
  }
}
</script>

<style scoped lang="scss">
	.Listsean {
		.titles {
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
				font-size: 16px;
				font-weight: 600;
			}
		}
		.table {
			// margin-top: 30px;
		}
	}
</style>
