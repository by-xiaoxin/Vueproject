<template>
	<div>
		<div>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path:'/home/dashboard' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>个人信息</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div style="margin-top: 50px;">
			<el-form ref="form" :model="userInfo" label-width="100px">
				<el-form-item label="编号">
					<el-input v-model='userInfo.id' disabled></el-input>
				</el-form-item>
				<el-form-item label="账户">
					<el-input v-model='userInfo.uname'disabled></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model='userInfo.psd'disabled></el-input>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	let Api = require("@/assets/js/api.js") 
	let Config = Api.default.Config;
	export default {
		data() {
			return {
				userInfo: {},
				items: {
					name: null
				}
			}
		},
		created() {
//			this.items.name = sessionStorage.getItem("name");
//			this.getitems();
			this.getInfor()
		},
		updated(){
			this.items.name = sessionStorage.getItem("name");
		},
		methods: {
			//判断是否有账户登录
//			getitems() {
//				if(this.items.name == null) {
//					//没有的话则跳转到登录页面
//					this.$router.push({path:"/",query:{redirect:location.hostname}})
//				}
//			},
			getInfor: async function() {
				var that = this;
				that.items.name = sessionStorage.getItem("name");
				axios.get(Config.remoteAddrr+'getUsers?name=' + that.items.name + '')
					.then(function(res) {
						if(res.data.length > 0) {
							//console.log(res)
							//console.log("111")
							that.userInfo = res.data[0];
							console.log(that.userInfo)
						} else {
							that.$message.error('查询失败');
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style>

</style>