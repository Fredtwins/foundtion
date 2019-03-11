<!-- 人员管理 -->
<template>
  <div class="usermanage">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>公众留言审批</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div class="table">
      <Table :loading="loading" border highlight-row :data="UserData" :columns="theadArr" stripe></Table>
    </div>
    <!--<div class="page pageStyle pull-right">
			<Page :total="total" :current="current" show-elevator show-total @on-change="changePage"></Page>
    </div>-->
  </div>
</template>

<script>
import { updateUserPsw } from 'api/usermanage'
import { cloneObj, likeStrSearch } from 'common/js/util'
import { loadingMixin, interactModelMixin } from 'common/js/mixins'
import { userManagementRules } from 'common/js/rules'

export default {
  mixins: [loadingMixin, interactModelMixin],
  data () {
    return {
      actionTitle: '测试',
      atter: true,
      loading: false,
      modal2: false,
      depList: {},
      autoCompleteData: [],
      selectLoading: false,
      modal_loading: false,
      modal1: false,
      btnChange: false,
      btnSave: false,
      updateTitle: '',
      ruleValidate: userManagementRules,
      formInline: {
        username: '',
        password: '',
        realname: '',
        mobile: '',
        rolename: '',
        department_name: ''
      },
      waterRecordPage: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      total: 0,
      current: 1,
      rolenameList: [],
      rolenameArr: [],
      rolenameLists: [{
        system_name: '南海区人民政府三防指挥系统',
        systemId: '1000011'
      },
      {
        system_name: '南海区三防综合业务管理系统',
        systemId: '1000010'
      },
      {
        system_name: '南海区三防指挥移动应用系统',
        systemId: '1000020'
      }
      ],
      departmentNameList: [],
      bucunzai: '',
      formItem: {},
      UserData: [
        {
          nicheng: '黄帆',
          neirong: '123548654',
          type: '公开'
        }, {
          nicheng: '黄帆',
          neirong: '222222222',
          type: '公开'
        }
      ],
      // biaoti
      theadArr: [{
        title: '用户昵称',
        align: 'center',
        key: 'nicheng'
      }, {
        title: '内容',
        align: 'center',
        key: 'neirong'
      }, {
        title: '状态',
        align: 'center',
        key: 'type'
      }, {
        title: '操作',
        align: 'center',
        width: 120,
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.edit()
                }
              }
            }, '审批')
          ])
        }
      }]
    }
  },

  methods: {
    changePage: function (page) {
      this.page = page

      this.submitSearch(page)
    },
    // 编辑
    edit () {
      this.$Notice.success({
        title: '审批成功'
      })
    },

    // 删除
    del (row) {
      this.rowIng = cloneObj(row)
      this.modal2 = true
    },
    // 删除成功
    dels () {
      // let data = {
      //   _ids: this.rowIng._id
      // }
      updateUserPsw(this.rowIng._id).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '删除成功'
          })
        }
        this.submitSearch()
        this.modal2 = false
      })
    },
    // 搜索
    submitSearch (page) {
      let search = {}
      if (this.formInline.username) {
        search.username = likeStrSearch(this.formInline.username)
      }
      if (this.formInline.realname) {
        search.realname = likeStrSearch(this.formInline.realname)
      }
      if (this.formInline.rolename) {
        search.rolename = likeStrSearch(this.formInline.rolename)
      }
      if (this.formInline.departmentName) {
        search.departmentName = likeStrSearch(this.formInline.departmentName)
      }
      this._getUserList(page, search)
    }
  },

  mounted: function () {
  }

}
</script>

<style lang="scss" scoped>
	.addBtn {
		background-color: #40b0ff;
		color: #fff;
		margin: 5px;
		height: 30px;
	}

	.usermanage {
		height: 100%
	}

	.title {
		position: absolute;
		top: 0;
		left: 0;
		/*margin-bottom: 30px;*/
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

	.table {
		margin-top: 40px;
	}

	#mar {
		margin-top: 42px;
	}
</style>
