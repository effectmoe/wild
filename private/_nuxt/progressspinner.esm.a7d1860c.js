import{o as s,b as o,p as l,k as p}from"./entry.a8bdde5b.js";var d={name:"ProgressSpinner",props:{strokeWidth:{type:String,default:"2"},fill:{type:String,default:"none"},animationDuration:{type:String,default:"2s"}},computed:{svgStyle(){return{"animation-duration":this.animationDuration}}}};const c={class:"p-progress-spinner",role:"progressbar"},g=["fill","stroke-width"];function h(n,i,r,t,e,a){return s(),o("div",c,[(s(),o("svg",{class:"p-progress-spinner-svg",viewBox:"25 25 50 50",style:l(a.svgStyle)},[p("circle",{class:"p-progress-spinner-circle",cx:"50",cy:"50",r:"20",fill:r.fill,"stroke-width":r.strokeWidth,strokeMiterlimit:"10"},null,8,g)],4))])}function u(n,i){i===void 0&&(i={});var r=i.insertAt;if(!(!n||typeof document>"u")){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",r==="top"&&t.firstChild?t.insertBefore(e,t.firstChild):t.appendChild(e),e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n))}}var f=`
.p-progress-spinner {
    position: relative;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    display: inline-block;
}
.p-progress-spinner::before {
    content: '';
    display: block;
    padding-top: 100%;
}
.p-progress-spinner-svg {
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
`;u(f);d.render=h;export{d as default};
