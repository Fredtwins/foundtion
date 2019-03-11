<template>
  <div class="swReport1">
    <div class="title">
      <span>位置： </span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>历史报告</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <Table border size="small" :columns="thead" :data="tbody">
    </Table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      thead: [{
        title: '报告名称',
        key: 'title'
      },
      {
        align: 'center',
        title: '报告单位',
        key: 'company'
      },
      {
        title: '报告内容',
        key: 'content'
      },
      {
        align: 'center',
        title: '创建者',
        key: 'author'
      },
      {
        align: 'center',
        title: '创建时间',
        key: 'time'
      },
      {
        title: '操作',
        width: 320,
        align: 'center',
        render: (h, parmas) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              }
            }, '生成PPT'),
            h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              }
            }, '演示'),
            h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              }
            }, '另存为'),
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              }
            }, '修改'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              }
            }, '删除')
          ])
        }
      }
      ],
      tbody: [{
        title: '3.13',
        company: '广东省水文局佛山水文分局',
        content: '首页 潮位信息表',
        author: 'xiaoyu',
        time: '2018-03-15 09:49:00'
      },
      {
        title: '3.13',
        company: '广东省水文局佛山水文分局',
        content: '首页 3.13 积水情况表 历史大断面图 水位过程线',
        author: 'admin',
        time: '2018-03-13 11:26:00'
      },
      {
        title: '天鸽增水汇报',
        company: '广东省水文局佛山水文分局',
        content: '首页 水位过程线 水位过程线 天鸽增水图',
        author: 'xiaoyu',
        time: '2018-03-12 17:36:00'
      },
      {
        title: '3.12',
        company: '广东省水文局佛山水文分局',
        content: '首页',
        author: 'xiaoyu',
        time: '2018-03-12 17:30:00'
      },
      {
        title: '2017.10.25',
        company: '广东省水文局佛山水文分局',
        content: '首页 1 2',
        author: 'xiaoyu',
        time: '2017-10-25 17:06:00'
      },
      {
        title: '台风报告',
        company: '广东省水文局佛山水文分局',
        content: '首页 增水分析 内涝站点分布图',
        author: 'admin',
        time: '2017-08-14 15:55:00'
      },
      {
        title: '台风报告',
        company: '广东省水文局佛山水文分局',
        content: '首页 2 历史大断面图 1 水位过程线 历史同期雨量对比',
        author: 'admin',
        time: '2017-08-11 16:49:00'
      }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .swReport1 {
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
  }
</style>

