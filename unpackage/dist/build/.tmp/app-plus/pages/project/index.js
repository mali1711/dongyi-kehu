(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/project/index"],{"1bab":function(t,e,n){"use strict";var o,c=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}))},"33fa":function(t,e,n){},5833:function(t,e,n){"use strict";n.r(e);var o=n("1bab"),c=n("774e");for(var u in c)"default"!==u&&function(t){n.d(e,t,(function(){return c[t]}))}(u);n("d0fc");var a,r=n("f0c5"),i=Object(r["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=i.exports},"774e":function(t,e,n){"use strict";n.r(e);var o=n("bb67"),c=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=c.a},bb67:function(t,e,n){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c=function(){n.e("components/lml-layout/row").then(function(){return resolve(n("df24"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/lml-layout/col").then(function(){return resolve(n("f1f9"))}.bind(null,n)).catch(n.oe)},a={components:{vrow:c,vcol:u},data:function(){return{title:"你好董亿",projectList:[]}},onLoad:function(){this.getData(),t("log",this.projectList," at pages/project/index.vue:47"),t("log",this.title," at pages/project/index.vue:48")},methods:{getData:function(){var e=this;o.request({url:"https://dongyi.sir6.cn/api/project/",method:"GET",success:function(n){e.projectList=n.data.data,t("log",n," at pages/project/index.vue:58")}})}}};e.default=a}).call(this,n("0de9")["default"],n("6e42")["default"])},bc12:function(t,e,n){"use strict";(function(t){n("8684"),n("921b");o(n("66fd"));var e=o(n("5833"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},d0fc:function(t,e,n){"use strict";var o=n("33fa"),c=n.n(o);c.a}},[["bc12","common/runtime","common/vendor"]]]);