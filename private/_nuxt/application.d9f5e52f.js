import{f as r}from"./fastfirestore.94989132.js";import{a8 as s,a5 as a,a6 as l}from"./entry.a8bdde5b.js";import{d as u}from"./utilities.bf6f8ed7.js";const c=function(e,t){if(e){const n=e.data();if(e&&n&&n[t]){if(console.log("data[argkey]=",n[t]),t=="uid")e.uid=n[t];else if(t=="email"){const o=u(n[t],null,null);if(o)return o}else{if(n[t]instanceof Array)return n[t].join(`
`);if(typeof n[t].toDate=="function")return n[t].toDate().toLocaleTimeString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"})}return n[t]}else if(n[t]===0)return n[t]}return""},f=function(e,t){return t===null?null:s(a(l(),e),t)},i=function(e){return{value:e.uid||e.id,label:e.name,rank:e.rank}},m=async function(t){const n=await r().getinstance().gets("tags",[["available","==",!0],["category","==",t]],[["rank","desc"]]);return n.total?n.docs.map(o=>i(o.data())):[]},T=Object.freeze(Object.defineProperty({__proto__:null,convertToFormOption:i,fetchTagOptions:m,formatFirestoreDoc:c,getDocRef:f},Symbol.toStringTag,{value:"Module"}));export{T as a};