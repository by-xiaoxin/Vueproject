// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false

//设置路由守卫
router.beforeEach((to, from, next) => {
//console.log(to);
//console.log(from);
if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if(sessionStorage.getItem('name')){ //判断本地是否存在sessionStorage
      next();
    }else {
      next({
        path:'/',
        query:{redirect:location.hostname}//跳转到以前的路由
      })
    }
}
else {
    next();
}
/*如果本地 存在 sessionStorage 则 不允许直接跳转到 登录页面*/
if(to.fullPath == "/"){
    if(sessionStorage.getItem('name')){
      next({
        path:from.fullPath
      });
    }else {
      next();
    }
}
});					

Vue.use(ElementUI);
Vue.use(VueAxios, axios)
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})