import{E as u,R as T,K as B,j as D,o as i,b as o,k as c,F as k,G as E,g as m,w as N,n as f,p as K,m as x,l as h,t as g,r as v}from"./entry.a8bdde5b.js";var L={name:"TabMenu",emits:["update:activeIndex","tab-change"],props:{model:{type:Array,default:null},exact:{type:Boolean,default:!0},activeIndex:{type:Number,default:0},"aria-labelledby":{type:String,default:null},"aria-label":{type:String,default:null}},timeout:null,data(){return{d_activeIndex:this.activeIndex}},watch:{$route(){this.timeout=setTimeout(()=>this.updateInkBar(),50)},activeIndex(e){this.d_activeIndex=e}},mounted(){this.updateInkBar()},updated(){this.updateInkBar()},beforeUnmount(){clearTimeout(this.timeout)},methods:{onItemClick(e,r,a,t){if(this.disabled(r)){e.preventDefault();return}r.command&&r.command({originalEvent:e,item:r}),r.to&&t&&t(e),a!==this.d_activeIndex&&(this.d_activeIndex=a,this.$emit("update:activeIndex",this.d_activeIndex)),this.$emit("tab-change",{originalEvent:e,index:a})},onKeydownItem(e,r,a){let t=a,s={};const l=this.$refs.tabLink;switch(e.code){case"ArrowRight":{s=this.findNextItem(this.$refs.tab,t),t=s.i;break}case"ArrowLeft":{s=this.findPrevItem(this.$refs.tab,t),t=s.i;break}case"End":{s=this.findPrevItem(this.$refs.tab,this.model.length),t=s.i,e.preventDefault();break}case"Home":{s=this.findNextItem(this.$refs.tab,-1),t=s.i,e.preventDefault();break}case"Space":case"Enter":{e.currentTarget&&e.currentTarget.click(),e.preventDefault();break}case"Tab":{this.setDefaultTabIndexes(l);break}}l[t]&&l[a]&&(l[a].tabIndex="-1",l[t].tabIndex="0",l[t].focus())},findNextItem(e,r){let a=r+1;if(a>=e.length)return{nextItem:e[e.length],i:e.length};let t=e[a];return t?u.hasClass(t,"p-disabled")?this.findNextItem(e,a):{nextItem:t,i:a}:null},findPrevItem(e,r){let a=r-1;if(a<0)return{nextItem:e[0],i:0};let t=e[a];return t?u.hasClass(t,"p-disabled")?this.findPrevItem(e,a):{prevItem:t,i:a}:null},getItemClass(e,r){return["p-tabmenuitem",e.class,{"p-highlight":this.d_activeIndex===r,"p-disabled":this.disabled(e)}]},getRouteItemClass(e,r,a){return["p-tabmenuitem",e.class,{"p-highlight":this.exact?a:r,"p-disabled":this.disabled(e)}]},getItemIcon(e){return["p-menuitem-icon",e.icon]},visible(e){return typeof e.visible=="function"?e.visible():e.visible!==!1},disabled(e){return typeof e.disabled=="function"?e.disabled():e.disabled},label(e){return typeof e.label=="function"?e.label():e.label},setDefaultTabIndexes(e){setTimeout(()=>{e.forEach(r=>{r.tabIndex=u.hasClass(r.parentElement,"p-highlight")?"0":"-1"})},300)},setTabIndex(e){return this.d_activeIndex===e?"0":"-1"},updateInkBar(){let e=this.$refs.nav.children,r=!1;for(let a=0;a<e.length;a++){let t=e[a];u.hasClass(t,"p-highlight")&&(this.$refs.inkbar.style.width=u.getWidth(t)+"px",this.$refs.inkbar.style.left=u.getOffset(t).left-u.getOffset(this.$refs.nav).left+"px",r=!0)}r||(this.$refs.inkbar.style.width="0px",this.$refs.inkbar.style.left="0px")}},directives:{ripple:T}};const S={class:"p-tabmenu p-component"},R=["aria-labelledby","aria-label"],z=["href","aria-label","aria-disabled","tabindex","onClick","onKeydown"],A={class:"p-menuitem-text"},P=["onClick","onKeydown"],H=["href","target","aria-label","aria-disabled","tabindex"],j={class:"p-menuitem-text"},F={ref:"inkbar",role:"none",class:"p-tabmenu-ink-bar"};function O(e,r,a,t,s,l){const _=B("router-link"),y=D("ripple");return i(),o("div",S,[c("ul",{ref:"nav",class:"p-tabmenu-nav p-reset",role:"menubar","aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel},[(i(!0),o(k,null,E(a.model,(n,d)=>(i(),o(k,{key:l.label(n)+"_"+d.toString()},[n.to&&!l.disabled(n)?(i(),m(_,{key:0,to:n.to,custom:""},{default:N(({navigate:b,href:C,isActive:w,isExactActive:I})=>[l.visible(n)?(i(),o("li",{key:0,ref_for:!0,ref:"tab",class:f(l.getRouteItemClass(n,w,I)),style:K(n.style),role:"presentation"},[e.$slots.item?(i(),m(v(e.$slots.item),{key:1,item:n,index:d},null,8,["item","index"])):x((i(),o("a",{key:0,ref_for:!0,ref:"tabLink",role:"menuitem",href:C,class:"p-menuitem-link","aria-label":l.label(n),"aria-disabled":l.disabled(n),tabindex:I?"0":"-1",onClick:p=>l.onItemClick(p,n,d,b),onKeydown:p=>l.onKeydownItem(p,n,d,b)},[n.icon?(i(),o("span",{key:0,class:f(l.getItemIcon(n))},null,2)):h("",!0),c("span",A,g(l.label(n)),1)],40,z)),[[y]])],6)):h("",!0)]),_:2},1032,["to"])):l.visible(n)?(i(),o("li",{key:1,ref_for:!0,ref:"tab",class:f(l.getItemClass(n,d)),role:"presentation",onClick:b=>l.onItemClick(b,n,d),onKeydown:b=>l.onKeydownItem(b,n,d)},[e.$slots.item?(i(),m(v(e.$slots.item),{key:1,item:n,index:d},null,8,["item","index"])):x((i(),o("a",{key:0,ref_for:!0,ref:"tabLink",role:"menuitem",href:n.url,class:"p-menuitem-link",target:n.target,"aria-label":l.label(n),"aria-disabled":l.disabled(n),tabindex:l.setTabIndex(d)},[n.icon?(i(),o("span",{key:0,class:f(l.getItemIcon(n))},null,2)):h("",!0),c("span",j,g(l.label(n)),1)],8,H)),[[y]])],42,P)):h("",!0)],64))),128)),c("li",F,null,512)],8,R)])}function V(e,r){r===void 0&&(r={});var a=r.insertAt;if(!(!e||typeof document>"u")){var t=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css",a==="top"&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e))}}var $=`
.p-tabmenu {
    overflow-x: auto;
}
.p-tabmenu-nav {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    flex-wrap: nowrap;
}
.p-tabmenu-nav a {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    position: relative;
    text-decoration: none;
    text-decoration: none;
    overflow: hidden;
}
.p-tabmenu-nav a:focus {
    z-index: 1;
}
.p-tabmenu-nav .p-menuitem-text {
    line-height: 1;
}
.p-tabmenu-ink-bar {
    display: none;
    z-index: 1;
}
.p-tabmenu::-webkit-scrollbar {
    display: none;
}
`;V($);L.render=O;export{L as default};
