<template>
  <div class="file">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>部门管理</BreadcrumbItem>
        <BreadcrumbItem>微信公众服务</BreadcrumbItem>
        <BreadcrumbItem>文件管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <sanfang-data :titleShow="false"></sanfang-data>
  </div>
</template>

<script>
import sanfangData from '../daily-office/data-management.vue'

export default {
  components: {
    sanfangData
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
  .file {
    height: 100%;
    padding-top: 45px;
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
      form {
        margin-top: 60px;
        margin-bottom: 20px;
      }
    }
  }
</style>
