export class FetchHelperWebComponent {
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
            scrollTag.addEventListener('toBottom', () => {
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
    scrolling() {
        const scrollTag = this.el.querySelector('virtual-scroll');
        // scrollTag.list.splice(2, 1);
        // scrollTag.refresh();
        // this.changed = [...this.changed, ''];
        scrollTag.scrollToNode(25, 1000, -50);
    }
    render() {
        return ([
            h("div", { onClick: this.reload.bind(this), class: "reload" }, "reload"),
            h("div", { onClick: this.scrolling.bind(this), class: "scrolling" }, "scrolling"),
            h("div", { class: "virtual-container" },
                h("virtual-scroll", { "bottom-offset": "5", "virtual-ratio": "15", selector: this.selector },
                    h("div", { slot: "virtual", class: "virtual-slot" }, this.virtual.map((item, i) => h("div", { class: "offer virtual-item", id: item.index },
                        h("div", { style: { backgroundImage: "url(" + item.thumbnailUrl + ")" }, class: "cover" }),
                        h("div", { class: "title" }, item.index),
                        h("div", { class: "title" }, item.title)))),
                    h("div", { slot: "loader" }, "loading...")))
        ]);
    }
    static get is() { return "fetch-helper"; }
    static get properties() { return { "changed": { "state": true }, "el": { "elementRef": true }, "list": { "state": true }, "selector": { "type": String } }; }
    static get style() { return "/**style-placeholder:fetch-helper:**/"; }
}
