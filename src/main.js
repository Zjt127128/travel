// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
//设置axios的基础url部分
axios.defaults.baseURL = 'http://4h6p310736.vicp.fun/';
window.API_BASE_URL = axios.defaults.baseURL;

//将axios挂载到vue实例上，使用时就可以 this.$axios 这样使用了
// Vue.prototype.$axios = axios;
//将qs挂载到vue实例上，使用时就可以 this.$qs 这样使用了
Vue.prototype.$qs = qs;
// 创建并配置axios实例
const axiosInstance = axios.create({
  baseURL: 'http://4h6p310736.vicp.fun/',
  timeout: 5000
});
// 请求拦截器，在请求头中添加token
axiosInstance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json;charset=utf-8';
    }
    return config;
  },
  error => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  response => {
    if(response&&response.data&&response.data.code&&response.data.code=='401'){
      // 清除存在的token信息
      localStorage.removeItem('accessToken');
      // 跳转到登录页面
      router.push({ name: 'login' });
    }else{
      return Promise.resolve(response)
    }
  },
  error => {
    return Promise.reject(error);
  }
);
// 在路由守卫中判断登录状态
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !window.localStorage.getItem('access_token')) { // 判断目标路由是否需要登录，且当前未登录
    next({ name: 'login' }); // 跳转到名为'Login'的登录路由
  } else {
    next(); // 否则继续正常的路由导航
  }
});
// 将axios实例挂载到Vue原型上，便于在所有Vue组件中使用
Vue.prototype.$axios = axiosInstance;
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

