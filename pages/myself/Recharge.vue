<template>
	<view class="content">
		<button class="moe" type="primary" disabled="true">充值金额：¥{{m}}</button>
		<view class="money-border">
			<button class="rec" v-for="(itme,index) in money" :key="index" @click="cl(itme)" type="primary" plain="true" hover-stay-time="700">{{itme}}</button>
		</view>
		<button class="rech" type="warn">确认充值</button>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-badge/uni-badge.vue"
	export default {
		components: {uniNavBar},
		data() {
			return {
				money:[200,300,500,1000,1500,2000],
				m:200
			}
		},
		methods: {
			cl(e){
				this.m = e;
			}
		}
	}
</script>

<style>
	.moe{
		margin-top: 80rpx;
		width: 100%;
		height: 200rpx;
		font-size: 60rpx;
		line-height: 200rpx;
		color: #FFFFFF;
	}
	.content{
		display: flex;
		flex-direction: column;
	}
	.money-border{
		margin-top: 100rpx;
		display: flex;
		flex-direction: row;
		flex-flow: wrap;
	}
	.rec{
		width: 200rpx;
		margin-top: 50rpx;
	}
	.rech{
		margin-top: 100rpx;
		width: 60%;
	}
</style>
