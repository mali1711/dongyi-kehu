<template>
	<view class="content">
		<view class="nav">
			<view class="banner">
				<image :src="projectpic" mode="aspectFill"></image>
				<view class="navtitle">
					<view class="yello"></view>
					<text class="navtext">{{data.title}}</text>
					<text class="price">{{data.price}}/次</text>
				</view>
			</view>
		</view>
		<uni-list>
			<navigator url="/pages/project/index" open-type="switchTab">
			<uni-list-item title="选择其他项目">
					<p class="list-text">{{data.title}}</p>
			</uni-list-item>
			</navigator>
			<uni-list-item :title=product.stname @click="selectTime()">
				<p class="list-text">{{subscribetime}}</p>
			</uni-list-item>
			<uni-list-item title="服务时长">
				<p class="list-text">{{data.duration}}分钟</p>
			</uni-list-item>
			<navigator  url="../myself/address">
			<uni-list-item title="当前地址">
				<p class="list-text">{{address}}-{{name}}</p>
			</uni-list-item>	
			</navigator>
		</uni-list>
		<button class="submit" @click="subscribe()" size="mini">确认预约</button>
		<view class="detalis">
			<view class="banner">
				<view class="navtitle">
					<view class="yello">
					</view>
					<text class="navtext">项目简介</text>
				</view>
				<uni-list>
					<view class="detalisdesc">
						{{data.desc}}
				</view>
					<view class="dinggouxuzhi">
						<h6>订购须知</h6>
						<view class="detalisdesc">
							1.本店严格拒绝一切形式的非正规服务，<br>
							2.订单确认后，修改订单或退款需提前2小时通知；<br>
							3.预约时间前2小时内退单将按30元/人扣取误工费；<br>
							4.如商家接单后爽约将全额退款并向您额外赔付30元；<br>
							5.为保障您的权益，所有费用请通过董亿平台支付；<br>
							6.本店24小时上门服务，但因夜间交通不便，晚21:00～早07:30间服务的订单，需另行支付技师往返打车费用（往返金额共计不超过100元）。<br>
							</br>
						</view>
					</view>
				</uni-list>
			</view>
		</view>

	</view>
</template>

<script>
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				data:'',
				pic_1:'',
				st_id:0,
				subscribetime:null,
				selectUser:false,
				stname:'请选择技师',
				address:'请选择地址',
				projectpic:'',
				name:'',
				product:{
					
				}
			}
			},
		onLoad(options) {
			this.checkLogin()
			this.subscribetime = options.subscribetime;
			console.log(this.subscribetime);
			if(this.subscribetime=='undefined'){{
				this.subscribetime = '请选择时间';
			}}
			this.product = uni.getStorageSync('PRODUCT');
			this.product.pr_id = options.pr_id;
			uni.setStorageSync('PRODUCT',this.product);
			this.st_id = options.st_id;
			this.pic_1 = options.pic_1;
			this.pr_id = options.pr_id;
			let pr_id = options.pr_id;
			uni.request({
				url:this.apiServer+"/api/project/"+pr_id,
				method:'GET',
				success: (res) => {
					this.data = res.data;
					this.projectpic =  this.apiServer+'/uploads/'+res.data.photo
		
				}
			});
			var t = this;
			setInterval(function(){
				uni.request({
					url: t.apiServer+'/api/address/index?user_id='+uni.getStorageSync('USERID'),
					method: 'GET',
					success: res => {
						var data = res.data;
						if(data.err==1){

						}else{
							t.address = data.data.address;
							t.name = data.data.name;
							t.mobile = data.data.mobile;
							t.longitude = data.data.longitude;
							t.latitude = data.data.latitude;
						}
					},
				});
			},2500)
			
		},
		onShow() {
			this.myaddress();
		},
		methods: {
			selectTime:function(){
				uni.navigateTo({
					url:'/pages/index/manageTime?st_id='+this.product.st_id+'&pic_1='+this.product.pic_1+'&stname='+this.product.name
				})
			},
			subscribe:function(){
				if(this.st_id==undefined){
					uni.showModal({
						title:'错误提示',
						content: '请选择技师，以及预约时间',
						showCancel: false
					});
				}else{
					uni.request({
						url:this.apiServer+"/api/order/save",
						data:{
							st_id:this.st_id,
							pr_id:this.pr_id,
							subtime:this.subscribetime,
							address: this.address,
							address_contacts:this.name,
							address_mobile:this.mobile,
							longitude:this.longitude,
							latitude:this.latitude,
							user_id:uni.getStorageSync('USERID')
							
						},
						method:'POST',
						success: (res) => {
							uni.showModal({
								title:'信息提示',
								content:res.data.msg,
								showCancel:false
							});
							if(res.data.err==0){
								uni.redirectTo({
									url: '/pages/myself/orders?status=0'
								});
							}
						}
					})
				}
			},
			selectPay:function(){
				var payInfo = {
					st_id:this.st_id,
					pr_id:this.pr_id,
					subtime:this.subscribetime,
					address: this.address,
					address_contacts:this.name,
					address_mobile:this.mobile,
					longitude:this.longitude,
					latitude:this.latitude,
					user_id:uni.getStorageSync('USERID')
				};
				uni.setStorageSync('payInfo',payInfo);
				var s = uni.getStorageSync('payInfo');
			},
			myaddress(){//获取当前用户地址
				uni.request({
					url: this.apiServer+'/api/address/index?user_id='+uni.getStorageSync('USERID'),
					method: 'GET',
					success: res => {
						var data = res.data;
						if(data.err==1){
							uni.showModal({
								title:'错误提示',
								content:'请完善您的服务地址',
								showCancel:false
							});
						}else{
							this.address = data.data.address;
							this.name = data.data.name;
							this.mobile = data.data.mobile;
							this.longitude = data.data.longitude;
							this.latitude = data.data.latitude;
						}
					},
				});
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		width: 750rpx;
		background-color: #f1f1f1;
		
	}

	.banner image {
		width: 750rpx;
		height: 300rpx;
	}

	.dinggouxuzhi {
		margin-top: 20rpx;
		background-color: #fdfaf0;
		white-space: pre-line;
	}

	.dinggouxuzhi h6 {
		margin-top: 10rpx;
		margin-left: 30rpx;
		color: #FF3000;
	}

	.dinggouxuzhi view {
		color: #823105;
	}

	.detalisdesc {
		margin-left: 30rpx;
		font-size: 24rpx;
		white-space: pre-line;
	}

	.list-text {
		text-align: right;
		font-size: 25rpx;
		margin-bottom: -38rpx;
		margin-top: 0rpx;
		line-height: 55rpx;

	}

	.uni-list {
		margin-top: 15rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
	}

	.nav {
		background-color: #FFFFFF;
		height: 400rpx;
	}

	.navtext {
		font-size: 30rpx;
		font-weight: bold;
	}

	.price {
		margin-right: 38rpx;
	}

	.navtitle {
		margin-top: 10rpx;
		height: 50rpx;
		background-color: #FFFFFF;
	}

	.yello {
		width: 15rpx;
		height: 50rpx;
		background: #e89712;
		float: left;
		margin-left: 32rpx;
		margin-right: 10rpx;
	}

	.nav {
		font-size: 35rpx;
		font-weight: 300;
		line-height: 50rpx;
	}

	.navtitle .price {
		float: right;
		color: red;
	}
	.submit{
		width: 100%;
		margin-top: 20rpx;
		margin-bottom: 30rpx;
		background-color: #e09b12;
		color: #FFFFFF;
	}
</style>
