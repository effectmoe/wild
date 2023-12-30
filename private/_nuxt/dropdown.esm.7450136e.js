import{U as K,Z as C,O as h,E as a,J as H,V as B,R as P,o as d,b as u,H as O,q as c,f as g,t as y,l as v,k as p,n as m,e as k,w as S,T as G,L as R,p as F,F as M,G as U,K as D,j as z,m as N}from"./entry.a8bdde5b.js";import{O as j}from"./overlayeventbus.esm.2d5707d2.js";import{s as q}from"./portal.esm.f9c19ffd.js";import _ from"./virtualscroller.esm.77db94c2.js";var W={name:"Dropdown",emits:["update:modelValue","change","focus","blur","before-show","before-hide","show","hide","filter"],props:{modelValue:null,options:Array,optionLabel:null,optionValue:null,optionDisabled:null,optionGroupLabel:null,optionGroupChildren:null,scrollHeight:{type:String,default:"200px"},filter:Boolean,filterPlaceholder:String,filterLocale:String,filterMatchMode:{type:String,default:"contains"},filterFields:{type:Array,default:null},editable:Boolean,placeholder:{type:String,default:null},disabled:{type:Boolean,default:!1},dataKey:null,showClear:{type:Boolean,default:!1},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},inputProps:{type:null,default:null},panelClass:{type:[String,Object],default:null},panelStyle:{type:Object,default:null},panelProps:{type:null,default:null},filterInputProps:{type:null,default:null},clearIconProps:{type:null,default:null},appendTo:{type:String,default:"body"},loading:{type:Boolean,default:!1},clearIcon:{type:String,default:"pi pi-times"},dropdownIcon:{type:String,default:"pi pi-chevron-down"},filterIcon:{type:String,default:"pi pi-search"},loadingIcon:{type:String,default:"pi pi-spinner pi-spin"},resetFilterOnHide:{type:Boolean,default:!1},virtualScrollerOptions:{type:Object,default:null},autoOptionFocus:{type:Boolean,default:!0},autoFilterFocus:{type:Boolean,default:!1},selectOnFocus:{type:Boolean,default:!1},filterMessage:{type:String,default:null},selectionMessage:{type:String,default:null},emptySelectionMessage:{type:String,default:null},emptyFilterMessage:{type:String,default:null},emptyMessage:{type:String,default:null},tabindex:{type:Number,default:0},"aria-label":{type:String,default:null},"aria-labelledby":{type:String,default:null}},outsideClickListener:null,scrollHandler:null,resizeListener:null,overlay:null,list:null,virtualScroller:null,searchTimeout:null,searchValue:null,isModelValueChanged:!1,focusOnHover:!1,data(){return{id:this.$attrs.id,focused:!1,focusedOptionIndex:-1,filterValue:null,overlayVisible:!1}},watch:{"$attrs.id":function(e){this.id=e||K()},modelValue(){this.isModelValueChanged=!0},options(){this.autoUpdateModel()}},mounted(){this.id=this.id||K(),this.autoUpdateModel()},updated(){this.overlayVisible&&this.isModelValueChanged&&this.scrollInView(this.findSelectedOptionIndex()),this.isModelValueChanged=!1},beforeUnmount(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.overlay&&(C.clear(this.overlay),this.overlay=null)},methods:{getOptionIndex(e,t){return this.virtualScrollerDisabled?e:t&&t(e).index},getOptionLabel(e){return this.optionLabel?h.resolveFieldData(e,this.optionLabel):e},getOptionValue(e){return this.optionValue?h.resolveFieldData(e,this.optionValue):e},getOptionRenderKey(e,t){return(this.dataKey?h.resolveFieldData(e,this.dataKey):this.getOptionLabel(e))+"_"+t},isOptionDisabled(e){return this.optionDisabled?h.resolveFieldData(e,this.optionDisabled):!1},isOptionGroup(e){return this.optionGroupLabel&&e.optionGroup&&e.group},getOptionGroupLabel(e){return h.resolveFieldData(e,this.optionGroupLabel)},getOptionGroupChildren(e){return h.resolveFieldData(e,this.optionGroupChildren)},getAriaPosInset(e){return(this.optionGroupLabel?e-this.visibleOptions.slice(0,e).filter(t=>this.isOptionGroup(t)).length:e)+1},show(e){this.$emit("before-show"),this.overlayVisible=!0,this.focusedOptionIndex=this.focusedOptionIndex!==-1?this.focusedOptionIndex:this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1,e&&a.focus(this.$refs.focusInput)},hide(e){const t=()=>{this.$emit("before-hide"),this.overlayVisible=!1,this.focusedOptionIndex=-1,this.searchValue="",this.resetFilterOnHide&&(this.filterValue=null),e&&a.focus(this.$refs.focusInput)};setTimeout(()=>{t()},0)},onFocus(e){this.disabled||(this.focused=!0,this.focusedOptionIndex=this.focusedOptionIndex!==-1?this.focusedOptionIndex:this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1,this.overlayVisible&&this.scrollInView(this.focusedOptionIndex),this.$emit("focus",e))},onBlur(e){this.focused=!1,this.focusedOptionIndex=-1,this.searchValue="",this.$emit("blur",e)},onKeyDown(e){if(this.disabled){e.preventDefault();return}const t=e.metaKey||e.ctrlKey;switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e,this.editable);break;case"ArrowLeft":case"ArrowRight":this.onArrowLeftKey(e,this.editable);break;case"Home":this.onHomeKey(e,this.editable);break;case"End":this.onEndKey(e,this.editable);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Space":this.onSpaceKey(e,this.editable);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"Backspace":this.onBackspaceKey(e,this.editable);break;case"ShiftLeft":case"ShiftRight":break;default:!t&&h.isPrintableCharacter(e.key)&&(!this.overlayVisible&&this.show(),!this.editable&&this.searchOptions(e,e.key));break}},onEditableInput(e){const t=e.target.value;this.searchValue="",!this.searchOptions(e,t)&&(this.focusedOptionIndex=-1),this.updateModel(e,t)},onContainerClick(e){this.disabled||this.loading||a.hasClass(e.target,"p-dropdown-clear-icon")||e.target.tagName==="INPUT"||(!this.overlay||!this.overlay.contains(e.target))&&(this.overlayVisible?this.hide(!0):this.show(!0))},onClearClick(e){this.updateModel(e,null)},onFirstHiddenFocus(e){const t=e.relatedTarget===this.$refs.focusInput?a.getFirstFocusableElement(this.overlay,":not(.p-hidden-focusable)"):this.$refs.focusInput;a.focus(t)},onLastHiddenFocus(e){const t=e.relatedTarget===this.$refs.focusInput?a.getLastFocusableElement(this.overlay,":not(.p-hidden-focusable)"):this.$refs.focusInput;a.focus(t)},onOptionSelect(e,t,s=!0){const o=this.getOptionValue(t);this.updateModel(e,o),s&&this.hide(!0)},onOptionMouseMove(e,t){this.focusOnHover&&this.changeFocusedOptionIndex(e,t)},onFilterChange(e){const t=e.target.value;this.filterValue=t,this.focusedOptionIndex=-1,this.$emit("filter",{originalEvent:e,value:t}),!this.virtualScrollerDisabled&&this.virtualScroller.scrollToIndex(0)},onFilterKeyDown(e){switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e,!0);break;case"ArrowLeft":case"ArrowRight":this.onArrowLeftKey(e,!0);break;case"Home":this.onHomeKey(e,!0);break;case"End":this.onEndKey(e,!0);break;case"Enter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e,!0);break}},onFilterBlur(){this.focusedOptionIndex=-1},onFilterUpdated(){this.overlayVisible&&this.alignOverlay()},onOverlayClick(e){j.emit("overlay-click",{originalEvent:e,target:this.$el})},onOverlayKeyDown(e){switch(e.code){case"Escape":this.onEscapeKey(e);break}},onArrowDownKey(e){const t=this.focusedOptionIndex!==-1?this.findNextOptionIndex(this.focusedOptionIndex):this.findFirstFocusedOptionIndex();this.changeFocusedOptionIndex(e,t),!this.overlayVisible&&this.show(),e.preventDefault()},onArrowUpKey(e,t=!1){if(e.altKey&&!t)this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(),e.preventDefault();else{const s=this.focusedOptionIndex!==-1?this.findPrevOptionIndex(this.focusedOptionIndex):this.findLastFocusedOptionIndex();this.changeFocusedOptionIndex(e,s),!this.overlayVisible&&this.show(),e.preventDefault()}},onArrowLeftKey(e,t=!1){t&&(this.focusedOptionIndex=-1)},onHomeKey(e,t=!1){t?(e.currentTarget.setSelectionRange(0,0),this.focusedOptionIndex=-1):(this.changeFocusedOptionIndex(e,this.findFirstOptionIndex()),!this.overlayVisible&&this.show()),e.preventDefault()},onEndKey(e,t=!1){if(t){const s=e.currentTarget,o=s.value.length;s.setSelectionRange(o,o),this.focusedOptionIndex=-1}else this.changeFocusedOptionIndex(e,this.findLastOptionIndex()),!this.overlayVisible&&this.show();e.preventDefault()},onPageUpKey(e){this.scrollInView(0),e.preventDefault()},onPageDownKey(e){this.scrollInView(this.visibleOptions.length-1),e.preventDefault()},onEnterKey(e){this.overlayVisible?(this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.hide()):this.onArrowDownKey(e),e.preventDefault()},onSpaceKey(e,t=!1){!t&&this.onEnterKey(e)},onEscapeKey(e){this.overlayVisible&&this.hide(!0),e.preventDefault()},onTabKey(e,t=!1){t||(this.overlayVisible&&this.hasFocusableElements()?(a.focus(this.$refs.firstHiddenFocusableElementOnOverlay),e.preventDefault()):(this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(this.filter)))},onBackspaceKey(e,t=!1){t&&!this.overlayVisible&&this.show()},onOverlayEnter(e){C.set("overlay",e,this.$primevue.config.zIndex.overlay),this.alignOverlay(),this.scrollInView(),this.autoFilterFocus&&a.focus(this.$refs.filterInput)},onOverlayAfterEnter(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit("show")},onOverlayLeave(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit("hide"),this.overlay=null},onOverlayAfterLeave(e){C.clear(e)},alignOverlay(){this.appendTo==="self"?a.relativePosition(this.overlay,this.$el):(this.overlay.style.minWidth=a.getOuterWidth(this.$el)+"px",a.absolutePosition(this.overlay,this.$el))},bindOutsideClickListener(){this.outsideClickListener||(this.outsideClickListener=e=>{this.overlayVisible&&this.overlay&&!this.$el.contains(e.target)&&!this.overlay.contains(e.target)&&this.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener(){this.scrollHandler||(this.scrollHandler=new H(this.$refs.container,()=>{this.overlayVisible&&this.hide()})),this.scrollHandler.bindScrollListener()},unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener(){this.resizeListener||(this.resizeListener=()=>{this.overlayVisible&&!a.isTouchDevice()&&this.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},hasFocusableElements(){return a.getFocusableElements(this.overlay,":not(.p-hidden-focusable)").length>0},isOptionMatched(e){return this.isValidOption(e)&&this.getOptionLabel(e).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale))},isValidOption(e){return e&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))},isValidSelectedOption(e){return this.isValidOption(e)&&this.isSelected(e)},isSelected(e){return this.isValidOption(e)&&h.equals(this.modelValue,this.getOptionValue(e),this.equalityKey)},findFirstOptionIndex(){return this.visibleOptions.findIndex(e=>this.isValidOption(e))},findLastOptionIndex(){return h.findLastIndex(this.visibleOptions,e=>this.isValidOption(e))},findNextOptionIndex(e){const t=e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(s=>this.isValidOption(s)):-1;return t>-1?t+e+1:e},findPrevOptionIndex(e){const t=e>0?h.findLastIndex(this.visibleOptions.slice(0,e),s=>this.isValidOption(s)):-1;return t>-1?t:e},findSelectedOptionIndex(){return this.hasSelectedOption?this.visibleOptions.findIndex(e=>this.isValidSelectedOption(e)):-1},findFirstFocusedOptionIndex(){const e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e},findLastFocusedOptionIndex(){const e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e},searchOptions(e,t){this.searchValue=(this.searchValue||"")+t;let s=-1,o=!1;return this.focusedOptionIndex!==-1?(s=this.visibleOptions.slice(this.focusedOptionIndex).findIndex(n=>this.isOptionMatched(n)),s=s===-1?this.visibleOptions.slice(0,this.focusedOptionIndex).findIndex(n=>this.isOptionMatched(n)):s+this.focusedOptionIndex):s=this.visibleOptions.findIndex(n=>this.isOptionMatched(n)),s!==-1&&(o=!0),s===-1&&this.focusedOptionIndex===-1&&(s=this.findFirstFocusedOptionIndex()),s!==-1&&this.changeFocusedOptionIndex(e,s),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(()=>{this.searchValue="",this.searchTimeout=null},500),o},changeFocusedOptionIndex(e,t){this.focusedOptionIndex!==t&&(this.focusedOptionIndex=t,this.scrollInView(),this.selectOnFocus&&this.onOptionSelect(e,this.visibleOptions[t],!1))},scrollInView(e=-1){const t=e!==-1?`${this.id}_${e}`:this.focusedOptionId,s=a.findSingle(this.list,`li[id="${t}"]`);s?s.scrollIntoView&&s.scrollIntoView({block:"nearest",inline:"start"}):this.virtualScrollerDisabled||setTimeout(()=>{this.virtualScroller&&this.virtualScroller.scrollToIndex(e!==-1?e:this.focusedOptionIndex)},0)},autoUpdateModel(){this.selectOnFocus&&this.autoOptionFocus&&!this.hasSelectedOption&&(this.focusedOptionIndex=this.findFirstFocusedOptionIndex(),this.onOptionSelect(null,this.visibleOptions[this.focusedOptionIndex],!1))},updateModel(e,t){this.$emit("update:modelValue",t),this.$emit("change",{originalEvent:e,value:t})},flatOptions(e){return(e||[]).reduce((t,s,o)=>{t.push({optionGroup:s,group:!0,index:o});const n=this.getOptionGroupChildren(s);return n&&n.forEach(i=>t.push(i)),t},[])},overlayRef(e){this.overlay=e},listRef(e,t){this.list=e,t&&t(e)},virtualScrollerRef(e){this.virtualScroller=e}},computed:{containerClass(){return["p-dropdown p-component p-inputwrapper",{"p-disabled":this.disabled,"p-dropdown-clearable":this.showClear&&!this.disabled,"p-focus":this.focused,"p-inputwrapper-filled":this.modelValue,"p-inputwrapper-focus":this.focused||this.overlayVisible,"p-overlay-open":this.overlayVisible}]},inputStyleClass(){return["p-dropdown-label p-inputtext",this.inputClass,{"p-placeholder":!this.editable&&this.label===this.placeholder,"p-dropdown-label-empty":!this.editable&&!this.$slots.value&&(this.label==="p-emptylabel"||this.label.length===0)}]},panelStyleClass(){return["p-dropdown-panel p-component",this.panelClass,{"p-input-filled":this.$primevue.config.inputStyle==="filled","p-ripple-disabled":this.$primevue.config.ripple===!1}]},dropdownIconClass(){return["p-dropdown-trigger-icon",this.loading?this.loadingIcon:this.dropdownIcon]},visibleOptions(){const e=this.optionGroupLabel?this.flatOptions(this.options):this.options||[];if(this.filterValue){const t=B.filter(e,this.searchFields,this.filterValue,this.filterMatchMode,this.filterLocale);if(this.optionGroupLabel){const s=this.options||[],o=[];return s.forEach(n=>{const I=this.getOptionGroupChildren(n).filter(V=>t.includes(V));I.length>0&&o.push({...n,[typeof this.optionGroupChildren=="string"?this.optionGroupChildren:"items"]:[...I]})}),this.flatOptions(o)}return t}return e},hasSelectedOption(){return h.isNotEmpty(this.modelValue)},label(){const e=this.findSelectedOptionIndex();return e!==-1?this.getOptionLabel(this.visibleOptions[e]):this.placeholder||"p-emptylabel"},editableInputValue(){const e=this.findSelectedOptionIndex();return e!==-1?this.getOptionLabel(this.visibleOptions[e]):this.modelValue||""},equalityKey(){return this.optionValue?null:this.dataKey},searchFields(){return this.filterFields||[this.optionLabel]},filterResultMessageText(){return h.isNotEmpty(this.visibleOptions)?this.filterMessageText.replaceAll("{0}",this.visibleOptions.length):this.emptyFilterMessageText},filterMessageText(){return this.filterMessage||this.$primevue.config.locale.searchMessage||""},emptyFilterMessageText(){return this.emptyFilterMessage||this.$primevue.config.locale.emptySearchMessage||this.$primevue.config.locale.emptyFilterMessage||""},emptyMessageText(){return this.emptyMessage||this.$primevue.config.locale.emptyMessage||""},selectionMessageText(){return this.selectionMessage||this.$primevue.config.locale.selectionMessage||""},emptySelectionMessageText(){return this.emptySelectionMessage||this.$primevue.config.locale.emptySelectionMessage||""},selectedMessageText(){return this.hasSelectedOption?this.selectionMessageText.replaceAll("{0}","1"):this.emptySelectionMessageText},focusedOptionId(){return this.focusedOptionIndex!==-1?`${this.id}_${this.focusedOptionIndex}`:null},ariaSetSize(){return this.visibleOptions.filter(e=>!this.isOptionGroup(e)).length},virtualScrollerDisabled(){return!this.virtualScrollerOptions}},directives:{ripple:P},components:{VirtualScroller:_,Portal:q}};const Z=["id"],J=["id","value","placeholder","tabindex","disabled","aria-label","aria-labelledby","aria-expanded","aria-controls","aria-activedescendant"],Q=["id","tabindex","aria-label","aria-labelledby","aria-expanded","aria-controls","aria-activedescendant","aria-disabled"],X={class:"p-dropdown-trigger"},Y={key:0,class:"p-dropdown-header"},$={class:"p-dropdown-filter-container"},ee=["value","placeholder","aria-owns","aria-activedescendant"],te={role:"status","aria-live":"polite",class:"p-hidden-accessible"},ie=["id"],se=["id"],le=["id","aria-label","aria-selected","aria-disabled","aria-setsize","aria-posinset","onClick","onMousemove"],ne={key:0,class:"p-dropdown-empty-message",role:"option"},oe={key:1,class:"p-dropdown-empty-message",role:"option"},ae={key:1,role:"status","aria-live":"polite",class:"p-hidden-accessible"},re={role:"status","aria-live":"polite",class:"p-hidden-accessible"};function de(e,t,s,o,n,i){const I=D("VirtualScroller"),V=D("Portal"),E=z("ripple");return d(),u("div",{ref:"container",id:n.id,class:m(i.containerClass),onClick:t[16]||(t[16]=(...l)=>i.onContainerClick&&i.onContainerClick(...l))},[s.editable?(d(),u("input",O({key:0,ref:"focusInput",id:s.inputId,type:"text",style:s.inputStyle,class:i.inputStyleClass,value:i.editableInputValue,placeholder:s.placeholder,tabindex:s.disabled?-1:s.tabindex,disabled:s.disabled,autocomplete:"off",role:"combobox","aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"aria-haspopup":"listbox","aria-expanded":n.overlayVisible,"aria-controls":n.id+"_list","aria-activedescendant":n.focused?i.focusedOptionId:void 0,onFocus:t[0]||(t[0]=(...l)=>i.onFocus&&i.onFocus(...l)),onBlur:t[1]||(t[1]=(...l)=>i.onBlur&&i.onBlur(...l)),onKeydown:t[2]||(t[2]=(...l)=>i.onKeyDown&&i.onKeyDown(...l)),onInput:t[3]||(t[3]=(...l)=>i.onEditableInput&&i.onEditableInput(...l))},s.inputProps),null,16,J)):(d(),u("span",O({key:1,ref:"focusInput",id:s.inputId,style:s.inputStyle,class:i.inputStyleClass,tabindex:s.disabled?-1:s.tabindex,role:"combobox","aria-label":e.ariaLabel||(i.label==="p-emptylabel"?void 0:i.label),"aria-labelledby":e.ariaLabelledby,"aria-haspopup":"listbox","aria-expanded":n.overlayVisible,"aria-controls":n.id+"_list","aria-activedescendant":n.focused?i.focusedOptionId:void 0,"aria-disabled":s.disabled,onFocus:t[4]||(t[4]=(...l)=>i.onFocus&&i.onFocus(...l)),onBlur:t[5]||(t[5]=(...l)=>i.onBlur&&i.onBlur(...l)),onKeydown:t[6]||(t[6]=(...l)=>i.onKeyDown&&i.onKeyDown(...l))},s.inputProps),[c(e.$slots,"value",{value:s.modelValue,placeholder:s.placeholder},()=>[g(y(i.label==="p-emptylabel"?" ":i.label||"empty"),1)])],16,Q)),s.showClear&&s.modelValue!=null?(d(),u("i",O({key:2,class:["p-dropdown-clear-icon",s.clearIcon],onClick:t[7]||(t[7]=(...l)=>i.onClearClick&&i.onClearClick(...l))},s.clearIconProps),null,16)):v("",!0),p("div",X,[c(e.$slots,"indicator",{},()=>[p("span",{class:m(i.dropdownIconClass),"aria-hidden":"true"},null,2)])]),k(V,{appendTo:s.appendTo},{default:S(()=>[k(G,{name:"p-connected-overlay",onEnter:i.onOverlayEnter,onAfterEnter:i.onOverlayAfterEnter,onLeave:i.onOverlayLeave,onAfterLeave:i.onOverlayAfterLeave},{default:S(()=>[n.overlayVisible?(d(),u("div",O({key:0,ref:i.overlayRef,style:s.panelStyle,class:i.panelStyleClass,onClick:t[14]||(t[14]=(...l)=>i.onOverlayClick&&i.onOverlayClick(...l)),onKeydown:t[15]||(t[15]=(...l)=>i.onOverlayKeyDown&&i.onOverlayKeyDown(...l))},s.panelProps),[p("span",{ref:"firstHiddenFocusableElementOnOverlay",role:"presentation","aria-hidden":"true",class:"p-hidden-accessible p-hidden-focusable",tabindex:0,onFocus:t[8]||(t[8]=(...l)=>i.onFirstHiddenFocus&&i.onFirstHiddenFocus(...l))},null,544),c(e.$slots,"header",{value:s.modelValue,options:i.visibleOptions}),s.filter?(d(),u("div",Y,[p("div",$,[p("input",O({ref:"filterInput",type:"text",value:n.filterValue,onVnodeUpdated:t[9]||(t[9]=(...l)=>i.onFilterUpdated&&i.onFilterUpdated(...l)),class:"p-dropdown-filter p-inputtext p-component",placeholder:s.filterPlaceholder,role:"searchbox",autocomplete:"off","aria-owns":n.id+"_list","aria-activedescendant":i.focusedOptionId,onKeydown:t[10]||(t[10]=(...l)=>i.onFilterKeyDown&&i.onFilterKeyDown(...l)),onBlur:t[11]||(t[11]=(...l)=>i.onFilterBlur&&i.onFilterBlur(...l)),onInput:t[12]||(t[12]=(...l)=>i.onFilterChange&&i.onFilterChange(...l))},s.filterInputProps),null,16,ee),p("span",{class:m(["p-dropdown-filter-icon",s.filterIcon])},null,2)]),p("span",te,y(i.filterResultMessageText),1)])):v("",!0),p("div",{class:"p-dropdown-items-wrapper",style:F({"max-height":i.virtualScrollerDisabled?s.scrollHeight:""})},[k(I,O({ref:i.virtualScrollerRef},s.virtualScrollerOptions,{items:i.visibleOptions,style:{height:s.scrollHeight},tabindex:-1,disabled:i.virtualScrollerDisabled}),R({content:S(({styleClass:l,contentRef:T,items:w,getItemOptions:f,contentStyle:A,itemSize:x})=>[p("ul",{ref:r=>i.listRef(r,T),id:n.id+"_list",class:m(["p-dropdown-items",l]),style:F(A),role:"listbox"},[(d(!0),u(M,null,U(w,(r,b)=>(d(),u(M,{key:i.getOptionRenderKey(r,i.getOptionIndex(b,f))},[i.isOptionGroup(r)?(d(),u("li",{key:0,id:n.id+"_"+i.getOptionIndex(b,f),style:F({height:x?x+"px":void 0}),class:"p-dropdown-item-group",role:"option"},[c(e.$slots,"optiongroup",{option:r.optionGroup,index:i.getOptionIndex(b,f)},()=>[g(y(i.getOptionGroupLabel(r.optionGroup)),1)])],12,se)):N((d(),u("li",{key:1,id:n.id+"_"+i.getOptionIndex(b,f),style:F({height:x?x+"px":void 0}),class:m(["p-dropdown-item",{"p-highlight":i.isSelected(r),"p-focus":n.focusedOptionIndex===i.getOptionIndex(b,f),"p-disabled":i.isOptionDisabled(r)}]),role:"option","aria-label":i.getOptionLabel(r),"aria-selected":i.isSelected(r),"aria-disabled":i.isOptionDisabled(r),"aria-setsize":i.ariaSetSize,"aria-posinset":i.getAriaPosInset(i.getOptionIndex(b,f)),onClick:L=>i.onOptionSelect(L,r),onMousemove:L=>i.onOptionMouseMove(L,i.getOptionIndex(b,f))},[c(e.$slots,"option",{option:r,index:i.getOptionIndex(b,f)},()=>[g(y(i.getOptionLabel(r)),1)])],46,le)),[[E]])],64))),128)),n.filterValue&&(!w||w&&w.length===0)?(d(),u("li",ne,[c(e.$slots,"emptyfilter",{},()=>[g(y(i.emptyFilterMessageText),1)])])):!s.options||s.options&&s.options.length===0?(d(),u("li",oe,[c(e.$slots,"empty",{},()=>[g(y(i.emptyMessageText),1)])])):v("",!0)],14,ie)]),_:2},[e.$slots.loader?{name:"loader",fn:S(({options:l})=>[c(e.$slots,"loader",{options:l})]),key:"0"}:void 0]),1040,["items","style","disabled"])],4),c(e.$slots,"footer",{value:s.modelValue,options:i.visibleOptions}),!s.options||s.options&&s.options.length===0?(d(),u("span",ae,y(i.emptyMessageText),1)):v("",!0),p("span",re,y(i.selectedMessageText),1),p("span",{ref:"lastHiddenFocusableElementOnOverlay",role:"presentation","aria-hidden":"true",class:"p-hidden-accessible p-hidden-focusable",tabindex:0,onFocus:t[13]||(t[13]=(...l)=>i.onLastHiddenFocus&&i.onLastHiddenFocus(...l))},null,544)],16)):v("",!0)]),_:3},8,["onEnter","onAfterEnter","onLeave","onAfterLeave"])]),_:3},8,["appendTo"])],10,Z)}function ue(e,t){t===void 0&&(t={});var s=t.insertAt;if(!(!e||typeof document>"u")){var o=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",s==="top"&&o.firstChild?o.insertBefore(n,o.firstChild):o.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}var he=`
.p-dropdown {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;
}
.p-dropdown-clear-icon {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
}
.p-dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.p-dropdown-label {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    flex: 1 1 auto;
    width: 1%;
    text-overflow: ellipsis;
    cursor: pointer;
}
.p-dropdown-label-empty {
    overflow: hidden;
    opacity: 0;
}
input.p-dropdown-label {
    cursor: default;
}
.p-dropdown .p-dropdown-panel {
    min-width: 100%;
}
.p-dropdown-panel {
    position: absolute;
    top: 0;
    left: 0;
}
.p-dropdown-items-wrapper {
    overflow: auto;
}
.p-dropdown-item {
    cursor: pointer;
    font-weight: normal;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
}
.p-dropdown-item-group {
    cursor: auto;
}
.p-dropdown-items {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
.p-dropdown-filter {
    width: 100%;
}
.p-dropdown-filter-container {
    position: relative;
}
.p-dropdown-filter-icon {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
}
.p-fluid .p-dropdown {
    display: flex;
}
.p-fluid .p-dropdown .p-dropdown-label {
    width: 1%;
}
`;ue(he);W.render=de;export{W as default};