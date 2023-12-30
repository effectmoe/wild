import{o as i,b as s,q as c,t as p,n as o,l as u}from"./entry.a8bdde5b.js";var m={name:"Avatar",emits:["error"],props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},"aria-labelledby":{type:String,default:null},"aria-label":{type:String,default:null}},methods:{onError(){this.$emit("error")}},computed:{containerClass(){return["p-avatar p-component",{"p-avatar-image":this.image!=null,"p-avatar-circle":this.shape==="circle","p-avatar-lg":this.size==="large","p-avatar-xl":this.size==="xlarge"}]},iconClass(){return["p-avatar-icon",this.icon]}}};const h=["aria-labelledby","aria-label"],g={key:0,class:"p-avatar-text"},y=["src","alt"];function f(e,r,t,n,a,l){return i(),s("div",{class:o(l.containerClass),"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel},[c(e.$slots,"default",{},()=>[t.label?(i(),s("span",g,p(t.label),1)):t.icon?(i(),s("span",{key:1,class:o(l.iconClass)},null,2)):t.image?(i(),s("img",{key:2,src:t.image,alt:e.ariaLabel,onError:r[0]||(r[0]=(...d)=>l.onError&&l.onError(...d))},null,40,y)):u("",!0)])],10,h)}function v(e,r){r===void 0&&(r={});var t=r.insertAt;if(!(!e||typeof document>"u")){var n=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",t==="top"&&n.firstChild?n.insertBefore(a,n.firstChild):n.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}var b=`
.p-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
}
.p-avatar.p-avatar-image {
    background-color: transparent;
}
.p-avatar.p-avatar-circle {
    border-radius: 50%;
}
.p-avatar-circle img {
    border-radius: 50%;
}
.p-avatar .p-avatar-icon {
    font-size: 1rem;
}
.p-avatar img {
    width: 100%;
    height: 100%;
}
`;v(b);m.render=f;export{m as default};
