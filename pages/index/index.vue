<template>
	<view class="content">
		<view class="nav">
			<image  class="logo"  mode="aspectFit" src="../../static/logo.png"></image>
			<view class="search">
				<input  type="text"  placeholder="请输入项目名称"/>
			</view>
			<image  class="msg"  mode="aspectFit" src="../../static/msg.png"></image>
		</view>
		<view class="banner">
			<image src="../../static/banner.png" mode="aspectFit"></image>
				<view class="sborder">
					<view class="sliver">	
					</view>
					<h5>{{text}}</h5>
				</view>
				<view class="screen active">
					单量▲
				</view>
				<view class="screen">
					状态▼
				</view>
				<view class="screen">
					距离▼
				</view>
		</view>
		<view class="staffList">
			<!-- 包含图片 -->
			<uni-list>
			    <uni-list-item v-for="(item, index) in staffList" :key="index">
					<navigator :url="'/pages/project/stToProTime?st_id='+item.st_id+'&pic_1='+item.pic_1+'&pr_id='+pr_id+'&stname='+item.name">
						<image :src="item.pic_1" mode="aspectFit"></image>
						<view class="staffDesc">
							<text>
								<helang-highlight
									:content="content" 
									:keys="keys" 
									:color="color"
									:weight="weight"
								>
								</helang-highlight>
							</text>
							<text>状态：<text class="no">不可接单</text></text>
							<text>简介：{{item.desc}}</text>
						</view>
					</navigator>
				</uni-list-item>
			</uni-list>
		</view>
	</view>

</template>

<script>
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue"
	import highlight from "@/components/helang-highlight/helang-highlight.vue"
	export default {
		components: {uniList,uniListItem,"helang-highlight":highlight},
		data() {
			return {
				title: '你好董亿',
				staffList : [],
				text:'推荐技师',
				longitude:'',
				latitude:''
			}
		},
		onLoad() {
			this.getData();
			this.checkLogin();
			uni.getLocation({
			            type: 'wgs84',
			            success: function(res) {
			                // console.log('当前位置的经度：' + res.longitude);
			                // console.log('当前位置的纬度：' + res.latitude);
			            }
			        });
		},
		onPullDownRefresh() {
			this.getData();
		},
		methods: {
		getData(){
			uni.request({
			    url: this.apiServer+'/api/staff/', //仅为示例，并非真实接口地址。
				method:'GET',
			    header: {
			        'custom-header': 'hello' //自定义请求头信息
			    },
			    success: (res) => {
					// console.log(res.data.data);
					this.staffList = res.data.data;
			    }
			});
		},
		}
	}
</script>

<style>
	.staffList{
		margin-top: 50rpx;
	}
	.staffList image{
		width: 150rpx;
		height: 150rpx;
	}
	uni-list-item{
		display: flex;
		flex-direction:row;
	}
	.staffDesc{
		display: flex;
		flex-direction:column;
		float: left;
		height: 150rpx;
		width: 480rpx;
		font-size: 25rpx;
		margin-left: 170rpx;
		margin-top: -150rpx;
		line-height: 37.5rpx;
		color: #404040;
	}
	.screen{
		float: left;
		margin-top: 10rpx;
		width: 80rpx;
		height: 30rpx;
		background: #DDDDDD;
		margin-left: 140rpx;
		font-size: 25rpx;
		line-height: 30rpx;
	}
	.active{
		line-height: 30rpx;
		color: red;
		border: 1rpx red solid;
	}
	.no{
		line-height: 30rpx;
		color: red;
		border: 1rpx red solid;
	}
	.yes{
		line-height: 30rpx;
		color: green;
		border: 1rpx green solid;
	}
	.sborder{
		display: flex;
		background-color: ;
	}
	.sliver{
		background: #e89712;
		height: 40rpx;
		width: 13rpx;
		margin-left: 8rpx;
		margin-right: 6rpx;
	}
	.banner image{
		width: 750rpx;
		height: 350rpx;
	}
	.nav{
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		margin-left: 20rpx;
		
	}
	.logo{
		height: 80rpx;
		width: 100rpx;
		float: left;
	}
	.search{
		border-radius: 30upx;
		border:1px solid #DDDDDD;
		width: 500rpx;
		height: 60rpx;
		background: #DDDDDD;
		margin-left: 0rpx;
		margin-right: 20rpx;
	}
	.search input{
		height: 60rpx;
		padding-left: 20px;
		
	}
	.msg{
		height: 60rpx;
		width: 45rpx;
		float: right;
	}
</style>