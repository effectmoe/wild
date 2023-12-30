import{U as h,E as r,o as c,b as d,k as a,q as u}from"./entry.a8bdde5b.js";var p={name:"ScrollPanel",props:{step:{type:Number,default:5}},initialized:!1,documentResizeListener:null,documentMouseMoveListener:null,documentMouseUpListener:null,frame:null,scrollXRatio:null,scrollYRatio:null,isXBarClicked:!1,isYBarClicked:!1,lastPageX:null,lastPageY:null,timer:null,outsideClickListener:null,data(){return{id:h(),orientation:"vertical",lastScrollTop:0,lastScrollLeft:0}},mounted(){this.$el.offsetParent&&this.initialize()},updated(){!this.initialized&&this.$el.offsetParent&&this.initialize()},beforeUnmount(){this.unbindDocumentResizeListener(),this.frame&&window.cancelAnimationFrame(this.frame)},methods:{initialize(){this.moveBar(),this.bindDocumentResizeListener(),this.calculateContainerHeight()},calculateContainerHeight(){let e=getComputedStyle(this.$el),t=getComputedStyle(this.$refs.xBar),l=r.getHeight(this.$el)-parseInt(t.height,10);e["max-height"]!=="none"&&l===0&&(this.$refs.content.offsetHeight+parseInt(t.height,10)>parseInt(e["max-height"],10)?this.$el.style.height=e["max-height"]:this.$el.style.height=this.$refs.content.offsetHeight+parseFloat(e.paddingTop)+parseFloat(e.paddingBottom)+parseFloat(e.borderTopWidth)+parseFloat(e.borderBottomWidth)+"px")},moveBar(){let e=this.$refs.content.scrollWidth,t=this.$refs.content.clientWidth,l=(this.$el.clientHeight-this.$refs.xBar.clientHeight)*-1;this.scrollXRatio=t/e;let n=this.$refs.content.scrollHeight,o=this.$refs.content.clientHeight,s=(this.$el.clientWidth-this.$refs.yBar.clientWidth)*-1;this.scrollYRatio=o/n,this.frame=this.requestAnimationFrame(()=>{this.scrollXRatio>=1?r.addClass(this.$refs.xBar,"p-scrollpanel-hidden"):(r.removeClass(this.$refs.xBar,"p-scrollpanel-hidden"),this.$refs.xBar.style.cssText="width:"+Math.max(this.scrollXRatio*100,10)+"%; left:"+this.$refs.content.scrollLeft/e*100+"%;bottom:"+l+"px;"),this.scrollYRatio>=1?r.addClass(this.$refs.yBar,"p-scrollpanel-hidden"):(r.removeClass(this.$refs.yBar,"p-scrollpanel-hidden"),this.$refs.yBar.style.cssText="height:"+Math.max(this.scrollYRatio*100,10)+"%; top: calc("+this.$refs.content.scrollTop/n*100+"% - "+this.$refs.xBar.clientHeight+"px);right:"+s+"px;")})},onYBarMouseDown(e){this.isYBarClicked=!0,this.$refs.yBar.focus(),this.lastPageY=e.pageY,r.addClass(this.$refs.yBar,"p-scrollpanel-grabbed"),r.addClass(document.body,"p-scrollpanel-grabbed"),this.bindDocumentMouseListeners(),e.preventDefault()},onXBarMouseDown(e){this.isXBarClicked=!0,this.$refs.xBar.focus(),this.lastPageX=e.pageX,r.addClass(this.$refs.xBar,"p-scrollpanel-grabbed"),r.addClass(document.body,"p-scrollpanel-grabbed"),this.bindDocumentMouseListeners(),e.preventDefault()},onScroll(e){this.lastScrollLeft!==e.target.scrollLeft?(this.lastScrollLeft=e.target.scrollLeft,this.orientation="horizontal"):this.lastScrollTop!==e.target.scrollTop&&(this.lastScrollTop=e.target.scrollTop,this.orientation="vertical"),this.moveBar()},onKeyDown(e){if(this.orientation==="vertical")switch(e.code){case"ArrowDown":{this.setTimer("scrollTop",this.step),e.preventDefault();break}case"ArrowUp":{this.setTimer("scrollTop",this.step*-1),e.preventDefault();break}case"ArrowLeft":case"ArrowRight":{e.preventDefault();break}}else if(this.orientation==="horizontal")switch(e.code){case"ArrowRight":{this.setTimer("scrollLeft",this.step),e.preventDefault();break}case"ArrowLeft":{this.setTimer("scrollLeft",this.step*-1),e.preventDefault();break}case"ArrowDown":case"ArrowUp":{e.preventDefault();break}}},onKeyUp(){this.clearTimer()},repeat(e,t){this.$refs.content[e]+=t,this.moveBar()},setTimer(e,t){this.clearTimer(),this.timer=setTimeout(()=>{this.repeat(e,t)},40)},clearTimer(){this.timer&&clearTimeout(this.timer)},onDocumentMouseMove(e){this.isXBarClicked?this.onMouseMoveForXBar(e):this.isYBarClicked?this.onMouseMoveForYBar(e):(this.onMouseMoveForXBar(e),this.onMouseMoveForYBar(e))},onMouseMoveForXBar(e){let t=e.pageX-this.lastPageX;this.lastPageX=e.pageX,this.frame=this.requestAnimationFrame(()=>{this.$refs.content.scrollLeft+=t/this.scrollXRatio})},onMouseMoveForYBar(e){let t=e.pageY-this.lastPageY;this.lastPageY=e.pageY,this.frame=this.requestAnimationFrame(()=>{this.$refs.content.scrollTop+=t/this.scrollYRatio})},onFocus(e){this.$refs.xBar.isSameNode(e.target)?this.orientation="horizontal":this.$refs.yBar.isSameNode(e.target)&&(this.orientation="vertical")},onBlur(){this.orientation==="horizontal"&&(this.orientation="vertical")},onDocumentMouseUp(){r.removeClass(this.$refs.yBar,"p-scrollpanel-grabbed"),r.removeClass(this.$refs.xBar,"p-scrollpanel-grabbed"),r.removeClass(document.body,"p-scrollpanel-grabbed"),this.unbindDocumentMouseListeners(),this.isXBarClicked=!1,this.isYBarClicked=!1},requestAnimationFrame(e){return(window.requestAnimationFrame||this.timeoutFrame)(e)},refresh(){this.moveBar()},scrollTop(e){let t=this.$refs.content.scrollHeight-this.$refs.content.clientHeight;e=e>t?t:e>0?e:0,this.$refs.content.scrollTop=e},timeoutFrame(e){setTimeout(e,0)},bindDocumentMouseListeners(){this.documentMouseMoveListener||(this.documentMouseMoveListener=e=>{this.onDocumentMouseMove(e)},document.addEventListener("mousemove",this.documentMouseMoveListener)),this.documentMouseUpListener||(this.documentMouseUpListener=e=>{this.onDocumentMouseUp(e)},document.addEventListener("mouseup",this.documentMouseUpListener))},unbindDocumentMouseListeners(){this.documentMouseMoveListener&&(document.removeEventListener("mousemove",this.documentMouseMoveListener),this.documentMouseMoveListener=null),this.documentMouseUpListener&&(document.removeEventListener("mouseup",this.documentMouseUpListener),this.documentMouseUpListener=null)},bindDocumentResizeListener(){this.documentResizeListener||(this.documentResizeListener=()=>{this.moveBar()},window.addEventListener("resize",this.documentResizeListener))},unbindDocumentResizeListener(){this.documentResizeListener&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)}}};const m={class:"p-scrollpanel p-component"},f={class:"p-scrollpanel-wrapper"},g=["aria-valuenow"],b=["aria-valuenow"];function v(e,t,l,n,o,s){return c(),d("div",m,[a("div",f,[a("div",{ref:"content",class:"p-scrollpanel-content",onScroll:t[0]||(t[0]=(...i)=>s.onScroll&&s.onScroll(...i)),onMouseenter:t[1]||(t[1]=(...i)=>s.moveBar&&s.moveBar(...i))},[u(e.$slots,"default")],544)]),a("div",{ref:"xBar",class:"p-scrollpanel-bar p-scrollpanel-bar-x",tabindex:"0",role:"scrollbar","aria-orientation":"horizontal","aria-valuenow":o.lastScrollLeft,onMousedown:t[2]||(t[2]=(...i)=>s.onXBarMouseDown&&s.onXBarMouseDown(...i)),onKeydown:t[3]||(t[3]=i=>s.onKeyDown(i)),onKeyup:t[4]||(t[4]=(...i)=>s.onKeyUp&&s.onKeyUp(...i)),onFocus:t[5]||(t[5]=(...i)=>s.onFocus&&s.onFocus(...i)),onBlur:t[6]||(t[6]=(...i)=>s.onBlur&&s.onBlur(...i))},null,40,g),a("div",{ref:"yBar",class:"p-scrollpanel-bar p-scrollpanel-bar-y",tabindex:"0",role:"scrollbar","aria-orientation":"vertical","aria-valuenow":o.lastScrollTop,onMousedown:t[7]||(t[7]=(...i)=>s.onYBarMouseDown&&s.onYBarMouseDown(...i)),onKeydown:t[8]||(t[8]=i=>s.onKeyDown(i)),onKeyup:t[9]||(t[9]=(...i)=>s.onKeyUp&&s.onKeyUp(...i)),onFocus:t[10]||(t[10]=(...i)=>s.onFocus&&s.onFocus(...i))},null,40,b)])}function B(e,t){t===void 0&&(t={});var l=t.insertAt;if(!(!e||typeof document>"u")){var n=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css",l==="top"&&n.firstChild?n.insertBefore(o,n.firstChild):n.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}var M=`
.p-scrollpanel-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    float: left;
}
.p-scrollpanel-content {
    height: calc(100% + 18px);
    width: calc(100% + 18px);
    padding: 0 18px 18px 0;
    position: relative;
    overflow: scroll;
    box-sizing: border-box;
    scrollbar-width: none;
}
.p-scrollpanel-content::-webkit-scrollbar {
    display: none;
}
.p-scrollpanel-bar {
    position: relative;
    background: #c1c1c1;
    border-radius: 3px;
    z-index: 2;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.25s linear;
}
.p-scrollpanel-bar-y {
    width: 9px;
    top: 0;
}
.p-scrollpanel-bar-x {
    height: 9px;
    bottom: 0;
}
.p-scrollpanel-hidden {
    visibility: hidden;
}
.p-scrollpanel:hover .p-scrollpanel-bar,
.p-scrollpanel:active .p-scrollpanel-bar {
    opacity: 1;
}
.p-scrollpanel-grabbed {
    user-select: none;
}
`;B(M);p.render=v;export{p as default};
