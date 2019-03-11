<template>
  <div class="swReport2">
    <div class="title">
      <span>位置： </span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>水雨情信息</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <img src="./img/test2.png" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
  .swReport2 {
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
      >span {
        font-size: 14px;
        font-weight: 600;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>

