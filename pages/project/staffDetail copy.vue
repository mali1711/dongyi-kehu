<template>
	<view class="user">
		<!-- 头部 -->
		<view class="user-wrap">
			<button class="appoint cu-btn round bg-yellow" @click="selectTime(st_id,pic_1,pr_id)">确认预约</button>
			<view class="info">
				<image class="avatar" mode="aspectFill" :src="userInfo.headPicUrl"></image>
				<view class="nickname">{{ userInfo.nickName }}</view>
			</view>
		</view>

		<!-- 订单状态 -->
		<view class="order-status">
			<view class="status-wrap">
				<!-- 单元格 -->
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-order.png" mode="aspectFill"></image>
						<view class="cell-text">个人简介</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>

				<!-- 订单状态 -->
				<view class="status-list">
					<view class="status-item" hover-class="btn-hover">
						
						<view class="item-text" style="margin-left: 16rpx;">
							{{userInfo.desc}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 滑动导航 -->
		<view style="border-radius: 20rpx; overflow: hidden; margin: 0 20rpx;">
			<com-nav :list="list" :col="4"></com-nav>
		</view>





		<!-- 技师照片 -->
		<view class="com-item">
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/zhaopian.svg" mode="aspectFill"></image>
						<view class="cell-text">详情信息</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
 			<view class="com-wrap">
				<view class="cell" style="height: 700rpx;">
					
					<view class="cell-left">
						<image mode="aspectFill" style="width:750rpx;height: 750rpx;"
						:src="userInfo.pic_6"></image>
					</view>
				</view>
				<view class="cell" style="height: 450px;">
					<view class="cell-left">
						<image mode="aspectFill" style="width:750rpx;height: 750rpx;"
						:src="userInfo.pic_7"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import comNav from '../../components/com-nav/com-nav.vue'
export default {
	components: {
		comNav
	},
	onLoad(options) {
		let staffInfo = Array;
		this.product.st_id = options.st_id;
		this.product.pic_1 = options.pic_1;
		this.product.stname = options.stname;
		this.product.nickName = options.nickName;
		this.product.headPicUrl = options.headPicUrl;
		uni.setStorageSync('PRODUCT',this.product );//当前选择的技师粗放到缓存内
		this.st_id = options.st_id;
		this.pic_1 = options.pic_1;
		this.stname = options.stname;
		this.userInfo.nickName = options.stname;
		this.userInfo.headPicUrl = options.pic_1;
		this.list[1].text = options.distance;
		this.getdetail(options.st_id);
	
	},
	methods:{
		getdetail(stId){
			var tt = this
			uni.request({
				url: this.apiServer+'/api/staff/'+stId,
				method:'GET',
				success(res) {
					var data = res.data;
					if(data.code==0){
						tt.userInfo.desc = data.data.desc;
						tt.userInfo.pic_6 = tt.apiServer+"/uploads/"+data.data.pic_6;
						tt.userInfo.pic_7 = tt.apiServer+"/uploads/"+data.data.pic_7;
					}else{
						uni.showToast({
							title: '数据获取失败'
						});
					}
				}
			})
		}
		,selectTime(st_id,pic_1,pr_id,name,status,distance){
			if(status==0){
				uni.showToast({
					title:'技师休息中'
				})
			}else{
				uni.navigateTo({
					url:'/pages/project/stToProTime?st_id='+st_id+'&pic_1='+pic_1+'&pr_id='+pr_id+'&stname='+name
				})
			}
		}
	},
	data() {
		return {
			st_id:0,	//技师ID
			pic_1:'',	//技师头像
			stname:'',	//技师姓名
			pr_id:'',
			userInfo: {
				headPicUrl: '/static/images/user/avatar.jpg',
				nickName: '韩琳琳.琳琳',
				desc:'',
				pic_6:'',
				pic_7:''
			},
			product:{
				
			},
			currentIndex: 0,
			list: [
				{
					icon: '/static/images/user/tongji.svg',
					text: '332单'
				},
				{
					icon: '/static/images/user/weizhi1.svg',
					text: '30km'
				},
				{
					icon: '/static/images/user/pingfen.png',
					text: '99.5'
				},
				{
					icon: '/static/images/user/jinpai.svg',
					text: '金牌技师'
				}
			]
		};
	}
};
</script>
<style lang="scss">
page {
	background: #f2f2f2;
}
.btn-hover {
	background: #f2f2f2 !important;
}
.user {
	.user-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50vw;
		padding: 30rpx;
		z-index: 9;
		border-radius: 0 0 20% 20%;
		background: url('https://handsel.oss-cn-shenzhen.aliyuncs.com/1588938371592.jpg') no-repeat;
		background-size: cover;
		
		.appoint {
			color: #fff;
			position: absolute;
			top: 26rpx;
			right: 20rpx;
			font-size: 28rpx;
		}
		.info {
			position: absolute;
			text-align: center;
			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
			.nickname {
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
	.order-status {
		padding: 0 20rpx;
		margin-top: -10vw;
		.status-wrap {
			border-radius: 25rpx;
			overflow: hidden;
			.status-list {
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				background: #fff;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				.status-item {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.item-icon {
						line-height: 1;
						font-size: 65rpx;
						color: #bbb;
					}
					.item-text {
						font-size: 28rpx;
						color: #666;
						margin-top: 5rpx;
					}
				}
			}
		}
	}
	.com-item {
		padding-left: 20rpx;
		padding-right: 20rpx;
		margin-top: 20rpx;
		.com-wrap {
			border-radius: 25rpx;
			overflow: hidden;
		}
	}
	.cell {
		height: 80rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		border-bottom: 1px solid #f8f8f8;
		&:active {
			background: #f2f2f2;
		}
		&:last-child {
			border-bottom: none !important;
		}
		.cell-left {
			display: flex;
			align-items: center;
			.cell-icon {
				width: 50rpx;
				height: 50rpx;
			}
			.cell-text {
				color: #666;
				font-size: 28rpx;
				margin-left: 20rpx;
			}
		}
		.iconfont {
			font-size: 40rpx;
			color: #999;
		}
	}
}
</style>
