// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'

// ================================== 国际化 ===========================================
//导入国际化组件
import VueI18n from 'vue-i18n'
//注册组件
Vue.use(VueI18n);
//导入语言包
const i18n = new VueI18n({
  //定义默认语言
  locale:'zh',
  //语言包声明
  messages:{
    'zh':require('./lang/zh'),
    'en':require('./lang/en')
  }
})
// ====================================== END =======================================

Vue.config.productionTip = false

require('!style-loader!css-loader!./assets/bootstrap/css/bootstrap.css');
require('!style-loader!css-loader!./assets/bootstrap/css/style.css');
require('!style-loader!css-loader!./assets/index.css');

/*引入axios*/
import Axios from 'axios'
Vue.prototype.axios = Axios;

//是否携带cookie发送请求
// Axios.defaults.withCredentials = true;

import QS from 'qs'
Vue.prototype.qs = QS;

import HeyUI from 'heyui';
Vue.use(HeyUI);

Vue.use(ElementUI);

//引入i18n
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
