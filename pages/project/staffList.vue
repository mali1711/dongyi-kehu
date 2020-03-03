<template>
	<view>
		<view class="content">
			<view class="userlist" v-for="(item, index) in staffList" :key="index">
				
				<image class="userheadimg" mode="aspectFit" :src="item.pic_1"></image>
				<navigator :url="'/pages/project/manageTime?st_id='+item.st_id+'&pic_1='+item.pic_1+'&pr_id='+pr_id+'&stname='+item.name">
				<view class="userinfo">
					<p class="name">
						名字：{{item.name}}
					</p>
					<p class="distance">
						距离：<text>1.0km</text>
					</p>
					<p class="desc">
						简介：<text>{{item.desc}}</text>
					</p>
					<p class="orderQuantity">
						单量：100以上
					</p>
				</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-badge/uni-badge.vue"
	export default {
		components: {uniNavBar},
		data() {
			return {
				staffList : [],//技师列表
				pr_id:0//项目ID
			}
		},
		onLoad(options) {
			this.pr_id = options.pr_id;
			console.log(options);
			uni.request({
				url:"https://dongyi.sir6.cn/api/staff/all",
				method:'GET',
				success: (res) => {
					console.log(res);
					this.staffList = res.data.data;
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	.content{
		display: flex;
		flex-direction: column;
		background: #F1F1F1;
	}
	.userlist{
		width: 98%;
		margin-top: 3rpx;
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		margin-left: 1%;

	}
	.userlist p{
		font-size: 25rpx;
		line-height: 35rpx;
	}
	.userinfo{
		padding-top: 20rpx;
	}
	.userinfo .desc{
		width: 500rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.userheadimg{
		margin-left: 10rpx;
		width: 240rpx;
		height: 240rpx;
		margin-right: 10rpx;
		padding-top: 10rpx;
		padding-left: 10rpx;
	}
	.distance text{
		color: red;
	}
	.orderQuantity{
		color: red;
		float: right;
		margin-top: 30rpx;
		margin-right: 20rpx;
	}
</style>
