<template>
	<el-container class="app-container" style="background: #3bafda">
		<el-header style="height: 50px;border-bottom: 1px solid #e7e7e7;">
			<div style="width:100%;padding-top: 10px;">
				<img src="../assets/logo.png" height="30px;" align="absmiddle" />
				<span style="padding-left: 10px;"><b> 学生管理系统</b></span>
			</div>
		</el-header>
		<el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px" class="login-form">
			<el-form-item prop="username">
				<el-input type="text" v-model="account.username" suffix-icon="iconfont icon-seeuser" auto-complete="off" placeholder="用户名/邮箱"></el-input>
			</el-form-item>
			<el-form-item prop="passwd">
				<el-input type="password" v-model="account.passwd" suffix-icon="iconfont icon-key" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin"></el-input>
			</el-form-item>
			<el-form-item style="width:100%;">
				<el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin">
					<b>登 录</b>
				</el-button>
				<div style="background: #efefef;padding:5px;border-radius: 5px;font-size: 12px;margin-top: 5px;text-align: center;">
					<router-link to="/register">注 册</router-link>
				</div>
			</el-form-item>
		</el-form>

	</el-container>
</template>

<script>
	import axios from 'axios';
	let Api = require("@/assets/js/api.js") 
	let Config = Api.default.Config;
	export default {
		data() {
			return {
				account: {
					username: '',
					passwd: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					passwd: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			//登陆验证
			handleLogin() {
				var that = this;
				axios.post(Config.remoteAddrr+'login?name=' + that.account.username + '&pwd=' + that.account.passwd + '', {})
					.then(function(res) {
						if(res.data.length > 0) {
							//设置本地存储
							sessionStorage.setItem("name", that.account.username);
							//跳转到主页去
							if(that.$route.query.redirect==location.hostname){
								that.$router.go(-1);
							}else{
								that.$router.push('/home')
							}
							
						} else {
							that.$message({
								message: '账号不存在，请注册',
								type: 'warning'
							});
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
	.login-form {
		/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin: 160px auto;
		width: 320px;
		padding: 35px 35px 15px 35px;
		background: #fff;
		border: 1px solid #eaeaea;
		box-shadow: 0 0 25px #cac6c6;
		background: -ms-linear-gradient(top, #fff, #6495ed);
		/* IE 10 */
		background: -moz-linear-gradient(top, #b8c4cb, #f6f6f8);
		/*火狐*/
		background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#b8c4cb), to(#f6f6f8));
		/*谷歌*/
		background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#6495ed));
		/* Safari 4-5, Chrome 1-9*/
		background: -webkit-linear-gradient(top, #fff, #6495ed, #fff);
		/*Safari5.1 Chrome 10+*/
		background: -o-linear-gradient(top, #fff, #6495ed);
		/*Opera 11.10+*/
	}
</style>