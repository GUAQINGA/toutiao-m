import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

console.log(dayjs().to(dayjs('2019-05')))

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
