<template>
  <div class="data-mgr">
    <div class="title" v-if="show || titleShow">
      <span class="titleleft"></span>
      <span>位置： </span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>日常办公</BreadcrumbItem>
        <BreadcrumbItem>系统应用资料</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="view">
      <div class="file-router">
          <span v-if="!showNav">全部文件</span>
          <p v-if="showNav" style="display:inline-block">
              <!-- <span class="blue cursor" @click="upLevel">返回上一级</span>
              <span>|</span> -->
              <a href="javascript:;" @click="allFile" class="blue">全部文件</a href="javascript:;">
              <span class="arrow">></span>
              <span v-if="breadcrumbArr.length && index !== breadcrumbArr.length-1" @click="jump(item)" v-for="(item,index) in breadcrumbArr"
                  :key="index" ref="daohang">
                  <span class="blue cursor">{{item.name}}</span>
                  <span class="arrow">></span>
              </span>
              <span>{{lastNav}}</span>
          </p>
      </div>
      <!-- <Table @on-selection-change="selectedChange" :loading="loading" ref="selection" stripe size="small" highlight-row :columns="tableThead"
          :data="tableTbody">
      </Table> -->
      <Table style="margin-top:10px" :loading="loading" ref="selection" stripe size="small" highlight-row :columns="tableThead"
          :data="tableTbody">
      </Table>
    </div>
  </div>
</template>

<script>
import { systemApplicationData } from 'common/js/table'
import { cloneObj } from 'common/js/util'

export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    titleShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false,
      showNav: false,
      lastNav: '',
      breadcrumbArr: [],
      tableArr: [],
      tableThead: systemApplicationData(this),
      tableTbody: [
        {
          isFolder: false,
          parent: '',
          refer_level: 1,
          refer_name: '培训资料',
          refer_path: 'Train.rar',
          children: [
            {
              isFolder: false,
              parent: '培训资料',
              refer_level: 2,
              refer_name: '三防APP操作手册.docx',
              refer_path: '培训资料/三防APP操作手册.docx'
            },
            {
              isFolder: false,
              parent: '培训资料',
              refer_level: 2,
              refer_name: '三防部门账号.xlsx',
              refer_path: '培训资料/三防部门账号.xlsx'
            },
            {
              isFolder: false,
              parent: '培训资料',
              refer_level: 2,
              refer_name: '三防综合业务管理操作手册.docx',
              refer_path: '培训资料/三防综合业务管理操作手册.docx'
            },
            {
              isFolder: false,
              parent: '培训资料',
              refer_level: 2,
              refer_name: '三防综合业务平台系统介绍-各级成员部门.pptx',
              refer_path: '培训资料/三防综合业务平台系统介绍-各级成员部门.pptx'
            },
            {
              isFolder: false,
              parent: '培训资料',
              refer_level: 2,
              refer_name: '三防综合业务平台系统介绍-管理人员.pptx',
              refer_path: '培训资料/三防综合业务平台系统介绍-管理人员.pptx'
            },
            {
              isFolder: false,
              parent: '培训资料',
              refer_level: 2,
              refer_name: '三防综合业务平台系统介绍-指挥者.pptx',
              refer_path: '培训资料/三防综合业务平台系统介绍-指挥者.pptx'
            },
            {
              isFolder: false,
              parent: '培训资料',
              refer_level: 2,
              refer_name: '数据一张图操作手册.docx',
              refer_path: '培训资料/数据一张图操作手册.docx'
            },
            {
              isFolder: false,
              parent: '培训资料',
              refer_level: 2,
              refer_name: '指挥一张图操作手册.docx',
              refer_path: '培训资料/指挥一张图操作手册.docx'
            }
          ]
        },
        {
          isFloder: false,
          parent: '',
          refer_level: 1,
          refer_name: '三防助手App.apk',
          refer_path: 'app-release.apk'
        }
      ]
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 详情
    details (dataObj) {
      this.showNav = true
      this.tableArr = cloneObj(this.tableTbody)
      this.breadcrumbArr.push({
        name: dataObj.refer_name,
        level: dataObj.refer_level
      })
      this.lastNav = dataObj.refer_name
      this.tableTbody = dataObj.children
    },
    // 面包屑
    jump (obj) {
      let index = this.breadcrumbArr.findIndex(item => item === obj)
      this.breadcrumbArr = this.breadcrumbArr.slice(0, index + 1)
      if (obj.level === 1) {
        this.breadcrumbArr = []
        this.arr = []
        this.showNav = false
      } else {
      }
    },
    // 点击全部文件
    allFile () {
      this.showNav = false
      this.tableTbody = this.tableArr
      this.arr = []
      this.breadcrumbArr = []
    },
    // 下载
    downloadBtn (obj) {
      let path = obj.refer_path
      let url = 'http://' + window.location.hostname + ':' + window.location.port + '/sanfang/foundation/download/' + path
      // let url = `http://192.168.1.7:8050/sanfang/foundation/download/${path}`
      // let url = `http://192.168.1.138:8080/sanfangstruts/common/download?token=20482667&path=${this.renameArr.refer_path}&fileName=${this.renameArr.refer_name}`
      window.location.href = url
    }
  }
}
</script>
<style scoped lang="scss">
    .data-mgr {
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
      .view {
        height: 100%;
        position: relative;
      }
    }

</style>
