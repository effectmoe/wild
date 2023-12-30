function th(t,e){const n=Object.create(null),r=t.split(",");for(let s=0;s<r.length;s++)n[r[s]]=!0;return e?s=>!!n[s.toLowerCase()]:s=>!!n[s]}function nh(t){if(re(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=Ne(r)?ZE(r):nh(r);if(s)for(const i in s)e[i]=s[i]}return e}else{if(Ne(t))return t;if(ke(t))return t}}const JE=/;(?![^(]*\))/g,YE=/:([^]+)/,XE=/\/\*.*?\*\//gs;function ZE(t){const e={};return t.replace(XE,"").split(JE).forEach(n=>{if(n){const r=n.split(YE);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function rh(t){let e="";if(Ne(t))e=t;else if(re(t))for(let n=0;n<t.length;n++){const r=rh(t[n]);r&&(e+=r+" ")}else if(ke(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const eb="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",tb=th(eb);function dm(t){return!!t||t===""}const sF=t=>Ne(t)?t:t==null?"":re(t)||ke(t)&&(t.toString===mm||!ce(t.toString))?JSON.stringify(t,pm,2):String(t),pm=(t,e)=>e&&e.__v_isRef?pm(t,e.value):ls(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s])=>(n[`${r} =>`]=s,n),{})}:gm(e)?{[`Set(${e.size})`]:[...e.values()]}:ke(e)&&!re(e)&&!ym(e)?String(e):e,Re={},as=[],en=()=>{},nb=()=>!1,rb=/^on[^a-z]/,Ji=t=>rb.test(t),sh=t=>t.startsWith("onUpdate:"),Ye=Object.assign,ih=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},sb=Object.prototype.hasOwnProperty,_e=(t,e)=>sb.call(t,e),re=Array.isArray,ls=t=>Yi(t)==="[object Map]",gm=t=>Yi(t)==="[object Set]",ib=t=>Yi(t)==="[object RegExp]",ce=t=>typeof t=="function",Ne=t=>typeof t=="string",oh=t=>typeof t=="symbol",ke=t=>t!==null&&typeof t=="object",ah=t=>ke(t)&&ce(t.then)&&ce(t.catch),mm=Object.prototype.toString,Yi=t=>mm.call(t),ob=t=>Yi(t).slice(8,-1),ym=t=>Yi(t)==="[object Object]",lh=t=>Ne(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,fi=th(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),el=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},ab=/-(\w)/g,mn=el(t=>t.replace(ab,(e,n)=>n?n.toUpperCase():"")),lb=/\B([A-Z])/g,zr=el(t=>t.replace(lb,"-$1").toLowerCase()),tl=el(t=>t.charAt(0).toUpperCase()+t.slice(1)),na=el(t=>t?`on${tl(t)}`:""),Ci=(t,e)=>!Object.is(t,e),cs=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},da=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},zc=t=>{const e=parseFloat(t);return isNaN(e)?t:e},_m=t=>{const e=Ne(t)?Number(t):NaN;return isNaN(e)?t:e};let cd;const cb=()=>cd||(cd=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});let Mt;class vm{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Mt,!e&&Mt&&(this.index=(Mt.scopes||(Mt.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=Mt;try{return Mt=this,e()}finally{Mt=n}}}on(){Mt=this}off(){Mt=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function wm(t){return new vm(t)}function ub(t,e=Mt){e&&e.active&&e.effects.push(t)}function Em(){return Mt}function hb(t){Mt&&Mt.cleanups.push(t)}const ch=t=>{const e=new Set(t);return e.w=0,e.n=0,e},bm=t=>(t.w&ur)>0,Tm=t=>(t.n&ur)>0,fb=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=ur},db=t=>{const{deps:e}=t;if(e.length){let n=0;for(let r=0;r<e.length;r++){const s=e[r];bm(s)&&!Tm(s)?s.delete(t):e[n++]=s,s.w&=~ur,s.n&=~ur}e.length=n}},pa=new WeakMap;let si=0,ur=1;const Kc=30;let Yt;const Dr=Symbol(""),Gc=Symbol("");class uh{constructor(e,n=null,r){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,ub(this,r)}run(){if(!this.active)return this.fn();let e=Yt,n=sr;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=Yt,Yt=this,sr=!0,ur=1<<++si,si<=Kc?fb(this):ud(this),this.fn()}finally{si<=Kc&&db(this),ur=1<<--si,Yt=this.parent,sr=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){Yt===this?this.deferStop=!0:this.active&&(ud(this),this.onStop&&this.onStop(),this.active=!1)}}function ud(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let sr=!0;const Im=[];function xs(){Im.push(sr),sr=!1}function Ms(){const t=Im.pop();sr=t===void 0?!0:t}function kt(t,e,n){if(sr&&Yt){let r=pa.get(t);r||pa.set(t,r=new Map);let s=r.get(n);s||r.set(n,s=ch()),Am(s)}}function Am(t,e){let n=!1;si<=Kc?Tm(t)||(t.n|=ur,n=!bm(t)):n=!t.has(Yt),n&&(t.add(Yt),Yt.deps.push(t))}function Pn(t,e,n,r,s,i){const o=pa.get(t);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(n==="length"&&re(t)){const l=Number(r);o.forEach((c,u)=>{(u==="length"||u>=l)&&a.push(c)})}else switch(n!==void 0&&a.push(o.get(n)),e){case"add":re(t)?lh(n)&&a.push(o.get("length")):(a.push(o.get(Dr)),ls(t)&&a.push(o.get(Gc)));break;case"delete":re(t)||(a.push(o.get(Dr)),ls(t)&&a.push(o.get(Gc)));break;case"set":ls(t)&&a.push(o.get(Dr));break}if(a.length===1)a[0]&&Qc(a[0]);else{const l=[];for(const c of a)c&&l.push(...c);Qc(ch(l))}}function Qc(t,e){const n=re(t)?t:[...t];for(const r of n)r.computed&&hd(r);for(const r of n)r.computed||hd(r)}function hd(t,e){(t!==Yt||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}function pb(t,e){var n;return(n=pa.get(t))===null||n===void 0?void 0:n.get(e)}const gb=th("__proto__,__v_isRef,__isVue"),Sm=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(oh)),mb=hh(),yb=hh(!1,!0),_b=hh(!0),fd=vb();function vb(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=me(this);for(let i=0,o=this.length;i<o;i++)kt(r,"get",i+"");const s=r[e](...n);return s===-1||s===!1?r[e](...n.map(me)):s}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){xs();const r=me(this)[e].apply(this,n);return Ms(),r}}),t}function wb(t){const e=me(this);return kt(e,"has",t),e.hasOwnProperty(t)}function hh(t=!1,e=!1){return function(r,s,i){if(s==="__v_isReactive")return!t;if(s==="__v_isReadonly")return t;if(s==="__v_isShallow")return e;if(s==="__v_raw"&&i===(t?e?Mb:Pm:e?Om:km).get(r))return r;const o=re(r);if(!t){if(o&&_e(fd,s))return Reflect.get(fd,s,i);if(s==="hasOwnProperty")return wb}const a=Reflect.get(r,s,i);return(oh(s)?Sm.has(s):gb(s))||(t||kt(r,"get",s),e)?a:Ve(a)?o&&lh(s)?a:a.value:ke(a)?t?ph(a):Vt(a):a}}const Eb=Cm(),bb=Cm(!0);function Cm(t=!1){return function(n,r,s,i){let o=n[r];if($r(o)&&Ve(o)&&!Ve(s))return!1;if(!t&&(!ga(s)&&!$r(s)&&(o=me(o),s=me(s)),!re(n)&&Ve(o)&&!Ve(s)))return o.value=s,!0;const a=re(n)&&lh(r)?Number(r)<n.length:_e(n,r),l=Reflect.set(n,r,s,i);return n===me(i)&&(a?Ci(s,o)&&Pn(n,"set",r,s):Pn(n,"add",r,s)),l}}function Tb(t,e){const n=_e(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&Pn(t,"delete",e,void 0),r}function Ib(t,e){const n=Reflect.has(t,e);return(!oh(e)||!Sm.has(e))&&kt(t,"has",e),n}function Ab(t){return kt(t,"iterate",re(t)?"length":Dr),Reflect.ownKeys(t)}const Rm={get:mb,set:Eb,deleteProperty:Tb,has:Ib,ownKeys:Ab},Sb={get:_b,set(t,e){return!0},deleteProperty(t,e){return!0}},Cb=Ye({},Rm,{get:yb,set:bb}),fh=t=>t,nl=t=>Reflect.getPrototypeOf(t);function No(t,e,n=!1,r=!1){t=t.__v_raw;const s=me(t),i=me(e);n||(e!==i&&kt(s,"get",e),kt(s,"get",i));const{has:o}=nl(s),a=r?fh:n?yh:Ri;if(o.call(s,e))return a(t.get(e));if(o.call(s,i))return a(t.get(i));t!==s&&t.get(e)}function Lo(t,e=!1){const n=this.__v_raw,r=me(n),s=me(t);return e||(t!==s&&kt(r,"has",t),kt(r,"has",s)),t===s?n.has(t):n.has(t)||n.has(s)}function xo(t,e=!1){return t=t.__v_raw,!e&&kt(me(t),"iterate",Dr),Reflect.get(t,"size",t)}function dd(t){t=me(t);const e=me(this);return nl(e).has.call(e,t)||(e.add(t),Pn(e,"add",t,t)),this}function pd(t,e){e=me(e);const n=me(this),{has:r,get:s}=nl(n);let i=r.call(n,t);i||(t=me(t),i=r.call(n,t));const o=s.call(n,t);return n.set(t,e),i?Ci(e,o)&&Pn(n,"set",t,e):Pn(n,"add",t,e),this}function gd(t){const e=me(this),{has:n,get:r}=nl(e);let s=n.call(e,t);s||(t=me(t),s=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return s&&Pn(e,"delete",t,void 0),i}function md(){const t=me(this),e=t.size!==0,n=t.clear();return e&&Pn(t,"clear",void 0,void 0),n}function Mo(t,e){return function(r,s){const i=this,o=i.__v_raw,a=me(o),l=e?fh:t?yh:Ri;return!t&&kt(a,"iterate",Dr),o.forEach((c,u)=>r.call(s,l(c),l(u),i))}}function Fo(t,e,n){return function(...r){const s=this.__v_raw,i=me(s),o=ls(i),a=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,c=s[t](...r),u=n?fh:e?yh:Ri;return!e&&kt(i,"iterate",l?Gc:Dr),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function jn(t){return function(...e){return t==="delete"?!1:this}}function Rb(){const t={get(i){return No(this,i)},get size(){return xo(this)},has:Lo,add:dd,set:pd,delete:gd,clear:md,forEach:Mo(!1,!1)},e={get(i){return No(this,i,!1,!0)},get size(){return xo(this)},has:Lo,add:dd,set:pd,delete:gd,clear:md,forEach:Mo(!1,!0)},n={get(i){return No(this,i,!0)},get size(){return xo(this,!0)},has(i){return Lo.call(this,i,!0)},add:jn("add"),set:jn("set"),delete:jn("delete"),clear:jn("clear"),forEach:Mo(!0,!1)},r={get(i){return No(this,i,!0,!0)},get size(){return xo(this,!0)},has(i){return Lo.call(this,i,!0)},add:jn("add"),set:jn("set"),delete:jn("delete"),clear:jn("clear"),forEach:Mo(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=Fo(i,!1,!1),n[i]=Fo(i,!0,!1),e[i]=Fo(i,!1,!0),r[i]=Fo(i,!0,!0)}),[t,n,e,r]}const[kb,Ob,Pb,Db]=Rb();function dh(t,e){const n=e?t?Db:Pb:t?Ob:kb;return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(_e(n,s)&&s in r?n:r,s,i)}const Nb={get:dh(!1,!1)},Lb={get:dh(!1,!0)},xb={get:dh(!0,!1)},km=new WeakMap,Om=new WeakMap,Pm=new WeakMap,Mb=new WeakMap;function Fb(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ub(t){return t.__v_skip||!Object.isExtensible(t)?0:Fb(ob(t))}function Vt(t){return $r(t)?t:gh(t,!1,Rm,Nb,km)}function Dm(t){return gh(t,!1,Cb,Lb,Om)}function ph(t){return gh(t,!0,Sb,xb,Pm)}function gh(t,e,n,r,s){if(!ke(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=s.get(t);if(i)return i;const o=Ub(t);if(o===0)return t;const a=new Proxy(t,o===2?r:n);return s.set(t,a),a}function us(t){return $r(t)?us(t.__v_raw):!!(t&&t.__v_isReactive)}function $r(t){return!!(t&&t.__v_isReadonly)}function ga(t){return!!(t&&t.__v_isShallow)}function Nm(t){return us(t)||$r(t)}function me(t){const e=t&&t.__v_raw;return e?me(e):t}function mh(t){return da(t,"__v_skip",!0),t}const Ri=t=>ke(t)?Vt(t):t,yh=t=>ke(t)?ph(t):t;function Lm(t){sr&&Yt&&(t=me(t),Am(t.dep||(t.dep=ch())))}function xm(t,e){t=me(t);const n=t.dep;n&&Qc(n)}function Ve(t){return!!(t&&t.__v_isRef===!0)}function nt(t){return Mm(t,!1)}function ma(t){return Mm(t,!0)}function Mm(t,e){return Ve(t)?t:new $b(t,e)}class $b{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:me(e),this._value=n?e:Ri(e)}get value(){return Lm(this),this._value}set value(e){const n=this.__v_isShallow||ga(e)||$r(e);e=n?e:me(e),Ci(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:Ri(e),xm(this))}}function $e(t){return Ve(t)?t.value:t}const Vb={get:(t,e,n)=>$e(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return Ve(s)&&!Ve(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function Fm(t){return us(t)?t:new Proxy(t,Vb)}class Bb{constructor(e,n,r){this._object=e,this._key=n,this._defaultValue=r,this.__v_isRef=!0}get value(){const e=this._object[this._key];return e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return pb(me(this._object),this._key)}}function Um(t,e,n){const r=t[e];return Ve(r)?r:new Bb(t,e,n)}var $m;class Hb{constructor(e,n,r,s){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this[$m]=!1,this._dirty=!0,this.effect=new uh(e,()=>{this._dirty||(this._dirty=!0,xm(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=r}get value(){const e=me(this);return Lm(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}$m="__v_isReadonly";function jb(t,e,n=!1){let r,s;const i=ce(t);return i?(r=t,s=en):(r=t.get,s=t.set),new Hb(r,s,i||!s,n)}function ir(t,e,n,r){let s;try{s=r?t(...r):t()}catch(i){Fs(i,e,n)}return s}function zt(t,e,n,r){if(ce(t)){const i=ir(t,e,n,r);return i&&ah(i)&&i.catch(o=>{Fs(o,e,n)}),i}const s=[];for(let i=0;i<t.length;i++)s.push(zt(t[i],e,n,r));return s}function Fs(t,e,n,r=!0){const s=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,a=n;for(;i;){const c=i.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](t,o,a)===!1)return}i=i.parent}const l=e.appContext.config.errorHandler;if(l){ir(l,null,10,[t,o,a]);return}}qb(t,n,s,r)}function qb(t,e,n,r=!0){console.error(t)}let ki=!1,Jc=!1;const ft=[];let cn=0;const hs=[];let bn=null,Sr=0;const Vm=Promise.resolve();let _h=null;function yr(t){const e=_h||Vm;return t?e.then(this?t.bind(this):t):e}function Wb(t){let e=cn+1,n=ft.length;for(;e<n;){const r=e+n>>>1;Oi(ft[r])<t?e=r+1:n=r}return e}function rl(t){(!ft.length||!ft.includes(t,ki&&t.allowRecurse?cn+1:cn))&&(t.id==null?ft.push(t):ft.splice(Wb(t.id),0,t),Bm())}function Bm(){!ki&&!Jc&&(Jc=!0,_h=Vm.then(jm))}function zb(t){const e=ft.indexOf(t);e>cn&&ft.splice(e,1)}function Hm(t){re(t)?hs.push(...t):(!bn||!bn.includes(t,t.allowRecurse?Sr+1:Sr))&&hs.push(t),Bm()}function yd(t,e=ki?cn+1:0){for(;e<ft.length;e++){const n=ft[e];n&&n.pre&&(ft.splice(e,1),e--,n())}}function ya(t){if(hs.length){const e=[...new Set(hs)];if(hs.length=0,bn){bn.push(...e);return}for(bn=e,bn.sort((n,r)=>Oi(n)-Oi(r)),Sr=0;Sr<bn.length;Sr++)bn[Sr]();bn=null,Sr=0}}const Oi=t=>t.id==null?1/0:t.id,Kb=(t,e)=>{const n=Oi(t)-Oi(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function jm(t){Jc=!1,ki=!0,ft.sort(Kb);const e=en;try{for(cn=0;cn<ft.length;cn++){const n=ft[cn];n&&n.active!==!1&&ir(n,null,14)}}finally{cn=0,ft.length=0,ya(),ki=!1,_h=null,(ft.length||hs.length)&&jm()}}function Gb(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Re;let s=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:h,trim:f}=r[u]||Re;f&&(s=n.map(p=>Ne(p)?p.trim():p)),h&&(s=n.map(zc))}let a,l=r[a=na(e)]||r[a=na(mn(e))];!l&&i&&(l=r[a=na(zr(e))]),l&&zt(l,t,6,s);const c=r[a+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,zt(c,t,6,s)}}function qm(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},a=!1;if(!ce(t)){const l=c=>{const u=qm(c,e,!0);u&&(a=!0,Ye(o,u))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!a?(ke(t)&&r.set(t,null),null):(re(i)?i.forEach(l=>o[l]=null):Ye(o,i),ke(t)&&r.set(t,o),o)}function sl(t,e){return!t||!Ji(e)?!1:(e=e.slice(2).replace(/Once$/,""),_e(t,e[0].toLowerCase()+e.slice(1))||_e(t,zr(e))||_e(t,e))}let rt=null,il=null;function _a(t){const e=rt;return rt=t,il=t&&t.type.__scopeId||null,e}function iF(t){il=t}function oF(){il=null}function vh(t,e=rt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&kd(-1);const i=_a(e);let o;try{o=t(...s)}finally{_a(i),r._d&&kd(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function tc(t){const{type:e,vnode:n,proxy:r,withProxy:s,props:i,propsOptions:[o],slots:a,attrs:l,emit:c,render:u,renderCache:h,data:f,setupState:p,ctx:y,inheritAttrs:E}=t;let b,w;const d=_a(t);try{if(n.shapeFlag&4){const _=s||r;b=qt(u.call(_,_,h,i,p,f,y)),w=l}else{const _=e;b=qt(_.length>1?_(i,{attrs:l,slots:a,emit:c}):_(i,null)),w=e.props?l:Jb(l)}}catch(_){mi.length=0,Fs(_,t,1),b=De(At)}let g=b;if(w&&E!==!1){const _=Object.keys(w),{shapeFlag:T}=g;_.length&&T&7&&(o&&_.some(sh)&&(w=Yb(w,o)),g=Dn(g,w))}return n.dirs&&(g=Dn(g),g.dirs=g.dirs?g.dirs.concat(n.dirs):n.dirs),n.transition&&(g.transition=n.transition),b=g,_a(d),b}function Qb(t){let e;for(let n=0;n<t.length;n++){const r=t[n];if(bs(r)){if(r.type!==At||r.children==="v-if"){if(e)return;e=r}}else return}return e}const Jb=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ji(n))&&((e||(e={}))[n]=t[n]);return e},Yb=(t,e)=>{const n={};for(const r in t)(!sh(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Xb(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:a,patchFlag:l}=e,c=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?_d(r,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(o[f]!==r[f]&&!sl(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?_d(r,o,c):!0:!!o;return!1}function _d(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!sl(n,i))return!0}return!1}function wh({vnode:t,parent:e},n){for(;e&&e.subTree===t;)(t=e.vnode).el=n,e=e.parent}const Wm=t=>t.__isSuspense,Zb={name:"Suspense",__isSuspense:!0,process(t,e,n,r,s,i,o,a,l,c){t==null?eT(e,n,r,s,i,o,a,l,c):tT(t,e,n,r,s,o,a,l,c)},hydrate:nT,create:Eh,normalize:rT},zm=Zb;function Pi(t,e){const n=t.props&&t.props[e];ce(n)&&n()}function eT(t,e,n,r,s,i,o,a,l){const{p:c,o:{createElement:u}}=l,h=u("div"),f=t.suspense=Eh(t,s,r,e,h,n,i,o,a,l);c(null,f.pendingBranch=t.ssContent,h,null,r,f,i,o),f.deps>0?(Pi(t,"onPending"),Pi(t,"onFallback"),c(null,t.ssFallback,e,n,r,null,i,o),fs(f,t.ssFallback)):f.resolve()}function tT(t,e,n,r,s,i,o,a,{p:l,um:c,o:{createElement:u}}){const h=e.suspense=t.suspense;h.vnode=e,e.el=t.el;const f=e.ssContent,p=e.ssFallback,{activeBranch:y,pendingBranch:E,isInFallback:b,isHydrating:w}=h;if(E)h.pendingBranch=f,Xt(f,E)?(l(E,f,h.hiddenContainer,null,s,h,i,o,a),h.deps<=0?h.resolve():b&&(l(y,p,n,r,s,null,i,o,a),fs(h,p))):(h.pendingId++,w?(h.isHydrating=!1,h.activeBranch=E):c(E,s,h),h.deps=0,h.effects.length=0,h.hiddenContainer=u("div"),b?(l(null,f,h.hiddenContainer,null,s,h,i,o,a),h.deps<=0?h.resolve():(l(y,p,n,r,s,null,i,o,a),fs(h,p))):y&&Xt(f,y)?(l(y,f,n,r,s,h,i,o,a),h.resolve(!0)):(l(null,f,h.hiddenContainer,null,s,h,i,o,a),h.deps<=0&&h.resolve()));else if(y&&Xt(f,y))l(y,f,n,r,s,h,i,o,a),fs(h,f);else if(Pi(e,"onPending"),h.pendingBranch=f,h.pendingId++,l(null,f,h.hiddenContainer,null,s,h,i,o,a),h.deps<=0)h.resolve();else{const{timeout:d,pendingId:g}=h;d>0?setTimeout(()=>{h.pendingId===g&&h.fallback(p)},d):d===0&&h.fallback(p)}}function Eh(t,e,n,r,s,i,o,a,l,c,u=!1){const{p:h,m:f,um:p,n:y,o:{parentNode:E,remove:b}}=c,w=t.props?_m(t.props.timeout):void 0,d={vnode:t,parent:e,parentComponent:n,isSVG:o,container:r,hiddenContainer:s,anchor:i,deps:0,pendingId:0,timeout:typeof w=="number"?w:-1,activeBranch:null,pendingBranch:null,isInFallback:!0,isHydrating:u,isUnmounted:!1,effects:[],resolve(g=!1){const{vnode:_,activeBranch:T,pendingBranch:I,pendingId:C,effects:A,parentComponent:R,container:M}=d;if(d.isHydrating)d.isHydrating=!1;else if(!g){const ne=T&&I.transition&&I.transition.mode==="out-in";ne&&(T.transition.afterLeave=()=>{C===d.pendingId&&f(I,M,K,0)});let{anchor:K}=d;T&&(K=y(T),p(T,R,d,!0)),ne||f(I,M,K,0)}fs(d,I),d.pendingBranch=null,d.isInFallback=!1;let q=d.parent,H=!1;for(;q;){if(q.pendingBranch){q.effects.push(...A),H=!0;break}q=q.parent}H||Hm(A),d.effects=[],Pi(_,"onResolve")},fallback(g){if(!d.pendingBranch)return;const{vnode:_,activeBranch:T,parentComponent:I,container:C,isSVG:A}=d;Pi(_,"onFallback");const R=y(T),M=()=>{d.isInFallback&&(h(null,g,C,R,I,null,A,a,l),fs(d,g))},q=g.transition&&g.transition.mode==="out-in";q&&(T.transition.afterLeave=M),d.isInFallback=!0,p(T,I,null,!0),q||M()},move(g,_,T){d.activeBranch&&f(d.activeBranch,g,_,T),d.container=g},next(){return d.activeBranch&&y(d.activeBranch)},registerDep(g,_){const T=!!d.pendingBranch;T&&d.deps++;const I=g.vnode.el;g.asyncDep.catch(C=>{Fs(C,g,0)}).then(C=>{if(g.isUnmounted||d.isUnmounted||d.pendingId!==g.suspenseId)return;g.asyncResolved=!0;const{vnode:A}=g;nu(g,C,!1),I&&(A.el=I);const R=!I&&g.subTree.el;_(g,A,E(I||g.subTree.el),I?null:y(g.subTree),d,o,l),R&&b(R),wh(g,A.el),T&&--d.deps===0&&d.resolve()})},unmount(g,_){d.isUnmounted=!0,d.activeBranch&&p(d.activeBranch,n,g,_),d.pendingBranch&&p(d.pendingBranch,n,g,_)}};return d}function nT(t,e,n,r,s,i,o,a,l){const c=e.suspense=Eh(e,r,n,t.parentNode,document.createElement("div"),null,s,i,o,a,!0),u=l(t,c.pendingBranch=e.ssContent,n,c,i,o);return c.deps===0&&c.resolve(),u}function rT(t){const{shapeFlag:e,children:n}=t,r=e&32;t.ssContent=vd(r?n.default:n),t.ssFallback=r?vd(n.fallback):De(At)}function vd(t){let e;if(ce(t)){const n=Es&&t._c;n&&(t._d=!1,In()),t=t(),n&&(t._d=!0,e=Wt,dy())}return re(t)&&(t=Qb(t)),t=qt(t),e&&!t.dynamicChildren&&(t.dynamicChildren=e.filter(n=>n!==t)),t}function Km(t,e){e&&e.pendingBranch?re(t)?e.effects.push(...t):e.effects.push(t):Hm(t)}function fs(t,e){t.activeBranch=e;const{vnode:n,parentComponent:r}=t,s=n.el=e.el;r&&r.subTree===n&&(r.vnode.el=s,wh(r,s))}function ds(t,e){if(Me){let n=Me.provides;const r=Me.parent&&Me.parent.provides;r===n&&(n=Me.provides=Object.create(r)),n[t]=e}}function $t(t,e,n=!1){const r=Me||rt;if(r){const s=r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides;if(s&&t in s)return s[t];if(arguments.length>1)return n&&ce(e)?e.call(r.proxy):e}}function sT(t,e){return ol(t,null,e)}function iT(t,e){return ol(t,null,{flush:"post"})}const Uo={};function Rn(t,e,n){return ol(t,e,n)}function ol(t,e,{immediate:n,deep:r,flush:s,onTrack:i,onTrigger:o}=Re){const a=Em()===(Me==null?void 0:Me.scope)?Me:null;let l,c=!1,u=!1;if(Ve(t)?(l=()=>t.value,c=ga(t)):us(t)?(l=()=>t,r=!0):re(t)?(u=!0,c=t.some(g=>us(g)||ga(g)),l=()=>t.map(g=>{if(Ve(g))return g.value;if(us(g))return Rr(g);if(ce(g))return ir(g,a,2)})):ce(t)?e?l=()=>ir(t,a,2):l=()=>{if(!(a&&a.isUnmounted))return h&&h(),zt(t,a,3,[f])}:l=en,e&&r){const g=l;l=()=>Rr(g())}let h,f=g=>{h=w.onStop=()=>{ir(g,a,4)}},p;if(Ts)if(f=en,e?n&&zt(e,a,3,[l(),u?[]:void 0,f]):l(),s==="sync"){const g=JT();p=g.__watcherHandles||(g.__watcherHandles=[])}else return en;let y=u?new Array(t.length).fill(Uo):Uo;const E=()=>{if(w.active)if(e){const g=w.run();(r||c||(u?g.some((_,T)=>Ci(_,y[T])):Ci(g,y)))&&(h&&h(),zt(e,a,3,[g,y===Uo?void 0:u&&y[0]===Uo?[]:y,f]),y=g)}else w.run()};E.allowRecurse=!!e;let b;s==="sync"?b=E:s==="post"?b=()=>et(E,a&&a.suspense):(E.pre=!0,a&&(E.id=a.uid),b=()=>rl(E));const w=new uh(l,b);e?n?E():y=w.run():s==="post"?et(w.run.bind(w),a&&a.suspense):w.run();const d=()=>{w.stop(),a&&a.scope&&ih(a.scope.effects,w)};return p&&p.push(d),d}function oT(t,e,n){const r=this.proxy,s=Ne(t)?t.includes(".")?Gm(r,t):()=>r[t]:t.bind(r,r);let i;ce(e)?i=e:(i=e.handler,n=e);const o=Me;hr(this);const a=ol(s,i.bind(r),n);return o?hr(o):or(),a}function Gm(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}function Rr(t,e){if(!ke(t)||t.__v_skip||(e=e||new Set,e.has(t)))return t;if(e.add(t),Ve(t))Rr(t.value,e);else if(re(t))for(let n=0;n<t.length;n++)Rr(t[n],e);else if(gm(t)||ls(t))t.forEach(n=>{Rr(n,e)});else if(ym(t))for(const n in t)Rr(t[n],e);return t}function Qm(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return ll(()=>{t.isMounted=!0}),Zi(()=>{t.isUnmounting=!0}),t}const Ht=[Function,Array],aT={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Ht,onEnter:Ht,onAfterEnter:Ht,onEnterCancelled:Ht,onBeforeLeave:Ht,onLeave:Ht,onAfterLeave:Ht,onLeaveCancelled:Ht,onBeforeAppear:Ht,onAppear:Ht,onAfterAppear:Ht,onAppearCancelled:Ht},setup(t,{slots:e}){const n=Vn(),r=Qm();let s;return()=>{const i=e.default&&bh(e.default(),!0);if(!i||!i.length)return;let o=i[0];if(i.length>1){for(const E of i)if(E.type!==At){o=E;break}}const a=me(t),{mode:l}=a;if(r.isLeaving)return nc(o);const c=wd(o);if(!c)return nc(o);const u=Di(c,a,r,n);vs(c,u);const h=n.subTree,f=h&&wd(h);let p=!1;const{getTransitionKey:y}=c.type;if(y){const E=y();s===void 0?s=E:E!==s&&(s=E,p=!0)}if(f&&f.type!==At&&(!Xt(c,f)||p)){const E=Di(f,a,r,n);if(vs(f,E),l==="out-in")return r.isLeaving=!0,E.afterLeave=()=>{r.isLeaving=!1,n.update.active!==!1&&n.update()},nc(o);l==="in-out"&&c.type!==At&&(E.delayLeave=(b,w,d)=>{const g=Ym(r,f);g[String(f.key)]=f,b._leaveCb=()=>{w(),b._leaveCb=void 0,delete u.delayedLeave},u.delayedLeave=d})}return o}}},Jm=aT;function Ym(t,e){const{leavingVNodes:n}=t;let r=n.get(e.type);return r||(r=Object.create(null),n.set(e.type,r)),r}function Di(t,e,n,r){const{appear:s,mode:i,persisted:o=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:c,onEnterCancelled:u,onBeforeLeave:h,onLeave:f,onAfterLeave:p,onLeaveCancelled:y,onBeforeAppear:E,onAppear:b,onAfterAppear:w,onAppearCancelled:d}=e,g=String(t.key),_=Ym(n,t),T=(A,R)=>{A&&zt(A,r,9,R)},I=(A,R)=>{const M=R[1];T(A,R),re(A)?A.every(q=>q.length<=1)&&M():A.length<=1&&M()},C={mode:i,persisted:o,beforeEnter(A){let R=a;if(!n.isMounted)if(s)R=E||a;else return;A._leaveCb&&A._leaveCb(!0);const M=_[g];M&&Xt(t,M)&&M.el._leaveCb&&M.el._leaveCb(),T(R,[A])},enter(A){let R=l,M=c,q=u;if(!n.isMounted)if(s)R=b||l,M=w||c,q=d||u;else return;let H=!1;const ne=A._enterCb=K=>{H||(H=!0,K?T(q,[A]):T(M,[A]),C.delayedLeave&&C.delayedLeave(),A._enterCb=void 0)};R?I(R,[A,ne]):ne()},leave(A,R){const M=String(t.key);if(A._enterCb&&A._enterCb(!0),n.isUnmounting)return R();T(h,[A]);let q=!1;const H=A._leaveCb=ne=>{q||(q=!0,R(),ne?T(y,[A]):T(p,[A]),A._leaveCb=void 0,_[M]===t&&delete _[M])};_[M]=t,f?I(f,[A,H]):H()},clone(A){return Di(A,e,n,r)}};return C}function nc(t){if(Xi(t))return t=Dn(t),t.children=null,t}function wd(t){return Xi(t)?t.children?t.children[0]:void 0:t}function vs(t,e){t.shapeFlag&6&&t.component?vs(t.component.subTree,e):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function bh(t,e=!1,n){let r=[],s=0;for(let i=0;i<t.length;i++){let o=t[i];const a=n==null?o.key:String(n)+String(o.key!=null?o.key:i);o.type===ut?(o.patchFlag&128&&s++,r=r.concat(bh(o.children,e,a))):(e||o.type!==At)&&r.push(a!=null?Dn(o,{key:a}):o)}if(s>1)for(let i=0;i<r.length;i++)r[i].patchFlag=-2;return r}function Un(t){return ce(t)?{setup:t,name:t.name}:t}const Nr=t=>!!t.type.__asyncLoader;function F(t){ce(t)&&(t={loader:t});const{loader:e,loadingComponent:n,errorComponent:r,delay:s=200,timeout:i,suspensible:o=!0,onError:a}=t;let l=null,c,u=0;const h=()=>(u++,l=null,f()),f=()=>{let p;return l||(p=l=e().catch(y=>{if(y=y instanceof Error?y:new Error(String(y)),a)return new Promise((E,b)=>{a(y,()=>E(h()),()=>b(y),u+1)});throw y}).then(y=>p!==l&&l?l:(y&&(y.__esModule||y[Symbol.toStringTag]==="Module")&&(y=y.default),c=y,y)))};return Un({name:"AsyncComponentWrapper",__asyncLoader:f,get __asyncResolved(){return c},setup(){const p=Me;if(c)return()=>rc(c,p);const y=d=>{l=null,Fs(d,p,13,!r)};if(o&&p.suspense||Ts)return f().then(d=>()=>rc(d,p)).catch(d=>(y(d),()=>r?De(r,{error:d}):null));const E=nt(!1),b=nt(),w=nt(!!s);return s&&setTimeout(()=>{w.value=!1},s),i!=null&&setTimeout(()=>{if(!E.value&&!b.value){const d=new Error(`Async component timed out after ${i}ms.`);y(d),b.value=d}},i),f().then(()=>{E.value=!0,p.parent&&Xi(p.parent.vnode)&&rl(p.parent.update)}).catch(d=>{y(d),b.value=d}),()=>{if(E.value&&c)return rc(c,p);if(b.value&&r)return De(r,{error:b.value});if(n&&!w.value)return De(n)}}})}function rc(t,e){const{ref:n,props:r,children:s,ce:i}=e.vnode,o=De(t,r,s);return o.ref=n,o.ce=i,delete e.vnode.ce,o}const Xi=t=>t.type.__isKeepAlive,lT={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(t,{slots:e}){const n=Vn(),r=n.ctx;if(!r.renderer)return()=>{const d=e.default&&e.default();return d&&d.length===1?d[0]:d};const s=new Map,i=new Set;let o=null;const a=n.suspense,{renderer:{p:l,m:c,um:u,o:{createElement:h}}}=r,f=h("div");r.activate=(d,g,_,T,I)=>{const C=d.component;c(d,g,_,0,a),l(C.vnode,d,g,_,C,a,T,d.slotScopeIds,I),et(()=>{C.isDeactivated=!1,C.a&&cs(C.a);const A=d.props&&d.props.onVnodeMounted;A&&St(A,C.parent,d)},a)},r.deactivate=d=>{const g=d.component;c(d,f,null,1,a),et(()=>{g.da&&cs(g.da);const _=d.props&&d.props.onVnodeUnmounted;_&&St(_,g.parent,d),g.isDeactivated=!0},a)};function p(d){sc(d),u(d,n,a,!0)}function y(d){s.forEach((g,_)=>{const T=ru(g.type);T&&(!d||!d(T))&&E(_)})}function E(d){const g=s.get(d);!o||!Xt(g,o)?p(g):o&&sc(o),s.delete(d),i.delete(d)}Rn(()=>[t.include,t.exclude],([d,g])=>{d&&y(_=>ii(d,_)),g&&y(_=>!ii(g,_))},{flush:"post",deep:!0});let b=null;const w=()=>{b!=null&&s.set(b,ic(n.subTree))};return ll(w),Th(w),Zi(()=>{s.forEach(d=>{const{subTree:g,suspense:_}=n,T=ic(g);if(d.type===T.type&&d.key===T.key){sc(T);const I=T.component.da;I&&et(I,_);return}p(d)})}),()=>{if(b=null,!e.default)return null;const d=e.default(),g=d[0];if(d.length>1)return o=null,d;if(!bs(g)||!(g.shapeFlag&4)&&!(g.shapeFlag&128))return o=null,g;let _=ic(g);const T=_.type,I=ru(Nr(_)?_.type.__asyncResolved||{}:T),{include:C,exclude:A,max:R}=t;if(C&&(!I||!ii(C,I))||A&&I&&ii(A,I))return o=_,g;const M=_.key==null?T:_.key,q=s.get(M);return _.el&&(_=Dn(_),g.shapeFlag&128&&(g.ssContent=_)),b=M,q?(_.el=q.el,_.component=q.component,_.transition&&vs(_,_.transition),_.shapeFlag|=512,i.delete(M),i.add(M)):(i.add(M),R&&i.size>parseInt(R,10)&&E(i.values().next().value)),_.shapeFlag|=256,o=_,Wm(g.type)?g:_}}},cT=lT;function ii(t,e){return re(t)?t.some(n=>ii(n,e)):Ne(t)?t.split(",").includes(e):ib(t)?t.test(e):!1}function Xm(t,e){ey(t,"a",e)}function Zm(t,e){ey(t,"da",e)}function ey(t,e,n=Me){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(al(e,r,n),n){let s=n.parent;for(;s&&s.parent;)Xi(s.parent.vnode)&&uT(r,e,n,s),s=s.parent}}function uT(t,e,n,r){const s=al(e,t,r,!0);Ih(()=>{ih(r[e],s)},n)}function sc(t){t.shapeFlag&=-257,t.shapeFlag&=-513}function ic(t){return t.shapeFlag&128?t.ssContent:t}function al(t,e,n=Me,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;xs(),hr(n);const a=zt(e,n,t,o);return or(),Ms(),a});return r?s.unshift(i):s.push(i),i}}const $n=t=>(e,n=Me)=>(!Ts||t==="sp")&&al(t,(...r)=>e(...r),n),hT=$n("bm"),ll=$n("m"),fT=$n("bu"),Th=$n("u"),Zi=$n("bum"),Ih=$n("um"),dT=$n("sp"),pT=$n("rtg"),gT=$n("rtc");function ty(t,e=Me){al("ec",t,e)}function aF(t,e){const n=rt;if(n===null)return t;const r=ul(n)||n.proxy,s=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[o,a,l,c=Re]=e[i];o&&(ce(o)&&(o={mounted:o,updated:o}),o.deep&&Rr(a),s.push({dir:o,instance:r,value:a,oldValue:void 0,arg:l,modifiers:c}))}return t}function ln(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let l=a.dir[r];l&&(xs(),zt(l,n,8,[t.el,a,t,e]),Ms())}}const Ah="components",mT="directives";function lF(t,e){return Sh(Ah,t,!0,e)||t}const ny=Symbol();function yT(t){return Ne(t)?Sh(Ah,t,!1)||t:t||ny}function cF(t){return Sh(mT,t)}function Sh(t,e,n=!0,r=!1){const s=rt||Me;if(s){const i=s.type;if(t===Ah){const a=ru(i,!1);if(a&&(a===e||a===mn(e)||a===tl(mn(e))))return i}const o=Ed(s[t]||i[t],e)||Ed(s.appContext[t],e);return!o&&r?i:o}}function Ed(t,e){return t&&(t[e]||t[mn(e)]||t[tl(mn(e))])}function uF(t,e,n,r){let s;const i=n&&n[r];if(re(t)||Ne(t)){s=new Array(t.length);for(let o=0,a=t.length;o<a;o++)s[o]=e(t[o],o,void 0,i&&i[o])}else if(typeof t=="number"){s=new Array(t);for(let o=0;o<t;o++)s[o]=e(o+1,o,void 0,i&&i[o])}else if(ke(t))if(t[Symbol.iterator])s=Array.from(t,(o,a)=>e(o,a,void 0,i&&i[a]));else{const o=Object.keys(t);s=new Array(o.length);for(let a=0,l=o.length;a<l;a++){const c=o[a];s[a]=e(t[c],c,a,i&&i[a])}}else s=[];return n&&(n[r]=s),s}function hF(t,e){for(let n=0;n<e.length;n++){const r=e[n];if(re(r))for(let s=0;s<r.length;s++)t[r[s].name]=r[s].fn;else r&&(t[r.name]=r.key?(...s)=>{const i=r.fn(...s);return i&&(i.key=r.key),i}:r.fn)}return t}function fF(t,e,n={},r,s){if(rt.isCE||rt.parent&&Nr(rt.parent)&&rt.parent.isCE)return e!=="default"&&(n.name=e),De("slot",n,r&&r());let i=t[e];i&&i._c&&(i._d=!1),In();const o=i&&ry(i(n)),a=Yn(ut,{key:n.key||o&&o.key||`_${e}`},o||(r?r():[]),o&&t._===1?64:-2);return!s&&a.scopeId&&(a.slotScopeIds=[a.scopeId+"-s"]),i&&i._c&&(i._d=!0),a}function ry(t){return t.some(e=>bs(e)?!(e.type===At||e.type===ut&&!ry(e.children)):!0)?t:null}function dF(t,e){const n={};for(const r in t)n[e&&/[A-Z]/.test(r)?`on:${r}`:na(r)]=t[r];return n}const Yc=t=>t?_y(t)?ul(t)||t.proxy:Yc(t.parent):null,di=Ye(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Yc(t.parent),$root:t=>Yc(t.root),$emit:t=>t.emit,$options:t=>Ch(t),$forceUpdate:t=>t.f||(t.f=()=>rl(t.update)),$nextTick:t=>t.n||(t.n=yr.bind(t.proxy)),$watch:t=>oT.bind(t)}),oc=(t,e)=>t!==Re&&!t.__isScriptSetup&&_e(t,e),_T={get({_:t},e){const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:l}=t;let c;if(e[0]!=="$"){const p=o[e];if(p!==void 0)switch(p){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(oc(r,e))return o[e]=1,r[e];if(s!==Re&&_e(s,e))return o[e]=2,s[e];if((c=t.propsOptions[0])&&_e(c,e))return o[e]=3,i[e];if(n!==Re&&_e(n,e))return o[e]=4,n[e];Xc&&(o[e]=0)}}const u=di[e];let h,f;if(u)return e==="$attrs"&&kt(t,"get",e),u(t);if((h=a.__cssModules)&&(h=h[e]))return h;if(n!==Re&&_e(n,e))return o[e]=4,n[e];if(f=l.config.globalProperties,_e(f,e))return f[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return oc(s,e)?(s[e]=n,!0):r!==Re&&_e(r,e)?(r[e]=n,!0):_e(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let a;return!!n[o]||t!==Re&&_e(t,o)||oc(e,o)||(a=i[0])&&_e(a,o)||_e(r,o)||_e(di,o)||_e(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:_e(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};let Xc=!0;function vT(t){const e=Ch(t),n=t.proxy,r=t.ctx;Xc=!1,e.beforeCreate&&bd(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:p,updated:y,activated:E,deactivated:b,beforeDestroy:w,beforeUnmount:d,destroyed:g,unmounted:_,render:T,renderTracked:I,renderTriggered:C,errorCaptured:A,serverPrefetch:R,expose:M,inheritAttrs:q,components:H,directives:ne,filters:K}=e;if(c&&wT(c,r,null,t.appContext.config.unwrapInjectedRef),o)for(const we in o){const se=o[we];ce(se)&&(r[we]=se.bind(n))}if(s){const we=s.call(n,n);ke(we)&&(t.data=Vt(we))}if(Xc=!0,i)for(const we in i){const se=i[we],Be=ce(se)?se.bind(n,n):ce(se.get)?se.get.bind(n,n):en,vt=!ce(se)&&ce(se.set)?se.set.bind(n):en,wt=dt({get:Be,set:vt});Object.defineProperty(r,we,{enumerable:!0,configurable:!0,get:()=>wt.value,set:Ie=>wt.value=Ie})}if(a)for(const we in a)sy(a[we],r,n,we);if(l){const we=ce(l)?l.call(n):l;Reflect.ownKeys(we).forEach(se=>{ds(se,we[se])})}u&&bd(u,t,"c");function ye(we,se){re(se)?se.forEach(Be=>we(Be.bind(n))):se&&we(se.bind(n))}if(ye(hT,h),ye(ll,f),ye(fT,p),ye(Th,y),ye(Xm,E),ye(Zm,b),ye(ty,A),ye(gT,I),ye(pT,C),ye(Zi,d),ye(Ih,_),ye(dT,R),re(M))if(M.length){const we=t.exposed||(t.exposed={});M.forEach(se=>{Object.defineProperty(we,se,{get:()=>n[se],set:Be=>n[se]=Be})})}else t.exposed||(t.exposed={});T&&t.render===en&&(t.render=T),q!=null&&(t.inheritAttrs=q),H&&(t.components=H),ne&&(t.directives=ne)}function wT(t,e,n=en,r=!1){re(t)&&(t=Zc(t));for(const s in t){const i=t[s];let o;ke(i)?"default"in i?o=$t(i.from||s,i.default,!0):o=$t(i.from||s):o=$t(i),Ve(o)&&r?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>o.value,set:a=>o.value=a}):e[s]=o}}function bd(t,e,n){zt(re(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function sy(t,e,n,r){const s=r.includes(".")?Gm(n,r):()=>n[r];if(Ne(t)){const i=e[t];ce(i)&&Rn(s,i)}else if(ce(t))Rn(s,t.bind(n));else if(ke(t))if(re(t))t.forEach(i=>sy(i,e,n,r));else{const i=ce(t.handler)?t.handler.bind(n):e[t.handler];ce(i)&&Rn(s,i,t)}}function Ch(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let l;return a?l=a:!s.length&&!n&&!r?l=e:(l={},s.length&&s.forEach(c=>va(l,c,o,!0)),va(l,e,o)),ke(e)&&i.set(e,l),l}function va(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&va(t,i,n,!0),s&&s.forEach(o=>va(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const a=ET[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const ET={data:Td,props:Tr,emits:Tr,methods:Tr,computed:Tr,beforeCreate:Tt,created:Tt,beforeMount:Tt,mounted:Tt,beforeUpdate:Tt,updated:Tt,beforeDestroy:Tt,beforeUnmount:Tt,destroyed:Tt,unmounted:Tt,activated:Tt,deactivated:Tt,errorCaptured:Tt,serverPrefetch:Tt,components:Tr,directives:Tr,watch:TT,provide:Td,inject:bT};function Td(t,e){return e?t?function(){return Ye(ce(t)?t.call(this,this):t,ce(e)?e.call(this,this):e)}:e:t}function bT(t,e){return Tr(Zc(t),Zc(e))}function Zc(t){if(re(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Tt(t,e){return t?[...new Set([].concat(t,e))]:e}function Tr(t,e){return t?Ye(Ye(Object.create(null),t),e):e}function TT(t,e){if(!t)return e;if(!e)return t;const n=Ye(Object.create(null),t);for(const r in e)n[r]=Tt(t[r],e[r]);return n}function IT(t,e,n,r=!1){const s={},i={};da(i,cl,1),t.propsDefaults=Object.create(null),iy(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:Dm(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function AT(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,a=me(s),[l]=t.propsOptions;let c=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(sl(t.emitsOptions,f))continue;const p=e[f];if(l)if(_e(i,f))p!==i[f]&&(i[f]=p,c=!0);else{const y=mn(f);s[y]=eu(l,a,y,p,t,!1)}else p!==i[f]&&(i[f]=p,c=!0)}}}else{iy(t,e,s,i)&&(c=!0);let u;for(const h in a)(!e||!_e(e,h)&&((u=zr(h))===h||!_e(e,u)))&&(l?n&&(n[h]!==void 0||n[u]!==void 0)&&(s[h]=eu(l,a,h,void 0,t,!0)):delete s[h]);if(i!==a)for(const h in i)(!e||!_e(e,h))&&(delete i[h],c=!0)}c&&Pn(t,"set","$attrs")}function iy(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,a;if(e)for(let l in e){if(fi(l))continue;const c=e[l];let u;s&&_e(s,u=mn(l))?!i||!i.includes(u)?n[u]=c:(a||(a={}))[u]=c:sl(t.emitsOptions,l)||(!(l in r)||c!==r[l])&&(r[l]=c,o=!0)}if(i){const l=me(n),c=a||Re;for(let u=0;u<i.length;u++){const h=i[u];n[h]=eu(s,l,h,c[h],t,!_e(c,h))}}return o}function eu(t,e,n,r,s,i){const o=t[n];if(o!=null){const a=_e(o,"default");if(a&&r===void 0){const l=o.default;if(o.type!==Function&&ce(l)){const{propsDefaults:c}=s;n in c?r=c[n]:(hr(s),r=c[n]=l.call(null,e),or())}else r=l}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===zr(n))&&(r=!0))}return r}function oy(t,e,n=!1){const r=e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},a=[];let l=!1;if(!ce(t)){const u=h=>{l=!0;const[f,p]=oy(h,e,!0);Ye(o,f),p&&a.push(...p)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!l)return ke(t)&&r.set(t,as),as;if(re(i))for(let u=0;u<i.length;u++){const h=mn(i[u]);Id(h)&&(o[h]=Re)}else if(i)for(const u in i){const h=mn(u);if(Id(h)){const f=i[u],p=o[h]=re(f)||ce(f)?{type:f}:Object.assign({},f);if(p){const y=Cd(Boolean,p.type),E=Cd(String,p.type);p[0]=y>-1,p[1]=E<0||y<E,(y>-1||_e(p,"default"))&&a.push(h)}}}const c=[o,a];return ke(t)&&r.set(t,c),c}function Id(t){return t[0]!=="$"}function Ad(t){const e=t&&t.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:t===null?"null":""}function Sd(t,e){return Ad(t)===Ad(e)}function Cd(t,e){return re(e)?e.findIndex(n=>Sd(n,t)):ce(e)&&Sd(e,t)?0:-1}const ay=t=>t[0]==="_"||t==="$stable",Rh=t=>re(t)?t.map(qt):[qt(t)],ST=(t,e,n)=>{if(e._n)return e;const r=vh((...s)=>Rh(e(...s)),n);return r._c=!1,r},ly=(t,e,n)=>{const r=t._ctx;for(const s in t){if(ay(s))continue;const i=t[s];if(ce(i))e[s]=ST(s,i,r);else if(i!=null){const o=Rh(i);e[s]=()=>o}}},cy=(t,e)=>{const n=Rh(e);t.slots.default=()=>n},CT=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=me(e),da(e,"_",n)):ly(e,t.slots={})}else t.slots={},e&&cy(t,e);da(t.slots,cl,1)},RT=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Re;if(r.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:(Ye(s,e),!n&&a===1&&delete s._):(i=!e.$stable,ly(e,s)),o=e}else e&&(cy(t,e),o={default:1});if(i)for(const a in s)!ay(a)&&!(a in o)&&delete s[a]};function uy(){return{app:null,config:{isNativeTag:nb,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let kT=0;function OT(t,e){return function(r,s=null){ce(r)||(r=Object.assign({},r)),s!=null&&!ke(s)&&(s=null);const i=uy(),o=new Set;let a=!1;const l=i.app={_uid:kT++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:wy,get config(){return i.config},set config(c){},use(c,...u){return o.has(c)||(c&&ce(c.install)?(o.add(c),c.install(l,...u)):ce(c)&&(o.add(c),c(l,...u))),l},mixin(c){return i.mixins.includes(c)||i.mixins.push(c),l},component(c,u){return u?(i.components[c]=u,l):i.components[c]},directive(c,u){return u?(i.directives[c]=u,l):i.directives[c]},mount(c,u,h){if(!a){const f=De(r,s);return f.appContext=i,u&&e?e(f,c):t(f,c,h),a=!0,l._container=c,c.__vue_app__=l,ul(f.component)||f.component.proxy}},unmount(){a&&(t(null,l._container),delete l._container.__vue_app__)},provide(c,u){return i.provides[c]=u,l}};return l}}function wa(t,e,n,r,s=!1){if(re(t)){t.forEach((f,p)=>wa(f,e&&(re(e)?e[p]:e),n,r,s));return}if(Nr(r)&&!s)return;const i=r.shapeFlag&4?ul(r.component)||r.component.proxy:r.el,o=s?null:i,{i:a,r:l}=t,c=e&&e.r,u=a.refs===Re?a.refs={}:a.refs,h=a.setupState;if(c!=null&&c!==l&&(Ne(c)?(u[c]=null,_e(h,c)&&(h[c]=null)):Ve(c)&&(c.value=null)),ce(l))ir(l,a,12,[o,u]);else{const f=Ne(l),p=Ve(l);if(f||p){const y=()=>{if(t.f){const E=f?_e(h,l)?h[l]:u[l]:l.value;s?re(E)&&ih(E,i):re(E)?E.includes(i)||E.push(i):f?(u[l]=[i],_e(h,l)&&(h[l]=u[l])):(l.value=[i],t.k&&(u[t.k]=l.value))}else f?(u[l]=o,_e(h,l)&&(h[l]=o)):p&&(l.value=o,t.k&&(u[t.k]=o))};o?(y.id=-1,et(y,n)):y()}}}let qn=!1;const $o=t=>/svg/.test(t.namespaceURI)&&t.tagName!=="foreignObject",Vo=t=>t.nodeType===8;function PT(t){const{mt:e,p:n,o:{patchProp:r,createText:s,nextSibling:i,parentNode:o,remove:a,insert:l,createComment:c}}=t,u=(w,d)=>{if(!d.hasChildNodes()){n(null,w,d),ya(),d._vnode=w;return}qn=!1,h(d.firstChild,w,null,null,null),ya(),d._vnode=w,qn&&console.error("Hydration completed but contains mismatches.")},h=(w,d,g,_,T,I=!1)=>{const C=Vo(w)&&w.data==="[",A=()=>E(w,d,g,_,T,C),{type:R,ref:M,shapeFlag:q,patchFlag:H}=d;let ne=w.nodeType;d.el=w,H===-2&&(I=!1,d.dynamicChildren=null);let K=null;switch(R){case ws:ne!==3?d.children===""?(l(d.el=s(""),o(w),w),K=w):K=A():(w.data!==d.children&&(qn=!0,w.data=d.children),K=i(w));break;case At:ne!==8||C?K=A():K=i(w);break;case gi:if(C&&(w=i(w),ne=w.nodeType),ne===1||ne===3){K=w;const ze=!d.children.length;for(let ye=0;ye<d.staticCount;ye++)ze&&(d.children+=K.nodeType===1?K.outerHTML:K.data),ye===d.staticCount-1&&(d.anchor=K),K=i(K);return C?i(K):K}else A();break;case ut:C?K=y(w,d,g,_,T,I):K=A();break;default:if(q&1)ne!==1||d.type.toLowerCase()!==w.tagName.toLowerCase()?K=A():K=f(w,d,g,_,T,I);else if(q&6){d.slotScopeIds=T;const ze=o(w);if(e(d,ze,null,g,_,$o(ze),I),K=C?b(w):i(w),K&&Vo(K)&&K.data==="teleport end"&&(K=i(K)),Nr(d)){let ye;C?(ye=De(ut),ye.anchor=K?K.previousSibling:ze.lastChild):ye=w.nodeType===3?yy(""):De("div"),ye.el=w,d.component.subTree=ye}}else q&64?ne!==8?K=A():K=d.type.hydrate(w,d,g,_,T,I,t,p):q&128&&(K=d.type.hydrate(w,d,g,_,$o(o(w)),T,I,t,h))}return M!=null&&wa(M,null,_,d),K},f=(w,d,g,_,T,I)=>{I=I||!!d.dynamicChildren;const{type:C,props:A,patchFlag:R,shapeFlag:M,dirs:q}=d,H=C==="input"&&q||C==="option";if(H||R!==-1){if(q&&ln(d,null,g,"created"),A)if(H||!I||R&48)for(const K in A)(H&&K.endsWith("value")||Ji(K)&&!fi(K))&&r(w,K,null,A[K],!1,void 0,g);else A.onClick&&r(w,"onClick",null,A.onClick,!1,void 0,g);let ne;if((ne=A&&A.onVnodeBeforeMount)&&St(ne,g,d),q&&ln(d,null,g,"beforeMount"),((ne=A&&A.onVnodeMounted)||q)&&Km(()=>{ne&&St(ne,g,d),q&&ln(d,null,g,"mounted")},_),M&16&&!(A&&(A.innerHTML||A.textContent))){let K=p(w.firstChild,d,w,g,_,T,I);for(;K;){qn=!0;const ze=K;K=K.nextSibling,a(ze)}}else M&8&&w.textContent!==d.children&&(qn=!0,w.textContent=d.children)}return w.nextSibling},p=(w,d,g,_,T,I,C)=>{C=C||!!d.dynamicChildren;const A=d.children,R=A.length;for(let M=0;M<R;M++){const q=C?A[M]:A[M]=qt(A[M]);if(w)w=h(w,q,_,T,I,C);else{if(q.type===ws&&!q.children)continue;qn=!0,n(null,q,g,null,_,T,$o(g),I)}}return w},y=(w,d,g,_,T,I)=>{const{slotScopeIds:C}=d;C&&(T=T?T.concat(C):C);const A=o(w),R=p(i(w),d,A,g,_,T,I);return R&&Vo(R)&&R.data==="]"?i(d.anchor=R):(qn=!0,l(d.anchor=c("]"),A,R),R)},E=(w,d,g,_,T,I)=>{if(qn=!0,d.el=null,I){const R=b(w);for(;;){const M=i(w);if(M&&M!==R)a(M);else break}}const C=i(w),A=o(w);return a(w),n(null,d,A,C,g,_,$o(A),T),C},b=w=>{let d=0;for(;w;)if(w=i(w),w&&Vo(w)&&(w.data==="["&&d++,w.data==="]")){if(d===0)return i(w);d--}return w};return[u,h]}const et=Km;function DT(t){return hy(t)}function NT(t){return hy(t,PT)}function hy(t,e){const n=cb();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:p=en,insertStaticContent:y}=t,E=(m,v,S,k=null,D=null,L=null,W=!1,$=null,B=!!v.dynamicChildren)=>{if(m===v)return;m&&!Xt(m,v)&&(k=P(m),Ie(m,D,L,!0),m=null),v.patchFlag===-2&&(B=!1,v.dynamicChildren=null);const{type:x,ref:ee,shapeFlag:Q}=v;switch(x){case ws:b(m,v,S,k);break;case At:w(m,v,S,k);break;case gi:m==null&&d(v,S,k,W);break;case ut:H(m,v,S,k,D,L,W,$,B);break;default:Q&1?T(m,v,S,k,D,L,W,$,B):Q&6?ne(m,v,S,k,D,L,W,$,B):(Q&64||Q&128)&&x.process(m,v,S,k,D,L,W,$,B,V)}ee!=null&&D&&wa(ee,m&&m.ref,L,v||m,!v)},b=(m,v,S,k)=>{if(m==null)r(v.el=a(v.children),S,k);else{const D=v.el=m.el;v.children!==m.children&&c(D,v.children)}},w=(m,v,S,k)=>{m==null?r(v.el=l(v.children||""),S,k):v.el=m.el},d=(m,v,S,k)=>{[m.el,m.anchor]=y(m.children,v,S,k,m.el,m.anchor)},g=({el:m,anchor:v},S,k)=>{let D;for(;m&&m!==v;)D=f(m),r(m,S,k),m=D;r(v,S,k)},_=({el:m,anchor:v})=>{let S;for(;m&&m!==v;)S=f(m),s(m),m=S;s(v)},T=(m,v,S,k,D,L,W,$,B)=>{W=W||v.type==="svg",m==null?I(v,S,k,D,L,W,$,B):R(m,v,D,L,W,$,B)},I=(m,v,S,k,D,L,W,$)=>{let B,x;const{type:ee,props:Q,shapeFlag:te,transition:le,dirs:fe}=m;if(B=m.el=o(m.type,L,Q&&Q.is,Q),te&8?u(B,m.children):te&16&&A(m.children,B,null,k,D,L&&ee!=="foreignObject",W,$),fe&&ln(m,null,k,"created"),C(B,m,m.scopeId,W,k),Q){for(const Te in Q)Te!=="value"&&!fi(Te)&&i(B,Te,null,Q[Te],L,m.children,k,D,Ue);"value"in Q&&i(B,"value",null,Q.value),(x=Q.onVnodeBeforeMount)&&St(x,k,m)}fe&&ln(m,null,k,"beforeMount");const Ae=(!D||D&&!D.pendingBranch)&&le&&!le.persisted;Ae&&le.beforeEnter(B),r(B,v,S),((x=Q&&Q.onVnodeMounted)||Ae||fe)&&et(()=>{x&&St(x,k,m),Ae&&le.enter(B),fe&&ln(m,null,k,"mounted")},D)},C=(m,v,S,k,D)=>{if(S&&p(m,S),k)for(let L=0;L<k.length;L++)p(m,k[L]);if(D){let L=D.subTree;if(v===L){const W=D.vnode;C(m,W,W.scopeId,W.slotScopeIds,D.parent)}}},A=(m,v,S,k,D,L,W,$,B=0)=>{for(let x=B;x<m.length;x++){const ee=m[x]=$?Qn(m[x]):qt(m[x]);E(null,ee,v,S,k,D,L,W,$)}},R=(m,v,S,k,D,L,W)=>{const $=v.el=m.el;let{patchFlag:B,dynamicChildren:x,dirs:ee}=v;B|=m.patchFlag&16;const Q=m.props||Re,te=v.props||Re;let le;S&&Er(S,!1),(le=te.onVnodeBeforeUpdate)&&St(le,S,v,m),ee&&ln(v,m,S,"beforeUpdate"),S&&Er(S,!0);const fe=D&&v.type!=="foreignObject";if(x?M(m.dynamicChildren,x,$,S,k,fe,L):W||se(m,v,$,null,S,k,fe,L,!1),B>0){if(B&16)q($,v,Q,te,S,k,D);else if(B&2&&Q.class!==te.class&&i($,"class",null,te.class,D),B&4&&i($,"style",Q.style,te.style,D),B&8){const Ae=v.dynamicProps;for(let Te=0;Te<Ae.length;Te++){const He=Ae[Te],Jt=Q[He],Yr=te[He];(Yr!==Jt||He==="value")&&i($,He,Jt,Yr,D,m.children,S,k,Ue)}}B&1&&m.children!==v.children&&u($,v.children)}else!W&&x==null&&q($,v,Q,te,S,k,D);((le=te.onVnodeUpdated)||ee)&&et(()=>{le&&St(le,S,v,m),ee&&ln(v,m,S,"updated")},k)},M=(m,v,S,k,D,L,W)=>{for(let $=0;$<v.length;$++){const B=m[$],x=v[$],ee=B.el&&(B.type===ut||!Xt(B,x)||B.shapeFlag&70)?h(B.el):S;E(B,x,ee,null,k,D,L,W,!0)}},q=(m,v,S,k,D,L,W)=>{if(S!==k){if(S!==Re)for(const $ in S)!fi($)&&!($ in k)&&i(m,$,S[$],null,W,v.children,D,L,Ue);for(const $ in k){if(fi($))continue;const B=k[$],x=S[$];B!==x&&$!=="value"&&i(m,$,x,B,W,v.children,D,L,Ue)}"value"in k&&i(m,"value",S.value,k.value)}},H=(m,v,S,k,D,L,W,$,B)=>{const x=v.el=m?m.el:a(""),ee=v.anchor=m?m.anchor:a("");let{patchFlag:Q,dynamicChildren:te,slotScopeIds:le}=v;le&&($=$?$.concat(le):le),m==null?(r(x,S,k),r(ee,S,k),A(v.children,S,ee,D,L,W,$,B)):Q>0&&Q&64&&te&&m.dynamicChildren?(M(m.dynamicChildren,te,S,D,L,W,$),(v.key!=null||D&&v===D.subTree)&&kh(m,v,!0)):se(m,v,S,ee,D,L,W,$,B)},ne=(m,v,S,k,D,L,W,$,B)=>{v.slotScopeIds=$,m==null?v.shapeFlag&512?D.ctx.activate(v,S,k,W,B):K(v,S,k,D,L,W,B):ze(m,v,B)},K=(m,v,S,k,D,L,W)=>{const $=m.component=jT(m,k,D);if(Xi(m)&&($.ctx.renderer=V),qT($),$.asyncDep){if(D&&D.registerDep($,ye),!m.el){const B=$.subTree=De(At);w(null,B,v,S)}return}ye($,m,v,S,D,L,W)},ze=(m,v,S)=>{const k=v.component=m.component;if(Xb(m,v,S))if(k.asyncDep&&!k.asyncResolved){we(k,v,S);return}else k.next=v,zb(k.update),k.update();else v.el=m.el,k.vnode=v},ye=(m,v,S,k,D,L,W)=>{const $=()=>{if(m.isMounted){let{next:ee,bu:Q,u:te,parent:le,vnode:fe}=m,Ae=ee,Te;Er(m,!1),ee?(ee.el=fe.el,we(m,ee,W)):ee=fe,Q&&cs(Q),(Te=ee.props&&ee.props.onVnodeBeforeUpdate)&&St(Te,le,ee,fe),Er(m,!0);const He=tc(m),Jt=m.subTree;m.subTree=He,E(Jt,He,h(Jt.el),P(Jt),m,D,L),ee.el=He.el,Ae===null&&wh(m,He.el),te&&et(te,D),(Te=ee.props&&ee.props.onVnodeUpdated)&&et(()=>St(Te,le,ee,fe),D)}else{let ee;const{el:Q,props:te}=v,{bm:le,m:fe,parent:Ae}=m,Te=Nr(v);if(Er(m,!1),le&&cs(le),!Te&&(ee=te&&te.onVnodeBeforeMount)&&St(ee,Ae,v),Er(m,!0),Q&&pe){const He=()=>{m.subTree=tc(m),pe(Q,m.subTree,m,D,null)};Te?v.type.__asyncLoader().then(()=>!m.isUnmounted&&He()):He()}else{const He=m.subTree=tc(m);E(null,He,S,k,m,D,L),v.el=He.el}if(fe&&et(fe,D),!Te&&(ee=te&&te.onVnodeMounted)){const He=v;et(()=>St(ee,Ae,He),D)}(v.shapeFlag&256||Ae&&Nr(Ae.vnode)&&Ae.vnode.shapeFlag&256)&&m.a&&et(m.a,D),m.isMounted=!0,v=S=k=null}},B=m.effect=new uh($,()=>rl(x),m.scope),x=m.update=()=>B.run();x.id=m.uid,Er(m,!0),x()},we=(m,v,S)=>{v.component=m;const k=m.vnode.props;m.vnode=v,m.next=null,AT(m,v.props,k,S),RT(m,v.children,S),xs(),yd(),Ms()},se=(m,v,S,k,D,L,W,$,B=!1)=>{const x=m&&m.children,ee=m?m.shapeFlag:0,Q=v.children,{patchFlag:te,shapeFlag:le}=v;if(te>0){if(te&128){vt(x,Q,S,k,D,L,W,$,B);return}else if(te&256){Be(x,Q,S,k,D,L,W,$,B);return}}le&8?(ee&16&&Ue(x,D,L),Q!==x&&u(S,Q)):ee&16?le&16?vt(x,Q,S,k,D,L,W,$,B):Ue(x,D,L,!0):(ee&8&&u(S,""),le&16&&A(Q,S,k,D,L,W,$,B))},Be=(m,v,S,k,D,L,W,$,B)=>{m=m||as,v=v||as;const x=m.length,ee=v.length,Q=Math.min(x,ee);let te;for(te=0;te<Q;te++){const le=v[te]=B?Qn(v[te]):qt(v[te]);E(m[te],le,S,null,D,L,W,$,B)}x>ee?Ue(m,D,L,!0,!1,Q):A(v,S,k,D,L,W,$,B,Q)},vt=(m,v,S,k,D,L,W,$,B)=>{let x=0;const ee=v.length;let Q=m.length-1,te=ee-1;for(;x<=Q&&x<=te;){const le=m[x],fe=v[x]=B?Qn(v[x]):qt(v[x]);if(Xt(le,fe))E(le,fe,S,null,D,L,W,$,B);else break;x++}for(;x<=Q&&x<=te;){const le=m[Q],fe=v[te]=B?Qn(v[te]):qt(v[te]);if(Xt(le,fe))E(le,fe,S,null,D,L,W,$,B);else break;Q--,te--}if(x>Q){if(x<=te){const le=te+1,fe=le<ee?v[le].el:k;for(;x<=te;)E(null,v[x]=B?Qn(v[x]):qt(v[x]),S,fe,D,L,W,$,B),x++}}else if(x>te)for(;x<=Q;)Ie(m[x],D,L,!0),x++;else{const le=x,fe=x,Ae=new Map;for(x=fe;x<=te;x++){const Ot=v[x]=B?Qn(v[x]):qt(v[x]);Ot.key!=null&&Ae.set(Ot.key,x)}let Te,He=0;const Jt=te-fe+1;let Yr=!1,od=0;const Qs=new Array(Jt);for(x=0;x<Jt;x++)Qs[x]=0;for(x=le;x<=Q;x++){const Ot=m[x];if(He>=Jt){Ie(Ot,D,L,!0);continue}let an;if(Ot.key!=null)an=Ae.get(Ot.key);else for(Te=fe;Te<=te;Te++)if(Qs[Te-fe]===0&&Xt(Ot,v[Te])){an=Te;break}an===void 0?Ie(Ot,D,L,!0):(Qs[an-fe]=x+1,an>=od?od=an:Yr=!0,E(Ot,v[an],S,null,D,L,W,$,B),He++)}const ad=Yr?LT(Qs):as;for(Te=ad.length-1,x=Jt-1;x>=0;x--){const Ot=fe+x,an=v[Ot],ld=Ot+1<ee?v[Ot+1].el:k;Qs[x]===0?E(null,an,S,ld,D,L,W,$,B):Yr&&(Te<0||x!==ad[Te]?wt(an,S,ld,2):Te--)}}},wt=(m,v,S,k,D=null)=>{const{el:L,type:W,transition:$,children:B,shapeFlag:x}=m;if(x&6){wt(m.component.subTree,v,S,k);return}if(x&128){m.suspense.move(v,S,k);return}if(x&64){W.move(m,v,S,V);return}if(W===ut){r(L,v,S);for(let Q=0;Q<B.length;Q++)wt(B[Q],v,S,k);r(m.anchor,v,S);return}if(W===gi){g(m,v,S);return}if(k!==2&&x&1&&$)if(k===0)$.beforeEnter(L),r(L,v,S),et(()=>$.enter(L),D);else{const{leave:Q,delayLeave:te,afterLeave:le}=$,fe=()=>r(L,v,S),Ae=()=>{Q(L,()=>{fe(),le&&le()})};te?te(L,fe,Ae):Ae()}else r(L,v,S)},Ie=(m,v,S,k=!1,D=!1)=>{const{type:L,props:W,ref:$,children:B,dynamicChildren:x,shapeFlag:ee,patchFlag:Q,dirs:te}=m;if($!=null&&wa($,null,S,m,!0),ee&256){v.ctx.deactivate(m);return}const le=ee&1&&te,fe=!Nr(m);let Ae;if(fe&&(Ae=W&&W.onVnodeBeforeUnmount)&&St(Ae,v,m),ee&6)on(m.component,S,k);else{if(ee&128){m.suspense.unmount(S,k);return}le&&ln(m,null,v,"beforeUnmount"),ee&64?m.type.remove(m,v,S,D,V,k):x&&(L!==ut||Q>0&&Q&64)?Ue(x,v,S,!1,!0):(L===ut&&Q&384||!D&&ee&16)&&Ue(B,v,S),k&&Hn(m)}(fe&&(Ae=W&&W.onVnodeUnmounted)||le)&&et(()=>{Ae&&St(Ae,v,m),le&&ln(m,null,v,"unmounted")},S)},Hn=m=>{const{type:v,el:S,anchor:k,transition:D}=m;if(v===ut){Et(S,k);return}if(v===gi){_(m);return}const L=()=>{s(S),D&&!D.persisted&&D.afterLeave&&D.afterLeave()};if(m.shapeFlag&1&&D&&!D.persisted){const{leave:W,delayLeave:$}=D,B=()=>W(S,L);$?$(m.el,L,B):B()}else L()},Et=(m,v)=>{let S;for(;m!==v;)S=f(m),s(m),m=S;s(v)},on=(m,v,S)=>{const{bum:k,scope:D,update:L,subTree:W,um:$}=m;k&&cs(k),D.stop(),L&&(L.active=!1,Ie(W,m,v,S)),$&&et($,v),et(()=>{m.isUnmounted=!0},v),v&&v.pendingBranch&&!v.isUnmounted&&m.asyncDep&&!m.asyncResolved&&m.suspenseId===v.pendingId&&(v.deps--,v.deps===0&&v.resolve())},Ue=(m,v,S,k=!1,D=!1,L=0)=>{for(let W=L;W<m.length;W++)Ie(m[W],v,S,k,D)},P=m=>m.shapeFlag&6?P(m.component.subTree):m.shapeFlag&128?m.suspense.next():f(m.anchor||m.el),z=(m,v,S)=>{m==null?v._vnode&&Ie(v._vnode,null,null,!0):E(v._vnode||null,m,v,null,null,null,S),yd(),ya(),v._vnode=m},V={p:E,um:Ie,m:wt,r:Hn,mt:K,mc:A,pc:se,pbc:M,n:P,o:t};let Y,pe;return e&&([Y,pe]=e(V)),{render:z,hydrate:Y,createApp:OT(z,Y)}}function Er({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function kh(t,e,n=!1){const r=t.children,s=e.children;if(re(r)&&re(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=Qn(s[i]),a.el=o.el),n||kh(o,a)),a.type===ws&&(a.el=o.el)}}function LT(t){const e=t.slice(),n=[0];let r,s,i,o,a;const l=t.length;for(r=0;r<l;r++){const c=t[r];if(c!==0){if(s=n[n.length-1],t[s]<c){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<c?i=a+1:o=a;c<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}const xT=t=>t.__isTeleport,pi=t=>t&&(t.disabled||t.disabled===""),Rd=t=>typeof SVGElement<"u"&&t instanceof SVGElement,tu=(t,e)=>{const n=t&&t.to;return Ne(n)?e?e(n):null:n},MT={__isTeleport:!0,process(t,e,n,r,s,i,o,a,l,c){const{mc:u,pc:h,pbc:f,o:{insert:p,querySelector:y,createText:E,createComment:b}}=c,w=pi(e.props);let{shapeFlag:d,children:g,dynamicChildren:_}=e;if(t==null){const T=e.el=E(""),I=e.anchor=E("");p(T,n,r),p(I,n,r);const C=e.target=tu(e.props,y),A=e.targetAnchor=E("");C&&(p(A,C),o=o||Rd(C));const R=(M,q)=>{d&16&&u(g,M,q,s,i,o,a,l)};w?R(n,I):C&&R(C,A)}else{e.el=t.el;const T=e.anchor=t.anchor,I=e.target=t.target,C=e.targetAnchor=t.targetAnchor,A=pi(t.props),R=A?n:I,M=A?T:C;if(o=o||Rd(I),_?(f(t.dynamicChildren,_,R,s,i,o,a),kh(t,e,!0)):l||h(t,e,R,M,s,i,o,a,!1),w)A||Bo(e,n,T,c,1);else if((e.props&&e.props.to)!==(t.props&&t.props.to)){const q=e.target=tu(e.props,y);q&&Bo(e,q,null,c,0)}else A&&Bo(e,I,C,c,1)}fy(e)},remove(t,e,n,r,{um:s,o:{remove:i}},o){const{shapeFlag:a,children:l,anchor:c,targetAnchor:u,target:h,props:f}=t;if(h&&i(u),(o||!pi(f))&&(i(c),a&16))for(let p=0;p<l.length;p++){const y=l[p];s(y,e,n,!0,!!y.dynamicChildren)}},move:Bo,hydrate:FT};function Bo(t,e,n,{o:{insert:r},m:s},i=2){i===0&&r(t.targetAnchor,e,n);const{el:o,anchor:a,shapeFlag:l,children:c,props:u}=t,h=i===2;if(h&&r(o,e,n),(!h||pi(u))&&l&16)for(let f=0;f<c.length;f++)s(c[f],e,n,2);h&&r(a,e,n)}function FT(t,e,n,r,s,i,{o:{nextSibling:o,parentNode:a,querySelector:l}},c){const u=e.target=tu(e.props,l);if(u){const h=u._lpa||u.firstChild;if(e.shapeFlag&16)if(pi(e.props))e.anchor=c(o(t),e,a(t),n,r,s,i),e.targetAnchor=h;else{e.anchor=o(t);let f=h;for(;f;)if(f=o(f),f&&f.nodeType===8&&f.data==="teleport anchor"){e.targetAnchor=f,u._lpa=e.targetAnchor&&o(e.targetAnchor);break}c(h,e,u,n,r,s,i)}fy(e)}return e.anchor&&o(e.anchor)}const pF=MT;function fy(t){const e=t.ctx;if(e&&e.ut){let n=t.children[0].el;for(;n!==t.targetAnchor;)n.nodeType===1&&n.setAttribute("data-v-owner",e.uid),n=n.nextSibling;e.ut()}}const ut=Symbol(void 0),ws=Symbol(void 0),At=Symbol(void 0),gi=Symbol(void 0),mi=[];let Wt=null;function In(t=!1){mi.push(Wt=t?null:[])}function dy(){mi.pop(),Wt=mi[mi.length-1]||null}let Es=1;function kd(t){Es+=t}function py(t){return t.dynamicChildren=Es>0?Wt||as:null,dy(),Es>0&&Wt&&Wt.push(t),t}function gF(t,e,n,r,s,i){return py(my(t,e,n,r,s,i,!0))}function Yn(t,e,n,r,s){return py(De(t,e,n,r,s,!0))}function bs(t){return t?t.__v_isVNode===!0:!1}function Xt(t,e){return t.type===e.type&&t.key===e.key}const cl="__vInternal",gy=({key:t})=>t??null,ra=({ref:t,ref_key:e,ref_for:n})=>t!=null?Ne(t)||Ve(t)||ce(t)?{i:rt,r:t,k:e,f:!!n}:t:null;function my(t,e=null,n=null,r=0,s=null,i=t===ut?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&gy(e),ref:e&&ra(e),scopeId:il,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:rt};return a?(Oh(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=Ne(n)?8:16),Es>0&&!o&&Wt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Wt.push(l),l}const De=UT;function UT(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===ny)&&(t=At),bs(t)){const a=Dn(t,e,!0);return n&&Oh(a,n),Es>0&&!i&&Wt&&(a.shapeFlag&6?Wt[Wt.indexOf(t)]=a:Wt.push(a)),a.patchFlag|=-2,a}if(GT(t)&&(t=t.__vccOpts),e){e=$T(e);let{class:a,style:l}=e;a&&!Ne(a)&&(e.class=rh(a)),ke(l)&&(Nm(l)&&!re(l)&&(l=Ye({},l)),e.style=nh(l))}const o=Ne(t)?1:Wm(t)?128:xT(t)?64:ke(t)?4:ce(t)?2:0;return my(t,e,n,r,s,o,i,!0)}function $T(t){return t?Nm(t)||cl in t?Ye({},t):t:null}function Dn(t,e,n=!1){const{props:r,ref:s,patchFlag:i,children:o}=t,a=e?VT(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:a,key:a&&gy(a),ref:e&&e.ref?n&&s?re(s)?s.concat(ra(e)):[s,ra(e)]:ra(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==ut?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Dn(t.ssContent),ssFallback:t.ssFallback&&Dn(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce}}function yy(t=" ",e=0){return De(ws,null,t,e)}function mF(t="",e=!1){return e?(In(),Yn(At,null,t)):De(At,null,t)}function qt(t){return t==null||typeof t=="boolean"?De(At):re(t)?De(ut,null,t.slice()):typeof t=="object"?Qn(t):De(ws,null,String(t))}function Qn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Dn(t)}function Oh(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(re(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),Oh(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!(cl in e)?e._ctx=rt:s===3&&rt&&(rt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else ce(e)?(e={default:e,_ctx:rt},n=32):(e=String(e),r&64?(n=16,e=[yy(e)]):n=8);t.children=e,t.shapeFlag|=n}function VT(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=rh([e.class,r.class]));else if(s==="style")e.style=nh([e.style,r.style]);else if(Ji(s)){const i=e[s],o=r[s];o&&i!==o&&!(re(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function St(t,e,n,r=null){zt(t,e,7,[n,r])}const BT=uy();let HT=0;function jT(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||BT,i={uid:HT++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new vm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:oy(r,s),emitsOptions:qm(r,s),emit:null,emitted:null,propsDefaults:Re,inheritAttrs:r.inheritAttrs,ctx:Re,data:Re,props:Re,attrs:Re,slots:Re,refs:Re,setupState:Re,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Gb.bind(null,i),t.ce&&t.ce(i),i}let Me=null;const Vn=()=>Me||rt,hr=t=>{Me=t,t.scope.on()},or=()=>{Me&&Me.scope.off(),Me=null};function _y(t){return t.vnode.shapeFlag&4}let Ts=!1;function qT(t,e=!1){Ts=e;const{props:n,children:r}=t.vnode,s=_y(t);IT(t,n,s,e),CT(t,r);const i=s?WT(t,e):void 0;return Ts=!1,i}function WT(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=mh(new Proxy(t.ctx,_T));const{setup:r}=n;if(r){const s=t.setupContext=r.length>1?KT(t):null;hr(t),xs();const i=ir(r,t,0,[t.props,s]);if(Ms(),or(),ah(i)){if(i.then(or,or),e)return i.then(o=>{nu(t,o,e)}).catch(o=>{Fs(o,t,0)});t.asyncDep=i}else nu(t,i,e)}else vy(t,e)}function nu(t,e,n){ce(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:ke(e)&&(t.setupState=Fm(e)),vy(t,n)}let Od;function vy(t,e,n){const r=t.type;if(!t.render){if(!e&&Od&&!r.render){const s=r.template||Ch(t).template;if(s){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:a,compilerOptions:l}=r,c=Ye(Ye({isCustomElement:i,delimiters:a},o),l);r.render=Od(s,c)}}t.render=r.render||en}hr(t),xs(),vT(t),Ms(),or()}function zT(t){return new Proxy(t.attrs,{get(e,n){return kt(t,"get","$attrs"),e[n]}})}function KT(t){const e=r=>{t.exposed=r||{}};let n;return{get attrs(){return n||(n=zT(t))},slots:t.slots,emit:t.emit,expose:e}}function ul(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(Fm(mh(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in di)return di[n](t)},has(e,n){return n in e||n in di}}))}function ru(t,e=!0){return ce(t)?t.displayName||t.name:t.name||e&&t.__name}function GT(t){return ce(t)&&"__vccOpts"in t}const dt=(t,e)=>jb(t,e,Ts);function yF(t){const e=Vn();let n=t();return or(),ah(n)&&(n=n.catch(r=>{throw hr(e),r})),[n,()=>hr(e)]}function Kt(t,e,n){const r=arguments.length;return r===2?ke(e)&&!re(e)?bs(e)?De(t,null,[e]):De(t,e):De(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&bs(n)&&(n=[n]),De(t,e,n))}const QT=Symbol(""),JT=()=>$t(QT),wy="3.2.47",YT="http://www.w3.org/2000/svg",Cr=typeof document<"u"?document:null,Pd=Cr&&Cr.createElement("template"),XT={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e?Cr.createElementNS(YT,t):Cr.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>Cr.createTextNode(t),createComment:t=>Cr.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Cr.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{Pd.innerHTML=r?`<svg>${t}</svg>`:t;const a=Pd.content;if(r){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}};function ZT(t,e,n){const r=t._vtc;r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}function e0(t,e,n){const r=t.style,s=Ne(n);if(n&&!s){if(e&&!Ne(e))for(const i in e)n[i]==null&&su(r,i,"");for(const i in n)su(r,i,n[i])}else{const i=r.display;s?e!==n&&(r.cssText=n):e&&t.removeAttribute("style"),"_vod"in t&&(r.display=i)}}const Dd=/\s*!important$/;function su(t,e,n){if(re(n))n.forEach(r=>su(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=t0(t,e);Dd.test(n)?t.setProperty(zr(r),n.replace(Dd,""),"important"):t[r]=n}}const Nd=["Webkit","Moz","ms"],ac={};function t0(t,e){const n=ac[e];if(n)return n;let r=mn(e);if(r!=="filter"&&r in t)return ac[e]=r;r=tl(r);for(let s=0;s<Nd.length;s++){const i=Nd[s]+r;if(i in t)return ac[e]=i}return e}const Ld="http://www.w3.org/1999/xlink";function n0(t,e,n,r,s){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(Ld,e.slice(6,e.length)):t.setAttributeNS(Ld,e,n);else{const i=tb(e);n==null||i&&!dm(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function r0(t,e,n,r,s,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,s,i),t[e]=n??"";return}if(e==="value"&&t.tagName!=="PROGRESS"&&!t.tagName.includes("-")){t._value=n;const l=n??"";(t.value!==l||t.tagName==="OPTION")&&(t.value=l),n==null&&t.removeAttribute(e);return}let a=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=dm(n):n==null&&l==="string"?(n="",a=!0):l==="number"&&(n=0,a=!0)}try{t[e]=n}catch{}a&&t.removeAttribute(e)}function Zr(t,e,n,r){t.addEventListener(e,n,r)}function s0(t,e,n,r){t.removeEventListener(e,n,r)}function i0(t,e,n,r,s=null){const i=t._vei||(t._vei={}),o=i[e];if(r&&o)o.value=r;else{const[a,l]=o0(e);if(r){const c=i[e]=c0(r,s);Zr(t,a,c,l)}else o&&(s0(t,a,o,l),i[e]=void 0)}}const xd=/(?:Once|Passive|Capture)$/;function o0(t){let e;if(xd.test(t)){e={};let r;for(;r=t.match(xd);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):zr(t.slice(2)),e]}let lc=0;const a0=Promise.resolve(),l0=()=>lc||(a0.then(()=>lc=0),lc=Date.now());function c0(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;zt(u0(r,n.value),e,5,[r])};return n.value=t,n.attached=l0(),n}function u0(t,e){if(re(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Md=/^on[a-z]/,h0=(t,e,n,r,s=!1,i,o,a,l)=>{e==="class"?ZT(t,r,s):e==="style"?e0(t,n,r):Ji(e)?sh(e)||i0(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):f0(t,e,r,s))?r0(t,e,r,i,o,a,l):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),n0(t,e,r,s))};function f0(t,e,n,r){return r?!!(e==="innerHTML"||e==="textContent"||e in t&&Md.test(e)&&ce(n)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA"||Md.test(e)&&Ne(n)?!1:e in t}function _F(t){const e=Vn();if(!e)return;const n=e.ut=(s=t(e.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${e.uid}"]`)).forEach(i=>ou(i,s))},r=()=>{const s=t(e.proxy);iu(e.subTree,s),n(s)};iT(r),ll(()=>{const s=new MutationObserver(r);s.observe(e.subTree.el.parentNode,{childList:!0}),Ih(()=>s.disconnect())})}function iu(t,e){if(t.shapeFlag&128){const n=t.suspense;t=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push(()=>{iu(n.activeBranch,e)})}for(;t.component;)t=t.component.subTree;if(t.shapeFlag&1&&t.el)ou(t.el,e);else if(t.type===ut)t.children.forEach(n=>iu(n,e));else if(t.type===gi){let{el:n,anchor:r}=t;for(;n&&(ou(n,e),n!==r);)n=n.nextSibling}}function ou(t,e){if(t.nodeType===1){const n=t.style;for(const r in e)n.setProperty(`--${r}`,e[r])}}const Wn="transition",Js="animation",hl=(t,{slots:e})=>Kt(Jm,by(t),e);hl.displayName="Transition";const Ey={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},d0=hl.props=Ye({},Jm.props,Ey),br=(t,e=[])=>{re(t)?t.forEach(n=>n(...e)):t&&t(...e)},Fd=t=>t?re(t)?t.some(e=>e.length>1):t.length>1:!1;function by(t){const e={};for(const H in t)H in Ey||(e[H]=t[H]);if(t.css===!1)return e;const{name:n="v",type:r,duration:s,enterFromClass:i=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=i,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:h=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:p=`${n}-leave-to`}=t,y=p0(s),E=y&&y[0],b=y&&y[1],{onBeforeEnter:w,onEnter:d,onEnterCancelled:g,onLeave:_,onLeaveCancelled:T,onBeforeAppear:I=w,onAppear:C=d,onAppearCancelled:A=g}=e,R=(H,ne,K)=>{Gn(H,ne?u:a),Gn(H,ne?c:o),K&&K()},M=(H,ne)=>{H._isLeaving=!1,Gn(H,h),Gn(H,p),Gn(H,f),ne&&ne()},q=H=>(ne,K)=>{const ze=H?C:d,ye=()=>R(ne,H,K);br(ze,[ne,ye]),Ud(()=>{Gn(ne,H?l:i),En(ne,H?u:a),Fd(ze)||$d(ne,r,E,ye)})};return Ye(e,{onBeforeEnter(H){br(w,[H]),En(H,i),En(H,o)},onBeforeAppear(H){br(I,[H]),En(H,l),En(H,c)},onEnter:q(!1),onAppear:q(!0),onLeave(H,ne){H._isLeaving=!0;const K=()=>M(H,ne);En(H,h),Iy(),En(H,f),Ud(()=>{H._isLeaving&&(Gn(H,h),En(H,p),Fd(_)||$d(H,r,b,K))}),br(_,[H,K])},onEnterCancelled(H){R(H,!1),br(g,[H])},onAppearCancelled(H){R(H,!0),br(A,[H])},onLeaveCancelled(H){M(H),br(T,[H])}})}function p0(t){if(t==null)return null;if(ke(t))return[cc(t.enter),cc(t.leave)];{const e=cc(t);return[e,e]}}function cc(t){return _m(t)}function En(t,e){e.split(/\s+/).forEach(n=>n&&t.classList.add(n)),(t._vtc||(t._vtc=new Set)).add(e)}function Gn(t,e){e.split(/\s+/).forEach(r=>r&&t.classList.remove(r));const{_vtc:n}=t;n&&(n.delete(e),n.size||(t._vtc=void 0))}function Ud(t){requestAnimationFrame(()=>{requestAnimationFrame(t)})}let g0=0;function $d(t,e,n,r){const s=t._endId=++g0,i=()=>{s===t._endId&&r()};if(n)return setTimeout(i,n);const{type:o,timeout:a,propCount:l}=Ty(t,e);if(!o)return r();const c=o+"end";let u=0;const h=()=>{t.removeEventListener(c,f),i()},f=p=>{p.target===t&&++u>=l&&h()};setTimeout(()=>{u<l&&h()},a+1),t.addEventListener(c,f)}function Ty(t,e){const n=window.getComputedStyle(t),r=y=>(n[y]||"").split(", "),s=r(`${Wn}Delay`),i=r(`${Wn}Duration`),o=Vd(s,i),a=r(`${Js}Delay`),l=r(`${Js}Duration`),c=Vd(a,l);let u=null,h=0,f=0;e===Wn?o>0&&(u=Wn,h=o,f=i.length):e===Js?c>0&&(u=Js,h=c,f=l.length):(h=Math.max(o,c),u=h>0?o>c?Wn:Js:null,f=u?u===Wn?i.length:l.length:0);const p=u===Wn&&/\b(transform|all)(,|$)/.test(r(`${Wn}Property`).toString());return{type:u,timeout:h,propCount:f,hasTransform:p}}function Vd(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,r)=>Bd(n)+Bd(t[r])))}function Bd(t){return Number(t.slice(0,-1).replace(",","."))*1e3}function Iy(){return document.body.offsetHeight}const Ay=new WeakMap,Sy=new WeakMap,Cy={name:"TransitionGroup",props:Ye({},d0,{tag:String,moveClass:String}),setup(t,{slots:e}){const n=Vn(),r=Qm();let s,i;return Th(()=>{if(!s.length)return;const o=t.moveClass||`${t.name||"v"}-move`;if(!w0(s[0].el,n.vnode.el,o))return;s.forEach(y0),s.forEach(_0);const a=s.filter(v0);Iy(),a.forEach(l=>{const c=l.el,u=c.style;En(c,o),u.transform=u.webkitTransform=u.transitionDuration="";const h=c._moveCb=f=>{f&&f.target!==c||(!f||/transform$/.test(f.propertyName))&&(c.removeEventListener("transitionend",h),c._moveCb=null,Gn(c,o))};c.addEventListener("transitionend",h)})}),()=>{const o=me(t),a=by(o);let l=o.tag||ut;s=i,i=e.default?bh(e.default()):[];for(let c=0;c<i.length;c++){const u=i[c];u.key!=null&&vs(u,Di(u,a,r,n))}if(s)for(let c=0;c<s.length;c++){const u=s[c];vs(u,Di(u,a,r,n)),Ay.set(u,u.el.getBoundingClientRect())}return De(l,null,i)}}},m0=t=>delete t.mode;Cy.props;const vF=Cy;function y0(t){const e=t.el;e._moveCb&&e._moveCb(),e._enterCb&&e._enterCb()}function _0(t){Sy.set(t,t.el.getBoundingClientRect())}function v0(t){const e=Ay.get(t),n=Sy.get(t),r=e.left-n.left,s=e.top-n.top;if(r||s){const i=t.el.style;return i.transform=i.webkitTransform=`translate(${r}px,${s}px)`,i.transitionDuration="0s",t}}function w0(t,e,n){const r=t.cloneNode();t._vtc&&t._vtc.forEach(o=>{o.split(/\s+/).forEach(a=>a&&r.classList.remove(a))}),n.split(/\s+/).forEach(o=>o&&r.classList.add(o)),r.style.display="none";const s=e.nodeType===1?e:e.parentNode;s.appendChild(r);const{hasTransform:i}=Ty(r);return s.removeChild(r),i}const Hd=t=>{const e=t.props["onUpdate:modelValue"]||!1;return re(e)?n=>cs(e,n):e};function E0(t){t.target.composing=!0}function jd(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const wF={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t._assign=Hd(s);const i=r||s.props&&s.props.type==="number";Zr(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),i&&(a=zc(a)),t._assign(a)}),n&&Zr(t,"change",()=>{t.value=t.value.trim()}),e||(Zr(t,"compositionstart",E0),Zr(t,"compositionend",jd),Zr(t,"change",jd))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:r,number:s}},i){if(t._assign=Hd(i),t.composing||document.activeElement===t&&t.type!=="range"&&(n||r&&t.value.trim()===e||(s||t.type==="number")&&zc(t.value)===e))return;const o=e??"";t.value!==o&&(t.value=o)}},b0=["ctrl","shift","alt","meta"],T0={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>b0.some(n=>t[`${n}Key`]&&!e.includes(n))},EF=(t,e)=>(n,...r)=>{for(let s=0;s<e.length;s++){const i=T0[e[s]];if(i&&i(n,e))return}return t(n,...r)},I0={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},bF=(t,e)=>n=>{if(!("key"in n))return;const r=zr(n.key);if(e.some(s=>s===r||I0[s]===r))return t(n)},TF={beforeMount(t,{value:e},{transition:n}){t._vod=t.style.display==="none"?"":t.style.display,n&&e?n.beforeEnter(t):Ys(t,e)},mounted(t,{value:e},{transition:n}){n&&e&&n.enter(t)},updated(t,{value:e,oldValue:n},{transition:r}){!e!=!n&&(r?e?(r.beforeEnter(t),Ys(t,!0),r.enter(t)):r.leave(t,()=>{Ys(t,!1)}):Ys(t,e))},beforeUnmount(t,{value:e}){Ys(t,e)}};function Ys(t,e){t.style.display=e?t._vod:"none"}const Ry=Ye({patchProp:h0},XT);let yi,qd=!1;function A0(){return yi||(yi=DT(Ry))}function S0(){return yi=qd?yi:NT(Ry),qd=!0,yi}const C0=(...t)=>{const e=A0().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=ky(r);if(!s)return;const i=e._component;!ce(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.innerHTML="";const o=n(s,!1,s instanceof SVGElement);return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e},R0=(...t)=>{const e=S0().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=ky(r);if(s)return n(s,!0,s instanceof SVGElement)},e};function ky(t){return Ne(t)?document.querySelector(t):t}const k0=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,O0=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,P0=/^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;function D0(t,e){if(t==="__proto__"||t==="constructor"&&e&&typeof e=="object"&&"prototype"in e){N0(t);return}return e}function N0(t){console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`)}function L0(t,e={}){if(typeof t!="string")return t;const n=t.trim();if(t[0]==='"'&&t[t.length-1]==='"')return n.slice(1,-1);if(n.length<=9){const r=n.toLowerCase();if(r==="true")return!0;if(r==="false")return!1;if(r==="undefined")return;if(r==="null")return null;if(r==="nan")return Number.NaN;if(r==="infinity")return Number.POSITIVE_INFINITY;if(r==="-infinity")return Number.NEGATIVE_INFINITY}if(!P0.test(t)){if(e.strict)throw new SyntaxError("[destr] Invalid JSON");return t}try{if(k0.test(t)||O0.test(t)){if(e.strict)throw new Error("[destr] Possible prototype pollution");return JSON.parse(t,D0)}return JSON.parse(t)}catch(r){if(e.strict)throw r;return t}}const x0=/#/g,M0=/&/g,F0=/=/g,Ph=/\+/g,U0=/%5e/gi,$0=/%60/gi,V0=/%7c/gi,B0=/%20/gi;function H0(t){return encodeURI(""+t).replace(V0,"|")}function au(t){return H0(typeof t=="string"?t:JSON.stringify(t)).replace(Ph,"%2B").replace(B0,"+").replace(x0,"%23").replace(M0,"%26").replace($0,"`").replace(U0,"^")}function uc(t){return au(t).replace(F0,"%3D")}function Oy(t=""){try{return decodeURIComponent(""+t)}catch{return""+t}}function j0(t){return Oy(t.replace(Ph," "))}function q0(t){return Oy(t.replace(Ph," "))}function W0(t=""){const e={};t[0]==="?"&&(t=t.slice(1));for(const n of t.split("&")){const r=n.match(/([^=]+)=?(.*)/)||[];if(r.length<2)continue;const s=j0(r[1]);if(s==="__proto__"||s==="constructor")continue;const i=q0(r[2]||"");e[s]===void 0?e[s]=i:Array.isArray(e[s])?e[s].push(i):e[s]=[e[s],i]}return e}function z0(t,e){return(typeof e=="number"||typeof e=="boolean")&&(e=String(e)),e?Array.isArray(e)?e.map(n=>`${uc(t)}=${au(n)}`).join("&"):`${uc(t)}=${au(e)}`:uc(t)}function K0(t){return Object.keys(t).filter(e=>t[e]!==void 0).map(e=>z0(e,t[e])).filter(Boolean).join("&")}const G0=/^[\s\w\0+.-]{2,}:([/\\]{1,2})/,Q0=/^[\s\w\0+.-]{2,}:([/\\]{2})?/,J0=/^([/\\]\s*){2,}[^/\\]/;function eo(t,e={}){return typeof e=="boolean"&&(e={acceptRelative:e}),e.strict?G0.test(t):Q0.test(t)||(e.acceptRelative?J0.test(t):!1)}const Y0=/\/$|\/\?/;function lu(t="",e=!1){return e?Y0.test(t):t.endsWith("/")}function Py(t="",e=!1){if(!e)return(lu(t)?t.slice(0,-1):t)||"/";if(!lu(t,!0))return t||"/";const[n,...r]=t.split("?");return(n.slice(0,-1)||"/")+(r.length>0?`?${r.join("?")}`:"")}function X0(t="",e=!1){if(!e)return t.endsWith("/")?t:t+"/";if(lu(t,!0))return t||"/";const[n,...r]=t.split("?");return n+"/"+(r.length>0?`?${r.join("?")}`:"")}function Z0(t,e){if(Dy(e)||eo(t))return t;const n=Py(e);return t.startsWith(n)?t:to(n,t)}function Wd(t,e){if(Dy(e))return t;const n=Py(e);if(!t.startsWith(n))return t;const r=t.slice(n.length);return r[0]==="/"?r:"/"+r}function eI(t,e){const n=fl(t),r={...W0(n.search),...e};return n.search=K0(r),rI(n)}function Dy(t){return!t||t==="/"}function tI(t){return t&&t!=="/"}const nI=/^\.?\//;function to(t,...e){let n=t||"";for(const r of e.filter(s=>tI(s)))if(n){const s=r.replace(nI,"");n=X0(n)+s}else n=r;return n}function fl(t="",e){const n=t.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/);if(n){const[,h,f=""]=n;return{protocol:h,pathname:f,href:h+f,auth:"",host:"",search:"",hash:""}}if(!eo(t,{acceptRelative:!0}))return e?fl(e+t):zd(t);const[,r="",s,i=""]=t.replace(/\\/g,"/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/)||[],[,o="",a=""]=i.match(/([^#/?]*)(.*)?/)||[],{pathname:l,search:c,hash:u}=zd(a.replace(/\/(?=[A-Za-z]:)/,""));return{protocol:r,auth:s?s.slice(0,Math.max(0,s.length-1)):"",host:o,pathname:l,search:c,hash:u}}function zd(t=""){const[e="",n="",r=""]=(t.match(/([^#?]*)(\?[^#]*)?(#.*)?/)||[]).splice(1);return{pathname:e,search:n,hash:r}}function rI(t){const e=t.pathname||"",n=t.search?(t.search.startsWith("?")?"":"?")+t.search:"",r=t.hash||"",s=t.auth?t.auth+"@":"",i=t.host||"";return(t.protocol?t.protocol+"//":"")+s+i+e+n+r}class sI extends Error{constructor(e,n){super(e,n),this.name="FetchError",n!=null&&n.cause&&!this.cause&&(this.cause=n.cause)}}function iI(t){var l,c,u,h,f;const e=((l=t.error)==null?void 0:l.message)||((c=t.error)==null?void 0:c.toString())||"",n=((u=t.request)==null?void 0:u.method)||((h=t.options)==null?void 0:h.method)||"GET",r=((f=t.request)==null?void 0:f.url)||String(t.request)||"/",s=`[${n}] ${JSON.stringify(r)}`,i=t.response?`${t.response.status} ${t.response.statusText}`:"<no response>",o=`${s}: ${i}${e?` ${e}`:""}`,a=new sI(o,t.error?{cause:t.error}:void 0);for(const p of["request","options","response"])Object.defineProperty(a,p,{get(){return t[p]}});for(const[p,y]of[["data","_data"],["status","status"],["statusCode","status"],["statusText","statusText"],["statusMessage","statusText"]])Object.defineProperty(a,p,{get(){return t.response&&t.response[y]}});return a}const oI=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));function Kd(t="GET"){return oI.has(t.toUpperCase())}function aI(t){if(t===void 0)return!1;const e=typeof t;return e==="string"||e==="number"||e==="boolean"||e===null?!0:e!=="object"?!1:Array.isArray(t)?!0:t.buffer?!1:t.constructor&&t.constructor.name==="Object"||typeof t.toJSON=="function"}const lI=new Set(["image/svg","application/xml","application/xhtml","application/html"]),cI=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function uI(t=""){if(!t)return"json";const e=t.split(";").shift()||"";return cI.test(e)?"json":lI.has(e)||e.startsWith("text/")?"text":"blob"}function hI(t,e,n=globalThis.Headers){const r={...e,...t};if(e!=null&&e.params&&(t!=null&&t.params)&&(r.params={...e==null?void 0:e.params,...t==null?void 0:t.params}),e!=null&&e.query&&(t!=null&&t.query)&&(r.query={...e==null?void 0:e.query,...t==null?void 0:t.query}),e!=null&&e.headers&&(t!=null&&t.headers)){r.headers=new n((e==null?void 0:e.headers)||{});for(const[s,i]of new n((t==null?void 0:t.headers)||{}))r.headers.set(s,i)}return r}const fI=new Set([408,409,425,429,500,502,503,504]),dI=new Set([101,204,205,304]);function Ny(t={}){const{fetch:e=globalThis.fetch,Headers:n=globalThis.Headers,AbortController:r=globalThis.AbortController}=t;async function s(a){const l=a.error&&a.error.name==="AbortError"&&!a.options.timeout||!1;if(a.options.retry!==!1&&!l){let u;typeof a.options.retry=="number"?u=a.options.retry:u=Kd(a.options.method)?0:1;const h=a.response&&a.response.status||500;if(u>0&&(Array.isArray(a.options.retryStatusCodes)?a.options.retryStatusCodes.includes(h):fI.has(h))){const f=a.options.retryDelay||0;return f>0&&await new Promise(p=>setTimeout(p,f)),i(a.request,{...a.options,retry:u-1,timeout:a.options.timeout})}}const c=iI(a);throw Error.captureStackTrace&&Error.captureStackTrace(c,i),c}const i=async function(l,c={}){var f;const u={request:l,options:hI(c,t.defaults,n),response:void 0,error:void 0};if(u.options.method=(f=u.options.method)==null?void 0:f.toUpperCase(),u.options.onRequest&&await u.options.onRequest(u),typeof u.request=="string"&&(u.options.baseURL&&(u.request=Z0(u.request,u.options.baseURL)),(u.options.query||u.options.params)&&(u.request=eI(u.request,{...u.options.params,...u.options.query}))),u.options.body&&Kd(u.options.method)&&(aI(u.options.body)?(u.options.body=typeof u.options.body=="string"?u.options.body:JSON.stringify(u.options.body),u.options.headers=new n(u.options.headers||{}),u.options.headers.has("content-type")||u.options.headers.set("content-type","application/json"),u.options.headers.has("accept")||u.options.headers.set("accept","application/json")):("pipeTo"in u.options.body&&typeof u.options.body.pipeTo=="function"||typeof u.options.body.pipe=="function")&&("duplex"in u.options||(u.options.duplex="half"))),!u.options.signal&&u.options.timeout){const p=new r;setTimeout(()=>p.abort(),u.options.timeout),u.options.signal=p.signal}try{u.response=await e(u.request,u.options)}catch(p){return u.error=p,u.options.onRequestError&&await u.options.onRequestError(u),await s(u)}if(u.response.body&&!dI.has(u.response.status)&&u.options.method!=="HEAD"){const p=(u.options.parseResponse?"json":u.options.responseType)||uI(u.response.headers.get("content-type")||"");switch(p){case"json":{const y=await u.response.text(),E=u.options.parseResponse||L0;u.response._data=E(y);break}case"stream":{u.response._data=u.response.body;break}default:u.response._data=await u.response[p]()}}return u.options.onResponse&&await u.options.onResponse(u),!u.options.ignoreResponseError&&u.response.status>=400&&u.response.status<600?(u.options.onResponseError&&await u.options.onResponseError(u),await s(u)):u.response},o=async function(l,c){return(await i(l,c))._data};return o.raw=i,o.native=(...a)=>e(...a),o.create=(a={})=>Ny({...t,defaults:{...t.defaults,...a}}),o}const Dh=function(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}(),pI=Dh.fetch||(()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),gI=Dh.Headers,mI=Dh.AbortController,yI=Ny({fetch:pI,Headers:gI,AbortController:mI}),_I=yI,vI=()=>{var t;return((t=window==null?void 0:window.__NUXT__)==null?void 0:t.config)||{}},Ea=vI().app,wI=()=>Ea.baseURL,EI=()=>Ea.buildAssetsDir,bI=(...t)=>to(Ly(),EI(),...t),Ly=(...t)=>{const e=Ea.cdnURL||Ea.baseURL;return t.length?to(e,...t):e};globalThis.__buildAssetsURL=bI,globalThis.__publicAssetsURL=Ly;function cu(t,e={},n){for(const r in t){const s=t[r],i=n?`${n}:${r}`:r;typeof s=="object"&&s!==null?cu(s,e,i):typeof s=="function"&&(e[i]=s)}return e}const TI={run:t=>t()},II=()=>TI,xy=typeof console.createTask<"u"?console.createTask:II;function AI(t,e){const n=e.shift(),r=xy(n);return t.reduce((s,i)=>s.then(()=>r.run(()=>i(...e))),Promise.resolve())}function SI(t,e){const n=e.shift(),r=xy(n);return Promise.all(t.map(s=>r.run(()=>s(...e))))}function hc(t,e){for(const n of[...t])n(e)}class CI{constructor(){this._hooks={},this._before=void 0,this._after=void 0,this._deprecatedMessages=void 0,this._deprecatedHooks={},this.hook=this.hook.bind(this),this.callHook=this.callHook.bind(this),this.callHookWith=this.callHookWith.bind(this)}hook(e,n,r={}){if(!e||typeof n!="function")return()=>{};const s=e;let i;for(;this._deprecatedHooks[e];)i=this._deprecatedHooks[e],e=i.to;if(i&&!r.allowDeprecated){let o=i.message;o||(o=`${s} hook has been deprecated`+(i.to?`, please use ${i.to}`:"")),this._deprecatedMessages||(this._deprecatedMessages=new Set),this._deprecatedMessages.has(o)||(console.warn(o),this._deprecatedMessages.add(o))}if(!n.name)try{Object.defineProperty(n,"name",{get:()=>"_"+e.replace(/\W+/g,"_")+"_hook_cb",configurable:!0})}catch{}return this._hooks[e]=this._hooks[e]||[],this._hooks[e].push(n),()=>{n&&(this.removeHook(e,n),n=void 0)}}hookOnce(e,n){let r,s=(...i)=>(typeof r=="function"&&r(),r=void 0,s=void 0,n(...i));return r=this.hook(e,s),r}removeHook(e,n){if(this._hooks[e]){const r=this._hooks[e].indexOf(n);r!==-1&&this._hooks[e].splice(r,1),this._hooks[e].length===0&&delete this._hooks[e]}}deprecateHook(e,n){this._deprecatedHooks[e]=typeof n=="string"?{to:n}:n;const r=this._hooks[e]||[];delete this._hooks[e];for(const s of r)this.hook(e,s)}deprecateHooks(e){Object.assign(this._deprecatedHooks,e);for(const n in e)this.deprecateHook(n,e[n])}addHooks(e){const n=cu(e),r=Object.keys(n).map(s=>this.hook(s,n[s]));return()=>{for(const s of r.splice(0,r.length))s()}}removeHooks(e){const n=cu(e);for(const r in n)this.removeHook(r,n[r])}removeAllHooks(){for(const e in this._hooks)delete this._hooks[e]}callHook(e,...n){return n.unshift(e),this.callHookWith(AI,e,...n)}callHookParallel(e,...n){return n.unshift(e),this.callHookWith(SI,e,...n)}callHookWith(e,n,...r){const s=this._before||this._after?{name:n,args:r,context:{}}:void 0;this._before&&hc(this._before,s);const i=e(n in this._hooks?[...this._hooks[n]]:[],r);return i instanceof Promise?i.finally(()=>{this._after&&s&&hc(this._after,s)}):(this._after&&s&&hc(this._after,s),i)}beforeEach(e){return this._before=this._before||[],this._before.push(e),()=>{if(this._before!==void 0){const n=this._before.indexOf(e);n!==-1&&this._before.splice(n,1)}}}afterEach(e){return this._after=this._after||[],this._after.push(e),()=>{if(this._after!==void 0){const n=this._after.indexOf(e);n!==-1&&this._after.splice(n,1)}}}}function My(){return new CI}function RI(t={}){let e,n=!1;const r=o=>{if(e&&e!==o)throw new Error("Context conflict")};let s;if(t.asyncContext){const o=t.AsyncLocalStorage||globalThis.AsyncLocalStorage;o?s=new o:console.warn("[unctx] `AsyncLocalStorage` is not provided.")}const i=()=>{if(s&&e===void 0){const o=s.getStore();if(o!==void 0)return o}return e};return{use:()=>{const o=i();if(o===void 0)throw new Error("Context is not available");return o},tryUse:()=>i(),set:(o,a)=>{a||r(o),e=o,n=!0},unset:()=>{e=void 0,n=!1},call:(o,a)=>{r(o),e=o;try{return s?s.run(o,a):a()}finally{n||(e=void 0)}},async callAsync(o,a){e=o;const l=()=>{e=o},c=()=>e===o?l:void 0;uu.add(c);try{const u=s?s.run(o,a):a();return n||(e=void 0),await u}finally{uu.delete(c)}}}}function kI(t={}){const e={};return{get(n,r={}){return e[n]||(e[n]=RI({...t,...r})),e[n],e[n]}}}const ba=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof global<"u"?global:typeof window<"u"?window:{},Gd="__unctx__",OI=ba[Gd]||(ba[Gd]=kI()),PI=(t,e={})=>OI.get(t,e),Qd="__unctx_async_handlers__",uu=ba[Qd]||(ba[Qd]=new Set);function hu(t){const e=[];for(const s of uu){const i=s();i&&e.push(i)}const n=()=>{for(const s of e)s()};let r=t();return r&&typeof r=="object"&&"catch"in r&&(r=r.catch(s=>{throw n(),s})),[r,n]}const Fy=PI("nuxt-app"),DI="__nuxt_plugin";function NI(t){let e=0;const n={provide:void 0,globalName:"nuxt",versions:{get nuxt(){return"3.4.1"},get vue(){return n.vueApp.version}},payload:Vt({data:{},state:{},_errors:{},...window.__NUXT__??{}}),static:{data:{}},isHydrating:!0,deferHydration(){if(!n.isHydrating)return()=>{};e++;let i=!1;return()=>{if(!i&&(i=!0,e--,e===0))return n.isHydrating=!1,n.callHook("app:suspense:resolve")}},_asyncDataPromises:{},_asyncData:{},_payloadRevivers:{},...t};n.hooks=My(),n.hook=n.hooks.hook,n.callHook=n.hooks.callHook,n.provide=(i,o)=>{const a="$"+i;Ho(n,a,o),Ho(n.vueApp.config.globalProperties,a,o)},Ho(n.vueApp,"$nuxt",n),Ho(n.vueApp.config.globalProperties,"$nuxt",n);{window.addEventListener("nuxt.preloadError",o=>{n.callHook("app:chunkError",{error:o.payload})});const i=n.hook("app:error",(...o)=>{console.error("[nuxt] error caught during app initialization",...o)});n.hook("app:mounted",i)}const r=Vt(n.payload.config),s=new Proxy(r,{get(i,o){return o in i?i[o]:i.public[o]},set(i,o,a){return o==="public"||o==="app"?!1:(i[o]=a,i.public[o]=a,!0)}});return n.provide("config",s),n}async function LI(t,e){if(typeof e!="function")return;const{provide:n}=await Tn(t,e,[t])||{};if(n&&typeof n=="object")for(const r in n)t.provide(r,n[r])}async function xI(t,e){for(const n of e)await LI(t,n)}function MI(t){const e=[];for(const n of t){if(typeof n!="function")continue;let r=n;n.length>1&&(r=s=>n(s,s.provide)),e.push(r)}return e.sort((n,r)=>{var s,i;return(((s=n.meta)==null?void 0:s.order)||Ta.default)-(((i=r.meta)==null?void 0:i.order)||Ta.default)}),e}const Ta={pre:-20,default:0,post:20};function Qt(t,e){var r;if(typeof t=="function")return Qt({setup:t},e);const n=s=>{if(t.hooks&&s.hooks.addHooks(t.hooks),t.setup)return t.setup(s)};return n.meta={name:(e==null?void 0:e.name)||t.name||((r=t.setup)==null?void 0:r.name),order:(e==null?void 0:e.order)||t.order||Ta[t.enforce||"default"]||Ta.default},n[DI]=!0,n}function Tn(t,e,n){const r=()=>n?e(...n):e();return Fy.set(t),r()}function Xe(){const t=Fy.tryUse();if(!t){const e=Vn();if(!e)throw new Error("nuxt instance unavailable");return e.appContext.app.$nuxt}return t}function dl(){return Xe().$config}function Ho(t,e,n){Object.defineProperty(t,e,{get:()=>n})}const FI=!1;/*!
  * pinia v2.0.34
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const UI=Symbol();var Jd;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Jd||(Jd={}));function $I(){const t=wm(!0),e=t.run(()=>nt({}));let n=[],r=[];const s=mh({install(i){s._a=i,i.provide(UI,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return!this._a&&!FI?r.push(i):n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}function VI(t){return Array.isArray(t)?t:[t]}const BI=["title","script","style","noscript"],sa=["base","meta","link","style","script","noscript"],HI=["title","titleTemplate","templateParams","base","htmlAttrs","bodyAttrs","meta","link","style","script","noscript"],jI=["base","title","titleTemplate","bodyAttrs","htmlAttrs","templateParams"],Yd=["tagPosition","tagPriority","tagDuplicateStrategy","innerHTML","textContent"],qI=typeof window<"u";function Uy(t){let e=9;for(let n=0;n<t.length;)e=Math.imul(e^t.charCodeAt(n++),9**9);return((e^e>>>9)+65536).toString(16).substring(1,8).toLowerCase()}function Xd(t){return t._h||Uy(t._d?t._d:`${t.tag}:${t.textContent||t.innerHTML||""}:${Object.entries(t.props).map(([e,n])=>`${e}:${String(n)}`).join(",")}`)}function $y(t,e){const{props:n,tag:r}=t;if(jI.includes(r))return r;if(r==="link"&&n.rel==="canonical")return"canonical";if(n.charset)return"charset";const s=["id"];r==="meta"&&s.push("name","property","http-equiv");for(const i of s)if(typeof n[i]<"u"){const o=String(n[i]);return e&&!e(o)?!1:`${r}:${i}:${o}`}return!1}function Zd(t,e){return t==null?e||null:typeof t=="function"?t(e):t}async function WI(t,e,n){const r={tag:t,props:{}};return e instanceof Promise&&(e=await e),t==="templateParams"?(r.props=e,r):["title","titleTemplate"].includes(t)?(e&&typeof e=="object"?(r.textContent=e.textContent,e.tagPriority&&(r.tagPriority=e.tagPriority)):r.textContent=e,r):typeof e=="string"?["script","noscript","style"].includes(t)?(t==="script"&&(/^(https?:)?\/\//.test(e)||e.startsWith("/"))?r.props.src=e:r.innerHTML=e,r):!1:(e.body&&(e.tagPosition="bodyClose",delete e.body),e.children&&(e.innerHTML=e.children,delete e.children),r.props=await KI({...e}),Object.keys(r.props).filter(s=>Yd.includes(s)).forEach(s=>{(!["innerHTML","textContent"].includes(s)||BI.includes(r.tag))&&(r[s]=r.props[s]),delete r.props[s]}),Yd.forEach(s=>{!r[s]&&n[s]&&(r[s]=n[s])}),r.tag==="script"&&typeof r.innerHTML=="object"&&(r.innerHTML=JSON.stringify(r.innerHTML)),r.props.class&&(r.props.class=zI(r.props.class)),r.props.content&&Array.isArray(r.props.content)?r.props.content.map(s=>({...r,props:{...r.props,content:s}})):r)}function zI(t){return typeof t=="object"&&!Array.isArray(t)&&(t=Object.keys(t).filter(e=>t[e])),(Array.isArray(t)?t.join(" "):t).split(" ").filter(e=>e.trim()).filter(Boolean).join(" ")}async function KI(t){for(const e of Object.keys(t)){const n=e.startsWith("data-");t[e]instanceof Promise&&(t[e]=await t[e]),String(t[e])==="true"?t[e]=n?"true":"":String(t[e])==="false"&&(n?t[e]="false":delete t[e])}return t}const GI=10;async function QI(t){const e=[];return Object.entries(t.resolvedInput).filter(([n,r])=>typeof r<"u"&&HI.includes(n)).forEach(([n,r])=>{const s=VI(r);e.push(...s.map(i=>WI(n,i,t)).flat())}),(await Promise.all(e)).flat().filter(Boolean).map((n,r)=>(n._e=t._i,t.mode&&(n._m=t.mode),n._p=(t._i<<GI)+r,n))}const ep={base:-1,title:1},tp={critical:-8,high:-1,low:2};function Ia(t){let e=10;const n=t.tagPriority;return typeof n=="number"?n:(t.tag==="meta"?(t.props.charset&&(e=-2),t.props["http-equiv"]==="content-security-policy"&&(e=0)):t.tag==="link"&&t.props.rel==="preconnect"?e=2:t.tag in ep&&(e=ep[t.tag]),typeof n=="string"&&n in tp?e+tp[n]:e)}const JI=[{prefix:"before:",offset:-1},{prefix:"after:",offset:1}];function Xs(t,e){if(typeof t!="string")return t;function n(o){let a;return["s","pageTitle"].includes(o)?a=e.pageTitle:o.includes(".")?a=o.split(".").reduce((l,c)=>l&&l[c]||void 0,e):a=e[o],typeof a<"u"?(a||"").replace(/"/g,'\\"'):!1}let r=t;try{r=decodeURI(t)}catch{}(r.match(/%(\w+\.+\w+)|%(\w+)/g)||[]).sort().reverse().forEach(o=>{const a=n(o.slice(1));typeof a=="string"&&(t=t.replace(new RegExp(`\\${o}(\\W|$)`,"g"),(l,c)=>`${a}${c}`).trim())});const i=e.separator;return t.includes(i)&&(t.endsWith(i)&&(t=t.slice(0,-i.length).trim()),t.startsWith(i)&&(t=t.slice(i.length).trim()),t=t.replace(new RegExp(`\\${i}\\s*\\${i}`,"g"),i)),t}function YI(t){const e={tag:t.tagName.toLowerCase(),props:t.getAttributeNames().reduce((n,r)=>({...n,[r]:t.getAttribute(r)}),{}),innerHTML:t.innerHTML};return e._d=$y(e),e}async function XI(t,e={}){var u;const n=e.document||t.resolvedOptions.document;if(!n)return;const r=(await t.resolveTags()).map(h=>({tag:h,id:sa.includes(h.tag)?Xd(h):h.tag,shouldRender:!0})),s={shouldRender:!0,tags:r};if(await t.hooks.callHook("dom:beforeRender",s),!s.shouldRender)return;let i=t._dom;if(!i){i={elMap:{htmlAttrs:n.documentElement,bodyAttrs:n.body}};for(const h of["body","head"]){const f=(u=n==null?void 0:n[h])==null?void 0:u.children;for(const p of[...f].filter(y=>sa.includes(y.tagName.toLowerCase())))i.elMap[p.getAttribute("data-hid")||Xd(YI(p))]=p}}i.pendingSideEffects={...i.sideEffects||{}},i.sideEffects={};function o(h,f,p){const y=`${h}:${f}`;i.sideEffects[y]=p,delete i.pendingSideEffects[y]}function a({id:h,$el:f,tag:p}){const y=p.tag.endsWith("Attrs");i.elMap[h]=f,y||(["textContent","innerHTML"].forEach(E=>{p[E]&&p[E]!==f[E]&&(f[E]=p[E])}),o(h,"el",()=>{i.elMap[h].remove(),delete i.elMap[h]})),Object.entries(p.props).forEach(([E,b])=>{b=String(b);const w=`attr:${E}`;if(E==="class")for(const d of(b||"").split(" ").filter(Boolean))y&&o(h,`${w}:${d}`,()=>f.classList.remove(d)),!f.classList.contains(d)&&f.classList.add(d);else f.getAttribute(E)!==b&&f.setAttribute(E,b),y&&o(h,w,()=>f.removeAttribute(E))})}const l=[],c={bodyClose:void 0,bodyOpen:void 0,head:void 0};for(const h of r){const{tag:f,shouldRender:p,id:y}=h;if(p){if(f.tag==="title"){n.title=f.textContent;continue}h.$el=h.$el||i.elMap[y],h.$el?a(h):sa.includes(f.tag)&&l.push(h)}}for(const h of l){const f=h.tag.tagPosition||"head";h.$el=n.createElement(h.tag.tag),a(h),c[f]=c[f]||n.createDocumentFragment(),c[f].appendChild(h.$el)}for(const h of r)await t.hooks.callHook("dom:renderTag",h,n,o);c.head&&n.head.appendChild(c.head),c.bodyOpen&&n.body.insertBefore(c.bodyOpen,n.body.firstChild),c.bodyClose&&n.body.appendChild(c.bodyClose),Object.values(i.pendingSideEffects).forEach(h=>h()),t._dom=i,await t.hooks.callHook("dom:rendered",{renders:r})}async function ZI(t,e={}){const n=e.delayFn||(r=>setTimeout(r,10));return t._domUpdatePromise=t._domUpdatePromise||new Promise(r=>n(async()=>{await XI(t,e),delete t._domUpdatePromise,r()}))}function eA(t){return e=>{var r,s;const n=((s=(r=e.resolvedOptions.document)==null?void 0:r.head.querySelector('script[id="unhead:payload"]'))==null?void 0:s.innerHTML)||!1;return n&&e.push(JSON.parse(n)),{mode:"client",hooks:{"entries:updated":function(i){ZI(i,t)}}}}}const tA=["templateParams","htmlAttrs","bodyAttrs"],nA={hooks:{"tag:normalise":function({tag:t}){["hid","vmid","key"].forEach(r=>{t.props[r]&&(t.key=t.props[r],delete t.props[r])});const n=$y(t)||(t.key?`${t.tag}:${t.key}`:!1);n&&(t._d=n)},"tags:resolve":function(t){const e={};t.tags.forEach(r=>{const s=(r.key?`${r.tag}:${r.key}`:r._d)||r._p,i=e[s];if(i){let a=r==null?void 0:r.tagDuplicateStrategy;if(!a&&tA.includes(r.tag)&&(a="merge"),a==="merge"){const l=i.props;["class","style"].forEach(c=>{r.props[c]&&l[c]&&(c==="style"&&!l[c].endsWith(";")&&(l[c]+=";"),r.props[c]=`${l[c]} ${r.props[c]}`)}),e[s].props={...l,...r.props};return}else if(r._e===i._e){i._duped=i._duped||[],r._d=`${i._d}:${i._duped.length+1}`,i._duped.push(r);return}else if(Ia(r)>Ia(i))return}const o=Object.keys(r.props).length+(r.innerHTML?1:0)+(r.textContent?1:0);if(sa.includes(r.tag)&&o===0){delete e[s];return}e[s]=r});const n=[];Object.values(e).forEach(r=>{const s=r._duped;delete r._duped,n.push(r),s&&n.push(...s)}),t.tags=n}}},rA={mode:"server",hooks:{"tags:resolve":function(t){const e={};t.tags.filter(n=>["titleTemplate","templateParams"].includes(n.tag)&&n._m==="server").forEach(n=>{e[n.tag]=n.tag==="titleTemplate"?n.textContent:n.props}),Object.keys(e).length&&t.tags.push({tag:"script",innerHTML:JSON.stringify(e),props:{id:"unhead:payload",type:"application/json"}})}}},np=["script","link","bodyAttrs"];function rp(t){const e={},n={};return Object.entries(t.props).forEach(([r,s])=>{r.startsWith("on")&&typeof s=="function"?n[r]=s:e[r]=s}),{props:e,eventHandlers:n}}const sA={hooks:{"ssr:render":function(t){t.tags=t.tags.map(e=>(!np.includes(e.tag)||!Object.entries(e.props).find(([n,r])=>n.startsWith("on")&&typeof r=="function")||(e.props=rp(e).props),e))},"tags:resolve":function(t){t.tags=t.tags.map(e=>{if(!np.includes(e.tag))return e;const{props:n,eventHandlers:r}=rp(e);return Object.keys(r).length&&(e.props=n,e._eventHandlers=r),e})},"dom:renderTag":function(t,e,n){if(!t.tag._eventHandlers)return;const r=t.tag.tag==="bodyAttrs"?e.defaultView:t.$el;Object.entries(t.tag._eventHandlers).forEach(([s,i])=>{const o=`${t.tag._d||t.tag._p}:${s}`,a=s.slice(2).toLowerCase(),l=`data-h-${a}`;if(n(t.id,o,()=>{}),t.$el.hasAttribute(l))return;const c=i;t.$el.setAttribute(l,""),r.addEventListener(a,c),t.entry&&n(t.id,o,()=>{r.removeEventListener(a,c),t.$el.removeAttribute(l)})})}}},iA=["link","style","script","noscript"],oA={hooks:{"tag:normalise":({tag:t})=>{t.key&&iA.includes(t.tag)&&(t.props["data-hid"]=t._h=Uy(t.key))}}},aA={hooks:{"tags:resolve":t=>{const e=n=>{var r;return(r=t.tags.find(s=>s._d===n))==null?void 0:r._p};for(const{prefix:n,offset:r}of JI)for(const s of t.tags.filter(i=>typeof i.tagPriority=="string"&&i.tagPriority.startsWith(n))){const i=e(s.tagPriority.replace(n,""));typeof i<"u"&&(s._p=i+r)}t.tags.sort((n,r)=>n._p-r._p).sort((n,r)=>Ia(n)-Ia(r))}}},lA={hooks:{"tags:resolve":t=>{var i;const{tags:e}=t,n=(i=e.find(o=>o.tag==="title"))==null?void 0:i.textContent,r=e.findIndex(o=>o.tag==="templateParams"),s=r!==-1?e[r].props:{};s.separator=s.separator||"|",s.pageTitle=Xs(s.pageTitle||n||"",s);for(const o of e)["titleTemplate","title"].includes(o.tag)&&typeof o.textContent=="string"?o.textContent=Xs(o.textContent,s):o.tag==="meta"&&typeof o.props.content=="string"?o.props.content=Xs(o.props.content,s):o.tag==="link"&&typeof o.props.href=="string"?o.props.href=Xs(o.props.href,s):o.tag==="script"&&["application/json","application/ld+json"].includes(o.props.type)&&o.innerHTML&&(o.innerHTML=Xs(o.innerHTML,s));t.tags=e.filter(o=>o.tag!=="templateParams")}}},cA={hooks:{"tags:resolve":t=>{const{tags:e}=t;let n=e.findIndex(s=>s.tag==="titleTemplate");const r=e.findIndex(s=>s.tag==="title");if(r!==-1&&n!==-1){const s=Zd(e[n].textContent,e[r].textContent);s!==null?e[r].textContent=s||e[r].textContent:delete e[r]}else if(n!==-1){const s=Zd(e[n].textContent);s!==null&&(e[n].textContent=s,e[n].tag="title",n=-1)}n!==-1&&delete e[n],t.tags=e.filter(Boolean)}}};let Vy;function uA(t={}){const e=hA(t);return e.use(eA()),Vy=e}function sp(t,e){return!t||t==="server"&&e||t==="client"&&!e}function hA(t={}){const e=My();e.addHooks(t.hooks||{}),t.document=t.document||(qI?document:void 0);const n=!t.document;t.plugins=[nA,rA,sA,oA,aA,lA,cA,...(t==null?void 0:t.plugins)||[]];const r=()=>e.callHook("entries:updated",o);let s=0,i=[];const o={resolvedOptions:t,hooks:e,headEntries(){return i},use(a){const l=typeof a=="function"?a(o):a;sp(l.mode,n)&&e.addHooks(l.hooks||{})},push(a,l){const c={_i:s++,input:a,...l};return sp(c.mode,n)&&(i.push(c),r()),{dispose(){i=i.filter(u=>u._i!==c._i),e.callHook("entries:updated",o),r()},patch(u){i=i.map(h=>(h._i===c._i&&(h.input=c.input=u),h)),r()}}},async resolveTags(){const a={tags:[],entries:[...i]};await e.callHook("entries:resolve",a);for(const l of a.entries){const c=l.resolvedInput||l.input;if(l.resolvedInput=await(l.transform?l.transform(c):c),l.resolvedInput)for(const u of await QI(l)){const h={tag:u,entry:l,resolvedOptions:o.resolvedOptions};await e.callHook("tag:normalise",h),a.tags.push(h.tag)}}return await e.callHook("tags:beforeResolve",a),await e.callHook("tags:resolve",a),a.tags},ssr:n};return t.plugins.forEach(a=>o.use(a)),o.hooks.callHook("init",o),o}function fA(){return Vy}const dA=wy.startsWith("3");function pA(t){return typeof t=="function"?t():$e(t)}function Aa(t,e=""){if(t instanceof Promise)return t;const n=pA(t);return!t||!n?n:Array.isArray(n)?n.map(r=>Aa(r,e)):typeof n=="object"?Object.fromEntries(Object.entries(n).map(([r,s])=>r==="titleTemplate"||r.startsWith("on")?[r,$e(s)]:[r,Aa(s,r)])):n}const gA={hooks:{"entries:resolve":function(t){for(const e of t.entries)e.resolvedInput=Aa(e.input)}}},By="usehead";function mA(t){return{install(n){dA&&(n.config.globalProperties.$unhead=t,n.config.globalProperties.$head=t,n.provide(By,t))}}.install}function yA(t={}){t.domDelayFn=t.domDelayFn||(n=>yr(()=>n()));const e=uA(t);return e.use(gA),e.install=mA(e),e}function _A(){return Vn()&&$t(By)||fA()}function IF(t,e={}){const n=_A();if(n)return n.ssr?n.push(t,e):vA(n,t,e)}function vA(t,e,n={}){const r=nt(!1),s=nt({});sT(()=>{s.value=r.value?{}:Aa(e)});const i=t.push(s.value,n);return Rn(s,a=>{i.patch(a)}),Vn()&&(Zi(()=>{i.dispose()}),Zm(()=>{r.value=!0}),Xm(()=>{r.value=!1})),i}function fc(t){return t!==null&&typeof t=="object"}function fu(t,e,n=".",r){if(!fc(e))return fu(t,{},n,r);const s=Object.assign({},e);for(const i in t){if(i==="__proto__"||i==="constructor")continue;const o=t[i];o!=null&&(r&&r(s,i,o,n)||(Array.isArray(o)&&Array.isArray(s[i])?s[i]=[...o,...s[i]]:fc(o)&&fc(s[i])?s[i]=fu(o,s[i],(n?`${n}.`:"")+i.toString(),r):s[i]=o))}return s}function Hy(t){return(...e)=>e.reduce((n,r)=>fu(n,r,"",t),{})}const wA=Hy(),AF=Hy((t,e,n)=>{if(typeof t[e]<"u"&&typeof n=="function")return t[e]=n(t[e]),!0});function EA(t,e){try{return e in t}catch{return!1}}var bA=Object.defineProperty,TA=(t,e,n)=>e in t?bA(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ir=(t,e,n)=>(TA(t,typeof e!="symbol"?e+"":e,n),n);class du extends Error{constructor(e,n={}){super(e,n),Ir(this,"statusCode",500),Ir(this,"fatal",!1),Ir(this,"unhandled",!1),Ir(this,"statusMessage"),Ir(this,"data"),Ir(this,"cause"),n.cause&&!this.cause&&(this.cause=n.cause)}toJSON(){const e={message:this.message,statusCode:gu(this.statusCode,500)};return this.statusMessage&&(e.statusMessage=jy(this.statusMessage)),this.data!==void 0&&(e.data=this.data),e}}Ir(du,"__h3_error__",!0);function pu(t){if(typeof t=="string")return new du(t);if(IA(t))return t;const e=new du(t.message??t.statusMessage??"",{cause:t.cause||t});if(EA(t,"stack"))try{Object.defineProperty(e,"stack",{get(){return t.stack}})}catch{try{e.stack=t.stack}catch{}}if(t.data&&(e.data=t.data),t.statusCode?e.statusCode=gu(t.statusCode,e.statusCode):t.status&&(e.statusCode=gu(t.status,e.statusCode)),t.statusMessage?e.statusMessage=t.statusMessage:t.statusText&&(e.statusMessage=t.statusText),e.statusMessage){const n=e.statusMessage;jy(e.statusMessage)!==n&&console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.")}return t.fatal!==void 0&&(e.fatal=t.fatal),t.unhandled!==void 0&&(e.unhandled=t.unhandled),e}function IA(t){var e;return((e=t==null?void 0:t.constructor)==null?void 0:e.__h3_error__)===!0}const AA=/[^\u0009\u0020-\u007E]/g;function jy(t=""){return t.replace(AA,"")}function gu(t,e=200){return!t||(typeof t=="string"&&(t=Number.parseInt(t,10)),t<100||t>999)?e:t}function SA(...t){const e=typeof t[t.length-1]=="string"?t.pop():void 0;typeof t[0]!="string"&&t.unshift(e);const[n,r]=t;if(!n||typeof n!="string")throw new TypeError("[nuxt] [useState] key must be a string: "+n);if(r!==void 0&&typeof r!="function")throw new Error("[nuxt] [useState] init must be a function: "+r);const s="$s"+n,i=Xe(),o=Um(i.payload.state,s);if(o.value===void 0&&r){const a=r();if(Ve(a))return i.payload.state[s]=a,a;o.value=a}return o}const Us=()=>{var t;return(t=Xe())==null?void 0:t.$router},qy=()=>Vn()?$t("_route",Xe()._route):Xe()._route,CA=t=>t,RA=()=>{try{if(Xe()._processingMiddleware)return!0}catch{return!0}return!1},SF=(t,e)=>{t||(t="/");const n=typeof t=="string"?t:t.path||"/",r=(e==null?void 0:e.external)||eo(n,{acceptRelative:!0});if(r&&!(e!=null&&e.external))throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");if(r&&fl(n).protocol==="script:")throw new Error("Cannot navigate to an URL with script protocol.");const s=RA();if(!r&&s)return t;const i=Us();return r?(e!=null&&e.replace?location.replace(n):location.href=n,Promise.resolve()):e!=null&&e.replace?i.replace(t):i.push(t)},pl=()=>Um(Xe().payload,"error"),rs=t=>{const e=Wy(t);try{Xe().callHook("app:error",e);const r=pl();r.value=r.value||e}catch{throw e}return e},kA=async(t={})=>{const e=Xe(),n=pl();e.callHook("app:error:cleared",t),t.redirect&&await Us().replace(t.redirect),n.value=null},OA=t=>!!(t&&typeof t=="object"&&"__nuxt_error"in t),Wy=t=>{const e=pu(t);return e.__nuxt_error=!0,e},PA="modulepreload",DA=function(t,e){return t.startsWith(".")?new URL(t,e).href:t},ip={},NA=function(e,n,r){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=DA(i,r),i in ip)return;ip[i]=!0;const o=i.endsWith(".css"),a=o?'[rel="stylesheet"]':"";if(!!r)for(let u=s.length-1;u>=0;u--){const h=s[u];if(h.href===i&&(!o||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${a}`))return;const c=document.createElement("link");if(c.rel=o?"stylesheet":PA,o||(c.as="script",c.crossOrigin=""),c.href=i,document.head.appendChild(c),o)return new Promise((u,h)=>{c.addEventListener("load",u),c.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e())},N=(...t)=>NA(...t).catch(e=>{const n=new Event("nuxt.preloadError");throw n.payload=e,window.dispatchEvent(n),e}),LA=-1,xA=-2,MA=-3,FA=-4,UA=-5,$A=-6;function VA(t,e){return BA(JSON.parse(t),e)}function BA(t,e){if(typeof t=="number")return s(t,!0);if(!Array.isArray(t)||t.length===0)throw new Error("Invalid input");const n=t,r=Array(n.length);function s(i,o=!1){if(i===LA)return;if(i===MA)return NaN;if(i===FA)return 1/0;if(i===UA)return-1/0;if(i===$A)return-0;if(o)throw new Error("Invalid input");if(i in r)return r[i];const a=n[i];if(!a||typeof a!="object")r[i]=a;else if(Array.isArray(a))if(typeof a[0]=="string"){const l=a[0],c=e==null?void 0:e[l];if(c)return r[i]=c(s(a[1]));switch(l){case"Date":r[i]=new Date(a[1]);break;case"Set":const u=new Set;r[i]=u;for(let p=1;p<a.length;p+=1)u.add(s(a[p]));break;case"Map":const h=new Map;r[i]=h;for(let p=1;p<a.length;p+=2)h.set(s(a[p]),s(a[p+1]));break;case"RegExp":r[i]=new RegExp(a[1],a[2]);break;case"Object":r[i]=Object(a[1]);break;case"BigInt":r[i]=BigInt(a[1]);break;case"null":const f=Object.create(null);r[i]=f;for(let p=1;p<a.length;p+=2)f[a[p]]=s(a[p+1]);break;default:throw new Error(`Unknown type ${l}`)}}else{const l=new Array(a.length);r[i]=l;for(let c=0;c<a.length;c+=1){const u=a[c];u!==xA&&(l[c]=s(u))}}else{const l={};r[i]=l;for(const c in a){const u=a[c];l[c]=s(u)}}return r[i]}return s(0)}const HA={meta:[{charset:"utf-8"},{"http-equiv":"x-ua-compatible",content:"IE=edge"},{name:"viewport",content:"width=device-width, initial-scale=1.0"}],link:[{rel:"icon",href:"/favicon.ico"}],style:[],script:[],noscript:[],title:"Push通知ツール"},jA=!1,mu=!1,qA=!1,WA="__nuxt",zA=!1;function op(t,e={}){const n=KA(t,e),r=Xe(),s=r._payloadCache=r._payloadCache||{};return s[n]||(s[n]=GA(n).then(i=>i||(delete s[n],null))),s[n]}const ap="js";function KA(t,e={}){const n=new URL(t,"http://localhost");if(n.search)throw new Error("Payload URL cannot contain search params: "+t);if(n.host!=="localhost"||eo(n.pathname,{acceptRelative:!0}))throw new Error("Payload URL must not include hostname: "+t);const r=e.hash||(e.fresh?Date.now():"");return to(dl().app.baseURL,n.pathname,r?`_payload.${r}.${ap}`:`_payload.${ap}`)}async function GA(t){try{return zA?JA(await fetch(t).then(e=>e.text())):await N(()=>import(t),[],import.meta.url).then(e=>e.default||e)}catch(e){console.warn("[nuxt] Cannot load payload ",t,e)}return null}function QA(){return!!Xe().payload.prerenderedAt}function JA(t){return VA(t,Xe()._payloadRevivers)}function YA(t={}){const e=t.path||window.location.pathname;let n={};try{n=JSON.parse(sessionStorage.getItem("nuxt:reload")||"{}")}catch{}if(t.force||(n==null?void 0:n.path)!==e||(n==null?void 0:n.expires)<Date.now()){try{sessionStorage.setItem("nuxt:reload",JSON.stringify({path:e,expires:Date.now()+(t.ttl??1e4)}))}catch{}if(t.persistState)try{sessionStorage.setItem("nuxt:reload:state",JSON.stringify({state:Xe().payload.state}))}catch{}window.location.pathname!==e?window.location.href=e:window.location.reload()}}const XA=Qt(t=>{const e=$I();return t.vueApp.use(e),t.payload&&t.payload.pinia&&(e.state.value=t.payload.pinia),{provide:{pinia:e}}}),dc={BlockViewer:F(()=>N(()=>import("./BlockViewer.5c2e4a09.js"),[],import.meta.url).then(t=>t.default||t)),Icon:F(()=>N(()=>import("./Icon.e0c5fc4a.js"),["./Icon.e0c5fc4a.js","./config.26f81ef1.js","./Icon.445a8a91.css"],import.meta.url).then(t=>t.default||t)),IconCSS:F(()=>N(()=>import("./IconCSS.e959f953.js"),["./IconCSS.e959f953.js","./config.26f81ef1.js","./IconCSS.3ad62362.css"],import.meta.url).then(t=>t.default||t)),Accordion:F(()=>N(()=>import("./accordion.esm.1df74b37.js"),[],import.meta.url).then(t=>t.default||t)),AccordionTab:F(()=>N(()=>import("./accordiontab.esm.689aafeb.js"),[],import.meta.url).then(t=>t.default||t)),AutoComplete:F(()=>N(()=>import("./autocomplete.esm.b9f78ef5.js"),["./autocomplete.esm.b9f78ef5.js","./button.esm.4087d562.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js","./virtualscroller.esm.77db94c2.js"],import.meta.url).then(t=>t.default||t)),Avatar:F(()=>N(()=>import("./avatar.esm.679302a9.js"),[],import.meta.url).then(t=>t.default||t)),AvatarGroup:F(()=>N(()=>import("./avatargroup.esm.38f55cd7.js"),[],import.meta.url).then(t=>t.default||t)),Badge:F(()=>N(()=>import("./badge.esm.fc7997bc.js"),[],import.meta.url).then(t=>t.default||t)),BlockUI:F(()=>N(()=>import("./blockui.esm.4ef2fff2.js"),[],import.meta.url).then(t=>t.default||t)),Breadcrumb:F(()=>N(()=>import("./breadcrumb.esm.b44e0207.js"),[],import.meta.url).then(t=>t.default||t)),Button:F(()=>N(()=>import("./button.esm.4087d562.js"),[],import.meta.url).then(t=>t.default||t)),Calendar:F(()=>N(()=>import("./calendar.esm.db3a4c49.js"),["./calendar.esm.db3a4c49.js","./button.esm.4087d562.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),Card:F(()=>N(()=>import("./card.esm.8e97a7a3.js"),[],import.meta.url).then(t=>t.default||t)),Carousel:F(()=>N(()=>import("./carousel.esm.68b8d6ed.js"),[],import.meta.url).then(t=>t.default||t)),CascadeSelect:F(()=>N(()=>import("./cascadeselect.esm.43d40b3d.js"),["./cascadeselect.esm.43d40b3d.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),Chart:F(()=>N(()=>import("./chart.esm.a32129ff.js"),[],import.meta.url).then(t=>t.default||t)),Checkbox:F(()=>N(()=>import("./checkbox.esm.a03ded52.js"),[],import.meta.url).then(t=>t.default||t)),Chip:F(()=>N(()=>import("./chip.esm.e1b3f012.js"),[],import.meta.url).then(t=>t.default||t)),Chips:F(()=>N(()=>import("./chips.esm.8ffab950.js"),[],import.meta.url).then(t=>t.default||t)),ColorPicker:F(()=>N(()=>import("./colorpicker.esm.043d898d.js"),["./colorpicker.esm.043d898d.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),Column:F(()=>N(()=>import("./column.esm.16afdb9d.js"),[],import.meta.url).then(t=>t.default||t)),ColumnGroup:F(()=>N(()=>import("./columngroup.esm.a1253532.js"),[],import.meta.url).then(t=>t.default||t)),ConfirmDialog:F(()=>N(()=>import("./confirmdialog.esm.1eceab2e.js"),["./confirmdialog.esm.1eceab2e.js","./button.esm.4087d562.js","./dialog.esm.b445a747.js","./focustrap.esm.aedfac9b.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),ConfirmPopup:F(()=>N(()=>import("./confirmpopup.esm.384b65ae.js"),["./confirmpopup.esm.384b65ae.js","./button.esm.4087d562.js","./focustrap.esm.aedfac9b.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),ContextMenu:F(()=>N(()=>import("./contextmenu.esm.07d4709c.js"),["./contextmenu.esm.07d4709c.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),DataTable:F(()=>N(()=>import("./datatable.esm.10e6509c.js"),["./datatable.esm.10e6509c.js","./paginator.esm.3a93e560.js","./dropdown.esm.7450136e.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js","./virtualscroller.esm.77db94c2.js","./inputnumber.esm.31182f59.js","./button.esm.4087d562.js","./inputtext.esm.4724b432.js","./focustrap.esm.aedfac9b.js"],import.meta.url).then(t=>t.default||t)),DataView:F(()=>N(()=>import("./dataview.esm.62a4a4e7.js"),["./dataview.esm.62a4a4e7.js","./paginator.esm.3a93e560.js","./dropdown.esm.7450136e.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js","./virtualscroller.esm.77db94c2.js","./inputnumber.esm.31182f59.js","./button.esm.4087d562.js","./inputtext.esm.4724b432.js"],import.meta.url).then(t=>t.default||t)),DataViewLayoutOptions:F(()=>N(()=>import("./dataviewlayoutoptions.esm.4ddda942.js"),[],import.meta.url).then(t=>t.default||t)),DeferredContent:F(()=>N(()=>import("./deferredcontent.esm.190fdec2.js"),[],import.meta.url).then(t=>t.default||t)),Dialog:F(()=>N(()=>import("./dialog.esm.b445a747.js"),["./dialog.esm.b445a747.js","./focustrap.esm.aedfac9b.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),Divider:F(()=>N(()=>import("./divider.esm.e58219df.js"),[],import.meta.url).then(t=>t.default||t)),Dock:F(()=>N(()=>import("./dock.esm.eeee58fd.js"),[],import.meta.url).then(t=>t.default||t)),Dropdown:F(()=>N(()=>import("./dropdown.esm.7450136e.js"),["./dropdown.esm.7450136e.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js","./virtualscroller.esm.77db94c2.js"],import.meta.url).then(t=>t.default||t)),Fieldset:F(()=>N(()=>import("./fieldset.esm.3db57777.js"),[],import.meta.url).then(t=>t.default||t)),FileUpload:F(()=>N(()=>import("./fileupload.esm.7178ae0d.js"),["./fileupload.esm.7178ae0d.js","./button.esm.4087d562.js","./message.esm.27bda9ff.js","./progressbar.esm.a36bfb4c.js","./badge.esm.fc7997bc.js"],import.meta.url).then(t=>t.default||t)),Galleria:F(()=>N(()=>import("./galleria.esm.ce2f2f4a.js"),["./galleria.esm.ce2f2f4a.js","./focustrap.esm.aedfac9b.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),Image:F(()=>N(()=>import("./image.esm.4e51bb2e.js"),["./image.esm.4e51bb2e.js","./focustrap.esm.aedfac9b.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),InlineMessage:F(()=>N(()=>import("./inlinemessage.esm.63a91ff8.js"),[],import.meta.url).then(t=>t.default||t)),Inplace:F(()=>N(()=>import("./inplace.esm.57e5719d.js"),["./inplace.esm.57e5719d.js","./button.esm.4087d562.js","./focustrap.esm.aedfac9b.js"],import.meta.url).then(t=>t.default||t)),InputMask:F(()=>N(()=>import("./inputmask.esm.c42ef06a.js"),[],import.meta.url).then(t=>t.default||t)),InputNumber:F(()=>N(()=>import("./inputnumber.esm.31182f59.js"),["./inputnumber.esm.31182f59.js","./button.esm.4087d562.js","./inputtext.esm.4724b432.js"],import.meta.url).then(t=>t.default||t)),InputSwitch:F(()=>N(()=>import("./inputswitch.esm.4d8c5ddf.js"),[],import.meta.url).then(t=>t.default||t)),InputText:F(()=>N(()=>import("./inputtext.esm.4724b432.js"),[],import.meta.url).then(t=>t.default||t)),Knob:F(()=>N(()=>import("./knob.esm.2fec70b3.js"),[],import.meta.url).then(t=>t.default||t)),Listbox:F(()=>N(()=>import("./listbox.esm.f4de2567.js"),["./listbox.esm.f4de2567.js","./virtualscroller.esm.77db94c2.js"],import.meta.url).then(t=>t.default||t)),MegaMenu:F(()=>N(()=>import("./megamenu.esm.a44fa752.js"),[],import.meta.url).then(t=>t.default||t)),Menu:F(()=>N(()=>import("./menu.esm.a640429e.js"),["./menu.esm.a640429e.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),Menubar:F(()=>N(()=>import("./menubar.esm.3d5a2d6a.js"),[],import.meta.url).then(t=>t.default||t)),Message:F(()=>N(()=>import("./message.esm.27bda9ff.js"),[],import.meta.url).then(t=>t.default||t)),MultiSelect:F(()=>N(()=>import("./multiselect.esm.8b6795f0.js"),["./multiselect.esm.8b6795f0.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js","./virtualscroller.esm.77db94c2.js"],import.meta.url).then(t=>t.default||t)),OrderList:F(()=>N(()=>import("./orderlist.esm.59eeeec0.js"),["./orderlist.esm.59eeeec0.js","./button.esm.4087d562.js"],import.meta.url).then(t=>t.default||t)),OrganizationChart:F(()=>N(()=>import("./organizationchart.esm.f7a2e229.js"),[],import.meta.url).then(t=>t.default||t)),OverlayPanel:F(()=>N(()=>import("./overlaypanel.esm.32a45ad4.js"),["./overlaypanel.esm.32a45ad4.js","./focustrap.esm.aedfac9b.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),Paginator:F(()=>N(()=>import("./paginator.esm.3a93e560.js"),["./paginator.esm.3a93e560.js","./dropdown.esm.7450136e.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js","./virtualscroller.esm.77db94c2.js","./inputnumber.esm.31182f59.js","./button.esm.4087d562.js","./inputtext.esm.4724b432.js"],import.meta.url).then(t=>t.default||t)),Panel:F(()=>N(()=>import("./panel.esm.d79a5798.js"),[],import.meta.url).then(t=>t.default||t)),PanelMenu:F(()=>N(()=>import("./panelmenu.esm.411c13a0.js"),[],import.meta.url).then(t=>t.default||t)),Password:F(()=>N(()=>import("./password.esm.dbfe60e7.js"),["./password.esm.dbfe60e7.js","./inputtext.esm.4724b432.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),PickList:F(()=>N(()=>import("./picklist.esm.7d8db4ea.js"),["./picklist.esm.7d8db4ea.js","./button.esm.4087d562.js"],import.meta.url).then(t=>t.default||t)),ProgressBar:F(()=>N(()=>import("./progressbar.esm.a36bfb4c.js"),[],import.meta.url).then(t=>t.default||t)),ProgressSpinner:F(()=>N(()=>import("./progressspinner.esm.a7d1860c.js"),[],import.meta.url).then(t=>t.default||t)),RadioButton:F(()=>N(()=>import("./radiobutton.esm.31673b9a.js"),[],import.meta.url).then(t=>t.default||t)),Rating:F(()=>N(()=>import("./rating.esm.18f9fc17.js"),[],import.meta.url).then(t=>t.default||t)),ScrollPanel:F(()=>N(()=>import("./scrollpanel.esm.03cc912e.js"),[],import.meta.url).then(t=>t.default||t)),ScrollTop:F(()=>N(()=>import("./scrolltop.esm.751a5b18.js"),[],import.meta.url).then(t=>t.default||t)),SelectButton:F(()=>N(()=>import("./selectbutton.esm.0566a452.js"),[],import.meta.url).then(t=>t.default||t)),Sidebar:F(()=>N(()=>import("./sidebar.esm.fdfa456e.js"),["./sidebar.esm.fdfa456e.js","./focustrap.esm.aedfac9b.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),Skeleton:F(()=>N(()=>import("./skeleton.esm.a7cc8509.js"),[],import.meta.url).then(t=>t.default||t)),Slider:F(()=>N(()=>import("./slider.esm.ea52b779.js"),[],import.meta.url).then(t=>t.default||t)),SpeedDial:F(()=>N(()=>import("./speeddial.esm.aba8c9b8.js"),["./speeddial.esm.aba8c9b8.js","./button.esm.4087d562.js"],import.meta.url).then(t=>t.default||t)),SplitButton:F(()=>N(()=>import("./splitbutton.esm.80a67d42.js"),["./splitbutton.esm.80a67d42.js","./button.esm.4087d562.js","./tieredmenu.esm.1262e3fa.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),Splitter:F(()=>N(()=>import("./splitter.esm.09276865.js"),[],import.meta.url).then(t=>t.default||t)),SplitterPanel:F(()=>N(()=>import("./splitterpanel.esm.e3c972cd.js"),[],import.meta.url).then(t=>t.default||t)),Steps:F(()=>N(()=>import("./steps.esm.b714aadd.js"),[],import.meta.url).then(t=>t.default||t)),TabMenu:F(()=>N(()=>import("./tabmenu.esm.28c021fe.js"),[],import.meta.url).then(t=>t.default||t)),TabPanel:F(()=>N(()=>import("./tabpanel.esm.362661ad.js"),[],import.meta.url).then(t=>t.default||t)),TabView:F(()=>N(()=>import("./tabview.esm.fcb75eda.js"),[],import.meta.url).then(t=>t.default||t)),Tag:F(()=>N(()=>import("./tag.esm.7ba556bb.js"),[],import.meta.url).then(t=>t.default||t)),Terminal:F(()=>N(()=>import("./terminal.esm.9e96bc6b.js"),["./terminal.esm.9e96bc6b.js","./terminalservice.esm.813ae781.js"],import.meta.url).then(t=>t.default||t)),TerminalService:F(()=>N(()=>import("./terminalservice.esm.813ae781.js"),[],import.meta.url).then(t=>t.default||t)),Textarea:F(()=>N(()=>import("./textarea.esm.bd4e21ac.js"),[],import.meta.url).then(t=>t.default||t)),TieredMenu:F(()=>N(()=>import("./tieredmenu.esm.1262e3fa.js"),["./tieredmenu.esm.1262e3fa.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),Timeline:F(()=>N(()=>import("./timeline.esm.413ba14a.js"),[],import.meta.url).then(t=>t.default||t)),Toast:F(()=>N(()=>import("./toast.esm.803b843c.js"),["./toast.esm.803b843c.js","./portal.esm.f9c19ffd.js"],import.meta.url).then(t=>t.default||t)),ToggleButton:F(()=>N(()=>import("./togglebutton.esm.2a692cdd.js"),[],import.meta.url).then(t=>t.default||t)),Toolbar:F(()=>N(()=>import("./toolbar.esm.3d4e4af8.js"),[],import.meta.url).then(t=>t.default||t)),Tree:F(()=>N(()=>import("./tree.esm.8e23cb4f.js"),[],import.meta.url).then(t=>t.default||t)),TreeSelect:F(()=>N(()=>import("./treeselect.esm.bc14bd6c.js"),["./treeselect.esm.bc14bd6c.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js","./tree.esm.8e23cb4f.js"],import.meta.url).then(t=>t.default||t)),TreeTable:F(()=>N(()=>import("./treetable.esm.3428dd3b.js"),["./treetable.esm.3428dd3b.js","./paginator.esm.3a93e560.js","./dropdown.esm.7450136e.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js","./virtualscroller.esm.77db94c2.js","./inputnumber.esm.31182f59.js","./button.esm.4087d562.js","./inputtext.esm.4724b432.js"],import.meta.url).then(t=>t.default||t)),TriStateCheckbox:F(()=>N(()=>import("./tristatecheckbox.esm.a1f09b4f.js"),[],import.meta.url).then(t=>t.default||t)),VirtualScroller:F(()=>N(()=>import("./virtualscroller.esm.77db94c2.js"),[],import.meta.url).then(t=>t.default||t))},ZA=Qt({name:"nuxt:global-components",setup(t){for(const e in dc)t.vueApp.component(e,dc[e]),t.vueApp.component("Lazy"+e,dc[e])}}),eS=Qt({name:"nuxt:head",setup(t){const n=yA();n.push(HA),t.vueApp.use(n);{let r=!0;const s=()=>{r=!1,n.hooks.callHook("entries:updated",n)};n.hooks.hook("dom:beforeRender",i=>{i.shouldRender=!r}),t.hooks.hook("page:start",()=>{r=!0}),t.hooks.hook("page:finish",s),t.hooks.hook("app:suspense:resolve",s)}}});/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const es=typeof window<"u";function tS(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const be=Object.assign;function pc(t,e){const n={};for(const r in e){const s=e[r];n[r]=tn(s)?s.map(t):t(s)}return n}const _i=()=>{},tn=Array.isArray,nS=/\/$/,rS=t=>t.replace(nS,"");function gc(t,e,n="/"){let r,s={},i="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(r=e.slice(0,l),i=e.slice(l+1,a>-1?a:e.length),s=t(i)),a>-1&&(r=r||e.slice(0,a),o=e.slice(a,e.length)),r=aS(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:o}}function sS(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function lp(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function iS(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&Is(e.matched[r],n.matched[s])&&zy(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function Is(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function zy(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!oS(t[n],e[n]))return!1;return!0}function oS(t,e){return tn(t)?cp(t,e):tn(e)?cp(e,t):t===e}function cp(t,e){return tn(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function aS(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}var Ni;(function(t){t.pop="pop",t.push="push"})(Ni||(Ni={}));var vi;(function(t){t.back="back",t.forward="forward",t.unknown=""})(vi||(vi={}));function lS(t){if(!t)if(es){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),rS(t)}const cS=/^[^#]+#/;function uS(t,e){return t.replace(cS,"#")+e}function hS(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const gl=()=>({left:window.pageXOffset,top:window.pageYOffset});function fS(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=hS(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function up(t,e){return(history.state?history.state.position-e:-1)+t}const yu=new Map;function dS(t,e){yu.set(t,e)}function pS(t){const e=yu.get(t);return yu.delete(t),e}let gS=()=>location.protocol+"//"+location.host;function Ky(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let a=s.includes(t.slice(i))?t.slice(i).length:1,l=s.slice(a);return l[0]!=="/"&&(l="/"+l),lp(l,"")}return lp(n,t)+r+s}function mS(t,e,n,r){let s=[],i=[],o=null;const a=({state:f})=>{const p=Ky(t,location),y=n.value,E=e.value;let b=0;if(f){if(n.value=p,e.value=f,o&&o===y){o=null;return}b=E?f.position-E.position:0}else r(p);s.forEach(w=>{w(n.value,y,{delta:b,type:Ni.pop,direction:b?b>0?vi.forward:vi.back:vi.unknown})})};function l(){o=n.value}function c(f){s.push(f);const p=()=>{const y=s.indexOf(f);y>-1&&s.splice(y,1)};return i.push(p),p}function u(){const{history:f}=window;f.state&&f.replaceState(be({},f.state,{scroll:gl()}),"")}function h(){for(const f of i)f();i=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:c,destroy:h}}function hp(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?gl():null}}function yS(t){const{history:e,location:n}=window,r={value:Ky(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(l,c,u){const h=t.indexOf("#"),f=h>-1?(n.host&&document.querySelector("base")?t:t.slice(h))+l:gS()+t+l;try{e[u?"replaceState":"pushState"](c,"",f),s.value=c}catch(p){console.error(p),n[u?"replace":"assign"](f)}}function o(l,c){const u=be({},e.state,hp(s.value.back,l,s.value.forward,!0),c,{position:s.value.position});i(l,u,!0),r.value=l}function a(l,c){const u=be({},s.value,e.state,{forward:l,scroll:gl()});i(u.current,u,!0);const h=be({},hp(r.value,l,null),{position:u.position+1},c);i(l,h,!1),r.value=l}return{location:r,state:s,push:a,replace:o}}function Gy(t){t=lS(t);const e=yS(t),n=mS(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=be({location:"",base:t,go:r,createHref:uS.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function _S(t){return t=location.host?t||location.pathname+location.search:"",t.includes("#")||(t+="#"),Gy(t)}function vS(t){return typeof t=="string"||t&&typeof t=="object"}function Qy(t){return typeof t=="string"||typeof t=="symbol"}const zn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Jy=Symbol("");var fp;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(fp||(fp={}));function As(t,e){return be(new Error,{type:t,[Jy]:!0},e)}function vn(t,e){return t instanceof Error&&Jy in t&&(e==null||!!(t.type&e))}const dp="[^/]+?",wS={sensitive:!1,strict:!1,start:!0,end:!0},ES=/[.+*?^${}()[\]/\\]/g;function bS(t,e){const n=be({},wS,e),r=[];let s=n.start?"^":"";const i=[];for(const c of t){const u=c.length?[]:[90];n.strict&&!c.length&&(s+="/");for(let h=0;h<c.length;h++){const f=c[h];let p=40+(n.sensitive?.25:0);if(f.type===0)h||(s+="/"),s+=f.value.replace(ES,"\\$&"),p+=40;else if(f.type===1){const{value:y,repeatable:E,optional:b,regexp:w}=f;i.push({name:y,repeatable:E,optional:b});const d=w||dp;if(d!==dp){p+=10;try{new RegExp(`(${d})`)}catch(_){throw new Error(`Invalid custom RegExp for param "${y}" (${d}): `+_.message)}}let g=E?`((?:${d})(?:/(?:${d}))*)`:`(${d})`;h||(g=b&&c.length<2?`(?:/${g})`:"/"+g),b&&(g+="?"),s+=g,p+=20,b&&(p+=-8),E&&(p+=-20),d===".*"&&(p+=-50)}u.push(p)}r.push(u)}if(n.strict&&n.end){const c=r.length-1;r[c][r[c].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function a(c){const u=c.match(o),h={};if(!u)return null;for(let f=1;f<u.length;f++){const p=u[f]||"",y=i[f-1];h[y.name]=p&&y.repeatable?p.split("/"):p}return h}function l(c){let u="",h=!1;for(const f of t){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const p of f)if(p.type===0)u+=p.value;else if(p.type===1){const{value:y,repeatable:E,optional:b}=p,w=y in c?c[y]:"";if(tn(w)&&!E)throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);const d=tn(w)?w.join("/"):w;if(!d)if(b)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${y}"`);u+=d}}return u||"/"}return{re:o,score:r,keys:i,parse:a,stringify:l}}function TS(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===40+40?-1:1:t.length>e.length?e.length===1&&e[0]===40+40?1:-1:0}function IS(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=TS(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(pp(r))return 1;if(pp(s))return-1}return s.length-r.length}function pp(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const AS={type:0,value:""},SS=/[a-zA-Z0-9_]/;function CS(t){if(!t)return[[]];if(t==="/")return[[AS]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(p){throw new Error(`ERR (${n})/"${c}": ${p}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let a=0,l,c="",u="";function h(){c&&(n===0?i.push({type:0,value:c}):n===1||n===2||n===3?(i.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function f(){c+=l}for(;a<t.length;){if(l=t[a++],l==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:l==="/"?(c&&h(),o()):l===":"?(h(),n=1):f();break;case 4:f(),n=r;break;case 1:l==="("?n=2:SS.test(l)?f():(h(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:n=3:u+=l;break;case 3:h(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${c}"`),h(),o(),s}function RS(t,e,n){const r=bS(CS(t.path),n),s=be(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function kS(t,e){const n=[],r=new Map;e=yp({strict:!1,end:!0,sensitive:!1},e);function s(u){return r.get(u)}function i(u,h,f){const p=!f,y=OS(u);y.aliasOf=f&&f.record;const E=yp(e,u),b=[y];if("alias"in u){const g=typeof u.alias=="string"?[u.alias]:u.alias;for(const _ of g)b.push(be({},y,{components:f?f.record.components:y.components,path:_,aliasOf:f?f.record:y}))}let w,d;for(const g of b){const{path:_}=g;if(h&&_[0]!=="/"){const T=h.record.path,I=T[T.length-1]==="/"?"":"/";g.path=h.record.path+(_&&I+_)}if(w=RS(g,h,E),f?f.alias.push(w):(d=d||w,d!==w&&d.alias.push(w),p&&u.name&&!mp(w)&&o(u.name)),y.children){const T=y.children;for(let I=0;I<T.length;I++)i(T[I],w,f&&f.children[I])}f=f||w,(w.record.components&&Object.keys(w.record.components).length||w.record.name||w.record.redirect)&&l(w)}return d?()=>{o(d)}:_i}function o(u){if(Qy(u)){const h=r.get(u);h&&(r.delete(u),n.splice(n.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=n.indexOf(u);h>-1&&(n.splice(h,1),u.record.name&&r.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function a(){return n}function l(u){let h=0;for(;h<n.length&&IS(u,n[h])>=0&&(u.record.path!==n[h].record.path||!Yy(u,n[h]));)h++;n.splice(h,0,u),u.record.name&&!mp(u)&&r.set(u.record.name,u)}function c(u,h){let f,p={},y,E;if("name"in u&&u.name){if(f=r.get(u.name),!f)throw As(1,{location:u});E=f.record.name,p=be(gp(h.params,f.keys.filter(d=>!d.optional).map(d=>d.name)),u.params&&gp(u.params,f.keys.map(d=>d.name))),y=f.stringify(p)}else if("path"in u)y=u.path,f=n.find(d=>d.re.test(y)),f&&(p=f.parse(y),E=f.record.name);else{if(f=h.name?r.get(h.name):n.find(d=>d.re.test(h.path)),!f)throw As(1,{location:u,currentLocation:h});E=f.record.name,p=be({},h.params,u.params),y=f.stringify(p)}const b=[];let w=f;for(;w;)b.unshift(w.record),w=w.parent;return{name:E,path:y,params:p,matched:b,meta:DS(b)}}return t.forEach(u=>i(u)),{addRoute:i,resolve:c,removeRoute:o,getRoutes:a,getRecordMatcher:s}}function gp(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function OS(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:PS(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function PS(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function mp(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function DS(t){return t.reduce((e,n)=>be(e,n.meta),{})}function yp(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function Yy(t,e){return e.children.some(n=>n===t||Yy(t,n))}const Xy=/#/g,NS=/&/g,LS=/\//g,xS=/=/g,MS=/\?/g,Zy=/\+/g,FS=/%5B/g,US=/%5D/g,e_=/%5E/g,$S=/%60/g,t_=/%7B/g,VS=/%7C/g,n_=/%7D/g,BS=/%20/g;function Nh(t){return encodeURI(""+t).replace(VS,"|").replace(FS,"[").replace(US,"]")}function HS(t){return Nh(t).replace(t_,"{").replace(n_,"}").replace(e_,"^")}function _u(t){return Nh(t).replace(Zy,"%2B").replace(BS,"+").replace(Xy,"%23").replace(NS,"%26").replace($S,"`").replace(t_,"{").replace(n_,"}").replace(e_,"^")}function jS(t){return _u(t).replace(xS,"%3D")}function qS(t){return Nh(t).replace(Xy,"%23").replace(MS,"%3F")}function WS(t){return t==null?"":qS(t).replace(LS,"%2F")}function Sa(t){try{return decodeURIComponent(""+t)}catch{}return""+t}function zS(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(Zy," "),o=i.indexOf("="),a=Sa(o<0?i:i.slice(0,o)),l=o<0?null:Sa(i.slice(o+1));if(a in e){let c=e[a];tn(c)||(c=e[a]=[c]),c.push(l)}else e[a]=l}return e}function _p(t){let e="";for(let n in t){const r=t[n];if(n=jS(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(tn(r)?r.map(i=>i&&_u(i)):[r&&_u(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function KS(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=tn(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const GS=Symbol(""),vp=Symbol(""),Lh=Symbol(""),xh=Symbol(""),vu=Symbol("");function Zs(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Jn(t,e,n,r,s){const i=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((o,a)=>{const l=h=>{h===!1?a(As(4,{from:n,to:e})):h instanceof Error?a(h):vS(h)?a(As(2,{from:e,to:h})):(i&&r.enterCallbacks[s]===i&&typeof h=="function"&&i.push(h),o())},c=t.call(r&&r.instances[s],e,n,l);let u=Promise.resolve(c);t.length<3&&(u=u.then(l)),u.catch(h=>a(h))})}function mc(t,e,n,r){const s=[];for(const i of t)for(const o in i.components){let a=i.components[o];if(!(e!=="beforeRouteEnter"&&!i.instances[o]))if(QS(a)){const c=(a.__vccOpts||a)[e];c&&s.push(Jn(c,n,r,i,o))}else{let l=a();s.push(()=>l.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${i.path}"`));const u=tS(c)?c.default:c;i.components[o]=u;const f=(u.__vccOpts||u)[e];return f&&Jn(f,n,r,i,o)()}))}}return s}function QS(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function wp(t){const e=$t(Lh),n=$t(xh),r=dt(()=>e.resolve($e(t.to))),s=dt(()=>{const{matched:l}=r.value,{length:c}=l,u=l[c-1],h=n.matched;if(!u||!h.length)return-1;const f=h.findIndex(Is.bind(null,u));if(f>-1)return f;const p=Ep(l[c-2]);return c>1&&Ep(u)===p&&h[h.length-1].path!==p?h.findIndex(Is.bind(null,l[c-2])):f}),i=dt(()=>s.value>-1&&ZS(n.params,r.value.params)),o=dt(()=>s.value>-1&&s.value===n.matched.length-1&&zy(n.params,r.value.params));function a(l={}){return XS(l)?e[$e(t.replace)?"replace":"push"]($e(t.to)).catch(_i):Promise.resolve()}return{route:r,href:dt(()=>r.value.href),isActive:i,isExactActive:o,navigate:a}}const JS=Un({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:wp,setup(t,{slots:e}){const n=Vt(wp(t)),{options:r}=$t(Lh),s=dt(()=>({[bp(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[bp(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&e.default(n);return t.custom?i:Kt("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),YS=JS;function XS(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function ZS(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!tn(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function Ep(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const bp=(t,e,n)=>t??e??n,eC=Un({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=$t(vu),s=dt(()=>t.route||r.value),i=$t(vp,0),o=dt(()=>{let c=$e(i);const{matched:u}=s.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),a=dt(()=>s.value.matched[o.value]);ds(vp,dt(()=>o.value+1)),ds(GS,a),ds(vu,s);const l=nt();return Rn(()=>[l.value,a.value,t.name],([c,u,h],[f,p,y])=>{u&&(u.instances[h]=c,p&&p!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=p.leaveGuards),u.updateGuards.size||(u.updateGuards=p.updateGuards))),c&&u&&(!p||!Is(u,p)||!f)&&(u.enterCallbacks[h]||[]).forEach(E=>E(c))},{flush:"post"}),()=>{const c=s.value,u=t.name,h=a.value,f=h&&h.components[u];if(!f)return Tp(n.default,{Component:f,route:c});const p=h.props[u],y=p?p===!0?c.params:typeof p=="function"?p(c):p:null,b=Kt(f,be({},y,e,{onVnodeUnmounted:w=>{w.component.isUnmounted&&(h.instances[u]=null)},ref:l}));return Tp(n.default,{Component:b,route:c})||b}}});function Tp(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const r_=eC;function tC(t){const e=kS(t.routes,t),n=t.parseQuery||zS,r=t.stringifyQuery||_p,s=t.history,i=Zs(),o=Zs(),a=Zs(),l=ma(zn);let c=zn;es&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=pc.bind(null,P=>""+P),h=pc.bind(null,WS),f=pc.bind(null,Sa);function p(P,z){let V,Y;return Qy(P)?(V=e.getRecordMatcher(P),Y=z):Y=P,e.addRoute(Y,V)}function y(P){const z=e.getRecordMatcher(P);z&&e.removeRoute(z)}function E(){return e.getRoutes().map(P=>P.record)}function b(P){return!!e.getRecordMatcher(P)}function w(P,z){if(z=be({},z||l.value),typeof P=="string"){const S=gc(n,P,z.path),k=e.resolve({path:S.path},z),D=s.createHref(S.fullPath);return be(S,k,{params:f(k.params),hash:Sa(S.hash),redirectedFrom:void 0,href:D})}let V;if("path"in P)V=be({},P,{path:gc(n,P.path,z.path).path});else{const S=be({},P.params);for(const k in S)S[k]==null&&delete S[k];V=be({},P,{params:h(S)}),z.params=h(z.params)}const Y=e.resolve(V,z),pe=P.hash||"";Y.params=u(f(Y.params));const m=sS(r,be({},P,{hash:HS(pe),path:Y.path})),v=s.createHref(m);return be({fullPath:m,hash:pe,query:r===_p?KS(P.query):P.query||{}},Y,{redirectedFrom:void 0,href:v})}function d(P){return typeof P=="string"?gc(n,P,l.value.path):be({},P)}function g(P,z){if(c!==P)return As(8,{from:z,to:P})}function _(P){return C(P)}function T(P){return _(be(d(P),{replace:!0}))}function I(P){const z=P.matched[P.matched.length-1];if(z&&z.redirect){const{redirect:V}=z;let Y=typeof V=="function"?V(P):V;return typeof Y=="string"&&(Y=Y.includes("?")||Y.includes("#")?Y=d(Y):{path:Y},Y.params={}),be({query:P.query,hash:P.hash,params:"path"in Y?{}:P.params},Y)}}function C(P,z){const V=c=w(P),Y=l.value,pe=P.state,m=P.force,v=P.replace===!0,S=I(V);if(S)return C(be(d(S),{state:typeof S=="object"?be({},pe,S.state):pe,force:m,replace:v}),z||V);const k=V;k.redirectedFrom=z;let D;return!m&&iS(r,Y,V)&&(D=As(16,{to:k,from:Y}),wt(Y,Y,!0,!1)),(D?Promise.resolve(D):M(k,Y)).catch(L=>vn(L)?vn(L,2)?L:vt(L):se(L,k,Y)).then(L=>{if(L){if(vn(L,2))return C(be({replace:v},d(L.to),{state:typeof L.to=="object"?be({},pe,L.to.state):pe,force:m}),z||k)}else L=H(k,Y,!0,v,pe);return q(k,Y,L),L})}function A(P,z){const V=g(P,z);return V?Promise.reject(V):Promise.resolve()}function R(P){const z=Et.values().next().value;return z&&typeof z.runWithContext=="function"?z.runWithContext(P):P()}function M(P,z){let V;const[Y,pe,m]=nC(P,z);V=mc(Y.reverse(),"beforeRouteLeave",P,z);for(const S of Y)S.leaveGuards.forEach(k=>{V.push(Jn(k,P,z))});const v=A.bind(null,P,z);return V.push(v),Ue(V).then(()=>{V=[];for(const S of i.list())V.push(Jn(S,P,z));return V.push(v),Ue(V)}).then(()=>{V=mc(pe,"beforeRouteUpdate",P,z);for(const S of pe)S.updateGuards.forEach(k=>{V.push(Jn(k,P,z))});return V.push(v),Ue(V)}).then(()=>{V=[];for(const S of m)if(S.beforeEnter)if(tn(S.beforeEnter))for(const k of S.beforeEnter)V.push(Jn(k,P,z));else V.push(Jn(S.beforeEnter,P,z));return V.push(v),Ue(V)}).then(()=>(P.matched.forEach(S=>S.enterCallbacks={}),V=mc(m,"beforeRouteEnter",P,z),V.push(v),Ue(V))).then(()=>{V=[];for(const S of o.list())V.push(Jn(S,P,z));return V.push(v),Ue(V)}).catch(S=>vn(S,8)?S:Promise.reject(S))}function q(P,z,V){a.list().forEach(Y=>R(()=>Y(P,z,V)))}function H(P,z,V,Y,pe){const m=g(P,z);if(m)return m;const v=z===zn,S=es?history.state:{};V&&(Y||v?s.replace(P.fullPath,be({scroll:v&&S&&S.scroll},pe)):s.push(P.fullPath,pe)),l.value=P,wt(P,z,V,v),vt()}let ne;function K(){ne||(ne=s.listen((P,z,V)=>{if(!on.listening)return;const Y=w(P),pe=I(Y);if(pe){C(be(pe,{replace:!0}),Y).catch(_i);return}c=Y;const m=l.value;es&&dS(up(m.fullPath,V.delta),gl()),M(Y,m).catch(v=>vn(v,12)?v:vn(v,2)?(C(v.to,Y).then(S=>{vn(S,20)&&!V.delta&&V.type===Ni.pop&&s.go(-1,!1)}).catch(_i),Promise.reject()):(V.delta&&s.go(-V.delta,!1),se(v,Y,m))).then(v=>{v=v||H(Y,m,!1),v&&(V.delta&&!vn(v,8)?s.go(-V.delta,!1):V.type===Ni.pop&&vn(v,20)&&s.go(-1,!1)),q(Y,m,v)}).catch(_i)}))}let ze=Zs(),ye=Zs(),we;function se(P,z,V){vt(P);const Y=ye.list();return Y.length?Y.forEach(pe=>pe(P,z,V)):console.error(P),Promise.reject(P)}function Be(){return we&&l.value!==zn?Promise.resolve():new Promise((P,z)=>{ze.add([P,z])})}function vt(P){return we||(we=!P,K(),ze.list().forEach(([z,V])=>P?V(P):z()),ze.reset()),P}function wt(P,z,V,Y){const{scrollBehavior:pe}=t;if(!es||!pe)return Promise.resolve();const m=!V&&pS(up(P.fullPath,0))||(Y||!V)&&history.state&&history.state.scroll||null;return yr().then(()=>pe(P,z,m)).then(v=>v&&fS(v)).catch(v=>se(v,P,z))}const Ie=P=>s.go(P);let Hn;const Et=new Set,on={currentRoute:l,listening:!0,addRoute:p,removeRoute:y,hasRoute:b,getRoutes:E,resolve:w,options:t,push:_,replace:T,go:Ie,back:()=>Ie(-1),forward:()=>Ie(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:ye.add,isReady:Be,install(P){const z=this;P.component("RouterLink",YS),P.component("RouterView",r_),P.config.globalProperties.$router=z,Object.defineProperty(P.config.globalProperties,"$route",{enumerable:!0,get:()=>$e(l)}),es&&!Hn&&l.value===zn&&(Hn=!0,_(s.location).catch(pe=>{}));const V={};for(const pe in zn)Object.defineProperty(V,pe,{get:()=>l.value[pe],enumerable:!0});P.provide(Lh,z),P.provide(xh,Dm(V)),P.provide(vu,l);const Y=P.unmount;Et.add(P),P.unmount=function(){Et.delete(P),Et.size<1&&(c=zn,ne&&ne(),ne=null,l.value=zn,Hn=!1,we=!1),Y()}}};function Ue(P){return P.reduce((z,V)=>z.then(()=>R(V)),Promise.resolve())}return on}function nC(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const a=e.matched[o];a&&(t.matched.find(c=>Is(c,a))?r.push(a):n.push(a));const l=t.matched[o];l&&(e.matched.find(c=>Is(c,l))||s.push(l))}return[n,r,s]}function rC(){return $t(xh)}const Pt={middleware:["checkauth"]},Dt={layout:"empty",middleware:["checkauth"]},Nt={middleware:["checkauth"]},Lt={middleware:["checkauth"]},xt={middleware:["checkauth"]},Ip=[{name:(Pt==null?void 0:Pt.name)??"index",path:(Pt==null?void 0:Pt.path)??"/",meta:Pt||{},alias:(Pt==null?void 0:Pt.alias)||[],redirect:(Pt==null?void 0:Pt.redirect)||void 0,component:()=>N(()=>import("./index.e5e2b6c9.js"),["./index.e5e2b6c9.js","./chart.esm.a32129ff.js","./fastfirestore.94989132.js"],import.meta.url).then(t=>t.default||t)},{name:(Dt==null?void 0:Dt.name)??"login",path:(Dt==null?void 0:Dt.path)??"/login",meta:Dt||{},alias:(Dt==null?void 0:Dt.alias)||[],redirect:(Dt==null?void 0:Dt.redirect)||void 0,component:()=>N(()=>import("./login.cd195420.js"),["./login.cd195420.js","./inputtext.esm.4724b432.js","./password.esm.dbfe60e7.js","./overlayeventbus.esm.2d5707d2.js","./portal.esm.f9c19ffd.js","./button.esm.4087d562.js","./loader.0ee3e5a0.js","./fastfireauth.e97fa8e2.js","./login.4c2f6ccb.css"],import.meta.url).then(t=>t.default||t)},{name:(Nt==null?void 0:Nt.name)??"managers",path:(Nt==null?void 0:Nt.path)??"/managers",meta:Nt||{},alias:(Nt==null?void 0:Nt.alias)||[],redirect:(Nt==null?void 0:Nt.redirect)||void 0,component:()=>N(()=>import("./managers.cef74697.js"),["./managers.cef74697.js","./toast.esm.803b843c.js","./portal.esm.f9c19ffd.js","./button.esm.4087d562.js","./inputtext.esm.4724b432.js","./image.esm.4e51bb2e.js","./focustrap.esm.aedfac9b.js","./column.esm.16afdb9d.js","./datatable.esm.10e6509c.js","./paginator.esm.3a93e560.js","./dropdown.esm.7450136e.js","./overlayeventbus.esm.2d5707d2.js","./virtualscroller.esm.77db94c2.js","./inputnumber.esm.31182f59.js","./dialog.esm.b445a747.js","./fileupload.esm.7178ae0d.js","./message.esm.27bda9ff.js","./progressbar.esm.a36bfb4c.js","./badge.esm.fc7997bc.js","./password.esm.dbfe60e7.js","./selectbutton.esm.0566a452.js","./loader.0ee3e5a0.js","./fastfireauth.e97fa8e2.js","./fastfirestore.94989132.js","./application.d9f5e52f.js","./utilities.bf6f8ed7.js","./managers.a1be4b85.css"],import.meta.url).then(t=>t.default||t)},{name:(Lt==null?void 0:Lt.name)??"notifications",path:(Lt==null?void 0:Lt.path)??"/notifications",meta:Lt||{},alias:(Lt==null?void 0:Lt.alias)||[],redirect:(Lt==null?void 0:Lt.redirect)||void 0,component:()=>N(()=>import("./notifications.205cb231.js"),["./notifications.205cb231.js","./toast.esm.803b843c.js","./portal.esm.f9c19ffd.js","./button.esm.4087d562.js","./column.esm.16afdb9d.js","./datatable.esm.10e6509c.js","./paginator.esm.3a93e560.js","./dropdown.esm.7450136e.js","./overlayeventbus.esm.2d5707d2.js","./virtualscroller.esm.77db94c2.js","./inputnumber.esm.31182f59.js","./inputtext.esm.4724b432.js","./focustrap.esm.aedfac9b.js","./textarea.esm.bd4e21ac.js","./selectbutton.esm.0566a452.js","./calendar.esm.db3a4c49.js","./dialog.esm.b445a747.js","./loader.0ee3e5a0.js","./fastfireauth.e97fa8e2.js","./fastfirestore.94989132.js","./application.d9f5e52f.js","./utilities.bf6f8ed7.js","./notifications.2f4eeec7.css"],import.meta.url).then(t=>t.default||t)},{name:(xt==null?void 0:xt.name)??"persons",path:(xt==null?void 0:xt.path)??"/persons",meta:xt||{},alias:(xt==null?void 0:xt.alias)||[],redirect:(xt==null?void 0:xt.redirect)||void 0,component:()=>N(()=>import("./persons.e24d7bd9.js"),["./persons.e24d7bd9.js","./toast.esm.803b843c.js","./portal.esm.f9c19ffd.js","./button.esm.4087d562.js","./inputtext.esm.4724b432.js","./column.esm.16afdb9d.js","./datatable.esm.10e6509c.js","./paginator.esm.3a93e560.js","./dropdown.esm.7450136e.js","./overlayeventbus.esm.2d5707d2.js","./virtualscroller.esm.77db94c2.js","./inputnumber.esm.31182f59.js","./focustrap.esm.aedfac9b.js","./dialog.esm.b445a747.js","./loader.0ee3e5a0.js","./fastfireauth.e97fa8e2.js","./fastfirestore.94989132.js","./application.d9f5e52f.js","./utilities.bf6f8ed7.js","./persons.b4f2517d.css"],import.meta.url).then(t=>t.default||t)}],sC={scrollBehavior(t,e,n){const r=Xe();let s=n||void 0;if(!s&&e&&t&&t.meta.scrollToTop!==!1&&iC(e,t)&&(s={left:0,top:0}),t.path===e.path){if(e.hash&&!t.hash)return{left:0,top:0};if(t.hash)return{el:t.hash,top:Ap(t.hash)}}const i=a=>!!(a.meta.pageTransition??mu),o=i(e)&&i(t)?"page:transition:finish":"page:finish";return new Promise(a=>{r.hooks.hookOnce(o,async()=>{await yr(),t.hash&&(s={el:t.hash,top:Ap(t.hash)}),a(s)})})}};function Ap(t){try{const e=document.querySelector(t);if(e)return parseFloat(getComputedStyle(e).scrollMarginTop)}catch{}return 0}function iC(t,e){const n=t.matched[0]===e.matched[0];return!!(!n||n&&JSON.stringify(t.params)!==JSON.stringify(e.params))}const oC={},wn={...oC,...sC},aC=CA(async t=>{var l;let e,n;if(!((l=t.meta)!=null&&l.validate))return;const r=Xe(),s=Us();if(([e,n]=hu(()=>Promise.resolve(t.meta.validate(t))),e=await e,n(),e)===!0)return;const o=Wy({statusCode:404,statusMessage:`Page Not Found: ${t.fullPath}`}),a=s.beforeResolve(c=>{if(a(),c===t){const u=s.afterEach(async()=>{u(),await Tn(r,rs,[o]),window.history.pushState({},"",t.fullPath)});return!1}})}),lC=[aC],wi={checkauth:()=>N(()=>import("./checkauth.96635e2d.js"),["./checkauth.96635e2d.js","./fastfireauth.e97fa8e2.js"],import.meta.url)};function cC(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){const a=s.includes(t.slice(i))?t.slice(i).length:1;let l=s.slice(a);return l[0]!=="/"&&(l="/"+l),Wd(l,"")}return Wd(n,t)+r+s}const uC=Qt({name:"nuxt:router",enforce:"pre",async setup(t){var y,E;let e,n,r=dl().app.baseURL;wn.hashMode&&!r.includes("#")&&(r+="#");const s=((y=wn.history)==null?void 0:y.call(wn,r))??(wn.hashMode?_S(r):Gy(r)),i=((E=wn.routes)==null?void 0:E.call(wn,Ip))??Ip,o=cC(r,window.location),a=tC({...wn,history:s,routes:i});t.vueApp.use(a);const l=ma(a.currentRoute.value);a.afterEach((b,w)=>{l.value=w}),Object.defineProperty(t.vueApp.config.globalProperties,"previousRoute",{get:()=>l.value});const c=ma(a.resolve(o)),u=()=>{c.value=a.currentRoute.value};t.hook("page:finish",u),a.afterEach((b,w)=>{var d,g,_,T;((g=(d=b.matched[0])==null?void 0:d.components)==null?void 0:g.default)===((T=(_=w.matched[0])==null?void 0:_.components)==null?void 0:T.default)&&u()});const h={};for(const b in c.value)h[b]=dt(()=>c.value[b]);t._route=Vt(h),t._middleware=t._middleware||{global:[],named:{}};const f=pl();try{[e,n]=hu(()=>a.isReady()),await e,n()}catch(b){[e,n]=hu(()=>Tn(t,rs,[b])),await e,n()}const p=SA("_layout");return a.beforeEach(async(b,w)=>{var g;b.meta=Vt(b.meta),t.isHydrating&&p.value&&!$r(b.meta.layout)&&(b.meta.layout=p.value),t._processingMiddleware=!0;const d=new Set([...lC,...t._middleware.global]);for(const _ of b.matched){const T=_.meta.middleware;if(T)if(Array.isArray(T))for(const I of T)d.add(I);else d.add(T)}for(const _ of d){const T=typeof _=="string"?t._middleware.named[_]||await((g=wi[_])==null?void 0:g.call(wi).then(C=>C.default||C)):_;if(!T)throw new Error(`Unknown route middleware: '${_}'.`);const I=await Tn(t,T,[b,w]);if(!t.payload.serverRendered&&t.isHydrating&&(I===!1||I instanceof Error)){const C=I||pu({statusCode:404,statusMessage:`Page Not Found: ${o}`});return await Tn(t,rs,[C]),!1}if(I||I===!1)return I}}),a.onError(()=>{delete t._processingMiddleware}),a.afterEach(async(b,w,d)=>{delete t._processingMiddleware,!t.isHydrating&&f.value&&await Tn(t,kA),b.matched.length===0&&await Tn(t,rs,[pu({statusCode:404,fatal:!1,statusMessage:`Page not found: ${b.fullPath}`})])}),t.hooks.hookOnce("app:created",async()=>{try{await a.replace({...a.resolve(o),name:void 0,force:!0})}catch(b){await Tn(t,rs,[b])}}),{provide:{router:a}}}},1),ss={default:()=>N(()=>import("./default.3b402f51.js"),["./default.3b402f51.js","./loader.e85e5e9a.js","./loader.0ee3e5a0.js","./loader.025c4f9a.css","./fastfireauth.e97fa8e2.js","./nuxt-link.7d11ff55.js","./badge.esm.fc7997bc.js","./button.esm.4087d562.js","./radiobutton.esm.31673b9a.js","./inputswitch.esm.4d8c5ddf.js","./utilities.bf6f8ed7.js","./default.4f112aa8.css"],import.meta.url).then(t=>t.default||t),empty:()=>N(()=>import("./empty.e2327241.js"),["./empty.e2327241.js","./loader.e85e5e9a.js","./loader.0ee3e5a0.js","./loader.025c4f9a.css"],import.meta.url).then(t=>t.default||t)},hC=Qt({name:"nuxt:prefetch",setup(t){const e=Us();t.hooks.hook("app:mounted",()=>{e.beforeEach(async n=>{var s;const r=(s=n==null?void 0:n.meta)==null?void 0:s.layout;r&&typeof ss[r]=="function"&&await ss[r]()})}),t.hooks.hook("link:prefetch",n=>{var o,a,l,c;if(eo(n))return;const r=e.resolve(n);if(!r)return;const s=(o=r==null?void 0:r.meta)==null?void 0:o.layout;let i=Array.isArray((a=r==null?void 0:r.meta)==null?void 0:a.middleware)?(l=r==null?void 0:r.meta)==null?void 0:l.middleware:[(c=r==null?void 0:r.meta)==null?void 0:c.middleware];i=i.filter(u=>typeof u=="string");for(const u of i)typeof wi[u]=="function"&&wi[u]();s&&typeof ss[s]=="function"&&ss[s]()})}});var G={innerWidth(t){if(t){let e=t.offsetWidth,n=getComputedStyle(t);return e+=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),e}return 0},width(t){if(t){let e=t.offsetWidth,n=getComputedStyle(t);return e-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),e}return 0},getWindowScrollTop(){let t=document.documentElement;return(window.pageYOffset||t.scrollTop)-(t.clientTop||0)},getWindowScrollLeft(){let t=document.documentElement;return(window.pageXOffset||t.scrollLeft)-(t.clientLeft||0)},getOuterWidth(t,e){if(t){let n=t.offsetWidth;if(e){let r=getComputedStyle(t);n+=parseFloat(r.marginLeft)+parseFloat(r.marginRight)}return n}return 0},getOuterHeight(t,e){if(t){let n=t.offsetHeight;if(e){let r=getComputedStyle(t);n+=parseFloat(r.marginTop)+parseFloat(r.marginBottom)}return n}return 0},getClientHeight(t,e){if(t){let n=t.clientHeight;if(e){let r=getComputedStyle(t);n+=parseFloat(r.marginTop)+parseFloat(r.marginBottom)}return n}return 0},getViewport(){let t=window,e=document,n=e.documentElement,r=e.getElementsByTagName("body")[0],s=t.innerWidth||n.clientWidth||r.clientWidth,i=t.innerHeight||n.clientHeight||r.clientHeight;return{width:s,height:i}},getOffset(t){if(t){let e=t.getBoundingClientRect();return{top:e.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:e.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}return{top:"auto",left:"auto"}},index(t){if(t){let e=t.parentNode.childNodes,n=0;for(let r=0;r<e.length;r++){if(e[r]===t)return n;e[r].nodeType===1&&n++}}return-1},addMultipleClasses(t,e){if(t&&e)if(t.classList){let n=e.split(" ");for(let r=0;r<n.length;r++)t.classList.add(n[r])}else{let n=e.split(" ");for(let r=0;r<n.length;r++)t.className+=" "+n[r]}},addClass(t,e){t&&e&&(t.classList?t.classList.add(e):t.className+=" "+e)},removeClass(t,e){t&&e&&(t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," "))},hasClass(t,e){return t?t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className):!1},find(t,e){return this.isElement(t)?t.querySelectorAll(e):[]},findSingle(t,e){return this.isElement(t)?t.querySelector(e):null},getHeight(t){if(t){let e=t.offsetHeight,n=getComputedStyle(t);return e-=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom)+parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth),e}return 0},getWidth(t){if(t){let e=t.offsetWidth,n=getComputedStyle(t);return e-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)+parseFloat(n.borderLeftWidth)+parseFloat(n.borderRightWidth),e}return 0},absolutePosition(t,e){if(t){let n=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),r=n.height,s=n.width,i=e.offsetHeight,o=e.offsetWidth,a=e.getBoundingClientRect(),l=this.getWindowScrollTop(),c=this.getWindowScrollLeft(),u=this.getViewport(),h,f;a.top+i+r>u.height?(h=a.top+l-r,t.style.transformOrigin="bottom",h<0&&(h=l)):(h=i+a.top+l,t.style.transformOrigin="top"),a.left+s>u.width?f=Math.max(0,a.left+c+o-s):f=a.left+c,t.style.top=h+"px",t.style.left=f+"px"}},relativePosition(t,e){if(t){let n=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t);const r=e.offsetHeight,s=e.getBoundingClientRect(),i=this.getViewport();let o,a;s.top+r+n.height>i.height?(o=-1*n.height,t.style.transformOrigin="bottom",s.top+o<0&&(o=-1*s.top)):(o=r,t.style.transformOrigin="top"),n.width>i.width?a=s.left*-1:s.left+n.width>i.width?a=(s.left+n.width-i.width)*-1:a=0,t.style.top=o+"px",t.style.left=a+"px"}},getParents(t,e=[]){return t.parentNode===null?e:this.getParents(t.parentNode,e.concat([t.parentNode]))},getScrollableParents(t){let e=[];if(t){let n=this.getParents(t);const r=/(auto|scroll)/,s=i=>{let o=window.getComputedStyle(i,null);return r.test(o.getPropertyValue("overflow"))||r.test(o.getPropertyValue("overflowX"))||r.test(o.getPropertyValue("overflowY"))};for(let i of n){let o=i.nodeType===1&&i.dataset.scrollselectors;if(o){let a=o.split(",");for(let l of a){let c=this.findSingle(i,l);c&&s(c)&&e.push(c)}}i.nodeType!==9&&s(i)&&e.push(i)}}return e},getHiddenElementOuterHeight(t){if(t){t.style.visibility="hidden",t.style.display="block";let e=t.offsetHeight;return t.style.display="none",t.style.visibility="visible",e}return 0},getHiddenElementOuterWidth(t){if(t){t.style.visibility="hidden",t.style.display="block";let e=t.offsetWidth;return t.style.display="none",t.style.visibility="visible",e}return 0},getHiddenElementDimensions(t){if(t){let e={};return t.style.visibility="hidden",t.style.display="block",e.width=t.offsetWidth,e.height=t.offsetHeight,t.style.display="none",t.style.visibility="visible",e}return 0},fadeIn(t,e){if(t){t.style.opacity=0;let n=+new Date,r=0,s=function(){r=+t.style.opacity+(new Date().getTime()-n)/e,t.style.opacity=r,n=+new Date,+r<1&&(window.requestAnimationFrame&&requestAnimationFrame(s)||setTimeout(s,16))};s()}},fadeOut(t,e){if(t){let n=1,r=50,s=e,i=r/s,o=setInterval(()=>{n-=i,n<=0&&(n=0,clearInterval(o)),t.style.opacity=n},r)}},getUserAgent(){return navigator.userAgent},appendChild(t,e){if(this.isElement(e))e.appendChild(t);else if(e.el&&e.elElement)e.elElement.appendChild(t);else throw new Error("Cannot append "+e+" to "+t)},isElement(t){return typeof HTMLElement=="object"?t instanceof HTMLElement:t&&typeof t=="object"&&t!==null&&t.nodeType===1&&typeof t.nodeName=="string"},scrollInView(t,e){let n=getComputedStyle(t).getPropertyValue("borderTopWidth"),r=n?parseFloat(n):0,s=getComputedStyle(t).getPropertyValue("paddingTop"),i=s?parseFloat(s):0,o=t.getBoundingClientRect(),l=e.getBoundingClientRect().top+document.body.scrollTop-(o.top+document.body.scrollTop)-r-i,c=t.scrollTop,u=t.clientHeight,h=this.getOuterHeight(e);l<0?t.scrollTop=c+l:l+h>u&&(t.scrollTop=c+l-u+h)},clearSelection(){if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().rangeCount>0&&window.getSelection().getRangeAt(0).getClientRects().length>0&&window.getSelection().removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}},getSelection(){return window.getSelection?window.getSelection().toString():document.getSelection?document.getSelection().toString():document.selection?document.selection.createRange().text:null},calculateScrollbarWidth(){if(this.calculatedScrollbarWidth!=null)return this.calculatedScrollbarWidth;let t=document.createElement("div");t.className="p-scrollbar-measure",document.body.appendChild(t);let e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),this.calculatedScrollbarWidth=e,e},getBrowser(){if(!this.browser){let t=this.resolveUserAgent();this.browser={},t.browser&&(this.browser[t.browser]=!0,this.browser.version=t.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser},resolveUserAgent(){let t=navigator.userAgent.toLowerCase(),e=/(chrome)[ ]([\w.]+)/.exec(t)||/(webkit)[ ]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ ]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:e[1]||"",version:e[2]||"0"}},isVisible(t){return t&&t.offsetParent!=null},invokeElementMethod(t,e,n){t[e].apply(t,n)},isExist(t){return!!(t!==null&&typeof t<"u"&&t.nodeName&&t.parentNode)},isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)},focus(t,e){t&&document.activeElement!==t&&t.focus(e)},isFocusableElement(t,e=""){return this.isElement(t)?t.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`):!1},getFocusableElements(t,e=""){let n=this.find(t,`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`),r=[];for(let s of n)getComputedStyle(s).display!="none"&&getComputedStyle(s).visibility!="hidden"&&r.push(s);return r},getFirstFocusableElement(t,e){const n=this.getFocusableElements(t,e);return n.length>0?n[0]:null},getLastFocusableElement(t,e){const n=this.getFocusableElements(t,e);return n.length>0?n[n.length-1]:null},getNextFocusableElement(t,e,n){const r=this.getFocusableElements(t,n),s=r.length>0?r.findIndex(o=>o===e):-1,i=s>-1&&r.length>=s+1?s+1:-1;return i>-1?r[i]:null},isClickable(t){if(t){const e=t.nodeName,n=t.parentElement&&t.parentElement.nodeName;return e==="INPUT"||e==="TEXTAREA"||e==="BUTTON"||e==="A"||n==="INPUT"||n==="TEXTAREA"||n==="BUTTON"||n==="A"||!!t.closest(".p-button, .p-checkbox, .p-radiobutton")}return!1},applyStyle(t,e){if(typeof e=="string")t.style.cssText=e;else for(let n in e)t.style[n]=e[n]},isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream},isAndroid(){return/(android)/i.test(navigator.userAgent)},isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0},exportCSV(t,e){let n=new Blob([t],{type:"application/csv;charset=utf-8;"});if(window.navigator.msSaveOrOpenBlob)navigator.msSaveOrOpenBlob(n,e+".csv");else{let r=document.createElement("a");r.download!==void 0?(r.setAttribute("href",URL.createObjectURL(n)),r.setAttribute("download",e+".csv"),r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r)):(t="data:text/csv;charset=utf-8,"+t,window.open(encodeURI(t)))}}};class fC{constructor(e,n=()=>{}){this.element=e,this.listener=n}bindScrollListener(){this.scrollableParents=G.getScrollableParents(this.element);for(let e=0;e<this.scrollableParents.length;e++)this.scrollableParents[e].addEventListener("scroll",this.listener)}unbindScrollListener(){if(this.scrollableParents)for(let e=0;e<this.scrollableParents.length;e++)this.scrollableParents[e].removeEventListener("scroll",this.listener)}destroy(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}}function s_(){const t=new Map;return{on(e,n){let r=t.get(e);r?r.push(n):r=[n],t.set(e,r)},off(e,n){let r=t.get(e);r&&r.splice(r.indexOf(n)>>>0,1)},emit(e,n){let r=t.get(e);r&&r.slice().map(s=>{s(n)})}}}var lt={equals(t,e,n){return n?this.resolveFieldData(t,n)===this.resolveFieldData(e,n):this.deepEquals(t,e)},deepEquals(t,e){if(t===e)return!0;if(t&&e&&typeof t=="object"&&typeof e=="object"){var n=Array.isArray(t),r=Array.isArray(e),s,i,o;if(n&&r){if(i=t.length,i!=e.length)return!1;for(s=i;s--!==0;)if(!this.deepEquals(t[s],e[s]))return!1;return!0}if(n!=r)return!1;var a=t instanceof Date,l=e instanceof Date;if(a!=l)return!1;if(a&&l)return t.getTime()==e.getTime();var c=t instanceof RegExp,u=e instanceof RegExp;if(c!=u)return!1;if(c&&u)return t.toString()==e.toString();var h=Object.keys(t);if(i=h.length,i!==Object.keys(e).length)return!1;for(s=i;s--!==0;)if(!Object.prototype.hasOwnProperty.call(e,h[s]))return!1;for(s=i;s--!==0;)if(o=h[s],!this.deepEquals(t[o],e[o]))return!1;return!0}return t!==t&&e!==e},resolveFieldData(t,e){if(t&&Object.keys(t).length&&e){if(this.isFunction(e))return e(t);if(e.indexOf(".")===-1)return t[e];{let s=e.split("."),i=t;for(var n=0,r=s.length;n<r;++n){if(i==null)return null;i=i[s[n]]}return i}}else return null},isFunction(t){return!!(t&&t.constructor&&t.call&&t.apply)},getItemValue(t,...e){return this.isFunction(t)?t(...e):t},filter(t,e,n){var r=[];if(t){for(let s of t)for(let i of e)if(String(this.resolveFieldData(s,i)).toLowerCase().indexOf(n.toLowerCase())>-1){r.push(s);break}}return r},reorderArray(t,e,n){t&&e!==n&&(n>=t.length&&(n%=t.length,e%=t.length),t.splice(n,0,t.splice(e,1)[0]))},findIndexInList(t,e){let n=-1;if(e){for(let r=0;r<e.length;r++)if(e[r]===t){n=r;break}}return n},contains(t,e){if(t!=null&&e&&e.length){for(let n of e)if(this.equals(t,n))return!0}return!1},insertIntoOrderedArray(t,e,n,r){if(n.length>0){let s=!1;for(let i=0;i<n.length;i++)if(this.findIndexInList(n[i],r)>e){n.splice(i,0,t),s=!0;break}s||n.push(t)}else n.push(t)},removeAccents(t){return t&&t.search(/[\xC0-\xFF]/g)>-1&&(t=t.replace(/[\xC0-\xC5]/g,"A").replace(/[\xC6]/g,"AE").replace(/[\xC7]/g,"C").replace(/[\xC8-\xCB]/g,"E").replace(/[\xCC-\xCF]/g,"I").replace(/[\xD0]/g,"D").replace(/[\xD1]/g,"N").replace(/[\xD2-\xD6\xD8]/g,"O").replace(/[\xD9-\xDC]/g,"U").replace(/[\xDD]/g,"Y").replace(/[\xDE]/g,"P").replace(/[\xE0-\xE5]/g,"a").replace(/[\xE6]/g,"ae").replace(/[\xE7]/g,"c").replace(/[\xE8-\xEB]/g,"e").replace(/[\xEC-\xEF]/g,"i").replace(/[\xF1]/g,"n").replace(/[\xF2-\xF6\xF8]/g,"o").replace(/[\xF9-\xFC]/g,"u").replace(/[\xFE]/g,"p").replace(/[\xFD\xFF]/g,"y")),t},getVNodeProp(t,e){let n=t.props;if(n){let r=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),s=Object.prototype.hasOwnProperty.call(n,r)?r:e;return t.type.props[e].type===Boolean&&n[s]===""?!0:n[s]}return null},isEmpty(t){return t==null||t===""||Array.isArray(t)&&t.length===0||!(t instanceof Date)&&typeof t=="object"&&Object.keys(t).length===0},isNotEmpty(t){return!this.isEmpty(t)},isPrintableCharacter(t=""){return this.isNotEmpty(t)&&t.length===1&&t.match(/\S| /)},findLast(t,e){let n;if(this.isNotEmpty(t))try{n=t.findLast(e)}catch{n=[...t].reverse().find(e)}return n},findLastIndex(t,e){let n=-1;if(this.isNotEmpty(t))try{n=t.findLastIndex(e)}catch{n=t.lastIndexOf([...t].reverse().find(e))}return n}},Sp=0;function i_(t="pv_id_"){return Sp++,`${t}${Sp}`}function dC(){let t=[];const e=(o,a,l=999)=>{const c=s(o,a,l),u=c.value+(c.key===o?0:l)+1;return t.push({key:o,value:u}),u},n=o=>{t=t.filter(a=>a.value!==o)},r=(o,a)=>s(o,a).value,s=(o,a,l=0)=>[...t].reverse().find(c=>a?!0:c.key===o)||{key:o,value:l},i=o=>o&&parseInt(o.style.zIndex,10)||0;return{get:i,set:(o,a,l)=>{a&&(a.style.zIndex=String(e(o,!0,l)))},clear:o=>{o&&(n(i(o)),o.style.zIndex="")},getCurrent:o=>r(o,!0)}}var o_=dC();const ot={STARTS_WITH:"startsWith",CONTAINS:"contains",NOT_CONTAINS:"notContains",ENDS_WITH:"endsWith",EQUALS:"equals",NOT_EQUALS:"notEquals",IN:"in",LESS_THAN:"lt",LESS_THAN_OR_EQUAL_TO:"lte",GREATER_THAN:"gt",GREATER_THAN_OR_EQUAL_TO:"gte",BETWEEN:"between",DATE_IS:"dateIs",DATE_IS_NOT:"dateIsNot",DATE_BEFORE:"dateBefore",DATE_AFTER:"dateAfter"},CF={AND:"and",OR:"or"},RF={filter(t,e,n,r,s){let i=[];if(t)for(let o of t)for(let a of e){let l=lt.resolveFieldData(o,a);if(this.filters[r](l,n,s)){i.push(o);break}}return i},filters:{startsWith(t,e,n){if(e==null||e.trim()==="")return!0;if(t==null)return!1;let r=lt.removeAccents(e.toString()).toLocaleLowerCase(n);return lt.removeAccents(t.toString()).toLocaleLowerCase(n).slice(0,r.length)===r},contains(t,e,n){if(e==null||typeof e=="string"&&e.trim()==="")return!0;if(t==null)return!1;let r=lt.removeAccents(e.toString()).toLocaleLowerCase(n);return lt.removeAccents(t.toString()).toLocaleLowerCase(n).indexOf(r)!==-1},notContains(t,e,n){if(e==null||typeof e=="string"&&e.trim()==="")return!0;if(t==null)return!1;let r=lt.removeAccents(e.toString()).toLocaleLowerCase(n);return lt.removeAccents(t.toString()).toLocaleLowerCase(n).indexOf(r)===-1},endsWith(t,e,n){if(e==null||e.trim()==="")return!0;if(t==null)return!1;let r=lt.removeAccents(e.toString()).toLocaleLowerCase(n),s=lt.removeAccents(t.toString()).toLocaleLowerCase(n);return s.indexOf(r,s.length-r.length)!==-1},equals(t,e,n){return e==null||typeof e=="string"&&e.trim()===""?!0:t==null?!1:t.getTime&&e.getTime?t.getTime()===e.getTime():lt.removeAccents(t.toString()).toLocaleLowerCase(n)==lt.removeAccents(e.toString()).toLocaleLowerCase(n)},notEquals(t,e,n){return e==null||typeof e=="string"&&e.trim()===""?!1:t==null?!0:t.getTime&&e.getTime?t.getTime()!==e.getTime():lt.removeAccents(t.toString()).toLocaleLowerCase(n)!=lt.removeAccents(e.toString()).toLocaleLowerCase(n)},in(t,e){if(e==null||e.length===0)return!0;for(let n=0;n<e.length;n++)if(lt.equals(t,e[n]))return!0;return!1},between(t,e){return e==null||e[0]==null||e[1]==null?!0:t==null?!1:t.getTime?e[0].getTime()<=t.getTime()&&t.getTime()<=e[1].getTime():e[0]<=t&&t<=e[1]},lt(t,e){return e==null?!0:t==null?!1:t.getTime&&e.getTime?t.getTime()<e.getTime():t<e},lte(t,e){return e==null?!0:t==null?!1:t.getTime&&e.getTime?t.getTime()<=e.getTime():t<=e},gt(t,e){return e==null?!0:t==null?!1:t.getTime&&e.getTime?t.getTime()>e.getTime():t>e},gte(t,e){return e==null?!0:t==null?!1:t.getTime&&e.getTime?t.getTime()>=e.getTime():t>=e},dateIs(t,e){return e==null?!0:t==null?!1:t.toDateString()===e.toDateString()},dateIsNot(t,e){return e==null?!0:t==null?!1:t.toDateString()!==e.toDateString()},dateBefore(t,e){return e==null?!0:t==null?!1:t.getTime()<e.getTime()},dateAfter(t,e){return e==null?!0:t==null?!1:t.getTime()>e.getTime()}},register(t,e){this.filters[t]=e}},Cp={ripple:!1,inputStyle:"outlined",locale:{startsWith:"Starts with",contains:"Contains",notContains:"Not contains",endsWith:"Ends with",equals:"Equals",notEquals:"Not equals",noFilter:"No Filter",lt:"Less than",lte:"Less than or equal to",gt:"Greater than",gte:"Greater than or equal to",dateIs:"Date is",dateIsNot:"Date is not",dateBefore:"Date is before",dateAfter:"Date is after",clear:"Clear",apply:"Apply",matchAll:"Match All",matchAny:"Match Any",addRule:"Add Rule",removeRule:"Remove Rule",accept:"Yes",reject:"No",choose:"Choose",upload:"Upload",cancel:"Cancel",completed:"Completed",pending:"Pending",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],chooseYear:"Choose Year",chooseMonth:"Choose Month",chooseDate:"Choose Date",prevDecade:"Previous Decade",nextDecade:"Next Decade",prevYear:"Previous Year",nextYear:"Next Year",prevMonth:"Previous Month",nextMonth:"Next Month",prevHour:"Previous Hour",nextHour:"Next Hour",prevMinute:"Previous Minute",nextMinute:"Next Minute",prevSecond:"Previous Second",nextSecond:"Next Second",am:"am",pm:"pm",today:"Today",weekHeader:"Wk",firstDayOfWeek:0,dateFormat:"mm/dd/yy",weak:"Weak",medium:"Medium",strong:"Strong",passwordPrompt:"Enter a password",emptyFilterMessage:"No results found",searchMessage:"{0} results are available",selectionMessage:"{0} items selected",emptySelectionMessage:"No selected item",emptySearchMessage:"No results found",emptyMessage:"No available options",aria:{trueLabel:"True",falseLabel:"False",nullLabel:"Not Selected",star:"1 star",stars:"{star} stars",selectAll:"All items selected",unselectAll:"All items unselected",close:"Close",previous:"Previous",next:"Next",navigation:"Navigation",scrollTop:"Scroll Top",moveTop:"Move Top",moveUp:"Move Up",moveDown:"Move Down",moveBottom:"Move Bottom",moveToTarget:"Move to Target",moveToSource:"Move to Source",moveAllToTarget:"Move All to Target",moveAllToSource:"Move All to Source",pageLabel:"{page}",firstPageLabel:"First Page",lastPageLabel:"Last Page",nextPageLabel:"Next Page",prevPageLabel:"Previous Page",rowsPerPageLabel:"Rows per page",jumpToPageDropdownLabel:"Jump to Page Dropdown",jumpToPageInputLabel:"Jump to Page Input",selectRow:"Row Selected",unselectRow:"Row Unselected",expandRow:"Row Expanded",collapseRow:"Row Collapsed",showFilterMenu:"Show Filter Menu",hideFilterMenu:"Hide Filter Menu",filterOperator:"Filter Operator",filterConstraint:"Filter Constraint",editRow:"Row Edit",saveEdit:"Save Edit",cancelEdit:"Cancel Edit",listView:"List View",gridView:"Grid View",slide:"Slide",slideNumber:"{slideNumber}",zoomImage:"Zoom Image",zoomIn:"Zoom In",zoomOut:"Zoom Out",rotateRight:"Rotate Right",rotateLeft:"Rotate Left"}},filterMatchModeOptions:{text:[ot.STARTS_WITH,ot.CONTAINS,ot.NOT_CONTAINS,ot.ENDS_WITH,ot.EQUALS,ot.NOT_EQUALS],numeric:[ot.EQUALS,ot.NOT_EQUALS,ot.LESS_THAN,ot.LESS_THAN_OR_EQUAL_TO,ot.GREATER_THAN,ot.GREATER_THAN_OR_EQUAL_TO],date:[ot.DATE_IS,ot.DATE_IS_NOT,ot.DATE_BEFORE,ot.DATE_AFTER]},zIndex:{modal:1100,overlay:1e3,menu:1e3,tooltip:1100}},pC=Symbol();function gC(t,e,n,r){const s=document.getElementById(n),i=s.cloneNode(!0),o=s.getAttribute("href").replace(t,e);i.setAttribute("id",n+"-clone"),i.setAttribute("href",o),i.addEventListener("load",()=>{s.remove(),i.setAttribute("id",n),r&&r()}),s.parentNode&&s.parentNode.insertBefore(i,s.nextSibling)}var mC={install:(t,e)=>{let n=e?{...Cp,...e}:{...Cp};const r={config:Vt(n),changeTheme:gC};t.config.globalProperties.$primevue=r,t.provide(pC,r)}};const yC=Qt(({vueApp:t})=>{t.use(mC,{components:void 0,ripple:!0,inputStyle:"outlined"})});function _C(t={}){const{immediate:e=!1,onNeedRefresh:n,onOfflineReady:r,onRegistered:s,onRegisteredSW:i,onRegisterError:o}=t;let a,l,c;const u=async(f=!0)=>{await l,await(c==null?void 0:c())};async function h(){if("serviceWorker"in navigator){const{Workbox:f}=await N(()=>import("./workbox-window.prod.es5.08b2315b.js"),[],import.meta.url);a=new f("/sw.js",{scope:"/",type:"classic"}),c=async()=>{await(a==null?void 0:a.messageSkipWaiting())};{let p=!1;const y=()=>{p=!0,a==null||a.addEventListener("controlling",E=>{E.isUpdate&&window.location.reload()}),n==null||n()};a.addEventListener("installed",E=>{typeof E.isUpdate>"u"?typeof E.isExternal<"u"?E.isExternal?y():!p&&(r==null||r()):E.isExternal?window.location.reload():!p&&(r==null||r()):E.isUpdate||r==null||r()}),a.addEventListener("waiting",y),a.addEventListener("externalwaiting",y)}a.register({immediate:e}).then(p=>{i?i("/sw.js",p):s==null||s(p)}).catch(p=>{o==null||o(p)})}}return l=h(),u}function vC(t={}){const{immediate:e=!0,onNeedRefresh:n,onOfflineReady:r,onRegistered:s,onRegisteredSW:i,onRegisterError:o}=t,a=nt(!1),l=nt(!1);return{updateServiceWorker:_C({immediate:e,onNeedRefresh(){a.value=!0,n==null||n()},onOfflineReady(){l.value=!0,r==null||r()},onRegistered:s,onRegisteredSW:i,onRegisterError:o}),offlineReady:l,needRefresh:a}}const yc={periodicSyncForUpdates:0},wC=Qt(()=>{const t=nt(!1),e=nt(!1),n=nt(!1),r=nt(yc.installPrompt?localStorage.getItem(yc.installPrompt)==="true":!0),s=navigator.userAgent,i=s.match(/iPhone|iPad|iPod/),a=!!(window.matchMedia("(display-mode: standalone)").matches||i&&!s.match(/Safari/));let l;const c=()=>l,{offlineReady:u,needRefresh:h,updateServiceWorker:f}=vC({immediate:!0,onRegisterError(){t.value=!0},onRegisteredSW(b,w){l=w}}),p=async()=>{u.value=!1,h.value=!1};let y=()=>Promise.resolve(),E=()=>{};if(!r.value){let b;const w=d=>{d.preventDefault(),b=d,n.value=!0};window.addEventListener("beforeinstallprompt",w),window.addEventListener("appinstalled",()=>{b=void 0,n.value=!1}),E=()=>{b=void 0,n.value=!1,window.removeEventListener("beforeinstallprompt",w),r.value=!0,localStorage.setItem(yc.installPrompt,"true")},y=async()=>{if(!n.value||!b){n.value=!1;return}n.value=!1,await yr(),b.prompt(),await b.userChoice}}return{provide:{pwa:Vt({isInstalled:a,showInstallPrompt:n,cancelInstall:E,install:y,swActivated:e,registrationError:t,offlineReady:u,needRefresh:h,updateServiceWorker:f,cancelPrompt:p,getSWRegistration:c})}}}),EC=Qt({name:"nuxt:chunk-reload",setup(t){const e=Us(),n=dl(),r=new Set;e.beforeEach(()=>{r.clear()}),t.hook("app:chunkError",({error:s})=>{r.add(s)}),e.onError((s,i)=>{if(r.has(s)){const a="href"in i&&i.href.startsWith("#")?n.app.baseURL+i.href:to(n.app.baseURL,i.fullPath);YA({path:a,persistState:!0})}})}}),bC=Qt({name:"nuxt:payload",setup(t){QA()&&(t.hooks.hook("link:prefetch",async e=>{fl(e).protocol||await op(e)}),Us().beforeResolve(async(e,n)=>{if(e.path===n.path)return;const r=await op(e.path);r&&Object.assign(t.static.data,r.data)}))}});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a_=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},TC=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},l_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,u=i>>2,h=(i&3)<<4|a>>4;let f=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(f=64)),r.push(n[u],n[h],n[f],n[p])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(a_(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):TC(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||c==null||h==null)throw new IC;const f=i<<2|a>>4;if(r.push(f),c!==64){const p=a<<4&240|c>>2;if(r.push(p),h!==64){const y=c<<6&192|h;r.push(y)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class IC extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const AC=function(t){const e=a_(t);return l_.encodeByteArray(e,!0)},Ca=function(t){return AC(t).replace(/\./g,"")},c_=function(t){try{return l_.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SC(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CC=()=>SC().__FIREBASE_DEFAULTS__,RC=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},kC=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&c_(t[1]);return e&&JSON.parse(e)},ml=()=>{try{return CC()||RC()||kC()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},u_=t=>{var e,n;return(n=(e=ml())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Mh=t=>{const e=u_(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},OC=()=>{var t;return(t=ml())===null||t===void 0?void 0:t.config},h_=t=>{var e;return(e=ml())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PC{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f_(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t),a="";return[Ca(JSON.stringify(n)),Ca(JSON.stringify(o)),a].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function DC(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(yt())}function NC(){var t;const e=(t=ml())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(globalThis.process)==="[object process]"}catch{return!1}}function LC(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function xC(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function MC(){const t=yt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function FC(){try{return typeof indexedDB=="object"}catch{return!1}}function UC(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $C="FirebaseError";class sn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=$C,Object.setPrototypeOf(this,sn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,no.prototype.create)}}class no{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?VC(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new sn(s,a,r)}}function VC(t,e){return t.replace(BC,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const BC=/\{\$([^}]+)}/g;function HC(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Ra(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Rp(i)&&Rp(o)){if(!Ra(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Rp(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ro(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function oi(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ai(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function jC(t,e){const n=new qC(t,e);return n.subscribe.bind(n)}class qC{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");WC(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=_c),s.error===void 0&&(s.error=_c),s.complete===void 0&&(s.complete=_c);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function WC(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function _c(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(t){return t&&t._delegate?t._delegate:t}class Nn{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ar="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zC{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new PC;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(GC(e))try{this.getOrInitializeService({instanceIdentifier:Ar})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Ar){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ar){return this.instances.has(e)}getOptions(e=Ar){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:KC(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Ar){return this.component?this.component.multipleInstances?e:Ar:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function KC(t){return t===Ar?void 0:t}function GC(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QC{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new zC(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ve;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ve||(ve={}));const JC={debug:ve.DEBUG,verbose:ve.VERBOSE,info:ve.INFO,warn:ve.WARN,error:ve.ERROR,silent:ve.SILENT},YC=ve.INFO,XC={[ve.DEBUG]:"log",[ve.VERBOSE]:"log",[ve.INFO]:"info",[ve.WARN]:"warn",[ve.ERROR]:"error"},ZC=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=XC[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Fh{constructor(e){this.name=e,this._logLevel=YC,this._logHandler=ZC,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ve))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?JC[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ve.DEBUG,...e),this._logHandler(this,ve.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ve.VERBOSE,...e),this._logHandler(this,ve.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ve.INFO,...e),this._logHandler(this,ve.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ve.WARN,...e),this._logHandler(this,ve.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ve.ERROR,...e),this._logHandler(this,ve.ERROR,...e)}}const eR=(t,e)=>e.some(n=>t instanceof n);let kp,Op;function tR(){return kp||(kp=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function nR(){return Op||(Op=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const d_=new WeakMap,wu=new WeakMap,p_=new WeakMap,vc=new WeakMap,Uh=new WeakMap;function rR(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(ar(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&d_.set(n,t)}).catch(()=>{}),Uh.set(e,t),e}function sR(t){if(wu.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});wu.set(t,e)}let Eu={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return wu.get(t);if(e==="objectStoreNames")return t.objectStoreNames||p_.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ar(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function iR(t){Eu=t(Eu)}function oR(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(wc(this),e,...n);return p_.set(r,e.sort?e.sort():[e]),ar(r)}:nR().includes(t)?function(...e){return t.apply(wc(this),e),ar(d_.get(this))}:function(...e){return ar(t.apply(wc(this),e))}}function aR(t){return typeof t=="function"?oR(t):(t instanceof IDBTransaction&&sR(t),eR(t,tR())?new Proxy(t,Eu):t)}function ar(t){if(t instanceof IDBRequest)return rR(t);if(vc.has(t))return vc.get(t);const e=aR(t);return e!==t&&(vc.set(t,e),Uh.set(e,t)),e}const wc=t=>Uh.get(t);function lR(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=ar(o);return r&&o.addEventListener("upgradeneeded",l=>{r(ar(o.result),l.oldVersion,l.newVersion,ar(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),a.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",()=>s())}).catch(()=>{}),a}const cR=["get","getKey","getAll","getAllKeys","count"],uR=["put","add","delete","clear"],Ec=new Map;function Pp(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ec.get(e))return Ec.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=uR.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||cR.includes(n)))return;const i=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return Ec.set(e,i),i}iR(t=>({...t,get:(e,n,r)=>Pp(e,n)||t.get(e,n,r),has:(e,n)=>!!Pp(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hR{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(fR(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function fR(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const bu="@firebase/app",Dp="0.9.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=new Fh("@firebase/app"),dR="@firebase/app-compat",pR="@firebase/analytics-compat",gR="@firebase/analytics",mR="@firebase/app-check-compat",yR="@firebase/app-check",_R="@firebase/auth",vR="@firebase/auth-compat",wR="@firebase/database",ER="@firebase/database-compat",bR="@firebase/functions",TR="@firebase/functions-compat",IR="@firebase/installations",AR="@firebase/installations-compat",SR="@firebase/messaging",CR="@firebase/messaging-compat",RR="@firebase/performance",kR="@firebase/performance-compat",OR="@firebase/remote-config",PR="@firebase/remote-config-compat",DR="@firebase/storage",NR="@firebase/storage-compat",LR="@firebase/firestore",xR="@firebase/firestore-compat",MR="firebase",FR="9.19.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tu="[DEFAULT]",UR={[bu]:"fire-core",[dR]:"fire-core-compat",[gR]:"fire-analytics",[pR]:"fire-analytics-compat",[yR]:"fire-app-check",[mR]:"fire-app-check-compat",[_R]:"fire-auth",[vR]:"fire-auth-compat",[wR]:"fire-rtdb",[ER]:"fire-rtdb-compat",[bR]:"fire-fn",[TR]:"fire-fn-compat",[IR]:"fire-iid",[AR]:"fire-iid-compat",[SR]:"fire-fcm",[CR]:"fire-fcm-compat",[RR]:"fire-perf",[kR]:"fire-perf-compat",[OR]:"fire-rc",[PR]:"fire-rc-compat",[DR]:"fire-gcs",[NR]:"fire-gcs-compat",[LR]:"fire-fst",[xR]:"fire-fst-compat","fire-js":"fire-js",[MR]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ka=new Map,Iu=new Map;function $R(t,e){try{t.container.addComponent(e)}catch(n){Vr.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function fr(t){const e=t.name;if(Iu.has(e))return Vr.debug(`There were multiple attempts to register component ${e}.`),!1;Iu.set(e,t);for(const n of ka.values())$R(n,t);return!0}function so(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VR={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},lr=new no("app","Firebase",VR);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BR{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Nn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw lr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $s=FR;function g_(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Tu,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw lr.create("bad-app-name",{appName:String(s)});if(n||(n=OC()),!n)throw lr.create("no-options");const i=ka.get(s);if(i){if(Ra(n,i.options)&&Ra(r,i.config))return i;throw lr.create("duplicate-app",{appName:s})}const o=new QC(s);for(const l of Iu.values())o.addComponent(l);const a=new BR(n,r,o);return ka.set(s,a),a}function yl(t=Tu){const e=ka.get(t);if(!e&&t===Tu)return g_();if(!e)throw lr.create("no-app",{appName:t});return e}function Gt(t,e,n){var r;let s=(r=UR[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Vr.warn(a.join(" "));return}fr(new Nn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HR="firebase-heartbeat-database",jR=1,Li="firebase-heartbeat-store";let bc=null;function m_(){return bc||(bc=lR(HR,jR,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Li)}}}).catch(t=>{throw lr.create("idb-open",{originalErrorMessage:t.message})})),bc}async function qR(t){try{return(await m_()).transaction(Li).objectStore(Li).get(y_(t))}catch(e){if(e instanceof sn)Vr.warn(e.message);else{const n=lr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Vr.warn(n.message)}}}async function Np(t,e){try{const r=(await m_()).transaction(Li,"readwrite");return await r.objectStore(Li).put(e,y_(t)),r.done}catch(n){if(n instanceof sn)Vr.warn(n.message);else{const r=lr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Vr.warn(r.message)}}}function y_(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WR=1024,zR=30*24*60*60*1e3;class KR{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new QR(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Lp();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const i=new Date(s.date).valueOf();return Date.now()-i<=zR}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Lp(),{heartbeatsToSend:n,unsentEntries:r}=GR(this._heartbeatsCache.heartbeats),s=Ca(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function Lp(){return new Date().toISOString().substring(0,10)}function GR(t,e=WR){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),xp(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),xp(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class QR{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return FC()?UC().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await qR(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Np(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Np(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function xp(t){return Ca(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JR(t){fr(new Nn("platform-logger",e=>new hR(e),"PRIVATE")),fr(new Nn("heartbeat",e=>new KR(e),"PRIVATE")),Gt(bu,Dp,t),Gt(bu,Dp,"esm2017"),Gt("fire-js","")}JR("");var YR="firebase",XR="9.19.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Gt(YR,XR,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZR="type.googleapis.com/google.protobuf.Int64Value",ek="type.googleapis.com/google.protobuf.UInt64Value";function __(t,e){const n={};for(const r in t)t.hasOwnProperty(r)&&(n[r]=e(t[r]));return n}function Au(t){if(t==null)return null;if(t instanceof Number&&(t=t.valueOf()),typeof t=="number"&&isFinite(t)||t===!0||t===!1||Object.prototype.toString.call(t)==="[object String]")return t;if(t instanceof Date)return t.toISOString();if(Array.isArray(t))return t.map(e=>Au(e));if(typeof t=="function"||typeof t=="object")return __(t,e=>Au(e));throw new Error("Data cannot be encoded in JSON: "+t)}function Oa(t){if(t==null)return t;if(t["@type"])switch(t["@type"]){case ZR:case ek:{const e=Number(t.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+t);return e}default:throw new Error("Data cannot be decoded from JSON: "+t)}return Array.isArray(t)?t.map(e=>Oa(e)):typeof t=="function"||typeof t=="object"?__(t,e=>Oa(e)):t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ps extends sn{constructor(e,n,r){super(`${$h}/${e}`,n||""),this.details=r}}function tk(t){if(t>=200&&t<300)return"ok";switch(t){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function nk(t,e){let n=tk(t),r=n,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!Mp[o])return new ps("internal","internal");n=Mp[o],r=o}const a=i.message;typeof a=="string"&&(r=a),s=i.details,s!==void 0&&(s=Oa(s))}}catch{}return n==="ok"?null:new ps(n,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rk{constructor(e,n,r){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=n.getImmediate({optional:!0}),this.auth||e.get().then(s=>this.auth=s,()=>{}),this.messaging||n.get().then(s=>this.messaging=s,()=>{}),this.appCheck||r.get().then(s=>this.appCheck=s,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(){if(this.appCheck){const e=await this.appCheck.getToken();return e.error?null:e.token}return null}async getContext(){const e=await this.getAuthToken(),n=await this.getMessagingToken(),r=await this.getAppCheckToken();return{authToken:e,messagingToken:n,appCheckToken:r}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Su="us-central1";function sk(t){let e=null;return{promise:new Promise((n,r)=>{e=setTimeout(()=>{r(new ps("deadline-exceeded","deadline-exceeded"))},t)}),cancel:()=>{e&&clearTimeout(e)}}}class ik{constructor(e,n,r,s,i=Su,o){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new rk(n,r,s),this.cancelAllRequests=new Promise(a=>{this.deleteService=()=>Promise.resolve(a())});try{const a=new URL(i);this.customDomain=a.origin,this.region=Su}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const n=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${n}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${n}.cloudfunctions.net/${e}`}}function ok(t,e,n){t.emulatorOrigin=`http://${e}:${n}`}function ak(t,e,n){return r=>ck(t,e,r,n||{})}async function lk(t,e,n,r){n["Content-Type"]="application/json";let s;try{s=await r(t,{method:"POST",body:JSON.stringify(e),headers:n})}catch{return{status:0,json:null}}let i=null;try{i=await s.json()}catch{}return{status:s.status,json:i}}function ck(t,e,n,r){const s=t._url(e);return uk(t,s,n,r)}async function uk(t,e,n,r){n=Au(n);const s={data:n},i={},o=await t.contextProvider.getContext();o.authToken&&(i.Authorization="Bearer "+o.authToken),o.messagingToken&&(i["Firebase-Instance-ID-Token"]=o.messagingToken),o.appCheckToken!==null&&(i["X-Firebase-AppCheck"]=o.appCheckToken);const a=r.timeout||7e4,l=sk(a),c=await Promise.race([lk(e,s,i,t.fetchImpl),l.promise,t.cancelAllRequests]);if(l.cancel(),!c)throw new ps("cancelled","Firebase Functions instance was deleted.");const u=nk(c.status,c.json);if(u)throw u;if(!c.json)throw new ps("internal","Response is not valid JSON object.");let h=c.json.data;if(typeof h>"u"&&(h=c.json.result),typeof h>"u")throw new ps("internal","Response is missing data field.");return{data:Oa(h)}}const Fp="@firebase/functions",Up="0.9.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hk="auth-internal",fk="app-check-internal",dk="messaging-internal";function pk(t,e){const n=(r,{instanceIdentifier:s})=>{const i=r.getProvider("app").getImmediate(),o=r.getProvider(hk),a=r.getProvider(dk),l=r.getProvider(fk);return new ik(i,o,a,l,s,t)};fr(new Nn($h,n,"PUBLIC").setMultipleInstances(!0)),Gt(Fp,Up,e),Gt(Fp,Up,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gk(t=yl(),e=Su){const r=so(Le(t),$h).getImmediate({identifier:e}),s=Mh("functions");return s&&v_(r,...s),r}function v_(t,e,n){ok(Le(t),e,n)}function kF(t,e,n){return ak(Le(t),e,n)}pk(fetch.bind(self));var mk=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},J,Vh=Vh||{},ae=mk||self;function Pa(){}function _l(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function io(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function yk(t){return Object.prototype.hasOwnProperty.call(t,Tc)&&t[Tc]||(t[Tc]=++_k)}var Tc="closure_uid_"+(1e9*Math.random()>>>0),_k=0;function vk(t,e,n){return t.call.apply(t.bind,arguments)}function wk(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,r),t.apply(e,s)}}return function(){return t.apply(e,arguments)}}function gt(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?gt=vk:gt=wk,gt.apply(null,arguments)}function jo(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var r=n.slice();return r.push.apply(r,arguments),t.apply(this,r)}}function it(t,e){function n(){}n.prototype=e.prototype,t.X=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Wb=function(r,s,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[s].apply(r,o)}}function _r(){this.s=this.s,this.o=this.o}var Ek=0;_r.prototype.s=!1;_r.prototype.na=function(){!this.s&&(this.s=!0,this.M(),Ek!=0)&&yk(this)};_r.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const w_=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1};function Bh(t){const e=t.length;if(0<e){const n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}return[]}function $p(t,e){for(let n=1;n<arguments.length;n++){const r=arguments[n];if(_l(r)){const s=t.length||0,i=r.length||0;t.length=s+i;for(let o=0;o<i;o++)t[s+o]=r[o]}else t.push(r)}}function mt(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}mt.prototype.h=function(){this.defaultPrevented=!0};var bk=function(){if(!ae.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{ae.addEventListener("test",Pa,e),ae.removeEventListener("test",Pa,e)}catch{}return t}();function Da(t){return/^[\s\xa0]*$/.test(t)}var Vp=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function Ic(t,e){return t<e?-1:t>e?1:0}function vl(){var t=ae.navigator;return t&&(t=t.userAgent)?t:""}function un(t){return vl().indexOf(t)!=-1}function Hh(t){return Hh[" "](t),t}Hh[" "]=Pa;function Tk(t){var e=Sk;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}var Ik=un("Opera"),Ss=un("Trident")||un("MSIE"),E_=un("Edge"),Cu=E_||Ss,b_=un("Gecko")&&!(vl().toLowerCase().indexOf("webkit")!=-1&&!un("Edge"))&&!(un("Trident")||un("MSIE"))&&!un("Edge"),Ak=vl().toLowerCase().indexOf("webkit")!=-1&&!un("Edge");function T_(){var t=ae.document;return t?t.documentMode:void 0}var Na;e:{var Ac="",Sc=function(){var t=vl();if(b_)return/rv:([^\);]+)(\)|;)/.exec(t);if(E_)return/Edge\/([\d\.]+)/.exec(t);if(Ss)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(Ak)return/WebKit\/(\S+)/.exec(t);if(Ik)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(Sc&&(Ac=Sc?Sc[1]:""),Ss){var Cc=T_();if(Cc!=null&&Cc>parseFloat(Ac)){Na=String(Cc);break e}}Na=Ac}var Sk={};function Ck(){return Tk(function(){let t=0;const e=Vp(String(Na)).split("."),n=Vp("9").split("."),r=Math.max(e.length,n.length);for(let o=0;t==0&&o<r;o++){var s=e[o]||"",i=n[o]||"";do{if(s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],s[0].length==0&&i[0].length==0)break;t=Ic(s[1].length==0?0:parseInt(s[1],10),i[1].length==0?0:parseInt(i[1],10))||Ic(s[2].length==0,i[2].length==0)||Ic(s[2],i[2]),s=s[3],i=i[3]}while(t==0)}return 0<=t})}var Ru;if(ae.document&&Ss){var Bp=T_();Ru=Bp||parseInt(Na,10)||void 0}else Ru=void 0;var Rk=Ru;function xi(t,e){if(mt.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(b_){e:{try{Hh(e.nodeName);var s=!0;break e}catch{}s=!1}s||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:kk[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&xi.X.h.call(this)}}it(xi,mt);var kk={2:"touch",3:"pen",4:"mouse"};xi.prototype.h=function(){xi.X.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var oo="closure_listenable_"+(1e6*Math.random()|0),Ok=0;function Pk(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ha=s,this.key=++Ok,this.ba=this.ea=!1}function wl(t){t.ba=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function jh(t,e,n){for(const r in t)e.call(n,t[r],r,t)}function I_(t){const e={};for(const n in t)e[n]=t[n];return e}const Hp="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function A_(t,e){let n,r;for(let s=1;s<arguments.length;s++){r=arguments[s];for(n in r)t[n]=r[n];for(let i=0;i<Hp.length;i++)n=Hp[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function El(t){this.src=t,this.g={},this.h=0}El.prototype.add=function(t,e,n,r,s){var i=t.toString();t=this.g[i],t||(t=this.g[i]=[],this.h++);var o=Ou(t,e,r,s);return-1<o?(e=t[o],n||(e.ea=!1)):(e=new Pk(e,this.src,i,!!r,s),e.ea=n,t.push(e)),e};function ku(t,e){var n=e.type;if(n in t.g){var r=t.g[n],s=w_(r,e),i;(i=0<=s)&&Array.prototype.splice.call(r,s,1),i&&(wl(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function Ou(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.ba&&i.listener==e&&i.capture==!!n&&i.ha==r)return s}return-1}var qh="closure_lm_"+(1e6*Math.random()|0),Rc={};function S_(t,e,n,r,s){if(r&&r.once)return R_(t,e,n,r,s);if(Array.isArray(e)){for(var i=0;i<e.length;i++)S_(t,e[i],n,r,s);return null}return n=Kh(n),t&&t[oo]?t.N(e,n,io(r)?!!r.capture:!!r,s):C_(t,e,n,!1,r,s)}function C_(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=io(s)?!!s.capture:!!s,a=zh(t);if(a||(t[qh]=a=new El(t)),n=a.add(e,n,r,o,i),n.proxy)return n;if(r=Dk(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)bk||(s=o),s===void 0&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(O_(e.toString()),r);else if(t.addListener&&t.removeListener)t.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function Dk(){function t(n){return e.call(t.src,t.listener,n)}const e=Nk;return t}function R_(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)R_(t,e[i],n,r,s);return null}return n=Kh(n),t&&t[oo]?t.O(e,n,io(r)?!!r.capture:!!r,s):C_(t,e,n,!0,r,s)}function k_(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)k_(t,e[i],n,r,s);else r=io(r)?!!r.capture:!!r,n=Kh(n),t&&t[oo]?(t=t.i,e=String(e).toString(),e in t.g&&(i=t.g[e],n=Ou(i,n,r,s),-1<n&&(wl(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete t.g[e],t.h--)))):t&&(t=zh(t))&&(e=t.g[e.toString()],t=-1,e&&(t=Ou(e,n,r,s)),(n=-1<t?e[t]:null)&&Wh(n))}function Wh(t){if(typeof t!="number"&&t&&!t.ba){var e=t.src;if(e&&e[oo])ku(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(O_(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=zh(e))?(ku(n,t),n.h==0&&(n.src=null,e[qh]=null)):wl(t)}}}function O_(t){return t in Rc?Rc[t]:Rc[t]="on"+t}function Nk(t,e){if(t.ba)t=!0;else{e=new xi(e,this);var n=t.listener,r=t.ha||t.src;t.ea&&Wh(t),t=n.call(r,e)}return t}function zh(t){return t=t[qh],t instanceof El?t:null}var kc="__closure_events_fn_"+(1e9*Math.random()>>>0);function Kh(t){return typeof t=="function"?t:(t[kc]||(t[kc]=function(e){return t.handleEvent(e)}),t[kc])}function Ze(){_r.call(this),this.i=new El(this),this.P=this,this.I=null}it(Ze,_r);Ze.prototype[oo]=!0;Ze.prototype.removeEventListener=function(t,e,n,r){k_(this,t,e,n,r)};function st(t,e){var n,r=t.I;if(r)for(n=[];r;r=r.I)n.push(r);if(t=t.P,r=e.type||e,typeof e=="string")e=new mt(e,t);else if(e instanceof mt)e.target=e.target||t;else{var s=e;e=new mt(r,t),A_(e,s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];s=qo(o,r,!0,e)&&s}if(o=e.g=t,s=qo(o,r,!0,e)&&s,s=qo(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)o=e.g=n[i],s=qo(o,r,!1,e)&&s}Ze.prototype.M=function(){if(Ze.X.M.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)wl(n[r]);delete t.g[e],t.h--}}this.I=null};Ze.prototype.N=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)};Ze.prototype.O=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};function qo(t,e,n,r){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.ba&&o.capture==n){var a=o.listener,l=o.ha||o.src;o.ea&&ku(t.i,o),s=a.call(l,r)!==!1&&s}}return s&&!r.defaultPrevented}var Gh=ae.JSON.stringify;function Lk(){var t=N_;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class xk{constructor(){this.h=this.g=null}add(e,n){const r=P_.get();r.set(e,n),this.h?this.h.next=r:this.g=r,this.h=r}}var P_=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new Mk,t=>t.reset());class Mk{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function Fk(t){ae.setTimeout(()=>{throw t},0)}function D_(t,e){Pu||Uk(),Du||(Pu(),Du=!0),N_.add(t,e)}var Pu;function Uk(){var t=ae.Promise.resolve(void 0);Pu=function(){t.then($k)}}var Du=!1,N_=new xk;function $k(){for(var t;t=Lk();){try{t.h.call(t.g)}catch(n){Fk(n)}var e=P_;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}Du=!1}function bl(t,e){Ze.call(this),this.h=t||1,this.g=e||ae,this.j=gt(this.lb,this),this.l=Date.now()}it(bl,Ze);J=bl.prototype;J.ca=!1;J.R=null;J.lb=function(){if(this.ca){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.R=this.g.setTimeout(this.j,this.h-t):(this.R&&(this.g.clearTimeout(this.R),this.R=null),st(this,"tick"),this.ca&&(Qh(this),this.start()))}};J.start=function(){this.ca=!0,this.R||(this.R=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Qh(t){t.ca=!1,t.R&&(t.g.clearTimeout(t.R),t.R=null)}J.M=function(){bl.X.M.call(this),Qh(this),delete this.g};function Jh(t,e,n){if(typeof t=="function")n&&(t=gt(t,n));else if(t&&typeof t.handleEvent=="function")t=gt(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:ae.setTimeout(t,e||0)}function L_(t){t.g=Jh(()=>{t.g=null,t.i&&(t.i=!1,L_(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class Vk extends _r{constructor(e,n){super(),this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:L_(this)}M(){super.M(),this.g&&(ae.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Mi(t){_r.call(this),this.h=t,this.g={}}it(Mi,_r);var jp=[];function x_(t,e,n,r){Array.isArray(n)||(n&&(jp[0]=n.toString()),n=jp);for(var s=0;s<n.length;s++){var i=S_(e,n[s],r||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function M_(t){jh(t.g,function(e,n){this.g.hasOwnProperty(n)&&Wh(e)},t),t.g={}}Mi.prototype.M=function(){Mi.X.M.call(this),M_(this)};Mi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function Tl(){this.g=!0}Tl.prototype.Aa=function(){this.g=!1};function Bk(t,e,n,r,s,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),l=0;l<a.length;l++){var c=a[l].split("=");if(1<c.length){var u=c[0];c=c[1];var h=u.split("_");o=2<=h.length&&h[1]=="type"?o+(u+"="+c+"&"):o+(u+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+`
`+n+`
`+o})}function Hk(t,e,n,r,s,i,o){t.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+`
`+n+`
`+i+" "+o})}function is(t,e,n,r){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+qk(t,n)+(r?" "+r:"")})}function jk(t,e){t.info(function(){return"TIMEOUT: "+e})}Tl.prototype.info=function(){};function qk(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return Gh(n)}catch{return e}}var Kr={},qp=null;function Il(){return qp=qp||new Ze}Kr.Pa="serverreachability";function F_(t){mt.call(this,Kr.Pa,t)}it(F_,mt);function Fi(t){const e=Il();st(e,new F_(e))}Kr.STAT_EVENT="statevent";function U_(t,e){mt.call(this,Kr.STAT_EVENT,t),this.stat=e}it(U_,mt);function It(t){const e=Il();st(e,new U_(e,t))}Kr.Qa="timingevent";function $_(t,e){mt.call(this,Kr.Qa,t),this.size=e}it($_,mt);function ao(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return ae.setTimeout(function(){t()},e)}var Al={NO_ERROR:0,mb:1,zb:2,yb:3,tb:4,xb:5,Ab:6,Ma:7,TIMEOUT:8,Db:9},V_={rb:"complete",Nb:"success",Na:"error",Ma:"abort",Fb:"ready",Gb:"readystatechange",TIMEOUT:"timeout",Bb:"incrementaldata",Eb:"progress",ub:"downloadprogress",Vb:"uploadprogress"};function Yh(){}Yh.prototype.h=null;function Wp(t){return t.h||(t.h=t.i())}function B_(){}var lo={OPEN:"a",qb:"b",Na:"c",Cb:"d"};function Xh(){mt.call(this,"d")}it(Xh,mt);function Zh(){mt.call(this,"c")}it(Zh,mt);var Nu;function Sl(){}it(Sl,Yh);Sl.prototype.g=function(){return new XMLHttpRequest};Sl.prototype.i=function(){return{}};Nu=new Sl;function co(t,e,n,r){this.l=t,this.j=e,this.m=n,this.U=r||1,this.S=new Mi(this),this.O=Wk,t=Cu?125:void 0,this.T=new bl(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.V=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.Y=-1,this.I=!1,this.N=0,this.L=null,this.$=this.J=this.Z=this.P=!1,this.h=new H_}function H_(){this.i=null,this.g="",this.h=!1}var Wk=45e3,Lu={},La={};J=co.prototype;J.setTimeout=function(t){this.O=t};function xu(t,e,n){t.K=1,t.v=Rl(Ln(e)),t.s=n,t.P=!0,j_(t,null)}function j_(t,e){t.F=Date.now(),uo(t),t.A=Ln(t.v);var n=t.A,r=t.U;Array.isArray(r)||(r=[String(r)]),Y_(n.i,"t",r),t.C=0,n=t.l.H,t.h=new H_,t.g=_v(t.l,n?e:null,!t.s),0<t.N&&(t.L=new Vk(gt(t.La,t,t.g),t.N)),x_(t.S,t.g,"readystatechange",t.ib),e=t.H?I_(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.da(t.A,t.u,t.s,e)):(t.u="GET",t.g.da(t.A,t.u,null,e)),Fi(),Bk(t.j,t.u,t.A,t.m,t.U,t.s)}J.ib=function(t){t=t.target;const e=this.L;e&&An(t)==3?e.l():this.La(t)};J.La=function(t){try{if(t==this.g)e:{const u=An(this.g);var e=this.g.Ea();const h=this.g.aa();if(!(3>u)&&(u!=3||Cu||this.g&&(this.h.h||this.g.fa()||Qp(this.g)))){this.I||u!=4||e==7||(e==8||0>=h?Fi(3):Fi(2)),Cl(this);var n=this.g.aa();this.Y=n;t:if(q_(this)){var r=Qp(this.g);t="";var s=r.length,i=An(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){kr(this),Ei(this);var o="";break t}this.h.i=new ae.TextDecoder}for(e=0;e<s;e++)this.h.h=!0,t+=this.h.i.decode(r[e],{stream:i&&e==s-1});r.splice(0,s),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.fa();if(this.i=n==200,Hk(this.j,this.u,this.A,this.m,this.U,u,n),this.i){if(this.Z&&!this.J){t:{if(this.g){var a,l=this.g;if((a=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Da(a)){var c=a;break t}}c=null}if(n=c)is(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Mu(this,n);else{this.i=!1,this.o=3,It(12),kr(this),Ei(this);break e}}this.P?(W_(this,u,o),Cu&&this.i&&u==3&&(x_(this.S,this.T,"tick",this.hb),this.T.start())):(is(this.j,this.m,o,null),Mu(this,o)),u==4&&kr(this),this.i&&!this.I&&(u==4?pv(this.l,this):(this.i=!1,uo(this)))}else n==400&&0<o.indexOf("Unknown SID")?(this.o=3,It(12)):(this.o=0,It(13)),kr(this),Ei(this)}}}catch{}finally{}};function q_(t){return t.g?t.u=="GET"&&t.K!=2&&t.l.Da:!1}function W_(t,e,n){let r=!0,s;for(;!t.I&&t.C<n.length;)if(s=zk(t,n),s==La){e==4&&(t.o=4,It(14),r=!1),is(t.j,t.m,null,"[Incomplete Response]");break}else if(s==Lu){t.o=4,It(15),is(t.j,t.m,n,"[Invalid Chunk]"),r=!1;break}else is(t.j,t.m,s,null),Mu(t,s);q_(t)&&s!=La&&s!=Lu&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,It(16),r=!1),t.i=t.i&&r,r?0<n.length&&!t.$&&(t.$=!0,e=t.l,e.g==t&&e.$&&!e.K&&(e.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),af(e),e.K=!0,It(11))):(is(t.j,t.m,n,"[Invalid Chunked Response]"),kr(t),Ei(t))}J.hb=function(){if(this.g){var t=An(this.g),e=this.g.fa();this.C<e.length&&(Cl(this),W_(this,t,e),this.i&&t!=4&&uo(this))}};function zk(t,e){var n=t.C,r=e.indexOf(`
`,n);return r==-1?La:(n=Number(e.substring(n,r)),isNaN(n)?Lu:(r+=1,r+n>e.length?La:(e=e.substr(r,n),t.C=r+n,e)))}J.cancel=function(){this.I=!0,kr(this)};function uo(t){t.V=Date.now()+t.O,z_(t,t.O)}function z_(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=ao(gt(t.gb,t),e)}function Cl(t){t.B&&(ae.clearTimeout(t.B),t.B=null)}J.gb=function(){this.B=null;const t=Date.now();0<=t-this.V?(jk(this.j,this.A),this.K!=2&&(Fi(),It(17)),kr(this),this.o=2,Ei(this)):z_(this,this.V-t)};function Ei(t){t.l.G==0||t.I||pv(t.l,t)}function kr(t){Cl(t);var e=t.L;e&&typeof e.na=="function"&&e.na(),t.L=null,Qh(t.T),M_(t.S),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function Mu(t,e){try{var n=t.l;if(n.G!=0&&(n.g==t||Fu(n.h,t))){if(!t.J&&Fu(n.h,t)&&n.G==3){try{var r=n.Fa.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var s=r;if(s[0]==0){e:if(!n.u){if(n.g)if(n.g.F+3e3<t.F)Fa(n),Pl(n);else break e;of(n),It(18)}}else n.Ba=s[1],0<n.Ba-n.T&&37500>s[2]&&n.L&&n.A==0&&!n.v&&(n.v=ao(gt(n.cb,n),6e3));if(1>=ev(n.h)&&n.ja){try{n.ja()}catch{}n.ja=void 0}}else Or(n,11)}else if((t.J||n.g==t)&&Fa(n),!Da(e))for(s=n.Fa.g.parse(e),e=0;e<s.length;e++){let c=s[e];if(n.T=c[0],c=c[1],n.G==2)if(c[0]=="c"){n.I=c[1],n.ka=c[2];const u=c[3];u!=null&&(n.ma=u,n.j.info("VER="+n.ma));const h=c[4];h!=null&&(n.Ca=h,n.j.info("SVER="+n.Ca));const f=c[5];f!=null&&typeof f=="number"&&0<f&&(r=1.5*f,n.J=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const p=t.g;if(p){const y=p.g?p.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(y){var i=r.h;i.g||y.indexOf("spdy")==-1&&y.indexOf("quic")==-1&&y.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(ef(i,i.h),i.h=null))}if(r.D){const E=p.g?p.g.getResponseHeader("X-HTTP-Session-Id"):null;E&&(r.za=E,Pe(r.F,r.D,E))}}n.G=3,n.l&&n.l.xa(),n.$&&(n.P=Date.now()-t.F,n.j.info("Handshake RTT: "+n.P+"ms")),r=n;var o=t;if(r.sa=yv(r,r.H?r.ka:null,r.V),o.J){tv(r.h,o);var a=o,l=r.J;l&&a.setTimeout(l),a.B&&(Cl(a),uo(a)),r.g=o}else fv(r);0<n.i.length&&Dl(n)}else c[0]!="stop"&&c[0]!="close"||Or(n,7);else n.G==3&&(c[0]=="stop"||c[0]=="close"?c[0]=="stop"?Or(n,7):sf(n):c[0]!="noop"&&n.l&&n.l.wa(c),n.A=0)}}Fi(4)}catch{}}function Kk(t){if(t.W&&typeof t.W=="function")return t.W();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(_l(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}e=[],n=0;for(r in t)e[n++]=t[r];return e}function Gk(t){if(t.oa&&typeof t.oa=="function")return t.oa();if(!t.W||typeof t.W!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(_l(t)||typeof t=="string"){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const r in t)e[n++]=r;return e}}}function K_(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(_l(t)||typeof t=="string")Array.prototype.forEach.call(t,e,void 0);else for(var n=Gk(t),r=Kk(t),s=r.length,i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}var G_=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Qk(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function Lr(t,e){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,t instanceof Lr){this.h=e!==void 0?e:t.h,xa(this,t.j),this.s=t.s,this.g=t.g,Ma(this,t.m),this.l=t.l,e=t.i;var n=new Ui;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),zp(this,n),this.o=t.o}else t&&(n=String(t).match(G_))?(this.h=!!e,xa(this,n[1]||"",!0),this.s=li(n[2]||""),this.g=li(n[3]||"",!0),Ma(this,n[4]),this.l=li(n[5]||"",!0),zp(this,n[6]||"",!0),this.o=li(n[7]||"")):(this.h=!!e,this.i=new Ui(null,this.h))}Lr.prototype.toString=function(){var t=[],e=this.j;e&&t.push(ci(e,Kp,!0),":");var n=this.g;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push(ci(e,Kp,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.g&&n.charAt(0)!="/"&&t.push("/"),t.push(ci(n,n.charAt(0)=="/"?Xk:Yk,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.o)&&t.push("#",ci(n,eO)),t.join("")};function Ln(t){return new Lr(t)}function xa(t,e,n){t.j=n?li(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Ma(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function zp(t,e,n){e instanceof Ui?(t.i=e,tO(t.i,t.h)):(n||(e=ci(e,Zk)),t.i=new Ui(e,t.h))}function Pe(t,e,n){t.i.set(e,n)}function Rl(t){return Pe(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function li(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function ci(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,Jk),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function Jk(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Kp=/[#\/\?@]/g,Yk=/[#\?:]/g,Xk=/[#\?]/g,Zk=/[#\?@]/g,eO=/#/g;function Ui(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function vr(t){t.g||(t.g=new Map,t.h=0,t.i&&Qk(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}J=Ui.prototype;J.add=function(t,e){vr(this),this.i=null,t=Vs(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function Q_(t,e){vr(t),e=Vs(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function J_(t,e){return vr(t),e=Vs(t,e),t.g.has(e)}J.forEach=function(t,e){vr(this),this.g.forEach(function(n,r){n.forEach(function(s){t.call(e,s,r,this)},this)},this)};J.oa=function(){vr(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let r=0;r<e.length;r++){const s=t[r];for(let i=0;i<s.length;i++)n.push(e[r])}return n};J.W=function(t){vr(this);let e=[];if(typeof t=="string")J_(this,t)&&(e=e.concat(this.g.get(Vs(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e};J.set=function(t,e){return vr(this),this.i=null,t=Vs(this,t),J_(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};J.get=function(t,e){return t?(t=this.W(t),0<t.length?String(t[0]):e):e};function Y_(t,e,n){Q_(t,e),0<n.length&&(t.i=null,t.g.set(Vs(t,e),Bh(n)),t.h+=n.length)}J.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var r=e[n];const i=encodeURIComponent(String(r)),o=this.W(r);for(r=0;r<o.length;r++){var s=i;o[r]!==""&&(s+="="+encodeURIComponent(String(o[r]))),t.push(s)}}return this.i=t.join("&")};function Vs(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function tO(t,e){e&&!t.j&&(vr(t),t.i=null,t.g.forEach(function(n,r){var s=r.toLowerCase();r!=s&&(Q_(this,r),Y_(this,s,n))},t)),t.j=e}var nO=class{constructor(e,n){this.h=e,this.g=n}};function X_(t){this.l=t||rO,ae.PerformanceNavigationTiming?(t=ae.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(ae.g&&ae.g.Ga&&ae.g.Ga()&&ae.g.Ga().$b),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var rO=10;function Z_(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function ev(t){return t.h?1:t.g?t.g.size:0}function Fu(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function ef(t,e){t.g?t.g.add(e):t.h=e}function tv(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}X_.prototype.cancel=function(){if(this.i=nv(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function nv(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return Bh(t.i)}function tf(){}tf.prototype.stringify=function(t){return ae.JSON.stringify(t,void 0)};tf.prototype.parse=function(t){return ae.JSON.parse(t,void 0)};function sO(){this.g=new tf}function iO(t,e,n){const r=n||"";try{K_(t,function(s,i){let o=s;io(s)&&(o=Gh(s)),e.push(r+i+"="+encodeURIComponent(o))})}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function oO(t,e){const n=new Tl;if(ae.Image){const r=new Image;r.onload=jo(Wo,n,r,"TestLoadImage: loaded",!0,e),r.onerror=jo(Wo,n,r,"TestLoadImage: error",!1,e),r.onabort=jo(Wo,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=jo(Wo,n,r,"TestLoadImage: timeout",!1,e),ae.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=t}else e(!1)}function Wo(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch{}}function ho(t){this.l=t.ac||null,this.j=t.jb||!1}it(ho,Yh);ho.prototype.g=function(){return new kl(this.l,this.j)};ho.prototype.i=function(t){return function(){return t}}({});function kl(t,e){Ze.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=nf,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}it(kl,Ze);var nf=0;J=kl.prototype;J.open=function(t,e){if(this.readyState!=nf)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,$i(this)};J.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||ae).fetch(new Request(this.B,e)).then(this.Wa.bind(this),this.ga.bind(this))};J.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,fo(this)),this.readyState=nf};J.Wa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,$i(this)),this.g&&(this.readyState=3,$i(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ua.bind(this),this.ga.bind(this));else if(typeof ae.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;rv(this)}else t.text().then(this.Va.bind(this),this.ga.bind(this))};function rv(t){t.j.read().then(t.Ta.bind(t)).catch(t.ga.bind(t))}J.Ta=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?fo(this):$i(this),this.readyState==3&&rv(this)}};J.Va=function(t){this.g&&(this.response=this.responseText=t,fo(this))};J.Ua=function(t){this.g&&(this.response=t,fo(this))};J.ga=function(){this.g&&fo(this)};function fo(t){t.readyState=4,t.l=null,t.j=null,t.A=null,$i(t)}J.setRequestHeader=function(t,e){this.v.append(t,e)};J.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};J.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function $i(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(kl.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var aO=ae.JSON.parse;function Fe(t){Ze.call(this),this.headers=new Map,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=sv,this.K=this.L=!1}it(Fe,Ze);var sv="",lO=/^https?$/i,cO=["POST","PUT"];J=Fe.prototype;J.Ka=function(t){this.L=t};J.da=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():Nu.g(),this.C=this.u?Wp(this.u):Wp(Nu),this.g.onreadystatechange=gt(this.Ha,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(i){Gp(this,i);return}if(t=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)n.set(s,r[s]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(const i of r.keys())n.set(i,r.get(i));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(n.keys()).find(i=>i.toLowerCase()=="content-type"),s=ae.FormData&&t instanceof ae.FormData,!(0<=w_(cO,e))||r||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of n)this.g.setRequestHeader(i,o);this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{av(this),0<this.B&&((this.K=uO(this.g))?(this.g.timeout=this.B,this.g.ontimeout=gt(this.qa,this)):this.A=Jh(this.qa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(i){Gp(this,i)}};function uO(t){return Ss&&Ck()&&typeof t.timeout=="number"&&t.ontimeout!==void 0}J.qa=function(){typeof Vh<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,st(this,"timeout"),this.abort(8))};function Gp(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,iv(t),Ol(t)}function iv(t){t.D||(t.D=!0,st(t,"complete"),st(t,"error"))}J.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,st(this,"complete"),st(this,"abort"),Ol(this))};J.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Ol(this,!0)),Fe.X.M.call(this)};J.Ha=function(){this.s||(this.F||this.v||this.l?ov(this):this.fb())};J.fb=function(){ov(this)};function ov(t){if(t.h&&typeof Vh<"u"&&(!t.C[1]||An(t)!=4||t.aa()!=2)){if(t.v&&An(t)==4)Jh(t.Ha,0,t);else if(st(t,"readystatechange"),An(t)==4){t.h=!1;try{const a=t.aa();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var r;if(r=a===0){var s=String(t.H).match(G_)[1]||null;if(!s&&ae.self&&ae.self.location){var i=ae.self.location.protocol;s=i.substr(0,i.length-1)}r=!lO.test(s?s.toLowerCase():"")}n=r}if(n)st(t,"complete"),st(t,"success");else{t.m=6;try{var o=2<An(t)?t.g.statusText:""}catch{o=""}t.j=o+" ["+t.aa()+"]",iv(t)}}finally{Ol(t)}}}}function Ol(t,e){if(t.g){av(t);const n=t.g,r=t.C[0]?Pa:null;t.g=null,t.C=null,e||st(t,"ready");try{n.onreadystatechange=r}catch{}}}function av(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(ae.clearTimeout(t.A),t.A=null)}function An(t){return t.g?t.g.readyState:0}J.aa=function(){try{return 2<An(this)?this.g.status:-1}catch{return-1}};J.fa=function(){try{return this.g?this.g.responseText:""}catch{return""}};J.Sa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),aO(e)}};function Qp(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case sv:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}J.Ea=function(){return this.m};J.Oa=function(){return typeof this.j=="string"?this.j:String(this.j)};function lv(t){let e="";return jh(t,function(n,r){e+=r,e+=":",e+=n,e+=`\r
`}),e}function rf(t,e,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=lv(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):Pe(t,e,n))}function ei(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function cv(t){this.Ca=0,this.i=[],this.j=new Tl,this.ka=this.sa=this.F=this.V=this.g=this.za=this.D=this.ia=this.o=this.S=this.s=null,this.ab=this.U=0,this.Za=ei("failFast",!1,t),this.L=this.v=this.u=this.m=this.l=null,this.Y=!0,this.pa=this.Ba=this.T=-1,this.Z=this.A=this.C=0,this.Xa=ei("baseRetryDelayMs",5e3,t),this.bb=ei("retryDelaySeedMs",1e4,t),this.$a=ei("forwardChannelMaxRetries",2,t),this.ta=ei("forwardChannelRequestTimeoutMs",2e4,t),this.ra=t&&t.xmlHttpFactory||void 0,this.Da=t&&t.Zb||!1,this.J=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.I="",this.h=new X_(t&&t.concurrentRequestLimit),this.Fa=new sO,this.O=t&&t.fastHandshake||!1,this.N=t&&t.encodeInitMessageHeaders||!1,this.O&&this.N&&(this.N=!1),this.Ya=t&&t.Xb||!1,t&&t.Aa&&this.j.Aa(),t&&t.forceLongPolling&&(this.Y=!1),this.$=!this.O&&this.Y&&t&&t.detectBufferingProxy||!1,this.ja=void 0,this.P=0,this.K=!1,this.la=this.B=null}J=cv.prototype;J.ma=8;J.G=1;function sf(t){if(uv(t),t.G==3){var e=t.U++,n=Ln(t.F);Pe(n,"SID",t.I),Pe(n,"RID",e),Pe(n,"TYPE","terminate"),po(t,n),e=new co(t,t.j,e,void 0),e.K=2,e.v=Rl(Ln(n)),n=!1,ae.navigator&&ae.navigator.sendBeacon&&(n=ae.navigator.sendBeacon(e.v.toString(),"")),!n&&ae.Image&&(new Image().src=e.v,n=!0),n||(e.g=_v(e.l,null),e.g.da(e.v)),e.F=Date.now(),uo(e)}mv(t)}function Pl(t){t.g&&(af(t),t.g.cancel(),t.g=null)}function uv(t){Pl(t),t.u&&(ae.clearTimeout(t.u),t.u=null),Fa(t),t.h.cancel(),t.m&&(typeof t.m=="number"&&ae.clearTimeout(t.m),t.m=null)}function Dl(t){Z_(t.h)||t.m||(t.m=!0,D_(t.Ja,t),t.C=0)}function hO(t,e){return ev(t.h)>=t.h.j-(t.m?1:0)?!1:t.m?(t.i=e.D.concat(t.i),!0):t.G==1||t.G==2||t.C>=(t.Za?0:t.$a)?!1:(t.m=ao(gt(t.Ja,t,e),gv(t,t.C)),t.C++,!0)}J.Ja=function(t){if(this.m)if(this.m=null,this.G==1){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const s=new co(this,this.j,t,void 0);let i=this.s;if(this.S&&(i?(i=I_(i),A_(i,this.S)):i=this.S),this.o!==null||this.N||(s.H=i,i=null),this.O)e:{for(var e=0,n=0;n<this.i.length;n++){t:{var r=this.i[n];if("__data__"in r.g&&(r=r.g.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=n;break e}if(e===4096||n===this.i.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=hv(this,s,e),n=Ln(this.F),Pe(n,"RID",t),Pe(n,"CVER",22),this.D&&Pe(n,"X-HTTP-Session-Id",this.D),po(this,n),i&&(this.N?e="headers="+encodeURIComponent(String(lv(i)))+"&"+e:this.o&&rf(n,this.o,i)),ef(this.h,s),this.Ya&&Pe(n,"TYPE","init"),this.O?(Pe(n,"$req",e),Pe(n,"SID","null"),s.Z=!0,xu(s,n,null)):xu(s,n,e),this.G=2}}else this.G==3&&(t?Jp(this,t):this.i.length==0||Z_(this.h)||Jp(this))};function Jp(t,e){var n;e?n=e.m:n=t.U++;const r=Ln(t.F);Pe(r,"SID",t.I),Pe(r,"RID",n),Pe(r,"AID",t.T),po(t,r),t.o&&t.s&&rf(r,t.o,t.s),n=new co(t,t.j,n,t.C+1),t.o===null&&(n.H=t.s),e&&(t.i=e.D.concat(t.i)),e=hv(t,n,1e3),n.setTimeout(Math.round(.5*t.ta)+Math.round(.5*t.ta*Math.random())),ef(t.h,n),xu(n,r,e)}function po(t,e){t.ia&&jh(t.ia,function(n,r){Pe(e,r,n)}),t.l&&K_({},function(n,r){Pe(e,r,n)})}function hv(t,e,n){n=Math.min(t.i.length,n);var r=t.l?gt(t.l.Ra,t.l,t):null;e:{var s=t.i;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=s[0].h,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let l=0;l<n;l++){let c=s[l].h;const u=s[l].g;if(c-=i,0>c)i=Math.max(0,s[l].h-100),a=!1;else try{iO(u,o,"req"+c+"_")}catch{r&&r(u)}}if(a){r=o.join("&");break e}}}return t=t.i.splice(0,n),e.D=t,r}function fv(t){t.g||t.u||(t.Z=1,D_(t.Ia,t),t.A=0)}function of(t){return t.g||t.u||3<=t.A?!1:(t.Z++,t.u=ao(gt(t.Ia,t),gv(t,t.A)),t.A++,!0)}J.Ia=function(){if(this.u=null,dv(this),this.$&&!(this.K||this.g==null||0>=this.P)){var t=2*this.P;this.j.info("BP detection timer enabled: "+t),this.B=ao(gt(this.eb,this),t)}};J.eb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.L=!1,this.K=!0,It(10),Pl(this),dv(this))};function af(t){t.B!=null&&(ae.clearTimeout(t.B),t.B=null)}function dv(t){t.g=new co(t,t.j,"rpc",t.Z),t.o===null&&(t.g.H=t.s),t.g.N=0;var e=Ln(t.sa);Pe(e,"RID","rpc"),Pe(e,"SID",t.I),Pe(e,"CI",t.L?"0":"1"),Pe(e,"AID",t.T),Pe(e,"TYPE","xmlhttp"),po(t,e),t.o&&t.s&&rf(e,t.o,t.s),t.J&&t.g.setTimeout(t.J);var n=t.g;t=t.ka,n.K=1,n.v=Rl(Ln(e)),n.s=null,n.P=!0,j_(n,t)}J.cb=function(){this.v!=null&&(this.v=null,Pl(this),of(this),It(19))};function Fa(t){t.v!=null&&(ae.clearTimeout(t.v),t.v=null)}function pv(t,e){var n=null;if(t.g==e){Fa(t),af(t),t.g=null;var r=2}else if(Fu(t.h,e))n=e.D,tv(t.h,e),r=1;else return;if(t.G!=0){if(t.pa=e.Y,e.i)if(r==1){n=e.s?e.s.length:0,e=Date.now()-e.F;var s=t.C;r=Il(),st(r,new $_(r,n)),Dl(t)}else fv(t);else if(s=e.o,s==3||s==0&&0<t.pa||!(r==1&&hO(t,e)||r==2&&of(t)))switch(n&&0<n.length&&(e=t.h,e.i=e.i.concat(n)),s){case 1:Or(t,5);break;case 4:Or(t,10);break;case 3:Or(t,6);break;default:Or(t,2)}}}function gv(t,e){let n=t.Xa+Math.floor(Math.random()*t.bb);return t.l||(n*=2),n*e}function Or(t,e){if(t.j.info("Error code "+e),e==2){var n=null;t.l&&(n=null);var r=gt(t.kb,t);n||(n=new Lr("//www.google.com/images/cleardot.gif"),ae.location&&ae.location.protocol=="http"||xa(n,"https"),Rl(n)),oO(n.toString(),r)}else It(2);t.G=0,t.l&&t.l.va(e),mv(t),uv(t)}J.kb=function(t){t?(this.j.info("Successfully pinged google.com"),It(2)):(this.j.info("Failed to ping google.com"),It(1))};function mv(t){if(t.G=0,t.la=[],t.l){const e=nv(t.h);(e.length!=0||t.i.length!=0)&&($p(t.la,e),$p(t.la,t.i),t.h.i.length=0,Bh(t.i),t.i.length=0),t.l.ua()}}function yv(t,e,n){var r=n instanceof Lr?Ln(n):new Lr(n,void 0);if(r.g!="")e&&(r.g=e+"."+r.g),Ma(r,r.m);else{var s=ae.location;r=s.protocol,e=e?e+"."+s.hostname:s.hostname,s=+s.port;var i=new Lr(null,void 0);r&&xa(i,r),e&&(i.g=e),s&&Ma(i,s),n&&(i.l=n),r=i}return n=t.D,e=t.za,n&&e&&Pe(r,n,e),Pe(r,"VER",t.ma),po(t,r),r}function _v(t,e,n){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Da&&!t.ra?new Fe(new ho({jb:!0})):new Fe(t.ra),e.Ka(t.H),e}function vv(){}J=vv.prototype;J.xa=function(){};J.wa=function(){};J.va=function(){};J.ua=function(){};J.Ra=function(){};function Ua(){if(Ss&&!(10<=Number(Rk)))throw Error("Environmental error: no available transport.")}Ua.prototype.g=function(t,e){return new Bt(t,e)};function Bt(t,e){Ze.call(this),this.g=new cv(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.S=t,(t=e&&e.Yb)&&!Da(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Da(e)&&(this.g.D=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new Bs(this)}it(Bt,Ze);Bt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,n=this.h||void 0;It(0),t.V=e,t.ia=n||{},t.L=t.Y,t.F=yv(t,null,t.V),Dl(t)};Bt.prototype.close=function(){sf(this.g)};Bt.prototype.u=function(t){var e=this.g;if(typeof t=="string"){var n={};n.__data__=t,t=n}else this.v&&(n={},n.__data__=Gh(t),t=n);e.i.push(new nO(e.ab++,t)),e.G==3&&Dl(e)};Bt.prototype.M=function(){this.g.l=null,delete this.j,sf(this.g),delete this.g,Bt.X.M.call(this)};function wv(t){Xh.call(this);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}it(wv,Xh);function Ev(){Zh.call(this),this.status=1}it(Ev,Zh);function Bs(t){this.g=t}it(Bs,vv);Bs.prototype.xa=function(){st(this.g,"a")};Bs.prototype.wa=function(t){st(this.g,new wv(t))};Bs.prototype.va=function(t){st(this.g,new Ev)};Bs.prototype.ua=function(){st(this.g,"b")};Ua.prototype.createWebChannel=Ua.prototype.g;Bt.prototype.send=Bt.prototype.u;Bt.prototype.open=Bt.prototype.m;Bt.prototype.close=Bt.prototype.close;Al.NO_ERROR=0;Al.TIMEOUT=8;Al.HTTP_ERROR=6;V_.COMPLETE="complete";B_.EventType=lo;lo.OPEN="a";lo.CLOSE="b";lo.ERROR="c";lo.MESSAGE="d";Ze.prototype.listen=Ze.prototype.N;Fe.prototype.listenOnce=Fe.prototype.O;Fe.prototype.getLastError=Fe.prototype.Oa;Fe.prototype.getLastErrorCode=Fe.prototype.Ea;Fe.prototype.getStatus=Fe.prototype.aa;Fe.prototype.getResponseJson=Fe.prototype.Sa;Fe.prototype.getResponseText=Fe.prototype.fa;Fe.prototype.send=Fe.prototype.da;Fe.prototype.setWithCredentials=Fe.prototype.Ka;var fO=function(){return new Ua},dO=function(){return Il()},Oc=Al,pO=V_,gO=Kr,Yp={sb:0,vb:1,wb:2,Pb:3,Ub:4,Rb:5,Sb:6,Qb:7,Ob:8,Tb:9,PROXY:10,NOPROXY:11,Mb:12,Ib:13,Jb:14,Hb:15,Kb:16,Lb:17,ob:18,nb:19,pb:20},mO=ho,zo=B_,yO=Fe;const Xp="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ct.UNAUTHENTICATED=new ct(null),ct.GOOGLE_CREDENTIALS=new ct("google-credentials-uid"),ct.FIRST_PARTY=new ct("first-party-uid"),ct.MOCK_USER=new ct("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hs="9.19.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br=new Fh("@firebase/firestore");function Zp(){return Br.logLevel}function X(t,...e){if(Br.logLevel<=ve.DEBUG){const n=e.map(lf);Br.debug(`Firestore (${Hs}): ${t}`,...n)}}function xn(t,...e){if(Br.logLevel<=ve.ERROR){const n=e.map(lf);Br.error(`Firestore (${Hs}): ${t}`,...n)}}function $a(t,...e){if(Br.logLevel<=ve.WARN){const n=e.map(lf);Br.warn(`Firestore (${Hs}): ${t}`,...n)}}function lf(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(t="Unexpected state"){const e=`FIRESTORE (${Hs}) INTERNAL ASSERTION FAILED: `+t;throw xn(e),new Error(e)}function Ce(t,e){t||oe()}function he(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class j extends sn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bv{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class _O{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ct.UNAUTHENTICATED))}shutdown(){}}class vO{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class wO{constructor(e){this.t=e,this.currentUser=ct.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let r=this.i;const s=l=>this.i!==r?(r=this.i,n(l)):Promise.resolve();let i=new fn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new fn,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},a=l=>{X("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(l=>a(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?a(l):(X("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new fn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(X("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ce(typeof r.accessToken=="string"),new bv(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return Ce(e===null||typeof e=="string"),new ct(e)}}class EO{constructor(e,n,r){this.h=e,this.l=n,this.m=r,this.type="FirstParty",this.user=ct.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const e=this.p();return e&&this.g.set("Authorization",e),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class bO{constructor(e,n,r){this.h=e,this.l=n,this.m=r}getToken(){return Promise.resolve(new EO(this.h,this.l,this.m))}start(e,n){e.enqueueRetryable(()=>n(ct.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class TO{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class IO{constructor(e){this.I=e,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(e,n){const r=i=>{i.error!=null&&X("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.T;return this.T=i.token,X("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{X("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.I.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.I.getImmediate({optional:!0});i?s(i):X("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Ce(typeof n.token=="string"),this.T=n.token,new TO(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AO(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tv{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=AO(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function Ee(t,e){return t<e?-1:t>e?1:0}function Cs(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new j(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new j(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new j(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new j(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ke.fromMillis(Date.now())}static fromDate(e){return Ke.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Ke(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Ee(this.nanoseconds,e.nanoseconds):Ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ue(e)}static min(){return new ue(new Ke(0,0))}static max(){return new ue(new Ke(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,n,r){n===void 0?n=0:n>e.length&&oe(),r===void 0?r=e.length-n:r>e.length-n&&oe(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Vi.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Vi?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Se extends Vi{construct(e,n,r){return new Se(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new j(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Se(n)}static emptyPath(){return new Se([])}}const SO=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class pt extends Vi{construct(e,n,r){return new pt(e,n,r)}static isValidIdentifier(e){return SO.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),pt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new pt(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new j(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new j(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new j(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new j(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new pt(n)}static emptyPath(){return new pt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.path=e}static fromPath(e){return new Z(Se.fromString(e))}static fromName(e){return new Z(Se.fromString(e).popFirst(5))}static empty(){return new Z(Se.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Se.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Se.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Z(new Se(e.slice()))}}function CO(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=ue.fromTimestamp(r===1e9?new Ke(n+1,0):new Ke(n,r));return new dr(s,Z.empty(),e)}function RO(t){return new dr(t.readTime,t.key,-1)}class dr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new dr(ue.min(),Z.empty(),-1)}static max(){return new dr(ue.max(),Z.empty(),-1)}}function kO(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=Z.comparator(t.documentKey,e.documentKey),n!==0?n:Ee(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OO="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class PO{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function go(t){if(t.code!==O.FAILED_PRECONDITION||t.message!==OO)throw t;X("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&oe(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new U((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof U?n:U.resolve(n)}catch(n){return U.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):U.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):U.reject(n)}static resolve(e){return new U((n,r)=>{n(e)})}static reject(e){return new U((n,r)=>{r(e)})}static waitFor(e){return new U((n,r)=>{let s=0,i=0,o=!1;e.forEach(a=>{++s,a.next(()=>{++i,o&&i===s&&n()},l=>r(l))}),o=!0,i===s&&n()})}static or(e){let n=U.resolve(!1);for(const r of e)n=n.next(s=>s?U.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new U((r,s)=>{const i=e.length,o=new Array(i);let a=0;for(let l=0;l<i;l++){const c=l;n(e[c]).next(u=>{o[c]=u,++a,a===i&&r(o)},u=>s(u))}})}static doWhile(e,n){return new U((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function mo(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ot(r),this.ut=r=>n.writeSequenceNumber(r))}ot(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ut&&this.ut(e),e}}cf.ct=-1;function Nl(t){return t==null}function Va(t){return t===0&&1/t==-1/0}function DO(t){return typeof t=="number"&&Number.isInteger(t)&&!Va(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eg(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function js(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Iv(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e,n){this.comparator=e,this.root=n||tt.EMPTY}insert(e,n){return new Qe(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,tt.BLACK,null,null))}remove(e){return new Qe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,tt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ko(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ko(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ko(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ko(this.root,e,this.comparator,!0)}}class Ko{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class tt{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??tt.RED,this.left=s??tt.EMPTY,this.right=i??tt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new tt(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return tt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return tt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,tt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,tt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw oe();const e=this.left.check();if(e!==this.right.check())throw oe();return e+(this.isRed()?0:1)}}tt.EMPTY=null,tt.RED=!0,tt.BLACK=!1;tt.EMPTY=new class{constructor(){this.size=0}get key(){throw oe()}get value(){throw oe()}get color(){throw oe()}get left(){throw oe()}get right(){throw oe()}copy(t,e,n,r,s){return this}insert(t,e,n){return new tt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this.comparator=e,this.data=new Qe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new tg(this.data.getIterator())}getIteratorFrom(e){return new tg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Ge)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Ge(this.comparator);return n.data=e,n}}class tg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e){this.fields=e,e.sort(pt.comparator)}static empty(){return new Zt([])}unionWith(e){let n=new Ge(pt.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Zt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Cs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NO extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(r){try{return atob(r)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new NO("Invalid base64 string: "+s):s}}(e);return new _t(n)}static fromUint8Array(e){const n=function(r){let s="";for(let i=0;i<r.length;++i)s+=String.fromCharCode(r[i]);return s}(e);return new _t(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}_t.EMPTY_BYTE_STRING=new _t("");const LO=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function pr(t){if(Ce(!!t),typeof t=="string"){let e=0;const n=LO.exec(t);if(Ce(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:qe(t.seconds),nanos:qe(t.nanos)}}function qe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Rs(t){return typeof t=="string"?_t.fromBase64String(t):_t.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Av(t){const e=t.mapValue.fields.__previous_value__;return uf(e)?Av(e):e}function Bi(t){const e=pr(t.mapValue.fields.__local_write_time__.timestampValue);return new Ke(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xO{constructor(e,n,r,s,i,o,a,l){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.useFetchStreams=l}}class Hi{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Hi("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Hi&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Hr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?uf(t)?4:MO(t)?9007199254740991:10:oe()}function yn(t,e){if(t===e)return!0;const n=Hr(t);if(n!==Hr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Bi(t).isEqual(Bi(e));case 3:return function(r,s){if(typeof r.timestampValue=="string"&&typeof s.timestampValue=="string"&&r.timestampValue.length===s.timestampValue.length)return r.timestampValue===s.timestampValue;const i=pr(r.timestampValue),o=pr(s.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,s){return Rs(r.bytesValue).isEqual(Rs(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,s){return qe(r.geoPointValue.latitude)===qe(s.geoPointValue.latitude)&&qe(r.geoPointValue.longitude)===qe(s.geoPointValue.longitude)}(t,e);case 2:return function(r,s){if("integerValue"in r&&"integerValue"in s)return qe(r.integerValue)===qe(s.integerValue);if("doubleValue"in r&&"doubleValue"in s){const i=qe(r.doubleValue),o=qe(s.doubleValue);return i===o?Va(i)===Va(o):isNaN(i)&&isNaN(o)}return!1}(t,e);case 9:return Cs(t.arrayValue.values||[],e.arrayValue.values||[],yn);case 10:return function(r,s){const i=r.mapValue.fields||{},o=s.mapValue.fields||{};if(eg(i)!==eg(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!yn(i[a],o[a])))return!1;return!0}(t,e);default:return oe()}}function ji(t,e){return(t.values||[]).find(n=>yn(n,e))!==void 0}function ks(t,e){if(t===e)return 0;const n=Hr(t),r=Hr(e);if(n!==r)return Ee(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Ee(t.booleanValue,e.booleanValue);case 2:return function(s,i){const o=qe(s.integerValue||s.doubleValue),a=qe(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(t,e);case 3:return ng(t.timestampValue,e.timestampValue);case 4:return ng(Bi(t),Bi(e));case 5:return Ee(t.stringValue,e.stringValue);case 6:return function(s,i){const o=Rs(s),a=Rs(i);return o.compareTo(a)}(t.bytesValue,e.bytesValue);case 7:return function(s,i){const o=s.split("/"),a=i.split("/");for(let l=0;l<o.length&&l<a.length;l++){const c=Ee(o[l],a[l]);if(c!==0)return c}return Ee(o.length,a.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,i){const o=Ee(qe(s.latitude),qe(i.latitude));return o!==0?o:Ee(qe(s.longitude),qe(i.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(s,i){const o=s.values||[],a=i.values||[];for(let l=0;l<o.length&&l<a.length;++l){const c=ks(o[l],a[l]);if(c)return c}return Ee(o.length,a.length)}(t.arrayValue,e.arrayValue);case 10:return function(s,i){if(s===Go.mapValue&&i===Go.mapValue)return 0;if(s===Go.mapValue)return 1;if(i===Go.mapValue)return-1;const o=s.fields||{},a=Object.keys(o),l=i.fields||{},c=Object.keys(l);a.sort(),c.sort();for(let u=0;u<a.length&&u<c.length;++u){const h=Ee(a[u],c[u]);if(h!==0)return h;const f=ks(o[a[u]],l[c[u]]);if(f!==0)return f}return Ee(a.length,c.length)}(t.mapValue,e.mapValue);default:throw oe()}}function ng(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Ee(t,e);const n=pr(t),r=pr(e),s=Ee(n.seconds,r.seconds);return s!==0?s:Ee(n.nanos,r.nanos)}function Os(t){return Uu(t)}function Uu(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(r){const s=pr(r);return`time(${s.seconds},${s.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?Rs(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,Z.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(r){let s="[",i=!0;for(const o of r.values||[])i?i=!1:s+=",",s+=Uu(o);return s+"]"}(t.arrayValue):"mapValue"in t?function(r){const s=Object.keys(r.fields||{}).sort();let i="{",o=!0;for(const a of s)o?o=!1:i+=",",i+=`${a}:${Uu(r.fields[a])}`;return i+"}"}(t.mapValue):oe();var e,n}function Ba(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function $u(t){return!!t&&"integerValue"in t}function hf(t){return!!t&&"arrayValue"in t}function rg(t){return!!t&&"nullValue"in t}function sg(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function ia(t){return!!t&&"mapValue"in t}function bi(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return js(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=bi(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=bi(t.arrayValue.values[n]);return e}return Object.assign({},t)}function MO(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e){this.value=e}static empty(){return new Ft({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!ia(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=bi(n)}setAll(e){let n=pt.emptyPath(),r={},s=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const l=this.getFieldsMap(n);this.applyChanges(l,r,s),r={},s=[],n=a.popLast()}o?r[a.lastSegment()]=bi(o):s.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());ia(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return yn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];ia(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){js(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Ft(bi(this.value))}}function Sv(t){const e=[];return js(t.fields,(n,r)=>{const s=new pt([n]);if(ia(r)){const i=Sv(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Zt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,n,r,s,i,o,a){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new ht(e,0,ue.min(),ue.min(),ue.min(),Ft.empty(),0)}static newFoundDocument(e,n,r,s){return new ht(e,1,n,ue.min(),r,s,0)}static newNoDocument(e,n){return new ht(e,2,n,ue.min(),ue.min(),Ft.empty(),0)}static newUnknownDocument(e,n){return new ht(e,3,n,ue.min(),ue.min(),Ft.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ue.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ft.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ft.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ue.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ht&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ht(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e,n){this.position=e,this.inclusive=n}}function ig(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=Z.comparator(Z.fromName(o.referenceValue),n.key):r=ks(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function og(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!yn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e,n="asc"){this.field=e,this.dir=n}}function FO(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cv{}class We extends Cv{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new $O(e,n,r):n==="array-contains"?new HO(e,r):n==="in"?new jO(e,r):n==="not-in"?new qO(e,r):n==="array-contains-any"?new WO(e,r):new We(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new VO(e,r):new BO(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(ks(n,this.value)):n!==null&&Hr(this.value)===Hr(n)&&this.matchesComparison(ks(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return oe()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class nn extends Cv{constructor(e,n){super(),this.filters=e,this.op=n,this.ht=null}static create(e,n){return new nn(e,n)}matches(e){return Rv(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ht!==null||(this.ht=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ht}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.lt(n=>n.isInequality());return e!==null?e.field:null}lt(e){for(const n of this.getFlattenedFilters())if(e(n))return n;return null}}function Rv(t){return t.op==="and"}function kv(t){return UO(t)&&Rv(t)}function UO(t){for(const e of t.filters)if(e instanceof nn)return!1;return!0}function Vu(t){if(t instanceof We)return t.field.canonicalString()+t.op.toString()+Os(t.value);if(kv(t))return t.filters.map(e=>Vu(e)).join(",");{const e=t.filters.map(n=>Vu(n)).join(",");return`${t.op}(${e})`}}function Ov(t,e){return t instanceof We?function(n,r){return r instanceof We&&n.op===r.op&&n.field.isEqual(r.field)&&yn(n.value,r.value)}(t,e):t instanceof nn?function(n,r){return r instanceof nn&&n.op===r.op&&n.filters.length===r.filters.length?n.filters.reduce((s,i,o)=>s&&Ov(i,r.filters[o]),!0):!1}(t,e):void oe()}function Pv(t){return t instanceof We?function(e){return`${e.field.canonicalString()} ${e.op} ${Os(e.value)}`}(t):t instanceof nn?function(e){return e.op.toString()+" {"+e.getFilters().map(Pv).join(" ,")+"}"}(t):"Filter"}class $O extends We{constructor(e,n,r){super(e,n,r),this.key=Z.fromName(r.referenceValue)}matches(e){const n=Z.comparator(e.key,this.key);return this.matchesComparison(n)}}class VO extends We{constructor(e,n){super(e,"in",n),this.keys=Dv("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class BO extends We{constructor(e,n){super(e,"not-in",n),this.keys=Dv("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Dv(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>Z.fromName(r.referenceValue))}class HO extends We{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return hf(n)&&ji(n.arrayValue,this.value)}}class jO extends We{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ji(this.value.arrayValue,n)}}class qO extends We{constructor(e,n){super(e,"not-in",n)}matches(e){if(ji(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!ji(this.value.arrayValue,n)}}class WO extends We{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!hf(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>ji(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zO{constructor(e,n=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.ft=null}}function ag(t,e=null,n=[],r=[],s=null,i=null,o=null){return new zO(t,e,n,r,s,i,o)}function ff(t){const e=he(t);if(e.ft===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Vu(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Nl(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Os(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Os(r)).join(",")),e.ft=n}return e.ft}function df(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!FO(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Ov(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!og(t.startAt,e.startAt)&&og(t.endAt,e.endAt)}function Bu(t){return Z.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(e,n=null,r=[],s=[],i=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=l,this.dt=null,this.wt=null,this.startAt,this.endAt}}function KO(t,e,n,r,s,i,o,a){return new Gr(t,e,n,r,s,i,o,a)}function pf(t){return new Gr(t)}function lg(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function gf(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function Ll(t){for(const e of t.filters){const n=e.getFirstInequalityField();if(n!==null)return n}return null}function mf(t){return t.collectionGroup!==null}function xr(t){const e=he(t);if(e.dt===null){e.dt=[];const n=Ll(e),r=gf(e);if(n!==null&&r===null)n.isKeyField()||e.dt.push(new gs(n)),e.dt.push(new gs(pt.keyField(),"asc"));else{let s=!1;for(const i of e.explicitOrderBy)e.dt.push(i),i.field.isKeyField()&&(s=!0);if(!s){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.dt.push(new gs(pt.keyField(),i))}}}return e.dt}function _n(t){const e=he(t);if(!e.wt)if(e.limitType==="F")e.wt=ag(e.path,e.collectionGroup,xr(e),e.filters,e.limit,e.startAt,e.endAt);else{const n=[];for(const i of xr(e)){const o=i.dir==="desc"?"asc":"desc";n.push(new gs(i.field,o))}const r=e.endAt?new Ps(e.endAt.position,e.endAt.inclusive):null,s=e.startAt?new Ps(e.startAt.position,e.startAt.inclusive):null;e.wt=ag(e.path,e.collectionGroup,n,e.filters,e.limit,r,s)}return e.wt}function Hu(t,e){e.getFirstInequalityField(),Ll(t);const n=t.filters.concat([e]);return new Gr(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Ha(t,e,n){return new Gr(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function xl(t,e){return df(_n(t),_n(e))&&t.limitType===e.limitType}function Nv(t){return`${ff(_n(t))}|lt:${t.limitType}`}function ju(t){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(r=>Pv(r)).join(", ")}]`),Nl(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(r=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(r)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Os(r)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Os(r)).join(",")),`Target(${n})`}(_n(t))}; limitType=${t.limitType})`}function Ml(t,e){return e.isFoundDocument()&&function(n,r){const s=r.key.path;return n.collectionGroup!==null?r.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):Z.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(t,e)&&function(n,r){for(const s of xr(n))if(!s.field.isKeyField()&&r.data.field(s.field)===null)return!1;return!0}(t,e)&&function(n,r){for(const s of n.filters)if(!s.matches(r))return!1;return!0}(t,e)&&function(n,r){return!(n.startAt&&!function(s,i,o){const a=ig(s,i,o);return s.inclusive?a<=0:a<0}(n.startAt,xr(n),r)||n.endAt&&!function(s,i,o){const a=ig(s,i,o);return s.inclusive?a>=0:a>0}(n.endAt,xr(n),r))}(t,e)}function GO(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Lv(t){return(e,n)=>{let r=!1;for(const s of xr(t)){const i=QO(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function QO(t,e,n){const r=t.field.isKeyField()?Z.comparator(e.key,n.key):function(s,i,o){const a=i.data.field(s),l=o.data.field(s);return a!==null&&l!==null?ks(a,l):oe()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return oe()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){js(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Iv(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JO=new Qe(Z.comparator);function Mn(){return JO}const xv=new Qe(Z.comparator);function ui(...t){let e=xv;for(const n of t)e=e.insert(n.key,n);return e}function Mv(t){let e=xv;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Pr(){return Ti()}function Fv(){return Ti()}function Ti(){return new qs(t=>t.toString(),(t,e)=>t.isEqual(e))}const YO=new Qe(Z.comparator),XO=new Ge(Z.comparator);function de(...t){let e=XO;for(const n of t)e=e.add(n);return e}const ZO=new Ge(Ee);function Uv(){return ZO}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $v(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Va(e)?"-0":e}}function Vv(t){return{integerValue:""+t}}function eP(t,e){return DO(e)?Vv(e):$v(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{constructor(){this._=void 0}}function tP(t,e,n){return t instanceof qi?function(r,s){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return s&&(i.fields.__previous_value__=s),{mapValue:i}}(n,e):t instanceof Wi?Hv(t,e):t instanceof zi?jv(t,e):function(r,s){const i=Bv(r,s),o=cg(i)+cg(r._t);return $u(i)&&$u(r._t)?Vv(o):$v(r.serializer,o)}(t,e)}function nP(t,e,n){return t instanceof Wi?Hv(t,e):t instanceof zi?jv(t,e):n}function Bv(t,e){return t instanceof ja?$u(n=e)||function(r){return!!r&&"doubleValue"in r}(n)?e:{integerValue:0}:null;var n}class qi extends Fl{}class Wi extends Fl{constructor(e){super(),this.elements=e}}function Hv(t,e){const n=qv(e);for(const r of t.elements)n.some(s=>yn(s,r))||n.push(r);return{arrayValue:{values:n}}}class zi extends Fl{constructor(e){super(),this.elements=e}}function jv(t,e){let n=qv(e);for(const r of t.elements)n=n.filter(s=>!yn(s,r));return{arrayValue:{values:n}}}class ja extends Fl{constructor(e,n){super(),this.serializer=e,this._t=n}}function cg(t){return qe(t.integerValue||t.doubleValue)}function qv(t){return hf(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rP{constructor(e,n){this.field=e,this.transform=n}}function sP(t,e){return t.field.isEqual(e.field)&&function(n,r){return n instanceof Wi&&r instanceof Wi||n instanceof zi&&r instanceof zi?Cs(n.elements,r.elements,yn):n instanceof ja&&r instanceof ja?yn(n._t,r._t):n instanceof qi&&r instanceof qi}(t.transform,e.transform)}class iP{constructor(e,n){this.version=e,this.transformResults=n}}class kn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new kn}static exists(e){return new kn(void 0,e)}static updateTime(e){return new kn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function oa(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Ul{}function Wv(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Kv(t.key,kn.none()):new yo(t.key,t.data,kn.none());{const n=t.data,r=Ft.empty();let s=new Ge(pt.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Qr(t.key,r,new Zt(s.toArray()),kn.none())}}function oP(t,e,n){t instanceof yo?function(r,s,i){const o=r.value.clone(),a=hg(r.fieldTransforms,s,i.transformResults);o.setAll(a),s.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(t,e,n):t instanceof Qr?function(r,s,i){if(!oa(r.precondition,s))return void s.convertToUnknownDocument(i.version);const o=hg(r.fieldTransforms,s,i.transformResults),a=s.data;a.setAll(zv(r)),a.setAll(o),s.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(t,e,n):function(r,s,i){s.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,n)}function Ii(t,e,n,r){return t instanceof yo?function(s,i,o,a){if(!oa(s.precondition,i))return o;const l=s.value.clone(),c=fg(s.fieldTransforms,a,i);return l.setAll(c),i.convertToFoundDocument(i.version,l).setHasLocalMutations(),null}(t,e,n,r):t instanceof Qr?function(s,i,o,a){if(!oa(s.precondition,i))return o;const l=fg(s.fieldTransforms,a,i),c=i.data;return c.setAll(zv(s)),c.setAll(l),i.convertToFoundDocument(i.version,c).setHasLocalMutations(),o===null?null:o.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(u=>u.field))}(t,e,n,r):function(s,i,o){return oa(s.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):o}(t,e,n)}function aP(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=Bv(r.transform,s||null);i!=null&&(n===null&&(n=Ft.empty()),n.set(r.field,i))}return n||null}function ug(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,r){return n===void 0&&r===void 0||!(!n||!r)&&Cs(n,r,(s,i)=>sP(s,i))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class yo extends Ul{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Qr extends Ul{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function zv(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function hg(t,e,n){const r=new Map;Ce(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,nP(o,a,n[s]))}return r}function fg(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,tP(i,o,e))}return r}class Kv extends Ul{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class lP extends Ul{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cP{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&oP(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Ii(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Ii(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Fv();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(s.key)?null:a;const l=Wv(o,a);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(ue.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),de())}isEqual(e){return this.batchId===e.batchId&&Cs(this.mutations,e.mutations,(n,r)=>ug(n,r))&&Cs(this.baseMutations,e.baseMutations,(n,r)=>ug(n,r))}}class yf{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){Ce(e.mutations.length===r.length);let s=YO;const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new yf(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uP{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hP=/^[_a-zA-Z][_a-zA-Z0-9]*(?:\.[_a-zA-Z][_a-zA-Z0-9]*)*$/;class _f{constructor(e){this.alias=e}static gt(e){return hP.test(e)}canonicalString(){let e=this.alias.replace(/\\/g,"\\\\").replace(/`/g,"\\`");return _f.gt(e)||(e="`"+e+"`"),e}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fP{constructor(e,n,r){this.alias=e,this.yt=n,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dP{constructor(e){this.count=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var je,ge;function pP(t){switch(t){default:return oe();case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0}}function Gv(t){if(t===void 0)return xn("GRPC error has no .code"),O.UNKNOWN;switch(t){case je.OK:return O.OK;case je.CANCELLED:return O.CANCELLED;case je.UNKNOWN:return O.UNKNOWN;case je.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case je.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case je.INTERNAL:return O.INTERNAL;case je.UNAVAILABLE:return O.UNAVAILABLE;case je.UNAUTHENTICATED:return O.UNAUTHENTICATED;case je.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case je.NOT_FOUND:return O.NOT_FOUND;case je.ALREADY_EXISTS:return O.ALREADY_EXISTS;case je.PERMISSION_DENIED:return O.PERMISSION_DENIED;case je.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case je.ABORTED:return O.ABORTED;case je.OUT_OF_RANGE:return O.OUT_OF_RANGE;case je.UNIMPLEMENTED:return O.UNIMPLEMENTED;case je.DATA_LOSS:return O.DATA_LOSS;default:return oe()}}(ge=je||(je={}))[ge.OK=0]="OK",ge[ge.CANCELLED=1]="CANCELLED",ge[ge.UNKNOWN=2]="UNKNOWN",ge[ge.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ge[ge.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ge[ge.NOT_FOUND=5]="NOT_FOUND",ge[ge.ALREADY_EXISTS=6]="ALREADY_EXISTS",ge[ge.PERMISSION_DENIED=7]="PERMISSION_DENIED",ge[ge.UNAUTHENTICATED=16]="UNAUTHENTICATED",ge[ge.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ge[ge.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ge[ge.ABORTED=10]="ABORTED",ge[ge.OUT_OF_RANGE=11]="OUT_OF_RANGE",ge[ge.UNIMPLEMENTED=12]="UNIMPLEMENTED",ge[ge.INTERNAL=13]="INTERNAL",ge[ge.UNAVAILABLE=14]="UNAVAILABLE",ge[ge.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return Qo}static getOrCreateInstance(){return Qo===null&&(Qo=new vf),Qo}onExistenceFilterMismatch(e){const n=Symbol();return this.onExistenceFilterMismatchCallbacks.set(n,e),()=>this.onExistenceFilterMismatchCallbacks.delete(n)}notifyOnExistenceFilterMismatch(e){this.onExistenceFilterMismatchCallbacks.forEach(n=>n(e))}}let Qo=null;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,_o.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new $l(ue.min(),s,Uv(),Mn(),de())}}class _o{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new _o(r,n,de(),de(),de())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,n,r,s){this.It=e,this.removedTargetIds=n,this.key=r,this.Tt=s}}class Qv{constructor(e,n){this.targetId=e,this.Et=n}}class Jv{constructor(e,n,r=_t.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class dg{constructor(){this.At=0,this.Rt=gg(),this.vt=_t.EMPTY_BYTE_STRING,this.bt=!1,this.Pt=!0}get current(){return this.bt}get resumeToken(){return this.vt}get Vt(){return this.At!==0}get St(){return this.Pt}Dt(e){e.approximateByteSize()>0&&(this.Pt=!0,this.vt=e)}Ct(){let e=de(),n=de(),r=de();return this.Rt.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:oe()}}),new _o(this.vt,this.bt,e,n,r)}xt(){this.Pt=!1,this.Rt=gg()}Nt(e,n){this.Pt=!0,this.Rt=this.Rt.insert(e,n)}kt(e){this.Pt=!0,this.Rt=this.Rt.remove(e)}Ot(){this.At+=1}$t(){this.At-=1}Mt(){this.Pt=!0,this.bt=!0}}class gP{constructor(e){this.Ft=e,this.Bt=new Map,this.Lt=Mn(),this.qt=pg(),this.Ut=new Ge(Ee)}Kt(e){for(const n of e.It)e.Tt&&e.Tt.isFoundDocument()?this.Gt(n,e.Tt):this.Qt(n,e.key,e.Tt);for(const n of e.removedTargetIds)this.Qt(n,e.key,e.Tt)}zt(e){this.forEachTarget(e,n=>{const r=this.jt(n);switch(e.state){case 0:this.Wt(n)&&r.Dt(e.resumeToken);break;case 1:r.$t(),r.Vt||r.xt(),r.Dt(e.resumeToken);break;case 2:r.$t(),r.Vt||this.removeTarget(n);break;case 3:this.Wt(n)&&(r.Mt(),r.Dt(e.resumeToken));break;case 4:this.Wt(n)&&(this.Ht(n),r.Dt(e.resumeToken));break;default:oe()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Bt.forEach((r,s)=>{this.Wt(s)&&n(s)})}Jt(e){var n;const r=e.targetId,s=e.Et.count,i=this.Yt(r);if(i){const o=i.target;if(Bu(o))if(s===0){const a=new Z(o.path);this.Qt(r,a,ht.newNoDocument(a,ue.min()))}else Ce(s===1);else{const a=this.Zt(r);a!==s&&(this.Ht(r),this.Ut=this.Ut.add(r),(n=vf.instance)===null||n===void 0||n.notifyOnExistenceFilterMismatch({localCacheCount:a,existenceFilterCount:e.Et.count}))}}}Xt(e){const n=new Map;this.Bt.forEach((i,o)=>{const a=this.Yt(o);if(a){if(i.current&&Bu(a.target)){const l=new Z(a.target.path);this.Lt.get(l)!==null||this.te(o,l)||this.Qt(o,l,ht.newNoDocument(l,e))}i.St&&(n.set(o,i.Ct()),i.xt())}});let r=de();this.qt.forEach((i,o)=>{let a=!0;o.forEachWhile(l=>{const c=this.Yt(l);return!c||c.purpose===2||(a=!1,!1)}),a&&(r=r.add(i))}),this.Lt.forEach((i,o)=>o.setReadTime(e));const s=new $l(e,n,this.Ut,this.Lt,r);return this.Lt=Mn(),this.qt=pg(),this.Ut=new Ge(Ee),s}Gt(e,n){if(!this.Wt(e))return;const r=this.te(e,n.key)?2:0;this.jt(e).Nt(n.key,r),this.Lt=this.Lt.insert(n.key,n),this.qt=this.qt.insert(n.key,this.ee(n.key).add(e))}Qt(e,n,r){if(!this.Wt(e))return;const s=this.jt(e);this.te(e,n)?s.Nt(n,1):s.kt(n),this.qt=this.qt.insert(n,this.ee(n).delete(e)),r&&(this.Lt=this.Lt.insert(n,r))}removeTarget(e){this.Bt.delete(e)}Zt(e){const n=this.jt(e).Ct();return this.Ft.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ot(e){this.jt(e).Ot()}jt(e){let n=this.Bt.get(e);return n||(n=new dg,this.Bt.set(e,n)),n}ee(e){let n=this.qt.get(e);return n||(n=new Ge(Ee),this.qt=this.qt.insert(e,n)),n}Wt(e){const n=this.Yt(e)!==null;return n||X("WatchChangeAggregator","Detected inactive target",e),n}Yt(e){const n=this.Bt.get(e);return n&&n.Vt?null:this.Ft.ne(e)}Ht(e){this.Bt.set(e,new dg),this.Ft.getRemoteKeysForTarget(e).forEach(n=>{this.Qt(e,n,null)})}te(e,n){return this.Ft.getRemoteKeysForTarget(e).has(n)}}function pg(){return new Qe(Z.comparator)}function gg(){return new Qe(Z.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mP=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),yP=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),_P=(()=>({and:"AND",or:"OR"}))();class vP{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function qa(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Yv(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function wP(t,e){return qa(t,e.toTimestamp())}function dn(t){return Ce(!!t),ue.fromTimestamp(function(e){const n=pr(e);return new Ke(n.seconds,n.nanos)}(t))}function wf(t,e){return function(n){return new Se(["projects",n.projectId,"databases",n.database])}(t).child("documents").child(e).canonicalString()}function Xv(t){const e=Se.fromString(t);return Ce(rw(e)),e}function qu(t,e){return wf(t.databaseId,e.path)}function Pc(t,e){const n=Xv(e);if(n.get(1)!==t.databaseId.projectId)throw new j(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new j(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Z(Zv(n))}function Wu(t,e){return wf(t.databaseId,e)}function EP(t){const e=Xv(t);return e.length===4?Se.emptyPath():Zv(e)}function zu(t){return new Se(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Zv(t){return Ce(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function mg(t,e,n){return{name:qu(t,e),fields:n.value.mapValue.fields}}function bP(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:oe()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(l,c){return l.useProto3Json?(Ce(c===void 0||typeof c=="string"),_t.fromBase64String(c||"")):(Ce(c===void 0||c instanceof Uint8Array),_t.fromUint8Array(c||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(l){const c=l.code===void 0?O.UNKNOWN:Gv(l.code);return new j(c,l.message||"")}(o);n=new Jv(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Pc(t,r.document.name),i=dn(r.document.updateTime),o=r.document.createTime?dn(r.document.createTime):ue.min(),a=new Ft({mapValue:{fields:r.document.fields}}),l=ht.newFoundDocument(s,i,o,a),c=r.targetIds||[],u=r.removedTargetIds||[];n=new aa(c,u,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Pc(t,r.document),i=r.readTime?dn(r.readTime):ue.min(),o=ht.newNoDocument(s,i),a=r.removedTargetIds||[];n=new aa([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Pc(t,r.document),i=r.removedTargetIds||[];n=new aa([],i,s,null)}else{if(!("filter"in e))return oe();{e.filter;const r=e.filter;r.targetId;const s=r.count||0,i=new dP(s),o=r.targetId;n=new Qv(o,i)}}return n}function TP(t,e){let n;if(e instanceof yo)n={update:mg(t,e.key,e.value)};else if(e instanceof Kv)n={delete:qu(t,e.key)};else if(e instanceof Qr)n={update:mg(t,e.key,e.data),updateMask:PP(e.fieldMask)};else{if(!(e instanceof lP))return oe();n={verify:qu(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,i){const o=i.transform;if(o instanceof qi)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof Wi)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof zi)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof ja)return{fieldPath:i.field.canonicalString(),increment:o._t};throw oe()}(0,r))),e.precondition.isNone||(n.currentDocument=function(r,s){return s.updateTime!==void 0?{updateTime:wP(r,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:oe()}(t,e.precondition)),n}function IP(t,e){return t&&t.length>0?(Ce(e!==void 0),t.map(n=>function(r,s){let i=r.updateTime?dn(r.updateTime):dn(s);return i.isEqual(ue.min())&&(i=dn(s)),new iP(i,r.transformResults||[])}(n,e))):[]}function AP(t,e){return{documents:[Wu(t,e.path)]}}function ew(t,e){const n={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(n.parent=Wu(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Wu(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(l){if(l.length!==0)return nw(nn.create(l,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const i=function(l){if(l.length!==0)return l.map(c=>function(u){return{field:Xn(u.field),direction:RP(u.dir)}}(c))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=function(l,c){return l.useProto3Json||Nl(c)?c:{value:c}}(t,e.limit);var a;return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(n.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),n}function SP(t){let e=EP(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Ce(r===1);const u=n.from[0];u.allDescendants?s=u.collectionId:e=e.child(u.collectionId)}let i=[];n.where&&(i=function(u){const h=tw(u);return h instanceof nn&&kv(h)?h.getFilters():[h]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(u=>function(h){return new gs(ts(h.field),function(f){switch(f){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(u)));let a=null;n.limit&&(a=function(u){let h;return h=typeof u=="object"?u.value:u,Nl(h)?null:h}(n.limit));let l=null;n.startAt&&(l=function(u){const h=!!u.before,f=u.values||[];return new Ps(f,h)}(n.startAt));let c=null;return n.endAt&&(c=function(u){const h=!u.before,f=u.values||[];return new Ps(f,h)}(n.endAt)),KO(e,s,o,i,a,"F",l,c)}function CP(t,e){const n=function(r,s){switch(s){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return oe()}}(0,e.purpose);return n==null?null:{"goog-listen-tags":n}}function tw(t){return t.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=ts(e.unaryFilter.field);return We.create(n,"==",{doubleValue:NaN});case"IS_NULL":const r=ts(e.unaryFilter.field);return We.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ts(e.unaryFilter.field);return We.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=ts(e.unaryFilter.field);return We.create(i,"!=",{nullValue:"NULL_VALUE"});default:return oe()}}(t):t.fieldFilter!==void 0?function(e){return We.create(ts(e.fieldFilter.field),function(n){switch(n){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return oe()}}(e.fieldFilter.op),e.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(e){return nn.create(e.compositeFilter.filters.map(n=>tw(n)),function(n){switch(n){case"AND":return"and";case"OR":return"or";default:return oe()}}(e.compositeFilter.op))}(t):oe()}function RP(t){return mP[t]}function kP(t){return yP[t]}function OP(t){return _P[t]}function Xn(t){return{fieldPath:t.canonicalString()}}function ts(t){return pt.fromServerFormat(t.fieldPath)}function nw(t){return t instanceof We?function(e){if(e.op==="=="){if(sg(e.value))return{unaryFilter:{field:Xn(e.field),op:"IS_NAN"}};if(rg(e.value))return{unaryFilter:{field:Xn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(sg(e.value))return{unaryFilter:{field:Xn(e.field),op:"IS_NOT_NAN"}};if(rg(e.value))return{unaryFilter:{field:Xn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Xn(e.field),op:kP(e.op),value:e.value}}}(t):t instanceof nn?function(e){const n=e.getFilters().map(r=>nw(r));return n.length===1?n[0]:{compositeFilter:{op:OP(e.op),filters:n}}}(t):oe()}function PP(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function rw(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e,n,r,s,i=ue.min(),o=ue.min(),a=_t.EMPTY_BYTE_STRING){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a}withSequenceNumber(e){return new Mr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,n){return new Mr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new Mr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DP{constructor(e){this.se=e}}function NP(t){const e=SP({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Ha(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LP{constructor(){this.He=new xP}addToCollectionParentIndex(e,n){return this.He.add(n),U.resolve()}getCollectionParents(e,n){return U.resolve(this.He.getEntries(n))}addFieldIndex(e,n){return U.resolve()}deleteFieldIndex(e,n){return U.resolve()}getDocumentsMatchingTarget(e,n){return U.resolve(null)}getIndexType(e,n){return U.resolve(0)}getFieldIndexes(e,n){return U.resolve([])}getNextCollectionGroupToUpdate(e){return U.resolve(null)}getMinOffset(e,n){return U.resolve(dr.min())}getMinOffsetFromCollectionGroup(e,n){return U.resolve(dr.min())}updateCollectionGroup(e,n,r){return U.resolve()}updateIndexEntries(e,n){return U.resolve()}}class xP{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new Ge(Se.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ge(Se.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e){this.Rn=e}next(){return this.Rn+=2,this.Rn}static vn(){return new Ds(0)}static bn(){return new Ds(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MP{constructor(){this.changes=new qs(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ht.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?U.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FP{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UP{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&Ii(r.mutation,s,Zt.empty(),Ke.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,de()).next(()=>r))}getLocalViewOfDocuments(e,n,r=de()){const s=Pr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=ui();return i.forEach((a,l)=>{o=o.insert(a,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Pr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,de()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,r,s){let i=Mn();const o=Ti(),a=Ti();return n.forEach((l,c)=>{const u=r.get(c.key);s.has(c.key)&&(u===void 0||u.mutation instanceof Qr)?i=i.insert(c.key,c):u!==void 0?(o.set(c.key,u.mutation.getFieldMask()),Ii(u.mutation,c,u.mutation.getFieldMask(),Ke.now())):o.set(c.key,Zt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((c,u)=>o.set(c,u)),n.forEach((c,u)=>{var h;return a.set(c,new FP(u,(h=o.get(c))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,n){const r=Ti();let s=new Qe((o,a)=>o-a),i=de();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(l=>{const c=n.get(l);if(c===null)return;let u=r.get(l)||Zt.empty();u=a.applyToLocalView(c,u),r.set(l,u);const h=(s.get(a.batchId)||de()).add(l);s=s.insert(a.batchId,h)})}).next(()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const l=a.getNext(),c=l.key,u=l.value,h=Fv();u.forEach(f=>{if(!i.has(f)){const p=Wv(n.get(f),r.get(f));p!==null&&h.set(f,p),i=i.add(f)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,h))}return U.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r){return function(s){return Z.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):mf(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r):this.getDocumentsMatchingCollectionQuery(e,n,r)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):U.resolve(Pr());let a=-1,l=i;return o.next(c=>U.forEach(c,(u,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),i.get(u)?U.resolve():this.remoteDocumentCache.getEntry(e,u).next(f=>{l=l.insert(u,f)}))).next(()=>this.populateOverlays(e,c,i)).next(()=>this.computeViews(e,l,c,de())).next(u=>({batchId:a,changes:Mv(u)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new Z(n)).next(r=>{let s=ui();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r){const s=n.collectionGroup;let i=ui();return this.indexManager.getCollectionParents(e,s).next(o=>U.forEach(o,a=>{const l=function(c,u){return new Gr(u,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt)}(n,a.child(s));return this.getDocumentsMatchingCollectionQuery(e,l,r).next(c=>{c.forEach((u,h)=>{i=i.insert(u,h)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s))).next(i=>{s.forEach((a,l)=>{const c=l.getKey();i.get(c)===null&&(i=i.insert(c,ht.newInvalidDocument(c)))});let o=ui();return i.forEach((a,l)=>{const c=s.get(a);c!==void 0&&Ii(c.mutation,l,Zt.empty(),Ke.now()),Ml(n,l)&&(o=o.insert(a,l))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $P{constructor(e){this.serializer=e,this.Zn=new Map,this.Xn=new Map}getBundleMetadata(e,n){return U.resolve(this.Zn.get(n))}saveBundleMetadata(e,n){var r;return this.Zn.set(n.id,{id:(r=n).id,version:r.version,createTime:dn(r.createTime)}),U.resolve()}getNamedQuery(e,n){return U.resolve(this.Xn.get(n))}saveNamedQuery(e,n){return this.Xn.set(n.name,function(r){return{name:r.name,query:NP(r.bundledQuery),readTime:dn(r.readTime)}}(n)),U.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VP{constructor(){this.overlays=new Qe(Z.comparator),this.ts=new Map}getOverlay(e,n){return U.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Pr();return U.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.re(e,n,i)}),U.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.ts.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.ts.delete(r)),U.resolve()}getOverlaysForCollection(e,n,r){const s=Pr(),i=n.length+1,o=new Z(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const l=a.getNext().value,c=l.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return U.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Qe((c,u)=>c-u);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let u=i.get(c.largestBatchId);u===null&&(u=Pr(),i=i.insert(c.largestBatchId,u)),u.set(c.getKey(),c)}}const a=Pr(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((c,u)=>a.set(c,u)),!(a.size()>=s)););return U.resolve(a)}re(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.ts.get(s.largestBatchId).delete(r.key);this.ts.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new uP(n,r));let i=this.ts.get(n);i===void 0&&(i=de(),this.ts.set(n,i)),this.ts.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(){this.es=new Ge(Je.ns),this.ss=new Ge(Je.rs)}isEmpty(){return this.es.isEmpty()}addReference(e,n){const r=new Je(e,n);this.es=this.es.add(r),this.ss=this.ss.add(r)}os(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.us(new Je(e,n))}cs(e,n){e.forEach(r=>this.removeReference(r,n))}hs(e){const n=new Z(new Se([])),r=new Je(n,e),s=new Je(n,e+1),i=[];return this.ss.forEachInRange([r,s],o=>{this.us(o),i.push(o.key)}),i}ls(){this.es.forEach(e=>this.us(e))}us(e){this.es=this.es.delete(e),this.ss=this.ss.delete(e)}fs(e){const n=new Z(new Se([])),r=new Je(n,e),s=new Je(n,e+1);let i=de();return this.ss.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Je(e,0),r=this.es.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Je{constructor(e,n){this.key=e,this.ds=n}static ns(e,n){return Z.comparator(e.key,n.key)||Ee(e.ds,n.ds)}static rs(e,n){return Ee(e.ds,n.ds)||Z.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BP{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.ws=1,this._s=new Ge(Je.ns)}checkEmpty(e){return U.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.ws;this.ws++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new cP(i,n,r,s);this.mutationQueue.push(o);for(const a of s)this._s=this._s.add(new Je(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return U.resolve(o)}lookupMutationBatch(e,n){return U.resolve(this.gs(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.ys(r),i=s<0?0:s;return U.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return U.resolve(this.mutationQueue.length===0?-1:this.ws-1)}getAllMutationBatches(e){return U.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Je(n,0),s=new Je(n,Number.POSITIVE_INFINITY),i=[];return this._s.forEachInRange([r,s],o=>{const a=this.gs(o.ds);i.push(a)}),U.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Ge(Ee);return n.forEach(s=>{const i=new Je(s,0),o=new Je(s,Number.POSITIVE_INFINITY);this._s.forEachInRange([i,o],a=>{r=r.add(a.ds)})}),U.resolve(this.ps(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;Z.isDocumentKey(i)||(i=i.child(""));const o=new Je(new Z(i),0);let a=new Ge(Ee);return this._s.forEachWhile(l=>{const c=l.key.path;return!!r.isPrefixOf(c)&&(c.length===s&&(a=a.add(l.ds)),!0)},o),U.resolve(this.ps(a))}ps(e){const n=[];return e.forEach(r=>{const s=this.gs(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){Ce(this.Is(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this._s;return U.forEach(n.mutations,s=>{const i=new Je(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this._s=r})}En(e){}containsKey(e,n){const r=new Je(n,0),s=this._s.firstAfterOrEqual(r);return U.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,U.resolve()}Is(e,n){return this.ys(e)}ys(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}gs(e){const n=this.ys(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HP{constructor(e){this.Ts=e,this.docs=new Qe(Z.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Ts(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return U.resolve(r?r.document.mutableCopy():ht.newInvalidDocument(n))}getEntries(e,n){let r=Mn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ht.newInvalidDocument(s))}),U.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Mn();const o=n.path,a=new Z(o.child("")),l=this.docs.getIteratorFrom(a);for(;l.hasNext();){const{key:c,value:{document:u}}=l.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||kO(RO(u),r)<=0||(s.has(u.key)||Ml(n,u))&&(i=i.insert(u.key,u.mutableCopy()))}return U.resolve(i)}getAllFromCollectionGroup(e,n,r,s){oe()}Es(e,n){return U.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new jP(this)}getSize(e){return U.resolve(this.size)}}class jP extends MP{constructor(e){super(),this.Jn=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.Jn.addEntry(e,s)):this.Jn.removeEntry(r)}),U.waitFor(n)}getFromCache(e,n){return this.Jn.getEntry(e,n)}getAllFromCache(e,n){return this.Jn.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qP{constructor(e){this.persistence=e,this.As=new qs(n=>ff(n),df),this.lastRemoteSnapshotVersion=ue.min(),this.highestTargetId=0,this.Rs=0,this.vs=new Ef,this.targetCount=0,this.bs=Ds.vn()}forEachTarget(e,n){return this.As.forEach((r,s)=>n(s)),U.resolve()}getLastRemoteSnapshotVersion(e){return U.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return U.resolve(this.Rs)}allocateTargetId(e){return this.highestTargetId=this.bs.next(),U.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Rs&&(this.Rs=n),U.resolve()}Sn(e){this.As.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.bs=new Ds(n),this.highestTargetId=n),e.sequenceNumber>this.Rs&&(this.Rs=e.sequenceNumber)}addTargetData(e,n){return this.Sn(n),this.targetCount+=1,U.resolve()}updateTargetData(e,n){return this.Sn(n),U.resolve()}removeTargetData(e,n){return this.As.delete(n.target),this.vs.hs(n.targetId),this.targetCount-=1,U.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.As.forEach((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.As.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)}),U.waitFor(i).next(()=>s)}getTargetCount(e){return U.resolve(this.targetCount)}getTargetData(e,n){const r=this.As.get(n)||null;return U.resolve(r)}addMatchingKeys(e,n,r){return this.vs.os(n,r),U.resolve()}removeMatchingKeys(e,n,r){this.vs.cs(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),U.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.vs.hs(n),U.resolve()}getMatchingKeysForTargetId(e,n){const r=this.vs.fs(n);return U.resolve(r)}containsKey(e,n){return U.resolve(this.vs.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WP{constructor(e,n){this.Ps={},this.overlays={},this.Vs=new cf(0),this.Ss=!1,this.Ss=!0,this.referenceDelegate=e(this),this.Ds=new qP(this),this.indexManager=new LP,this.remoteDocumentCache=function(r){return new HP(r)}(r=>this.referenceDelegate.Cs(r)),this.serializer=new DP(n),this.xs=new $P(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Ss=!1,Promise.resolve()}get started(){return this.Ss}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new VP,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.Ps[e.toKey()];return r||(r=new BP(n,this.referenceDelegate),this.Ps[e.toKey()]=r),r}getTargetCache(){return this.Ds}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.xs}runTransaction(e,n,r){X("MemoryPersistence","Starting transaction:",e);const s=new zP(this.Vs.next());return this.referenceDelegate.Ns(),r(s).next(i=>this.referenceDelegate.ks(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Os(e,n){return U.or(Object.values(this.Ps).map(r=>()=>r.containsKey(e,n)))}}class zP extends PO{constructor(e){super(),this.currentSequenceNumber=e}}class bf{constructor(e){this.persistence=e,this.$s=new Ef,this.Ms=null}static Fs(e){return new bf(e)}get Bs(){if(this.Ms)return this.Ms;throw oe()}addReference(e,n,r){return this.$s.addReference(r,n),this.Bs.delete(r.toString()),U.resolve()}removeReference(e,n,r){return this.$s.removeReference(r,n),this.Bs.add(r.toString()),U.resolve()}markPotentiallyOrphaned(e,n){return this.Bs.add(n.toString()),U.resolve()}removeTarget(e,n){this.$s.hs(n.targetId).forEach(s=>this.Bs.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Bs.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Ns(){this.Ms=new Set}ks(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return U.forEach(this.Bs,r=>{const s=Z.fromPath(r);return this.Ls(e,s).next(i=>{i||n.removeEntry(s,ue.min())})}).next(()=>(this.Ms=null,n.apply(e)))}updateLimboDocument(e,n){return this.Ls(e,n).next(r=>{r?this.Bs.delete(n.toString()):this.Bs.add(n.toString())})}Cs(e){return 0}Ls(e,n){return U.or([()=>U.resolve(this.$s.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Os(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Vi=r,this.Si=s}static Di(e,n){let r=de(),s=de();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Tf(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KP{constructor(){this.Ci=!1}initialize(e,n){this.xi=e,this.indexManager=n,this.Ci=!0}getDocumentsMatchingQuery(e,n,r,s){return this.Ni(e,n).next(i=>i||this.ki(e,n,s,r)).next(i=>i||this.Oi(e,n))}Ni(e,n){if(lg(n))return U.resolve(null);let r=_n(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Ha(n,null,"F"),r=_n(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=de(...i);return this.xi.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(l=>{const c=this.$i(n,a);return this.Mi(n,c,o,l.readTime)?this.Ni(e,Ha(n,null,"F")):this.Fi(e,c,n,l)}))})))}ki(e,n,r,s){return lg(n)||s.isEqual(ue.min())?this.Oi(e,n):this.xi.getDocuments(e,r).next(i=>{const o=this.$i(n,i);return this.Mi(n,o,r,s)?this.Oi(e,n):(Zp()<=ve.DEBUG&&X("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ju(n)),this.Fi(e,o,n,CO(s,-1)))})}$i(e,n){let r=new Ge(Lv(e));return n.forEach((s,i)=>{Ml(e,i)&&(r=r.add(i))}),r}Mi(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Oi(e,n){return Zp()<=ve.DEBUG&&X("QueryEngine","Using full collection scan to execute query:",ju(n)),this.xi.getDocumentsMatchingQuery(e,n,dr.min())}Fi(e,n,r,s){return this.xi.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GP{constructor(e,n,r,s){this.persistence=e,this.Bi=n,this.serializer=s,this.Li=new Qe(Ee),this.qi=new qs(i=>ff(i),df),this.Ui=new Map,this.Ki=e.getRemoteDocumentCache(),this.Ds=e.getTargetCache(),this.xs=e.getBundleCache(),this.Gi(r)}Gi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new UP(this.Ki,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ki.setIndexManager(this.indexManager),this.Bi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Li))}}function QP(t,e,n,r){return new GP(t,e,n,r)}async function sw(t,e){const n=he(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.Gi(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],a=[];let l=de();for(const c of s){o.push(c.batchId);for(const u of c.mutations)l=l.add(u.key)}for(const c of i){a.push(c.batchId);for(const u of c.mutations)l=l.add(u.key)}return n.localDocuments.getDocuments(r,l).next(c=>({Qi:c,removedBatchIds:o,addedBatchIds:a}))})})}function JP(t,e){const n=he(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.Ki.newChangeBuffer({trackRemovals:!0});return function(o,a,l,c){const u=l.batch,h=u.keys();let f=U.resolve();return h.forEach(p=>{f=f.next(()=>c.getEntry(a,p)).next(y=>{const E=l.docVersions.get(p);Ce(E!==null),y.version.compareTo(E)<0&&(u.applyToRemoteDocument(y,l),y.isValidDocument()&&(y.setReadTime(l.commitVersion),c.addEntry(y)))})}),f.next(()=>o.mutationQueue.removeMutationBatch(a,u))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(o){let a=de();for(let l=0;l<o.mutationResults.length;++l)o.mutationResults[l].transformResults.length>0&&(a=a.add(o.batch.mutations[l].key));return a}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function iw(t){const e=he(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ds.getLastRemoteSnapshotVersion(n))}function YP(t,e){const n=he(t),r=e.snapshotVersion;let s=n.Li;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Ki.newChangeBuffer({trackRemovals:!0});s=n.Li;const a=[];e.targetChanges.forEach((u,h)=>{const f=s.get(h);if(!f)return;a.push(n.Ds.removeMatchingKeys(i,u.removedDocuments,h).next(()=>n.Ds.addMatchingKeys(i,u.addedDocuments,h)));let p=f.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.has(h)?p=p.withResumeToken(_t.EMPTY_BYTE_STRING,ue.min()).withLastLimboFreeSnapshotVersion(ue.min()):u.resumeToken.approximateByteSize()>0&&(p=p.withResumeToken(u.resumeToken,r)),s=s.insert(h,p),function(y,E,b){return y.resumeToken.approximateByteSize()===0||E.snapshotVersion.toMicroseconds()-y.snapshotVersion.toMicroseconds()>=3e8?!0:b.addedDocuments.size+b.modifiedDocuments.size+b.removedDocuments.size>0}(f,p,u)&&a.push(n.Ds.updateTargetData(i,p))});let l=Mn(),c=de();if(e.documentUpdates.forEach(u=>{e.resolvedLimboDocuments.has(u)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,u))}),a.push(XP(i,o,e.documentUpdates).next(u=>{l=u.zi,c=u.ji})),!r.isEqual(ue.min())){const u=n.Ds.getLastRemoteSnapshotVersion(i).next(h=>n.Ds.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(u)}return U.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,l,c)).next(()=>l)}).then(i=>(n.Li=s,i))}function XP(t,e,n){let r=de(),s=de();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=Mn();return n.forEach((a,l)=>{const c=i.get(a);l.isFoundDocument()!==c.isFoundDocument()&&(s=s.add(a)),l.isNoDocument()&&l.version.isEqual(ue.min())?(e.removeEntry(a,l.readTime),o=o.insert(a,l)):!c.isValidDocument()||l.version.compareTo(c.version)>0||l.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(l),o=o.insert(a,l)):X("LocalStore","Ignoring outdated watch update for ",a,". Current version:",c.version," Watch version:",l.version)}),{zi:o,ji:s}})}function ZP(t,e){const n=he(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function eD(t,e){const n=he(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ds.getTargetData(r,e).next(i=>i?(s=i,U.resolve(s)):n.Ds.allocateTargetId(r).next(o=>(s=new Mr(e,o,0,r.currentSequenceNumber),n.Ds.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.Li.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Li=n.Li.insert(r.targetId,r),n.qi.set(e,r.targetId)),r})}async function Ku(t,e,n){const r=he(t),s=r.Li.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!mo(o))throw o;X("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.Li=r.Li.remove(e),r.qi.delete(s.target)}function yg(t,e,n){const r=he(t);let s=ue.min(),i=de();return r.persistence.runTransaction("Execute query","readonly",o=>function(a,l,c){const u=he(a),h=u.qi.get(c);return h!==void 0?U.resolve(u.Li.get(h)):u.Ds.getTargetData(l,c)}(r,o,_n(e)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.Ds.getMatchingKeysForTargetId(o,a.targetId).next(l=>{i=l})}).next(()=>r.Bi.getDocumentsMatchingQuery(o,e,n?s:ue.min(),n?i:de())).next(a=>(tD(r,GO(e),a),{documents:a,Wi:i})))}function tD(t,e,n){let r=t.Ui.get(e)||ue.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.Ui.set(e,r)}class _g{constructor(){this.activeTargetIds=Uv()}tr(e){this.activeTargetIds=this.activeTargetIds.add(e)}er(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Xi(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class nD{constructor(){this.Br=new _g,this.Lr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e){return this.Br.tr(e),this.Lr[e]||"not-current"}updateQueryState(e,n,r){this.Lr[e]=n}removeLocalQueryTarget(e){this.Br.er(e)}isLocalQueryTarget(e){return this.Br.activeTargetIds.has(e)}clearQueryState(e){delete this.Lr[e]}getAllActiveQueryTargets(){return this.Br.activeTargetIds}isActiveQueryTarget(e){return this.Br.activeTargetIds.has(e)}start(){return this.Br=new _g,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rD{qr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(){this.Ur=()=>this.Kr(),this.Gr=()=>this.Qr(),this.zr=[],this.jr()}qr(e){this.zr.push(e)}shutdown(){window.removeEventListener("online",this.Ur),window.removeEventListener("offline",this.Gr)}jr(){window.addEventListener("online",this.Ur),window.addEventListener("offline",this.Gr)}Kr(){X("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.zr)e(0)}Qr(){X("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.zr)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jo=null;function Dc(){return Jo===null?Jo=268435456+Math.round(2147483648*Math.random()):Jo++,"0x"+Jo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sD={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iD{constructor(e){this.Wr=e.Wr,this.Hr=e.Hr}Jr(e){this.Yr=e}Zr(e){this.Xr=e}onMessage(e){this.eo=e}close(){this.Hr()}send(e){this.Wr(e)}no(){this.Yr()}so(e){this.Xr(e)}io(e){this.eo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at="WebChannelConnection";class oD extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.ro=n+"://"+e.host,this.oo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get uo(){return!1}co(e,n,r,s,i){const o=Dc(),a=this.ao(e,n);X("RestConnection",`Sending RPC '${e}' ${o}:`,a,r);const l={};return this.ho(l,s,i),this.lo(e,a,l,r).then(c=>(X("RestConnection",`Received RPC '${e}' ${o}: `,c),c),c=>{throw $a("RestConnection",`RPC '${e}' ${o} failed with error: `,c,"url: ",a,"request:",r),c})}fo(e,n,r,s,i,o){return this.co(e,n,r,s,i)}ho(e,n,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+Hs,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}ao(e,n){const r=sD[e];return`${this.ro}/v1/${n}:${r}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}lo(e,n,r,s){const i=Dc();return new Promise((o,a)=>{const l=new yO;l.setWithCredentials(!0),l.listenOnce(pO.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Oc.NO_ERROR:const u=l.getResponseJson();X(at,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(u)),o(u);break;case Oc.TIMEOUT:X(at,`RPC '${e}' ${i} timed out`),a(new j(O.DEADLINE_EXCEEDED,"Request time out"));break;case Oc.HTTP_ERROR:const h=l.getStatus();if(X(at,`RPC '${e}' ${i} failed with status:`,h,"response text:",l.getResponseText()),h>0){let f=l.getResponseJson();Array.isArray(f)&&(f=f[0]);const p=f==null?void 0:f.error;if(p&&p.status&&p.message){const y=function(E){const b=E.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(b)>=0?b:O.UNKNOWN}(p.status);a(new j(y,p.message))}else a(new j(O.UNKNOWN,"Server responded with status "+l.getStatus()))}else a(new j(O.UNAVAILABLE,"Connection failed."));break;default:oe()}}finally{X(at,`RPC '${e}' ${i} completed.`)}});const c=JSON.stringify(s);X(at,`RPC '${e}' ${i} sending request:`,s),l.send(n,"POST",c,r,15)})}wo(e,n,r){const s=Dc(),i=[this.ro,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=fO(),a=dO(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(l.xmlHttpFactory=new mO({})),this.ho(l.initMessageHeaders,n,r),l.encodeInitMessageHeaders=!0;const c=i.join("");X(at,`Creating RPC '${e}' stream ${s}: ${c}`,l);const u=o.createWebChannel(c,l);let h=!1,f=!1;const p=new iD({Wr:E=>{f?X(at,`Not sending because RPC '${e}' stream ${s} is closed:`,E):(h||(X(at,`Opening RPC '${e}' stream ${s} transport.`),u.open(),h=!0),X(at,`RPC '${e}' stream ${s} sending:`,E),u.send(E))},Hr:()=>u.close()}),y=(E,b,w)=>{E.listen(b,d=>{try{w(d)}catch(g){setTimeout(()=>{throw g},0)}})};return y(u,zo.EventType.OPEN,()=>{f||X(at,`RPC '${e}' stream ${s} transport opened.`)}),y(u,zo.EventType.CLOSE,()=>{f||(f=!0,X(at,`RPC '${e}' stream ${s} transport closed`),p.so())}),y(u,zo.EventType.ERROR,E=>{f||(f=!0,$a(at,`RPC '${e}' stream ${s} transport errored:`,E),p.so(new j(O.UNAVAILABLE,"The operation could not be completed")))}),y(u,zo.EventType.MESSAGE,E=>{var b;if(!f){const w=E.data[0];Ce(!!w);const d=w,g=d.error||((b=d[0])===null||b===void 0?void 0:b.error);if(g){X(at,`RPC '${e}' stream ${s} received error:`,g);const _=g.status;let T=function(C){const A=je[C];if(A!==void 0)return Gv(A)}(_),I=g.message;T===void 0&&(T=O.INTERNAL,I="Unknown error status: "+_+" with message "+g.message),f=!0,p.so(new j(T,I)),u.close()}else X(at,`RPC '${e}' stream ${s} received:`,w),p.io(w)}}),y(a,gO.STAT_EVENT,E=>{E.stat===Yp.PROXY?X(at,`RPC '${e}' stream ${s} detected buffering proxy`):E.stat===Yp.NOPROXY&&X(at,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{p.no()},0),p}}function Nc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vl(t){return new vP(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ow{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Ws=e,this.timerId=n,this._o=r,this.mo=s,this.yo=i,this.po=0,this.Io=null,this.To=Date.now(),this.reset()}reset(){this.po=0}Eo(){this.po=this.yo}Ao(e){this.cancel();const n=Math.floor(this.po+this.Ro()),r=Math.max(0,Date.now()-this.To),s=Math.max(0,n-r);s>0&&X("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.po} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Io=this.Ws.enqueueAfterDelay(this.timerId,s,()=>(this.To=Date.now(),e())),this.po*=this.mo,this.po<this._o&&(this.po=this._o),this.po>this.yo&&(this.po=this.yo)}vo(){this.Io!==null&&(this.Io.skipDelay(),this.Io=null)}cancel(){this.Io!==null&&(this.Io.cancel(),this.Io=null)}Ro(){return(Math.random()-.5)*this.po}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aw{constructor(e,n,r,s,i,o,a,l){this.Ws=e,this.bo=r,this.Po=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=l,this.state=0,this.Vo=0,this.So=null,this.Do=null,this.stream=null,this.Co=new ow(e,n)}xo(){return this.state===1||this.state===5||this.No()}No(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.ko()}async stop(){this.xo()&&await this.close(0)}Oo(){this.state=0,this.Co.reset()}$o(){this.No()&&this.So===null&&(this.So=this.Ws.enqueueAfterDelay(this.bo,6e4,()=>this.Mo()))}Fo(e){this.Bo(),this.stream.send(e)}async Mo(){if(this.No())return this.close(0)}Bo(){this.So&&(this.So.cancel(),this.So=null)}Lo(){this.Do&&(this.Do.cancel(),this.Do=null)}async close(e,n){this.Bo(),this.Lo(),this.Co.cancel(),this.Vo++,e!==4?this.Co.reset():n&&n.code===O.RESOURCE_EXHAUSTED?(xn(n.toString()),xn("Using maximum backoff delay to prevent overloading the backend."),this.Co.Eo()):n&&n.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.qo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zr(n)}qo(){}auth(){this.state=1;const e=this.Uo(this.Vo),n=this.Vo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Vo===n&&this.Ko(r,s)},r=>{e(()=>{const s=new j(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Go(s)})})}Ko(e,n){const r=this.Uo(this.Vo);this.stream=this.Qo(e,n),this.stream.Jr(()=>{r(()=>(this.state=2,this.Do=this.Ws.enqueueAfterDelay(this.Po,1e4,()=>(this.No()&&(this.state=3),Promise.resolve())),this.listener.Jr()))}),this.stream.Zr(s=>{r(()=>this.Go(s))}),this.stream.onMessage(s=>{r(()=>this.onMessage(s))})}ko(){this.state=5,this.Co.Ao(async()=>{this.state=0,this.start()})}Go(e){return X("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Uo(e){return n=>{this.Ws.enqueueAndForget(()=>this.Vo===e?n():(X("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class aD extends aw{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}Qo(e,n){return this.connection.wo("Listen",e,n)}onMessage(e){this.Co.reset();const n=bP(this.serializer,e),r=function(s){if(!("targetChange"in s))return ue.min();const i=s.targetChange;return i.targetIds&&i.targetIds.length?ue.min():i.readTime?dn(i.readTime):ue.min()}(e);return this.listener.zo(n,r)}jo(e){const n={};n.database=zu(this.serializer),n.addTarget=function(s,i){let o;const a=i.target;return o=Bu(a)?{documents:AP(s,a)}:{query:ew(s,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0?o.resumeToken=Yv(s,i.resumeToken):i.snapshotVersion.compareTo(ue.min())>0&&(o.readTime=qa(s,i.snapshotVersion.toTimestamp())),o}(this.serializer,e);const r=CP(this.serializer,e);r&&(n.labels=r),this.Fo(n)}Wo(e){const n={};n.database=zu(this.serializer),n.removeTarget=e,this.Fo(n)}}class lD extends aw{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i,this.Ho=!1}get Jo(){return this.Ho}start(){this.Ho=!1,this.lastStreamToken=void 0,super.start()}qo(){this.Ho&&this.Yo([])}Qo(e,n){return this.connection.wo("Write",e,n)}onMessage(e){if(Ce(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Ho){this.Co.reset();const n=IP(e.writeResults,e.commitTime),r=dn(e.commitTime);return this.listener.Zo(r,n)}return Ce(!e.writeResults||e.writeResults.length===0),this.Ho=!0,this.listener.Xo()}tu(){const e={};e.database=zu(this.serializer),this.Fo(e)}Yo(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>TP(this.serializer,r))};this.Fo(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cD extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.eu=!1}nu(){if(this.eu)throw new j(O.FAILED_PRECONDITION,"The client has already been terminated.")}co(e,n,r){return this.nu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.co(e,n,r,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new j(O.UNKNOWN,s.toString())})}fo(e,n,r,s){return this.nu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.fo(e,n,r,i,o,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new j(O.UNKNOWN,i.toString())})}terminate(){this.eu=!0}}async function uD(t,e,n){const r=he(t),s=function(c,u,h){const f=ew(c,u),p=[];return h.forEach(y=>{y.yt==="count"?p.push({alias:y.alias.canonicalString(),count:{}}):y.yt==="avg"?p.push({alias:y.alias.canonicalString(),avg:{field:Xn(y.fieldPath)}}):y.yt==="sum"&&p.push({alias:y.alias.canonicalString(),sum:{field:Xn(y.fieldPath)}})}),{structuredAggregationQuery:{aggregations:p,structuredQuery:f.structuredQuery},parent:f.parent}}(r.serializer,_n(e),n),i=s.parent;r.connection.uo||delete s.parent;const o=(await r.fo("RunAggregationQuery",i,s,1)).filter(c=>!!c.result);return Ce(o.length===1),(a=o[0]).result,a.result.aggregateFields,new Ft({mapValue:{fields:(l=a.result)===null||l===void 0?void 0:l.aggregateFields}});var a,l}class hD{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.su=0,this.iu=null,this.ru=!0}ou(){this.su===0&&(this.uu("Unknown"),this.iu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.iu=null,this.cu("Backend didn't respond within 10 seconds."),this.uu("Offline"),Promise.resolve())))}au(e){this.state==="Online"?this.uu("Unknown"):(this.su++,this.su>=1&&(this.hu(),this.cu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.uu("Offline")))}set(e){this.hu(),this.su=0,e==="Online"&&(this.ru=!1),this.uu(e)}uu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}cu(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ru?(xn(n),this.ru=!1):X("OnlineStateTracker",n)}hu(){this.iu!==null&&(this.iu.cancel(),this.iu=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fD{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.lu=[],this.fu=new Map,this.du=new Set,this.wu=[],this._u=i,this._u.qr(o=>{r.enqueueAndForget(async()=>{wr(this)&&(X("RemoteStore","Restarting streams for network reachability change."),await async function(a){const l=he(a);l.du.add(4),await vo(l),l.mu.set("Unknown"),l.du.delete(4),await Bl(l)}(this))})}),this.mu=new hD(r,s)}}async function Bl(t){if(wr(t))for(const e of t.wu)await e(!0)}async function vo(t){for(const e of t.wu)await e(!1)}function lw(t,e){const n=he(t);n.fu.has(e.targetId)||(n.fu.set(e.targetId,e),Sf(n)?Af(n):Ws(n).No()&&If(n,e))}function cw(t,e){const n=he(t),r=Ws(n);n.fu.delete(e),r.No()&&uw(n,e),n.fu.size===0&&(r.No()?r.$o():wr(n)&&n.mu.set("Unknown"))}function If(t,e){t.gu.Ot(e.targetId),Ws(t).jo(e)}function uw(t,e){t.gu.Ot(e),Ws(t).Wo(e)}function Af(t){t.gu=new gP({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ne:e=>t.fu.get(e)||null}),Ws(t).start(),t.mu.ou()}function Sf(t){return wr(t)&&!Ws(t).xo()&&t.fu.size>0}function wr(t){return he(t).du.size===0}function hw(t){t.gu=void 0}async function dD(t){t.fu.forEach((e,n)=>{If(t,e)})}async function pD(t,e){hw(t),Sf(t)?(t.mu.au(e),Af(t)):t.mu.set("Unknown")}async function gD(t,e,n){if(t.mu.set("Online"),e instanceof Jv&&e.state===2&&e.cause)try{await async function(r,s){const i=s.cause;for(const o of s.targetIds)r.fu.has(o)&&(await r.remoteSyncer.rejectListen(o,i),r.fu.delete(o),r.gu.removeTarget(o))}(t,e)}catch(r){X("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Wa(t,r)}else if(e instanceof aa?t.gu.Kt(e):e instanceof Qv?t.gu.Jt(e):t.gu.zt(e),!n.isEqual(ue.min()))try{const r=await iw(t.localStore);n.compareTo(r)>=0&&await function(s,i){const o=s.gu.Xt(i);return o.targetChanges.forEach((a,l)=>{if(a.resumeToken.approximateByteSize()>0){const c=s.fu.get(l);c&&s.fu.set(l,c.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach(a=>{const l=s.fu.get(a);if(!l)return;s.fu.set(a,l.withResumeToken(_t.EMPTY_BYTE_STRING,l.snapshotVersion)),uw(s,a);const c=new Mr(l.target,a,1,l.sequenceNumber);If(s,c)}),s.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(r){X("RemoteStore","Failed to raise snapshot:",r),await Wa(t,r)}}async function Wa(t,e,n){if(!mo(e))throw e;t.du.add(1),await vo(t),t.mu.set("Offline"),n||(n=()=>iw(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{X("RemoteStore","Retrying IndexedDB access"),await n(),t.du.delete(1),await Bl(t)})}function fw(t,e){return e().catch(n=>Wa(t,n,e))}async function Hl(t){const e=he(t),n=gr(e);let r=e.lu.length>0?e.lu[e.lu.length-1].batchId:-1;for(;mD(e);)try{const s=await ZP(e.localStore,r);if(s===null){e.lu.length===0&&n.$o();break}r=s.batchId,yD(e,s)}catch(s){await Wa(e,s)}dw(e)&&pw(e)}function mD(t){return wr(t)&&t.lu.length<10}function yD(t,e){t.lu.push(e);const n=gr(t);n.No()&&n.Jo&&n.Yo(e.mutations)}function dw(t){return wr(t)&&!gr(t).xo()&&t.lu.length>0}function pw(t){gr(t).start()}async function _D(t){gr(t).tu()}async function vD(t){const e=gr(t);for(const n of t.lu)e.Yo(n.mutations)}async function wD(t,e,n){const r=t.lu.shift(),s=yf.from(r,e,n);await fw(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Hl(t)}async function ED(t,e){e&&gr(t).Jo&&await async function(n,r){if(s=r.code,pP(s)&&s!==O.ABORTED){const i=n.lu.shift();gr(n).Oo(),await fw(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,r)),await Hl(n)}var s}(t,e),dw(t)&&pw(t)}async function wg(t,e){const n=he(t);n.asyncQueue.verifyOperationInProgress(),X("RemoteStore","RemoteStore received new credentials");const r=wr(n);n.du.add(3),await vo(n),r&&n.mu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.du.delete(3),await Bl(n)}async function bD(t,e){const n=he(t);e?(n.du.delete(2),await Bl(n)):e||(n.du.add(2),await vo(n),n.mu.set("Unknown"))}function Ws(t){return t.yu||(t.yu=function(e,n,r){const s=he(e);return s.nu(),new aD(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{Jr:dD.bind(null,t),Zr:pD.bind(null,t),zo:gD.bind(null,t)}),t.wu.push(async e=>{e?(t.yu.Oo(),Sf(t)?Af(t):t.mu.set("Unknown")):(await t.yu.stop(),hw(t))})),t.yu}function gr(t){return t.pu||(t.pu=function(e,n,r){const s=he(e);return s.nu(),new lD(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{Jr:_D.bind(null,t),Zr:ED.bind(null,t),Xo:vD.bind(null,t),Zo:wD.bind(null,t)}),t.wu.push(async e=>{e?(t.pu.Oo(),await Hl(t)):(await t.pu.stop(),t.lu.length>0&&(X("RemoteStore",`Stopping write stream with ${t.lu.length} pending writes`),t.lu=[]))})),t.pu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new fn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,a=new Cf(e,n,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new j(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Rf(t,e){if(xn("AsyncQueue",`${e}: ${t}`),mo(t))return new j(O.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e){this.comparator=e?(n,r)=>e(n,r)||Z.comparator(n.key,r.key):(n,r)=>Z.comparator(n.key,r.key),this.keyedMap=ui(),this.sortedSet=new Qe(this.comparator)}static emptySet(e){return new ms(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof ms)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new ms;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{constructor(){this.Iu=new Qe(Z.comparator)}track(e){const n=e.doc.key,r=this.Iu.get(n);r?e.type!==0&&r.type===3?this.Iu=this.Iu.insert(n,e):e.type===3&&r.type!==1?this.Iu=this.Iu.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Iu=this.Iu.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Iu=this.Iu.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Iu=this.Iu.remove(n):e.type===1&&r.type===2?this.Iu=this.Iu.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Iu=this.Iu.insert(n,{type:2,doc:e.doc}):oe():this.Iu=this.Iu.insert(n,e)}Tu(){const e=[];return this.Iu.inorderTraversal((n,r)=>{e.push(r)}),e}}class Ns{constructor(e,n,r,s,i,o,a,l,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=l,this.hasCachedResults=c}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new Ns(e,n,ms.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&xl(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TD{constructor(){this.Eu=void 0,this.listeners=[]}}class ID{constructor(){this.queries=new qs(e=>Nv(e),xl),this.onlineState="Unknown",this.Au=new Set}}async function gw(t,e){const n=he(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new TD),s)try{i.Eu=await n.onListen(r)}catch(o){const a=Rf(o,`Initialization of query '${ju(e.query)}' failed`);return void e.onError(a)}n.queries.set(r,i),i.listeners.push(e),e.Ru(n.onlineState),i.Eu&&e.vu(i.Eu)&&kf(n)}async function mw(t,e){const n=he(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),s=i.listeners.length===0)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function AD(t,e){const n=he(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.vu(s)&&(r=!0);o.Eu=s}}r&&kf(n)}function SD(t,e,n){const r=he(t),s=r.queries.get(e);if(s)for(const i of s.listeners)i.onError(n);r.queries.delete(e)}function kf(t){t.Au.forEach(e=>{e.next()})}class yw{constructor(e,n,r){this.query=e,this.bu=n,this.Pu=!1,this.Vu=null,this.onlineState="Unknown",this.options=r||{}}vu(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Ns(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Pu?this.Su(e)&&(this.bu.next(e),n=!0):this.Du(e,this.onlineState)&&(this.Cu(e),n=!0),this.Vu=e,n}onError(e){this.bu.error(e)}Ru(e){this.onlineState=e;let n=!1;return this.Vu&&!this.Pu&&this.Du(this.Vu,e)&&(this.Cu(this.Vu),n=!0),n}Du(e,n){if(!e.fromCache)return!0;const r=n!=="Offline";return(!this.options.xu||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Su(e){if(e.docChanges.length>0)return!0;const n=this.Vu&&this.Vu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Cu(e){e=Ns.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Pu=!0,this.bu.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _w{constructor(e){this.key=e}}class vw{constructor(e){this.key=e}}class CD{constructor(e,n){this.query=e,this.Lu=n,this.qu=null,this.hasCachedResults=!1,this.current=!1,this.Uu=de(),this.mutatedKeys=de(),this.Ku=Lv(e),this.Gu=new ms(this.Ku)}get Qu(){return this.Lu}zu(e,n){const r=n?n.ju:new Eg,s=n?n.Gu:this.Gu;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,a=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,c=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((u,h)=>{const f=s.get(u),p=Ml(this.query,h)?h:null,y=!!f&&this.mutatedKeys.has(f.key),E=!!p&&(p.hasLocalMutations||this.mutatedKeys.has(p.key)&&p.hasCommittedMutations);let b=!1;f&&p?f.data.isEqual(p.data)?y!==E&&(r.track({type:3,doc:p}),b=!0):this.Wu(f,p)||(r.track({type:2,doc:p}),b=!0,(l&&this.Ku(p,l)>0||c&&this.Ku(p,c)<0)&&(a=!0)):!f&&p?(r.track({type:0,doc:p}),b=!0):f&&!p&&(r.track({type:1,doc:f}),b=!0,(l||c)&&(a=!0)),b&&(p?(o=o.add(p),i=E?i.add(u):i.delete(u)):(o=o.delete(u),i=i.delete(u)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const u=this.query.limitType==="F"?o.last():o.first();o=o.delete(u.key),i=i.delete(u.key),r.track({type:1,doc:u})}return{Gu:o,ju:r,Mi:a,mutatedKeys:i}}Wu(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r){const s=this.Gu;this.Gu=e.Gu,this.mutatedKeys=e.mutatedKeys;const i=e.ju.Tu();i.sort((c,u)=>function(h,f){const p=y=>{switch(y){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return oe()}};return p(h)-p(f)}(c.type,u.type)||this.Ku(c.doc,u.doc)),this.Hu(r);const o=n?this.Ju():[],a=this.Uu.size===0&&this.current?1:0,l=a!==this.qu;return this.qu=a,i.length!==0||l?{snapshot:new Ns(this.query,e.Gu,s,i,e.mutatedKeys,a===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),Yu:o}:{Yu:o}}Ru(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Gu:this.Gu,ju:new Eg,mutatedKeys:this.mutatedKeys,Mi:!1},!1)):{Yu:[]}}Zu(e){return!this.Lu.has(e)&&!!this.Gu.has(e)&&!this.Gu.get(e).hasLocalMutations}Hu(e){e&&(e.addedDocuments.forEach(n=>this.Lu=this.Lu.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Lu=this.Lu.delete(n)),this.current=e.current)}Ju(){if(!this.current)return[];const e=this.Uu;this.Uu=de(),this.Gu.forEach(r=>{this.Zu(r.key)&&(this.Uu=this.Uu.add(r.key))});const n=[];return e.forEach(r=>{this.Uu.has(r)||n.push(new vw(r))}),this.Uu.forEach(r=>{e.has(r)||n.push(new _w(r))}),n}Xu(e){this.Lu=e.Wi,this.Uu=de();const n=this.zu(e.documents);return this.applyChanges(n,!0)}tc(){return Ns.fromInitialDocuments(this.query,this.Gu,this.mutatedKeys,this.qu===0,this.hasCachedResults)}}class RD{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class kD{constructor(e){this.key=e,this.ec=!1}}class OD{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.nc={},this.sc=new qs(a=>Nv(a),xl),this.ic=new Map,this.rc=new Set,this.oc=new Qe(Z.comparator),this.uc=new Map,this.cc=new Ef,this.ac={},this.hc=new Map,this.lc=Ds.bn(),this.onlineState="Unknown",this.fc=void 0}get isPrimaryClient(){return this.fc===!0}}async function PD(t,e){const n=BD(t);let r,s;const i=n.sc.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.tc();else{const o=await eD(n.localStore,_n(e));n.isPrimaryClient&&lw(n.remoteStore,o);const a=n.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,s=await DD(n,e,r,a==="current",o.resumeToken)}return s}async function DD(t,e,n,r,s){t.dc=(h,f,p)=>async function(y,E,b,w){let d=E.view.zu(b);d.Mi&&(d=await yg(y.localStore,E.query,!1).then(({documents:T})=>E.view.zu(T,d)));const g=w&&w.targetChanges.get(E.targetId),_=E.view.applyChanges(d,y.isPrimaryClient,g);return Tg(y,E.targetId,_.Yu),_.snapshot}(t,h,f,p);const i=await yg(t.localStore,e,!0),o=new CD(e,i.Wi),a=o.zu(i.documents),l=_o.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),c=o.applyChanges(a,t.isPrimaryClient,l);Tg(t,n,c.Yu);const u=new RD(e,n,o);return t.sc.set(e,u),t.ic.has(n)?t.ic.get(n).push(e):t.ic.set(n,[e]),c.snapshot}async function ND(t,e){const n=he(t),r=n.sc.get(e),s=n.ic.get(r.targetId);if(s.length>1)return n.ic.set(r.targetId,s.filter(i=>!xl(i,e))),void n.sc.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await Ku(n.localStore,r.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(r.targetId),cw(n.remoteStore,r.targetId),Gu(n,r.targetId)}).catch(go)):(Gu(n,r.targetId),await Ku(n.localStore,r.targetId,!0))}async function LD(t,e,n){const r=HD(t);try{const s=await function(i,o){const a=he(i),l=Ke.now(),c=o.reduce((f,p)=>f.add(p.key),de());let u,h;return a.persistence.runTransaction("Locally write mutations","readwrite",f=>{let p=Mn(),y=de();return a.Ki.getEntries(f,c).next(E=>{p=E,p.forEach((b,w)=>{w.isValidDocument()||(y=y.add(b))})}).next(()=>a.localDocuments.getOverlayedDocuments(f,p)).next(E=>{u=E;const b=[];for(const w of o){const d=aP(w,u.get(w.key).overlayedDocument);d!=null&&b.push(new Qr(w.key,d,Sv(d.value.mapValue),kn.exists(!0)))}return a.mutationQueue.addMutationBatch(f,l,b,o)}).next(E=>{h=E;const b=E.applyToLocalDocumentSet(u,y);return a.documentOverlayCache.saveOverlays(f,E.batchId,b)})}).then(()=>({batchId:h.batchId,changes:Mv(u)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(i,o,a){let l=i.ac[i.currentUser.toKey()];l||(l=new Qe(Ee)),l=l.insert(o,a),i.ac[i.currentUser.toKey()]=l}(r,s.batchId,n),await wo(r,s.changes),await Hl(r.remoteStore)}catch(s){const i=Rf(s,"Failed to persist write");n.reject(i)}}async function ww(t,e){const n=he(t);try{const r=await YP(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.uc.get(i);o&&(Ce(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.ec=!0:s.modifiedDocuments.size>0?Ce(o.ec):s.removedDocuments.size>0&&(Ce(o.ec),o.ec=!1))}),await wo(n,r,e)}catch(r){await go(r)}}function bg(t,e,n){const r=he(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.sc.forEach((i,o)=>{const a=o.view.Ru(e);a.snapshot&&s.push(a.snapshot)}),function(i,o){const a=he(i);a.onlineState=o;let l=!1;a.queries.forEach((c,u)=>{for(const h of u.listeners)h.Ru(o)&&(l=!0)}),l&&kf(a)}(r.eventManager,e),s.length&&r.nc.zo(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function xD(t,e,n){const r=he(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.uc.get(e),i=s&&s.key;if(i){let o=new Qe(Z.comparator);o=o.insert(i,ht.newNoDocument(i,ue.min()));const a=de().add(i),l=new $l(ue.min(),new Map,new Ge(Ee),o,a);await ww(r,l),r.oc=r.oc.remove(i),r.uc.delete(e),Of(r)}else await Ku(r.localStore,e,!1).then(()=>Gu(r,e,n)).catch(go)}async function MD(t,e){const n=he(t),r=e.batch.batchId;try{const s=await JP(n.localStore,e);bw(n,r,null),Ew(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await wo(n,s)}catch(s){await go(s)}}async function FD(t,e,n){const r=he(t);try{const s=await function(i,o){const a=he(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let c;return a.mutationQueue.lookupMutationBatch(l,o).next(u=>(Ce(u!==null),c=u.keys(),a.mutationQueue.removeMutationBatch(l,u))).next(()=>a.mutationQueue.performConsistencyCheck(l)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(l,c,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,c)).next(()=>a.localDocuments.getDocuments(l,c))})}(r.localStore,e);bw(r,e,n),Ew(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await wo(r,s)}catch(s){await go(s)}}function Ew(t,e){(t.hc.get(e)||[]).forEach(n=>{n.resolve()}),t.hc.delete(e)}function bw(t,e,n){const r=he(t);let s=r.ac[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.ac[r.currentUser.toKey()]=s}}function Gu(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.ic.get(e))t.sc.delete(r),n&&t.nc.wc(r,n);t.ic.delete(e),t.isPrimaryClient&&t.cc.hs(e).forEach(r=>{t.cc.containsKey(r)||Tw(t,r)})}function Tw(t,e){t.rc.delete(e.path.canonicalString());const n=t.oc.get(e);n!==null&&(cw(t.remoteStore,n),t.oc=t.oc.remove(e),t.uc.delete(n),Of(t))}function Tg(t,e,n){for(const r of n)r instanceof _w?(t.cc.addReference(r.key,e),UD(t,r)):r instanceof vw?(X("SyncEngine","Document no longer in limbo: "+r.key),t.cc.removeReference(r.key,e),t.cc.containsKey(r.key)||Tw(t,r.key)):oe()}function UD(t,e){const n=e.key,r=n.path.canonicalString();t.oc.get(n)||t.rc.has(r)||(X("SyncEngine","New document in limbo: "+n),t.rc.add(r),Of(t))}function Of(t){for(;t.rc.size>0&&t.oc.size<t.maxConcurrentLimboResolutions;){const e=t.rc.values().next().value;t.rc.delete(e);const n=new Z(Se.fromString(e)),r=t.lc.next();t.uc.set(r,new kD(n)),t.oc=t.oc.insert(n,r),lw(t.remoteStore,new Mr(_n(pf(n.path)),r,2,cf.ct))}}async function wo(t,e,n){const r=he(t),s=[],i=[],o=[];r.sc.isEmpty()||(r.sc.forEach((a,l)=>{o.push(r.dc(l,e,n).then(c=>{if((c||n)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(l.targetId,c!=null&&c.fromCache?"not-current":"current"),c){s.push(c);const u=Tf.Di(l.targetId,c);i.push(u)}}))}),await Promise.all(o),r.nc.zo(s),await async function(a,l){const c=he(a);try{await c.persistence.runTransaction("notifyLocalViewChanges","readwrite",u=>U.forEach(l,h=>U.forEach(h.Vi,f=>c.persistence.referenceDelegate.addReference(u,h.targetId,f)).next(()=>U.forEach(h.Si,f=>c.persistence.referenceDelegate.removeReference(u,h.targetId,f)))))}catch(u){if(!mo(u))throw u;X("LocalStore","Failed to update sequence numbers: "+u)}for(const u of l){const h=u.targetId;if(!u.fromCache){const f=c.Li.get(h),p=f.snapshotVersion,y=f.withLastLimboFreeSnapshotVersion(p);c.Li=c.Li.insert(h,y)}}}(r.localStore,i))}async function $D(t,e){const n=he(t);if(!n.currentUser.isEqual(e)){X("SyncEngine","User change. New user:",e.toKey());const r=await sw(n.localStore,e);n.currentUser=e,function(s,i){s.hc.forEach(o=>{o.forEach(a=>{a.reject(new j(O.CANCELLED,i))})}),s.hc.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await wo(n,r.Qi)}}function VD(t,e){const n=he(t),r=n.uc.get(e);if(r&&r.ec)return de().add(r.key);{let s=de();const i=n.ic.get(e);if(!i)return s;for(const o of i){const a=n.sc.get(o);s=s.unionWith(a.view.Qu)}return s}}function BD(t){const e=he(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=ww.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=VD.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=xD.bind(null,e),e.nc.zo=AD.bind(null,e.eventManager),e.nc.wc=SD.bind(null,e.eventManager),e}function HD(t){const e=he(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=MD.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=FD.bind(null,e),e}class Ig{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=Vl(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,n){return null}createIndexBackfillerScheduler(e,n){return null}createLocalStore(e){return QP(this.persistence,new KP,e.initialUser,this.serializer)}createPersistence(e){return new WP(bf.Fs,this.serializer)}createSharedClientState(e){return new nD}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class jD{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>bg(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=$D.bind(null,this.syncEngine),await bD(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new ID}createDatastore(e){const n=Vl(e.databaseInfo.databaseId),r=(s=e.databaseInfo,new oD(s));var s;return function(i,o,a,l){return new cD(i,o,a,l)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return n=this.localStore,r=this.datastore,s=e.asyncQueue,i=a=>bg(this.syncEngine,a,0),o=vg.D()?new vg:new rD,new fD(n,r,s,i,o);var n,r,s,i,o}createSyncEngine(e,n){return function(r,s,i,o,a,l,c){const u=new OD(r,s,i,o,a,l);return c&&(u.fc=!0),u}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(e){const n=he(e);X("RemoteStore","RemoteStore shutting down."),n.du.add(5),await vo(n),n._u.shutdown(),n.mu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iw{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.gc(this.observer.next,e)}error(e){this.observer.error?this.gc(this.observer.error,e):xn("Uncaught Error in snapshot listener:",e.toString())}yc(){this.muted=!0}gc(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qD{constructor(e,n,r,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=ct.UNAUTHENTICATED,this.clientId=Tv.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async i=>{X("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,i=>(X("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new j(O.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new fn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Rf(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Lc(t,e){t.asyncQueue.verifyOperationInProgress(),X("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await sw(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Ag(t,e){t.asyncQueue.verifyOperationInProgress();const n=await zD(t);X("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener(s=>wg(e.remoteStore,s)),t.setAppCheckTokenChangeListener((s,i)=>wg(e.remoteStore,i)),t._onlineComponents=e}function WD(t){return t.name==="FirebaseError"?t.code===O.FAILED_PRECONDITION||t.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&t instanceof DOMException)||t.code===22||t.code===20||t.code===11}async function zD(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){X("FirestoreClient","Using user provided OfflineComponentProvider");try{await Lc(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!WD(n))throw n;$a("Error using user provided cache. Falling back to memory cache: "+n),await Lc(t,new Ig)}}else X("FirestoreClient","Using default OfflineComponentProvider"),await Lc(t,new Ig);return t._offlineComponents}async function jl(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(X("FirestoreClient","Using user provided OnlineComponentProvider"),await Ag(t,t._uninitializedComponentsProvider._online)):(X("FirestoreClient","Using default OnlineComponentProvider"),await Ag(t,new jD))),t._onlineComponents}function KD(t){return jl(t).then(e=>e.remoteStore)}function GD(t){return jl(t).then(e=>e.syncEngine)}function QD(t){return jl(t).then(e=>e.datastore)}async function Aw(t){const e=await jl(t),n=e.eventManager;return n.onListen=PD.bind(null,e.syncEngine),n.onUnlisten=ND.bind(null,e.syncEngine),n}function JD(t,e,n={}){const r=new fn;return t.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,l){const c=new Iw({next:h=>{i.enqueueAndForget(()=>mw(s,u));const f=h.docs.has(o);!f&&h.fromCache?l.reject(new j(O.UNAVAILABLE,"Failed to get document because the client is offline.")):f&&h.fromCache&&a&&a.source==="server"?l.reject(new j(O.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(h)},error:h=>l.reject(h)}),u=new yw(pf(o.path),c,{includeMetadataChanges:!0,xu:!0});return gw(s,u)}(await Aw(t),t.asyncQueue,e,n,r)),r.promise}function YD(t,e,n={}){const r=new fn;return t.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,l){const c=new Iw({next:h=>{i.enqueueAndForget(()=>mw(s,u)),h.fromCache&&a.source==="server"?l.reject(new j(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(h)},error:h=>l.reject(h)}),u=new yw(o,c,{includeMetadataChanges:!0,xu:!0});return gw(s,u)}(await Aw(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sg=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sw(t,e,n){if(!n)throw new j(O.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function XD(t,e,n,r){if(e===!0&&r===!0)throw new j(O.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Cg(t){if(!Z.isDocumentKey(t))throw new j(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Rg(t){if(Z.isDocumentKey(t))throw new j(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function ql(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":oe()}function mr(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new j(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ql(t);throw new j(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function ZD(t,e){if(e<=0)throw new j(O.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(e){var n;if(e.host===void 0){if(e.ssl!==void 0)throw new j(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.cache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new j(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,XD("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new kg({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new j(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new j(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new kg(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new _O;switch(n.type){case"firstParty":return new bO(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new j(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=Sg.get(e);n&&(X("ComponentProvider","Removing Datastore"),Sg.delete(e),n.terminate())}(this),Promise.resolve()}}function Cw(t,e,n,r={}){var s;const i=(t=mr(t,Wl))._getSettings();if(i.host!=="firestore.googleapis.com"&&i.host!==e&&$a("Host has been set in both settings() and useEmulator(), emulator host will be used"),t._setSettings(Object.assign(Object.assign({},i),{host:`${e}:${n}`,ssl:!1})),r.mockUserToken){let o,a;if(typeof r.mockUserToken=="string")o=r.mockUserToken,a=ct.MOCK_USER;else{o=f_(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const l=r.mockUserToken.sub||r.mockUserToken.user_id;if(!l)throw new j(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");a=new ct(l)}t._authCredentials=new vO(new bv(o,a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new cr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Rt(this.firestore,e,this._key)}}class Bn{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Bn(this.firestore,e,this._query)}}class cr extends Bn{constructor(e,n,r){super(e,n,pf(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Rt(this.firestore,null,new Z(e))}withConverter(e){return new cr(this.firestore,e,this._path)}}function PF(t,e,...n){if(t=Le(t),Sw("collection","path",e),t instanceof Wl){const r=Se.fromString(e,...n);return Rg(r),new cr(t,null,r)}{if(!(t instanceof Rt||t instanceof cr))throw new j(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Se.fromString(e,...n));return Rg(r),new cr(t.firestore,null,r)}}function DF(t,e,...n){if(t=Le(t),arguments.length===1&&(e=Tv.A()),Sw("doc","path",e),t instanceof Wl){const r=Se.fromString(e,...n);return Cg(r),new Rt(t,null,new Z(r))}{if(!(t instanceof Rt||t instanceof cr))throw new j(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Se.fromString(e,...n));return Cg(r),new Rt(t.firestore,t instanceof cr?t.converter:null,new Z(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eN{constructor(){this.Nc=Promise.resolve(),this.kc=[],this.Oc=!1,this.$c=[],this.Mc=null,this.Fc=!1,this.Bc=!1,this.Lc=[],this.Co=new ow(this,"async_queue_retry"),this.qc=()=>{const n=Nc();n&&X("AsyncQueue","Visibility state changed to "+n.visibilityState),this.Co.vo()};const e=Nc();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.qc)}get isShuttingDown(){return this.Oc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Uc(),this.Kc(e)}enterRestrictedMode(e){if(!this.Oc){this.Oc=!0,this.Bc=e||!1;const n=Nc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.qc)}}enqueue(e){if(this.Uc(),this.Oc)return new Promise(()=>{});const n=new fn;return this.Kc(()=>this.Oc&&this.Bc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.kc.push(e),this.Gc()))}async Gc(){if(this.kc.length!==0){try{await this.kc[0](),this.kc.shift(),this.Co.reset()}catch(e){if(!mo(e))throw e;X("AsyncQueue","Operation failed with retryable error: "+e)}this.kc.length>0&&this.Co.Ao(()=>this.Gc())}}Kc(e){const n=this.Nc.then(()=>(this.Fc=!0,e().catch(r=>{this.Mc=r,this.Fc=!1;const s=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(r);throw xn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.Fc=!1,r))));return this.Nc=n,n}enqueueAfterDelay(e,n,r){this.Uc(),this.Lc.indexOf(e)>-1&&(n=0);const s=Cf.createAndSchedule(this,e,n,r,i=>this.Qc(i));return this.$c.push(s),s}Uc(){this.Mc&&oe()}verifyOperationInProgress(){}async zc(){let e;do e=this.Nc,await e;while(e!==this.Nc)}jc(e){for(const n of this.$c)if(n.timerId===e)return!0;return!1}Wc(e){return this.zc().then(()=>{this.$c.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.$c)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.zc()})}Hc(e){this.Lc.push(e)}Qc(e){const n=this.$c.indexOf(e);this.$c.splice(n,1)}}class Eo extends Wl{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new eN,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||Rw(this),this._firestoreClient.terminate()}}function tN(t,e){const n=typeof t=="object"?t:yl(),r=typeof t=="string"?t:e||"(default)",s=so(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Mh("firestore");i&&Cw(s,...i)}return s}function zl(t){return t._firestoreClient||Rw(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function Rw(t){var e,n,r;const s=t._freezeSettings(),i=function(o,a,l,c){return new xO(o,a,l,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,c.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._firestoreClient=new qD(t._authCredentials,t._appCheckCredentials,t._queue,i),!((n=s.cache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.cache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.cache.kind,_offline:s.cache._offlineComponentProvider,_online:s.cache._onlineComponentProvider})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nN{constructor(e="count",n){this._aggregateType=e,this._internalFieldPath=n,this.type="AggregateField"}}class rN{constructor(e,n,r){this._userDataWriter=n,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertValue(this._data.value)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ls(_t.fromBase64String(e))}catch(n){throw new j(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Ls(_t.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new j(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new j(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new j(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Ee(this._lat,e._lat)||Ee(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sN=/^__.*__$/;class iN{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Qr(e,this.data,this.fieldMask,n,this.fieldTransforms):new yo(e,this.data,n,this.fieldTransforms)}}function kw(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw oe()}}class Lf{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Jc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Yc(){return this.settings.Yc}Zc(e){return new Lf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Xc(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Zc({path:r,ta:!1});return s.ea(e),s}na(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Zc({path:r,ta:!1});return s.Jc(),s}sa(e){return this.Zc({path:void 0,ta:!0})}ia(e){return za(e,this.settings.methodName,this.settings.ra||!1,this.path,this.settings.oa)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Jc(){if(this.path)for(let e=0;e<this.path.length;e++)this.ea(this.path.get(e))}ea(e){if(e.length===0)throw this.ia("Document fields must not be empty");if(kw(this.Yc)&&sN.test(e))throw this.ia('Document fields cannot begin and end with "__"')}}class oN{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Vl(e)}ua(e,n,r,s=!1){return new Lf({Yc:e,methodName:n,oa:r,path:pt.emptyPath(),ta:!1,ra:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function xf(t){const e=t._freezeSettings(),n=Vl(t._databaseId);return new oN(t._databaseId,!!e.ignoreUndefinedProperties,n)}function aN(t,e,n,r,s,i={}){const o=t.ua(i.merge||i.mergeFields?2:0,e,n,s);Nw("Data must be an object, but it was:",o,r);const a=Pw(r,o);let l,c;if(i.merge)l=new Zt(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const u=[];for(const h of i.mergeFields){const f=lN(e,h,n);if(!o.contains(f))throw new j(O.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);uN(u,f)||u.push(f)}l=new Zt(u),c=o.fieldTransforms.filter(h=>l.covers(h.field))}else l=null,c=o.fieldTransforms;return new iN(new Ft(a),l,c)}class Mf extends Df{_toFieldTransform(e){return new rP(e.path,new qi)}isEqual(e){return e instanceof Mf}}function Ow(t,e,n,r=!1){return Ff(n,t.ua(r?4:3,e))}function Ff(t,e){if(Dw(t=Le(t)))return Nw("Unsupported field value:",e,t),Pw(t,e);if(t instanceof Df)return function(n,r){if(!kw(r.Yc))throw r.ia(`${n._methodName}() can only be used with update() and set()`);if(!r.path)throw r.ia(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(r);s&&r.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.ta&&e.Yc!==4)throw e.ia("Nested arrays are not supported");return function(n,r){const s=[];let i=0;for(const o of n){let a=Ff(o,r.sa(i));a==null&&(a={nullValue:"NULL_VALUE"}),s.push(a),i++}return{arrayValue:{values:s}}}(t,e)}return function(n,r){if((n=Le(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return eP(r.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=Ke.fromDate(n);return{timestampValue:qa(r.serializer,s)}}if(n instanceof Ke){const s=new Ke(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:qa(r.serializer,s)}}if(n instanceof Nf)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ls)return{bytesValue:Yv(r.serializer,n._byteString)};if(n instanceof Rt){const s=r.databaseId,i=n.firestore._databaseId;if(!i.isEqual(s))throw r.ia(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:wf(n.firestore._databaseId||r.databaseId,n._key.path)}}throw r.ia(`Unsupported field value: ${ql(n)}`)}(t,e)}function Pw(t,e){const n={};return Iv(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):js(t,(r,s)=>{const i=Ff(s,e.Xc(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function Dw(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ke||t instanceof Nf||t instanceof Ls||t instanceof Rt||t instanceof Df)}function Nw(t,e,n){if(!Dw(n)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(n)){const r=ql(n);throw r==="an object"?e.ia(t+" a custom object"):e.ia(t+" "+r)}}function lN(t,e,n){if((e=Le(e))instanceof Pf)return e._internalPath;if(typeof e=="string")return Lw(t,e);throw za("Field path arguments must be of type string or ",t,!1,void 0,n)}const cN=new RegExp("[~\\*/\\[\\]]");function Lw(t,e,n){if(e.search(cN)>=0)throw za(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Pf(...e.split("."))._internalPath}catch{throw za(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function za(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new j(O.INVALID_ARGUMENT,a+t+l)}function uN(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Rt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new hN(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Kl("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class hN extends Uf{data(){return super.data()}}function Kl(t,e){return typeof e=="string"?Lw(t,e):e instanceof Pf?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fN(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new j(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class $f{}class Gl extends $f{}function NF(t,e,...n){let r=[];e instanceof $f&&r.push(e),r=r.concat(n),function(s){const i=s.filter(a=>a instanceof To).length,o=s.filter(a=>a instanceof bo).length;if(i>1||i>0&&o>0)throw new j(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class bo extends Gl{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new bo(e,n,r)}_apply(e){const n=this._parse(e);return xw(e._query,n),new Bn(e.firestore,e.converter,Hu(e._query,n))}_parse(e){const n=xf(e.firestore);return function(s,i,o,a,l,c,u){let h;if(l.isKeyField()){if(c==="array-contains"||c==="array-contains-any")throw new j(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${c}' queries on documentId().`);if(c==="in"||c==="not-in"){Pg(u,c);const f=[];for(const p of u)f.push(Og(a,s,p));h={arrayValue:{values:f}}}else h=Og(a,s,u)}else c!=="in"&&c!=="not-in"&&c!=="array-contains-any"||Pg(u,c),h=Ow(o,i,u,c==="in"||c==="not-in");return We.create(l,c,h)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function LF(t,e,n){const r=e,s=Kl("where",t);return bo._create(s,r,n)}class To extends $f{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new To(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:nn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(r,s){let i=r;const o=s.getFlattenedFilters();for(const a of o)xw(i,a),i=Hu(i,a)}(e._query,n),new Bn(e.firestore,e.converter,Hu(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function xF(...t){return t.forEach(e=>pN("or",e)),To._create("or",t)}class Vf extends Gl{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Vf(e,n)}_apply(e){const n=function(r,s,i){if(r.startAt!==null)throw new j(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new j(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const o=new gs(s,i);return function(a,l){if(gf(a)===null){const c=Ll(a);c!==null&&Mw(a,c,l.field)}}(r,o),o}(e._query,this._field,this._direction);return new Bn(e.firestore,e.converter,function(r,s){const i=r.explicitOrderBy.concat([s]);return new Gr(r.path,r.collectionGroup,i,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,n))}}function MF(t,e="asc"){const n=e,r=Kl("orderBy",t);return Vf._create(r,n)}class Bf extends Gl{constructor(e,n,r){super(),this.type=e,this._limit=n,this._limitType=r}static _create(e,n,r){return new Bf(e,n,r)}_apply(e){return new Bn(e.firestore,e.converter,Ha(e._query,this._limit,this._limitType))}}function FF(t){return ZD("limit",t),Bf._create("limit",t,"F")}class Hf extends Gl{constructor(e,n,r){super(),this.type=e,this._docOrFields=n,this._inclusive=r}static _create(e,n,r){return new Hf(e,n,r)}_apply(e){const n=dN(e,this.type,this._docOrFields,this._inclusive);return new Bn(e.firestore,e.converter,function(r,s){return new Gr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,s,r.endAt)}(e._query,n))}}function UF(...t){return Hf._create("startAfter",t,!1)}function dN(t,e,n,r){if(n[0]=Le(n[0]),n[0]instanceof Uf)return function(s,i,o,a,l){if(!a)throw new j(O.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${o}().`);const c=[];for(const u of xr(s))if(u.field.isKeyField())c.push(Ba(i,a.key));else{const h=a.data.field(u.field);if(uf(h))throw new j(O.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+u.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(h===null){const f=u.field.canonicalString();throw new j(O.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${f}' (used as the orderBy) does not exist.`)}c.push(h)}return new Ps(c,l)}(t._query,t.firestore._databaseId,e,n[0]._document,r);{const s=xf(t.firestore);return function(i,o,a,l,c,u){const h=i.explicitOrderBy;if(c.length>h.length)throw new j(O.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const f=[];for(let p=0;p<c.length;p++){const y=c[p];if(h[p].field.isKeyField()){if(typeof y!="string")throw new j(O.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof y}`);if(!mf(i)&&y.indexOf("/")!==-1)throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${y}' contains a slash.`);const E=i.path.child(Se.fromString(y));if(!Z.isDocumentKey(E))throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${E}' is not because it contains an odd number of segments.`);const b=new Z(E);f.push(Ba(o,b))}else{const E=Ow(a,l,y);f.push(E)}}return new Ps(f,u)}(t._query,t.firestore._databaseId,s,e,n,r)}}function Og(t,e,n){if(typeof(n=Le(n))=="string"){if(n==="")throw new j(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!mf(e)&&n.indexOf("/")!==-1)throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Se.fromString(n));if(!Z.isDocumentKey(r))throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ba(t,new Z(r))}if(n instanceof Rt)return Ba(t,n._key);throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ql(n)}.`)}function Pg(t,e){if(!Array.isArray(t)||t.length===0)throw new j(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function xw(t,e){if(e.isInequality()){const r=Ll(t),s=e.field;if(r!==null&&!r.isEqual(s))throw new j(O.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${r.toString()}' and '${s.toString()}'`);const i=gf(t);i!==null&&Mw(t,s,i)}const n=function(r,s){for(const i of r)for(const o of i.getFlattenedFilters())if(s.indexOf(o.op)>=0)return o.op;return null}(t.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new j(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new j(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}function Mw(t,e,n){if(!n.isEqual(e))throw new j(O.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}function pN(t,e){if(!(e instanceof bo||e instanceof To))throw new j(O.INVALID_ARGUMENT,`Function ${t}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class gN{convertValue(e,n="none"){switch(Hr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return qe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Rs(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw oe()}}convertObject(e,n){const r={};return js(e.fields,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertGeoPoint(e){return new Nf(qe(e.latitude),qe(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Av(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Bi(e));default:return null}}convertTimestamp(e){const n=pr(e);return new Ke(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Se.fromString(e);Ce(rw(r));const s=new Hi(r.get(1),r.get(3)),i=new Z(r.popFirst(5));return s.isEqual(n)||xn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mN(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}function yN(){return new nN("count")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Fw extends Uf{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new la(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Kl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class la extends Fw{data(e={}){return super.data(e)}}class _N{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new hi(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new la(this._firestore,this._userDataWriter,r.key,r,new hi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new j(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,s){if(r._snapshot.oldDocs.isEmpty()){let i=0;return r._snapshot.docChanges.map(o=>{const a=new la(r._firestore,r._userDataWriter,o.doc.key,o.doc,new hi(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);return o.doc,{type:"added",doc:a,oldIndex:-1,newIndex:i++}})}{let i=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(o=>s||o.type!==3).map(o=>{const a=new la(r._firestore,r._userDataWriter,o.doc.key,o.doc,new hi(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);let l=-1,c=-1;return o.type!==0&&(l=i.indexOf(o.doc.key),i=i.delete(o.doc.key)),o.type!==1&&(i=i.add(o.doc),c=i.indexOf(o.doc.key)),{type:vN(o.type),doc:a,oldIndex:l,newIndex:c}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function vN(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return oe()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $F(t){t=mr(t,Rt);const e=mr(t.firestore,Eo);return JD(zl(e),t._key).then(n=>EN(e,t,n))}class jf extends gN{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ls(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Rt(this.firestore,null,n)}}function VF(t){t=mr(t,Bn);const e=mr(t.firestore,Eo),n=zl(e),r=new jf(e);return fN(t._query),YD(n,t._query).then(s=>new _N(e,r,t,s))}function BF(t,e,n){t=mr(t,Rt);const r=mr(t.firestore,Eo),s=mN(t.converter,e,n);return wN(r,[aN(xf(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,kn.none())])}function wN(t,e){return function(n,r){const s=new fn;return n.asyncQueue.enqueueAndForget(async()=>LD(await GD(n),r,s)),s.promise}(zl(t),e)}function EN(t,e,n){const r=n.docs.get(e._key),s=new jf(t);return new Fw(t,s,e._key,r,new hi(n.hasPendingWrites,n.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HF(t){return bN(t,{count:yN()})}function bN(t,e){const n=mr(t.firestore,Eo),r=zl(n),s=function(i,o){const a=[];for(const l in i)Object.prototype.hasOwnProperty.call(i,l)&&a.push(o(i[l],l,i));return a}(e,(i,o)=>new fP(new _f(o),i._aggregateType,i._internalFieldPath));return function(i,o,a){const l=new fn;return i.asyncQueue.enqueueAndForget(async()=>{try{if(wr(await KD(i))){const c=await QD(i);l.resolve(uD(c,o,a))}else l.reject(new j(O.UNAVAILABLE,"Failed to get aggregate result because the client is offline."))}catch(c){l.reject(c)}}),l.promise}(r,t._query,s).then(i=>function(o,a,l){const c=new jf(o);return new rN(a,c,l)}(n,t,i))}function jF(){return new Mf("serverTimestamp")}(function(t,e=!0){(function(n){Hs=n})($s),fr(new Nn("firestore",(n,{instanceIdentifier:r,options:s})=>{const i=n.getProvider("app").getImmediate(),o=new Eo(new wO(n.getProvider("auth-internal")),new IO(n.getProvider("app-check-internal")),function(a,l){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new j(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Hi(a.options.projectId,l)}(i,r),i);return s=Object.assign({useFetchStreams:e},s),o._setSettings(s),o},"PUBLIC").setMultipleInstances(!0)),Gt(Xp,"3.10.0",t),Gt(Xp,"3.10.0","esm2017")})();function qf(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Uw(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const TN=Uw,$w=new no("auth","Firebase",Uw());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dg=new Fh("@firebase/auth");function ca(t,...e){Dg.logLevel<=ve.ERROR&&Dg.error(`Auth (${$s}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(t,...e){throw Wf(t,...e)}function pn(t,...e){return Wf(t,...e)}function IN(t,e,n){const r=Object.assign(Object.assign({},TN()),{[e]:n});return new no("auth","Firebase",r).create(e,{appName:t.name})}function Wf(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return $w.create(t,...e)}function ie(t,e,...n){if(!t)throw Wf(e,...n)}function Sn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw ca(e),new Error(e)}function Fn(t,e){t||Sn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ng=new Map;function Cn(t){Fn(t instanceof Function,"Expected a class definition");let e=Ng.get(t);return e?(Fn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Ng.set(t,e),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AN(t,e){const n=so(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Ra(i,e??{}))return s;rn(s,"already-initialized")}return n.initialize({options:e})}function SN(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Cn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qu(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function CN(){return Lg()==="http:"||Lg()==="https:"}function Lg(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RN(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(CN()||LC()||"connection"in navigator)?navigator.onLine:!0}function kN(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,n){this.shortDelay=e,this.longDelay=n,Fn(n>e,"Short delay should be less than long delay!"),this.isMobile=DC()||xC()}get(){return RN()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zf(t,e){Fn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vw{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Sn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Sn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Sn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ON={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PN=new Io(3e4,6e4);function Ao(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function So(t,e,n,r,s={}){return Bw(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=ro(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode),Vw.fetch()(Hw(t,t.config.apiHost,n,a),Object.assign({method:e,headers:l,referrerPolicy:"no-referrer"},i))})}async function Bw(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},ON),e);try{const s=new DN(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Yo(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Yo(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Yo(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw Yo(t,"user-disabled",o);const u=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw IN(t,u,c);rn(t,u)}}catch(s){if(s instanceof sn)throw s;rn(t,"network-request-failed",{message:String(s)})}}async function Co(t,e,n,r,s={}){const i=await So(t,e,n,r,s);return"mfaPendingCredential"in i&&rn(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Hw(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?zf(t.config,s):`${t.config.apiScheme}://${s}`}class DN{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(pn(this.auth,"network-request-failed")),PN.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Yo(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=pn(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NN(t,e){return So(t,"POST","/v1/accounts:delete",e)}async function LN(t,e){return So(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ai(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function xN(t,e=!1){const n=Le(t),r=await n.getIdToken(e),s=Kf(r);ie(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Ai(xc(s.auth_time)),issuedAtTime:Ai(xc(s.iat)),expirationTime:Ai(xc(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function xc(t){return Number(t)*1e3}function Kf(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return ca("JWT malformed, contained fewer than 3 sections"),null;try{const s=c_(n);return s?JSON.parse(s):(ca("Failed to decode base64 JWT payload"),null)}catch(s){return ca("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function MN(t){const e=Kf(t);return ie(e,"internal-error"),ie(typeof e.exp<"u","internal-error"),ie(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ki(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof sn&&FN(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function FN({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UN{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ai(this.lastLoginAt),this.creationTime=Ai(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ka(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Ki(t,LN(n,{idToken:r}));ie(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?BN(i.providerUserInfo):[],a=VN(t.providerData,o),l=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),u=l?c:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new jw(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(t,h)}async function $N(t){const e=Le(t);await Ka(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function VN(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function BN(t){return t.map(e=>{var{providerId:n}=e,r=qf(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HN(t,e){const n=await Bw(t,{},async()=>{const r=ro({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Hw(t,s,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Vw.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ie(e.idToken,"internal-error"),ie(typeof e.idToken<"u","internal-error"),ie(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):MN(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return ie(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await HN(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Gi;return r&&(ie(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(ie(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(ie(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Gi,this.toJSON())}_performRefresh(){return Sn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kn(t,e){ie(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Fr{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=qf(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new UN(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new jw(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Ki(this,this.stsTokenManager.getToken(this.auth,e));return ie(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return xN(this,e)}reload(){return $N(this)}_assign(e){this!==e&&(ie(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Fr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){ie(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ka(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Ki(this,NN(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,a,l,c,u;const h=(r=n.displayName)!==null&&r!==void 0?r:void 0,f=(s=n.email)!==null&&s!==void 0?s:void 0,p=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,y=(o=n.photoURL)!==null&&o!==void 0?o:void 0,E=(a=n.tenantId)!==null&&a!==void 0?a:void 0,b=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,w=(c=n.createdAt)!==null&&c!==void 0?c:void 0,d=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:g,emailVerified:_,isAnonymous:T,providerData:I,stsTokenManager:C}=n;ie(g&&C,e,"internal-error");const A=Gi.fromJSON(this.name,C);ie(typeof g=="string",e,"internal-error"),Kn(h,e.name),Kn(f,e.name),ie(typeof _=="boolean",e,"internal-error"),ie(typeof T=="boolean",e,"internal-error"),Kn(p,e.name),Kn(y,e.name),Kn(E,e.name),Kn(b,e.name),Kn(w,e.name),Kn(d,e.name);const R=new Fr({uid:g,auth:e,email:f,emailVerified:_,displayName:h,isAnonymous:T,photoURL:y,phoneNumber:p,tenantId:E,stsTokenManager:A,createdAt:w,lastLoginAt:d});return I&&Array.isArray(I)&&(R.providerData=I.map(M=>Object.assign({},M))),b&&(R._redirectEventId=b),R}static async _fromIdTokenResponse(e,n,r=!1){const s=new Gi;s.updateFromServerResponse(n);const i=new Fr({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ka(i),i}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}qw.type="NONE";const xg=qw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ua(t,e,n){return`firebase:${t}:${e}:${n}`}class ys{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ua(this.userKey,s.apiKey,i),this.fullPersistenceKey=ua("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Fr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new ys(Cn(xg),e,r);const s=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=s[0]||Cn(xg);const o=ua(r,e.config.apiKey,e.name);let a=null;for(const c of n)try{const u=await c._get(o);if(u){const h=Fr._fromJSON(e,u);c!==i&&(a=h),i=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new ys(i,e,r):(i=l[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new ys(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mg(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Kw(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ww(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Qw(e))return"Blackberry";if(Jw(e))return"Webos";if(Gf(e))return"Safari";if((e.includes("chrome/")||zw(e))&&!e.includes("edge/"))return"Chrome";if(Gw(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Ww(t=yt()){return/firefox\//i.test(t)}function Gf(t=yt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function zw(t=yt()){return/crios\//i.test(t)}function Kw(t=yt()){return/iemobile/i.test(t)}function Gw(t=yt()){return/android/i.test(t)}function Qw(t=yt()){return/blackberry/i.test(t)}function Jw(t=yt()){return/webos/i.test(t)}function Ql(t=yt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function jN(t=yt()){var e;return Ql(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function qN(){return MC()&&document.documentMode===10}function Yw(t=yt()){return Ql(t)||Gw(t)||Jw(t)||Qw(t)||/windows phone/i.test(t)||Kw(t)}function WN(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xw(t,e=[]){let n;switch(t){case"Browser":n=Mg(yt());break;case"Worker":n=`${Mg(yt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${$s}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zN{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,a)=>{try{const l=e(i);o(l)}catch(l){a(l)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KN{constructor(e,n,r){this.app=e,this.heartbeatServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fg(this),this.idTokenSubscription=new Fg(this),this.beforeStateQueue=new zN(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=$w,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Cn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await ys.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return ie(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ka(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=kN()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?Le(e):null;return n&&ie(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&ie(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Cn(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new no("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Cn(e)||this._popupRedirectResolver;ie(n,this,"argument-error"),this.redirectPersistenceManager=await ys.create(this,[Cn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return ie(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,r,s):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ie(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Xw(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return r&&(n["X-Firebase-Client"]=r),n}}function Ro(t){return Le(t)}class Fg{constructor(e){this.auth=e,this.observer=null,this.addObserver=jC(n=>this.observer=n)}get next(){return ie(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function Zw(t,e,n){const r=Ro(t);ie(r._canInitEmulator,r,"emulator-config-failed"),ie(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!(n!=null&&n.disableWarnings),i=eE(e),{host:o,port:a}=GN(e),l=a===null?"":`:${a}`;r.config.emulator={url:`${i}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||QN()}function eE(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function GN(t){const e=eE(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Ug(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Ug(o)}}}function Ug(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function QN(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Sn("not implemented")}_getIdTokenResponse(e){return Sn("not implemented")}_linkToIdToken(e,n){return Sn("not implemented")}_getReauthenticationResolver(e){return Sn("not implemented")}}async function JN(t,e){return So(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YN(t,e){return Co(t,"POST","/v1/accounts:signInWithPassword",Ao(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XN(t,e){return Co(t,"POST","/v1/accounts:signInWithEmailLink",Ao(t,e))}async function ZN(t,e){return Co(t,"POST","/v1/accounts:signInWithEmailLink",Ao(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi extends Qf{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Qi(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Qi(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return YN(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return XN(e,{email:this._email,oobCode:this._password});default:rn(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return JN(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return ZN(e,{idToken:n,email:this._email,oobCode:this._password});default:rn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _s(t,e){return Co(t,"POST","/v1/accounts:signInWithIdp",Ao(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eL="http://localhost";class jr extends Qf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new jr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):rn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=qf(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new jr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return _s(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,_s(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,_s(e,n)}buildRequest(){const e={requestUri:eL,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ro(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tL(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function nL(t){const e=oi(ai(t)).link,n=e?oi(ai(e)).deep_link_id:null,r=oi(ai(t)).deep_link_id;return(r?oi(ai(r)).link:null)||r||n||e||t}class Jf{constructor(e){var n,r,s,i,o,a;const l=oi(ai(e)),c=(n=l.apiKey)!==null&&n!==void 0?n:null,u=(r=l.oobCode)!==null&&r!==void 0?r:null,h=tL((s=l.mode)!==null&&s!==void 0?s:null);ie(c&&u&&h,"argument-error"),this.apiKey=c,this.operation=h,this.code=u,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=nL(e);try{return new Jf(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(){this.providerId=zs.PROVIDER_ID}static credential(e,n){return Qi._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Jf.parseLink(n);return ie(r,"argument-error"),Qi._fromEmailAndCode(e,r.code,r.tenantId)}}zs.PROVIDER_ID="password";zs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";zs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko extends tE{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn extends ko{constructor(){super("facebook.com")}static credential(e){return jr._fromParams({providerId:Zn.PROVIDER_ID,signInMethod:Zn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Zn.credentialFromTaggedObject(e)}static credentialFromError(e){return Zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Zn.credential(e.oauthAccessToken)}catch{return null}}}Zn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Zn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er extends ko{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return jr._fromParams({providerId:er.PROVIDER_ID,signInMethod:er.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return er.credentialFromTaggedObject(e)}static credentialFromError(e){return er.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return er.credential(n,r)}catch{return null}}}er.GOOGLE_SIGN_IN_METHOD="google.com";er.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr extends ko{constructor(){super("github.com")}static credential(e){return jr._fromParams({providerId:tr.PROVIDER_ID,signInMethod:tr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tr.credentialFromTaggedObject(e)}static credentialFromError(e){return tr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return tr.credential(e.oauthAccessToken)}catch{return null}}}tr.GITHUB_SIGN_IN_METHOD="github.com";tr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr extends ko{constructor(){super("twitter.com")}static credential(e,n){return jr._fromParams({providerId:nr.PROVIDER_ID,signInMethod:nr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return nr.credentialFromTaggedObject(e)}static credentialFromError(e){return nr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return nr.credential(n,r)}catch{return null}}}nr.TWITTER_SIGN_IN_METHOD="twitter.com";nr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rL(t,e){return Co(t,"POST","/v1/accounts:signUp",Ao(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Fr._fromIdTokenResponse(e,r,s),o=$g(r);return new qr({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=$g(r);return new qr({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function $g(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga extends sn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ga.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Ga(e,n,r,s)}}function nE(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ga._fromErrorAndOperation(t,i,e,r):i})}async function sL(t,e,n=!1){const r=await Ki(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return qr._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iL(t,e,n=!1){const{auth:r}=t,s="reauthenticate";try{const i=await Ki(t,nE(r,s,e,t),n);ie(i.idToken,r,"internal-error");const o=Kf(i.idToken);ie(o,r,"internal-error");const{sub:a}=o;return ie(t.uid===a,r,"user-mismatch"),qr._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&rn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rE(t,e,n=!1){const r="signIn",s=await nE(t,r,e),i=await qr._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function oL(t,e){return rE(Ro(t),e)}async function qF(t,e,n){const r=Ro(t),s=await rL(r,{returnSecureToken:!0,email:e,password:n}),i=await qr._fromIdTokenResponse(r,"signIn",s);return await r._updateCurrentUser(i.user),i}function WF(t,e,n){return oL(Le(t),zs.credential(e,n))}function aL(t,e,n,r){return Le(t).onIdTokenChanged(e,n,r)}function lL(t,e,n){return Le(t).beforeAuthStateChanged(e,n)}function zF(t,e,n,r){return Le(t).onAuthStateChanged(e,n,r)}function KF(t){return Le(t).signOut()}const Qa="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Qa,"1"),this.storage.removeItem(Qa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cL(){const t=yt();return Gf(t)||Ql(t)}const uL=1e3,hL=10;class iE extends sE{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=cL()&&WN(),this.fallbackToPolling=Yw(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);qN()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,hL):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},uL)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}iE.type="LOCAL";const fL=iE;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE extends sE{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}oE.type="SESSION";const aE=oE;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dL(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Jl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async c=>c(n.origin,i)),l=await dL(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Jl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yf(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pL{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,l)=>{const c=Yf("",20);s.port1.start();const u=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(h){const f=h;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(f.data.response);break;default:clearTimeout(u),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(){return window}function gL(t){gn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lE(){return typeof gn().WorkerGlobalScope<"u"&&typeof gn().importScripts=="function"}async function mL(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function yL(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function _L(){return lE()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cE="firebaseLocalStorageDb",vL=1,Ja="firebaseLocalStorage",uE="fbase_key";class Oo{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Yl(t,e){return t.transaction([Ja],e?"readwrite":"readonly").objectStore(Ja)}function wL(){const t=indexedDB.deleteDatabase(cE);return new Oo(t).toPromise()}function Ju(){const t=indexedDB.open(cE,vL);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ja,{keyPath:uE})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ja)?e(r):(r.close(),await wL(),e(await Ju()))})})}async function Vg(t,e,n){const r=Yl(t,!0).put({[uE]:e,value:n});return new Oo(r).toPromise()}async function EL(t,e){const n=Yl(t,!1).get(e),r=await new Oo(n).toPromise();return r===void 0?null:r.value}function Bg(t,e){const n=Yl(t,!0).delete(e);return new Oo(n).toPromise()}const bL=800,TL=3;class hE{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ju(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>TL)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return lE()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Jl._getInstance(_L()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await mL(),!this.activeServiceWorker)return;this.sender=new pL(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||yL()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ju();return await Vg(e,Qa,"1"),await Bg(e,Qa),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Vg(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>EL(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Bg(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Yl(s,!1).getAll();return new Oo(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),bL)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}hE.type="LOCAL";const IL=hE;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AL(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function SL(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=pn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",AL().appendChild(r)})}function CL(t){return`__${t}${Math.floor(Math.random()*1e6)}`}new Io(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RL(t,e){return e?Cn(e):(ie(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf extends Qf{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return _s(e,this._buildIdpRequest())}_linkToIdToken(e,n){return _s(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return _s(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function kL(t){return rE(t.auth,new Xf(t),t.bypassAuthState)}function OL(t){const{auth:e,user:n}=t;return ie(n,e,"internal-error"),iL(n,new Xf(t),t.bypassAuthState)}async function PL(t){const{auth:e,user:n}=t;return ie(n,e,"internal-error"),sL(n,new Xf(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fE{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return kL;case"linkViaPopup":case"linkViaRedirect":return PL;case"reauthViaPopup":case"reauthViaRedirect":return OL;default:rn(this.auth,"internal-error")}}resolve(e){Fn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Fn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DL=new Io(2e3,1e4);class os extends fE{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,os.currentPopupAction&&os.currentPopupAction.cancel(),os.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ie(e,this.auth,"internal-error"),e}async onExecution(){Fn(this.filter.length===1,"Popup operations only handle one event");const e=Yf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(pn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(pn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,os.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(pn(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,DL.get())};e()}}os.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NL="pendingRedirect",ha=new Map;class LL extends fE{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=ha.get(this.auth._key());if(!e){try{const r=await xL(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}ha.set(this.auth._key(),e)}return this.bypassAuthState||ha.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function xL(t,e){const n=UL(e),r=FL(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function ML(t,e){ha.set(t._key(),e)}function FL(t){return Cn(t._redirectPersistence)}function UL(t){return ua(NL,t.config.apiKey,t.name)}async function $L(t,e,n=!1){const r=Ro(t),s=RL(r,e),o=await new LL(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VL=10*60*1e3;class BL{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!HL(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!dE(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(pn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=VL&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hg(e))}saveEventToCache(e){this.cachedEventUids.add(Hg(e)),this.lastProcessedEventTime=Date.now()}}function Hg(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function dE({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function HL(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return dE(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jL(t,e={}){return So(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qL=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,WL=/^https?/;async function zL(t){if(t.config.emulator)return;const{authorizedDomains:e}=await jL(t);for(const n of e)try{if(KL(n))return}catch{}rn(t,"unauthorized-domain")}function KL(t){const e=Qu(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!WL.test(n))return!1;if(qL.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GL=new Io(3e4,6e4);function jg(){const t=gn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function QL(t){return new Promise((e,n)=>{var r,s,i;function o(){jg(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{jg(),n(pn(t,"network-request-failed"))},timeout:GL.get()})}if(!((s=(r=gn().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=gn().gapi)===null||i===void 0)&&i.load)o();else{const a=CL("iframefcb");return gn()[a]=()=>{gapi.load?o():n(pn(t,"network-request-failed"))},SL(`https://apis.google.com/js/api.js?onload=${a}`).catch(l=>n(l))}}).catch(e=>{throw fa=null,e})}let fa=null;function JL(t){return fa=fa||QL(t),fa}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YL=new Io(5e3,15e3),XL="__/auth/iframe",ZL="emulator/auth/iframe",ex={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},tx=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function nx(t){const e=t.config;ie(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?zf(e,ZL):`https://${t.config.authDomain}/${XL}`,r={apiKey:e.apiKey,appName:t.name,v:$s},s=tx.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${ro(r).slice(1)}`}async function rx(t){const e=await JL(t),n=gn().gapi;return ie(n,t,"internal-error"),e.open({where:document.body,url:nx(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ex,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=pn(t,"network-request-failed"),a=gn().setTimeout(()=>{i(o)},YL.get());function l(){gn().clearTimeout(a),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sx={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ix=500,ox=600,ax="_blank",lx="http://localhost";class qg{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function cx(t,e,n,r=ix,s=ox){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l=Object.assign(Object.assign({},sx),{width:r.toString(),height:s.toString(),top:i,left:o}),c=yt().toLowerCase();n&&(a=zw(c)?ax:n),Ww(c)&&(e=e||lx,l.scrollbars="yes");const u=Object.entries(l).reduce((f,[p,y])=>`${f}${p}=${y},`,"");if(jN(c)&&a!=="_self")return ux(e||"",a),new qg(null);const h=window.open(e||"",a,u);ie(h,t,"popup-blocked");try{h.focus()}catch{}return new qg(h)}function ux(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hx="__/auth/handler",fx="emulator/auth/handler";function Wg(t,e,n,r,s,i){ie(t.config.authDomain,t,"auth-domain-config-required"),ie(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:$s,eventId:s};if(e instanceof tE){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",HC(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[l,c]of Object.entries(i||{}))o[l]=c}if(e instanceof ko){const l=e.getScopes().filter(c=>c!=="");l.length>0&&(o.scopes=l.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const l of Object.keys(a))a[l]===void 0&&delete a[l];return`${dx(t)}?${ro(a).slice(1)}`}function dx({config:t}){return t.emulator?zf(t,fx):`https://${t.authDomain}/${hx}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mc="webStorageSupport";class px{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=aE,this._completeRedirectFn=$L,this._overrideRedirectResult=ML}async _openPopup(e,n,r,s){var i;Fn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=Wg(e,n,r,Qu(),s);return cx(e,o,Yf())}async _openRedirect(e,n,r,s){return await this._originValidation(e),gL(Wg(e,n,r,Qu(),s)),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Fn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await rx(e),r=new BL(e);return n.register("authEvent",s=>(ie(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Mc,{type:Mc},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Mc];o!==void 0&&n(!!o),rn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=zL(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Yw()||Gf()||Ql()}}const gx=px;var zg="@firebase/auth",Kg="0.22.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mx{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ie(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yx(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function _x(t){fr(new Nn("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),{apiKey:i,authDomain:o}=r.options;return((a,l)=>{ie(i&&!i.includes(":"),"invalid-api-key",{appName:a.name}),ie(!(o!=null&&o.includes(":")),"argument-error",{appName:a.name});const c={apiKey:i,authDomain:o,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Xw(t)},u=new KN(a,l,c);return SN(u,n),u})(r,s)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),fr(new Nn("auth-internal",e=>{const n=Ro(e.getProvider("auth").getImmediate());return(r=>new mx(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Gt(zg,Kg,yx(t)),Gt(zg,Kg,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vx=5*60,wx=h_("authIdTokenMaxAge")||vx;let Gg=null;const Ex=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>wx)return;const s=n==null?void 0:n.token;Gg!==s&&(Gg=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function bx(t=yl()){const e=so(t,"auth");if(e.isInitialized())return e.getImmediate();const n=AN(t,{popupRedirectResolver:gx,persistence:[IL,fL,aE]}),r=h_("authTokenSyncURL");if(r){const i=Ex(r);lL(n,i,()=>i(n.currentUser)),aL(n,o=>i(o))}const s=u_("auth");return s&&Zw(n,`http://${s}`),n}_x("Browser");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pE="firebasestorage.googleapis.com",gE="storageBucket",Tx=2*60*1e3,Ix=10*60*1e3,Ax=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe extends sn{constructor(e,n,r=0){super(Fc(e),`Firebase Storage: ${n} (${Fc(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,xe.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Fc(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Oe;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Oe||(Oe={}));function Fc(t){return"storage/"+t}function Zf(){const t="An unknown error occurred, please check the error payload for server response.";return new xe(Oe.UNKNOWN,t)}function Sx(t){return new xe(Oe.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function Cx(t){return new xe(Oe.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Rx(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new xe(Oe.UNAUTHENTICATED,t)}function kx(){return new xe(Oe.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Ox(t){return new xe(Oe.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function mE(){return new xe(Oe.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function yE(){return new xe(Oe.CANCELED,"User canceled the upload/download.")}function Px(t){return new xe(Oe.INVALID_URL,"Invalid URL '"+t+"'.")}function Dx(t){return new xe(Oe.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function Nx(){return new xe(Oe.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+gE+"' property when initializing the app?")}function _E(){return new xe(Oe.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Lx(){return new xe(Oe.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function xx(){return new xe(Oe.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Mx(t){return new xe(Oe.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Yu(t){return new xe(Oe.INVALID_ARGUMENT,t)}function vE(){return new xe(Oe.APP_DELETED,"The Firebase app was deleted.")}function Fx(t){return new xe(Oe.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Si(t,e){return new xe(Oe.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function ti(t){throw new xe(Oe.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=Ut.makeFromUrl(e,n)}catch{return new Ut(e,"")}if(r.path==="")return r;throw Dx(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(_){_.path.charAt(_.path.length-1)==="/"&&(_.path_=_.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+s+o,"i"),l={bucket:1,path:3};function c(_){_.path_=decodeURIComponent(_.path)}const u="v[A-Za-z0-9_]+",h=n.replace(/[.]/g,"\\."),f="(/([^?#]*).*)?$",p=new RegExp(`^https?://${h}/${u}/b/${s}/o${f}`,"i"),y={bucket:1,path:3},E=n===pE?"(?:storage.googleapis.com|storage.cloud.google.com)":n,b="([^?#]*)",w=new RegExp(`^https?://${E}/${s}/${b}`,"i"),g=[{regex:a,indices:l,postModify:i},{regex:p,indices:y,postModify:c},{regex:w,indices:{bucket:1,path:2},postModify:c}];for(let _=0;_<g.length;_++){const T=g[_],I=T.regex.exec(e);if(I){const C=I[T.indices.bucket];let A=I[T.indices.path];A||(A=""),r=new Ut(C,A),T.postModify(r);break}}if(r==null)throw Px(e);return r}}class Ux{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $x(t,e,n){let r=1,s=null,i=null,o=!1,a=0;function l(){return a===2}let c=!1;function u(...b){c||(c=!0,e.apply(null,b))}function h(b){s=setTimeout(()=>{s=null,t(p,l())},b)}function f(){i&&clearTimeout(i)}function p(b,...w){if(c){f();return}if(b){f(),u.call(null,b,...w);return}if(l()||o){f(),u.call(null,b,...w);return}r<64&&(r*=2);let g;a===1?(a=2,g=0):g=(r+Math.random())*1e3,h(g)}let y=!1;function E(b){y||(y=!0,f(),!c&&(s!==null?(b||(a=2),clearTimeout(s),h(0)):b||(a=1)))}return h(0),i=setTimeout(()=>{o=!0,E(!0)},n),E}function Vx(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bx(t){return t!==void 0}function Hx(t){return typeof t=="function"}function jx(t){return typeof t=="object"&&!Array.isArray(t)}function Xl(t){return typeof t=="string"||t instanceof String}function Qg(t){return ed()&&t instanceof Blob}function ed(){return typeof Blob<"u"&&!NC()}function Jg(t,e,n,r){if(r<e)throw Yu(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw Yu(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(t,e,n){let r=e;return n==null&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function wE(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ur;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Ur||(Ur={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EE(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qx{constructor(e,n,r,s,i,o,a,l,c,u,h,f=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=h,this.retry=f,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((p,y)=>{this.resolve_=p,this.reject_=y,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Xo(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const a=i.getErrorCode()===Ur.NO_ERROR,l=i.getStatus();if(!a||EE(l,this.additionalRetryCodes_)&&this.retry){const u=i.getErrorCode()===Ur.ABORT;r(!1,new Xo(!1,null,u));return}const c=this.successCodes_.indexOf(l)!==-1;r(!0,new Xo(c,i))})},n=(r,s)=>{const i=this.resolve_,o=this.reject_,a=s.connection;if(s.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());Bx(l)?i(l):i()}catch(l){o(l)}else if(a!==null){const l=Zf();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(s.canceled){const l=this.appDelete_?vE():yE();o(l)}else{const l=mE();o(l)}};this.canceled_?n(!1,new Xo(!1,null,!0)):this.backoffId_=$x(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Vx(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Xo{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function Wx(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function zx(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Kx(t,e){e&&(t["X-Firebase-GMPID"]=e)}function Gx(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function Qx(t,e,n,r,s,i,o=!0){const a=wE(t.urlParams),l=t.url+a,c=Object.assign({},t.headers);return Kx(c,e),Wx(c,n),zx(c,i),Gx(c,r),new qx(l,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jx(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Yx(...t){const e=Jx();if(e!==void 0){const n=new e;for(let r=0;r<t.length;r++)n.append(t[r]);return n.getBlob()}else{if(ed())return new Blob(t);throw new xe(Oe.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Xx(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zx(t){if(typeof atob>"u")throw Mx("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Uc{constructor(e,n){this.data=e,this.contentType=n||null}}function e1(t,e){switch(t){case hn.RAW:return new Uc(bE(e));case hn.BASE64:case hn.BASE64URL:return new Uc(TE(t,e));case hn.DATA_URL:return new Uc(n1(e),r1(e))}throw Zf()}function bE(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=t.charCodeAt(++n);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function t1(t){let e;try{e=decodeURIComponent(t)}catch{throw Si(hn.DATA_URL,"Malformed data URL.")}return bE(e)}function TE(t,e){switch(t){case hn.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw Si(t,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case hn.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw Si(t,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=Zx(e)}catch(s){throw s.message.includes("polyfill")?s:Si(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class IE{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw Si(hn.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=s1(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function n1(t){const e=new IE(t);return e.base64?TE(hn.BASE64,e.rest):t1(e.rest)}function r1(t){return new IE(t).contentType}function s1(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e,n){let r=0,s="";Qg(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,n){if(Qg(this.data_)){const r=this.data_,s=Xx(r,e,n);return s===null?null:new rr(s)}else{const r=new Uint8Array(this.data_.buffer,e,n-e);return new rr(r,!0)}}static getBlob(...e){if(ed()){const n=e.map(r=>r instanceof rr?r.data_:r);return new rr(Yx.apply(null,n))}else{const n=e.map(o=>Xl(o)?e1(hn.RAW,o).data:o.data_);let r=0;n.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return n.forEach(o=>{for(let a=0;a<o.length;a++)s[i++]=o[a]}),new rr(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AE(t){let e;try{e=JSON.parse(t)}catch{return null}return jx(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i1(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function o1(t,e){const n=e.split("/").filter(r=>r.length>0).join("/");return t.length===0?n:t+"/"+n}function SE(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a1(t,e){return e}class bt{constructor(e,n,r,s){this.server=e,this.local=n||e,this.writable=!!r,this.xform=s||a1}}let Zo=null;function l1(t){return!Xl(t)||t.length<2?t:SE(t)}function CE(){if(Zo)return Zo;const t=[];t.push(new bt("bucket")),t.push(new bt("generation")),t.push(new bt("metageneration")),t.push(new bt("name","fullPath",!0));function e(i,o){return l1(o)}const n=new bt("name");n.xform=e,t.push(n);function r(i,o){return o!==void 0?Number(o):o}const s=new bt("size");return s.xform=r,t.push(s),t.push(new bt("timeCreated")),t.push(new bt("updated")),t.push(new bt("md5Hash",null,!0)),t.push(new bt("cacheControl",null,!0)),t.push(new bt("contentDisposition",null,!0)),t.push(new bt("contentEncoding",null,!0)),t.push(new bt("contentLanguage",null,!0)),t.push(new bt("contentType",null,!0)),t.push(new bt("metadata","customMetadata",!0)),Zo=t,Zo}function c1(t,e){function n(){const r=t.bucket,s=t.fullPath,i=new Ut(r,s);return e._makeStorageReference(i)}Object.defineProperty(t,"ref",{get:n})}function u1(t,e,n){const r={};r.type="file";const s=n.length;for(let i=0;i<s;i++){const o=n[i];r[o.local]=o.xform(r,e[o.server])}return c1(r,t),r}function RE(t,e,n){const r=AE(e);return r===null?null:u1(t,r,n)}function h1(t,e,n,r){const s=AE(e);if(s===null||!Xl(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(c=>{const u=t.bucket,h=t.fullPath,f="/b/"+o(u)+"/o/"+o(h),p=Po(f,n,r),y=wE({alt:"media",token:c});return p+y})[0]}function kE(t,e){const n={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(n[i.server]=t[i.local])}return JSON.stringify(n)}class Ks{constructor(e,n,r,s){this.url=e,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function On(t){if(!t)throw Zf()}function td(t,e){function n(r,s){const i=RE(t,s,e);return On(i!==null),i}return n}function f1(t,e){function n(r,s){const i=RE(t,s,e);return On(i!==null),h1(i,s,t.host,t._protocol)}return n}function Do(t){function e(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=kx():s=Rx():n.getStatus()===402?s=Cx(t.bucket):n.getStatus()===403?s=Ox(t.path):s=r,s.status=n.getStatus(),s.serverResponse=r.serverResponse,s}return e}function OE(t){const e=Do(t);function n(r,s){let i=e(r,s);return r.getStatus()===404&&(i=Sx(t.path)),i.serverResponse=s.serverResponse,i}return n}function d1(t,e,n){const r=e.fullServerUrl(),s=Po(r,t.host,t._protocol),i="GET",o=t.maxOperationRetryTime,a=new Ks(s,i,td(t,n),o);return a.errorHandler=OE(e),a}function p1(t,e,n){const r=e.fullServerUrl(),s=Po(r,t.host,t._protocol),i="GET",o=t.maxOperationRetryTime,a=new Ks(s,i,f1(t,n),o);return a.errorHandler=OE(e),a}function g1(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function PE(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=g1(null,e)),r}function m1(t,e,n,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let g="";for(let _=0;_<2;_++)g=g+Math.random().toString().slice(2);return g}const l=a();o["Content-Type"]="multipart/related; boundary="+l;const c=PE(e,r,s),u=kE(c,n),h="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+u+`\r
--`+l+`\r
Content-Type: `+c.contentType+`\r
\r
`,f=`\r
--`+l+"--",p=rr.getBlob(h,r,f);if(p===null)throw _E();const y={name:c.fullPath},E=Po(i,t.host,t._protocol),b="POST",w=t.maxUploadRetryTime,d=new Ks(E,b,td(t,n),w);return d.urlParams=y,d.headers=o,d.body=p.uploadData(),d.errorHandler=Do(e),d}class Ya{constructor(e,n,r,s){this.current=e,this.total=n,this.finalized=!!r,this.metadata=s||null}}function nd(t,e){let n=null;try{n=t.getResponseHeader("X-Goog-Upload-Status")}catch{On(!1)}return On(!!n&&(e||["active"]).indexOf(n)!==-1),n}function y1(t,e,n,r,s){const i=e.bucketOnlyServerUrl(),o=PE(e,r,s),a={name:o.fullPath},l=Po(i,t.host,t._protocol),c="POST",u={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},h=kE(o,n),f=t.maxUploadRetryTime;function p(E){nd(E);let b;try{b=E.getResponseHeader("X-Goog-Upload-URL")}catch{On(!1)}return On(Xl(b)),b}const y=new Ks(l,c,p,f);return y.urlParams=a,y.headers=u,y.body=h,y.errorHandler=Do(e),y}function _1(t,e,n,r){const s={"X-Goog-Upload-Command":"query"};function i(c){const u=nd(c,["active","final"]);let h=null;try{h=c.getResponseHeader("X-Goog-Upload-Size-Received")}catch{On(!1)}h||On(!1);const f=Number(h);return On(!isNaN(f)),new Ya(f,r.size(),u==="final")}const o="POST",a=t.maxUploadRetryTime,l=new Ks(n,o,i,a);return l.headers=s,l.errorHandler=Do(e),l}const Yg=256*1024;function v1(t,e,n,r,s,i,o,a){const l=new Ya(0,0);if(o?(l.current=o.current,l.total=o.total):(l.current=0,l.total=r.size()),r.size()!==l.total)throw Lx();const c=l.total-l.current;let u=c;s>0&&(u=Math.min(u,s));const h=l.current,f=h+u;let p="";u===0?p="finalize":c===u?p="upload, finalize":p="upload";const y={"X-Goog-Upload-Command":p,"X-Goog-Upload-Offset":`${l.current}`},E=r.slice(h,f);if(E===null)throw _E();function b(_,T){const I=nd(_,["active","final"]),C=l.current+u,A=r.size();let R;return I==="final"?R=td(e,i)(_,T):R=null,new Ya(C,A,I==="final",R)}const w="POST",d=e.maxUploadRetryTime,g=new Ks(n,w,b,d);return g.headers=y,g.body=E.uploadData(),g.progressCallback=a||null,g.errorHandler=Do(t),g}const Ct={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function $c(t){switch(t){case"running":case"pausing":case"canceling":return Ct.RUNNING;case"paused":return Ct.PAUSED;case"success":return Ct.SUCCESS;case"canceled":return Ct.CANCELED;case"error":return Ct.ERROR;default:return Ct.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w1{constructor(e,n,r){if(Hx(e)||n!=null||r!=null)this.next=e,this.error=n??void 0,this.complete=r??void 0;else{const i=e;this.next=i.next,this.error=i.error,this.complete=i.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xr(t){return(...e)=>{Promise.resolve().then(()=>t(...e))}}class E1{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Ur.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Ur.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Ur.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,r,s){if(this.sent_)throw ti("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ti("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ti("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ti("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ti("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class b1 extends E1{initXhr(){this.xhr_.responseType="text"}}function ns(){return new b1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T1{constructor(e,n,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=n,this._metadata=r,this._mappings=CE(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=s=>{if(this._request=void 0,this._chunkMultiplier=1,s._codeEquals(Oe.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const i=this.isExponentialBackoffExpired();if(EE(s.status,[]))if(i)s=mE();else{this.sleepTime=Math.max(this.sleepTime*2,Ax),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=s,this._transition("error")}},this._metadataErrorHandler=s=>{this._request=void 0,s._codeEquals(Oe.CANCELED)?this.completeTransitions_():(this._error=s,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((s,i)=>{this._resolve=s,this._reject=i,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){const e=this._transferred;return n=>this._updateProgress(e+n)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([n,r])=>{switch(this._state){case"running":e(n,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,n)=>{const r=y1(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,ns,e,n);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._uploadUrl=i,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((n,r)=>{const s=_1(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(s,ns,n,r);this._request=i,i.getPromise().then(o=>{o=o,this._request=void 0,this._updateProgress(o.current),this._needToFetchStatus=!1,o.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=Yg*this._chunkMultiplier,n=new Ya(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((s,i)=>{let o;try{o=v1(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,n,this._makeProgressCallback())}catch(l){this._error=l,this._transition("error");return}const a=this._ref.storage._makeRequest(o,ns,s,i,!1);this._request=a,a.getPromise().then(l=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(l.current),l.finalized?(this._metadata=l.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){Yg*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,n)=>{const r=d1(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(r,ns,e,n);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,n)=>{const r=m1(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,ns,e,n);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const n=this._transferred;this._transferred=e,this._transferred!==n&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const n=this._state==="paused";this._state=e,n&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=yE(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=$c(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,n,r,s){const i=new w1(n||void 0,r||void 0,s||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,n){return this._promise.then(e,n)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const n=this._observers.indexOf(e);n!==-1&&this._observers.splice(n,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(n=>{this._notifyObserver(n)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch($c(this._state)){case Ct.SUCCESS:Xr(this._resolve.bind(null,this.snapshot))();break;case Ct.CANCELED:case Ct.ERROR:const n=this._reject;Xr(n.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch($c(this._state)){case Ct.RUNNING:case Ct.PAUSED:e.next&&Xr(e.next.bind(e,this.snapshot))();break;case Ct.SUCCESS:e.complete&&Xr(e.complete.bind(e))();break;case Ct.CANCELED:case Ct.ERROR:e.error&&Xr(e.error.bind(e,this._error))();break;default:e.error&&Xr(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e,n){this._service=e,n instanceof Ut?this._location=n:this._location=Ut.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new Wr(e,n)}get root(){const e=new Ut(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return SE(this._location.path)}get storage(){return this._service}get parent(){const e=i1(this._location.path);if(e===null)return null;const n=new Ut(this._location.bucket,e);return new Wr(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw Fx(e)}}function I1(t,e,n){return t._throwIfRoot("uploadBytesResumable"),new T1(t,new rr(e),n)}function A1(t){t._throwIfRoot("getDownloadURL");const e=p1(t.storage,t._location,CE());return t.storage.makeRequestWithTokens(e,ns).then(n=>{if(n===null)throw xx();return n})}function S1(t,e){const n=o1(t._location.path,e),r=new Ut(t._location.bucket,n);return new Wr(t.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C1(t){return/^[A-Za-z]+:\/\//.test(t)}function R1(t,e){return new Wr(t,e)}function DE(t,e){if(t instanceof rd){const n=t;if(n._bucket==null)throw Nx();const r=new Wr(n,n._bucket);return e!=null?DE(r,e):r}else return e!==void 0?S1(t,e):t}function k1(t,e){if(e&&C1(e)){if(t instanceof rd)return R1(t,e);throw Yu("To use ref(service, url), the first argument must be a Storage instance.")}else return DE(t,e)}function Xg(t,e){const n=e==null?void 0:e[gE];return n==null?null:Ut.makeFromBucketSpec(n,t)}function O1(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:f_(s,t.app.options.projectId))}class rd{constructor(e,n,r,s,i){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=pE,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Tx,this._maxUploadRetryTime=Ix,this._requests=new Set,s!=null?this._bucket=Ut.makeFromBucketSpec(s,this._host):this._bucket=Xg(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Ut.makeFromBucketSpec(this._url,e):this._bucket=Xg(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Jg("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Jg("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Wr(this,e)}_makeRequest(e,n,r,s,i=!0){if(this._deleted)return new Ux(vE());{const o=Qx(e,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const Zg="@firebase/storage",em="0.11.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NE="storage";function GF(t,e,n){return t=Le(t),I1(t,e,n)}function QF(t){return t=Le(t),A1(t)}function JF(t,e){return t=Le(t),k1(t,e)}function P1(t=yl(),e){t=Le(t);const r=so(t,NE).getImmediate({identifier:e}),s=Mh("storage");return s&&LE(r,...s),r}function LE(t,e,n,r={}){O1(t,e,n,r)}function D1(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new rd(n,r,s,e,$s)}function N1(){fr(new Nn(NE,D1,"PUBLIC").setMultipleInstances(!0)),Gt(Zg,em,""),Gt(Zg,em,"esm2017")}N1();const L1=Qt(()=>{const t=dl().public,e={apiKey:t.FIREBASE_API_KEY,authDomain:t.FIREBASE_AUTH_DOMAIN,projectId:t.FIREBASE_PROJECT_ID,storageBucket:t.FIREBASE_STORAGE_BUCKET,messagingSenderId:t.FIREBASE_MESSAGING_SENDERID,appId:t.FIREBASE_APPID},n=g_(e),r=t.ENV==="local";if(console.log("isEmulating=",r),r){const s=bx();Zw(s,"http://"+t.FIREBASE_LOCAL_HOST+":"+t.FIREBASE_LOCAL_AUTH_PORT);const i=tN();Cw(i,t.FIREBASE_LOCAL_HOST,t.FIREBASE_LOCAL_FIRESTORE_PORT);const o=gk(n,"asia-northeast1");v_(o,t.FIREBASE_LOCAL_HOST,t.FIREBASE_LOCAL_FUNCTION_PORT);const a=P1();LE(a,t.FIREBASE_LOCAL_HOST,t.FIREBASE_LOCAL_STORAGE_PORT)}return{provide:{firebaseApp:n}}});/**
 * @license MIT
 * @module @whoj/utils-core@1.7.5
 * @copyright (c) 2023 Jonson B.
 */const x1=typeof window<"u";new Set("0123456789");var tm=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function YF(t){if(t.__esModule)return t;var e=t.default;if(typeof e=="function"){var n=function r(){if(this instanceof r){var s=[null];s.push.apply(s,arguments);var i=Function.bind.apply(e,s);return new i}return e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach(function(r){var s=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:function(){return t[r]}})}),n}function M1(t){if(x1){let e=document.querySelector('link[id="theme-link"]');e||(e=document.createElement("link"),e.id="theme-link",e.rel="stylesheet",document.head.appendChild(e)),e.href=`/themes/${t}/theme.css`}}let Xu;function F1(t){t.addEventListener("mousedown",xE)}function U1(t){t.removeEventListener("mousedown",xE)}function $1(t){let e=document.createElement("span");e.className="p-ink",e.setAttribute("role","presentation"),e.setAttribute("aria-hidden","true"),t.appendChild(e),e.addEventListener("animationend",ME)}function V1(t){let e=FE(t);e&&(U1(t),e.removeEventListener("animationend",ME),e.remove())}function xE(t){let e=t.currentTarget,n=FE(e);if(!n||getComputedStyle(n,null).display==="none")return;if(G.removeClass(n,"p-ink-active"),!G.getHeight(n)&&!G.getWidth(n)){let o=Math.max(G.getOuterWidth(e),G.getOuterHeight(e));n.style.height=o+"px",n.style.width=o+"px"}let r=G.getOffset(e),s=t.pageX-r.left+document.body.scrollTop-G.getWidth(n)/2,i=t.pageY-r.top+document.body.scrollLeft-G.getHeight(n)/2;n.style.top=i+"px",n.style.left=s+"px",G.addClass(n,"p-ink-active"),Xu=setTimeout(()=>{n&&G.removeClass(n,"p-ink-active")},401)}function ME(t){Xu&&clearTimeout(Xu),G.removeClass(t.currentTarget,"p-ink-active")}function FE(t){for(let e=0;e<t.children.length;e++)if(typeof t.children[e].className=="string"&&t.children[e].className.indexOf("p-ink")!==-1)return t.children[e];return null}const B1={mounted(t,e){e.instance.$primevue&&e.instance.$primevue.config&&e.instance.$primevue.config.ripple&&($1(t),F1(t))},unmounted(t){V1(t)}};function Vc(t){t.$_ptooltipModifiers.focus?(t.addEventListener("focus",VE),t.addEventListener("blur",BE)):(t.addEventListener("mouseenter",UE),t.addEventListener("mouseleave",$E),t.addEventListener("click",HE)),t.addEventListener("keydown",jE)}function Bc(t){t.$_ptooltipModifiers.focus?(t.removeEventListener("focus",VE),t.removeEventListener("blur",BE)):(t.removeEventListener("mouseenter",UE),t.removeEventListener("mouseleave",$E),t.removeEventListener("click",HE)),t.removeEventListener("keydown",jE)}function H1(t){t.$_ptooltipScrollHandler||(t.$_ptooltipScrollHandler=new fC(t,function(){Gs(t)})),t.$_ptooltipScrollHandler.bindScrollListener()}function j1(t){t.$_ptooltipScrollHandler&&t.$_ptooltipScrollHandler.unbindScrollListener()}function UE(t){qE(t.currentTarget)}function $E(t){Gs(t.currentTarget)}function VE(t){qE(t.currentTarget)}function BE(t){Gs(t.currentTarget)}function HE(t){Gs(t.currentTarget)}function jE(t){t.code==="Escape"&&Gs(t.currentTarget)}function qE(t){if(t.$_ptooltipDisabled)return;let e=q1(t);W1(t),G.fadeIn(e,250),window.addEventListener("resize",function n(){G.isTouchDevice()||Gs(t),this.removeEventListener("resize",n)}),H1(t),o_.set("tooltip",e,t.$_ptooltipZIndex)}function Gs(t){WE(t),j1(t)}function Jr(t){return document.getElementById(t.$_ptooltipId)}function q1(t){const e=t.$_ptooltipIdAttr!==""?t.$_ptooltipIdAttr:i_()+"_tooltip";t.$_ptooltipId=e;let n=document.createElement("div");n.id=e;let r=document.createElement("div");r.className="p-tooltip-arrow",n.appendChild(r);let s=document.createElement("div");return s.className="p-tooltip-text",t.$_ptooltipEscape?s.innerHTML=t.$_ptooltipValue:(s.innerHTML="",s.appendChild(document.createTextNode(t.$_ptooltipValue))),n.setAttribute("role","tooltip"),n.appendChild(s),document.body.appendChild(n),n.style.display="inline-block",t.$_ptooltipFitContent&&(n.style.width="fit-content"),n}function WE(t){if(t){let e=Jr(t);e&&e.parentElement&&(o_.clear(e),document.body.removeChild(e)),t.$_ptooltipId=null}}function W1(t){const e=t.$_ptooltipModifiers;e.top?(ni(t),jt(t)&&(ri(t),jt(t)&&ni(t))):e.left?(jc(t),jt(t)&&(Hc(t),jt(t)&&(ni(t),jt(t)&&(ri(t),jt(t)&&jc(t))))):e.bottom?(ri(t),jt(t)&&(ni(t),jt(t)&&ri(t))):(Hc(t),jt(t)&&(jc(t),jt(t)&&(ni(t),jt(t)&&(ri(t),jt(t)&&Hc(t)))))}function Zl(t){let e=t.getBoundingClientRect(),n=e.left+G.getWindowScrollLeft(),r=e.top+G.getWindowScrollTop();return{left:n,top:r}}function Hc(t){ec(t,"right");let e=Jr(t),n=Zl(t),r=n.left+G.getOuterWidth(t),s=n.top+(G.getOuterHeight(t)-G.getOuterHeight(e))/2;e.style.left=r+"px",e.style.top=s+"px"}function jc(t){ec(t,"left");let e=Jr(t),n=Zl(t),r=n.left-G.getOuterWidth(e),s=n.top+(G.getOuterHeight(t)-G.getOuterHeight(e))/2;e.style.left=r+"px",e.style.top=s+"px"}function ni(t){ec(t,"top");let e=Jr(t),n=Zl(t),r=n.left+(G.getOuterWidth(t)-G.getOuterWidth(e))/2,s=n.top-G.getOuterHeight(e);e.style.left=r+"px",e.style.top=s+"px"}function ri(t){ec(t,"bottom");let e=Jr(t),n=Zl(t),r=n.left+(G.getOuterWidth(t)-G.getOuterWidth(e))/2,s=n.top+G.getOuterHeight(t);e.style.left=r+"px",e.style.top=s+"px"}function ec(t,e){let n=Jr(t);n.style.left="-999px",n.style.top="-999px",n.className=`p-tooltip p-component p-tooltip-${e} ${t.$_ptooltipClass||""}`}function jt(t){let e=Jr(t),n=e.getBoundingClientRect(),r=n.top,s=n.left,i=G.getOuterWidth(e),o=G.getOuterHeight(e),a=G.getViewport();return s+i>a.width||s<0||r<0||r+o>a.height}function qc(t){return G.hasClass(t,"p-inputwrapper")?G.findSingle(t,"input"):t}function nm(t){return t.modifiers&&Object.keys(t.modifiers).length?t.modifiers:t.arg&&typeof t.arg=="object"?Object.entries(t.arg).reduce((e,[n,r])=>((n==="event"||n==="position")&&(e[r]=!0),e),{}):{}}const z1={beforeMount(t,e){let n=qc(t);if(n.$_ptooltipModifiers=nm(e),e.value){if(typeof e.value=="string")n.$_ptooltipValue=e.value,n.$_ptooltipDisabled=!1,n.$_ptooltipEscape=!1,n.$_ptooltipClass=null,n.$_ptooltipFitContent=!0,n.$_ptooltipIdAttr="";else if(typeof e.value=="object"&&e.value){if(lt.isEmpty(e.value.value)||e.value.value.trim()==="")return;n.$_ptooltipValue=e.value.value,n.$_ptooltipDisabled=!!e.value.disabled===e.value.disabled?e.value.disabled:!1,n.$_ptooltipEscape=!!e.value.escape===e.value.escape?e.value.escape:!1,n.$_ptooltipClass=e.value.class,n.$_ptooltipFitContent=!!e.value.fitContent===e.value.fitContent?e.value.fitContent:!0,n.$_ptooltipIdAttr=e.value.id||""}}else return;n.$_ptooltipZIndex=e.instance.$primevue&&e.instance.$primevue.config&&e.instance.$primevue.config.zIndex.tooltip,Vc(n)},unmounted(t){let e=qc(t);WE(e),Bc(e),e.$_ptooltipScrollHandler&&(e.$_ptooltipScrollHandler.destroy(),e.$_ptooltipScrollHandler=null)},updated(t,e){let n=qc(t);if(n.$_ptooltipModifiers=nm(e),!e.value){Bc(n);return}if(typeof e.value=="string")n.$_ptooltipValue=e.value,n.$_ptooltipDisabled=!1,n.$_ptooltipEscape=!1,n.$_ptooltipClass=null,n.$_ptooltipIdAttr="",Vc(n);else if(typeof e.value=="object"&&e.value)if(lt.isEmpty(e.value.value)||e.value.value.trim()===""){Bc(n);return}else n.$_ptooltipValue=e.value.value,n.$_ptooltipDisabled=!!e.value.disabled===e.value.disabled?e.value.disabled:!1,n.$_ptooltipEscape=!!e.value.escape===e.value.escape?e.value.escape:!1,n.$_ptooltipClass=e.value.class,n.$_ptooltipFitContent=!!e.value.fitContent===e.value.fitContent?e.value.fitContent:!0,n.$_ptooltipIdAttr=e.value.id||"",Vc(n)}};function K1(t,e){t.$_pstyleclass_clicklistener=()=>{const n=J1(t,e);e.value.toggleClass?G.hasClass(n,e.value.toggleClass)?G.removeClass(n,e.value.toggleClass):G.addClass(n,e.value.toggleClass):n.offsetParent===null?Q1(n,t,e):zE(n,e)},t.addEventListener("click",t.$_pstyleclass_clicklistener)}function G1(t){t.$_pstyleclass_clicklistener&&(t.removeEventListener("click",t.$_pstyleclass_clicklistener),t.$_pstyleclass_clicklistener=null),sd(t)}function Q1(t,e,n){n.value.enterActiveClass?t.$_pstyleclass_animating||(t.$_pstyleclass_animating=!0,n.value.enterActiveClass==="slidedown"&&(t.style.height="0px",G.removeClass(t,"hidden"),t.style.maxHeight=t.scrollHeight+"px",G.addClass(t,"hidden"),t.style.height=""),G.addClass(t,n.value.enterActiveClass),n.value.enterClass&&G.removeClass(t,n.value.enterClass),t.$p_styleclass_enterlistener=()=>{G.removeClass(t,n.value.enterActiveClass),n.value.enterToClass&&G.addClass(t,n.value.enterToClass),t.removeEventListener("animationend",t.$p_styleclass_enterlistener),n.value.enterActiveClass==="slidedown"&&(t.style.maxHeight=""),t.$_pstyleclass_animating=!1},t.addEventListener("animationend",t.$p_styleclass_enterlistener)):(n.value.enterClass&&G.removeClass(t,n.value.enterClass),n.value.enterToClass&&G.addClass(t,n.value.enterToClass)),n.value.hideOnOutsideClick&&Y1(t,e,n)}function zE(t,e){e.value.leaveActiveClass?t.$_pstyleclass_animating||(t.$_pstyleclass_animating=!0,G.addClass(t,e.value.leaveActiveClass),e.value.leaveClass&&G.removeClass(t,e.value.leaveClass),t.$p_styleclass_leavelistener=()=>{G.removeClass(t,e.value.leaveActiveClass),e.value.leaveToClass&&G.addClass(t,e.value.leaveToClass),t.removeEventListener("animationend",t.$p_styleclass_leavelistener),t.$_pstyleclass_animating=!1},t.addEventListener("animationend",t.$p_styleclass_leavelistener)):(e.value.leaveClass&&G.removeClass(t,e.value.leaveClass),e.value.leaveToClass&&G.addClass(t,e.value.leaveToClass)),e.value.hideOnOutsideClick&&sd(t)}function J1(t,e){switch(e.value.selector){case"@next":return t.nextElementSibling;case"@prev":return t.previousElementSibling;case"@parent":return t.parentElement;case"@grandparent":return t.parentElement.parentElement;default:return document.querySelector(e.value.selector)}}function Y1(t,e,n){t.$p_styleclass_documentlistener||(t.$p_styleclass_documentlistener=r=>{!X1(t)||getComputedStyle(t).getPropertyValue("position")==="static"?sd(t):Z1(r,t,e)&&zE(t,n)},t.ownerDocument.addEventListener("click",t.$p_styleclass_documentlistener))}function sd(t){t.$p_styleclass_documentlistener&&(t.ownerDocument.removeEventListener("click",t.$p_styleclass_documentlistener),t.$p_styleclass_documentlistener=null)}function X1(t){return t.offsetParent!==null}function Z1(t,e,n){return!n.isSameNode(t.target)&&!n.contains(t.target)&&!e.contains(t.target)}const eM={mounted(t,e){K1(t,e)},unmounted(t){G1(t)}};var Wc=s_();const tM=Symbol();var nM={install:t=>{const e={add:n=>{Wc.emit("add",n)},removeGroup:n=>{Wc.emit("remove-group",n)},removeAllGroups:()=>{Wc.emit("remove-all-groups")}};t.config.globalProperties.$toast=e,t.provide(tM,e)}};const rM={mounted(t,e){const n=i_()+"_badge";t.$_pbadgeId=n;let r=document.createElement("span");r.id=n,r.className="p-badge p-component";for(let s in e.modifiers)G.addClass(r,"p-badge-"+s);e.value!=null?(r.appendChild(document.createTextNode(e.value)),String(e.value).length===1&&G.addClass(r,"p-badge-no-gutter")):G.addClass(r,"p-badge-dot"),G.addClass(t,"p-overlay-badge"),t.appendChild(r)},updated(t,e){if(G.addClass(t,"p-overlay-badge"),e.oldValue!==e.value){let n=document.getElementById(t.$_pbadgeId);e.value?(G.hasClass(n,"p-badge-dot")&&G.removeClass(n,"p-badge-dot"),String(e.value).length===1?G.addClass(n,"p-badge-no-gutter"):G.removeClass(n,"p-badge-no-gutter")):!e.value&&!G.hasClass(n,"p-badge-dot")&&G.addClass(n,"p-badge-dot"),n.innerHTML="",n.appendChild(document.createTextNode(e.value))}}};var rm=s_();const sM=Symbol();var iM={install:t=>{const e={require:n=>{rm.emit("confirm",n)},close:()=>{rm.emit("close")}};t.config.globalProperties.$confirm=e,t.provide(sM,e)}};function oM(t){return Em()?(hb(t),!0):!1}function aM(t){let e=!1,n;const r=wm(!0);return(...s)=>(e||(n=r.run(()=>t(...s)),e=!0),n)}function id(t){return typeof t=="function"?t():$e(t)}function lM(t){if(!Ve(t))return Vt(t);const e=new Proxy({},{get(n,r,s){return $e(Reflect.get(t.value,r,s))},set(n,r,s){return Ve(t.value[r])&&!Ve(s)?t.value[r].value=s:t.value[r]=s,!0},deleteProperty(n,r){return Reflect.deleteProperty(t.value,r)},has(n,r){return Reflect.has(t.value,r)},ownKeys(){return Object.keys(t.value)},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}}});return Vt(e)}function cM(t){return lM(dt(t))}const uM=typeof window<"u",hM=()=>{};function fM(t,e){function n(...r){return new Promise((s,i)=>{Promise.resolve(t(()=>e.apply(this,r),{fn:e,thisArg:this,args:r})).then(s).catch(i)})}return n}const KE=t=>t();function dM(t=KE){const e=nt(!0);function n(){e.value=!1}function r(){e.value=!0}const s=(...i)=>{e.value&&t(...i)};return{isActive:ph(e),pause:n,resume:r,eventFilter:s}}var sm=Object.getOwnPropertySymbols,pM=Object.prototype.hasOwnProperty,gM=Object.prototype.propertyIsEnumerable,mM=(t,e)=>{var n={};for(var r in t)pM.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&sm)for(var r of sm(t))e.indexOf(r)<0&&gM.call(t,r)&&(n[r]=t[r]);return n};function yM(t,e,n={}){const r=n,{eventFilter:s=KE}=r,i=mM(r,["eventFilter"]);return Rn(t,fM(s,e),i)}var _M=Object.defineProperty,vM=Object.defineProperties,wM=Object.getOwnPropertyDescriptors,Xa=Object.getOwnPropertySymbols,GE=Object.prototype.hasOwnProperty,QE=Object.prototype.propertyIsEnumerable,im=(t,e,n)=>e in t?_M(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,EM=(t,e)=>{for(var n in e||(e={}))GE.call(e,n)&&im(t,n,e[n]);if(Xa)for(var n of Xa(e))QE.call(e,n)&&im(t,n,e[n]);return t},bM=(t,e)=>vM(t,wM(e)),TM=(t,e)=>{var n={};for(var r in t)GE.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&Xa)for(var r of Xa(t))e.indexOf(r)<0&&QE.call(t,r)&&(n[r]=t[r]);return n};function IM(t,e,n={}){const r=n,{eventFilter:s}=r,i=TM(r,["eventFilter"]),{eventFilter:o,pause:a,resume:l,isActive:c}=dM(s);return{stop:yM(t,e,bM(EM({},i),{eventFilter:o})),pause:a,resume:l,isActive:c}}function AM(t){var e;const n=id(t);return(e=n==null?void 0:n.$el)!=null?e:n}const Za=uM?window:void 0;function om(...t){let e,n,r,s;if(typeof t[0]=="string"||Array.isArray(t[0])?([n,r,s]=t,e=Za):[e,n,r,s]=t,!e)return hM;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const i=[],o=()=>{i.forEach(u=>u()),i.length=0},a=(u,h,f,p)=>(u.addEventListener(h,f,p),()=>u.removeEventListener(h,f,p)),l=Rn(()=>[AM(e),id(s)],([u,h])=>{o(),u&&i.push(...n.flatMap(f=>r.map(p=>a(u,f,p,h))))},{immediate:!0,flush:"post"}),c=()=>{l(),o()};return oM(c),c}const ea=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ta="__vueuse_ssr_handlers__",SM=CM();function CM(){return ta in ea||(ea[ta]=ea[ta]||{}),ea[ta]}function RM(t,e){return SM[t]||e}function kM(t){return t==null?"any":t instanceof Set?"set":t instanceof Map?"map":t instanceof Date?"date":typeof t=="boolean"?"boolean":typeof t=="string"?"string":typeof t=="object"?"object":Number.isNaN(t)?"any":"number"}var OM=Object.defineProperty,am=Object.getOwnPropertySymbols,PM=Object.prototype.hasOwnProperty,DM=Object.prototype.propertyIsEnumerable,lm=(t,e,n)=>e in t?OM(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,cm=(t,e)=>{for(var n in e||(e={}))PM.call(e,n)&&lm(t,n,e[n]);if(am)for(var n of am(e))DM.call(e,n)&&lm(t,n,e[n]);return t};const NM={boolean:{read:t=>t==="true",write:t=>String(t)},object:{read:t=>JSON.parse(t),write:t=>JSON.stringify(t)},number:{read:t=>Number.parseFloat(t),write:t=>String(t)},any:{read:t=>t,write:t=>String(t)},string:{read:t=>t,write:t=>String(t)},map:{read:t=>new Map(JSON.parse(t)),write:t=>JSON.stringify(Array.from(t.entries()))},set:{read:t=>new Set(JSON.parse(t)),write:t=>JSON.stringify(Array.from(t))},date:{read:t=>new Date(t),write:t=>t.toISOString()}},um="vueuse-storage";function LM(t,e,n,r={}){var s;const{flush:i="pre",deep:o=!0,listenToStorageChanges:a=!0,writeDefaults:l=!0,mergeDefaults:c=!1,shallow:u,window:h=Za,eventFilter:f,onError:p=A=>{console.error(A)}}=r,y=(u?ma:nt)(e);if(!n)try{n=RM("getDefaultStorage",()=>{var A;return(A=Za)==null?void 0:A.localStorage})()}catch(A){p(A)}if(!n)return y;const E=id(e),b=kM(E),w=(s=r.serializer)!=null?s:NM[b],{pause:d,resume:g}=IM(y,()=>_(y.value),{flush:i,deep:o,eventFilter:f});return h&&a&&(om(h,"storage",C),om(h,um,I)),C(),y;function _(A){try{if(A==null)n.removeItem(t);else{const R=w.write(A),M=n.getItem(t);M!==R&&(n.setItem(t,R),h&&h.dispatchEvent(new CustomEvent(um,{detail:{key:t,oldValue:M,newValue:R,storageArea:n}})))}}catch(R){p(R)}}function T(A){const R=A?A.newValue:n.getItem(t);if(R==null)return l&&E!==null&&n.setItem(t,w.write(E)),E;if(!A&&c){const M=w.read(R);return typeof c=="function"?c(M,E):b==="object"&&!Array.isArray(M)?cm(cm({},E),M):M}else return typeof R!="string"?R:w.read(R)}function I(A){C(A.detail)}function C(A){if(!(A&&A.storageArea!==n)){if(A&&A.key==null){y.value=E;return}if(!(A&&A.key!==t)){d();try{y.value=T(A)}catch(R){p(R)}finally{A?yr(g):g()}}}}}function xM(t,e,n={}){const{window:r=Za}=n;return LM(t,e,r==null?void 0:r.localStorage,n)}var Zu={},MM={get exports(){return Zu},set exports(t){Zu=t}};(function(t){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var n=function(r){var s=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,i=0,o={},a={manual:r.Prism&&r.Prism.manual,disableWorkerMessageHandler:r.Prism&&r.Prism.disableWorkerMessageHandler,util:{encode:function d(g){return g instanceof l?new l(g.type,d(g.content),g.alias):Array.isArray(g)?g.map(d):g.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(d){return Object.prototype.toString.call(d).slice(8,-1)},objId:function(d){return d.__id||Object.defineProperty(d,"__id",{value:++i}),d.__id},clone:function d(g,_){_=_||{};var T,I;switch(a.util.type(g)){case"Object":if(I=a.util.objId(g),_[I])return _[I];T={},_[I]=T;for(var C in g)g.hasOwnProperty(C)&&(T[C]=d(g[C],_));return T;case"Array":return I=a.util.objId(g),_[I]?_[I]:(T=[],_[I]=T,g.forEach(function(A,R){T[R]=d(A,_)}),T);default:return g}},getLanguage:function(d){for(;d;){var g=s.exec(d.className);if(g)return g[1].toLowerCase();d=d.parentElement}return"none"},setLanguage:function(d,g){d.className=d.className.replace(RegExp(s,"gi"),""),d.classList.add("language-"+g)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(T){var d=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(T.stack)||[])[1];if(d){var g=document.getElementsByTagName("script");for(var _ in g)if(g[_].src==d)return g[_]}return null}},isActive:function(d,g,_){for(var T="no-"+g;d;){var I=d.classList;if(I.contains(g))return!0;if(I.contains(T))return!1;d=d.parentElement}return!!_}},languages:{plain:o,plaintext:o,text:o,txt:o,extend:function(d,g){var _=a.util.clone(a.languages[d]);for(var T in g)_[T]=g[T];return _},insertBefore:function(d,g,_,T){T=T||a.languages;var I=T[d],C={};for(var A in I)if(I.hasOwnProperty(A)){if(A==g)for(var R in _)_.hasOwnProperty(R)&&(C[R]=_[R]);_.hasOwnProperty(A)||(C[A]=I[A])}var M=T[d];return T[d]=C,a.languages.DFS(a.languages,function(q,H){H===M&&q!=d&&(this[q]=C)}),C},DFS:function d(g,_,T,I){I=I||{};var C=a.util.objId;for(var A in g)if(g.hasOwnProperty(A)){_.call(g,A,g[A],T||A);var R=g[A],M=a.util.type(R);M==="Object"&&!I[C(R)]?(I[C(R)]=!0,d(R,_,null,I)):M==="Array"&&!I[C(R)]&&(I[C(R)]=!0,d(R,_,A,I))}}},plugins:{},highlightAll:function(d,g){a.highlightAllUnder(document,d,g)},highlightAllUnder:function(d,g,_){var T={callback:_,container:d,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",T),T.elements=Array.prototype.slice.apply(T.container.querySelectorAll(T.selector)),a.hooks.run("before-all-elements-highlight",T);for(var I=0,C;C=T.elements[I++];)a.highlightElement(C,g===!0,T.callback)},highlightElement:function(d,g,_){var T=a.util.getLanguage(d),I=a.languages[T];a.util.setLanguage(d,T);var C=d.parentElement;C&&C.nodeName.toLowerCase()==="pre"&&a.util.setLanguage(C,T);var A=d.textContent,R={element:d,language:T,grammar:I,code:A};function M(H){R.highlightedCode=H,a.hooks.run("before-insert",R),R.element.innerHTML=R.highlightedCode,a.hooks.run("after-highlight",R),a.hooks.run("complete",R),_&&_.call(R.element)}if(a.hooks.run("before-sanity-check",R),C=R.element.parentElement,C&&C.nodeName.toLowerCase()==="pre"&&!C.hasAttribute("tabindex")&&C.setAttribute("tabindex","0"),!R.code){a.hooks.run("complete",R),_&&_.call(R.element);return}if(a.hooks.run("before-highlight",R),!R.grammar){M(a.util.encode(R.code));return}if(g&&r.Worker){var q=new Worker(a.filename);q.onmessage=function(H){M(H.data)},q.postMessage(JSON.stringify({language:R.language,code:R.code,immediateClose:!0}))}else M(a.highlight(R.code,R.grammar,R.language))},highlight:function(d,g,_){var T={code:d,grammar:g,language:_};if(a.hooks.run("before-tokenize",T),!T.grammar)throw new Error('The language "'+T.language+'" has no grammar.');return T.tokens=a.tokenize(T.code,T.grammar),a.hooks.run("after-tokenize",T),l.stringify(a.util.encode(T.tokens),T.language)},tokenize:function(d,g){var _=g.rest;if(_){for(var T in _)g[T]=_[T];delete g.rest}var I=new h;return f(I,I.head,d),u(d,I,g,I.head,0),y(I)},hooks:{all:{},add:function(d,g){var _=a.hooks.all;_[d]=_[d]||[],_[d].push(g)},run:function(d,g){var _=a.hooks.all[d];if(!(!_||!_.length))for(var T=0,I;I=_[T++];)I(g)}},Token:l};r.Prism=a;function l(d,g,_,T){this.type=d,this.content=g,this.alias=_,this.length=(T||"").length|0}l.stringify=function d(g,_){if(typeof g=="string")return g;if(Array.isArray(g)){var T="";return g.forEach(function(M){T+=d(M,_)}),T}var I={type:g.type,content:d(g.content,_),tag:"span",classes:["token",g.type],attributes:{},language:_},C=g.alias;C&&(Array.isArray(C)?Array.prototype.push.apply(I.classes,C):I.classes.push(C)),a.hooks.run("wrap",I);var A="";for(var R in I.attributes)A+=" "+R+'="'+(I.attributes[R]||"").replace(/"/g,"&quot;")+'"';return"<"+I.tag+' class="'+I.classes.join(" ")+'"'+A+">"+I.content+"</"+I.tag+">"};function c(d,g,_,T){d.lastIndex=g;var I=d.exec(_);if(I&&T&&I[1]){var C=I[1].length;I.index+=C,I[0]=I[0].slice(C)}return I}function u(d,g,_,T,I,C){for(var A in _)if(!(!_.hasOwnProperty(A)||!_[A])){var R=_[A];R=Array.isArray(R)?R:[R];for(var M=0;M<R.length;++M){if(C&&C.cause==A+","+M)return;var q=R[M],H=q.inside,ne=!!q.lookbehind,K=!!q.greedy,ze=q.alias;if(K&&!q.pattern.global){var ye=q.pattern.toString().match(/[imsuy]*$/)[0];q.pattern=RegExp(q.pattern.source,ye+"g")}for(var we=q.pattern||q,se=T.next,Be=I;se!==g.tail&&!(C&&Be>=C.reach);Be+=se.value.length,se=se.next){var vt=se.value;if(g.length>d.length)return;if(!(vt instanceof l)){var wt=1,Ie;if(K){if(Ie=c(we,Be,d,ne),!Ie||Ie.index>=d.length)break;var Ue=Ie.index,Hn=Ie.index+Ie[0].length,Et=Be;for(Et+=se.value.length;Ue>=Et;)se=se.next,Et+=se.value.length;if(Et-=se.value.length,Be=Et,se.value instanceof l)continue;for(var on=se;on!==g.tail&&(Et<Hn||typeof on.value=="string");on=on.next)wt++,Et+=on.value.length;wt--,vt=d.slice(Be,Et),Ie.index-=Be}else if(Ie=c(we,0,vt,ne),!Ie)continue;var Ue=Ie.index,P=Ie[0],z=vt.slice(0,Ue),V=vt.slice(Ue+P.length),Y=Be+vt.length;C&&Y>C.reach&&(C.reach=Y);var pe=se.prev;z&&(pe=f(g,pe,z),Be+=z.length),p(g,pe,wt);var m=new l(A,H?a.tokenize(P,H):P,ze,P);if(se=f(g,pe,m),V&&f(g,se,V),wt>1){var v={cause:A+","+M,reach:Y};u(d,g,_,se.prev,Be,v),C&&v.reach>C.reach&&(C.reach=v.reach)}}}}}}function h(){var d={value:null,prev:null,next:null},g={value:null,prev:d,next:null};d.next=g,this.head=d,this.tail=g,this.length=0}function f(d,g,_){var T=g.next,I={value:_,prev:g,next:T};return g.next=I,T.prev=I,d.length++,I}function p(d,g,_){for(var T=g.next,I=0;I<_&&T!==d.tail;I++)T=T.next;g.next=T,T.prev=g,d.length-=I}function y(d){for(var g=[],_=d.head.next;_!==d.tail;)g.push(_.value),_=_.next;return g}if(!r.document)return r.addEventListener&&(a.disableWorkerMessageHandler||r.addEventListener("message",function(d){var g=JSON.parse(d.data),_=g.language,T=g.code,I=g.immediateClose;r.postMessage(a.highlight(T,a.languages[_],_)),I&&r.close()},!1)),a;var E=a.util.currentScript();E&&(a.filename=E.src,E.hasAttribute("data-manual")&&(a.manual=!0));function b(){a.manual||a.highlightAll()}if(!a.manual){var w=document.readyState;w==="loading"||w==="interactive"&&E&&E.defer?document.addEventListener("DOMContentLoaded",b):window.requestAnimationFrame?window.requestAnimationFrame(b):window.setTimeout(b,16)}return a}(e);t.exports&&(t.exports=n),typeof tm<"u"&&(tm.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside["attr-value"].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside["internal-subset"].inside=n.languages.markup,n.hooks.add("wrap",function(r){r.type==="entity"&&(r.attributes.title=r.content.replace(/&amp;/,"&"))}),Object.defineProperty(n.languages.markup.tag,"addInlined",{value:function(s,i){var o={};o["language-"+i]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[i]},o.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:o}};a["language-"+i]={pattern:/[\s\S]+/,inside:n.languages[i]};var l={};l[s]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:a},n.languages.insertBefore("markup","cdata",l)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{value:function(r,s){n.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+r+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[s,"language-"+s],inside:n.languages[s]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend("markup",{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,function(r){var s=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;r.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+s.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+s.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+s.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+s.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:s,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},r.languages.css.atrule.inside.rest=r.languages.css;var i=r.languages.markup;i&&(i.tag.addInlined("style","css"),i.tag.addAttribute("style","css"))}(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend("clike",{"class-name":[n.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),n.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),n.languages.markup&&(n.languages.markup.tag.addInlined("script","javascript"),n.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),n.languages.js=n.languages.javascript,function(){if(typeof n>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var r="Loading…",s=function(E,b){return"✖ Error "+E+" while fetching file: "+b},i="✖ Error: File does not exist or is empty",o={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},a="data-src-status",l="loading",c="loaded",u="failed",h="pre[data-src]:not(["+a+'="'+c+'"]):not(['+a+'="'+l+'"])';function f(E,b,w){var d=new XMLHttpRequest;d.open("GET",E,!0),d.onreadystatechange=function(){d.readyState==4&&(d.status<400&&d.responseText?b(d.responseText):d.status>=400?w(s(d.status,d.statusText)):w(i))},d.send(null)}function p(E){var b=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(E||"");if(b){var w=Number(b[1]),d=b[2],g=b[3];return d?g?[w,Number(g)]:[w,void 0]:[w,w]}}n.hooks.add("before-highlightall",function(E){E.selector+=", "+h}),n.hooks.add("before-sanity-check",function(E){var b=E.element;if(b.matches(h)){E.code="",b.setAttribute(a,l);var w=b.appendChild(document.createElement("CODE"));w.textContent=r;var d=b.getAttribute("data-src"),g=E.language;if(g==="none"){var _=(/\.(\w+)$/.exec(d)||[,"none"])[1];g=o[_]||_}n.util.setLanguage(w,g),n.util.setLanguage(b,g);var T=n.plugins.autoloader;T&&T.loadLanguages(g),f(d,function(I){b.setAttribute(a,c);var C=p(b.getAttribute("data-range"));if(C){var A=I.split(/\r\n?|\n/g),R=C[0],M=C[1]==null?A.length:C[1];R<0&&(R+=A.length),R=Math.max(0,Math.min(R-1,A.length)),M<0&&(M+=A.length),M=Math.max(0,Math.min(M,A.length)),I=A.slice(R,M).join(`
`),b.hasAttribute("data-start")||b.setAttribute("data-start",String(R+1))}w.textContent=I,n.highlightElement(w)},function(I){b.setAttribute(a,u),w.textContent=I})}}),n.plugins.fileHighlight={highlight:function(b){for(var w=(b||document).querySelectorAll(h),d=0,g;g=w[d++];)n.highlightElement(g)}};var y=!1;n.fileHighlight=function(){y||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),y=!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(MM);const FM=Zu,UM={beforeMount(t,e){const n=e.modifiers,r=e.value;n.script||r==="script"?t.className="language-javascript":n.css||r==="css"?t.className="language-css":t.className="language-markup",FM.highlightElement(t.children[0])}},$M=Qt(({vueApp:t})=>{t.use(iM),t.use(nM),t.directive("tooltip",z1),t.directive("ripple",B1),t.directive("code",UM),t.directive("badge",rM),t.directive("styleclass",eM);const e=aM(()=>xM("app-state",{theme:"saga-blue",darkTheme:!1}))();return Rn(()=>e.value.theme,n=>{M1(n)},{immediate:!0}),{provide:{appState:cM(()=>e.value)}}}),VM=[XA,ZA,eS,uC,hC,yC,wC,EC,bC,L1,$M],BM=Un({name:"NuxtLoadingIndicator",props:{throttle:{type:Number,default:200},duration:{type:Number,default:2e3},height:{type:Number,default:3},color:{type:[String,Boolean],default:"repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"}},setup(t,{slots:e}){const n=HM({duration:t.duration,throttle:t.throttle}),r=Xe();return r.hook("page:start",n.start),r.hook("page:finish",n.finish),Zi(n.clear),()=>Kt("div",{class:"nuxt-loading-indicator",style:{position:"fixed",top:0,right:0,left:0,pointerEvents:"none",width:"auto",height:`${t.height}px`,opacity:n.isLoading.value?1:0,background:t.color||void 0,backgroundSize:`${100/n.progress.value*100}% auto`,transform:`scaleX(${n.progress.value}%)`,transformOrigin:"left",transition:"transform 0.1s, height 0.4s, opacity 0.4s",zIndex:999999}},e)}});function HM(t){const e=nt(0),n=nt(!1),r=dt(()=>1e4/t.duration);let s=null,i=null;function o(){l(),e.value=0,t.throttle?i=setTimeout(()=>{n.value=!0,h()},t.throttle):(n.value=!0,h())}function a(){e.value=100,u()}function l(){clearInterval(s),clearTimeout(i),s=null,i=null}function c(f){e.value=Math.min(100,e.value+f)}function u(){l(),setTimeout(()=>{n.value=!1,setTimeout(()=>{e.value=0},400)},500)}function h(){s=setInterval(()=>{c(r.value)},100)}return{progress:e,isLoading:n,start:o,finish:a,clear:l}}const jM=(t,e)=>e.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,n=>{var r;return((r=t.params[n.slice(1)])==null?void 0:r.toString())||""}),qM=(t,e)=>{const n=t.route.matched.find(s=>{var i;return((i=s.components)==null?void 0:i.default)===t.Component.type}),r=e??(n==null?void 0:n.meta.key)??(n&&jM(t.route,n));return typeof r=="function"?r(t.route):r},WM=(t,e)=>({default:()=>t?Kt(cT,t===!0?{}:t,e):e}),zM=Un({name:"FragmentWrapper",setup(t,{slots:e}){return()=>{var n;return(n=e.default)==null?void 0:n.call(e)}}}),eh=(t,e,n)=>({default:()=>e?Kt(t,e===!0?{}:e,n):Kt(zM,{},n)}),KM=Un({name:"NuxtPage",inheritAttrs:!1,props:{name:{type:String},transition:{type:[Boolean,Object],default:void 0},keepalive:{type:[Boolean,Object],default:void 0},route:{type:Object},pageKey:{type:[Function,String],default:null}},setup(t,{attrs:e}){const n=Xe();return()=>Kt(r_,{name:t.name,route:t.route,...e},{default:r=>{if(!r.Component)return;const s=qM(r,t.pageKey),i=n.deferHydration(),o=!!(t.transition??r.route.meta.pageTransition??mu),a=o&&QM([t.transition,r.route.meta.pageTransition,mu,{onAfterLeave:()=>{n.callHook("page:transition:finish",r.Component)}}].filter(Boolean));return eh(hl,o&&a,WM(t.keepalive??r.route.meta.keepalive??qA,Kt(zm,{onPending:()=>n.callHook("page:start",r.Component),onResolve:()=>{yr(()=>n.callHook("page:finish",r.Component).finally(i))}},{default:()=>Kt(JM,{key:s,routeProps:r,pageKey:s,hasTransition:o})}))).default()}})}});function GM(t){return Array.isArray(t)?t:t?[t]:[]}function QM(t){const e=t.map(n=>({...n,onAfterLeave:GM(n.onAfterLeave)}));return wA(...e)}const JM=Un({name:"RouteProvider",props:["routeProps","pageKey","hasTransition"],setup(t){const e=t.pageKey,n=t.routeProps.route,r={};for(const s in t.routeProps.route)r[s]=dt(()=>e===t.pageKey?t.routeProps.route[s]:n[s]);return ds("_route",Vt(r)),()=>Kt(t.routeProps.Component)}}),YM=Un({name:"LayoutLoader",inheritAttrs:!1,props:{name:String},async setup(t,e){const n=await ss[t.name]().then(r=>r.default||r);return()=>Kt(n,e.attrs,e.slots)}}),XM=Un({name:"NuxtLayout",inheritAttrs:!1,props:{name:{type:[String,Boolean,Object],default:null}},setup(t,e){const n=$t("_route"),r=n===qy()?rC():n,s=dt(()=>$e(t.name)??r.meta.layout??"default");return()=>{const i=s.value&&s.value in ss,o=r.meta.layoutTransition??jA;return eh(hl,i&&o,{default:()=>eh(YM,i&&{key:s.value,name:s.value,...e.attrs},e.slots).default()}).default()}}}),ZM=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},eF={};function tF(t,e){const n=BM,r=KM,s=XM;return In(),Yn(s,null,{default:vh(()=>[De(n),De(r)]),_:1})}const nF=ZM(eF,[["render",tF]]),hm={__name:"nuxt-root",setup(t){const e=F(()=>N(()=>import("./error-component.1e2e91f6.js"),[],import.meta.url).then(l=>l.default||l)),n=()=>null,r=Xe(),s=r.deferHydration(),i=!1;ds("_route",qy()),r.hooks.callHookWith(l=>l.map(c=>c()),"vue:setup");const o=pl();ty((l,c,u)=>{if(r.hooks.callHook("vue:error",l,c,u).catch(h=>console.error("[nuxt] Error in `vue:error` hook",h)),OA(l)&&(l.fatal||l.unhandled))return Tn(r,rs,[l]),!1});const{islandContext:a}=!1;return(l,c)=>(In(),Yn(zm,{onResolve:$e(s)},{default:vh(()=>[$e(o)?(In(),Yn($e(e),{key:0,error:$e(o)},null,8,["error"])):$e(a)?(In(),Yn($e(n),{key:1,context:$e(a)},null,8,["context"])):$e(i)?(In(),Yn(yT($e(i)),{key:2})):(In(),Yn($e(nF),{key:3}))]),_:1},8,["onResolve"]))}};globalThis.$fetch||(globalThis.$fetch=_I.create({baseURL:wI()}));let fm;const rF=MI(VM);fm=async function(){var s,i;const n=!!((s=window.__NUXT__)!=null&&s.serverRendered||((i=document.getElementById("__NUXT_DATA__"))==null?void 0:i.dataset.ssr)==="true")?R0(hm):C0(hm),r=NI({vueApp:n});try{await xI(r,rF)}catch(o){await r.callHook("app:error",o),r.payload.error=r.payload.error||o}try{await r.hooks.callHook("app:created",n),await r.hooks.callHook("app:beforeMount",n),n.mount("#"+WA),await r.hooks.callHook("app:mounted",n),await yr()}catch(o){await r.callHook("app:error",o),r.payload.error=r.payload.error||o}},fm().catch(t=>{console.error("Error while mounting app:",t)});export{z1 as $,yF as A,_F as B,AF as C,Vt as D,G as E,ut as F,uF as G,VT as H,TF as I,fC as J,lF as K,hF as L,rm as M,s_ as N,lt as O,pF as P,bF as Q,B1 as R,CF as S,hl as T,i_ as U,RF as V,ot as W,EF as X,dF as Y,o_ as Z,N as _,F as a,wF as a0,vF as a1,Wc as a2,HF as a3,NF as a4,PF as a5,tN as a6,LF as a7,DF as a8,$F as a9,Ih as aA,Wy as aB,Vn as aC,YF as aD,tm as aE,CA as aF,hu as aG,Us as aH,eo as aI,ll as aJ,Zi as aK,fl as aL,W0 as aM,X0 as aN,Py as aO,FF as aa,UF as ab,MF as ac,VF as ad,BF as ae,GF as af,JF as ag,P1 as ah,QF as ai,dl as aj,Ve as ak,SF as al,iF as am,oF as an,ph as ao,bx as ap,qF as aq,WF as ar,KF as as,zF as at,xF as au,jF as av,kF as aw,gk as ax,Um as ay,hT as az,gF as b,dt as c,Un as d,De as e,yy as f,Yn as g,$e as h,ZM as i,cF as j,my as k,mF as l,aF as m,rh as n,In as o,nh as p,fF as q,yT as r,Kt as s,sF as t,IF as u,Xe as v,vh as w,SA as x,nt as y,Rn as z};
