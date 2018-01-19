/*! Built with http://stenciljs.com */
virtualscroll.loadComponents(function(t,i,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function t(){this.list=[],this.selector="",this.bottomOffset=0,this.virtualRatio=3,this.changed=[],this.position=0,this.parentScrollHeight=0,this.vscrollOffsetTop=0,this.contentOffsetTop=0,this.elementOffsetTop=0,this.infinateOn=!0,this.infinateFinally=!1,this.totalHeight=0,this.listDimensions=[],this.initRender=!1,this.toNextUpdateDimensions=!1,this.stackToDelete=[],this.scrollEventDispatch=function(){}}return t.prototype.dataDidChangeHandler=function(t,i){var e=this;if(i.length>0){var s=i.filter(function(i){return 0==t.filter(function(t){return t.index==i.index}).length});s.length>0&&s.map(function(t){e._deleteDimension(t.index)})}this.list.map(function(t,i){t.index||(t.index=i)}),this.updateVirtual(!0),this._setDimensions()},t.prototype.componentDidLoad=function(){var t=this;this._setDefParams(),this.selector.length>0?this.parentScroll=this.el.closest("."+this.selector):this.parentScroll=this.el.querySelector(".vscroll"),this.parentScrollHeight=this.parentScroll.offsetHeight,this.contentOffsetTop=this.parentScroll?this.parentScroll.offsetTop:0,this.contentEl=this.el.querySelector(".vscroll-content");var i=this.el.querySelector(".vscroll");this.vscrollOffsetTop=i?i.offsetTop:0,this.scrollEventDispatch=this.parentScroll.addEventListener("scroll",function(i){t.parentScroll.scrollTop-t.vscrollOffsetTop-t.elementOffsetTop+t.parentScrollHeight<0||(t.position=t.parentScroll.scrollTop-t.vscrollOffsetTop-t.elementOffsetTop,t.updateVirtual())},!1)},t.prototype.unwatch=function(){this.parentScroll&&this.parentScroll.removeEventListener("scroll",this._listener)},t.prototype._listener=function(){this.position=this.parentScroll.scrollTop-this.vscrollOffsetTop,this.updateVirtual()},t.prototype.componentDidUnload=function(){this.unwatch(),this.scrollEventDispatch&&(this.scrollEventDispatch(),this.scrollEventDispatch=null)},t.prototype.componentWillLoad=function(){},t.prototype._setDefParams=function(){this.first=null,this.last=null,this.listDimensions=[],this.totalHeight=0,this.position=0,this.infinateOn=!0,this.infinateFinally=!1},t.prototype.updateVirtual=function(t){var i=this;void 0===t&&(t=!1);var e=this.first?this.first.rindex:0,s=this.last?this.last.rindex:0;if(this.first=this.listDimensions.filter(function(t){return i.position>=t.start&&i.position<t.end})[0],this.last=this.listDimensions.filter(function(t){return i.position+i.parentScroll.clientHeight>=t.start&&i.position+i.parentScroll.clientHeight<t.end})[0],this.last||(this.last=this.listDimensions[this.listDimensions.length-1]),this.first&&this.last){var n=this.last.rindex+this.virtualRatio>=this.list.length?this.list.length:this.last.rindex+this.virtualRatio,o=this.first.rindex-this.virtualRatio<0?0:this.first.rindex-this.virtualRatio;n==this.list.length&&this.totalHeight-this.position-this.parentScrollHeight<0&&(o=e-this.virtualRatio<0?0:e-this.virtualRatio,this.first=this.listDimensions.filter(function(t){return t.rindex==e})[0]);var l=[];this.list.length>0&&(l=this.list.slice(o,n)),(e!=this.first.rindex||s!=this.last.rindex||t)&&(requestAnimationFrame(function(){var e=i.listDimensions.filter(function(t){return t.rindex==o})[0];e&&(i.contentEl.style.transform="translateY("+e.start+"px)",i.contentEl.style.webkitTransform="translateY("+e.start+"px)"),i.update.emit(l),t&&(i.changed=i.changed.concat([""]))}),this.changed=this.changed.concat([""]))}else if(this.list.length>0){var r=this.list.slice(0,20);this.update.emit(r),this.changed=this.changed.concat([""])}this.last&&this.last.rindex>=this.list.length-1-this.bottomOffset&&this.infinateOn&&!this.infinateFinally&&this.list.length>0&&(this.infinateOn=!1,this.toBottom.emit(this.position))},t.prototype.setInfinateOn=function(){this.infinateOn=!0},t.prototype.setInfinateFinally=function(){this.infinateFinally=!0},t.prototype.clear=function(){var t=this;requestAnimationFrame(function(){t.list=[],t._setDefParams(),t.contentEl.style.transform="translateY(0px)",t.contentEl.style.webkitTransform="translateY(0px)",t.changed=t.changed.concat([""])})},t.prototype.scrollToNode=function(t,i,e){if(void 0===e&&(e=0),this.parentScroll)if(t<=this.listDimensions.length-1){var s=this.listDimensions.filter(function(i){return i.rindex==t})[0];this._scrollTo(s.start+e,i)}else this._scrollToIndex(t)},t.prototype._scrollToIndex=function(t){var i=this;setTimeout(function(){i.parentScroll.scrollTop=i.parentScroll.scrollTop+100,i.first&&i.first.rindex===t||i._scrollToIndex(t)},10)},t.prototype._scrollTo=function(t,i){var e=this;if(!(i<=0)){var s=(t-this.parentScroll.scrollTop)/i*10;setTimeout(function(){e.parentScroll.scrollTop=e.parentScroll.scrollTop+s,e.parentScroll.scrollTop!==t&&e._scrollTo(t,i-10)},10)}},t.prototype._setDimensions=function(){var t=this.totalHeight;this.toNextUpdateDimensions&&(this.listDimensions=[]),this.toNextUpdateDimensions=!1;var i=this.el.querySelectorAll(".virtual-slot .virtual-item");if(i.length>0)for(var e=function(t){var e=i[t],n=e.id;s.listDimensions.filter(function(t){return t.rindex==n})[0]||(s._addNewDimensionToEnd(e.offsetHeight,n),s.totalHeight=s.listDimensions[s.listDimensions.length-1].end)},s=this,n=0;n<=i.length-1;n++)e(n);return this.totalHeight!=t},t.prototype._addNewDimensionToEnd=function(t,i){var e=this.listDimensions.length>0?this.listDimensions[this.listDimensions.length-1].end:0;this.listDimensions.push({height:t,start:e,end:e+t,rindex:parseInt(i)})},t.prototype._deleteDimension=function(t){var i=this.listDimensions.filter(function(i){return i.rindex==t})[0];if(i){i.start=0,i.end=0;for(var e=t+1;e<=this.listDimensions.length-1;e++)this.listDimensions[e].start=this.listDimensions[e].start-i.height,this.listDimensions[e].end=this.listDimensions[e].end-i.height;var s=this.listDimensions.filter(function(t){return t.end>0});0==s.length?this.totalHeight=0:this.totalHeight=s[s.length-1].end}},t.prototype.refresh=function(){this.toNextUpdateDimensions=!0},t.prototype._testDimensions=function(){var t=this.el.querySelector(".virtual-slot").childNodes;if(t.length>0)for(var i=function(i){var s=t[i],n=s.id,o=e.listDimensions.filter(function(t){return t.rindex==n})[0];o&&(o.height,s.offsetHeight)},e=this,s=0;s<=t.length-1;s++)i(s)},t.prototype.componentDidUpdate=function(){var t=this._setDimensions();this.initRender?(t&&(this.changed=this.changed.concat([""])),this._testDimensions()):(this.initRender=!0,this.selector.length>0&&(this.elementOffsetTop=this.el.offsetTop),this.updateVirtual())},t.prototype.render=function(){return i("div",{class:"vscroll "+(this.selector.length>0?"external ":"inner ")+(this.infinateFinally?"infinate-finally ":" ")+(0==this.list.length?"cleared":"")},i("div",{class:"vscroll-back",style:{height:this.totalHeight+"px"}}),i("div",{class:"vscroll-content "+(this.selector.length>0?"external":"inner")},i("slot",{name:"virtual"})),i("slot",{name:"loader"}))},Object.defineProperty(t,"is",{get:function(){return"virtual-scroll"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{bottomOffset:{type:Number},changed:{state:!0},clear:{method:!0},el:{elementRef:!0},list:{type:"Any",watchCallbacks:["dataDidChangeHandler"]},refresh:{method:!0},scrollToNode:{method:!0},selector:{type:String},setInfinateFinally:{method:!0},setInfinateOn:{method:!0},virtualRatio:{type:Number}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"toBottom",method:"toBottom",bubbles:!0,cancelable:!0,composed:!0},{name:"update",method:"update",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".vscroll.inner{overflow-y:auto;height:100%}.vscroll.external{overflow-y:hidden}.vscroll{overflow-x:hidden;position:relative;display:block}.vscroll .vscroll-back{width:1px;opacity:0}.vscroll .vscroll-content{top:0;left:0;width:100%;position:absolute}.vscroll .vscroll-content.inner{height:100%}.infinate-finally div[slot=loader]{visibility:hidden}.cleared div[slot=loader]{display:none}virual-scroll{height:100%;display:block}"},enumerable:!0,configurable:!0}),t}();t.VirtualScroll=s},"bacsfdtv");