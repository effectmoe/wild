import{s as k}from"./portal.esm.f9c19ffd.js";import{R as S,o as i,b as c,k as l,F as b,n as m,t as g,g as h,r as T,m as w,H as I,l as E,a2 as r,Z as d,O as _,U as B,w as y,e as A,G as P,a1 as L,j as G,K as v}from"./entry.a8bdde5b.js";var x={name:"ToastMessage",emits:["close"],props:{message:{type:null,default:null},template:{type:null,default:null},closeIcon:{type:String,default:null},infoIcon:{type:String,default:null},warnIcon:{type:String,default:null},errorIcon:{type:String,default:null},successIcon:{type:String,default:null},closeButtonProps:{type:null,default:null}},closeTimeout:null,mounted(){this.message.life&&(this.closeTimeout=setTimeout(()=>{this.close({message:this.message,type:"life-end"})},this.message.life))},beforeUnmount(){this.clearCloseTimeout()},methods:{close(t){this.$emit("close",t)},onCloseClick(){this.clearCloseTimeout(),this.close({message:this.message,type:"close"})},clearCloseTimeout(){this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null)}},computed:{containerClass(){return["p-toast-message",this.message.styleClass,{"p-toast-message-info":this.message.severity==="info","p-toast-message-warn":this.message.severity==="warn","p-toast-message-error":this.message.severity==="error","p-toast-message-success":this.message.severity==="success"}]},iconClass(){return["p-toast-message-icon",{[this.infoIcon]:this.message.severity==="info",[this.warnIcon]:this.message.severity==="warn",[this.errorIcon]:this.message.severity==="error",[this.successIcon]:this.message.severity==="success"}]},closeAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},directives:{ripple:S}};const R={class:"p-toast-message-text"},Z={class:"p-toast-summary"},M={class:"p-toast-detail"},N={key:2},U=["aria-label"];function j(t,s,e,n,o,a){const p=G("ripple");return i(),c("div",{class:m(a.containerClass),role:"alert","aria-live":"assertive","aria-atomic":"true"},[l("div",{class:m(["p-toast-message-content",e.message.contentStyleClass])},[e.template?(i(),h(T(e.template),{key:1,message:e.message},null,8,["message"])):(i(),c(b,{key:0},[l("span",{class:m(a.iconClass)},null,2),l("div",R,[l("span",Z,g(e.message.summary),1),l("div",M,g(e.message.detail),1)])],64)),e.message.closable!==!1?(i(),c("div",N,[w((i(),c("button",I({class:"p-toast-icon-close p-link",type:"button","aria-label":a.closeAriaLabel,onClick:s[0]||(s[0]=(...u)=>a.onCloseClick&&a.onCloseClick(...u)),autofocus:""},e.closeButtonProps),[l("span",{class:m(["p-toast-icon-close-icon",e.closeIcon])},null,2)],16,U)),[[p]])])):E("",!0)],2)],2)}x.render=j;var z=0,D={name:"Toast",inheritAttrs:!1,emits:["close","life-end"],props:{group:{type:String,default:null},position:{type:String,default:"top-right"},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},breakpoints:{type:Object,default:null},closeIcon:{type:String,default:"pi pi-times"},infoIcon:{type:String,default:"pi pi-info-circle"},warnIcon:{type:String,default:"pi pi-exclamation-triangle"},errorIcon:{type:String,default:"pi pi-times"},successIcon:{type:String,default:"pi pi-check"},closeButtonProps:{type:null,default:null}},data(){return{messages:[]}},styleElement:null,mounted(){r.on("add",this.onAdd),r.on("remove-group",this.onRemoveGroup),r.on("remove-all-groups",this.onRemoveAllGroups),this.breakpoints&&this.createStyle()},beforeUnmount(){this.destroyStyle(),this.$refs.container&&this.autoZIndex&&d.clear(this.$refs.container),r.off("add",this.onAdd),r.off("remove-group",this.onRemoveGroup),r.off("remove-all-groups",this.onRemoveAllGroups)},methods:{add(t){t.id==null&&(t.id=z++),this.messages=[...this.messages,t]},remove(t){let s=-1;for(let e=0;e<this.messages.length;e++)if(this.messages[e]===t.message){s=e;break}this.messages.splice(s,1),this.$emit(t.type,{message:t.message})},onAdd(t){this.group==t.group&&this.add(t)},onRemoveGroup(t){this.group===t&&(this.messages=[])},onRemoveAllGroups(){this.messages=[]},onEnter(){this.$refs.container.setAttribute(this.attributeSelector,""),this.autoZIndex&&d.set("modal",this.$refs.container,this.baseZIndex||this.$primevue.config.zIndex.modal)},onLeave(){this.$refs.container&&this.autoZIndex&&_.isEmpty(this.messages)&&setTimeout(()=>{d.clear(this.$refs.container)},200)},createStyle(){if(!this.styleElement){this.styleElement=document.createElement("style"),this.styleElement.type="text/css",document.head.appendChild(this.styleElement);let t="";for(let s in this.breakpoints){let e="";for(let n in this.breakpoints[s])e+=n+":"+this.breakpoints[s][n]+"!important;";t+=`
                        @media screen and (max-width: ${s}) {
                            .p-toast[${this.attributeSelector}] {
                                ${e}
                            }
                        }
                    `}this.styleElement.innerHTML=t}},destroyStyle(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)}},computed:{containerClass(){return["p-toast p-component p-toast-"+this.position,{"p-input-filled":this.$primevue.config.inputStyle==="filled","p-ripple-disabled":this.$primevue.config.ripple===!1}]},attributeSelector(){return B()}},components:{ToastMessage:x,Portal:k}};function $(t,s,e,n,o,a){const p=v("ToastMessage"),u=v("Portal");return i(),h(u,null,{default:y(()=>[l("div",I({ref:"container",class:a.containerClass},t.$attrs),[A(L,{name:"p-toast-message",tag:"div",onEnter:a.onEnter,onLeave:a.onLeave},{default:y(()=>[(i(!0),c(b,null,P(o.messages,f=>(i(),h(p,{key:f.id,message:f,template:t.$slots.message,closeIcon:e.closeIcon,infoIcon:e.infoIcon,warnIcon:e.warnIcon,errorIcon:e.errorIcon,successIcon:e.successIcon,closeButtonProps:e.closeButtonProps,onClose:s[0]||(s[0]=C=>a.remove(C))},null,8,["message","template","closeIcon","infoIcon","warnIcon","errorIcon","successIcon","closeButtonProps"]))),128))]),_:1},8,["onEnter","onLeave"])],16)]),_:1})}function H(t,s){s===void 0&&(s={});var e=s.insertAt;if(!(!t||typeof document>"u")){var n=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css",e==="top"&&n.firstChild?n.insertBefore(o,n.firstChild):n.appendChild(o),o.styleSheet?o.styleSheet.cssText=t:o.appendChild(document.createTextNode(t))}}var O=`
.p-toast {
    position: fixed;
    width: 25rem;
}
.p-toast-message-content {
    display: flex;
    align-items: flex-start;
}
.p-toast-message-text {
    flex: 1 1 auto;
}
.p-toast-top-right {
    top: 20px;
    right: 20px;
}
.p-toast-top-left {
    top: 20px;
    left: 20px;
}
.p-toast-bottom-left {
    bottom: 20px;
    left: 20px;
}
.p-toast-bottom-right {
    bottom: 20px;
    right: 20px;
}
.p-toast-top-center {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
}
.p-toast-bottom-center {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
.p-toast-center {
    left: 50%;
    top: 50%;
    min-width: 20vw;
    transform: translate(-50%, -50%);
}
.p-toast-icon-close {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
}
.p-toast-icon-close.p-link {
    cursor: pointer;
}

/* Animations */
.p-toast-message-enter-from {
    opacity: 0;
    -webkit-transform: translateY(50%);
    -ms-transform: translateY(50%);
    transform: translateY(50%);
}
.p-toast-message-leave-from {
    max-height: 1000px;
}
.p-toast .p-toast-message.p-toast-message-leave-to {
    max-height: 0;
    opacity: 0;
    margin-bottom: 0;
    overflow: hidden;
}
.p-toast-message-enter-active {
    -webkit-transition: transform 0.3s, opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s;
}
.p-toast-message-leave-active {
    -webkit-transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;
}
`;H(O);D.render=$;export{D as default};
