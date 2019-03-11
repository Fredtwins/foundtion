export const towns = () => [
  { title: '合计' },
  { title: '桂城街道', code: '', row_name1: '桂城街道' },
  { title: '九江镇', code: '', row_name1: '九江镇' },
  { title: '西樵镇', code: '', row_name1: '西樵镇' },
  { title: '丹灶镇', code: '', row_name1: '丹灶镇' },
  { title: '狮山镇', code: '', row_name1: '狮山镇' },
  { title: '大沥镇', code: '', row_name1: '大沥镇' },
  { title: '里水镇', code: '', row_name1: '里水镇' }
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
      // console.log(this.towns, '数据')
      // for (i in this.data) {
      //   for (var j = 0; j < this.towns.length; j++) {
      //     if (this.data[i].)
      //   }
      // }
    }
  }
}
