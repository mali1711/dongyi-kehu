<template>
	<view class="content">
		<swiper indicator-dots="true" autoplay="true">
			<swiper-item>
				<image src="../../static/projectSwiper.png" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<view class="projectList">
				<view class="projecttitle" v-for="(item,index) in projectList" :key='index'>
					<navigator
					:url="'/pages/project/projectDetails?pr_id='+item.pr_id+'&pic_1='+pic_1+'&subscribetime='+subscribetime+'&stname='+stname+'&st_id='+st_id">
					<vrow class="row" >
						<vcol span="30"><view class="col">
							<image :src="item.photo" class="projectImg" mode="aspectFill"></image>
						</view>
						</vcol>
						<vcol class="desc" span="70">
							<h5>{{item.title}}</h5>
							<text><b>简介:</b>{{item.desc}}</text>
							<text class="price"><b>价格：</b><span>{{item.price}}/次</span></text>
						</vcol>
					</vrow>
							</navigator>
				</view>
	

		</view>
	</view>
	</view>
</template>

<script>
	import vrow from '../../components/lml-layout/row.vue'
	import vcol from '../../components/lml-layout/col.vue'
	export default {
		components: {
		    vrow,vcol
		},
		data() {
			return {
				title: '你好董亿',
				projectList:[],
				st_id:'',
				pic_1:'',
				subscribetime:'',
				stname:''
				
				
			}
		},
		onLoad(options) {
			this.st_id = options.st_id;
			this.pic_1 = options.pic_1;
			this.subscribetime = options.subscribetime;
			this.stname = options.stname;
			this.getData();
			//console.log(this.projectList)
			console.log(this.projectList);
			console.log(this.title)
		},
		methods: {
			getData(){
				var tt = this
				uni.request({
					url:this.apiServer+'/api/project/',
					method:'GET',
					success(res) {
						tt.projectList = res.data.data
						console.log(res);
					}
				})
			},
			
		}
	}
</script>
<style>
	.projecttitle{
		margin-top: 10rpx;
		background-color: #f9f9f9;
	}
	.desc{
		display: flex;
		flex-direction: column;
	}
	.desc text{
		font-size: 25rpx;
		color: #404040;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		overflow: hidden;
	}
	.price{
		text-align: right;
	}
	.price span{
		font-size: 30rpx;
		color: red;
	}
	.projectImg{
		width: 200rpx;
		height: 200rpx;
	}
	.projecttitle{
		display: flex;
		
	}
	page{
		background-color: #F1F1F1;
	}
	swiper-item{
		height: 500rpx;
		width: 100%;
	}
	swiper-item image{
		width: 730rpx;
		height: 300rpx;
	}
</style>
