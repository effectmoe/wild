import p from"./terminalservice.esm.813ae781.js";import{o as m,b as d,t as a,l as u,k as o,F as h,G as f,m as y,a0 as x}from"./entry.a8bdde5b.js";var v={name:"Terminal",props:{welcomeMessage:{type:String,default:null},prompt:{type:String,default:null}},data(){return{commandText:null,commands:[]}},mounted(){p.on("response",this.responseListener),this.$refs.input.focus()},updated(){this.$el.scrollTop=this.$el.scrollHeight},beforeUnmount(){p.off("response",this.responseListener)},methods:{onClick(){this.$refs.input.focus()},onKeydown(s){s.code==="Enter"&&this.commandText&&(this.commands.push({text:this.commandText}),p.emit("command",this.commandText),this.commandText="")},responseListener(s){this.commands[this.commands.length-1].response=s}}};const g={key:0},T={class:"p-terminal-content"},_={class:"p-terminal-prompt"},k={class:"p-terminal-command"},C={class:"p-terminal-response","aria-live":"polite"},w={class:"p-terminal-prompt-container"},S={class:"p-terminal-prompt"};function B(s,t,i,r,e,l){return m(),d("div",{class:"p-terminal p-component",onClick:t[2]||(t[2]=(...n)=>l.onClick&&l.onClick(...n))},[i.welcomeMessage?(m(),d("div",g,a(i.welcomeMessage),1)):u("",!0),o("div",T,[(m(!0),d(h,null,f(e.commands,(n,c)=>(m(),d("div",{key:n.text+c.toString()},[o("span",_,a(i.prompt),1),o("span",k,a(n.text),1),o("div",C,a(n.response),1)]))),128))]),o("div",w,[o("span",S,a(i.prompt),1),y(o("input",{ref:"input","onUpdate:modelValue":t[0]||(t[0]=n=>e.commandText=n),type:"text",class:"p-terminal-input",autocomplete:"off",onKeydown:t[1]||(t[1]=(...n)=>l.onKeydown&&l.onKeydown(...n))},null,544),[[x,e.commandText]])])])}function b(s,t){t===void 0&&(t={});var i=t.insertAt;if(!(!s||typeof document>"u")){var r=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",i==="top"&&r.firstChild?r.insertBefore(e,r.firstChild):r.appendChild(e),e.styleSheet?e.styleSheet.cssText=s:e.appendChild(document.createTextNode(s))}}var E=`
.p-terminal {
    height: 18rem;
    overflow: auto;
}
.p-terminal-prompt-container {
    display: flex;
    align-items: center;
}
.p-terminal-input {
    flex: 1 1 auto;
    border: 0 none;
    background-color: transparent;
    color: inherit;
    padding: 0;
    outline: 0 none;
}
.p-terminal-input::-ms-clear {
    display: none;
}
`;b(E);v.render=B;export{v as default};
