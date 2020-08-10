<template>
	<view class="content">
		<view class="address">
			<view>{{detailinfo.address_contacts}}</view>
			<view>{{detailinfo.address_mobile}}</view>
			<view>{{detailinfo.address}}</view>
		</view>
		<view class="address-content">
			<img class="projectImg" :src="srcPath+'/uploads/'+detailinfo.pr_info.photo" alt="">
			<view class="address-content-desc">
				<view class="prname">
					<text class="protitle">项目名称:</text>
					<text class="proname">中医推拿</text>
				</view>
				<view class="prname">
					<text class="protitle">{{detailinfo.pr_info.title}}</text>
					<text class="proname">¥{{detailinfo.total_price}}</text>
				</view>
			</view>
		</view>
		<view class="address-content">
			<img class="projectImg" :src="srcPath+'/uploads/'+detailinfo.st_info.pic_1" alt="">
			<view class="address-content-desc">
				<view class="prname">
					<text class="protitle">{{detailinfo.subtime}}:</text>
					<text class="proname">{{detailinfo.st_info.name}}</text>
				</view>
				<view class="prname">
					<text class="protitle">预约时间:</text>
					<text class="proname">02-11 23:00:00</text>
				</view>
			</view>
		</view>
<!-- 		<view class="address-content">
			<view class="jiagouxinxi">
				当前加购信息 &nbsp;&nbsp;&nbsp;&nbsp;¥50 x 2 <text class="zongjiagou">=¥100</text>
			</view>
		</view> -->
		<view class="sunui">
			<view class="sunui-title">加价简介：最急最低加价数量2，单价¥50，每次加价20分钟,<text>当前已经加购数量{{totalnum}}个</text></view>
			<view class="jiagou-border" v-if="detailinfo.status!=2">
				<sunui-stepper unactive="#ddd" active="#19A15F" :label='0' :val="2" :max="10" :min="2" :step="2" @change="stepper"></sunui-stepper>
				<button class="jiagou" @click="jiagou()" type="warn">加购</button>
			</view>
		</view>
		<button v-if="detailinfo.status==1" @click="complete()" type="primary">确认完成</button>
	</view>
</template>

<script>
	import sunUiStepper from '../../components/sunui-stepper/sunui-stepper.vue'
	export default {
		components: {
			"sunui-stepper": sunUiStepper
		},
		data() {
			return {
				detailinfo:null,
				srcPath:'',
				add_purchase_num:0,
				totalnum:0
			}
		},
		onLoad(options) {
			this.checkLogin();
			this.srcPath = this.apiServer;
			uni.request({
				url:this.apiServer+'/api/order/detail?order_id='+options.order_id,
				method:'GET',
				success: (res) => {
					this.detailinfo = res.data;
					this.add_purchase_num = res.data.add_purchase_minimum;//最低加购数量
					this.totalnum = res.data.add_purchase_num;//当前加购数量
					console.log(this.detailinfo.create_time);
				}
			})
		},
		methods: {
			stepper(e){
				this.add_purchase_num = e.val
			},
			jiagou(){
				console.log(this.detailinfo.order_id);
				console.log(this.add_purchase_num);
				uni.request({
					url: this.apiServer+'/api/order/jiagou',
					method: 'POST',
					data: {
						order_id:this.detailinfo.order_id,
						user_id:uni.getStorageSync('USERID'),
						add_purchase_num:this.add_purchase_num
					},
					success: res => {
						var result = res.data;
						console.log(result);
						if(result.err==0){
							uni.showToast({
							    title: '加购成功',
							    duration: 2000
							});
							this.totalnum = result.add_purchase_num;
						}else{
							uni.showToast({
							    title: '余额 不足',
							    duration: 2000
							});
						}
					}
				});
			},
			complete(){ //确认完成订单
			console.log(this.detailinfo.order_id);
				uni.request({
					url: this.apiServer+'/api/order/complete',
					method: 'get',
					data: {
						order_id:this.detailinfo.order_id
					},
					success: res => {
						var result = res.data;
						console.log(result);
						if(result.err==0){
							uni.showToast({
							    title: '订单已经完成',
							    duration: 2000
							});
							this.totalnum = result.add_purchase_num;
						}else{
							uni.showToast({
							    title: '操作有误，请联系客服',
							    duration: 2000
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	.jiagouxinxi{
		float: right;
		margin-bottom: 20rpx;
	}
	.content {}

	.address {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* 相对父元素水平居中 */
		font-size: 30rpx;
		height: 260rpx;
		color: #FFFFFF;
		background-color: #fd5e5e;
		text-align: center;
	}

	.address-content {
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid #DDDDDD;
	}

	.projectImg {
		height: 200rpx;
		width: 200rpx;
	}

	.address-content-desc {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-left: 20rpx;
		margin-top: 30rpx;
	}

	.prname {
		font-size: 30rpx;
		color: #414141;
		width: 500rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
	}

	.protitle {
		float: left;
	}

	.proname {
		float: right;
	}

	.sunui {
		padding: 4%;
	}

	.sunui-title {
		margin: 0;
		margin-bottom: 4%;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, 0.6);
		padding: 20px 15px 15px;
		border-bottom: 1upx solid #eee;
	}

	.sunui>.sunui-title {
		margin-bottom: 2%;
	}

	.jiagou-border {
		display: flex;
		flex-wrap: wrap;
	}

	.jiagou {
		width: 160rpx;
		height: 70rpx;
		line-height: 70rpx;
		margin-left: 320rpx;
	}
</style>
