import{R as d,j as u,o,g as f,w as h,m as c,k as n,n as r,q as g,b as v,H as y,l as b,I as x,T as C}from"./entry.a8bdde5b.js";var k={name:"Message",emits:["close"],props:{severity:{type:String,default:"info"},closable:{type:Boolean,default:!0},sticky:{type:Boolean,default:!0},life:{type:Number,default:3e3},icon:{type:String,default:null},closeIcon:{type:String,default:"pi pi-times"},closeButtonProps:{type:null,default:null}},timeout:null,data(){return{visible:!0}},mounted(){this.sticky||this.x()},methods:{close(s){this.visible=!1,this.$emit("close",s)},x(){setTimeout(()=>{this.visible=!1},this.life)}},computed:{containerClass(){return"p-message p-component p-message-"+this.severity},iconClass(){return["p-message-icon pi",this.icon?this.icon:{"pi-info-circle":this.severity==="info","pi-check":this.severity==="success","pi-exclamation-triangle":this.severity==="warn","pi-times-circle":this.severity==="error"}]},closeAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},directives:{ripple:d}};const B={class:"p-message-wrapper"},w={class:"p-message-text"},_=["aria-label"];function S(s,t,a,i,e,l){const p=u("ripple");return o(),f(C,{name:"p-message",appear:""},{default:h(()=>[c(n("div",{class:r(l.containerClass),role:"alert","aria-live":"assertive","aria-atomic":"true"},[n("div",B,[n("span",{class:r(l.iconClass)},null,2),n("div",w,[g(s.$slots,"default")]),a.closable?c((o(),v("button",y({key:0,class:"p-message-close p-link","aria-label":l.closeAriaLabel,type:"button",onClick:t[0]||(t[0]=m=>l.close(m))},a.closeButtonProps),[n("i",{class:r(["p-message-close-icon",a.closeIcon])},null,2)],16,_)),[[p]]):b("",!0)])],2),[[x,e.visible]])]),_:3})}function T(s,t){t===void 0&&(t={});var a=t.insertAt;if(!(!s||typeof document>"u")){var i=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",a==="top"&&i.firstChild?i.insertBefore(e,i.firstChild):i.appendChild(e),e.styleSheet?e.styleSheet.cssText=s:e.appendChild(document.createTextNode(s))}}var N=`
.p-message-wrapper {
    display: flex;
    align-items: center;
}
.p-message-close {
    display: flex;
    align-items: center;
    justify-content: center;
}
.p-message-close.p-link {
    margin-left: auto;
    overflow: hidden;
    position: relative;
}
.p-message-enter-from {
    opacity: 0;
}
.p-message-enter-active {
    transition: opacity 0.3s;
}
.p-message.p-message-leave-from {
    max-height: 1000px;
}
.p-message.p-message-leave-to {
    max-height: 0;
    opacity: 0;
    margin: 0 !important;
}
.p-message-leave-active {
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin 0.15s;
}
.p-message-leave-active .p-message-close {
    display: none;
}
`;T(N);k.render=S;export{k as default};
