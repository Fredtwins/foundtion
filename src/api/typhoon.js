import { ajaxGet1 } from './axios'

// 台风路径列表
export function getTyphoonList () {
  let url = `${dataMapHttpUrl}fullservice/http/typhoonInfo`

  let data = {}

  return ajaxGet1(url, data)
}

// 单个台风路径信息
export function getTyphoonSingelInfo (tfbh) {
  let url = `${dataMapHttpUrl}fullservice/http/typhoonPath`

  let data = {
    tfbh
  }

  return ajaxGet1(url, data)
}
