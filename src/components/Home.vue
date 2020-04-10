<template>
	<el-container>
		<!--头部-->
		<el-header :style="[{height:'50px',paddingLeft:'9px'}]">
			<div class="logo">
				<a href="/">
					<img src="../assets/logo.png" class="logo__img" />
					<span class="logo__text">学生管理系统</span>
				</a>
			</div>
			<div class="pull-right">
				<el-dropdown>
					<span class="el-dropdown-link">
					<img src="../assets/default.png" class="avatar" style="width: 32px;height: 32px;" />
					<b style="font-size: 16px;padding-left: 15px;">{{items.name}}</b>
					<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<!--下拉显示部分-->
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="handleinfor">个人信息</el-dropdown-item>
						<el-dropdown-item @click.native="handleUpdate">修改密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="handleLogout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-header>
		<!--内容-->
		<el-container>
			<div style="width: 150px; height: 500px;">
				<!--左侧菜单栏-->
				<el-aside>
					<el-row class="tac">
						<el-col :span="12">
							<el-menu :default-active="this.$router.path" router mode="horizontal">
								<el-menu-item v-for="(item,i) in products" :key="i" :index="item.path">
									<i class="el-icon-menu"></i>
									<span slot="title">{{item.name}}</span>
								</el-menu-item>
							</el-menu>
						</el-col>
					</el-row>
				</el-aside>
			</div>
			<!--右侧内容栏-->
			<el-main>
				<!--路由-->
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</el-main>

		</el-container>
	</el-container>
</template>

<script>
	import axios from 'axios';
	export default {
		//生命周期
		created() {
			//获取本地存储
			this.items.name = sessionStorage.getItem("name");
//			this.getitems();
		},
		updated(){
			this.items.name = sessionStorage.getItem("name");
		},
		//数据
		data() {
			return {
				//本地存储
				items: {
					name: null
				},
				isCollapse: true,
				//左侧菜单
				products: [{
						name: '全部成员',
						path: 'member'
					},
					{
						name: '个人信息',
						path: 'information'
					},
					{
						name: '修改密码',
						path: 'update'
					}
				]
			}
		},
		//方法
		methods: {
			//个人信息
			handleinfor(){
				this.$router.push('/home/information')
			},
			//修改密码
			handleUpdate(){
				this.$router.push('/home/update')
			},
			//判断是否有账户登录
//			getitems() {
//				if(this.items.name == null) {
//					//没有的话则跳转到登录页面
//					this.$router.push({path:"/",query:{redirect:location.hostname}})
//				}
//			},
			//退出登录，同步操作，否则获取的数据是一直存在
			handleLogout: async function() {
				var that = this;
				that.$confirm('确认退出吗, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//清除缓存
					sessionStorage.clear();
//					that.$router.push('/home/update')
					//console.log(that.items.name)
//					that.items.name = null
                    //重新跳转
					that.$router.push('/')
					//console.log(that.items.name)
//					that.getitems();
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消退出'
					});
				});
			}
		}
	}
</script>
<style scoped="scoped">
	.el-header,
	.el-footer {
		background-color: #3bafda;
		color: #555;
		line-height: 50px;
	}
	
	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}
	
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 160px;
	}
	
	body>.el-container {
		margin-bottom: 40px;
	}
	
	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}
	
	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
	
	.logo {
		display: inline;
	}
	
	.logo__img {
		width: 46px;
		height: 46px;
		vertical-align: middle;
	}
	
	.logo__text {
		color: #ffffff;
		font-size: 22px;
		line-height: 22px;
	}
	
	a {
		text-decoration: none;
	}
	
	.pull-right {
		float: right;
	}
	
	.avatar {
		border-radius: 50px;
		vertical-align: middle;
	}
	
	.myself-menu__item {
		color: #777;
		font-size: 14px;
	}
</style>