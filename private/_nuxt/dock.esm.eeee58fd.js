import{U as g,O as A,E as c,R as K,$ as _,K as O,j as x,o as l,b as d,k as I,F as v,G as E,n as u,g as p,w as B,m as f,r as k,e as F,p as M}from"./entry.a8bdde5b.js";var w={name:"DockSub",emits:["focus","blur"],props:{position:{type:String,default:"bottom"},model:{type:Array,default:null},templates:{type:null,default:null},exact:{type:Boolean,default:!0},tooltipOptions:null,menuId:{type:String,default:null},tabindex:{type:Number,default:0},"aria-label":{type:String,default:null},"aria-labelledby":{type:String,default:null}},data(){return{id:this.menuId,currentIndex:-3,focused:!1,focusedOptionIndex:-1}},watch:{menuId(e){this.id=e||g()}},mounted(){this.id=this.id||g()},methods:{getItemId(e){return`${this.id}_${e}`},getItemProp(e,n){return e&&e.item?A.getItemValue(e.item[n]):void 0},isSameMenuItem(e){return e.currentTarget&&(e.currentTarget.isSameNode(e.target)||e.currentTarget.isSameNode(e.target.closest(".p-menuitem")))},onListMouseLeave(){this.currentIndex=-3},onItemMouseEnter(e){this.currentIndex=e},onItemActionClick(e,n){n&&n(e)},onItemClick(e,n){if(this.isSameMenuItem(e)){const t=this.getItemProp(n,"command");t&&t({originalEvent:e,item:n.item})}},onListFocus(e){this.focused=!0,this.changeFocusedOptionIndex(0),this.$emit("focus",e)},onListBlur(e){this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",e)},onListKeyDown(e){switch(e.code){case"ArrowDown":{(this.position==="left"||this.position==="right")&&this.onArrowDownKey(),e.preventDefault();break}case"ArrowUp":{(this.position==="left"||this.position==="right")&&this.onArrowUpKey(),e.preventDefault();break}case"ArrowRight":{(this.position==="top"||this.position==="bottom")&&this.onArrowDownKey(),e.preventDefault();break}case"ArrowLeft":{(this.position==="top"||this.position==="bottom")&&this.onArrowUpKey(),e.preventDefault();break}case"Home":{this.onHomeKey(),e.preventDefault();break}case"End":{this.onEndKey(),e.preventDefault();break}case"Enter":case"Space":{this.onSpaceKey(e),e.preventDefault();break}}},onArrowDownKey(){const e=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e)},onArrowUpKey(){const e=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e)},onHomeKey(){this.changeFocusedOptionIndex(0)},onEndKey(){this.changeFocusedOptionIndex(c.find(this.$refs.list,"li.p-dock-item:not(.p-disabled)").length-1)},onSpaceKey(){const e=c.findSingle(this.$refs.list,`li[id="${`${this.focusedOptionIndex}`}"]`),n=e&&c.findSingle(e,".p-dock-link");n?n.click():e&&e.click()},findNextOptionIndex(e){const t=[...c.find(this.$refs.list,"li.p-dock-item:not(.p-disabled)")].findIndex(a=>a.id===e);return t>-1?t+1:0},findPrevOptionIndex(e){const t=[...c.find(this.$refs.list,"li.p-dock-item:not(.p-disabled)")].findIndex(a=>a.id===e);return t>-1?t-1:0},changeFocusedOptionIndex(e){const n=c.find(this.$refs.list,"li.p-dock-item:not(.p-disabled)");let t=e>=n.length?n.length-1:e<0?0:e;this.focusedOptionIndex=n[t].getAttribute("id")},itemClass(e,n,t){return["p-dock-item",{"p-focus":t===this.focusedOptionIndex,"p-disabled":this.disabled(e),"p-dock-item-second-prev":this.currentIndex-2===n,"p-dock-item-prev":this.currentIndex-1===n,"p-dock-item-current":this.currentIndex===n,"p-dock-item-next":this.currentIndex+1===n,"p-dock-item-second-next":this.currentIndex+2===n}]},linkClass(e){return["p-dock-link",{"router-link-active":e&&e.isActive,"router-link-active-exact":this.exact&&e&&e.isExactActive}]},disabled(e){return typeof e.disabled=="function"?e.disabled():e.disabled}},computed:{focusedOptionId(){return this.focusedOptionIndex!==-1?this.focusedOptionIndex:null}},directives:{ripple:K,tooltip:_}};const N={class:"p-dock-list-container"},z=["id","aria-orientation","aria-activedescendant","tabindex","aria-label","aria-labelledby"],T=["id","aria-label","aria-disabled","onClick","onMouseenter"],U={class:"p-menuitem-content"},j=["href","target","onClick"],H=["href","target"];function R(e,n,t,a,s,o){const h=O("router-link"),b=x("ripple"),y=x("tooltip");return l(),d("div",N,[I("ul",{ref:"list",id:s.id,class:"p-dock-list",role:"menu","aria-orientation":t.position==="bottom"||t.position==="top"?"horizontal":"vertical","aria-activedescendant":s.focused?o.focusedOptionId:void 0,tabindex:t.tabindex,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,onFocus:n[0]||(n[0]=(...i)=>o.onListFocus&&o.onListFocus(...i)),onBlur:n[1]||(n[1]=(...i)=>o.onListBlur&&o.onListBlur(...i)),onKeydown:n[2]||(n[2]=(...i)=>o.onListKeyDown&&o.onListKeyDown(...i)),onMouseleave:n[3]||(n[3]=(...i)=>o.onListMouseLeave&&o.onListMouseLeave(...i))},[(l(!0),d(v,null,E(t.model,(i,r)=>(l(),d("li",{key:r,id:o.getItemId(r),class:u(o.itemClass(i,r,o.getItemId(r))),role:"menuitem","aria-label":i.label,"aria-disabled":o.disabled(i),onClick:m=>o.onItemClick(m,i),onMouseenter:m=>o.onItemMouseEnter(r)},[I("div",U,[t.templates.item?(l(),p(k(t.templates.item),{key:1,item:i,index:r},null,8,["item","index"])):(l(),d(v,{key:0},[i.to&&!o.disabled(i)?(l(),p(h,{key:0,to:i.to,custom:""},{default:B(({navigate:m,href:C,isActive:S,isExactActive:D})=>[f((l(),d("a",{href:C,class:u(o.linkClass({isActive:S,isExactActive:D})),target:i.target,tabindex:"-1","aria-hidden":"true",onClick:L=>o.onItemActionClick(L,i,m)},[t.templates.icon?(l(),p(k(t.templates.icon),{key:1,item:i},null,8,["item"])):f((l(),d("span",{key:0,class:u(["p-dock-icon",i.icon])},null,2)),[[b]])],10,j)),[[y,{value:i.label,disabled:!t.tooltipOptions},t.tooltipOptions]])]),_:2},1032,["to"])):f((l(),d("a",{key:1,href:i.url,class:u(o.linkClass()),target:i.target,tabindex:"-1","aria-hidden":"true"},[t.templates.icon?(l(),p(k(t.templates.icon),{key:1,item:i},null,8,["item"])):f((l(),d("span",{key:0,class:u(["p-dock-icon",i.icon])},null,2)),[[b]])],10,H)),[[y,{value:i.label,disabled:!t.tooltipOptions},t.tooltipOptions]])],64))])],42,T))),128))],40,z)])}w.render=R;var V={name:"Dock",props:{position:{type:String,default:"bottom"},model:null,class:null,style:null,tooltipOptions:null,exact:{type:Boolean,default:!0},menuId:{type:String,default:null},tabindex:{type:Number,default:0},"aria-label":{type:String,default:null},"aria-labelledby":{type:String,default:null}},computed:{containerClass(){return["p-dock p-component",`p-dock-${this.position}`,this.class]}},components:{DockSub:w}};function P(e,n,t,a,s,o){const h=O("DockSub");return l(),d("div",{class:u(o.containerClass),style:M(t.style)},[F(h,{model:t.model,templates:e.$slots,exact:t.exact,tooltipOptions:t.tooltipOptions,position:t.position,menuId:t.menuId,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,tabindex:t.tabindex},null,8,["model","templates","exact","tooltipOptions","position","menuId","aria-label","aria-labelledby","tabindex"])],6)}function q(e,n){n===void 0&&(n={});var t=n.insertAt;if(!(!e||typeof document>"u")){var a=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css",t==="top"&&a.firstChild?a.insertBefore(s,a.firstChild):a.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e))}}var G=`
.p-dock {
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
}
.p-dock-list-container {
    display: flex;
    pointer-events: auto;
}
.p-dock-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
.p-dock-item {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
}
.p-dock-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    cursor: default;
}
.p-dock-item-second-prev,
.p-dock-item-second-next {
    transform: scale(1.2);
}
.p-dock-item-prev,
.p-dock-item-next {
    transform: scale(1.4);
}
.p-dock-item-current {
    transform: scale(1.6);
    z-index: 1;
}

/* Position */
/* top */
.p-dock-top {
    left: 0;
    top: 0;
    width: 100%;
}
.p-dock-top .p-dock-item {
    transform-origin: center top;
}

/* bottom */
.p-dock-bottom {
    left: 0;
    bottom: 0;
    width: 100%;
}
.p-dock-bottom .p-dock-item {
    transform-origin: center bottom;
}

/* right */
.p-dock-right {
    right: 0;
    top: 0;
    height: 100%;
}
.p-dock-right .p-dock-item {
    transform-origin: center right;
}
.p-dock-right .p-dock-list {
    flex-direction: column;
}

/* left */
.p-dock-left {
    left: 0;
    top: 0;
    height: 100%;
}
.p-dock-left .p-dock-item {
    transform-origin: center left;
}
.p-dock-left .p-dock-list {
    flex-direction: column;
}
`;q(G);V.render=P;export{V as default};
