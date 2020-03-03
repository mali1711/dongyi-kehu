<template>
	<view>
		<view class="content">
			<view class="nav">
				<text @click="gettime(item,index)" class="dateblock" :class="[activedate==index ? 'dateblockActive':'']"  v-for="(item, index) in dates" :key="index">
					{{item}}
				</text>
			</view>	
			<view class="timelist">
				<view @click="subscribe(item,index)" class="timeblock"  :class="[timeblockactive==index ? 'timeblock-active' : '']" v-for="(item, index) in times" :key="index">
					<view class="timeblock-time">{{item}}:00</view>
					<view class="timeblock-time">预约</view>
				</view>
			</view>
			<navigator class="subnav" :url="'/pages/project/stTopro?st_id='+staffid+'&pic_1='+pic_1+'&pr_id='+pr_id+'&subscribetime='+subscribetime+'&stname='+stname">
				<button  size="mini" type="warn">
					确认预约
				</button>
			</navigator>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activedate:0,
				timeblockactive:0,
				dates:[],
				times:[],
				nowdate:'',//当前选择的日期
				nowtime:'',//当前选择的时间
				subscribetime:'', // 预约时间
				staffid:0,//预定的技师ID
				pic_1:'',//预定技师的头像
				pr_id:0,
				stname:''
				
			}
		},
		onLoad(options) {
			var date = new Date();
			var day = ("0" + (date.getDate())).slice(-2);
			this.nowdate = ("0" + (date.getMonth() + 1)).slice(-2)+'-'+day;
			this.nowtime = date.getHours('chinese', { hour12: false })+1;
			this.subscribetime = this.nowdate+' '+this.nowtime+':00';
			console.log(this.subscribetime);
			this.staffid=options.st_id;//获取技师id
			this.pic_1=options.pic_1;//获取技师id
			this.pr_id = options.pr_id;
			this.stname = options.stname;
			uni.request({
				url:"https://dongyi.sir6.cn/api/manageTime/Initial",
				method:"GET",
				success: (res) => {
					console.log(res);
					this.dates = res.data.date;
					this.times = res.data.time;
	
				}
			})
		},
		methods: {
			gettime:function(date,index){
				this.nowdate = date;
				this.activedate = index;
				console.log(index);
				uni.request({
					url:"https://dongyi.sir6.cn/api/manageTime/clickTime?date="+date,
					method:"GET",
					success: (res) => {
						this.times = res.data;
					}
				})
			},
			subscribe:function(time,index){
				this.timeblockactive = index;
				this.nowtime = time;
				this.subscribetime = this.nowdate+' '+this.nowtime+':00';
				console.log(this.subscribetime);
			}
		}
	}
</script>
	
<style>

	.content{
		display: flex;
		flex-direction: column;
	}
	.nav{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		height: 100rpx;
		width: 100%;
		background-color: #33DCE8;
		
	}
	.dateblock{
		font-size: 25rpx;
		line-height: 100rpx;
		margin-left: 25rpx;
		margin-right: 28rpx;
		color: #F1F1F1;
	}
	.dateblockActive{
		font-size: 26rpx;
		font-weight: bold;
		color: red;
	}
	.timelist{
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 98%;
		margin-left:1%;
		border: #DDDDDD 1rpx solid;
	}
	.timeblock{
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		margin-left: 25rpx;
		margin-right: 20rpx;
		width: 138rpx;
		height: 80rpx;
		font-size: 30rpx;
		line-height: 40rpx;
		text-align: center;
		background: #EEEEEE;
	}
	.timeblock-active{
		color: #F1F1F1;
		background-color: #FF4040;
	}
	.subnav{
		margin-top: 80rpx;
		text-align: center;
	}
</style>
