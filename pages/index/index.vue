<template>
	<view class="index-content">
		<view class="index-header">
			<!-- filters：过滤选项设置， sortChanged：排序更改的事件监听方法，showShape：是否显示右侧模板选择按钮，shapeValue：初始化的模板值，2：双列，1：单列，具体可自行控制，shapeChanged:右侧的模板选择按钮事件监听方法-->	
			<goodsFilter :filters="goodsFilters" @sortChanged="goodsFilterChanged" @shapeChanged="goodsTemplateChanged" :showShape="true" :shapeValue="2"></goodsFilter>
		</view>
		<!-- 加载更多 -->
		<view class="banner">
			<image src="../../static/banner.png" mode="aspectFit"></image>
		</view>
		<view class="staffList_null"  v-if="checkStaff(staffList)">请下拉刷新当前界面</view>
		<view class="staffList">
				<!-- 包含图片 -->
				<uni-list>
				    <uni-list-item v-for="(item, index) in staffList" :key="index">
							<image :src="item.pic_1" mode="aspectFit"></image>
							<view class="staffDesc" @click="selectTime(item.st_id,item.pic_1,pr_id,item.name,item.status,item.distance)">
								<text>
									<helang-highlight
										:content="content" 
										:keys="keys" 
										:color="color"
										:weight="weight"
									>
									</helang-highlight>
								</text>
								<text>状态：
									<text v-if="item.status==0" class="no">已请假</text>
									<text v-if="item.status==1" class="yes">可接单</text>
									<text  class="distance">{{item.distance}} km</text>
								</text>
								<text>简介：{{item.desc}}</text>
							</view>
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
			pr_id:'',
			// 过滤参数
			curCateFid:'',
			weight:'',
			keys:'',
			color:'',
			content:'',
			title: '你好董亿',
			staffList : null,
			block:'推荐技师',
			longitude:'',
			latitude:'',
			filter:{
				sort:'最新',
				order:1
			},
			cateList:[{name:'卤菜',value:'100001'},{name:'凉菜',value:'100002'},{name:'酒水',value:'100003'}]
		};
	},
	methods: {
		//判断stafflist是否有值,用于显示刷新提示
		checkStaff(val){
			if(val==null){
				return true;
			}else{
				return false;
			}
		},
		// 排序，筛选更改
		goodsFilterChanged(filter){
			let lng = uni.getStorageSync('LONGITUDE');
			let lat = uni.getStorageSync('LATITUDE'); 
			uni.request({
				url: this.apiServer+'/api/staff/',
				method: 'GET',
				data: {
					filter:filter.sort,//排序字段
					order:filter.order,//升序或者降序 1，0
					lng:lng,
					lat:lat
				},
				success: res => {
			
					this.staffList = res.data.data;
				},
				fail: () => {},
				complete: () => {}
			});
		}
		
		// 点击了右侧的模板选择按钮：即单列还是双列展示商品
		,goodsTemplateChanged(templateValue){
			
			this.goodsListTemplate = templateValue;
		}
		,selectTime(st_id,pic_1,pr_id,name,status,distance){
			if(status==0){
				uni.showToast({
					title:'技师休息中'
				})
			}else{
				uni.navigateTo({
					//url:'/pages/project/stToProTime?st_id='+st_id+'&pic_1='+pic_1+'&pr_id='+pr_id+'&stname='+name
					url:'/pages/index/staffDetail?st_id='+st_id+'&pic_1='+pic_1+'&pr_id='+pr_id+'&stname='+name
		
					})
			}
		}
		,appquit(){
			plus.runtime.quit();
		},
		dingweiQuanxian(){
			var cllocationManger = plus.ios.importClass("CLLocationManager");    
			            var enable = cllocationManger.locationServicesEnabled();    
			            var status = cllocationManger.authorizationStatus();     
			            if (enable && status != 2) {    
			                console.log("手机系统的定位已经打开");    
			            } else {   
			                console.log("手机系统的定位没有打开");  
			                                 //  定位没有开启时  提示用户是否开启  
			                  plus.nativeUI.confirm("定位权限没有开启，是否去开启？", function(e) {    
			                        if (e.index == 0) {    
			                            var UIApplication = plus.ios.importClass("UIApplication");    
			                            var application2 = UIApplication.sharedApplication();    
			                            var NSURL2 = plus.ios.importClass("NSURL");                          
			                              var setting2 = NSURL2.URLWithString("app-settings:"); // 打开应用权限  
			                            application2.openURL(setting2);    
			                            plus.ios.deleteObject(setting2);    
			                            plus.ios.deleteObject(NSURL2);    
			                            plus.ios.deleteObject(application2);    
			                        }    
			                    }, {    
			                        "buttons": ["去设置"],    
			                        "verticalAlign": "center"    
			                    });    
			            }    
			                         plus.ios.deleteObject(cllocationManger);   
		}
		
	}
	,onReady: function() {	
		//this.loadCouponListList();
	},
	onLoad: function(options) {
	this.dingweiQuanxian();
	uni.getLocation({
		type:'gcj02',
		altitude:true,
		success(res) {
			uni.setStorageSync('LATITUDE',res.latitude);
			uni.setStorageSync('LONGITUDE',res.longitude);
		}
	})

        //uni.startPullDownRefresh();
		var tt = this;
		var intervalID =  setInterval(function(){
			uni.startPullDownRefresh({
				success(res) {
					if(tt.staffList==null){
						console.log(intervalID);
					}else{
						clearInterval(intervalID)
					}
				}
			});
		}, 1000)
		

			function demo(){
				if(tt.staffList==null){

				}

			};
	
	},
	onPullDownRefresh() {
		let lng = uni.getStorageSync('LONGITUDE');
		let lat = uni.getStorageSync('LATITUDE'); 
		uni.request({
			url: this.apiServer+'/api/staff/',
			method: 'GET',
			data: {
				filter:'create_time',//排序字段
				order:1,//升序或者降序 1，0
				lng:lng,
				lat:lat
			},
			success: res => {
				// console.log("信息获取成功");
				this.staffList = res.data.data;
			},
			fail: () => {},
			complete: () => {}
		});
		setTimeout(function(){
			// console.log("停止刷新动作");
			uni.stopPullDownRefresh();
		},2000)
	},
	onShow() {

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
			const cateOptions = [{name:'最新',value:'0'},...this.cateList];
			// filterType为0，普通方式，无排序，1：排序模式，2：下拉筛选模式，当前支持一级，多级可自行扩展
			return [
			{title:'最新',value:'create_time',filterType:1,
				options:cateOptions},
			// {title:'推荐',value:0,filterType:0,disableAscDesc:true},
			{title:'状态',value:'status',filterType:1},
			// {title:'人气', value:3, filterType:1},
			{title:'距离',value:'distance',filterType:1},
			{title:'单量',value:'order_number',filterType:1, initAscState:true}]
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
	.staffList_null{
		text-align: center;
		font-size: 50rpx;
		color: #5E5E5E;
		margin-top: 200rpx;
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
	.distance{
		line-height: 30rpx;
		color: red;
		float: right;
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