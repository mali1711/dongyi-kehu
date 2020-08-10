<template>
	<view class="content">
		<view class="logo">
			<image src="../../static/logo.png" mode=""></image>
		</view>
		
		<view class="uni-form-item uni-column">
			<input type="tel"  name="" placeholder="请输入手机号" v-model="mobile" />
		</view>
		<view class="uni-form-item uni-column column-with-btn">
			<input v-model="inputcode" type="number"  name="" placeholder="请输入验证码" />
			<button :class="{active : !disableCodeBtn}" :disabled="disableCodeBtn" @tap="sendCode">{{codeBtn.text}}</button>
		</view> 
		<view class="uni-form-item uni-column">
			<input v-model="passwd" type="password" name="" placeholder="请输入密码" />
		</view>
		<button @click="regis" type="primary">注册</button>
		<view class="links">已有账号？<view class="link-highlight" @tap="gotoLogin">点此登陆</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				captchaImg: '',
				mobile: '',
				passwd:'',
				seconds: 360,
				codeBtn: {
					text: '获取验证码',
					waitingCode: false,
					count: this.seconds
				},
				inputcode:'',//用户输入的验证码
				code: ''//接口返回的验证码
			}
		},
		onLoad() {

		},
		methods: {
			
			sendCode: function() {
				let t = this;
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';
				let countdown = setInterval(() => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if (this.codeBtn.count < 0) {
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.codeBtn.waitingCode = false;
					}
				}, 1000);
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
					},
					fail: (res) => {
						console.log(res);
					},
					complete: () => {}
				});
			},
			regis:function(){
				if(this.inputcode==this.code){
					if(this.passwd==''){
						uni.showToast({
							title: '密码不能为空'
						});
					}else{
						uni.request({
							url: this.apiServer+'/api/login/registration',
							method: 'POST',
							data: {
								mobile:this.mobile,
								passwd:this.passwd
							},
							success: res => {
								if(res.data.err==0){
									uni.showToast({
										title: '注册成功'
									});
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
			},
			gotoLogin: function() {
				uni.navigateTo({
					url: 'login'
				})
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

	.content {
		padding: 60upx 100upx 100upx;
	}

	.logo {
		text-align: center;

		image {
			height: 200upx;
			width: 200upx;
			margin: 0 0 40upx;
		}
	}

	.uni-form-item {
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;

		.uni-input {
			font-size: 30upx;
			padding: 7px 0;
		}
	}

	.column-with-btn {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		button {
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;

			&:after {
				border: none
			}

			&.active {
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}
	}

	.img-captcha {
		width: 150upx;
		height: 60upx;
	}

	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}

	.links {
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;

		view {
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}

		.link-highlight {
			color: $color-primary
		}
	}
</style>
