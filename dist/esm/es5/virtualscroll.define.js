// virtualscroll: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './virtualscroll.core.js';
import {
  FetchHelperWebComponent,
  VirualScrollWebComponent
} from './virtualscroll.components.js';

export function defineCustomElements(window, opts) {
  defineCustomElement(window, [
    FetchHelperWebComponent,
    VirualScrollWebComponent
  ], opts);
}