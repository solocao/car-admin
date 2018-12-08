// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import VuePreview from 'vue-preview'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'

import '@/style/common.less'

import { get, post, put, upload, deleteAlias } from './api/index.js'

Vue.use(VuePreview)
// 全局请求数据
Vue.prototype.get = get
Vue.prototype.post = post
Vue.prototype.put = put
Vue.prototype.upload = upload
Vue.prototype.delete = deleteAlias

// import '@/mock'
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
