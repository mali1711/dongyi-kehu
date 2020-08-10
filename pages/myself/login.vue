<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">
			<view class="logo">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="uni-form-item uni-column">
				<input type="tel"  name="mobile" placeholder="请输入手机号" />
			</view>
			<view class="uni-form-item uni-column">
				<input type="password" name="passwd" placeholder="请输入密码" />
			</view>
			<button type="primary" form-type="submit">登陆</button>
			<view class="links">
				<view @tap="gotoForgetPassword">忘记密码？</view>
				<view>|</view>
				<view class="link-highlight" @tap="gotoRegistration">注册账号</view>
			</view>
		</form>
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		onLoad(options) {
			
		},
		methods: {
			gotoRegistration: function() {
				uni.navigateTo({
					url: 'registration'
				});
			},
			gotoForgetPassword: function() {
				uni.navigateTo({
					url: 'forgetPasswd'
				});
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.request({
					url: this.apiServer+"/api/login/login",
					data: JSON.stringify(formdata),
					method:'POST',
					success: (res) => {
						console.log(res);
						if(res.data.err>0){
							uni.showToast({
								title:res.data.msg,
							})
						}else{
							console.log('登陆成功')
							var userinfo = res.data.data;
							uni.setStorageSync('USERID',userinfo.user_id);
							uni.setStorageSync('USERNAME',userinfo.name);
							uni.setStorageSync('MOBILE',userinfo.mobile);
							uni.setStorageSync('NICKNAME',userinfo.nick_name);
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}

					}
				})
			},
			formReset:function(e){
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	$color-primary: #fd5f5e;

	.content {
		padding: 100upx;
	}

	.logo {
		text-align: center;

		image {
			height: 200upx;
			width: 200upx;
			margin: 0 0 60upx;
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
