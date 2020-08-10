<template>
	<view class="index-content">
		<view class="nav">
			<image  class="logo"  mode="aspectFit" src="../../static/logo.png"></image>
			<view class="search">
				<input  type="text"  placeholder="请输入项目名称"/>
			</view>
			<image  class="msg"  mode="aspectFit" src="../../static/msg.png"></image>
		</view>
		<view class="banner">
			<image src="../../static/banner.png" mode="aspectFit"></image>
		</view>
		
		<!-- 搜索板块 -->
		<view class="index-header">
			<!-- filters：过滤选项设置， sortChanged：排序更改的事件监听方法，showShape：是否显示右侧模板选择按钮，shapeValue：初始化的模板值，2：双列，1：单列，具体可自行控制，shapeChanged:右侧的模板选择按钮事件监听方法-->	
			<goodsFilter :filters="goodsFilters" @sortChanged="goodsFilterChanged" @shapeChanged="goodsTemplateChanged" :showShape="true" :shapeValue="2"></goodsFilter>
		</view>
		<!-- 加载更多 -->
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
import goodsFilter from '@/components/yb-filter/index.vue';
import utils from '@/common/utils.js';
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue"
	import highlight from "@/components/helang-highlight/helang-highlight.vue"

export default {
	data() {
		return {
			// 默认双列显示
			goodsListTemplate: 2,
			// 过滤参数
			curCateFid:'',
			title: '你好董亿',
			staffList : [],
			text:'推荐技师',
			longitude:'',
			latitude:'',
			cateList:[{name:'卤菜',value:'100001'},{name:'凉菜',value:'100002'},{name:'酒水',value:'100003'}]
		};
	},
	methods: {
		// 排序，筛选更改
		goodsFilterChanged(filter){
			console.log("filter:",filter)
			// 此处可根据fitler数据，从服务器端加载数据
			// pageIndex = 0;
			// this.isEnd = false;
			// this.loadingType = 0;
			// this.curCateFid=filter.option || ""
			// // 加载数据
			// const resetData=true;
			// this.loadMoreGoods(filter,resetData);
		}
		// 点击了右侧的模板选择按钮：即单列还是双列展示商品
		,goodsTemplateChanged(templateValue){
			
			this.goodsListTemplate = templateValue;
		},
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
		}
		onPullDownRefresh:function(){
			
		}
		
	},
	onReady: function() {
		//this.loadCouponListList();
	},
	onLoad: function(options) {
		console.log('options',options)
		this.getData();
	},
	computed: {
		goodsListTemplateType: function() {
			return this.goodsListTemplate;
		},
		// 商品过滤器参数 <!-- //1：按距离，2：按销量，3：按人气，4：按最新，5：按价格 -->
		goodsFilters:function() {
			// 参考的下拉选项如下，可从服务器端加载：
			//options:[{name:'不限',value:""},{name:'酒水',value:"js",children:[{name:'啤酒',value:"pj"}]}]},
			// const cateOptions=this.cateList.map(function (item){
			// 	return {name:item.Name,value:item.Fid}
			// });
			const cateOptions = [{name:'推荐',value:'0'},...this.cateList];
			// filterType为0，普通方式，无排序，1：排序模式，2：下拉筛选模式，当前支持一级，多级可自行扩展
			return [
			{title:'类别',value:0,filterType:2,
				options:cateOptions},
			// {title:'推荐',value:0,filterType:0,disableAscDesc:true},
			{title:'状态',value:2,filterType:0},
			// {title:'人气', value:3, filterType:1},
			{title:'距离',value:4,filterType:1},
			{title:'单量',value:5,filterType:1, initAscState:true}]
		}
	},
	components: {
		goodsFilter
	}
};
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