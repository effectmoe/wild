import k from"./button.esm.4087d562.js";import{U as g,E as a,R as x,$ as C,K as D,j as y,o as c,b as p,k as I,q as O,e as S,n as u,F as f,G as A,p as m,m as N,l as b,g as E,r as L}from"./entry.a8bdde5b.js";var B={name:"SpeedDial",emits:["click","show","hide","focus","blur"],props:{model:null,visible:{type:Boolean,default:!1},direction:{type:String,default:"up"},transitionDelay:{type:Number,default:30},type:{type:String,default:"linear"},radius:{type:Number,default:0},mask:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},hideOnClickOutside:{type:Boolean,default:!0},buttonClass:null,maskStyle:null,maskClass:null,showIcon:{type:String,default:"pi pi-plus"},hideIcon:null,rotateAnimation:{type:Boolean,default:!0},tooltipOptions:null,style:null,class:null,"aria-labelledby":{type:String,default:null},"aria-label":{type:String,default:null}},documentClickListener:null,container:null,list:null,data(){return{id:this.$attrs.id,d_visible:this.visible,isItemClicked:!1,focused:!1,focusedOptionIndex:-1}},watch:{"$attrs.id":function(e){this.id=e||g()},visible(e){this.d_visible=e}},mounted(){if(this.id=this.id||g(),this.type!=="linear"){const e=a.findSingle(this.container,".p-speeddial-button"),t=a.findSingle(this.list,".p-speeddial-item");if(e&&t){const n=Math.abs(e.offsetWidth-t.offsetWidth),l=Math.abs(e.offsetHeight-t.offsetHeight);this.list.style.setProperty("--item-diff-x",`${n/2}px`),this.list.style.setProperty("--item-diff-y",`${l/2}px`)}}this.hideOnClickOutside&&this.bindDocumentClickListener()},beforeMount(){this.unbindDocumentClickListener()},methods:{onFocus(e){this.focused=!0,this.$emit("focus",e)},onBlur(e){this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",e)},onItemClick(e,t){t.command&&t.command({originalEvent:e,item:t}),this.hide(),this.isItemClicked=!0,e.preventDefault()},onClick(e){this.d_visible?this.hide():this.show(),this.isItemClicked=!0,this.$emit("click",e)},show(){this.d_visible=!0,this.$emit("show")},hide(){this.d_visible=!1,this.$emit("hide")},calculateTransitionDelay(e){const t=this.model.length;return(this.d_visible?e:t-e-1)*this.transitionDelay},onTogglerKeydown(e){switch(e.code){case"ArrowDown":case"ArrowLeft":this.onTogglerArrowDown(e);break;case"ArrowUp":case"ArrowRight":this.onTogglerArrowUp(e);break;case"Escape":this.onEscapeKey();break}},onKeyDown(e){switch(e.code){case"ArrowDown":this.onArrowDown(e);break;case"ArrowUp":this.onArrowUp(e);break;case"ArrowLeft":this.onArrowLeft(e);break;case"ArrowRight":this.onArrowRight(e);break;case"Enter":case"Space":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break}},onTogglerArrowUp(e){this.focused=!0,a.focus(this.list),this.show(),this.navigatePrevItem(e),e.preventDefault()},onTogglerArrowDown(e){this.focused=!0,a.focus(this.list),this.show(),this.navigateNextItem(e),e.preventDefault()},onEnterKey(e){const n=[...a.find(this.container,".p-speeddial-item")].findIndex(i=>i.id===this.focusedOptionIndex);this.onItemClick(e,this.model[n]),this.onBlur(e);const l=a.findSingle(this.container,"button");l&&a.focus(l)},onEscapeKey(){this.hide();const e=a.findSingle(this.container,"button");e&&a.focus(e)},onArrowUp(e){this.direction==="up"?this.navigateNextItem(e):this.direction==="down"?this.navigatePrevItem(e):this.navigateNextItem(e)},onArrowDown(e){this.direction==="up"?this.navigatePrevItem(e):this.direction==="down"?this.navigateNextItem(e):this.navigatePrevItem(e)},onArrowLeft(e){const t=["left","up-right","down-left"],n=["right","up-left","down-right"];t.includes(this.direction)?this.navigateNextItem(e):n.includes(this.direction)?this.navigatePrevItem(e):this.navigatePrevItem(e)},onArrowRight(e){const t=["left","up-right","down-left"],n=["right","up-left","down-right"];t.includes(this.direction)?this.navigatePrevItem(e):n.includes(this.direction)?this.navigateNextItem(e):this.navigateNextItem(e)},onEndKey(e){e.preventDefault(),this.focusedOptionIndex=-1,this.navigatePrevItem(e)},onHomeKey(e){e.preventDefault(),this.focusedOptionIndex=-1,this.navigateNextItem(e)},navigateNextItem(e){const t=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t),e.preventDefault()},navigatePrevItem(e){const t=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t),e.preventDefault()},changeFocusedOptionIndex(e){const n=[...a.find(this.container,".p-speeddial-item")].filter(l=>!a.hasClass(a.findSingle(l,"a"),"p-disabled"));n[e]&&(this.focusedOptionIndex=n[e].getAttribute("id"))},findPrevOptionIndex(e){const n=[...a.find(this.container,".p-speeddial-item")].filter(s=>!a.hasClass(a.findSingle(s,"a"),"p-disabled")),l=e===-1?n[n.length-1].id:e;let i=n.findIndex(s=>s.getAttribute("id")===l);return i=e===-1?n.length-1:i-1,i},findNextOptionIndex(e){const n=[...a.find(this.container,".p-speeddial-item")].filter(s=>!a.hasClass(a.findSingle(s,"a"),"p-disabled")),l=e===-1?n[0].id:e;let i=n.findIndex(s=>s.getAttribute("id")===l);return i=e===-1?0:i+1,i},calculatePointStyle(e){const t=this.type;if(t!=="linear"){const n=this.model.length,l=this.radius||n*20;if(t==="circle"){const i=2*Math.PI/n;return{left:`calc(${l*Math.cos(i*e)}px + var(--item-diff-x, 0px))`,top:`calc(${l*Math.sin(i*e)}px + var(--item-diff-y, 0px))`}}else if(t==="semi-circle"){const i=this.direction,s=Math.PI/(n-1),r=`calc(${l*Math.cos(s*e)}px + var(--item-diff-x, 0px))`,d=`calc(${l*Math.sin(s*e)}px + var(--item-diff-y, 0px))`;if(i==="up")return{left:r,bottom:d};if(i==="down")return{left:r,top:d};if(i==="left")return{right:d,top:r};if(i==="right")return{left:d,top:r}}else if(t==="quarter-circle"){const i=this.direction,s=Math.PI/(2*(n-1)),r=`calc(${l*Math.cos(s*e)}px + var(--item-diff-x, 0px))`,d=`calc(${l*Math.sin(s*e)}px + var(--item-diff-y, 0px))`;if(i==="up-left")return{right:r,bottom:d};if(i==="up-right")return{left:r,bottom:d};if(i==="down-left")return{right:d,top:r};if(i==="down-right")return{left:d,top:r}}}return{}},getItemStyle(e){const t=this.calculateTransitionDelay(e),n=this.calculatePointStyle(e);return{transitionDelay:`${t}ms`,...n}},bindDocumentClickListener(){this.documentClickListener||(this.documentClickListener=e=>{this.d_visible&&this.isOutsideClicked(e)&&this.hide(),this.isItemClicked=!1},document.addEventListener("click",this.documentClickListener))},unbindDocumentClickListener(){this.documentClickListener&&(document.removeEventListener("click",this.documentClickListener),this.documentClickListener=null)},isOutsideClicked(e){return this.container&&!(this.container.isSameNode(e.target)||this.container.contains(e.target)||this.isItemClicked)},isItemVisible(e){return typeof e.visible=="function"?e.visible():e.visible!==!1},containerRef(e){this.container=e},listRef(e){this.list=e},itemClass(e){return[{"p-focus":e===this.focusedOptionId}]}},computed:{containerClass(){return[`p-speeddial p-component p-speeddial-${this.type}`,{[`p-speeddial-direction-${this.direction}`]:this.type!=="circle","p-speeddial-opened":this.d_visible,"p-disabled":this.disabled},this.class]},buttonClassName(){return["p-speeddial-button p-button-rounded",{"p-speeddial-rotate":this.rotateAnimation&&!this.hideIcon},this.buttonClass]},iconClassName(){return this.d_visible&&this.hideIcon?this.hideIcon:this.showIcon},maskClassName(){return["p-speeddial-mask",{"p-speeddial-mask-visible":this.d_visible},this.maskClass]},focusedOptionId(){return this.focusedOptionIndex!==-1?this.focusedOptionIndex:null}},components:{SDButton:k},directives:{ripple:x,tooltip:C}};const K=["id","aria-activedescendant"],P=["id","aria-controls"],_=["href","target","onClick","aria-label"];function M(e,t,n,l,i,s){const r=D("SDButton"),d=y("tooltip"),v=y("ripple");return c(),p(f,null,[I("div",{ref:s.containerRef,class:u(s.containerClass),style:m(n.style)},[O(e.$slots,"button",{toggle:s.onClick},()=>[S(r,{type:"button",class:u(s.buttonClassName),icon:s.iconClassName,onClick:t[0]||(t[0]=o=>s.onClick(o)),disabled:n.disabled,onKeydown:s.onTogglerKeydown,"aria-expanded":i.d_visible,"aria-haspopup":!0,"aria-controls":i.id+"_list","aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby},null,8,["class","icon","disabled","onKeydown","aria-expanded","aria-controls","aria-label","aria-labelledby"])]),I("ul",{ref:s.listRef,id:i.id+"_list",class:"p-speeddial-list",role:"menu",onFocus:t[1]||(t[1]=(...o)=>s.onFocus&&s.onFocus(...o)),onBlur:t[2]||(t[2]=(...o)=>s.onBlur&&s.onBlur(...o)),onKeydown:t[3]||(t[3]=(...o)=>s.onKeyDown&&s.onKeyDown(...o)),"aria-activedescendant":i.focused?s.focusedOptionId:void 0,tabindex:"-1"},[(c(!0),p(f,null,A(n.model,(o,h)=>(c(),p(f,{key:h},[s.isItemVisible(o)?(c(),p("li",{key:0,id:`${i.id}_${h}`,"aria-controls":`${i.id}_item`,class:u(["p-speeddial-item",s.itemClass(`${i.id}_${h}`)]),style:m(s.getItemStyle(h)),role:"menuitem"},[e.$slots.item?(c(),E(L(e.$slots.item),{key:1,item:o},null,8,["item"])):N((c(),p("a",{key:0,tabindex:-1,href:o.url||"#",role:"menuitem",class:u(["p-speeddial-action",{"p-disabled":o.disabled}]),target:o.target,onClick:w=>s.onItemClick(w,o),"aria-label":o.label},[o.icon?(c(),p("span",{key:0,class:u(["p-speeddial-action-icon",o.icon])},null,2)):b("",!0)],10,_)),[[d,{value:o.label,disabled:!n.tooltipOptions},n.tooltipOptions],[v]])],14,P)):b("",!0)],64))),128))],40,K)],6),n.mask?(c(),p("div",{key:0,class:u(s.maskClassName),style:m(n.maskStyle)},null,6)):b("",!0)],64)}function T(e,t){t===void 0&&(t={});var n=t.insertAt;if(!(!e||typeof document>"u")){var l=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css",n==="top"&&l.firstChild?l.insertBefore(i,l.firstChild):l.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}var R=`
.p-speeddial {
    position: absolute;
    display: flex;
}
.p-speeddial-button {
    z-index: 1;
}
.p-speeddial-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: top 0s linear 0.2s;
    pointer-events: none;
    z-index: 2;
}
.p-speeddial-item {
    transform: scale(0);
    opacity: 0;
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.8s;
    will-change: transform;
}
.p-speeddial-action {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
}
.p-speeddial-circle .p-speeddial-item,
.p-speeddial-semi-circle .p-speeddial-item,
.p-speeddial-quarter-circle .p-speeddial-item {
    position: absolute;
}
.p-speeddial-rotate {
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    will-change: transform;
}
.p-speeddial-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.p-speeddial-mask-visible {
    pointer-events: none;
    opacity: 1;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.p-speeddial-opened .p-speeddial-list {
    pointer-events: auto;
}
.p-speeddial-opened .p-speeddial-item {
    transform: scale(1);
    opacity: 1;
}
.p-speeddial-opened .p-speeddial-rotate {
    transform: rotate(45deg);
}

/* Direction */
.p-speeddial-direction-up {
    align-items: center;
    flex-direction: column-reverse;
}
.p-speeddial-direction-up .p-speeddial-list {
    flex-direction: column-reverse;
}
.p-speeddial-direction-down {
    align-items: center;
    flex-direction: column;
}
.p-speeddial-direction-down .p-speeddial-list {
    flex-direction: column;
}
.p-speeddial-direction-left {
    justify-content: center;
    flex-direction: row-reverse;
}
.p-speeddial-direction-left .p-speeddial-list {
    flex-direction: row-reverse;
}
.p-speeddial-direction-right {
    justify-content: center;
    flex-direction: row;
}
.p-speeddial-direction-right .p-speeddial-list {
    flex-direction: row;
}
`;T(R);B.render=M;export{B as default};
