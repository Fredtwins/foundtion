<template>
	<div class="home">
		<header class="home-header">
			<div class="header-logo">
        <img src="./img/logo.png" alt="">
        <div class="logotitle">三防综合业务管理系统</div>
      </div>
			<div class="header-content clear">
        <div class="header-menu pull-left">
          <Menu
            mode="horizontal"
            theme="light"
            :active-name="acName"
            @on-select="changeActive">
            <MenuItem
              v-for="(item, index) in dataArr"
              v-if="Role[item.id]"
              :key="item.id"
              :name="item.name">
              <p class="header-menu-icon" :class="item.icon"></p>
              <p>{{item.text}}</p>
            </MenuItem>
            <div>
            </div>
          </Menu>
        </div>

				<div
          class="header-user pull-left"
          @mouseover="show"
          @mouseout="hidden">
					<div class="header-userNav">
						<div class="img">
							<span class="icon-yonghu"></span>
						</div>

						<div class="username">{{username}}</div>

            <div class="down">
						  <Icon type="chevron-down"></Icon>
            </div>
					</div>

					<div class="header-userNavWrapper" v-show="disabled">
						<ul>
							<!-- <li>
									<Icon type="help-circled"></Icon>
									<span>系统帮助</span>
								</li> -->
							<li @click="passend">
								<Icon type="ios-locked"></Icon>
								<span>修改密码</span>
								<Modal v-model="passden" class="modalt" title="修改密码">
									<!--<p>您确定要退出登录吗？</p>-->
									<Form>
										<FormItem label="原密码" prop="oldpsw">
											<Input v-model="formItem.oldpsw" placeholder="请输入"></Input>
										</FormItem>
										<FormItem label="新密码" prop="newpsw">
											<Input v-model="formItem.newpsw" placeholder="请输入"></Input>
										</FormItem>
									</Form>

									<div slot="footer">
										<Button type="primary" @click="end">修改</Button>
									</div>
								</Modal>
							</li>
              <li>
                <Icon type="ios-locked"></Icon>
								<span>修改用户名</span>
              </li>
              <li>
                <Icon type="ios-locked"></Icon>
								<span>修改联系方式</span>
              </li>
							<li @click="outLogin = true">
								<Icon type="log-out"></Icon>
								<span>安全退出</span>
								<Modal v-model="outLogin" class="modal logout-modal" title="退出提示" @on-ok="ok">
									<p>您确定要退出登录吗？</p>
								</Modal>
							</li>
						</ul>
					</div>
				</div>

			</div>
		</header>

		<section class="home-warpper">
			<router-view></router-view>
		</section>

	</div>
</template>

<script>
import { setUserIng, getUserIng, setAction, getAction } from 'common/js/util'
import { removeLocalStorage, getLocalStorage } from 'common/js/dom'
import { homeMenu } from 'common/js/module'
import { newpasword } from 'api/home'
import { mapGetters, mapMutations } from 'vuex'
import md5 from 'md5'

export default {
  computed: {
    ...mapGetters(['Role', 'STATUS'])
  },
  watch: {
    '$route': function () {
      if (this.$route.fullPath === '/home/dailyOffice/addressee') {
        setAction({
          'first': '1-5',
          'second': '',
          'third': '5'
        })
      }
      if (getAction()) {
        this.acName = getAction().first
      }
    }
  },
  data () {
    return {
      formItem: {},
      outpass: false,
      passden: false,
      acName: '',
      showSysment: false,
      showReport: false,
      showSangfang: false,
      showDepartment: false,
      showDaily: false,
      showTabel: false,
      showHome: false,
      showMove: false,
      disabled: false,
      username: 'xxx',
      time: '',
      outLogin: false,
      dataArr: homeMenu
    }
  },
  created () {
    this.time = new Date()
    this.username = getUserIng().username
    if (getAction() === undefined) {
      setAction({
        'first': '1-1',
        'second': '',
        'third': ''
      })
      this.acName = '1-1'
    } else {
      this.acName = getAction().first
    }
  },
  mounted () { },
  methods: {
    changeActive (name) {
      if (name === '1-1' || name === '1-2') {
        // this.getRole()
      }
      if (getLocalStorage('searchValue')) {
        removeLocalStorage('searchValue')
      }
      let index = this.dataArr.findIndex(item => {
        return item.name === name
      })
      if (index === -1) {
        let obj = {}
        this.downArr.map(item => {
          item.children.map(i => {
            if (i.name === name) {
              obj = i
            }
          })
        })

        this.$router.push(obj.path)
      } else {
        this.$router.push(this.dataArr[index].path)
      }
      setAction({
        'first': name,
        'second': '',
        'third': ''
      })
    },
    getRole () {
    },
    show () {
      this.disabled = true
    },
    hidden () {
      this.disabled = false
    },
    ok () {
      setUserIng({})
      this.SET_ROLE(null)
      this.$router.push('/')
    },
    passend (dataObj) {
      this.formItem = dataObj
      this.passden = true
    },
    // 修改密码
    end () {
      var regex = /^[A-Za-z0-9]{8,20}$/ // 密码是大于或等于8位的字母和数字组合
      // 不符合密码标准
      if (!regex.test(this.formItem.newpsw)) {
        this.$Message.error('密码请输入不少于8位的数字和字母组合')
      } else {
        let search = {
          _id: getLocalStorage('info')._id,
          oldpsw: this.formItem.oldpsw,
          newpsw: md5(this.formItem.newpsw)
        }
        newpasword(search).then(res => {
          if (res.code === ERR_OK) {
            this.$Notice.success({
              title: '修改成功'
            })
            this.passden = false
          } else if (res.code === '9999') {
            this.$Notice.warning({
              title: '原密码错误'
            })
          }
        })
      }
    },
    ...mapMutations([
      'SET_ROLE'
    ])
  }
}
</script>
<style lang="scss">
.home {
	width: 100%;
	height: 100%;
	position: relative;
	.home-header {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 40px;
		color: #FFFFFF;
    background-color: #1d3f8f;
		.header-logo {
			width: 200px;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
      display: flex;
      align-items: center;
      z-index: 2;
      cursor: pointer;
      .logotitle {
        font-size: 16px;
        font-weight: 700;
        text-shadow: 2px 2px 10px #5da0e6;
      }
		}
		.header-content {
			height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      .header-menu {
        height: 100%;
        .ivu-menu {
          height: 100%;
          line-height: 40px;
          background: none;
          .ivu-menu-item {
            font-weight: 500;
            position: relative;
            border-right: 1px solid #022d4d;
            border-bottom: 2px solid #1d3f8f;
            text-align: center;
            padding: 0 14px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            > .header-menu-icon {
              font-size: 14px;
              margin-right: 2px;
            }
            > p {
              color: #fff;
              font-size: 14px;
            }
            &:hover,
            &.ivu-menu-item-active {
              background: #142961;
              border-bottom: 2px solid #2d8cf0;
            }
          }
        }
      }

			.header-user {
				position: relative;
				width: 100px;
        height: 100%;
        font-size: 14px;
        display: flex;
        align-items: center;
				.header-userNav {
					width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          > .img {
            width: 24px;
            height: 24px;
            color: #1c3984;
            background-color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 24px;
            font-size: 24px;
          }
          > .username {
            margin: 0 3px;
            width: 48px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
				}
				.header-userNavWrapper {
					width: 100%;
					position: absolute;
					top: 38px;
					z-index: 1000000;
          background: #fff;
          border-radius: 0 0 5px 5px;
          overflow: hidden;
          > ul {
            border-top: 1px solid #022d4d;
            > li {
              height: 30px;
              line-height: 30px;
              font-size: 12px;
              padding-left: 10px;
              background: #1d3f8f;
              color: white;
              cursor: default;
              > i {
                margin-right: 2px;
              }
              &:hover {
                background: #142961;
              }
            }
          }
          &:hover {
            background: rgba(0, 0, 0, .1);
          }
        }
			}
    }

    @media screen and (max-width: 1100px) {
      .header-menu-icon {
        display: none;
      }
    }
	}
	.home-warpper {
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
	}
}
</style>
