import{O as c,o as s,b as m,F as v,G as h,k as o,q as p,l as f,n as u}from"./entry.a8bdde5b.js";var g={name:"Timeline",props:{value:null,align:{mode:String,default:"left"},layout:{mode:String,default:"vertical"},dataKey:null},methods:{getKey(e,t){return this.dataKey?c.resolveFieldData(e,this.dataKey):t}},computed:{containerClass(){return["p-timeline p-component","p-timeline-"+this.align,"p-timeline-"+this.layout]}}};const x={class:"p-timeline-event-opposite"},y={class:"p-timeline-event-separator"},C=o("div",{class:"p-timeline-event-marker"},null,-1),_=o("div",{class:"p-timeline-event-connector"},null,-1),k={class:"p-timeline-event-content"};function z(e,t,r,i,n,d){return s(),m("div",{class:u(d.containerClass)},[(s(!0),m(v,null,h(r.value,(a,l)=>(s(),m("div",{key:d.getKey(a,l),class:"p-timeline-event"},[o("div",x,[p(e.$slots,"opposite",{item:a,index:l})]),o("div",y,[p(e.$slots,"marker",{item:a,index:l},()=>[C]),l!==r.value.length-1?p(e.$slots,"connector",{key:0,item:a,index:l},()=>[_]):f("",!0)]),o("div",k,[p(e.$slots,"content",{item:a,index:l})])]))),128))],2)}function w(e,t){t===void 0&&(t={});var r=t.insertAt;if(!(!e||typeof document>"u")){var i=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",r==="top"&&i.firstChild?i.insertBefore(n,i.firstChild):i.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}var B=`
.p-timeline {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
}
.p-timeline-left .p-timeline-event-opposite {
    text-align: right;
}
.p-timeline-left .p-timeline-event-content {
    text-align: left;
}
.p-timeline-right .p-timeline-event {
    flex-direction: row-reverse;
}
.p-timeline-right .p-timeline-event-opposite {
    text-align: left;
}
.p-timeline-right .p-timeline-event-content {
    text-align: right;
}
.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) {
    flex-direction: row-reverse;
}
.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite {
    text-align: right;
}
.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content {
    text-align: left;
}
.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite {
    text-align: left;
}
.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {
    text-align: right;
}
.p-timeline-event {
    display: flex;
    position: relative;
    min-height: 70px;
}
.p-timeline-event:last-child {
    min-height: 0;
}
.p-timeline-event-opposite {
    flex: 1;
    padding: 0 1rem;
}
.p-timeline-event-content {
    flex: 1;
    padding: 0 1rem;
}
.p-timeline-event-separator {
    flex: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.p-timeline-event-marker {
    display: flex;
    align-self: baseline;
}
.p-timeline-event-connector {
    flex-grow: 1;
}
.p-timeline-horizontal {
    flex-direction: row;
}
.p-timeline-horizontal .p-timeline-event {
    flex-direction: column;
    flex: 1;
}
.p-timeline-horizontal .p-timeline-event:last-child {
    flex: 0;
}
.p-timeline-horizontal .p-timeline-event-separator {
    flex-direction: row;
}
.p-timeline-horizontal .p-timeline-event-connector {
    width: 100%;
}
.p-timeline-bottom .p-timeline-event {
    flex-direction: column-reverse;
}
.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even) {
    flex-direction: column-reverse;
}
`;w(B);g.render=z;export{g as default};
