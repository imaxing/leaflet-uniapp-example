// @ts-nocheck
import StorePersistence from 'store-persistence'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  install(Vue) {
    Vue.mixin({ computed: { ...mapGetters(Object.keys(store.getters)) } }).use(StorePersistence, {
      update: (name: string, value: any) => store.commit('update', { name, value }),
      removeItem: (name: string) => uni.removeStorageSync(name),
      getItem: (name: string) => uni.getStorageSync(name),
      setItem: (name: string, value: any) => uni.setStorageSync(name, value)
    })

    Vue.prototype.$confirm = uni.showModal
    Vue.prototype.$back = uni.navigateBack
    Vue.config.productionTip = false
  }
}
