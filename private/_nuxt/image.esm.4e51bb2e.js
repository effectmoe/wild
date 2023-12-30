import{F as y}from"./focustrap.esm.aedfac9b.js";import{s as C}from"./portal.esm.f9c19ffd.js";import{Z as u,E as f,K as L,j as z,o as c,b as m,k as n,H as v,q as o,n as p,l as d,e as h,w as g,m as B,T as I,p as k}from"./entry.a8bdde5b.js";var A={name:"Image",inheritAttrs:!1,emits:["show","hide","error"],props:{preview:{type:Boolean,default:!1},class:{type:null,default:null},style:{type:null,default:null},imageStyle:{type:null,default:null},imageClass:{type:null,default:null},previewButtonProps:{type:null,default:null},indicatorIcon:{type:String,default:"pi pi-eye"}},mask:null,data(){return{maskVisible:!1,previewVisible:!1,rotate:0,scale:1}},beforeUnmount(){this.mask&&u.clear(this.container)},methods:{maskRef(i){this.mask=i},toolbarRef(i){this.toolbarRef=i},onImageClick(){this.preview&&(this.maskVisible=!0,setTimeout(()=>{this.previewVisible=!0},25))},onPreviewImageClick(){this.previewClick=!0},onMaskClick(){this.previewClick||(this.previewVisible=!1,this.rotate=0,this.scale=1),this.previewClick=!1},onMaskKeydown(i){switch(i.code){case"Escape":this.onMaskClick(),setTimeout(()=>{f.focus(this.$refs.previewButton)},25),i.preventDefault();break}},onError(){this.$emit("error")},rotateRight(){this.rotate+=90,this.previewClick=!0},rotateLeft(){this.rotate-=90,this.previewClick=!0},zoomIn(){this.scale=this.scale+.1,this.previewClick=!0},zoomOut(){this.scale=this.scale-.1,this.previewClick=!0},onBeforeEnter(){u.set("modal",this.mask,this.$primevue.config.zIndex.modal)},onEnter(){this.focus(),this.$emit("show")},onBeforeLeave(){f.addClass(this.mask,"p-component-overlay-leave")},onLeave(){this.$emit("hide")},onAfterLeave(i){u.clear(i),this.maskVisible=!1},focus(){let i=this.mask.querySelector("[autofocus]");i&&i.focus()}},computed:{containerClass(){return["p-image p-component",this.class,{"p-image-preview-container":this.preview}]},maskClass(){return["p-image-mask p-component-overlay p-component-overlay-enter"]},rotateClass(){return"p-image-preview-rotate-"+this.rotate},imagePreviewStyle(){return{transform:"rotate("+this.rotate+"deg) scale("+this.scale+")"}},zoomDisabled(){return this.scale<=.5||this.scale>=1.5},rightAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.rotateRight:void 0},leftAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.rotateLeft:void 0},zoomInAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.zoomIn:void 0},zoomOutAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.zoomOut:void 0},closeAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},components:{Portal:C},directives:{focustrap:y}};const E=["aria-modal"],P={class:"p-image-toolbar"},V=["aria-label"],S=n("i",{class:"pi pi-refresh"},null,-1),T=["aria-label"],R=n("i",{class:"pi pi-undo"},null,-1),D=["disabled","aria-label"],M=n("i",{class:"pi pi-search-minus"},null,-1),_=["disabled","aria-label"],O=n("i",{class:"pi pi-search-plus"},null,-1),j=["aria-label"],K=n("i",{class:"pi pi-times"},null,-1),N={key:0},x=["src"];function q(i,t,s,l,r,e){const b=L("Portal"),w=z("focustrap");return c(),m("span",{class:p(e.containerClass),style:k(s.style)},[n("img",v(i.$attrs,{style:s.imageStyle,class:s.imageClass,onError:t[0]||(t[0]=(...a)=>e.onError&&e.onError(...a))}),null,16),s.preview?(c(),m("button",v({key:0,ref:"previewButton",class:"p-image-preview-indicator",onClick:t[1]||(t[1]=(...a)=>e.onImageClick&&e.onImageClick(...a))},s.previewButtonProps),[o(i.$slots,"indicator",{},()=>[n("i",{class:p(["p-image-preview-icon",s.indicatorIcon])},null,2)])],16)):d("",!0),h(b,null,{default:g(()=>[r.maskVisible?B((c(),m("div",{key:0,ref:e.maskRef,role:"dialog",class:p(e.maskClass),"aria-modal":r.maskVisible,onClick:t[8]||(t[8]=(...a)=>e.onMaskClick&&e.onMaskClick(...a)),onKeydown:t[9]||(t[9]=(...a)=>e.onMaskKeydown&&e.onMaskKeydown(...a))},[n("div",P,[n("button",{class:"p-image-action p-link",onClick:t[2]||(t[2]=(...a)=>e.rotateRight&&e.rotateRight(...a)),type:"button","aria-label":e.rightAriaLabel},[o(i.$slots,"refresh",{},()=>[S])],8,V),n("button",{class:"p-image-action p-link",onClick:t[3]||(t[3]=(...a)=>e.rotateLeft&&e.rotateLeft(...a)),type:"button","aria-label":e.leftAriaLabel},[o(i.$slots,"undo",{},()=>[R])],8,T),n("button",{class:"p-image-action p-link",onClick:t[4]||(t[4]=(...a)=>e.zoomOut&&e.zoomOut(...a)),type:"button",disabled:e.zoomDisabled,"aria-label":e.zoomOutAriaLabel},[o(i.$slots,"zoomout",{},()=>[M])],8,D),n("button",{class:"p-image-action p-link",onClick:t[5]||(t[5]=(...a)=>e.zoomIn&&e.zoomIn(...a)),type:"button",disabled:e.zoomDisabled,"aria-label":e.zoomInAriaLabel},[o(i.$slots,"zoomin",{},()=>[O])],8,_),n("button",{class:"p-image-action p-link",type:"button",onClick:t[6]||(t[6]=(...a)=>i.hidePreview&&i.hidePreview(...a)),"aria-label":e.closeAriaLabel,autofocus:""},[o(i.$slots,"close",{},()=>[K])],8,j)]),h(I,{name:"p-image-preview",onBeforeEnter:e.onBeforeEnter,onEnter:e.onEnter,onLeave:e.onLeave,onBeforeLeave:e.onBeforeLeave,onAfterLeave:e.onAfterLeave},{default:g(()=>[r.previewVisible?(c(),m("div",N,[n("img",{src:i.$attrs.src,class:"p-image-preview",style:k(e.imagePreviewStyle),onClick:t[7]||(t[7]=(...a)=>e.onPreviewImageClick&&e.onPreviewImageClick(...a))},null,12,x)])):d("",!0)]),_:1},8,["onBeforeEnter","onEnter","onLeave","onBeforeLeave","onAfterLeave"])],42,E)),[[w]]):d("",!0)]),_:3})],6)}function F(i,t){t===void 0&&(t={});var s=t.insertAt;if(!(!i||typeof document>"u")){var l=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",s==="top"&&l.firstChild?l.insertBefore(r,l.firstChild):l.appendChild(r),r.styleSheet?r.styleSheet.cssText=i:r.appendChild(document.createTextNode(i))}}var H=`
.p-image-mask {
    display: flex;
    align-items: center;
    justify-content: center;
}
.p-image-preview-container {
    position: relative;
    display: inline-block;
}
.p-image-preview-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
}
.p-image-preview-icon {
    font-size: 1.5rem;
}
.p-image-preview-container:hover > .p-image-preview-indicator {
    opacity: 1;
    cursor: pointer;
}
.p-image-preview-container > img {
    cursor: pointer;
}
.p-image-toolbar {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
}
.p-image-action.p-link {
    display: flex;
    justify-content: center;
    align-items: center;
}
.p-image-preview {
    transition: transform 0.15s;
    max-width: 100vw;
    max-height: 100vh;
}
.p-image-preview-enter-active {
    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);
}
.p-image-preview-leave-active {
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.p-image-preview-enter-from,
.p-image-preview-leave-to {
    opacity: 0;
    transform: scale(0.7);
}
`;F(H);A.render=q;export{A as default};
