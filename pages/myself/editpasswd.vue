<style lang="scss" scoped>
</style>
<template>
    <view>
        <view class="input-box">
			<view class="input-item">
				<view class="input-label">原密码</view>
				<view class="input-body">
					<input v-model="ordpasswd" name='passwd' type="password" style="margin-right: 50upx;" placeholder="请输入新密码" maxlength="20"  class="input" />
				</view>
			</view>
            <view class="input-item">
				<view class="input-label">新密码</view>
				<view class="input-body">
					<input v-model="passwd" name='passwd' type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;" placeholder="请输入新密码" maxlength="20"  class="input" />
					<image @click="isHidePasswordClick" class="eye" :src="isHidePassword?'/static/img/attention.png':'/static/img/attention_forbid.png'"></image>
				</view>
            </view>
        </view>
        <button class="button" @click="submit">确认新密码</button>
    </view>
</template>
<script>
	export default {
		data() {
			return {
				isHidePassword:true,
				ordpasswd:"",
				password:""
			};
		},
		onLoad() {
		},
		methods: {
			isHidePasswordClick(){
				this.isHidePassword=!this.isHidePassword
			},
			submit() {
				uni.request({
					url: this.apiServer+'/api/login/pass',
					method: 'post',
					data: {
						ordpasswd:this.ordpasswd,
						user_id:uni.getStorageSync('USERID'),
						passwd:this.passwd
					},
					success: res => {
						if(res.data.err==0){
							uni.showToast({
							    title: '修改成功',
							    duration: 2000
							});
						}else{
							uni.showToast({
							    title: res.data.msg,
							    duration: 2000
							});
						}
					}

				});
			}
		}
	}
</script>
<style lang="scss">
	/*每个页面公共css */
	button::after{
		border: none;
	}
	.input-box {
		padding: 50upx;
		font-size: 30upx;
		.input-item {
			display: flex;
			background: white;
			border-bottom: 1upx solid #eeeeee;
			line-height: 100upx;
			height: 100upx;
			.input-label {
				width: 150upx;
			}
			.input-body{
				position: relative;
				height: 100upx;
				width: calc(100% - 150upx);
				.input {
					line-height: 100upx;
					height: 100upx;
					position: relative;
					font-size: 28upx;
				}
				.eye{
					position: absolute;
					height: 50upx;
					width: 50upx;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.btn-code{
				    position: absolute;
				    right: 0upx;
				    top:50%;
				    transform: translateY(-50%);
					background: none;
					color: #205592;
					width: 160upx;
					font-size: 24upx;
					box-sizing: border-box;
					text-align: right;
					padding: 0;
					height: 100upx;
					line-height: 100upx;
				}
			}
			
		}
		.select {
			padding-top: 40upx;
			display: flex;
			justify-content: space-between;
			color: #003B67;
		}
	}
	.button{
		margin:0 30upx;
		background: red;
		border-radius:50upx;
		line-height: 80upx;
		height: 80upx;
		color: white;
		font-size: 32upx;
	}
</style>
