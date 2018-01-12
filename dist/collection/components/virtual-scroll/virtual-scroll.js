/*
logic of this component base on

Component can work in two "scroll states"
1. Inner scroll container. scroll event listen inner html element 'vscroll'
2. External scroll component. scroll event listen on inner html element, he most set in component attributes
External scroll container must heip if ypu are using some additional content on page,
and it must scrolled with scroll component.

*/
import { EventEmitter } from '@stencil/core';
export class VirualScrollWebComponent {
    constructor() {
        //list og imported values
        this.list = [];
        //class selector
        this.selector = '';
        //offset bottom event
        this.bottomOffset = 0;
        //change detection strategy
        this.changed = [];
        //position of scroll
        this.position = 0;
        //virtual items list
        //private virtual: Array<any> = [];
        //virtual list translateY
        this.topPadding = 0;
        //full height of component
        this.totalHeight = 0;
        //reserve of the bootom rows
        this.bottomOffsetIndex = 3;
        //list items dimensions
        this.listDimensions = [];
        //state to enable bottom infinate event
        this.infinateOn = true;
        //state to common disable bottom infinate event
        this.infinateFinally = false;
        //bool state to detect init render
        this.initRender = false;
        //offset of scroll
        this.vscrollOffsetTop = 0;
        //offset of contentpage
        this.contentOffsetTop = 0;
    }
    //change list event
    dataDidChangeHandler() {
        this.list.map((m, i) => {
            if (!m.index) {
                m.index = i;
            }
        });
        this.updateVirtual(true);
        //recalculation dimesions of list items
        this._addDimensions();
    }
    //life cicle methods
    componentDidLoad() {
        //console.log('this.totalHeight', this.selector)
        if (this.selector.length > 0) {
            this.parentScroll = document.querySelector('.' + this.selector);
        }
        else {
            this.parentScroll = this.el.querySelector('.vscroll');
        }
        //console.log('this.parentScroll', this.parentScroll)
        this.init();
    }
    //life cicle methods
    componentDidUnload() {
        this.unwatch();
    }
    //life cicle methods
    componentWillLoad() {
    }
    //init/reinit
    init() {
        this.first = null;
        this.last = null;
        this.topPadding = 0;
        this.totalHeight = 0;
        this.listDimensions = [];
        //this.virtual = [];
        this.position = 0;
        let content = this.parentScroll;
        this.contentOffsetTop = (content) ? content['offsetTop'] : 0;
        let vscroll = this.el.querySelector('.vscroll');
        this.vscrollOffsetTop = (vscroll) ? vscroll['offsetTop'] : 0;
        this.scrollEventSubscriber = this.parentScroll.addEventListener('scroll', (e) => {
            this.position = this.parentScroll['scrollTop'] - this.vscrollOffsetTop;
            this.updateVirtual();
        });
    }
    //dispatch listener of scroll on unload
    unwatch() {
        if (this.scrollEventSubscriber) {
            this.scrollEventSubscriber.unsubscribe();
        }
    }
    //update virtual list items
    updateVirtual(update = false) {
        let findex = (this.first) ? this.first.rindex : 0;
        let lindex = (this.last) ? this.last.rindex : 0;
        //get first and last viewed nodes by position
        this.first = this.listDimensions.filter(f => this.position >= f.start && this.position < f.end)[0];
        this.last = this.listDimensions.filter(f => this.position + this.parentScroll.clientHeight >= f.start && this.position + this.parentScroll.clientHeight < f.end)[0];
        //if last node by position is null, take last of list
        if (!this.last) {
            this.last = this.listDimensions[this.listDimensions.length - 1];
        }
        //if first/last exist, set topPadding(content transformY).
        //virtual list set ...
        if (this.first && this.last) {
            this.topPadding = this.first.start;
            let v = this.list.slice(this.first.rindex, this.last.rindex + this.bottomOffsetIndex);
            if ((findex != this.first.rindex || lindex != this.last.rindex) || update) {
                //this.virtual = v;
                this.update.emit(v);
                //change detection
                this.changed = [...this.changed, ''];
            }
        }
        else {
            let v = this.list.slice(0, 20);
            //this.virtual = v;
            this.update.emit(v);
            //change detection
            this.changed = [...this.changed, ''];
        }
        //bottom event
        if (this.last && this.last.rindex >= this.list.length - 1 - this.bottomOffset) {
            if (this.infinateOn && !this.infinateFinally) {
                this.infinateOn = false;
                this.toBottom.emit(this.position);
            }
        }
    }
    //set infinate on status to send events
    setInfinateOn() {
        this.infinateOn = true;
    }
    //set infinate off status to send events
    setInfinateFinally() {
        this.infinateFinally = true;
    }
    //recalculation dimesions of list items
    _addDimensions() {
        let oldTotal = this.totalHeight;
        let nodes = this.el.querySelectorAll('.virtual-slot .virtual-item');
        //console.log(nodes)
        if (nodes.length > 0) {
            for (let vindex = 0; vindex <= nodes.length - 1; vindex++) {
                let node = nodes[vindex];
                let index = node['id'];
                if (!this.listDimensions[index]) {
                    this._addNewDimension(node['offsetHeight'], index);
                    this.totalHeight = this.listDimensions[this.listDimensions.length - 1].end;
                }
            }
        }
        //console.log('this.listDimensions', this.listDimensions)
        return (this.totalHeight != oldTotal);
    }
    //Append new dimensions of list item
    _addNewDimension(height, rindex) {
        let parentEnd = (this.listDimensions.length > 0) ? this.listDimensions[this.listDimensions.length - 1].end : 0;
        this.listDimensions.push({
            height: height,
            start: parentEnd,
            end: parentEnd + height,
            rindex: parseInt(rindex)
        });
    }
    //Append new dimensions of list item
    _testDimensions() {
        let nodes = this.el.querySelector('.virtual-slot').childNodes;
        let offsetIndex = (this.first && this.first.rindex > 0) ? this.first.rindex : 0;
        this.list.map((m, i) => {
            if (this.listDimensions[i] && nodes[i - offsetIndex]) {
                if (nodes[i - offsetIndex]['offsetHeight'] != this.listDimensions[i].height) {
                    console.warn("One or more nodes change height after calculation dimensions. Check scroll", i);
                    // console.log("nodes[i - offsetIndex]['offsetHeight']", nodes[i - offsetIndex]['offsetHeight'])
                    // console.log("nodes[i - offsetIndex][id]", nodes[i - offsetIndex]['id'])
                    // console.log("this.listDimensions[i].height", this.listDimensions[i].height)
                    // console.log("i - offsetIndex", i - offsetIndex);
                    // console.log("i", i);
                }
            }
        });
    }
    componentDidUpdate() {
        //after component render, need to add new dimensions if virtual nodes, change height
        //if is init render need call update virtual, 
        //if is not init check update height. If height change render again!
        let isNewHeight = this._addDimensions();
        //console.log("componentDidUpdate", isNewHeight);
        //if first render finished, recalculate virtual
        if (!this.initRender) {
            this.initRender = true;
            this.updateVirtual();
        }
        else {
            if (isNewHeight) {
                //change detection
                this.changed = [...this.changed, ''];
            }
            this._testDimensions();
        }
    }
    render() {
        return (h("div", { class: "vscroll " + (this.selector.length > 0 ? 'external ' : 'inner ') + (this.infinateFinally ? 'infinate-finally' : '') },
            h("div", { class: "vscroll-back", style: { height: this.totalHeight + 'px' } }),
            h("div", { class: "vscroll-content " + (this.selector.length > 0 ? 'external' : 'inner'), style: { transform: 'translateY(' + this.topPadding + 'px)' } },
                h("slot", { name: "virtual" })),
            h("slot", { name: "loader" })));
    }
}
