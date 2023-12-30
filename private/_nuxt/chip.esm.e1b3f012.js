import{o as s,b as r,q as m,n as d,l as o,t as u}from"./entry.a8bdde5b.js";var p={name:"Chip",emits:["remove"],props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},removable:{type:Boolean,default:!1},removeIcon:{type:String,default:"pi pi-times-circle"}},data(){return{visible:!0}},methods:{onKeydown(e){(e.key==="Enter"||e.key==="Backspace")&&this.close(e)},close(e){this.visible=!1,this.$emit("remove",e)}},computed:{containerClass(){return["p-chip p-component",{"p-chip-image":this.image!=null}]},iconClass(){return["p-chip-icon",this.icon]},removeIconClass(){return["p-chip-remove-icon",this.removeIcon]}}};const h=["aria-label"],y=["src"],f={key:2,class:"p-chip-text"};function v(e,i,n,a,t,l){return t.visible?(s(),r("div",{key:0,class:d(l.containerClass),"aria-label":n.label},[m(e.$slots,"default",{},()=>[n.image?(s(),r("img",{key:0,src:n.image},null,8,y)):n.icon?(s(),r("span",{key:1,class:d(l.iconClass)},null,2)):o("",!0),n.label?(s(),r("div",f,u(n.label),1)):o("",!0)]),n.removable?(s(),r("span",{key:0,tabindex:"0",class:d(l.removeIconClass),onClick:i[0]||(i[0]=(...c)=>l.close&&l.close(...c)),onKeydown:i[1]||(i[1]=(...c)=>l.onKeydown&&l.onKeydown(...c))},null,34)):o("",!0)],10,h)):o("",!0)}function g(e,i){i===void 0&&(i={});var n=i.insertAt;if(!(!e||typeof document>"u")){var a=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",n==="top"&&a.firstChild?a.insertBefore(t,a.firstChild):a.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}}var C=`
.p-chip {
    display: inline-flex;
    align-items: center;
}
.p-chip-text {
    line-height: 1.5;
}
.p-chip-icon.pi {
    line-height: 1.5;
}
.p-chip-remove-icon {
    line-height: 1.5;
    cursor: pointer;
}
.p-chip img {
    border-radius: 50%;
}
`;g(C);p.render=v;export{p as default};
