import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;
//获取地理位置
uni.getLocation({
	type:'gcj02',
	altitude:true,
	success(res) {
		uni.setStorageSync('LATITUDE',res.latitude);
		uni.setStorageSync('LONGITUDE',res.longitude);
	}
})
Vue.prototype.checkLogin = function(backpage='',backtype=''){
	var USERID = uni.getStorageSync('USERID');
	var USERNAME = uni.getStorageSync('USERNAME');
	var MOBILE = uni.getStorageSync('MOBILE');
	var NICKNAME = uni.getStorageSync('NICKNAME');
	if(USERID==''){
		uni.redirectTo({
			url: '/pages/myself/login?backpage='+backpage+"&backtype="+backtype
		});
		return false;
	}
	return[USERID,,USERNAME,MOBILE,NICKNAME];
}
Vue.prototype.apiServer = "https://dongyi.sir6.cn";
App.mpType = 'app';
const app = new Vue({
    ...App
})
app.$mount()
