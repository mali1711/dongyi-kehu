<template>
	<view class="content">
		<view class="orderInfo" v-for="(item,index) in orderList" :key="index">
			<navigator :url="'orderDetail?order_id='+item.order_id">
				<view class="head">
					<text class="addtime"><text class="addtime-title">&nbsp; 时间 </text>：{{item.create_time}}</text> 
					<text class="status">等待接单</text>
				</view>
				<hr>
				<view class="body">
					<view>
						<text class="yuyueshijian">
							<text class="yuyueshijian-title">预约时间</text>：<text class="yuyueshijian2">{{item.subtime}}</text>
						</text>
					</view>
						<view class="dizhi">
							<view class="xiangxidizhi">{{item.address}}</view>
							<view class="lianxiren">{{item.address_contacts}}：{{item.address_mobile}}</view>
						</view>
						<view class="xiangmu">
							<text class="xiangmuMing">全身SPA x1</text>
							<text class="zongJiaGe">{{item.add_purchase_price}}¥</text>
						</view>
				</view>
			</navigator>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:[]
			}
		},
		onLoad(options) {
		var status = options.status
		uni.request({
			url: this.apiServer+'/api/order/read',
			data:{
				status:status,
				user_id:uni.getStorageSync('USERID')
			},
			method: 'GET',
			success: res => {
				if(res.data.err>0){
					uni.showModal({
						title:'信息提示',
						content:'没有订单信息',
						showCancel:false
					});
					setTimeout(function () {
					    uni.navigateBack({
					        delta: 1
					    });
					}, 2000);
				}else{
					this.orderList = res.data.data;
					console.log(res.data.data);
				}

			},
			fail: () => {},
			complete: () => {}
		});	
		},
		methods: {
			
		}
	}
</script>

<style>
	.content{
		background-color: #F1F1F1;
		height: 100%;
		width: 100%;
	}
	.nav{
		width: 100%;
		height: 150rpx;
		background-color: #fd5f5e;
		line-height: 150rpx;
		text-align: center;
	}
	.orderInfo{
		
		margin-top: 20px;
		background-color: #FFFFFF;
		margin-top: 20px;
		height: 320rpx;
	
	}
	.head{
		font-size: 30rpx;
		line-height: 100rpx;
	}
	.body{
		display: flex;
		flex-direction: column;
	}
	.addtime{
		color: #balce;
		margin-left: 30rpx;
	}
	.status{
		float: right;
		margin-right: 30rpx;
	}
	.yuyueshijian{
		margin-left: 30rpx;
		float: left;
	}
	.jiage{
		margin-right: 30rpx;
		float: right;
		color: red;
		font-weight: bold;
	}
	.dizhi{
		display: flex;
		flex-direction: column;
		float: left;
	}
	.xiangxidizhi{
		float: left;
		margin-left: 30rpx;
		color: #2d2d2d;
		font-size: 30rpx;
	}
	.lianxiren{
		float: left;
		margin-left: 30rpx;
	}
	.xiangmu{
		margin-left: 30rpx;
	}
	.xiangmu .xiangmuMing{
		float: left;
		font-weight: bold;
	}
	.zongJiaGe{
		color: red;
		font-weight: bold;
		float: right;
		margin-right: 30rpx;
	}
	.yuyueshijian-title{
		
	}
	.yuyueshijian2{
		color: #d8495d;
	}
	.addtime-title{
		background: #2a7cf9;
		color: #F1F1F1;
		border-radius: 15rpx;
		text-align: center;
		height: 40rpx;
		font-size: 30rpx;
	}
</style>
