<template>
  <div class="move-management">
    <aside>
      <Menu theme="light" :active-name="acName" :open-names="['1','2']" @on-select="changeActive">
        <MenuItem
          v-if="Role[item.id]"
          v-for="(item,index) in dataArr"
          :key="index"
          :name="item.name"
        >
          <!-- <span :class="item.icon"></span> -->
          <Icon style="margin-right: 0px;font-size:16px" type="social-twitter"></Icon>
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
import { mapGetters, mapMutations } from 'vuex'
import { setAction, getAction } from 'common/js/util'
import { getSessionStorage } from 'common/js/dom'
import { moveManagementTopMenu, moveManagementBotMenu } from 'common/js/module'

export default {
  computed: {
    ...mapGetters([
      'Role'
    ])
  },
  data () {
    return {
      theme: 'light',
      acName: '',
      opName: [],
      dataArr: moveManagementTopMenu,
      downArr: moveManagementBotMenu
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
    // 权限
    // getRole() {
    //     permissionsApi().then(res => {
    //         if (res) {
    //             if (res.code === '0000') {
    //                 if (getUserIng().role !== '系统管理员') {
    //                     let arr = permissions(res.result.result)
    //                     this.dataArr.map(item => {
    //                         arr.map(i => {
    //                             if (i.name === item.text) {
    //                                 item.show = true
    //                             }
    //                         })
    //                     })
    //                     this.downArr.map(item => {
    //                         arr.map(i => {
    //                             if (i.name === item.text) {
    //                                 item.show = true
    //                             }
    //                         })
    //                         if (item.children) {
    //                             item.children.map(item2 => {
    //                                 arr.map(item3 => {
    //                                     if (item3.name === item2.text) {
    //                                         item2.show = true
    //                                     }
    //                                 })
    //                             })
    //                         }
    //                     })
    //                 } else {
    //                     this.dataArr.map(item => {
    //                         item.show = true
    //                     })
    //                     this.downArr.map(item => {
    //                         if (item.children) {
    //                             item.children.map(items => {
    //                                 items.show = true
    //                             })
    //                         }
    //                         item.show = true
    //                     })
    //                 }
    //             }
    //         }
    //     })
    // },
    changeActive (name) {
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
        this.$router.push(obj.path)
      } else {
        this.$router.push(this.dataArr[index].path)
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

<style lang="scss">
  .move-management {
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
