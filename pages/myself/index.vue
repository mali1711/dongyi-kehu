<template>
	<view class="content">
		<view class="nav">
			<view class="nav-img">
				<QSImage imageUrl="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1378648704,2924181561&fm=26&gp=0.jpg"
				 imageMode="aspectFill" width="130rpx" height="130rpx" radius="65rpx" animationType="fadRotateZ" />
				<text>余额：<text class="jine">¥{{balance}}</text></text>
			</view>
		</view>
		<view class="order">
			<!-- 一般用法 -->
			<view class="orderDesc">订单中心</view>
			<hr>
			<uni-list>
				<navigator url="orders?status=0" open-type="navigate" hover-class="navigator-hover">
					<uni-list-item title="新订单"></uni-list-item>
				</navigator>
				<navigator url="orders?status=1" open-type="navigate" hover-class="navigator-hover">
					<uni-list-item title="进行中"></uni-list-item>
				</navigator>
				<navigator url="orders?status=2" open-type="navigate" hover-class="navigator-hover">
					<uni-list-item title="已完成"></uni-list-item>
				</navigator>
				<navigator url="orders?status=3" open-type="navigate" hover-class="navigator-hover">
					<uni-list-item title="已取消"></uni-list-item>
				</navigator>
			</uni-list>
		</view>
		<view class="setting">
			<!-- 一般用法 -->
			<view class="orderDesc">设置</view>
			<hr>
			<uni-list>
				<navigator url="address" open-type="navigate" hover-class="navigator-hover">
					<uni-list-item title="常用地址"></uni-list-item>
				</navigator>
				<navigator url="editpasswd">
					<uni-list-item title="	修改密码"></uni-list-item>
				</navigator>
				<navigator url="Recharge">
					<uni-list-item title="充值中心"></uni-list-item>
				</navigator>
			</uni-list>
		</view>
		<view class="logout" @click="logout">
			<button type="warn">退出登陆</button>
		</view>
	</view>
</template>

<script>
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue"
	import QSImage from "../../components/QS-image/QS-image.vue"
	export default {
		components: {
			uniList,
			uniListItem,
			QSImage
		},
		data() {
			return {
				title: '你好董亿',
				path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=791a660d9c2397ddd679980c6983b216/591f9758d109b3de80a0bb82c1bf6c81810a4c89.jpg',
				animationType: 'fadRotateZ',
				balance: ''
			}
		}, 
		onShow() {
			this.checkLogin();
		},
		onLoad() {
			this.checkLogin();
			uni.request({
				url: this.apiServer + '/api/user/balance',
				method: 'GET',
				data: {
					users_id: uni.getStorageSync('USERID')
				},
				success: res => {
					this.balance = res.data;
					console.log(res.data);
				}
			});
		},
		onShow() {
			uni.request({
				url: this.apiServer + '/api/user/balance',
				method: 'GET',
				data: {
					users_id: uni.getStorageSync('USERID')
				},
				success: res => {
					this.balance = res.data;
					console.log(res.data);
				}
			});
		},
		methods: {
			logout() {
				uni.clearStorage(); //清理本地缓存
				uni.navigateTo({
					url: "/pages/myself/login"
				})
			}
		}
	}
</script>

<style>
	.logout button {
		width: 710rpx;
		margin-top: -160rpx;
	}

	.setting {
		margin-top: -70rpx;
		width: 710rpx;
		height: 500rpx;
	}

	.order {
		margin-top: 150rpx;
		width: 710rpx;
		height: 500rpx;
	}

	.orderDesc {
		font-size: 30rpx;
		background-color: #FFFFFF;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f1f1f1;
	}

	.nav {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 130rpx;
		background-color: #fd5f5e;
	}

	.nav .nav-img {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 730rpx;
		height: 240rpx;
		background-image: url('~@/static/jianbian.png');
	}

	.nav-img text {
		color: #FFFFFF;
		font-size: 40rpx;
		margin-bottom: 15rpx;
	}

	.nav-img .jine {
		color: #FFFFFF;
		font-size: 45rpx;
		margin-bottom: 15rpx;
	}
</style>
