import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'
import Update from '@/components/home/Update'
import Member from '@/components/home/Member'
import Information from '@/components/home/Information'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'login',
			component: Login
		},
		{
			path: '/register',
			name: 'register',
			component: Register
		},
		{
			path: '/home',
			name: 'home',
			component: Home,
			redirect: '/home/dashboard',
			children: [{
					path: 'dashboard',
					component: Dashboard,
					meta:{requireAuth:true}//设置登陆权限，true代表需要验证，false代表不需要验证
				}, {
					path: 'member',
					component: Member,
					meta:{requireAuth:true}
				},
				{
					path: 'information',
					component: Information,
					meta:{requireAuth:true}
				},
				{
					path: 'update',
					component: Update,
					meta:{requireAuth:true}
				}
			]
		}
	]
})