import{o as s,b as p,k as a,q as n}from"./entry.a8bdde5b.js";var i={name:"Toolbar",props:{"aria-labelledby":{type:String,default:null}}};const d=["aria-labelledby"],c={class:"p-toolbar-group-start p-toolbar-group-left"},u={class:"p-toolbar-group-center"},b={class:"p-toolbar-group-end p-toolbar-group-right"};function f(e,r,l,o,t,y){return s(),p("div",{class:"p-toolbar p-component",role:"toolbar","aria-labelledby":e.ariaLabelledby},[a("div",c,[n(e.$slots,"start")]),a("div",u,[n(e.$slots,"center")]),a("div",b,[n(e.$slots,"end")])],8,d)}function g(e,r){r===void 0&&(r={});var l=r.insertAt;if(!(!e||typeof document>"u")){var o=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",l==="top"&&o.firstChild?o.insertBefore(t,o.firstChild):o.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}}var h=`
.p-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}
.p-toolbar-group-start,
.p-toolbar-group-center,
.p-toolbar-group-end {
    display: flex;
    align-items: center;
}
.p-toolbar-group-left,
.p-toolbar-group-right {
    display: flex;
    align-items: center;
}
`;g(h);i.render=f;export{i as default};
