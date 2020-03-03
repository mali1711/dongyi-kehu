<template>
	<view class="content">
		<view v-if="!changeSuccess">
			<view class="uni-form-item uni-column">
				<input type="tel" class="uni-input" name="" placeholder="请输入手机号"  v-model="mobile" />
			</view>
			<view class="uni-form-item uni-column column-with-btn">
				<input  type="number" class="uni-input" name="" placeholder="请输入验证码" v-model="inputcode" />
				<button :class="{active : !disableCodeBtn}" :disabled="disableCodeBtn" @tap="sendCode">{{codeBtn.text}}</button>
			</view>
			<view class="uni-form-item uni-column">
				<input type="password" class="uni-input" name="" placeholder="请输入新密码" v-model="passwd" />
			</view>
			<button type="primary" @click="forgetsubmit">提交</button>
		</view>
		<view v-if="changeSuccess">
			<view class="text-reset">重置成功，新密码已生效！</view>
			<button type="primary" @tap="gotoLogin">立即登陆</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				captchaImg: '',
				mobile:'',
				seconds: 120,
				inputcode:'',//用户输入的验证码
				code: '',//接口返回的验证码
				codeBtn: {
					text: '获取验证码',
					waitingCode: false,
					count: this.seconds
				},
				changeSuccess: false
			}
		},
		onLoad() {

		},
		methods: {
			sendCode: function () {
				let t = this;
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';
				
				let countdown = setInterval( () => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if( this.codeBtn.count < 0 ){
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.codeBtn.waitingCode = false;
					}
				},1000);
				uni.request({
					url: this.apiServer + '/api/sms/sendmsg',
					method: 'POST',
					data: {
						mobile: this.mobile
					},
					success: res => {
						if (res.data.err == 0) {
							t.code = res.data.code;
							console.log(this.code);
							uni.showToast({
								title: '短信发送成功'
							});
						}
					}
				});
			},
			gotoLogin: function () {
				uni.navigateTo({
					url: 'login'
				})
			},
			forgetsubmit:function(){
				if(this.inputcode==this.code){
					if(this.passwd==''){
						uni.showToast({
							title: '密码不能为空'
						});
					}else{
						uni.request({
							url: this.apiServer+'/api/login/forgetPasswd',
							method: 'POST',
							data: {
								mobile:this.mobile,
								passwd:this.passwd
							},
							success: res => {
								if(res.data.err==0){
									uni.showToast({
										title: '更新成功'
									});
									this.changeSuccess = true;
								}else{
									uni.showToast({
										title: res.data.msg
									});
								}
							},
							fail: () => {},
							complete: () => {}
						});
					}
				}else{
					uni.showToast({
						title: '验证码输入错误'
					});
					return false;
				}
			}
		},
		computed: {
			disableCodeBtn: function() {
				return this.codeBtn.waitingCode || this.mobile.length < 11;
			}
		}
	}
</script>

<style lang="scss" scoped>
	$color-primary: #fd5f5e;
	.content{
		padding: 100upx;
	}
	.uni-form-item{
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;
		.uni-input{
			font-size: 30upx;
			padding: 7px 0;
		}
	}
	.column-with-btn{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		button{
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;
			&:after{
				border: none
			}
			&.active{
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}
	}
	.img-captcha{
		width: 150upx;
		height: 60upx;
	}
	button[type="primary"]{
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}
	.text-reset{
		text-align: center;
		margin-bottom: 100upx;
		font-size: 36upx;
	}
</style>
