
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/myself/index","pages/project/index","pages/myself/login","pages/myself/forgetPasswd","pages/myself/registration","pages/myself/myInfo","pages/myself/address","pages/project/projectDetails","pages/project/selectTime","pages/myself/orders","pages/project/staffList","pages/project/manageTime","pages/project/stTopro","pages/project/stToProTime","pages/myself/editpasswd","pages/myself/orderDetail","pages/myself/Recharge","pages/index/stToProTimeByStaff","pages/project/staffDetail","pages/project/methodPay","pages/index/projectDetails","pages/index/projectList","pages/index/projectDetails","pages/index/staffDetail","pages/index/manageTime"],"window":{"navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black","navigationBarTitleText":"董亿"},"tabBar":{"color":"#555555","selectedColor":"#eba536","list":[{"pagePath":"pages/index/index","iconPath":"static/index.png","selectedIconPath":"static/indexActive.png","text":"首页"},{"pagePath":"pages/project/index","text":"项目","iconPath":"static/project.png","selectedIconPath":"static/projectActive.png"},{"pagePath":"pages/myself/index","text":"我的","iconPath":"static/my.png","selectedIconPath":"static/myActive.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"董亿","compilerVersion":"2.8.13","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"董亿在线上门服务","enablePullDownRefresh":true,"softinputNavBar":"none"}},{"path":"/pages/myself/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","navigationBarBackgroundColor":"#fd5f5e","titleNView":{"titleColor":"#FFFFFF","buttons":[{"type":"back","float":"left"}]}}},{"path":"/pages/project/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"项目列表"}},{"path":"/pages/myself/login","meta":{},"window":{"navigationBarTitleText":"登陆"}},{"path":"/pages/myself/forgetPasswd","meta":{},"window":{}},{"path":"/pages/myself/registration","meta":{},"window":{}},{"path":"/pages/myself/myInfo","meta":{},"window":{"navigationBarTitleText":"个人中心","navigationBarBackgroundColor":"#fd5f5e","titleNView":{"titleColor":"#FFFFFF"}}},{"path":"/pages/myself/address","meta":{},"window":{}},{"path":"/pages/project/projectDetails","meta":{},"window":{}},{"path":"/pages/project/selectTime","meta":{},"window":{}},{"path":"/pages/myself/orders","meta":{},"window":{}},{"path":"/pages/project/staffList","meta":{},"window":{"navigationBarTitleText":"技师列表"}},{"path":"/pages/project/manageTime","meta":{},"window":{}},{"path":"/pages/project/stTopro","meta":{},"window":{"navigationBarTitleText":"项目列表"}},{"path":"/pages/project/stToProTime","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/myself/editpasswd","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/myself/orderDetail","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/myself/Recharge","meta":{},"window":{"navigationBarTitleText":"余额充值"}},{"path":"/pages/index/stToProTimeByStaff","meta":{},"window":{"navigationBarTitleText":"选择项目"}},{"path":"/pages/project/staffDetail","meta":{},"window":{"navigationBarTitleText":"技师详情"}},{"path":"/pages/project/methodPay","meta":{},"window":{"navigationBarTitleText":"选择支付方式"}},{"path":"/pages/index/projectDetails","meta":{},"window":{}},{"path":"/pages/index/projectList","meta":{},"window":{}},{"path":"/pages/index/staffDetail","meta":{},"window":{"navigationBarTitleText":"技师详情"}},{"path":"/pages/index/manageTime","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
