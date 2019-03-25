<template>
  <div id="threeCommand">
    <!--正常情况下的指挥图首页-->
    <!-- <div class="threeCommand-normal" v-if="!ifCommand">
      <normal-home></normal-home>
    </div>-->
    <!--指挥情况下的指挥图首页-->
    <!-- <div class="threeCommand-command" v-if="ifCommand">
			<command-home></command-home>
    </div>-->
    <!-- <robot></robot> -->
    <aside>
      <Menu theme="light" :active-name="acName" :open-names="['1']" @on-select="changeActive">
        <MenuItem
          v-if="Role[item.id]"
          v-for="(item,index) in dataArr"
          :key="index"
          :name="item.name"
        >
          <span :class="item.icon"></span>
          {{item.text}}
        </MenuItem>
        <!-- <div>
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
        </div> -->
      </Menu>
    </aside>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import normalHome from './normal/normal-home.vue'
import robot from './robot/robot.vue'
import { mapGetters, mapMutations } from 'vuex'
import { setAction, getAction } from 'common/js/util'
import { getSessionStorage } from 'common/js/dom'
import { normalManagementBotMenu } from 'common/js/module'

export default {
  computed: {
    ...mapGetters(['ifCommand', 'Role'])
  },
  components: {
    'normal-home': normalHome,
    robot: robot
  },
  data () {
    return {
      acName: '',
      opName: [],
      dataArr: normalManagementBotMenu,
      downArr: normalManagementBotMenu
    }
  },
  created () {
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
      let links = `/home/threeCommand/${this.dataArr[index].link}`
      this.$router.push(links)
      var obj = getAction()
      obj.third = name
      getSessionStorage('name', 'top')
      setAction(obj)
    },
    ...mapMutations(['SET_STATUS'])
  }
}
</script>

<style lang="scss">
@import "~common/scss/color";

#threeCommand {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  padding-left: 2rem;
  position: relative;
  // .threeCommand-normal {
  //   width: 100%;
  //   height: 100%;
  // }
  // .threeCommand-duty {
  //   width: 100%;
  //   height: 100%;
  // }
  // .threeCommand-command {
  //   width: 100%;
  //   height: 100%;
  // }
  section {
    // background: #fff;
    overflow: auto;
    // width: 100%;
    height: 100%;
    padding: 10px;
    padding-top: 62px;
    position: relative;
    .content {
      width: 100%;
      height: 100%;
      /* overflow: auto; */
    }
    .title {
      position: absolute;
      // top: 10px;
      // left: 10px;
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
