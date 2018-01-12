/*! Built with http://stenciljs.com */

window['stenciljs-virtual-scroll'].loadStyles("fetch-helper",".cover {\n  position: relative;\n  width: 150px;\n  height: 150px;\n  background-size: cover;\n  margin: 0 auto;\n}\n\n.title {\n  font-size: 15px;\n  height: 40px;\n  text-align: center;\n}\n\n.cover:after {\n  content: \"\";\n  display: block;\n  padding-bottom: 67%;\n}\n\n.reload {\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 10px;\n  padding: 10px;\n  background: #ccc;\n  cursor: pointer;\n  z-index: 1;\n}\nfetch-helper.hydrated{visibility:inherit}");
window['stenciljs-virtual-scroll'].loadComponents(

/**** module id (dev mode) ****/
"fetch-helper",

/**** component modules ****/
function importComponent(exports, h, Context, publicPath) {
"use strict";
class FetchHelperWebComponent {
    constructor() {
        this.list = [];
        //class selector
        this.selector = '';
        this.virtual = [];
        //change detection strategy
        this.changed = [];
    }
    componentWillLoad() {
        this.request();
    }
    request() {
        let headers = {};
        headers['Content-Type'] = 'application/json';
        headers['token'] = 'kRuGZ3Xd';
        let mode = "cors";
        let options = {
            method: 'GET',
            mode: mode,
            headers: new Headers(headers)
        };
        let request = new Request("https://jsonplaceholder.typicode.com/photos", options);
        fetch(request).then(response => { return response.json(); }).then(r => {
            r.splice(0, 50).map(m => {
                m.index = this.list.length;
                this.list = [...this.list, m];
            });
            const scrollTag = this.el.querySelector('virtual-scroll');
            scrollTag.list = this.list;
            scrollTag.addEventListener('toBottom', (event) => {
                this.lazyRequest();
            });
            scrollTag.addEventListener('update', (event) => {
                console.log('update');
                this.virtual = event.detail;
                this.changed = [...this.changed, ''];
            });
        });
    }
    lazyRequest() {
        let headers = {};
        headers['Content-Type'] = 'application/json';
        let mode = "cors";
        let options = {
            method: 'GET',
            mode: mode,
            headers: new Headers(headers)
        };
        let request = new Request("https://jsonplaceholder.typicode.com/photos", options);
        fetch(request).then(response => { return response.json(); }).then(r => {
            setTimeout(() => {
                r.splice(0, 50).map(m => {
                    m.index = this.list.length;
                    this.list = [...this.list, m];
                });
                const scrollTag = this.el.querySelector('virtual-scroll');
                scrollTag.list = this.list;
                if (this.list.length > 200) {
                    scrollTag.setInfinateFinally();
                }
                else {
                    scrollTag.setInfinateOn();
                }
            }, 3000);
        });
    }
    reload(event) {
        const scrollTag = this.el.querySelector('virtual-scroll');
        scrollTag.list = [];
        scrollTag.clear();
        this.changed = [...this.changed, ''];
        setTimeout(() => {
            let headers = {};
            headers['Content-Type'] = 'application/json';
            let mode = "cors";
            let options = {
                method: 'GET',
                mode: mode,
                headers: new Headers(headers)
            };
            let request = new Request("https://jsonplaceholder.typicode.com/photos", options);
            fetch(request).then(response => { return response.json(); }).then(r => {
                r.splice(0, 50).map(m => {
                    m.index = this.list.length;
                    this.list = [...this.list, m];
                });
                const scrollTag = this.el.querySelector('virtual-scroll');
                scrollTag.list = this.list;
                if (this.list.length > 200) {
                    scrollTag.setInfinateFinally();
                }
                else {
                    scrollTag.setInfinateOn();
                }
            });
        }, 2000);
    }
    render() {
        return ([
            h("div", { onClick: this.reload.bind(this), class: "reload" }, "reload"),
            h("div", { class: "virtual-container" },
                h("virtual-scroll", { "bottom-offset": "5", selector: this.selector },
                    h("div", { slot: "virtual", class: "virtual-slot" }, this.virtual.map((item, i) => h("div", { class: "offer virtual-item", id: item.index },
                        h("div", { style: { backgroundImage: "url(" + item.thumbnailUrl + ")" }, class: "cover" }),
                        h("div", { class: "title" }, item.index),
                        h("div", { class: "title" }, item.title)))),
                    h("div", { slot: "loader" }, "loading...")))
        ]);
    }
}

exports['fetch-helper'] = FetchHelperWebComponent;
},


/***************** fetch-helper *****************/
[
/** fetch-helper: tag **/
"fetch-helper",

/** fetch-helper: members **/
[
  [ "changed", /** state **/ 5, /** do not observe attribute **/ 0, /** type any **/ 1 ],
  [ "el", /** element ref **/ 7, /** do not observe attribute **/ 0, /** type any **/ 1 ],
  [ "list", /** state **/ 5, /** do not observe attribute **/ 0, /** type any **/ 1 ],
  [ "selector", /** prop **/ 1, /** observe attribute **/ 1, /** type string **/ 2 ]
],

/** fetch-helper: host **/
{}

]
);