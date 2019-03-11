<template>
  <div class="daily-office">
    <aside>
      <Menu theme="light" :active-name="acName" :open-names="['9']" @on-select="changeActive">
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
      <div class="content">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { setAction, getAction } from 'common/js/util'
import { getSessionStorage } from 'common/js/dom'
import { dailyOfficeTopMenu, dailyOfficeBotMenu } from 'common/js/module'

export default {
  computed: {
    ...mapGetters(['Role', 'STATUS'])
  },
  watch: {
    '$route': function () {
      if (this.$route.fullPath === '/home/dailyOffice/addressee') {
        setAction({ 'first': 4, 'second': '', 'third': '5' })
        this.acName = getAction().third
      }
    }
  },
  data () {
    return {
      acName: '',
      dataArr: dailyOfficeTopMenu,
      downArr: dailyOfficeBotMenu
    }
  },
  created () {
    if (!getAction().third) {
      this.acName = '1'
    } else {
      this.acName = getAction().third
    }
  },
  methods: {
    changeActive (name) {
      this.SET_STATUS(false)
      this.SET_NOTICEID(false)
      this.SET_ID(false)
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
      var obj = getAction()
      obj.third = name
      getSessionStorage('name', 'top')
      setAction(obj)
    },
    ...mapMutations(['SET_STATUS', 'SET_ID', 'SET_NOTICEID'])
  }
}
</script>
<style lang="scss">
	.daily-office {
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
			padding-top: 60px;
			position: relative;
			.content {
				width: 100%;
				height: 100%; // overflow: auto;
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
</style>
