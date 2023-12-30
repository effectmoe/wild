import{E as n,Z as l,o as a,b as d,q as c}from"./entry.a8bdde5b.js";var r={name:"BlockUI",emits:["block","unblock"],props:{blocked:{type:Boolean,default:!1},fullScreen:{type:Boolean,default:!1},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0}},mask:null,data(){return{isBlocked:!1}},watch:{blocked(e){e===!0?this.block():this.unblock()}},mounted(){this.blocked&&this.block()},methods:{block(){let e="p-blockui p-component-overlay p-component-overlay-enter";this.fullScreen?(e+=" p-blockui-document",this.mask=document.createElement("div"),this.mask.setAttribute("class",e),document.body.appendChild(this.mask),n.addClass(document.body,"p-overflow-hidden"),document.activeElement.blur()):(this.mask=document.createElement("div"),this.mask.setAttribute("class",e),this.$refs.container.appendChild(this.mask)),this.autoZIndex&&l.set("modal",this.mask,this.baseZIndex+this.$primevue.config.zIndex.modal),this.isBlocked=!0,this.$emit("block")},unblock(){n.addClass(this.mask,"p-component-overlay-leave"),this.mask.addEventListener("animationend",()=>{this.removeMask()})},removeMask(){l.clear(this.mask),this.fullScreen?(document.body.removeChild(this.mask),n.removeClass(document.body,"p-overflow-hidden")):this.$refs.container.removeChild(this.mask),this.isBlocked=!1,this.$emit("unblock")}}};const m=["aria-busy"];function u(e,s,i,o,t,k){return a(),d("div",{ref:"container",class:"p-blockui-container","aria-busy":t.isBlocked},[c(e.$slots,"default")],8,m)}function p(e,s){s===void 0&&(s={});var i=s.insertAt;if(!(!e||typeof document>"u")){var o=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",i==="top"&&o.firstChild?o.insertBefore(t,o.firstChild):o.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}}var h=`
.p-blockui-container {
    position: relative;
}
.p-blockui {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.p-blockui.p-component-overlay {
    position: absolute;
}
.p-blockui-document.p-component-overlay {
    position: fixed;
}
`;p(h);r.render=u;export{r as default};
