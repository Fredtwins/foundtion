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
      return JSON.parse(JSON.stringify(this.cloneData))
    },
    initData () {
      this.cloneData = JSON.parse(JSON.stringify(this.data))
      console.log(this.data, '这是表格')
      console.log(this.towns, '这是数据')
    }
  }
}
