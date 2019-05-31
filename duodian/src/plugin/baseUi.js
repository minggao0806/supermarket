/* eslint-disable no-new */
import { Icon, TabBar, ScrollView, CellItem, Dialog } from 'mand-mobile'
import List from '@/components/List'
import Add from '@/components/Add'
import SvgIcon from '@/components/SvgIcon/icons'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'mand-mobile/lib/mand-mobile.css'

const components = {
  Icon,
  SvgIcon,
  TabBar,
  ScrollView,
  swiper,
  swiperSlide,
  CellItem,
  List,
  Add,
  Dialog
}
export default {
  install (Vue) {
    for (let key in components) {
      Vue.component(key, components[key])
    }
  }
}
