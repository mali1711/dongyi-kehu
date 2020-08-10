<template>
	<view class="content">
		<form @submit="formSubmit">
		<!-- 一般用法 -->
		<input class="address" hidden="true"  name="longitude" type="text" :value="longitude" />
		<input class="address" hidden="true" name="latitude" type="text" :value="latitude" />
		<uni-list>

		    <uni-list-item title="预约人:">
				<input class="name" name="name" type="text" placeholder="服务人" :value="name" />
			</uni-list-item>
			<uni-list-item title="所在地区:">
				<input class="address" name="address" type="text" placeholder="服务器地区" :value="myAddress" />
			</uni-list-item>
			<uni-list-item title="详情地址:">
				<input class="detailed" name="detailed"  type="text" placeholder="请精确到门牌号" :value="detailed" />
			</uni-list-item>
		    <uni-list-item title="联系电话:" :show-badge="true">
				<input class="mobile" name="mobile" type="text" placeholder="手机号" :value="mobile" />
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
				myAddress:'',	//地址
				detailed:'',	//地址详情
				mobile:'',		//手机号
				name:'',		//姓名
				USERINFO:[],
				latitude:'',
				longitude:''
				
			}
		},
		onLoad:function(Option){
			this.USERINFO = this.checkLogin();//判断用户是否登陆
			this.initAddress();//初始化地址信息
			this.doLocation();

		},
		onBackPress:function(Options){
			
		},
		methods: {
			formSubmit:function(e){
				e.detail.value.user_id = uni.getStorageSync('USERID')
				 console.log(e.detail.value.user_id);
				var formdata = e.detail.value;
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
				uni.navigateBack({
				    delta: 1,
				});
			},

			initAddress:function(){
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
							console.log(data.data)
							this.myAddress = data.data.address;
							this.name = data.data.name;
							this.mobile = data.data.mobile;
							this.detailed = data.data.detailed;
						}
					},
				});
			},
			
			doLocation:function(){
				var tt = this
				uni.getLocation({
				    success: function (res) {
						tt.address = res.address + res.name;
						tt.latitude = res.latitude;
						tt.longitude = res.longitude;
				    }
				});
			}
		}
	}
</script>

<style>
	input::placeholder {
	    /* placeholder颜色  */
	    color: #bb4532;
	    /* placeholder字体大小  */
	    font-size: 12rpx;
	    /* placeholder位置  */
	    text-align: right;
	}
	.uni-list-item input{
		text-align: left;
		width: 400rpx;
		margin-left: 50rpx;
		font-weight: bold;
	}
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
