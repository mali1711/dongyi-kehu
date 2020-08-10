<template>
	<view class="content">
		<view class="nav">
			<image src="../../static/myselfPic.png" mode="aspectFit" />
		</view>
		<view class="order">
			<!-- 一般用法 -->
			<view class="orderDesc">订单中心</view>
			<hr>
			<uni-list>
			    <navigator url="orders"><uni-list-item title="新订单"></uni-list-item></navigator>
			    <uni-list-item title="进行中"></uni-list-item>
				<uni-list-item title="已完成"></uni-list-item>
				<uni-list-item title="已取消"></uni-list-item>
			</uni-list>
		</view>
		<view class="setting">
			<!-- 一般用法 -->
			<view class="orderDesc">设置</view>
			<hr>
			<uni-list>
			    <uni-list-item title="个人资料"></uni-list-item>
				<navigator url="address" open-type="navigate" hover-class="other-navigator-hover">
					<uni-list-item title="常用地址"></uni-list-item>
				</navigator>
				<uni-list-item title="修改密码"></uni-list-item>
			</uni-list>
		</view>
		<view class="logout">
			<button type="warn">退出登陆</button>
		</view>
	</view>
</template>

<script>
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue"
	export default {
		components: {uniList,uniListItem},
		data() {
			return {
				title: '你好董亿'
			}
		},
		onLoad() {
		this.checkLogin()
		},
		methods: {

		}
	}
</script>

<style>
	.logout button{
		width: 710rpx;
		margin-top: -160rpx;
	}
	.setting{
		margin-top: -70rpx;
		width: 710rpx;
		height: 500rpx;
	}
	.order{
		margin-top: 150rpx;
		width: 710rpx;
		height: 500rpx;
	}
	.orderDesc{
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
	.nav{
		display: flex;
		justify-content:center;
		width: 100%;
		height: 130rpx;
		background-color: #fd5f5e;
	}
	.nav image {
		width: 730rpx;
		height: 240rpx;
	}
</style>
