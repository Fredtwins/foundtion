<template>
  <div class="three-business">
    <aside>
      <Menu
        theme="light"
        :active-name="acName"
        :open-names="['1','2','3','4']"
        @on-select="changeActive"
      >
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
      <div class="content">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { setAction, getAction } from 'common/js/util'
import { getLocalStorage, getSessionStorage, removeLocalStorage } from 'common/js/dom'
import { threeBusinessMenu } from 'common/js/module'

export default {
  computed: {
    ...mapGetters([
      'Role'
    ])
  },
  data () {
    return {
      acName: '',
      opName: [],
      // dataArr: [],
      downArr: threeBusinessMenu
    }
  },
  created () {
    getLocalStorage('index', 1)
    if (!getAction().third) {
      this.acName = '1-1'
    } else {
      this.acName = getAction().third
    }
  },
  methods: {
    changeActive (name) {
      // this.getRole()
      getLocalStorage('index', 1)
      this.SET_STATUS(false)
      if (getLocalStorage('searchValue')) {
        removeLocalStorage('searchValue')
      }

      this.downArr.map(item => {
        item.children.map(i => {
          if (i.name === name) {
            this.$router.push(i.path)
          }
        })
      })
      // let index = this.dataArr.findIndex(item => {
      // return item.name === name
      // })
      // if (index === -1) {
      // let obj = {}
      // this.downArr.map(item => {
      // item.children.map(i => {
      // if (i.name === name) {
      // obj = i
      // }
      // })
      // })
      // this.$router.push(obj.path)
      // } else {
      // this.$router.push(this.dataArr[index].path)
      // }
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
	.three-business {
		width: 100%;
		height: 100%;
		background-color: #f2f2f2;
		padding-left: 2rem;
		position: relative;
		section {
			background: #fff;
			width: 100%;
			height: 100%;
			padding: 10px;
			padding-top: 60px;
			position: relative;
			.content {
				width: 100%;
				height: 100%;
			}
			.title {
				position: absolute;
				top: 10px;
				left: 10px;
				font-size: 20px;
				color: #fff;
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
</style>
