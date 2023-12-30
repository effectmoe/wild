import f from"./button.esm.4087d562.js";import{F as m}from"./focustrap.esm.aedfac9b.js";import{K as y,j as v,m as h,o as s,b as c,H as p,Q as b,q as r,g as C,l as B,n as k}from"./entry.a8bdde5b.js";var _={name:"Inplace",emits:["open","close","update:active"],props:{closable:{type:Boolean,default:!1},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},closeIcon:{type:String,default:"pi pi-times"},displayProps:{type:null,default:null},closeButtonProps:{type:null,default:null}},data(){return{d_active:this.active}},watch:{active(e){this.d_active=e}},methods:{open(e){this.disabled||(this.$emit("open",e),this.d_active=!0,this.$emit("update:active",!0))},close(e){this.$emit("close",e),this.d_active=!1,this.$emit("update:active",!1),setTimeout(()=>{this.$refs.display.focus()},0)}},computed:{containerClass(){return["p-inplace p-component",{"p-inplace-closable":this.closable}]},displayClass(){return["p-inplace-display",{"p-disabled":this.disabled}]},closeAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},components:{IPButton:f},directives:{focustrap:m}};const x=["tabindex"],P={key:1,class:"p-inplace-content"};function g(e,a,i,n,t,l){const d=y("IPButton"),u=v("focustrap");return h((s(),c("div",{class:k(l.containerClass),"aria-live":"polite"},[t.d_active?(s(),c("div",P,[r(e.$slots,"content"),i.closable?(s(),C(d,p({key:0,icon:i.closeIcon,"aria-label":l.closeAriaLabel,onClick:l.close},i.closeButtonProps),null,16,["icon","aria-label","onClick"])):B("",!0)])):(s(),c("div",p({key:0,ref:"display",class:l.displayClass,tabindex:e.$attrs.tabindex||"0",role:"button",onClick:a[0]||(a[0]=(...o)=>l.open&&l.open(...o)),onKeydown:a[1]||(a[1]=b((...o)=>l.open&&l.open(...o),["enter"]))},i.displayProps),[r(e.$slots,"display")],16,x))],2)),[[u]])}function I(e,a){a===void 0&&(a={});var i=a.insertAt;if(!(!e||typeof document>"u")){var n=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",i==="top"&&n.firstChild?n.insertBefore(t,n.firstChild):n.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}}var w=`
.p-inplace .p-inplace-display {
    display: inline;
    cursor: pointer;
}
.p-inplace .p-inplace-content {
    display: inline;
}
.p-fluid .p-inplace.p-inplace-closable .p-inplace-content {
    display: flex;
}
.p-fluid .p-inplace.p-inplace-closable .p-inplace-content > .p-inputtext {
    flex: 1 1 auto;
    width: 1%;
}
`;I(w);_.render=g;export{_ as default};
