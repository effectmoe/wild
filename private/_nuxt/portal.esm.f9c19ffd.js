import{E as r,q as t,o as s,g as d,P as l,l as p}from"./entry.a8bdde5b.js";var i={name:"Portal",props:{appendTo:{type:String,default:"body"},disabled:{type:Boolean,default:!1}},data(){return{mounted:!1}},mounted(){this.mounted=r.isClient()},computed:{inline(){return this.disabled||this.appendTo==="self"}}};function u(e,m,o,f,a,n){return n.inline?t(e.$slots,"default",{key:0}):a.mounted?(s(),d(l,{key:1,to:o.appendTo},[t(e.$slots,"default")],8,["to"])):p("",!0)}i.render=u;export{i as s};
