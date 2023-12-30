import{U as m,R as _,j as b,o as r,b as c,k as d,q as o,t as g,l as p,m as u,H as y,n as h,e as v,w as B,I as C,T as x}from"./entry.a8bdde5b.js";var w={name:"Fieldset",emits:["update:collapsed","toggle"],props:{legend:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:null,default:null}},data(){return{d_collapsed:this.collapsed}},watch:{collapsed(e){this.d_collapsed=e}},methods:{toggle(e){this.d_collapsed=!this.d_collapsed,this.$emit("update:collapsed",this.d_collapsed),this.$emit("toggle",{originalEvent:e,value:this.d_collapsed})},onKeyDown(e){(e.code==="Enter"||e.code==="Space")&&(this.toggle(e),e.preventDefault())}},computed:{iconClass(){return["p-fieldset-toggler pi ",{"pi-minus":!this.d_collapsed,"pi-plus":this.d_collapsed}]},ariaId(){return m()},buttonAriaLabel(){return this.toggleButtonProps&&this.toggleButtonProps["aria-label"]?this.toggleButtonProps["aria-label"]:this.legend}},directives:{ripple:_}};const I={class:"p-fieldset-legend"},D=["id"],S=["id","aria-controls","aria-expanded","aria-label"],k={class:"p-fieldset-legend-text"},P=["id","aria-labelledby"],E={class:"p-fieldset-content"};function N(e,a,n,s,l,t){const f=b("ripple");return r(),c("fieldset",{class:h(["p-fieldset p-component",{"p-fieldset-toggleable":n.toggleable}])},[d("legend",I,[n.toggleable?p("",!0):o(e.$slots,"legend",{key:0},()=>[d("span",{id:t.ariaId+"_header",class:"p-fieldset-legend-text"},g(n.legend),9,D)]),n.toggleable?u((r(),c("a",y({key:1,id:t.ariaId+"_header",tabindex:"0",role:"button","aria-controls":t.ariaId+"_content","aria-expanded":!l.d_collapsed,"aria-label":t.buttonAriaLabel,onClick:a[0]||(a[0]=(...i)=>t.toggle&&t.toggle(...i)),onKeydown:a[1]||(a[1]=(...i)=>t.onKeyDown&&t.onKeyDown(...i))},n.toggleButtonProps),[d("span",{class:h(t.iconClass)},null,2),o(e.$slots,"legend",{},()=>[d("span",k,g(n.legend),1)])],16,S)),[[f]]):p("",!0)]),v(x,{name:"p-toggleable-content"},{default:B(()=>[u(d("div",{id:t.ariaId+"_content",class:"p-toggleable-content",role:"region","aria-labelledby":t.ariaId+"_header"},[d("div",E,[o(e.$slots,"default")])],8,P),[[C,!l.d_collapsed]])]),_:3})],2)}function T(e,a){a===void 0&&(a={});var n=a.insertAt;if(!(!e||typeof document>"u")){var s=document.head||document.getElementsByTagName("head")[0],l=document.createElement("style");l.type="text/css",n==="top"&&s.firstChild?s.insertBefore(l,s.firstChild):s.appendChild(l),l.styleSheet?l.styleSheet.cssText=e:l.appendChild(document.createTextNode(e))}}var A=`
.p-fieldset-legend > a,
.p-fieldset-legend > span {
    display: flex;
    align-items: center;
    justify-content: center;
}
.p-fieldset-toggleable .p-fieldset-legend a {
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    position: relative;
    text-decoration: none;
}
.p-fieldset-legend-text {
    line-height: 1;
}
`;T(A);w.render=N;export{w as default};
