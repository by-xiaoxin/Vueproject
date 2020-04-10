<template>
	<div>
		<div>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path:'/home/dashboard' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>修改密码</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div style="margin-top: 50px;">
			<el-form ref="form" :model="userInfo" label-width="80px">
				<el-form-item label="编号">
					<el-input v-model='userInfo.id' disabled></el-input>
				</el-form-item>
				<el-form-item label="账户">
					<el-input v-model='userInfo.uname'></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model='userInfo.psd'></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="btn-long" @click="handleSubmit">更新</el-button>
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
			//获取到临时存储的值，判断是否登陆
			this.items.name = sessionStorage.getItem("name");
//			this.getitems();
		},
		mounted() {
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
			//更新资料
			handleSubmit:async function() {
				var that = this;
				axios.get(Config.remoteAddrr+'handleEditset?name=' + that.userInfo.uname + '&pwd=' + that.userInfo.pwd + '&id=' + that.userInfo.id + '')
					.then(function(res) {
						if(res.data == "ok") {
							that.$message({
								message: '修改成功',
								type: 'success'
							});
							//跳转到主页去,并且更新临时存储
							sessionStorage.setItem("name", that.userInfo.uname);
							that.$router.push('/home')
						} else {
							that.$message.error('修改失败');
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//同步获取个人信息
			getInfor: async function() {
				var that = this;
				axios.get(Config.remoteAddrr+'getUsers?name=' + that.items.name + '')
					.then(function(res) {
						if(res.data.length > 0) {
							//获取的是数组，所以用下标赋值
							that.userInfo = res.data[0];
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