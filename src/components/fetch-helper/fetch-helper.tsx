import { Component, Prop, State, Element, Listen } from '@stencil/core';

@Component({
  tag: 'fetch-helper',
  styleUrl: 'fetch-helper.scss',
  //shadow: true
})
export class FetchHelperWebComponent {

  @State() list: Array<any> = [];

  @Element() el: HTMLElement;

  //class selector
  @Prop() selector: string = '';

  private virtual: Array<any> = [];

  //change detection strategy
  @State() changed: string[] = [];

  componentWillLoad() {
    this.request();
  }

  request() {

    let headers = {
    }

    headers['Content-Type'] = 'application/json';
    headers['token'] = 'kRuGZ3Xd';


    let mode: RequestMode = "cors";
    let options = {
      method: 'GET',
      mode: mode,
      headers: new Headers(headers)
    };
    let request = new Request("https://jsonplaceholder.typicode.com/photos", options);

    fetch(request).then(response => { return response.json(); }).then(r => {

      r.splice(0, 50).map(m => {
        m.index = this.list.length
        this.list = [...this.list, m];
      });

      const scrollTag: any = this.el.querySelector('virtual-scroll');
      scrollTag.list = this.list;

      scrollTag.addEventListener('toBottom', (event) => {

        this.lazyRequest();
      });

      scrollTag.addEventListener('update', (event) => {
        console.log('update')
        this.virtual = event.detail;
        this.changed = [...this.changed, ''];
      });
    });
  }

  lazyRequest() {

    let headers = {
    }

    headers['Content-Type'] = 'application/json';
    let mode: RequestMode = "cors";

    let options = {
      method: 'GET',
      mode: mode,
      headers: new Headers(headers)
    };
    let request = new Request("https://jsonplaceholder.typicode.com/photos", options);
    fetch(request).then(response => { return response.json(); }).then(r => {

      setTimeout(() => {
        r.splice(0, 50).map(m => {
          m.index = this.list.length
          this.list = [...this.list, m];
        });
        const scrollTag: any = this.el.querySelector('virtual-scroll');
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

  reload(event: UIEvent) {

    const scrollTag: any = this.el.querySelector('virtual-scroll');
    scrollTag.list = [];
    scrollTag.clear();
    this.changed = [...this.changed, ''];

    setTimeout(() => {

      let headers = {
      }

      headers['Content-Type'] = 'application/json';
      let mode: RequestMode = "cors";

      let options = {
        method: 'GET',
        mode: mode,
        headers: new Headers(headers)
      };
      let request = new Request("https://jsonplaceholder.typicode.com/photos", options);
      fetch(request).then(response => { return response.json(); }).then(r => {

        r.splice(0, 50).map(m => {
          m.index = this.list.length
          this.list = [...this.list, m];
        });
        const scrollTag: any = this.el.querySelector('virtual-scroll');
        scrollTag.list = this.list;

        if (this.list.length > 200) {
          scrollTag.setInfinateFinally();
        }
        else {
          scrollTag.setInfinateOn();
        }
      });
    }, 2000)
  }

  render() {

    return ([
      <div onClick={this.reload.bind(this)} class="reload">reload</div>,
      <div class="virtual-container">
        <virtual-scroll bottom-offset="5" selector={this.selector}>
          <div slot="virtual" class="virtual-slot">
            {
              this.virtual.map((item, i) =>
                <div class="offer virtual-item" id={item.index}>
                  <div style={{ backgroundImage: "url(" + item.thumbnailUrl + ")" }} class="cover">
                  </div>
                  <div class="title">{item.index}</div>
                  <div class="title">{item.title}</div>
                </div>
              )
            }
          </div>
          <div slot="loader">loading...</div>
        </virtual-scroll>
      </div>
    ]);
  }
}
