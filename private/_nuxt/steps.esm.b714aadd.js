import{U as x,E as b,K as C,o as l,b as o,k as d,F as f,G as _,n as p,p as T,g as I,w,t as u,r as D,l as F}from"./entry.a8bdde5b.js";var E={name:"Steps",props:{id:{type:String,default:x()},model:{type:Array,default:null},readonly:{type:Boolean,default:!0},exact:{type:Boolean,default:!0}},mounted(){const e=this.findFirstItem();e.tabIndex="0"},methods:{onItemClick(e,t,i){if(this.disabled(t)||this.readonly){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),t.to&&i&&i(e)},onItemKeydown(e,t,i){switch(e.code){case"ArrowRight":{this.navigateToNextItem(e.target),e.preventDefault();break}case"ArrowLeft":{this.navigateToPrevItem(e.target),e.preventDefault();break}case"Home":{this.navigateToFirstItem(e.target),e.preventDefault();break}case"End":{this.navigateToLastItem(e.target),e.preventDefault();break}case"Tab":break;case"Enter":case"Space":{this.onItemClick(e,t,i),e.preventDefault();break}}},navigateToNextItem(e){const t=this.findNextItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToPrevItem(e){const t=this.findPrevItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToFirstItem(e){const t=this.findFirstItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToLastItem(e){const t=this.findLastItem(e);t&&this.setFocusToMenuitem(e,t)},findNextItem(e){const t=e.parentElement.nextElementSibling;return t?t.children[0]:null},findPrevItem(e){const t=e.parentElement.previousElementSibling;return t?t.children[0]:null},findFirstItem(){const e=b.findSingle(this.$refs.list,".p-steps-item");return e?e.children[0]:null},findLastItem(){const e=b.find(this.$refs.list,".p-steps-item");return e?e[e.length-1].children[0]:null},setFocusToMenuitem(e,t){e.tabIndex="-1",t.tabIndex="0",t.focus()},isActive(e){return e.to?this.$router.resolve(e.to).path===this.$route.path:!1},getItemClass(e){return["p-steps-item",e.class,{"p-highlight p-steps-current":this.isActive(e),"p-disabled":this.isItemDisabled(e)}]},linkClass(e){return["p-menuitem-link",{"router-link-active":e&&e.isActive,"router-link-active-exact":this.exact&&e&&e.isExactActive}]},isItemDisabled(e){return this.disabled(e)||this.readonly&&!this.isActive(e)},visible(e){return typeof e.visible=="function"?e.visible():e.visible!==!1},disabled(e){return typeof e.disabled=="function"?e.disabled():e.disabled},label(e){return typeof e.label=="function"?e.label():e.label}},computed:{containerClass(){return["p-steps p-component",{"p-readonly":this.readonly}]}}};const S=["id"],A={ref:"list",class:"p-steps-list"},B=["href","aria-current","onClick","onKeydown"],K={class:"p-steps-number"},N={class:"p-steps-title"},L=["onKeydown"],M={class:"p-steps-number"},j={class:"p-steps-title"};function z(e,t,i,r,a,n){const k=C("router-link");return l(),o("nav",{id:i.id,class:p(n.containerClass)},[d("ol",A,[(l(!0),o(f,null,_(i.model,(s,h)=>(l(),o(f,{key:s.to},[n.visible(s)?(l(),o("li",{key:0,class:p(n.getItemClass(s)),style:T(s.style)},[e.$slots.item?(l(),I(D(e.$slots.item),{key:1,item:s},null,8,["item"])):(l(),o(f,{key:0},[n.isItemDisabled(s)?(l(),o("span",{key:1,class:p(n.linkClass()),onKeydown:c=>n.onItemKeydown(c,s)},[d("span",M,u(h+1),1),d("span",j,u(n.label(s)),1)],42,L)):(l(),I(k,{key:0,to:s.to,custom:""},{default:w(({navigate:c,href:v,isActive:g,isExactActive:y})=>[d("a",{href:v,class:p(n.linkClass({isActive:g,isExactActive:y})),tabindex:-1,"aria-current":y?"step":void 0,onClick:m=>n.onItemClick(m,s,c),onKeydown:m=>n.onItemKeydown(m,s,c)},[d("span",K,u(h+1),1),d("span",N,u(n.label(s)),1)],42,B)]),_:2},1032,["to"]))],64))],6)):F("",!0)],64))),128))],512)],10,S)}function H(e,t){t===void 0&&(t={});var i=t.insertAt;if(!(!e||typeof document>"u")){var r=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",i==="top"&&r.firstChild?r.insertBefore(a,r.firstChild):r.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}var U=`
.p-steps {
    position: relative;
}
.p-steps .p-steps-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
}
.p-steps-item {
    position: relative;
    display: flex;
    justify-content: center;
    flex: 1 1 auto;
}
.p-steps-item .p-menuitem-link {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    text-decoration: none;
}
.p-steps.p-steps-readonly .p-steps-item {
    cursor: auto;
}
.p-steps-item.p-steps-current .p-menuitem-link {
    cursor: default;
}
.p-steps-title {
    white-space: nowrap;
}
.p-steps-number {
    display: flex;
    align-items: center;
    justify-content: center;
}
.p-steps-title {
    display: block;
}
`;H(U);E.render=z;export{E as default};
