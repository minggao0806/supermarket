import { NoticeBar } from 'mand-mobile'
export default {
  install (Vue, options) {
    Vue.prototype.$notice = (opt) => {
      const NoticeClass = Vue.extend(NoticeBar)
      const NoticeComponent = new NoticeClass({
        propsData: {
          time: opt.time
        },
        beforeCreate () {
          let vnode = ''
          vnode = this.$root.$createElement('p', {}, opt.str)
          this.$slots.default = vnode
        }
      })
      NoticeComponent.$mount()
      document.querySelector('#app').appendChild(NoticeComponent.$el)
    }
  }
}
