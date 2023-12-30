import f from"./chart.esm.a32129ff.js";import{f as b}from"./fastfirestore.94989132.js";import{d as v,b as x,k as t,t as m,e as w,a3 as u,a4 as n,a5 as h,a6 as y,a7 as g,o as k}from"./entry.a8bdde5b.js";const D={class:"grid"},j={class:"col-12 lg:col-6 xl:col-6"},P={class:"card mb-0"},V={class:"flex justify-content-between mb-3"},S=t("h4",{class:"block font-medium mb-3"},"総ユーザー数",-1),C={class:"text-900 font-medium text-xl"},B=t("div",{class:"flex align-items-center justify-content-center bg-blue-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[t("i",{class:"pi pi-users text-blue-500 text-xl"})],-1),J=t("span",{class:"text-500"},"本日の登録者数 ",-1),L={class:"text-green-500 font-medium"},E={class:"col-12 lg:col-6 xl:col-6"},N={class:"card mb-0"},q={class:"flex justify-content-between mb-3"},A=t("h4",{class:"block font-medium mb-3"},"総通知登録者数",-1),O={class:"text-900 font-medium text-xl"},R=t("div",{class:"flex align-items-center justify-content-center bg-green-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[t("i",{class:"pi pi-send text-green-500 text-xl"})],-1),T=t("span",{class:"text-500"},"本日の登録者数 ",-1),z={class:"text-green-500 font-medium"},F={class:"col-12 mt-5"},G={class:"card"},H=t("h5",null,"開封率(直近7日間)",-1),r=getComputedStyle(document.documentElement),I={data(){return{totalpersoncount:0,todaypersoncount:0,totaldevicetokencount:0,todaydevicetokencount:0,summarycolors:[r.getPropertyValue("--red-500"),r.getPropertyValue("--green-500"),r.getPropertyValue("--yellow-500"),r.getPropertyValue("--bluegray-500"),r.getPropertyValue("--blue-500")],summarydatas:{},chartdata:{labels:[],datasets:[]}}},async mounted(){this.totalpersoncount=(await u(n(h(y(),"persons")))).data().count;let c=n(h(y(),"persons")),a=new Date;a=new Date(a.toLocaleTimeString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).split(" ")[0]+" 00:00:00"),c=n(c,g("registerdate",">=",a)),this.todaypersoncount=(await u(c)).data().count,this.totaldevicetokencount=(await u(n(n(h(y(),"persons")),g("isdevicetoken","==",!0)))).data().count,this.todaydevicetokencount=(await u(n(n(n(h(y(),"persons")),g("registerdate",">=",a)),g("isdevicetoken","==",!0)))).data().count;const p=new Date;for(let e=0;e<7;e++){const l=new Date(new Date().setDate(p.getDate()-(6-e))).toLocaleDateString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"});this.chartdata.labels.push(l),console.log("targetday=",l);const i=await b().getinstance().gets("summary",[["targetday","==",l.replace("/","-").replace("/","-")]],this.summarycolors.length,null);console.log("summary=",i);for(let d=0;d<i.total;d++){const s=i.docs[d].data();console.log("notify=",s),this.summarydatas[s.targetuid+"<>"+s.label]||(this.summarydatas[s.targetuid+"<>"+s.label]={}),this.summarydatas[s.targetuid+"<>"+s.label][s.targetday.replace("-","/").replace("-","/")]=s.openperseint,console.log("this.summarydatas1=",this.summarydatas)}}console.log("this.summarydatas2=",this.summarydatas);const o=Object.keys(this.summarydatas);for(let e=0;e<o.length;e++){const l=o[e].split("<>")[1];this.summarydatas[o[e]];const i={label:l,data:[],fill:!1,backgroundColor:this.summarycolors[e],borderColor:this.summarycolors[e],tension:.4};let d=0;for(let s=0;s<7;s++){const _=new Date(new Date().setDate(p.getDate()-(6-s))).toLocaleDateString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"});this.summarydatas[o[e]][_]?(i.data.push(this.summarydatas[o[e]][_]),d=this.summarydatas[o[e]][_]):i.data.push(d)}this.chartdata.datasets.push(i)}}},U=v({...I,__name:"index",setup(c){return(a,p)=>{const o=f;return k(),x("div",D,[t("div",j,[t("div",P,[t("div",V,[t("div",null,[S,t("div",C,m(a.totalpersoncount)+" 人 ",1)]),B]),J,t("span",L,m(a.todaypersoncount)+" 人",1)])]),t("div",E,[t("div",N,[t("div",q,[t("div",null,[A,t("div",O,m(a.totaldevicetokencount),1)]),R]),T,t("span",z,m(a.todaydevicetokencount)+" 人",1)])]),t("div",F,[t("div",G,[H,w(o,{type:"line",data:a.chartdata,options:{responsive:!0,maintainAspectRatio:!1},class:"h-30rem"},null,8,["data"])])])])}}});export{U as default};