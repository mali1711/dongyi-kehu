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
				uni.getLocation({
					type:'gcj02',
					altitude:true,
					success(res) {

					}
				})
			    uni.request({
			        url: server,  
			        data: req,  
			        success: (res) => {
			            if (res.statusCode == 200) {
							let data = res.data.data;
							if(data.latestVersion==req.version){
								console.log(data);
								return true;
							}else{
								let url = '';
								if(req.system=='ios'){
									url = data.iosUrl
								}else{
									url = data.androidUrl
								}
								if(data.currentVersionStatus==false){
/* 									uni.showModal({ //提醒用户更新
									    title: "更新最新版本",
									    content: data.updateInformation,
										showCancel:true, 
									    success: (e) => {
									        if (e.confirm){
									            plus.runtime.openURL(url);  //打开web下载安装
									        }
									    },
									}) */
								}else{
									uni.showModal({ //提醒用户更新
									    title: "更新最新版本",
									    content: data.updateInformation,
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
			        }  
			    })
			    //#endif  
		},
		onShow: function() {
			
		},
		onHide: function() {
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
