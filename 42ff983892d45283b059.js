/*! For license information please see 42ff983892d45283b059.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{285:function(e,t,s){var r=s(332);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,s(160).default)("bbab901e",r,!0,{})},331:function(e,t,s){"use strict";var r=s(285);s.n(r).a},332:function(e,t,s){(t=s(159)(!1)).push([e.i,".ec-search-engine__nav{background:hsla(0,0%,50.2%,.1);color:var(--gray)}.ec-search-engine__count{padding-left:.5rem;position:relative;line-height:2.5}.ec-search-engine__spinner{position:absolute;top:.4rem;right:-3rem;color:var(--secondary);margin-left:1.5rem;width:1.75rem;height:1.75rem}.ec-search-engine__toggle{color:inherit;display:inline-block;text-decoration:none;transition:opacity .15s,color .2s;padding:0 .5rem;opacity:.75;line-height:2.5;border:none}.ec-search-engine__toggle i,.ec-search-engine__toggle svg{font-size:.825rem;color:var(--gray-dark);margin-right:.15rem}.ec-search-engine__toggle:focus,.ec-search-engine__toggle:hover{opacity:1;text-decoration:none;color:inherit;box-shadow:none}.ec-search-engine__toggle[aria-expanded=true]{color:var(--gray-dark);opacity:1}.ec-search-engine__results{transition:opacity .25s}.ec-search-engine__info{margin-bottom:1.5rem;padding-top:1rem}.ec-search-engine__terms{display:flex;justify-content:space-between;align-items:center}.ec-search-engine__terms small{font-size:.95rem;color:var(--gray)}.ec-search-engine__retail{padding-top:.5rem}.ec-search-engine__item{margin-bottom:1rem}.ec-search-engine__sidebar{position:fixed;width:280px;max-width:100%;height:100%;top:0;right:0;z-index:1100;border-radius:0}.ec-search-engine__sidebar .card-body{overflow-y:auto}.ec-search-engine__filter:not(:first-child){margin-top:1rem}.ec-search-engine__filter:last-child{margin-bottom:1.5rem}.ec-search-engine__filter__btn{padding-left:0;color:var(--secondary);font-size:1.2rem;font-weight:300}.ec-search-engine__filter__btn i,.ec-search-engine__filter__btn svg{margin-right:.25rem;color:var(--gray);opacity:.6}.ec-search-engine__filter__btn:focus{box-shadow:none}.ec-search-engine__option small{color:var(--gray)}",""]),e.exports=t},377:function(e,t,s){"use strict";s.r(t);s(12),s(7),s(21),s(210),s(8),s(10),s(211);var r=s(50),i=(s(204),s(51),s(41),s(68),s(29),s(145),s(23),s(39)),a=s(208);const n={items:{en_us:"items",pt_br:"itens"},filter:{en_us:"filter",pt_br:"filtrar"},results:{en_us:"results",pt_br:"resultados"},sort:{en_us:"sort",pt_br:"ordenar"},searching_for:{en_us:"Searching for",pt_br:"Buscando por"},no_results_for:{en_us:"No results for",pt_br:"Nenhum resultado para"},brands:{en_us:"Brands",pt_br:"Marcas"},categories:{en_us:"Categories",pt_br:"Categorias"},refine_search:{en_us:"Refine search",pt_br:"Refinar busca"},close_filters:{en_us:"Close filters",pt_br:"Fechar filtros"},clear_filters:{en_us:"Clear filters",pt_br:"Limpar filtros"},relevance:{en_us:"Most relevant",pt_br:"Mais relevantes"},sales:{en_us:"Best sellers",pt_br:"Mais vendidos"},lowest_price:{en_us:"Lowest price",pt_br:"Menor preço"},highest_price:{en_us:"Highest price",pt_br:"Maior preço"},popular_products:{en_us:"Popular products",pt_br:"Produtos populares"},search_again:{en_us:"Search again",pt_br:"Buscar novamente"}};var o={name:"EcSearchEngine",components:{EcProductCard:s(230).a},props:{lang:{type:String,default:i.$ecomConfig.get("lang")},storeId:{type:Number,default:i.$ecomConfig.get("store_id")},term:{type:String},page:{type:Number},pageSize:{type:Number},brands:{type:Array},categories:{type:Array},autoFixScore:{type:[Number,Boolean],default:.6},showFilters:{type:Boolean,default:!1},navbarId:String,prerenderedHTML:String},data(){return{ecomSearch:new a.a(this.storeId),currentPage:0,resultItems:[],fixedTerm:"",totalSearchResults:0,searching:!1,loadingMore:!1,searched:!1,emptyResult:!1,networkError:!1,filters:[],lastSelectedFilter:null,selectedOptions:{},sortOptions:[null,"sales","lowest_price","highest_price"],selectedSortOption:null}},computed:{hasSelectedOptions(){for(const e in this.selectedOptions)if(this.selectedOptions[e]&&this.selectedOptions[e].length)return!0;return!1},countedItems(){return(this.pageSize||24)*(this.currentPage-1)+this.resultItems.length}},methods:{dictionary:function(e,t){return t||(t=this&&this.lang||"en_us"),n[e]&&n[e][t]||""},fixTerm(){if(this.term){let e=this.term,t=!0;if(this.ecomSearch.getTermSuggestions().forEach(({options:s,text:r})=>{if(s.length){const i=s[0];i.score<this.autoFixScore&&(t=!1),e=e.replace(r,i.text)}}),t&&e!==this.term)return this.fixedTerm=e,this.ecomSearch.setSearchTerm(e).history.shift(),this.fetchItems(),!0}return!1},updateFilters(){const e=this.filters.find(({filter:e})=>e===this.lastSelectedFilter);this.filters=e?[e]:[];const t=(e,t,s)=>{if(this.lastSelectedFilter!==e){this.filters.push({filter:e,filterObj:{show:this.filters.length<5,options:t},isSpec:s});const r=this.selectedOptions,i=r[e]?r[e].filter(e=>t.find(({key:t})=>t===e)):[];this.$set(this.selectedOptions,e,i)}};["Brands","Categories"].forEach(e=>{t(e,this.ecomSearch["get".concat(e)]())}),this.ecomSearch.getSpecs().forEach(({key:e,options:s},r)=>{t(e,s,!0)})},fetchItems(e,t){const s=this.ecomSearch;this.searching=!0,this.loadingMore=e>1||this.page>1,s.setPageNumber(e).fetch().then(()=>{if(this.totalSearchResults=s.getTotalCount(),this.totalSearchResults||this.fixedTerm||!this.fixTerm()){if(e?(this.currentPage=e,this.resultItems=this.resultItems.concat(s.getItems())):(this.currentPage=1,this.resultItems=s.getItems()),!this.searched){if(!this.resultItems.length)return s.reset(),this.emptyResult=!0,this.fetchItems();setTimeout(()=>{this.searched=!0},10)}this.updateFilters(),this.networkError=!1}}).catch(s=>{console.error(s),t||s.response&&400===s.response.status?this.networkError=!0:this.fetchItems(e,!0)}).finally(()=>{this.searching=this.loadingMore=!1})},toggleFilters(e=!1){this.$emit("update:showFilters",e)},filterLabel(e){const t=this.dictionary(e.toLowerCase());if(!t&&window._data&&Array.isArray(window._data.grids)){const t=window._data.grids.find(t=>t.grid_id===e);if(t)return t.title||t.grid_id}return t||e},updateSearchFilter(e){const t=this.ecomSearch;let s=this.selectedOptions[e];switch(s.length||(s=null),e){case"Brands":t.setBrandNames(s);break;case"Categories":t.setCategoryNames(s);break;default:t.setSpec(e,s)}},setFilterOption(e,t,s){const r=this.selectedOptions[e];if(s)this.lastSelectedFilter=e,r.push(t);else{const s=r.indexOf(t);s>-1&&r.splice(s,1),r.length||this.lastSelectedFilter!==e||(this.lastSelectedFilter=null)}this.updateSearchFilter(e),this.fetchItems()},clearFilters(){const e=this.selectedOptions;for(const t in e)e[t]&&(e[t]=[],this.updateSearchFilter(t));this.fetchItems()},setSortOrder(e){this.selectedSortOption=e,this.ecomSearch.setSortOrder(e),this.fetchItems()}},created(){const e=this.ecomSearch,t=this.term,s=this.page,r=this.pageSize,i=this.brands,a=this.categories;t&&e.setSearchTerm(t),Array.isArray(i)&&i.length&&e.setBrandNames(i),Array.isArray(a)&&a.length&&e.setCategoryNames(a),e.setPageSize(r||24),this.fetchItems(s||1)},mounted(){if(this.navbarId){const e=this.$refs.nav;document.getElementById(this.navbarId).appendChild(e)}let e;window.addEventListener("scroll",()=>{clearTimeout(e),!this.searching&&this.totalSearchResults>this.countedItems&&(e=setTimeout(()=>{const e=this.$el,t=e.offsetTop,s=e.offsetHeight;window.pageYOffset+window.screen.height>=t+s&&this.fetchItems(this.currentPage+1)},100))})}},c=(s(331),s(90)),l=Object(c.a)(o,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"ec-search-engine"},[s("nav",{ref:"nav"},[s("portal-target",{attrs:{name:"search-nav"}})],1),s("portal",{attrs:{to:"search-nav"}},[s("transition",{attrs:{"enter-active-class":"animated fadeInDown fast"}},[e.searched&&(e.searching||e.totalSearchResults>8||e.hasSelectedOptions)?s("div",{staticClass:"ec-search-engine__nav"},[e._t("nav",[s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-auto"},[s("div",{staticClass:"ec-search-engine__count"},[s("strong",[e._v(e._s(e.totalSearchResults))]),e._v(" "+e._s(e.dictionary("items"))+" "),e.searching?s("div",{staticClass:"spinner-grow ec-search-engine__spinner",attrs:{role:"status"}},[s("span",{staticClass:"sr-only"},[e._v("Loading...")])]):e._e()])]),s("div",{staticClass:"text-right col"},[e.hasSelectedOptions||e.filters.find((function(e){return e.filterObj.options.length}))?s("button",{staticClass:"btn ec-search-engine__toggle",attrs:{type:"button"},on:{click:function(t){return e.toggleFilters(!0)}}},[s("i",{staticClass:"fas fa-filter"}),e._v(" "+e._s(e.dictionary("filter"))+" "),s("span",{staticClass:"d-none d-md-inline"},[e._v(" "+e._s(e.dictionary("results"))+" ")])]):e._e(),s("b-dropdown",{attrs:{variant:"link","toggle-class":"ec-search-engine__toggle",right:"","no-caret":""},scopedSlots:e._u([{key:"button-content",fn:function(){return[s("i",{staticClass:"fas fa-sort"}),s("span",{staticClass:"d-none d-md-inline"},[e._v(" "+e._s(e.dictionary("sort"))+" ")])]},proxy:!0}],null,!1,2883328033)},e._l(e.sortOptions,(function(t,r){return s("b-dropdown-item",{key:"sort-"+r,attrs:{href:"#",active:e.selectedSortOption===t},on:{click:function(s){return s.preventDefault(),e.setSortOrder(t)}}},[e._v(" "+e._s(e.dictionary(t||"relevance"))+" ")])})),1)],1)])])],null,{totalSearchResults:e.totalSearchResults,toggleFilters:e.toggleFilters})],2):e._e()])],1),s("transition",{attrs:{"enter-active-class":"animated slideInRight","leave-active-class":"animated slideOutRight"}},[s("aside",{directives:[{name:"show",rawName:"v-show",value:e.showFilters,expression:"showFilters"}],staticClass:"ec-search-engine__sidebar card shadow"},[e._t("filters",[s("header",{staticClass:"card-header"},[e._v(" "+e._s(e.dictionary("refine_search"))+" "),s("button",{staticClass:"close",attrs:{type:"button","aria-label":e.dictionary("close_filters")},on:{click:function(t){return e.toggleFilters(!1)}}},[s("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])])]),s("div",{staticClass:"card-body"},e._l(e.filters,(function(t){var r=t.filter,i=t.filterObj,a=t.isSpec;return i.options.length?s("div",{key:"filters-"+r,staticClass:"ec-search-engine__filter",class:"ec-search-engine__filter--"+r},[s("button",{staticClass:"btn ec-search-engine__filter__btn",attrs:{type:"button","aria-expanded":i.show?"true":"false","aria-controls":"collapse-"+r},on:{click:function(e){i.show=!i.show}}},[s("i",{staticClass:"fas fa-chevron-down"}),e._v(" "+e._s(e.filterLabel(r))+" ")]),s("b-collapse",{attrs:{id:"collapse-"+r},model:{value:i.show,callback:function(t){e.$set(i,"show",t)},expression:"filterObj.show"}},e._l(i.options,(function(t,i){return s("div",{key:r+"-"+i,staticClass:"custom-control custom-checkbox ec-search-engine__option"},[s("input",{staticClass:"custom-control-input",attrs:{type:"checkbox",id:r+"-"+i},domProps:{checked:e.selectedOptions[r].indexOf(t.key)>-1},on:{change:function(s){return e.setFilterOption(r,t.key,s.target.checked)}}}),s("label",{staticClass:"custom-control-label",attrs:{for:r+"-"+i}},[e._v(" "+e._s(t.key)+" "),a?e._e():s("small",[e._v(" ("+e._s(t.doc_count)+") ")])])])})),0)],1):e._e()})),0),s("footer",{staticClass:"card-footer"},[s("button",{staticClass:"btn btn-sm btn-block btn-outline-secondary",attrs:{type:"button"},on:{click:e.clearFilters}},[s("span",{staticClass:"mr-1"},[s("i",{staticClass:"fas fa-trash-alt"})]),e._v(" "+e._s(e.dictionary("clear_filters"))+" ")])])])],2)]),s("transition",{attrs:{"enter-active-class":"animated fadeIn slower"}},[e.searched?s("div",{staticClass:"ec-search-engine__results",style:{opacity:e.searching&&!e.loadingMore?.4:1}},[s("div",{staticClass:"ec-search-engine__info"},[e.term?[e.emptyResult?s("div",{staticClass:"ec-search-engine__no-results"},[s("div",{staticClass:"lead"},[e._v(" "+e._s(e.dictionary("no_results_for"))+" "),s("em",[e._v(e._s(e.term))])]),s("h1",[e._v(e._s(e.dictionary("popular_products")))])]):s("div",{staticClass:"ec-search-engine__terms"},[s("h1",[s("small",{staticClass:"d-none d-md-block"},[e._v(" "+e._s(e.dictionary("searching_for"))+": ")]),e._v(" "+e._s(e.fixedTerm||e.term)+" ")]),e.fixedTerm?s("em",{staticClass:"d-none d-lg-block"},[e._v(" "+e._s(e.dictionary("no_results_for"))+" "),s("s",[e._v(e._s(e.term))])]):e._e()])]:e._e(),s("transition",{attrs:{"enter-active-class":"animated fadeInDown","leave-active-class":"animated position-absolute fadeOutUp"}},[e.hasSelectedOptions?s("div",[s("button",{staticClass:"btn btn-sm btn-outline-secondary",attrs:{type:"button"},on:{click:e.clearFilters}},[s("span",{staticClass:"mr-1"},[s("i",{staticClass:"fas fa-trash-alt"})]),e._v(" "+e._s(e.dictionary("clear_filters"))+" ")]),e._l(e.selectedOptions,(function(t,r){return e._l(t,(function(t){return s("button",{staticClass:"btn m-1 btn-sm btn-light",attrs:{type:"button"},on:{click:function(s){return e.setFilterOption(r,t,!1)}}},[s("span",{staticClass:"mr-1"},[s("i",{staticClass:"fas fa-times"})]),e._v(" "+e._s(t)+" "),s("small",[e._v("\\ "+e._s(e.filterLabel(r)))])])}))}))],2):e._e()])],2),s("article",{staticClass:"ec-search-engine__retail"},[s("div",{staticClass:"row"},e._l(e.resultItems,(function(t){return s("div",{key:t._id,staticClass:"col-6 col-md-4 col-lg-3"},[e._t("product",[s("ec-product-card",{staticClass:"ec-search-engine__item",attrs:{lang:e.lang,storeId:e.storeId,product:t}})],null,{product:t})],2)})),0)]),s("transition",{attrs:{"enter-active-class":"animated fadeInDown","leave-active-class":"animated position-absolute fadeOutUp"}},[e.networkError?s("div",{staticClass:"alert alert-warning",attrs:{role:"alert"}},[s("h4",{staticClass:"alert-heading"},[e._v("Offline")]),"pt_br"===e.lang?[e._v(" Não foi possível buscar os produtos, por favor verifique sua conexão com a internet. ")]:[e._v(" Unable to fetch the products, please check your internet connection. ")],s("hr"),s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return e.fetchItems(e.currentPage)}}},[s("i",{staticClass:"fas fa-search mr-1"}),e._v(" "+e._s(e.dictionary("search_again"))+" ")])],2):e._e()])],1):e._e()]),s("transition",{attrs:{"enter-active-class":"animated fadeInDown","leave-active-class":"animated fadeOutUp"}},[!e.searched||e.loadingMore?e._t("default",[s("div",{domProps:{innerHTML:e._s(e.prerenderedHTML)}})]):e._e()],2)],1)}),[],!1,null,null,null).exports;function h(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,r)}return s}function d(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?h(Object(s),!0).forEach((function(t){u(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):h(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function u(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}t.default=(e={},t="search-engine")=>{const s=document.getElementById(t);if(s){const i=window.storefront.$overlay,a=new URLSearchParams(window.location.search);new r.default({data:{showFilters:!1},render(r){const n=this;return r(l,{attrs:{id:t},props:d({},e.props,{term:a.get("term"),page:parseInt(a.get("page"),10),brands:a.getAll("brands"),categories:a.getAll("categories"),navbarId:"header",showFilters:n.showFilters,prerenderedHTML:s.outerHTML}),on:{"update:showFilters"(e){n.showFilters=e,i&&(e?(i.show(),i.once("hide",()=>{n.showFilters=!1})):i.hide())}}})}}).$mount(s)}}}}]);
//# sourceMappingURL=42ff983892d45283b059.js.map