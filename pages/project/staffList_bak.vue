<template>
	<view>
		<view class="content">
			<view class="userlist" v-for="(item, index) in staffList" :key="index">
				
				<image class="userheadimg" mode="aspectFit" :src="item.pic_1"></image>
				
				<view class="userinfo" @click="selectTime(item.st_id,item.pic_1,pr_id,item.name,item.status)">
					<p class="name">
						名字：{{item.name}}
						<view v-if="item.status==1" style="float: right; margin-right: 30rpx; color: #00B26A;"> 服务中 </view>
						<view v-if="item.status==0" style="float: right; margin-right: 30rpx; color: red;"> 请假中 </view>
					</p>
					<p class="distance">
						距离：<text>{{item.distance}}km</text>
					</p>
					<p class="desc">
						简介：<text>{{item.desc}}</text>
					</p>
					<p class="orderQuantity">
						单量：100以上
					</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				staffList : [],//技师列表
				pr_id:0,//项目ID
				filter:{
					sort:'最新',
					order:1
				},
			}
		},
		onLoad(options) {
			this.pr_id = options.pr_id;
			console.log(options);
			this.goodsFilterChanged(this.filter);
		},
		methods: {
			goodsFilterChanged(filter){
				let lng = uni.getStorageSync('LONGITUDE');
				let lat = uni.getStorageSync('LATITUDE'); 
				uni.request({
					url: this.apiServer+'/api/staff/',
					method: 'GET',
					data: {
						filter:filter.sort,
						order:filter.order,
						lng:lng,
						lat:lat
					},
					success: res => {
						console.log(res);
						this.staffList = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
				
				// 此处可根据fitler数据，从服务器端加载数据
				// pageIndex = 0;
				// this.isEnd = false;
				// this.loadingType = 0;
				// this.curCateFid=filter.option || ""
				// // 加载数据
				// const resetData=true;
				// this.loadMoreGoods(filter,resetData);
			},
			selectTime(st_id,pic_1,pr_id,name,status){
				if(status==0){
					uni.showToast({
						title:'技师休息中'
					})
				}else{
					uni.navigateTo({
						url:'/pages/project/manageTime?st_id='+st_id+'&pic_1='+pic_1+'&pr_id='+pr_id+'&stname='+name
					})
				}
			}
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
