<template>
	<view>
		<scroll-view class="page">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-purple"></text> 下单信息
				</view>
				<view class="action">
					跟踪
					<text class="cuIcon-right text-purple"></text>
				</view>
			</view>

			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-people text-blue margin-right-xs"></text>
							{{orderInfo.address_contacts}}
							<text class="text-gray margin-left">{{orderInfo.address_mobile}}</text>
						</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-locationfill text-blue margin-right-xs"></text>
							{{orderInfo.address}}
						</view>
					</view>

				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">下单时间</text>
						<text class="text-grey margin-left text-sm">{{orderInfo.create_time}}</text>
					</view>
					<view class="action">

						<text class="text-grey text-sm cuIcon-right"></text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">服务人员</text>
						<view class="staffImage margin-left cu-avatar round" 
						:style="[{backgroundImage:'url(' + staffImage + ')' }]"
						></view>
						<text class="margin-left text-grey text-sm">{{orderInfo.st_info.name}}({{orderInfo.st_info.nickname}})</text>
					</view>
					<view class="action">
						<text class="text-olive" @tap="call()">联系</text>
						<text class="text-olive text-sm cuIcon-dianhua"></text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">用户备注</text>
						<text class="text-grey margin-left text-sm">请按时到达服务地点</text>
					</view>
					<view class="action" @tap="showModal" data-filed="filedname" data-target="DialogModal1">
						<text class="text-olive">修改</text>
						<text class="text-olive text-sm cuIcon-right"></text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content" @tap="">
						<text class="text-grey">预约时间</text>
						<text class="text-grey margin-left text-sm">{{timestampToTime(orderInfo.subtime) }}</text>
					</view>
					<view class="action">
						<text class="text-olive">修改</text>
						<text class="text-olive text-sm cuIcon-right"></text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<input class="uni-input" v-model="totalnum" placeholder="输入加购时长" />
						<text class="text-gray text-sm">当前加购时长<text class="text-blue">{{totalnum}}分钟</text>,需要支付<text class="text-price text-red text-bold">{{Number(totalnum)*Number(orderInfo.add_purchase_price)}}</text></text>
					</view>
					<view class="action">
						
					    <text class="text-red" @click="jiagou()" >加购</text>
						<text class="text-red text-sm cuIcon-roundadd"></text>
					 </view>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-red"></text> 订购信息
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="cu-avatar xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);" :style="{backgroundImage: 'url('+projectImage+')'}"></view>
					<view class="content margin-left flex-sub">
						<view class="text-grey">{{orderInfo.pr_info.title}}</view>
						<view class="text-gray text-sm flex justify-between">
							¥{{orderInfo.pr_info.price}}
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>
							夜间交通补助
						</view>
					</view>
					<view class="action">
						<text class="text-price">{{orderInfo.subsidy}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>
							加购费用
						</view>
						<view class="text-gray text-sm">
							<view class="cu-tag round bg-grey light">{{orderInfo.add_purchase_num+Number(totalnum)}}分钟</view>
						</view>
					</view>
					<view class="action">
						<text class="text-price">{{orderInfo.add_purchase_price*orderInfo.add_purchase_num}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view>
						订单总金额
					</view>
					<view class="action">
						<text class="text-price text-red text-xl">{{Number(orderInfo.add_purchase_price*orderInfo.add_purchase_num)+Number(orderInfo.subsidy)+Number(orderInfo.total_price)}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="cu-modal" :class="modalName=='DialogModal1-'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改备注</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group margin-top">
						<textarea maxlength="-1" @input="textareaAInput" placeholder="请按时到达服务地点"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="submitModal">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>
<script>
	export default {
		data() {
			return {
				orderInfo:{
				},
				staffImage:'',
				projectImage:'',
				modalName: null,
				srcPath: '',
				add_purchase_num: 0,
				totalnum:''
				
			}
		},
		onLoad(options) {
			this.checkLogin();
			this.srcPath = this.apiServer;
			this.details(options.order_id);
		},
		methods: {
			details(order_id){
				uni.request({
					url: this.apiServer + '/api/order/detail?order_id=' + order_id,
					method: 'GET',
					success: (res) => {	
						if(res.data.code==200){
							var data = res.data.data;
							this.orderInfo = data;
							this.staffImage= this.srcPath+'/uploads/'+data.st_info.pic_1;
							this.projectImage= this.srcPath+'/uploads/'+data.pr_info.photo;
						}else{
							uni.showModal({
								content:res.data.msg,
								success() {
									uni.navigateBack({
										delta:1
									})
								},
								fail() {
									uni.navigateBack({
										delta:1
									})
								}
							})
	
						}
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				this.filedName = e.currentTarget.dataset.filed

			},
			hideModal(e) {
				this.modalName = null
			},
			submitModal(e) {
				this.modalName = null
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			stepper(e) {
				this.add_purchase_num = e.val
			},
			timestampToTime(timestamp) {
			        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			        // let Y = date.getFullYear() + '-';
			        // let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			        // let D = date.getDate() + ' ';
			        // let h = date.getHours() + ':';
			        // let m = date.getMinutes() + ':';
			        // let s = date.getSeconds();
			        // return Y+this.padLeftZero(M)+this.padLeftZero(D)+this.padLeftZero(h)+this.padLeftZero(m)+this.padLeftZero(s);
			        let y = date.getFullYear();
			        let MM = date.getMonth() + 1;
			        MM = MM < 10 ? ('0' + MM) : MM;
			        let d = date.getDate();
			        d = d < 10 ? ('0' + d) : d;
			        let h = date.getHours();
			        h = h < 10 ? ('0' + h) : h;
			        let m = date.getMinutes();
			        m = m < 10 ? ('0' + m) : m;
			        let s = date.getSeconds();
			        s = s < 10 ? ('0' + s) : s;
			        return y + '-' + MM + '-' + d + ' ' + h + ':' + m;
			    },
				call(){
						uni.makePhoneCall({
							phoneNumber:'18396861513',
							// 成功回调
							success: (res) => {
							},
						
							// 失败回调
							fail: (res) => {
							}
						})
				},
			jiagou() {
				var tt = this;
				uni.showModal({
					title:'加购提示',
					content:"是否确认支付",
					success() {
						uni.request({
							url: tt.apiServer + '/api/order/jiagou',
							method: 'POST',
							data: {
								order_id: tt.orderInfo.order_id,
								user_id: uni.getStorageSync('USERID'),
								add_purchase_num: tt.totalnum
							},
							success: res => {
								var data = res.data;
								if(data.code==200){
									uni.showToast({
										title:"加购成功",
										duration:3000,
									})
									tt.details(tt.orderInfo.order_id);
									tt.totalnum = '';
								}else{
									uni.showToast({
										title:data.msg,
										duration:3000,
									})
								}
							}
						});
					},
					fail() {
						
					}
				})

			},
			complete() { //确认完成订单
				uni.request({
					url: this.apiServer + '/api/order/complete',
					method: 'get',
					data: {
						order_id: this.detailinfo.order_id
					},
					success: res => {
						var result = res.data;
						console.log(result);
						if (result.err == 0) {
							uni.showToast({
								title: '订单已经完成',
								duration: 2000
							});
							this.totalnum = result.add_purchase_num;
						} else {
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
	.jiagouxinxi {
		float: right;
		margin-bottom: 20rpx;
	}
	.content {}
	.staffImage{
		background-position:center;
		background-size: 100%;
		background-repeat: no-repeat;
	}
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
