import Vue from 'vue'
import App from '@/App.vue'

const app = new (Vue.extend(App))()

// #ifdef H5 || MP-ALIPAY
app.$mount()
// #endif

// #ifdef MP-WEIXIN
new Vue({ ...App }).$mount()
// #endif

// #ifdef APP-PLUS
new Vue({ render: h => h(App) }).$mount()
// #endif
