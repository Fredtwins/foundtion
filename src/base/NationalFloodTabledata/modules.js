export const towns = () => [
  { title: '合计' },
  { title: '桂城街道', code: '' },
  { title: '九江镇', code: '' },
  { title: '西樵镇', code: '' },
  { title: '丹灶镇', code: '' },
  { title: '狮山镇', code: '' },
  { title: '大沥镇', code: '' },
  { title: '里水镇', code: '' }
]

export const dataMixin = {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    isNeedEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    data () {
      this.initData()
    }
  },
  created () {
    this.initData()
  },
  data () {
    return {
      towns: towns(),
      cloneData: {}
    }
  },
  methods: {
    getData () {
      console.log(this.cloneData)
      return JSON.parse(JSON.stringify(this.cloneData))
    },
    initData () {
      this.cloneData = JSON.parse(JSON.stringify(this.data))
      // console.log(this.towns, '这是数据')
      // this.towns = this.towns.filter(item => {
      //   return this.data.row_name1 == item.title
      // })
    }
  }
}
