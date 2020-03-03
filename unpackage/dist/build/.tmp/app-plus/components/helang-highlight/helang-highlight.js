(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/helang-highlight/helang-highlight"],{"2afb":function(t,e,n){"use strict";var r,a=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return u}),n.d(e,"a",function(){return r})},7915:function(t,e,n){"use strict";n.r(e);var r=n("2afb"),a=n("7ede");for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);var o,i=n("f0c5"),l=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=l.exports},"7ede":function(t,e,n){"use strict";n.r(e);var r=n("a6de"),a=n.n(r);for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);e["default"]=a.a},a6de:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"highlight",props:{content:{type:String,default:""},keys:{type:String,default:""},color:{type:String,default:"#FD463E"},weight:{type:Boolean,default:!1}},computed:{html:function(){if(""===this.keys)return this.content;var t=new RegExp("(".concat(this.keys,")"),"gm"),e=this.color||"#FD463E",n=this.weight?"bold":"normal",r='<span style="color:'+e+";font-weight: "+n+';">$1</span>';return this.content.replace(t,r)}},data:function(){return{}}};e.default=r}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/helang-highlight/helang-highlight-create-component',
    {
        'components/helang-highlight/helang-highlight-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("7915"))
        })
    },
    [['components/helang-highlight/helang-highlight-create-component']]
]);
