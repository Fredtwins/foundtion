<template>
  <div class="swReport4">
    <div class="title">
      <span>位置： </span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>台风暴潮报告</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <img src="./img/test4.png" alt="">
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
  .swReport4 {
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

