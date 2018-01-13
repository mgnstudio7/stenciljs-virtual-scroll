export declare class FetchHelperWebComponent {
    list: Array<any>;
    el: HTMLElement;
    selector: string;
    private virtual;
    changed: string[];
    componentWillLoad(): void;
    request(): void;
    lazyRequest(): void;
    reload(event: UIEvent): void;
    scrolling(): void;
    render(): JSX.Element[];
}
