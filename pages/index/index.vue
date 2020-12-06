<template>
    <view>
        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
                        <swiper-item  v-for="(item,index) in swiperList" :key="index">
								<image class="swiper-item" :src="item.url"  mode="aspectFill"></image>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
			<view class="flex  p-xs margin-bottom-sm mb-sm">
				<view
				 @click="order(index)" 
				 :class="{'active':active==index}" v-for="(item,index) in screening" 
				 :key="index" 
				 class="flex-sub  padding-sm margin-xs ">
					{{item.name}}
				</view>
			</view>
	<view class="cu-list menu-avatar">
				<view v-for="(item,index) in staffList" :key="index" class="cu-item">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url(' + item.pic_1 + ')' }]"></view>
					<view class="content" @click="selectTime(item.st_id,item.pic_1,item.name,item.status,item.distance)">
						<view class="text-grey">{{item.name}}({{item.nickname}})</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.desc}}
							</view> </view>
					</view>
					<view class="action">
						<view class="text-red text-xs">{{item.distance}}km</view>
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
			swiperList: [{
				id: 0,
				type: 'image',
				url: ''
			}],
            background: ['color1', 'color2', 'color3'],
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
			screening:[{
				id:0,
				name:'最新'
			},
			{
				id:1,
				name:'状态'
			},
			{
				id:2,
				name:'距离'
			},
			{
				id:3,
				name:'接单'
			},],
			active:0,
			shopData:{},
			staffList : {},
        }
    },
	onLoad() {
		this.shopInfo();
		this.getStaff();
	},
	onPullDownRefresh() {
		this.getStaff();
		uni.stopPullDownRefresh();
	},
    methods: {
		loadData(){
			console.log(1111);
		},
		order:function(index){
			this.active = index;
			this.shopInfo();
			if(index==0){
				this.getStaff('create_time',1);
			}else if(index==1){
				this.getStaff('status',1);
			}else if(index==2){
				this.getStaff('distance',1);
			}else if(index == 3){
				this.getStaff('order_number',1)
			}
		},
		shopInfo:function(){
			var tt = this;
			uni.request({
				url:'https://dongyi.sir6.cn/api/shop/1',
				success(res) {
					tt.shopData = res.data.data;
					tt.swiperList[0]['url'] = tt.shopData.banner_images;
				}
			})
		},
		getStaff:function(filter,order){
			uni.getLocation({
				type:'gcj02',
				altitude:true,
				success(res) {
					uni.setStorageSync('LATITUDE',res.latitude);
					uni.setStorageSync('LONGITUDE',res.longitude);
				}
			}); 
			let lng = uni.getStorageSync('LONGITUDE');
			let lat = uni.getStorageSync('LATITUDE'); 
			uni.request({
				url: this.apiServer+'/api/staff/',
				method: 'GET',
				data: {
					filter:filter,//排序字段
					order:order,//升序或者降序 1，0
					lng:lng,
					lat:lat
				},
				success: res => {
				
					this.staffList = res.data.data;
					
				},
				fail: () => {
					console.log("信息获取失败");
				},
				complete: () => {}
			});
		}
		,selectTime(st_id,pic_1,name,status,distance){
			if(status==0){
				uni.showToast({
					title:'技师休息中'
				})
			}else{
				uni.navigateTo({
					url:'/pages/index/staffDetail?st_id='+st_id+'&pic_1='+pic_1+'&stname='+name
					})
			}
		}
    }
}
</script>

<style>

	.swiper{
		height: 400rpx;
	}
	.swiper-item{
		width: 100%;
		height: 400rpx;
	}
	.flex-sub{
		text-align: center;
	}
	.active{
		color: red;
	}

</style>
