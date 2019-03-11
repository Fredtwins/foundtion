import { ajaxPost } from 'api/axios'
import md5 from 'md5'

export function goLogin (obj) {
  let url = 'sys/userinfo/login'

  let data = {
    username: obj.username,
    password: md5(obj.password)
  }

  return ajaxPost(url, data)
}
