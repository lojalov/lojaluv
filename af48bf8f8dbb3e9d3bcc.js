(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{360:function(t,e,r){"use strict";r.r(e);var o=r(31),n=r(45);const c=o.$ecomConfig.get("currency")||"BRL",a=t=>{const e={currency:c,content_ids:[t.sku],content_name:t.name,value:Object(n.a)(t),content_type:"product"};return t.categories&&t.categories.length&&(e.content_category=t.category_tree||t.categories[0].name),e};var i=r(20);function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){p(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function p(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}e.default=(t={})=>{if("function"==typeof window.fbq){const r=(e,r={},o=!1)=>{t.debug&&console.log("fbq",e,r),window.fbq(o?"trackCustom":"track",e,r)};(t=>{const e=window.storefront&&window.storefront.context;e&&"products"===e.resource&&t("ViewContent",a(e.body))})(r),(t=>{const e=window.storefrontApp&&window.storefrontApp.router;if(e){let r=!1;const o=()=>{const{amount:t}=window.storefrontApp,e={value:t&&t.total||i.a.data&&i.a.data.subtotal||0,currency:c,contents:[],content_type:"product"};return i.a.data&&Array.isArray(i.a.data.items)&&i.a.data.items.forEach(({sku:t,quantity:r})=>{e.contents.push({id:t,quantity:r})}),e},n=(e,n)=>{const c=u({},o(),{checkout_step:e,checkout_option:n});e<=1||!r?(t("Checkout",c,!0),r=!0):t("CheckoutOption",c,!0)},a=e=>{t("Purchase",u({},o(),{order_id:e}))},s=({name:t,params:e})=>{switch(t){case"cart":n(1,"Review Cart");break;case"checkout":n(2,"Confirm Purchase");break;case"confirmation":a(e.id)}};e.currentRoute&&s(e.currentRoute),e.afterEach(s)}})(r),e=r,i.a.on("addItem",({item:t})=>{e("AddToCart",a(t))})}var e}}}]);
//# sourceMappingURL=af48bf8f8dbb3e9d3bcc.js.map