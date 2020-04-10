<template>
	<div style="width: auto; height: 800px;">
		<!--导航面包屑-->
		<div>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/home/dashboard' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>全部成员</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!--内容-->
		<div style="margin-top: 50px;">
			<el-table :data="userInfos" style="width: 100%">
				<el-table-column type="index" width="100" label="编 号" align="center">
				</el-table-column>
				<el-table-column prop="uname" label="姓 名" sortable align="center">
				</el-table-column>
				<el-table-column prop="psd" label="密 码" sortable align="center">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="padding: 5px 0;margin-bottom: 5px;">
				<el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="showUser">新 增</el-button>
			</div>

			<!--修改界面-->
			<el-dialog title="修 改 成 员" :visible.sync="editFormVisible" width="35%" center>
				<el-form :model="Infos" label-width="80px">
					<el-form-item label="账户">
						<el-input v-model="Infos.uname" placeholder="请输入英文单词"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="Infos.pwd" placeholder="请输入词义"></el-input>
					</el-form-item>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :disabled="!hasFinish">确定</el-button>
				</div>
			</el-dialog>
			<!--新增界面-->
			<el-dialog title="新 增 成 员" :visible.sync="addFormVisible" width="35%" center>
				<el-form :model="Infos" label-width="80px">
					<el-form-item label="单词">
						<el-input v-model="Infos.uname" placeholder="请输入英文单词"></el-input>
					</el-form-item>
					<el-form-item label="词义">
						<el-input v-model="Infos.pwd" placeholder="请输入词义"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addUser" :disabled="!hasFinish">确定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	let Api = require("@/assets/js/api.js") 
	let Config = Api.default.Config;
	export default {
		computed: {
			//过滤新增和修改里面输入框的空值
			hasFinish() {
				if(this.Infos.uname == "" || this.Infos.psd == "") {
					return false;
				}
				return true;
			}
		},
		data() {
			return {
				items: {
					name: null
				},
				userInfos: [], //成员数组
				editFormVisible: false, //编辑页面显示
				addFormVisible: false, //新增页面显示
				Infos: {
					uname: "",
					pwd: ""
				},
				id: ""
			}
		},
		created() {
			this.items.name = sessionStorage.getItem("name");
//			this.getitems();
            this.getUsers();
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
//				} else {
//					this.getUsers();
//				}
//			},
			//新增
			addUser: async function() {
				var that = this;
				//console.log(row.id)
				this.$confirm('确定要增加?', '增加提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => { //确定
					axios.get(Config.remoteAddrr+'handleAddset?name=' + that.Infos.uname + '&pwd=' + that.Infos.pwd + '')
						.then(function(res) {
							switch(res.data) {
								case 0:
									that.$message({
										message: '新增失败,账户名已存在',
										type: 'success'
									});
									break;
								case "ok":
									that.$message({
										message: '新增成功',
										type: 'success'
									});
									//跳转到主页去
									that.getUsers();
									that.addFormVisible = false
									break;
								default:
									this.$message.error('注册失败');
									break;
							}
						});
				}).catch(err => {
					console.log("系统错误[debug]：", err);
				});
			},
			//编辑
			editSubmit() {
				var that = this;
				//console.log(row.id)
				this.$confirm('确定要修改?', '修改提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => { //确定
					axios.get(Config.remoteAddrr+'handleEditset?name=' + that.Infos.uname + '&pwd=' + that.Infos.pwd + '&id=' + that.id + '')
						.then(function(res) {
							switch(res.data) {
								case 0:
									that.$message({
										message: '修改失败,账户名已存在',
										type: 'success'
									});
									break;
								case "ok":
									that.$message({
										message: '修改成功',
										type: 'success'
									});
									//弹出框隐藏
									that.editFormVisible = false;
									//刷新页面
									that.getUsers();
									break;
								default:
									this.$message.error('修改失败');
									break;
							}
						});
				}).catch(err => {
					console.log("系统错误[debug]：", err);
				});
			},
			//删除成员
			handleDelete(index, row) {
				var that = this;
				console.log(row.id)
				this.$confirm('确定要删除?', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => { //确定
					axios.get(Config.remoteAddrr+'handleDel?id=' + row.id + '')
						.then(function(res) {
							if(res.data == "ok") {
								that.$message({
									message: '删除成功',
									type: 'success'
								});
								//跳转到主页去
								that.getUsers();
							} else {
								that.$message.error('删除失败');
							}
						});
				}).catch(err => {
					console.log("系统错误[debug]：", err);
				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				//assign--用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象，
				//Object.assign(target,sources),target是目标对象，sources是源对象
				this.Infos = Object.assign({}, row);
				//console.log(this.Infos)
				this.id = row.id;
			},
			//获取全部成员
			getUsers() {
				var that = this;
				axios.get(Config.remoteAddrr)
					.then(function(res) {
						that.userInfos = res.data
						//console.log(that.userInfos)
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//新增成员
			showUser() {
				this.addFormVisible = true;
				this.Infos.uname = "";
				this.Infos.pwd = "";
			}
		}

	}
</script>

<style>

</style>