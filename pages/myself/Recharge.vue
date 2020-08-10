<template>
	<view class="content">
		<button class="moe" type="primary" disabled="true">充值金额：¥{{m}}</button>
		<view class="money-border">
			<button class="rec" v-for="(itme,index) in money" :key="index" @click="cl(itme)" type="primary" plain="true" hover-stay-time="700">{{itme}}</button>
		</view>
		<button class="rech" type="warn" @click="requestPayment(m)">确认充值</button>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-badge/uni-badge.vue"
	export default {
		components: {uniNavBar},
		onLoad() {
			this.checkLogin();
		},
		data() {
			return {
				money:[100,300,500,1000,1500,2000],
				m:500
			}
		},
		methods: {
			cl(e){
				this.m = e;
			},
			async requestPayment() {
			    let orderInfo = await this.getOrderInfo(this.m);
			    console.log("得到订单信息", orderInfo);
			    if (orderInfo.statusCode !== 200) {
			        console.log("获得订单信息失败", orderInfo);
			        uni.showModal({
			            content: "获得订单信息失败",
			            showCancel: false
			        })
			        return;
			    }
			    uni.requestPayment({
			        provider: 'alipay',
			        orderInfo: orderInfo.data,
			        success: (e) => {
			            console.log("success", e);
			            uni.showToast({
			                title: "支付成功"
			            })
			        },
			        fail: (e) => {
			            console.log("fail", e);
			            uni.showModal({
			                content: "支付失败",//+ e.errMsg,
			                showCancel: false
			            })
			        },
					complete: () => {
                        console.log("payment结束")
                        this.loading = false;
                    }
			    })
			},
			getOrderInfo(m) {
				var user_id = uni.getStorageSync('USERID');
			    let appid = "";
			    // #ifdef APP-PLUS
			    appid = plus.runtime.appid;
			    // #endif
			    let url = this.apiServer+'/api/Api/pay';
			    return new Promise((res) => {
			        uni.request({
			            url: url,
						data:{
							user_id:user_id,
							total:m
						},
			            success: (result) => {
			                res(result);
			            },
			            fail: (e) => {
			                res(e);
			            }
			        })
			    })
			},
			
		}
	}
</script>

<style>
	.moe{
		margin-top: 80rpx;
		width: 100%;
		height: 200rpx;
		font-size: 60rpx;
		line-height: 200rpx;
		color: #FFFFFF;
	}
	.content{
		display: flex;
		flex-direction: column;
	}
	.money-border{
		margin-top: 100rpx;
		display: flex;
		flex-direction: row;
		flex-flow: wrap;
	}
	.rec{
		width: 200rpx;
		margin-top: 50rpx;
	}
	.rech{
		margin-top: 100rpx;
		width: 60%;
	}
</style>
