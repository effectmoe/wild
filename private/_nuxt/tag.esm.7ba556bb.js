import{o as r,b as l,n as o,l as d,q as c,k as p,t as u}from"./entry.a8bdde5b.js";var g={name:"Tag",props:{value:null,severity:null,rounded:Boolean,icon:String},computed:{containerClass(){return["p-tag p-component",{"p-tag-info":this.severity==="info","p-tag-success":this.severity==="success","p-tag-warning":this.severity==="warning","p-tag-danger":this.severity==="danger","p-tag-rounded":this.rounded}]},iconClass(){return["p-tag-icon",this.icon]}}};const h={class:"p-tag-value"};function m(n,a,s,t,e,i){return r(),l("span",{class:o(i.containerClass)},[s.icon?(r(),l("span",{key:0,class:o(i.iconClass)},null,2)):d("",!0),c(n.$slots,"default",{},()=>[p("span",h,u(s.value),1)])],2)}function f(n,a){a===void 0&&(a={});var s=a.insertAt;if(!(!n||typeof document>"u")){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",s==="top"&&t.firstChild?t.insertBefore(e,t.firstChild):t.appendChild(e),e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n))}}var y=`
.p-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.p-tag-icon,
.p-tag-value,
.p-tag-icon.pi {
    line-height: 1.5;
}
.p-tag.p-tag-rounded {
    border-radius: 10rem;
}
`;f(y);g.render=m;export{g as default};
