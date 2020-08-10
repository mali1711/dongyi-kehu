<script>
	export default {
		onLaunch: function() {
			    //#ifdef APP-PLUS    
			    var server = this.apiServer+"/api/login/upversion"; //检查更新地址  
			    var req = { //升级检测数据  
			        "appid": plus.runtime.appid,  
			        "version": plus.runtime.version,
					"system":uni.getSystemInfoSync().platform,
			    };  
				// console.log(req);
				
				uni.getLocation({
					type:'gcj02',
					altitude:true,
					success(res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
					}
				})
			    uni.request({
			        url: server,  
			        data: req,  
			        success: (res) => {
			            if (res.statusCode == 200 && res.data.status === 1) {  
			                uni.showModal({ //提醒用户更新  
			                    title: "更新提示",
			                    content: res.data.note,
								showCancel:false, 
			                    success: (e) => {  
			                        if (e.confirm) {  
			                            plus.runtime.openURL(res.data.url);  //打开web下载安装
			                        }  
			                    }  
			                })
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
