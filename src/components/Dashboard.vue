<template>
	<div>
		<div id="myChart"></div>
	</div>
</template>

<script>
	import axios from 'axios';
	let Api = require("@/assets/js/api.js")
	let Config = Api.default.Config;
	export default {
		name: 'hello',
		data() {
			return {
				users: []
			}
		},
		created() {
			this.getUser();
		},
		methods: {
			//获取数据方法
			getUser() {
				var that = this;
				axios.get(Config.remoteAddrr)
					.then(function(res) {
						//						that.userInfos = res.data
						console.log(res.data)
						for(let i = 0; i < res.data.length; i++) {
							that.users.push(res.data[i].uname)
						}
						//这里在更新完数据后调用绘图函数来画图
						console.log(that.users)
						that.drawLine();
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//创建图标方法
			drawLine() {
				var that = this;
				// 基于准备好的dom，初始化echarts实例
				let myChart = that.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					title: {
						text: '在Vue中使用echarts'
					},
					tooltip: {},
					xAxis: {
						data: that.users
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: [5, 20, 36]
					}]
				});
			}
		}
	}
</script>
<style scoped>
	#myChart {
		height: 500px;
		width: 300px;
	}
</style>