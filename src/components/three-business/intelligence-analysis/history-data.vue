<template>
  <div class="history-data">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
        <BreadcrumbItem>智慧分析管理</BreadcrumbItem>
        <BreadcrumbItem>历史数据分析</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="history-content">
      <Tabs :animated="false" type="card">
        <TabPane label="台风相似分析">
          <iframe
            src="https://tf.istrongcloud.com/release/index-id.html?id=1260216490&from=groupmessage&isappinstalled=0#route"
            frameborder="0"
          ></iframe>
        </TabPane>
        <TabPane label="洪水水位分析">
          <div class="first">
            <div class="top">
              <span>北江（坪石~沙口）</span>
              <span class="pull-right">单位 / 小时</span>
            </div>
            <table>
              <tr>
                <td>河口</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>6.0</td>
                <td>下滘</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>8.5</td>
                <td>2.5</td>
                <td>三多</td>
                <td></td>
              </tr>
              <tr>
                <td>10.0</td>
                <td>4</td>
                <td>1.5</td>
                <td>官山</td>
              </tr>
            </table>
          </div>
          <div class="second">
            <div class="top">
              <span>北江（河口~官山）</span>
            </div>
            <table>
              <tr v-for="(item,index) in tableData" :key="index">
                <td v-for="(i,j) in item" :key="j">{{i}}</td>
              </tr>
            </table>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { waterModule } from 'common/js/module'

export default {
  data () {
    return {
      tableData: waterModule
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .history-data {
    /* height: 100%; */
    .title {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      width: 100%;
      background: rgb(237, 246, 250);
      height: 0.4rem;
      line-height: 0.4rem;
      padding-left: 0.1rem;
      > span {
        font-size: 0.14rem;
        font-weight: 600;
      }
    }
    iframe{
      height: 683px;
    }
    .first,
    .second {
      .top {
          position: relative;
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.16rem;
          font-weight: 600;
      }
      /* height: 100%; */
    }
    table {
      width: 100%;
      text-align: center;
      td {
        border: 1px solid #000;
        height: 0.4rem;
        font-size: 0.16rem;
      }
    }
  }
</style>
