import b from"./button.esm.4087d562.js";import c from"./tieredmenu.esm.1262e3fa.js";import{U as f,K as i,o as m,b as y,q as h,e as d,H as s,n as x,p as v}from"./entry.a8bdde5b.js";import"./overlayeventbus.esm.2d5707d2.js";import"./portal.esm.f9c19ffd.js";var r={name:"SplitButton",emits:["click"],props:{label:{type:String,default:null},icon:{type:String,default:null},model:{type:Array,default:null},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},appendTo:{type:String,default:"body"},disabled:{type:Boolean,default:!1},class:{type:null,default:null},style:{type:null,default:null},buttonProps:{type:null,default:null},menuButtonProps:{type:null,default:null},menuButtonIcon:{type:String,default:"pi pi-chevron-down"},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},plain:{type:Boolean,default:!1}},data(){return{isExpanded:!1}},methods:{onDropdownButtonClick(){this.$refs.menu.toggle({currentTarget:this.$el,relatedTarget:this.$refs.button.$el}),this.isExpanded=!this.$refs.menu.visible},onDropdownKeydown(e){(e.code==="ArrowDown"||e.code==="ArrowUp")&&(this.onDropdownButtonClick(),e.preventDefault())},onDefaultButtonClick(e){this.isExpanded&&this.$refs.menu.hide(e),this.$emit("click",e)}},computed:{ariaId(){return f()},containerClass(){return["p-splitbutton p-component",this.class,{[`p-button-${this.severity}`]:this.severity,"p-button-raised":this.raised,"p-button-rounded":this.rounded,"p-button-text":this.text,"p-button-outlined":this.outlined,"p-button-sm":this.size==="small","p-button-lg":this.size==="large"}]}},components:{PVSButton:b,PVSMenu:c}};function B(e,a,t,o,n,l){const u=i("PVSButton"),p=i("PVSMenu");return m(),y("div",{class:x(l.containerClass),style:v(t.style)},[h(e.$slots,"default",{},()=>[d(u,s({type:"button",class:"p-splitbutton-defaultbutton",icon:t.icon,label:t.label,disabled:t.disabled,"aria-label":t.label,onClick:l.onDefaultButtonClick},t.buttonProps),null,16,["icon","label","disabled","aria-label","onClick"])]),d(u,s({ref:"button",type:"button",class:"p-splitbutton-menubutton",icon:t.menuButtonIcon,disabled:t.disabled,"aria-haspopup":"true","aria-expanded":n.isExpanded,"aria-controls":l.ariaId+"_overlay",onClick:l.onDropdownButtonClick,onKeydown:l.onDropdownKeydown},t.menuButtonProps),null,16,["icon","disabled","aria-expanded","aria-controls","onClick","onKeydown"]),d(p,{ref:"menu",id:l.ariaId+"_overlay",model:t.model,popup:!0,autoZIndex:t.autoZIndex,baseZIndex:t.baseZIndex,appendTo:t.appendTo},null,8,["id","model","autoZIndex","baseZIndex","appendTo"])],6)}function g(e,a){a===void 0&&(a={});var t=a.insertAt;if(!(!e||typeof document>"u")){var o=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",t==="top"&&o.firstChild?o.insertBefore(n,o.firstChild):o.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}var C=`
.p-splitbutton[data-v-9d2034e4] {
    display: inline-flex;
    position: relative;
}
.p-splitbutton .p-splitbutton-defaultbutton[data-v-9d2034e4],
.p-splitbutton.p-button-rounded > .p-splitbutton-defaultbutton.p-button[data-v-9d2034e4],
.p-splitbutton.p-button-outlined > .p-splitbutton-defaultbutton.p-button[data-v-9d2034e4] {
    flex: 1 1 auto;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0 none;
}
.p-splitbutton-menubutton[data-v-9d2034e4],
.p-splitbutton.p-button-rounded > .p-splitbutton-menubutton.p-button[data-v-9d2034e4],
.p-splitbutton.p-button-outlined > .p-splitbutton-menubutton.p-button[data-v-9d2034e4] {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.p-splitbutton .p-menu[data-v-9d2034e4] {
    min-width: 100%;
}
.p-fluid .p-splitbutton[data-v-9d2034e4] {
    display: flex;
}
`;g(C);r.render=B;r.__scopeId="data-v-9d2034e4";export{r as default};
