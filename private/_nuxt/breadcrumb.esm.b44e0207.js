import{K as y,o as i,b as l,F as h,g as b,w as v,k as p,n as u,l as m,t as f,r as g,G as B,e as w}from"./entry.a8bdde5b.js";var k={name:"BreadcrumbItem",props:{item:null,template:null,exact:null},methods:{onClick(t,a){this.item.command&&this.item.command({originalEvent:t,item:this.item}),this.item.to&&a&&a(t)},containerClass(){return["p-menuitem",{"p-disabled":this.disabled()},this.item.class]},linkClass(t){return["p-menuitem-link",{"router-link-active":t&&t.isActive,"router-link-active-exact":this.exact&&t&&t.isExactActive}]},visible(){return typeof this.item.visible=="function"?this.item.visible():this.item.visible!==!1},disabled(){return typeof this.item.disabled=="function"?this.item.disabled():this.item.disabled},label(){return typeof this.item.label=="function"?this.item.label():this.item.label},isCurrentUrl(){const{to:t,url:a}=this.item;let e=this.$router?this.$router.currentRoute.path:"";return t===e||a===e?"page":void 0}},computed:{iconClass(){return["p-menuitem-icon",this.item.icon]}}};const A=["href","aria-current","onClick"],E={key:1,class:"p-menuitem-text"},I=["href","target","aria-current"],N={key:1,class:"p-menuitem-text"};function S(t,a,e,s,r,n){const d=y("router-link");return n.visible()?(i(),l("li",{key:0,class:u(n.containerClass())},[e.template?(i(),b(g(e.template),{key:1,item:e.item},null,8,["item"])):(i(),l(h,{key:0},[e.item.to?(i(),b(d,{key:0,to:e.item.to,custom:""},{default:v(({navigate:c,href:o,isActive:C,isExactActive:x})=>[p("a",{href:o,class:u(n.linkClass({isActive:C,isExactActive:x})),"aria-current":n.isCurrentUrl(),onClick:_=>n.onClick(_,c)},[e.item.icon?(i(),l("span",{key:0,class:u(n.iconClass)},null,2)):m("",!0),e.item.label?(i(),l("span",E,f(n.label()),1)):m("",!0)],10,A)]),_:1},8,["to"])):(i(),l("a",{key:1,href:e.item.url||"#",class:u(n.linkClass()),target:e.item.target,"aria-current":n.isCurrentUrl(),onClick:a[0]||(a[0]=(...c)=>n.onClick&&n.onClick(...c))},[e.item.icon?(i(),l("span",{key:0,class:u(n.iconClass)},null,2)):m("",!0),e.item.label?(i(),l("span",N,f(n.label()),1)):m("",!0)],10,I))],64))],2)):m("",!0)}k.render=S;var T={name:"Breadcrumb",props:{model:{type:Array,default:null},home:{type:null,default:null},exact:{type:Boolean,default:!0}},components:{BreadcrumbItem:k}};const U={class:"p-breadcrumb p-component"},V={class:"p-breadcrumb-list"},z={key:0,class:"p-menuitem-separator"},D=p("span",{class:"pi pi-chevron-right","aria-hidden":"true"},null,-1),F=[D];function j(t,a,e,s,r,n){const d=y("BreadcrumbItem");return i(),l("nav",U,[p("ol",V,[e.home?(i(),b(d,{key:0,item:e.home,class:"p-breadcrumb-home",template:t.$slots.item,exact:e.exact},null,8,["item","template","exact"])):m("",!0),(i(!0),l(h,null,B(e.model,(c,o)=>(i(),l(h,{key:c.label},[e.home||o!==0?(i(),l("li",z,F)):m("",!0),w(d,{item:c,template:t.$slots.item,exact:e.exact},null,8,["item","template","exact"])],64))),128))])])}function G(t,a){a===void 0&&(a={});var e=a.insertAt;if(!(!t||typeof document>"u")){var s=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",e==="top"&&s.firstChild?s.insertBefore(r,s.firstChild):s.appendChild(r),r.styleSheet?r.styleSheet.cssText=t:r.appendChild(document.createTextNode(t))}}var K=`
.p-breadcrumb {
    overflow-x: auto;
}
.p-breadcrumb .p-breadcrumb-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}
.p-breadcrumb .p-menuitem-text {
    line-height: 1;
}
.p-breadcrumb .p-menuitem-link {
    text-decoration: none;
    display: flex;
    align-items: center;
}
.p-breadcrumb .p-menuitem-separator {
    display: flex;
    align-items: center;
}
.p-breadcrumb::-webkit-scrollbar {
    display: none;
}
`;G(K);T.render=j;export{T as default};
