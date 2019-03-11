<template>
  <div class="TyphoonPath">
    <h3>台风路径</h3>
    <iframe
      src="https://tf.istrongcloud.com/release/index-id.html?id=1260216490&from=groupmessage&isappinstalled=0#route"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .TyphoonPath{
    height: 100%;
    overflow: hidden;
    // padding-top: 40px;
    position: relative;
    border: 1px solid #ccc;
    h3 {
      color: #4d4e4f;
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      background: #fff;
      width: 100%;
      top: 0;
      position: absolute;
      text-align: center;
    }
    iframe{
      width: 100%;
      height: 100%;
    }
  }
</style>
