/*! For license information please see 09c1af54ed124f4cab9c.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{264:function(t,e,o){var r=o(312);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,o(137).default)("3709a56d",r,!0,{})},311:function(t,e,o){"use strict";var r=o(264);o.n(r).a},312:function(t,e,o){(e=o(136)(!1)).push([t.i,".ec-user{display:inline}.ec-user__popover{max-width:100%;min-width:12rem;font-size:1rem;line-height:1.4}.ec-user__alert{font-size:.85rem;margin-bottom:1rem}.ec-user__logout{margin-top:1rem}.ec-user__btn{color:#fff;text-align:left;line-height:1.2rem;padding:.7rem;min-width:15rem;font-size:.9rem}.ec-user__btn:hover{color:#fff}.ec-user__btn:focus{box-shadow:none}.ec-user__btn--facebook{background:#3b5999;border-color:#2f4d8a}.ec-user__btn--facebook:hover{background:#274480;border-color:#274480}.ec-user__btn--google{background:#cb4023;border-color:#be3419}.ec-user__btn--google:hover{background:#c1361a;border-color:#c1361a}.ec-user__btn--windowslive{background:#329ffc;border-color:#2996f2}.ec-user__btn--windowslive:hover{background:#1f8ce9;border-color:#1f8ce9}.ec-user__btn__icon{display:inline-block;width:1.4rem;text-align:center;margin-right:.2rem}.ec-user__back{display:block;padding-left:.3rem;padding-right:.3rem}.ec-user__back:focus{box-shadow:none}.ec-user__visitor-info{font-size:.875rem;margin-top:.6rem;text-align:center;color:var(--gray)}",""]),t.exports=e},353:function(t,e,o){"use strict";o.r(e);var r=o(37),i=(o(183),o(22),o(57),o(31));const s={my_account:{en_us:"My account",pt_br:"Minha conta"},my_orders:{en_us:"My orders",pt_br:"Meus pedidos"},hello:{en_us:"Hello",pt_br:"Olá"},visitor:{en_us:"visitor",pt_br:"visitante"},sign_in_with:{en_us:"Sign in with",pt_br:"Entrar com"},sign_up_with:{en_us:"Sign up with",pt_br:"Cadastrar via"},another:{en_us:"another",pt_br:"outro"},email:{en_us:"email",pt_br:"e-mail"},logout:{en_us:"Logout",pt_br:"Sair"},login:{en_us:"Login",pt_br:"Entrar"},continue_on_popup:{en_us:"Continue login on popup",pt_br:"Continue o login no pop-up"},login_error:{en_us:"There was an error trying to login, please try again or select another option",pt_br:"Houve um erro ao tentar o login, por favor tente novamente ou selecione outra opção"},profile_not_found:{en_us:"No profile found with email address",pt_br:"Nenhum perfil encontrado com o endereço de e-mail"},visitor_checkout:{en_us:"You can also buy as a visitor if you prefer",pt_br:"Você também pode comprar como visitante se preferir"}};var n=function(t,e){return e||(e=this&&this.lang||"en_us"),s[t]&&s[t][e]||""},a=o(125),c={name:"EcUser",props:{lang:{type:String,default:i.$ecomConfig.get("lang")},ecomPassport:{type:Object,default:()=>a.a},popoverPlacement:{type:String,default:"bottomleft"},getGreetingsMsg:{type:Function},accountUrl:{type:String,default:"/app/#/account/"},ordersUrl:{type:String,default:"/app/#/account/orders"},popupAlertCountSecs:{type:Number,default:3}},data:()=>({showPopover:!1,popoverTriggers:"click blur",waiting:!1,waitingPopup:!1,isLogged:!1,email:"",name:"",oauthProviders:[],showLoginForm:!1,popupAlertCount:0,loginErrorAlert:!1,noProfileFound:!1,popoverHideTimer:null}),computed:{greetings(){return"function"==typeof this.getGreetingsMsg?this.getGreetingsMsg(this.name):"".concat(n("hello",this.lang)," ").concat(this.name||n("visitor",this.lang))}},methods:{dictionary:n,update(){this.fixPopoverTriggers();const{checkLogin:t,getCustomerName:e}=this.ecomPassport;this.name=e(),this.isLogged=t(),this.email="",this.popupAlertCount=0,this.isLogged&&(this.showPopover=!0,setTimeout(()=>{this.showPopover&&(this.popoverHideTimer=setTimeout(()=>{this.showPopover=!1},2e3))},200)),this.waitingPopup=!1,clearTimeout(this.popoverHideTimer)},waitPromise(t){this.fixPopoverTriggers();const e=this;e.waiting=!0,t.catch(t=>{console.error(t)}).finally(()=>{e.waiting=!1})},setOauthProviders(){const t=this,e=t.ecomPassport.fetchOauthProviders().then(({host:e,baseUri:o,oauthPath:r,providers:i})=>{const s=[];for(const t in i)if(i[t]){const{faIcon:n,providerName:a}=i[t];s.push({link:e+o+t+r,faIcon:n,provider:t,providerName:a})}t.oauthProviders=s}).catch(e=>{throw t.presetOauthProviders(),e});return t.waitPromise(e),e},presetOauthProviders(){this.oauthProviders=[{faIcon:"fa-facebook-f",providerName:"Facebook",provider:"facebook"},{faIcon:"fa-google",providerName:"Google",provider:"google"},{faIcon:"fa-windows",providerName:"Windows",provider:"windowslive"}]},oauthPopup(t,e){const o=this;if(this.loginErrorAlert=!1,t)o.ecomPassport.popupOauthLink(t),o.waitingPopup=!0,setTimeout(()=>{o.popupAlertCount=o.popupAlertCountSecs},200);else{const t=o.setOauthProviders().then(()=>{const t=o.oauthProviders.find(t=>t.provider===e);o.oauthPopup(t,e)}).catch(t=>{throw o.loginErrorAlert=!0,t});o.waitPromise(t)}},popupAlertChanged(t){this.popupAlertCount=t},emailLoginSubmit(t){const e=this;t.preventDefault(),e.showLoginForm=!1;const o=e.ecomPassport.fetchLogin(this.email).catch(t=>{const{response:o}=t;if(!o||403!==o.status)throw setTimeout(()=>{e.loginErrorAlert=!0},100),t;e.noProfileFound=!0});e.waitPromise(o)},logout(){this.ecomPassport.logout()},resetErrors(){this.noProfileFound=this.loginErrorAlert=!1},resetPopover(){this.showLoginForm?this.showLoginForm=!1:this.resetErrors()},fixPopoverTriggers(){this.showPopover&&(this.popoverTriggers="manual",setTimeout(()=>{this.popoverTriggers="click blur"},310))}},mounted(){const t=this;["login","logout"].forEach(e=>{this.ecomPassport.on(e,o=>{t.update(),t.$emit(e,o)})}),t.update(),t.setOauthProviders()},watch:{noProfileFound(t){!1===t&&(this.email=""),this.showLoginForm=!t},showLoginForm(t){this.loginErrorAlert=!1,t&&(this.fixPopoverTriggers(),setTimeout(()=>{this.$refs.input&&this.$refs.input.focus()},300))},showPopover(){clearTimeout(this.popoverHideTimer)}}},u=(o(311),o(72)),l=Object(u.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ec-user"},[t._t("button",[o("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.left",modifiers:{hover:!0,left:!0}}],staticClass:"btn btn-lg btn-light",attrs:{type:"button",id:"ec-user-popover",title:t.dictionary("my_account")}},[o("i",{staticClass:"fas fa-user"})])]),o("b-popover",{attrs:{target:"ec-user-popover",triggers:t.popoverTriggers,show:t.showPopover,placement:t.popoverPlacement},on:{"update:show":function(e){t.showPopover=e},hidden:t.resetPopover}},[o("template",{slot:"title"},[t._v(" "+t._s(t.greetings)+" ")]),o("div",{staticClass:"ec-user__popover"},[o("b-alert",{staticClass:"ec-user__alert",attrs:{show:t.loginErrorAlert,fade:"",variant:"warning"}},[t._v(" "+t._s(t.dictionary("login_error"))+". ")]),o("transition-group",{attrs:{"enter-active-class":"animated fadeIn","leave-active-class":"animated position-absolute fadeOut faster"}},[t.waiting?o("div",{key:"waiting"},[o("div",{staticClass:"spinner-border m-3",attrs:{role:"status"}},[o("span",{staticClass:"sr-only"},[t._v("Loading...")])])]):t.isLogged?o("div",{key:"logged"},[o("div",{staticClass:"list-group list-group-flush"},[o("a",{staticClass:"list-group-item list-group-item-action",attrs:{href:t.ordersUrl}},[t._v(" "+t._s(t.dictionary("my_orders"))+" ")]),o("a",{staticClass:"list-group-item list-group-item-action",attrs:{href:t.accountUrl}},[t._v(" "+t._s(t.dictionary("my_account"))+" ")])]),o("button",{staticClass:"btn btn-block btn-danger ec-user__logout",attrs:{type:"button"},on:{click:t.logout}},[o("i",{staticClass:"fas fa-sign-out-alt"}),t._v(" "+t._s(t.dictionary("logout"))+" ")])]):t.showLoginForm?o("div",{key:"form"},[o("form",{on:{submit:t.emailLoginSubmit}},[o("div",{staticClass:"form-group"},[o("button",{staticClass:"btn ec-user__back",attrs:{type:"button"},on:{click:function(e){t.showLoginForm=!1}}},[o("i",{staticClass:"fas fa-arrow-left"})]),o("label",{attrs:{for:"ec-user-email"}},[t._v(" "+t._s(t.dictionary("sign_in_with")+" "+t.dictionary("email"))+" ")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],ref:"input",staticClass:"form-control",attrs:{type:"email",id:"ec-user-email",placeholder:"email@mail.com",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),o("button",{staticClass:"btn btn-block btn-primary",attrs:{type:"submit"}},[t._v(" "+t._s(t.dictionary("login"))+" ")])])]):o("div",{key:"oauth"},[o("b-alert",{staticClass:"ec-user__alert",attrs:{show:!t.popupAlertCount&&t.noProfileFound,fade:"",variant:"info"}},[t._v(" "+t._s(t.dictionary("profile_not_found"))+" "),o("b",[t._v(t._s(t.email))]),t._v(". "),o("br"),o("a",{staticClass:"alert-link",attrs:{href:"javascript:;"},on:{click:function(e){t.noProfileFound=!1}}},[t._v(" "+t._s(t.dictionary("sign_in_with")+" "+t.dictionary("another")+" "+t.dictionary("email"))+" ")])]),o("b-alert",{staticClass:"ec-user__alert",attrs:{show:t.popupAlertCount,dismissible:"",fade:"",variant:"info"},on:{dismissed:function(e){t.popupAlertCount=0},"dismiss-count-down":t.popupAlertChanged}},[t._v(" "+t._s(t.dictionary("continue_on_popup"))+". ")]),t._l(t.oauthProviders,(function(e){var r=e.link,i=e.faIcon,s=e.providerName,n=e.provider;return o("button",{key:n,staticClass:"btn btn-block ec-user__btn",class:"ec-user__btn--"+n,attrs:{type:"button"},on:{click:function(){return t.oauthPopup(r,n)}}},[o("span",{staticClass:"ec-user__btn__icon"},[o("i",{staticClass:"fab",class:i})]),t._v(" "+t._s(t.dictionary(t.noProfileFound?"sign_up_with":"sign_in_with"))+" "+t._s(s)+" ")])})),t.noProfileFound?o("div",{staticClass:"ec-user__visitor-info"},[t._v(" "+t._s(t.dictionary("visitor_checkout"))+" ")]):o("button",{key:"email",staticClass:"btn btn-block btn-secondary ec-user__btn",attrs:{type:"button"},on:{click:function(e){t.showLoginForm=!0}}},[o("span",{staticClass:"ec-user__btn__icon"},[o("i",{staticClass:"fas fa-envelope"})]),t._v(" "+t._s(t.dictionary("sign_in_with")+" "+t.dictionary("email"))+" ")])],2)])],1)],2)],2)}),[],!1,null,null,null).exports;function p(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function d(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?p(Object(o),!0).forEach((function(e){g(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):p(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function g(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}e.default=(t={},e="user-button")=>{const o=document.getElementById(e);o&&new r.default({render:o=>o(l,{attrs:{id:e},props:d({},t.props)})}).$mount(o)}}}]);
//# sourceMappingURL=09c1af54ed124f4cab9c.js.map