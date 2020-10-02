<script>
	export default {
		onLaunch: function() {
			    //#ifdef APP-PLUS    
			    //var server = this.apiServer+"/api/login/upversion"; //检查更新地址  
			    var server = this.apiServer+"/api/version/androidAndIos"; //检查更新地址  
			    var req = { //升级检测数据  
			        "appid": plus.runtime.appid,  
			        "version": plus.runtime.version,
					"system":uni.getSystemInfoSync().platform,
			    };  
				 //console.log(req);
				
				uni.getLocation({
					type:'gcj02',
					altitude:true,
					success(res) {
				        //console.log('当前位置的经度：' + res.longitude);
				        //console.log('当前位置的纬度：' + res.latitude);
					}
				})
			    uni.request({
			        url: server,  
			        data: req,  
			        success: (res) => {
			            if (res.statusCode == 200) {
							let data = res.data.data;
							console.log(req);
							let url = '';
							if(req.system=='ios'){
								url = data.iosUrl
							}else{
								url = data.androidUrl
							}
							if(data.currentVersionStatus==true){
								uni.showModal({ //提醒用户更新
								    title: "更新最新版本",
								    content: res.data.note,
									showCancel:true, 
								    success: (e) => {
										console.log(url);
								        if (e.confirm){
								            plus.runtime.openURL(url);  //打开web下载安装
								        }
								    },
								})
							}else{
								uni.showModal({ //提醒用户更新
								    title: "更新最新版本",
								    content: res.data.note,
									showCancel:false, 
								    success: (e) => {
								        if (e.confirm) { 
								            plus.runtime.openURL(url);  //打开web下载安装
								        }
								    },
									
								})
							}

			            }  
			        }  
			    })
			    //#endif  
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
<style lang="scss"> 
 	@import 'graceUI/graceUI.css'; 
	@import 'colorui/main.css'; 
	@import 'colorui/icon.css';
</style>
