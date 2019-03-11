<template>
  <div class="swReport1">
    <div class="title">
      <span>位置： </span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>报表汇总</BreadcrumbItem>
        <BreadcrumbItem>汇报报告模板</BreadcrumbItem>
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
        align: 'center',
        title: '模板标题',
        key: 'title'
      },
      {
        align: 'center',
        title: '模板类型',
        key: 'type'
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
        width: 150,
        align: 'center',
        render: (h, parmas) => {
          return h('div', [
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
        title: '潮位信息表',
        type: '潮位信息表',
        author: 'admin',
        time: '2018-04-18 11:02:15'
      },
      {
        title: '洪水过程线',
        type: '洪水过程线',
        author: 'xiaoyu',
        time: '2018-04-18 10:47:40'
      },
      {
        title: '潮位信息表',
        type: '潮位信息表',
        author: 'xiaoyu',
        time: '2018-03-14 11:42:10'
      },
      {
        title: '内涝动态展示',
        type: '内涝动态展示',
        author: 'admin',
        time: '2018-03-13 11:13:35'
      },
      {
        title: '积水情况表',
        type: '积水情况表',
        author: 'admin',
        time: '2018-03-13 11:09:04'
      },
      {
        title: '历史大断面图',
        type: '历史大断面图',
        author: 'admin',
        time: '2018-03-13 11:01:36'
      },
      {
        title: '水位过程线',
        type: '水位过程线',
        author: 'admin',
        time: '2018-03-13 10:53:54'
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

