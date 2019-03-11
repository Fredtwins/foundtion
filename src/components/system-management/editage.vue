<template>
  <div class="notice">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>内容编辑</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!-- <div class="search">

    </div>-->
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
    <!--<div class="page pageStyle pull-right">
			<Page :total="total"  show-elevator show-total></Page>
    </div>-->
    <!-- 新增/修改 -->
    <!--确认删除  -->
    <Modal v-model="sureDelete" class="modal1" width="800">
      <div class="textarea">
        <quill-editor v-model="textareaVaule" :options="{placeholder: '!!'}">
          <div class="hh"></div>
        </quill-editor>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="sureDdels">修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { noticeRules } from 'common/js/rules'
import { successNotice, getLocalStorage } from 'common/js/dom'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['NOTICEID', 'STATUS'])
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
  data () {
    return {
      textareaVaule: '据气象、水文资料统计，4月23日8时到25日8时，阳江、茂名、广州、肇庆、江门、清远、佛山、惠州及部分珠三角南部市县出现暴雨到大暴雨、局地特大暴雨，全省有4个雨量站超200毫米、27个站点超100毫米、290个站点超50毫米，雨量较大站点有：阳西县织篢农场站254毫米，阳春市河口镇上双村239.1毫米，阳西县程村镇新湖水库219毫米，阳西县塘口镇茅垌水库206毫米。其中：1小时降雨量阳江市阳西县塘口镇118毫米（超10年一遇）、茂名高州市大井镇97.6毫米（超20年一遇）；阳江市阳西县程村镇、塘口镇、阳春市河口镇12小时雨量达特大暴雨量级，是入汛以来雨强最大的一场降雨过程。',
      showBtn: true,
      apiType: 'list',
      defaultList: [{
        name: 'a42bdcc1178e62b4694c830f028db5c0',
        url: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
      },
      {
        name: 'bc7521e033abdd1e92222d733590f104',
        url: 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
      }
      ],
      filename: '',
      imgName: '',
      visible: false,
      uploadList: [],
      file: null,
      loadingStatus: false,
      formItem: {
        status: '草稿'
      },
      formDisabled: false,
      ruleValidate: noticeRules,
      searchVal: {},
      tableThead: [
        {
          title: '序号',
          align: 'center',
          width: 80,
          type: 'index'
        },
        {
          title: '内容',
          key: 'notice_desc',
          align: 'center',
          ellipsis: true
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          width: 150
        },
        {
          title: '起草人',
          key: 'createby',
          align: 'center',
          width: 80
        },
        {
          title: '起草时间',
          key: 'createdt',
          align: 'center',
          width: 135
        },
        {
          title: '操作',
          key: 'edit',
          width: 100,
          align: 'center',
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
                    this.details()
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],

      tableTbody: [{
        notice_desc: '据气象、水文资料统计，4月23日8时到25日8时，阳江、茂名、广州、肇庆、江门、清远、佛山...',
        status: '公开',
        createby: '222',
        createdt: '2018-02-06'
      }],
      loading: false,
      total: 0,
      addPageShow: false,
      sureDelete: false,
      moduleTitel: '新增',
      deleteObj: {},
      releaseId: '',
      postObj: {
        page: 1,
        pageSize: 10,
        searchValue: {
          createby: getLocalStorage('info').username
        },
        order: {
          _id: -1
        }
      },
      uploadAttach: [],
      uploadImg: [],
      uploadUrl: '',
      imgDefaultUrl: httpUrl
    }
  },
  mounted () {
  },
  methods: {

    // 点击修改
    details (dataObj) {
      this.sureDelete = true
    },
    sureDdels () {
      successNotice('成功修改')
      this.sureDelete = false
    },
    cancel () {
      this.addPageShow = false
      this.SET_NOTICEID(false)
    }
  }
}
</script>
<style scoped lang="scss">
	.notice {
		padding-top: 45px;
		.green {
			button {
				background: #19be6b !important;
				padding-left: 10px;
			}
		}
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
			> span {
				font-size: 14px;
				font-weight: 600;
			}
		}
		.search {
			margin-top: 40px;
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
		.insertInfo {
			padding-top: 60px;
			width: 100%;
			.ed-table {
				margin-bottom: 20px;
				width: 100%;
				tr {
					height: 0.5rem;
					.demo-upload-list {
						display: inline-block;
						width: 60px;
						height: 60px;
						text-align: center;
						line-height: 60px;
						border: 1px solid transparent;
						border-radius: 4px;
						overflow: hidden;
						background: #fff;
						position: relative;
						box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
						margin-right: 4px;
					}
					.demo-upload-list img {
						width: 100%;
						height: 100%;
					}
					.demo-upload-list-cover {
						display: none;
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						background: rgba(0, 0, 0, 0.6);
					}
					.demo-upload-list:hover .demo-upload-list-cover {
						display: block;
					}
					.demo-upload-list-cover i {
						color: #fff;
						font-size: 20px;
						cursor: pointer;
						margin: 0 2px;
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
					.upload {
						>div {
							display: flex;
						}
					}
					td {
						border: 1px solid #ccc;
						padding: 0;
						input[type="text"] {
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
	.textarea {
		margin-top: 20px;
	}
</style>
