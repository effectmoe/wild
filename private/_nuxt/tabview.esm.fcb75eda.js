import{U as y,E as l,R as m,j as k,o,b as c,k as h,m as p,H as b,l as u,F as g,G as w,t as A,g as x,r as T,I as B,n as P}from"./entry.a8bdde5b.js";var _={name:"TabView",emits:["update:activeIndex","tab-change","tab-click"],props:{activeIndex:{type:Number,default:0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},previousButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null}},data(){return{id:this.$attrs.id,d_activeIndex:this.activeIndex,isPrevButtonDisabled:!0,isNextButtonDisabled:!1}},watch:{"$attrs.id":function(e){this.id=e||y()},activeIndex(e){this.d_activeIndex=e,this.scrollInView({index:e})}},mounted(){this.id=this.id||y(),this.updateInkBar(),this.scrollable&&this.updateButtonState()},updated(){this.updateInkBar()},methods:{isTabPanel(e){return e.type.name==="TabPanel"},isTabActive(e){return this.d_activeIndex===e},getTabProp(e,t){return e.props?e.props[t]:void 0},getKey(e,t){return this.getTabProp(e,"header")||t},getTabHeaderActionId(e){return`${this.id}_${e}_header_action`},getTabContentId(e){return`${this.id}_${e}_content`},onScroll(e){this.scrollable&&this.updateButtonState(),e.preventDefault()},onPrevButtonClick(){const e=this.$refs.content,t=l.getWidth(e)-this.getVisibleButtonWidths(),n=e.scrollLeft-t;e.scrollLeft=n<=0?0:n},onNextButtonClick(){const e=this.$refs.content,t=l.getWidth(e)-this.getVisibleButtonWidths(),n=e.scrollLeft+t,s=e.scrollWidth-t;e.scrollLeft=n>=s?s:n},onTabClick(e,t,n){this.changeActiveIndex(e,t,n),this.$emit("tab-click",{originalEvent:e,index:n})},onTabKeyDown(e,t,n){switch(e.code){case"ArrowLeft":this.onTabArrowLeftKey(e);break;case"ArrowRight":this.onTabArrowRightKey(e);break;case"Home":this.onTabHomeKey(e);break;case"End":this.onTabEndKey(e);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Enter":case"Space":this.onTabEnterKey(e,t,n);break}},onTabArrowRightKey(e){const t=this.findNextHeaderAction(e.target.parentElement);t?this.changeFocusedTab(e,t):this.onTabHomeKey(e),e.preventDefault()},onTabArrowLeftKey(e){const t=this.findPrevHeaderAction(e.target.parentElement);t?this.changeFocusedTab(e,t):this.onTabEndKey(e),e.preventDefault()},onTabHomeKey(e){const t=this.findFirstHeaderAction();this.changeFocusedTab(e,t),e.preventDefault()},onTabEndKey(e){const t=this.findLastHeaderAction();this.changeFocusedTab(e,t),e.preventDefault()},onPageDownKey(e){this.scrollInView({index:this.$refs.nav.children.length-2}),e.preventDefault()},onPageUpKey(e){this.scrollInView({index:0}),e.preventDefault()},onTabEnterKey(e,t,n){this.changeActiveIndex(e,t,n),e.preventDefault()},findNextHeaderAction(e,t=!1){const n=t?e:e.nextElementSibling;return n?l.hasClass(n,"p-disabled")||l.hasClass(n,"p-tabview-ink-bar")?this.findNextHeaderAction(n):l.findSingle(n,".p-tabview-header-action"):null},findPrevHeaderAction(e,t=!1){const n=t?e:e.previousElementSibling;return n?l.hasClass(n,"p-disabled")||l.hasClass(n,"p-tabview-ink-bar")?this.findPrevHeaderAction(n):l.findSingle(n,".p-tabview-header-action"):null},findFirstHeaderAction(){return this.findNextHeaderAction(this.$refs.nav.firstElementChild,!0)},findLastHeaderAction(){return this.findPrevHeaderAction(this.$refs.nav.lastElementChild,!0)},changeActiveIndex(e,t,n){!this.getTabProp(t,"disabled")&&this.d_activeIndex!==n&&(this.d_activeIndex=n,this.$emit("update:activeIndex",n),this.$emit("tab-change",{originalEvent:e,index:n}),this.scrollInView({index:n}))},changeFocusedTab(e,t){if(t&&(l.focus(t),this.scrollInView({element:t}),this.selectOnFocus)){const n=parseInt(t.parentElement.dataset.index,10),s=this.tabs[n];this.changeActiveIndex(e,s,n)}},scrollInView({element:e,index:t=-1}){const n=e||this.$refs.nav.children[t];n&&n.scrollIntoView&&n.scrollIntoView({block:"nearest"})},updateInkBar(){let e=this.$refs.nav.children[this.d_activeIndex];this.$refs.inkbar.style.width=l.getWidth(e)+"px",this.$refs.inkbar.style.left=l.getOffset(e).left-l.getOffset(this.$refs.nav).left+"px"},updateButtonState(){const e=this.$refs.content,{scrollLeft:t,scrollWidth:n}=e,s=l.getWidth(e);this.isPrevButtonDisabled=t===0,this.isNextButtonDisabled=parseInt(t)===n-s},getVisibleButtonWidths(){const{prevBtn:e,nextBtn:t}=this.$refs;return[e,t].reduce((n,s)=>s?n+l.getWidth(s):n,0)},getTabHeaderClass(e,t){return["p-tabview-header",this.getTabProp(e,"headerClass"),{"p-highlight":this.d_activeIndex===t,"p-disabled":this.getTabProp(e,"disabled")}]},getTabContentClass(e){return["p-tabview-panel",this.getTabProp(e,"contentClass")]}},computed:{contentClasses(){return["p-tabview p-component",{"p-tabview-scrollable":this.scrollable}]},tabs(){return this.$slots.default().reduce((e,t)=>(this.isTabPanel(t)?e.push(t):t.children&&t.children instanceof Array&&t.children.forEach(n=>{this.isTabPanel(n)&&e.push(n)}),e),[])},prevButtonAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0}},directives:{ripple:m}};const C={class:"p-tabview-nav-container"},I=["tabindex","aria-label"],H=h("span",{class:"pi pi-chevron-left","aria-hidden":"true"},null,-1),D=[H],K={ref:"nav",class:"p-tabview-nav",role:"tablist"},E=["data-index"],S=["id","tabindex","aria-disabled","aria-selected","aria-controls","onClick","onKeydown"],N={key:0,class:"p-tabview-title"},L={ref:"inkbar",class:"p-tabview-ink-bar",role:"presentation","aria-hidden":"true"},V=["tabindex","aria-label"],F=h("span",{class:"pi pi-chevron-right","aria-hidden":"true"},null,-1),W=[F],z={class:"p-tabview-panels"},R=["aria-labelledby"];function U(e,t,n,s,d,a){const v=k("ripple");return o(),c("div",{class:P(a.contentClasses)},[h("div",C,[n.scrollable&&!d.isPrevButtonDisabled?p((o(),c("button",b({key:0,ref:"prevBtn",type:"button",class:"p-tabview-nav-prev p-tabview-nav-btn p-link",tabindex:n.tabindex,"aria-label":a.prevButtonAriaLabel,onClick:t[0]||(t[0]=(...i)=>a.onPrevButtonClick&&a.onPrevButtonClick(...i))},n.previousButtonProps),D,16,I)),[[v]]):u("",!0),h("div",{ref:"content",class:"p-tabview-nav-content",onScroll:t[1]||(t[1]=(...i)=>a.onScroll&&a.onScroll(...i))},[h("ul",K,[(o(!0),c(g,null,w(a.tabs,(i,r)=>(o(),c("li",b({key:a.getKey(i,r),style:a.getTabProp(i,"headerStyle"),class:a.getTabHeaderClass(i,r),role:"presentation","data-index":r},a.getTabProp(i,"headerProps")),[p((o(),c("a",b({id:a.getTabHeaderActionId(r),class:"p-tabview-nav-link p-tabview-header-action",tabindex:a.getTabProp(i,"disabled")||!a.isTabActive(r)?-1:n.tabindex,role:"tab","aria-disabled":a.getTabProp(i,"disabled"),"aria-selected":a.isTabActive(r),"aria-controls":a.getTabContentId(r),onClick:f=>a.onTabClick(f,i,r),onKeydown:f=>a.onTabKeyDown(f,i,r)},a.getTabProp(i,"headerActionProps")),[i.props&&i.props.header?(o(),c("span",N,A(i.props.header),1)):u("",!0),i.children&&i.children.header?(o(),x(T(i.children.header),{key:1})):u("",!0)],16,S)),[[v]])],16,E))),128)),h("li",L,null,512)],512)],544),n.scrollable&&!d.isNextButtonDisabled?p((o(),c("button",b({key:1,ref:"nextBtn",type:"button",class:"p-tabview-nav-next p-tabview-nav-btn p-link",tabindex:n.tabindex,"aria-label":a.nextButtonAriaLabel,onClick:t[2]||(t[2]=(...i)=>a.onNextButtonClick&&a.onNextButtonClick(...i))},n.nextButtonProps),W,16,V)),[[v]]):u("",!0)]),h("div",z,[(o(!0),c(g,null,w(a.tabs,(i,r)=>(o(),c(g,{key:a.getKey(i,r)},[!n.lazy||a.isTabActive(r)?p((o(),c("div",b({key:0,style:a.getTabProp(i,"contentStyle"),class:a.getTabContentClass(i),role:"tabpanel","aria-labelledby":a.getTabHeaderActionId(r)},a.getTabProp(i,"contentProps")),[(o(),x(T(i)))],16,R)),[[B,n.lazy?!0:a.isTabActive(r)]]):u("",!0)],64))),128))])],2)}function O(e,t){t===void 0&&(t={});var n=t.insertAt;if(!(!e||typeof document>"u")){var s=document.head||document.getElementsByTagName("head")[0],d=document.createElement("style");d.type="text/css",n==="top"&&s.firstChild?s.insertBefore(d,s.firstChild):s.appendChild(d),d.styleSheet?d.styleSheet.cssText=e:d.appendChild(document.createTextNode(e))}}var j=`
.p-tabview-nav-container {
    position: relative;
}
.p-tabview-scrollable .p-tabview-nav-container {
    overflow: hidden;
}
.p-tabview-nav-content {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior: contain auto;
}
.p-tabview-nav {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    flex: 1 1 auto;
}
.p-tabview-header-action {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    position: relative;
    text-decoration: none;
    overflow: hidden;
}
.p-tabview-ink-bar {
    display: none;
    z-index: 1;
}
.p-tabview-header-action:focus {
    z-index: 1;
}
.p-tabview-title {
    line-height: 1;
    white-space: nowrap;
}
.p-tabview-nav-btn {
    position: absolute;
    top: 0;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.p-tabview-nav-prev {
    left: 0;
}
.p-tabview-nav-next {
    right: 0;
}
.p-tabview-nav-content::-webkit-scrollbar {
    display: none;
}
`;O(j);_.render=U;export{_ as default};
