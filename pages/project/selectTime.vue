<template>
	<view>
		<time-selector 
		@selectTime="selectTimeEvent" 
		startTime="08:00" endTime="22:00" 
		selectedTabColor="red" 
		selectedItemColor="#FFEC8B">
		</time-selector>
	</view>
</template>

<script>
	import timeSelector from '../../components/xiujun-time-selector/index.vue'
	export default {
		components: {timeSelector},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
