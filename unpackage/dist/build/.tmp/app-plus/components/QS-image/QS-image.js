(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/QS-image/QS-image"],{"414c":function(t,i,e){"use strict";var a,s=function(){var t=this,i=t.$createElement;t._self._c},c=[];e.d(i,"b",function(){return s}),e.d(i,"c",function(){return c}),e.d(i,"a",function(){return a})},5084:function(t,i,e){"use strict";e.r(i);var a=e("414c"),s=e("fc12");for(var c in s)"default"!==c&&function(t){e.d(i,t,function(){return s[t]})}(c);e("a76a");var n,u=e("f0c5"),o=Object(u["a"])(s["default"],a["b"],a["c"],!1,null,"c3feac54",null,!1,a["a"],n);i["default"]=o.exports},"577d":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a="图片加载中",s="图片路径为空",c="加载失败\r\n点击重试",n="errPlaceholder",u=2,o=1,r={props:{imageUrl:{type:String,default:""},imageMode:{type:String,default:"scaleToFill"},lazyLoad:{type:Boolean,default:!1},imageStyle:{type:String,default:""},passClick:{type:Boolean,default:!0},width:{type:String,default:""},height:{type:String,default:""},radius:{type:String,default:""},animationType:{type:String,default:"fadIn"}},watch:{imageUrl:function(t,i){t&&this.init()}},data:function(){return{imagePath:"",imgLoadSuccess:!1,imgStatusText:"",imgStatus:0}},created:function(){this.init()},methods:{init:function(){this.imgLoadSuccess=!1,this.imageUrl?(this.imgStatusText=a,this.imagePath=this.imageUrl):this.imgStatusText=s},imgErr:function(){this.changeStatus("error")},imgLoad:function(){this.changeStatus("success")},changeStatus:function(t){switch(t){case"loading":this.checkimgLoadSuccessFalse(),this.imgStatusText=a,this.imgStatus=o;break;case"error":this.checkimgLoadSuccessFalse(),this.imagePath!==n&&(this.imgStatusText=c,this.imgStatus=u);break;case"success":this.imgLoadSuccess=!0;break}},checkimgLoadSuccessFalse:function(){this.imgLoadSuccess&&(this.imgLoadSuccess=!1)},tryReLoad:function(){var t=this;this.imgLoadSuccess||this.imgStatus===u&&this.imagePath!==n&&(this.imagePath=n,setTimeout(function(){t.changeStatus("loading"),t.imagePath=t.imageUrl},100))},onTap:function(){this.passClick?(this.$emit("click"),this.imgLoadSuccess||this.tryReLoad()):this.imgLoadSuccess?this.$emit("click"):this.tryReLoad()}}};i.default=r},a76a:function(t,i,e){"use strict";var a=e("bfd3"),s=e.n(a);s.a},bfd3:function(t,i,e){},fc12:function(t,i,e){"use strict";e.r(i);var a=e("577d"),s=e.n(a);for(var c in a)"default"!==c&&function(t){e.d(i,t,function(){return a[t]})}(c);i["default"]=s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/QS-image/QS-image-create-component',
    {
        'components/QS-image/QS-image-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("5084"))
        })
    },
    [['components/QS-image/QS-image-create-component']]
]);
