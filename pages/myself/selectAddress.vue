<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">
		<!-- 一般用法 -->
		<uni-list>
		    <uni-list-item title="服务地址">
				<input class="address" name="address" type="text" :value="address" />
			</uni-list-item>
		    <uni-list-item title="姓名">
				<input class="name" name="name" type="text" :value="name" />
			</uni-list-item>
		    <uni-list-item title="联系电话" :show-badge="true">
				<input class="mobile" name="mobile" type="text" :value="mobile" />
			</uni-list-item>
		</uni-list>
		
		<view class="logout">
			<button form-type="submit" class="submit" type="warn">保存</button>
		</view>
		</form>
	</view>
</template>
<script>
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue"
	export default {
		components: {uniList,uniListItem},
		data() {
			return {
				address:'',
				mobile:'',
				name:'',
				USERINFO:[]
			}
		},
		onLoad:function(Option){
			this.USERINFO = this.checkLogin();//判断用户是否登陆
			this.initAddress();//初始化地址信息
			
		},
		methods: {
			formSubmit:function(e){
				console.log(e.detail.value.user_id = uni.getStorageSync('USERID'));
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				console.log(formdata);
				uni.request({
					url:this.apiServer+"/api/address/save",
					method:'POST',
					data:JSON.stringify(formdata),
					success: (res) => {
						console.log(res);
						if(res.data.err==0){
							uni.showModal({
								title:'提示',
								content:'地址变更成功',
								showCancel:false
							})
						}else{
							uni.showModal({
								title:'提示',
								content:'地址变更失败',
								showCancel:false
							})
						}
					}
				})
				uni.redirectTo({
					url: '/page'
				});
			},
			initAddress:function(){
				uni.request({
					url: this.apiServer+'/api/address/index?user_id='+uni.getStorageSync('USERID'),
					method: 'GET',
					success: res => {
						var data = res.data;
						console.log(data.err);
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
						}
					},
				});
			}
		}
	}
</script>

<style>
	.content{
		display: flex;
		flex-direction: column;
		width: 750rpx;
	}
	.uni-list{
		margin-top: 40rpx;
		width: 100%;
	}
	.uni-list-item p{
		text-align: right;
		font-size: 25rpx;
		margin-bottom: -38rpx;
		margin-top: 0rpx;
		line-height: 60rpx;
	}
	input{
		text-align: right;
		font-size: 26rpx;
		width: 66%;
		padding-left: 22%;
		position: absolute;
	}
	.submit{
		width: 710rpx;
	}
</style>
