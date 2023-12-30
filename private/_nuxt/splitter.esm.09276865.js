import{E as l,O as d,o as h,b as p,F as c,G as m,g,r as z,k as f,p as S,l as v,n as E}from"./entry.a8bdde5b.js";var P={name:"Splitter",emits:["resizestart","resizeend"],props:{layout:{type:String,default:"horizontal"},gutterSize:{type:Number,default:4},stateKey:{type:String,default:null},stateStorage:{type:String,default:"session"},step:{type:Number,default:5}},dragging:!1,mouseMoveListener:null,mouseUpListener:null,touchMoveListener:null,touchEndListener:null,size:null,gutterElement:null,startPos:null,prevPanelElement:null,nextPanelElement:null,nextPanelSize:null,prevPanelSize:null,panelSizes:null,prevPanelIndex:null,timer:null,data(){return{prevSize:null}},mounted(){if(this.panels&&this.panels.length){let e=!1;if(this.isStateful()&&(e=this.restoreState()),!e){let t=[...this.$el.children].filter(s=>l.hasClass(s,"p-splitter-panel")),i=[];this.panels.map((s,n)=>{let u=(s.props&&s.props.size?s.props.size:null)||100/this.panels.length;i[n]=u,t[n].style.flexBasis="calc("+u+"% - "+(this.panels.length-1)*this.gutterSize+"px)"}),this.panelSizes=i,this.prevSize=parseFloat(i[0]).toFixed(4)}}},beforeUnmount(){this.clear(),this.unbindMouseListeners()},methods:{isSplitterPanel(e){return e.type.name==="SplitterPanel"},onResizeStart(e,t,i){this.gutterElement=e.currentTarget||e.target.parentElement,this.size=this.horizontal?l.getWidth(this.$el):l.getHeight(this.$el),i||(this.dragging=!0,this.startPos=this.layout==="horizontal"?e.pageX||e.changedTouches[0].pageX:e.pageY||e.changedTouches[0].pageY),this.prevPanelElement=this.gutterElement.previousElementSibling,this.nextPanelElement=this.gutterElement.nextElementSibling,i?(this.prevPanelSize=this.horizontal?l.getOuterWidth(this.prevPanelElement,!0):l.getOuterHeight(this.prevPanelElement,!0),this.nextPanelSize=this.horizontal?l.getOuterWidth(this.nextPanelElement,!0):l.getOuterHeight(this.nextPanelElement,!0)):(this.prevPanelSize=100*(this.horizontal?l.getOuterWidth(this.prevPanelElement,!0):l.getOuterHeight(this.prevPanelElement,!0))/this.size,this.nextPanelSize=100*(this.horizontal?l.getOuterWidth(this.nextPanelElement,!0):l.getOuterHeight(this.nextPanelElement,!0))/this.size),this.prevPanelIndex=t,this.$emit("resizestart",{originalEvent:e,sizes:this.panelSizes}),l.addClass(this.gutterElement,"p-splitter-gutter-resizing"),l.addClass(this.$el,"p-splitter-resizing")},onResize(e,t,i){let s,n,r;i?this.horizontal?(n=100*(this.prevPanelSize+t)/this.size,r=100*(this.nextPanelSize-t)/this.size):(n=100*(this.prevPanelSize-t)/this.size,r=100*(this.nextPanelSize+t)/this.size):(this.horizontal?s=e.pageX*100/this.size-this.startPos*100/this.size:s=e.pageY*100/this.size-this.startPos*100/this.size,n=this.prevPanelSize+s,r=this.nextPanelSize-s),this.prevSize=parseFloat(n).toFixed(4),this.validateResize(n,r)&&(this.prevPanelElement.style.flexBasis="calc("+n+"% - "+(this.panels.length-1)*this.gutterSize+"px)",this.nextPanelElement.style.flexBasis="calc("+r+"% - "+(this.panels.length-1)*this.gutterSize+"px)",this.panelSizes[this.prevPanelIndex]=n,this.panelSizes[this.prevPanelIndex+1]=r)},onResizeEnd(e){this.isStateful()&&this.saveState(),this.$emit("resizeend",{originalEvent:e,sizes:this.panelSizes}),l.removeClass(this.gutterElement,"p-splitter-gutter-resizing"),l.removeClass(this.$el,"p-splitter-resizing"),this.clear()},repeat(e,t,i){this.onResizeStart(e,t,!0),this.onResize(e,i,!0)},setTimer(e,t,i){this.clearTimer(),this.timer=setTimeout(()=>{this.repeat(e,t,i)},40)},clearTimer(){this.timer&&clearTimeout(this.timer)},onGutterKeyUp(){this.clearTimer(),this.onResizeEnd()},onGutterKeyDown(e,t){switch(e.code){case"ArrowLeft":{this.layout==="horizontal"&&this.setTimer(e,t,this.step*-1),e.preventDefault();break}case"ArrowRight":{this.layout==="horizontal"&&this.setTimer(e,t,this.step),e.preventDefault();break}case"ArrowDown":{this.layout==="vertical"&&this.setTimer(e,t,this.step*-1),e.preventDefault();break}case"ArrowUp":{this.layout==="vertical"&&this.setTimer(e,t,this.step),e.preventDefault();break}}},onGutterMouseDown(e,t){this.onResizeStart(e,t),this.bindMouseListeners()},onGutterTouchStart(e,t){this.onResizeStart(e,t),this.bindTouchListeners(),e.preventDefault()},onGutterTouchMove(e){this.onResize(e),e.preventDefault()},onGutterTouchEnd(e){this.onResizeEnd(e),this.unbindTouchListeners(),e.preventDefault()},bindMouseListeners(){this.mouseMoveListener||(this.mouseMoveListener=e=>this.onResize(e),document.addEventListener("mousemove",this.mouseMoveListener)),this.mouseUpListener||(this.mouseUpListener=e=>{this.onResizeEnd(e),this.unbindMouseListeners()},document.addEventListener("mouseup",this.mouseUpListener))},bindTouchListeners(){this.touchMoveListener||(this.touchMoveListener=e=>this.onResize(e.changedTouches[0]),document.addEventListener("touchmove",this.touchMoveListener)),this.touchEndListener||(this.touchEndListener=e=>{this.resizeEnd(e),this.unbindTouchListeners()},document.addEventListener("touchend",this.touchEndListener))},validateResize(e,t){let i=d.getVNodeProp(this.panels[0],"minSize");if(this.panels[0].props&&i&&i>e)return!1;let s=d.getVNodeProp(this.panels[1],"minSize");return!(this.panels[1].props&&s&&s>t)},unbindMouseListeners(){this.mouseMoveListener&&(document.removeEventListener("mousemove",this.mouseMoveListener),this.mouseMoveListener=null),this.mouseUpListener&&(document.removeEventListener("mouseup",this.mouseUpListener),this.mouseUpListener=null)},unbindTouchListeners(){this.touchMoveListener&&(document.removeEventListener("touchmove",this.touchMoveListener),this.touchMoveListener=null),this.touchEndListener&&(document.removeEventListener("touchend",this.touchEndListener),this.touchEndListener=null)},clear(){this.dragging=!1,this.size=null,this.startPos=null,this.prevPanelElement=null,this.nextPanelElement=null,this.prevPanelSize=null,this.nextPanelSize=null,this.gutterElement=null,this.prevPanelIndex=null},isStateful(){return this.stateKey!=null},getStorage(){switch(this.stateStorage){case"local":return window.localStorage;case"session":return window.sessionStorage;default:throw new Error(this.stateStorage+' is not a valid value for the state storage, supported values are "local" and "session".')}},saveState(){this.getStorage().setItem(this.stateKey,JSON.stringify(this.panelSizes))},restoreState(){const t=this.getStorage().getItem(this.stateKey);return t?(this.panelSizes=JSON.parse(t),[...this.$el.children].filter(s=>l.hasClass(s,"p-splitter-panel")).forEach((s,n)=>{s.style.flexBasis="calc("+this.panelSizes[n]+"% - "+(this.panels.length-1)*this.gutterSize+"px)"}),!0):!1}},computed:{containerClass(){return["p-splitter p-component","p-splitter-"+this.layout]},panels(){const e=[];return this.$slots.default().forEach(t=>{this.isSplitterPanel(t)?e.push(t):t.children instanceof Array&&t.children.forEach(i=>{this.isSplitterPanel(i)&&e.push(i)})}),e},gutterStyle(){return this.horizontal?{width:this.gutterSize+"px"}:{height:this.gutterSize+"px"}},horizontal(){return this.layout==="horizontal"}}};const y=["onMousedown","onTouchstart","onTouchmove","onTouchend"],x=["aria-orientation","aria-valuenow","onKeydown"];function L(e,t,i,s,n,r){return h(),p("div",{class:E(r.containerClass)},[(h(!0),p(c,null,m(r.panels,(u,o)=>(h(),p(c,{key:o},[(h(),g(z(u),{tabindex:"-1"})),o!==r.panels.length-1?(h(),p("div",{key:0,class:"p-splitter-gutter",onMousedown:a=>r.onGutterMouseDown(a,o),onTouchstart:a=>r.onGutterTouchStart(a,o),onTouchmove:a=>r.onGutterTouchMove(a,o),onTouchend:a=>r.onGutterTouchEnd(a,o)},[f("div",{class:"p-splitter-gutter-handle",tabindex:"0",style:S(r.gutterStyle),role:"separator","aria-orientation":i.layout,"aria-valuenow":n.prevSize,onKeyup:t[0]||(t[0]=(...a)=>r.onGutterKeyUp&&r.onGutterKeyUp(...a)),onKeydown:a=>r.onGutterKeyDown(a,o)},null,44,x)],40,y)):v("",!0)],64))),128))],2)}function w(e,t){t===void 0&&(t={});var i=t.insertAt;if(!(!e||typeof document>"u")){var s=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",i==="top"&&s.firstChild?s.insertBefore(n,s.firstChild):s.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}var T=`
.p-splitter {
    display: flex;
    flex-wrap: nowrap;
}
.p-splitter-vertical {
    flex-direction: column;
}
.p-splitter-panel {
    flex-grow: 1;
}
.p-splitter-panel-nested {
    display: flex;
}
.p-splitter-panel .p-splitter {
    flex-grow: 1;
    border: 0 none;
}
.p-splitter-gutter {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: col-resize;
}
.p-splitter-horizontal.p-splitter-resizing {
    cursor: col-resize;
    user-select: none;
}
.p-splitter-horizontal > .p-splitter-gutter > .p-splitter-gutter-handle {
    height: 24px;
    width: 100%;
}
.p-splitter-horizontal > .p-splitter-gutter {
    cursor: col-resize;
}
.p-splitter-vertical.p-splitter-resizing {
    cursor: row-resize;
    user-select: none;
}
.p-splitter-vertical > .p-splitter-gutter {
    cursor: row-resize;
}
.p-splitter-vertical > .p-splitter-gutter > .p-splitter-gutter-handle {
    width: 24px;
    height: 100%;
}
`;w(T);P.render=L;export{P as default};
