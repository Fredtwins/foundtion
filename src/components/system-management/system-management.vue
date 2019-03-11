<template>
  <div class="systemManahement">
    <!--<aside>
			<Menu :theme="theme2" :active-name="acName"  :open-names="['1']">
				<div class="ivu-menu-submenu-title" @click="clickFn('usermanage')">
				<span class="iconfont icon-yonghuguanli"></span>
          <span v-bind:class="{ yellow: user2}">用户管理</span>
        </div>
					<div class="ivu-menu-submenu-title" @click="clickFn('rolemanage')">
					<span class="iconfont icon-jiaoseguanli"></span>
          <span v-bind:class="{ yellow: role2}">角色管理</span>
        </div>
				<div class="ivu-menu-submenu-title" @click="clickFn('mokuaiguanli')">
				<span class="iconfont icon-mokuaiguanli"></span>
          <span v-bind:class="{ yellow: role}">模块管理</span>
        </div>
			<div class="ivu-menu-submenu-title" @click="clickFn('bumenlist')">
			<span class="iconfont icon-bumen"></span>
          <span v-bind:class="{ yellow: role3}">部门列表</span>
        </div>
			</Menu>
    </aside>-->
    <aside>
      <Menu theme="light" :active-name="acName" :open-names="['6','7']" @on-select="changeActive">
        <MenuItem
          v-if="Role[item.id]"
          v-for="(item,index) in dataArr"
          :key="index"
          :name="item.name"
        >
          <span :class="item.icon"></span>
          {{item.text}}
        </MenuItem>
        <div>
          <Submenu
            v-if="Role[item.id]"
            v-for="(item,index) in downArr"
            :key="index"
            :name="item.name"
          >
            <template slot="title">
              <span :class="item.icon"></span>
              {{item.text}}
            </template>
            <MenuItem
              v-if="Role[i.id]"
              v-for="(i,index1) in item.children"
              :key="index1"
              :name="i.name"
            >{{i.text}}</MenuItem>
          </Submenu>
        </div>
      </Menu>
    </aside>

    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import Celan from './celan'
import { mapGetters, mapMutations } from 'vuex'
import { setAction, getAction } from 'common/js/util'
import { getSessionStorage } from 'common/js/dom'
import { systemManagementTopMenu, systemManagementBotMenu } from 'common/js/module'

export default {
  computed: {
    ...mapGetters([
      'Role'
    ])
  },
  components: {
    'celan': Celan
  },
  data () {
    return {
      acName: '',
      opName: [],
      user1: false,
      user2: true,
      role1: true,
      role2: false,
      role: true,
      role3: true,
      dataArr: systemManagementTopMenu,
      downArr: systemManagementBotMenu
    }
  },
  created () {
    // this.getRole()
    // third指的是每点击侧边栏的第几个
    if (!getAction().third) {
      this.acName = '1'
    } else {
      this.acName = getAction().third
    }
  },
  methods: {
    // 侧边栏列表
    changeActive (name) {
      // this.getRole()
      this.SET_STATUS(false)
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
        let path = `/home/systemManagement/${obj.link}`
        this.$router.push(path)
      } else {
        let links = `/home/systemManagement/${this.dataArr[index].link}`
        this.$router.push(links)
      }
      var obj = getAction()
      obj.third = name
      getSessionStorage('name', 'top')
      setAction(obj)
    },
    ...mapMutations([
      'SET_STATUS'
    ])
  }
}
</script>
<style scoped lang="scss">
	.systemManahement {
		width: 100%;
		height: 100%;
		background-color: #f2f2f2;
		padding-left: 2rem;
		position: relative;
		section {
			background: #fff;
			overflow: auto;
			width: 100%;
			height: 100%;
			padding: 10px;
			padding-top: 20px;
			position: relative;
			.content {
				width: 100%;
				height: 100%;
				/* overflow: auto; */
			}
			.title {
				position: absolute;
				top: 10px;
				left: 10px;
				font-size: 20px;
				color: #333;
				margin-bottom: 10px;
				img {
					width: 23px;
					height: 20px;
					transform: rotate(90deg);
					vertical-align: middle;
					margin-right: 10px;
				}
			}
			.table {
				width: 100%;
				margin-bottom: 20px;
			}
		}
	}

  aside {
    > ul {
      width: 2.01rem;
    }
    .ivu-menu .ivu-menu-light .ivu-menu-vertical {
      width: 2.01rem;
    }
  }
</style>
